// Net Worth Tracker — Service Worker
// Caches the app shell for offline use. Stock prices always fetch live.

const CACHE = 'nwt-v10'; // ← bump this string every time you deploy a new version
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// Install: cache the app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

// Activate: remove old caches, claim all clients immediately
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Message handler: allow page to trigger skipWaiting
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

// Fetch strategy:
// - App shell (HTML, manifest, icons) → cache first, network fallback
// - Stock price requests (Yahoo Finance, proxies) → network only, never cache
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Never intercept stock price fetches — always go to network
  if (
    url.includes('yahoo.com') ||
    url.includes('allorigins.win') ||
    url.includes('corsproxy.io') ||
    url.includes('codetabs.com') ||
    url.includes('cors.x2u.in') ||
    url.includes('google.com/finance')
  ) {
    return; // let the browser handle it normally
  }

  // App shell: serve from cache, fall back to network
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
