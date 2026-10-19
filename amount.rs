//! Amount parsing tolerant of currency marks, brackets, CR/DR, and OCR slips.
use regex_lite::Regex;
use std::sync::OnceLock;

fn re_amount() -> &'static Regex {
    static R: OnceLock<Regex> = OnceLock::new();
    R.get_or_init(|| {
        // optional sign/bracket/currency, digits with separators, decimals, optional CR/DR
        Regex::new(r"^[\(\-+\u{2212}\u{2013}]?\s?(?:NGN|USD|GBP|EUR|[N$£€\u{20A6}])?\s?[\(\-+\u{2212}]?(\d[\d,.\s]*)?[.,]?\d*\)?\s?(CR|DR|Cr|Dr|cr|dr)?$").unwrap()
    })
}

/// Cleans common OCR slips inside a token that is mostly digits.
pub fn ocr_clean(t: &str) -> String {
    let digits = t.chars().filter(|c| c.is_ascii_digit()).count();
    let letters = t.chars().filter(|c| c.is_alphabetic()).count();
    if digits >= 2 && letters <= 2 {
        t.chars()
            .map(|c| match c {
                'O' | 'o' | 'D' => '0',
                'l' | 'I' | '|' => '1',
                'S' => '5',
                _ => c,
            })
            .collect()
    } else {
        t.to_string()
    }
}

/// Parse a token as a money amount. `strict` demands a decimal part or thousands
/// separator, so long reference numbers are not mistaken for amounts.
pub fn parse_amount(raw: &str, strict: bool) -> Option<f64> {
    let mut t = raw.trim().to_string();
    if t.is_empty() {
        return None;
    }
    // dashes mean "nothing" in many statements
    if t.chars().all(|c| matches!(c, '-' | '\u{2013}' | '\u{2014}' | '\u{2212}')) {
        return None;
    }
    let mut neg = false;
    if t.starts_with('(') && t.ends_with(')') {
        neg = true;
        t = t[1..t.len() - 1].to_string();
    }
    let up = t.to_uppercase();
    let mut cr_dr: Option<bool> = None; // Some(true)=negative (DR)
    if up.ends_with("DR") && up.len() > 2 {
        cr_dr = Some(true);
        t.truncate(t.len() - 2);
    } else if up.ends_with("CR") && up.len() > 2 {
        cr_dr = Some(false);
        t.truncate(t.len() - 2);
    }
    t = ocr_clean(t.trim());
    for p in ["NGN", "USD", "GBP", "EUR", "ngn", "usd", "gbp", "eur"] {
        if let Some(r) = t.strip_prefix(p) {
            t = r.to_string();
        }
    }
    t = t.trim().to_string();
    loop {
        let first = t.chars().next();
        match first {
            Some('-') | Some('\u{2212}') | Some('\u{2013}') => {
                neg = !neg;
                t.remove(0);
            }
            Some('+') => {
                t.remove(0);
            }
            Some('N') | Some('$') | Some('£') | Some('€') | Some('\u{20A6}') => {
                t.remove(0);
            }
            Some(' ') => {
                t.remove(0);
            }
            _ => break,
        }
    }
    if t.ends_with('-') {
        neg = !neg;
        t.pop();
    }
    let t = t.trim();
    if t.is_empty() || !t.chars().any(|c| c.is_ascii_digit()) {
        return None;
    }
    if !t.chars().all(|c| c.is_ascii_digit() || matches!(c, ',' | '.' | ' ')) {
        return None;
    }
    // figure out decimal separator: the last separator followed by 1-2 digits and
    // no later separators; '.75' style handled too
    let chars: Vec<char> = t.chars().collect();
    let last_sep = chars.iter().rposition(|c| matches!(c, ',' | '.'));
    let (int_part, frac_part): (String, String) = match last_sep {
        Some(i) => {
            let after: String = chars[i + 1..].iter().filter(|c| c.is_ascii_digit()).collect();
            let before: String = chars[..i].iter().filter(|c| c.is_ascii_digit()).collect();
            if after.len() == 3 && !before.is_empty() && chars[i] == ',' || after.len() == 3 && chars[i] == '.' && chars[..i].iter().any(|c| matches!(c, ',' | '.')) {
                // thousands separator only, e.g. 1,234 or 1.234.567
                (chars.iter().filter(|c| c.is_ascii_digit()).collect(), String::new())
            } else if after.len() <= 2 {
                (before, after)
            } else {
                // 3+ digits after '.', e.g. 12.345 -> treat as thousands only if '.' and exactly 3
                if after.len() == 3 {
                    (chars.iter().filter(|c| c.is_ascii_digit()).collect(), String::new())
                } else {
                    return None;
                }
            }
        }
        None => (chars.iter().filter(|c| c.is_ascii_digit()).collect(), String::new()),
    };
    if strict && frac_part.is_empty() && last_sep.is_none() {
        return None; // bare integer: probably a reference, not an amount
    }
    if strict && frac_part.is_empty() && !t.contains(',') && !t.contains('.') {
        return None;
    }
    if int_part.len() > 15 {
        return None;
    }
    let s = format!(
        "{}.{}",
        if int_part.is_empty() { "0".to_string() } else { int_part },
        if frac_part.is_empty() { "0".to_string() } else { frac_part }
    );
    let mut v: f64 = s.parse().ok()?;
    if neg {
        v = -v;
    }
    if let Some(true) = cr_dr {
        v = -v.abs();
    } else if let Some(false) = cr_dr {
        v = v.abs();
    }
    Some(v)
}

/// True when the token looks like a money amount (used to find numeric columns).
pub fn looks_like_amount(t: &str) -> bool {
    let _ = re_amount();
    parse_amount(t, true).is_some()
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn basics() {
        assert_eq!(parse_amount("3,216.00", true), Some(3216.0));
        assert_eq!(parse_amount(".75", true), Some(0.75));
        assert_eq!(parse_amount("-1,000.00", true), Some(-1000.0));
        assert_eq!(parse_amount("+1,000.00", true), Some(1000.0));
        assert_eq!(parse_amount("\u{20A6}1,239,066.82", true), Some(1239066.82));
        assert_eq!(parse_amount("(250.50)", true), Some(-250.5));
        assert_eq!(parse_amount("1,200.00 DR", true), Some(-1200.0));
        assert_eq!(parse_amount("16.000.00", true), Some(16000.0));
        assert_eq!(parse_amount("100033260801074642", true), None);
        assert_eq!(parse_amount("----", true), None);
        assert_eq!(parse_amount("2024", true), None);
        assert_eq!(parse_amount("35000", false), Some(35000.0));
        assert_eq!(parse_amount("0.00", true), Some(0.0));
    }
}
