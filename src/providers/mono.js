// Mono-specific calls. MONO_SECRET_KEY must only ever be used
// server-side (here), never sent to the browser. MONO_PUBLIC_KEY is
// safe to hand to the frontend — it's the equivalent of a publishable
// key, used only to open the Mono Connect widget client-side.

const MONO_BASE = 'https://api.withmono.com';

async function monoRequest(env, path, { method = 'GET', body } = {}) {
  const res = await fetch(MONO_BASE + path, {
    method,
    headers: {
      'mono-sec-key': env.MONO_SECRET_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  // Read as text first — Mono's API can return a non-JSON body (an
  // empty response, an HTML rate-limit/error page, a timeout) and a
  // bare res.json() would then throw a generic "Unexpected end of JSON
  // input" that hides what Mono actually sent back and why.
  const raw = await res.text();
  let data;
  try { data = JSON.parse(raw); }
  catch (parseErr) {
    throw new Error('Mono ' + path + ' returned a non-JSON response (HTTP ' + res.status + '): ' + raw.slice(0, 300));
  }
  if (!res.ok) throw new Error('Mono ' + path + ' failed (HTTP ' + res.status + '): ' + JSON.stringify(data));
  return data;
}

// Mono Connect opens client-side with just the public key — there's no
// server-side "create a link token" call the way Plaid has one. This
// route exists anyway so the frontend has one consistent shape to call
// for both providers; for Mono it just hands back the public key.
export function monoGetWidgetConfig(env) {
  return { public_key: env.MONO_PUBLIC_KEY };
}

// After the widget succeeds, it gives the frontend a one-time `code`.
// Exchange it for a permanent account id (Mono's equivalent of Plaid's
// access_token) — this is the one and only server-side call Mono
// requires in the connect flow.
export async function monoExchangeCode(env, { code }) {
  const data = await monoRequest(env, '/v2/accounts/auth', { method: 'POST', body: { code } });
  // Mono's own docs show the id at the top level ({"id": "..."}), but
  // several of their other endpoints wrap responses in a {data: {...}}
  // envelope — accept either shape rather than guess, and fail loudly
  // (instead of silently inserting a null) if neither is present.
  const accountId = data.id || data.data?.id;
  if (!accountId) throw new Error('Mono /v2/accounts/auth did not return an account id. Raw response: ' + JSON.stringify(data));
  return { account_id: accountId };
}

export async function monoGetAccount(env, { accountId }) {
  const data = await monoRequest(env, '/v2/accounts/' + accountId);
  return data.account || data.data?.account || data.data || data;
}

export async function monoGetTransactions(env, { accountId, page = 1 }) {
  const data = await monoRequest(env, '/v2/accounts/' + accountId + '/transactions?paginate=true&page=' + page);
  const list = data.data?.data || data.data || [];
  return { transactions: Array.isArray(list) ? list : [], meta: data.meta || data.data?.meta || {} };
}

export async function monoGetBalance(env, { accountId }) {
  const acct = await monoGetAccount(env, { accountId });
  // Balance comes back in kobo, same convention as transaction amounts.
  const raw = acct?.balance;
  return { balance: typeof raw === 'number' ? raw / 100 : null, currency: acct?.currency || 'NGN' };
}

// ── Webhook verification ─────────────────────────────────────────
// Mono doesn't sign webhooks with a JWT the way Plaid does — it sends a
// shared secret (set in the Mono dashboard) back in the
// mono-webhook-secret header, and the check is a plain string compare.
// Still worth doing: without it, anyone who finds this URL could POST
// fake "new transaction" events into your review queue.
export function monoVerifyWebhook(env, secretHeader) {
  if (!env.MONO_WEBHOOK_SECRET) throw new Error('MONO_WEBHOOK_SECRET is not configured');
  if (!secretHeader || secretHeader !== env.MONO_WEBHOOK_SECRET) throw new Error('invalid webhook secret');
}
