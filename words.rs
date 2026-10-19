//! Words with boxes (from a PDF text layer or OCR) -> raw table rows.
use crate::amount::parse_amount;
use crate::date::{find_dates, resolve, decide_order, DateHit};
use crate::model::*;
use regex_lite::Regex;
use std::collections::BTreeMap;
use std::sync::OnceLock;

fn median(v: &mut Vec<f64>) -> f64 {
    if v.is_empty() {
        return 10.0;
    }
    v.sort_by(|a, b| a.partial_cmp(b).unwrap());
    v[v.len() / 2]
}

/// Split multi-word runs into single words, spreading the box by character count.
pub fn normalize(words: Vec<Word>) -> Vec<Word> {
    let mut out = Vec::with_capacity(words.len());
    for w in words {
        let t = w.t.trim();
        if t.is_empty() || w.w <= 0.0 {
            continue;
        }
        if !t.contains(char::is_whitespace) {
            out.push(Word { t: t.to_string(), ..w });
            continue;
        }
        let total = t.chars().count() as f64;
        let mut pos = 0usize;
        for part in t.split_whitespace() {
            let start = t[pos..].find(part).map(|i| i + pos).unwrap_or(pos);
            let before = t[..start].chars().count() as f64;
            let len = part.chars().count() as f64;
            out.push(Word { p: w.p, x: w.x + w.w * before / total, y: w.y, w: w.w * len / total, h: w.h, t: part.to_string() });
            pos = start + part.len();
        }
    }
    out
}

struct Line {
    yc: f64,
    idx: Vec<usize>,
}

fn group_lines(ws: &[Word], ids: &[usize], h: f64) -> Vec<Line> {
    let mut ids: Vec<usize> = ids.to_vec();
    ids.sort_by(|&a, &b| (ws[a].y + ws[a].h / 2.0).partial_cmp(&(ws[b].y + ws[b].h / 2.0)).unwrap());
    let mut lines: Vec<Line> = vec![];
    for i in ids {
        let yc = ws[i].y + ws[i].h / 2.0;
        match lines.last_mut() {
            Some(l) if (yc - l.yc).abs() <= 0.55 * h => {
                let n = l.idx.len() as f64;
                l.yc = (l.yc * n + yc) / (n + 1.0);
                l.idx.push(i);
            }
            _ => lines.push(Line { yc, idx: vec![i] }),
        }
    }
    for l in lines.iter_mut() {
        l.idx.sort_by(|&a, &b| ws[a].x.partial_cmp(&ws[b].x).unwrap());
    }
    lines
}

fn cluster(vals: &[f64], tol: f64) -> Vec<(f64, usize)> {
    let mut v = vals.to_vec();
    v.sort_by(|a, b| a.partial_cmp(b).unwrap());
    let mut out: Vec<(f64, f64, usize)> = vec![]; // sum, last, count
    for x in v {
        match out.last_mut() {
            Some(c) if x - c.1 <= tol => {
                c.0 += x;
                c.1 = x;
                c.2 += 1;
            }
            _ => out.push((x, x, 1)),
        }
    }
    out.into_iter().map(|(s, _, n)| (s / n as f64, n)).collect()
}

fn kw_class(t: &str) -> Option<&'static str> {
    let l: String = t.to_lowercase().chars().filter(|c| c.is_alphabetic()).collect();
    match l.as_str() {
        "date" | "dates" | "posted" | "trans" | "value" | "txn" => Some("date"),
        "narration" | "description" | "details" | "remarks" | "particulars" | "transaction" | "narrative" => Some("desc"),
        "debit" | "debits" | "withdrawal" | "withdrawals" | "dr" | "paidout" | "moneyout" => Some("debit"),
        "credit" | "credits" | "lodgement" | "lodgements" | "deposit" | "deposits" | "cr" | "paidin" | "moneyin" => Some("credit"),
        "balance" | "bal" => Some("balance"),
        "reference" | "ref" => Some("ref"),
        _ => None,
    }
}

fn re_open() -> &'static Regex {
    static R: OnceLock<Regex> = OnceLock::new();
    R.get_or_init(|| Regex::new(r"(?i)opening\s+bal|balance\s*(b/?f|b/?fwd|brought)|brought\s+forward|bal\s*b/f").unwrap())
}
fn re_close() -> &'static Regex {
    static R: OnceLock<Regex> = OnceLock::new();
    R.get_or_init(|| Regex::new(r"(?i)closing\s+bal|balance\s*(c/?f|c/?fwd|carried)|carried\s+forward|bal\s*c/f").unwrap())
}
fn re_cur() -> &'static Regex {
    static R: OnceLock<Regex> = OnceLock::new();
    R.get_or_init(|| Regex::new(r"(?i)\b(NGN|USD|GBP|EUR|ZMW|GHS|KES|ZAR|CAD|AUD)\b|naira").unwrap())
}

fn label_of(s: &str) -> Option<Label> {
    if re_close().is_match(s) {
        Some(Label::Closing)
    } else if re_open().is_match(s) {
        Some(Label::Opening)
    } else {
        None
    }
}

/// First amount after a label on a line of text.
fn amount_after(label_re: &Regex, line: &str) -> Option<f64> {
    let m = label_re.find(line)?;
    for tok in line[m.end()..].split_whitespace() {
        if let Some(v) = parse_amount(tok.trim_matches(|c| c == ':' || c == '=' ), true) {
            return Some(v);
        }
    }
    None
}

struct Anchor {
    yc: f64,
    nums: Vec<Option<f64>>,
    ids: Vec<usize>,
}

pub fn table_from_words(raw: Vec<Word>) -> Table {
    let ws = normalize(raw);
    let mut t = Table::default();
    t.meta.source = "words".into();
    if ws.is_empty() {
        t.notes.push("no words".into());
        return t;
    }
    let mut hs: Vec<f64> = ws.iter().map(|w| w.h).collect();
    let h = median(&mut hs).max(1.0);

    let mut pages: BTreeMap<u32, Vec<usize>> = BTreeMap::new();
    for (i, w) in ws.iter().enumerate() {
        pages.entry(w.p).or_default().push(i);
    }

    // header line per page + summary lines for meta
    let mut header_y: BTreeMap<u32, f64> = BTreeMap::new();
    let mut header_words: Vec<(usize, &'static str)> = vec![];
    let mut all_text = String::new();
    let mut open_sum: Option<f64> = None;
    let mut close_sum: Option<f64> = None;
    for (p, ids) in &pages {
        let lines = group_lines(&ws, ids, h);
        let mut found = false;
        for l in &lines {
            let line: String = l.idx.iter().map(|&i| ws[i].t.as_str()).collect::<Vec<_>>().join(" ");
            all_text.push_str(&line);
            all_text.push('\n');
            if open_sum.is_none() {
                open_sum = amount_after(re_open(), &line);
            }
            if close_sum.is_none() {
                close_sum = amount_after(re_close(), &line);
            }
            if !found {
                let mut classes: Vec<&'static str> = vec![];
                let mut hw = vec![];
                for &i in &l.idx {
                    if let Some(c) = kw_class(&ws[i].t) {
                        if !classes.contains(&c) {
                            classes.push(c);
                        }
                        hw.push((i, c));
                    }
                }
                let money = classes.iter().filter(|c| matches!(**c, "debit" | "credit" | "balance")).count();
                if classes.len() >= 3 && money >= 2 {
                    header_y.insert(*p, l.yc);
                    header_words.extend(hw);
                    found = true;
                }
            }
        }
    }

    // numeric tokens below headers
    let below = |w: &Word| -> bool {
        match header_y.get(&w.p) {
            Some(hy) => w.y + w.h / 2.0 > hy + 0.6 * h,
            None => true,
        }
    };
    let mut amt: Vec<(usize, f64)> = vec![];
    for (i, w) in ws.iter().enumerate() {
        if below(w) {
            if let Some(v) = parse_amount(&w.t, true) {
                amt.push((i, v));
            }
        }
    }
    if amt.is_empty() {
        t.notes.push("no amounts found".into());
        return t;
    }
    let tol = 1.7 * h;
    let eval = |key: &dyn Fn(&Word) -> f64| -> (Vec<(f64, usize)>, usize) {
        let vals: Vec<f64> = amt.iter().map(|&(i, _)| key(&ws[i])).collect();
        let cl = cluster(&vals, tol);
        let maxc = cl.iter().map(|c| c.1).max().unwrap_or(0);
        let keep: Vec<(f64, usize)> = cl.into_iter().filter(|c| c.1 >= 2.max(maxc / 15)).collect();
        let cover: usize = keep.iter().map(|c| c.1).sum();
        (keep, cover)
    };
    let (right, rc) = eval(&|w: &Word| w.x + w.w);
    let (left, lc) = eval(&|w: &Word| w.x);
    let use_right = rc >= lc;
    let centers: Vec<f64> = if use_right { right.iter().map(|c| c.0).collect() } else { left.iter().map(|c| c.0).collect() };
    let key = |w: &Word| if use_right { w.x + w.w } else { w.x };
    t.ncols = centers.len();
    if t.ncols == 0 {
        t.notes.push("no numeric columns".into());
        return t;
    }

    // header hints per numeric column
    t.col_hint = vec![None; t.ncols];
    for &(i, c) in &header_words {
        if !matches!(c, "debit" | "credit" | "balance") {
            continue;
        }
        let w = &ws[i];
        let mid = w.x + w.w / 2.0;
        let mut best: Option<(usize, f64)> = None;
        for (k, &cx) in centers.iter().enumerate() {
            // compare against column's span (right edge key) - use header word centre vs column centre
            let colmid = if use_right { cx - 3.0 * h } else { cx + 3.0 * h };
            let d = (mid - colmid).abs().min((mid - cx).abs());
            if best.map_or(true, |b| d < b.1) {
                best = Some((k, d));
            }
        }
        if let Some((k, d)) = best {
            if d < 6.0 * h {
                t.col_hint[k] = Some(c.to_string());
            }
        }
    }

    // anchors per page
    let mut rows_all: Vec<RawRow> = vec![];
    let mut order_for_mode: Vec<(f64, f64)> = vec![]; // (prev_count, next_count) per gap
    let mut page_anchor: BTreeMap<u32, Vec<Anchor>> = BTreeMap::new();
    let mut is_amt_tok = vec![false; ws.len()];
    for (&p, ids) in &pages {
        // tokens assigned to a column
        let mut toks: Vec<(usize, usize, f64)> = vec![]; // (word, col, value)
        for &(i, v) in amt.iter().filter(|(i, _)| ws[*i].p == p) {
            let k = key(&ws[i]);
            let (bc, bd) = centers.iter().enumerate().map(|(c, &x)| (c, (k - x).abs())).min_by(|a, b| a.1.partial_cmp(&b.1).unwrap()).unwrap();
            if bd <= 2.2 * tol {
                toks.push((i, bc, v));
            }
        }
        toks.sort_by(|a, b| (ws[a.0].y + ws[a.0].h / 2.0).partial_cmp(&(ws[b.0].y + ws[b.0].h / 2.0)).unwrap());
        let mut anchors: Vec<Anchor> = vec![];
        for (i, c, v) in toks {
            let yc = ws[i].y + ws[i].h / 2.0;
            let need_new = match anchors.last() {
                Some(a) => (yc - a.yc).abs() > 0.6 * h,
                None => true,
            };
            if need_new {
                anchors.push(Anchor { yc, nums: vec![None; t.ncols], ids: vec![] });
            }
            let a = anchors.last_mut().unwrap();
            if a.nums[c].is_none() {
                a.nums[c] = Some(v);
                a.ids.push(i);
                is_amt_tok[i] = true;
            }
        }
        let _ = ids;
        page_anchor.insert(p, anchors);
    }

    // alignment mode from gap populations
    for (&p, anchors) in &page_anchor {
        let hy = header_y.get(&p).copied().unwrap_or(f64::MIN);
        for (k, a) in anchors.iter().enumerate() {
            let next_y = anchors.get(k + 1).map(|n| n.yc);
            if let Some(ny) = next_y {
                for &i in &pages[&p] {
                    let w = &ws[i];
                    let yc = w.y + w.h / 2.0;
                    if is_amt_tok[i] || yc <= hy + 0.6 * h || yc <= a.yc + 0.6 * h || yc >= ny - 0.6 * h {
                        continue;
                    }
                    let mid = (a.yc + ny) / 2.0;
                    if yc < mid {
                        order_for_mode.push((1.0, 0.0));
                    } else {
                        order_for_mode.push((0.0, 1.0));
                    }
                }
            }
        }
    }
    let (prev_n, next_n) = order_for_mode.iter().fold((0.0, 0.0), |a, b| (a.0 + b.0, a.1 + b.1));
    let top_mode = next_n < 0.4 * prev_n;
    t.notes.push(format!("row alignment: {}", if top_mode { "top" } else { "centered" }));

    // build rows
    let cap = 4.0 * h;
    for (&p, anchors) in &page_anchor {
        let hy = header_y.get(&p).copied().unwrap_or(f64::MIN);
        let mut bands: Vec<Vec<usize>> = vec![vec![]; anchors.len()];
        // row blocks: lines separated by more than the normal line pitch
        let mut block_of: std::collections::HashMap<usize, usize> = std::collections::HashMap::new();
        if !anchors.is_empty() {
            let body_ids: Vec<usize> = pages[&p].iter().copied().filter(|&i| ws[i].y + ws[i].h / 2.0 > hy + 0.6 * h).collect();
            let lines = group_lines(&ws, &body_ids, h);
            let mut gaps: Vec<f64> = lines.windows(2).map(|w| w[1].yc - w[0].yc).filter(|g| *g >= 0.75 * h).collect();
            gaps.sort_by(|a, b| a.partial_cmp(b).unwrap());
            // pitch = smallest gap value that repeats
            let mut pitch: Option<f64> = None;
            for (k, g) in gaps.iter().enumerate() {
                if gaps.iter().skip(k).take_while(|x| **x - g < 0.6).count() >= 3 {
                    pitch = Some(*g);
                    break;
                }
            }
            if let Some(pitch) = pitch {
                let thr = pitch * 1.3;
                let mut blocks: Vec<Vec<usize>> = vec![]; // word ids
                let mut ranges: Vec<(f64, f64)> = vec![];
                let mut last_y = f64::MIN;
                for l in &lines {
                    if blocks.is_empty() || l.yc - last_y > thr {
                        blocks.push(vec![]);
                        ranges.push((l.yc, l.yc));
                    }
                    blocks.last_mut().unwrap().extend(l.idx.iter().copied());
                    ranges.last_mut().unwrap().1 = l.yc;
                    last_y = l.yc;
                }
                for (bi, (lo, hi)) in ranges.iter().enumerate() {
                    let inside: Vec<usize> = anchors.iter().enumerate().filter(|(_, a)| a.yc >= lo - 0.4 * h && a.yc <= hi + 0.4 * h).map(|(k, _)| k).collect();
                    if inside.len() == 1 {
                        for &i in &blocks[bi] {
                            block_of.insert(i, inside[0]);
                        }
                    }
                }
            }
        }
        if !anchors.is_empty() {
            for &i in &pages[&p] {
                if is_amt_tok[i] {
                    continue;
                }
                let w = &ws[i];
                let yc = w.y + w.h / 2.0;
                if yc <= hy + 0.6 * h {
                    continue;
                }
                if let Some(&k) = block_of.get(&i) {
                    bands[k].push(i);
                    continue;
                }
                let mut best = 0usize;
                if top_mode {
                    // last anchor at or above this word; else the first anchor
                    let mut found = None;
                    for (k, a) in anchors.iter().enumerate() {
                        if a.yc - 0.6 * h <= yc {
                            found = Some(k);
                        }
                    }
                    best = found.unwrap_or(0);
                } else {
                    let mut bd = f64::MAX;
                    for (k, a) in anchors.iter().enumerate() {
                        let d = (a.yc - yc).abs();
                        if d < bd {
                            bd = d;
                            best = k;
                        }
                    }
                }
                if (anchors[best].yc - yc).abs() <= cap {
                    bands[best].push(i);
                }
            }
        }
        for (k, a) in anchors.iter().enumerate() {
            let lines = group_lines(&ws, &bands[k], h);
            // text per line
            let mut ltexts: Vec<(f64, String)> = lines
                .iter()
                .map(|l| (l.yc, l.idx.iter().map(|&i| ws[i].t.as_str()).collect::<Vec<_>>().join(" ")))
                .collect();
            // dates: prefer the anchor line's leading dates
            let anchor_line = ltexts
                .iter()
                .enumerate()
                .filter(|(_, (y, _))| (y - a.yc).abs() <= 0.6 * h)
                .min_by(|x, y| (x.1 .0 - a.yc).abs().partial_cmp(&(y.1 .0 - a.yc).abs()).unwrap())
                .map(|(i, _)| i);
            let mut hits: Vec<DateHit> = vec![];
            let mut rm: Vec<(usize, usize, usize)> = vec![]; // line, start, end
            if let Some(li) = anchor_line {
                let s = &ltexts[li].1;
                let all = find_dates(s);
                let mut cursor = 0usize;
                for hit in all {
                    let gap = &s[cursor..hit.start];
                    if gap.chars().all(|c| !c.is_alphanumeric()) && hits.len() < 2 {
                        rm.push((li, hit.start, hit.end));
                        cursor = hit.end;
                        hits.push(hit);
                    } else {
                        break;
                    }
                }
            }
            if hits.is_empty() {
                'outer: for (li, (_, s)) in ltexts.iter().enumerate() {
                    for hit in find_dates(s) {
                        rm.push((li, hit.start, hit.end));
                        hits.push(hit);
                        break 'outer;
                    }
                }
            }
            // build description with dates removed
            rm.sort_by(|a, b| b.cmp(a));
            for (li, s0, e0) in rm {
                ltexts[li].1.replace_range(s0..e0, " ");
            }
            let desc = ltexts.iter().map(|x| x.1.as_str()).collect::<Vec<_>>().join(" ").split_whitespace().filter(|w| !w.starts_with('\'')).collect::<Vec<_>>().join(" ");
            let desc = desc.trim_matches(|c: char| c == '\'' || c == '|' || c == ' ').to_string();
            let mut r = RawRow { page: p, desc: desc.clone(), nums: a.nums.clone(), label: label_of(&desc), ..Default::default() };
            r.date = None;
            rows_all.push(r);
            // stash hit data in side vector by pushing into date_txt below
            let last = rows_all.last_mut().unwrap();
            last.date_txt = hits.first().map(|h| serde_json::to_string(&(h.a, h.b, h.y, h.kind as u8)).unwrap());
            last.vdate_txt = hits.get(1).map(|h| serde_json::to_string(&(h.a, h.b, h.y, h.kind as u8)).unwrap());
        }
    }

    // trim summary/footer anchors
    let first_dated = rows_all.iter().position(|r| r.date_txt.is_some());
    let last_dated = rows_all.iter().rposition(|r| r.date_txt.is_some());
    let (fd, ld) = match (first_dated, last_dated) {
        (Some(a), Some(b)) => (a, b),
        _ => {
            // no readable dates at all: keep every row that has two or more numbers
            t.notes.push("no dates could be read; fill them in on the review screen".into());
            (0, rows_all.len().saturating_sub(1))
        }
    };
    let mut kept: Vec<RawRow> = vec![];
    let undated = first_dated.is_none();
    for (i, r) in rows_all.into_iter().enumerate() {
        if undated && r.label.is_none() && r.nums.iter().flatten().count() < 2 {
            continue;
        }
        let inside = i >= fd && i <= ld;
        let labeled_edge = r.label.is_some() && (i + 3 >= fd && i <= ld + 3);
        if inside || labeled_edge {
            kept.push(r);
        }
    }
    // dates -> resolved
    fn rebuild(s: &Option<String>) -> Option<DateHit> {
        let (a, b, y, k): (u32, u32, i32, u8) = serde_json::from_str(s.as_ref()?).ok()?;
        let kind = match k {
            0 => crate::date::Kind::Ymd,
            1 => crate::date::Kind::DMonY,
            _ => crate::date::Kind::Numeric,
        };
        Some(DateHit { start: 0, end: 0, a, b, y, kind })
    }
    let hits: Vec<DateHit> = kept.iter().filter_map(|r| rebuild(&r.date_txt)).collect();
    let (dmy, assumed) = decide_order(&hits);
    t.meta.date_order = if dmy { "dmy".into() } else { "mdy".into() };
    t.meta.date_order_assumed = assumed;
    for r in kept.iter_mut() {
        r.date = rebuild(&r.date_txt).and_then(|h| resolve(&h, dmy));
        r.date_txt = r.date.map(|d| d.iso());
        r.vdate_txt = rebuild(&r.vdate_txt).and_then(|h| resolve(&h, dmy)).map(|d| d.iso());
    }
    t.meta.opening = open_sum;
    t.meta.closing = close_sum;
    t.meta.header_text = all_text.chars().take(2500).collect();
    t.meta.currency = re_cur().find(&all_text).map(|m| {
        let s = m.as_str().to_uppercase();
        if s == "NAIRA" { "NGN".to_string() } else { s }
    });
    t.rows = kept;
    t
}
