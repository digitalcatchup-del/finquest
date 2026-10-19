//! Balance-chain role inference, verification and repair.
use crate::model::*;

const EPS: f64 = 0.015;

fn close(a: f64, b: f64) -> bool {
    (a - b).abs() <= EPS
}

#[derive(Clone, Copy, Debug)]
enum Roles {
    Dcb { d: usize, c: usize, b: usize },
    /// single signed amount column; `neg` means positive numbers are debits
    Amt { a: usize, b: usize, neg: bool },
}

fn net(r: &RawRow, roles: Roles) -> Option<f64> {
    match roles {
        Roles::Dcb { d, c, .. } => {
            let (dv, cv) = (r.nums.get(d).copied().flatten(), r.nums.get(c).copied().flatten());
            if dv.is_none() && cv.is_none() {
                return None;
            }
            Some(cv.unwrap_or(0.0).abs() - dv.unwrap_or(0.0).abs())
        }
        Roles::Amt { a, neg, .. } => r.nums.get(a).copied().flatten().map(|v| if neg { -v } else { v }),
    }
}

fn bal(r: &RawRow, roles: Roles) -> Option<f64> {
    let b = match roles {
        Roles::Dcb { b, .. } | Roles::Amt { b, .. } => b,
    };
    r.nums.get(b).copied().flatten()
}

fn score(rows: &[&RawRow], roles: Roles, opening: Option<f64>) -> (usize, usize) {
    let mut prev = opening;
    let (mut ok, mut checked) = (0, 0);
    for r in rows {
        let b = match bal(r, roles) {
            Some(b) => b,
            None => continue,
        };
        if let (Some(p), Some(n)) = (prev, net(r, roles)) {
            checked += 1;
            if close(p + n, b) {
                ok += 1;
            }
        }
        prev = Some(b);
    }
    (ok, checked)
}

fn hint_bonus(t: &Table, roles: Roles) -> usize {
    let mut s = 0;
    let h = |i: usize, w: &str| t.col_hint.get(i).and_then(|x| x.as_deref()) == Some(w);
    match roles {
        Roles::Dcb { d, c, b } => {
            if h(d, "debit") {
                s += 1
            }
            if h(c, "credit") {
                s += 1
            }
            if h(b, "balance") {
                s += 1
            }
            // conventional left-to-right order debit, credit, balance
            if d < c && c < b {
                s += 1
            }
        }
        Roles::Amt { b, a, .. } => {
            if h(b, "balance") {
                s += 1
            }
            if a < b {
                s += 1
            }
        }
    }
    s
}

fn candidates(n: usize) -> Vec<Roles> {
    let mut v = vec![];
    for b in 0..n {
        for d in 0..n {
            for c in 0..n {
                if d != c && d != b && c != b {
                    v.push(Roles::Dcb { d, c, b });
                }
            }
        }
        for a in 0..n {
            if a != b {
                v.push(Roles::Amt { a, b, neg: false });
                v.push(Roles::Amt { a, b, neg: true });
            }
        }
    }
    v
}

fn fp(date: &Option<String>, debit: Option<f64>, credit: Option<f64>, balance: Option<f64>, desc: &str) -> String {
    let (dir, amt) = match (debit, credit) {
        (Some(d), _) if d != 0.0 => ("D", d),
        (_, Some(c)) => ("C", c),
        _ => ("?", 0.0),
    };
    let key = match balance {
        Some(b) => format!("{:.2}", b),
        None => desc.chars().filter(|c| c.is_alphanumeric()).take(24).collect::<String>().to_lowercase(),
    };
    format!("{}|{}|{:.2}|{}", date.clone().unwrap_or_default(), dir, amt, key)
}

pub fn finish(t: Table) -> Statement {
    let mut notes = t.notes.clone();
    let mut meta = t.meta.clone();
    let empty_chain = |mode: &str| Chain { checked: 0, ok: 0, repaired: 0, flagged: 0, closes: false, mode: mode.into(), order: "asis".into() };
    if t.rows.is_empty() || t.ncols == 0 {
        return Statement { meta, txns: vec![], chain: empty_chain("none"), notes };
    }
    let open_row = t.rows.iter().find(|r| r.label == Some(Label::Opening));
    let close_row = t.rows.iter().rev().find(|r| r.label == Some(Label::Closing));
    let body: Vec<&RawRow> = t.rows.iter().filter(|r| r.label.is_none()).collect();

    let mut best: Option<(Roles, bool, usize, usize, usize)> = None; // roles, reversed, ok, checked, bonus
    for reversed in [false, true] {
        let mut seq: Vec<&RawRow> = body.clone();
        if reversed {
            seq.reverse();
        }
        for roles in candidates(t.ncols) {
            let op = if reversed {
                None
            } else {
                // opening balance from a label row (its balance column) or the summary
                open_row.and_then(|r| bal(r, roles)).or(meta.opening)
            };
            let (ok, checked) = score(&seq, roles, op);
            let bonus = hint_bonus(&t, roles) + if reversed { 0 } else { 1 };
            let better = match best {
                None => true,
                Some((_, _, bok, _, bb)) => ok > bok || (ok == bok && bonus > bb),
            };
            if better {
                best = Some((roles, reversed, ok, checked, bonus));
            }
        }
    }
    let (mut roles, mut reversed, ok0, checked0, _) = match best {
        Some(b) => b,
        None => {
            notes.push("not enough numeric columns to read this as a statement".into());
            return Statement { meta, txns: vec![], chain: empty_chain("none"), notes };
        }
    };
    let verified = checked0 > 0 && (ok0 as f64) >= 0.5 * (checked0 as f64) && ok0 >= 2;
    let mode = if verified {
        match roles {
            Roles::Dcb { .. } => "dcb",
            Roles::Amt { .. } => "amount",
        }
    } else {
        "unverified"
    };
    if !verified {
        // fall back to header hints, then conventional order
        reversed = false;
        let hint = |w: &str| t.col_hint.iter().position(|x| x.as_deref() == Some(w));
        roles = match (hint("debit"), hint("credit"), hint("balance")) {
            (Some(d), Some(c), Some(b)) => Roles::Dcb { d, c, b },
            _ if t.ncols >= 3 => Roles::Dcb { d: t.ncols - 3, c: t.ncols - 2, b: t.ncols - 1 },
            _ if t.ncols == 2 => Roles::Amt { a: 0, b: 1, neg: false },
            _ => Roles::Amt { a: 0, b: 0, neg: false },
        };
        notes.push("could not confirm columns from the running balance; every row needs a look".into());
    }

    let mut seq: Vec<&RawRow> = body.clone();
    if reversed {
        seq.reverse();
        notes.push("statement is newest-first; rows were put in date order".into());
    }
    let opening = if reversed { None } else { open_row.and_then(|r| bal(r, roles)).or(meta.opening) };
    let closing = close_row.and_then(|r| bal(r, roles)).or(meta.closing);
    if opening.is_some() {
        meta.opening = opening;
    }
    meta.closing = closing;

    let n = seq.len();
    let mut d: Vec<Option<f64>> = vec![None; n];
    let mut c: Vec<Option<f64>> = vec![None; n];
    let mut b: Vec<Option<f64>> = vec![None; n];
    for (i, r) in seq.iter().enumerate() {
        match roles {
            Roles::Dcb { d: di, c: ci, b: bi } => {
                d[i] = r.nums.get(di).copied().flatten().map(|v| v.abs());
                c[i] = r.nums.get(ci).copied().flatten().map(|v| v.abs());
                b[i] = r.nums.get(bi).copied().flatten();
            }
            Roles::Amt { a, b: bi, neg } => {
                if let Some(v) = r.nums.get(a).copied().flatten() {
                    let v = if neg { -v } else { v };
                    if v < 0.0 {
                        d[i] = Some(-v)
                    } else {
                        c[i] = Some(v)
                    }
                }
                b[i] = r.nums.get(bi).copied().flatten();
            }
        }
    }
    let netv = |i: usize, d: &Vec<Option<f64>>, c: &Vec<Option<f64>>| c[i].unwrap_or(0.0) - d[i].unwrap_or(0.0);
    let mut status: Vec<&'static str> = vec!["ok"; n];
    let mut note: Vec<String> = vec![String::new(); n];
    let (mut n_ok, mut n_rep, mut n_flag, mut n_checked) = (0, 0, 0, 0);
    let mut prev = opening;
    for i in 0..n {
        let bi = match b[i] {
            Some(x) => x,
            None => {
                status[i] = "unchecked";
                note[i] = "no balance read for this row".into();
                continue;
            }
        };
        if !verified {
            status[i] = "unchecked";
            prev = Some(bi);
            continue;
        }
        let p = match prev {
            Some(p) => p,
            None => {
                prev = Some(bi);
                continue;
            }
        };
        n_checked += 1;
        if close(p + netv(i, &d, &c), bi) {
            n_ok += 1;
            prev = Some(bi);
            continue;
        }
        let next_fits = |bi: f64, d: &Vec<Option<f64>>, c: &Vec<Option<f64>>| -> bool {
            if i + 1 < n {
                match b[i + 1] {
                    Some(bn) => close(bi + netv(i + 1, d, c), bn),
                    None => false,
                }
            } else {
                match closing {
                    Some(cl) => close(bi, cl),
                    None => true,
                }
            }
        };
        let delta = bi - p;
        if next_fits(bi, &d, &c) {
            // the amount was misread; the balances agree with each other
            if delta < 0.0 {
                d[i] = Some(-delta);
                c[i] = None;
            } else {
                c[i] = Some(delta);
                d[i] = None;
            }
            status[i] = "repaired";
            note[i] = "amount corrected from the balance column".into();
            n_rep += 1;
            prev = Some(bi);
            continue;
        }
        let bprime = p + netv(i, &d, &c);
        if next_fits(bprime, &d, &c) {
            b[i] = Some(bprime);
            status[i] = "repaired";
            note[i] = "balance corrected from the amount".into();
            n_rep += 1;
            prev = Some(bprime);
            continue;
        }
        status[i] = "flag";
        note[i] = "balance does not follow from the previous row".into();
        n_flag += 1;
        prev = Some(bi);
    }

    // final closing check
    let last_b = b.iter().rev().find_map(|x| *x);
    let closes = verified && n_flag == 0 && match (closing, last_b) {
        (Some(cl), Some(lb)) => close(cl, lb),
        _ => true,
    };

    // dates + output
    let mut txns: Vec<Txn> = vec![];
    let mut last_date: Option<String> = None;
    for (i, r) in seq.iter().enumerate() {
        let mut date = r.date_txt.clone();
        let mut st = status[i];
        let mut nt = note[i].clone();
        if date.is_none() {
            if let Some(ld) = &last_date {
                date = Some(ld.clone());
                if nt.is_empty() {
                    nt = "date copied from the row above".into();
                }
            } else {
                st = "flag";
                nt = "no date found".into();
            }
        } else {
            last_date = date.clone();
        }
        if d[i].is_none() && c[i].is_none() && st != "unchecked" {
            st = "flag";
            nt = "no amount found".into();
        }
        let clean = |v: Option<f64>| v.filter(|x| *x != 0.0).map(|x| (x * 100.0).round() / 100.0);
        let (dv, cv, bv) = (clean(d[i]), clean(c[i]), b[i].map(|x| (x * 100.0).round() / 100.0));
        txns.push(Txn {
            fp: fp(&date, dv, cv, bv, &r.desc),
            date,
            value_date: r.vdate_txt.clone(),
            desc: r.desc.clone(),
            debit: dv,
            credit: cv,
            balance: bv,
            status: st,
            note: nt,
            page: r.page,
        });
    }
    // drop all-zero rows that are neither flagged nor meaningful
    Statement {
        meta,
        txns,
        chain: Chain { checked: n_checked, ok: n_ok, repaired: n_rep, flagged: n_flag, closes, mode: mode.into(), order: if reversed { "newest-first".into() } else { "oldest-first".into() } },
        notes,
    }
}
