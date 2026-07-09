const CACHE_NAME = 'termtux-cache-v2';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './category.html',
  './404.html',
  './css/yaru-tokens.css',
  './css/layout.css',
  './css/components.css',
  './css/animations.css',
  './js/categories.js',
  './js/markdown-renderer.js',
  './js/app.js'
];

// Install Event - Pre-cache core shell assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate with Dynamic Caching
self.addEventListener('fetch', (e) => {
  // Only handle local requests
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        // Cache successful requests dynamically
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // If offline and request is page routing, fall back to shell templates
        if (e.request.url.includes('category')) {
          return caches.match('./category.html');
        }
        return caches.match('./index.html') || caches.match('./404.html');
      });

      // Return cached asset instantly, fallback to network fetch
      return cachedResponse || fetchPromise;
    })
  );
});
