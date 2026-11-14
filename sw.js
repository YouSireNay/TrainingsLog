/* Trainingslog Service Worker: hält die App offline verfügbar.
   Nach einer Änderung an index.html die Versionsnummer erhöhen, damit Handys die neue Version laden. */
const VERSION = 'v2';
const CACHE = 'trainingslog-' + VERSION;
const FONTS = 'trainingslog-fonts';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    // Sofort aus dem Cache antworten und im Hintergrund aktualisieren
    event.respondWith(caches.open(CACHE).then(async cache => {
      let hit = await cache.match(req, {ignoreSearch: true});
      if (!hit && req.mode === 'navigate') hit = await cache.match('./index.html');
      const fresh = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => hit);
      return hit || fresh;
    }));
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(caches.open(FONTS).then(async cache => {
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
      } catch (e) {
        return new Response('', {status: 504});
      }
    }));
  }
});
