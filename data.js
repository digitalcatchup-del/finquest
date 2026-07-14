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
const dailyTips = [
  {text:'"The market is a device for transferring money from the impatient to the patient."',source:'Warren Buffett · Trading'},
  {text:'"An investment in knowledge pays the best interest."',source:'Benjamin Franklin'},
  {text:'"Risk comes from not knowing what you are doing."',source:'Warren Buffett · Risk Management'},
  {text:'"The four most dangerous words in investing are: this time it\'s different."',source:'Sir John Templeton · Psychology'},
  {text:'"In investing, what is comfortable is rarely profitable."',source:'Robert Arnott · Finance'},
  {text:'"Price is what you pay. Value is what you get."',source:'Warren Buffett · Finance'},
  {text:'"The goal of a successful trader is to make the best trades. Money is secondary."',source:'Alexander Elder · Trading'},
  {text:'"Accounting is the language of business."',source:'Warren Buffett'},
  {text:'"It takes 20 years to build a reputation and five minutes to ruin it."',source:'Warren Buffett · Business'},
  {text:'"The best investment you can make is in yourself."',source:'Warren Buffett · Personal Finance'},
  {text:'"Revenue is vanity, profit is sanity, cash is reality."',source:'Business Proverb · Finance'},
];

// ── SEARCH INDEX ─────────────────────────────────────────────
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
const sampleLessons = {
  acc: [
    {tag:'Free Sample',term:'The Accounting Equation',definition:'Every financial statement traces back to one idea: Assets = Liabilities + Equity. Everything a business owns was funded by borrowing (liabilities) or by owners (equity). This equation always balances.',scenario:'A business buys a ₦500,000 laptop on credit. Assets go up ₦500K. Liabilities go up ₦500K. The equation stays perfectly balanced.',quiz:{question:'A business has ₦2M assets and ₦800K liabilities. What is the equity?',options:['₦800,000','₦1,200,000','₦2,800,000','₦400,000'],correct:1,explanation:'Equity = Assets − Liabilities = ₦2,000,000 − ₦800,000 = ₦1,200,000.'}},
    {tag:'Free Sample',term:'The Accruals Concept',definition:'Profit is revenue earned minus expenses incurred in earning it — matched to the period they relate to — regardless of when cash actually moves.',scenario:'A shop uses ₦60,000 of electricity in December but the bill arrives in January. Under accruals, ₦60,000 is still a December expense because that is when the electricity was used.',quiz:{question:'A business pays ₦240,000 in January for insurance covering the full year. How much is a January expense?',options:['₦240,000','₦20,000','₦0','₦120,000'],correct:1,explanation:'₦240,000 ÷ 12 = ₦20,000. Only January\'s portion is an expense. The rest is a prepayment — an asset.'}},
    {tag:'Free Sample',term:'Double Entry Bookkeeping',definition:'Every financial transaction affects at least two accounts — one debit and one equal credit — so the books always balance. This is the foundation of modern accounting.',scenario:'Amaka buys stock worth ₦50,000 in cash. Stock account is debited ₦50,000 (asset up) and Cash is credited ₦50,000 (asset down). Total debits equal total credits.',quiz:{question:'When a business makes a cash sale of ₦30,000, what is the correct double entry?',options:['Debit Sales, Credit Cash','Debit Cash, Credit Sales','Debit Cash, Debit Sales','Credit Cash, Credit Sales'],correct:1,explanation:'Cash received is an asset increasing — debit Cash. Sales is revenue increasing — credit Sales.'}},
    {tag:'Free Sample',term:'Assets',definition:'Assets are resources a business owns or is owed — buildings, equipment, stock, cash, and amounts customers owe. Assets represent what a business has.',scenario:'A bakery owns an oven (₦800,000), has ₦150,000 cash, and is owed ₦40,000 by a customer. All three are assets, even though only cash is liquid.',quiz:{question:'Which of the following is an asset?',options:['Money the business owes a supplier','Money a customer owes the business','The owner\'s personal car not used in the business','Rent paid for the month'],correct:1,explanation:'Money owed TO the business by a customer is an asset (debtor). Money owed BY the business is a liability.'}},
  ],
};


// ── TRACK DATA ──────────────────────────────────────────────
const trackData = {
  'biz-acc-vol1': {
  title: 'Business Accounting · Volume 1',
  lessons: [
    {id:1, term:'The Accounting Equation', duration:'5 min', pips:2,
      definition:`Assets = Capital + Liabilities. This equation is the foundation of all accounting. Everything a business owns (assets) was funded by either the owner (capital) or by borrowing (liabilities). The two sides always balance — always.`,
      scenario:`It was 7:45 on a Monday morning when Amaka Obi unlocked the glass door of her new phone shop for the first time. The shop was small — one room on a busy street in Ikeja, Lagos — but it was hers. She had spent the past three months preparing for this moment. She stood in the middle of the room and looked around at everything she had gathered to start this business. Two shelves of phones along the back wall. A display cabinet she had bought on credit from a furniture supplier. A small cash float in the till. A laptop on the counter. And a knot in her stomach that said: I have no idea how to keep track of any of this. Two doors down, Aunty Florence was already open — the older woman ran a stationery supply business and had been on this street for over twenty years. She appeared in Amaka's doorway with two cups of tea and a calm expression. "You look like you need this," she said. Amaka accepted the cup. "How do I even know what this business is worth right now?" she asked. Aunty Florence looked around the shop slowly. "List everything you own," she said. "Then list everything you owe. The difference is yours. That's accounting."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>Aunty Florence sat down on the edge of the counter and handed Amaka a notepad. "Let's do this properly," she said. "Everything in this business falls into one of three categories. Assets — what you own. Liabilities — what you owe. Capital — what's yours."</p>
  <p>The relationship between them is expressed as the <strong>accounting equation</strong>:</p>
  <div class="lesson-equation">Assets = Capital + Liabilities</div>
  <p>It can also be written as:</p>
  <div class="lesson-equation">Capital = Assets − Liabilities</div>
  <p>This is the most important equation in accounting. No matter how many transactions a business makes — hundreds, thousands, millions — both sides of this equation will always be equal. If they are not, something has been recorded incorrectly.</p>
  <p>Think of it this way: everything Amaka's business owns (assets) had to come from somewhere. Either Amaka put it in herself (capital), or she borrowed it or bought it on credit (liabilities). There is no third option. That is why the two sides always balance.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Opening Day</h3>
  <p>Aunty Florence helped Amaka write down everything in the shop that morning:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>What Amaka Owns (Assets)</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Phones in stock (20 handsets)</td><td>800,000</td></tr>
      <tr><td>Display cabinet</td><td>150,000</td></tr>
      <tr><td>Laptop</td><td>120,000</td></tr>
      <tr><td>Cash in till (float)</td><td>30,000</td></tr>
      <tr class="table-total"><td><strong>Total Assets</strong></td><td><strong>1,100,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Then they listed what Amaka owed:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>What Amaka Owes (Liabilities)</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Display cabinet supplier (60-day credit)</td><td>150,000</td></tr>
      <tr class="table-total"><td><strong>Total Liabilities</strong></td><td><strong>150,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Now the equation:</p>
  <div class="lesson-equation">Capital = Assets − Liabilities<br>Capital = ₦1,100,000 − ₦150,000 = <strong>₦950,000</strong></div>
  <p>"That ₦950,000," said Aunty Florence, "is your equity in this business. What you actually own, after accounting for what you owe." Amaka stared at the number. She had invested her savings, a small loan from her mother, and everything she had pulled together over the past year. Seeing it as a single figure made it suddenly real.</p>
  <p>Aunty Florence pointed at the two totals. "Check it the other way too:"</p>
  <div class="lesson-equation">Assets = Capital + Liabilities<br>₦1,100,000 = ₦950,000 + ₦150,000 ✓</div>
  <p>"Always check both ways," said Aunty Florence. "If they don't match, you've missed something."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Every single transaction that happens in Amaka Phones will change the numbers inside the equation — but the equation itself will never stop being true. Buy more stock with cash? Assets go up on one side, assets go down on the other — the equation still balances. Buy on credit? Assets up, liabilities up by the same amount — still balances. This is the logic that makes accounting work.</p>
</div>`,
      quiz:{q:'Amaka\'s business has total assets of ₦1,400,000 and owes ₦320,000 to suppliers. What is her capital?', opts:['₦1,720,000','₦1,080,000','₦320,000','₦1,400,000'], ans:1, exp:'Capital = Assets − Liabilities = ₦1,400,000 − ₦320,000 = ₦1,080,000. The equation always holds: what you own minus what you owe equals what is truly yours.'}
    },

    {id:2, term:'Assets', duration:'5 min', pips:2,
      definition:`An asset is a resource owned or controlled by a business that is expected to provide future economic benefit. Assets appear on the left side of the accounting equation and on the top section of a balance sheet.`,
      scenario:`By the end of her first week, Amaka had sold three phones and was feeling more confident. A friend came to visit and asked how the business was going. "Good, I think," said Amaka. "I have a shop full of stock and some cash." Her friend looked around. "So the business is basically worth what's in this room?" Amaka wasn't sure. She called Aunty Florence. "Not exactly," Aunty Florence said, from the doorway. "Come. Let me show you the difference between what you own and what you're owed — and why both of those are your assets."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>Aunty Florence sat across from Amaka and explained it simply. "An asset is anything your business owns, or is owed, that has value and will bring future economic benefit — money, stock, equipment, or amounts customers owe you."</p>
  <p>Assets fall into two main categories:</p>
  <p><strong>Non-Current Assets (Fixed Assets)</strong> — assets held long-term for use in the business, not for resale. They are used over more than one accounting period.</p>
  <p><strong>Current Assets</strong> — assets expected to be converted into cash, or used up, within twelve months. They are the lifeblood of day-to-day trading.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Assets</h3>
  <p>After a week of trading, Amaka's assets looked like this:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Non-Current Assets</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Display cabinet</td><td>150,000</td></tr>
      <tr><td>Laptop (for records and invoicing)</td><td>120,000</td></tr>
      <tr class="table-total"><td><strong>Total Non-Current Assets</strong></td><td><strong>270,000</strong></td></tr>
    </tbody>
  </table></div>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Current Assets</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Phones in stock (17 remaining after 3 sold)</td><td>680,000</td></tr>
      <tr><td>Amount owed by credit customer (Tunde Tech)</td><td>45,000</td></tr>
      <tr><td>Cash in till</td><td>107,000</td></tr>
      <tr class="table-total"><td><strong>Total Current Assets</strong></td><td><strong>832,000</strong></td></tr>
    </tbody>
  </table></div>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <tbody>
      <tr class="table-total"><td><strong>Total Assets</strong></td><td><strong>1,102,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>"See that ₦45,000 from Tunde Tech?" Aunty Florence pointed. "Tunde hasn't paid yet — but it's still an asset. The business is owed that money. Until it arrives, it sits here as a debtor." She paused. "But a debtor that never pays becomes a problem. We'll talk about that later."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Assets are always presented in order of permanence — non-current assets first (long-term), then current assets (short-term). Within current assets, the least liquid comes first (stock), then debtors, then cash. An asset must be genuinely owned or controlled by the business — Amaka's personal phone is not a business asset, even if she uses it occasionally for business calls.</p>
</div>`,
      quiz:{q:'Which of the following is correctly classified as a current asset?', opts:['A display cabinet used for 3 years','The amount a customer still owes for phones purchased on credit','A laptop bought for the business','The owner\'s personal savings account'], ans:1, exp:'An amount owed by a customer (a debtor) is a current asset — expected to be collected within twelve months. The display cabinet and laptop are non-current assets. Personal savings are not business assets at all.'}
    },

    {id:3, term:'Liabilities and Capital', duration:'5 min', pips:2,
      definition:`Liabilities are amounts owed by the business to others — suppliers, banks, lenders. Capital is the owner's financial stake in the business — what remains after all liabilities are deducted from all assets. Together, liabilities and capital explain how every asset in the business was funded.`,
      scenario:`Ten days after opening, the display cabinet supplier called. "Your sixty days starts now," the man said. "₦150,000, due on the 23rd of next month." Amaka put the phone down and felt a wave of anxiety. She had known about the debt — she'd agreed to it — but hearing the payment date made it suddenly concrete. She went next door. "I knew I owed this money," she told Aunty Florence. "But now I'm nervous." Aunty Florence nodded. "Good. Being nervous about what you owe means you understand it. The mistake would be forgetting it. Let me show you how this fits into your books — and why understanding it is actually reassuring."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>Aunty Florence opened her own ledger to show Amaka an example. "Every asset your business has was paid for somehow. Either you put money in yourself — that's capital. Or someone else is still owed for it — that's a liability."</p>
  <p><strong>Liabilities</strong> are obligations — amounts the business must pay to outsiders. They divide into:</p>
  <ul class="lesson-list">
    <li><strong>Current liabilities</strong> — due within twelve months (supplier credit, bank overdraft)</li>
    <li><strong>Non-current liabilities</strong> — due beyond twelve months (long-term bank loans)</li>
  </ul>
  <p><strong>Capital</strong> (also called owner's equity or net worth) is the residual interest — what belongs to the owner after every liability is settled. It includes the initial investment, plus any profits retained in the business, minus any amounts the owner has withdrawn (drawings).</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Funding Side</h3>
  <p>On Day 10, the right-hand side of Amaka's accounting equation looked like this:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Capital</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Amaka's own savings invested</td><td>700,000</td></tr>
      <tr><td>Loan from mother (interest-free, 12 months)</td><td>250,000</td></tr>
      <tr class="table-total"><td><strong>Total Capital</strong></td><td><strong>950,000</strong></td></tr>
    </tbody>
  </table></div>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Liabilities</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Display cabinet supplier (due in 50 days)</td><td>150,000</td></tr>
      <tr class="table-total"><td><strong>Total Liabilities</strong></td><td><strong>150,000</strong></td></tr>
    </tbody>
  </table></div>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <tbody>
      <tr class="table-total"><td><strong>Capital + Liabilities</strong></td><td><strong>1,100,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>And her total assets were also ₦1,100,000 — the equation balanced.</p>
  <p>"The ₦150,000 you owe the cabinet supplier," said Aunty Florence, "is not something to panic about. It's simply a liability — money leaving your business at a future date. As long as you know it's there, and you're planning for it, you're in control."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Liabilities and capital together always equal total assets — this is non-negotiable. Capital increases when the business makes a profit or the owner injects more funds. Capital decreases when the business makes a loss or the owner withdraws money (drawings). Liabilities are not bad — they are a normal way to fund a business — but they must always be tracked and managed carefully.</p>
</div>`,
      quiz:{q:'Amaka\'s business has total assets of ₦1,250,000 and capital of ₦900,000. What are her total liabilities?', opts:['₦2,150,000','₦350,000','₦900,000','₦1,250,000'], ans:1, exp:'Liabilities = Assets − Capital = ₦1,250,000 − ₦900,000 = ₦350,000. The accounting equation rearranged: if you know any two values, you can always find the third.'}
    },

    {id:4, term:'Creditors', duration:'5 min', pips:2,
      definition:`A creditor is a person or business to whom money is owed by the business — typically a supplier who has provided goods or services on credit and has not yet been paid. Creditors are a current liability on the balance sheet.`,
      scenario:`Three weeks in, Amaka had two suppliers: Bright Mobile, who had supplied her opening stock of phones on 45-day credit terms, and KC Furniture, who had sold her the display cabinet on 60-day credit. Both were now calling about upcoming payment dates. Amaka found herself writing both names and amounts on a piece of paper stuck to the wall. "This is getting complicated," she told Aunty Florence. "I need a better way to track this." Aunty Florence looked at the paper on the wall and smiled. "You've just discovered why we keep a creditors ledger. Come, I'll show you."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>Aunty Florence explained it in plain terms. "Anyone your business owes money to is a creditor. When you buy something on credit — meaning you take the goods now and pay later — the person you owe becomes your creditor until you pay them."</p>
  <p>Creditors are also called <strong>trade payables</strong> in modern accounting language (particularly under IFRS). They represent amounts owed to suppliers for goods or services received but not yet paid for.</p>
  <p>Key facts about creditors:</p>
  <ul class="lesson-list">
    <li>They are a <strong>current liability</strong> — normally expected to be paid within twelve months</li>
    <li>They appear on the <strong>right side</strong> of the accounting equation under liabilities</li>
    <li>Each creditor has their own account in the <strong>purchases ledger</strong> (also called the creditors ledger)</li>
    <li>When you pay a creditor, the liability decreases and so does your cash or bank balance</li>
  </ul>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Creditors</h3>
  <p>By the end of Week 3, Amaka's creditors looked like this:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Creditor</th><th>Amount Owed (₦)</th><th>Due Date</th></tr></thead>
    <tbody>
      <tr><td>Bright Mobile (phone stock supplier)</td><td>480,000</td><td>Week 6</td></tr>
      <tr><td>KC Furniture (display cabinet)</td><td>150,000</td><td>Week 8</td></tr>
      <tr class="table-total"><td><strong>Total Creditors</strong></td><td><strong>630,000</strong></td><td></td></tr>
    </tbody>
  </table></div>
  <p>When Amaka pays Bright Mobile their ₦480,000 in Week 6:</p>
  <ul class="lesson-list">
    <li>Creditors (liabilities) decrease by ₦480,000</li>
    <li>Cash at bank (assets) decrease by ₦480,000</li>
    <li>The accounting equation still balances — both sides went down by the same amount</li>
  </ul>
  <p>"The moment you pay them," said Aunty Florence, "they stop being a creditor. They disappear from your books." Amaka nodded slowly. "So the goal is to make them disappear?" Aunty Florence laughed. "Paying your creditors on time is one of the most important things a business can do. It protects your reputation and your credit terms for the future."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>When goods are bought on credit: debit Purchases (or the specific asset account), credit the Creditor account. When the creditor is paid: debit the Creditor account, credit Cash or Bank. The creditor account balance is always what is still owed — it reduces each time a payment is made.</p>
</div>`,
      quiz:{q:'Amaka buys ₦200,000 of phones on credit from Bright Mobile. What happens to her creditors?', opts:['Creditors decrease by ₦200,000','Creditors increase by ₦200,000','Creditors stay the same','Creditors are removed from the books'], ans:1, exp:'Buying on credit creates a new creditor — Bright Mobile is now owed ₦200,000 by Amaka\'s business. Creditors (a liability) increase by ₦200,000, matched by an increase in stock (an asset) of the same amount.'}
    },

    {id:5, term:'Double Entry Bookkeeping', duration:'6 min', pips:3,
      definition:`The system by which every financial transaction is recorded in at least two accounts — as a debit in one account and an equal credit in another. The total of all debits always equals the total of all credits. This is the foundation of all modern accounting.`,
      scenario:`On Friday afternoon of her first week, Amaka counted the cash in the till. She had started with ₦30,000. She had made several sales and one stock purchase. But when she tried to work out where every naira had come and gone, she couldn't make the numbers add up. She was missing ₦18,000 somewhere and had no idea where it had gone. She went to Aunty Florence, who listened patiently. "The problem," said Aunty Florence, "is that you're only writing down one side of each transaction. Someone pays you ₦15,000 for a phone — you write down ₦15,000 received. But you don't write down that you now have one fewer phone. One entry for two things that happened." She poured Amaka more tea. "That's why we use double entry. Every transaction has two sides. You record both. Always."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>Aunty Florence took a clean page and drew a simple table with two columns — left and right.</p>
  <p>"In accounting," she said, "the left side of any account is called the <strong>debit</strong> side. The right side is the <strong>credit</strong> side. For every transaction, something gets debited and something gets credited — and the amounts are always equal."</p>
  <p>The rules of double entry:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account Type</th><th>Increases with</th><th>Decreases with</th></tr></thead>
    <tbody>
      <tr><td>Assets</td><td>Debit</td><td>Credit</td></tr>
      <tr><td>Liabilities</td><td>Credit</td><td>Debit</td></tr>
      <tr><td>Capital</td><td>Credit</td><td>Debit</td></tr>
      <tr><td>Revenue (income)</td><td>Credit</td><td>Debit</td></tr>
      <tr><td>Expenses</td><td>Debit</td><td>Credit</td></tr>
    </tbody>
  </table></div>
  <p>This system was first described by Italian mathematician Luca Pacioli in 1494 — and it remains, unchanged, the backbone of every set of accounts in the world today.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's First Five Transactions</h3>
  <p>Aunty Florence walked Amaka through the first five transactions of the week:</p>
  <p><strong>Transaction 1: Amaka sells a Samsung A05 for ₦95,000 cash</strong></p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account</th><th>Debit (₦)</th><th>Credit (₦)</th><th>Why</th></tr></thead>
    <tbody>
      <tr><td>Cash</td><td>95,000</td><td></td><td>Asset increasing</td></tr>
      <tr><td>Sales</td><td></td><td>95,000</td><td>Revenue increasing</td></tr>
    </tbody>
  </table></div>
  <p><strong>Transaction 2: Amaka buys 5 phones for ₦200,000 cash</strong></p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account</th><th>Debit (₦)</th><th>Credit (₦)</th><th>Why</th></tr></thead>
    <tbody>
      <tr><td>Purchases</td><td>200,000</td><td></td><td>Expense/stock increasing</td></tr>
      <tr><td>Cash</td><td></td><td>200,000</td><td>Asset decreasing</td></tr>
    </tbody>
  </table></div>
  <p><strong>Transaction 3: Amaka pays ₦25,000 cash for shop rent</strong></p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account</th><th>Debit (₦)</th><th>Credit (₦)</th><th>Why</th></tr></thead>
    <tbody>
      <tr><td>Rent Expense</td><td>25,000</td><td></td><td>Expense increasing</td></tr>
      <tr><td>Cash</td><td></td><td>25,000</td><td>Asset decreasing</td></tr>
    </tbody>
  </table></div>
  <p>"Notice," said Aunty Florence, "that in every single transaction, the debit equals the credit. This is never optional. The moment they don't match, you have made an error."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Every transaction: one debit, one credit, equal amounts. Assets and expenses go up on the debit side. Liabilities, capital and revenue go up on the credit side. When an asset decreases — like cash going out — it is credited. When a liability decreases — like paying a creditor — it is debited. These rules never change.</p>
</div>`,
      quiz:{q:'Amaka sells a phone for ₦120,000 cash. Which entry is correct?', opts:['Debit Sales ₦120,000, Credit Cash ₦120,000','Debit Cash ₦120,000, Credit Sales ₦120,000','Debit Cash ₦120,000, Credit Purchases ₦120,000','Debit Sales ₦120,000, Debit Cash ₦120,000'], ans:1, exp:'Cash (an asset) is increasing, so it is debited. Sales (revenue) is increasing, so it is credited. Debit Cash ₦120,000, Credit Sales ₦120,000 — equal amounts, opposite accounts.'}
    },

    {id:6, term:'Debit and Credit', duration:'5 min', pips:2,
      definition:`Debit is the left-hand side of an account. Credit is the right-hand side. Debits increase assets and expenses. Credits increase liabilities, capital and revenue. For every debit entry there is an equal and opposite credit entry — this is the rule that makes all accounting balance.`,
      scenario:`"I keep getting confused," Amaka told Aunty Florence, two weeks into trading. "When I receive cash it feels like something good — shouldn't that be a credit? And when I spend money it feels bad — shouldn't that be a debit?" Aunty Florence sat back and folded her hands. "That feeling is exactly what confuses most beginners. Forget good and bad. Debit and credit are simply labels for left and right. What they do depends on the type of account." She took a blank page and drew a large T shape. "This is how we're going to sort this out."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The T-account is the simplest visual way to understand debits and credits. Every account has two sides:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th style="text-align:center">DEBIT (Left)</th><th style="text-align:center">CREDIT (Right)</th></tr></thead>
    <tbody><tr><td style="text-align:center;padding:12px;">Increases assets<br>Increases expenses<br>Decreases liabilities<br>Decreases capital<br>Decreases revenue</td><td style="text-align:center;padding:12px;">Decreases assets<br>Decreases expenses<br>Increases liabilities<br>Increases capital<br>Increases revenue</td></tr></tbody>
  </table></div>
  <p>The key insight: debit and credit do not mean gain or loss. They mean left and right. What they do to a balance depends entirely on the type of account.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Cash Account</h3>
  <p>Aunty Florence drew the Cash account for Amaka's second week of trading:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th colspan="2" style="text-align:center">Cash Account</th></tr>
    <tr><th>DEBIT (money coming in)</th><th>CREDIT (money going out)</th></tr></thead>
    <tbody>
      <tr><td>Balance b/d: 30,000</td><td>Purchases: 200,000</td></tr>
      <tr><td>Sales: 95,000</td><td>Rent: 25,000</td></tr>
      <tr><td>Sales: 120,000</td><td>Electricity: 8,000</td></tr>
      <tr><td></td><td>Balance c/d: 12,000</td></tr>
      <tr class="table-total"><td><strong>245,000</strong></td><td><strong>245,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>"Cash coming in goes on the debit side — it's an asset increasing," Aunty Florence explained. "Cash going out goes on the credit side — the asset is decreasing. The two sides must always add to the same total when we close the account."</p>
  <p>Amaka stared at the table. "So the ₦12,000 closing balance means that's how much cash I have left?" "Exactly," said Aunty Florence. "That's your balance carried down — which becomes next week's balance brought down."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>For assets: debit means more, credit means less. For liabilities: credit means more, debit means less. For expenses: debit means more. For revenue: credit means more. Memorise this table and double entry will start to feel automatic — because every transaction is just deciding which account gets debited and which gets credited by the same amount.</p>
</div>`,
      quiz:{q:'Amaka pays ₦8,000 cash for electricity. Which entry is correct?', opts:['Debit Cash, Credit Electricity Expense','Debit Electricity Expense, Credit Cash','Debit Electricity Expense, Debit Cash','Credit Electricity Expense, Credit Cash'], ans:1, exp:'Electricity Expense (an expense) is increasing — debit it. Cash (an asset) is decreasing — credit it. Debit Electricity Expense ₦8,000, Credit Cash ₦8,000.'}
    },

    {id:7, term:'T-Accounts', duration:'5 min', pips:2,
      definition:`A T-account is a simplified visual representation of a ledger account, shaped like the letter T. The account name appears at the top. Debits are listed on the left. Credits are listed on the right. The balance is the difference between the two sides.`,
      scenario:`"Draw it for me again," said Amaka one afternoon, after Aunty Florence had explained debits and credits for the third time. She was sitting at the counter with a notepad, genuinely trying to understand. Aunty Florence picked up her pen. "The best way to see it is with T-accounts. It's literally the shape of a T. Everything goes on one side or the other, and the whole point is that both sides must balance." She drew three large T shapes on a fresh page. "Let's build your books from scratch. First week of Amaka Phones. Three accounts. Ready?"`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>A ledger account records every transaction that affects it. The T-account is the clearest way to draw one:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th colspan="2" style="text-align:center">Account Name</th></tr>
    <tr><th>Dr (Debit)</th><th>Cr (Credit)</th></tr></thead>
    <tbody><tr><td>Increases recorded here</td><td>Decreases recorded here</td></tr>
    <tr><td>(for assets and expenses)</td><td>(for assets and expenses)</td></tr></tbody>
  </table></div>
  <p>Every business needs a separate T-account for each type of asset, liability, capital, revenue and expense. Together, all the T-accounts form the <strong>general ledger</strong> — the master record of every transaction.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's First Week in T-Accounts</h3>
  <p>Aunty Florence built three T-accounts for Amaka's opening transactions:</p>
  <p><em>Transaction 1: Amaka opens the business with ₦950,000 capital (cash)</em><br>
  <em>Transaction 2: Buys 20 phones for ₦800,000 cash from Bright Mobile</em><br>
  <em>Transaction 3: Buys display cabinet for ₦150,000 on credit from KC Furniture</em></p>

  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th colspan="2" style="text-align:center">Cash Account</th></tr>
    <tr><th>Dr</th><th>Cr</th></tr></thead>
    <tbody>
      <tr><td>Capital: 950,000</td><td>Purchases: 800,000</td></tr>
      <tr><td></td><td>Balance c/d: 150,000</td></tr>
      <tr class="table-total"><td><strong>950,000</strong></td><td><strong>950,000</strong></td></tr>
      <tr><td>Balance b/d: 150,000</td><td></td></tr>
    </tbody>
  </table></div>

  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th colspan="2" style="text-align:center">Purchases Account (Stock)</th></tr>
    <tr><th>Dr</th><th>Cr</th></tr></thead>
    <tbody>
      <tr><td>Cash: 800,000</td><td></td></tr>
    </tbody>
  </table></div>

  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th colspan="2" style="text-align:center">KC Furniture Account (Creditor)</th></tr>
    <tr><th>Dr</th><th>Cr</th></tr></thead>
    <tbody>
      <tr><td></td><td>Display Cabinet: 150,000</td></tr>
    </tbody>
  </table></div>

  <p>"Notice," said Aunty Florence, pointing at the Cash account, "the two sides add up to the same total — 950,000 each. The balance brought down is ₦150,000 — the cash left in the business after buying stock." Amaka ran her finger along the page. "And the cabinet went into the creditor account because I haven't paid for it yet." "Exactly," said Aunty Florence. "The asset exists. The debt exists. Both are recorded."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>A T-account balance is found by totalling both sides and taking the difference. If the debit side is larger, the account has a debit balance (normal for assets and expenses). If the credit side is larger, it has a credit balance (normal for liabilities, capital and revenue). The closing balance on one period becomes the opening balance — "balance b/d" — of the next.</p>
</div>`,
      quiz:{q:'At the end of the month, Amaka\'s Cash account shows ₦340,000 on the debit side and ₦290,000 on the credit side. What is the closing balance?', opts:['₦290,000 credit balance','₦50,000 debit balance','₦630,000 debit balance','₦50,000 credit balance'], ans:1, exp:'Debit total (₦340,000) minus Credit total (₦290,000) = ₦50,000. Since the debit side is larger, the balance is a debit balance — normal for cash, which is an asset.'}
    },

    {id:8, term:'The Trial Balance', duration:'6 min', pips:3,
      definition:`A trial balance is a list of all ledger account balances at a given date, with debit balances in one column and credit balances in another. If double entry has been applied correctly, the two columns will total the same amount. It is a check on the arithmetic accuracy of the bookkeeping.`,
      scenario:`At the end of her first month, Amaka sat down to add everything up. She had kept records — sort of. Transactions in one notebook, cash in another, a pile of receipts rubber-banded together. She spent two hours trying to make sense of it and couldn't. When she showed Aunty Florence the mess, the older woman didn't scold her. She just said: "This is why we balance the books at the end of every period. You list every account and its balance. Debit on one side, credit on the other. If those two columns don't add up to the same total, you've made an error somewhere. That's your signal to find it before it becomes a much bigger problem."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The trial balance is extracted from the ledger accounts at the end of a period. It lists every account balance in two columns:</p>
  <ul class="lesson-list">
    <li><strong>Debit column</strong> — assets, expenses, drawings</li>
    <li><strong>Credit column</strong> — liabilities, capital, revenue</li>
  </ul>
  <p>If the total of the debit column equals the total of the credit column, the trial balance <em>agrees</em> — the arithmetic of double entry is correct. If they don't agree, at least one error exists.</p>
  <p><strong>Important:</strong> A trial balance that agrees does not guarantee the accounts are error-free. It only confirms that debits equal credits. Errors that do not affect this equality — such as posting to the wrong account, or omitting a transaction entirely — will not be caught by a trial balance. We will cover these errors in a later lesson.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Month 1 Trial Balance</h3>
  <p>At the end of Month 1, Aunty Florence helped Amaka extract the following trial balance:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>Capital</td><td></td><td>950,000</td></tr>
      <tr><td>Purchases (phones)</td><td>800,000</td><td></td></tr>
      <tr><td>Display Cabinet</td><td>150,000</td><td></td></tr>
      <tr><td>KC Furniture (creditor)</td><td></td><td>150,000</td></tr>
      <tr><td>Cash</td><td>239,000</td><td></td></tr>
      <tr><td>Sales</td><td></td><td>345,000</td></tr>
      <tr><td>Rent Expense</td><td>25,000</td><td></td></tr>
      <tr><td>Electricity Expense</td><td>8,000</td><td></td></tr>
      <tr><td>Tunde Tech (debtor)</td><td>45,000</td><td></td></tr>
      <tr><td>Laptop</td><td>120,000</td><td></td></tr>
      <tr><td>Cash Float / Till</td><td>58,000</td><td></td></tr>
      <tr class="table-total"><td><strong>Total</strong></td><td><strong>1,445,000</strong></td><td><strong>1,445,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>"Both sides: ₦1,445,000," said Aunty Florence. "The books balance. Now we know your double entry is arithmetically correct for the month." Amaka sat back. The relief was visible. "That's it?" "That's the check," said Aunty Florence. "Now the real work — the financial statements — can begin."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Always prepare a trial balance before preparing financial statements. The rule for which column each account goes in: assets → debit, liabilities → credit, capital → credit, revenue → credit, expenses → debit. If the trial balance doesn't balance, you must find the error before moving forward. Don't guess — trace it.</p>
</div>`,
      quiz:{q:'Which of these would NOT be detected by a trial balance?', opts:['A debit entry posted with no matching credit','A transaction posted to the wrong account but with correct debit and credit amounts','A debit total that is ₦50,000 more than the credit total','An account balance added to the wrong column of the trial balance'], ans:1, exp:'A transaction posted to the wrong account — but still as a correct debit and credit of equal amounts — will not affect the trial balance totals. The two columns still agree, so the error is invisible to the trial balance. This is one of several "errors not affecting the trial balance" that we cover in a later lesson.'}
    },

    {id:9, term:'Books of Original Entry', duration:'5 min', pips:2,
      definition:`Books of original entry (also called books of prime entry) are the first place a transaction is recorded before being posted to the ledger. They include the sales day book, purchases day book, cash book, returns day books and the journal. Each captures a specific type of transaction.`,
      scenario:`By the end of her first month, Amaka had sold phones to nine different customers, purchased stock from two suppliers, returned one faulty handset, and paid various expenses. She had written most of it in a single notebook in no particular order. When Aunty Florence asked her to find how much her biggest customer owed, Amaka flicked through twelve pages before admitting she couldn't find it. "This is the problem with mixing everything together," Aunty Florence said. "Every type of transaction needs its own book. That way you always know where to look — and the ledger stays clean."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>Rather than posting every transaction directly into the ledger, bookkeeping uses books of original entry as a first stage. Transactions are recorded here as they happen, then posted (transferred) to the relevant ledger accounts periodically.</p>
  <p>The main books of original entry:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Book</th><th>What it records</th></tr></thead>
    <tbody>
      <tr><td>Sales Day Book</td><td>All credit sales to customers</td></tr>
      <tr><td>Purchases Day Book</td><td>All credit purchases from suppliers</td></tr>
      <tr><td>Sales Returns Day Book</td><td>Goods returned by customers (returns inwards)</td></tr>
      <tr><td>Purchases Returns Day Book</td><td>Goods returned to suppliers (returns outwards)</td></tr>
      <tr><td>Cash Book</td><td>All cash and bank receipts and payments</td></tr>
      <tr><td>The Journal</td><td>Transactions that don't fit the other books</td></tr>
    </tbody>
  </table></div>
  <p>Cash sales go directly into the cash book. Credit sales go into the sales day book. The journal handles corrections, opening entries, and unusual transactions.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Sales Day Book</h3>
  <p>Aunty Florence showed Amaka how to set up the Sales Day Book for her credit customers in Month 1:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Date</th><th>Customer</th><th>Invoice No.</th><th>Amount (₦)</th></tr></thead>
    <tbody>
      <tr><td>Day 3</td><td>Tunde Tech</td><td>001</td><td>45,000</td></tr>
      <tr><td>Day 11</td><td>Grace Stores</td><td>002</td><td>85,000</td></tr>
      <tr><td>Day 19</td><td>Bright Future Ltd</td><td>003</td><td>120,000</td></tr>
      <tr><td>Day 26</td><td>Tunde Tech</td><td>004</td><td>60,000</td></tr>
      <tr class="table-total"><td></td><td></td><td><strong>Total</strong></td><td><strong>310,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>"At the end of the month," Aunty Florence explained, "the total of ₦310,000 is posted as a single entry: debit Debtors Control Account ₦310,000, credit Sales Account ₦310,000. And each customer's individual amount goes into their own account in the sales ledger."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Books of original entry are not part of the double entry system itself — they are a staging area. The double entry happens when figures are posted from these books into the ledger accounts. The books of original entry are valuable because they keep different types of transactions clearly separated and provide an audit trail — a clear record of where every ledger entry originated.</p>
</div>`,
      quiz:{q:'Where would Amaka first record a credit sale of ₦75,000 to a new customer?', opts:['Directly in the ledger','In the Sales Day Book','In the Purchases Day Book','In the Journal'], ans:1, exp:'Credit sales are first recorded in the Sales Day Book — the book of original entry for this type of transaction. From there, the total is posted to the Sales Account and the individual amount to the customer\'s account in the sales ledger.'}
    },

    {id:10, term:'The Journal', duration:'5 min', pips:2,
      definition:`The journal is the book of original entry used for transactions that do not belong in any of the other books — opening entries, correction of errors, purchase and sale of fixed assets on credit, and other non-routine transactions. Each journal entry shows the account to be debited, the account to be credited, and a narrative explaining the transaction.`,
      scenario:`In Week 3, a customer came back with a ₦95,000 phone she had bought the week before. The screen had cracked internally — a manufacturing fault. Amaka agreed to swap it for a replacement. She stared at her notebook. This wasn't a normal sale and it wasn't exactly a normal return. The phone was going back, but so was the replacement going out. She had no idea where to write it. She called Aunty Florence. "That," said Aunty Florence, "is exactly what the journal is for. The unusual ones. The ones that don't fit anywhere else."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The journal (sometimes called the general journal) is the last resort book of original entry — it handles everything that doesn't belong in the cash book, sales day book, purchases day book or returns books.</p>
  <p>Typical journal entries include:</p>
  <ul class="lesson-list">
    <li>Opening entries when a new set of books is started</li>
    <li>Purchase or sale of fixed assets on credit</li>
    <li>Correction of errors</li>
    <li>Writing off bad debts</li>
    <li>Adjustments at the end of a period (depreciation, accruals, prepayments)</li>
    <li>Any non-routine transaction that needs a written explanation</li>
  </ul>
  <p>Every journal entry must include: the date, the accounts to be debited and credited, the amounts, and a <strong>narrative</strong> — a short written explanation of why the entry is being made. The narrative is not optional. It is the audit trail.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Phone Exchange</h3>
  <p>Aunty Florence wrote the journal entry for the faulty phone swap:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Date</th><th>Account</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>Week 3, Day 2</td><td>Returns Inwards</td><td>95,000</td><td></td></tr>
      <tr><td></td><td>Tunde Tech (Debtor)</td><td></td><td>95,000</td></tr>
      <tr><td colspan="4" style="font-size:0.8rem;color:var(--muted);font-style:italic;">Being: return of Samsung A05 (Invoice 001) due to manufacturing fault. Replacement issued same date.</td></tr>
    </tbody>
  </table></div>
  <p>"See the narrative at the bottom?" Aunty Florence pointed. "That's the explanation. Six months from now — or if anyone ever queries this transaction — that sentence tells you exactly what happened and why. Without it, a journal entry is just numbers. The narrative gives it meaning."</p>
  <p>Amaka copied it carefully. "So the journal is basically for things that need explaining?" "Exactly," said Aunty Florence. "If you ever find yourself writing a journal entry and you can't write a clear narrative for it, stop. That usually means you're not sure what you're recording — or you're recording it in the wrong place."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Journal format: always list the debit entry first, then the credit entry slightly indented. Always include the narrative. The journal is the most powerful book in the system because it can correct any error and record any non-routine transaction — but that power means every entry must be clearly explained and authorised. An unexplained journal entry is a red flag in any audit.</p>
</div>`,
      quiz:{q:'Amaka writes off a ₦45,000 bad debt for a customer who has disappeared. Which book of original entry would she use?', opts:['Sales Day Book','Cash Book','Purchases Day Book','The Journal'], ans:3, exp:'Writing off a bad debt is a non-routine adjustment — it doesn\'t fit the cash book (no cash moved), the sales day book (it\'s not a new sale) or the purchases book. It belongs in the journal, with a narrative explaining that the debt has been confirmed as irrecoverable.'}
    },
    {id:11, term:'Assets', duration:'4 min', pips:1,
      definition:`Resources owned by a business or owed to it, such as buildings, equipment, stock, money in the bank, and amounts customers owe. Assets represent what a business has.`,
      scenario:`Four weeks in, Amaka arrived early on a Saturday to do her first proper stocktake. She moved through the shop with a notepad: phones on the shelves, cases and chargers in the display cabinet, the laptop on the counter, the cash float in the till. Then she paused. Tunde still owed her the balance on his account, and last week she had paid two months of shop rent in advance. Did those count? She was still standing there when Aunty Florence appeared with her tea. "Everything on your list so far is something you can touch," the older woman said, reading over her shoulder. "But assets are bigger than that. Tunde's debt? That is money owed to you — an asset. The rent you paid ahead? You own two months of shelter you have not used yet — also an asset. Write down what you own AND what you are owed. Both belong to the business." Amaka added two lines to the page, and her business suddenly looked bigger than the room it sat in.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following counts as an asset for a business?', opts:['Money the business owes a supplier', 'Money a customer owes the business', 'The owner\'s personal house, unrelated to the business', 'Wages already paid to staff'], ans:1, exp:'Money a customer owes the business is a resource owed TO the business, making it an asset. Money owed BY the business is a liability, not an asset.'}
    },
    {id:12, term:'Balance Brought Down', duration:'4 min', pips:1,
      definition:`The opening balance of an account at the start of a new period, carried forward from the closing balance of the previous period. Often abbreviated 'balance b/d'.`,
      scenario:`On the first morning of February, Amaka opened her cash book to a fresh page and hesitated, pen hovering. January's page was full — every sale, every payment, ruled off neatly at the bottom the night before. But February stared back at her, blank. Was she supposed to start from zero? She carried the book two doors down. Aunty Florence laughed gently. "Your cash did not disappear at midnight, did it? Look at the last line of January." There it was: the closing balance, ₦164,000. "That figure walks across the page boundary and sits at the top of February," said Aunty Florence, writing it in and labelling it b/d. "Balance brought down. It is the bridge between periods — the ending of one month becomes the beginning of the next. Every account starts its new life exactly where the old one ended." Amaka looked at the ₦164,000 sitting at the head of the new page like a returning friend, and February no longer felt blank.`,
      votes:{up:0, down:0},
      quiz:{q:'What does \'balance b/d\' represent in an account?', opts:['The total of all transactions for the period', 'The opening balance carried forward from the previous period', 'An error that needs correcting', 'The amount of profit made that period'], ans:1, exp:'Balance brought down (b/d) is the opening balance at the start of a new period, carried forward from where the previous period\'s account left off.'}
    },
    {id:13, term:'Balance Carried Down', duration:'4 min', pips:1,
      definition:`The figure entered into an account at the end of a period to make both sides add up to the same total. It is then carried forward as the opening balance of the next period. Often abbreviated 'balance c/d'.`,
      scenario:`The evening before, on the 31st of January, Amaka had stayed late to close her first full month of books. Aunty Florence sat beside her with the cash account open. "Add up the debit side," she instructed. Amaka totalled it: ₦892,000. "Now the credit side." ₦728,000. "They don't match," Amaka said, worried she had made an error. "They are not supposed to match — yet," said Aunty Florence. "The difference is the cash you still have. ₦164,000. Now watch." She wrote ₦164,000 on the smaller credit side, labelled it c/d — balance carried down — and suddenly both sides totalled ₦892,000 exactly. She ruled two clean lines under each total. "The c/d figure is not a transaction. It is a placeholder that closes the account for the month, and tomorrow it reappears at the top of the new page as your opening balance. Carried down tonight, brought down tomorrow. Two names, one number, one bridge." Amaka ruled the lines herself, slowly, enjoying how final they felt.`,
      votes:{up:0, down:0},
      quiz:{q:'What is the purpose of a \'balance c/d\' entry?', opts:['To record a mistake in the accounts', 'To make both sides of an account total the same amount at period end', 'To show how much profit was made', 'To cancel out a transaction'], ans:1, exp:'Balance carried down (c/d) is inserted to make both sides of an account balance at the end of a period — it\'s then carried forward as next period\'s opening balance (balance b/d).'}
    },
    {id:14, term:'Balance Sheet', duration:'4 min', pips:1,
      definition:`A statement showing the assets, liabilities and capital of a business at one specific point in time — a financial snapshot, not a record of activity over a period.`,
      scenario:`When January's books were closed, Aunty Florence set a clean sheet of paper on the counter and said, "Now let us photograph your business." Amaka looked around for a camera. "Not that kind of photograph. A balance sheet — a picture of exactly where Amaka Phones stands on this one date, the 31st of January." Together they listed the assets on top: phones in stock, the cabinet, the laptop, cash, Tunde's debt, the prepaid rent. Below, the liabilities: the remaining balance owed to the cabinet supplier. And underneath it all, her capital. "This page says nothing about how hard you worked in January," Aunty Florence explained. "It does not show your sales or your hustle. It only shows where everything stands at this instant — like a photograph of a race shows where the runners are, not how fast they ran. Tomorrow, one sale changes it. That is why we always write the date on top. A balance sheet without a date is a photograph of nobody knows when." Amaka wrote the date in bold at the head of the page.`,
      votes:{up:0, down:0},
      quiz:{q:'What does a balance sheet show?', opts:['Sales made over the year', 'Assets, liabilities and capital at one specific date', 'Cash received and paid during the year', 'Profit earned over the year'], ans:1, exp:'A balance sheet is a snapshot at a single point in time, not a summary of activity across a period — that distinction is one of the most common beginner mix-ups in accounting.'}
    },
    {id:15, term:'Bookkeeping', duration:'4 min', pips:1,
      definition:`The part of accounting concerned with recording financial transactions in an organised way, traditionally in 'books' of accounts.`,
      scenario:`A customer once asked Amaka whether she was "doing accounting" in her big notebook. Amaka repeated the question to Aunty Florence that evening, unsure of the answer herself. "What you are doing every day — writing down each sale, each purchase, each payment, neatly and in order — that is bookkeeping," said Aunty Florence. "It is the recording layer. The discipline of capturing every transaction so nothing is lost." She tapped the notebook. "Accounting is the bigger house. Bookkeeping is its foundation. Accounting takes what you have recorded and classifies it, summarises it, presents it, interprets it — turns it into statements and decisions. But none of that is possible if the recording underneath is careless." She told Amaka about a trader down the street years ago who made good money but kept no books; when his supplier disputed a payment, he had no record and paid twice. "Bookkeeping looks humble," she said, "but it is the difference between a business that knows itself and one that only guesses."`,
      votes:{up:0, down:0},
      quiz:{q:'Which best describes bookkeeping?', opts:['Deciding whether to expand the business', 'Recording financial transactions in an organised way', 'Calculating how much tax is owed', 'Advising on whether to take out a loan'], ans:1, exp:'Bookkeeping is specifically about recording transactions in an organised way — interpreting those records to guide decisions is a broader accounting task built on top of bookkeeping.'}
    },
    {id:16, term:'Business Entity Concept', duration:'4 min', pips:1,
      definition:`The assumption that a business is treated as completely separate from its owner for accounting purposes. Only transactions affecting the business are recorded — the owner's personal affairs are not, except where they introduce capital or take drawings.`,
      scenario:`In the second month, Amaka's landlady at home came asking for her personal rent, and without thinking Amaka opened the shop till and counted out the money. She recorded it in her cash book as an expense of the business. When Aunty Florence reviewed the book that Friday, she stopped at the entry and shook her head. "Who paid rent — Amaka the woman, or Amaka Phones the business?" Amaka blinked. "Is there a difference? The business is me." "In law, perhaps. In accounting, never," said Aunty Florence firmly. "The business entity concept: the business is a separate person in the books. It has its own money, its own debts, its own records. Your home rent is not its expense. When you take its cash for yourself, that is drawings — a withdrawal by the owner, not a cost of trading. Mix the two and you will never know if this shop truly makes money, or if it is just your handbag with a signboard." Amaka corrected the entry, and from that day the till and her purse became two different countries.`,
      votes:{up:0, down:0},
      quiz:{q:'Under the business entity concept, which of these would be recorded in the business\'s accounts?', opts:['The owner\'s personal school fees for her children', 'The owner investing ₦200,000 of her own money into the business', 'The owner\'s personal grocery shopping', 'The owner\'s personal car loan, unrelated to the business'], ans:1, exp:'The business entity concept keeps the owner\'s personal affairs separate from the business — except where money specifically moves between the two, such as capital introduced or drawings taken.'}
    },
    {id:17, term:'Capital', duration:'4 min', pips:1,
      definition:`The total value of resources that the owner has invested in and left in the business. It represents the owner's stake and increases with profit and new investment, and decreases with losses and drawings.`,
      scenario:`Three months in, Amaka's mother visited the shop for the first time. She looked at the full shelves and asked, half joking, "So how much of this is my money?" — she had lent Amaka ₦200,000 at the start. That night Amaka asked Aunty Florence how to even answer that. "Your mother's loan is a liability — the business owes it back. Capital is different. Capital is what YOU put in and left in: your savings that opened this shop, plus every naira of profit you have made and not withdrawn." She sketched it: opening capital ₦950,000, add the profits of three months, subtract the drawings Amaka had taken. "Capital is a living number. It grows when the business earns and you leave the earnings inside; it shrinks when you make losses or take money out. It is the truest measure of your stake — not what is on the shelves, but what would be yours if everything were settled today." Amaka worked out the new figure and smiled. Her stake had grown since that first Monday morning.`,
      votes:{up:0, down:0},
      quiz:{q:'An owner starts a business with ₦400,000 capital. The business makes ₦120,000 profit and the owner withdraws ₦30,000. What is the capital now?', opts:['₦400,000', '₦490,000', '₦550,000', '₦120,000'], ans:1, exp:'₦400,000 + ₦120,000 profit − ₦30,000 drawings = ₦490,000. Capital grows with profit and new investment, and shrinks with losses and drawings.'}
    },
    {id:18, term:'Capital Expenditure', duration:'4 min', pips:1,
      definition:`Money spent on acquiring or improving long-life assets that will be used in the business over multiple periods, such as buildings, machinery or vehicles.`,
      scenario:`Business was steady enough that Amaka decided to invest: a POS machine for card payments and proper wall shelving to display more stock. The same week she also bought airtime for the shop phone and fuel for the generator. When she sat to record it all, she nearly wrote everything in one place — money out is money out, she reasoned. Aunty Florence caught it in time. "Two very different kinds of spending are hiding in that list," she said. "The POS machine and the shelving will serve you for years — that is capital expenditure. You are not consuming that money; you are converting it into long-term assets. But the airtime and fuel? Used up within days. That is revenue expenditure — the running costs of the period." She drew a line down the page. "Confuse them and your accounts lie twice: expense the shelving and this month looks terribly poor; treat fuel as an asset and the business looks richer than it is. Ask of every payment: will its benefit outlive this period? That question sorts them every time."`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following is an example of capital expenditure?', opts:['Buying petrol for a delivery motorcycle', 'Buying the delivery motorcycle itself', 'Paying for monthly electricity', 'Paying staff wages for the week'], ans:1, exp:'Buying the motorcycle is capital expenditure — it\'s a long-life asset that will be used over many future periods, unlike petrol, electricity or wages, which are used up immediately.'}
    },
    {id:19, term:'Carriage Inwards', duration:'4 min', pips:1,
      definition:`The cost of transporting goods purchased into the business. Because it forms part of the real cost of obtaining stock for resale, it is added to purchases when calculating the cost of goods sold.`,
      scenario:`Amaka's restock trips to Computer Village were becoming routine: choose the phones, pay the supplier, then pay a driver ₦8,000 to bring the cartons safely across Lagos to Ikeja. One evening, totalling her purchases for the month, she left the transport out — it felt like a side cost, not part of the goods. Aunty Florence disagreed the moment she saw it. "Could you sell those phones if they were still sitting in Computer Village?" she asked. "Of course not." "Then the ₦8,000 that brought them to your shelf is part of what those phones truly cost you. We call it carriage inwards — the transport cost of goods coming IN to the business — and it is added to your purchases when you calculate the cost of what you sold. A phone that cost ₦90,000 plus its share of delivery did not cost ₦90,000. Price your goods off the naked invoice and you will quietly eat the transport out of your own profit." Amaka added the ₦8,000 to purchases, and her margins told the truth again.`,
      votes:{up:0, down:0},
      quiz:{q:'Why is carriage inwards added to purchases rather than treated as a general expense?', opts:['Because it\'s a one-off cost', 'Because it forms part of the real cost of obtaining stock for resale', 'Because suppliers require it to be recorded that way', 'Because it relates to selling goods, not buying them'], ans:1, exp:'Carriage inwards is part of the genuine cost of getting stock into the business ready for resale, so it\'s added to purchases — distinct from carriage outwards, which relates to delivering goods to customers.'}
    },
    {id:20, term:'Carriage Outwards', duration:'4 min', pips:1,
      definition:`The cost of delivering goods sold out to customers. It is treated as a general expense in the profit and loss section of the financial statements, not as part of the cost of goods sold.`,
      scenario:`A customer in Surulere ordered two phones and asked for delivery. Amaka paid a dispatch rider ₦3,500 to take the package across the bridge. Remembering the carriage inwards lesson, she confidently added the ₦3,500 to her cost of goods — transport is transport, she thought. Aunty Florence smiled when she saw it. "Close — but look at the direction of travel. Carriage inwards brings goods TO you; it is part of getting stock ready for sale, so it joins the cost of goods. But this rider carried goods AWAY from you, to a customer, AFTER the sale was already made. That is carriage outwards — a selling and distribution expense. It belongs with your other operating expenses, down in the profit and loss section, not inside the cost of the goods." She tapped the page. "Same okada, opposite meaning. Inwards fattens the cost of your stock; outwards is simply a cost of serving your customer. The direction decides the treatment." Amaka moved the ₦3,500 down the page to where it belonged.`,
      votes:{up:0, down:0},
      quiz:{q:'How is carriage outwards treated in the financial statements?', opts:['Added to purchases, like carriage inwards', 'Treated as a general expense in the profit and loss section', 'Deducted from sales revenue directly', 'Ignored, since it\'s the customer\'s responsibility'], ans:1, exp:'Unlike carriage inwards, carriage outwards relates to delivering goods already sold — it\'s a selling expense in the profit and loss section, not part of the cost of goods sold.'}
    },
    {id:21, term:'Cost of Goods Sold', duration:'4 min', pips:1,
      definition:`The cost of the stock that was actually sold during a period, calculated as opening stock plus purchases (adjusted for carriage inwards and returns) minus closing stock.`,
      scenario:`At the end of February, Amaka wanted to know what the goods she had actually sold that month had cost her. Her first instinct was simple: just use the month's purchases. Aunty Florence pulled up a stool. "Purchases alone will deceive you. Think — you started February with goods already on the shelf, and you ended it with goods still unsold. The formula respects both." She wrote it out: Opening stock, plus purchases, minus closing stock. They filled in the numbers together: ₦640,000 of stock at the start, ₦900,000 bought during the month (carriage inwards included), ₦710,000 still on the shelves at the count. "So the goods that actually left this shop in February cost you ₦830,000. Not what you bought — what you SOLD. Stock you still hold is not a cost yet; it is an asset waiting its turn." Amaka checked the arithmetic twice. Matched against her sales, the figure told her — for the first time precisely — what February's trading had really earned.`,
      votes:{up:0, down:0},
      quiz:{q:'Opening stock is ₦60,000, purchases during the period are ₦250,000, and closing stock is ₦40,000. What is the cost of goods sold?', opts:['₦310,000', '₦270,000', '₦230,000', '₦350,000'], ans:1, exp:'Cost of goods sold = Opening stock + Purchases − Closing stock = ₦60,000 + ₦250,000 − ₦40,000 = ₦270,000.'}
    },
    {id:22, term:'Credit', duration:'4 min', pips:1,
      definition:`The right-hand side of an account in the double entry system. Credits increase liabilities, capital and revenue, and decrease assets and expenses.`,
      scenario:`Chidi, Amaka's young cousin, had started helping in the shop on weekends, and the debits and credits confused him endlessly. "Why is money coming in a debit? Credit sounds like the good one," he complained, after recording a sale backwards for the second time. Aunty Florence overheard and came to his rescue. "Forget good and bad. Credit simply means the right-hand side of an account. That is all it is — an address, not a judgement." She listed what lives comfortably on that side: "Credits increase liabilities, capital and income — and they decrease assets and expenses. When Amaka makes a sale, the Sales account is credited because income is growing. When she pays cash out, Cash is credited because that asset is shrinking." She had Chidi say it back until it stuck. "Every entry in this book has an address: left or right, debit or credit. Learn the addresses and the whole system opens up. Guess at them and every page becomes a fight." Chidi corrected his entry — right side, this time on purpose.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these does a credit entry typically increase?', opts:['Assets', 'Expenses', 'Revenue', 'Drawings'], ans:2, exp:'Credits increase liabilities, capital and revenue. Assets, expenses and drawings are increased by debits, not credits.'}
    },
    {id:23, term:'Creditor', duration:'4 min', pips:1,
      definition:`A person or business to whom money is owed, usually because goods or services have been supplied on credit and not yet paid for.`,
      scenario:`Sixty days had passed quickly, and one morning Mrs. Adeyemi, the furniture supplier, appeared at the shop door with her invoice book: the display cabinet's ₦150,000 was due. Amaka paid — she had planned for it — but afterwards asked Aunty Florence what exactly Mrs. Adeyemi had been to the business all this time. "A creditor," said Aunty Florence. "Someone the business owes. From the day she delivered that cabinet on credit until the moment you paid, she held a claim against Amaka Phones. Her name sat in your books as a liability." She sipped her tea. "Understand this relationship well, because credit is the bloodstream of trade on this street. Your suppliers become your creditors when they trust you with goods before money; you become a creditor to anyone you supply on trust. The books must always know exactly who is owed what, and when it falls due — because a forgotten creditor arriving on a bad cash day can wound a healthy business." Amaka ruled off Mrs. Adeyemi's account with a small feeling of ceremony: paid in full, on time.`,
      votes:{up:0, down:0},
      quiz:{q:'What is a creditor?', opts:['Someone who owes the business money', 'Someone the business owes money to', 'An asset of the business', 'A type of expense'], ans:1, exp:'A creditor is someone the business owes money to — the opposite of a debtor, who owes money to the business.'}
    },
    {id:24, term:'Current Assets', duration:'4 min', pips:1,
      definition:`Assets that are cash, or are expected to be turned into cash or used up within twelve months, such as stock, debtors, cash at bank and cash in hand. Listed in order of increasing liquidity.`,
      scenario:`Preparing her February balance sheet, Amaka listed her short-lived possessions in whatever order they came to mind: cash, then stock, then Tunde's debt, then the bank balance. Aunty Florence rearranged them with a pencil. "These are your current assets — things that are cash already, or will become cash within the year: your stock, your debtors, your bank balance, your cash in hand. But we list them in a particular order: least liquid first, most liquid last. Stock, then debtors, then bank, then cash." Amaka asked why the ceremony. "Because the order tells a story of distance from cash. Stock must first be sold to become a debt owed to you; the debtor must then pay before it becomes money. Anyone reading your balance sheet sees at a glance how quickly your short-term wealth can turn into spendable cash. A business can look rich in current assets and still be unable to pay tomorrow's bill if everything is trapped in slow-moving stock." Amaka rewrote the list in marching order, stock at the top, cash bringing up the rear.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following is a current asset?', opts:['A delivery motorcycle expected to last 5 years', 'Stock held for resale', 'The kiosk building itself', 'A 10-year business loan'], ans:1, exp:'Stock held for resale is a current asset — expected to be sold and turned into cash within the next twelve months, unlike long-term assets such as a motorcycle or building.'}
    },
    {id:25, term:'Current Liabilities', duration:'4 min', pips:1,
      definition:`Amounts owed by a business that must be paid within twelve months of the balance sheet date, such as creditors for goods and short-term loans or overdrafts.`,
      scenario:`Alongside the assets, Amaka listed what the business owed: a new balance with Big Sam Distributions for phones taken on 30-day credit, and a small amount outstanding on the POS machine. Aunty Florence looked over the list. "All of these fall due within the year — that makes them current liabilities. The near-term claims on your cash." She set the list beside the current assets from the same balance sheet. "These two lists must always be read together. Your current liabilities are the bills marching toward you; your current assets are the resources you have to meet them. If what you owe soon is larger than what you can turn to cash soon, even a profitable shop can suffocate — profit on paper does not pay a supplier standing at the door." She told Amaka about a thriving boutique that died exactly that way, rich in stock and drowning in due bills. "Watch this pairing every month. It is the pulse of your survival." Amaka circled both totals and, from then on, checked them against each other before anything else.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these is a current liability?', opts:['A loan to be repaid over 10 years', 'An amount owed to a supplier, due next month', 'The owner\'s capital', 'A delivery van owned by the business'], ans:1, exp:'An amount owed to a supplier due within the next twelve months is a current liability. A 10-year loan is a long-term liability, not a current one.'}
    },
    {id:26, term:'Debit', duration:'4 min', pips:1,
      definition:`The left-hand side of an account in the double entry system. Debits increase assets and expenses, and decrease liabilities, capital and revenue.`,
      scenario:`Chidi had finally made peace with credits when debits ambushed him from the other side. He recorded a purchase of stock as a credit to the Stock account and stared at it, sensing something wrong but unsure what. Aunty Florence took the pen. "Debit is the left-hand side of an account — the mirror twin of credit. Debits increase assets and expenses, and decrease liabilities, capital and income." She pointed at the entry. "Stock is an asset, and it grew today. Growth for an asset means the left side — a debit." She showed him the mnemonic she had used for forty years, drawing the two-column T shape in the air. "Left hand: what the business receives, what grows in its possession, what it spends. Right hand: what it gives, what it owes, what it earns. Every transaction touches both hands at once — one debit, one credit, always equal. Master which hand is which and you can record anything that ever happens on this street." Chidi rewrote the entry on the left, where it had belonged all along.`,
      votes:{up:0, down:0},
      quiz:{q:'What effect does a debit entry have on an expense account?', opts:['Decreases it', 'Increases it', 'Has no effect', 'Converts it into a liability'], ans:1, exp:'Debits increase expense accounts, along with assets, and decrease liabilities, capital and revenue.'}
    },
    {id:27, term:'Debtor', duration:'4 min', pips:1,
      definition:`A person or business that owes money to the business, usually because they have bought goods or services on credit and not yet paid for them.`,
      scenario:`Tunde came back in March — this time for a phone for his sister, and once again short of the full amount. "You know I am good for it," he grinned. Amaka did know; he had cleared his last balance to the naira. She released the phone and opened a fresh page in her ledger with his name at the top. That evening Aunty Florence nodded at the page approvingly. "Tunde is now your debtor again — someone who owes the business money. His ₦60,000 balance is your asset: not cash yet, but a legal claim to cash." Then her voice turned serious. "But hear me: a debtor is only as good as his willingness and ability to pay. Keep every debtor's account ruled and current — what was taken, what was paid, what remains. Chase gently but chase early. A debt left sleeping too long has a way of dying quietly." She tapped Tunde's page. "Trust built his account. Records will keep it honest — for both of you." Amaka dated the entry and set a reminder for thirty days.`,
      votes:{up:0, down:0},
      quiz:{q:'What is a debtor?', opts:['Someone the business owes money to', 'Someone who owes the business money', 'A type of liability', 'An item of stock'], ans:1, exp:'A debtor owes money to the business — the opposite of a creditor, to whom the business owes money.'}
    },
    {id:28, term:'Double Entry Bookkeeping', duration:'4 min', pips:1,
      definition:`The system of recording every transaction twice — once as a debit in one account and once as an equal credit in another account — so that the accounting equation always remains in balance.`,
      scenario:`One busy Saturday, the books refused to balance by exactly ₦25,000, and Amaka and Chidi hunted the error for an hour. They found it: Chidi had recorded a ₦25,000 accessory sale by increasing Cash — and stopped there, forgetting to credit Sales. Half a transaction. Aunty Florence used the moment for the deepest lesson yet. "This is why double entry exists. Every transaction, without exception, is recorded twice — a debit in one account, an equal credit in another. Not because accountants love work, but because every real event has two faces: something is received, something is given. Cash came in; a sale was made. Record only one face and the books tear at the seam — exactly where yours tore today." She had Chidi complete the missing credit and watched the totals click back into agreement. "The beauty of the system is that it polices itself. Errors like this cannot hide; the imbalance shouts. A single-entry book stays silent while it lies to you." The ₦25,000 gap closed, and Chidi never forgot a second entry again.`,
      votes:{up:0, down:0},
      quiz:{q:'Why does double entry bookkeeping require every transaction to be recorded twice?', opts:['To make bookkeeping take longer', 'So that the accounting equation always remains in balance', 'Because tax authorities require duplicate records', 'To allow two different people to record the same transaction'], ans:1, exp:'Recording both a debit and an equal credit for every transaction is what keeps the accounting equation in balance at all times — this is the core mechanism of double entry.'}
    },
    {id:29, term:'Drawings', duration:'4 min', pips:1,
      definition:`Cash or goods withdrawn from the business by its owner for personal use. Drawings reduce capital but are never treated as a business expense, and are recorded in a separate drawings account.`,
      scenario:`In April, Amaka's younger sister got engaged, and Amaka took ₦40,000 from the business bank account toward the celebration. Out of habit she began writing it among the shop's expenses, next to rent and fuel. Aunty Florence stopped her pen mid-word. "Did the business buy anything with that money? Stock? Services? Anything that helps it trade?" Amaka shook her head. "Then it is not an expense. It is drawings — the owner drawing value out of her own business for personal use. It reduces your capital, not your profit." She showed Amaka the proper home for it: a Drawings account, gathering every personal withdrawal through the year, closed off against capital at the end. "This distinction protects you from a sweet self-deception. Expenses measure the true cost of running the shop. Drawings measure how much of the shop's substance you consumed yourself. Mix them and your profit looks worse than reality — and one day you will make a bad decision based on a number you polluted." The wedding was beautiful; the books stayed honest.`,
      votes:{up:0, down:0},
      quiz:{q:'How do drawings affect a business\'s reported profit for the year?', opts:['They reduce profit, the same as an expense', 'They have no effect on profit — they reduce capital instead', 'They increase profit', 'They are added to revenue'], ans:1, exp:'Drawings are never treated as an expense, so they don\'t reduce profit. They reduce the owner\'s capital directly, recorded in a separate drawings account.'}
    },
    {id:30, term:'Dual Aspect Concept', duration:'4 min', pips:1,
      definition:`The principle that every transaction has two effects on the accounting records, which must balance against each other. This is the foundation that double entry bookkeeping is built upon.`,
      scenario:`One quiet afternoon Amaka reviewed the POS machine purchase and noticed something elegant she had never articulated: the day she bought it, her bank balance fell by exactly the amount her equipment rose. Every transaction she flipped back through had this same double life — stock up, cash down; sales up, debtor up; loan received, cash up, liability up. She mentioned it to Aunty Florence like a discovery. The older woman beamed. "You have found the dual aspect concept — the deep truth under everything I have taught you. Every transaction has two effects, always equal, always opposite in the balance they preserve. It is not a rule accountants invented; it is how economic reality behaves. You cannot receive without giving; nothing enters a business without a source." She turned the cash book toward Amaka. "Double entry bookkeeping is simply this truth written down — the debit records one aspect, the credit the other. The equation stays balanced because reality itself is balanced." Amaka looked at her books differently after that: not rules to obey, but reality, faithfully mirrored.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the dual aspect concept state?', opts:['Every transaction has only one effect on the accounts', 'Every transaction has two effects on the accounting records that must balance', 'Only large transactions need to be recorded twice', 'Assets and liabilities are recorded separately, with no connection'], ans:1, exp:'The dual aspect concept holds that every transaction affects the accounts in two balancing ways — this is the underlying principle that double entry bookkeeping is built on.'}
    },
    {id:31, term:'Equity', duration:'4 min', pips:1,
      definition:`Another term for the owner's capital — the value of the owner's stake in the business after liabilities have been accounted for.`,
      scenario:`Half a year in, Amaka sat with her books one Sunday and tried to answer a simple question with a precise number: if I settled every debt today and packed everything up — what is truly mine? She listed the assets at their book values, subtracted everything owed to Big Sam, the POS company, and the remains of her mother's loan. The figure left standing was hers alone. When she showed Aunty Florence, the older woman nodded. "That is your equity — just another name for the owner's capital. What remains for the owner after every outside claim is satisfied." She traced the accounting equation with her finger. "Assets minus liabilities equals equity. Same equation, third angle. Bankers say equity, your textbook says capital, the street says 'your own inside the business' — one idea, three costumes." Amaka compared the number to her opening ₦950,000 and felt the months of work take physical shape: her stake had grown, quietly, entry by entry, and now she could prove it to the naira.`,
      votes:{up:0, down:0},
      quiz:{q:'A business has ₦5,000,000 assets and ₦2,200,000 liabilities. What is its equity?', opts:['₦2,200,000', '₦2,800,000', '₦7,200,000', '₦5,000,000'], ans:1, exp:'Equity = Assets − Liabilities = ₦5,000,000 − ₦2,200,000 = ₦2,800,000. Equity and capital are the same figure, just different names for it.'}
    },
    {id:32, term:'Expenses', duration:'4 min', pips:1,
      definition:`The value of assets and services used up by a business in the course of earning its revenue, such as rent, wages, lighting and insurance.`,
      scenario:`July brought a brutal NEPA bill, two generator refills, the shop rent falling due, and Chidi's small weekend wage. Amaka recorded each one and watched the expenses column swell with mild alarm. "Is everything I pay for just... an expense?" she asked Aunty Florence. "No — and the difference matters. Expenses are the value of things used up in earning your revenue. The electricity is consumed. The fuel burns. The rent buys you July's shelter, then it is gone. Chidi's effort serves July's customers." She contrasted it with the shelving bought months before: "That still stands and still serves — an asset. Expenses die in the period that uses them; assets live on." Then she added the sentence Amaka would repeat for years: "Do not resent your expenses. They are not losses — they are the price of the revenue standing beside them. A shop with zero expenses is a shop with zero customers. Your job is not to eliminate them, but to make sure each one earns its keep."`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following is an example of a business expense?', opts:['Buying a new delivery motorcycle', 'Monthly shop rent', 'The owner withdrawing cash for personal use', 'Stock still unsold at year end'], ans:1, exp:'Monthly rent is a cost used up in earning revenue during the period — a textbook expense. The motorcycle is capital expenditure, drawings aren\'t a business expense, and unsold stock is an asset.'}
    },
    {id:33, term:'Final Accounts', duration:'4 min', pips:1,
      definition:`An older term for the financial statements produced at the end of an accounting period, including the trading and profit and loss account and the balance sheet. The more modern term is 'financial statements'.`,
      scenario:`One rainy afternoon with the shop quiet, Aunty Florence brought over a leather-bound ledger from her own early years — 1998 inked on the spine. Amaka turned the heavy pages: neat columns, a trading account, a profit and loss account, a balance sheet, all hand-ruled. At the top of the year-end section, in careful capitals: FINAL ACCOUNTS. "That is what we called them," said Aunty Florence. "The final accounts — the statements drawn up when the year's bookkeeping was finished. The name simply meant the end product of all the recording." She tapped the modern printout on Amaka's counter. "Today the world says financial statements — same documents, newer clothes. But you will still meet the old term in textbooks, in exams, and from every accountant of my generation, so know them as twins." Amaka photographed a page of the 1998 ledger for inspiration. Different decade, different ink — but the same equation balancing at the bottom, faithful as ever.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the older term \'final accounts\' refer to?', opts:['Only the balance sheet', 'Only the cash book', 'The trading and profit and loss account and the balance sheet', 'A list of all customers who owe money'], ans:2, exp:'\'Final accounts\' is an older name for what\'s now usually called financial statements — principally the trading and profit and loss account and the balance sheet.'}
    },
    {id:34, term:'Financial Statements', duration:'4 min', pips:1,
      definition:`The set of formal reports produced at the end of an accounting period summarising a business's performance and position, principally the trading and profit and loss account and the balance sheet.`,
      scenario:`The microfinance bank on the main road was offering small business loans, and Amaka went in to ask about expanding her stock line. The loan officer listened politely, then said: "Bring your financial statements." Amaka reported the request to Aunty Florence like a riddle. "He is asking for the formal story of your business, in the language every reader of accounts understands," said Aunty Florence. "Principally two documents: your trading and profit and loss account — how the business performed over the period — and your balance sheet — where it stands right now. Performance and position. The film and the photograph." They spent the evening preparing both from Amaka's well-kept books, and Aunty Florence pointed out the quiet advantage: "Half the traders on this street cannot produce these documents at all. Your statements do more than request a loan — they announce that this business knows itself." The loan officer, reviewing the neat pages a week later, visibly relaxed. The books had spoken for her before she said a word.`,
      votes:{up:0, down:0},
      quiz:{q:'What do financial statements summarise?', opts:['Only the cash transactions of the year', 'A business\'s performance and position at the end of a period', 'Only the tax owed by the business', 'A list of all suppliers'], ans:1, exp:'Financial statements summarise a business\'s performance (via the trading and profit and loss account) and its position (via the balance sheet) at the end of an accounting period.'}
    },
    {id:35, term:'Fixed Assets', duration:'4 min', pips:1,
      definition:`Assets bought for long-term use in the business rather than for resale, such as land, buildings, machinery and vehicles. They are expected to be of use to the business for a considerable time.`,
      scenario:`Preparing the balance sheet for the bank, Amaka drew up a small register: the display cabinet, the laptop, the POS machine, the wall shelving. None of these were for sale; all of them made selling possible. "Your fixed assets," Aunty Florence confirmed. "Bought for long-term use in the business, not for resale. They are the tools of trade — the stage on which the trading happens." She had Amaka note each one's cost and purchase date. "On the balance sheet they sit above the current assets, listed most permanent first. And notice the beautiful distinction: the phones on your shelf and the cabinet holding them are both assets — but the phones are stock, waiting to leave, while the cabinet stays and serves. If tomorrow you started selling display cabinets, then cabinets would become your stock. The nature of the business, not the object itself, decides." Amaka titled the page 'Fixed Asset Register' — a small document, she would learn, that auditors and insurers love to see.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these is a fixed asset for a delivery business?', opts:['Fuel held in storage for the delivery vehicles', 'A delivery van used for years of service', 'Cash received from a delivery fee', 'An amount owed by a customer'], ans:1, exp:'The delivery van is bought for long-term use, not resale — a fixed asset. Fuel, cash and amounts owed by customers are all current assets, expected to be used or converted to cash within the year.'}
    },
    {id:36, term:'Going Concern Concept', duration:'4 min', pips:1,
      definition:`The assumption, when preparing financial statements, that a business will continue trading for the foreseeable future. This justifies valuing most assets at cost rather than at their forced 'sale up' value.`,
      scenario:`A rumour swept the street in August: the state government might widen the road, and shops on their side could face demolition within a few years. Amaka arrived at Aunty Florence's door genuinely shaken — should she value everything at what it would fetch in a panic sale? The older woman poured tea before answering. "Accounting has met your fear before. It is called the going concern concept: unless there is real evidence otherwise, we prepare accounts assuming the business will continue operating for the foreseeable future. That assumption is why your cabinet sits in the books at its cost, not at the scrap price a forced sale would fetch." She set down her cup. "The day continuation genuinely becomes doubtful — a confirmed demolition notice, an unpayable debt — the basis changes, and everything is revalued at break-up prices. But rumours are not evidence. Until then, we account for a living business, not a dying one." The road scheme, like most street rumours, evaporated by September. The books had never flinched.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the going concern concept assume?', opts:['That a business will be sold within the year', 'That a business will continue trading for the foreseeable future', 'That all assets must be valued at their forced sale price', 'That profit can never be negative'], ans:1, exp:'The going concern concept assumes the business will keep trading into the foreseeable future, which is why assets are normally valued at cost rather than at a knockdown forced-sale value.'}
    },
    {id:37, term:'Gross Loss', duration:'4 min', pips:1,
      definition:`The result when the cost of goods sold is greater than sales revenue for a period — the trading account shows a deficit before other expenses are even considered.`,
      scenario:`In May, hungry for customers, Amaka had run a loud promotion: a popular phone model at a price that undercut everyone on the street. The shop buzzed for three weeks; she felt like a market queen. Then she and Aunty Florence drew up May's trading account. Sales: ₦1,410,000. Cost of the goods sold: ₦1,468,000. Amaka stared at the negative result. "A gross loss," said Aunty Florence quietly. "Your sales did not even cover what the goods themselves cost you — before rent, before fuel, before Chidi's wages, before anything. You paid customers to take your stock." The lesson stung precisely because the shop had felt so busy. "Crowds are not profit, my dear. A gross loss at the trading level means the pricing itself is broken — no amount of cost-cutting further down can save a business that sells below cost. Check your margin on the day you set the price, not the month after." Amaka kept that May trading account pinned inside her drawer for years — her most expensive certificate.`,
      votes:{up:0, down:0},
      quiz:{q:'When does a business record a gross loss?', opts:['When total expenses exceed total revenue', 'When the cost of goods sold exceeds sales revenue', 'When the owner takes too many drawings', 'When liabilities exceed assets'], ans:1, exp:'A gross loss occurs specifically when the cost of goods sold is greater than sales revenue — a problem with the trading activity itself, calculated before other expenses are considered.'}
    },
    {id:38, term:'Gross Profit', duration:'4 min', pips:1,
      definition:`The excess of sales revenue over the cost of goods sold for a period, calculated in the trading account before any other expenses are deducted.`,
      scenario:`June was the correction. Amaka repriced carefully — cost plus a margin she could defend — bundled cases and screen guards with each phone, and let the promotion die. At month end she almost didn't want to look, but the trading account had good news: sales ₦1,650,000, cost of goods sold ₦1,180,000. "Gross profit of ₦470,000," said Aunty Florence, underlining it twice. "The excess of your sales over what the goods sold actually cost you. This is the engine figure of any trading business — the raw margin the shop generates before the running costs feed on it." She showed Amaka how to read it as a percentage of sales. "Watch this margin month after month. When it thins, something upstream is wrong — supplier prices creeping, discounts too generous, theft, waste. Gross profit is your early-warning system; by the time trouble reaches your net profit, it has already been eating for weeks." Amaka wrote the margin percentage on a card and taped it inside the till — her new north star.`,
      votes:{up:0, down:0},
      quiz:{q:'Sales revenue is ₦600,000 and cost of goods sold is ₦410,000. What is the gross profit?', opts:['₦1,010,000', '₦190,000', '₦410,000', '₦600,000'], ans:1, exp:'Gross profit = Sales − Cost of goods sold = ₦600,000 − ₦410,000 = ₦190,000.'}
    },
    {id:39, term:'Historical Cost Concept', duration:'4 min', pips:1,
      definition:`The principle that assets are normally recorded and shown in the accounts at the price originally paid for them, rather than at their current market value.`,
      scenario:`Doing her mid-year review, Amaka noticed that the laptop she had bought for ₦120,000 now sold new for ₦95,000 everywhere — prices had fallen. Should the books not be corrected to the 'true' value? Aunty Florence shook her head. "The historical cost concept: assets are recorded at what you actually paid for them. That ₦120,000 is a fact — dated, provable, sitting on a receipt. Today's market price is an opinion that changes with every trader you ask." Amaka frowned. "But then the books are wrong." "The books are verifiable, which is a different virtue," said Aunty Florence. "Imagine revaluing every asset every month on guesswork — your accounts would become a diary of moods. Cost anchors them to evidence. Yes, the trade-off is that old assets may sit below or above their market worth; accounting knows this and accepts it for the discipline it buys. Depreciation, which you will meet later, handles the fading usefulness. But the starting point is always the truth of what was paid."`,
      votes:{up:0, down:0},
      quiz:{q:'Under the historical cost concept, at what value are assets normally recorded?', opts:['Their current market value', 'Their estimated future selling price', 'The price originally paid for them', 'Whatever value the owner believes is fair'], ans:2, exp:'The historical cost concept records assets at the price actually paid for them, rather than at a constantly changing current market value — keeping the figures objective and verifiable.'}
    },
    {id:40, term:'Liabilities', duration:'4 min', pips:1,
      definition:`Amounts owed by a business to outside parties — for goods or services supplied, for expenses not yet paid, or for money borrowed.`,
      scenario:`With the bank loan approved and drawn, Amaka sat down to map everything the business now owed: the loan itself, Big Sam's 30-day account for the latest stock, a small unpaid balance with the generator repairer. She arranged them on one page under a single heading. "Your liabilities," said Aunty Florence, reviewing it. "Every amount the business owes to outsiders — for goods supplied, services rendered, or money borrowed. The other funders of your assets, alongside your own capital." She had Amaka split the page: the bank loan, repayable over two years, sat apart from the supplier balances due within weeks. "Same family, different urgency. But respect them all equally in the records, because liabilities are promises with dates attached. A business that tracks its assets but is vague about its liabilities is a person who counts income but forgets their debts — comfortable right up until the knock on the door." Amaka dated each obligation and diarised every due date. The knock, whenever it came, would find her ready.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following is a liability?', opts:['Stock held for resale', 'An amount owed to a supplier', 'Cash in the bank', 'A delivery motorcycle owned by the business'], ans:1, exp:'An amount owed to a supplier is a liability — money the business owes to an outside party. Stock, cash and the motorcycle are all assets, not liabilities.'}
    },
    {id:41, term:'Loss', duration:'4 min', pips:1,
      definition:`The result of selling goods or services for less than the cost of providing them — expenses exceed revenue for the period.`,
      scenario:`The July rains were merciless that year. The street flooded twice, customers stayed home, the generator drank fuel through the dark afternoons, and a roof leak damaged a carton of accessories. When the month's figures were totalled, the shop had simply spent more than it earned. "A loss," said Aunty Florence plainly, when Amaka showed her. "Expenses exceeded revenue for the period. The mirror image of profit — and every trader on this street has met it." What Amaka remembered afterwards was not the number but the calm. "A loss is information, not shame. Read it: which part was the weather, which part was the leak you can fix, which costs could bend when sales fall? A single loss month tells you about July. Only a pattern of them tells you about the business." They listed three actions — repair the roof, negotiate fuel in bulk, build a rainy-season cash cushion. The loss went into the books unhidden and undramatised: one honest bad month, properly recorded, thoroughly interrogated.`,
      votes:{up:0, down:0},
      quiz:{q:'When does a business make a loss?', opts:['When revenue exceeds expenses', 'When expenses exceed revenue', 'When assets exceed liabilities', 'When the owner takes drawings'], ans:1, exp:'A loss occurs when expenses exceed revenue for the period — the opposite of a profit, where revenue exceeds expenses.'}
    },
    {id:42, term:'Materiality', duration:'4 min', pips:1,
      definition:`The principle that an item only needs to be recorded with full precision if it is significant enough to matter to someone using the financial statements. Trivial items can be treated simply, even if technically inaccurate.`,
      scenario:`Chidi, newly zealous about correctness, spent twenty minutes one evening trying to decide whether the shop's new ₦1,500 stapler was capital expenditure — it would, after all, serve for years. Amaka was halfway into the debate when Aunty Florence began to laugh. "Materiality, children. An item deserves precise treatment only if it is significant enough to change anyone's view of the accounts. Will a reader of your statements make a different decision because a ₦1,500 stapler was expensed rather than treated as an asset and depreciated over five years?" Chidi admitted they would not. "Then expense it and move on. Accounting is judgement, not just rules — and part of the judgement is knowing where precision earns its cost." She gave them a working line: significance is relative to the size of the business. "₦1,500 is nothing in your accounts. In a table-top sweet stall it might matter. And ₦150,000 misplaced would matter here very much. The threshold moves; the principle stands: sweat the significant, wave through the trivial."`,
      votes:{up:0, down:0},
      quiz:{q:'What does the materiality principle allow accountants to do?', opts:['Ignore all small transactions entirely', 'Treat trivial items simply, even if technically imprecise, since they wouldn\'t matter to a user of the accounts', 'Record only transactions involving cash', 'Avoid preparing financial statements for small businesses'], ans:1, exp:'Materiality means trivial items can be treated in a simpler way, since the effort of perfect precision isn\'t justified when the amount is too small to matter to anyone using the financial statements.'}
    },
    {id:43, term:'Money Measurement Concept', duration:'4 min', pips:1,
      definition:`The principle that accounting only records facts that can be expressed in monetary terms and on which most people would agree a value — meaning many important non-financial facts about a business never appear in its accounts.`,
      scenario:`A business student from the polytechnic interviewed Amaka for a project and asked what her most valuable assets were. Amaka answered honestly: Aunty Florence's mentorship, Tunde's loyalty and his referrals, Chidi's growing skill, her own reputation on the street. The student flipped through the balance sheet, puzzled. "None of that appears here." That evening Amaka relayed the exchange. "The money measurement concept," said Aunty Florence. "Accounting records only what can be expressed in monetary terms with reasonable agreement. Your reputation is real — and no two people would price it the same, so the books stay silent about it." She spread her hands. "This is a boundary, not a flaw. Accounts answer certain questions with rigour precisely because they refuse the questions they cannot answer objectively. But never confuse the map with the territory: the balance sheet shows the measurable skeleton of this business. The flesh — trust, skill, goodwill earned cup of tea by cup of tea — lives outside the columns, and often decides everything."`,
      votes:{up:0, down:0},
      quiz:{q:'According to the money measurement concept, why might an important fact about a business NOT appear in its accounts?', opts:['Because the accountant forgot to include it', 'Because it cannot be expressed in monetary terms on which most people would agree', 'Because it relates to a future period', 'Because only the owner is allowed to know it'], ans:1, exp:'The money measurement concept restricts accounting to facts that can be reliably expressed in money — qualities like staff friendliness or location, however important, fall outside what accounting can capture.'}
    },
    {id:44, term:'Net Loss', duration:'4 min', pips:1,
      definition:`The result when the cost of goods sold plus all other expenses exceeds total revenue for a period — the final, bottom-line deficit shown in the profit and loss account.`,
      scenario:`When July's full accounts were finished — trading account first, then all the expenses stacked below — the final line confirmed what the month had felt like: a net loss of ₦84,000. Amaka traced the arithmetic. The trading section had actually squeaked out a small gross profit; it was the expenses beneath — the fuel, the roof repair, the rent against thin sales — that dragged the bottom line under. "See the anatomy of it," said Aunty Florence. "A gross loss means your pricing failed. A net loss with a healthy gross profit means the trading engine works, but the running costs overwhelmed a weak month. Different diseases, different medicine." She showed Amaka where the figure went next: deducted from capital, a bruise recorded on the owner's stake. "The books do not negotiate. But notice — because your records are complete, you know exactly which ₦84,000 this was: mostly rain, partly roof, none of it pricing. That precision is what turns a bad month into a manageable one."`,
      votes:{up:0, down:0},
      quiz:{q:'What does a net loss represent?', opts:['A loss only from the cost of goods sold', 'The final bottom-line deficit after all expenses are deducted from all revenue', 'Money owed to a supplier', 'The amount of capital withdrawn by the owner'], ans:1, exp:'Net loss is the final, bottom-line result — what\'s left after deducting cost of goods sold AND every other expense from total revenue, showing the business made an overall deficit for the period.'}
    },
    {id:45, term:'Net Profit', duration:'4 min', pips:1,
      definition:`The amount remaining after all expenses — including those beyond the cost of goods sold — have been deducted from gross profit plus any other revenue. This is the figure transferred to the capital account.`,
      scenario:`August and September repaid July's patience. The rains eased, the street filled, the repriced stock moved steadily, and the bulk fuel deal trimmed the generator's appetite. At the quarter's end, Aunty Florence and Amaka drew the accounts down to the final line: gross profit ₦1,310,000 for the quarter, total expenses ₦780,000, net profit ₦530,000. "Net profit," said Aunty Florence, with the satisfaction of a teacher at harvest. "What remains after every expense has taken its share from gross profit. The bottom line — the truest single measure of a period's performance." She showed Amaka its destination: added to capital, the owner's stake growing by exactly what the business had genuinely earned. "Gross profit flatters; net profit testifies. Rent cannot hide from it, fuel cannot hide from it, even the small charges nibble visibly. When someone asks how the business is really doing, this is the number that answers under oath." Amaka entered it into the capital account herself — ₦530,000 of proof.`,
      votes:{up:0, down:0},
      quiz:{q:'Gross profit is ₦300,000 and other expenses (rent, wages, etc.) total ₦180,000. What is the net profit?', opts:['₦480,000', '₦120,000', '₦300,000', '₦180,000'], ans:1, exp:'Net profit = Gross profit − Other expenses = ₦300,000 − ₦180,000 = ₦120,000.'}
    },
    {id:46, term:'Profit', duration:'4 min', pips:1,
      definition:`The result of selling goods or services for more than they cost to provide — revenue exceeds expenses for the period.`,
      scenario:`On a slow Sunday over tea, Amaka asked the question she had circled for months without ever asking plainly: "Aunty, what IS profit, exactly? Not the calculation — the thing itself." Aunty Florence considered it with the seriousness it deserved. "Profit is the value you create above the value you consume. You take goods, effort, electricity, shelter — all costing something — and you arrange them into a service people willingly pay more for than the whole arrangement cost you. The excess is profit. It is the market's receipt confirming you made something worth more than its ingredients." She set down her cup. "That is why profit is not the same as cash — you can earn profit that sits in debtors' pockets. And it is why honest profit is nothing to apologise for: it is evidence of usefulness. A shop that profits year after year is a shop the street keeps voting for." Amaka thought of her shelves, her prices, her regulars. Revenue exceeding expenses — and underneath the formula, usefulness, proven daily.`,
      votes:{up:0, down:0},
      quiz:{q:'When does a business make a profit?', opts:['When expenses exceed revenue', 'When revenue exceeds expenses', 'When liabilities exceed assets', 'When the owner takes drawings'], ans:1, exp:'Profit occurs when revenue exceeds expenses for the period — the opposite of a loss, where expenses exceed revenue.'}
    },
    {id:47, term:'Profit and Loss Account', duration:'4 min', pips:1,
      definition:`The section of the trading and profit and loss account in which net profit (or net loss) is calculated, by deducting expenses other than the cost of goods sold from gross profit.`,
      scenario:`With the quarter's gross profit computed, Aunty Florence ruled a line beneath the trading section and said, "Now — the second chamber of the statement. The profit and loss account." Below the line they marshalled every expense of the quarter: rent, wages, electricity, fuel, carriage outwards, the small bank charges Amaka had nearly overlooked. Each one deducted, step by step, from the gross profit brought down from the trading section above. "The trading account asked: did buying and selling generate a margin? This section asks the harder question: after the full cost of running the shop, what genuinely remains?" She pointed to where any other income — a sublet corner, interest earned — would be added if it existed. The final figure, net profit, emerged at the foot. "Two chambers, one document, one story told in the right order: first the engine, then everything the engine must carry. Read it top to bottom and you can diagnose a business the way a doctor reads a chart." Amaka labelled the sections in her own statement — trading above the line, profit and loss below — and the whole quarter clicked into narrative.`,
      votes:{up:0, down:0},
      quiz:{q:'What is calculated in the profit and loss account section?', opts:['Gross profit, by deducting cost of goods sold from sales', 'Net profit, by deducting other expenses from gross profit', 'The value of unsold stock', 'The owner\'s total capital'], ans:1, exp:'The profit and loss account section takes gross profit (already calculated in the trading account) and deducts all other expenses to arrive at net profit or net loss.'}
    },
    {id:48, term:'Prudence', duration:'4 min', pips:1,
      definition:`The principle that an accountant should be cautious when judgement is required — making sure assets and profits are not overstated, and that liabilities and losses are not understated.`,
      scenario:`In October, two temptations arrived in the same week. A private school's bursar promised — verbally, warmly — a bulk order of forty phones for the new term: "Consider it done." And in the storeroom, Amaka found that the July leak had quietly ruined six phone cases she had been carrying at full value. Her instinct was symmetrical and wrong: pencil in the big order, ignore the small damage. Aunty Florence reversed both. "Prudence — the accountant's oldest instinct. Never anticipate a profit; never ignore a loss. That order is a kind promise, not a transaction — book nothing until goods move and an obligation exists. Those damaged cases, though? Write them down today, the moment the loss is known." Amaka protested gently: it made the month look worse both ways. "Exactly," said Aunty Florence. "Prudence deliberately leans pessimistic, because businesses are ruined by overstated hope far more often than by understated caution. Let your books flatter you in only one way: by being believed." The school's order, when it finally came, was for fifteen phones — booked on the day it became real.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the prudence principle require when there is uncertainty?', opts:['Always assume the best possible outcome', 'Be cautious — don\'t overstate assets or profits, and don\'t understate liabilities or losses', 'Ignore the uncertain item entirely', 'Wait until the uncertainty is fully resolved before recording anything'], ans:1, exp:'Prudence requires caution in the face of uncertainty — erring toward not overstating what\'s good (assets, profits) and not understating what\'s bad (liabilities, losses).'}
    },
    {id:49, term:'Purchases', duration:'4 min', pips:1,
      definition:`In accounting, the goods bought by a business with the intention of reselling them, as distinct from items such as vehicles or equipment which are bought for use rather than resale.`,
      scenario:`The November restock was Amaka's biggest yet: a van from Computer Village carrying phones, cases, chargers and screen guards — everything destined for her shelves and, eventually, her customers. The same trip, she also bought a standing fan for the shop's corner. Recording it all, she nearly wrote one grand figure under Purchases. Aunty Florence intercepted the pen. "In accounting, 'purchases' has a narrower meaning than in the market. Purchases means goods bought FOR RESALE — the stock of your trade. The phones, the cases, the chargers: purchases. The fan? You bought it to use, not to sell — it is a fixed asset, not purchases." She explained why the discipline matters: "Your purchases figure flows straight into cost of goods sold, and from there into gross profit. Pollute it with fans and furniture and your trading margin becomes fiction. The question is never 'did money leave?' — it is 'was this bought to be sold?'" The van's cargo went into Purchases; the fan took its quiet place in the asset register, blades spinning, forever excluded from the trading account.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these counts as \'purchases\' in accounting terms?', opts:['A delivery motorcycle bought for the business', 'Stock bought with the intention of reselling it', 'A display cabinet bought for the shop', 'Office furniture bought for staff use'], ans:1, exp:'Purchases specifically refers to goods bought with the intention of resale — items bought for use in the business, like a motorcycle or furniture, are fixed assets, not purchases.'}
    },
    {id:50, term:'Realisation Concept', duration:'4 min', pips:1,
      definition:`The principle that profit should only be recognised once it has actually been 'realised' — meaning the goods or services have been provided, a value agreed, and there is reasonable certainty the buyer will pay.`,
      scenario:`A soldier on transfer paid Amaka a ₦40,000 deposit in November for a phone she had to order specially — delivery in two weeks, balance on collection. Cash was physically in the till, and Amaka's pen drifted toward the Sales column. Aunty Florence's hand arrived first. "Realisation. Profit is recognised only when it is realised — when the goods have been provided, a value agreed, and payment is reasonably certain. You have his money, but you have not given him his phone. There has been no sale yet — only a deposit, which the books treat as a liability: you owe him either a phone or his money back." Amaka recorded it exactly so, feeling the strange truth of holding cash that was not yet income. Two weeks later the phone arrived, the soldier collected it, paid the balance — and only then did the full amount march into Sales. "Cash answers 'do I have money?'" said Aunty Florence. "Realisation answers 'have I earned it?' Never let the first question impersonate the second."`,
      votes:{up:0, down:0},
      quiz:{q:'According to the realisation concept, when should profit be recognised?', opts:['As soon as a customer expresses interest in buying', 'Once goods or services have been provided and there is reasonable certainty of payment', 'Only once cash has actually been received', 'At the very start of the accounting period'], ans:1, exp:'The realisation concept requires that goods or services actually be provided, with an agreed value and reasonable certainty of payment, before profit can be recognised — mere interest or a reservation isn\'t enough.'}
    },
    {id:51, term:'Returns Inwards', duration:'4 min', pips:1,
      definition:`Goods previously sold to customers that have been returned to the business — also called sales returns. They are deducted from sales when calculating gross profit.`,
      scenario:`The school's fifteen-phone order went out in late November — and in the first week of December, three came back. Faulty batteries, the bursar said, politely but firmly. Amaka checked them, agreed, and issued replacements from stock. Then she sat before her books, unsure how to undo a sale without pretending it never happened. "You don't undo it — you answer it," said Aunty Florence. "Returns inwards: goods your customers have sent back. They get their own account, and at year end the total is deducted from sales." Amaka asked why not simply reduce the Sales figure quietly. "Because information hides in the separation. Sales tells you what customers bought; returns inwards tells you what they refused to keep. If that second number grows, something is wrong — a supplier's quality slipping, promises your goods cannot keep. Bury returns inside sales and you blind yourself to your own warning light." Three phones, honestly recorded — and when the same battery fault appeared a fourth time, Amaka spotted the pattern in one glance at the account.`,
      votes:{up:0, down:0},
      quiz:{q:'How are returns inwards treated when calculating gross profit?', opts:['Added to purchases', 'Deducted from sales', 'Added to cost of goods sold directly', 'Ignored, since the goods are now back in stock'], ans:1, exp:'Returns inwards (goods customers send back) are deducted from sales revenue when calculating gross profit — the original sale is effectively partly reversed.'}
    },
    {id:52, term:'Returns Outwards', duration:'4 min', pips:1,
      definition:`Goods previously bought from suppliers that have been returned by the business — also called purchases returns. They are deducted from purchases when calculating the cost of goods sold.`,
      scenario:`The battery pattern had a source, and Amaka traced it: a batch of chargers and two phone models from Big Sam Distributions, all from the same November consignment. She packed the faulty units, obtained Big Sam's grudging agreement, and sent them back across Lagos. "And now the mirror entry," said Aunty Florence, opening the books. "Returns outwards — goods YOU return to YOUR suppliers. Deducted from purchases at year end, just as returns inwards is deducted from sales." Amaka enjoyed the symmetry: the trading account would now reflect only goods genuinely kept and genuinely sold. But Aunty Florence pressed the practical point harder. "Record the return the day the goods leave, and chase the credit note until it is in your hand. A supplier's memory of goods received back is the shortest memory in commerce. Your returns outwards account is not just bookkeeping — it is your evidence file." Big Sam's credit note arrived eleven days and three reminders later. The account had every date ready.`,
      votes:{up:0, down:0},
      quiz:{q:'How are returns outwards treated when calculating cost of goods sold?', opts:['Added to sales', 'Deducted from purchases', 'Added to closing stock', 'Ignored, since the supplier already has the goods back'], ans:1, exp:'Returns outwards (goods sent back to suppliers) are deducted from purchases — the original purchase is effectively partly reversed when calculating cost of goods sold.'}
    },
    {id:53, term:'Revenue', duration:'4 min', pips:1,
      definition:`The financial value of goods and services that a business has supplied to its customers during a period — the starting point for calculating profit.`,
      scenario:`As December opened, Amaka totalled the year's takings so far and showed Aunty Florence the figure with quiet pride: everything the shop had earned from serving its customers. "Your revenue," the older woman said. "The financial value of the goods and services you supplied during the period — the top line, the starting point of every profit calculation." She was careful with the edges of the definition. "Revenue is what you EARNED by trading — not every naira that wandered into the till. The bank loan was not revenue. The soldier's deposit was not revenue until his phone was delivered. And revenue is not profit — it is the gross river before every cost drinks from it." She sketched the waterfall: revenue at the top, cost of goods sold taken out, expenses taken out, profit at the bottom. "People boast about revenue because it is the biggest number they have. You will learn to respect it differently — as the measure of how much the street trusted you this year with its money."`,
      votes:{up:0, down:0},
      quiz:{q:'What does revenue represent?', opts:['The cash a business has in the bank', 'The financial value of goods and services supplied to customers during a period', 'The amount owed to suppliers', 'The profit remaining after all expenses'], ans:1, exp:'Revenue is the value of goods and services supplied to customers during a period — the starting point from which expenses are deducted to eventually arrive at profit.'}
    },
    {id:54, term:'Sales', duration:'4 min', pips:1,
      definition:`In accounting, the income from selling the goods which the business normally deals in and which were bought with the intention of resale — not the disposal of other assets such as vehicles.`,
      scenario:`In mid-December Amaka finally replaced the original display cabinet — Mrs. Adeyemi's, the one from the very first morning — with a larger glass unit. A neighbouring trader bought the old cabinet for ₦70,000 cash. Amaka, festive and moving fast, recorded it under Sales. Aunty Florence found it during the weekly review and circled it. "Sales — in the accounting sense — means income from selling the goods you actually trade in. Phones, cases, chargers: the things bought for resale. That cabinet was a fixed asset. Disposing of it is the sale of an asset, recorded through the asset's own account — never through Sales." Amaka asked what harm one cabinet could do. "It inflates your trading revenue with something that is not trading. Your gross profit margin — the number taped inside your till — would lie to you this month. Sales is a measure of your trade, and it stays pure only if you guard its gate." The ₦70,000 moved to its proper home, and the margin on the till card stayed honest.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these would be recorded as \'sales\' in a kiosk\'s accounts?', opts:['Selling an old delivery motorcycle no longer needed', 'Selling phone cases, the kiosk\'s normal trading stock', 'Selling a display cabinet being replaced', 'Receiving a loan from the bank'], ans:1, exp:'Sales specifically refers to income from selling the goods a business normally trades in. Selling other assets like a motorcycle or cabinet is a separate type of transaction, not sales.'}
    },
    {id:55, term:'Separate Determination Concept', duration:'4 min', pips:1,
      definition:`The principle that the value of each individual asset or liability must be assessed on its own, before being added together into a total — potential gains and losses should not simply be netted off against each other.`,
      scenario:`Preparing for the year-end valuation, Amaka faced a puzzle in her stock list. One phone model had surged in demand — units she had bought at ₦85,000 now sold everywhere for ₦110,000. Another model had flopped; bought at ₦95,000, it would struggle to fetch ₦70,000. Netted together, she reasoned, the good news roughly covered the bad — leave both at cost? Aunty Florence shook her head slowly. "Separate determination. Each asset is valued on its own merits before anything is totalled — gains on one item never excuse losses on another." The rule, she explained, works hand in hand with prudence: "The flopped model must come down to what it will actually realise — recognise the loss now. The strong model stays at cost — its profit is recognised only when it sells. You may not decorate a loss with an unrealised gain." Amaka revalued the slow stock downward, item by item, and left the winners waiting to prove themselves at the till, where all profit is finally decided.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the separate determination concept prevent?', opts:['Recording any losses at all', 'Simply netting off potential gains and losses against each other instead of assessing each item individually', 'Combining similar items into one account', 'Recording assets at historical cost'], ans:1, exp:'Separate determination requires each asset or liability to be assessed on its own merits — netting a probable gain against a probable loss to show one combined figure would hide important information.'}
    },
    {id:56, term:'Stock', duration:'4 min', pips:1,
      definition:`Goods held by a business with the intention of resale. The value of unsold stock at the end of a period is needed to calculate the cost of goods sold and appears as a current asset on the balance sheet.`,
      scenario:`On the 31st of December, Amaka closed the shop early, sent out for suya, and began the year-end stocktake with Chidi. Shelf by shelf, carton by carton: every phone checked against the list, every case counted, every charger tested and tallied. It took four hours. "Why the ceremony?" Chidi asked, somewhere in hour three. "Because stock is the hinge of the whole year's result," Amaka answered — and realised she was quoting Aunty Florence without needing her in the room. "This closing figure gets subtracted in the cost of goods sold. Count too high and the year's profit inflates falsely; count too low and we punish ourselves. And this same number appears on the balance sheet as a current asset. One count, two statements — it has to be right." They found a carton of screen guards missing from the list and two phones listed that had been display units all along. Corrections made, the final figure was signed by both counters. Outside, fireworks were already testing the sky.`,
      votes:{up:0, down:0},
      quiz:{q:'Why does a business need to know the value of its closing stock?', opts:['To calculate how much tax is owed', 'Because it\'s needed to calculate cost of goods sold and appears as a current asset on the balance sheet', 'Because stock cannot be sold once counted', 'To determine the owner\'s capital directly'], ans:1, exp:'Closing stock value feeds into the cost of goods sold calculation and is shown separately as a current asset on the balance sheet — it plays a role in both major financial statements.'}
    },
    {id:57, term:'Substance Over Form', duration:'4 min', pips:1,
      definition:`The principle that a transaction should be accounted for according to its real economic effect, even if this differs from its strict legal form.`,
      scenario:`Reviewing the year's contracts, Amaka reread the POS machine agreement and noticed its language for the first time: a 'rental' of ₦12,500 monthly for twenty-four months — after which the machine became hers for a token ₦1,000. She had been treating it as rent expense. Aunty Florence read the document twice. "The paper says rental. The economics say purchase by instalments — you carry the machine's risks, you enjoy its rewards, and ownership is guaranteed for pocket change at the end. Substance over form: we account for the real economic effect of a transaction, not the costume its legal wording wears." They restated it: the machine onto the books as an asset, the future instalments as a liability. Amaka asked why any drafter would dress a purchase as a rental. "Many reasons — some innocent, some designed to keep debts off balance sheets. Which is precisely why this principle exists. An accountant's loyalty is to what happened, not to what the paperwork prefers to call it."`,
      votes:{up:0, down:0},
      quiz:{q:'What does the substance over form principle prioritise?', opts:['The strict legal wording of an agreement', 'The real economic effect of a transaction, even if it differs from its legal form', 'Whichever treatment results in lower tax', 'The preference of whoever drafted the contract'], ans:1, exp:'Substance over form looks past the legal label of a transaction to its real economic effect — what\'s actually happening financially matters more than how it\'s formally described.'}
    },
    {id:58, term:'T-Account', duration:'4 min', pips:1,
      definition:`The traditional layout for an individual account in the accounting books, drawn as a large letter 'T' with the account title across the top, debit entries on the left and credit entries on the right.`,
      scenario:`In the quiet week before New Year, a neighbour's daughter, Ngozi, came to ask about weekend work — the shop was growing and Amaka needed another pair of hands. Chidi, eighteen months from his own first blunders, was assigned to teach her the books. Amaka watched from the counter as he drew a large T on a fresh page, exactly as Aunty Florence once had. "This is a T-account," he began. "The account name goes across the top. The left side is debit, the right side is credit. Every account in these books — cash, sales, rent, Tunde's account — is just one of these Ts." He recorded a sample sale in two Ts, one debit, one credit, and made Ngozi balance a toy cash account until the c/d figure clicked. "It looks like a child's drawing," Chidi told her, "but every accounting system in the world — even the software in the big banks — is this T, multiplied by a million." Amaka said nothing, and texted Aunty Florence: the teaching has a grandchild now.`,
      votes:{up:0, down:0},
      quiz:{q:'In a T-account, where are debit entries recorded?', opts:['On the right-hand side', 'On the left-hand side', 'Across the top', 'Underneath the account title only'], ans:1, exp:'In the traditional T-account layout, debit entries go on the left-hand side and credit entries go on the right-hand side.'}
    },
    {id:59, term:'Time Interval Concept', duration:'4 min', pips:1,
      definition:`The principle that financial statements are prepared for fixed, regular periods of time — typically a year for external reporting, though management may use shorter periods internally.`,
      scenario:`Over New Year tea, Aunty Florence asked Amaka a deceptively simple question: "When does your business's year end?" Amaka laughed — it ends when the year ends, surely? "By convention, yes — many choose the 31st of December. But the principle underneath is the time interval concept: financial statements are prepared for fixed, regular periods, so results can be compared like with like. A year for the formal statements; and internally, you have already been living the concept — every month you close the books, draw the figures, and compare against the month before." She explained the discipline hiding in the regularity: "A trader who measures 'whenever things feel slow' can convince himself of anything. Fixed intervals remove the choice. December must face December; this year must stand against last year, same length, same rules. Time interval is what turns your accounts from a diary into an instrument." They settled it formally over the teacups: Amaka Phones' accounting year would end every 31st of December — a birthday for the books, one day before everyone else's.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the time interval concept establish?', opts:['That financial statements should only ever be prepared once, when a business closes', 'That financial statements are prepared for fixed, regular periods of time', 'That all businesses must report monthly', 'That profit can only be measured over multi-year periods'], ans:1, exp:'The time interval concept establishes that financial statements are prepared for fixed, regular periods — typically a year externally, though businesses often use shorter periods for internal management purposes.'}
    },
    {id:60, term:'Trading Account', duration:'4 min', pips:1,
      definition:`The section of the trading and profit and loss account in which gross profit (or gross loss) is calculated, by deducting the cost of goods sold from sales revenue.`,
      scenario:`The first working day of January, Aunty Florence arrived with her old ruler and declared it statement week. They began with the trading account for the full year. Sales at the top — with returns inwards deducted to leave true net sales. Then the cost of goods sold, assembled piece by piece from the year's records: opening stock from last January's very first count, plus the year's purchases, plus carriage inwards, minus returns outwards, minus the closing stock signed off on New Year's Eve. The subtraction at the bottom revealed the year's gross profit — and Amaka read the number twice, because it was larger than she had dared guess. "This section answers one question only," said Aunty Florence. "Did the buying and selling of goods — the pure trade — generate a margin? Every figure in it has been marching toward this page all year: every count, every return, every delivery fee. The trading account is where twelve months of small discipline is paid out at once."`,
      votes:{up:0, down:0},
      quiz:{q:'What is calculated in the trading account section?', opts:['Net profit, after all expenses', 'Gross profit, by deducting cost of goods sold from sales', 'The owner\'s total capital', 'Cash held at the bank'], ans:1, exp:'The trading account section calculates gross profit (or gross loss) by deducting the cost of goods sold from sales revenue — the first step before other expenses are considered.'}
    },
    {id:61, term:'Trading and Profit and Loss Account', duration:'4 min', pips:1,
      definition:`A financial statement combining the trading account and the profit and loss account, showing how a business arrived at its net profit or net loss for a period.`,
      scenario:`With the trading section ruled off, they built downward: the full trading and profit and loss account, the year's complete performance on a single page. Gross profit brought down from above. Then every expense of the year in ordered ranks — rent, Chidi's and now Ngozi's wages, electricity, generator fuel, carriage outwards, bank charges, the small repairs — each deducted in turn. The final line: net profit for the year. Amaka sat back and read the whole document top to bottom, and the year replayed itself inside the figures — the May promotion bleeding in the margins, June's correction, July's floods hiding in the fuel line, the strong final quarter carrying the total upward. "One statement, two chambers, twelve months," said Aunty Florence. "Show this page to any accountant, any banker, anywhere, and they can read your year the way you just did. That is the power of the form — it turns your story into a language every serious reader speaks." The net profit moved to capital, and the page was ruled closed.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the trading and profit and loss account show overall?', opts:['Only the assets and liabilities of a business', 'How a business arrived at its net profit or net loss for a period', 'A list of all customers who owe money', 'The cash balance at a single point in time'], ans:1, exp:'The trading and profit and loss account combines both stages — gross profit calculation and then net profit calculation — to show the full journey from sales revenue down to the final net profit or loss.'}
    },
    {id:62, term:'Trial Balance', duration:'4 min', pips:1,
      definition:`A list of all the account balances in a business's ledgers at a particular date, arranged into debit and credit columns. If double entry has been carried out correctly, the two columns will total the same amount.`,
      scenario:`Before the statements could be trusted, one ritual remained — the one Amaka had feared since Aunty Florence first described it. The trial balance: every single account in the books listed with its balance, debits in one column, credits in the other. If the year's double entry was sound, two columns built from hundreds of entries would total the same figure to the naira. They extracted the balances together — cash, bank, stock, every debtor, every creditor, sales, purchases, each expense, capital, drawings — and Amaka totalled both columns with her breath held. A difference of ₦18,000. Twenty minutes of hunting found it: a rent payment posted to the debit side twice back in August. Corrected, retotalled — agreement, exact and beautiful. "Understand what this proves and what it does not," said Aunty Florence. "Agreement means the arithmetic of double entry held. It cannot catch an entry posted to the wrong account, or a transaction never recorded at all. The trial balance is a strong gate, not an all-seeing eye. But no statement should ever be built on books that cannot pass it."`,
      votes:{up:0, down:0},
      quiz:{q:'What does a trial balance check?', opts:['Whether the business made a profit', 'Whether the debit and credit columns of all account balances total the same amount', 'Whether all customers have paid what they owe', 'Whether stock has been correctly counted'], ans:1, exp:'A trial balance lists every account balance into debit and credit columns — if double entry has been done correctly, both columns will total the same amount, which is a useful (though not foolproof) check.'}
    },
    {id:63, term:'Working Capital', duration:'4 min', pips:1,
      definition:`The amount by which current assets exceed current liabilities — a measure of the short-term resources a business has available for its day-to-day operations. Also called net current assets.`,
      scenario:`When the statements were finished and filed, Aunty Florence asked for one last calculation before the tea went cold. "Current assets, minus current liabilities." Amaka worked it: stock, debtors, bank and cash on one side; Big Sam's account, the loan instalments due within the year on the other. The difference — comfortably positive — sat on the page between them. "Your working capital," said Aunty Florence. "The cushion your business breathes with. Profit is the year's verdict; working capital is tomorrow morning's reality — whether you can restock, absorb a slow fortnight, survive a supplier arriving early or a debtor paying late." Amaka looked at the figure and understood it was the true answer to the question she had asked on that first Monday morning, standing in an empty shop with a knot in her stomach: how do I know where I stand? "Now," said Aunty Florence, lifting her cup toward the shelves, the new cabinet, the ledgers, the year, "you begin year two — and this time, you keep the books from day one." Amaka raised her own cup. She already had the first page ruled.`,
      votes:{up:0, down:0},
      quiz:{q:'Current assets are ₦450,000 and current liabilities are ₦200,000. What is the working capital?', opts:['₦650,000', '₦250,000', '₦200,000', '₦450,000'], ans:1, exp:'Working capital = Current assets − Current liabilities = ₦450,000 − ₦200,000 = ₦250,000.'}
    }
  ],
  exam: {
    title: 'Business Accounting Vol 1 — Beginner Exam',
    passMark: 70,
    pips: 12,
    questions: [
      {q:'Which of the following is the correct form of the accounting equation?', opts:['Assets = Capital − Liabilities', 'Assets = Capital + Liabilities', 'Capital = Assets + Liabilities', 'Liabilities = Assets + Capital'], ans:1, exp:'Assets = Capital + Liabilities is the standard form — what the business has (assets) equals who supplied it (the owner via capital, and others via liabilities).'},
      {q:'A business has assets of £120,000 and liabilities of £35,000. What is its capital?', opts:['£155,000', '£85,000', '£35,000', '£120,000'], ans:1, exp:'Capital = Assets − Liabilities = £120,000 − £35,000 = £85,000.'},
      {q:'In a T-account, an increase in an asset is recorded as a:', opts:['Credit', 'Debit', 'Either, depending on the asset', 'Balance carried down'], ans:1, exp:'Assets increase with a debit entry — the left-hand side of the T-account.'},
      {q:'A business buys goods on credit for resale, costing £500. What is the correct double entry?', opts:['Debit Purchases £500, Credit the supplier\'s account £500', 'Debit the supplier\'s account £500, Credit Purchases £500', 'Debit Sales £500, Credit Purchases £500', 'Debit Cash £500, Credit Purchases £500'], ans:0, exp:'Buying goods for resale on credit increases the asset of stock (debit Purchases) and increases a liability to the supplier (credit their account).'},
      {q:'A customer returns £40 of goods previously sold to them on credit. What is the correct double entry?', opts:['Debit Returns Outwards £40, Credit the customer\'s account £40', 'Debit the customer\'s account £40, Credit Returns Inwards £40', 'Debit Returns Inwards £40, Credit the customer\'s account £40', 'Debit Sales £40, Credit Returns Inwards £40'], ans:2, exp:'Returns Inwards (sales returns) is debited, and the customer\'s account is credited because they now owe £40 less.'},
      {q:'The owner of a business withdraws £200 cash for personal use. Which statement is correct?', opts:['This is recorded as a business expense', 'This increases the business\'s capital', 'This is recorded in a Drawings account and reduces capital, but is never an expense', 'This has no effect on the accounts'], ans:2, exp:'Drawings reduce the owner\'s capital but are never treated as a business expense — they are recorded in a separate Drawings account.'},
      {q:'After balancing a supplier\'s account, the credit side is larger than the debit side. What does this tell us?', opts:['The supplier owes the business money', 'The business owes the supplier money — a creditor balance', 'There is definitely an error in the account', 'The account should be deleted'], ans:1, exp:'A credit balance on a supplier\'s (personal) account means the business owes that supplier money — they are a creditor.'},
      {q:'Which of the following errors would NOT be revealed by an otherwise balancing trial balance?', opts:['Adding up a column of figures incorrectly', 'Recording the debit and credit of a transaction with different amounts', 'Omitting a transaction entirely from the books', 'Entering only one side of a transaction'], ans:2, exp:'If a transaction is left out entirely, neither the debit nor credit total is affected — the trial balance will still balance despite the error.'},
      {q:'A business has Sales of £45,000, Purchases of £30,000, and Closing Stock of £5,000. What is the Gross Profit?', opts:['£10,000', '£20,000', '£25,000', '£15,000'], ans:1, exp:'Cost of Goods Sold = Purchases − Closing Stock = £30,000 − £5,000 = £25,000. Gross Profit = Sales − Cost of Goods Sold = £45,000 − £25,000 = £20,000.'},
      {q:'On a balance sheet, current assets are normally listed in which order?', opts:['Alphabetical order', 'Order of increasing liquidity, ending with cash', 'Order of original cost, highest first', 'Random order, as they are not significant'], ans:1, exp:'Current assets are listed starting with the item furthest from being cash (e.g. stock) and ending with cash itself.'},
      {q:'Carriage inwards of £150 was paid on goods purchased for resale. Where does this amount appear in the financial statements?', opts:['As a deduction from sales', 'Added to purchases in the trading account', 'As an expense in the profit and loss account, never affecting gross profit', 'Subtracted from capital'], ans:1, exp:'Carriage inwards is added to the cost of purchases in the trading account, because it forms part of the true cost of obtaining stock for resale.'},
      {q:'Which accounting concept states that revenues and expenses should be matched to the period they relate to, regardless of when cash is received or paid?', opts:['The going concern concept', 'The consistency concept', 'The accruals concept', 'The materiality concept'], ans:2, exp:'The accruals concept matches income and costs to the accounting period to which they relate, independent of the timing of cash receipts and payments.'},
      {q:'A business expects to lose a £10,000 lawsuit and separately expects to win a £6,000 claim. According to prudence and separate determination, how should this be shown?', opts:['Net liability of £4,000', 'Net asset of £4,000', 'The £10,000 probable loss is recognised; the £6,000 probable gain is not recognised until certain', 'Neither amount is recorded until both cases conclude'], ans:2, exp:'Prudence requires probable losses to be recognised promptly, while probable gains are withheld until reasonably certain — and separate determination prohibits simply netting the two off.'},
    ]
  }
},
};

// ── NOVEL: LONG-FORM NARRATIVE (foundation arc) ──────────────
// A 3-chapter story-driven alternative to the bite-sized lessons, for
// learners who want to absorb the same foundational ideas through one
// continuous narrative instead of discrete cards. Stars Amaka, the same
// trader used throughout the lesson scenarios above, so the two reading
// modes reinforce each other rather than introducing a new world. Future
// chapters/arcs (ACCA/ICAN-level material, new topics) can be appended
// to this array as the content library grows.
const novelChapters = [
  {
    chapter: 1,
    title: 'The Kiosk',
    dek: 'In which a phone-accessories stall on Allen Avenue becomes an education.',
    body: `The kiosk was four feet wide and painted the green of an old Sprite bottle, wedged between a shoe repairer and a woman who sold roasted plantain so fragrant it made customers linger even when they'd only come for a phone case. Amaka had saved for eight months to rent it &mdash; eight months of typing reports for a logistics company by day and re-counting her savings by candlelight at night, the way you check a wound to see if it's healing.

<br><br>On her first morning, she arranged the screen protectors in a fan across the little table, hung the phone cases on a wire she'd bent into hooks herself, and sat down to wait. By noon she had sold eleven thousand naira of stock and felt, for the first time in her adult life, entirely awake.

<br><br>She kept the money in a biscuit tin under the table. At the end of each day she counted it, watched it grow, and felt the particular, uncomplicated joy of a number getting bigger. It did not occur to her, in those first weeks, that a number getting bigger and a business doing well were not always the same thing.

<br><br>The trouble announced itself quietly. Three weeks in, she needed to restock &mdash; chargers, mostly, the fast-charging kind everyone wanted now &mdash; and when she went to the tin, there was less in it than she expected. Not gone, exactly. Spent. On stock, on the danfo fare to the market in Computer Village, on a new umbrella when the old one's rib snapped in a downpour, on jollof from the bukka two stalls down when she was too tired to cook. All reasonable. All, individually, defensible. And yet she could not say, with any confidence, whether the kiosk owed her money, or she owed it.

<br><br>&ldquo;You are frowning at your tin like it owes you an apology,&rdquo; said a voice.

<br><br>It was Aunty Florence, from the provisions stall across the walkway &mdash; a woman somewhere past fifty with reading glasses pushed up into grey-flecked hair and a thick exercise book always open beside her cash box. Twenty-two years she'd been trading there, people said. She owned the building two stalls down from her own stall now, rented it out, and never seemed to hurry.

<br><br>&ldquo;I don't even know what it owes me, Aunty,&rdquo; Amaka admitted. &ldquo;I'm selling things. People are buying. But I look in here and I can't tell if I'm &mdash; winning.&rdquo;

<br><br>Aunty Florence pulled a stool over without being asked, which Amaka would come to learn was how she did most things &mdash; without being asked, and entirely correctly.

<br><br>&ldquo;Selling is not the same as knowing,&rdquo; she said. &ldquo;You are doing the first part. Nobody taught you the second.&rdquo; She tapped her exercise book. &ldquo;This is not magic, you know. People think accounting is for big companies with computers. It is the same thing you are trying to do in your head right now, except written down properly, so that it cannot lie to you &mdash; and so that you cannot lie to yourself either.&rdquo;

<br><br>She made Amaka walk through it with her, that afternoon, in plain language. Every time money or goods changed hands in a way that mattered to the business &mdash; that was something worth <em>identifying</em>. Once you knew what happened, you put a number on it &mdash; that was <em>measuring</em>. Write it down, properly, so it survives past your memory &mdash; that was <em>recording</em>. Later, you'd sort similar things together, add them into totals, lay them out clearly, and finally &mdash; the part Amaka was missing entirely &mdash; <em>interpret</em> what they actually meant.

<br><br>&ldquo;You have been doing the first three since day one,&rdquo; Aunty Florence said. &ldquo;Badly, but you've been doing them. It's the last part you're skipping. You count your tin and you stop. You never ask the tin what it's telling you.&rdquo;

<br><br>She had Amaka list out, then and there, everything the kiosk actually had. Not just the cash &mdash; though that counted too. The display stand, bought outright. Forty thousand naira of unsold stock still hanging on the wire. And &mdash; Amaka hesitated over this one &mdash; eight thousand naira that Tunde, a regular from the GTBank building across the road, still owed her for two phone cases he'd taken &ldquo;till Friday&rdquo; three Fridays ago.

<br><br>&ldquo;That is yours too,&rdquo; Aunty Florence said, when Amaka explained, half-apologetic, as though admitting to a mistake. &ldquo;Anything you own, or anything someone owes you that you genuinely expect to collect &mdash; that is an asset. The cash in your tin, your stock on the wire, even what Tunde owes you. Write them all down. An asset is not just what's already in your hand. It's what you have, full stop &mdash; including what's coming to you.&rdquo;

<br><br>That night, for the first time, Amaka did not put the biscuit tin away unexamined. She bought a notebook from the stationery stall on her way home &mdash; pink cover, the kind schoolchildren used &mdash; and on the first page, by candlelight, she wrote a date, and beneath it, slowly, the first real list of what her kiosk actually owned.

<br><br>She was still writing when her phone buzzed. A message from Mr. Eze, the wholesaler in Computer Village: <em>Sister Amaka, if you want, I fit give you stock on credit this time. Pay me end of month.</em>

<br><br>She stared at the message for a long moment. Eight thousand naira was owed <em>to</em> her. Now, if she said yes, she would owe money <em>to</em> someone else. She had no idea, yet, what to call that, or what it would do to the careful little list she'd just made.

<br><br>She wrote <em>yes</em> back to Mr. Eze, closed the notebook, and went to sleep not knowing that she had just stepped into the second half of a lesson Aunty Florence hadn't taught her yet.`
  },
  {
    chapter: 2,
    title: 'What Moves Must Balance',
    dek: 'Credit, double entry, and the cost of pretending family isn\u2019t business.',
    body: `Mr. Eze's stock arrived on a Tuesday &mdash; cartons of chargers and earphones, sixty thousand naira's worth, with a handwritten invoice and a promise wedged into one corner: <em>Payment due 30th.</em>

<br><br>Amaka unpacked it with the particular nervous energy of someone who has just acquired more than they've paid for. She told Aunty Florence about it over roasted plantain that evening, expecting praise for the growth. Instead, Aunty Florence asked a question that made Amaka go quiet.

<br><br>&ldquo;So tell me. Before that stock arrived, what did your kiosk own, and who did it owe?&rdquo;

<br><br>Amaka counted on her fingers. Stock, cash, the display stand, what Tunde owed her &mdash; those were assets, she remembered that part now. And before Tuesday, she'd owed nobody.

<br><br>&ldquo;And now?&rdquo;

<br><br>&ldquo;Now I have sixty thousand more in stock. And I owe Mr. Eze sixty thousand.&rdquo;

<br><br>&ldquo;Good. Now you understand something most people pay for a whole semester to learn.&rdquo; Aunty Florence drew three words in the dust on the table with her finger &mdash; <em>Assets. Liabilities. Capital.</em> &ldquo;Assets is everything the business has. Liabilities is what it owes to outsiders &mdash; Mr. Eze, for instance. Capital is what's actually yours &mdash; your own stake, after you take away what's owed. Every single time something happens in this business, these three must still balance. Assets must always equal liabilities plus capital. Always. If they don't, somebody &mdash; usually you &mdash; has made a mistake.&rdquo;

<br><br>&ldquo;That sounds like something that should be hard.&rdquo;

<br><br>&ldquo;It is hard, until you've done it a hundred times, and then it's just breathing.&rdquo; Aunty Florence smiled, the particular smile of someone who remembered being twenty-six and certain that ledgers were beyond her. &ldquo;Here is the trick nobody tells beginners: nothing happens to only one side. Every kobo that moves, moves <em>from</em> somewhere <em>to</em> somewhere. Your stock went up by sixty thousand. Where did that sixty thousand come from? Not your pocket. It came from Mr. Eze's generosity, which is really just a debt with a deadline. So your liabilities go up by exactly the same amount your assets went up. Two sides, every time. That is the whole secret of what they call double entry. People make it sound like wizardry. It is just honesty, written twice.&rdquo;

<br><br>Amaka began, that week, to write every transaction as two lines instead of one &mdash; what came in, and where it came from; what went out, and where it went. It was slower. It also, for the first time, felt like the truth.

<br><br>The trouble came on a Thursday in the third week &mdash; the kind of trouble that doesn't announce itself as trouble. Amaka's younger brother, Chidi, called from the hostel: his school fees had been miscalculated, a shortfall of fifteen thousand naira, due by Friday morning or he'd be sent home. Amaka did not think. She opened the tin, took fifteen thousand naira, sent it by transfer, and went back to selling chargers.

<br><br>She did not write it down. Not because she meant to hide it &mdash; she simply didn't think of it as a <em>business</em> transaction at all. It was family. It felt separate.

<br><br>It was not separate, as it turned out, and the kiosk would not let her forget it.

<br><br>By the following week her cash balance refused to match her notebook. She had recorded sales correctly, recorded what she'd paid Mr. Eze against his invoice, recorded everything &mdash; and still, fifteen thousand naira had simply vanished from the world as far as her books were concerned. She searched the notebook three times before Aunty Florence found her hunched over it after closing, close to tears over a sum that, on its own, was not even that large.

<br><br>&ldquo;What did you spend that you didn't write down?&rdquo; Aunty Florence asked, not unkindly, the moment Amaka explained.

<br><br>Amaka told her about Chidi.

<br><br>&ldquo;Ah.&rdquo; Aunty Florence nodded slowly. &ldquo;Your business and you are not the same person, you know. Even though you are the only person here. The kiosk is its own small thing, with its own life, separate from your family, your fees at home, your rent &mdash; everything. That money you took out wasn't a business expense. It also wasn't nothing. It is what we call <em>drawings</em> &mdash; you, the owner, taking something out of the business for yourself. It still has to be written down. Otherwise your books will always be hunting for a ghost.&rdquo;

<br><br>&ldquo;So I did something wrong by helping my brother?&rdquo;

<br><br>&ldquo;No, my dear. You did something wrong by pretending it didn't happen.&rdquo; Aunty Florence's voice softened. &ldquo;Write it next time &mdash; <em>Drawings, fifteen thousand.</em> Now your cash makes sense again, and you can still sleep at night knowing exactly what you actually have left, instead of guessing.&rdquo;

<br><br>There was a smaller, quieter lesson that same month, one that took Amaka longer to notice on her own. NEPA's light bill for the kiosk arrived in the second week of the following month, for electricity she had used the month before. She nearly recorded it against the new month's profit, until Aunty Florence stopped her.

<br><br>&ldquo;When did you actually use that light?&rdquo;

<br><br>&ldquo;Last month.&rdquo;

<br><br>&ldquo;Then it belongs to last month's expenses, whenever the bill happens to arrive. Money doesn't decide which month a cost belongs to. The using of it does. We call that the accruals idea &mdash; match the cost to when it actually happened, not to when the paper finally catches up to you.&rdquo;

<br><br>By the end of that second month, Amaka's notebook had become something she was, quietly, a little proud of &mdash; neat columns, no ghosts, every kobo accounted for both in where it came from and where it went. She still did not know, precisely, whether the kiosk was <em>profitable</em>. She knew, for the first time, that she finally had everything she needed to find out.`
  },
  {
    chapter: 3,
    title: 'What the Numbers Said',
    dek: 'A loan application, a missing eight thousand naira, and the question every set of accounts must eventually answer.',
    body: `The opportunity arrived the way most real ones do &mdash; sideways, attached to a deadline. A women's trade cooperative was offering small expansion loans, enough for Amaka to rent the empty stall beside hers and finally stock phones outright instead of only accessories. Applications closed in nine days. The form asked, in its third section, for something Amaka had never produced in her life: a trading account, a profit and loss account, and a balance sheet, for the past six months of trading.

<br><br>&ldquo;Six months,&rdquo; Amaka said, staring at the form on Aunty Florence's small television-stand desk. &ldquo;I have six months of notebook. I don't have six months of &mdash; whatever this is.&rdquo;

<br><br>&ldquo;You have everything you need,&rdquo; Aunty Florence said. &ldquo;You've been recording properly since the second month. We just have to make your notebook speak. Bring it tomorrow evening. We start with something called a trial balance.&rdquo;

<br><br>A trial balance, Aunty Florence explained the next evening, was simply every single balance in Amaka's books, listed out &mdash; everything she owned on one side, everything she owed and everything that was truly hers on the other &mdash; added up to see if the two sides agreed. If they did, it meant, with reasonable confidence, that her double entry had been done correctly all along. If they didn't &mdash;

<br><br>They didn't.

<br><br>The first time Amaka added her columns, one side came to four hundred and twelve thousand naira, and the other to four hundred and four thousand. Eight thousand naira, sitting nowhere, refusing to be accounted for. Amaka felt something close to panic &mdash; the particular dread of being caught having lied, even though she was almost certain she hadn't.

<br><br>It took an hour of Aunty Florence's patient, unhurried tracing &mdash; finger moving down each line of the notebook &mdash; to find it. A sale to a customer, recorded correctly as cash received, but never removed from the stock figure it had come from. A single missed line, months old, sitting quietly wrong the entire time.

<br><br>&ldquo;This is why we check,&rdquo; Aunty Florence said, once the columns finally agreed, both sides settling at exactly four hundred and twelve thousand. &ldquo;Not because you are careless. Because everyone is, eventually, somewhere. The trial balance doesn't tell you where the mistake is. It only tells you that one exists, and lets you go hunting before it costs you something real.&rdquo;

<br><br>From the trial balance, the rest came almost gently, like a story finally being allowed to finish. The trading account first &mdash; Amaka's total sales for the six months, minus what those goods had actually cost her to buy, leaving a gross profit that made her sit back in her chair: three hundred and ten thousand naira, from trading alone. Then the profit and loss account, where rent, transport, the new umbrella, NEPA's bills, all stepped forward to be subtracted &mdash; leaving, at the very bottom, a net profit of one hundred and ninety-four thousand naira across six months. Real money. Earned, not guessed at.

<br><br>&ldquo;You see now why the tin always lied to you,&rdquo; Aunty Florence said. &ldquo;The tin only ever showed you cash. It never showed you what you'd genuinely earned underneath all that movement.&rdquo;

<br><br>The balance sheet came last, and felt, to Amaka, like a photograph &mdash; her business, exactly as it stood on that one evening. Assets: her stock, her cash, the new equipment she'd bought, and Tunde's debt, still sitting there from the very first week.

<br><br>It was Aunty Florence who brought Tunde up, gently, the way you raise something you've been waiting for the right moment to say.

<br><br>&ldquo;That eight thousand from your friend at GTBank. How many months now?&rdquo;

<br><br>&ldquo;Five.&rdquo;

<br><br>&ldquo;Have you seen him?&rdquo;

<br><br>Amaka hadn't. He'd stopped coming by entirely after the third month, and a part of her &mdash; the part that still wanted the number to be true &mdash; had kept it sitting on her asset list anyway, exactly as it had been on day one.

<br><br>&ldquo;You cannot let your accounts be more hopeful than your life is,&rdquo; Aunty Florence said. &ldquo;This is called prudence. If money looks unlikely to come, you don't pretend otherwise just because pretending feels better. You write it off. Better a smaller, honest profit than a bigger, false one. The bank will trust honest numbers. They will smell false ones from across the room, even if they can't say exactly how.&rdquo;

<br><br>Amaka crossed Tunde's eight thousand out of her assets that night, and felt, oddly, lighter rather than poorer &mdash; as though she'd finally put down something she'd been quietly carrying for months without admitting its weight.

<br><br>The cooperative's loan officer, a soft-spoken man named Mr. Adigwe, asked her only one real question after reading through her papers &mdash; the trial balance, the trading account, the balance sheet, all of it copied out clean in her own handwriting.

<br><br>&ldquo;This business,&rdquo; he said. &ldquo;If nothing changes &mdash; no loan, nothing extra &mdash; does it survive next year? Or does it only exist because you're propping it up some other way?&rdquo;

<br><br>It was, Amaka would later learn, the most important question anyone could ask of a set of accounts &mdash; whether the thing being described was actually built to last, or merely surviving on borrowed time and good luck. She thought of six months of honest columns, of profit that had finally stopped hiding from her, of Mr. Eze's invoices always paid by the thirtieth.

<br><br>&ldquo;It survives,&rdquo; she said. &ldquo;I built it to.&rdquo;

<br><br>She got the loan. But that was, in the end, the smaller part of what had happened. The larger part was a pink notebook, now nearly full, that no longer lied to her &mdash; and a quiet new ambition, one she mentioned to Aunty Florence on her last evening at the old stall size, before the renovation began.

<br><br>&ldquo;One day,&rdquo; Amaka said, &ldquo;I want to actually qualify properly. ACCA, or ICAN. Not just learn enough to survive. Learn enough to be the one people like me come to.&rdquo;

<br><br>Aunty Florence didn't smile this time. She simply nodded, the way one trader nods at another who has finally understood the thing worth understanding.

<br><br>&ldquo;Then you already know the hardest part,&rdquo; she said. &ldquo;The rest is just more pages.&rdquo;`
  },
];

// ── ARTICLES ──────────────────────────────────────────────────
// Editorial content for the Articles page. Each article is static content
// (written here, not user-submitted) — engagement (thumbs up + comments)
// is stored in Supabase against the `slug` below. cover/coverIcon drive a
// generated gradient-and-icon cover treatment (no external images, so
// nothing to license or hotlink) — swap in real photography later by
// changing how renderArticleCover() in app.js reads these two fields.
const articles = [
  {
    slug: 'accruals-concept',
    title: "The Accruals Concept: Why Profit Isn't the Same as Cash",
    excerpt: 'Two businesses can have identical bank balances and completely different profits. Here\u2019s why.',
    coverIcon: '📐',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #2b2416 100%)',
    body: `Ask a new business owner how they're doing, and most will glance at their bank balance. It's an honest instinct &mdash; but it's also exactly the habit the accruals concept exists to correct.

<br><br>The accruals concept says income and expenses should be recorded in the period they're <em>earned</em> or <em>incurred</em>, not the period cash happens to move. Sell goods on credit in March and get paid in May? That sale belongs to March &mdash; the month you actually delivered the value &mdash; not May. Use electricity in March but the bill only arrives in April? That cost still belongs to March.

<br><br>This matters more than it first appears. A business that ignores accruals can look profitable simply because a big customer hasn't paid yet, or look like it's struggling in a month when it's actually just paid a large bill in advance. Cash timing and business performance are two different questions, and the accruals concept is what keeps them from being confused with each other.

<br><br>Consider a small consultancy that completes a project in December for ₦500,000, invoiced the same month, but the client only pays in February. Under cash accounting, December looks quiet and February looks like a huge month &mdash; neither is true. Under accruals, the ₦500,000 is recognised as December's revenue, because that's when the work was actually done. The cash arriving later is a separate, working-capital question, not a profit question.

<br><br>The same logic runs the other way for costs. A shop that pays its annual insurance premium in January hasn't "spent" the whole year's worth of expense in January &mdash; that cost should be spread across the twelve months it actually covers. Recording the full amount in January alone would understate January's true profit and overstate every month after it.

<br><br>This is also where the idea of <em>matching</em> comes in, a close cousin of accruals: expenses should be matched against the revenue they helped generate, in the same period. The cost of goods sold in March is matched against March's sales &mdash; not against whenever the supplier happened to be paid.

<br><br>For a small or growing business, the practical payoff is real: accruals-based figures tell you whether the business itself is actually working, separate from how disciplined your customers are about paying on time. A business can be genuinely profitable while still being short on cash, and genuinely loss-making while still having money in the bank. Knowing which one you're looking at is the entire point of keeping proper books instead of just watching a balance.`
  },
  {
    slug: 'ifrs-adoption',
    title: 'Why IFRS Adoption Matters for Nigerian Businesses',
    excerpt: 'One shared accounting language, used from Lagos to London \u2014 and what that actually buys you.',
    coverIcon: '🌍',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #1c2620 100%)',
    body: `Before 2012, a set of Nigerian financial statements and a set of British or South African ones could look meaningfully different, even for similar businesses &mdash; different rules, different judgement calls, different ways of presenting the same underlying numbers. The International Financial Reporting Standards (IFRS) exist to close that gap, and Nigeria's move to adopt them was one of the more consequential accounting decisions the country has made.

<br><br>IFRS is a single set of accounting standards, developed by the International Accounting Standards Board, used as the basis for financial reporting in well over a hundred countries. The idea is straightforward: an investor reading a company's accounts in Lagos should be able to compare them, on reasonably equal footing, against a company's accounts in Johannesburg or London, without needing to first decode entirely different local rules.

<br><br>Nigeria's Financial Reporting Council mandated IFRS for publicly listed companies and other public-interest entities starting in 2012, with significant public entities following shortly after. For a listed Nigerian company, this wasn't optional polish &mdash; it became the basis on which its accounts were legally prepared and audited.

<br><br>Why did this matter practically? Comparability is the biggest one: international investors evaluating opportunities across multiple countries need a common yardstick, and a Nigerian company reporting under a globally recognised standard is simply easier to evaluate against international peers than one reporting under a purely local framework. That, in turn, affects the cost and availability of capital &mdash; lenders and investors price risk partly based on how much they trust and understand what they're reading.

<br><br>It's worth knowing that "IFRS" isn't one-size-fits-all in practice. Smaller, non-listed entities in Nigeria typically use IFRS for SMEs &mdash; a deliberately simplified version of the full standard, built for businesses that don't need the full complexity (or cost) of preparing accounts the way a large listed bank would.

<br><br>For a small business owner who isn't preparing IFRS accounts directly, this might seem like distant, large-company concern. It usually isn't, for one practical reason: many of the foundational ideas you'll meet early in any accounting education &mdash; accruals, prudence, going concern, the way assets and liabilities are defined &mdash; come straight from this same international framework, even at simplified-standard level. Learning them properly means you're not just learning "Nigerian accounting" or "small business bookkeeping" in isolation. You're learning the same underlying language used in financial statements worldwide, which is precisely what makes the knowledge portable &mdash; useful whether you stay running a local business or eventually work with, audit, or invest in much larger ones.`
  },
  {
    slug: 'working-capital',
    title: 'Working Capital: The Money That Keeps a Business Breathing',
    excerpt: 'Profitable on paper, broke in practice \u2014 it happens more often than you\u2019d think, and working capital explains why.',
    coverIcon: '💧',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #16242b 100%)',
    body: `It's entirely possible for a business to be profitable and still run out of money. That sounds like a contradiction, but it's one of the most common ways small businesses actually fail &mdash; and working capital is the concept that explains how.

<br><br>Working capital is simply current assets minus current liabilities: what a business owns that it can turn into cash within roughly a year (stock, money owed by customers, cash itself), minus what it owes that's due within roughly the same window (suppliers, short-term loans, accrued expenses). What's left is the cushion a business has to actually operate &mdash; pay staff, restock shelves, cover rent &mdash; while waiting for sales to fully convert into cash.

<br><br>Here's where the apparent contradiction comes from. A trading business can show a healthy profit on its income statement while having almost no working capital, if most of that "profit" is sitting as stock on a shelf or money still owed by customers rather than cash in hand. The accounts say the business made money. The bank balance says otherwise. Both can be true at once.

<br><br>Take a small distributor that sells ₦2,000,000 worth of goods on 60-day credit terms to a handful of large retail clients. On paper, that's a strong month. In reality, the distributor still has to pay its own suppliers, staff and rent during those 60 days, using whatever cash reserve it has &mdash; because the actual money from the sale hasn't arrived yet. If that cushion runs out before the 60 days are up, a genuinely profitable business can still miss payroll.

<br><br>Negative working capital &mdash; where current liabilities exceed current assets &mdash; isn't automatically fatal, but it's a warning that deserves attention rather than denial. The usual levers for improving it are collecting from customers faster (shorter credit terms, more consistent follow-up), managing stock more tightly (not over-ordering "just in case"), and negotiating reasonable, not reckless, payment terms with your own suppliers &mdash; stretching supplier payments too aggressively can damage relationships and pricing in ways that cost more than they save.

<br><br>The practical habit worth building early: don't just ask "did we make money this month?" Ask "could we actually pay everyone we owe, right now, with what we can turn into cash quickly?" Those are different questions, and a business that only ever asks the first one is the one most likely to be blindsided by the second.`
  },
  {
    slug: 'doubtful-debts',
    title: 'Doubtful Debts: Planning for the Money That Might Not Come',
    excerpt: 'A customer who owes you money isn\u2019t automatically an asset worth its full face value \u2014 here\u2019s why.',
    coverIcon: '🤔',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #26201a 100%)',
    body: `When a customer buys on credit, the amount they owe sits on your books as a debtor &mdash; an asset, in theory worth its full value, the same as cash. In practice, anyone who has run a business for more than a few months knows that not every debtor pays. A doubtful debt is the accounting answer to that uncomfortable but predictable reality.

<br><br>A doubtful debt is an amount owed to a business that is unlikely &mdash; though not yet certain &mdash; to be collected. Maybe a customer has gone quiet for months. Maybe they're known to be in financial trouble. The debt hasn't been confirmed as lost, but experience and judgement suggest it probably will be.

<br><br>This is where the prudence concept does its quiet work. Rather than waiting until a debt is formally, finally uncollectable before acknowledging the problem, a business creates a provision for doubtful debts &mdash; an estimated allowance that reduces the value of debtors shown in the accounts, without erasing the individual customer's balance from the records. The claim still legally exists; the accounts simply stop pretending it's worth its full face value.

<br><br>Picture a small business owed ₦300,000 across several customers, one of whom &mdash; owing ₦40,000 &mdash; hasn't responded to calls or messages in four months. Rather than carrying the full ₦300,000 as a healthy asset, prudent accounting would set aside a provision against some or all of that ₦40,000, so the balance sheet reflects realistic expectations rather than hope.

<br><br>Why not simply wait until you're completely sure? Because "completely sure" often arrives far too late to be useful to anyone reading the accounts today &mdash; an investor, a lender, even the owner deciding whether to expand. Estimating the doubtful portion now, even imperfectly, gives a more honest picture than assuming the best until proven otherwise.

<br><br>It's worth being precise about a common confusion: a doubtful debt is not the same as a bad debt. A doubtful debt is an estimate, a flag of risk on a balance you still hold. A bad debt is a confirmed loss &mdash; the customer has vanished, gone insolvent, or otherwise definitively will not pay, and the amount is written off entirely rather than merely provided against. One is a cautious guess; the other is an accepted fact. Both matter, but they're answers to different questions, and good bookkeeping keeps them distinct rather than treating every slow payer the same way as a confirmed loss.`
  },
  {
    slug: 'double-entry',
    title: 'Double Entry: The 500-Year-Old Idea Still Running Every Business',
    excerpt: 'A Venetian friar described it in 1494. Every modern accounting system, from a notebook to enterprise software, still runs on it.',
    coverIcon: '⚖️',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #221c28 100%)',
    body: `In 1494, an Italian friar named Luca Pacioli published a mathematics textbook that included, almost as an aside, a description of a bookkeeping method merchants in Venice were already using. That short section turned out to be more influential than the rest of the book combined. The method is double entry, and five centuries later it's still the foundation underneath every set of accounts you'll ever read.

<br><br>The core idea is simple to state and surprisingly easy to underestimate: every transaction affects at least two accounts, and the total value recorded on the debit side must always equal the total recorded on the credit side. Buy stock with cash, and your stock account increases while your cash account decreases &mdash; two sides, one transaction, always balancing.

<br><br>Why bother with two sides when one would feel simpler? Because a single-entry system &mdash; just writing down "money in, money out," the way a personal notebook often works &mdash; can't tell you much beyond your cash position. It can't easily show you what you own, what you owe, or whether a transaction even makes logical sense. Double entry forces every transaction to tell its complete story: not just that money moved, but where it came from and where it went.

<br><br>Take a simple example. A trader buys ₦50,000 of inventory on credit from a supplier. Under double entry, stock (an asset) increases by ₦50,000, and a liability &mdash; an amount owed to that supplier &mdash; also increases by ₦50,000. Nothing happened to cash at all, yet the transaction is fully and accurately captured. A cash-only record would have missed it completely.

<br><br>This two-sided structure also builds in a powerful, almost accidental safety check. Because every debit needs a matching credit, the sum of all debit balances across a business's books should always equal the sum of all credit balances. When they don't, something has gone wrong &mdash; a transaction posted incorrectly, an entry missed entirely, a figure transposed. That check is called a trial balance, and it exists only because double entry gives you something concrete to verify against in the first place.

<br><br>It's worth appreciating how unusual this is as a five-hundred-year-old idea: virtually nothing else from 15th-century mathematics is still in daily, unmodified use today. Modern accounting software automates the mechanics entirely &mdash; you'll rarely manually post a debit and credit by hand once you're using real tools &mdash; but understanding what's happening underneath that automation is exactly what separates someone who can read a balance sheet from someone who can only look at one.`
  },
  {
    slug: 'depreciation-methods',
    title: 'Depreciation Methods: Spreading the Cost of What Lasts',
    excerpt: 'A delivery van doesn\u2019t become an expense the day you buy it. Here\u2019s how accounting actually handles it.',
    coverIcon: '📉',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #1f2420 100%)',
    body: `Buy a delivery van for ₦8,000,000 and it would be strange &mdash; and misleading &mdash; to treat that whole amount as a single expense in the month you bought it. The van isn't used up in a month; it'll likely serve the business for years. Depreciation is the accounting answer to spreading that cost across the time the asset actually earns its keep.

<br><br>Depreciation is the systematic allocation of a fixed asset's cost over its useful life. It's worth being clear about what it isn't: it's not a cash payment, and it's not an attempt to track the asset's resale value day to day. It's purely an accounting mechanism for matching the cost of a long-lived asset against the revenue it helps generate over time &mdash; the same matching logic that sits behind the accruals concept more broadly.

<br><br>Two methods dominate in practice, and they tell genuinely different stories about how an asset loses value.

<br><br><em>Straight-line depreciation</em> spreads the cost evenly across the asset's useful life. An asset costing ₦8,000,000, expected to last 8 years with no resale value at the end, would depreciate by ₦1,000,000 a year, every year, like clockwork. It's simple, predictable, and well suited to assets that genuinely lose value at a steady pace &mdash; office furniture or a building, for instance.

<br><br><em>Reducing balance depreciation</em>, by contrast, applies a fixed percentage to the asset's remaining book value each year, which means larger depreciation charges early on and progressively smaller ones later. A vehicle depreciated at 25% reducing balance loses ₦2,000,000 in year one (25% of ₦8,000,000), but only roughly ₦1,500,000 in year two (25% of the new, lower balance of ₦6,000,000). This mirrors how many assets &mdash; vehicles and electronics especially &mdash; actually behave in the real world: a brand-new car loses more of its value in its first year than in its fifth.

<br><br>Choosing between them isn't arbitrary. A business should pick whichever method most honestly reflects how a given asset actually loses economic value, and then apply it consistently, since switching methods opportunistically would undermine the comparability of the accounts from one year to the next. For most small businesses, straight-line is the simpler and more common default; reducing balance tends to appear where the underlying asset genuinely depreciates faster early on. Either way, the principle underneath stays the same: spread the cost to match the years the asset actually works for you, rather than front-loading it onto the single month you happened to pay for it.`
  },
  {
    slug: 'going-concern',
    title: "The Going Concern Assumption: Why Accounts Assume You'll Still Be Here Next Year",
    excerpt: 'Every set of accounts quietly makes one big bet about the future. Here\u2019s what happens when that bet looks shaky.',
    coverIcon: '🔭',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #261c1c 100%)',
    body: `Open almost any set of financial statements and you won't find an explicit sentence announcing it, but a significant assumption is baked into nearly every number on the page: that the business will continue operating for the foreseeable future, rather than being forced to shut down and sell everything off. This is the going concern assumption, and it quietly shapes far more of accounting than most people realise.

<br><br>The assumption matters because it changes how assets are valued. Under going concern, a piece of equipment is valued based on its ongoing use to the business &mdash; what it's worth as a working part of an operating company. If going concern no longer applied &mdash; if a business were genuinely about to be liquidated &mdash; that same equipment would instead need to be valued at whatever it could fetch in a forced, often rushed, sale. Those two figures can be dramatically different, and almost always the forced-sale figure is lower, sometimes far lower.

<br><br>This is why going concern isn't just an abstract assumption sitting quietly in the background. Auditors are specifically required to assess whether there's "material uncertainty" about a business's ability to continue as a going concern, and if there is, that uncertainty has to be disclosed clearly in the accounts &mdash; not buried, not softened. Recurring losses, an inability to pay debts as they fall due, the loss of a major customer a business was overly dependent on, or a key financing arrangement falling through are all classic warning signs that auditors and informed readers watch for.

<br><br>Why does this matter so much to people outside the business itself? A bank deciding whether to extend a loan, a supplier deciding whether to offer credit terms, an investor deciding whether to buy in &mdash; all of them are implicitly relying on the going concern assumption holding true. If it doesn't, the values they're looking at on the balance sheet may not represent what they think they represent.

<br><br>For a small business owner, the practical lesson isn't to panic about a concept mostly discussed in the context of large company audits. It's to recognise that going concern is really just a formal name for a question every serious business should be asking itself regularly anyway: if nothing changes, are we still here, healthy, in a year's time? Accounts that are prepared honestly under the going concern assumption are really just a structured way of answering that question with numbers instead of optimism.`
  },
  {
    slug: 'trial-balance',
    title: "The Trial Balance: Your Books' Honesty Check",
    excerpt: 'It won\u2019t catch every mistake \u2014 but the ones it does catch, it catches reliably, every time.',
    coverIcon: '🧾',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #1c2026 100%)',
    body: `After weeks or months of recording transactions, how do you know your books are actually right? The trial balance is the first real answer accounting offers to that question &mdash; not a perfect one, but a genuinely useful one, and it's been the standard check for as long as double entry itself has existed.

<br><br>A trial balance is simply a list of every account in the ledger and its balance, with all the debit balances totalled on one side and all the credit balances totalled on the other. Because double entry requires every transaction to affect at least two accounts in equal and opposite ways, the two totals should, in a correctly kept set of books, always match exactly.

<br><br>When they don't match, something is wrong, and the trial balance has done its job by surfacing that fact before it quietly compounds into bigger problems. A transaction posted to only one account instead of two, a figure copied incorrectly from one ledger page to another, a debit recorded where a credit belonged &mdash; all of these typically show up as an imbalance between the two columns, prompting a hunt for the error before the figures are used for anything important.

<br><br>It's just as important to understand what a trial balance cannot catch, because the confidence it gives is real but limited. If a transaction is left out entirely &mdash; never recorded on either side &mdash; the trial balance will still balance perfectly, because nothing is unequal; something is simply missing altogether. If a transaction is posted to the wrong account, but correctly as both a debit and a credit of the right amount, the trial balance will again balance, even though the books are, in a real sense, telling the wrong story. A trial balance checks <em>arithmetic agreement</em>, not <em>correctness of judgement</em>.

<br><br>This is precisely why it's described as a trial balance rather than a final one: it's a checkpoint, not a verdict. Once the two columns agree, the figures are considered reliable enough to move forward into preparing the actual financial statements &mdash; the trading account, the profit and loss account, the balance sheet &mdash; with reasonable, though not absolute, confidence that the underlying double entry has been applied consistently. For anyone learning to keep proper books, get comfortable with the slightly uneasy feeling of an unbalanced trial balance early; it's not a sign you've failed, it's the system doing exactly what it was built to do &mdash; catching you before a small slip becomes a large, harder-to-find one.`
  },
  {
    slug: 'bad-debt-provisions',
    title: 'Bad Debt Provisions: Choosing How Cautious to Be',
    excerpt: 'Two businesses, two debtors, two completely different provisioning policies \u2014 and both can be defensible.',
    coverIcon: '🛡️',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #261a1a 100%)',
    body: `Once a business accepts that some customers simply won't pay, the next question is a genuinely strategic one: how should that risk actually be measured and provided for? Two businesses with identical debtor balances can adopt very different, equally defensible bad debt provisioning policies &mdash; and the choice says a lot about how each one thinks about risk.

<br><br>It's worth separating two ideas that get blurred in casual conversation. A bad debt provision is an estimated allowance set aside against debts judged likely to go unpaid &mdash; the debt is still technically owed, still sits in the records, but the accounts no longer pretend it's worth full value. A bad debt write-off is different and more final: it's the formal removal of a specific debt from the books entirely, once it's accepted as genuinely, confirmedly uncollectable &mdash; the customer has vanished, gone insolvent, or otherwise will not pay under any realistic scenario.

<br><br>There are two common approaches to building the provision itself. A <em>specific provision</em> targets named, individually identified risky accounts &mdash; "this particular customer, owing this particular amount, looks unlikely to pay, based on what we know about their situation." A <em>general provision</em> instead applies a blanket percentage &mdash; say, 2% &mdash; across the entire debtor balance, on the reasoning that, across a large enough customer base, experience shows roughly that proportion typically goes bad, even without knowing in advance exactly which accounts.

<br><br>Consider two small wholesalers, each owed ₦1,000,000 by their customers. The first knows its customer base intimately &mdash; a handful of long-standing accounts &mdash; and applies a specific provision, setting aside ₦60,000 against one customer it knows is struggling, and nothing against the rest. The second sells to a large, constantly changing pool of smaller buyers it can't track individually, and instead applies a general 5% provision across the whole balance &mdash; ₦50,000 &mdash; based on historical experience of what typically goes unpaid. Neither approach is more "correct" than the other in the abstract; each fits the nature of the business making the judgement.

<br><br>The governance point matters as much as the method: whichever approach a business chooses, it should be applied consistently and reviewed regularly &mdash; quarterly is common practice for businesses with meaningful credit exposure &mdash; rather than left untouched for a year and then adjusted dramatically all at once. Too little caution leaves a business quietly overstating its assets and its profit. Too much caution understates them just as unhelpfully, making a healthy business look weaker than it is. The goal, as with most of accounting, isn't pessimism or optimism &mdash; it's an honest, regularly reconsidered estimate.`
  },
  {
    slug: 'prudence-concept',
    title: "The Prudence Concept: Don't Count Your Profit Before It Hatches",
    excerpt: 'When in doubt, accounting has a tie-breaker rule \u2014 and it always favours caution over hope.',
    coverIcon: '⚓',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #1a2326 100%)',
    body: `Accounting is full of judgement calls. How likely is a customer to actually pay? How much is a piece of equipment really worth today? When the answer is genuinely uncertain, the prudence concept supplies a consistent tie-breaker: don't overstate assets or income, and don't understate liabilities or expenses. When in doubt, choose the more cautious figure.

<br><br>In practice, this shows up as a quiet asymmetry that surprises people the first time they notice it. A probable loss &mdash; say, a lawsuit a business is likely to lose &mdash; should be recognised in the accounts as soon as it's judged probable, even before it's finally settled. A probable gain &mdash; a lawsuit the business is likely to <em>win</em>, for instance &mdash; is treated differently: it isn't recognised until it's reasonably certain, often not until the cash or the legal judgement actually arrives. Losses get anticipated; gains have to wait. That asymmetry isn't an oversight. It's the entire point.

<br><br>Why build in that lopsidedness deliberately? Because the people relying on financial statements &mdash; lenders, investors, suppliers extending credit, even the business owner deciding whether to take on more risk &mdash; are generally more harmed by being misled into false optimism than by being given an unnecessarily cautious picture. A business that looks slightly weaker than it really is causes some missed opportunity. A business that looks stronger than it really is can lead someone to extend credit, invest, or lend money they'll never see again. Prudence weighs those two kinds of mistakes as fundamentally unequal.

<br><br>The doubtful debts provision discussed elsewhere on this site is prudence in direct action: rather than waiting for absolute certainty that a customer won't pay, a cautious estimate is made now, because waiting for certainty would mean temporarily overstating the business's true position. The same logic governs depreciation, going concern judgements, and inventory valuation &mdash; prudence isn't one isolated rule, it's a disposition that runs underneath most of accounting's harder calls.

<br><br>It's worth knowing that prudence has been deliberately tempered in modern standard-setting compared to its older, stricter form &mdash; today's IFRS framework favours <em>neutrality</em>, warning against deliberately understating a business's position just as much as deliberately overstating it. Excessive, reflexive pessimism isn't honesty either; it's just a different kind of distortion. The modern instruction is closer to: make your best, most honest estimate, and when genuine uncertainty remains even after honest effort, let caution &mdash; not hope &mdash; settle the tie.`
  },
];
