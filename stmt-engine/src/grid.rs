//! Spreadsheet / CSV cells -> raw table rows.
use crate::amount::parse_amount;
use crate::date::{decide_order, find_dates, resolve, DateHit, Kind};
use crate::model::*;
use regex_lite::Regex;
use std::sync::OnceLock;

fn re_open() -> &'static Regex {
    static R: OnceLock<Regex> = OnceLock::new();
    R.get_or_init(|| Regex::new(r"(?i)opening\s+bal|balance\s*(b/?f|b/?fwd|brought)|brought\s+forward|bal\s*b/f").unwrap())
}
fn re_close() -> &'static Regex {
    static R: OnceLock<Regex> = OnceLock::new();
    R.get_or_init(|| Regex::new(r"(?i)closing\s+bal|balance\s*(c/?f|c/?fwd|carried)|carried\s+forward|bal\s*c/f").unwrap())
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

fn kw_class(t: &str) -> Option<&'static str> {
    let l: String = t.to_lowercase().chars().filter(|c| c.is_alphabetic()).collect();
    if l.contains("withdraw") || l.starts_with("debit") || l == "dr" {
        Some("debit")
    } else if l.contains("lodg") || l.contains("deposit") || l.starts_with("credit") || l == "cr" {
        Some("credit")
    } else if l.starts_with("balance") || l == "bal" {
        Some("balance")
    } else {
        None
    }
}

fn cell_text(c: &Cell) -> String {
    match c {
        Cell::Text(s) => s.trim().to_string(),
        Cell::Num(n) => format!("{}", n),
        Cell::Date(y, m, d) => format!("{:04}-{:02}-{:02}", y, m, d),
        Cell::Empty => String::new(),
    }
}

/// Date in a cell: typed date, or text that starts with a date.
fn cell_date(c: &Cell) -> Option<DateHit> {
    match c {
        Cell::Date(y, m, d) => Some(DateHit { start: 0, end: 0, a: *m, b: *d, y: *y, kind: Kind::Ymd }),
        Cell::Text(s) => {
            let s = s.trim();
            let hits = find_dates(s);
            let h = hits.into_iter().next()?;
            // the date must lead the cell (allow time suffix)
            if s[..h.start].chars().any(|c| c.is_alphanumeric()) {
                return None;
            }
            Some(h)
        }
        _ => None,
    }
}

fn cell_num(c: &Cell) -> Option<f64> {
    match c {
        Cell::Num(n) => Some(*n),
        Cell::Text(s) => {
            if cell_date(c).is_some() {
                return None;
            }
            parse_amount(s, false)
        }
        _ => None,
    }
}

pub fn table_from_grid(grid: Vec<Vec<Cell>>) -> Table {
    let mut t = Table::default();
    t.meta.source = "grid".into();
    let width = grid.iter().map(|r| r.len()).max().unwrap_or(0);
    let g: Vec<Vec<Cell>> = grid
        .into_iter()
        .map(|mut r| {
            r.resize(width, Cell::Empty);
            r
        })
        .collect();
    // dated rows
    let dated: Vec<usize> = (0..g.len()).filter(|&i| g[i].iter().any(|c| cell_date(c).is_some())).collect();
    if dated.is_empty() {
        t.notes.push("no dated rows".into());
        return t;
    }
    let (first, last) = (dated[0], *dated.last().unwrap());
    let mut counts_dates = vec![0usize; width];
    for &i in &dated {
        for (j, c) in g[i].iter().enumerate() {
            if cell_date(c).is_some() {
                counts_dates[j] += 1;
            }
        }
    }
    let n_data = dated.len();
    let is_date_col: Vec<bool> = counts_dates.iter().map(|&c| c * 2 >= n_data).collect();
    // numeric columns
    let mut num_cols: Vec<usize> = vec![];
    for j in 0..width {
        if is_date_col[j] {
            continue;
        }
        let vals: Vec<f64> = dated.iter().filter_map(|&i| cell_num(&g[i][j])).collect();
        let texty = dated.iter().filter(|&&i| matches!(&g[i][j], Cell::Text(s) if !s.trim().is_empty() && cell_num(&g[i][j]).is_none())).count();
        if vals.len() >= 1.max(n_data / 20) && texty * 3 <= vals.len() {
            // skip serial-number columns 1,2,3...
            let serial = vals.len() > 3 && vals.len() * 2 >= n_data && vals.windows(2).all(|w| (w[1] - w[0] - 1.0).abs() < 1e-9);
            if !serial {
                num_cols.push(j);
            }
        }
    }
    if num_cols.is_empty() {
        t.notes.push("no numeric columns".into());
        return t;
    }
    t.ncols = num_cols.len();
    // header hints from rows above first data row
    t.col_hint = vec![None; t.ncols];
    for hr in (0..first).rev().take(4) {
        for (k, &j) in num_cols.iter().enumerate() {
            if t.col_hint[k].is_none() {
                if let Cell::Text(s) = &g[hr][j] {
                    t.col_hint[k] = kw_class(s).map(|s| s.to_string());
                }
            }
        }
    }
    let mut open_sum = None;
    let mut dhits: Vec<DateHit> = vec![];
    struct Tmp {
        d: Option<DateHit>,
        v: Option<DateHit>,
        r: RawRow,
    }
    let mut tmp: Vec<Tmp> = vec![];
    for i in 0..g.len() {
        let row = &g[i];
        let text_all: String = row.iter().enumerate().filter(|(j, c)| !is_date_col[*j] && !num_cols.contains(j) && matches!(c, Cell::Text(_))).map(|(_, c)| cell_text(c)).collect::<Vec<_>>().join(" ");
        let lab = label_of(&text_all);
        let nums: Vec<Option<f64>> = num_cols.iter().map(|&j| cell_num(&row[j])).collect();
        let is_dated = dated.binary_search(&i).is_ok();
        if i < first || i > last {
            // summary rows outside the table
            if lab == Some(Label::Opening) && open_sum.is_none() {
                open_sum = row.iter().find_map(|c| cell_num(c)).filter(|_| true).or(None);
                // number may sit to the right of the label in another cell
            }
            if lab.is_some() && i > last {
                // closing row after the last dated row
                if nums.iter().any(|n| n.is_some()) {
                    tmp.push(Tmp { d: None, v: None, r: RawRow { desc: text_all, nums, label: lab, ..Default::default() } });
                }
            } else if lab == Some(Label::Opening) && i + 4 >= first && nums.iter().any(|n| n.is_some()) {
                tmp.push(Tmp { d: None, v: None, r: RawRow { desc: text_all, nums, label: lab, ..Default::default() } });
            }
            continue;
        }
        if !is_dated && lab.is_none() {
            continue;
        }
        let dcells: Vec<DateHit> = row.iter().enumerate().filter(|(j, _)| is_date_col[*j]).filter_map(|(_, c)| cell_date(c)).collect();
        let desc: String = {
            let mut parts: Vec<String> = vec![];
            for (j, c) in row.iter().enumerate() {
                if is_date_col[j] || num_cols.contains(&j) {
                    continue;
                }
                let s = cell_text(c);
                if !s.is_empty() && !parts.contains(&s) {
                    parts.push(s);
                }
            }
            parts.join(" ")
        };
        let lab = lab.or_else(|| label_of(&desc));
        if let Some(d) = dcells.first() {
            dhits.push(d.clone());
        }
        tmp.push(Tmp { d: dcells.first().cloned(), v: dcells.get(1).cloned(), r: RawRow { page: 1, desc, nums, label: lab, ..Default::default() } });
    }
    {
        let mut ht = String::new();
        for r in g.iter().take(first.min(40)) {
            for c in r {
                let s = cell_text(c);
                if !s.is_empty() {
                    ht.push_str(&s);
                    ht.push(' ');
                }
            }
            ht.push('\n');
        }
        if let Some(m) = regex_lite::Regex::new(r"(?i)\b(NGN|USD|GBP|EUR|ZMW|GHS|KES|ZAR)\b").unwrap().find(&ht) {
            t.meta.currency = Some(m.as_str().to_uppercase());
        }
        t.meta.header_text = ht.chars().take(2500).collect();
    }
    let (dmy, assumed) = decide_order(&dhits);
    t.meta.date_order = if dmy { "dmy".into() } else { "mdy".into() };
    t.meta.date_order_assumed = assumed;
    for mut x in tmp {
        x.r.date = x.d.as_ref().and_then(|h| resolve(h, dmy));
        x.r.date_txt = x.r.date.map(|d| d.iso());
        x.r.vdate_txt = x.v.as_ref().and_then(|h| resolve(h, dmy)).map(|d| d.iso());
        t.rows.push(x.r);
    }
    t.meta.opening = None;
    let _ = open_sum;
    t
}

// ---------- CSV ----------
pub fn parse_csv(text: &str) -> Vec<Vec<Cell>> {
    let text = text.trim_start_matches('\u{feff}');
    let first_lines: String = text.lines().take(20).collect::<Vec<_>>().join("\n");
    let mut delim = ',';
    let mut best = 0;
    for d in [',', ';', '\t', '|'] {
        let n = first_lines.matches(d).count();
        if n > best {
            best = n;
            delim = d;
        }
    }
    let mut rows: Vec<Vec<Cell>> = vec![];
    let mut row: Vec<String> = vec![];
    let mut field = String::new();
    let mut inq = false;
    let mut chars = text.chars().peekable();
    let push_row = |row: &mut Vec<String>, field: &mut String, rows: &mut Vec<Vec<Cell>>| {
        row.push(std::mem::take(field));
        if row.iter().any(|f| !f.trim().is_empty()) {
            rows.push(row.drain(..).map(|f| if f.trim().is_empty() { Cell::Empty } else { Cell::Text(f.trim().to_string()) }).collect());
        } else {
            row.clear();
        }
    };
    while let Some(c) = chars.next() {
        if inq {
            if c == '"' {
                if chars.peek() == Some(&'"') {
                    field.push('"');
                    chars.next();
                } else {
                    inq = false;
                }
            } else {
                field.push(c);
            }
        } else if c == '"' {
            inq = true;
        } else if c == delim {
            row.push(std::mem::take(&mut field));
        } else if c == '\n' {
            push_row(&mut row, &mut field, &mut rows);
        } else if c == '\r' {
        } else {
            field.push(c);
        }
    }
    if !field.is_empty() || !row.is_empty() {
        push_row(&mut row, &mut field, &mut rows);
    }
    rows
}

// ---------- XLSX ----------
fn serial_to_ymd(serial: f64) -> Option<(i32, u32, u32)> {
    if !(20000.0..80000.0).contains(&serial) {
        return None;
    }
    // days since 1899-12-30
    let z = serial.floor() as i64 + 719468 - 25569 + 0; // 25569 = days 1899-12-30 -> 1970-01-01
    let z = z - 0;
    let era = (if z >= 0 { z } else { z - 146096 }) / 146097;
    let doe = z - era * 146097;
    let yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y = yoe + era * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = (doy - (153 * mp + 2) / 5 + 1) as u32;
    let m = if mp < 10 { mp + 3 } else { mp - 9 } as u32;
    let y = if m <= 2 { y + 1 } else { y } as i32;
    Some((y, m, d))
}

pub fn grids_from_xlsx(bytes: &[u8]) -> Result<Vec<Vec<Vec<Cell>>>, String> {
    use calamine::{Data, Reader, Xlsx};
    let mut wb: Xlsx<_> = calamine::open_workbook_from_rs(std::io::Cursor::new(bytes)).map_err(|e| format!("{e}"))?;
    let names = wb.sheet_names().to_vec();
    let mut out = vec![];
    for n in names {
        let range = match wb.worksheet_range(&n) {
            Ok(r) => r,
            Err(_) => continue,
        };
        let (r0, c0) = range.start().unwrap_or((0, 0));
        let _ = (r0, c0);
        let grid: Vec<Vec<Cell>> = range
            .rows()
            .map(|row| {
                row.iter()
                    .map(|d| match d {
                        Data::Empty => Cell::Empty,
                        Data::String(s) => {
                            if s.trim().is_empty() {
                                Cell::Empty
                            } else {
                                Cell::Text(s.clone())
                            }
                        }
                        Data::Float(f) => Cell::Num(*f),
                        Data::Int(i) => Cell::Num(*i as f64),
                        Data::DateTime(dt) => match serial_to_ymd(dt.as_f64()) {
                            Some((y, m, d)) => Cell::Date(y, m, d),
                            None => Cell::Num(dt.as_f64()),
                        },
                        Data::DateTimeIso(s) => Cell::Text(s.clone()),
                        Data::DurationIso(s) => Cell::Text(s.clone()),
                        Data::Bool(b) => Cell::Text(b.to_string()),
                        Data::Error(_) => Cell::Empty,
                    })
                    .collect()
            })
            .collect();
        out.push(grid);
    }
    Ok(out)
}
