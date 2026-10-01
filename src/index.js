import { plaidCreateLinkToken, plaidExchangePublicToken, plaidSyncTransactions } from './providers/plaid.js';
import { monoGetWidgetConfig, monoExchangeCode, monoGetAccount, monoGetTransactions } from './providers/mono.js';
import { supaInsert, supaSelect, supaUpdate, supaUpsertIgnoreDup } from './supabase.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function readJson(request) {
  try { return await request.json(); } catch (e) { return {}; }
}

// ── Bank feed API routes ────────────────────────────────────────
// Everything under /api/bankfeed/* talks to Plaid/Mono and Supabase
// using secrets that only this Worker holds — the browser never sees
// PLAID_SECRET, MONO_SECRET_KEY, or SUPABASE_SERVICE_ROLE_KEY.
async function handleBankfeedRoute(request, env, path) {
  if (path === '/api/bankfeed/link-token' && request.method === 'POST') {
    const { provider, user_id } = await readJson(request);
    if (provider === 'plaid') {
      const data = await plaidCreateLinkToken(env, { userId: user_id || 'anonymous' });
      return json(data);
    }
    if (provider === 'mono') {
      return json(monoGetWidgetConfig(env));
    }
    return json({ error: 'Unknown provider' }, 400);
  }

  if (path === '/api/bankfeed/exchange-token' && request.method === 'POST') {
    const { provider, user_id, business_id, country, account_name, public_token, code } = await readJson(request);
    if (!user_id) return json({ error: 'user_id is required' }, 400);

    let itemRow;
    if (provider === 'plaid') {
      if (!public_token) return json({ error: 'public_token is required for Plaid' }, 400);
      const { access_token, item_id } = await plaidExchangePublicToken(env, { publicToken: public_token });
      itemRow = {
        user_id, business_id: business_id || null, provider: 'plaid',
        provider_item_id: item_id, access_handle: access_token,
        institution_name: null, account_name: account_name || null,
        bank_asset_account_name: account_name || null,
        country: country || 'US', status: 'connected',
      };
    } else if (provider === 'mono') {
      if (!code) return json({ error: 'code is required for Mono' }, 400);
      const { account_id } = await monoExchangeCode(env, { code });
      let institutionName = null;
      let accountNumberMasked = null;
      try {
        const acct = await monoGetAccount(env, { accountId: account_id });
        institutionName = acct?.institution?.name || null;
        const num = acct?.accountNumber || acct?.account_number;
        if (num) accountNumberMasked = '••' + String(num).slice(-4);
      } catch (e) { /* non-fatal — proceed without institution name */ }
      // The frontend never has an account name to send for Mono (unlike
      // Plaid, which gets one from its own widget metadata) — fall back
      // to "Institution — ••1234" built from what Mono's account lookup
      // gives us, so the connected account never shows up blank.
      const resolvedName = account_name
        || [institutionName, accountNumberMasked].filter(Boolean).join(' — ')
        || 'Connected bank account';
      itemRow = {
        user_id, business_id: business_id || null, provider: 'mono',
        provider_item_id: account_id, access_handle: account_id,
        institution_name: institutionName, account_name: resolvedName,
        bank_asset_account_name: resolvedName,
        country: country || 'NG', status: 'connected',
      };
    } else {
      return json({ error: 'Unknown provider' }, 400);
    }

    const [saved] = await supaInsert(env, 'bk_bank_items', [itemRow]);
    return json({ bank_item: saved });
  }

  if (path === '/api/bankfeed/sync' && request.method === 'POST') {
    const { bank_item_id } = await readJson(request);
    if (!bank_item_id) return json({ error: 'bank_item_id is required' }, 400);

    const [item] = await supaSelect(env, 'bk_bank_items', { id: bank_item_id });
    if (!item) return json({ error: 'Bank item not found' }, 404);

    let staged = [];
    if (item.provider === 'plaid') {
      const result = await plaidSyncTransactions(env, { accessToken: item.access_handle });
      staged = (result.added || []).map(t => ({
        user_id: item.user_id, business_id: item.business_id, bank_item_id: item.id,
        provider: 'plaid', provider_transaction_id: t.transaction_id,
        txn_date: t.date, description: t.name,
        // Plaid: positive amount = money OUT of the account. Normalize
        // so positive = money IN everywhere in our own staging table.
        amount: -t.amount, status: 'unmatched',
      }));
    } else if (item.provider === 'mono') {
      const { transactions } = await monoGetTransactions(env, { accountId: item.access_handle });
      staged = transactions.map(t => ({
        user_id: item.user_id, business_id: item.business_id, bank_item_id: item.id,
        provider: 'mono', provider_transaction_id: t._id || t.id,
        txn_date: (t.date || '').slice(0, 10), description: t.narration,
        // Mono: type 'credit' = money in, 'debit' = money out. Amount is in kobo.
        amount: (t.type === 'credit' ? 1 : -1) * (Number(t.amount) || 0) / 100,
        status: 'unmatched',
      }));
    }

    const saved = staged.length
      ? await supaUpsertIgnoreDup(env, 'bk_bank_feed_transactions', staged, 'bank_item_id,provider_transaction_id')
      : [];
    await supaUpdate(env, 'bk_bank_items', { id: item.id }, { last_synced_at: new Date().toISOString() });
    return json({ synced: saved.length });
  }

  return json({ error: 'Not found' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/bankfeed/')) {
      try {
        return await handleBankfeedRoute(request, env, url.pathname);
      } catch (err) {
        return json({ error: String(err.message || err) }, 500);
      }
    }

    if (url.hostname === 'app.butterflydynamixllc.com') {
      // Let actual asset files (JS, CSS, images, fonts, etc.) resolve
      // normally — bookkeeping.html references these by absolute path
      // (e.g. /bookkeeping-app.js), so they must pass through unchanged.
      // Only page-level requests get redirected to the bookkeeping app.
      const isAssetFile = /\.(js|css|png|jpg|jpeg|svg|ico|json|woff2?|ttf|map|webmanifest)$/i.test(url.pathname);
      if (!isAssetFile) {
        // No .html extension here on purpose — an existing zone-wide
        // Redirect Rule strips .html from /bookkeeping.html requests
        // and 301s to /bookkeeping, which would otherwise fire here
        // too and visibly change the address bar. Requesting the
        // extension-less path directly avoids ever triggering that
        // rule, while still resolving to the same file (proven by the
        // main site already serving /bookkeeping this exact way).
        url.pathname = '/bookkeeping';
        return env.ASSETS.fetch(new Request(url, request));
      }
    }

    // Every other hostname (the main site) is untouched — normal
    // static asset serving, exactly as it already works today.
    return env.ASSETS.fetch(request);
  },
};
