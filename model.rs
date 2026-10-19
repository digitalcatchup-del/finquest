use serde::{Deserialize, Serialize};

/// One word (or phrase) with its box. Origin is top-left, y grows downward.
#[derive(Debug, Clone, Deserialize)]
pub struct Word {
    pub p: u32,
    pub x: f64,
    pub y: f64,
    pub w: f64,
    pub h: f64,
    pub t: String,
}

/// A cell from a spreadsheet / csv.
#[derive(Debug, Clone, PartialEq)]
pub enum Cell {
    Empty,
    Text(String),
    Num(f64),
    Date(i32, u32, u32),
}

#[derive(Debug, Clone, Default)]
pub struct RawRow {
    pub page: u32,
    pub date: Option<Date>,
    pub date_txt: Option<String>,
    pub vdate_txt: Option<String>,
    pub desc: String,
    pub nums: Vec<Option<f64>>,
    pub label: Option<Label>,
    pub date_inherited: bool,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Label {
    Opening,
    Closing,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize)]
pub struct Date(pub i32, pub u32, pub u32);

impl Date {
    pub fn iso(&self) -> String {
        format!("{:04}-{:02}-{:02}", self.0, self.1, self.2)
    }
}

#[derive(Debug, Clone, Default, Serialize)]
pub struct Meta {
    pub opening: Option<f64>,
    pub closing: Option<f64>,
    pub currency: Option<String>,
    pub date_order: String,
    pub date_order_assumed: bool,
    pub source: String,
    pub header_text: String,
    pub account_no: Option<String>,
    pub bank_hint: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Table {
    pub rows: Vec<RawRow>,
    pub ncols: usize,
    pub meta: Meta,
    pub col_hint: Vec<Option<String>>, // header keyword per numeric column, when known
    pub notes: Vec<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct Txn {
    pub date: Option<String>,
    pub value_date: Option<String>,
    pub desc: String,
    pub debit: Option<f64>,
    pub credit: Option<f64>,
    pub balance: Option<f64>,
    pub status: &'static str, // ok | repaired | flag | unchecked
    pub note: String,
    pub page: u32,
    pub fp: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct Chain {
    pub checked: usize,
    pub ok: usize,
    pub repaired: usize,
    pub flagged: usize,
    pub closes: bool,
    pub mode: String,
    pub order: String,
}

#[derive(Debug, Serialize)]
pub struct Statement {
    pub meta: Meta,
    pub txns: Vec<Txn>,
    pub chain: Chain,
    pub notes: Vec<String>,
}
