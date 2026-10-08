const CACHE_NAME = 'termtux-cache-v10';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './category.html',
  './404.html',
  './tools.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './sitemap.xml',
  './robots.txt',
  './css/yaru-tokens.css',
  './css/layout.css',
  './css/components.css',
  './css/animations.css',
  './js/categories.js',
  './js/markdown-renderer.js',
  './js/app.js',
  './content/01-system-logs.md',
  './content/02-system-health.md',
  './content/03-package-management.md',
  './content/04-bluetooth-troubleshooting.md',
  './content/05-time-synchronization.md',
  './content/06-snap-packages.md',
  './content/07-hardware-info.md',
  './content/08-file-permissions.md',
  './content/09-sudo-admin.md',
  './content/10-process-management.md',
  './content/11-networking.md',
  './content/12-desktop-shortcuts.md',
  './content/13-reboot-shutdown.md',
  './content/14-file-navigation.md',
  './content/15-file-operations.md',
  './content/16-viewing-editing.md',
  './content/17-searching-finding.md',
  './content/18-user-permissions.md',
  './content/19-archives-compression.md',
  './content/20-system-services.md',
  './content/21-installing-software.md',
  './content/22-networking-commands.md',
  './content/23-disk-usb.md',
  './content/24-display-screen.md',
  './content/25-environment-variables.md',
  './content/26-scheduled-tasks.md',
  './content/27-getting-help.md',
  './content/28-terminal-shortcuts.md',
  './content/29-gnome-shortcuts.md',
  './content/30-windows-linux-cheatsheet.md',
  './content/31-useful-tools.md',
  './content/32-vscode.md',
  './content/33-google-chrome.md',
  './content/34-brave-browser.md',
  './content/35-antigravity.md',
  './content/36-vlc.md',
  './content/37-gimp.md',
  './content/38-obs-studio.md',
  './content/39-discord.md',
  './content/40-spotify.md',
  './content/41-steam.md',
  './content/42-telegram.md',
  './content/43-libreoffice.md',
  './content/44-thunderbird.md',
  './content/45-qbittorrent.md',
  './content/46-flameshot.md',
  './content/47-htop.md',
  './content/48-timeshift.md',
  './content/49-python.md',
  './content/50-nodejs-npm.md',
  './content/51-git.md',
  './content/52-docker.md',
  './content/53-java.md',
  './content/54-linux-filesystem.md',
  './content/55-apt-explained.md',
  './content/56-piping-redirection.md',
  './content/57-common-problems.md',
  './content/58-snap-vs-flatpak.md',
  './content/59-linux-installation.md',
  './content/60-bash-scripting.md',
  './content/61-ssh-configuration.md',
  './content/62-terminal-customization.md',
  './content/63-firewall-ufw.md',
  './content/64-text-processing.md',
  './content/65-filesystem-storage.md',
  './content/66-performance-monitoring.md',
  './content/67-rsync-backups.md',
  './content/68-network-diagnostics.md',
  './content/69-kernel-modules.md',
  './content/70-permissions-deep.md',
  './content/71-swap-management.md',
  './content/72-tmux-terminal-multiplexer.md',
  './content/73-system-recovery.md',
  './content/74-openssl-gpg-encryption.md',
  './content/75-git-deep-dive.md',
  './content/76-docker-deep-dive.md',
  './content/77-audio-linux.md',
  './content/78-hardware-stress-testing.md'
];

// Install Event - Pre-cache core shell assets (tolerate single-file failures)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Add in small batches so one 404 doesn't abort the whole install
      for (const url of PRECACHE_ASSETS) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn('SW precache skip:', url, err);
        }
      }
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
  // Note: ?cat= query form is SEO-indexable; strip search for matching.
  const isHtmlOrContent =
    url.pathname === '/' ||
    url.pathname.endsWith('/') ||
    url.pathname.includes('index.html') ||
    url.pathname.includes('category.html') ||
    url.pathname.includes('tools.html') ||
    url.pathname.includes('content/');

  if (isHtmlOrContent) {
    // Network-First strategy (ignore query for cache key on category pages)
    const cacheKey = url.pathname.includes('category.html') && url.search
      ? new Request(url.pathname, { headers: e.request.headers })
      : e.request;
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, copy);
              // Also store query-less category shell for offline ?cat= hits
              if (cacheKey !== e.request) cache.put(cacheKey, response.clone());
            });
          }
          return response;
        })
        .catch(() => {
          // If offline, check cache
          return caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            if (cacheKey !== e.request) return caches.match(cacheKey);
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
