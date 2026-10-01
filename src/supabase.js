// Minimal Supabase REST helper for the Worker's service-role calls.
// Not the full supabase-js client — just enough fetch wrapping to
// insert/select/update rows with the service-role key, which must
// never reach the browser (that's the whole reason this lives here
// instead of in bookkeeping-app.js).

export function supaFetch(env, path, { method = 'GET', body, query } = {}) {
  const url = new URL(env.SUPABASE_URL + '/rest/v1/' + path);
  if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  return fetch(url, {
    method,
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

// Supabase returns 204 No Content with a genuinely empty body whenever
// a request carries "Prefer: return=minimal" (supaUpdate's default) —
// that's a SUCCESS, not an error, but a bare res.json() on an empty
// body throws "Unexpected end of JSON input" regardless. Every helper
// below reads the body as text first and only parses it if there's
// actually something there, so a successful empty response doesn't
// get mistaken for a crash.
async function parseJsonBody(res) {
  const raw = await res.text();
  if (!raw) return null;
  try { return JSON.parse(raw); }
  catch (e) { throw new Error('Supabase returned a non-JSON response (HTTP ' + res.status + '): ' + raw.slice(0, 300)); }
}

export async function supaInsert(env, table, rows) {
  const res = await supaFetch(env, table, { method: 'POST', body: rows });
  if (!res.ok) throw new Error('Supabase insert into ' + table + ' failed: ' + await res.text());
  return (await parseJsonBody(res)) || [];
}

export async function supaSelect(env, table, filters = {}) {
  const query = { select: '*' };
  Object.entries(filters).forEach(([k, v]) => { query[k] = 'eq.' + v; });
  const res = await supaFetch(env, table, { query });
  if (!res.ok) throw new Error('Supabase select from ' + table + ' failed: ' + await res.text());
  return parseJsonBody(res);
}

export async function supaUpdate(env, table, filters, patch) {
  const query = {};
  Object.entries(filters).forEach(([k, v]) => { query[k] = 'eq.' + v; });
  const res = await supaFetch(env, table, { method: 'PATCH', query, body: patch });
  if (!res.ok) throw new Error('Supabase update of ' + table + ' failed: ' + await res.text());
  return parseJsonBody(res);
}

// Upsert that ignores duplicate rows (used for de-duping staged
// transactions on provider_transaction_id without erroring the whole
// sync when one has already been seen).
export async function supaUpsertIgnoreDup(env, table, rows, onConflict) {
  if (!rows.length) return [];
  const url = new URL(env.SUPABASE_URL + '/rest/v1/' + table);
  url.searchParams.set('on_conflict', onConflict);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=ignore-duplicates,return=representation',
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error('Supabase upsert into ' + table + ' failed: ' + await res.text());
  return (await parseJsonBody(res)) || [];
}
