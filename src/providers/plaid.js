// Plaid-specific calls. All of these use PLAID_CLIENT_ID/PLAID_SECRET,
// which must only ever be used server-side (here), never sent to the
// browser. Sandbox base URL is used until you're approved for
// production — swap PLAID_ENV to 'production' once you are.

function plaidBase(env) {
  const envName = env.PLAID_ENV || 'sandbox';
  return 'https://' + envName + '.plaid.com';
}

async function plaidPost(env, path, body) {
  const res = await fetch(plaidBase(env) + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: env.PLAID_CLIENT_ID,
      secret: env.PLAID_SECRET,
      ...body,
    }),
  });
  // Same defensive read as Mono — Plaid can return a non-JSON body
  // (rate limiting, a timeout, an outage page) and a bare res.json()
  // would throw an opaque "Unexpected end of JSON input" that hides
  // the real HTTP status and whatever Plaid actually sent back.
  const raw = await res.text();
  let data;
  try { data = JSON.parse(raw); }
  catch (parseErr) {
    throw new Error('Plaid ' + path + ' returned a non-JSON response (HTTP ' + res.status + '): ' + raw.slice(0, 300));
  }
  if (!res.ok) throw new Error('Plaid ' + path + ' failed (HTTP ' + res.status + '): ' + JSON.stringify(data));
  return data;
}

export async function plaidCreateLinkToken(env, { userId }) {
  const data = await plaidPost(env, '/link/token/create', {
    user: { client_user_id: userId },
    client_name: 'Butterfly Dynamix',
    products: ['transactions'],
    country_codes: ['US'],
    language: 'en',
  });
  return { link_token: data.link_token };
}

export async function plaidExchangePublicToken(env, { publicToken }) {
  const data = await plaidPost(env, '/item/public_token/exchange', { public_token: publicToken });
  return { access_token: data.access_token, item_id: data.item_id };
}

export async function plaidGetAccounts(env, { accessToken }) {
  const data = await plaidPost(env, '/accounts/get', { access_token: accessToken });
  return data.accounts || [];
}

// Returns { added, modified, removed, next_cursor, has_more } in Plaid's
// own shape — the caller normalizes into the shared staging-row shape.
export async function plaidSyncTransactions(env, { accessToken, cursor }) {
  return plaidPost(env, '/transactions/sync', {
    access_token: accessToken,
    cursor: cursor || undefined,
  });
}
