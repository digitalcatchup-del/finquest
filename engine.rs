use stmt_engine::*;

fn csv(rows: &[&str]) -> String {
    let mut s = String::from("Date,Description,Debit,Credit,Balance\n");
    for r in rows {
        s.push_str(r);
        s.push('\n');
    }
    s
}
fn run(s: &str) -> serde_json::Value {
    serde_json::from_str(&analyze_csv(s)).unwrap()
}

#[test]
fn clean_statement_all_ok() {
    let v = run(&csv(&[
        "01/03/2024,Opening Balance,,,1000.00",
        "02/03/2024,POS purchase,200.00,,800.00",
        "03/03/2024,Transfer in,,500.00,1300.00",
        "04/03/2024,Bank charge,10.00,,1290.00",
        "05/03/2024,Transfer out,90.00,,1200.00",
    ]));
    assert_eq!(v["chain"]["mode"], "dcb");
    assert_eq!(v["chain"]["ok"], 4);
    assert_eq!(v["chain"]["flagged"], 0);
    assert_eq!(v["txns"].as_array().unwrap().len(), 4);
}

#[test]
fn misread_amount_is_repaired_from_balance() {
    // 500.00 was read as 600.00 but the balances agree with each other
    let v = run(&csv(&[
        "01/03/2024,Opening Balance,,,1000.00",
        "02/03/2024,POS,200.00,,800.00",
        "03/03/2024,Transfer in,,600.00,1300.00",
        "04/03/2024,Charge,10.00,,1290.00",
        "05/03/2024,Out,90.00,,1200.00",
    ]));
    assert_eq!(v["chain"]["repaired"], 1);
    assert_eq!(v["txns"][1]["credit"], 500.0);
    assert_eq!(v["txns"][1]["status"], "repaired");
}

#[test]
fn misread_balance_is_repaired_from_amount() {
    // balance of row 2 misread (1300 -> 1380); next row proves the amount was right
    let v = run(&csv(&[
        "01/03/2024,Opening Balance,,,1000.00",
        "02/03/2024,POS,200.00,,800.00",
        "03/03/2024,Transfer in,,500.00,1380.00",
        "04/03/2024,Charge,10.00,,1290.00",
        "05/03/2024,Out,90.00,,1200.00",
    ]));
    assert_eq!(v["txns"][1]["balance"], 1300.0);
    assert_eq!(v["txns"][1]["status"], "repaired");
}

#[test]
fn unfixable_row_is_flagged_not_hidden() {
    let v = run(&csv(&[
        "01/03/2024,Opening Balance,,,1000.00",
        "02/03/2024,POS,200.00,,800.00",
        "03/03/2024,In,,500.00,1300.00",
        "04/03/2024,Mystery,,500.00,9999.00",
        "05/03/2024,Charge,10.00,,5.00",
        "06/03/2024,Out,90.00,,4915.00",
        "07/03/2024,More,10.00,,4905.00",
    ]));
    assert!(v["chain"]["flagged"].as_u64().unwrap() >= 1);
    assert_eq!(v["chain"]["closes"], false);
}

#[test]
fn newest_first_is_put_in_date_order() {
    let v = run(&csv(&[
        "05/03/2024,Out,90.00,,1200.00",
        "04/03/2024,Charge,10.00,,1290.00",
        "03/03/2024,In,,500.00,1300.00",
        "02/03/2024,POS,200.00,,800.00",
        "01/03/2024,Start,,1000.00,1000.00",
    ]));
    assert_eq!(v["chain"]["order"], "newest-first");
    assert_eq!(v["txns"][0]["date"], "2024-03-01");
    assert_eq!(v["chain"]["flagged"], 0);
}

#[test]
fn single_signed_amount_column() {
    let s = "Date,Description,Amount,Balance\n20/03/2024,Deposit,1000.00,1000.00\n21/03/2024,Save,-1000.00,0.00\n22/03/2024,Deposit,3000.00,3000.00\n23/03/2024,Save,-3000.00,0.00\n24/03/2024,Deposit,500.00,500.00\n";
    let v = run(s);
    assert_eq!(v["chain"]["mode"], "amount");
    assert_eq!(v["txns"][1]["debit"], 1000.0);
}

#[test]
fn credit_before_debit_columns_are_found_by_the_chain() {
    let s = "Date,Narration,Credit,Debit,Balance\n01/03/2024,Opening Balance,,,1000.00\n02/03/2024,A,,200.00,800.00\n03/03/2024,B,500.00,,1300.00\n04/03/2024,C,,300.00,1000.00\n05/03/2024,D,50.00,,1050.00\n";
    let v = run(s);
    assert_eq!(v["txns"][0]["debit"], 200.0);
    assert_eq!(v["txns"][1]["credit"], 500.0);
}

#[test]
fn us_dates_detected() {
    let v = run(&csv(&[
        "03/13/2024,Open,,,100.00",
        "03/14/2024,A,10.00,,90.00",
        "03/15/2024,B,10.00,,80.00",
        "03/16/2024,C,,20.00,100.00",
    ]));
    assert_eq!(v["meta"]["date_order"], "mdy");
}

#[test]
fn garbage_input_does_not_panic() {
    let v = run("hello\nworld\n");
    assert_eq!(v["txns"].as_array().unwrap().len(), 0);
    let w: serde_json::Value = serde_json::from_str(&analyze_words("not json")).unwrap();
    assert!(w["error"].is_string());
}
