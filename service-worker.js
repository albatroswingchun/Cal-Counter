const CACHE_NAME = "calorie-counter-v2";

const APP_BASE = self.location.pathname.replace(/service-worker\.js$/, "");
const FILES_TO_CACHE = [
  APP_BASE,
  `${APP_BASE}index.html`,
  `${APP_BASE}manifest.json`,
  `${APP_BASE}icon-192.png`,
  `${APP_BASE}icon-512.png`
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Ne jamais bloquer l'installation complète si un asset manque temporairement.
    await Promise.allSettled(
      FILES_TO_CACHE.map(async (url) => {
        const response = await fetch(url, { cache: "no-store" });
        if (response.ok) {
          await cache.put(url, response);
        }
      })
    );

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name !== CACHE_NAME)
        .map((name) => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    return cached || fetch(event.request);
  })());
});
