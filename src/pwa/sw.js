/* Service worker for offline use on roads without signal (Río Dulce, Alta Verapaz).
 * vite.config.ts injects the build's file list and a version into the placeholders
 * below, so every deploy produces a new worker and a fresh cache. */

const VERSION = '__BUILD_VERSION__';
const PRECACHE = /** @type {string[]} */ (__PRECACHE_MANIFEST__);
const APP_CACHE = `app-${VERSION}`;
const RUNTIME_CACHE = 'runtime-v1';
const RUNTIME_MAX_ENTRIES = 600;
// Module scripts are requested with an Origin header and some hosts answer with
// `Vary: Origin`; without ignoreVary those cached copies would never match.
const MATCH = { ignoreVary: true };

// Map styles/tiles/fonts and destination photos: worth keeping for offline viewing.
const RUNTIME_HOSTS = [
  'basemaps.cartocdn.com',
  'tiles.basemaps.cartocdn.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'images.unsplash.com',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(cache => cache.addAll(['./', ...PRECACHE]))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('app-') && k !== APP_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const trimCache = async (name, max) => {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length > max) await Promise.all(keys.slice(0, keys.length - max).map(k => cache.delete(k)));
};

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Pages: network first so a new deploy shows up, cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(APP_CACHE).then(cache => cache.put('./', copy));
          return response;
        })
        .catch(() => caches.match('./', MATCH)),
    );
    return;
  }

  // Hashed build assets never change: cache first.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request, MATCH).then(hit => hit || fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(APP_CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      })),
    );
    return;
  }

  // Map tiles, fonts, photos: serve cached copy instantly, refresh in the background.
  if (RUNTIME_HOSTS.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`))) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache =>
        cache.match(request, MATCH).then(hit => {
          const network = fetch(request)
            .then(response => {
              if (response.ok || response.type === 'opaque') {
                cache.put(request, response.clone());
                trimCache(RUNTIME_CACHE, RUNTIME_MAX_ENTRIES);
              }
              return response;
            })
            .catch(() => hit);
          return hit || network;
        }),
      ),
    );
  }
});
