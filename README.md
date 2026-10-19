# Statement engine (Rust)

Reads bank statements for the Butterfly Dynamix Master Journal upload.

**Inputs** (all end up in one pipeline)
- word boxes from a PDF text layer or from OCR → `analyze_words(json)`
- Excel → `analyze_xlsx(bytes)`
- CSV → `analyze_csv(text)`

**What it does**
1. Rebuilds the table (rows, columns) from positions.
2. Works out which column is debit / credit / balance by testing which choice makes the
   running balance add up. Credit-before-debit, single signed amount, newest-first and
   US/UK dates are all handled this way.
3. Checks every line against the one before it. A single misread amount or balance is
   repaired when the neighbouring balances prove what it should be; anything else is
   flagged, never hidden.
4. If it cannot make the balances agree, it says so (`chain.mode = "unverified"`) and the
   app falls back to the standard reader.

**Words format** (origin top-left, y grows downward):
`{"words":[{"p":1,"x":10,"y":20,"w":40,"h":8,"t":"01-Aug-2026"}, ...]}`

**Native commands**
```
cargo test --release
cargo run --release --bin stmt -- xlsx file.xlsx
cargo run --release --bin stmt -- csv  file.csv
cargo run --release --bin stmt -- words words.json
```
The GitHub workflow builds the WebAssembly files into `dist/`.
