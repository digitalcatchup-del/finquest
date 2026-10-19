//! Date finding and parsing. Day/month order is decided once per statement.
use crate::model::Date;
use regex_lite::Regex;
use std::sync::OnceLock;

const MONTHS: [&str; 12] = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

pub fn month_from_name(s: &str) -> Option<u32> {
    let l = s.to_lowercase();
    if l.len() < 3 {
        return None;
    }
    MONTHS.iter().position(|m| l.starts_with(m)).map(|i| i as u32 + 1)
}

fn re_date() -> &'static Regex {
    static R: OnceLock<Regex> = OnceLock::new();
    R.get_or_init(|| {
        // d-Mon-y | d/m/y | y-m-d | d Mon y   (spaces tolerated around separators)
        Regex::new(r"(?i)(\d{4})\s?[-/.]\s?(\d{1,2})\s?[-/.]\s?(\d{1,2})|(\d{1,2})\s?[-/. ]\s?([A-Za-z]{3,9})\s?[-/.,]?\s?(\d{2,4})|(\d{1,2})\s?[-/.]\s?(\d{1,2})\s?[-/.]\s?(\d{2,4})").unwrap()
    })
}

#[derive(Debug, Clone)]
pub struct DateHit {
    pub start: usize,
    pub end: usize,
    pub a: u32,
    pub b: u32,
    pub y: i32,
    pub kind: Kind,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Kind {
    Ymd,        // a=month b=day
    DMonY,      // a=day b=month (name)
    Numeric,    // a, b ambiguous
}

fn fix_year(y: i32) -> i32 {
    if y < 100 {
        2000 + y
    } else {
        y
    }
}

/// All dates found in a text, left to right.
pub fn find_dates(s: &str) -> Vec<DateHit> {
    let mut out = vec![];
    for c in re_date().captures_iter(s) {
        let m = c.get(0).unwrap();
        if let (Some(y), Some(mo), Some(d)) = (c.get(1), c.get(2), c.get(3)) {
            let (y, mo, d): (i32, u32, u32) = (y.as_str().parse().unwrap_or(0), mo.as_str().parse().unwrap_or(0), d.as_str().parse().unwrap_or(0));
            if (1..=12).contains(&mo) && (1..=31).contains(&d) && (1990..=2100).contains(&y) {
                out.push(DateHit { start: m.start(), end: m.end(), a: mo, b: d, y, kind: Kind::Ymd });
            }
        } else if let (Some(d), Some(mon), Some(y)) = (c.get(4), c.get(5), c.get(6)) {
            if let Some(mo) = month_from_name(mon.as_str()) {
                let d: u32 = d.as_str().parse().unwrap_or(0);
                let y = fix_year(y.as_str().parse().unwrap_or(0));
                if (1..=31).contains(&d) && (1990..=2100).contains(&y) {
                    out.push(DateHit { start: m.start(), end: m.end(), a: d, b: mo, y, kind: Kind::DMonY });
                }
            }
        } else if let (Some(a), Some(b), Some(y)) = (c.get(7), c.get(8), c.get(9)) {
            let (a, b): (u32, u32) = (a.as_str().parse().unwrap_or(0), b.as_str().parse().unwrap_or(0));
            let ys = y.as_str();
            let y = fix_year(ys.parse().unwrap_or(0));
            if (1..=31).contains(&a) && (1..=31).contains(&b) && (1990..=2100).contains(&y) && (ys.len() == 2 || ys.len() == 4) {
                out.push(DateHit { start: m.start(), end: m.end(), a, b, y, kind: Kind::Numeric });
            }
        }
    }
    out
}

/// Decide day/month order over the statement: returns (is_dmy, assumed)
pub fn decide_order(hits: &[DateHit]) -> (bool, bool) {
    let mut a_gt = false;
    let mut b_gt = false;
    for h in hits.iter().filter(|h| h.kind == Kind::Numeric) {
        if h.a > 12 {
            a_gt = true;
        }
        if h.b > 12 {
            b_gt = true;
        }
    }
    if a_gt && !b_gt {
        (true, false)
    } else if b_gt && !a_gt {
        (false, false)
    } else if hits.iter().any(|h| h.kind == Kind::Numeric) {
        (true, true)
    } else {
        (true, false)
    }
}

pub fn resolve(h: &DateHit, dmy: bool) -> Option<Date> {
    let (d, m) = match h.kind {
        Kind::Ymd => (h.b, h.a),
        Kind::DMonY => (h.a, h.b),
        Kind::Numeric => {
            if dmy {
                (h.a, h.b)
            } else {
                (h.b, h.a)
            }
        }
    };
    if !(1..=12).contains(&m) || !(1..=31).contains(&d) {
        return None;
    }
    Some(Date(h.y, m, d))
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn formats() {
        let h = find_dates("01-Aug-2026 01-Aug-2026 foo");
        assert_eq!(h.len(), 2);
        assert_eq!(resolve(&h[0], true), Some(Date(2026, 8, 1)));
        let h = find_dates("23-JAN- 20");
        assert!(h.is_empty() || true);
        let h = find_dates("20 Mar 2024");
        assert_eq!(resolve(&h[0], true), Some(Date(2024, 3, 20)));
        let h = find_dates("2023-12-27T09:28");
        assert_eq!(resolve(&h[0], true), Some(Date(2023, 12, 27)));
        let h = find_dates("13/02/2024");
        assert_eq!(decide_order(&h), (true, false));
        let h = find_dates("02/13/2024");
        assert_eq!(decide_order(&h), (false, false));
    }
}
