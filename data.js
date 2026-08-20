// ============================================================
// data.js — All static content: lessons, topics, tips,
// opinions, search index, trending, sample nuggets
// Butterfly Dynamix Learning Platform
// ============================================================

// ── ACCOUNTING TOPICS ────────────────────────────────────────
const accountingTopics = [
  {
    key:'biz-acc-vol1',
    icon:'📘',
    name:'Business Accounting · Volume 1',
    desc:'Double entry, trading & profit and loss accounts, balance sheets and accounting concepts — beginner to advanced',
    status:'available',
    lessons:55
  },
];

// ── DAILY TIPS ───────────────────────────────────────────────
const searchIndex = [
  'Accounting equation','Accruals concept','Assets','Balance sheet','Bookkeeping',
  'Capital','Carriage inwards','Carriage outwards','Cash flow','Companies income tax',
  'Cost of goods sold','Credit','Current assets','Current liabilities','Debit',
  'Debtor','Depreciation','Double entry','Drawings','Equity','Fixed assets',
  'Going concern','Gross profit','Historical cost','IFRS','Liabilities',
  'Materiality','Net profit','Prepayments','Profit and loss account',
  'Provision for doubtful debts','Prudence concept','Realisation concept',
  'Returns inwards','Returns outwards','Revenue','Stock','T-account',
  'Trade payables','Trade receivables','Trial balance','VAT','Working capital',
];

// ── SEARCH QUESTION ANSWERS ──────────────────────────────────
// Full answer + scenario + knowledge check for every rotating
// search-bar question, keyed by the exact question text. Clicking
// a question in the search bar looks itself up here — this is
// completely separate from trackData, so nothing here links to
// or navigates into actual lesson content.
const searchQuestionAnswers = {
  'What is depreciation?': {
    answer: 'Depreciation is the gradual reduction in the value of a fixed asset over its useful life, as it wears out or becomes outdated. It spreads the cost of an asset across the years it\'s actually used, rather than charging it all in the year it was bought.',
    scenario: 'A delivery business buys a van for ₦4,000,000, expected to last 5 years. Instead of treating the full ₦4,000,000 as a Year 1 expense, it spreads ₦800,000 of cost into each of the 5 years the van is actually used.',
    quiz: { q: 'Why is the cost of a fixed asset spread out as depreciation instead of being expensed all at once?', opts: ['Because tax law requires it for every business', 'Because the asset is used over several years, so its cost should be matched to each year it helps generate revenue', 'Because spreading the cost makes the business look more profitable', 'Because depreciation increases the value of the asset over time'], ans: 1, exp: 'Depreciation matches the cost of a long-lasting asset to the periods it\'s actually used in, following the same matching idea as the accruals concept — not a tax trick or a way to inflate profit.' }
  },
  'What is an asset?': {
    answer: 'An asset is anything a business owns or is owed that has value and is expected to bring future economic benefit — cash, stock, equipment, buildings, or amounts customers owe.',
    scenario: 'A small printing business owns a printer (₦600,000), has ₦80,000 in its account, and is owed ₦25,000 by a client for a recent job. All three — the printer, the cash, and the amount owed — are assets.',
    quiz: { q: 'Which of these is correctly classified as an asset?', opts: ['Money the business owes a supplier', 'An amount a customer still owes the business for goods delivered', 'Rent paid for the office last month', 'A loan the business took from a bank'], ans: 1, exp: 'Money owed TO the business by a customer is a debtor — an asset. Amounts the business owes others (suppliers, banks) are liabilities, not assets.' }
  },
  'How do you account for bad debts?': {
    answer: 'A bad debt is an amount owed to the business that\'s now considered unrecoverable — the customer won\'t pay. It\'s written off as an expense, reducing both profit and the debtor\'s balance on the books, since the business can no longer count that amount as an asset.',
    scenario: 'A wholesaler is owed ₦150,000 by a retailer who has since shut down and can\'t be traced. Rather than keep showing ₦150,000 as an asset that will never actually be collected, the wholesaler writes it off as a bad debt expense.',
    quiz: { q: 'Why does writing off a bad debt reduce the business\'s profit?', opts: ['Because the cash was never actually received in the first place', 'Because an amount that was previously recorded as a debtor (an asset) turns out to be uncollectible, so it must be removed and treated as an expense', 'Because bad debts are illegal and must be penalised in the accounts', 'Because the customer needs to be charged a penalty fee'], ans: 1, exp: 'The sale and the debtor were recorded as if the money would eventually come in. When it becomes clear it won\'t, that asset is removed and recognised as a real cost to the business — a bad debt expense.' }
  },
  'What is the accounting equation?': {
    answer: 'The accounting equation states that Assets = Liabilities + Equity. Everything a business owns (assets) was funded either by borrowing (liabilities) or by the owner\'s own investment (equity) — so the two sides always balance.',
    scenario: 'A trader starts a business with ₦500,000 of her own savings and a ₦300,000 bank loan, giving her ₦800,000 in assets. Liabilities (₦300,000) plus Equity (₦500,000) equal exactly ₦800,000 — the equation holds.',
    quiz: { q: 'A business has ₦3,000,000 in assets and ₦1,100,000 in liabilities. What is its equity?', opts: ['₦1,100,000', '₦1,900,000', '₦4,100,000', '₦3,000,000'], ans: 1, exp: 'Equity = Assets − Liabilities = ₦3,000,000 − ₦1,100,000 = ₦1,900,000. This is simply the accounting equation rearranged.' }
  },
  'What is the difference between debit and credit?': {
    answer: 'Debit and credit are the two sides of every accounting entry. A debit increases assets and expenses (and decreases liabilities, equity, and income); a credit does the opposite — it increases liabilities, equity, and income (and decreases assets and expenses). Every transaction has equal debits and credits.',
    scenario: 'When a shop makes a ₦20,000 cash sale, Cash (an asset) is debited ₦20,000 because it\'s increasing, and Sales (income) is credited ₦20,000 because income is increasing too.',
    quiz: { q: 'When a business pays ₦50,000 cash to a supplier, what\'s the correct entry?', opts: ['Debit Cash, Credit Supplier', 'Debit Supplier, Credit Cash', 'Debit Cash, Debit Supplier', 'Credit Cash, Credit Supplier'], ans: 1, exp: 'The supplier (a liability) is decreasing, so it\'s debited. Cash (an asset) is decreasing too, so it\'s credited. Debits still equal credits — ₦50,000 each side.' }
  },
  'What is a balance sheet?': {
    answer: 'A balance sheet is a snapshot, at one specific date, of everything a business owns (assets), owes (liabilities), and what\'s left for the owner (equity). It shows financial position, not performance over a period.',
    scenario: 'At the end of December, a business draws up a balance sheet showing ₦2,000,000 in assets, ₦700,000 in liabilities, and ₦1,300,000 in equity — exactly as things stood on that one day.',
    quiz: { q: 'What does a balance sheet primarily show?', opts: ['How much profit a business made over the year', 'The business\'s financial position — what it owns and owes — at one specific point in time', 'A list of every transaction made during the year', 'The cash a business expects to receive next month'], ans: 1, exp: 'A balance sheet is a snapshot at a single date, unlike a profit and loss account, which covers performance over a period of time.' }
  },
  'How do you calculate gross profit?': {
    answer: 'Gross profit is Sales (Revenue) minus Cost of Goods Sold — the direct cost of the goods that were sold. It shows how much a business makes from its core trading activity, before other operating expenses are deducted.',
    scenario: 'A shop sells goods for ₦900,000 in a month. Those goods cost the shop ₦550,000 to buy. Gross profit is ₦900,000 − ₦550,000 = ₦350,000, before rent, salaries, or any other expenses are considered.',
    quiz: { q: 'A business has sales of ₦1,200,000 and cost of goods sold of ₦750,000. What is the gross profit?', opts: ['₦1,950,000', '₦450,000', '₦750,000', '₦1,200,000'], ans: 1, exp: 'Gross Profit = Sales − Cost of Goods Sold = ₦1,200,000 − ₦750,000 = ₦450,000.' }
  },
  'What is double entry bookkeeping?': {
    answer: 'Double entry bookkeeping is the principle that every transaction affects at least two accounts — one debit and one equal credit — so the books always stay in balance. It\'s the foundation that modern accounting is built on.',
    scenario: 'When a business buys ₦100,000 of stock on credit, Stock (an asset) is debited ₦100,000, and the Supplier account (a liability) is credited ₦100,000. Both sides moved together, and the books stay balanced.',
    quiz: { q: 'What is the core idea behind double entry bookkeeping?', opts: ['Every transaction must be recorded twice in the same account', 'Every transaction affects at least two accounts, with equal and offsetting debits and credits', 'Every business must keep two separate sets of books', 'Transactions are recorded once when cash is received and once when it\'s spent'], ans: 1, exp: 'Double entry means recording the two-sided effect of every transaction — one debit, one equal credit — not literally writing the same thing twice.' }
  },
  'What is working capital?': {
    answer: 'Working capital is the difference between a business\'s current assets and its current liabilities. It shows whether a business has enough short-term resources — cash, stock, debtors — to cover what it owes in the near term.',
    scenario: 'A business has ₦600,000 in current assets (cash, stock, debtors) and ₦400,000 in current liabilities (amounts due to suppliers soon). Its working capital is ₦200,000 — a cushion to meet short-term obligations.',
    quiz: { q: 'What does positive working capital generally indicate about a business?', opts: ['The business is definitely profitable', 'The business has enough short-term assets to cover its short-term liabilities', 'The business owns valuable long-term assets like buildings', 'The business has no debt at all'], ans: 1, exp: 'Working capital is purely about short-term liquidity — current assets versus current liabilities — not overall profitability or long-term asset ownership.' }
  },
  'What is the accruals concept?': {
    answer: 'The accruals concept says that income and expenses should be recorded when they\'re earned or incurred — not necessarily when cash actually changes hands. Profit is matched to the period it relates to, regardless of payment timing.',
    scenario: 'A consultant does ₦200,000 of work in December but isn\'t paid until January. Under accruals, the ₦200,000 is recorded as December income, because that\'s when the work — and the income — was actually earned.',
    quiz: { q: 'Under the accruals concept, when should an expense be recorded?', opts: ['Only when cash is actually paid out', 'When the expense is incurred, regardless of when it\'s paid for', 'At the end of the financial year, regardless of when it happened', 'Only if the amount is confirmed by a receipt'], ans: 1, exp: 'Accruals matches expenses (and income) to the period they relate to, not the period the cash happens to move in — that timing difference is the whole point of the concept.' }
  },
  'What is a trial balance?': {
    answer: 'A trial balance is a list of every account in the ledger and its balance, with all debit balances in one column and all credit balances in another. If double entry has been done correctly, the two columns add up to the same total.',
    scenario: 'At month end, a bookkeeper lists every account — Cash, Sales, Stock, Supplier, and so on — with its balance. The debit column totals ₦1,450,000 and the credit column also totals ₦1,450,000, confirming the books balance.',
    quiz: { q: 'What does it mean if a trial balance\'s debit and credit totals don\'t match?', opts: ['The business has made a loss for the period', 'There is likely an error somewhere in the double entry recording', 'The business has too many current liabilities', 'Nothing — small mismatches are normal and can be ignored'], ans: 1, exp: 'A trial balance that doesn\'t balance signals a recording error — perhaps a transaction posted only once, or with mismatched amounts — that needs to be found and corrected.' }
  },
  'What is the difference between capital and revenue expenditure?': {
    answer: 'Capital expenditure buys or improves a long-term asset that will benefit the business for years, like machinery or a building. Revenue expenditure covers the day-to-day running costs of the business, like rent, wages, or stock — benefits used up within the current period.',
    scenario: 'A bakery spends ₦1,500,000 on a new industrial oven (capital expenditure — it\'ll be used for years) and ₦80,000 on flour for this month\'s baking (revenue expenditure — used up almost immediately).',
    quiz: { q: 'Which of the following is correctly classified as capital expenditure?', opts: ['Monthly salaries paid to staff', 'Purchase of a new delivery van expected to last several years', 'Electricity bill for the current month', 'Stock purchased for resale this month'], ans: 1, exp: 'A delivery van is a long-term asset that will benefit the business over several years — that\'s capital expenditure. Salaries, electricity, and stock for resale are all revenue expenditure.' }
  },
  'What is a current liability?': {
    answer: 'A current liability is an amount a business owes that is due to be paid within one year — such as amounts owed to suppliers, short-term loans, or accrued expenses. It\'s distinct from long-term liabilities due further in the future.',
    scenario: 'A shop owes ₦120,000 to a supplier, due in 30 days, and has a ₦2,000,000 mortgage on its building, due over 15 years. The supplier amount is a current liability; the mortgage is mostly a long-term one.',
    quiz: { q: 'Which of these is an example of a current liability?', opts: ['A 10-year bank loan used to buy a building', 'An amount owed to a supplier, due for payment within 30 days', 'The value of equipment the business owns', 'Cash held in the business\'s bank account'], ans: 1, exp: 'A current liability is due within one year. The supplier amount fits that; a 10-year loan does not, equipment and cash aren\'t liabilities at all.' }
  },
  'How do you calculate cost of goods sold?': {
    answer: 'Cost of Goods Sold (COGS) is calculated as Opening Stock + Purchases − Closing Stock. It represents the actual cost of the goods that were sold during the period, not simply everything that was bought.',
    scenario: 'A shop starts the month with ₦200,000 of stock, buys ₦600,000 more during the month, and ends with ₦150,000 of stock left unsold. COGS = ₦200,000 + ₦600,000 − ₦150,000 = ₦650,000.',
    quiz: { q: 'A business has opening stock of ₦100,000, purchases of ₦500,000, and closing stock of ₦80,000. What is the cost of goods sold?', opts: ['₦680,000', '₦520,000', '₦600,000', '₦420,000'], ans: 1, exp: 'COGS = Opening Stock + Purchases − Closing Stock = ₦100,000 + ₦500,000 − ₦80,000 = ₦520,000.' }
  },
  'What is the going concern concept?': {
    answer: 'The going concern concept assumes a business will continue operating for the foreseeable future, rather than being shut down or liquidated soon. This assumption is why assets are valued at cost rather than forced-sale prices, among other things.',
    scenario: 'An accountant preparing a business\'s accounts assumes it will keep trading next year, so equipment is valued at what it cost less depreciation — not at a fire-sale price, which would only apply if the business were closing down.',
    quiz: { q: 'Why does the going concern assumption matter when valuing a business\'s assets?', opts: ['It means assets should always be valued at their original purchase price forever', 'It justifies valuing assets at cost (less depreciation) rather than at quick-sale prices, since the business is assumed to keep operating normally', 'It means a business never needs to record depreciation', 'It only applies to businesses that are about to close down'], ans: 1, exp: 'Going concern is the assumption of continued operation — it\'s precisely why assets are NOT valued as if everything had to be sold off urgently.' }
  },
  'What is a creditor?': {
    answer: 'A creditor is a person or business that the company owes money to — typically a supplier who has delivered goods or services on credit, not yet paid for. Creditors are a liability on the balance sheet.',
    scenario: 'A furniture maker buys ₦300,000 of timber on credit from a supplier, agreeing to pay in 45 days. Until that payment is made, the supplier is a creditor of the furniture maker.',
    quiz: { q: 'What does it mean for a supplier to be a creditor of a business?', opts: ['The supplier owes the business money', 'The business owes the supplier money for goods or services already received', 'The supplier is also a customer of the business', 'The supplier has lent the business cash directly'], ans: 1, exp: 'A creditor is owed money BY the business — the opposite of a debtor, who owes money TO the business.' }
  },
  'What is the prudence concept?': {
    answer: 'The prudence concept says that when there\'s uncertainty, a business should not overstate profits or assets, and should not understate liabilities or expenses. Anticipated losses should be recognised early, while gains should only be recorded once they\'re reasonably certain.',
    scenario: 'A business is being sued and expects to lose, with a likely payout of ₦500,000. Under prudence, it provides for this expected loss now, rather than waiting until the case is actually settled.',
    quiz: { q: 'Which of these best reflects the prudence concept in practice?', opts: ['Recording expected future profits as soon as a deal looks likely', 'Recognising a probable future loss as soon as it becomes likely, even before it\'s certain', 'Always valuing assets at their highest possible market price', 'Ignoring uncertain outcomes until they\'re fully resolved'], ans: 1, exp: 'Prudence means leaning toward caution — recognise probable losses early, but don\'t record gains until they\'re reasonably assured. It guards against overly optimistic accounts.' }
  },
  'How do you calculate net profit?': {
    answer: 'Net profit is calculated as Gross Profit minus all other operating expenses — rent, salaries, utilities, and so on. It shows the true overall profit of the business, after every cost of running it has been deducted.',
    scenario: 'A business has gross profit of ₦400,000. After paying ₦120,000 in rent, ₦90,000 in salaries, and ₦30,000 in other expenses (₦240,000 total), net profit is ₦400,000 − ₦240,000 = ₦160,000.',
    quiz: { q: 'A business has gross profit of ₦550,000 and total operating expenses of ₦310,000. What is the net profit?', opts: ['₦860,000', '₦240,000', '₦310,000', '₦550,000'], ans: 1, exp: 'Net Profit = Gross Profit − Operating Expenses = ₦550,000 − ₦310,000 = ₦240,000.' }
  },
  'What is carriage inwards?': {
    answer: 'Carriage inwards is the cost of transporting goods purchased by the business to its own premises. Because it\'s a direct cost of getting goods ready for sale, it\'s added to the cost of purchases when calculating cost of goods sold.',
    scenario: 'A shop buys ₦400,000 of stock from a supplier and pays an extra ₦15,000 to have it delivered to the shop. That ₦15,000 carriage inwards is added to the ₦400,000, making the total cost of stock ₦415,000.',
    quiz: { q: 'How is carriage inwards treated in the accounts?', opts: ['As a selling expense, separate from the cost of stock', 'Added to the cost of purchases, since it\'s part of getting the goods ready for sale', 'Deducted from sales revenue', 'Ignored, since it\'s not a real cost'], ans: 1, exp: 'Carriage inwards is a direct cost of acquiring stock, so it\'s added to purchases — increasing cost of goods sold, not treated as a separate selling expense.' }
  },
  'What is a T-account?': {
    answer: 'A T-account is a simple visual way of representing a ledger account, shaped like the letter T — debits recorded on the left side, credits on the right. It\'s used to track how a single account\'s balance changes over time.',
    scenario: 'To track Cash, a bookkeeper draws a T-account: every cash received is listed on the left (debit) side, and every cash paid out on the right (credit) side, making it easy to see the running balance.',
    quiz: { q: 'In a T-account, on which side are debit entries recorded?', opts: ['The right side', 'The left side', 'Debits and credits are mixed together on both sides', 'There is no fixed side — it depends on the account type'], ans: 1, exp: 'By convention, debits always go on the left side of a T-account and credits on the right, regardless of which type of account it is.' }
  },
  'What is the materiality principle?': {
    answer: 'The materiality principle says that only information significant enough to influence a user\'s decisions needs to be recorded and disclosed with full precision. Very small, insignificant amounts can be treated more simply without distorting the accounts.',
    scenario: 'A large company buys a ₦3,000 stapler. Strictly, it\'s a fixed asset that should be depreciated over years — but its value is so small (immaterial) that the company simply expenses it immediately instead, since it makes no real difference to anyone reading the accounts.',
    quiz: { q: 'What does the materiality principle allow a business to do?', opts: ['Ignore large transactions if they are inconvenient to record', 'Treat genuinely insignificant amounts more simply, since they wouldn\'t change a decision-maker\'s view of the accounts', 'Avoid preparing a balance sheet altogether', 'Record all transactions at whatever value management prefers'], ans: 1, exp: 'Materiality is about proportionality — small, insignificant amounts don\'t need the same rigorous treatment as amounts large enough to actually affect decisions.' }
  },
  'What is the difference between gross profit and net profit?': {
    answer: 'Gross profit is sales minus the direct cost of goods sold — profit from core trading alone. Net profit goes further, deducting all other operating expenses (rent, salaries, utilities) too, showing the true overall profit after everything is accounted for.',
    scenario: 'A shop has gross profit of ₦500,000 from trading. After paying ₦200,000 in rent, salaries, and other expenses, net profit is ₦300,000 — a smaller, more complete picture of what the business actually earned.',
    quiz: { q: 'Why is net profit usually lower than gross profit?', opts: ['Because net profit is calculated before any sales are made', 'Because net profit additionally deducts operating expenses like rent and salaries, beyond just the cost of goods sold', 'Because net profit only applies to large companies', 'Net profit is not actually different from gross profit'], ans: 1, exp: 'Gross profit stops at cost of goods sold; net profit continues on to deduct every other operating expense, which is why it\'s typically a smaller figure.' }
  },
  'What are drawings?': {
    answer: 'Drawings are money or goods that the owner takes out of the business for personal use — not a business expense, but a reduction of the owner\'s equity in the business.',
    scenario: 'A sole trader takes ₦50,000 from the business account to pay a personal bill. This isn\'t a business expense like rent — it\'s drawings, reducing how much equity the owner has tied up in the business.',
    quiz: { q: 'How are drawings treated in the accounts?', opts: ['As a business expense, reducing net profit', 'As a reduction in the owner\'s equity, not a business expense', 'As an increase in business liabilities', 'They have no effect on the accounts at all'], ans: 1, exp: 'Drawings reduce the owner\'s equity (what they have invested in the business) — they are not an operating expense of the business itself.' }
  },
  'What is the historical cost concept?': {
    answer: 'The historical cost concept says that assets should be recorded at their original purchase price, not their current market value. This keeps accounting records objective and verifiable, based on an actual transaction rather than an estimate.',
    scenario: 'A business bought land 10 years ago for ₦2,000,000. Even though it\'s now worth ₦8,000,000, the historical cost concept means it stays recorded on the books at the original ₦2,000,000 cost.',
    quiz: { q: 'Why does historical cost record assets at their original purchase price rather than current market value?', opts: ['Because market values are always lower than purchase price', 'Because the original cost is an objective, verifiable amount based on an actual transaction, rather than a subjective estimate', 'Because market value is illegal to use in accounting', 'Because assets never change in value over time'], ans: 1, exp: 'Historical cost prioritises objectivity and verifiability — an actual amount paid — over a market value that can be uncertain or subjective to estimate.' }
  },
  'How do returns inwards affect sales?': {
    answer: 'Returns inwards (also called sales returns) are goods that customers send back to the business. They are deducted from gross sales to arrive at net sales, since the business no longer earns revenue on goods that were returned.',
    scenario: 'A shop makes ₦500,000 in sales during the month, but customers return ₦30,000 of faulty goods. Net sales for the month are ₦500,000 − ₦30,000 = ₦470,000.',
    quiz: { q: 'What effect do returns inwards have on a business\'s sales figures?', opts: ['They increase total sales revenue', 'They are deducted from gross sales to give net sales', 'They have no effect on sales, only on stock', 'They are added to cost of goods sold'], ans: 1, exp: 'Returns inwards reduce the sales figure — the business isn\'t keeping revenue for goods that were sent back, so they\'re subtracted to find net sales.' }
  },
  'What is the realisation concept?': {
    answer: 'The realisation concept says that revenue should only be recorded once it is earned — typically when goods or services have actually been delivered to the customer — not simply when an order is placed or cash is received in advance.',
    scenario: 'A customer pays a deposit in March for furniture to be delivered in May. Under the realisation concept, the revenue isn\'t recorded in March — it\'s recorded in May, once the furniture is actually delivered and the sale is truly complete.',
    quiz: { q: 'Under the realisation concept, when should revenue typically be recognised?', opts: ['As soon as an order is placed by a customer', 'When the goods or services have actually been delivered to the customer', 'Only once the cash is fully spent by the business', 'At the very end of the financial year, regardless of delivery'], ans: 1, exp: 'Realisation ties revenue recognition to delivery of the goods or service — the point at which the business has actually earned it — not to the order date or cash receipt alone.' }
  },
  'What is the dual aspect concept?': {
    answer: 'The dual aspect concept is the idea that every transaction has two effects on the accounting equation, which must always stay in balance. It\'s the underlying logic behind double entry bookkeeping — nothing happens on one side without an equal effect on the other.',
    scenario: 'When a business takes a ₦200,000 loan, cash (an asset) increases by ₦200,000 AND liabilities increase by ₦200,000 at the same time — two effects from one transaction, keeping the equation balanced.',
    quiz: { q: 'What does the dual aspect concept explain?', opts: ['That every transaction must be recorded in two separate sets of books', 'That every transaction has two effects on the accounting equation that must balance each other', 'That businesses must have two owners', 'That assets must always equal exactly twice the liabilities'], ans: 1, exp: 'Dual aspect is the principle that transactions always have two balancing effects — this is the theoretical foundation that double entry bookkeeping puts into practice.' }
  },
  'What is a debtor?': {
    answer: 'A debtor is a customer or other party who owes money to the business — typically for goods or services already delivered but not yet paid for. Debtors are recorded as an asset, since the business expects to receive that money.',
    scenario: 'A wholesaler delivers ₦80,000 of goods to a retailer who agrees to pay in 30 days. Until payment is made, that retailer is a debtor of the wholesaler, and the ₦80,000 is recorded as an asset.',
    quiz: { q: 'Why is a debtor recorded as an asset on the balance sheet?', opts: ['Because the business owes that amount to someone else', 'Because the business expects to receive that money in the future, making it a resource of value', 'Because debtors always pay in cash immediately', 'Debtors are not actually assets, they are liabilities'], ans: 1, exp: 'A debtor represents money owed TO the business, which it expects to collect — that future economic benefit is exactly what makes it an asset.' }
  },
  'What is the business entity concept?': {
    answer: 'The business entity concept treats a business as completely separate from its owner, for accounting purposes — even if legally (as a sole trader) they are the same person. Only the business\'s own transactions are recorded in its books.',
    scenario: 'A shop owner buys a personal phone with his own money, unrelated to the shop. Under the business entity concept, this purchase does not appear in the shop\'s accounts at all — it\'s a personal transaction, not a business one.',
    quiz: { q: 'Why does the business entity concept matter, even for a one-person sole trader business?', opts: ['Because sole traders are legally required to have a separate bank account', 'Because it keeps the business\'s own financial position clear and separate from the owner\'s personal finances, even though legally they\'re the same person', 'Because it only applies to large limited companies', 'Because it means the owner is no longer personally liable for the business'], ans: 1, exp: 'The business entity concept is purely an accounting separation — keeping business transactions distinct from personal ones — regardless of the legal relationship between owner and business.' }
  },
  'How do you calculate working capital?': {
    answer: 'Working capital is calculated as Current Assets minus Current Liabilities. It shows whether a business has enough short-term resources available to cover what it owes in the near term.',
    scenario: 'A business has current assets of ₦900,000 (cash, stock, debtors) and current liabilities of ₦650,000 (amounts due soon). Working capital = ₦900,000 − ₦650,000 = ₦250,000.',
    quiz: { q: 'A business has current assets of ₦700,000 and current liabilities of ₦820,000. What is its working capital?', opts: ['₦1,520,000', '-₦120,000', '₦120,000', '₦700,000'], ans: 1, exp: 'Working Capital = Current Assets − Current Liabilities = ₦700,000 − ₦820,000 = -₦120,000 — a negative figure, signalling a potential short-term liquidity problem.' }
  },
  'What is the difference between a creditor and a debtor?': {
    answer: 'A creditor is someone the business owes money to (a liability); a debtor is someone who owes money to the business (an asset). They sit on opposite sides of the balance sheet.',
    scenario: 'A bakery owes ₦60,000 to its flour supplier (a creditor) and is owed ₦25,000 by a restaurant it supplies bread to on credit (a debtor) — one is money out, the other money in.',
    quiz: { q: 'Which statement correctly distinguishes a creditor from a debtor?', opts: ['A creditor owes the business money, a debtor is owed money by the business', 'A creditor is owed money by the business, a debtor owes the business money', 'Creditors and debtors are different names for the same thing', 'Only large businesses can have creditors or debtors'], ans: 1, exp: 'It\'s easy to mix these up — remember a creditor is owed money (liability to the business), while a debtor owes money (asset of the business).' }
  },
  'How is carriage outwards treated in the accounts?': {
    answer: 'Carriage outwards is the cost of delivering goods to customers after they\'ve been sold. Unlike carriage inwards, it is NOT added to the cost of goods — it\'s treated as a selling and distribution expense, deducted when calculating net profit.',
    scenario: 'A furniture business sells a sofa and pays ₦8,000 to deliver it to the customer\'s home. That ₦8,000 carriage outwards is a selling expense, separate from the cost of making the sofa.',
    quiz: { q: 'Why is carriage outwards treated differently from carriage inwards?', opts: ['They are actually treated exactly the same way', 'Carriage outwards relates to delivering already-sold goods to customers, so it\'s a selling expense, not part of the cost of acquiring stock', 'Carriage outwards is always larger in amount than carriage inwards', 'Carriage outwards is illegal to record separately'], ans: 1, exp: 'Carriage inwards is about getting goods ready for sale (added to stock cost). Carriage outwards happens after the sale is made, so it\'s a distribution expense instead.' }
  },
  'What is the money measurement concept?': {
    answer: 'The money measurement concept says that only transactions and events that can be expressed in monetary terms are recorded in the accounts. Things like staff morale or brand reputation, however real and valuable, aren\'t recorded because they can\'t be reliably measured in money.',
    scenario: 'A business has a highly skilled, loyal workforce — genuinely valuable, but this isn\'t recorded as an asset on the balance sheet, because it can\'t be objectively measured in monetary terms the way a building or stock can.',
    quiz: { q: 'Why isn\'t something like staff morale recorded as an asset in the accounts?', opts: ['Because staff morale has no real value to a business', 'Because it cannot be reliably expressed in monetary terms, which the money measurement concept requires', 'Because only liabilities are recorded in accounts, not assets', 'Because staff morale is recorded as a liability instead'], ans: 1, exp: 'Money measurement limits accounting records to things that can be objectively quantified in monetary terms — real but unquantifiable factors like morale fall outside that boundary.' }
  },
  'What is a trading and profit and loss account?': {
    answer: 'A trading and profit and loss account calculates a business\'s profit for a period in two stages: the trading account works out gross profit (sales minus cost of goods sold), and the profit and loss account continues on to net profit (deducting other operating expenses).',
    scenario: 'A business\'s trading account shows sales of ₦800,000 and cost of goods sold of ₦500,000, giving gross profit of ₦300,000. The profit and loss section then deducts ₦180,000 of expenses, arriving at net profit of ₦120,000.',
    quiz: { q: 'What is the relationship between the trading account and the profit and loss account?', opts: ['They are unrelated and prepared completely separately', 'The trading account calculates gross profit, which then flows into the profit and loss account to calculate net profit', 'The profit and loss account is prepared first, then the trading account', 'They both calculate exactly the same figure'], ans: 1, exp: 'The two work together as one combined statement — trading account first (to gross profit), then profit and loss continues from there (to net profit).' }
  },
  'How do you calculate gross loss?': {
    answer: 'A gross loss occurs when the cost of goods sold is greater than sales revenue — the opposite of gross profit. It\'s calculated the same way: Sales minus Cost of Goods Sold, just resulting in a negative figure.',
    scenario: 'A struggling shop sells ₦300,000 of goods that cost it ₦380,000 to buy. Gross loss = ₦300,000 − ₦380,000 = -₦80,000 — it lost money on trading before any other expenses are even considered.',
    quiz: { q: 'A business has sales of ₦450,000 and cost of goods sold of ₦510,000. What is the result?', opts: ['A gross profit of ₦60,000', 'A gross loss of ₦60,000', 'A gross profit of ₦960,000', 'It cannot be calculated from this information'], ans: 1, exp: '₦450,000 − ₦510,000 = -₦60,000. Since cost of goods sold exceeds sales, this is a gross loss of ₦60,000, not a profit.' }
  },
  'What is meant by stock in accounting?': {
    answer: 'Stock (also called inventory) refers to goods a business holds for the purpose of resale, or materials it holds to be used in production. It\'s recorded as a current asset, since it\'s expected to be sold or used within the near future.',
    scenario: 'A shoe shop has ₦350,000 worth of unsold shoes sitting on its shelves at month end. This is stock — a current asset, since it represents goods the business expects to sell soon and convert into cash.',
    quiz: { q: 'Why is stock classified as a current asset?', opts: ['Because it never loses value over time', 'Because it is expected to be sold or used up within the near future, converting into cash or cost of sales', 'Because it is the most valuable asset a business can own', 'Stock is actually classified as a liability, not an asset'], ans: 1, exp: 'Stock is \'current\' because it\'s expected to turn over relatively quickly — sold to customers and converted into cash — unlike long-term fixed assets.' }
  },
  'What is IFRS?': {
    answer: 'IFRS stands for International Financial Reporting Standards — a common set of accounting rules used by companies in many countries so that financial statements are prepared consistently and can be compared across borders.',
    scenario: 'A Nigerian company with international investors prepares its financial statements under IFRS, so that an investor in another country can read and understand them using the same standards they\'re used to, rather than a completely different local system.',
    quiz: { q: 'Why do IFRS standards matter for businesses operating internationally?', opts: ['They are only relevant to government agencies, not private companies', 'They create a common accounting language, making financial statements comparable across different countries', 'They eliminate the need for a business to keep any accounting records', 'They only apply to businesses based in Europe'], ans: 1, exp: 'IFRS exists specifically to create consistency — so financial statements from different countries can be understood and compared on the same basis.' }
  },
  'What is VAT?': {
    answer: 'VAT (Value Added Tax) is a consumption tax added to the price of most goods and services. Businesses collect it from customers on behalf of the government, and can usually reclaim VAT they themselves paid on business purchases.',
    scenario: 'A shop sells goods for ₦100,000 plus 7.5% VAT (₦7,500), charging the customer ₦107,500 in total. The shop collects that ₦7,500 and eventually pays it over to the tax authority — it isn\'t the shop\'s own revenue.',
    quiz: { q: 'When a business collects VAT from a customer, what happens to that money?', opts: ['It becomes extra profit for the business', 'It is collected on behalf of the government and ultimately paid over to the tax authority', 'It is added permanently to the business\'s equity', 'It is treated as a bad debt'], ans: 1, exp: 'VAT collected from customers isn\'t the business\'s income — the business is essentially acting as a collection agent for the government, and remits it accordingly.' }
  },
  'What is substance over form?': {
    answer: 'Substance over form means that transactions should be recorded based on their real economic substance, not just their legal form or how they\'re labelled. If the legal paperwork says one thing but the real economic effect is different, the accounts should reflect what\'s actually happening.',
    scenario: 'A business \'leases\' equipment for 5 years on terms that effectively transfer all the risks and rewards of ownership to it — even though it\'s legally called a lease, substance over form means the accounts may treat it as if the business actually owns the asset.',
    quiz: { q: 'What does the substance over form principle require accountants to prioritise?', opts: ['The legal wording of a contract, above all else', 'The real economic effect of a transaction, even if it differs from its legal label', 'Whichever treatment results in the highest reported profit', 'The preferences of the business owner, regardless of economic reality'], ans: 1, exp: 'Substance over form looks past legal labels to the real economic substance of a transaction — what\'s actually happening financially, not just what the paperwork calls it.' }
  },
};

// ── SEARCH DATABASE ──────────────────────────────────────────
// Deliberately separate from trackData (the actual lesson content).
// Search reads only from here — answers shown in search results do
// not link into lessons, and editing one never affects the other.
const searchDatabase = [
  { term: 'What Is Accounting?', answer: 'Accounting: an action. Accounting is the process of identifying, measuring, recording, classifying, summarising, presenting, and interpreting the financial transactions of a business. It is a numeric language that tells the financial story of a business.' },
  { term: 'Identifying', answer: 'The first step in accounting: recognising which events occurring in a business are actually financial transactions worth capturing, as distinct from events that have no financial effect worth recording.' },
  { term: 'Measuring', answer: 'The step in accounting where a financial transaction, once identified, is expressed in monetary terms — assigning a specific amount of money to what happened.' },
  { term: 'Recording', answer: 'The step in accounting where a measured transaction is written down in the business\'s books or system, creating a permanent, organised record of what happened.' },
  { term: 'Classifying', answer: 'The step in accounting where recorded transactions are sorted into meaningful categories or groups, so that similar items can be looked at together.' },
  { term: 'Summarising', answer: 'The step in accounting where classified transactions are condensed into totals and reports that are far easier to use than looking through every individual transaction.' },
  { term: 'Presenting', answer: 'The step in accounting where summarised financial information is formatted and communicated clearly to the people who need to use it, such as in a financial statement or report.' },
  { term: 'Interpreting', answer: 'The final step in accounting, where the meaning behind the presented financial information is explained — what the numbers actually indicate about the health and performance of the business.' },
  { term: 'Accounting Equation', answer: 'The foundational rule of accounting: Assets = Capital + Liabilities. It can also be written as Capital = Assets − Liabilities. Whichever way it is arranged, both sides always total the same amount.' },
  { term: 'Accruals Concept', answer: 'The idea that profit is the difference between revenues earned and the expenses incurred in earning them, regardless of when cash is actually received or paid. Income and costs are matched to the period they relate to.' },
  { term: 'Assets', answer: 'Resources owned by a business or owed to it, such as buildings, equipment, stock, money in the bank, and amounts customers owe. Assets represent what a business has.' },
  { term: 'Balance Brought Down', answer: 'The opening balance of an account at the start of a new period, carried forward from the closing balance of the previous period. Often abbreviated \'balance b/d\'.' },
  { term: 'Balance Carried Down', answer: 'The figure entered into an account at the end of a period to make both sides add up to the same total. It is then carried forward as the opening balance of the next period. Often abbreviated \'balance c/d\'.' },
  { term: 'Balance Sheet', answer: 'A statement showing the assets, liabilities and capital of a business at one specific point in time — a financial snapshot, not a record of activity over a period.' },
  { term: 'Bookkeeping', answer: 'The part of accounting concerned with recording financial transactions in an organised way, traditionally in \'books\' of accounts.' },
  { term: 'Business Entity Concept', answer: 'The assumption that a business is treated as completely separate from its owner for accounting purposes. Only transactions affecting the business are recorded — the owner\'s personal affairs are not, except where they introduce capital or take drawings.' },
  { term: 'Capital', answer: 'The total value of resources that the owner has invested in and left in the business. It represents the owner\'s stake and increases with profit and new investment, and decreases with losses and drawings.' },
  { term: 'Capital Expenditure', answer: 'Money spent on acquiring or improving long-life assets that will be used in the business over multiple periods, such as buildings, machinery or vehicles.' },
  { term: 'Carriage Inwards', answer: 'The cost of transporting goods purchased into the business. Because it forms part of the real cost of obtaining stock for resale, it is added to purchases when calculating the cost of goods sold.' },
  { term: 'Carriage Outwards', answer: 'The cost of delivering goods sold out to customers. It is treated as a general expense in the profit and loss section of the financial statements, not as part of the cost of goods sold.' },
  { term: 'Cost of Goods Sold', answer: 'The cost of the stock that was actually sold during a period, calculated as opening stock plus purchases (adjusted for carriage inwards and returns) minus closing stock.' },
  { term: 'Credit', answer: 'The right-hand side of an account in the double entry system. Credits increase liabilities, capital and revenue, and decrease assets and expenses.' },
  { term: 'Creditor', answer: 'A person or business to whom money is owed, usually because goods or services have been supplied on credit and not yet paid for.' },
  { term: 'Current Assets', answer: 'Assets that are cash, or are expected to be turned into cash or used up within twelve months, such as stock, debtors, cash at bank and cash in hand. Listed in order of increasing liquidity.' },
  { term: 'Current Liabilities', answer: 'Amounts owed by a business that must be paid within twelve months of the balance sheet date, such as creditors for goods and short-term loans or overdrafts.' },
  { term: 'Debit', answer: 'The left-hand side of an account in the double entry system. Debits increase assets and expenses, and decrease liabilities, capital and revenue.' },
  { term: 'Debtor', answer: 'A person or business that owes money to the business, usually because they have bought goods or services on credit and not yet paid for them.' },
  { term: 'Double Entry Bookkeeping', answer: 'The system of recording every transaction twice — once as a debit in one account and once as an equal credit in another account — so that the accounting equation always remains in balance.' },
  { term: 'Drawings', answer: 'Cash or goods withdrawn from the business by its owner for personal use. Drawings reduce capital but are never treated as a business expense, and are recorded in a separate drawings account.' },
  { term: 'Dual Aspect Concept', answer: 'The principle that every transaction has two effects on the accounting records, which must balance against each other. This is the foundation that double entry bookkeeping is built upon.' },
  { term: 'Equity', answer: 'Another term for the owner\'s capital — the value of the owner\'s stake in the business after liabilities have been accounted for.' },
  { term: 'Expenses', answer: 'The value of assets and services used up by a business in the course of earning its revenue, such as rent, wages, lighting and insurance.' },
  { term: 'Final Accounts', answer: 'An older term for the financial statements produced at the end of an accounting period, including the trading and profit and loss account and the balance sheet. The more modern term is \'financial statements\'.' },
  { term: 'Financial Statements', answer: 'The set of formal reports produced at the end of an accounting period summarising a business\'s performance and position, principally the trading and profit and loss account and the balance sheet.' },
  { term: 'Fixed Assets', answer: 'Assets bought for long-term use in the business rather than for resale, such as land, buildings, machinery and vehicles. They are expected to be of use to the business for a considerable time.' },
  { term: 'Going Concern Concept', answer: 'The assumption, when preparing financial statements, that a business will continue trading for the foreseeable future. This justifies valuing most assets at cost rather than at their forced \'sale up\' value.' },
  { term: 'Gross Loss', answer: 'The result when the cost of goods sold is greater than sales revenue for a period — the trading account shows a deficit before other expenses are even considered.' },
  { term: 'Gross Profit', answer: 'The excess of sales revenue over the cost of goods sold for a period, calculated in the trading account before any other expenses are deducted.' },
  { term: 'Historical Cost Concept', answer: 'The principle that assets are normally recorded and shown in the accounts at the price originally paid for them, rather than at their current market value.' },
  { term: 'Liabilities', answer: 'Amounts owed by a business to outside parties — for goods or services supplied, for expenses not yet paid, or for money borrowed.' },
  { term: 'Loss', answer: 'The result of selling goods or services for less than the cost of providing them — expenses exceed revenue for the period.' },
  { term: 'Materiality', answer: 'The principle that an item only needs to be recorded with full precision if it is significant enough to matter to someone using the financial statements. Trivial items can be treated simply, even if technically inaccurate.' },
  { term: 'Money Measurement Concept', answer: 'The principle that accounting only records facts that can be expressed in monetary terms and on which most people would agree a value — meaning many important non-financial facts about a business never appear in its accounts.' },
  { term: 'Net Loss', answer: 'The result when the cost of goods sold plus all other expenses exceeds total revenue for a period — the final, bottom-line deficit shown in the profit and loss account.' },
  { term: 'Net Profit', answer: 'The amount remaining after all expenses — including those beyond the cost of goods sold — have been deducted from gross profit plus any other revenue. This is the figure transferred to the capital account.' },
  { term: 'Profit', answer: 'The result of selling goods or services for more than they cost to provide — revenue exceeds expenses for the period.' },
  { term: 'Profit and Loss Account', answer: 'The section of the trading and profit and loss account in which net profit (or net loss) is calculated, by deducting expenses other than the cost of goods sold from gross profit.' },
  { term: 'Prudence', answer: 'The principle that an accountant should be cautious when judgement is required — making sure assets and profits are not overstated, and that liabilities and losses are not understated.' },
  { term: 'Purchases', answer: 'In accounting, the goods bought by a business with the intention of reselling them, as distinct from items such as vehicles or equipment which are bought for use rather than resale.' },
  { term: 'Realisation Concept', answer: 'The principle that profit should only be recognised once it has actually been \'realised\' — meaning the goods or services have been provided, a value agreed, and there is reasonable certainty the buyer will pay.' },
  { term: 'Returns Inwards', answer: 'Goods previously sold to customers that have been returned to the business — also called sales returns. They are deducted from sales when calculating gross profit.' },
  { term: 'Returns Outwards', answer: 'Goods previously bought from suppliers that have been returned by the business — also called purchases returns. They are deducted from purchases when calculating the cost of goods sold.' },
  { term: 'Revenue', answer: 'The financial value of goods and services that a business has supplied to its customers during a period — the starting point for calculating profit.' },
  { term: 'Sales', answer: 'In accounting, the income from selling the goods which the business normally deals in and which were bought with the intention of resale — not the disposal of other assets such as vehicles.' },
  { term: 'Separate Determination Concept', answer: 'The principle that the value of each individual asset or liability must be assessed on its own, before being added together into a total — potential gains and losses should not simply be netted off against each other.' },
  { term: 'Stock', answer: 'Goods held by a business with the intention of resale. The value of unsold stock at the end of a period is needed to calculate the cost of goods sold and appears as a current asset on the balance sheet.' },
  { term: 'Substance Over Form', answer: 'The principle that a transaction should be accounted for according to its real economic effect, even if this differs from its strict legal form.' },
  { term: 'T-Account', answer: 'The traditional layout for an individual account in the accounting books, drawn as a large letter \'T\' with the account title across the top, debit entries on the left and credit entries on the right.' },
  { term: 'Time Interval Concept', answer: 'The principle that financial statements are prepared for fixed, regular periods of time — typically a year for external reporting, though management may use shorter periods internally.' },
  { term: 'Trading Account', answer: 'The section of the trading and profit and loss account in which gross profit (or gross loss) is calculated, by deducting the cost of goods sold from sales revenue.' },
  { term: 'Trading and Profit and Loss Account', answer: 'A financial statement combining the trading account and the profit and loss account, showing how a business arrived at its net profit or net loss for a period.' },
  { term: 'Trial Balance', answer: 'A list of all the account balances in a business\'s ledgers at a particular date, arranged into debit and credit columns. If double entry has been carried out correctly, the two columns will total the same amount.' },
  { term: 'Working Capital', answer: 'The amount by which current assets exceed current liabilities — a measure of the short-term resources a business has available for its day-to-day operations. Also called net current assets.' },
];

// ── SEARCH PLACEHOLDER TEXTS ─────────────────────────────────
const searchAnchorPhrase = 'Search topics e.g. depreciation, bookkeeping, VAT...';
const searchQuestionBatches = [
  ['What is depreciation?','What is an asset?','How do you account for bad debts?','What is the accounting equation?','What is the difference between debit and credit?','What is a balance sheet?','How do you calculate gross profit?','What is double entry bookkeeping?','What is working capital?','What is the accruals concept?'],
  ['What is a trial balance?','What is the difference between capital and revenue expenditure?','What is a current liability?','How do you calculate cost of goods sold?','What is the going concern concept?','What is a creditor?','What is the prudence concept?','How do you calculate net profit?','What is carriage inwards?','What is a T-account?'],
  ['What is the materiality principle?','What is the difference between gross profit and net profit?','What are drawings?','What is the historical cost concept?','How do returns inwards affect sales?','What is the realisation concept?','What is the dual aspect concept?','What is a debtor?','What is the business entity concept?','How do you calculate working capital?'],
  ['What is the difference between a creditor and a debtor?','How is carriage outwards treated in the accounts?','What is the money measurement concept?','What is a trading and profit and loss account?','How do you calculate gross loss?','What is meant by stock in accounting?','What is IFRS?','What is VAT?','What is the prudence concept?','What is substance over form?'],
];

// ── SAMPLE NUGGETS (free preview on home page) ───────────────
