// Butterfly Dynamix Bookkeeping — Service Worker v5
// v4: force cache clear after profile/multi-business update
const CACHE_NAME = 'bd-bookkeeping-v5';
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
    // Network first for HTML — always get latest
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
        }
        return response;
      }).catch(function() {
        return caches.match('/bookkeeping') || caches.match('/bookkeeping.html');
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
        }).catch(function() { return cached; });
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
