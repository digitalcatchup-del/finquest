// Butterfly Dynamix Bookkeeping — Service Worker v2
const CACHE_NAME = 'bd-bookkeeping-v2';
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

// Install — cache app shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate — remove old caches
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

// Fetch — cache first for app shell, network first for API
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  // Skip non-http requests (chrome-extension etc)
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // Always go to network for Supabase
  if (url.hostname.includes('supabase.co') || url.hostname.includes('supabase.com')) return;

  // Cache first for same-origin assets
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        const networkFetch = fetch(event.request).then(function(response) {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
          }
          return response;
        }).catch(function() { return cached; });
        return cached || networkFetch;
      })
    );
    return;
  }
});

// Background sync — fires when internet returns after offline save
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
