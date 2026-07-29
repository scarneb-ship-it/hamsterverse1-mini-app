const CACHE_NAME = 'ironplan-v4';
const urlsToCache = [
  '.',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  // A
  'icons/podtiagivaniechirokim.jpg',
  'icons/prisedansgantel.jpg',
  'icons/chimgantelnadgolov.jpg',
  'icons/greblavnaklon.jpg',
  'icons/godicnmostik.jpg',
  'icons/planka.jpg',
  // B
  'icons/bolgarskisplitpris.jpg',
  'icons/otchimania.jpg',
  'icons/podtiagivaniaobratnimhvat.jpg',
  'icons/podemgantelvstoronu.jpg',
  'icons/podemgantelsidnabiceps.jpg',
  'icons/podemgantelnatriceps.jpg',
  'icons/obratnskruchiv.jpg',
  // C
  'icons/medlennalpinist.jpg',
  'icons/mostiknaodnounage.jpg',
  'icons/csuknaspine.jpg',
  'icons/obratnotchimotstula.jpg',
  'icons/giperextenzia.jpg',
  'icons/plankanaboku.jpg'
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
