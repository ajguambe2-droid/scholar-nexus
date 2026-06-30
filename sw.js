/* Scholar Nexus — Service Worker (bundle: todos os assets estão inlinados) */
const SN_CACHE = 'scholar-nexus-bundle-v1';
const APP_SHELL = [
  './', './index.html', './login.html', './register.html',
  './pricing.html', './compare.html',
  './dashboard/index.html', './admin/index.html',
  './manifest.json',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(SN_CACHE).then(c => c.addAll(APP_SHELL)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==SN_CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin || e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).catch(()=>cached)));
});
