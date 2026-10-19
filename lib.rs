//! Butterfly Dynamix statement engine.
//!
//! Three kinds of input all end up in the same pipeline:
//!   * word boxes from a PDF text layer or from OCR   -> `analyze_words`
//!   * spreadsheet cells                               -> `analyze_xlsx`
//!   * csv text                                        -> `analyze_csv`
//! The running balance printed on every statement is used to find which
//! column is which, to check every row, and to repair single misreads.
pub mod amount;
pub mod chain;
pub mod date;
pub mod grid;
pub mod model;
pub mod words;

use model::*;

/// Pulls an account number out of header text ("Account No: 025XXXX949").
pub fn find_account_no(text: &str) -> Option<String> {
    use regex_lite::Regex;
    use std::sync::OnceLock;
    static R: OnceLock<Regex> = OnceLock::new();
    let r = R.get_or_init(|| Regex::new(r"(?i)acc(?:oun)?t\.?\s*(?:number|no\.?|num|#)?\s*[:\-]?\s*([0-9Xx*]{8,14})").unwrap());
    r.captures(text).map(|c| c[1].to_string())
}

pub fn analyze_words(json: &str) -> String {
    #[derive(serde::Deserialize)]
    struct In {
        words: Vec<Word>,
    }
    let parsed: Result<In, _> = serde_json::from_str(json).or_else(|_| serde_json::from_str::<Vec<Word>>(json).map(|words| In { words }));
    match parsed {
        Ok(i) => to_json(chain::finish(words::table_from_words(i.words))),
        Err(e) => err(&format!("bad words json: {e}")),
    }
}

pub fn analyze_csv(text: &str) -> String {
    to_json(chain::finish(grid::table_from_grid(grid::parse_csv(text))))
}

pub fn analyze_xlsx(bytes: &[u8]) -> String {
    match grid::grids_from_xlsx(bytes) {
        Err(e) => err(&format!("could not open the workbook: {e}")),
        Ok(grids) => {
            // use the sheet that gives the best verified statement
            let mut best: Option<Statement> = None;
            for g in grids {
                let s = chain::finish(grid::table_from_grid(g));
                let better = match &best {
                    None => true,
                    Some(b) => (s.chain.ok, s.txns.len()) > (b.chain.ok, b.txns.len()),
                };
                if better {
                    best = Some(s);
                }
            }
            match best {
                Some(s) => to_json(s),
                None => err("the workbook has no sheets"),
            }
        }
    }
}

fn to_json(mut s: Statement) -> String {
    if s.meta.account_no.is_none() {
        s.meta.account_no = find_account_no(&s.meta.header_text);
    }
    serde_json::to_string(&s).unwrap_or_else(|e| err(&format!("{e}")))
}

fn err(m: &str) -> String {
    serde_json::json!({ "error": m }).to_string()
}

#[cfg(feature = "wasm")]
mod wasm {
    use wasm_bindgen::prelude::*;
    #[wasm_bindgen]
    pub fn analyze_words(json: &str) -> String {
        super::analyze_words(json)
    }
    #[wasm_bindgen]
    pub fn analyze_csv(text: &str) -> String {
        super::analyze_csv(text)
    }
    #[wasm_bindgen]
    pub fn analyze_xlsx(bytes: &[u8]) -> String {
        super::analyze_xlsx(bytes)
    }
    #[wasm_bindgen]
    pub fn engine_version() -> String {
        env!("CARGO_PKG_VERSION").to_string()
    }
}
