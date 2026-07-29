const CACHE_NAME = 'ironplan-v5';
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
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        urlsToCache.map(url => cache.add(url).catch(() => {}))
      )
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
