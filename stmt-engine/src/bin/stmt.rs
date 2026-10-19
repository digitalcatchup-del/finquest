use std::fs;
fn main() {
    let a: Vec<String> = std::env::args().collect();
    if a.len() < 3 {
        eprintln!("usage: stmt <xlsx|csv|words> file");
        std::process::exit(2);
    }
    let out = match a[1].as_str() {
        "xlsx" => stmt_engine::analyze_xlsx(&fs::read(&a[2]).unwrap()),
        "csv" => stmt_engine::analyze_csv(&fs::read_to_string(&a[2]).unwrap()),
        _ => stmt_engine::analyze_words(&fs::read_to_string(&a[2]).unwrap()),
    };
    println!("{out}");
}
