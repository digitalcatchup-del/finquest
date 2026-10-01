// ── Bank Feeds module (Mono + Plaid) — lazy-loaded like sales-module.js
// and ap-module.js, only fetched when the user actually opens the
// "Bank Feeds" nav item. Phase 1: connect + manual review/post. No
// webhooks/auto-sync yet (see plaid_integration_plan.md Phase 2).
//
// Reuses the exact same shared helpers the rest of the app's double
// entry posting already relies on: bizMatch(), acctBizFilter(),
// acctBizStamp(), postJournalPair(), ensureAccountExists(), escH(),
// bdToast(), staffHideChrome(), and the gold/white/italic account
// picker CSS (.apk-*) already shipped for the Master Journal.

let bfBankItems = [];
let bfStagedRows = [];
let _bfPickerCtx = null;

async function showBankFeedsPage() {
  staffHideChrome();
  document.getElementById('bkContent').innerHTML = '<div class="bk-loading">Loading bank feeds…</div>';

  const { data } = await acctBizFilter(bkDb.from('bk_bank_items_safe').select('*')).order('created_at', { ascending: false });
  bfBankItems = data || [];

  document.getElementById('bkContent').innerHTML =
    '<div class="bk-content-header">'
    + '<div><div class="bk-content-title">BANK FEEDS</div>'
    + '<div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">' + escH(businessDisplayName) + '</div></div>'
    + '<button class="bk-btn" style="background:var(--gold);color:#000;font-weight:800;" onclick="bfOpenConnectModal()">+ Connect Bank Account</button>'
    + '</div>'
    + '<div id="bfAccountsList" class="bf-accounts-list">' + bfRenderAccountsList() + '</div>'
    + '<div id="bfReviewArea"></div>';

  if (bfBankItems.length) await bfOpenReview(bfBankItems[0].id);
}

function bfRenderAccountsList() {
  if (!bfBankItems.length) {
    return '<div class="bf-empty">No bank accounts connected yet. Click "+ Connect Bank Account" to link a Nigerian bank (via Mono) or a US bank (via Plaid).</div>';
  }
  return bfBankItems.map(item => {
    const providerTag = item.provider === 'mono' ? 'via Mono' : 'via Plaid';
    const statusCls = item.status === 'connected' ? 'bf-status-ok' : 'bf-status-attn';
    const statusLabel = item.status === 'connected' ? 'Connected' : 'Needs attention';
    return '<div class="bf-acct-card" onclick="bfOpenReview(\'' + item.id + '\')">'
      + '<div class="bf-acct-info">'
      + '<div class="bf-acct-name">' + escH(item.account_name || item.institution_name || 'Connected account')
      + ' <span class="bf-provider-tag bf-provider-' + item.provider + '">' + providerTag + '</span></div>'
      + '<div class="bf-acct-sub">' + escH(businessDisplayName) + (item.last_synced_at ? ' · last synced ' + bfTimeAgo(item.last_synced_at) : '') + '</div>'
      + '</div>'
      + '<div class="bf-acct-right">'
      + '<span class="bf-status-pill ' + statusCls + '">' + statusLabel + '</span>'
      + '<button class="bk-btn" onclick="event.stopPropagation();bfSync(\'' + item.id + '\')">Refresh</button>'
      + '</div></div>';
  }).join('');
}

function bfTimeAgo(iso) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + ' minute' + (mins===1?'':'s') + ' ago';
  const hrs = Math.round(mins/60);
  if (hrs < 24) return hrs + ' hour' + (hrs===1?'':'s') + ' ago';
  return Math.round(hrs/24) + ' day(s) ago';
}

async function bfSync(bankItemId) {
  bdToast('Syncing…');
  try {
    const res = await fetch('/api/bankfeed/sync', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bank_item_id: bankItemId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Sync failed');
    bdToast('✓ Synced ' + data.synced + ' new transaction(s)');
  } catch (e) {
    bdToast('Could not sync: ' + (e.message || ''));
  }
  await showBankFeedsPage();
}

// ── Connect flow: our own routing step, then the real provider widget ──
function bfOpenConnectModal() {
  const wrap = document.createElement('div');
  wrap.id = 'bfConnectModal';
  wrap.className = 'bf-modal-wrap';
  wrap.innerHTML = '<div class="bf-modal">'
    + '<div class="bf-modal-header">Connect a bank account<div style="font-size:0.78rem;color:var(--muted);margin-top:2px;">Where is this account held?</div></div>'
    + '<div class="bf-modal-body">'
    + '<div class="bf-provider-choice" onclick="bfStartConnect(\'mono\')"><div class="bf-provider-choice-icon">🇳🇬</div><div><div style="font-weight:700;font-size:0.85rem;">Nigerian bank</div><div style="font-size:0.72rem;color:var(--muted);">GTBank, Access, Zenith, First Bank &amp; more — via Mono</div></div></div>'
    + '<div class="bf-provider-choice" onclick="bfStartConnect(\'plaid\')"><div class="bf-provider-choice-icon">🇺🇸</div><div><div style="font-weight:700;font-size:0.85rem;">US bank</div><div style="font-size:0.72rem;color:var(--muted);">Chase, Bank of America, Wells Fargo &amp; more — via Plaid</div></div></div>'
    + '</div></div>';
  wrap.addEventListener('click', e => { if (e.target === wrap) wrap.remove(); });
  document.body.appendChild(wrap);
}

async function bfStartConnect(provider) {
  document.getElementById('bfConnectModal')?.remove();
  try {
    const res = await fetch('/api/bankfeed/link-token', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, user_id: bkUser.id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not start connection');

    if (provider === 'plaid') {
      await bkLoadScriptOnce('https://cdn.plaid.com/link/v2/stable/link-initialize.js');
      const handler = Plaid.create({
        token: data.link_token,
        onSuccess: async (public_token, metadata) => {
          await bfFinishConnect({ provider: 'plaid', public_token, account_name: metadata?.institution?.name });
        },
        onExit: () => {},
      });
      handler.open();
    } else if (provider === 'mono') {
      // Mono Connect isn't distributed as a plain CDN <script> global —
      // it's published as an npm/ES module package (@mono.co/connect.js).
      // jsDelivr's `+esm` endpoint serves any npm package pre-bundled as
      // a native browser ES module, so a dynamic import() works here
      // without adding a bundler to this app.
      const { default: Connect } = await import('https://cdn.jsdelivr.net/npm/@mono.co/connect.js/+esm');
      const handler = new Connect({
        key: data.public_key,
        onSuccess: async ({ code }) => {
          await bfFinishConnect({ provider: 'mono', code });
        },
        onClose: () => {},
      });
      handler.setup();
      handler.open();
    }
  } catch (e) {
    bdToast('Could not open connect widget: ' + (e.message || ''));
  }
}

async function bfFinishConnect({ provider, public_token, code, account_name }) {
  bdToast('Finishing connection…');
  try {
    const res = await fetch('/api/bankfeed/exchange-token', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider, public_token, code, account_name,
        user_id: bkUser.id, business_id: activeBusiness?.id || null,
        country: provider === 'mono' ? 'NG' : 'US',
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not finish connecting');
    bdToast('✓ Bank account connected — syncing first transactions…');
    await bfSync(data.bank_item.id);
  } catch (e) {
    bdToast('Could not connect: ' + (e.message || ''));
  }
}

// ── Review & categorize ───────────────────────────────────────
async function bfOpenReview(bankItemId) {
  const item = bfBankItems.find(b => b.id === bankItemId);
  if (!item) return;
  const { data } = await bkDb.from('bk_bank_feed_transactions').select('*')
    .eq('bank_item_id', bankItemId).neq('status', 'posted')
    .order('txn_date', { ascending: false });
  bfStagedRows = data || [];

  const rowsHtml = bfStagedRows.length ? bfStagedRows.map((r, idx) => {
    const amtCls = r.amount < 0 ? 'bf-amt-debit' : 'bf-amt-credit';
    const amtStr = (r.amount < 0 ? '− ' : '+ ') + Math.abs(r.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
    const acctDisp = r.category_account_name
      ? '<div class="bk-acct-disp" onclick="bfAcctPickerOpen(' + idx + ',event)">' + escH(r.category_account_name) + '</div>'
      : '<div class="bk-acct-disp placeholder" onclick="bfAcctPickerOpen(' + idx + ',event)">Select Account</div>';
    const canPost = r.status !== 'excluded' && !!r.category_account_name;
    return '<tr>'
      + '<td>' + escH(r.txn_date) + '</td>'
      + '<td><div class="rt-desc">' + escH(r.description||'') + '</div></td>'
      + '<td class="' + amtCls + '">' + amtStr + '</td>'
      + '<td>' + acctDisp + '</td>'
      + '<td><span class="status-badge badge-' + r.status + '">' + r.status + '</span></td>'
      + '<td>' + (canPost
          ? '<button class="row-action primary" onclick="bfPostRow(' + idx + ')">Post</button>'
          : '<button class="row-action ghost" onclick="bfExcludeRow(' + idx + ')">Exclude</button>') + '</td>'
      + '</tr>';
  }).join('') : '<tr><td colspan="6" style="color:var(--muted);padding:16px;">No unreviewed transactions for this account.</td></tr>';

  document.getElementById('bfReviewArea').innerHTML =
    '<div class="panel" style="margin-top:16px;">'
    + '<div style="font-weight:700;font-size:0.9rem;margin-bottom:4px;">' + escH(item.account_name || item.institution_name || '') + ' <span class="bf-provider-tag bf-provider-' + item.provider + '">via ' + (item.provider==='mono'?'Mono':'Plaid') + '</span></div>'
    + '<div style="font-size:0.78rem;color:var(--muted);margin-bottom:14px;">Review each transaction below and assign the other side of the entry before it posts to your ledger.</div>'
    + '<table class="rt-table"><thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Category (Debit/Credit Account)</th><th>Status</th><th></th></tr></thead>'
    + '<tbody>' + rowsHtml + '</tbody></table></div>';
}

function bfAcctPickerOpen(idx, ev) {
  ev.stopPropagation();
  document.getElementById('acctPickerPortal')?.remove();
  const anchor = ev.currentTarget;
  const row = bfStagedRows[idx];
  const currentVal = row.category_account_name || '';
  _bfPickerCtx = { idx, anchor };

  const rowHtml = (a, type, isChild) => {
    const sel = a.account_name === currentVal ? ' sel' : '';
    return '<div class="apk-acct' + (isChild?' apk-child':'') + sel + '" data-val="' + escH(a.account_name) + '|' + type + '" onclick="bfAcctPickerChoose(event)">' + escH(a.account_name) + '</div>';
  };
  let listHtml = '';
  _acctPickerStructure().forEach(({type, buckets}, ti) => {
    listHtml += '<div class="apk-type' + (ti>0?' apk-type-sep':'') + '">' + escH(type) + '</div>';
    buckets.forEach(({label, items}) => {
      listHtml += '<div class="apk-sub">' + escH(label) + '</div>';
      items.forEach(({account, children}) => {
        listHtml += rowHtml(account, type, false);
        children.forEach(c => { listHtml += rowHtml(c, type, true); });
      });
    });
  });

  const wrap = document.createElement('div');
  wrap.id = 'acctPickerPortal';
  wrap.style.cssText = 'position:fixed;inset:0;z-index:12000;';
  const panel = document.createElement('div');
  panel.className = 'apk-panel';
  panel.innerHTML = listHtml;
  wrap.appendChild(panel);
  document.body.appendChild(wrap);

  const rect = anchor.getBoundingClientRect();
  requestAnimationFrame(() => {
    const pw = panel.offsetWidth || 260;
    const naturalH = panel.scrollHeight;
    let left = Math.max(8, Math.min(rect.left, window.innerWidth - pw - 8));
    let top = rect.bottom + 4;
    let maxH = window.innerHeight - top - 8;
    panel.style.left = left+'px';
    panel.style.top = top+'px';
    panel.style.maxHeight = Math.min(naturalH, maxH)+'px';
  });
  setTimeout(() => { document.addEventListener('click', _bfPickerOutsideClick, true); }, 10);
}
function _bfPickerOutsideClick(e) {
  const panel = document.getElementById('acctPickerPortal');
  if (panel && !panel.contains(e.target)) {
    panel.remove();
    document.removeEventListener('click', _bfPickerOutsideClick, true);
  }
}
function bfAcctPickerChoose(ev) {
  ev.stopPropagation();
  const val = ev.currentTarget.dataset.val;
  const ctx = _bfPickerCtx;
  document.getElementById('acctPickerPortal')?.remove();
  document.removeEventListener('click', _bfPickerOutsideClick, true);
  if (!ctx) return;
  const [name, type] = val.split('|');
  bfStagedRows[ctx.idx].category_account_name = name;
  bfStagedRows[ctx.idx].category_record_type = type;
  bfStagedRows[ctx.idx].status = 'ready';
  if (ctx.anchor) { ctx.anchor.classList.remove('placeholder'); ctx.anchor.innerHTML = escH(name); }
  bkDb.from('bk_bank_feed_transactions').update({
    category_account_name: name, category_record_type: type, status: 'ready',
  }).eq('id', bfStagedRows[ctx.idx].id);
}

async function bfExcludeRow(idx) {
  const row = bfStagedRows[idx];
  await bkDb.from('bk_bank_feed_transactions').update({ status: 'excluded' }).eq('id', row.id);
  bdToast('Excluded — won\'t be posted');
  await bfOpenReview(row.bank_item_id);
}

// Posts a staged bank-feed transaction through the SAME shared
// double-entry helper (postJournalPair) every other part of this app
// already uses — one leg is the bank's own asset account (automatic),
// the other leg is whatever category the user picked.
async function bfPostRow(idx) {
  const row = bfStagedRows[idx];
  const item = bfBankItems.find(b => b.id === row.bank_item_id);
  if (!row.category_account_name) { bdToast('Pick a category account first'); return; }

  const bankAccountName = item.bank_asset_account_name || item.account_name;
  await ensureAccountExists(bankAccountName, 'asset');
  const amount = Math.abs(row.amount);
  const narration = row.description || 'Bank feed transaction';

  let journalId;
  if (row.amount < 0) {
    // Money left the bank: debit the category (expense/liability/etc), credit the bank asset account.
    journalId = await postJournalPair({
      date: row.txn_date, narration,
      debitAccount: row.category_account_name, debitType: row.category_record_type,
      creditAccount: bankAccountName, creditType: 'asset',
      amount, bizId: item.business_id,
    });
  } else {
    // Money came into the bank: debit the bank asset account, credit the category (income/etc).
    journalId = await postJournalPair({
      date: row.txn_date, narration,
      debitAccount: bankAccountName, debitType: 'asset',
      creditAccount: row.category_account_name, creditType: row.category_record_type,
      amount, bizId: item.business_id,
    });
  }

  if (!journalId) { bdToast('Could not post — see console for details'); return; }

  await bkDb.from('bk_bank_feed_transactions').update({ status: 'posted', journal_id: journalId }).eq('id', row.id);
  bdToast('✓ Posted to ' + row.category_account_name);
  await bfOpenReview(row.bank_item_id);
}
