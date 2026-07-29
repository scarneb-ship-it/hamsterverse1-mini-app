const CACHE_NAME = 'ironplan-v3';
const urlsToCache = [
  '.',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/podtiagivaniechirokim.jpg',
  'icons/prisedansgantel.jpg',
  'icons/chimgantelnadgolov.jpg',
  'icons/greblavnaklon.jpg',
  'icons/godicnmostik.jpg',
  'icons/planka.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
