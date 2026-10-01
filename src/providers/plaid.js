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
  const data = await res.json();
  if (!res.ok) throw new Error('Plaid ' + path + ' failed: ' + JSON.stringify(data));
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
