// ============================================================
// sales-module.js — Sales module for Butterfly Dynamix Bookkeeping
// Customers · Invoices · Quotes · Payments · AR Aging · Dashboard
// Lazy-loaded on demand (see loadScriptOnce in bookkeeping-app.js) —
// depends on globals already defined there: bkDb, bkUser,
// activeBusiness, bizMatch(), escH(), staffIncomeAccount(),
// setSaveMsg(), closeBkMenu(), bdSaveRoute(), staffHideChrome().
// ============================================================

let salesCustomers      = [];
let salesInvoices       = [];
let salesQuotes         = [];
let currentInvoiceItems = [];
let currentQuoteItems   = [];
let editingInvoiceId    = null;
let editingQuoteId      = null;
const DEFAULT_VAT_RATE  = 7.5; // Nigerian standard VAT — change per business later if needed

// ── LEDGER HELPERS ───────────────────────────────────────────
// Makes sure an account row exists in bk_accounts before we try to post
// to it. Unlike the existing quick-sale poster (which silently skips a
// side of the entry if the account is missing), this creates it —
// so a first-ever invoice's VAT never silently vanishes from the books.
async function ensureAccountExists(name, recordType) {
  const { data } = await bkDb.from('bk_accounts')
    .select('id').eq('user_id', bkUser.id).eq('account_name', name).maybeSingle();
  if (data) return data.id;
  const { data: created, error } = await bkDb.from('bk_accounts')
    .insert({ user_id: bkUser.id, account_name: name, record_type: recordType, opening_balance: 0 })
    .select('id').single();
  if (error) { console.error('ensureAccountExists failed for', name, error); return null; }
  return created.id;
}

async function getLastAccountBalance(acctName) {
  const { data } = await bkDb.from('bk_transactions')
    .select('balance').match(bizMatch()).eq('account_name', acctName)
    .order('created_at', { ascending: false }).limit(1);
  return parseFloat(data?.[0]?.balance) || 0;
}

// Posts one balanced debit/credit pair to bk_journal + bk_transactions.
// Mirrors the exact shape autoPostSaleRow() already uses elsewhere in
// this app, so invoice-driven postings look identical to quick-sale
// postings in the ledger and reports.
async function postJournalPair({ date, narration, debitAccount, debitType, creditAccount, creditType, amount, bizId, invoiceId }) {
  if (!amount || amount <= 0) return null;

  const { data: jnl, error: jErr } = await bkDb.from('bk_journal').insert({
    user_id: bkUser.id, business_id: bizId, txn_date: date, narration,
    debit_account_name: debitAccount, debit_record_type: debitType,
    credit_account_name: creditAccount, credit_record_type: creditType,
    debit_amount: amount, credit_amount: amount, created_at: new Date().toISOString(),
  }).select().single();
  if (jErr || !jnl) { console.error('postJournalPair: journal insert failed', jErr); return null; }

  await Promise.all([
    ensureAccountExists(debitAccount, debitType),
    ensureAccountExists(creditAccount, creditType),
  ]);

  const [debitLastBal, creditLastBal] = await Promise.all([
    getLastAccountBalance(debitAccount),
    getLastAccountBalance(creditAccount),
  ]);

  const txns = [
    { user_id: bkUser.id, journal_id: jnl.id, record_type: debitType, account_name: debitAccount,
      txn_date: date, narration, debit: amount, credit: 0, balance: debitLastBal + amount, created_at: new Date().toISOString() },
    { user_id: bkUser.id, journal_id: jnl.id, record_type: creditType, account_name: creditAccount,
      txn_date: date, narration, debit: 0, credit: amount, balance: creditLastBal + amount, created_at: new Date().toISOString() },
  ];
  txns.forEach(t => { if (bizId) t.business_id = bizId; if (invoiceId) t.invoice_id = invoiceId; });
  await bkDb.from('bk_transactions').insert(txns);

  return jnl.id;
}

// Debit Debtors (full total, including VAT) — Credit Sales Revenue
// (subtotal) and, as a second linked entry, Credit VAT Payable (the
// VAT portion). Two entries instead of one because bk_journal only
// supports a single debit/credit account pair per row — see the note
// left in migration_sales_module.sql.
async function postInvoiceToLedger(invoice) {
  const bizId = invoice.business_id || null;
  const narration = `Invoice ${invoice.invoice_number} — ${invoice.customerName || ''}`;
  const incomeAcct = await staffIncomeAccount(invoice.notes || '') || 'Sales Revenue';

  const firstJournalId = await postJournalPair({
    date: invoice.issue_date, narration,
    debitAccount: 'Debtors', debitType: 'asset',
    creditAccount: incomeAcct, creditType: 'income',
    amount: invoice.subtotal, bizId, invoiceId: invoice.id,
  });

  if (invoice.vat_total > 0) {
    await postJournalPair({
      date: invoice.issue_date, narration: narration + ' (VAT)',
      debitAccount: 'Debtors', debitType: 'asset',
      creditAccount: 'VAT Payable', creditType: 'liability',
      amount: invoice.vat_total, bizId, invoiceId: invoice.id,
    });
  }

  return firstJournalId;
}

// Debit Cash/Bank — Credit Debtors. Reduces what the customer owes and
// records the cash actually received, same account-selection logic as
// autoPostSaleRow's payment-mode mapping elsewhere in this app.
async function postPaymentToLedger(payment, invoice) {
  const bizId = invoice.business_id || null;
  const cashAcct = payment.payment_mode === 'cash' ? 'Cash in Hand' : 'Cash at Bank';
  const narration = `Payment received — Invoice ${invoice.invoice_number}`;
  return postJournalPair({
    date: payment.payment_date, narration,
    debitAccount: cashAcct, debitType: 'asset',
    creditAccount: 'Debtors', creditType: 'asset',
    amount: payment.amount, bizId, invoiceId: invoice.id,
  });
}

// ── DOCUMENT NUMBERING ───────────────────────────────────────
async function getNextDocNumber(table, col, prefix) {
  const { data } = await bkDb.from(table).select(col).match(bizMatch())
    .order('created_at', { ascending: false }).limit(1);
  const last = data?.[0]?.[col] || '';
  const lastNum = parseInt((last.match(/(\d+)$/) || [0, 0])[1], 10) || 0;
  return prefix + '-' + String(lastNum + 1).padStart(4, '0');
}

// ── CUSTOMERS ─────────────────────────────────────────────────
async function showCustomersPage() {
  bdSaveRoute('sales-customers');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading customers…</div>';
  try {
    const { data, error } = await bkDb.from('bk_customers').select('*').match(bizMatch()).order('name');
    if (error) throw error;
    salesCustomers = data || [];
  } catch (e) {
    console.error('showCustomersPage failed', e);
    salesCustomers = [];
  }
  renderCustomersPage();
}

function renderCustomersPage() {
  const rows = salesCustomers.map(c => `
    <tr>
      <td style="padding:10px 12px;font-weight:600;">${escH(c.name)}</td>
      <td style="padding:10px 12px;color:var(--muted);">${escH(c.email || '—')}</td>
      <td style="padding:10px 12px;color:var(--muted);">${escH(c.phone || '—')}</td>
      <td style="padding:10px 12px;">${escH(c.payment_terms)}</td>
      <td style="padding:10px 12px;text-align:right;">
        <button class="bk-btn bk-btn-outline" style="padding:4px 10px;" onclick="showCustomerModal('${c.id}')">Edit</button>
        <button class="bk-btn bk-btn-outline" style="padding:4px 10px;color:var(--red);" onclick="deleteCustomer('${c.id}')">Delete</button>
      </td>
    </tr>`).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header">
      <div>
        <div class="bk-content-title">CUSTOMERS</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">${salesCustomers.length} customer${salesCustomers.length === 1 ? '' : 's'}</div>
      </div>
      <button class="bk-btn bk-btn-gold" onclick="showCustomerModal()">+ New Customer</button>
    </div>
    <div class="bk-sheet-wrap" style="padding:16px 24px;">
      ${salesCustomers.length ? `
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;">
          <th style="padding:6px 12px;">Name</th><th style="padding:6px 12px;">Email</th><th style="padding:6px 12px;">Phone</th><th style="padding:6px 12px;">Terms</th><th></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>` : `<div class="bk-empty">No customers yet — add your first one.</div>`}
    </div>
    <div class="bk-modal-overlay hidden" id="customerModalOverlay">
      <div class="bk-modal">
        <h3 id="customerModalTitle">New Customer</h3>
        <input class="bk-input" type="hidden" id="custId"/>
        <div class="bk-field"><label class="bk-label">Name</label><input class="bk-input" type="text" id="custName" placeholder="e.g. Crushed Rock Industries Ltd"/></div>
        <div class="bk-field"><label class="bk-label">Email</label><input class="bk-input" type="email" id="custEmail" placeholder="customer@email.com"/></div>
        <div class="bk-field"><label class="bk-label">Phone</label><input class="bk-input" type="text" id="custPhone" placeholder="080..."/></div>
        <div class="bk-field"><label class="bk-label">Address</label><input class="bk-input" type="text" id="custAddress" placeholder="Optional"/></div>
        <div class="bk-field"><label class="bk-label">Tax ID</label><input class="bk-input" type="text" id="custTaxId" placeholder="Optional"/></div>
        <div class="bk-field"><label class="bk-label">Payment Terms</label>
          <select class="bk-input" id="custTerms">
            <option value="Cash">Cash</option>
            <option value="Net 7">Net 7</option>
            <option value="Net 14">Net 14</option>
            <option value="Net 30" selected>Net 30</option>
            <option value="Net 60">Net 60</option>
          </select>
        </div>
        <div class="bk-field"><label class="bk-label">Credit Limit</label><input class="bk-input" type="number" id="custCreditLimit" placeholder="0" min="0"/></div>
        <div class="bk-modal-actions">
          <button class="bk-btn bk-btn-outline" style="flex:1;" onclick="closeCustomerModal()">Cancel</button>
          <button class="bk-btn bk-btn-gold" style="flex:1;" id="custSaveBtn" onclick="saveCustomer()">Save</button>
        </div>
      </div>
    </div>
  `;
}

function showCustomerModal(id) {
  const overlay = document.getElementById('customerModalOverlay');
  const cust = id ? salesCustomers.find(c => c.id === id) : null;
  document.getElementById('customerModalTitle').textContent = cust ? 'Edit Customer' : 'New Customer';
  document.getElementById('custId').value = cust?.id || '';
  document.getElementById('custName').value = cust?.name || '';
  document.getElementById('custEmail').value = cust?.email || '';
  document.getElementById('custPhone').value = cust?.phone || '';
  document.getElementById('custAddress').value = cust?.address || '';
  document.getElementById('custTaxId').value = cust?.tax_id || '';
  document.getElementById('custTerms').value = cust?.payment_terms || 'Net 30';
  document.getElementById('custCreditLimit').value = cust?.credit_limit || '';
  overlay.classList.remove('hidden');
}

function closeCustomerModal() {
  document.getElementById('customerModalOverlay').classList.add('hidden');
}

async function saveCustomer() {
  const name = document.getElementById('custName').value.trim();
  if (!name) { alert('Customer name is required.'); return; }

  const id = document.getElementById('custId').value;
  const btn = document.getElementById('custSaveBtn');
  btn.textContent = 'Saving…'; btn.disabled = true;

  const payload = {
    user_id: bkUser.id,
    business_id: activeBusiness?.id || null,
    name,
    email: document.getElementById('custEmail').value.trim() || null,
    phone: document.getElementById('custPhone').value.trim() || null,
    address: document.getElementById('custAddress').value.trim() || null,
    tax_id: document.getElementById('custTaxId').value.trim() || null,
    payment_terms: document.getElementById('custTerms').value,
    credit_limit: parseFloat(document.getElementById('custCreditLimit').value) || 0,
    updated_at: new Date().toISOString(),
  };

  try {
    const { error } = id
      ? await bkDb.from('bk_customers').update(payload).eq('id', id)
      : await bkDb.from('bk_customers').insert(payload);
    if (error) throw error;
    closeCustomerModal();
    await showCustomersPage();
  } catch (e) {
    alert('Could not save customer: ' + (e.message || JSON.stringify(e)));
    btn.textContent = 'Save'; btn.disabled = false;
  }
}

async function deleteCustomer(id) {
  const { data: invoicesUsingCust } = await bkDb.from('bk_invoices').select('id').eq('customer_id', id).limit(1);
  if (invoicesUsingCust?.length) {
    alert('This customer has invoices on record and cannot be deleted. You can still edit their details.');
    return;
  }
  if (!confirm('Delete this customer? This cannot be undone.')) return;
  const { error } = await bkDb.from('bk_customers').delete().eq('id', id);
  if (error) { alert('Delete failed: ' + error.message); return; }
  await showCustomersPage();
}

// ── INVOICES: STATUS DISPLAY ─────────────────────────────────
// Overdue is computed at render time (due_date passed + not fully
// paid/void) rather than stored, so it's always accurate with no
// background job needed to flip a stale status.
function displayInvoiceStatus(inv) {
  if (inv.status === 'paid' || inv.status === 'void' || inv.status === 'draft') return inv.status;
  const isOverdue = inv.due_date && new Date(inv.due_date) < new Date(new Date().toDateString());
  if (isOverdue) return 'overdue';
  return inv.status; // sent or partial
}

const STATUS_COLORS = {
  draft:   { bg: '#eaeef4', fg: '#31415c' },
  sent:    { bg: '#eff6ff', fg: '#1d4ed8' },
  partial: { bg: '#fce8d6', fg: '#9a5a1a' },
  paid:    { bg: 'var(--green-l, #d1fae5)', fg: 'var(--green, #1a7a4a)' },
  overdue: { bg: 'var(--red-l, #fee2e2)', fg: 'var(--red, #c0392b)' },
  void:    { bg: '#eaeef4', fg: 'var(--muted)' },
};
function statusBadge(status) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.draft;
  return `<span style="background:${c.bg};color:${c.fg};padding:2px 10px;border-radius:10px;font-size:0.7rem;font-weight:700;text-transform:capitalize;">${status}</span>`;
}

// ── INVOICES: LIST ────────────────────────────────────────────
async function showInvoicesPage(filterStatus) {
  bdSaveRoute('sales-invoices');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading invoices…</div>';
  try {
    const [{ data: invs, error }, { data: custs }] = await Promise.all([
      bkDb.from('bk_invoices').select('*').match(bizMatch()).order('created_at', { ascending: false }),
      bkDb.from('bk_customers').select('id,name').match(bizMatch()),
    ]);
    if (error) throw error;
    const custMap = Object.fromEntries((custs || []).map(c => [c.id, c.name]));
    salesInvoices = (invs || []).map(i => ({ ...i, customerName: custMap[i.customer_id] || 'Unknown customer' }));
  } catch (e) {
    console.error('showInvoicesPage failed', e);
    salesInvoices = [];
  }
  renderInvoicesPage(filterStatus || 'all');
}

function renderInvoicesPage(filterStatus) {
  const visible = filterStatus === 'all'
    ? salesInvoices
    : salesInvoices.filter(i => displayInvoiceStatus(i) === filterStatus);

  const tabs = ['all', 'draft', 'sent', 'partial', 'paid', 'overdue'];
  const tabsHtml = tabs.map(t => `
    <button class="bk-btn ${t === filterStatus ? 'bk-btn-gold' : 'bk-btn-outline'}" style="padding:5px 12px;text-transform:capitalize;"
      onclick="renderInvoicesPage('${t}')">${t}</button>
  `).join('');

  const rows = visible.map(inv => {
    const status = displayInvoiceStatus(inv);
    const balance = (parseFloat(inv.total) || 0) - (parseFloat(inv.amount_paid) || 0);
    return `
    <tr style="cursor:pointer;" onclick="viewInvoice('${inv.id}')">
      <td style="padding:10px 12px;font-weight:600;">${escH(inv.invoice_number)}</td>
      <td style="padding:10px 12px;">${escH(inv.customerName)}</td>
      <td style="padding:10px 12px;color:var(--muted);">${inv.issue_date || '—'}</td>
      <td style="padding:10px 12px;color:var(--muted);">${inv.due_date || '—'}</td>
      <td style="padding:10px 12px;text-align:right;">₦${(parseFloat(inv.total) || 0).toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;color:${balance > 0 ? 'var(--red)' : 'var(--muted)'};">₦${balance.toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;">${statusBadge(status)}</td>
    </tr>`;
  }).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header">
      <div>
        <div class="bk-content-title">INVOICES</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">${visible.length} invoice${visible.length === 1 ? '' : 's'}</div>
      </div>
      <button class="bk-btn bk-btn-gold" onclick="showNewInvoicePage()">+ New Invoice</button>
    </div>
    <div style="padding:12px 24px 0;display:flex;gap:6px;flex-wrap:wrap;">${tabsHtml}</div>
    <div class="bk-sheet-wrap" style="padding:16px 24px;">
      ${visible.length ? `
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;">
          <th style="padding:6px 12px;">Invoice</th><th style="padding:6px 12px;">Customer</th><th style="padding:6px 12px;">Issued</th><th style="padding:6px 12px;">Due</th>
          <th style="padding:6px 12px;text-align:right;">Total</th><th style="padding:6px 12px;text-align:right;">Balance</th><th style="padding:6px 12px;text-align:right;">Status</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>` : `<div class="bk-empty">No invoices${filterStatus !== 'all' ? ' with this status' : ' yet'}.</div>`}
    </div>
  `;
}

// ── INVOICES: BUILDER ────────────────────────────────────────
async function showNewInvoicePage(editId) {
  bdSaveRoute('sales-new-invoice');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading…</div>';

  if (!salesCustomers.length) {
    const { data } = await bkDb.from('bk_customers').select('*').match(bizMatch()).order('name');
    salesCustomers = data || [];
  }

  editingInvoiceId = editId || null;
  let invoice = { customer_id: '', issue_date: new Date().toISOString().slice(0, 10), due_date: '', notes: '' };

  if (editId) {
    const [{ data: inv }, { data: items }] = await Promise.all([
      bkDb.from('bk_invoices').select('*').eq('id', editId).single(),
      bkDb.from('bk_invoice_items').select('*').eq('invoice_id', editId).order('sort_order'),
    ]);
    if (inv) invoice = inv;
    currentInvoiceItems = (items || []).map(it => ({ ...it }));
  } else {
    currentInvoiceItems = [{ description: '', quantity: 1, unit_price: 0, vat_rate: DEFAULT_VAT_RATE }];
  }

  if (!salesCustomers.length) {
    document.getElementById('bkContent').innerHTML = `
      <div class="bk-content-header"><div class="bk-content-title">NEW INVOICE</div></div>
      <div class="bk-empty">You need at least one customer before creating an invoice.
        <br/><button class="bk-btn bk-btn-gold" style="margin-top:12px;" onclick="showCustomerModal();showCustomersPage();">+ Add a customer</button>
      </div>`;
    return;
  }

  renderInvoiceBuilder(invoice);
}

function renderInvoiceBuilder(invoice) {
  const custOptions = salesCustomers.map(c =>
    `<option value="${c.id}" ${c.id === invoice.customer_id ? 'selected' : ''}>${escH(c.name)}</option>`
  ).join('');

  const itemRows = currentInvoiceItems.map((it, i) => `
    <tr>
      <td style="padding:6px;"><input type="text" value="${escH(it.description)}" placeholder="Item description"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;" oninput="currentInvoiceItems[${i}].description=this.value"/></td>
      <td style="padding:6px;width:80px;"><input type="number" value="${it.quantity}" min="0" step="any"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;text-align:right;"
        oninput="currentInvoiceItems[${i}].quantity=parseFloat(this.value)||0;recalcInvoiceTotals()"/></td>
      <td style="padding:6px;width:120px;"><input type="number" value="${it.unit_price}" min="0" step="any"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;text-align:right;"
        oninput="currentInvoiceItems[${i}].unit_price=parseFloat(this.value)||0;recalcInvoiceTotals()"/></td>
      <td style="padding:6px;width:80px;"><input type="number" value="${it.vat_rate}" min="0" step="any"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;text-align:right;"
        oninput="currentInvoiceItems[${i}].vat_rate=parseFloat(this.value)||0;recalcInvoiceTotals()"/></td>
      <td style="padding:6px;width:110px;text-align:right;font-weight:600;" id="invLineTotal_${i}">₦0</td>
      <td style="padding:6px;width:36px;text-align:center;"><button onclick="removeInvoiceLine(${i})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1rem;">✕</button></td>
    </tr>`).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header">
      <div class="bk-content-title">${editingInvoiceId ? 'EDIT INVOICE' : 'NEW INVOICE'}</div>
    </div>
    <div style="padding:16px 24px;max-width:820px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
        <div class="bk-field"><label class="bk-label">Customer</label><select class="bk-input" id="invCustomer">${custOptions}</select></div>
        <div class="bk-field"><label class="bk-label">Due Date</label><input class="bk-input" type="date" id="invDueDate" value="${invoice.due_date || ''}"/></div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;">
          <th style="padding:4px 6px;">Item</th><th style="padding:4px 6px;">Qty</th><th style="padding:4px 6px;">Unit Price</th>
          <th style="padding:4px 6px;">VAT %</th><th style="padding:4px 6px;text-align:right;">Total</th><th></th>
        </tr></thead>
        <tbody id="invItemsBody">${itemRows}</tbody>
      </table>
      <button class="bk-btn bk-btn-outline" onclick="addInvoiceLine()">+ Add line</button>
      <div style="text-align:right;margin-top:16px;font-size:0.85rem;">
        <div style="margin-bottom:4px;color:var(--muted);">Subtotal: <span id="invSubtotal">₦0</span></div>
        <div style="margin-bottom:8px;color:var(--muted);">VAT: <span id="invVatTotal">₦0</span></div>
        <div style="font-size:1.15rem;font-weight:800;">Total: <span id="invGrandTotal">₦0</span></div>
      </div>
      <div class="bk-field" style="margin-top:16px;"><label class="bk-label">Notes</label><textarea class="bk-input" id="invNotes" placeholder="Optional">${escH(invoice.notes || '')}</textarea></div>
      <div style="display:flex;gap:10px;margin-top:16px;justify-content:flex-end;">
        <button class="bk-btn bk-btn-outline" onclick="saveInvoiceAs('draft')" id="invDraftBtn">Save Draft</button>
        <button class="bk-btn bk-btn-gold" onclick="saveInvoiceAs('sent')" id="invSendBtn">${editingInvoiceId ? 'Update & Send' : 'Send Invoice'}</button>
      </div>
    </div>
  `;
  recalcInvoiceTotals();
}

function addInvoiceLine() {
  currentInvoiceItems.push({ description: '', quantity: 1, unit_price: 0, vat_rate: DEFAULT_VAT_RATE });
  renderInvoiceBuilder({
    customer_id: document.getElementById('invCustomer')?.value,
    due_date: document.getElementById('invDueDate')?.value,
    notes: document.getElementById('invNotes')?.value,
  });
}
function removeInvoiceLine(i) {
  if (currentInvoiceItems.length <= 1) { alert('An invoice needs at least one line item.'); return; }
  currentInvoiceItems.splice(i, 1);
  renderInvoiceBuilder({
    customer_id: document.getElementById('invCustomer')?.value,
    due_date: document.getElementById('invDueDate')?.value,
    notes: document.getElementById('invNotes')?.value,
  });
}

function recalcInvoiceTotals() {
  let subtotal = 0, vatTotal = 0;
  currentInvoiceItems.forEach((it, i) => {
    const lineBase = (parseFloat(it.quantity) || 0) * (parseFloat(it.unit_price) || 0);
    const lineVat = lineBase * ((parseFloat(it.vat_rate) || 0) / 100);
    it.line_total = lineBase + lineVat;
    subtotal += lineBase;
    vatTotal += lineVat;
    const cell = document.getElementById('invLineTotal_' + i);
    if (cell) cell.textContent = '₦' + it.line_total.toLocaleString(undefined, { maximumFractionDigits: 2 });
  });
  const total = subtotal + vatTotal;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = '₦' + val.toLocaleString(undefined, { maximumFractionDigits: 2 }); };
  set('invSubtotal', subtotal); set('invVatTotal', vatTotal); set('invGrandTotal', total);
  return { subtotal, vatTotal, total };
}

// ── INVOICES: SAVE / SEND ────────────────────────────────────
async function saveInvoiceAs(targetStatus) {
  const customerId = document.getElementById('invCustomer').value;
  if (!customerId) { alert('Please select a customer.'); return; }
  const validItems = currentInvoiceItems.filter(it => it.description.trim() && (parseFloat(it.unit_price) || 0) >= 0);
  if (!validItems.length) { alert('Add at least one line item with a description.'); return; }

  const btn = document.getElementById(targetStatus === 'draft' ? 'invDraftBtn' : 'invSendBtn');
  const originalText = btn.textContent;
  btn.textContent = 'Saving…'; btn.disabled = true;

  const { subtotal, vatTotal, total } = recalcInvoiceTotals();
  const dueDate = document.getElementById('invDueDate').value || null;
  const notes = document.getElementById('invNotes').value.trim();
  const bizId = activeBusiness?.id || null;

  try {
    let invoiceId = editingInvoiceId;
    let invoiceNumber;
    let wasAlreadySent = false;

    if (invoiceId) {
      const { data: existing } = await bkDb.from('bk_invoices').select('invoice_number,status').eq('id', invoiceId).single();
      invoiceNumber = existing?.invoice_number;
      wasAlreadySent = existing && existing.status !== 'draft';

      const { error } = await bkDb.from('bk_invoices').update({
        customer_id: customerId, due_date: dueDate, notes, subtotal, vat_total: vatTotal, total,
        status: targetStatus, updated_at: new Date().toISOString(),
      }).eq('id', invoiceId);
      if (error) throw error;
      await bkDb.from('bk_invoice_items').delete().eq('invoice_id', invoiceId);
    } else {
      invoiceNumber = await getNextDocNumber('bk_invoices', 'invoice_number', 'INV');
      const { data: created, error } = await bkDb.from('bk_invoices').insert({
        user_id: bkUser.id, business_id: bizId, customer_id: customerId,
        invoice_number: invoiceNumber, issue_date: new Date().toISOString().slice(0, 10),
        due_date: dueDate, notes, subtotal, vat_total: vatTotal, total, status: targetStatus,
      }).select().single();
      if (error) throw error;
      invoiceId = created.id;
    }

    const itemRows = validItems.map((it, i) => ({
      invoice_id: invoiceId, business_id: bizId, description: it.description.trim(),
      quantity: parseFloat(it.quantity) || 0, unit_price: parseFloat(it.unit_price) || 0,
      vat_rate: parseFloat(it.vat_rate) || 0, line_total: it.line_total || 0, sort_order: i,
    }));
    await bkDb.from('bk_invoice_items').insert(itemRows);

    // Only post to the ledger (and deduct stock) the first time an
    // invoice moves out of draft — re-saving an already-sent invoice
    // as "sent" again should not double-post.
    if (targetStatus === 'sent' && !wasAlreadySent) {
      const custName = salesCustomers.find(c => c.id === customerId)?.name || '';
      await postInvoiceToLedger({ id: invoiceId, business_id: bizId, invoice_number: invoiceNumber, customerName: custName, subtotal, vat_total: vatTotal, issue_date: new Date().toISOString().slice(0, 10), notes });
    }

    editingInvoiceId = null;
    currentInvoiceItems = [];
    await showInvoicesPage();
  } catch (e) {
    console.error('saveInvoiceAs failed', e);
    alert('Could not save invoice: ' + (e.message || JSON.stringify(e)));
    btn.textContent = originalText; btn.disabled = false;
  }
}

// ── INVOICES: VIEW + PAYMENT ─────────────────────────────────
async function viewInvoice(id) {
  bdSaveRoute('sales-view-invoice');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading…</div>';

  const [{ data: inv }, { data: items }, { data: cust }, { data: payments }] = await Promise.all([
    bkDb.from('bk_invoices').select('*').eq('id', id).single(),
    bkDb.from('bk_invoice_items').select('*').eq('invoice_id', id).order('sort_order'),
    bkDb.from('bk_invoices').select('customer_id').eq('id', id).single()
      .then(r => r.data ? bkDb.from('bk_customers').select('*').eq('id', r.data.customer_id).single() : { data: null }),
    bkDb.from('bk_payments').select('*').eq('invoice_id', id).order('payment_date', { ascending: false }),
  ]);

  if (!inv) { document.getElementById('bkContent').innerHTML = '<div class="bk-empty">Invoice not found.</div>'; return; }

  const balance = (parseFloat(inv.total) || 0) - (parseFloat(inv.amount_paid) || 0);
  const status = displayInvoiceStatus(inv);
  const itemRows = (items || []).map(it => `
    <tr><td style="padding:8px 6px;">${escH(it.description)}</td>
      <td style="padding:8px 6px;text-align:right;">${it.quantity}</td>
      <td style="padding:8px 6px;text-align:right;">₦${(parseFloat(it.unit_price) || 0).toLocaleString()}</td>
      <td style="padding:8px 6px;text-align:right;">${it.vat_rate}%</td>
      <td style="padding:8px 6px;text-align:right;font-weight:600;">₦${(parseFloat(it.line_total) || 0).toLocaleString()}</td></tr>
  `).join('');
  const paymentRows = (payments || []).map(p => `
    <tr><td style="padding:6px;">${p.payment_date}</td><td style="padding:6px;text-transform:capitalize;">${escH(p.payment_mode)}</td>
      <td style="padding:6px;text-align:right;">₦${(parseFloat(p.amount) || 0).toLocaleString()}</td></tr>
  `).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header">
      <div><div class="bk-content-title">${escH(inv.invoice_number)}</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">${escH(cust?.name || 'Unknown customer')} · ${statusBadge(status)}</div></div>
      <div style="display:flex;gap:8px;">
        ${inv.status === 'draft' ? `<button class="bk-btn bk-btn-outline" onclick="showNewInvoicePage('${inv.id}')">Edit</button>` : ''}
        ${balance > 0 && inv.status !== 'draft' && inv.status !== 'void' ? `<button class="bk-btn bk-btn-gold" onclick="showRecordPaymentModal('${inv.id}', ${balance})">Record Payment</button>` : ''}
        <button class="bk-btn bk-btn-outline" onclick="showInvoicesPage()">← Back</button>
      </div>
    </div>
    <div style="padding:16px 24px;max-width:820px;">
      <div style="display:flex;justify-content:space-between;color:var(--muted);font-size:0.8rem;margin-bottom:16px;">
        <span>Issued: ${inv.issue_date || '—'}</span><span>Due: ${inv.due_date || '—'}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;">
          <th style="padding:4px 6px;">Item</th><th style="padding:4px 6px;text-align:right;">Qty</th><th style="padding:4px 6px;text-align:right;">Price</th>
          <th style="padding:4px 6px;text-align:right;">VAT</th><th style="padding:4px 6px;text-align:right;">Total</th></tr></thead>
        <tbody>${itemRows}</tbody>
      </table>
      <div style="text-align:right;margin-top:16px;font-size:0.85rem;">
        <div style="color:var(--muted);">Subtotal: ₦${(parseFloat(inv.subtotal) || 0).toLocaleString()}</div>
        <div style="color:var(--muted);margin-bottom:6px;">VAT: ₦${(parseFloat(inv.vat_total) || 0).toLocaleString()}</div>
        <div style="font-size:1.1rem;font-weight:800;">Total: ₦${(parseFloat(inv.total) || 0).toLocaleString()}</div>
        <div style="color:var(--muted);margin-top:6px;">Paid: ₦${(parseFloat(inv.amount_paid) || 0).toLocaleString()}</div>
        <div style="font-weight:700;color:${balance > 0 ? 'var(--red)' : 'var(--green)'};">Balance: ₦${balance.toLocaleString()}</div>
      </div>
      ${payments?.length ? `
      <div style="margin-top:24px;">
        <div style="font-weight:700;font-size:0.8rem;margin-bottom:8px;">Payment history</div>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);"><th style="padding:4px 6px;">Date</th><th style="padding:4px 6px;">Mode</th><th style="padding:4px 6px;text-align:right;">Amount</th></tr></thead>
          <tbody>${paymentRows}</tbody>
        </table>
      </div>` : ''}
    </div>
    <div class="bk-modal-overlay hidden" id="paymentModalOverlay">
      <div class="bk-modal">
        <h3>Record Payment</h3>
        <input class="bk-input" type="hidden" id="payInvoiceId" value="${inv.id}"/>
        <div class="bk-field"><label class="bk-label">Amount</label><input class="bk-input" type="number" id="payAmount" min="0" step="any" max="${balance}"/></div>
        <div class="bk-field"><label class="bk-label">Payment Date</label><input class="bk-input" type="date" id="payDate" value="${new Date().toISOString().slice(0, 10)}"/></div>
        <div class="bk-field"><label class="bk-label">Payment Mode</label>
          <select class="bk-input" id="payMode"><option value="cash">Cash</option><option value="transfer">Bank Transfer</option><option value="pos">POS</option><option value="cheque">Cheque</option></select>
        </div>
        <div class="bk-modal-actions">
          <button class="bk-btn bk-btn-outline" style="flex:1;" onclick="document.getElementById('paymentModalOverlay').classList.add('hidden')">Cancel</button>
          <button class="bk-btn bk-btn-gold" style="flex:1;" id="paySaveBtn" onclick="recordPayment()">Save</button>
        </div>
      </div>
    </div>
  `;
}

function showRecordPaymentModal(invoiceId, balance) {
  document.getElementById('payInvoiceId').value = invoiceId;
  document.getElementById('payAmount').value = balance;
  document.getElementById('paymentModalOverlay').classList.remove('hidden');
}

async function recordPayment() {
  const invoiceId = document.getElementById('payInvoiceId').value;
  const amount = parseFloat(document.getElementById('payAmount').value) || 0;
  if (amount <= 0) { alert('Enter a valid payment amount.'); return; }

  const btn = document.getElementById('paySaveBtn');
  btn.textContent = 'Saving…'; btn.disabled = true;

  try {
    const { data: inv } = await bkDb.from('bk_invoices').select('*').eq('id', invoiceId).single();
    if (!inv) throw new Error('Invoice not found');

    const payment = {
      user_id: bkUser.id, business_id: inv.business_id, invoice_id: invoiceId, amount,
      payment_date: document.getElementById('payDate').value, payment_mode: document.getElementById('payMode').value,
    };
    const { data: createdPayment, error } = await bkDb.from('bk_payments').insert(payment).select().single();
    if (error) throw error;

    const newAmountPaid = (parseFloat(inv.amount_paid) || 0) + amount;
    const newStatus = newAmountPaid >= parseFloat(inv.total) ? 'paid' : 'partial';
    await bkDb.from('bk_invoices').update({ amount_paid: newAmountPaid, status: newStatus, updated_at: new Date().toISOString() }).eq('id', invoiceId);

    await postPaymentToLedger(createdPayment, inv);

    await viewInvoice(invoiceId);
  } catch (e) {
    console.error('recordPayment failed', e);
    alert('Could not record payment: ' + (e.message || JSON.stringify(e)));
    btn.textContent = 'Save'; btn.disabled = false;
  }
}

// ── QUOTES ────────────────────────────────────────────────────
const QUOTE_STATUS_COLORS = {
  draft: STATUS_COLORS.draft, sent: STATUS_COLORS.sent,
  accepted: STATUS_COLORS.paid, declined: STATUS_COLORS.overdue,
  expired: { bg: '#eaeef4', fg: 'var(--muted)' }, converted: STATUS_COLORS.partial,
};
function quoteStatusBadge(status) {
  const c = QUOTE_STATUS_COLORS[status] || STATUS_COLORS.draft;
  return `<span style="background:${c.bg};color:${c.fg};padding:2px 10px;border-radius:10px;font-size:0.7rem;font-weight:700;text-transform:capitalize;">${status}</span>`;
}

async function showQuotesPage() {
  bdSaveRoute('sales-quotes');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading quotes…</div>';
  try {
    const [{ data: qs, error }, { data: custs }] = await Promise.all([
      bkDb.from('bk_quotes').select('*').match(bizMatch()).order('created_at', { ascending: false }),
      bkDb.from('bk_customers').select('id,name').match(bizMatch()),
    ]);
    if (error) throw error;
    const custMap = Object.fromEntries((custs || []).map(c => [c.id, c.name]));
    salesQuotes = (qs || []).map(q => ({ ...q, customerName: custMap[q.customer_id] || 'Unknown customer' }));
  } catch (e) {
    console.error('showQuotesPage failed', e);
    salesQuotes = [];
  }
  renderQuotesPage();
}

function renderQuotesPage() {
  const rows = salesQuotes.map(q => `
    <tr>
      <td style="padding:10px 12px;font-weight:600;">${escH(q.quote_number)}</td>
      <td style="padding:10px 12px;">${escH(q.customerName)}</td>
      <td style="padding:10px 12px;color:var(--muted);">${q.issue_date || '—'}</td>
      <td style="padding:10px 12px;text-align:right;">₦${(parseFloat(q.total) || 0).toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;">${quoteStatusBadge(q.status)}</td>
      <td style="padding:10px 12px;text-align:right;">
        ${q.status !== 'converted' ? `<button class="bk-btn bk-btn-outline" style="padding:4px 10px;" onclick="showNewQuotePage('${q.id}')">Edit</button>
        <button class="bk-btn bk-btn-gold" style="padding:4px 10px;" onclick="convertQuoteToInvoice('${q.id}')">Convert</button>` : `<span style="color:var(--muted);font-size:0.75rem;">Converted</span>`}
      </td>
    </tr>`).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header">
      <div><div class="bk-content-title">QUOTES</div><div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">${salesQuotes.length} quote${salesQuotes.length === 1 ? '' : 's'}</div></div>
      <button class="bk-btn bk-btn-gold" onclick="showNewQuotePage()">+ New Quote</button>
    </div>
    <div class="bk-sheet-wrap" style="padding:16px 24px;">
      ${salesQuotes.length ? `
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;">
          <th style="padding:6px 12px;">Quote</th><th style="padding:6px 12px;">Customer</th><th style="padding:6px 12px;">Date</th>
          <th style="padding:6px 12px;text-align:right;">Total</th><th style="padding:6px 12px;text-align:right;">Status</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>` : `<div class="bk-empty">No quotes yet.</div>`}
    </div>
  `;
}

async function showNewQuotePage(editId) {
  bdSaveRoute('sales-new-quote');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading…</div>';

  if (!salesCustomers.length) {
    const { data } = await bkDb.from('bk_customers').select('*').match(bizMatch()).order('name');
    salesCustomers = data || [];
  }
  if (!salesCustomers.length) {
    document.getElementById('bkContent').innerHTML = `<div class="bk-content-header"><div class="bk-content-title">NEW QUOTE</div></div>
      <div class="bk-empty">You need at least one customer before creating a quote.
        <br/><button class="bk-btn bk-btn-gold" style="margin-top:12px;" onclick="showCustomerModal();showCustomersPage();">+ Add a customer</button></div>`;
    return;
  }

  editingQuoteId = editId || null;
  let quote = { customer_id: '', expiry_date: '', notes: '' };
  if (editId) {
    const [{ data: q }, { data: items }] = await Promise.all([
      bkDb.from('bk_quotes').select('*').eq('id', editId).single(),
      bkDb.from('bk_quote_items').select('*').eq('quote_id', editId).order('sort_order'),
    ]);
    if (q) quote = q;
    currentQuoteItems = (items || []).map(it => ({ ...it }));
  } else {
    currentQuoteItems = [{ description: '', quantity: 1, unit_price: 0, vat_rate: DEFAULT_VAT_RATE }];
  }
  renderQuoteBuilder(quote);
}

function renderQuoteBuilder(quote) {
  const custOptions = salesCustomers.map(c => `<option value="${c.id}" ${c.id === quote.customer_id ? 'selected' : ''}>${escH(c.name)}</option>`).join('');
  const itemRows = currentQuoteItems.map((it, i) => `
    <tr>
      <td style="padding:6px;"><input type="text" value="${escH(it.description)}" placeholder="Item description"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;" oninput="currentQuoteItems[${i}].description=this.value"/></td>
      <td style="padding:6px;width:80px;"><input type="number" value="${it.quantity}" min="0" step="any"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;text-align:right;" oninput="currentQuoteItems[${i}].quantity=parseFloat(this.value)||0;recalcQuoteTotals()"/></td>
      <td style="padding:6px;width:120px;"><input type="number" value="${it.unit_price}" min="0" step="any"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;text-align:right;" oninput="currentQuoteItems[${i}].unit_price=parseFloat(this.value)||0;recalcQuoteTotals()"/></td>
      <td style="padding:6px;width:80px;"><input type="number" value="${it.vat_rate}" min="0" step="any"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;text-align:right;" oninput="currentQuoteItems[${i}].vat_rate=parseFloat(this.value)||0;recalcQuoteTotals()"/></td>
      <td style="padding:6px;width:110px;text-align:right;font-weight:600;" id="qLineTotal_${i}">₦0</td>
      <td style="padding:6px;width:36px;text-align:center;"><button onclick="removeQuoteLine(${i})" style="background:none;border:none;color:var(--red);cursor:pointer;">✕</button></td>
    </tr>`).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header"><div class="bk-content-title">${editingQuoteId ? 'EDIT QUOTE' : 'NEW QUOTE'}</div></div>
    <div style="padding:16px 24px;max-width:820px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
        <div class="bk-field"><label class="bk-label">Customer</label><select class="bk-input" id="qCustomer">${custOptions}</select></div>
        <div class="bk-field"><label class="bk-label">Expiry Date</label><input class="bk-input" type="date" id="qExpiryDate" value="${quote.expiry_date || ''}"/></div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;">
          <th style="padding:4px 6px;">Item</th><th style="padding:4px 6px;">Qty</th><th style="padding:4px 6px;">Unit Price</th>
          <th style="padding:4px 6px;">VAT %</th><th style="padding:4px 6px;text-align:right;">Total</th><th></th></tr></thead>
        <tbody>${itemRows}</tbody>
      </table>
      <button class="bk-btn bk-btn-outline" onclick="addQuoteLine()">+ Add line</button>
      <div style="text-align:right;margin-top:16px;font-size:0.85rem;">
        <div style="color:var(--muted);">Subtotal: <span id="qSubtotal">₦0</span></div>
        <div style="color:var(--muted);margin-bottom:8px;">VAT: <span id="qVatTotal">₦0</span></div>
        <div style="font-size:1.15rem;font-weight:800;">Total: <span id="qGrandTotal">₦0</span></div>
      </div>
      <div class="bk-field" style="margin-top:16px;"><label class="bk-label">Notes</label><textarea class="bk-input" id="qNotes" placeholder="Optional">${escH(quote.notes || '')}</textarea></div>
      <div style="display:flex;gap:10px;margin-top:16px;justify-content:flex-end;">
        <button class="bk-btn bk-btn-outline" onclick="saveQuoteAs('draft')" id="qDraftBtn">Save Draft</button>
        <button class="bk-btn bk-btn-gold" onclick="saveQuoteAs('sent')" id="qSendBtn">${editingQuoteId ? 'Update & Send' : 'Send Quote'}</button>
      </div>
    </div>
  `;
  recalcQuoteTotals();
}

function addQuoteLine() {
  currentQuoteItems.push({ description: '', quantity: 1, unit_price: 0, vat_rate: DEFAULT_VAT_RATE });
  renderQuoteBuilder({ customer_id: document.getElementById('qCustomer')?.value, expiry_date: document.getElementById('qExpiryDate')?.value, notes: document.getElementById('qNotes')?.value });
}
function removeQuoteLine(i) {
  if (currentQuoteItems.length <= 1) { alert('A quote needs at least one line item.'); return; }
  currentQuoteItems.splice(i, 1);
  renderQuoteBuilder({ customer_id: document.getElementById('qCustomer')?.value, expiry_date: document.getElementById('qExpiryDate')?.value, notes: document.getElementById('qNotes')?.value });
}
function recalcQuoteTotals() {
  let subtotal = 0, vatTotal = 0;
  currentQuoteItems.forEach((it, i) => {
    const lineBase = (parseFloat(it.quantity) || 0) * (parseFloat(it.unit_price) || 0);
    const lineVat = lineBase * ((parseFloat(it.vat_rate) || 0) / 100);
    it.line_total = lineBase + lineVat;
    subtotal += lineBase; vatTotal += lineVat;
    const cell = document.getElementById('qLineTotal_' + i);
    if (cell) cell.textContent = '₦' + it.line_total.toLocaleString(undefined, { maximumFractionDigits: 2 });
  });
  const total = subtotal + vatTotal;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = '₦' + val.toLocaleString(undefined, { maximumFractionDigits: 2 }); };
  set('qSubtotal', subtotal); set('qVatTotal', vatTotal); set('qGrandTotal', total);
  return { subtotal, vatTotal, total };
}

async function saveQuoteAs(targetStatus) {
  const customerId = document.getElementById('qCustomer').value;
  if (!customerId) { alert('Please select a customer.'); return; }
  const validItems = currentQuoteItems.filter(it => it.description.trim());
  if (!validItems.length) { alert('Add at least one line item with a description.'); return; }

  const btn = document.getElementById(targetStatus === 'draft' ? 'qDraftBtn' : 'qSendBtn');
  btn.textContent = 'Saving…'; btn.disabled = true;
  const { subtotal, vatTotal, total } = recalcQuoteTotals();
  const expiryDate = document.getElementById('qExpiryDate').value || null;
  const notes = document.getElementById('qNotes').value.trim();
  const bizId = activeBusiness?.id || null;

  try {
    let quoteId = editingQuoteId;
    if (quoteId) {
      const { error } = await bkDb.from('bk_quotes').update({ customer_id: customerId, expiry_date: expiryDate, notes, subtotal, vat_total: vatTotal, total, status: targetStatus, updated_at: new Date().toISOString() }).eq('id', quoteId);
      if (error) throw error;
      await bkDb.from('bk_quote_items').delete().eq('quote_id', quoteId);
    } else {
      const quoteNumber = await getNextDocNumber('bk_quotes', 'quote_number', 'QT');
      const { data: created, error } = await bkDb.from('bk_quotes').insert({
        user_id: bkUser.id, business_id: bizId, customer_id: customerId, quote_number: quoteNumber,
        issue_date: new Date().toISOString().slice(0, 10), expiry_date: expiryDate, notes, subtotal, vat_total: vatTotal, total, status: targetStatus,
      }).select().single();
      if (error) throw error;
      quoteId = created.id;
    }
    const itemRows = validItems.map((it, i) => ({
      quote_id: quoteId, business_id: bizId, description: it.description.trim(),
      quantity: parseFloat(it.quantity) || 0, unit_price: parseFloat(it.unit_price) || 0,
      vat_rate: parseFloat(it.vat_rate) || 0, line_total: it.line_total || 0, sort_order: i,
    }));
    await bkDb.from('bk_quote_items').insert(itemRows);

    editingQuoteId = null; currentQuoteItems = [];
    await showQuotesPage();
  } catch (e) {
    console.error('saveQuoteAs failed', e);
    alert('Could not save quote: ' + (e.message || JSON.stringify(e)));
    btn.disabled = false;
  }
}

// Converts an accepted quote into a real invoice — same line items,
// now it's a debt the customer actually owes. Marks the quote
// 'converted' and links it to the new invoice so it's traceable.
async function convertQuoteToInvoice(quoteId) {
  if (!confirm('Convert this quote into an invoice? This will move it into your accounts as money owed.')) return;
  try {
    const [{ data: q }, { data: items }] = await Promise.all([
      bkDb.from('bk_quotes').select('*').eq('id', quoteId).single(),
      bkDb.from('bk_quote_items').select('*').eq('quote_id', quoteId).order('sort_order'),
    ]);
    if (!q) throw new Error('Quote not found');

    const invoiceNumber = await getNextDocNumber('bk_invoices', 'invoice_number', 'INV');
    const { data: inv, error } = await bkDb.from('bk_invoices').insert({
      user_id: bkUser.id, business_id: q.business_id, customer_id: q.customer_id, invoice_number: invoiceNumber,
      issue_date: new Date().toISOString().slice(0, 10), due_date: null, notes: q.notes,
      subtotal: q.subtotal, vat_total: q.vat_total, total: q.total, status: 'sent',
    }).select().single();
    if (error) throw error;

    const invItems = (items || []).map((it, i) => ({
      invoice_id: inv.id, business_id: q.business_id, product_id: it.product_id, description: it.description,
      quantity: it.quantity, unit_price: it.unit_price, vat_rate: it.vat_rate, line_total: it.line_total, sort_order: i,
    }));
    if (invItems.length) await bkDb.from('bk_invoice_items').insert(invItems);

    const custName = (await bkDb.from('bk_customers').select('name').eq('id', q.customer_id).single()).data?.name || '';
    await postInvoiceToLedger({ id: inv.id, business_id: q.business_id, invoice_number: invoiceNumber, customerName: custName, subtotal: q.subtotal, vat_total: q.vat_total, issue_date: inv.issue_date, notes: q.notes });

    await bkDb.from('bk_quotes').update({ status: 'converted', converted_invoice_id: inv.id }).eq('id', quoteId);

    alert('Converted to invoice ' + invoiceNumber + '.');
    await showInvoicesPage();
  } catch (e) {
    console.error('convertQuoteToInvoice failed', e);
    alert('Could not convert quote: ' + (e.message || JSON.stringify(e)));
  }
}

// ── ACCOUNTS RECEIVABLE AGING ─────────────────────────────────
async function showARAgingPage() {
  bdSaveRoute('sales-ar-aging');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading…</div>';

  const [{ data: invs }, { data: custs }] = await Promise.all([
    bkDb.from('bk_invoices').select('*').match(bizMatch()).neq('status', 'draft').neq('status', 'void'),
    bkDb.from('bk_customers').select('id,name').match(bizMatch()),
  ]);
  const custMap = Object.fromEntries((custs || []).map(c => [c.id, c.name]));

  const buckets = {}; // customer_id -> { current, d1_30, d31_60, d60plus, total }
  const today = new Date(new Date().toDateString());

  (invs || []).forEach(inv => {
    const balance = (parseFloat(inv.total) || 0) - (parseFloat(inv.amount_paid) || 0);
    if (balance <= 0) return;
    const key = inv.customer_id;
    if (!buckets[key]) buckets[key] = { current: 0, d1_30: 0, d31_60: 0, d60plus: 0, total: 0 };

    const due = inv.due_date ? new Date(inv.due_date) : today;
    const daysOverdue = Math.floor((today - due) / 86400000);

    if (daysOverdue <= 0) buckets[key].current += balance;
    else if (daysOverdue <= 30) buckets[key].d1_30 += balance;
    else if (daysOverdue <= 60) buckets[key].d31_60 += balance;
    else buckets[key].d60plus += balance;
    buckets[key].total += balance;
  });

  const rows = Object.entries(buckets).sort((a, b) => b[1].total - a[1].total).map(([custId, b]) => `
    <tr>
      <td style="padding:10px 12px;font-weight:600;">${escH(custMap[custId] || 'Unknown customer')}</td>
      <td style="padding:10px 12px;text-align:right;">₦${b.current.toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;${b.d1_30 > 0 ? 'color:var(--red);' : ''}">₦${b.d1_30.toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;${b.d31_60 > 0 ? 'color:var(--red);' : ''}">₦${b.d31_60.toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;${b.d60plus > 0 ? 'color:var(--red);' : ''}">₦${b.d60plus.toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;font-weight:700;">₦${b.total.toLocaleString()}</td>
    </tr>`).join('');

  const grandTotal = Object.values(buckets).reduce((sum, b) => sum + b.total, 0);
  const bucketTotals = Object.values(buckets).reduce((acc, b) => {
    acc.current += b.current; acc.d1_30 += b.d1_30; acc.d31_60 += b.d31_60; acc.d60plus += b.d60plus; return acc;
  }, { current: 0, d1_30: 0, d31_60: 0, d60plus: 0 });

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header">
      <div><div class="bk-content-title">ACCOUNTS RECEIVABLE AGING</div><div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">Who owes what, and how overdue</div></div>
    </div>
    <div class="bk-sheet-wrap" style="padding:16px 24px;">
      ${Object.keys(buckets).length ? `
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;">
          <th style="padding:6px 12px;">Customer</th><th style="padding:6px 12px;text-align:right;">Current</th>
          <th style="padding:6px 12px;text-align:right;">1-30 days</th><th style="padding:6px 12px;text-align:right;">31-60</th>
          <th style="padding:6px 12px;text-align:right;">60+</th><th style="padding:6px 12px;text-align:right;">Total</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr style="border-top:2px solid var(--border2);font-weight:800;">
          <td style="padding:10px 12px;">Total</td>
          <td style="padding:10px 12px;text-align:right;">₦${bucketTotals.current.toLocaleString()}</td>
          <td style="padding:10px 12px;text-align:right;color:var(--red);">₦${bucketTotals.d1_30.toLocaleString()}</td>
          <td style="padding:10px 12px;text-align:right;">₦${bucketTotals.d31_60.toLocaleString()}</td>
          <td style="padding:10px 12px;text-align:right;">₦${bucketTotals.d60plus.toLocaleString()}</td>
          <td style="padding:10px 12px;text-align:right;">₦${grandTotal.toLocaleString()}</td>
        </tr></tfoot>
      </table>` : `<div class="bk-empty">Nothing outstanding — every invoice is paid up.</div>`}
    </div>
  `;
}

// ── SALES DASHBOARD ───────────────────────────────────────────
async function showSalesDashboard() {
  bdSaveRoute('sales-dashboard');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading…</div>';

  const [{ data: invs }, { data: custs }] = await Promise.all([
    bkDb.from('bk_invoices').select('*').match(bizMatch()),
    bkDb.from('bk_customers').select('id,name').match(bizMatch()),
  ]);
  const custMap = Object.fromEntries((custs || []).map(c => [c.id, c.name]));

  const now = new Date();
  const thisMonth = (invs || []).filter(i => {
    const d = new Date(i.issue_date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && i.status !== 'draft' && i.status !== 'void';
  });
  const salesThisMonth = thisMonth.reduce((sum, i) => sum + (parseFloat(i.total) || 0), 0);
  const outstanding = (invs || []).reduce((sum, i) => {
    if (i.status === 'draft' || i.status === 'void') return sum;
    return sum + ((parseFloat(i.total) || 0) - (parseFloat(i.amount_paid) || 0));
  }, 0);
  const overdueCount = (invs || []).filter(i => displayInvoiceStatus(i) === 'overdue').length;

  const recent = (invs || []).slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6);
  const recentRows = recent.map(inv => `
    <tr style="cursor:pointer;" onclick="viewInvoice('${inv.id}')">
      <td style="padding:8px 12px;">${escH(inv.invoice_number)}</td>
      <td style="padding:8px 12px;">${escH(custMap[inv.customer_id] || '—')}</td>
      <td style="padding:8px 12px;">${inv.due_date || '—'}</td>
      <td style="padding:8px 12px;text-align:right;">₦${(parseFloat(inv.total) || 0).toLocaleString()}</td>
      <td style="padding:8px 12px;text-align:right;">${statusBadge(displayInvoiceStatus(inv))}</td>
    </tr>`).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header"><div class="bk-content-title">SALES</div></div>
    <div style="padding:16px 24px;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px;">
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:14px;">
          <div style="font-size:0.7rem;color:var(--muted);margin-bottom:4px;">Sales this month</div>
          <div style="font-size:1.2rem;font-weight:800;">₦${salesThisMonth.toLocaleString()}</div></div>
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:14px;">
          <div style="font-size:0.7rem;color:var(--muted);margin-bottom:4px;">Outstanding</div>
          <div style="font-size:1.2rem;font-weight:800;color:var(--gold);">₦${outstanding.toLocaleString()}</div></div>
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:14px;">
          <div style="font-size:0.7rem;color:var(--muted);margin-bottom:4px;">Overdue</div>
          <div style="font-size:1.2rem;font-weight:800;color:var(--red);">${overdueCount} invoice${overdueCount === 1 ? '' : 's'}</div></div>
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:14px;">
          <div style="font-size:0.7rem;color:var(--muted);margin-bottom:4px;">Customers</div>
          <div style="font-size:1.2rem;font-weight:800;">${custs?.length || 0}</div></div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
        <button class="bk-btn bk-btn-gold" onclick="showNewInvoicePage()">+ New Invoice</button>
        <button class="bk-btn bk-btn-outline" onclick="showInvoicesPage()">Invoices</button>
        <button class="bk-btn bk-btn-outline" onclick="showQuotesPage()">Quotes</button>
        <button class="bk-btn bk-btn-outline" onclick="showCustomersPage()">Customers</button>
        <button class="bk-btn bk-btn-outline" onclick="showARAgingPage()">AR Aging</button>
      </div>
      <div style="font-weight:700;font-size:0.8rem;margin-bottom:8px;">Recent invoices</div>
      ${recent.length ? `
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;">
          <th style="padding:6px 12px;">Invoice</th><th style="padding:6px 12px;">Customer</th><th style="padding:6px 12px;">Due</th>
          <th style="padding:6px 12px;text-align:right;">Amount</th><th style="padding:6px 12px;text-align:right;">Status</th></tr></thead>
        <tbody>${recentRows}</tbody>
      </table>` : `<div class="bk-empty">No invoices yet — create your first one.</div>`}
    </div>
  `;
}
