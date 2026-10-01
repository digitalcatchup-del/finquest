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
    // Registers where Plaid should POST transaction-update events for
    // any item created from this Link session — without this, Plaid has
    // nowhere to send webhooks and auto-sync never fires.
    webhook: env.PLAID_WEBHOOK_URL || 'https://app.butterflydynamixllc.com/api/bankfeed/webhook/plaid',
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

// Phase 1 only ever links one account per item for a given business, so
// reconciliation just reads the first account's current balance rather
// than needing a stored per-account id.
export async function plaidGetBalance(env, { accessToken }) {
  const accounts = await plaidGetAccounts(env, { accessToken });
  const acct = accounts[0];
  return {
    balance: acct?.balances?.current ?? null,
    currency: acct?.balances?.iso_currency_code || 'USD',
  };
}

// ── Webhook signature verification ──────────────────────────────
// Plaid signs webhooks with a JWT in the Plaid-Verification header
// (ES256, keyed by `kid`). Verifying it (rather than trusting any POST
// to this URL) stops anyone from forging fake transactions into your
// ledger review queue. See https://plaid.com/docs/api/webhooks/webhook-verification/
const _plaidKeyCache = new Map();

function base64UrlToBytes(b64url) {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(b64url.length / 4) * 4, '=');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function sha256Hex(str) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function plaidVerifyWebhook(env, verificationHeader, rawBody) {
  if (!verificationHeader) throw new Error('missing Plaid-Verification header');
  const parts = verificationHeader.split('.');
  if (parts.length !== 3) throw new Error('malformed verification JWT');
  const [headerB64, payloadB64, sigB64] = parts;
  const header = JSON.parse(new TextDecoder().decode(base64UrlToBytes(headerB64)));
  const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payloadB64)));
  if (!header.kid) throw new Error('missing kid in verification JWT header');

  let jwk = _plaidKeyCache.get(header.kid);
  if (!jwk) {
    const data = await plaidPost(env, '/webhook_verification_key/get', { key_id: header.kid });
    jwk = data.key;
    if (!jwk) throw new Error('Plaid did not return a verification key for kid ' + header.kid);
    _plaidKeyCache.set(header.kid, jwk);
  }

  const cryptoKey = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
  const valid = await crypto.subtle.verify(
    { name: 'ECDSA', hash: 'SHA-256' },
    cryptoKey,
    base64UrlToBytes(sigB64),
    new TextEncoder().encode(headerB64 + '.' + payloadB64),
  );
  if (!valid) throw new Error('signature verification failed');

  // Reject stale verification tokens (Plaid recommends 5 minutes) to
  // block a captured webhook being replayed later.
  if (Date.now() / 1000 - (payload.iat || 0) > 300) throw new Error('verification JWT is stale');

  // Confirm the body we actually received matches what was signed.
  const bodyHash = await sha256Hex(rawBody);
  if (bodyHash !== payload.request_body_sha256) throw new Error('request body hash mismatch');
}
