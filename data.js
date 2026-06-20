// ============================================================
// data.js — All static content: lessons, topics, tips,
// opinions, search index, trending, sample nuggets
// Butterfly Dynamix Learning Platform
// ============================================================

// ── TRENDING ITEMS ───────────────────────────────────────────
const trendingItems = [
  {num:'#1',text:'Accruals concept',cls:'tt-acc',opinionId:2},
  {num:'#2',text:'IFRS adoption',cls:'tt-acc',opinionId:1},
  {num:'#3',text:'Working capital',cls:'tt-acc',opinionId:3},
  {num:'#4',text:'Doubtful debts',cls:'tt-acc',opinionId:3},
  {num:'#5',text:'Double entry',cls:'tt-acc',opinionId:4},
  {num:'#6',text:'Depreciation methods',cls:'tt-acc',opinionId:5},
  {num:'#7',text:'Going concern',cls:'tt-acc',opinionId:6},
  {num:'#8',text:'Trial balance',cls:'tt-acc',opinionId:1},
  {num:'#9',text:'Bad debt provisions',cls:'tt-acc',opinionId:3},
  {num:'#10',text:'Prudence concept',cls:'tt-acc',opinionId:2},
];

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

// ── STATIC OPINIONS (shown before DB has real data) ──────────
const staticOpinions = [
  {id:1,topic:'acc',body:'IFRS adoption has significantly improved financial transparency in Nigerian listed companies',username:'sara_ifrs',avatar:'📊',upvotes:197,downvotes:43},
  {id:2,topic:'acc',body:'The accruals concept is the single most misunderstood idea by accounting students',username:'james_o',avatar:'📈',upvotes:284,downvotes:96},
  {id:3,topic:'acc',body:'Provision for doubtful debts should be reviewed quarterly, not annually',username:'temi_value',avatar:'💡',upvotes:156,downvotes:38},
  {id:4,topic:'acc',body:'Manual bookkeeping is still the best way to actually learn double entry',username:'kola_econ',avatar:'🌍',upvotes:134,downvotes:52},
  {id:5,topic:'acc',body:'Depreciation method choice matters far more than most small business owners realise',username:'priya_fx',avatar:'⚡',upvotes:118,downvotes:29},
  {id:6,topic:'acc',body:'The going concern assumption deserves far more scrutiny than it usually gets',username:'ngozi_trades',avatar:'🚀',upvotes:142,downvotes:31},
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
    {id:1, term:'What Is Accounting?', duration:'2 min', pips:1,
      definition:`<em>Accounting: an action.</em><br><br>Accounting is the process of identifying, measuring, recording, classifying, summarising, presenting, and interpreting the financial transactions of a business. It is a numeric language that tells the financial story of a business.`,
      scenario:`A young trader named Amaka starts selling phone accessories from a small kiosk. At first she just keeps cash in a drawer. Once she starts writing down every sale and every purchase, and later works out whether she made a profit that month, she has begun "doing accounting" — even before she ever uses a formal book or software.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following best captures what accounting fundamentally is?', opts:['A type of advanced mathematics', 'The process of identifying, measuring, recording, classifying, summarising, presenting and interpreting financial transactions', 'A legal requirement that only large companies need to follow', 'A way of predicting future stock market prices'], ans:1, exp:'Accounting is the full process described — identifying, measuring, recording, classifying, summarising, presenting and interpreting financial transactions — not a branch of mathematics or something only relevant to large companies.'}
    },
    {id:2, term:'Identifying', duration:'2 min', pips:1,
      definition:`The first step in accounting: recognising which events occurring in a business are actually financial transactions worth capturing, as distinct from events that have no financial effect worth recording.`,
      scenario:`When a customer buys a phone case from Amaka, that's a financial transaction worth identifying — money and goods changed hands. When Amaka simply rearranges the display on her shelf, nothing financial has happened, so there's nothing to identify or record.`,
      votes:{up:0, down:0},
      quiz:{q:'What does \'identifying\' mean as the first step in the accounting process?', opts:['Calculating the exact value of every transaction', 'Recognising which events are financial transactions worth capturing', 'Writing every transaction into a ledger', 'Presenting financial results to managers'], ans:1, exp:'Identifying is about recognising which events actually count as financial transactions in the first place, before any measuring or recording can happen.'}
    },
    {id:3, term:'Measuring', duration:'2 min', pips:1,
      definition:`The step in accounting where a financial transaction, once identified, is expressed in monetary terms — assigning a specific amount of money to what happened.`,
      scenario:`Once Amaka identifies that a customer bought a phone case, measuring means working out exactly how much money was involved — say, ₦3,500 — so that this specific figure, not just the fact that a sale happened, can be recorded.`,
      votes:{up:0, down:0},
      quiz:{q:'What does \'measuring\' add to a transaction that has already been identified?', opts:['A summary of all transactions for the month', 'A specific monetary value attached to the transaction', 'A classification of the transaction by type', 'An interpretation of what the transaction means for the business'], ans:1, exp:'Measuring is specifically about attaching a monetary amount to a transaction that\'s already been identified as financially relevant.'}
    },
    {id:4, term:'Recording', duration:'2 min', pips:1,
      definition:`The step in accounting where a measured transaction is written down in the business's books or system, creating a permanent, organised record of what happened.`,
      scenario:`Once Amaka knows a ₦3,500 sale happened, recording means she actually writes it down — in a notebook, a ledger, or accounting software — rather than just remembering it, which would be too unreliable to rely on later.`,
      votes:{up:0, down:0},
      quiz:{q:'Why does accounting require recording, rather than just remembering transactions?', opts:['Because recording is required by international law for every business, however small', 'Because memory alone is unreliable, and a written record can be checked and relied on later', 'Because recording automatically calculates profit', 'Because recording is the final step in the accounting process'], ans:1, exp:'Recording creates a reliable, permanent record that doesn\'t depend on anyone\'s memory — essential once a business has more than a handful of transactions to keep track of.'}
    },
    {id:5, term:'Classifying', duration:'2 min', pips:1,
      definition:`The step in accounting where recorded transactions are sorted into meaningful categories or groups, so that similar items can be looked at together.`,
      scenario:`At the end of the month, Amaka's bookkeeper sorts every recorded transaction into groups — all the sales together, all the stock purchases together, all the rent payments together — rather than leaving them as one long, unsorted list.`,
      votes:{up:0, down:0},
      quiz:{q:'What is the purpose of classifying transactions in accounting?', opts:['To make transactions harder to find', 'To sort recorded transactions into meaningful categories so similar items can be examined together', 'To delete transactions that are no longer relevant', 'To convert transactions into a foreign currency'], ans:1, exp:'Classifying groups similar transactions together — like all sales, or all rent payments — which is what makes it possible to summarise and interpret the data usefully afterward.'}
    },
    {id:6, term:'Summarising', duration:'2 min', pips:1,
      definition:`The step in accounting where classified transactions are condensed into totals and reports that are far easier to use than looking through every individual transaction.`,
      scenario:`Instead of reading through 400 individual sales transactions for the month, Amaka's summarised report simply shows: 'Total Sales for June: ₦450,000.' The detail is still there if needed, but the summary is what she actually uses to understand the month at a glance.`,
      votes:{up:0, down:0},
      quiz:{q:'What does summarising achieve in the accounting process?', opts:['It deletes the original transaction records', 'It condenses classified transactions into totals and reports that are easier to use', 'It happens before transactions are even identified', 'It replaces the need for a balance sheet'], ans:1, exp:'Summarising takes everything that\'s been classified and condenses it into totals and reports — turning hundreds of individual entries into a handful of useful figures.'}
    },
    {id:7, term:'Presenting', duration:'2 min', pips:1,
      definition:`The step in accounting where summarised financial information is formatted and communicated clearly to the people who need to use it, such as in a financial statement or report.`,
      scenario:`Amaka's accountant doesn't just hand her a pile of numbers — she presents the information in a clear financial statement, with sales, costs and profit clearly labelled and laid out, so Amaka can actually understand and use it without being an accountant herself.`,
      votes:{up:0, down:0},
      quiz:{q:'Why does presenting matter as a distinct step in accounting, separate from summarising?', opts:['Because presenting and summarising are exactly the same thing', 'Because even well-summarised information needs to be clearly formatted and communicated to be genuinely useful to its audience', 'Because presenting only matters for businesses listed on a stock exchange', 'Because presenting happens before any transactions are recorded'], ans:1, exp:'Presenting is about clear communication — taking summarised figures and laying them out in a way the intended audience (owners, managers, investors) can actually understand and use.'}
    },
    {id:8, term:'Interpreting', duration:'2 min', pips:1,
      definition:`The final step in accounting, where the meaning behind the presented financial information is explained — what the numbers actually indicate about the health and performance of the business.`,
      scenario:`After seeing her financial statement, Amaka still needs interpretation: her accountant explains that, although sales grew this month, her profit margin actually shrank because costs grew even faster — a conclusion that isn't obvious from the raw figures alone.`,
      votes:{up:0, down:0},
      quiz:{q:'What does interpreting add, beyond simply presenting financial figures?', opts:['Nothing — presenting and interpreting are identical steps', 'An explanation of what the figures actually mean for the business\'s health and performance', 'A list of every individual transaction for the year', 'A prediction guaranteed to be accurate about next year\'s results'], ans:1, exp:'Interpreting goes beyond simply showing the numbers — it explains what those numbers actually mean, such as noticing that rising sales don\'t necessarily mean rising profit.'}
    },
    {id:9, term:'Accounting Equation', duration:'2 min', pips:1,
      definition:`The foundational rule of accounting: Assets = Capital + Liabilities. It can also be written as Capital = Assets − Liabilities. Whichever way it is arranged, both sides always total the same amount.`,
      scenario:`Amaka's kiosk has ₦2,000,000 of assets (stock, cash, a display cabinet) and owes ₦450,000 to a supplier. Using the equation, her capital must be ₦2,000,000 − ₦450,000 = ₦1,550,000 — whatever isn't covered by what she owes is automatically her own stake in the business.`,
      votes:{up:0, down:0},
      quiz:{q:'A business has ₦3,500,000 in assets and ₦900,000 in liabilities. What is its capital?', opts:['₦4,400,000', '₦2,600,000', '₦900,000', '₦3,500,000'], ans:1, exp:'Capital = Assets − Liabilities = ₦3,500,000 − ₦900,000 = ₦2,600,000.'}
    },
    {id:10, term:'Accruals Concept', duration:'2 min', pips:1,
      definition:`The idea that profit is the difference between revenues earned and the expenses incurred in earning them, regardless of when cash is actually received or paid. Income and costs are matched to the period they relate to.`,
      scenario:`Amaka's electricity bill for December arrives in January. Even though she hasn't paid yet, the accruals concept says that cost belongs to December's accounts — because that's the month she actually used the electricity.`,
      votes:{up:0, down:0},
      quiz:{q:'A business uses ₦40,000 of electricity in March but doesn\'t pay the bill until April. Under the accruals concept, which month\'s accounts should include this ₦40,000 expense?', opts:['April, since that\'s when it was paid', 'March, since that\'s when it was used', 'Split evenly between both months', 'Neither — only paid expenses are ever recorded'], ans:1, exp:'The accruals concept matches expenses to the period they relate to, not the period they\'re paid in — so the ₦40,000 belongs to March.'}
    },
    {id:11, term:'Assets', duration:'2 min', pips:1,
      definition:`Resources owned by a business or owed to it, such as buildings, equipment, stock, money in the bank, and amounts customers owe. Assets represent what a business has.`,
      scenario:`Amaka's kiosk has a display cabinet, ₦80,000 of phone case stock, ₦25,000 cash in a drawer, and ₦10,000 owed to her by a regular customer who bought on credit. All four of these are assets — things she owns or is owed.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following counts as an asset for a business?', opts:['Money the business owes a supplier', 'Money a customer owes the business', 'The owner\'s personal house, unrelated to the business', 'Wages already paid to staff'], ans:1, exp:'Money a customer owes the business is a resource owed TO the business, making it an asset. Money owed BY the business is a liability, not an asset.'}
    },
    {id:12, term:'Balance Brought Down', duration:'2 min', pips:1,
      definition:`The opening balance of an account at the start of a new period, carried forward from the closing balance of the previous period. Often abbreviated 'balance b/d'.`,
      scenario:`At the end of January, Amaka's cash account shows a closing balance of ₦60,000. On the first day of February, that same ₦60,000 appears at the top of the account as the balance brought down — the starting point for the new month.`,
      votes:{up:0, down:0},
      quiz:{q:'What does \'balance b/d\' represent in an account?', opts:['The total of all transactions for the period', 'The opening balance carried forward from the previous period', 'An error that needs correcting', 'The amount of profit made that period'], ans:1, exp:'Balance brought down (b/d) is the opening balance at the start of a new period, carried forward from where the previous period\'s account left off.'}
    },
    {id:13, term:'Balance Carried Down', duration:'2 min', pips:1,
      definition:`The figure entered into an account at the end of a period to make both sides add up to the same total. It is then carried forward as the opening balance of the next period. Often abbreviated 'balance c/d'.`,
      scenario:`At the end of the month, Amaka's bookkeeper adds up both sides of the cash account. To make the two sides match exactly, she inserts a 'balance c/d' figure — the amount left over — which then becomes next month's opening balance.`,
      votes:{up:0, down:0},
      quiz:{q:'What is the purpose of a \'balance c/d\' entry?', opts:['To record a mistake in the accounts', 'To make both sides of an account total the same amount at period end', 'To show how much profit was made', 'To cancel out a transaction'], ans:1, exp:'Balance carried down (c/d) is inserted to make both sides of an account balance at the end of a period — it\'s then carried forward as next period\'s opening balance (balance b/d).'}
    },
    {id:14, term:'Balance Sheet', duration:'2 min', pips:1,
      definition:`A statement showing the assets, liabilities and capital of a business at one specific point in time — a financial snapshot, not a record of activity over a period.`,
      scenario:`If Amaka draws up a balance sheet dated 31 December, it shows exactly what her kiosk owned and owed on that single day — not how much she sold across the whole year. That's a different report's job.`,
      votes:{up:0, down:0},
      quiz:{q:'What does a balance sheet show?', opts:['Sales made over the year', 'Assets, liabilities and capital at one specific date', 'Cash received and paid during the year', 'Profit earned over the year'], ans:1, exp:'A balance sheet is a snapshot at a single point in time, not a summary of activity across a period — that distinction is one of the most common beginner mix-ups in accounting.'}
    },
    {id:15, term:'Bookkeeping', duration:'2 min', pips:1,
      definition:`The part of accounting concerned with recording financial transactions in an organised way, traditionally in 'books' of accounts.`,
      scenario:`Every time Amaka's assistant writes down a sale or a purchase in the kiosk's ledger book, that's bookkeeping. Deciding what those records actually mean — whether the kiosk made a profit this month — goes a step further, into accounting itself.`,
      votes:{up:0, down:0},
      quiz:{q:'Which best describes bookkeeping?', opts:['Deciding whether to expand the business', 'Recording financial transactions in an organised way', 'Calculating how much tax is owed', 'Advising on whether to take out a loan'], ans:1, exp:'Bookkeeping is specifically about recording transactions in an organised way — interpreting those records to guide decisions is a broader accounting task built on top of bookkeeping.'}
    },
    {id:16, term:'Business Entity Concept', duration:'2 min', pips:1,
      definition:`The assumption that a business is treated as completely separate from its owner for accounting purposes. Only transactions affecting the business are recorded — the owner's personal affairs are not, except where they introduce capital or take drawings.`,
      scenario:`When Amaka buys groceries for her own family, that has nothing to do with the kiosk's accounts. But when she puts ₦200,000 of her own money into the kiosk, that's recorded — because it affects the business specifically, even though the money came from her personally.`,
      votes:{up:0, down:0},
      quiz:{q:'Under the business entity concept, which of these would be recorded in the business\'s accounts?', opts:['The owner\'s personal school fees for her children', 'The owner investing ₦200,000 of her own money into the business', 'The owner\'s personal grocery shopping', 'The owner\'s personal car loan, unrelated to the business'], ans:1, exp:'The business entity concept keeps the owner\'s personal affairs separate from the business — except where money specifically moves between the two, such as capital introduced or drawings taken.'}
    },
    {id:17, term:'Capital', duration:'2 min', pips:1,
      definition:`The total value of resources that the owner has invested in and left in the business. It represents the owner's stake and increases with profit and new investment, and decreases with losses and drawings.`,
      scenario:`Amaka starts her kiosk with ₦500,000 of her own savings. After a profitable first year of ₦150,000, and having withdrawn ₦50,000 for personal use, her capital is now ₦600,000 — even though most of that value sits in stock and equipment, not cash.`,
      votes:{up:0, down:0},
      quiz:{q:'An owner starts a business with ₦400,000 capital. The business makes ₦120,000 profit and the owner withdraws ₦30,000. What is the capital now?', opts:['₦400,000', '₦490,000', '₦550,000', '₦120,000'], ans:1, exp:'₦400,000 + ₦120,000 profit − ₦30,000 drawings = ₦490,000. Capital grows with profit and new investment, and shrinks with losses and drawings.'}
    },
    {id:18, term:'Capital Expenditure', duration:'2 min', pips:1,
      definition:`Money spent on acquiring or improving long-life assets that will be used in the business over multiple periods, such as buildings, machinery or vehicles.`,
      scenario:`When Amaka buys a delivery motorcycle for ₦1,200,000, that's capital expenditure — the motorcycle will be used in the business for years, not consumed in a single transaction.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following is an example of capital expenditure?', opts:['Buying petrol for a delivery motorcycle', 'Buying the delivery motorcycle itself', 'Paying for monthly electricity', 'Paying staff wages for the week'], ans:1, exp:'Buying the motorcycle is capital expenditure — it\'s a long-life asset that will be used over many future periods, unlike petrol, electricity or wages, which are used up immediately.'}
    },
    {id:19, term:'Carriage Inwards', duration:'2 min', pips:1,
      definition:`The cost of transporting goods purchased into the business. Because it forms part of the real cost of obtaining stock for resale, it is added to purchases when calculating the cost of goods sold.`,
      scenario:`When Amaka's wholesaler charges her an extra ₦15,000 to deliver a batch of phone cases to her kiosk, that delivery charge is carriage inwards — it's added to the cost of the stock itself, since getting the goods to her was part of acquiring them.`,
      votes:{up:0, down:0},
      quiz:{q:'Why is carriage inwards added to purchases rather than treated as a general expense?', opts:['Because it\'s a one-off cost', 'Because it forms part of the real cost of obtaining stock for resale', 'Because suppliers require it to be recorded that way', 'Because it relates to selling goods, not buying them'], ans:1, exp:'Carriage inwards is part of the genuine cost of getting stock into the business ready for resale, so it\'s added to purchases — distinct from carriage outwards, which relates to delivering goods to customers.'}
    },
    {id:20, term:'Carriage Outwards', duration:'2 min', pips:1,
      definition:`The cost of delivering goods sold out to customers. It is treated as a general expense in the profit and loss section of the financial statements, not as part of the cost of goods sold.`,
      scenario:`When Amaka pays a dispatch rider ₦2,000 to deliver an order to a customer's home, that's carriage outwards — a selling expense, recorded separately from the cost of the stock itself.`,
      votes:{up:0, down:0},
      quiz:{q:'How is carriage outwards treated in the financial statements?', opts:['Added to purchases, like carriage inwards', 'Treated as a general expense in the profit and loss section', 'Deducted from sales revenue directly', 'Ignored, since it\'s the customer\'s responsibility'], ans:1, exp:'Unlike carriage inwards, carriage outwards relates to delivering goods already sold — it\'s a selling expense in the profit and loss section, not part of the cost of goods sold.'}
    },
    {id:21, term:'Cost of Goods Sold', duration:'2 min', pips:1,
      definition:`The cost of the stock that was actually sold during a period, calculated as opening stock plus purchases (adjusted for carriage inwards and returns) minus closing stock.`,
      scenario:`Amaka started the month with ₦100,000 of stock, bought ₦300,000 more, and ended the month with ₦80,000 of stock left unsold. Her cost of goods sold is ₦100,000 + ₦300,000 − ₦80,000 = ₦320,000 — the cost of what actually left the shelves.`,
      votes:{up:0, down:0},
      quiz:{q:'Opening stock is ₦60,000, purchases during the period are ₦250,000, and closing stock is ₦40,000. What is the cost of goods sold?', opts:['₦310,000', '₦270,000', '₦230,000', '₦350,000'], ans:1, exp:'Cost of goods sold = Opening stock + Purchases − Closing stock = ₦60,000 + ₦250,000 − ₦40,000 = ₦270,000.'}
    },
    {id:22, term:'Credit', duration:'2 min', pips:1,
      definition:`The right-hand side of an account in the double entry system. Credits increase liabilities, capital and revenue, and decrease assets and expenses.`,
      scenario:`When Amaka makes a ₦30,000 cash sale, her Sales account is credited ₦30,000 — revenue going up — while her Cash account is debited the same amount, since an asset is also going up. Every transaction needs both sides.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these does a credit entry typically increase?', opts:['Assets', 'Expenses', 'Revenue', 'Drawings'], ans:2, exp:'Credits increase liabilities, capital and revenue. Assets, expenses and drawings are increased by debits, not credits.'}
    },
    {id:23, term:'Creditor', duration:'2 min', pips:1,
      definition:`A person or business to whom money is owed, usually because goods or services have been supplied on credit and not yet paid for.`,
      scenario:`Amaka's wholesaler supplied ₦200,000 of stock on credit, to be paid next month. Until she pays, the wholesaler is a creditor of her business — someone the kiosk owes money to.`,
      votes:{up:0, down:0},
      quiz:{q:'What is a creditor?', opts:['Someone who owes the business money', 'Someone the business owes money to', 'An asset of the business', 'A type of expense'], ans:1, exp:'A creditor is someone the business owes money to — the opposite of a debtor, who owes money to the business.'}
    },
    {id:24, term:'Current Assets', duration:'2 min', pips:1,
      definition:`Assets that are cash, or are expected to be turned into cash or used up within twelve months, such as stock, debtors, cash at bank and cash in hand. Listed in order of increasing liquidity.`,
      scenario:`Amaka's stock of phone cases, the ₦15,000 a customer owes her, and the cash in her till are all current assets — each expected to become cash, or be used up, within the next year.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following is a current asset?', opts:['A delivery motorcycle expected to last 5 years', 'Stock held for resale', 'The kiosk building itself', 'A 10-year business loan'], ans:1, exp:'Stock held for resale is a current asset — expected to be sold and turned into cash within the next twelve months, unlike long-term assets such as a motorcycle or building.'}
    },
    {id:25, term:'Current Liabilities', duration:'2 min', pips:1,
      definition:`Amounts owed by a business that must be paid within twelve months of the balance sheet date, such as creditors for goods and short-term loans or overdrafts.`,
      scenario:`Amaka owes her wholesaler ₦200,000, due next month, and has a small ₦50,000 bank overdraft. Both are current liabilities — debts she must settle within the coming year.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these is a current liability?', opts:['A loan to be repaid over 10 years', 'An amount owed to a supplier, due next month', 'The owner\'s capital', 'A delivery van owned by the business'], ans:1, exp:'An amount owed to a supplier due within the next twelve months is a current liability. A 10-year loan is a long-term liability, not a current one.'}
    },
    {id:26, term:'Debit', duration:'2 min', pips:1,
      definition:`The left-hand side of an account in the double entry system. Debits increase assets and expenses, and decrease liabilities, capital and revenue.`,
      scenario:`When Amaka buys ₦100,000 of stock with cash, her Stock account is debited ₦100,000 (an asset increasing), while her Cash account is credited the same amount (an asset decreasing). One asset simply converted into another.`,
      votes:{up:0, down:0},
      quiz:{q:'What effect does a debit entry have on an expense account?', opts:['Decreases it', 'Increases it', 'Has no effect', 'Converts it into a liability'], ans:1, exp:'Debits increase expense accounts, along with assets, and decrease liabilities, capital and revenue.'}
    },
    {id:27, term:'Debtor', duration:'2 min', pips:1,
      definition:`A person or business that owes money to the business, usually because they have bought goods or services on credit and not yet paid for them.`,
      scenario:`A regular customer buys ₦15,000 of goods from Amaka on credit, promising to pay next week. Until then, that customer is a debtor of her business.`,
      votes:{up:0, down:0},
      quiz:{q:'What is a debtor?', opts:['Someone the business owes money to', 'Someone who owes the business money', 'A type of liability', 'An item of stock'], ans:1, exp:'A debtor owes money to the business — the opposite of a creditor, to whom the business owes money.'}
    },
    {id:28, term:'Double Entry Bookkeeping', duration:'2 min', pips:1,
      definition:`The system of recording every transaction twice — once as a debit in one account and once as an equal credit in another account — so that the accounting equation always remains in balance.`,
      scenario:`When Amaka pays ₦50,000 cash for shop rent, double entry requires two entries: a debit to the Rent account (an expense increasing) and a credit to the Cash account (an asset decreasing) — both sides of the same transaction.`,
      votes:{up:0, down:0},
      quiz:{q:'Why does double entry bookkeeping require every transaction to be recorded twice?', opts:['To make bookkeeping take longer', 'So that the accounting equation always remains in balance', 'Because tax authorities require duplicate records', 'To allow two different people to record the same transaction'], ans:1, exp:'Recording both a debit and an equal credit for every transaction is what keeps the accounting equation in balance at all times — this is the core mechanism of double entry.'}
    },
    {id:29, term:'Drawings', duration:'2 min', pips:1,
      definition:`Cash or goods withdrawn from the business by its owner for personal use. Drawings reduce capital but are never treated as a business expense, and are recorded in a separate drawings account.`,
      scenario:`When Amaka takes ₦40,000 from the till to pay her own rent at home, that's drawings — it reduces her capital in the business, but it would be wrong to record it as a business expense like rent or wages.`,
      votes:{up:0, down:0},
      quiz:{q:'How do drawings affect a business\'s reported profit for the year?', opts:['They reduce profit, the same as an expense', 'They have no effect on profit — they reduce capital instead', 'They increase profit', 'They are added to revenue'], ans:1, exp:'Drawings are never treated as an expense, so they don\'t reduce profit. They reduce the owner\'s capital directly, recorded in a separate drawings account.'}
    },
    {id:30, term:'Dual Aspect Concept', duration:'2 min', pips:1,
      definition:`The principle that every transaction has two effects on the accounting records, which must balance against each other. This is the foundation that double entry bookkeeping is built upon.`,
      scenario:`When Amaka buys a display cabinet on credit, two things happen at once: her assets increase (the cabinet) and her liabilities increase (what she owes the supplier). Neither effect happens without the other — that's the dual aspect concept in action.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the dual aspect concept state?', opts:['Every transaction has only one effect on the accounts', 'Every transaction has two effects on the accounting records that must balance', 'Only large transactions need to be recorded twice', 'Assets and liabilities are recorded separately, with no connection'], ans:1, exp:'The dual aspect concept holds that every transaction affects the accounts in two balancing ways — this is the underlying principle that double entry bookkeeping is built on.'}
    },
    {id:31, term:'Equity', duration:'2 min', pips:1,
      definition:`Another term for the owner's capital — the value of the owner's stake in the business after liabilities have been accounted for.`,
      scenario:`If Amaka's kiosk has ₦1,800,000 of assets and ₦600,000 of liabilities, her equity (or capital — both words mean the same thing here) is ₦1,200,000.`,
      votes:{up:0, down:0},
      quiz:{q:'A business has ₦5,000,000 assets and ₦2,200,000 liabilities. What is its equity?', opts:['₦2,200,000', '₦2,800,000', '₦7,200,000', '₦5,000,000'], ans:1, exp:'Equity = Assets − Liabilities = ₦5,000,000 − ₦2,200,000 = ₦2,800,000. Equity and capital are the same figure, just different names for it.'}
    },
    {id:32, term:'Expenses', duration:'2 min', pips:1,
      definition:`The value of assets and services used up by a business in the course of earning its revenue, such as rent, wages, lighting and insurance.`,
      scenario:`Amaka's monthly rent, her assistant's wages, and the electricity bill are all expenses — costs used up in the process of running the kiosk and earning sales revenue.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following is an example of a business expense?', opts:['Buying a new delivery motorcycle', 'Monthly shop rent', 'The owner withdrawing cash for personal use', 'Stock still unsold at year end'], ans:1, exp:'Monthly rent is a cost used up in earning revenue during the period — a textbook expense. The motorcycle is capital expenditure, drawings aren\'t a business expense, and unsold stock is an asset.'}
    },
    {id:33, term:'Final Accounts', duration:'2 min', pips:1,
      definition:`An older term for the financial statements produced at the end of an accounting period, including the trading and profit and loss account and the balance sheet. The more modern term is 'financial statements'.`,
      scenario:`If an older accounting textbook talks about preparing Amaka's 'final accounts' at year end, it's referring to exactly the same documents a modern report would call her 'financial statements' — the trading and profit and loss account plus the balance sheet.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the older term \'final accounts\' refer to?', opts:['Only the balance sheet', 'Only the cash book', 'The trading and profit and loss account and the balance sheet', 'A list of all customers who owe money'], ans:2, exp:'\'Final accounts\' is an older name for what\'s now usually called financial statements — principally the trading and profit and loss account and the balance sheet.'}
    },
    {id:34, term:'Financial Statements', duration:'2 min', pips:1,
      definition:`The set of formal reports produced at the end of an accounting period summarising a business's performance and position, principally the trading and profit and loss account and the balance sheet.`,
      scenario:`At the end of the year, Amaka's accountant prepares her financial statements — one report showing how much profit the kiosk made, and another showing what it owns and owes at year end.`,
      votes:{up:0, down:0},
      quiz:{q:'What do financial statements summarise?', opts:['Only the cash transactions of the year', 'A business\'s performance and position at the end of a period', 'Only the tax owed by the business', 'A list of all suppliers'], ans:1, exp:'Financial statements summarise a business\'s performance (via the trading and profit and loss account) and its position (via the balance sheet) at the end of an accounting period.'}
    },
    {id:35, term:'Fixed Assets', duration:'2 min', pips:1,
      definition:`Assets bought for long-term use in the business rather than for resale, such as land, buildings, machinery and vehicles. They are expected to be of use to the business for a considerable time.`,
      scenario:`Amaka's delivery motorcycle is a fixed asset — bought to be used for years of deliveries, not to be sold on. The phone cases she sells are not fixed assets; they're stock, meant to move through the business quickly.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these is a fixed asset for a delivery business?', opts:['Fuel held in storage for the delivery vehicles', 'A delivery van used for years of service', 'Cash received from a delivery fee', 'An amount owed by a customer'], ans:1, exp:'The delivery van is bought for long-term use, not resale — a fixed asset. Fuel, cash and amounts owed by customers are all current assets, expected to be used or converted to cash within the year.'}
    },
    {id:36, term:'Going Concern Concept', duration:'2 min', pips:1,
      definition:`The assumption, when preparing financial statements, that a business will continue trading for the foreseeable future. This justifies valuing most assets at cost rather than at their forced 'sale up' value.`,
      scenario:`Amaka's display cabinet is valued in her accounts at what she paid for it, not at the much lower price she'd get if she had to suddenly sell everything tomorrow. That's only reasonable because the going concern concept assumes her business will keep trading normally.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the going concern concept assume?', opts:['That a business will be sold within the year', 'That a business will continue trading for the foreseeable future', 'That all assets must be valued at their forced sale price', 'That profit can never be negative'], ans:1, exp:'The going concern concept assumes the business will keep trading into the foreseeable future, which is why assets are normally valued at cost rather than at a knockdown forced-sale value.'}
    },
    {id:37, term:'Gross Loss', duration:'2 min', pips:1,
      definition:`The result when the cost of goods sold is greater than sales revenue for a period — the trading account shows a deficit before other expenses are even considered.`,
      scenario:`If Amaka's cost of goods sold for the month is ₦320,000 but her sales were only ₦290,000, she has a gross loss of ₦30,000 — meaning she lost money on the goods themselves, before even counting rent or wages.`,
      votes:{up:0, down:0},
      quiz:{q:'When does a business record a gross loss?', opts:['When total expenses exceed total revenue', 'When the cost of goods sold exceeds sales revenue', 'When the owner takes too many drawings', 'When liabilities exceed assets'], ans:1, exp:'A gross loss occurs specifically when the cost of goods sold is greater than sales revenue — a problem with the trading activity itself, calculated before other expenses are considered.'}
    },
    {id:38, term:'Gross Profit', duration:'2 min', pips:1,
      definition:`The excess of sales revenue over the cost of goods sold for a period, calculated in the trading account before any other expenses are deducted.`,
      scenario:`Amaka's sales for the month were ₦450,000, and her cost of goods sold was ₦320,000. Her gross profit is ₦130,000 — what's left from trading before rent, wages and other expenses are taken into account.`,
      votes:{up:0, down:0},
      quiz:{q:'Sales revenue is ₦600,000 and cost of goods sold is ₦410,000. What is the gross profit?', opts:['₦1,010,000', '₦190,000', '₦410,000', '₦600,000'], ans:1, exp:'Gross profit = Sales − Cost of goods sold = ₦600,000 − ₦410,000 = ₦190,000.'}
    },
    {id:39, term:'Historical Cost Concept', duration:'2 min', pips:1,
      definition:`The principle that assets are normally recorded and shown in the accounts at the price originally paid for them, rather than at their current market value.`,
      scenario:`Amaka bought her display cabinet for ₦120,000 three years ago. Even if similar cabinets now sell for ₦150,000, her accounts still show it at the original ₦120,000 — the historical cost concept keeps valuations objective and based on an actual, verifiable transaction.`,
      votes:{up:0, down:0},
      quiz:{q:'Under the historical cost concept, at what value are assets normally recorded?', opts:['Their current market value', 'Their estimated future selling price', 'The price originally paid for them', 'Whatever value the owner believes is fair'], ans:2, exp:'The historical cost concept records assets at the price actually paid for them, rather than at a constantly changing current market value — keeping the figures objective and verifiable.'}
    },
    {id:40, term:'Liabilities', duration:'2 min', pips:1,
      definition:`Amounts owed by a business to outside parties — for goods or services supplied, for expenses not yet paid, or for money borrowed.`,
      scenario:`Amaka owes her wholesaler ₦200,000 for stock bought on credit, and ₦50,000 to the bank for a small overdraft. Both are liabilities — amounts her business owes to others.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of the following is a liability?', opts:['Stock held for resale', 'An amount owed to a supplier', 'Cash in the bank', 'A delivery motorcycle owned by the business'], ans:1, exp:'An amount owed to a supplier is a liability — money the business owes to an outside party. Stock, cash and the motorcycle are all assets, not liabilities.'}
    },
    {id:41, term:'Loss', duration:'2 min', pips:1,
      definition:`The result of selling goods or services for less than the cost of providing them — expenses exceed revenue for the period.`,
      scenario:`If Amaka's total expenses for the month came to ₦500,000 but her total revenue was only ₦420,000, her business made a loss of ₦80,000 for that month.`,
      votes:{up:0, down:0},
      quiz:{q:'When does a business make a loss?', opts:['When revenue exceeds expenses', 'When expenses exceed revenue', 'When assets exceed liabilities', 'When the owner takes drawings'], ans:1, exp:'A loss occurs when expenses exceed revenue for the period — the opposite of a profit, where revenue exceeds expenses.'}
    },
    {id:42, term:'Materiality', duration:'2 min', pips:1,
      definition:`The principle that an item only needs to be recorded with full precision if it is significant enough to matter to someone using the financial statements. Trivial items can be treated simply, even if technically inaccurate.`,
      scenario:`Amaka buys a ₦500 stapler for the kiosk. Technically, it could be treated as a long-life fixed asset and depreciated over several years — but that level of precision is pointless for such a small amount. Materiality allows her to simply treat it as an expense in the year of purchase instead.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the materiality principle allow accountants to do?', opts:['Ignore all small transactions entirely', 'Treat trivial items simply, even if technically imprecise, since they wouldn\'t matter to a user of the accounts', 'Record only transactions involving cash', 'Avoid preparing financial statements for small businesses'], ans:1, exp:'Materiality means trivial items can be treated in a simpler way, since the effort of perfect precision isn\'t justified when the amount is too small to matter to anyone using the financial statements.'}
    },
    {id:43, term:'Money Measurement Concept', duration:'2 min', pips:1,
      definition:`The principle that accounting only records facts that can be expressed in monetary terms and on which most people would agree a value — meaning many important non-financial facts about a business never appear in its accounts.`,
      scenario:`Amaka's accounts can show the ₦120,000 she paid for her display cabinet, but they can't show how friendly her staff are to customers or how good her kiosk's location is — those things matter to the business, but they can't be reliably expressed in money, so accounting leaves them out.`,
      votes:{up:0, down:0},
      quiz:{q:'According to the money measurement concept, why might an important fact about a business NOT appear in its accounts?', opts:['Because the accountant forgot to include it', 'Because it cannot be expressed in monetary terms on which most people would agree', 'Because it relates to a future period', 'Because only the owner is allowed to know it'], ans:1, exp:'The money measurement concept restricts accounting to facts that can be reliably expressed in money — qualities like staff friendliness or location, however important, fall outside what accounting can capture.'}
    },
    {id:44, term:'Net Loss', duration:'2 min', pips:1,
      definition:`The result when the cost of goods sold plus all other expenses exceeds total revenue for a period — the final, bottom-line deficit shown in the profit and loss account.`,
      scenario:`After deducting the cost of goods sold AND all other expenses like rent and wages, if Amaka's kiosk ends the month with total costs of ₦480,000 against ₦430,000 of revenue, she has a net loss of ₦50,000 — the true bottom-line result.`,
      votes:{up:0, down:0},
      quiz:{q:'What does a net loss represent?', opts:['A loss only from the cost of goods sold', 'The final bottom-line deficit after all expenses are deducted from all revenue', 'Money owed to a supplier', 'The amount of capital withdrawn by the owner'], ans:1, exp:'Net loss is the final, bottom-line result — what\'s left after deducting cost of goods sold AND every other expense from total revenue, showing the business made an overall deficit for the period.'}
    },
    {id:45, term:'Net Profit', duration:'2 min', pips:1,
      definition:`The amount remaining after all expenses — including those beyond the cost of goods sold — have been deducted from gross profit plus any other revenue. This is the figure transferred to the capital account.`,
      scenario:`Amaka's gross profit for the month is ₦130,000. After deducting rent, wages and other expenses totalling ₦70,000, her net profit is ₦60,000 — the true final result, which gets added to her capital.`,
      votes:{up:0, down:0},
      quiz:{q:'Gross profit is ₦300,000 and other expenses (rent, wages, etc.) total ₦180,000. What is the net profit?', opts:['₦480,000', '₦120,000', '₦300,000', '₦180,000'], ans:1, exp:'Net profit = Gross profit − Other expenses = ₦300,000 − ₦180,000 = ₦120,000.'}
    },
    {id:46, term:'Profit', duration:'2 min', pips:1,
      definition:`The result of selling goods or services for more than they cost to provide — revenue exceeds expenses for the period.`,
      scenario:`If Amaka's total revenue for the month is ₦450,000 and her total expenses come to ₦380,000, she has made a profit of ₦70,000.`,
      votes:{up:0, down:0},
      quiz:{q:'When does a business make a profit?', opts:['When expenses exceed revenue', 'When revenue exceeds expenses', 'When liabilities exceed assets', 'When the owner takes drawings'], ans:1, exp:'Profit occurs when revenue exceeds expenses for the period — the opposite of a loss, where expenses exceed revenue.'}
    },
    {id:47, term:'Profit and Loss Account', duration:'2 min', pips:1,
      definition:`The section of the trading and profit and loss account in which net profit (or net loss) is calculated, by deducting expenses other than the cost of goods sold from gross profit.`,
      scenario:`After Amaka's trading account works out her gross profit of ₦130,000, the profit and loss account takes over — deducting rent, wages and other running costs to arrive at her final net profit of ₦60,000.`,
      votes:{up:0, down:0},
      quiz:{q:'What is calculated in the profit and loss account section?', opts:['Gross profit, by deducting cost of goods sold from sales', 'Net profit, by deducting other expenses from gross profit', 'The value of unsold stock', 'The owner\'s total capital'], ans:1, exp:'The profit and loss account section takes gross profit (already calculated in the trading account) and deducts all other expenses to arrive at net profit or net loss.'}
    },
    {id:48, term:'Prudence', duration:'2 min', pips:1,
      definition:`The principle that an accountant should be cautious when judgement is required — making sure assets and profits are not overstated, and that liabilities and losses are not understated.`,
      scenario:`Amaka isn't sure whether a customer who owes her ₦20,000 will actually pay, given they've been avoiding her calls. Prudence means she should lean toward assuming the worst and treating the debt as doubtful, rather than confidently counting it as money she definitely has.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the prudence principle require when there is uncertainty?', opts:['Always assume the best possible outcome', 'Be cautious — don\'t overstate assets or profits, and don\'t understate liabilities or losses', 'Ignore the uncertain item entirely', 'Wait until the uncertainty is fully resolved before recording anything'], ans:1, exp:'Prudence requires caution in the face of uncertainty — erring toward not overstating what\'s good (assets, profits) and not understating what\'s bad (liabilities, losses).'}
    },
    {id:49, term:'Purchases', duration:'2 min', pips:1,
      definition:`In accounting, the goods bought by a business with the intention of reselling them, as distinct from items such as vehicles or equipment which are bought for use rather than resale.`,
      scenario:`When Amaka buys ₦300,000 of phone cases from her wholesaler to sell on, that's purchases. When she buys a delivery motorcycle to use in the business, that is not purchases — it's capital expenditure on a fixed asset.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these counts as \'purchases\' in accounting terms?', opts:['A delivery motorcycle bought for the business', 'Stock bought with the intention of reselling it', 'A display cabinet bought for the shop', 'Office furniture bought for staff use'], ans:1, exp:'Purchases specifically refers to goods bought with the intention of resale — items bought for use in the business, like a motorcycle or furniture, are fixed assets, not purchases.'}
    },
    {id:50, term:'Realisation Concept', duration:'2 min', pips:1,
      definition:`The principle that profit should only be recognised once it has actually been 'realised' — meaning the goods or services have been provided, a value agreed, and there is reasonable certainty the buyer will pay.`,
      scenario:`A customer asks Amaka to reserve ₦50,000 of stock for next week, but no sale has happened yet — no goods have changed hands and no firm agreement is in place. Under the realisation concept, Amaka cannot count that as profit until the sale is actually completed.`,
      votes:{up:0, down:0},
      quiz:{q:'According to the realisation concept, when should profit be recognised?', opts:['As soon as a customer expresses interest in buying', 'Once goods or services have been provided and there is reasonable certainty of payment', 'Only once cash has actually been received', 'At the very start of the accounting period'], ans:1, exp:'The realisation concept requires that goods or services actually be provided, with an agreed value and reasonable certainty of payment, before profit can be recognised — mere interest or a reservation isn\'t enough.'}
    },
    {id:51, term:'Returns Inwards', duration:'2 min', pips:1,
      definition:`Goods previously sold to customers that have been returned to the business — also called sales returns. They are deducted from sales when calculating gross profit.`,
      scenario:`A customer brings back a faulty phone case worth ₦5,000 that they'd bought from Amaka. This is returns inwards — and it will reduce Amaka's recorded sales figure for the period.`,
      votes:{up:0, down:0},
      quiz:{q:'How are returns inwards treated when calculating gross profit?', opts:['Added to purchases', 'Deducted from sales', 'Added to cost of goods sold directly', 'Ignored, since the goods are now back in stock'], ans:1, exp:'Returns inwards (goods customers send back) are deducted from sales revenue when calculating gross profit — the original sale is effectively partly reversed.'}
    },
    {id:52, term:'Returns Outwards', duration:'2 min', pips:1,
      definition:`Goods previously bought from suppliers that have been returned by the business — also called purchases returns. They are deducted from purchases when calculating the cost of goods sold.`,
      scenario:`Amaka receives a batch of damaged phone cases from her wholesaler and sends them back. This is returns outwards — and it reduces the purchases figure used to calculate her cost of goods sold.`,
      votes:{up:0, down:0},
      quiz:{q:'How are returns outwards treated when calculating cost of goods sold?', opts:['Added to sales', 'Deducted from purchases', 'Added to closing stock', 'Ignored, since the supplier already has the goods back'], ans:1, exp:'Returns outwards (goods sent back to suppliers) are deducted from purchases — the original purchase is effectively partly reversed when calculating cost of goods sold.'}
    },
    {id:53, term:'Revenue', duration:'2 min', pips:1,
      definition:`The financial value of goods and services that a business has supplied to its customers during a period — the starting point for calculating profit.`,
      scenario:`Across the month, Amaka's kiosk supplied ₦450,000 worth of phone cases and accessories to customers. That ₦450,000 is her revenue for the month — the starting figure before any costs are deducted.`,
      votes:{up:0, down:0},
      quiz:{q:'What does revenue represent?', opts:['The cash a business has in the bank', 'The financial value of goods and services supplied to customers during a period', 'The amount owed to suppliers', 'The profit remaining after all expenses'], ans:1, exp:'Revenue is the value of goods and services supplied to customers during a period — the starting point from which expenses are deducted to eventually arrive at profit.'}
    },
    {id:54, term:'Sales', duration:'2 min', pips:1,
      definition:`In accounting, the income from selling the goods which the business normally deals in and which were bought with the intention of resale — not the disposal of other assets such as vehicles.`,
      scenario:`When Amaka sells phone cases — the goods her kiosk normally deals in — that income counts as sales. If she later sold her old delivery motorcycle, that would NOT be recorded as sales, since the motorcycle wasn't bought for resale.`,
      votes:{up:0, down:0},
      quiz:{q:'Which of these would be recorded as \'sales\' in a kiosk\'s accounts?', opts:['Selling an old delivery motorcycle no longer needed', 'Selling phone cases, the kiosk\'s normal trading stock', 'Selling a display cabinet being replaced', 'Receiving a loan from the bank'], ans:1, exp:'Sales specifically refers to income from selling the goods a business normally trades in. Selling other assets like a motorcycle or cabinet is a separate type of transaction, not sales.'}
    },
    {id:55, term:'Separate Determination Concept', duration:'2 min', pips:1,
      definition:`The principle that the value of each individual asset or liability must be assessed on its own, before being added together into a total — potential gains and losses should not simply be netted off against each other.`,
      scenario:`Amaka has two batches of stock: one she expects to sell at a ₦20,000 profit, and one she expects to sell at a ₦15,000 loss due to damage. The separate determination concept means she must assess and record each one individually, rather than just netting them off to show a combined ₦5,000 profit.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the separate determination concept prevent?', opts:['Recording any losses at all', 'Simply netting off potential gains and losses against each other instead of assessing each item individually', 'Combining similar items into one account', 'Recording assets at historical cost'], ans:1, exp:'Separate determination requires each asset or liability to be assessed on its own merits — netting a probable gain against a probable loss to show one combined figure would hide important information.'}
    },
    {id:56, term:'Stock', duration:'2 min', pips:1,
      definition:`Goods held by a business with the intention of resale. The value of unsold stock at the end of a period is needed to calculate the cost of goods sold and appears as a current asset on the balance sheet.`,
      scenario:`At the end of the month, Amaka counts ₦80,000 worth of phone cases still sitting unsold in her kiosk. That ₦80,000 is her closing stock — needed both to calculate her cost of goods sold and to appear as a current asset on her balance sheet.`,
      votes:{up:0, down:0},
      quiz:{q:'Why does a business need to know the value of its closing stock?', opts:['To calculate how much tax is owed', 'Because it\'s needed to calculate cost of goods sold and appears as a current asset on the balance sheet', 'Because stock cannot be sold once counted', 'To determine the owner\'s capital directly'], ans:1, exp:'Closing stock value feeds into the cost of goods sold calculation and is shown separately as a current asset on the balance sheet — it plays a role in both major financial statements.'}
    },
    {id:57, term:'Substance Over Form', duration:'2 min', pips:1,
      definition:`The principle that a transaction should be accounted for according to its real economic effect, even if this differs from its strict legal form.`,
      scenario:`Amaka technically leases a refrigerator under an agreement structured to look like a rental, but the terms mean she'll end up owning it after a few years of payments and bears all the risk if it breaks. Substance over form says her accounts should treat this as if she purchased the fridge on credit, reflecting the real economic effect rather than the surface-level legal label of 'rental'.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the substance over form principle prioritise?', opts:['The strict legal wording of an agreement', 'The real economic effect of a transaction, even if it differs from its legal form', 'Whichever treatment results in lower tax', 'The preference of whoever drafted the contract'], ans:1, exp:'Substance over form looks past the legal label of a transaction to its real economic effect — what\'s actually happening financially matters more than how it\'s formally described.'}
    },
    {id:58, term:'T-Account', duration:'2 min', pips:1,
      definition:`The traditional layout for an individual account in the accounting books, drawn as a large letter 'T' with the account title across the top, debit entries on the left and credit entries on the right.`,
      scenario:`When Amaka's bookkeeper records cash transactions, she draws a large 'T' shape on the page, writes 'Cash' across the top, and lists every debit entry on the left side and every credit entry on the right — the classic T-account layout.`,
      votes:{up:0, down:0},
      quiz:{q:'In a T-account, where are debit entries recorded?', opts:['On the right-hand side', 'On the left-hand side', 'Across the top', 'Underneath the account title only'], ans:1, exp:'In the traditional T-account layout, debit entries go on the left-hand side and credit entries go on the right-hand side.'}
    },
    {id:59, term:'Time Interval Concept', duration:'2 min', pips:1,
      definition:`The principle that financial statements are prepared for fixed, regular periods of time — typically a year for external reporting, though management may use shorter periods internally.`,
      scenario:`Amaka prepares full financial statements for her kiosk once a year, covering 1 January to 31 December — but she also checks a simpler monthly summary internally, since waiting a full year to see how things are going would make it much harder to catch problems early.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the time interval concept establish?', opts:['That financial statements should only ever be prepared once, when a business closes', 'That financial statements are prepared for fixed, regular periods of time', 'That all businesses must report monthly', 'That profit can only be measured over multi-year periods'], ans:1, exp:'The time interval concept establishes that financial statements are prepared for fixed, regular periods — typically a year externally, though businesses often use shorter periods for internal management purposes.'}
    },
    {id:60, term:'Trading Account', duration:'2 min', pips:1,
      definition:`The section of the trading and profit and loss account in which gross profit (or gross loss) is calculated, by deducting the cost of goods sold from sales revenue.`,
      scenario:`The first section of Amaka's year-end report — the trading account — takes her ₦450,000 of sales, deducts her ₦320,000 cost of goods sold, and shows a gross profit of ₦130,000. Only after this does the report move on to other expenses.`,
      votes:{up:0, down:0},
      quiz:{q:'What is calculated in the trading account section?', opts:['Net profit, after all expenses', 'Gross profit, by deducting cost of goods sold from sales', 'The owner\'s total capital', 'Cash held at the bank'], ans:1, exp:'The trading account section calculates gross profit (or gross loss) by deducting the cost of goods sold from sales revenue — the first step before other expenses are considered.'}
    },
    {id:61, term:'Trading and Profit and Loss Account', duration:'2 min', pips:1,
      definition:`A financial statement combining the trading account and the profit and loss account, showing how a business arrived at its net profit or net loss for a period.`,
      scenario:`Amaka's year-end report walks through two stages in one combined statement: first the trading account works out her gross profit, then the profit and loss account deducts her other expenses to arrive at the final net profit.`,
      votes:{up:0, down:0},
      quiz:{q:'What does the trading and profit and loss account show overall?', opts:['Only the assets and liabilities of a business', 'How a business arrived at its net profit or net loss for a period', 'A list of all customers who owe money', 'The cash balance at a single point in time'], ans:1, exp:'The trading and profit and loss account combines both stages — gross profit calculation and then net profit calculation — to show the full journey from sales revenue down to the final net profit or loss.'}
    },
    {id:62, term:'Trial Balance', duration:'2 min', pips:1,
      definition:`A list of all the account balances in a business's ledgers at a particular date, arranged into debit and credit columns. If double entry has been carried out correctly, the two columns will total the same amount.`,
      scenario:`Before preparing her financial statements, Amaka's bookkeeper lists every single account balance — cash, stock, sales, rent, and so on — into two columns. If the debit column and credit column add up to the same total, it's a good sign the double entry has been done correctly.`,
      votes:{up:0, down:0},
      quiz:{q:'What does a trial balance check?', opts:['Whether the business made a profit', 'Whether the debit and credit columns of all account balances total the same amount', 'Whether all customers have paid what they owe', 'Whether stock has been correctly counted'], ans:1, exp:'A trial balance lists every account balance into debit and credit columns — if double entry has been done correctly, both columns will total the same amount, which is a useful (though not foolproof) check.'}
    },
    {id:63, term:'Working Capital', duration:'2 min', pips:1,
      definition:`The amount by which current assets exceed current liabilities — a measure of the short-term resources a business has available for its day-to-day operations. Also called net current assets.`,
      scenario:`Amaka's current assets (stock, cash, amounts owed to her) total ₦300,000, while her current liabilities (amounts she owes within the year) total ₦120,000. Her working capital is ₦180,000 — the short-term cushion she has for running the business day to day.`,
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
