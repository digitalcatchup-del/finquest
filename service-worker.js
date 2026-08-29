// Butterfly Dynamix Bookkeeping — Service Worker v15
// v15: full cache reset — bookkeeping-app.js was being served stale
// indefinitely (cache-first, no version query string, not covered by
// this SW's own asset list) until app.js itself started using a
// versioned URL. Bumping CACHE_NAME here forces every existing
// client's old cache to be deleted on next activate, so this only
// needs to happen once — going forward the ?v= query string on
// bookkeeping-app.js is what keeps things fresh, not this bump.
const CACHE_NAME = 'bd-bookkeeping-v15';
const ASSETS_TO_CACHE = [
  '/bookkeeping',
  '/bookkeeping.html',
  '/manifest.json',
  '/icons/android-chrome-192x192.png',
  '/icons/android-chrome-512x512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32x32.png',
  '/icons/favicon-16x16.png',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
             .map(function(n) { return caches.delete(n); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);
  if (url.hostname.includes('supabase.co') || url.hostname.includes('supabase.com')) return;

  const isHtml = url.pathname === '/bookkeeping' ||
                 url.pathname === '/bookkeeping.html' ||
                 url.pathname === '/';

  if (isHtml) {
    // Network first for HTML — bypass the browser HTTP cache so we
    // never get a stale copy served instantly (root cause of flashes)
    event.respondWith(
      fetch(event.request, { cache: 'reload' }).then(function(response) {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
        }
        return response;
      }).catch(function() {
        return caches.match(event.request).then(function(r){
          if (r) return r;
          return caches.match('/bookkeeping').then(function(r2){
            return r2 || caches.match('/bookkeeping.html');
          });
        });
      })
    );
  } else {
    // Cache first for static assets
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
          }
          return response;
        }).catch(function() {
          // Fallback to prevent rejected promise errors
          return new Response('Resource not available offline', {
            status: 404,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      }).catch(function(err) {
        // Ensure we always return a valid Response object
        console.warn('Fetch failed for:', event.request.url, err);
        return new Response('Offline - Resource unavailable', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      })
    );
  }
});

self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-transactions') {
    event.waitUntil(
      self.clients.matchAll().then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({ type: 'SYNC_OFFLINE_SALES' });
        });
      })
    );
  }
});

self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
