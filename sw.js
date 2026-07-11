const CACHE_NAME = 'termtux-cache-v6';
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

// Fetch Event - Network-First for HTML/Content, Cache-First for static assets
self.addEventListener('fetch', (e) => {
  // Only handle GET requests and local requests
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return;

  const url = new URL(e.request.url);

  // Check if it is a page request or a content file request
  const isHtmlOrContent = 
    url.pathname === '/' || 
    url.pathname.endsWith('/') ||
    url.pathname.includes('index.html') || 
    url.pathname.includes('category.html') || 
    url.pathname.includes('content/');

  if (isHtmlOrContent) {
    // Network-First strategy
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, copy);
            });
          }
          return response;
        })
        .catch(() => {
          // If offline, check cache
          return caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            // Fallbacks
            if (url.pathname.includes('category.html')) {
              return caches.match('./category.html');
            }
            return caches.match('./index.html') || caches.match('./404.html');
          });
        })
    );
  } else {
    // Cache-First strategy for static assets (CSS, JS, fonts)
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(e.request).then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, copy);
            });
          }
          return response;
        });
      })
    );
  }
});
