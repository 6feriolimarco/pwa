self.importScripts('data/games.js');

// Files to cache
const cacheName = 'js13kPWA-v1';
const appShellFiles = [
  '/pwa/pwa/',
  '/pwa/pwa/index.html',
  '/pwa/pwa/app.js',
  '/pwa/pwa/style.css',
  '/pwa/pwa/fonts/graduate.eot',
  '/pwa/pwa/fonts/graduate.ttf',
  '/pwa/pwa/fonts/graduate.woff',
  '/pwa/pwa/favicon.ico',
  '/pwa/pwa/img/js13kgames.png',
  '/pwa/pwa/img/bg.png',
  '/pwa/pwa/icons/icon-32.png',
  '/pwa/pwa/icons/icon-64.png',
  '/pwa/pwa/icons/icon-96.png',
  '/pwa/pwa/icons/icon-128.png',
  '/pwa/pwa/icons/icon-168.png',
  '/pwa/pwa/icons/icon-192.png',
  '/pwa/pwa/icons/icon-256.png',
  '/pwa/pwa/icons/icon-512.png',
];
const gamesImages = [];
for (let i = 0; i < games.length; i++) {
  gamesImages.push(`data/img/${games[i].slug}.jpg`);
}
const contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
