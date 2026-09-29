// ============================================================
// ap-module.js — Accounts Payable module for Butterfly Dynamix Bookkeeping
// Vendors · Bills · Vendor Payments · AP Aging
// Lazy-loaded on demand (see bkLoadScriptOnce in bookkeeping-app.js) —
// depends on globals already defined there: bkDb, bkUser,
// activeBusiness, bizMatch(), acctBizFilter(), acctBizStamp(),
// ensureAccountExists(), getLastAccountBalance(), postJournalPair(),
// getNextDocNumber(), escH(), setSaveMsg(), closeBkMenu(),
// bdSaveRoute(), staffHideChrome().
//
// Vendors are stored in the existing bk_suppliers table (extended by
// migration_accounts_payable.sql with email/phone/address/payment_terms/
// credit_limit/business_id) rather than a new table, so the handful of
// suppliers users already entered through the old bare-bones Suppliers
// screen carry straight over as vendors.
//
// NOTE ON NAMING: this file intentionally does NOT reuse sales-module.js's
// top-level `const DEFAULT_VAT_RATE` / `STATUS_COLORS` / `statusBadge`
// names. Two <script> tags in the same page share one global lexical
// scope for `let`/`const`, so redeclaring the same const name in both
// lazy-loaded files would throw as soon as a user opened both Sales and
// Accounts Payable in one session — hence AP_DEFAULT_VAT_RATE,
// BILL_STATUS_COLORS and billStatusBadge() below instead of the sales
// module's names.
// ============================================================

let apVendors        = [];
let apBills           = [];
let currentBillItems  = [];
let editingBillId     = null;
const AP_DEFAULT_VAT_RATE = 7.5; // Nigerian standard VAT — same default as the Sales module

// ── VENDORS ───────────────────────────────────────────────────
function _apMapVendorRow(r) {
  return {
    id: r.id,
    name: r.supplier_name || '',
    email: r.email || '',
    phone: r.phone || '',
    address: r.address || '',
    tax_id: r.tax_id || '',
    payment_terms: r.payment_terms || 'Net 30',
    credit_limit: r.credit_limit || 0,
    ps_type: r.products_services || 'product',
    type: r.type || '',
  };
}

async function showVendorsPage() {
  bdSaveRoute('ap-vendors');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading vendors…</div>';
  try {
    const { data, error } = await acctBizFilter(bkDb.from('bk_suppliers').select('*')).order('supplier_name');
    if (error) throw error;
    apVendors = (data || []).map(_apMapVendorRow);
  } catch (e) {
    console.error('showVendorsPage failed', e);
    apVendors = [];
  }
  await renderVendorsPage();
}

// Owed-per-vendor is computed from open bill balances, same idea as the
// "Owed" column shown in the approved mockup.
async function renderVendorsPage() {
  let owedByVendor = {};
  try {
    const { data: bills } = await bkDb.from('bk_bills').select('vendor_id,total,amount_paid,status').match(bizMatch());
    (bills || []).forEach(b => {
      if (b.status === 'void') return;
      const bal = (parseFloat(b.total) || 0) - (parseFloat(b.amount_paid) || 0);
      if (bal <= 0) return;
      owedByVendor[b.vendor_id] = (owedByVendor[b.vendor_id] || 0) + bal;
    });
  } catch (e) { /* non-fatal — vendors still render, just without balances */ }

  const rows = apVendors.map(v => {
    const owed = owedByVendor[v.id] || 0;
    return `
    <tr>
      <td style="padding:10px 12px;font-weight:600;">${escH(v.name)}</td>
      <td style="padding:10px 12px;color:var(--muted);">${escH(v.email || '—')}</td>
      <td style="padding:10px 12px;color:var(--muted);">${escH(v.phone || '—')}</td>
      <td style="padding:10px 12px;">${escH(v.payment_terms)}</td>
      <td style="padding:10px 12px;text-align:right;${owed > 0 ? 'color:var(--red);' : 'color:var(--muted);'}">₦${owed.toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;">
        <button class="bk-btn bk-btn-outline" style="padding:4px 10px;" onclick="showVendorModal('${v.id}')">Edit</button>
        <button class="bk-btn bk-btn-outline" style="padding:4px 10px;color:var(--red);" onclick="deleteVendor('${v.id}')">Delete</button>
      </td>
    </tr>`;
  }).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header">
      <div>
        <div class="bk-content-title">VENDORS</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">${apVendors.length} vendor${apVendors.length === 1 ? '' : 's'}</div>
      </div>
      <button class="bk-btn bk-btn-gold" onclick="showVendorModal()">+ New Vendor</button>
    </div>
    <div class="bk-sheet-wrap" style="padding:16px 24px;">
      ${apVendors.length ? `
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;">
          <th style="padding:6px 12px;">Vendor</th><th style="padding:6px 12px;">Email</th><th style="padding:6px 12px;">Phone</th>
          <th style="padding:6px 12px;">Terms</th><th style="padding:6px 12px;text-align:right;">Owed</th><th></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>` : `<div class="bk-empty">No vendors yet — add your first one.</div>`}
    </div>
    <div class="bk-modal-overlay hidden" id="vendorModalOverlay">
      <div class="bk-modal">
        <h3 id="vendorModalTitle">New Vendor</h3>
        <input class="bk-input" type="hidden" id="vendId"/>
        <div class="bk-field"><label class="bk-label">Name</label><input class="bk-input" type="text" id="vendName" placeholder="e.g. Ishiagu Fuel &amp; Diesel Supplies"/></div>
        <div class="bk-field"><label class="bk-label">Email</label><input class="bk-input" type="email" id="vendEmail" placeholder="vendor@email.com"/></div>
        <div class="bk-field"><label class="bk-label">Phone</label><input class="bk-input" type="text" id="vendPhone" placeholder="080..."/></div>
        <div class="bk-field"><label class="bk-label">Address</label><input class="bk-input" type="text" id="vendAddress" placeholder="Optional"/></div>
        <div class="bk-field"><label class="bk-label">Tax ID</label><input class="bk-input" type="text" id="vendTaxId" placeholder="Optional"/></div>
        <div class="bk-field"><label class="bk-label">Payment Terms</label>
          <select class="bk-input" id="vendTerms">
            <option value="Cash">Cash</option>
            <option value="Net 7">Net 7</option>
            <option value="Net 14">Net 14</option>
            <option value="Net 30" selected>Net 30</option>
            <option value="Net 60">Net 60</option>
          </select>
        </div>
        <div class="bk-field"><label class="bk-label">Credit Limit</label><input class="bk-input" type="number" id="vendCreditLimit" placeholder="0" min="0"/></div>
        <div class="bk-modal-actions">
          <button class="bk-btn bk-btn-outline" style="flex:1;" onclick="closeVendorModal()">Cancel</button>
          <button class="bk-btn bk-btn-gold" style="flex:1;" id="vendSaveBtn" onclick="saveVendor()">Save</button>
        </div>
      </div>
    </div>
  `;
}

function showVendorModal(id) {
  const overlay = document.getElementById('vendorModalOverlay');
  const v = id ? apVendors.find(x => x.id === id) : null;
  document.getElementById('vendorModalTitle').textContent = v ? 'Edit Vendor' : 'New Vendor';
  document.getElementById('vendId').value = v?.id || '';
  document.getElementById('vendName').value = v?.name || '';
  document.getElementById('vendEmail').value = v?.email || '';
  document.getElementById('vendPhone').value = v?.phone || '';
  document.getElementById('vendAddress').value = v?.address || '';
  document.getElementById('vendTaxId').value = v?.tax_id || '';
  document.getElementById('vendTerms').value = v?.payment_terms || 'Net 30';
  document.getElementById('vendCreditLimit').value = v?.credit_limit || '';
  overlay.classList.remove('hidden');
}
function closeVendorModal() {
  document.getElementById('vendorModalOverlay').classList.add('hidden');
}

async function saveVendor() {
  const name = document.getElementById('vendName').value.trim();
  if (!name) { alert('Vendor name is required.'); return; }

  const id = document.getElementById('vendId').value;
  const btn = document.getElementById('vendSaveBtn');
  btn.textContent = 'Saving…'; btn.disabled = true;

  const payload = {
    user_id: bkUser.id,
    supplier_name: name,
    email: document.getElementById('vendEmail').value.trim() || null,
    phone: document.getElementById('vendPhone').value.trim() || null,
    address: document.getElementById('vendAddress').value.trim() || null,
    tax_id: document.getElementById('vendTaxId').value.trim() || null,
    payment_terms: document.getElementById('vendTerms').value,
    credit_limit: parseFloat(document.getElementById('vendCreditLimit').value) || 0,
    updated_at: new Date().toISOString(),
  };

  try {
    let error;
    if (id) {
      ({ error } = await bkDb.from('bk_suppliers').update(payload).eq('id', id));
    } else {
      ({ error } = await bkDb.from('bk_suppliers').insert({
        ...payload, products_services: 'product', type: '', ...acctBizStamp(),
      }));
    }
    if (error) throw error;
    closeVendorModal();
    await showVendorsPage();
  } catch (e) {
    alert('Could not save vendor: ' + (e.message || JSON.stringify(e)));
    btn.textContent = 'Save'; btn.disabled = false;
  }
}

async function deleteVendor(id) {
  const { data: billsUsingVendor } = await bkDb.from('bk_bills').select('id').eq('vendor_id', id).limit(1);
  if (billsUsingVendor?.length) {
    alert('This vendor has bills on record and cannot be deleted. You can still edit their details.');
    return;
  }
  if (!confirm('Delete this vendor? This cannot be undone.')) return;
  const { error } = await bkDb.from('bk_suppliers').delete().eq('id', id);
  if (error) { alert('Delete failed: ' + error.message); return; }
  await showVendorsPage();
}

// ── BILLS: STATUS DISPLAY ────────────────────────────────────
function displayBillStatus(bill) {
  if (bill.status === 'paid' || bill.status === 'void' || bill.status === 'draft') return bill.status;
  const isOverdue = bill.due_date && new Date(bill.due_date) < new Date(new Date().toDateString());
  if (isOverdue) return 'overdue';
  return bill.status; // received or partial
}
const BILL_STATUS_COLORS = {
  draft:    { bg: '#eaeef4', fg: '#31415c' },
  received: { bg: '#eff6ff', fg: '#1d4ed8' },
  partial:  { bg: '#fce8d6', fg: '#9a5a1a' },
  paid:     { bg: 'var(--green-l, #d1fae5)', fg: 'var(--green, #1a7a4a)' },
  overdue:  { bg: 'var(--red-l, #fee2e2)', fg: 'var(--red, #c0392b)' },
  void:     { bg: '#eaeef4', fg: 'var(--muted)' },
};
function billStatusBadge(status) {
  const c = BILL_STATUS_COLORS[status] || BILL_STATUS_COLORS.draft;
  return `<span style="background:${c.bg};color:${c.fg};padding:2px 10px;border-radius:10px;font-size:0.7rem;font-weight:700;text-transform:capitalize;">${status}</span>`;
}

// ── BILLS: LIST ───────────────────────────────────────────────
async function showBillsPage(filterStatus) {
  bdSaveRoute('ap-bills');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading bills…</div>';
  try {
    const [{ data: bills, error }, { data: vendors }] = await Promise.all([
      bkDb.from('bk_bills').select('*').match(bizMatch()).order('created_at', { ascending: false }),
      acctBizFilter(bkDb.from('bk_suppliers').select('id,supplier_name')),
    ]);
    if (error) throw error;
    const vendMap = Object.fromEntries((vendors || []).map(v => [v.id, v.supplier_name]));
    apBills = (bills || []).map(b => ({ ...b, vendorName: vendMap[b.vendor_id] || 'Unknown vendor' }));
  } catch (e) {
    console.error('showBillsPage failed', e);
    apBills = [];
  }
  renderBillsPage(filterStatus || 'all');
}

function renderBillsPage(filterStatus) {
  const visible = filterStatus === 'all'
    ? apBills
    : apBills.filter(b => displayBillStatus(b) === filterStatus);

  const tabs = ['all', 'draft', 'received', 'partial', 'paid', 'overdue'];
  const tabsHtml = tabs.map(t => `
    <button class="bk-btn ${t === filterStatus ? 'bk-btn-gold' : 'bk-btn-outline'}" style="padding:5px 12px;text-transform:capitalize;"
      onclick="renderBillsPage('${t}')">${t}</button>
  `).join('');

  const rows = visible.map(bill => {
    const status = displayBillStatus(bill);
    const balance = (parseFloat(bill.total) || 0) - (parseFloat(bill.amount_paid) || 0);
    return `
    <tr style="cursor:pointer;" onclick="viewBill('${bill.id}')">
      <td style="padding:10px 12px;font-weight:600;">${escH(bill.bill_number)}</td>
      <td style="padding:10px 12px;">${escH(bill.vendorName)}</td>
      <td style="padding:10px 12px;color:var(--muted);">${bill.bill_date || '—'}</td>
      <td style="padding:10px 12px;color:var(--muted);">${bill.due_date || '—'}</td>
      <td style="padding:10px 12px;text-align:right;">₦${(parseFloat(bill.total) || 0).toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;color:${balance > 0 ? 'var(--red)' : 'var(--muted)'};">₦${balance.toLocaleString()}</td>
      <td style="padding:10px 12px;text-align:right;">${billStatusBadge(status)}</td>
    </tr>`;
  }).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header">
      <div>
        <div class="bk-content-title">BILLS</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">${visible.length} bill${visible.length === 1 ? '' : 's'}</div>
      </div>
      <button class="bk-btn bk-btn-gold" onclick="showNewBillPage()">+ New Bill</button>
    </div>
    <div style="padding:12px 24px 0;display:flex;gap:6px;flex-wrap:wrap;">${tabsHtml}</div>
    <div class="bk-sheet-wrap" style="padding:16px 24px;">
      ${visible.length ? `
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;">
          <th style="padding:6px 12px;">Bill</th><th style="padding:6px 12px;">Vendor</th><th style="padding:6px 12px;">Received</th><th style="padding:6px 12px;">Due</th>
          <th style="padding:6px 12px;text-align:right;">Total</th><th style="padding:6px 12px;text-align:right;">Balance</th><th style="padding:6px 12px;text-align:right;">Status</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>` : `<div class="bk-empty">No bills${filterStatus !== 'all' ? ' with this status' : ' yet'}.</div>`}
    </div>
  `;
}

// ── BILLS: NEW / EDIT ─────────────────────────────────────────
async function showNewBillPage(editId) {
  bdSaveRoute('ap-new-bill');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading…</div>';

  if (!apVendors.length) {
    const { data } = await acctBizFilter(bkDb.from('bk_suppliers').select('*')).order('supplier_name');
    apVendors = (data || []).map(_apMapVendorRow);
  }
  if (!apVendors.length) {
    document.getElementById('bkContent').innerHTML = `
      <div class="bk-content-header"><div class="bk-content-title">NEW BILL</div></div>
      <div class="bk-empty">You need at least one vendor before recording a bill.
        <br/><button class="bk-btn bk-btn-gold" style="margin-top:12px;" onclick="showVendorModal();showVendorsPage();">+ Add a vendor</button>
      </div>`;
    return;
  }

  editingBillId = editId || null;
  let bill = { vendor_id: '', vendor_ref: '', bill_date: new Date().toISOString().slice(0, 10), due_date: '', notes: '' };

  if (editId) {
    const [{ data: b }, { data: items }] = await Promise.all([
      bkDb.from('bk_bills').select('*').eq('id', editId).single(),
      bkDb.from('bk_bill_items').select('*').eq('bill_id', editId).order('sort_order'),
    ]);
    if (b) bill = b;
    currentBillItems = (items || []).map(it => ({ ...it }));
  } else {
    currentBillItems = [{ description: '', quantity: 1, unit_price: 0, vat_rate: AP_DEFAULT_VAT_RATE }];
  }

  renderBillBuilder(bill);
}

function renderBillBuilder(bill) {
  const vendOptions = apVendors.map(v =>
    `<option value="${v.id}" ${v.id === bill.vendor_id ? 'selected' : ''}>${escH(v.name)}</option>`
  ).join('');

  const itemRows = currentBillItems.map((it, i) => `
    <tr>
      <td style="padding:6px;"><input type="text" value="${escH(it.description)}" placeholder="Item / expense description"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;" oninput="currentBillItems[${i}].description=this.value"/></td>
      <td style="padding:6px;width:80px;"><input type="number" value="${it.quantity}" min="0" step="any"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;text-align:right;"
        oninput="currentBillItems[${i}].quantity=parseFloat(this.value)||0;recalcBillTotals()"/></td>
      <td style="padding:6px;width:120px;"><input type="number" value="${it.unit_price}" min="0" step="any"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;text-align:right;"
        oninput="currentBillItems[${i}].unit_price=parseFloat(this.value)||0;recalcBillTotals()"/></td>
      <td style="padding:6px;width:80px;"><input type="number" value="${it.vat_rate}" min="0" step="any"
        style="width:100%;padding:6px 8px;border:1px solid var(--border2);border-radius:5px;text-align:right;"
        oninput="currentBillItems[${i}].vat_rate=parseFloat(this.value)||0;recalcBillTotals()"/></td>
      <td style="padding:6px;width:110px;text-align:right;font-weight:600;" id="billLineTotal_${i}">₦0</td>
      <td style="padding:6px;width:36px;text-align:center;"><button onclick="removeBillLine(${i})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1rem;">✕</button></td>
    </tr>`).join('');

  document.getElementById('bkContent').innerHTML = `
    <div class="bk-content-header">
      <div class="bk-content-title">${editingBillId ? 'EDIT BILL' : 'NEW BILL'}</div>
    </div>
    <div style="padding:16px 24px;max-width:820px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
        <div class="bk-field"><label class="bk-label">Vendor</label><select class="bk-input" id="billVendor">${vendOptions}</select></div>
        <div class="bk-field"><label class="bk-label">Vendor's Invoice / Ref #</label><input class="bk-input" type="text" id="billVendorRef" placeholder="Their invoice number, optional" value="${escH(bill.vendor_ref || '')}"/></div>
        <div class="bk-field"><label class="bk-label">Bill Date</label><input class="bk-input" type="date" id="billDate" value="${bill.bill_date || new Date().toISOString().slice(0, 10)}"/></div>
        <div class="bk-field"><label class="bk-label">Due Date</label><input class="bk-input" type="date" id="billDueDate" value="${bill.due_date || ''}"/></div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;">
          <th style="padding:4px 6px;">Item / Expense</th><th style="padding:4px 6px;">Qty</th><th style="padding:4px 6px;">Unit Price</th>
          <th style="padding:4px 6px;">VAT %</th><th style="padding:4px 6px;text-align:right;">Total</th><th></th>
        </tr></thead>
        <tbody id="billItemsBody">${itemRows}</tbody>
      </table>
      <button class="bk-btn bk-btn-outline" onclick="addBillLine()">+ Add line</button>
      <div style="text-align:right;margin-top:16px;font-size:0.85rem;">
        <div style="margin-bottom:4px;color:var(--muted);">Subtotal: <span id="billSubtotal">₦0</span></div>
        <div style="margin-bottom:8px;color:var(--muted);">VAT: <span id="billVatTotal">₦0</span></div>
        <div style="font-size:1.15rem;font-weight:800;">Total: <span id="billGrandTotal">₦0</span></div>
      </div>
      <div class="bk-field" style="margin-top:16px;"><label class="bk-label">Notes</label><textarea class="bk-input" id="billNotes" placeholder="Optional">${escH(bill.notes || '')}</textarea></div>
      <div style="display:flex;gap:10px;margin-top:16px;justify-content:flex-end;">
        <button class="bk-btn bk-btn-outline" onclick="saveBillAs('draft')" id="billDraftBtn">Save Draft</button>
        <button class="bk-btn bk-btn-gold" onclick="saveBillAs('received')" id="billRecordBtn">${editingBillId ? 'Update Bill' : 'Record Bill'}</button>
      </div>
    </div>
  `;
  recalcBillTotals();
}

function addBillLine() {
  currentBillItems.push({ description: '', quantity: 1, unit_price: 0, vat_rate: AP_DEFAULT_VAT_RATE });
  renderBillBuilder({
    vendor_id: document.getElementById('billVendor')?.value,
    vendor_ref: document.getElementById('billVendorRef')?.value,
    bill_date: document.getElementById('billDate')?.value,
    due_date: document.getElementById('billDueDate')?.value,
    notes: document.getElementById('billNotes')?.value,
  });
}
function removeBillLine(i) {
  if (currentBillItems.length <= 1) { alert('A bill needs at least one line item.'); return; }
  currentBillItems.splice(i, 1);
  renderBillBuilder({
    vendor_id: document.getElementById('billVendor')?.value,
    vendor_ref: document.getElementById('billVendorRef')?.value,
    bill_date: document.getElementById('billDate')?.value,
    due_date: document.getElementById('billDueDate')?.value,
    notes: document.getElementById('billNotes')?.value,
  });
}
function recalcBillTotals() {
  let subtotal = 0, vatTotal = 0;
  currentBillItems.forEach((it, i) => {
    const lineBase = (parseFloat(it.quantity) || 0) * (parseFloat(it.unit_price) || 0);
    const lineVat = lineBase * ((parseFloat(it.vat_rate) || 0) / 100);
    it.line_total = lineBase + lineVat;
    subtotal += lineBase;
    vatTotal += lineVat;
    const cell = document.getElementById('billLineTotal_' + i);
    if (cell) cell.textContent = '₦' + it.line_total.toLocaleString(undefined, { maximumFractionDigits: 2 });
  });
  const total = subtotal + vatTotal;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = '₦' + val.toLocaleString(undefined, { maximumFractionDigits: 2 }); };
  set('billSubtotal', subtotal); set('billVatTotal', vatTotal); set('billGrandTotal', total);
  return { subtotal, vatTotal, total };
}

// ── BILLS: SAVE ───────────────────────────────────────────────
async function saveBillAs(targetStatus) {
  const vendorId = document.getElementById('billVendor').value;
  if (!vendorId) { alert('Please select a vendor.'); return; }
  const validItems = currentBillItems.filter(it => it.description.trim() && (parseFloat(it.unit_price) || 0) >= 0);
  if (!validItems.length) { alert('Add at least one line item with a description.'); return; }

  const btn = document.getElementById(targetStatus === 'draft' ? 'billDraftBtn' : 'billRecordBtn');
  const originalText = btn.textContent;
  btn.textContent = 'Saving…'; btn.disabled = true;

  const { subtotal, vatTotal, total } = recalcBillTotals();
  const billDate = document.getElementById('billDate').value || new Date().toISOString().slice(0, 10);
  const dueDate = document.getElementById('billDueDate').value || null;
  const vendorRef = document.getElementById('billVendorRef').value.trim() || null;
  const notes = document.getElementById('billNotes').value.trim();
  const bizId = activeBusiness?.id || null;

  try {
    let billId = editingBillId;
    let billNumber;
    let wasAlreadyRecorded = false;

    if (billId) {
      const { data: existing } = await bkDb.from('bk_bills').select('bill_number,status').eq('id', billId).single();
      billNumber = existing?.bill_number;
      wasAlreadyRecorded = existing && existing.status !== 'draft';

      const { error } = await bkDb.from('bk_bills').update({
        vendor_id: vendorId, vendor_ref: vendorRef, bill_date: billDate, due_date: dueDate, notes,
        subtotal, vat_total: vatTotal, total, status: targetStatus, updated_at: new Date().toISOString(),
      }).eq('id', billId);
      if (error) throw error;
      await bkDb.from('bk_bill_items').delete().eq('bill_id', billId);
    } else {
      billNumber = await getNextDocNumber('bk_bills', 'bill_number', 'BILL');
      const { data: created, error } = await bkDb.from('bk_bills').insert({
        user_id: bkUser.id, business_id: bizId, vendor_id: vendorId, bill_number: billNumber,
        vendor_ref: vendorRef, bill_date: billDate, due_date: dueDate, notes,
        subtotal, vat_total: vatTotal, total, status: targetStatus,
      }).select().single();
      if (error) throw error;
      billId = created.id;
    }

    const itemRows = validItems.map((it, i) => ({
      bill_id: billId, business_id: bizId, description: it.description.trim(),
      quantity: parseFloat(it.quantity) || 0, unit_price: parseFloat(it.unit_price) || 0,
      vat_rate: parseFloat(it.vat_rate) || 0, line_total: it.line_total || 0, sort_order: i,
    }));
    await bkDb.from('bk_bill_items').insert(itemRows);

    // Only post to the ledger the first time a bill moves out of draft —
    // re-saving an already-recorded bill should not double-post.
    if (targetStatus === 'received' && !wasAlreadyRecorded) {
      await postBillToLedger({ id: billId, business_id: bizId, bill_number: billNumber, subtotal, vat_total: vatTotal, bill_date: billDate });
    }

    editingBillId = null;
    currentBillItems = [];
    await showBillsPage();
  } catch (e) {
    console.error('saveBillAs failed', e);
    alert('Could not save bill: ' + (e.message || JSON.stringify(e)));
    btn.textContent = originalText; btn.disabled = false;
  }
}

// Debit Purchases (subtotal) and, as a second linked entry, Debit VAT
// Receivable (the VAT portion) — Credit Accounts Payable (full total) in
// both. Mirrors postInvoiceToLedger()'s two-entry shape exactly, with
// the debit/credit roles swapped: a bill increases what the business
// owes (a liability), not what it's owed (an asset).
async function postBillToLedger(bill) {
  const bizId = bill.business_id || null;
  const narration = `Bill ${bill.bill_number}`;

  const firstJournalId = await postJournalPair({
    date: bill.bill_date, narration,
    debitAccount: 'Purchases', debitType: 'expenditure',
    creditAccount: 'Accounts Payable', creditType: 'liability',
    amount: bill.subtotal, bizId, billId: bill.id,
  });

  if (bill.vat_total > 0) {
    await postJournalPair({
      date: bill.bill_date, narration: narration + ' (VAT)',
      debitAccount: 'VAT Receivable', debitType: 'asset',
      creditAccount: 'Accounts Payable', creditType: 'liability',
      amount: bill.vat_total, bizId, billId: bill.id,
    });
  }

  return firstJournalId;
}

// Debit Accounts Payable — Credit Cash/Bank. Reduces what's owed to the
// vendor and records the cash actually paid out — the mirror image of
// postPaymentToLedger() in the Sales module.
async function postVendorPaymentToLedger(payment, bill) {
  const bizId = bill.business_id || null;
  const cashAcct = payment.payment_mode === 'cash' ? 'Cash in Hand' : 'Cash at Bank';
  const narration = `Payment to vendor — Bill ${bill.bill_number}`;
  return postJournalPair({
    date: payment.payment_date, narration,
    debitAccount: 'Accounts Payable', debitType: 'liability',
    creditAccount: cashAcct, creditType: 'asset',
    amount: payment.amount, bizId, billId: bill.id,
  });
}

// ── BILLS: VIEW + PAYMENT ─────────────────────────────────────
async function viewBill(id) {
  bdSaveRoute('ap-view-bill');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading…</div>';

  const [{ data: bill }, { data: items }, { data: vendorRow }, { data: payments }] = await Promise.all([
    bkDb.from('bk_bills').select('*').eq('id', id).single(),
    bkDb.from('bk_bill_items').select('*').eq('bill_id', id).order('sort_order'),
    bkDb.from('bk_bills').select('vendor_id').eq('id', id).single()
      .then(r => r.data ? bkDb.from('bk_suppliers').select('*').eq('id', r.data.vendor_id).single() : { data: null }),
    bkDb.from('bk_vendor_payments').select('*').eq('bill_id', id).order('payment_date', { ascending: false }),
  ]);

  if (!bill) { document.getElementById('bkContent').innerHTML = '<div class="bk-empty">Bill not found.</div>'; return; }

  const vendor = vendorRow ? _apMapVendorRow(vendorRow) : null;
  const balance = (parseFloat(bill.total) || 0) - (parseFloat(bill.amount_paid) || 0);
  const status = displayBillStatus(bill);
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
      <div><div class="bk-content-title">${escH(bill.bill_number)}</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">${escH(vendor?.name || 'Unknown vendor')} · ${billStatusBadge(status)}</div></div>
      <div style="display:flex;gap:8px;">
        ${bill.status === 'draft' ? `<button class="bk-btn bk-btn-outline" onclick="showNewBillPage('${bill.id}')">Edit</button>` : ''}
        ${balance > 0 && bill.status !== 'draft' && bill.status !== 'void' ? `<button class="bk-btn bk-btn-gold" onclick="showRecordVendorPaymentModal('${bill.id}', ${balance})">Record Payment</button>` : ''}
        <button class="bk-btn bk-btn-outline" onclick="showBillsPage()">← Back</button>
      </div>
    </div>
    <div style="padding:16px 24px;max-width:820px;">
      <div style="display:flex;justify-content:space-between;color:var(--muted);font-size:0.8rem;margin-bottom:16px;">
        <span>Received: ${bill.bill_date || '—'}</span><span>Due: ${bill.due_date || '—'}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;">
          <th style="padding:4px 6px;">Item</th><th style="padding:4px 6px;text-align:right;">Qty</th><th style="padding:4px 6px;text-align:right;">Price</th>
          <th style="padding:4px 6px;text-align:right;">VAT</th><th style="padding:4px 6px;text-align:right;">Total</th></tr></thead>
        <tbody>${itemRows}</tbody>
      </table>
      <div style="text-align:right;margin-top:16px;font-size:0.85rem;">
        <div style="color:var(--muted);">Subtotal: ₦${(parseFloat(bill.subtotal) || 0).toLocaleString()}</div>
        <div style="color:var(--muted);margin-bottom:6px;">VAT: ₦${(parseFloat(bill.vat_total) || 0).toLocaleString()}</div>
        <div style="font-size:1.1rem;font-weight:800;">Total: ₦${(parseFloat(bill.total) || 0).toLocaleString()}</div>
        <div style="color:var(--muted);margin-top:6px;">Paid: ₦${(parseFloat(bill.amount_paid) || 0).toLocaleString()}</div>
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
    <div class="bk-modal-overlay hidden" id="vendorPaymentModalOverlay">
      <div class="bk-modal">
        <h3>Record Payment</h3>
        <input class="bk-input" type="hidden" id="vpBillId" value="${bill.id}"/>
        <div class="bk-field"><label class="bk-label">Amount</label><input class="bk-input" type="number" id="vpAmount" min="0" step="any" max="${balance}"/></div>
        <div class="bk-field"><label class="bk-label">Payment Date</label><input class="bk-input" type="date" id="vpDate" value="${new Date().toISOString().slice(0, 10)}"/></div>
        <div class="bk-field"><label class="bk-label">Paid From</label>
          <select class="bk-input" id="vpMode"><option value="cash">Cash</option><option value="transfer">Bank Transfer</option><option value="pos">POS</option><option value="cheque">Cheque</option></select>
        </div>
        <div class="bk-modal-actions">
          <button class="bk-btn bk-btn-outline" style="flex:1;" onclick="document.getElementById('vendorPaymentModalOverlay').classList.add('hidden')">Cancel</button>
          <button class="bk-btn bk-btn-gold" style="flex:1;" id="vpSaveBtn" onclick="recordVendorPayment()">Save</button>
        </div>
      </div>
    </div>
  `;
}

function showRecordVendorPaymentModal(billId, balance) {
  document.getElementById('vpBillId').value = billId;
  document.getElementById('vpAmount').value = balance;
  document.getElementById('vendorPaymentModalOverlay').classList.remove('hidden');
}

async function recordVendorPayment() {
  const billId = document.getElementById('vpBillId').value;
  const amount = parseFloat(document.getElementById('vpAmount').value) || 0;
  if (amount <= 0) { alert('Enter a valid payment amount.'); return; }

  const btn = document.getElementById('vpSaveBtn');
  btn.textContent = 'Saving…'; btn.disabled = true;

  try {
    const { data: bill } = await bkDb.from('bk_bills').select('*').eq('id', billId).single();
    if (!bill) throw new Error('Bill not found');

    const payment = {
      user_id: bkUser.id, business_id: bill.business_id, bill_id: billId, amount,
      payment_date: document.getElementById('vpDate').value, payment_mode: document.getElementById('vpMode').value,
    };
    const { data: createdPayment, error } = await bkDb.from('bk_vendor_payments').insert(payment).select().single();
    if (error) throw error;

    const newAmountPaid = (parseFloat(bill.amount_paid) || 0) + amount;
    const newStatus = newAmountPaid >= parseFloat(bill.total) ? 'paid' : 'partial';
    await bkDb.from('bk_bills').update({ amount_paid: newAmountPaid, status: newStatus, updated_at: new Date().toISOString() }).eq('id', billId);

    await postVendorPaymentToLedger(createdPayment, bill);

    await viewBill(billId);
  } catch (e) {
    console.error('recordVendorPayment failed', e);
    alert('Could not record payment: ' + (e.message || JSON.stringify(e)));
    btn.textContent = 'Save'; btn.disabled = false;
  }
}

// ── ACCOUNTS PAYABLE AGING ────────────────────────────────────
async function showAPAgingPage() {
  bdSaveRoute('ap-aging');
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading…</div>';

  const [{ data: bills }, { data: vendors }] = await Promise.all([
    bkDb.from('bk_bills').select('*').match(bizMatch()).neq('status', 'draft').neq('status', 'void'),
    acctBizFilter(bkDb.from('bk_suppliers').select('id,supplier_name')),
  ]);
  const vendMap = Object.fromEntries((vendors || []).map(v => [v.id, v.supplier_name]));

  const buckets = {}; // vendor_id -> { current, d1_30, d31_60, d60plus, total }
  const today = new Date(new Date().toDateString());

  (bills || []).forEach(bill => {
    const balance = (parseFloat(bill.total) || 0) - (parseFloat(bill.amount_paid) || 0);
    if (balance <= 0) return;
    const key = bill.vendor_id;
    if (!buckets[key]) buckets[key] = { current: 0, d1_30: 0, d31_60: 0, d60plus: 0, total: 0 };

    const due = bill.due_date ? new Date(bill.due_date) : today;
    const daysOverdue = Math.floor((today - due) / 86400000);

    if (daysOverdue <= 0) buckets[key].current += balance;
    else if (daysOverdue <= 30) buckets[key].d1_30 += balance;
    else if (daysOverdue <= 60) buckets[key].d31_60 += balance;
    else buckets[key].d60plus += balance;
    buckets[key].total += balance;
  });

  const rows = Object.entries(buckets).sort((a, b) => b[1].total - a[1].total).map(([vendId, b]) => `
    <tr>
      <td style="padding:10px 12px;font-weight:600;">${escH(vendMap[vendId] || 'Unknown vendor')}</td>
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
      <div><div class="bk-content-title">ACCOUNTS PAYABLE AGING</div><div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">What's owed to vendors, and how overdue</div></div>
    </div>
    <div class="bk-sheet-wrap" style="padding:16px 24px;">
      ${Object.keys(buckets).length ? `
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="text-align:left;font-size:0.7rem;color:var(--muted);text-transform:uppercase;">
          <th style="padding:6px 12px;">Vendor</th><th style="padding:6px 12px;text-align:right;">Current</th>
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
      </table>` : `<div class="bk-empty">Nothing owed — every bill is paid up.</div>`}
    </div>
  `;
}
