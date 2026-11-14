/* Trainingslog Service Worker: hält die App offline verfügbar.
   Mit Internet wird immer die neueste index.html geladen, ohne Netz die gespeicherte.
   Nach einer Änderung an index.html die Versionsnummer erhöhen. */
const VERSION = 'v5';
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
  // cache: 'reload' umgeht den Browser-Cache, damit wirklich die neuen Dateien gespeichert werden
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, {cache: 'reload'})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('trainingslog-') && k !== CACHE && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const net = fetch(req.url, {cache: 'no-cache'}).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; });
  try {
    const res = await Promise.race([net, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 3000))]);
    if (res && res.ok) return res;
  } catch (e) {}
  const hit = (await cache.match(req, {ignoreSearch: true})) || (await cache.match('./index.html')) || (await cache.match('./'));
  return hit || net;
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req, {ignoreSearch: true});
  const fresh = fetch(req.url, {cache: 'no-cache'}).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => hit);
  return hit || fresh;
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    const isPage = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html');
    event.respondWith(isPage ? networkFirst(req) : staleWhileRevalidate(req));
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
