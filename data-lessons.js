// Butterfly Dynamix Learning — data.js
// Lazy-loaded chunk, split out for performance. See data.js for the core
// (homepage-critical) content that's always loaded.

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
      definition:`Assets = Liabilities + Equity. This equation is the foundation of all accounting. Everything a business owns (assets) was funded either by borrowing (liabilities) or by the owner (equity). The two sides always balance — always.`,
      scenario:`It was 7:45am on a Monday morning when Amaka Obi unlocked the glass door of her new phone shop for the first time. The shop was small — one room on a busy street in Ikeja, Lagos — but it was hers. She had spent the past three months preparing for this moment. She stood in the middle of the room and looked around at everything she had gathered to start this business. Two shelves of phones along the back wall. A display cabinet she had bought on credit from a furniture supplier. A small cash float in the till. A laptop on the counter. And a knot in her stomach that said: I have no idea how to keep track of any of this. Two doors down, Aunty Florence was already open — the older woman ran a stationery supply business and had been on this street for over twenty years. She appeared in Amaka's doorway with two cups of tea and a calm expression. "You look like you need this," she said. Amaka accepted the cup. "How do I even know how to account for all these?" she asked. Aunty Florence looked around the shop slowly. "List everything the business owns," she said. "Then list everything it owes. The difference is yours. That's accounting."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>Aunty Florence sat down on the edge of the counter and handed Amaka a notepad. "Let's do this properly," she said. "Everything in this business falls into one of three categories. Assets — what the business owns. Liabilities — what the business owes. Equity — what's yours- this is the amount you personally put into the business, plus profits from sales and retained earnings in the business."</p>
  <p>The relationship between them is expressed as the <strong>accounting equation</strong>:</p>
  <div class="lesson-equation"> Assets = Liabilities + Equity</div>
  <p>It can also be written as:</p>
  <div class="lesson-equation"> Assets − Liabilities = Equity </div>
  <p> or </p>
  <div class="lesson-equation" > Assets − Equity = Liabilities </div>
  <p>This is the most important equation in accounting. No matter how many transactions a business makes — hundreds, thousands, millions — both sides of this equation will always be equal. If they are not, something has been recorded incorrectly.</p>
  <p>Think of it this way: everything the business owns (assets) had to come from somewhere. Either Amaka put it in herself (equity), or she borrowed it or bought it on credit (liabilities). There is no third option. That is why the two sides always balance.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Opening Day</h3>
  <p>Aunty Florence helped Amaka write down everything in the shop that morning:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>What the business Owns (Assets)</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Phones in stock (20 handsets)</td><td>800,000</td></tr>
      <tr><td>Display cabinet</td><td>150,000</td></tr>
      <tr><td>Laptop</td><td>120,000</td></tr>
      <tr><td>Cash in till (float)</td><td>30,000</td></tr>
      <tr class="table-total"><td><strong>Total Assets</strong></td><td><strong>1,100,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Then they listed what the business owed:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>What the business Owes (Liabilities)</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Display cabinet supplier (60-day credit)</td><td>150,000</td></tr>
      <tr class="table-total"><td><strong>Total Liabilities</strong></td><td><strong>150,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Now the equation:</p>
  <div class="lesson-equation">Assets − Liabilities = Equity <br> ₦1,100,000 − ₦150,000 = <strong>₦950,000</strong></div>
  <p>"That ₦950,000," said Aunty Florence, "is your equity in this business. What you actually own, after accounting for what the business owes." Amaka stared at the number. She had invested her savings (₦950,000). Seeing it as a single figure made it suddenly real.</p>
  <p>Aunty Florence pointed at the two totals. "Check it the other way too:"</p>
  <div class="lesson-equation"> Assets = Liabilities + Equity <br>₦1,100,000 = ₦950,000 + ₦150,000 ✓</div>
  <p>"Always check both ways," said Aunty Florence. "If they don't match, you've missed something."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Every single transaction that happens in Amaka's Phone Shop will change the numbers inside the equation — but the equation itself will never stop being true. If you buy more stock with cash, this means your Assets (stock of goods) will increase, and your assets (cash) will decrease — the equation still balances. You buy on credit? Assets go up, liabilities also go up by the same amount — the equation still balances. This is the logic that makes accounting work.</p>
</div>`,
      quiz:{q:'Let\'s assume Amaka\'s Phone Shop has total assets of ₦1,400,000 and owes ₦320,000 to suppliers. Using the accounting equation, what is her capital?', opts:['₦1,720,000','₦1,080,000','₦320,000','₦1,400,000'], ans:1, exp:'Assets − Liabilities = Capital. Therefore, ₦1,400,000 − ₦320,000 = ₦1,080,000. The equation always holds: what the business owns minus what it owes equals what is truly yours.'}
    },
    
    {id:2, term:'Business Performance Measures', duration:'5 min', pips:2,
      definition:`An asset is a resource owned or controlled by a business that is expected to provide future economic benefit. Assets appear on the left side of the accounting equation and on the top section of a balance sheet.`,
      scenario:`By the end of her first week, Amaka had sold five phones and was feeling more confident. Her close friend- Nkechi, came to visit and asked how the business was doing. "Good, I think," said Amaka. "I have made some sales. Her friend looked around. "That’s great, but I know you let a couple of people take phones on credit. Is the business actually doing well if the cash isn't all here yet?" Amaka wasn't sure how to answer. "It is doing well, but you have to look at the whole picture," Aunty Florence said, stepping in through the doorway. "Amaka making sales is a good start, but it doesn't tell the whole story. To know if you business is doing well, there are three major terms you must understand.
      <p> <strong> 1. Profitability</strong>- Is your revenue actually greater than your costs? This is what the trading, profit and loss account reveals. I will teach more about this at a later time. The second term you must understand is Liquidity</p>
      <p> <strong> 2. Liquidity</strong>- does your business have enough cash, or cash coming in soon to pay its bills when they are due? A business can be profitable but still run out of cash if it has too many credit sales or slow moving stock. </p>
      <p> <strong>3. Momentum?</strong> Are sales growing?, holding steady? or shrinking? A positive sales momentum means the business is accelerating, revenue growth is speeding up, however, a negative sales momentum is the opposite, it means sales is slowing down/ declining. You sold 5 phones this week, will you sell 7 next week or 10?, a business that stops growing starts shrinking. </p> `,
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
      quiz:{q:'Nkechi\'s worry about the business is really a question about which of the three measures?', opts:['Profitability','Liquidity','Momentum','None of these'], ans:2, exp:'Correct! Nkechi\'s concern is specifically about liquidity — she\'s not questioning whether the sales were good ones, she\'s asking whether the cash to actually run the business is on hand yet. Two of Amaka\'s five sales were on credit, meaning that money exists as a promise from a customer, not as cash in the till. A business can be genuinely profitable and still struggle to pay its own bills if too much of its revenue is sitting as debt owed to it rather than money it can spend today.'}
    },

    {id:3, term:'Equity and Liabilities', duration:'5 min', pips:2,
      definition:`Equity is the owner's investment, their financial stake in the business — this is what remains after all liabilities are deducted from all assets. Liabilities are amounts owed by the business to others — suppliers, banks, lenders. Together, equity and liabilities explain how every asset in the business was funded.`,
      scenario:`Ten days after opening, the display cabinet supplier- Mr Adeyemi called. "You have thirty days left," the man said. "₦150,000, due on the 23rd of next month (march)." Amaka put the phone down and felt a wave of anxiety. She had known about the debt — she'd agreed to it — but hearing the payment date made it suddenly concrete. She went next door. "I knew I owed this money," she told Aunty Florence. "But now I'm nervous." Aunty Florence nodded. "Good. Being nervous about what you owe means you understand it. The mistake would be forgetting it. Let me show you how this fits into your books — and why understanding it is actually reassuring."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>Aunty Florence opened her own ledger to show Amaka an example. "Every asset your business has was paid for somehow. Either you put money in yourself to pay for it — that's equity. Or you borrowed from someone or a bank to pay for it — that's a liability (debt)."</p>
  <p><strong>Liabilities</strong> are obligations — amounts the business must pay to outsiders. They divide into:</p>
  <ul class="lesson-list">
    <li><strong>Current liabilities</strong> — due within twelve months (supplier credit, bank overdraft)</li>
    <li><strong>Non-current liabilities</strong> — due beyond twelve months (long-term bank loans)</li>
  </ul>
  <p><strong>Equity</strong> (also called owner's equity or net worth) is the residual interest — what belongs to the owner after every liability is settled. It includes the initial investment, plus any profits retained in the business, minus any amounts the owner has withdrawn (drawings).</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Funding Side</h3>
  <p>On Day 10, the right-hand side of Amaka's accounting equation looked like this:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Equity</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Amaka's own savings invested</td><td>950,000</td></tr>
      <tr class="table-total"><td><strong>Total Equity</strong></td><td><strong>950,000</strong></td></tr>
    </tbody>
  </table></div>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Liabilities</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Display cabinet supplier (due in 30 days)</td><td>150,000</td></tr>
      <tr class="table-total"><td><strong>Total Liabilities</strong></td><td><strong>150,000</strong></td></tr>
    </tbody>
  </table></div>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <tbody>
      <tr class="table-total"><td><strong>Total Capital</strong></td><td><strong>1,100,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>And her total assets were also ₦1,100,000 — the equation balanced.</p>
  <p>"The ₦150,000 you owe the cabinet supplier," said Aunty Florence, "is not something to panic about. It's simply a liability — money leaving your business at a future date. As long as you know it's there, and you're planning for it, you're in control."</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Equity and Liabilities together always equal total assets — this is non-negotiable. Equity increases when the business makes a profit or the owner injects more funds. Equity decreases when the business makes a loss or the owner withdraws money (drawings). Liabilities are not bad — they are a normal way to fund a business — but they must always be tracked and managed carefully.</p>
</div>`,
      quiz:{q:'If Amaka\'s Phone Shop has total assets of ₦1,250,000 and capital of ₦900,000. What are her total liabilities?', opts:['₦2,150,000','₦350,000','₦900,000','₦1,250,000'], ans:1, exp:'Assets − Capital = Liabilities. Therefore, ₦1,250,000 − ₦900,000 = ₦350,000. The accounting equation rearranged: if you know any two values, you can always find the third.'}
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
    {id:11, term:'Assets', duration:'5 min', pips:2,
      definition:`Resources owned by a business or owed to it, such as buildings, equipment, stock, money in the bank, and amounts customers owe. Assets represent what a business has.`,
      scenario:`Four weeks in, Amaka arrived early on a Saturday to do her first proper stocktake. She moved through the shop with a notepad: phones on the shelves, cases and chargers in the display cabinet, the laptop on the counter, the cash float in the till. Then she paused. Tunde still owed her the balance on his account, and last week she had paid two months of shop rent in advance. Did those count? She was still standing there when Aunty Florence appeared with her tea. "Everything on your list so far is something you can touch," the older woman said, reading over her shoulder. "But assets are bigger than that. Tunde's debt? That is money owed to you — an asset. The rent you paid ahead? You own two months of shelter you have not used yet — also an asset. Write down what you own AND what you are owed. Both belong to the business." Amaka added two lines to the page, and her business suddenly looked bigger than the room it sat in.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>An asset is any resource the business <strong>owns or is owed</strong> that is expected to bring future benefit. That definition is wider than most new traders assume. It covers the physical things — stock, equipment, cash — but also the invisible ones: money customers owe you (debtors) and payments you have made in advance (prepayments).</p>
  <p>Aunty Florence's test is the simplest one: <em>"Does the business own it, or is the business owed it? Then it is an asset."</em> What matters is benefit flowing <strong>toward</strong> the business.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Week 4 Stocktake</h3>
  <p>Here is the full list Amaka ended up with, including the two items she nearly missed:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Asset</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Phones and accessories in stock</td><td>870,000</td></tr>
      <tr><td>Display cabinet</td><td>150,000</td></tr>
      <tr><td>Laptop</td><td>120,000</td></tr>
      <tr><td>Cash in till</td><td>42,000</td></tr>
      <tr><td>Owed by Tunde (debtor)</td><td>35,000</td></tr>
      <tr><td>Rent paid in advance (prepayment)</td><td>100,000</td></tr>
      <tr class="table-total"><td><strong>Total Assets</strong></td><td><strong>1,317,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Notice that the last two lines are things Amaka cannot touch. Tunde's debt is a legal claim to cash; the prepaid rent is two months of shelter already paid for but not yet used. Both bring future benefit — both are assets.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Assets = what the business <strong>owns</strong> + what the business <strong>is owed</strong>. Money the business owes others is never an asset — that is a liability, the other side of the equation. When in doubt, ask which direction the benefit flows.</p>
</div>`,
      quiz:{q:'Which of the following counts as an asset for a business?', opts:['Money the business owes a supplier', 'Money a customer owes the business', 'The owner\'s personal house, unrelated to the business', 'Wages already paid to staff'], ans:1, exp:'Money a customer owes the business is a resource owed TO the business, making it an asset. Money owed BY the business is a liability, not an asset.'}
    },
    {id:12, term:'Balance Brought Down', duration:'5 min', pips:2,
      definition:`The opening balance of an account at the start of a new period, carried forward from the closing balance of the previous period. Often abbreviated 'balance b/d'.`,
      scenario:`On the first morning of February, Amaka opened her cash book to a fresh page and hesitated, pen hovering. January's page was full — every sale, every payment, ruled off neatly at the bottom the night before. But February stared back at her, blank. Was she supposed to start from zero? She carried the book two doors down. Aunty Florence laughed gently. "Your cash did not disappear at midnight, did it? Look at the last line of January." There it was: the closing balance, ₦164,000. "That figure walks across the page boundary and sits at the top of February," said Aunty Florence, writing it in and labelling it b/d. "Balance brought down. It is the bridge between periods — the ending of one month becomes the beginning of the next. Every account starts its new life exactly where the old one ended." Amaka looked at the ₦164,000 sitting at the head of the new page like a returning friend, and February no longer felt blank.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Balance brought down (b/d)</strong> is the opening balance of an account at the start of a new period. It is not a new transaction — it is last period's closing balance walking across the page boundary to become this period's starting point.</p>
  <p>Nothing about the business changes at midnight on the last day of a month. The cash is still in the till; the debtors still owe. The b/d entry simply carries that continuing reality into the new page.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's February Opening</h3>
  <p>Amaka's cash account, first entry of February:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Date</th><th>Details</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>1 Feb</td><td>Balance b/d</td><td>164,000</td><td></td></tr>
    </tbody>
  </table></div>
  <p>That ₦164,000 is exactly the balance c/d figure from 31 January. On an asset account like cash, the opening balance sits on the <strong>debit</strong> side — because cash is an asset, and assets live on the left. If it were a liability account, the b/d would open on the credit side instead.</p>
  <p>Every account that had a balance at month end reopens this way: cash, bank, each debtor, each creditor, capital. The books never truly stop; they only turn pages.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>b/d = the bridge <em>into</em> a period. It always equals the previous period's balance c/d, and it always opens on the side that reflects the account's nature — debit for assets and expenses, credit for liabilities, capital and income.</p>
</div>`,
      quiz:{q:'What does \'balance b/d\' represent in an account?', opts:['The total of all transactions for the period', 'The opening balance carried forward from the previous period', 'An error that needs correcting', 'The amount of profit made that period'], ans:1, exp:'Balance brought down (b/d) is the opening balance at the start of a new period, carried forward from where the previous period\'s account left off.'}
    },
    {id:13, term:'Balance Carried Down', duration:'5 min', pips:2,
      definition:`The figure entered into an account at the end of a period to make both sides add up to the same total. It is then carried forward as the opening balance of the next period. Often abbreviated 'balance c/d'.`,
      scenario:`The evening before, on the 31st of January, Amaka had stayed late to close her first full month of books. Aunty Florence sat beside her with the cash account open. "Add up the debit side," she instructed. Amaka totalled it: ₦892,000. "Now the credit side." ₦728,000. "They don't match," Amaka said, worried she had made an error. "They are not supposed to match — yet," said Aunty Florence. "The difference is the cash you still have. ₦164,000. Now watch." She wrote ₦164,000 on the smaller credit side, labelled it c/d — balance carried down — and suddenly both sides totalled ₦892,000 exactly. She ruled two clean lines under each total. "The c/d figure is not a transaction. It is a placeholder that closes the account for the month, and tomorrow it reappears at the top of the new page as your opening balance. Carried down tonight, brought down tomorrow. Two names, one number, one bridge." Amaka ruled the lines herself, slowly, enjoying how final they felt.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Balance carried down (c/d)</strong> is the figure inserted at the end of a period to make both sides of an account total the same amount. It is a balancing device, not a transaction — nothing was bought, sold or paid. It answers one question: <em>what is left in this account?</em></p>
  <p>The c/d and b/d are one number with two jobs: c/d closes the old page, b/d opens the new one.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Closing January's Cash Account</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Dr side</th><th>₦</th><th>Cr side</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Total receipts</td><td>892,000</td><td>Total payments</td><td>728,000</td></tr>
      <tr><td></td><td></td><td><strong>Balance c/d</strong></td><td><strong>164,000</strong></td></tr>
      <tr class="table-total"><td><strong>Total</strong></td><td><strong>892,000</strong></td><td><strong>Total</strong></td><td><strong>892,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>The receipts side was bigger by ₦164,000 — the cash still in hand. Writing that difference on the <strong>smaller</strong> side forces both totals to agree, and the account is ruled off with double lines. The next morning, the same ₦164,000 reappears as balance b/d on the debit side of February's page.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>c/d goes on the smaller side to force agreement; it reappears as b/d on the opposite side of the new period. If your c/d and b/d ever differ, or land on the same side twice, the account has been closed incorrectly.</p>
</div>`,
      quiz:{q:'What is the purpose of a \'balance c/d\' entry?', opts:['To record a mistake in the accounts', 'To make both sides of an account total the same amount at period end', 'To show how much profit was made', 'To cancel out a transaction'], ans:1, exp:'Balance carried down (c/d) is inserted to make both sides of an account balance at the end of a period — it\'s then carried forward as next period\'s opening balance (balance b/d).'}
    },
    {id:14, term:'Balance Sheet', duration:'5 min', pips:2,
      definition:`A statement showing the assets, liabilities and capital of a business at one specific point in time — a financial snapshot, not a record of activity over a period.`,
      scenario:`When January's books were closed, Aunty Florence set a clean sheet of paper on the counter and said, "Now let us photograph your business." Amaka looked around for a camera. "Not that kind of photograph. A balance sheet — a picture of exactly where Amaka Phones stands on this one date, the 31st of January." Together they listed the assets on top: phones in stock, the cabinet, the laptop, cash, Tunde's debt, the prepaid rent. Below, the liabilities: the remaining balance owed to the cabinet supplier. And underneath it all, her capital. "This page says nothing about how hard you worked in January," Aunty Florence explained. "It does not show your sales or your hustle. It only shows where everything stands at this instant — like a photograph of a race shows where the runners are, not how fast they ran. Tomorrow, one sale changes it. That is why we always write the date on top. A balance sheet without a date is a photograph of nobody knows when." Amaka wrote the date in bold at the head of the page.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>A <strong>balance sheet</strong> shows the assets, liabilities and capital of a business at <strong>one specific date</strong>. It is a snapshot of position, not a record of activity. It does not show sales, expenses or effort — only where everything stands at that instant.</p>
  <p>That is why the date in the heading is not decoration. "Balance Sheet as at 31 January" is a photograph with a timestamp; without the date, it means nothing.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka Phones as at 31 January</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Balance Sheet as at 31 Jan</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Fixed assets (cabinet, laptop)</td><td>270,000</td></tr>
      <tr><td>Current assets (stock, debtor, prepaid rent, cash)</td><td>1,047,000</td></tr>
      <tr class="table-total"><td><strong>Total Assets</strong></td><td><strong>1,317,000</strong></td></tr>
      <tr><td>Less: Liabilities (cabinet supplier)</td><td>(150,000)</td></tr>
      <tr class="table-total"><td><strong>Capital</strong></td><td><strong>1,167,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>The accounting equation, standing to attention: Assets (1,317,000) = Capital (1,167,000) + Liabilities (150,000). One sale tomorrow morning changes the snapshot — which is exactly why it carries a date.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Balance sheet = <strong>position</strong> at a point in time. The trading and profit and loss account = <strong>performance</strong> over a period. The photograph and the film. Never confuse what each one can tell you.</p>
</div>`,
      quiz:{q:'What does a balance sheet show?', opts:['Sales made over the year', 'Assets, liabilities and capital at one specific date', 'Cash received and paid during the year', 'Profit earned over the year'], ans:1, exp:'A balance sheet is a snapshot at a single point in time, not a summary of activity across a period — that distinction is one of the most common beginner mix-ups in accounting.'}
    },
    {id:15, term:'Bookkeeping', duration:'5 min', pips:2,
      definition:`The part of accounting concerned with recording financial transactions in an organised way, traditionally in 'books' of accounts.`,
      scenario:`A customer once asked Amaka whether she was "doing accounting" in her big notebook. Amaka repeated the question to Aunty Florence that evening, unsure of the answer herself. "What you are doing every day — writing down each sale, each purchase, each payment, neatly and in order — that is bookkeeping," said Aunty Florence. "It is the recording layer. The discipline of capturing every transaction so nothing is lost." She tapped the notebook. "Accounting is the bigger house. Bookkeeping is its foundation. Accounting takes what you have recorded and classifies it, summarises it, presents it, interprets it — turns it into statements and decisions. But none of that is possible if the recording underneath is careless." She told Amaka about a trader down the street years ago who made good money but kept no books; when his supplier disputed a payment, he had no record and paid twice. "Bookkeeping looks humble," she said, "but it is the difference between a business that knows itself and one that only guesses."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Bookkeeping</strong> is the recording layer of accounting: capturing every transaction, in order, in an organised set of records. Accounting is the whole house — identifying, measuring, recording, classifying, summarising, presenting and interpreting. Bookkeeping is the foundation those upper floors stand on.</p>
  <p>The distinction matters because the qualities each demands are different. Bookkeeping demands <em>completeness and accuracy</em> — nothing missed, nothing wrong. Accounting adds <em>judgement</em> — what the recorded facts mean.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — One Transaction, Two Layers</h3>
  <p>On Tuesday Amaka sells a phone for ₦110,000 cash.</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Layer</th><th>What happens</th></tr></thead>
    <tbody>
      <tr><td>Bookkeeping</td><td>Debit Cash ₦110,000, Credit Sales ₦110,000 — dated, referenced, legible</td></tr>
      <tr><td>Accounting</td><td>At month end that entry joins hundreds of others to compute gross profit, feed the statements, and answer: was February a good month?</td></tr>
    </tbody>
  </table></div>
  <p>Remember Aunty Florence's story of the trader who paid a supplier twice because he had no record. His problem was not weak accounting judgement — it was that the bookkeeping layer simply did not exist, so there was nothing for judgement to stand on.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>No business can account better than it bookkeeps. Statements built on incomplete records are confident-looking fiction. Record first, faithfully — interpret second.</p>
</div>`,
      quiz:{q:'Which best describes bookkeeping?', opts:['Deciding whether to expand the business', 'Recording financial transactions in an organised way', 'Calculating how much tax is owed', 'Advising on whether to take out a loan'], ans:1, exp:'Bookkeeping is specifically about recording transactions in an organised way — interpreting those records to guide decisions is a broader accounting task built on top of bookkeeping.'}
    },
    {id:16, term:'Business Entity Concept', duration:'5 min', pips:2,
      definition:`The assumption that a business is treated as completely separate from its owner for accounting purposes. Only transactions affecting the business are recorded — the owner's personal affairs are not, except where they introduce capital or take drawings.`,
      scenario:`In the second month, Amaka's landlady at home came asking for her personal rent, and without thinking Amaka opened the shop till and counted out the money. She recorded it in her cash book as an expense of the business. When Aunty Florence reviewed the book that Friday, she stopped at the entry and shook her head. "Who paid rent — Amaka the woman, or Amaka Phones the business?" Amaka blinked. "Is there a difference? The business is me." "In law, perhaps. In accounting, never," said Aunty Florence firmly. "The business entity concept: the business is a separate person in the books. It has its own money, its own debts, its own records. Your home rent is not its expense. When you take its cash for yourself, that is drawings — a withdrawal by the owner, not a cost of trading. Mix the two and you will never know if this shop truly makes money, or if it is just your handbag with a signboard." Amaka corrected the entry, and from that day the till and her purse became two different countries.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>business entity concept</strong>: for accounting purposes, the business is a separate person from its owner. Its books record only <em>its</em> transactions. The owner appears in them at exactly two doors: putting resources in (capital) and taking resources out (drawings).</p>
  <p>Legally, a sole trader and her business may be one person. In the books, never.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Home Rent Correction</h3>
  <p>Amaka paid her personal home rent of ₦55,000 from the shop till and recorded it as a business expense. The correction:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>Drawings</td><td>55,000</td><td></td></tr>
      <tr><td>Rent expense (reversal)</td><td></td><td>55,000</td></tr>
      <tr><td colspan="3" style="font-size:0.8rem;color:var(--muted);font-style:italic;">Being: owner's personal rent wrongly recorded as business expense, now reclassified as drawings.</td></tr>
    </tbody>
  </table></div>
  <p>Why fight over ₦55,000? Because with it inside expenses, February's profit is understated by ₦55,000 — and every decision made from that profit figure (pricing, restocking, borrowing) inherits the lie. Entity discipline is what keeps profit meaning <em>the business's performance</em>, not the owner's lifestyle.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>The till and the purse are two different countries. Owner money in = capital. Owner money out = drawings. Everything else in the books must belong to the business alone.</p>
</div>`,
      quiz:{q:'Under the business entity concept, which of these would be recorded in the business\'s accounts?', opts:['The owner\'s personal school fees for her children', 'The owner investing ₦200,000 of her own money into the business', 'The owner\'s personal grocery shopping', 'The owner\'s personal car loan, unrelated to the business'], ans:1, exp:'The business entity concept keeps the owner\'s personal affairs separate from the business — except where money specifically moves between the two, such as capital introduced or drawings taken.'}
    },
    {id:17, term:'Capital', duration:'5 min', pips:2,
      definition:`The total value of resources that the owner has invested in and left in the business. It represents the owner's stake and increases with profit and new investment, and decreases with losses and drawings.`,
      scenario:`Three months in, Amaka's mother visited the shop for the first time. She looked at the full shelves and asked, half joking, "So how much of this is my money?" — she had lent Amaka ₦200,000 at the start. That night Amaka asked Aunty Florence how to even answer that. "Your mother's loan is a liability — the business owes it back. Capital is different. Capital is what YOU put in and left in: your savings that opened this shop, plus every naira of profit you have made and not withdrawn." She sketched it: opening capital ₦950,000, add the profits of three months, subtract the drawings Amaka had taken. "Capital is a living number. It grows when the business earns and you leave the earnings inside; it shrinks when you make losses or take money out. It is the truest measure of your stake — not what is on the shelves, but what would be yours if everything were settled today." Amaka worked out the new figure and smiled. Her stake had grown since that first Monday morning.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Capital</strong> is the owner's stake — the total resources the owner has invested in and left inside the business. It is a living figure: it grows with new investment and with profits retained, and shrinks with losses and drawings.</p>
  <div class="lesson-equation">Closing capital = Opening capital + Profit − Drawings (+ any new capital introduced)</div>
  <p>A loan — even from your mother — is never capital. It is a liability, because the business must pay it back regardless of how trading goes. Capital carries the risk; liabilities carry a repayment date.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Capital After Three Months</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Movement</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Opening capital (Day 1)</td><td>950,000</td></tr>
      <tr><td>Add: profits for Jan–Mar</td><td>287,000</td></tr>
      <tr><td>Less: drawings taken</td><td>(60,000)</td></tr>
      <tr class="table-total"><td><strong>Capital at end of March</strong></td><td><strong>1,177,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Her mother's ₦200,000 loan appears nowhere in this table — it sits among the liabilities, patiently waiting to be repaid. The ₦1,177,000 is what genuinely belongs to Amaka: the answer to "how much of this is yours?"</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Capital is not a pile of cash — it is a claim, the owner's residual claim on everything after liabilities. It changes only four ways: profit up, loss down, drawings down, new investment up.</p>
</div>`,
      quiz:{q:'An owner starts a business with ₦400,000 capital. The business makes ₦120,000 profit and the owner withdraws ₦30,000. What is the capital now?', opts:['₦400,000', '₦490,000', '₦550,000', '₦120,000'], ans:1, exp:'₦400,000 + ₦120,000 profit − ₦30,000 drawings = ₦490,000. Capital grows with profit and new investment, and shrinks with losses and drawings.'}
    },
    {id:18, term:'Capital Expenditure', duration:'5 min', pips:2,
      definition:`Money spent on acquiring or improving long-life assets that will be used in the business over multiple periods, such as buildings, machinery or vehicles.`,
      scenario:`Business was steady enough that Amaka decided to invest: a POS machine for card payments and proper wall shelving to display more stock. The same week she also bought airtime for the shop phone and fuel for the generator. When she sat to record it all, she nearly wrote everything in one place — money out is money out, she reasoned. Aunty Florence caught it in time. "Two very different kinds of spending are hiding in that list," she said. "The POS machine and the shelving will serve you for years — that is capital expenditure. You are not consuming that money; you are converting it into long-term assets. But the airtime and fuel? Used up within days. That is revenue expenditure — the running costs of the period." She drew a line down the page. "Confuse them and your accounts lie twice: expense the shelving and this month looks terribly poor; treat fuel as an asset and the business looks richer than it is. Ask of every payment: will its benefit outlive this period? That question sorts them every time."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Capital expenditure</strong> buys long-life assets that will serve the business across multiple periods — machinery, vehicles, shelving, buildings. <strong>Revenue expenditure</strong> pays the running costs consumed within the period — fuel, airtime, rent, wages.</p>
  <p>The sorting question: <em>will the benefit of this payment outlive the current period?</em> Yes → capital expenditure → asset on the balance sheet. No → revenue expenditure → expense in the profit and loss account.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Sorting One Week's Payments</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Payment</th><th>₦</th><th>Treatment</th></tr></thead>
    <tbody>
      <tr><td>POS machine</td><td>85,000</td><td>Capital — fixed asset</td></tr>
      <tr><td>Wall shelving</td><td>120,000</td><td>Capital — fixed asset</td></tr>
      <tr><td>Shop airtime</td><td>5,000</td><td>Revenue — expense</td></tr>
      <tr><td>Generator fuel</td><td>18,000</td><td>Revenue — expense</td></tr>
    </tbody>
  </table></div>
  <p>Get it wrong in either direction and the accounts lie twice. Expense the ₦120,000 shelving and this month's profit collapses unfairly while the balance sheet forgets an asset it owns. Capitalise the fuel and profit is flattered while the balance sheet carries an "asset" that burned away weeks ago.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>One question sorts every payment: <strong>does the benefit outlive the period?</strong> Long life → balance sheet. Used up → profit and loss. Repairs that merely maintain an asset are revenue; improvements that extend its life or capacity are capital.</p>
</div>`,
      quiz:{q:'Which of the following is an example of capital expenditure?', opts:['Buying petrol for a delivery motorcycle', 'Buying the delivery motorcycle itself', 'Paying for monthly electricity', 'Paying staff wages for the week'], ans:1, exp:'Buying the motorcycle is capital expenditure — it\'s a long-life asset that will be used over many future periods, unlike petrol, electricity or wages, which are used up immediately.'}
    },
    {id:19, term:'Carriage Inwards', duration:'5 min', pips:2,
      definition:`The cost of transporting goods purchased into the business. Because it forms part of the real cost of obtaining stock for resale, it is added to purchases when calculating the cost of goods sold.`,
      scenario:`Amaka's restock trips to Computer Village were becoming routine: choose the phones, pay the supplier, then pay a driver ₦8,000 to bring the cartons safely across Lagos to Ikeja. One evening, totalling her purchases for the month, she left the transport out — it felt like a side cost, not part of the goods. Aunty Florence disagreed the moment she saw it. "Could you sell those phones if they were still sitting in Computer Village?" she asked. "Of course not." "Then the ₦8,000 that brought them to your shelf is part of what those phones truly cost you. We call it carriage inwards — the transport cost of goods coming IN to the business — and it is added to your purchases when you calculate the cost of what you sold. A phone that cost ₦90,000 plus its share of delivery did not cost ₦90,000. Price your goods off the naked invoice and you will quietly eat the transport out of your own profit." Amaka added the ₦8,000 to purchases, and her margins told the truth again.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Carriage inwards</strong> is the cost of transporting purchased goods <em>into</em> the business. Because the goods cannot be sold from the supplier's warehouse, the cost of bringing them to your shelf is part of their true cost — so carriage inwards is <strong>added to purchases</strong> when computing the cost of goods sold.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The True Cost of a Consignment</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Item</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>10 phones from Computer Village (invoice)</td><td>900,000</td></tr>
      <tr><td>Carriage inwards (van across Lagos)</td><td>8,000</td></tr>
      <tr class="table-total"><td><strong>True cost of consignment</strong></td><td><strong>908,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Per phone, the real cost is ₦90,800 — not ₦90,000. On one consignment ₦800 per phone feels trivial; across a year of consignments it is a silent hole in the margin. If Amaka prices from the naked invoice, the transport is paid out of her own profit without her ever seeing it happen.</p>
  <p>In the trading account, carriage inwards sits with purchases inside the cost of goods sold — never among the general expenses below.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p><strong>Inwards = in with the cost of goods.</strong> The freight that brings stock to you is part of what the stock cost. Price and value your goods on the landed cost, not the ticket price.</p>
</div>`,
      quiz:{q:'Why is carriage inwards added to purchases rather than treated as a general expense?', opts:['Because it\'s a one-off cost', 'Because it forms part of the real cost of obtaining stock for resale', 'Because suppliers require it to be recorded that way', 'Because it relates to selling goods, not buying them'], ans:1, exp:'Carriage inwards is part of the genuine cost of getting stock into the business ready for resale, so it\'s added to purchases — distinct from carriage outwards, which relates to delivering goods to customers.'}
    },
    {id:20, term:'Carriage Outwards', duration:'5 min', pips:2,
      definition:`The cost of delivering goods sold out to customers. It is treated as a general expense in the profit and loss section of the financial statements, not as part of the cost of goods sold.`,
      scenario:`A customer in Surulere ordered two phones and asked for delivery. Amaka paid a dispatch rider ₦3,500 to take the package across the bridge. Remembering the carriage inwards lesson, she confidently added the ₦3,500 to her cost of goods — transport is transport, she thought. Aunty Florence smiled when she saw it. "Close — but look at the direction of travel. Carriage inwards brings goods TO you; it is part of getting stock ready for sale, so it joins the cost of goods. But this rider carried goods AWAY from you, to a customer, AFTER the sale was already made. That is carriage outwards — a selling and distribution expense. It belongs with your other operating expenses, down in the profit and loss section, not inside the cost of the goods." She tapped the page. "Same okada, opposite meaning. Inwards fattens the cost of your stock; outwards is simply a cost of serving your customer. The direction decides the treatment." Amaka moved the ₦3,500 down the page to where it belonged.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Carriage outwards</strong> is the cost of delivering sold goods <em>out</em> to customers. The sale has already happened; this cost is part of serving the customer, not part of obtaining the goods. It is therefore a <strong>selling and distribution expense</strong> in the profit and loss section — never part of the cost of goods sold.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Two Riders, Two Treatments</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Transport cost</th><th>Direction</th><th>Treatment</th></tr></thead>
    <tbody>
      <tr><td>₦8,000 van from Computer Village</td><td>Goods coming IN</td><td>Carriage inwards → added to purchases</td></tr>
      <tr><td>₦3,500 dispatch to Surulere customer</td><td>Goods going OUT</td><td>Carriage outwards → expense in P&amp;L</td></tr>
    </tbody>
  </table></div>
  <p>Why does the split matter? Gross profit is meant to measure the pure trading margin — sales against what the goods cost to obtain and make ready. Delivery to a customer happens <em>after</em> that margin is earned. Push carriage outwards into cost of goods sold and your gross margin looks weaker than your trading really is; the diagnosis of any problem then starts in the wrong place.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Same okada, opposite meaning: <strong>inwards fattens the cost of goods; outwards is an operating expense.</strong> Follow the direction of the goods, and the treatment follows automatically.</p>
</div>`,
      quiz:{q:'How is carriage outwards treated in the financial statements?', opts:['Added to purchases, like carriage inwards', 'Treated as a general expense in the profit and loss section', 'Deducted from sales revenue directly', 'Ignored, since it\'s the customer\'s responsibility'], ans:1, exp:'Unlike carriage inwards, carriage outwards relates to delivering goods already sold — it\'s a selling expense in the profit and loss section, not part of the cost of goods sold.'}
    },
    {id:21, term:'Cost of Goods Sold', duration:'5 min', pips:2,
      definition:`The cost of the stock that was actually sold during a period, calculated as opening stock plus purchases (adjusted for carriage inwards and returns) minus closing stock.`,
      scenario:`At the end of February, Amaka wanted to know what the goods she had actually sold that month had cost her. Her first instinct was simple: just use the month's purchases. Aunty Florence pulled up a stool. "Purchases alone will deceive you. Think — you started February with goods already on the shelf, and you ended it with goods still unsold. The formula respects both." She wrote it out: Opening stock, plus purchases, minus closing stock. They filled in the numbers together: ₦640,000 of stock at the start, ₦900,000 bought during the month (carriage inwards included), ₦710,000 still on the shelves at the count. "So the goods that actually left this shop in February cost you ₦830,000. Not what you bought — what you SOLD. Stock you still hold is not a cost yet; it is an asset waiting its turn." Amaka checked the arithmetic twice. Matched against her sales, the figure told her — for the first time precisely — what February's trading had really earned.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Cost of goods sold (COGS)</strong> is the cost of the stock that actually left the business through sales during the period — not what was bought, and not what remains.</p>
  <div class="lesson-equation">COGS = Opening stock + Purchases (incl. carriage inwards, less returns outwards) − Closing stock</div>
  <p>The logic: everything available for sale either sold or is still on the shelf. Subtract what remains from what was available, and what sold is revealed.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's February COGS</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Component</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Opening stock (1 Feb)</td><td>640,000</td></tr>
      <tr><td>Add: Purchases (carriage inwards included)</td><td>900,000</td></tr>
      <tr><td>Goods available for sale</td><td>1,540,000</td></tr>
      <tr><td>Less: Closing stock (28 Feb count)</td><td>(710,000)</td></tr>
      <tr class="table-total"><td><strong>Cost of goods sold</strong></td><td><strong>830,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Set against February's sales, this ₦830,000 is the figure that reveals the month's true gross profit. Notice how the stock counts guard both ends: a wrong opening or closing count flows straight into a wrong profit.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Purchases measures what you <em>bought</em>; COGS measures what you <em>sold</em>. Stock still on the shelf is not a cost yet — it is an asset waiting its turn. The formula, once memorised, never leaves you.</p>
</div>`,
      quiz:{q:'Opening stock is ₦60,000, purchases during the period are ₦250,000, and closing stock is ₦40,000. What is the cost of goods sold?', opts:['₦310,000', '₦270,000', '₦230,000', '₦350,000'], ans:1, exp:'Cost of goods sold = Opening stock + Purchases − Closing stock = ₦60,000 + ₦250,000 − ₦40,000 = ₦270,000.'}
    },
    {id:22, term:'Credit', duration:'5 min', pips:2,
      definition:`The right-hand side of an account in the double entry system. Credits increase liabilities, capital and revenue, and decrease assets and expenses.`,
      scenario:`Chidi, Amaka's young cousin, had started helping in the shop on weekends, and the debits and credits confused him endlessly. "Why is money coming in a debit? Credit sounds like the good one," he complained, after recording a sale backwards for the second time. Aunty Florence overheard and came to his rescue. "Forget good and bad. Credit simply means the right-hand side of an account. That is all it is — an address, not a judgement." She listed what lives comfortably on that side: "Credits increase liabilities, capital and income — and they decrease assets and expenses. When Amaka makes a sale, the Sales account is credited because income is growing. When she pays cash out, Cash is credited because that asset is shrinking." She had Chidi say it back until it stuck. "Every entry in this book has an address: left or right, debit or credit. Learn the addresses and the whole system opens up. Guess at them and every page becomes a fight." Chidi corrected his entry — right side, this time on purpose.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Credit</strong> is the right-hand side of an account. Nothing more mystical than an address. Credits <strong>increase</strong> liabilities, capital and income — and <strong>decrease</strong> assets and expenses.</p>
  <p>The confusion Chidi felt is universal: in everyday speech "credit" sounds like a gift. In the books it is simply a direction. The bank's habit of saying your account is "credited" when money arrives comes from <em>their</em> books, where your deposit is <em>their</em> liability — credited, correctly, on their right-hand side.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Where Credits Land</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Transaction</th><th>What is credited</th><th>Why</th></tr></thead>
    <tbody>
      <tr><td>Cash sale ₦30,000</td><td>Sales</td><td>Income increasing</td></tr>
      <tr><td>Pay rent ₦45,000 cash</td><td>Cash</td><td>Asset decreasing</td></tr>
      <tr><td>Buy stock on credit from Big Sam</td><td>Big Sam (creditor)</td><td>Liability increasing</td></tr>
      <tr><td>Owner introduces ₦100,000</td><td>Capital</td><td>Capital increasing</td></tr>
    </tbody>
  </table></div>
  <p>Read the pattern: whenever value flows <em>out of</em> an account, or an obligation or earning grows, the credit side records it.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Credit = right side. Up for liabilities, capital and income; down for assets and expenses. Learn it as an address, not a judgement, and half of bookkeeping's fog lifts immediately.</p>
</div>`,
      quiz:{q:'Which of these does a credit entry typically increase?', opts:['Assets', 'Expenses', 'Revenue', 'Drawings'], ans:2, exp:'Credits increase liabilities, capital and revenue. Assets, expenses and drawings are increased by debits, not credits.'}
    },
    {id:23, term:'Creditor', duration:'5 min', pips:2,
      definition:`A person or business to whom money is owed, usually because goods or services have been supplied on credit and not yet paid for.`,
      scenario:`Sixty days had passed quickly, and one morning Mrs. Adeyemi, the furniture supplier, appeared at the shop door with her invoice book: the display cabinet's ₦150,000 was due. Amaka paid — she had planned for it — but afterwards asked Aunty Florence what exactly Mrs. Adeyemi had been to the business all this time. "A creditor," said Aunty Florence. "Someone the business owes. From the day she delivered that cabinet on credit until the moment you paid, she held a claim against Amaka Phones. Her name sat in your books as a liability." She sipped her tea. "Understand this relationship well, because credit is the bloodstream of trade on this street. Your suppliers become your creditors when they trust you with goods before money; you become a creditor to anyone you supply on trust. The books must always know exactly who is owed what, and when it falls due — because a forgotten creditor arriving on a bad cash day can wound a healthy business." Amaka ruled off Mrs. Adeyemi's account with a small feeling of ceremony: paid in full, on time.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>A <strong>creditor</strong> is a person or business the business owes — usually a supplier who delivered goods or services on credit. From delivery until payment, the creditor holds a claim against the business, recorded as a liability.</p>
  <p>Each creditor gets their own account, tracking what was supplied, what has been paid, and the balance outstanding — with the due date never far from view.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Mrs. Adeyemi's Account, Full Life Cycle</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Date</th><th>Details</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>Day 1</td><td>Display cabinet supplied (60-day terms)</td><td></td><td>150,000</td></tr>
      <tr><td>Day 60</td><td>Cash paid in full</td><td>150,000</td><td></td></tr>
      <tr class="table-total"><td></td><td><strong>Balance</strong></td><td colspan="2" style="text-align:center;"><strong>nil — account settled</strong></td></tr>
    </tbody>
  </table></div>
  <p>For sixty days that ₦150,000 credit balance sat on Amaka's balance sheet as a current liability. The debit on payment day closed it. A business that keeps accounts like this always knows, at a glance, exactly who is owed what and when — and is never ambushed by a supplier at the door on a thin cash day.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Creditor = someone the business owes; the mirror of a debtor. Credit balances in supplier accounts are liabilities with dates attached — track the date as carefully as the amount.</p>
</div>`,
      quiz:{q:'What is a creditor?', opts:['Someone who owes the business money', 'Someone the business owes money to', 'An asset of the business', 'A type of expense'], ans:1, exp:'A creditor is someone the business owes money to — the opposite of a debtor, who owes money to the business.'}
    },
    {id:24, term:'Current Assets', duration:'5 min', pips:2,
      definition:`Assets that are cash, or are expected to be turned into cash or used up within twelve months, such as stock, debtors, cash at bank and cash in hand. Listed in order of increasing liquidity.`,
      scenario:`Preparing her February balance sheet, Amaka listed her short-lived possessions in whatever order they came to mind: cash, then stock, then Tunde's debt, then the bank balance. Aunty Florence rearranged them with a pencil. "These are your current assets — things that are cash already, or will become cash within the year: your stock, your debtors, your bank balance, your cash in hand. But we list them in a particular order: least liquid first, most liquid last. Stock, then debtors, then bank, then cash." Amaka asked why the ceremony. "Because the order tells a story of distance from cash. Stock must first be sold to become a debt owed to you; the debtor must then pay before it becomes money. Anyone reading your balance sheet sees at a glance how quickly your short-term wealth can turn into spendable cash. A business can look rich in current assets and still be unable to pay tomorrow's bill if everything is trapped in slow-moving stock." Amaka rewrote the list in marching order, stock at the top, cash bringing up the rear.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Current assets</strong> are cash, or assets expected to become cash or be used up within twelve months: stock, debtors, bank, cash in hand, prepayments. On the balance sheet they are listed in order of <strong>increasing liquidity</strong> — furthest from cash first, cash itself last.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's List, In Marching Order</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Current asset</th><th>₦</th><th>Distance from cash</th></tr></thead>
    <tbody>
      <tr><td>Stock</td><td>710,000</td><td>Must be sold, then collected</td></tr>
      <tr><td>Debtors (incl. Tunde)</td><td>95,000</td><td>Must be collected</td></tr>
      <tr><td>Prepaid rent</td><td>50,000</td><td>Consumed, not converted</td></tr>
      <tr><td>Bank</td><td>210,000</td><td>Withdrawal away</td></tr>
      <tr><td>Cash in hand</td><td>38,000</td><td>Already cash</td></tr>
      <tr class="table-total"><td><strong>Total current assets</strong></td><td><strong>1,103,000</strong></td><td></td></tr>
    </tbody>
  </table></div>
  <p>The order is information. A reader sees instantly how much of the short-term wealth is spendable now versus trapped in stock that must first find a buyer. Two businesses with identical totals can have very different survival prospects depending on where in this ladder their money sits.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Current = within twelve months. List least liquid first. And remember the pairing rule from the street: current assets are only meaningful when read against the current liabilities marching toward them.</p>
</div>`,
      quiz:{q:'Which of the following is a current asset?', opts:['A delivery motorcycle expected to last 5 years', 'Stock held for resale', 'The kiosk building itself', 'A 10-year business loan'], ans:1, exp:'Stock held for resale is a current asset — expected to be sold and turned into cash within the next twelve months, unlike long-term assets such as a motorcycle or building.'}
    },
    {id:25, term:'Current Liabilities', duration:'5 min', pips:2,
      definition:`Amounts owed by a business that must be paid within twelve months of the balance sheet date, such as creditors for goods and short-term loans or overdrafts.`,
      scenario:`Alongside the assets, Amaka listed what the business owed: a new balance with Big Sam Distributions for phones taken on 30-day credit, and a small amount outstanding on the POS machine. Aunty Florence looked over the list. "All of these fall due within the year — that makes them current liabilities. The near-term claims on your cash." She set the list beside the current assets from the same balance sheet. "These two lists must always be read together. Your current liabilities are the bills marching toward you; your current assets are the resources you have to meet them. If what you owe soon is larger than what you can turn to cash soon, even a profitable shop can suffocate — profit on paper does not pay a supplier standing at the door." She told Amaka about a thriving boutique that died exactly that way, rich in stock and drowning in due bills. "Watch this pairing every month. It is the pulse of your survival." Amaka circled both totals and, from then on, checked them against each other before anything else.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Current liabilities</strong> are amounts the business must pay within twelve months of the balance sheet date: trade creditors, short-term loans, overdrafts, accrued expenses. They are the near-term claims on the business's cash.</p>
  <p>Their significance is relational: they must always be read against the current assets available to meet them. That comparison — not profit — is what decides whether the next few months are comfortable or desperate.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Pairing That Predicts Survival</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Current liabilities</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Big Sam Distributions (30-day account)</td><td>320,000</td></tr>
      <tr><td>POS machine balance due this year</td><td>45,000</td></tr>
      <tr class="table-total"><td><strong>Total current liabilities</strong></td><td><strong>365,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Against current assets of ₦1,103,000, Amaka's near-term claims are comfortably covered roughly three times over. Aunty Florence's boutique story shows the failure mode: plenty of stock (current asset), bills due now (current liabilities), and no bridge between them — profitable on paper, dead at the door.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Every liability has a date. Within twelve months = current. Check the pairing monthly: what marches toward you soon versus what you can turn to cash soon. Profit is the verdict on the past; this pairing is the forecast of the next ninety days.</p>
</div>`,
      quiz:{q:'Which of these is a current liability?', opts:['A loan to be repaid over 10 years', 'An amount owed to a supplier, due next month', 'The owner\'s capital', 'A delivery van owned by the business'], ans:1, exp:'An amount owed to a supplier due within the next twelve months is a current liability. A 10-year loan is a long-term liability, not a current one.'}
    },
    {id:26, term:'Debit', duration:'5 min', pips:2,
      definition:`The left-hand side of an account in the double entry system. Debits increase assets and expenses, and decrease liabilities, capital and revenue.`,
      scenario:`Chidi had finally made peace with credits when debits ambushed him from the other side. He recorded a purchase of stock as a credit to the Stock account and stared at it, sensing something wrong but unsure what. Aunty Florence took the pen. "Debit is the left-hand side of an account — the mirror twin of credit. Debits increase assets and expenses, and decrease liabilities, capital and income." She pointed at the entry. "Stock is an asset, and it grew today. Growth for an asset means the left side — a debit." She showed him the mnemonic she had used for forty years, drawing the two-column T shape in the air. "Left hand: what the business receives, what grows in its possession, what it spends. Right hand: what it gives, what it owes, what it earns. Every transaction touches both hands at once — one debit, one credit, always equal. Master which hand is which and you can record anything that ever happens on this street." Chidi rewrote the entry on the left, where it had belonged all along.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Debit</strong> is the left-hand side of an account — the mirror twin of credit. Debits <strong>increase</strong> assets and expenses, and <strong>decrease</strong> liabilities, capital and income.</p>
  <p>Together the two sides form the complete grammar of bookkeeping: every transaction speaks once on the left and once on the right, in equal amounts.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Where Debits Land</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Transaction</th><th>What is debited</th><th>Why</th></tr></thead>
    <tbody>
      <tr><td>Buy stock ₦50,000 cash</td><td>Stock (Purchases)</td><td>Asset/expense increasing</td></tr>
      <tr><td>Cash sale ₦30,000</td><td>Cash</td><td>Asset increasing</td></tr>
      <tr><td>Pay Big Sam ₦100,000</td><td>Big Sam (creditor)</td><td>Liability decreasing</td></tr>
      <tr><td>Pay electricity ₦12,000</td><td>Electricity expense</td><td>Expense increasing</td></tr>
    </tbody>
  </table></div>
  <p>Chidi's error — crediting Stock when it grew — reads instantly against this table. Stock is an asset; growth for an asset is a left-hand event. Aunty Florence's forty-year mnemonic: the left hand records what the business <em>receives and spends</em>; the right hand records what it <em>gives, owes and earns</em>.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Debit = left. Up for assets and expenses; down for liabilities, capital and income. Every entry has an address — learn the addresses and you can record anything that ever happens on the street.</p>
</div>`,
      quiz:{q:'What effect does a debit entry have on an expense account?', opts:['Decreases it', 'Increases it', 'Has no effect', 'Converts it into a liability'], ans:1, exp:'Debits increase expense accounts, along with assets, and decrease liabilities, capital and revenue.'}
    },
    {id:27, term:'Debtor', duration:'5 min', pips:2,
      definition:`A person or business that owes money to the business, usually because they have bought goods or services on credit and not yet paid for them.`,
      scenario:`Tunde came back in March — this time for a phone for his sister, and once again short of the full amount. "You know I am good for it," he grinned. Amaka did know; he had cleared his last balance to the naira. She released the phone and opened a fresh page in her ledger with his name at the top. That evening Aunty Florence nodded at the page approvingly. "Tunde is now your debtor again — someone who owes the business money. His ₦60,000 balance is your asset: not cash yet, but a legal claim to cash." Then her voice turned serious. "But hear me: a debtor is only as good as his willingness and ability to pay. Keep every debtor's account ruled and current — what was taken, what was paid, what remains. Chase gently but chase early. A debt left sleeping too long has a way of dying quietly." She tapped Tunde's page. "Trust built his account. Records will keep it honest — for both of you." Amaka dated the entry and set a reminder for thirty days.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>A <strong>debtor</strong> is a person or business that owes the business money — usually a customer who bought on credit. A debtor's balance is an <strong>asset</strong>: not cash yet, but a claim to cash.</p>
  <p>Each debtor gets a personal account showing goods taken, payments made, and the balance outstanding. The quality of a debtor book is measured in two things: accuracy and age.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Tunde's Account in March</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Date</th><th>Details</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>3 Mar</td><td>Phone for his sister (on account)</td><td>60,000</td><td></td></tr>
      <tr><td>18 Mar</td><td>Cash received</td><td></td><td>35,000</td></tr>
      <tr class="table-total"><td></td><td><strong>Balance owing</strong></td><td colspan="2" style="text-align:center;"><strong>25,000 Dr</strong></td></tr>
    </tbody>
  </table></div>
  <p>The debit balance of ₦25,000 sits among Amaka's current assets. Aunty Florence's warning belongs in the concept itself: a debtor is only as good as his willingness and ability to pay. Rule the account current, chase gently but early, and diarise the follow-up — because a debt left sleeping too long has a way of dying quietly. (What happens when one dies is a later lesson: bad debts.)</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Debtor = owes the business = asset. Mirror of a creditor. Trust builds the account; records keep it honest — for both sides.</p>
</div>`,
      quiz:{q:'What is a debtor?', opts:['Someone the business owes money to', 'Someone who owes the business money', 'A type of liability', 'An item of stock'], ans:1, exp:'A debtor owes money to the business — the opposite of a creditor, to whom the business owes money.'}
    },
    {id:28, term:'Double Entry Bookkeeping', duration:'5 min', pips:2,
      definition:`The system of recording every transaction twice — once as a debit in one account and once as an equal credit in another account — so that the accounting equation always remains in balance.`,
      scenario:`One busy Saturday, the books refused to balance by exactly ₦25,000, and Amaka and Chidi hunted the error for an hour. They found it: Chidi had recorded a ₦25,000 accessory sale by increasing Cash — and stopped there, forgetting to credit Sales. Half a transaction. Aunty Florence used the moment for the deepest lesson yet. "This is why double entry exists. Every transaction, without exception, is recorded twice — a debit in one account, an equal credit in another. Not because accountants love work, but because every real event has two faces: something is received, something is given. Cash came in; a sale was made. Record only one face and the books tear at the seam — exactly where yours tore today." She had Chidi complete the missing credit and watched the totals click back into agreement. "The beauty of the system is that it polices itself. Errors like this cannot hide; the imbalance shouts. A single-entry book stays silent while it lies to you." The ₦25,000 gap closed, and Chidi never forgot a second entry again.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Double entry bookkeeping</strong>: every transaction is recorded twice — a debit in one account and an equal credit in another — so total debits always equal total credits, and the accounting equation never breaks.</p>
  <p>This is not administrative ritual. Every real event has two faces — something received, something given — and the system simply refuses to record one face without the other.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The ₦25,000 That Would Not Hide</h3>
  <p>Chidi recorded an accessory sale like this:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>Cash</td><td>25,000</td><td></td></tr>
      <tr><td style="color:var(--muted);font-style:italic;">Sales — forgotten</td><td></td><td style="color:var(--muted);font-style:italic;">missing</td></tr>
    </tbody>
  </table></div>
  <p>Half a transaction. The books tore at exactly that seam: total debits exceeded total credits by ₦25,000, and the imbalance shouted until it was found. The completed entry — Credit Sales ₦25,000 — clicked the totals back into agreement.</p>
  <p>That is the system's quiet genius: it polices itself. A single-entry notebook stays silent while it lies; double entry makes most errors announce themselves as imbalance.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Every transaction, two entries, equal and opposite — no exceptions, ever. If your books do not balance, a face of some transaction is missing or doubled. The imbalance is not the problem; it is the alarm.</p>
</div>`,
      quiz:{q:'Why does double entry bookkeeping require every transaction to be recorded twice?', opts:['To make bookkeeping take longer', 'So that the accounting equation always remains in balance', 'Because tax authorities require duplicate records', 'To allow two different people to record the same transaction'], ans:1, exp:'Recording both a debit and an equal credit for every transaction is what keeps the accounting equation in balance at all times — this is the core mechanism of double entry.'}
    },
    {id:29, term:'Drawings', duration:'5 min', pips:2,
      definition:`Cash or goods withdrawn from the business by its owner for personal use. Drawings reduce capital but are never treated as a business expense, and are recorded in a separate drawings account.`,
      scenario:`In April, Amaka's younger sister got engaged, and Amaka took ₦40,000 from the business bank account toward the celebration. Out of habit she began writing it among the shop's expenses, next to rent and fuel. Aunty Florence stopped her pen mid-word. "Did the business buy anything with that money? Stock? Services? Anything that helps it trade?" Amaka shook her head. "Then it is not an expense. It is drawings — the owner drawing value out of her own business for personal use. It reduces your capital, not your profit." She showed Amaka the proper home for it: a Drawings account, gathering every personal withdrawal through the year, closed off against capital at the end. "This distinction protects you from a sweet self-deception. Expenses measure the true cost of running the shop. Drawings measure how much of the shop's substance you consumed yourself. Mix them and your profit looks worse than reality — and one day you will make a bad decision based on a number you polluted." The wedding was beautiful; the books stayed honest.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Drawings</strong> are cash or goods the owner withdraws from the business for personal use. They are <strong>never an expense</strong> — the business received nothing for them. They are the owner reclaiming part of her own stake, so they reduce <strong>capital</strong>, not profit.</p>
  <p>Drawings of goods count too: if Amaka takes a phone from stock for her own use, that is drawings at cost, not a sale and not an expense.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Wedding Withdrawal</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>Drawings</td><td>40,000</td><td></td></tr>
      <tr><td>Bank</td><td></td><td>40,000</td></tr>
      <tr><td colspan="3" style="font-size:0.8rem;color:var(--muted);font-style:italic;">Being: cash withdrawn by owner for personal use (family engagement).</td></tr>
    </tbody>
  </table></div>
  <p>Through the year, the Drawings account quietly gathers every such withdrawal. At year end its total is transferred against capital — <em>not</em> against profit. The distinction protects the profit figure: expenses measure what the business consumed to trade; drawings measure what the owner consumed personally. Mix them and profit understates, and every decision built on it inherits the error.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Owner takes value out = drawings = capital down. Never an expense, never in the profit and loss account. The till and the purse remain two countries — drawings is the official border crossing.</p>
</div>`,
      quiz:{q:'How do drawings affect a business\'s reported profit for the year?', opts:['They reduce profit, the same as an expense', 'They have no effect on profit — they reduce capital instead', 'They increase profit', 'They are added to revenue'], ans:1, exp:'Drawings are never treated as an expense, so they don\'t reduce profit. They reduce the owner\'s capital directly, recorded in a separate drawings account.'}
    },
    {id:30, term:'Dual Aspect Concept', duration:'5 min', pips:2,
      definition:`The principle that every transaction has two effects on the accounting records, which must balance against each other. This is the foundation that double entry bookkeeping is built upon.`,
      scenario:`One quiet afternoon Amaka reviewed the POS machine purchase and noticed something elegant she had never articulated: the day she bought it, her bank balance fell by exactly the amount her equipment rose. Every transaction she flipped back through had this same double life — stock up, cash down; sales up, debtor up; loan received, cash up, liability up. She mentioned it to Aunty Florence like a discovery. The older woman beamed. "You have found the dual aspect concept — the deep truth under everything I have taught you. Every transaction has two effects, always equal, always opposite in the balance they preserve. It is not a rule accountants invented; it is how economic reality behaves. You cannot receive without giving; nothing enters a business without a source." She turned the cash book toward Amaka. "Double entry bookkeeping is simply this truth written down — the debit records one aspect, the credit the other. The equation stays balanced because reality itself is balanced." Amaka looked at her books differently after that: not rules to obey, but reality, faithfully mirrored.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>dual aspect concept</strong> is the deep principle beneath double entry: every transaction has <strong>two effects</strong> on the business, and they always balance. Nothing enters without a source; nothing leaves without a destination. Double entry bookkeeping is simply this truth written down — the debit records one aspect, the credit the other.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Four Transactions, Eight Aspects</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Transaction</th><th>Aspect 1</th><th>Aspect 2</th></tr></thead>
    <tbody>
      <tr><td>POS machine bought ₦85,000</td><td>Equipment up</td><td>Bank down</td></tr>
      <tr><td>Stock bought on credit ₦320,000</td><td>Stock up</td><td>Creditor up</td></tr>
      <tr><td>Credit sale to Tunde ₦60,000</td><td>Debtor up</td><td>Sales up</td></tr>
      <tr><td>Loan received ₦250,000</td><td>Bank up</td><td>Liability up</td></tr>
    </tbody>
  </table></div>
  <p>Test each row against the accounting equation and it holds every time — assets and claims move together, or two assets trade places, but both sides of the equation stay equal. This is why the equation can never break in properly kept books: it is not a rule imposed on reality; it is how economic reality behaves.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Two effects, always equal, always preserving the balance. When you cannot find a transaction's second aspect, you have not finished understanding the transaction.</p>
</div>`,
      quiz:{q:'What does the dual aspect concept state?', opts:['Every transaction has only one effect on the accounts', 'Every transaction has two effects on the accounting records that must balance', 'Only large transactions need to be recorded twice', 'Assets and liabilities are recorded separately, with no connection'], ans:1, exp:'The dual aspect concept holds that every transaction affects the accounts in two balancing ways — this is the underlying principle that double entry bookkeeping is built on.'}
    },
    {id:31, term:'Equity', duration:'5 min', pips:2,
      definition:`Another term for the owner's capital — the value of the owner's stake in the business after liabilities have been accounted for.`,
      scenario:`Half a year in, Amaka sat with her books one Sunday and tried to answer a simple question with a precise number: if I settled every debt today and packed everything up — what is truly mine? She listed the assets at their book values, subtracted everything owed to Big Sam, the POS company, and the remains of her mother's loan. The figure left standing was hers alone. When she showed Aunty Florence, the older woman nodded. "That is your equity — just another name for the owner's capital. What remains for the owner after every outside claim is satisfied." She traced the accounting equation with her finger. "Assets minus liabilities equals equity. Same equation, third angle. Bankers say equity, your textbook says capital, the street says 'your own inside the business' — one idea, three costumes." Amaka compared the number to her opening ₦950,000 and felt the months of work take physical shape: her stake had grown, quietly, entry by entry, and now she could prove it to the naira.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Equity</strong> is simply another name for the owner's capital — the residual claim on the business after all liabilities are satisfied.</p>
  <div class="lesson-equation">Equity = Assets − Liabilities</div>
  <p>Bankers and modern statements say <em>equity</em>; older textbooks say <em>capital</em>; the street says "your own inside the business." One idea, three costumes.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Half-Year Reckoning</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>As at 30 June</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Total assets (fixed + current)</td><td>1,978,000</td></tr>
      <tr><td>Less: Big Sam (creditor)</td><td>(320,000)</td></tr>
      <tr><td>Less: Mother's loan (balance)</td><td>(120,000)</td></tr>
      <tr><td>Less: POS balance due</td><td>(45,000)</td></tr>
      <tr class="table-total"><td><strong>Equity</strong></td><td><strong>1,493,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>From ₦950,000 on opening day to ₦1,493,000 at half-year — the growth is precisely the retained profits less drawings, entry by entry. Equity is the single number that answers "if everything were settled today, what is truly mine?" — and because it is computed from verified assets and liabilities, it is provable to the naira.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Equity, capital, owner's stake — one concept. It is a residual: whatever remains after outside claims. Watch its trend across periods; a business whose equity grows steadily is compounding its owner's wealth.</p>
</div>`,
      quiz:{q:'A business has ₦5,000,000 assets and ₦2,200,000 liabilities. What is its equity?', opts:['₦2,200,000', '₦2,800,000', '₦7,200,000', '₦5,000,000'], ans:1, exp:'Equity = Assets − Liabilities = ₦5,000,000 − ₦2,200,000 = ₦2,800,000. Equity and capital are the same figure, just different names for it.'}
    },
    {id:32, term:'Expenses', duration:'5 min', pips:2,
      definition:`The value of assets and services used up by a business in the course of earning its revenue, such as rent, wages, lighting and insurance.`,
      scenario:`July brought a brutal NEPA bill, two generator refills, the shop rent falling due, and Chidi's small weekend wage. Amaka recorded each one and watched the expenses column swell with mild alarm. "Is everything I pay for just... an expense?" she asked Aunty Florence. "No — and the difference matters. Expenses are the value of things used up in earning your revenue. The electricity is consumed. The fuel burns. The rent buys you July's shelter, then it is gone. Chidi's effort serves July's customers." She contrasted it with the shelving bought months before: "That still stands and still serves — an asset. Expenses die in the period that uses them; assets live on." Then she added the sentence Amaka would repeat for years: "Do not resent your expenses. They are not losses — they are the price of the revenue standing beside them. A shop with zero expenses is a shop with zero customers. Your job is not to eliminate them, but to make sure each one earns its keep."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Expenses</strong> are the value of assets and services <strong>used up</strong> in earning the period's revenue: rent, wages, electricity, fuel, insurance, bank charges. They die in the period that consumes them — unlike assets, which live on to serve future periods.</p>
  <p>Aunty Florence's reframe is the important one: expenses are not losses. They are the price of the revenue standing beside them.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — July's Expense Ledger</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Expense</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Shop rent (July portion)</td><td>50,000</td></tr>
      <tr><td>Electricity (NEPA)</td><td>34,000</td></tr>
      <tr><td>Generator fuel (two refills)</td><td>41,000</td></tr>
      <tr><td>Chidi's weekend wages</td><td>24,000</td></tr>
      <tr class="table-total"><td><strong>Total July expenses</strong></td><td><strong>149,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Each item bought something July consumed: shelter, light, power, effort. Contrast the shelving bought months earlier — still standing, still serving — which is why it sits on the balance sheet instead. The working test remains: <em>used up this period → expense; benefit lives on → asset.</em></p>
  <p>The management question is never "how do I get expenses to zero?" — a shop with zero expenses has zero customers. It is: does each expense earn its keep?</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Expenses = value consumed in earning revenue, matched to the period that used them. Respect them, itemise them, question them — but never confuse them with drawings, assets, or losses.</p>
</div>`,
      quiz:{q:'Which of the following is an example of a business expense?', opts:['Buying a new delivery motorcycle', 'Monthly shop rent', 'The owner withdrawing cash for personal use', 'Stock still unsold at year end'], ans:1, exp:'Monthly rent is a cost used up in earning revenue during the period — a textbook expense. The motorcycle is capital expenditure, drawings aren\'t a business expense, and unsold stock is an asset.'}
    },
    {id:33, term:'Final Accounts', duration:'5 min', pips:2,
      definition:`An older term for the financial statements produced at the end of an accounting period, including the trading and profit and loss account and the balance sheet. The more modern term is 'financial statements'.`,
      scenario:`One rainy afternoon with the shop quiet, Aunty Florence brought over a leather-bound ledger from her own early years — 1998 inked on the spine. Amaka turned the heavy pages: neat columns, a trading account, a profit and loss account, a balance sheet, all hand-ruled. At the top of the year-end section, in careful capitals: FINAL ACCOUNTS. "That is what we called them," said Aunty Florence. "The final accounts — the statements drawn up when the year's bookkeeping was finished. The name simply meant the end product of all the recording." She tapped the modern printout on Amaka's counter. "Today the world says financial statements — same documents, newer clothes. But you will still meet the old term in textbooks, in exams, and from every accountant of my generation, so know them as twins." Amaka photographed a page of the 1998 ledger for inspiration. Different decade, different ink — but the same equation balancing at the bottom, faithful as ever.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Final accounts</strong> is the traditional name for the statements drawn up when a period's bookkeeping is complete — principally the trading and profit and loss account and the balance sheet. The modern term is <strong>financial statements</strong>. Same documents, newer clothes.</p>
  <p>You will meet the old term constantly — in textbooks, in exam papers, and from every accountant of Aunty Florence's generation — so know the names as twins.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — 1998 and Today, Side by Side</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Aunty Florence's 1998 ledger</th><th>Amaka's statements today</th></tr></thead>
    <tbody>
      <tr><td>FINAL ACCOUNTS (hand-ruled)</td><td>Financial Statements (printed)</td></tr>
      <tr><td>Trading account</td><td>Trading account</td></tr>
      <tr><td>Profit and loss account</td><td>Profit and loss account</td></tr>
      <tr><td>Balance sheet</td><td>Balance sheet (statement of financial position)</td></tr>
    </tbody>
  </table></div>
  <p>Notice what did not change in twenty-five years: the structure, the double entry beneath it, and the equation balancing at the bottom of the last page. Terminology evolves — "statement of financial position" is gradually replacing "balance sheet" too — but the logic is generational bedrock. Learn the concepts and every era's vocabulary is just labels.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Final accounts = financial statements = the finished product of a period's bookkeeping. When an exam or an elder says "prepare the final accounts," they mean the trading and profit and loss account and the balance sheet.</p>
</div>`,
      quiz:{q:'What does the older term \'final accounts\' refer to?', opts:['Only the balance sheet', 'Only the cash book', 'The trading and profit and loss account and the balance sheet', 'A list of all customers who owe money'], ans:2, exp:'\'Final accounts\' is an older name for what\'s now usually called financial statements — principally the trading and profit and loss account and the balance sheet.'}
    },
    {id:34, term:'Financial Statements', duration:'5 min', pips:2,
      definition:`The set of formal reports produced at the end of an accounting period summarising a business's performance and position, principally the trading and profit and loss account and the balance sheet.`,
      scenario:`The microfinance bank on the main road was offering small business loans, and Amaka went in to ask about expanding her stock line. The loan officer listened politely, then said: "Bring your financial statements." Amaka reported the request to Aunty Florence like a riddle. "He is asking for the formal story of your business, in the language every reader of accounts understands," said Aunty Florence. "Principally two documents: your trading and profit and loss account — how the business performed over the period — and your balance sheet — where it stands right now. Performance and position. The film and the photograph." They spent the evening preparing both from Amaka's well-kept books, and Aunty Florence pointed out the quiet advantage: "Half the traders on this street cannot produce these documents at all. Your statements do more than request a loan — they announce that this business knows itself." The loan officer, reviewing the neat pages a week later, visibly relaxed. The books had spoken for her before she said a word.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Financial statements</strong> are the formal reports summarising a period's results: principally the <strong>trading and profit and loss account</strong> (performance over the period — the film) and the <strong>balance sheet</strong> (position at the period's end — the photograph).</p>
  <p>They are written in accounting's shared language precisely so that any trained reader — banker, investor, tax officer, partner — can understand the business without knowing its owner.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — What the Loan Officer Read</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Statement</th><th>Question it answered</th><th>What Amaka's showed</th></tr></thead>
    <tbody>
      <tr><td>Trading &amp; P&amp;L account</td><td>Can this business generate profit?</td><td>Consistent gross margin; positive net profit trend</td></tr>
      <tr><td>Balance sheet</td><td>Can it survive and repay?</td><td>Current assets covering current liabilities ~3×</td></tr>
    </tbody>
  </table></div>
  <p>The quiet advantage Aunty Florence named is real: many traders cannot produce these documents at all. The statements did two jobs at once — requested the loan, and demonstrated that the business knows itself. Well-kept books had spoken for Amaka before she said a word.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Performance and position — the film and the photograph. Whenever anyone serious asks about your business, these two documents are the answer. Keep books that can produce them at any month end.</p>
</div>`,
      quiz:{q:'What do financial statements summarise?', opts:['Only the cash transactions of the year', 'A business\'s performance and position at the end of a period', 'Only the tax owed by the business', 'A list of all suppliers'], ans:1, exp:'Financial statements summarise a business\'s performance (via the trading and profit and loss account) and its position (via the balance sheet) at the end of an accounting period.'}
    },
    {id:35, term:'Fixed Assets', duration:'5 min', pips:2,
      definition:`Assets bought for long-term use in the business rather than for resale, such as land, buildings, machinery and vehicles. They are expected to be of use to the business for a considerable time.`,
      scenario:`Preparing the balance sheet for the bank, Amaka drew up a small register: the display cabinet, the laptop, the POS machine, the wall shelving. None of these were for sale; all of them made selling possible. "Your fixed assets," Aunty Florence confirmed. "Bought for long-term use in the business, not for resale. They are the tools of trade — the stage on which the trading happens." She had Amaka note each one's cost and purchase date. "On the balance sheet they sit above the current assets, listed most permanent first. And notice the beautiful distinction: the phones on your shelf and the cabinet holding them are both assets — but the phones are stock, waiting to leave, while the cabinet stays and serves. If tomorrow you started selling display cabinets, then cabinets would become your stock. The nature of the business, not the object itself, decides." Amaka titled the page 'Fixed Asset Register' — a small document, she would learn, that auditors and insurers love to see.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Fixed assets</strong> are bought for long-term <strong>use</strong> in the business, not for resale: buildings, machinery, vehicles, equipment, furniture. They are the stage on which trading happens.</p>
  <p>The classification follows the business's purpose, not the object. Phones are stock in Amaka's shop; in a delivery company's books, its vans are fixed assets while a van dealer holds identical vans as stock.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Fixed Asset Register</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Asset</th><th>Cost (₦)</th><th>Acquired</th></tr></thead>
    <tbody>
      <tr><td>Display cabinet</td><td>150,000</td><td>Day 1</td></tr>
      <tr><td>Laptop</td><td>120,000</td><td>Day 1</td></tr>
      <tr><td>POS machine</td><td>85,000</td><td>Month 4</td></tr>
      <tr><td>Wall shelving</td><td>120,000</td><td>Month 4</td></tr>
      <tr class="table-total"><td><strong>Total fixed assets at cost</strong></td><td><strong>475,000</strong></td><td></td></tr>
    </tbody>
  </table></div>
  <p>On the balance sheet, fixed assets sit above current assets, most permanent first. The register — asset, cost, date — is a small document with outsized uses: it feeds depreciation later, supports insurance claims, and is among the first things auditors ask to see.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>For use, not for sale — that is the whole test. Keep a dated register at cost. And remember the pair: fixed assets serve the trade; current assets flow through it.</p>
</div>`,
      quiz:{q:'Which of these is a fixed asset for a delivery business?', opts:['Fuel held in storage for the delivery vehicles', 'A delivery van used for years of service', 'Cash received from a delivery fee', 'An amount owed by a customer'], ans:1, exp:'The delivery van is bought for long-term use, not resale — a fixed asset. Fuel, cash and amounts owed by customers are all current assets, expected to be used or converted to cash within the year.'}
    },
    {id:36, term:'Going Concern Concept', duration:'5 min', pips:2,
      definition:`The assumption, when preparing financial statements, that a business will continue trading for the foreseeable future. This justifies valuing most assets at cost rather than at their forced 'sale up' value.`,
      scenario:`A rumour swept the street in August: the state government might widen the road, and shops on their side could face demolition within a few years. Amaka arrived at Aunty Florence's door genuinely shaken — should she value everything at what it would fetch in a panic sale? The older woman poured tea before answering. "Accounting has met your fear before. It is called the going concern concept: unless there is real evidence otherwise, we prepare accounts assuming the business will continue operating for the foreseeable future. That assumption is why your cabinet sits in the books at its cost, not at the scrap price a forced sale would fetch." She set down her cup. "The day continuation genuinely becomes doubtful — a confirmed demolition notice, an unpayable debt — the basis changes, and everything is revalued at break-up prices. But rumours are not evidence. Until then, we account for a living business, not a dying one." The road scheme, like most street rumours, evaporated by September. The books had never flinched.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>going concern concept</strong>: financial statements are prepared assuming the business will continue operating for the foreseeable future — unless there is real evidence otherwise. This assumption justifies valuing assets at cost (less depreciation) rather than at forced-sale, break-up prices.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Two Valuations of the Same Shop</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Asset</th><th>Going concern (₦)</th><th>Break-up sale (₦)</th></tr></thead>
    <tbody>
      <tr><td>Display cabinet</td><td>150,000</td><td>40,000</td></tr>
      <tr><td>Shelving (fitted)</td><td>120,000</td><td>15,000</td></tr>
      <tr><td>Stock</td><td>710,000</td><td>430,000</td></tr>
    </tbody>
  </table></div>
  <p>Which column is "true"? Both — for different futures. A living business will use the cabinet for years; its cost fairly represents that continuing service. A dying business must take what a hurried market offers. The concept simply demands honesty about which future the evidence supports. A street rumour is not evidence; a confirmed demolition notice, an unpayable debt, or a decision to close would be — and on that day, the basis of the whole valuation changes.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Account for a living business until real evidence says otherwise. Cost-based values assume continuation; break-up values are for genuine endings. Rumours change nothing; evidence changes everything.</p>
</div>`,
      quiz:{q:'What does the going concern concept assume?', opts:['That a business will be sold within the year', 'That a business will continue trading for the foreseeable future', 'That all assets must be valued at their forced sale price', 'That profit can never be negative'], ans:1, exp:'The going concern concept assumes the business will keep trading into the foreseeable future, which is why assets are normally valued at cost rather than at a knockdown forced-sale value.'}
    },
    {id:37, term:'Gross Loss', duration:'5 min', pips:2,
      definition:`The result when the cost of goods sold is greater than sales revenue for a period — the trading account shows a deficit before other expenses are even considered.`,
      scenario:`In May, hungry for customers, Amaka had run a loud promotion: a popular phone model at a price that undercut everyone on the street. The shop buzzed for three weeks; she felt like a market queen. Then she and Aunty Florence drew up May's trading account. Sales: ₦1,410,000. Cost of the goods sold: ₦1,468,000. Amaka stared at the negative result. "A gross loss," said Aunty Florence quietly. "Your sales did not even cover what the goods themselves cost you — before rent, before fuel, before Chidi's wages, before anything. You paid customers to take your stock." The lesson stung precisely because the shop had felt so busy. "Crowds are not profit, my dear. A gross loss at the trading level means the pricing itself is broken — no amount of cost-cutting further down can save a business that sells below cost. Check your margin on the day you set the price, not the month after." Amaka kept that May trading account pinned inside her drawer for years — her most expensive certificate.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>A <strong>gross loss</strong> occurs when the cost of goods sold exceeds sales revenue — the trading account is negative <em>before a single operating expense is considered</em>. It means the pricing of the trade itself is broken: on average, goods left the shop for less than they cost to obtain.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The May Promotion, In Numbers</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Trading account — May</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Sales</td><td>1,410,000</td></tr>
      <tr><td>Less: Cost of goods sold</td><td>(1,468,000)</td></tr>
      <tr class="table-total"><td><strong>Gross loss</strong></td><td><strong>(58,000)</strong></td></tr>
    </tbody>
  </table></div>
  <p>Three busy weeks, a crowded shop — and ₦58,000 paid to customers for the privilege of emptying the shelves. And this is <em>before</em> rent, fuel and wages, which turned the month's total result far worse. That is the defining feature of a gross loss: no cost-cutting further down the statement can rescue it, because the engine itself is running in reverse.</p>
  <p>The remedy lives at the moment of pricing: cost per unit (landed, carriage included) plus a defendable margin — checked on the day the price is set, not the month after.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Crowds are not profit. A gross loss means the trade itself lost money — fix the pricing, not the expenses. Check margins when setting prices; the trading account should confirm your arithmetic, never surprise you with it.</p>
</div>`,
      quiz:{q:'When does a business record a gross loss?', opts:['When total expenses exceed total revenue', 'When the cost of goods sold exceeds sales revenue', 'When the owner takes too many drawings', 'When liabilities exceed assets'], ans:1, exp:'A gross loss occurs specifically when the cost of goods sold is greater than sales revenue — a problem with the trading activity itself, calculated before other expenses are considered.'}
    },
    {id:38, term:'Gross Profit', duration:'5 min', pips:2,
      definition:`The excess of sales revenue over the cost of goods sold for a period, calculated in the trading account before any other expenses are deducted.`,
      scenario:`June was the correction. Amaka repriced carefully — cost plus a margin she could defend — bundled cases and screen guards with each phone, and let the promotion die. At month end she almost didn't want to look, but the trading account had good news: sales ₦1,650,000, cost of goods sold ₦1,180,000. "Gross profit of ₦470,000," said Aunty Florence, underlining it twice. "The excess of your sales over what the goods sold actually cost you. This is the engine figure of any trading business — the raw margin the shop generates before the running costs feed on it." She showed Amaka how to read it as a percentage of sales. "Watch this margin month after month. When it thins, something upstream is wrong — supplier prices creeping, discounts too generous, theft, waste. Gross profit is your early-warning system; by the time trouble reaches your net profit, it has already been eating for weeks." Amaka wrote the margin percentage on a card and taped it inside the till — her new north star.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Gross profit</strong> is the excess of sales over the cost of goods sold — the raw trading margin, calculated in the trading account before any operating expenses are deducted. It measures one thing with total clarity: does the buying and selling of goods, by itself, generate a surplus?</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — June, The Correction</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Trading account — June</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Sales</td><td>1,650,000</td></tr>
      <tr><td>Less: Cost of goods sold</td><td>(1,180,000)</td></tr>
      <tr class="table-total"><td><strong>Gross profit</strong></td><td><strong>470,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>As a margin: 470,000 ÷ 1,650,000 ≈ <strong>28.5% of sales</strong> — the number Amaka taped inside the till. That percentage is the early-warning system: track it monthly, and any thinning points upstream — supplier prices creeping, discounts too generous, theft, waste — <em>weeks</em> before the damage reaches the bottom line.</p>
  <p>Compare May's gross loss with June's gross profit: identical shop, identical street, different pricing discipline. The trading account never lies about which discipline was applied.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Gross profit = Sales − COGS, the engine figure of a trading business. Watch it as a percentage, month against month. By the time trouble reaches net profit, it has already been eating for weeks — gross margin is where it shows first.</p>
</div>`,
      quiz:{q:'Sales revenue is ₦600,000 and cost of goods sold is ₦410,000. What is the gross profit?', opts:['₦1,010,000', '₦190,000', '₦410,000', '₦600,000'], ans:1, exp:'Gross profit = Sales − Cost of goods sold = ₦600,000 − ₦410,000 = ₦190,000.'}
    },
    {id:39, term:'Historical Cost Concept', duration:'5 min', pips:2,
      definition:`The principle that assets are normally recorded and shown in the accounts at the price originally paid for them, rather than at their current market value.`,
      scenario:`Doing her mid-year review, Amaka noticed that the laptop she had bought for ₦120,000 now sold new for ₦95,000 everywhere — prices had fallen. Should the books not be corrected to the 'true' value? Aunty Florence shook her head. "The historical cost concept: assets are recorded at what you actually paid for them. That ₦120,000 is a fact — dated, provable, sitting on a receipt. Today's market price is an opinion that changes with every trader you ask." Amaka frowned. "But then the books are wrong." "The books are verifiable, which is a different virtue," said Aunty Florence. "Imagine revaluing every asset every month on guesswork — your accounts would become a diary of moods. Cost anchors them to evidence. Yes, the trade-off is that old assets may sit below or above their market worth; accounting knows this and accepts it for the discipline it buys. Depreciation, which you will meet later, handles the fading usefulness. But the starting point is always the truth of what was paid."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>historical cost concept</strong>: assets are recorded at the price actually paid for them. Cost is a dated, provable fact on a receipt; market value is an opinion that shifts with every trader you ask. Accounting anchors itself to the fact.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Laptop Question</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Valuation basis</th><th>₦</th><th>Nature</th></tr></thead>
    <tbody>
      <tr><td>Historical cost (receipt, Day 1)</td><td>120,000</td><td>Verifiable fact</td></tr>
      <tr><td>Today's market price (new)</td><td>95,000</td><td>Changing opinion</td></tr>
    </tbody>
  </table></div>
  <p>The books keep ₦120,000 — not because it is the laptop's "worth" today, but because it is the truth of what was paid, and truth that can be audited. Imagine the alternative: revaluing every asset monthly on guesswork, the accounts becoming a diary of moods.</p>
  <p>The trade-off is acknowledged openly: old assets may sit above or below market worth. Depreciation (a later lesson) handles the fading usefulness systematically. But the starting anchor is always cost.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Record what was paid — dated, receipted, provable. Verifiability is the virtue historical cost buys, and the discipline the whole system leans on. Adjustments come later, by rule, not by mood.</p>
</div>`,
      quiz:{q:'Under the historical cost concept, at what value are assets normally recorded?', opts:['Their current market value', 'Their estimated future selling price', 'The price originally paid for them', 'Whatever value the owner believes is fair'], ans:2, exp:'The historical cost concept records assets at the price actually paid for them, rather than at a constantly changing current market value — keeping the figures objective and verifiable.'}
    },
    {id:40, term:'Liabilities', duration:'5 min', pips:2,
      definition:`Amounts owed by a business to outside parties — for goods or services supplied, for expenses not yet paid, or for money borrowed.`,
      scenario:`With the bank loan approved and drawn, Amaka sat down to map everything the business now owed: the loan itself, Big Sam's 30-day account for the latest stock, a small unpaid balance with the generator repairer. She arranged them on one page under a single heading. "Your liabilities," said Aunty Florence, reviewing it. "Every amount the business owes to outsiders — for goods supplied, services rendered, or money borrowed. The other funders of your assets, alongside your own capital." She had Amaka split the page: the bank loan, repayable over two years, sat apart from the supplier balances due within weeks. "Same family, different urgency. But respect them all equally in the records, because liabilities are promises with dates attached. A business that tracks its assets but is vague about its liabilities is a person who counts income but forgets their debts — comfortable right up until the knock on the door." Amaka dated each obligation and diarised every due date. The knock, whenever it came, would find her ready.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Liabilities</strong> are amounts the business owes to outsiders — for goods supplied on credit, services rendered, expenses not yet paid, or money borrowed. Alongside capital, they are the other funder of the business's assets: everything owned traces back either to the owner or to a liability.</p>
  <p>Every liability is a promise with a date attached — and the date matters as much as the amount.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Mapping Everything Owed</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Liability</th><th>₦</th><th>Due</th></tr></thead>
    <tbody>
      <tr><td>Big Sam Distributions (stock on credit)</td><td>320,000</td><td>30 days</td></tr>
      <tr><td>Generator repairer (balance)</td><td>15,000</td><td>2 weeks</td></tr>
      <tr><td>Bank loan (over 2 years)</td><td>250,000</td><td>Long-term</td></tr>
      <tr class="table-total"><td><strong>Total liabilities</strong></td><td><strong>585,000</strong></td><td></td></tr>
    </tbody>
  </table></div>
  <p>Same family, different urgency: the first two are current liabilities; the loan (beyond its next twelve months of instalments) is long-term. The balance sheet separates them for exactly that reason. A business vague about its liabilities is a person who counts income but forgets debts — comfortable right up until the knock on the door.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Liabilities = owed to outsiders, each with an amount <em>and a date</em>. Track both, split current from long-term, and diarise every due date. The knock should never find you surprised.</p>
</div>`,
      quiz:{q:'Which of the following is a liability?', opts:['Stock held for resale', 'An amount owed to a supplier', 'Cash in the bank', 'A delivery motorcycle owned by the business'], ans:1, exp:'An amount owed to a supplier is a liability — money the business owes to an outside party. Stock, cash and the motorcycle are all assets, not liabilities.'}
    },
    {id:41, term:'Loss', duration:'5 min', pips:2,
      definition:`The result of selling goods or services for less than the cost of providing them — expenses exceed revenue for the period.`,
      scenario:`The July rains were merciless that year. The street flooded twice, customers stayed home, the generator drank fuel through the dark afternoons, and a roof leak damaged a carton of accessories. When the month's figures were totalled, the shop had simply spent more than it earned. "A loss," said Aunty Florence plainly, when Amaka showed her. "Expenses exceeded revenue for the period. The mirror image of profit — and every trader on this street has met it." What Amaka remembered afterwards was not the number but the calm. "A loss is information, not shame. Read it: which part was the weather, which part was the leak you can fix, which costs could bend when sales fall? A single loss month tells you about July. Only a pattern of them tells you about the business." They listed three actions — repair the roof, negotiate fuel in bulk, build a rainy-season cash cushion. The loss went into the books unhidden and undramatised: one honest bad month, properly recorded, thoroughly interrogated.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>A <strong>loss</strong> is the mirror of profit: expenses exceed revenue for the period. The business consumed more value than it created. Every trader meets one eventually — the accounting response is not shame but analysis.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Reading July Like a Doctor</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>July's anatomy</th><th>Diagnosis</th></tr></thead>
    <tbody>
      <tr><td>Sales thin (floods kept customers home)</td><td>Weather — temporary</td></tr>
      <tr><td>Generator fuel doubled (dark afternoons)</td><td>Partly weather, partly no bulk deal</td></tr>
      <tr><td>Roof leak damaged accessories</td><td>Fixable — repair the roof</td></tr>
      <tr><td>Rent unchanged against low sales</td><td>Fixed costs do not bend</td></tr>
    </tbody>
  </table></div>
  <p>The reading produced three actions: repair the roof, negotiate bulk fuel, build a rainy-season cash cushion. That is what a properly recorded loss is <em>for</em> — it tells you exactly which naira went where, so a bad month becomes a manageable one.</p>
  <p>The distinction that matters over time: a single loss month tells you about July. Only a <em>pattern</em> of them tells you about the business.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Loss = expenses over revenue = information, not shame. Record it unhidden, interrogate it thoroughly, act on what it says. One bad month is weather; a pattern is a diagnosis.</p>
</div>`,
      quiz:{q:'When does a business make a loss?', opts:['When revenue exceeds expenses', 'When expenses exceed revenue', 'When assets exceed liabilities', 'When the owner takes drawings'], ans:1, exp:'A loss occurs when expenses exceed revenue for the period — the opposite of a profit, where revenue exceeds expenses.'}
    },
    {id:42, term:'Materiality', duration:'5 min', pips:2,
      definition:`The principle that an item only needs to be recorded with full precision if it is significant enough to matter to someone using the financial statements. Trivial items can be treated simply, even if technically inaccurate.`,
      scenario:`Chidi, newly zealous about correctness, spent twenty minutes one evening trying to decide whether the shop's new ₦1,500 stapler was capital expenditure — it would, after all, serve for years. Amaka was halfway into the debate when Aunty Florence began to laugh. "Materiality, children. An item deserves precise treatment only if it is significant enough to change anyone's view of the accounts. Will a reader of your statements make a different decision because a ₦1,500 stapler was expensed rather than treated as an asset and depreciated over five years?" Chidi admitted they would not. "Then expense it and move on. Accounting is judgement, not just rules — and part of the judgement is knowing where precision earns its cost." She gave them a working line: significance is relative to the size of the business. "₦1,500 is nothing in your accounts. In a table-top sweet stall it might matter. And ₦150,000 misplaced would matter here very much. The threshold moves; the principle stands: sweat the significant, wave through the trivial."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Materiality</strong>: an item deserves precise, technical treatment only if it is significant enough to influence someone's view of the accounts. Trivial items may be treated simply — even if the simple treatment is technically imperfect — because the cost of precision would exceed its value.</p>
  <p>Accounting is judgement, not just rules; materiality is where the judgement openly shows.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Stapler Tribunal</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Item</th><th>Technically</th><th>Materiality verdict</th></tr></thead>
    <tbody>
      <tr><td>₦1,500 stapler (lasts years)</td><td>A fixed asset, depreciable over 5 years</td><td>Expense it — no reader's decision changes</td></tr>
      <tr><td>₦120,000 shelving</td><td>Fixed asset</td><td>Capitalise — this one matters</td></tr>
    </tbody>
  </table></div>
  <p>The threshold is <em>relative to the size of the business</em>. ₦1,500 vanishes inside Amaka's accounts; in a table-top sweet stall it might genuinely matter; and ₦150,000 misplaced would matter in Amaka's books very much. Twenty minutes debating a stapler is twenty minutes stolen from questions that move real money.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Sweat the significant; wave through the trivial. Ask: would a sensible reader of these accounts decide anything differently? If not, choose the simple treatment and spend your precision where it pays.</p>
</div>`,
      quiz:{q:'What does the materiality principle allow accountants to do?', opts:['Ignore all small transactions entirely', 'Treat trivial items simply, even if technically imprecise, since they wouldn\'t matter to a user of the accounts', 'Record only transactions involving cash', 'Avoid preparing financial statements for small businesses'], ans:1, exp:'Materiality means trivial items can be treated in a simpler way, since the effort of perfect precision isn\'t justified when the amount is too small to matter to anyone using the financial statements.'}
    },
    {id:43, term:'Money Measurement Concept', duration:'5 min', pips:2,
      definition:`The principle that accounting only records facts that can be expressed in monetary terms and on which most people would agree a value — meaning many important non-financial facts about a business never appear in its accounts.`,
      scenario:`A business student from the polytechnic interviewed Amaka for a project and asked what her most valuable assets were. Amaka answered honestly: Aunty Florence's mentorship, Tunde's loyalty and his referrals, Chidi's growing skill, her own reputation on the street. The student flipped through the balance sheet, puzzled. "None of that appears here." That evening Amaka relayed the exchange. "The money measurement concept," said Aunty Florence. "Accounting records only what can be expressed in monetary terms with reasonable agreement. Your reputation is real — and no two people would price it the same, so the books stay silent about it." She spread her hands. "This is a boundary, not a flaw. Accounts answer certain questions with rigour precisely because they refuse the questions they cannot answer objectively. But never confuse the map with the territory: the balance sheet shows the measurable skeleton of this business. The flesh — trust, skill, goodwill earned cup of tea by cup of tea — lives outside the columns, and often decides everything."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>money measurement concept</strong>: accounting records only facts that can be expressed in monetary terms with reasonable agreement on the value. What cannot be objectively priced — reputation, loyalty, skill, morale — never enters the books, however real and however decisive.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Two Inventories of Amaka Phones</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>On the balance sheet</th><th>Invisible to it</th></tr></thead>
    <tbody>
      <tr><td>Stock ₦710,000</td><td>Aunty Florence's mentorship</td></tr>
      <tr><td>Fixed assets ₦475,000</td><td>Tunde's loyalty and referrals</td></tr>
      <tr><td>Debtors, bank, cash</td><td>Chidi's growing skill</td></tr>
      <tr><td>Liabilities, capital</td><td>The street's trust in Amaka</td></tr>
    </tbody>
  </table></div>
  <p>The right-hand column may decide the business's future more than the left — and no two people would price any line of it the same, so the books stay silent. This is a boundary, not a flaw: accounts answer certain questions with rigour precisely because they refuse the questions they cannot answer objectively.</p>
  <p>The practical wisdom: never confuse the map with the territory. Manage both columns; only one of them will ever appear in the statements.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>If it cannot be measured in money with reasonable agreement, it is not recorded. The balance sheet shows the measurable skeleton; the flesh lives outside the columns — and often decides everything.</p>
</div>`,
      quiz:{q:'According to the money measurement concept, why might an important fact about a business NOT appear in its accounts?', opts:['Because the accountant forgot to include it', 'Because it cannot be expressed in monetary terms on which most people would agree', 'Because it relates to a future period', 'Because only the owner is allowed to know it'], ans:1, exp:'The money measurement concept restricts accounting to facts that can be reliably expressed in money — qualities like staff friendliness or location, however important, fall outside what accounting can capture.'}
    },
    {id:44, term:'Net Loss', duration:'5 min', pips:2,
      definition:`The result when the cost of goods sold plus all other expenses exceeds total revenue for a period — the final, bottom-line deficit shown in the profit and loss account.`,
      scenario:`When July's full accounts were finished — trading account first, then all the expenses stacked below — the final line confirmed what the month had felt like: a net loss of ₦84,000. Amaka traced the arithmetic. The trading section had actually squeaked out a small gross profit; it was the expenses beneath — the fuel, the roof repair, the rent against thin sales — that dragged the bottom line under. "See the anatomy of it," said Aunty Florence. "A gross loss means your pricing failed. A net loss with a healthy gross profit means the trading engine works, but the running costs overwhelmed a weak month. Different diseases, different medicine." She showed Amaka where the figure went next: deducted from capital, a bruise recorded on the owner's stake. "The books do not negotiate. But notice — because your records are complete, you know exactly which ₦84,000 this was: mostly rain, partly roof, none of it pricing. That precision is what turns a bad month into a manageable one."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>A <strong>net loss</strong> is the bottom-line deficit: cost of goods sold <em>plus all other expenses</em> exceed total revenue for the period. It is deducted from capital — a recorded bruise on the owner's stake.</p>
  <p>Its anatomy matters more than its size: a net loss with a healthy gross profit is a different disease from a gross loss, and takes different medicine.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — July's Full Statement</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>July</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Gross profit (trading section)</td><td>65,000</td></tr>
      <tr><td>Less: Total expenses (rent, fuel, wages, roof repair)</td><td>(149,000)</td></tr>
      <tr class="table-total"><td><strong>Net loss</strong></td><td><strong>(84,000)</strong></td></tr>
    </tbody>
  </table></div>
  <p>Read the anatomy: pricing held — the trading engine still produced a positive margin even in the floods. The loss came from below the line: fixed costs against collapsed sales, plus one-off repairs. Diagnosis: not a pricing problem, a weather-and-resilience problem. The three remedies (roof, bulk fuel, cash cushion) all target the expense side — correctly, because that is where this loss lived.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Gross loss → pricing is broken. Net loss with positive gross profit → the engine works but the running costs overwhelmed the period. Locate the loss before treating it; the statement's structure exists precisely to make that possible.</p>
</div>`,
      quiz:{q:'What does a net loss represent?', opts:['A loss only from the cost of goods sold', 'The final bottom-line deficit after all expenses are deducted from all revenue', 'Money owed to a supplier', 'The amount of capital withdrawn by the owner'], ans:1, exp:'Net loss is the final, bottom-line result — what\'s left after deducting cost of goods sold AND every other expense from total revenue, showing the business made an overall deficit for the period.'}
    },
    {id:45, term:'Net Profit', duration:'5 min', pips:2,
      definition:`The amount remaining after all expenses — including those beyond the cost of goods sold — have been deducted from gross profit plus any other revenue. This is the figure transferred to the capital account.`,
      scenario:`August and September repaid July's patience. The rains eased, the street filled, the repriced stock moved steadily, and the bulk fuel deal trimmed the generator's appetite. At the quarter's end, Aunty Florence and Amaka drew the accounts down to the final line: gross profit ₦1,310,000 for the quarter, total expenses ₦780,000, net profit ₦530,000. "Net profit," said Aunty Florence, with the satisfaction of a teacher at harvest. "What remains after every expense has taken its share from gross profit. The bottom line — the truest single measure of a period's performance." She showed Amaka its destination: added to capital, the owner's stake growing by exactly what the business had genuinely earned. "Gross profit flatters; net profit testifies. Rent cannot hide from it, fuel cannot hide from it, even the small charges nibble visibly. When someone asks how the business is really doing, this is the number that answers under oath." Amaka entered it into the capital account herself — ₦530,000 of proof.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Net profit</strong> is what remains after <em>every</em> expense has taken its share from gross profit (plus any other income). It is the bottom line — the truest single measure of a period's performance — and it is transferred to capital, growing the owner's stake by exactly what the business genuinely earned.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Recovery Quarter</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Aug–Oct quarter</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Gross profit</td><td>1,310,000</td></tr>
      <tr><td>Less: Rent</td><td>(150,000)</td></tr>
      <tr><td>Less: Wages</td><td>(96,000)</td></tr>
      <tr><td>Less: Electricity &amp; fuel (bulk deal)</td><td>(84,000)</td></tr>
      <tr><td>Less: Carriage outwards, charges, sundry</td><td>(450,000)</td></tr>
      <tr class="table-total"><td><strong>Net profit</strong></td><td><strong>530,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Gross profit flatters; net profit testifies. Rent cannot hide from it, fuel cannot hide from it, even the small bank charges nibble visibly on their own line. When anyone asks how the business is <em>really</em> doing, this is the number that answers under oath — and its destination is the capital account, where the owner's stake grows by precisely this amount.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Net profit = gross profit + other income − all expenses. The bottom line, transferred to capital. Judge months by gross margin, but judge the business by the trend of this figure.</p>
</div>`,
      quiz:{q:'Gross profit is ₦300,000 and other expenses (rent, wages, etc.) total ₦180,000. What is the net profit?', opts:['₦480,000', '₦120,000', '₦300,000', '₦180,000'], ans:1, exp:'Net profit = Gross profit − Other expenses = ₦300,000 − ₦180,000 = ₦120,000.'}
    },
    {id:46, term:'Profit', duration:'5 min', pips:2,
      definition:`The result of selling goods or services for more than they cost to provide — revenue exceeds expenses for the period.`,
      scenario:`On a slow Sunday over tea, Amaka asked the question she had circled for months without ever asking plainly: "Aunty, what IS profit, exactly? Not the calculation — the thing itself." Aunty Florence considered it with the seriousness it deserved. "Profit is the value you create above the value you consume. You take goods, effort, electricity, shelter — all costing something — and you arrange them into a service people willingly pay more for than the whole arrangement cost you. The excess is profit. It is the market's receipt confirming you made something worth more than its ingredients." She set down her cup. "That is why profit is not the same as cash — you can earn profit that sits in debtors' pockets. And it is why honest profit is nothing to apologise for: it is evidence of usefulness. A shop that profits year after year is a shop the street keeps voting for." Amaka thought of her shelves, her prices, her regulars. Revenue exceeding expenses — and underneath the formula, usefulness, proven daily.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Profit</strong> is revenue exceeding expenses — but beneath the formula sits the meaning: profit is the value you <em>create</em> above the value you <em>consume</em>. Goods, effort, electricity, shelter — all costing something — arranged into a service people willingly pay more for than the arrangement cost. The excess is the market's receipt confirming usefulness.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Two Truths About Profit</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Truth</th><th>Why it matters</th></tr></thead>
    <tbody>
      <tr><td>Profit is not cash</td><td>Tunde's ₦60,000 credit sale is profit-bearing revenue the day the phone leaves — but the cash sits in his pocket until he pays. A business can be profitable and cash-starved at once.</td></tr>
      <tr><td>Profit is not revenue</td><td>Revenue is the top of the waterfall; profit is what survives every cost drinking from it on the way down.</td></tr>
    </tbody>
  </table></div>
  <p>And the moral dimension Aunty Florence insisted on: honest profit is nothing to apologise for. A shop that profits year after year is a shop the street keeps voting for, with its own money. Losses (the mirror) are information; sustained profit is proof of sustained usefulness.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Profit = revenue − expenses, recognised when earned, not when cash moves. Underneath the arithmetic: value created above value consumed — usefulness, proven daily at the till.</p>
</div>`,
      quiz:{q:'When does a business make a profit?', opts:['When expenses exceed revenue', 'When revenue exceeds expenses', 'When liabilities exceed assets', 'When the owner takes drawings'], ans:1, exp:'Profit occurs when revenue exceeds expenses for the period — the opposite of a loss, where expenses exceed revenue.'}
    },
    {id:47, term:'Profit and Loss Account', duration:'5 min', pips:2,
      definition:`The section of the trading and profit and loss account in which net profit (or net loss) is calculated, by deducting expenses other than the cost of goods sold from gross profit.`,
      scenario:`With the quarter's gross profit computed, Aunty Florence ruled a line beneath the trading section and said, "Now — the second chamber of the statement. The profit and loss account." Below the line they marshalled every expense of the quarter: rent, wages, electricity, fuel, carriage outwards, the small bank charges Amaka had nearly overlooked. Each one deducted, step by step, from the gross profit brought down from the trading section above. "The trading account asked: did buying and selling generate a margin? This section asks the harder question: after the full cost of running the shop, what genuinely remains?" She pointed to where any other income — a sublet corner, interest earned — would be added if it existed. The final figure, net profit, emerged at the foot. "Two chambers, one document, one story told in the right order: first the engine, then everything the engine must carry. Read it top to bottom and you can diagnose a business the way a doctor reads a chart." Amaka labelled the sections in her own statement — trading above the line, profit and loss below — and the whole quarter clicked into narrative.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>profit and loss account</strong> is the second chamber of the statement — the section <em>below</em> the trading account, where net profit is calculated. Gross profit is brought down from above; every other expense is deducted from it (and any non-trading income added); the final line is net profit or net loss.</p>
  <p>Two chambers, one document, one story in the right order: first the engine, then everything the engine must carry.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Quarter's Second Chamber</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Profit and loss section</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Gross profit b/d (from trading account)</td><td>1,310,000</td></tr>
      <tr><td>Less: Rent</td><td>(150,000)</td></tr>
      <tr><td>Less: Wages</td><td>(96,000)</td></tr>
      <tr><td>Less: Electricity &amp; fuel</td><td>(84,000)</td></tr>
      <tr><td>Less: Carriage outwards, bank charges, sundry</td><td>(450,000)</td></tr>
      <tr class="table-total"><td><strong>Net profit</strong></td><td><strong>530,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Read top to bottom and the diagnosis writes itself: the trading engine produced ₦1,310,000 of margin; the running of the shop consumed ₦780,000 of it; ₦530,000 genuinely remains. The trading account asked <em>did buying and selling generate a margin?</em> This section answers the harder question: <em>after the full cost of running the shop, what remains?</em></p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Trading account above the line (gross profit); profit and loss below it (net profit). Every expense that is not part of the cost of goods lives in this second chamber — where nothing can hide.</p>
</div>`,
      quiz:{q:'What is calculated in the profit and loss account section?', opts:['Gross profit, by deducting cost of goods sold from sales', 'Net profit, by deducting other expenses from gross profit', 'The value of unsold stock', 'The owner\'s total capital'], ans:1, exp:'The profit and loss account section takes gross profit (already calculated in the trading account) and deducts all other expenses to arrive at net profit or net loss.'}
    },
    {id:48, term:'Prudence', duration:'5 min', pips:2,
      definition:`The principle that an accountant should be cautious when judgement is required — making sure assets and profits are not overstated, and that liabilities and losses are not understated.`,
      scenario:`In October, two temptations arrived in the same week. A private school's bursar promised — verbally, warmly — a bulk order of forty phones for the new term: "Consider it done." And in the storeroom, Amaka found that the July leak had quietly ruined six phone cases she had been carrying at full value. Her instinct was symmetrical and wrong: pencil in the big order, ignore the small damage. Aunty Florence reversed both. "Prudence — the accountant's oldest instinct. Never anticipate a profit; never ignore a loss. That order is a kind promise, not a transaction — book nothing until goods move and an obligation exists. Those damaged cases, though? Write them down today, the moment the loss is known." Amaka protested gently: it made the month look worse both ways. "Exactly," said Aunty Florence. "Prudence deliberately leans pessimistic, because businesses are ruined by overstated hope far more often than by understated caution. Let your books flatter you in only one way: by being believed." The school's order, when it finally came, was for fifteen phones — booked on the day it became real.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Prudence</strong>: when judgement is required, lean cautious. Do not overstate assets or profits; do not understate liabilities or losses. In practice: <strong>never anticipate a profit; never ignore a known loss.</strong></p>
  <p>The bias is deliberate. Businesses are ruined by overstated hope far more often than by understated caution.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Two Temptations, Two Verdicts</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Event</th><th>Temptation</th><th>Prudent treatment</th></tr></thead>
    <tbody>
      <tr><td>Bursar's verbal promise of 40 phones</td><td>Book the revenue now</td><td>Book nothing — no goods moved, no obligation exists</td></tr>
      <tr><td>Six leak-damaged cases in the storeroom</td><td>Ignore until sold</td><td>Write down today — the loss is already known</td></tr>
    </tbody>
  </table></div>
  <p>Note the asymmetry, which is the whole point: the possible gain waits for realisation; the known loss is recognised immediately. The school's order eventually arrived at fifteen phones, not forty — and was booked on the day it became real. Meanwhile the write-down had already told the truth about the storeroom.</p>
  <p>Prudence works hand in hand with realisation (profit only when earned) and separate determination (no netting hopes against losses).</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Anticipate no profit; ignore no loss. Let your books flatter you in only one way: by being believed.</p>
</div>`,
      quiz:{q:'What does the prudence principle require when there is uncertainty?', opts:['Always assume the best possible outcome', 'Be cautious — don\'t overstate assets or profits, and don\'t understate liabilities or losses', 'Ignore the uncertain item entirely', 'Wait until the uncertainty is fully resolved before recording anything'], ans:1, exp:'Prudence requires caution in the face of uncertainty — erring toward not overstating what\'s good (assets, profits) and not understating what\'s bad (liabilities, losses).'}
    },
    {id:49, term:'Purchases', duration:'5 min', pips:2,
      definition:`In accounting, the goods bought by a business with the intention of reselling them, as distinct from items such as vehicles or equipment which are bought for use rather than resale.`,
      scenario:`The November restock was Amaka's biggest yet: a van from Computer Village carrying phones, cases, chargers and screen guards — everything destined for her shelves and, eventually, her customers. The same trip, she also bought a standing fan for the shop's corner. Recording it all, she nearly wrote one grand figure under Purchases. Aunty Florence intercepted the pen. "In accounting, 'purchases' has a narrower meaning than in the market. Purchases means goods bought FOR RESALE — the stock of your trade. The phones, the cases, the chargers: purchases. The fan? You bought it to use, not to sell — it is a fixed asset, not purchases." She explained why the discipline matters: "Your purchases figure flows straight into cost of goods sold, and from there into gross profit. Pollute it with fans and furniture and your trading margin becomes fiction. The question is never 'did money leave?' — it is 'was this bought to be sold?'" The van's cargo went into Purchases; the fan took its quiet place in the asset register, blades spinning, forever excluded from the trading account.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>In accounting, <strong>purchases</strong> has a narrow meaning: goods bought <strong>for resale</strong> — the stock of your trade. Not equipment, not furniture, not anything bought for use. The test is never "did money leave?" but <strong>"was this bought to be sold?"</strong></p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Sorting the November Van</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Item</th><th>₦</th><th>Treatment</th></tr></thead>
    <tbody>
      <tr><td>Phones (for resale)</td><td>1,420,000</td><td>Purchases</td></tr>
      <tr><td>Cases, chargers, screen guards (for resale)</td><td>310,000</td><td>Purchases</td></tr>
      <tr><td>Standing fan (for shop use)</td><td>28,000</td><td>Fixed asset — NOT purchases</td></tr>
    </tbody>
  </table></div>
  <p>Why guard the gate so strictly? Because the purchases figure flows straight into cost of goods sold, and from there into gross profit. Let the fan in and the trading margin becomes fiction — the shop looks like it paid more for its goods than it did, and the pricing diagnosis that follows starts from a lie.</p>
  <p>The fan took its place in the asset register instead: blades spinning, forever excluded from the trading account.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Purchases = goods bought to be sold. Everything else that money buys — assets, services, expenses — has its own home. Keep the trading account pure and it will keep your margins honest.</p>
</div>`,
      quiz:{q:'Which of these counts as \'purchases\' in accounting terms?', opts:['A delivery motorcycle bought for the business', 'Stock bought with the intention of reselling it', 'A display cabinet bought for the shop', 'Office furniture bought for staff use'], ans:1, exp:'Purchases specifically refers to goods bought with the intention of resale — items bought for use in the business, like a motorcycle or furniture, are fixed assets, not purchases.'}
    },
    {id:50, term:'Realisation Concept', duration:'5 min', pips:2,
      definition:`The principle that profit should only be recognised once it has actually been 'realised' — meaning the goods or services have been provided, a value agreed, and there is reasonable certainty the buyer will pay.`,
      scenario:`A soldier on transfer paid Amaka a ₦40,000 deposit in November for a phone she had to order specially — delivery in two weeks, balance on collection. Cash was physically in the till, and Amaka's pen drifted toward the Sales column. Aunty Florence's hand arrived first. "Realisation. Profit is recognised only when it is realised — when the goods have been provided, a value agreed, and payment is reasonably certain. You have his money, but you have not given him his phone. There has been no sale yet — only a deposit, which the books treat as a liability: you owe him either a phone or his money back." Amaka recorded it exactly so, feeling the strange truth of holding cash that was not yet income. Two weeks later the phone arrived, the soldier collected it, paid the balance — and only then did the full amount march into Sales. "Cash answers 'do I have money?'" said Aunty Florence. "Realisation answers 'have I earned it?' Never let the first question impersonate the second."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>realisation concept</strong>: profit is recognised only when it is <em>realised</em> — the goods or services have been provided, a value has been agreed, and payment is reasonably certain. Cash arriving is not the trigger; <strong>earning</strong> is.</p>
  <p>Cash answers "do I have money?" Realisation answers "have I earned it?" — and the second question is the one profit obeys.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Soldier's Deposit</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Date</th><th>Event</th><th>Treatment</th></tr></thead>
    <tbody>
      <tr><td>Nov 10</td><td>₦40,000 deposit for a phone to be ordered</td><td>Liability (deposit held) — no sale yet</td></tr>
      <tr><td>Nov 24</td><td>Phone delivered; ₦90,000 balance paid</td><td>Full ₦130,000 recognised as Sales</td></tr>
    </tbody>
  </table></div>
  <p>For two weeks Amaka held cash that was not income — she owed the soldier either a phone or his money back. The moment the phone changed hands, the sale was realised and the whole amount marched into Sales. The same logic runs the other way too: a credit sale to Tunde is realised revenue on the day the phone leaves, even though his cash arrives later.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Recognise revenue when goods are provided, value agreed, and payment reasonably certain — not when cash moves. Deposits received are liabilities; credit sales are revenue. Never let the till impersonate the truth.</p>
</div>`,
      quiz:{q:'According to the realisation concept, when should profit be recognised?', opts:['As soon as a customer expresses interest in buying', 'Once goods or services have been provided and there is reasonable certainty of payment', 'Only once cash has actually been received', 'At the very start of the accounting period'], ans:1, exp:'The realisation concept requires that goods or services actually be provided, with an agreed value and reasonable certainty of payment, before profit can be recognised — mere interest or a reservation isn\'t enough.'}
    },
    {id:51, term:'Returns Inwards', duration:'5 min', pips:2,
      definition:`Goods previously sold to customers that have been returned to the business — also called sales returns. They are deducted from sales when calculating gross profit.`,
      scenario:`The school's fifteen-phone order went out in late November — and in the first week of December, three came back. Faulty batteries, the bursar said, politely but firmly. Amaka checked them, agreed, and issued replacements from stock. Then she sat before her books, unsure how to undo a sale without pretending it never happened. "You don't undo it — you answer it," said Aunty Florence. "Returns inwards: goods your customers have sent back. They get their own account, and at year end the total is deducted from sales." Amaka asked why not simply reduce the Sales figure quietly. "Because information hides in the separation. Sales tells you what customers bought; returns inwards tells you what they refused to keep. If that second number grows, something is wrong — a supplier's quality slipping, promises your goods cannot keep. Bury returns inside sales and you blind yourself to your own warning light." Three phones, honestly recorded — and when the same battery fault appeared a fourth time, Amaka spotted the pattern in one glance at the account.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Returns inwards</strong> (sales returns) are goods customers send back. They get their own account — never quietly netted inside Sales — and at period end the total is <strong>deducted from sales</strong> to leave net sales in the trading account.</p>
  <p>The separation exists because information hides in it: Sales tells you what customers bought; returns inwards tells you what they refused to keep.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The School's Three Phones</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>Returns inwards</td><td>285,000</td><td></td></tr>
      <tr><td>School (debtor)</td><td></td><td>285,000</td></tr>
      <tr><td colspan="3" style="font-size:0.8rem;color:var(--muted);font-style:italic;">Being: three phones returned — battery faults. Replacements issued from stock.</td></tr>
    </tbody>
  </table></div>
  <p>Because the account stood separate, the pattern showed itself: when a fourth battery fault appeared, one glance at returns inwards revealed the trend — and traced it upstream to a single November consignment. Bury returns inside sales and that warning light never comes on.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Returns inwards = goods back from customers = deducted from sales. Keep the account separate and watch its trend — a rising number is your products speaking to you.</p>
</div>`,
      quiz:{q:'How are returns inwards treated when calculating gross profit?', opts:['Added to purchases', 'Deducted from sales', 'Added to cost of goods sold directly', 'Ignored, since the goods are now back in stock'], ans:1, exp:'Returns inwards (goods customers send back) are deducted from sales revenue when calculating gross profit — the original sale is effectively partly reversed.'}
    },
    {id:52, term:'Returns Outwards', duration:'5 min', pips:2,
      definition:`Goods previously bought from suppliers that have been returned by the business — also called purchases returns. They are deducted from purchases when calculating the cost of goods sold.`,
      scenario:`The battery pattern had a source, and Amaka traced it: a batch of chargers and two phone models from Big Sam Distributions, all from the same November consignment. She packed the faulty units, obtained Big Sam's grudging agreement, and sent them back across Lagos. "And now the mirror entry," said Aunty Florence, opening the books. "Returns outwards — goods YOU return to YOUR suppliers. Deducted from purchases at year end, just as returns inwards is deducted from sales." Amaka enjoyed the symmetry: the trading account would now reflect only goods genuinely kept and genuinely sold. But Aunty Florence pressed the practical point harder. "Record the return the day the goods leave, and chase the credit note until it is in your hand. A supplier's memory of goods received back is the shortest memory in commerce. Your returns outwards account is not just bookkeeping — it is your evidence file." Big Sam's credit note arrived eleven days and three reminders later. The account had every date ready.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Returns outwards</strong> (purchases returns) are goods <em>you</em> send back to <em>your</em> suppliers. The mirror of returns inwards: recorded in their own account and <strong>deducted from purchases</strong> when computing the cost of goods sold.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Sending the Fault Back Upstream</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Account</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>Big Sam Distributions (creditor)</td><td>240,000</td><td></td></tr>
      <tr><td>Returns outwards</td><td></td><td>240,000</td></tr>
      <tr><td colspan="3" style="font-size:0.8rem;color:var(--muted);font-style:italic;">Being: faulty chargers and two phone models returned to supplier — November consignment battery defect. Credit note requested.</td></tr>
    </tbody>
  </table></div>
  <p>The debit reduces what Amaka owes Big Sam; the credit ensures the trading account counts only goods genuinely kept. And the practical discipline mattered as much as the entry: record the return the day the goods leave, then chase the credit note until it is physically in hand. Big Sam's arrived eleven days and three reminders later — and the account had every date ready as evidence.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Returns outwards = goods back to suppliers = deducted from purchases. The account is your evidence file — record on the day of return, and treat an unreceived credit note as an open wound.</p>
</div>`,
      quiz:{q:'How are returns outwards treated when calculating cost of goods sold?', opts:['Added to sales', 'Deducted from purchases', 'Added to closing stock', 'Ignored, since the supplier already has the goods back'], ans:1, exp:'Returns outwards (goods sent back to suppliers) are deducted from purchases — the original purchase is effectively partly reversed when calculating cost of goods sold.'}
    },
    {id:53, term:'Revenue', duration:'5 min', pips:2,
      definition:`The financial value of goods and services that a business has supplied to its customers during a period — the starting point for calculating profit.`,
      scenario:`As December opened, Amaka totalled the year's takings so far and showed Aunty Florence the figure with quiet pride: everything the shop had earned from serving its customers. "Your revenue," the older woman said. "The financial value of the goods and services you supplied during the period — the top line, the starting point of every profit calculation." She was careful with the edges of the definition. "Revenue is what you EARNED by trading — not every naira that wandered into the till. The bank loan was not revenue. The soldier's deposit was not revenue until his phone was delivered. And revenue is not profit — it is the gross river before every cost drinks from it." She sketched the waterfall: revenue at the top, cost of goods sold taken out, expenses taken out, profit at the bottom. "People boast about revenue because it is the biggest number they have. You will learn to respect it differently — as the measure of how much the street trusted you this year with its money."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Revenue</strong> is the financial value of the goods and services a business supplied to customers during a period — the top line, the starting point of every profit calculation. It measures how much the market trusted you with its money this period.</p>
  <p>The edges of the definition matter as much as its centre: revenue is what you <em>earned by trading</em> — not every naira that entered the till.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — What Counts and What Does Not</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Money in</th><th>Revenue?</th><th>Why</th></tr></thead>
    <tbody>
      <tr><td>Phone sales (cash and credit)</td><td>Yes</td><td>Goods supplied to customers</td></tr>
      <tr><td>Bank loan ₦250,000</td><td>No</td><td>Borrowed — a liability, not earned</td></tr>
      <tr><td>Soldier's deposit (before delivery)</td><td>No</td><td>Not yet realised — a liability until the phone is supplied</td></tr>
      <tr><td>Sale of old cabinet</td><td>No</td><td>Disposal of an asset, not trading</td></tr>
    </tbody>
  </table></div>
  <p>And revenue is not profit — it is the gross river before every cost drinks from it: cost of goods sold first, then the expenses, with profit whatever survives at the bottom of the waterfall. People boast about revenue because it is the biggest number they have; the trained eye respects it differently, as the top of a structure whose bottom line is the verdict.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Revenue = value of goods and services supplied, recognised when earned. Loans, deposits and asset disposals never qualify. Big top line, yes — but the waterfall decides what it was worth.</p>
</div>`,
      quiz:{q:'What does revenue represent?', opts:['The cash a business has in the bank', 'The financial value of goods and services supplied to customers during a period', 'The amount owed to suppliers', 'The profit remaining after all expenses'], ans:1, exp:'Revenue is the value of goods and services supplied to customers during a period — the starting point from which expenses are deducted to eventually arrive at profit.'}
    },
    {id:54, term:'Sales', duration:'5 min', pips:2,
      definition:`In accounting, the income from selling the goods which the business normally deals in and which were bought with the intention of resale — not the disposal of other assets such as vehicles.`,
      scenario:`In mid-December Amaka finally replaced the original display cabinet — Mrs. Adeyemi's, the one from the very first morning — with a larger glass unit. A neighbouring trader bought the old cabinet for ₦70,000 cash. Amaka, festive and moving fast, recorded it under Sales. Aunty Florence found it during the weekly review and circled it. "Sales — in the accounting sense — means income from selling the goods you actually trade in. Phones, cases, chargers: the things bought for resale. That cabinet was a fixed asset. Disposing of it is the sale of an asset, recorded through the asset's own account — never through Sales." Amaka asked what harm one cabinet could do. "It inflates your trading revenue with something that is not trading. Your gross profit margin — the number taped inside your till — would lie to you this month. Sales is a measure of your trade, and it stays pure only if you guard its gate." The ₦70,000 moved to its proper home, and the margin on the till card stayed honest.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>In accounting, <strong>Sales</strong> means income from selling the goods the business normally trades in — the goods bought for resale. Disposing of anything else — a cabinet, a vehicle, old equipment — is the <strong>sale of an asset</strong>, recorded through the asset's own account, never through Sales.</p>
  <p>Sales is the mirror of Purchases: both words, in the books, belong exclusively to the goods of the trade.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Cabinet That Was Not a Sale</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>December income</th><th>₦</th><th>Home in the books</th></tr></thead>
    <tbody>
      <tr><td>Phones and accessories sold</td><td>1,880,000</td><td>Sales</td></tr>
      <tr><td>Old display cabinet to neighbouring trader</td><td>70,000</td><td>Disposal of fixed asset</td></tr>
    </tbody>
  </table></div>
  <p>What harm could one cabinet do inside Sales? It inflates trading revenue with something that is not trading. December's gross margin — the number taped inside the till — would read falsely strong, and any comparison with November would be corrupted. Sales stays meaningful only if its gate is guarded: goods of the trade, nothing else.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Sales = the goods you trade in, full stop. Asset disposals go through the asset's account (any profit or loss on disposal is shown separately). Guard the gate and the margin card stays honest.</p>
</div>`,
      quiz:{q:'Which of these would be recorded as \'sales\' in a kiosk\'s accounts?', opts:['Selling an old delivery motorcycle no longer needed', 'Selling phone cases, the kiosk\'s normal trading stock', 'Selling a display cabinet being replaced', 'Receiving a loan from the bank'], ans:1, exp:'Sales specifically refers to income from selling the goods a business normally trades in. Selling other assets like a motorcycle or cabinet is a separate type of transaction, not sales.'}
    },
    {id:55, term:'Separate Determination Concept', duration:'5 min', pips:2,
      definition:`The principle that the value of each individual asset or liability must be assessed on its own, before being added together into a total — potential gains and losses should not simply be netted off against each other.`,
      scenario:`Preparing for the year-end valuation, Amaka faced a puzzle in her stock list. One phone model had surged in demand — units she had bought at ₦85,000 now sold everywhere for ₦110,000. Another model had flopped; bought at ₦95,000, it would struggle to fetch ₦70,000. Netted together, she reasoned, the good news roughly covered the bad — leave both at cost? Aunty Florence shook her head slowly. "Separate determination. Each asset is valued on its own merits before anything is totalled — gains on one item never excuse losses on another." The rule, she explained, works hand in hand with prudence: "The flopped model must come down to what it will actually realise — recognise the loss now. The strong model stays at cost — its profit is recognised only when it sells. You may not decorate a loss with an unrealised gain." Amaka revalued the slow stock downward, item by item, and left the winners waiting to prove themselves at the till, where all profit is finally decided.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>separate determination concept</strong>: each individual asset or liability is valued <em>on its own merits</em> before anything is totalled. Gains on one item may never be netted against losses on another — hopes cannot decorate wounds.</p>
  <p>It works hand in hand with prudence: known losses are recognised item by item, while unrealised gains wait for the till.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Two Models, Two Verdicts</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Stock line</th><th>Cost (₦)</th><th>Would fetch (₦)</th><th>Valued at</th></tr></thead>
    <tbody>
      <tr><td>Model A (demand surged)</td><td>85,000</td><td>110,000</td><td>85,000 — cost; gain waits to be realised</td></tr>
      <tr><td>Model B (flopped)</td><td>95,000</td><td>70,000</td><td>70,000 — written down; loss known now</td></tr>
    </tbody>
  </table></div>
  <p>The tempting shortcut — "the good news roughly covers the bad, leave both at cost" — smuggles an unrealised profit into the books to hide a real loss. Determined separately, the loss is recognised immediately (prudence) and the winner proves itself only at the point of sale (realisation). Item by item is more work; it is also the only version that tells the truth.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Value each item on its own; total afterwards. Never net a hoped-for gain against a known loss — the stock sheet is a row of individual verdicts, not one blended excuse.</p>
</div>`,
      quiz:{q:'What does the separate determination concept prevent?', opts:['Recording any losses at all', 'Simply netting off potential gains and losses against each other instead of assessing each item individually', 'Combining similar items into one account', 'Recording assets at historical cost'], ans:1, exp:'Separate determination requires each asset or liability to be assessed on its own merits — netting a probable gain against a probable loss to show one combined figure would hide important information.'}
    },
    {id:56, term:'Stock', duration:'5 min', pips:2,
      definition:`Goods held by a business with the intention of resale. The value of unsold stock at the end of a period is needed to calculate the cost of goods sold and appears as a current asset on the balance sheet.`,
      scenario:`On the 31st of December, Amaka closed the shop early, sent out for suya, and began the year-end stocktake with Chidi. Shelf by shelf, carton by carton: every phone checked against the list, every case counted, every charger tested and tallied. It took four hours. "Why the ceremony?" Chidi asked, somewhere in hour three. "Because stock is the hinge of the whole year's result," Amaka answered — and realised she was quoting Aunty Florence without needing her in the room. "This closing figure gets subtracted in the cost of goods sold. Count too high and the year's profit inflates falsely; count too low and we punish ourselves. And this same number appears on the balance sheet as a current asset. One count, two statements — it has to be right." They found a carton of screen guards missing from the list and two phones listed that had been display units all along. Corrections made, the final figure was signed by both counters. Outside, fireworks were already testing the sky.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Stock</strong> is goods held for resale. Its closing value does double duty: subtracted in the cost of goods sold (driving the period's profit) and shown on the balance sheet as a current asset. One count, two statements — which is why the year-end stocktake is a ceremony, not a chore.</p>
  <p>Valuation follows prudence: the lower of cost and net realisable value, determined item by item.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Why the Count Must Be Right</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>If closing stock is…</th><th>Effect on COGS</th><th>Effect on profit</th></tr></thead>
    <tbody>
      <tr><td>Overstated by ₦100,000</td><td>Understated ₦100,000</td><td>Overstated ₦100,000 — false comfort</td></tr>
      <tr><td>Understated by ₦100,000</td><td>Overstated ₦100,000</td><td>Understated ₦100,000 — self-punishment</td></tr>
    </tbody>
  </table></div>
  <p>Amaka's New Year's Eve count caught both directions in miniature: a carton of screen guards missing from the list (stock understated) and two display units wrongly listed as saleable stock (overstated). Corrected and signed by both counters, the final figure carried the year's profit on its back — and, because closing stock becomes next year's opening stock, the error would otherwise have echoed into year two as well.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Count it physically, value it at the lower of cost and what it will fetch, have two people sign it. Closing stock is the hinge of the year's result — and tomorrow's opening stock. An error here lies twice.</p>
</div>`,
      quiz:{q:'Why does a business need to know the value of its closing stock?', opts:['To calculate how much tax is owed', 'Because it\'s needed to calculate cost of goods sold and appears as a current asset on the balance sheet', 'Because stock cannot be sold once counted', 'To determine the owner\'s capital directly'], ans:1, exp:'Closing stock value feeds into the cost of goods sold calculation and is shown separately as a current asset on the balance sheet — it plays a role in both major financial statements.'}
    },
    {id:57, term:'Substance Over Form', duration:'5 min', pips:2,
      definition:`The principle that a transaction should be accounted for according to its real economic effect, even if this differs from its strict legal form.`,
      scenario:`Reviewing the year's contracts, Amaka reread the POS machine agreement and noticed its language for the first time: a 'rental' of ₦12,500 monthly for twenty-four months — after which the machine became hers for a token ₦1,000. She had been treating it as rent expense. Aunty Florence read the document twice. "The paper says rental. The economics say purchase by instalments — you carry the machine's risks, you enjoy its rewards, and ownership is guaranteed for pocket change at the end. Substance over form: we account for the real economic effect of a transaction, not the costume its legal wording wears." They restated it: the machine onto the books as an asset, the future instalments as a liability. Amaka asked why any drafter would dress a purchase as a rental. "Many reasons — some innocent, some designed to keep debts off balance sheets. Which is precisely why this principle exists. An accountant's loyalty is to what happened, not to what the paperwork prefers to call it."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Substance over form</strong>: transactions are accounted for according to their real economic effect, not the label their legal paperwork wears. When the document says one thing and the economics say another, the books follow the economics.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The "Rental" That Was a Purchase</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>The paper said</th><th>The economics said</th></tr></thead>
    <tbody>
      <tr><td>"Rental" of ₦12,500 monthly, 24 months</td><td>Instalment payments totalling ₦300,000</td></tr>
      <tr><td>Machine remains the provider's</td><td>Amaka bears the risks, enjoys the rewards</td></tr>
      <tr><td>Option to buy for ₦1,000 at the end</td><td>Ownership guaranteed for pocket change</td></tr>
    </tbody>
  </table></div>
  <p>Restated on substance: the POS machine onto the books as a fixed asset, the outstanding instalments as a liability — a purchase by instalments wearing a rental costume. Why would drafting dress it up? Sometimes innocently; sometimes precisely to keep debt off a balance sheet. Which is exactly why the principle exists: an accountant's loyalty is to what happened, not to what the paperwork prefers to call it.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Ask who bears the risks and enjoys the rewards — that is the owner in substance, whatever the contract's vocabulary. Account for the reality; footnote the costume.</p>
</div>`,
      quiz:{q:'What does the substance over form principle prioritise?', opts:['The strict legal wording of an agreement', 'The real economic effect of a transaction, even if it differs from its legal form', 'Whichever treatment results in lower tax', 'The preference of whoever drafted the contract'], ans:1, exp:'Substance over form looks past the legal label of a transaction to its real economic effect — what\'s actually happening financially matters more than how it\'s formally described.'}
    },
    {id:58, term:'T-Account', duration:'5 min', pips:2,
      definition:`The traditional layout for an individual account in the accounting books, drawn as a large letter 'T' with the account title across the top, debit entries on the left and credit entries on the right.`,
      scenario:`In the quiet week before New Year, a neighbour's daughter, Ngozi, came to ask about weekend work — the shop was growing and Amaka needed another pair of hands. Chidi, eighteen months from his own first blunders, was assigned to teach her the books. Amaka watched from the counter as he drew a large T on a fresh page, exactly as Aunty Florence once had. "This is a T-account," he began. "The account name goes across the top. The left side is debit, the right side is credit. Every account in these books — cash, sales, rent, Tunde's account — is just one of these Ts." He recorded a sample sale in two Ts, one debit, one credit, and made Ngozi balance a toy cash account until the c/d figure clicked. "It looks like a child's drawing," Chidi told her, "but every accounting system in the world — even the software in the big banks — is this T, multiplied by a million." Amaka said nothing, and texted Aunty Florence: the teaching has a grandchild now.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>T-account</strong> is the traditional layout of an individual account: the account name across the top, <strong>debits on the left, credits on the right</strong>. Every account in any set of books — cash, sales, rent, a debtor's card — is one of these Ts. Even the software running the big banks is, underneath, this same T multiplied by a million.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Chidi's Lesson to Ngozi</h3>
  <p>One cash sale of ₦20,000, recorded across two Ts:</p>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th colspan="2">Cash account</th><th colspan="2">Sales account</th></tr></thead>
    <tbody>
      <tr><td>Dr: Sales 20,000</td><td></td><td></td><td>Cr: Cash 20,000</td></tr>
    </tbody>
  </table></div>
  <p>Two Ts, one transaction, one debit and one equal credit — each entry naming the other account as its cross-reference. Then the month-end ritual the Ts make visible: total both sides, insert the balance c/d on the smaller side, rule off, bring the balance down. Ngozi balanced a toy cash account until the c/d clicked — the same click Chidi remembered, and Amaka before him, and Aunty Florence decades before that.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Name on top, debit left, credit right. Master this one drawing and you can read any ledger ever kept — the T is the atom of the entire system.</p>
</div>`,
      quiz:{q:'In a T-account, where are debit entries recorded?', opts:['On the right-hand side', 'On the left-hand side', 'Across the top', 'Underneath the account title only'], ans:1, exp:'In the traditional T-account layout, debit entries go on the left-hand side and credit entries go on the right-hand side.'}
    },
    {id:59, term:'Time Interval Concept', duration:'5 min', pips:2,
      definition:`The principle that financial statements are prepared for fixed, regular periods of time — typically a year for external reporting, though management may use shorter periods internally.`,
      scenario:`Over New Year tea, Aunty Florence asked Amaka a deceptively simple question: "When does your business's year end?" Amaka laughed — it ends when the year ends, surely? "By convention, yes — many choose the 31st of December. But the principle underneath is the time interval concept: financial statements are prepared for fixed, regular periods, so results can be compared like with like. A year for the formal statements; and internally, you have already been living the concept — every month you close the books, draw the figures, and compare against the month before." She explained the discipline hiding in the regularity: "A trader who measures 'whenever things feel slow' can convince himself of anything. Fixed intervals remove the choice. December must face December; this year must stand against last year, same length, same rules. Time interval is what turns your accounts from a diary into an instrument." They settled it formally over the teacups: Amaka Phones' accounting year would end every 31st of December — a birthday for the books, one day before everyone else's.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>time interval concept</strong>: financial statements are prepared for fixed, regular periods — typically a year for formal reporting, with shorter internal intervals (monthly, quarterly) for management. Regularity is the point: results can only be compared like with like.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Discipline of Fixed Periods</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Interval</th><th>Purpose in Amaka Phones</th></tr></thead>
    <tbody>
      <tr><td>Monthly (internal)</td><td>Close the books, compute the margin, compare against last month — the habit that caught May's pricing and July's costs</td></tr>
      <tr><td>Yearly to 31 December (formal)</td><td>Full statements: the trading and P&amp;L account and balance sheet the bank and the tax office will read</td></tr>
    </tbody>
  </table></div>
  <p>The hidden value is psychological: a trader who measures "whenever things feel slow" can convince himself of anything. Fixed intervals remove the choice — December must face December, this year must stand against last year, same length, same rules. That is what turns accounts from a diary into an instrument.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Pick the interval, keep the interval. Compare only like with like. The accounting year needs a fixed birthday — Amaka Phones chose the 31st of December — and every period ends when the calendar says, not when the mood does.</p>
</div>`,
      quiz:{q:'What does the time interval concept establish?', opts:['That financial statements should only ever be prepared once, when a business closes', 'That financial statements are prepared for fixed, regular periods of time', 'That all businesses must report monthly', 'That profit can only be measured over multi-year periods'], ans:1, exp:'The time interval concept establishes that financial statements are prepared for fixed, regular periods — typically a year externally, though businesses often use shorter periods for internal management purposes.'}
    },
    {id:60, term:'Trading Account', duration:'5 min', pips:2,
      definition:`The section of the trading and profit and loss account in which gross profit (or gross loss) is calculated, by deducting the cost of goods sold from sales revenue.`,
      scenario:`The first working day of January, Aunty Florence arrived with her old ruler and declared it statement week. They began with the trading account for the full year. Sales at the top — with returns inwards deducted to leave true net sales. Then the cost of goods sold, assembled piece by piece from the year's records: opening stock from last January's very first count, plus the year's purchases, plus carriage inwards, minus returns outwards, minus the closing stock signed off on New Year's Eve. The subtraction at the bottom revealed the year's gross profit — and Amaka read the number twice, because it was larger than she had dared guess. "This section answers one question only," said Aunty Florence. "Did the buying and selling of goods — the pure trade — generate a margin? Every figure in it has been marching toward this page all year: every count, every return, every delivery fee. The trading account is where twelve months of small discipline is paid out at once."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>trading account</strong> is the first chamber of the year-end statement: net sales at the top, the full cost of goods sold assembled beneath, and <strong>gross profit</strong> revealed by the subtraction. It answers exactly one question: did the buying and selling of goods — the pure trade — generate a margin?</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka Phones, Year to 31 December</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Trading account</th><th>₦</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Sales</td><td></td><td>17,250,000</td></tr>
      <tr><td>Less: Returns inwards</td><td></td><td>(310,000)</td></tr>
      <tr><td><strong>Net sales</strong></td><td></td><td><strong>16,940,000</strong></td></tr>
      <tr><td>Opening stock</td><td>800,000</td><td></td></tr>
      <tr><td>Add: Purchases</td><td>12,600,000</td><td></td></tr>
      <tr><td>Add: Carriage inwards</td><td>96,000</td><td></td></tr>
      <tr><td>Less: Returns outwards</td><td>(240,000)</td><td></td></tr>
      <tr><td>Less: Closing stock</td><td>(1,150,000)</td><td></td></tr>
      <tr><td><strong>Cost of goods sold</strong></td><td></td><td><strong>(12,106,000)</strong></td></tr>
      <tr class="table-total"><td><strong>Gross profit</strong></td><td></td><td><strong>4,834,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Every line has been marching toward this page all year: the Day-1 stock, every consignment and its van fee, the school's returned phones, Big Sam's credit note, the New Year's Eve count. The trading account is where twelve months of small discipline is paid out at once.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Net sales minus full COGS (opening stock + purchases + carriage inwards − returns outwards − closing stock) = gross profit. One chamber, one question: does the trade itself earn a margin?</p>
</div>`,
      quiz:{q:'What is calculated in the trading account section?', opts:['Net profit, after all expenses', 'Gross profit, by deducting cost of goods sold from sales', 'The owner\'s total capital', 'Cash held at the bank'], ans:1, exp:'The trading account section calculates gross profit (or gross loss) by deducting the cost of goods sold from sales revenue — the first step before other expenses are considered.'}
    },
    {id:61, term:'Trading and Profit and Loss Account', duration:'5 min', pips:2,
      definition:`A financial statement combining the trading account and the profit and loss account, showing how a business arrived at its net profit or net loss for a period.`,
      scenario:`With the trading section ruled off, they built downward: the full trading and profit and loss account, the year's complete performance on a single page. Gross profit brought down from above. Then every expense of the year in ordered ranks — rent, Chidi's and now Ngozi's wages, electricity, generator fuel, carriage outwards, bank charges, the small repairs — each deducted in turn. The final line: net profit for the year. Amaka sat back and read the whole document top to bottom, and the year replayed itself inside the figures — the May promotion bleeding in the margins, June's correction, July's floods hiding in the fuel line, the strong final quarter carrying the total upward. "One statement, two chambers, twelve months," said Aunty Florence. "Show this page to any accountant, any banker, anywhere, and they can read your year the way you just did. That is the power of the form — it turns your story into a language every serious reader speaks." The net profit moved to capital, and the page was ruled closed.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>trading and profit and loss account</strong> is the complete performance statement: the trading account above (gross profit) and the profit and loss account below (net profit), on a single page covering the full period. Shown to any accountant or banker anywhere, it reads the same way — that universality is the power of the form.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Whole Year on One Page</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Year to 31 December</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Gross profit (trading section)</td><td>4,834,000</td></tr>
      <tr><td>Less: Rent</td><td>(600,000)</td></tr>
      <tr><td>Less: Wages (Chidi, then Ngozi)</td><td>(430,000)</td></tr>
      <tr><td>Less: Electricity &amp; generator fuel</td><td>(510,000)</td></tr>
      <tr><td>Less: Carriage outwards, repairs, charges, sundry</td><td>(1,390,000)</td></tr>
      <tr class="table-total"><td><strong>Net profit for the year</strong></td><td><strong>1,904,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Amaka could re-read her whole year inside these figures — the May promotion bleeding in the margins, June's correction, July's floods hiding in the fuel line, the strong final quarter carrying the total. The net profit's destination: the capital account, closing the loop between performance and the owner's stake.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Two chambers, one document, twelve months: engine first, then everything it must carry. Read top to bottom and any trained reader can diagnose the business the way a doctor reads a chart.</p>
</div>`,
      quiz:{q:'What does the trading and profit and loss account show overall?', opts:['Only the assets and liabilities of a business', 'How a business arrived at its net profit or net loss for a period', 'A list of all customers who owe money', 'The cash balance at a single point in time'], ans:1, exp:'The trading and profit and loss account combines both stages — gross profit calculation and then net profit calculation — to show the full journey from sales revenue down to the final net profit or loss.'}
    },
    {id:62, term:'Trial Balance', duration:'5 min', pips:2,
      definition:`A list of all the account balances in a business's ledgers at a particular date, arranged into debit and credit columns. If double entry has been carried out correctly, the two columns will total the same amount.`,
      scenario:`Before the statements could be trusted, one ritual remained — the one Amaka had feared since Aunty Florence first described it. The trial balance: every single account in the books listed with its balance, debits in one column, credits in the other. If the year's double entry was sound, two columns built from hundreds of entries would total the same figure to the naira. They extracted the balances together — cash, bank, stock, every debtor, every creditor, sales, purchases, each expense, capital, drawings — and Amaka totalled both columns with her breath held. A difference of ₦18,000. Twenty minutes of hunting found it: a rent payment posted to the debit side twice back in August. Corrected, retotalled — agreement, exact and beautiful. "Understand what this proves and what it does not," said Aunty Florence. "Agreement means the arithmetic of double entry held. It cannot catch an entry posted to the wrong account, or a transaction never recorded at all. The trial balance is a strong gate, not an all-seeing eye. But no statement should ever be built on books that cannot pass it."`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p>The <strong>trial balance</strong> lists every account's balance at a date — debits in one column, credits in the other. If the double entry has been carried out correctly, the two columns total the same figure, because every transaction contributed one debit and one equal credit.</p>
  <p>Know its honest limits: agreement proves the <em>arithmetic</em> held. It cannot catch a transaction never recorded, an entry posted to the wrong account, or compensating errors. A strong gate — not an all-seeing eye.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — The Year-End Ritual</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>Extract</th><th>Dr (₦)</th><th>Cr (₦)</th></tr></thead>
    <tbody>
      <tr><td>Cash, bank, stock, debtors, fixed assets, purchases, expenses, drawings</td><td>21,486,000</td><td></td></tr>
      <tr><td>Sales, returns outwards, creditors, loan, capital</td><td></td><td>21,486,000</td></tr>
      <tr class="table-total"><td><strong>Totals</strong></td><td><strong>21,486,000</strong></td><td><strong>21,486,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>First attempt: a difference of ₦18,000 — hunted for twenty minutes and found: an August rent payment posted to the debit side twice. Corrected, retotalled — exact agreement, and only then were the statements built. No statement should ever stand on books that cannot pass this gate.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Extract every balance, total both columns, agree to the naira <em>before</em> preparing statements. Agreement proves the arithmetic — stay humble about what it cannot see.</p>
</div>`,
      quiz:{q:'What does a trial balance check?', opts:['Whether the business made a profit', 'Whether the debit and credit columns of all account balances total the same amount', 'Whether all customers have paid what they owe', 'Whether stock has been correctly counted'], ans:1, exp:'A trial balance lists every account balance into debit and credit columns — if double entry has been done correctly, both columns will total the same amount, which is a useful (though not foolproof) check.'}
    },
    {id:63, term:'Working Capital', duration:'5 min', pips:2,
      definition:`The amount by which current assets exceed current liabilities — a measure of the short-term resources a business has available for its day-to-day operations. Also called net current assets.`,
      scenario:`When the statements were finished and filed, Aunty Florence asked for one last calculation before the tea went cold. "Current assets, minus current liabilities." Amaka worked it: stock, debtors, bank and cash on one side; Big Sam's account, the loan instalments due within the year on the other. The difference — comfortably positive — sat on the page between them. "Your working capital," said Aunty Florence. "The cushion your business breathes with. Profit is the year's verdict; working capital is tomorrow morning's reality — whether you can restock, absorb a slow fortnight, survive a supplier arriving early or a debtor paying late." Amaka looked at the figure and understood it was the true answer to the question she had asked on that first Monday morning, standing in an empty shop with a knot in her stomach: how do I know where I stand? "Now," said Aunty Florence, lifting her cup toward the shelves, the new cabinet, the ledgers, the year, "you begin year two — and this time, you keep the books from day one." Amaka raised her own cup. She already had the first page ruled.`,
      votes:{up:0, down:0},
      content:`<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Concept</h3>
  <p><strong>Working capital</strong> (net current assets) is current assets minus current liabilities — the cushion the business breathes with. Profit is the year's verdict on the past; working capital is tomorrow morning's reality: can you restock, absorb a slow fortnight, survive a supplier arriving early or a debtor paying late?</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">Worked Example — Amaka's Year-End Cushion</h3>
  <div class="lesson-table-wrap"><table class="lesson-table">
    <thead><tr><th>As at 31 December</th><th>₦</th></tr></thead>
    <tbody>
      <tr><td>Stock</td><td>1,150,000</td></tr>
      <tr><td>Debtors</td><td>130,000</td></tr>
      <tr><td>Bank</td><td>460,000</td></tr>
      <tr><td>Cash</td><td>55,000</td></tr>
      <tr><td><strong>Current assets</strong></td><td><strong>1,795,000</strong></td></tr>
      <tr><td>Less: Creditors (Big Sam)</td><td>(380,000)</td></tr>
      <tr><td>Less: Loan instalments due within the year</td><td>(125,000)</td></tr>
      <tr class="table-total"><td><strong>Working capital</strong></td><td><strong>1,290,000</strong></td></tr>
    </tbody>
  </table></div>
  <p>Current assets cover current liabilities more than three times over — year two begins on a cushion, not a cliff edge. And notice which question this figure finally answers: the one from the first Monday morning, standing in an empty shop with a knot in the stomach — <em>how do I know where I stand?</em> Now the books answer it, to the naira, on demand.</p>
</div>

<div class="lesson-content-section">
  <h3 class="lesson-content-heading">The Rule to Remember</h3>
  <p>Working capital = current assets − current liabilities. Watch it monthly alongside profit: profit measures success; working capital measures survival. A business needs both — and now you can compute both. Year two begins; keep the books from day one.</p>
</div>`,
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
