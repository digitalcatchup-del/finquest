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
  const data = await res.json();
  if (!res.ok) throw new Error('Mono ' + path + ' failed: ' + JSON.stringify(data));
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
  return { account_id: data.id };
}

export async function monoGetAccount(env, { accountId }) {
  const data = await monoRequest(env, '/v2/accounts/' + accountId);
  return data.account || data;
}

export async function monoGetTransactions(env, { accountId, page = 1 }) {
  const data = await monoRequest(env, '/v2/accounts/' + accountId + '/transactions?paginate=true&page=' + page);
  return { transactions: data.data || [], meta: data.meta || {} };
}
