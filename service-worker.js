// Butterfly Dynamix Bookkeeping — Service Worker
// Caches the app shell for offline use and fast loading

const CACHE_NAME = 'bd-bookkeeping-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/bookkeeping.html',
  '/manifest.json'
];

// Install — cache the app shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate — clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch — serve from cache first, fall back to network
self.addEventListener('fetch', function(event) {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Don't intercept chrome-extension or non-http requests
  try {
    const url = new URL(event.request.url);
    if (!url.protocol.startsWith('http')) return;
    // Don't intercept Supabase API calls — always go to network
    if (url.hostname.includes('supabase.co') ||
        url.hostname.includes('supabase.com')) {
      return;
    }
  } catch(e) { return; }
  const url = new URL(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        // Serve from cache, but also update in background
        fetch(event.request).then(function(networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(function() {});
        return cachedResponse;
      }

      // Not in cache — fetch from network
      return fetch(event.request).then(function(networkResponse) {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        // Cache the new response
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(function() {
        // Offline and not in cache — return offline page
        return caches.match('/bookkeeping.html');
      });
    })
  );
});

// Background sync for offline transactions (future use)
self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncOfflineTransactions());
  }
});

async function syncOfflineTransactions() {
  // Placeholder for offline transaction sync
  // Will be implemented when IndexedDB offline queue is built
  console.log('Background sync: checking for offline transactions');
}
