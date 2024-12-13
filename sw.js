const CACHE_NAME = "static_cache2"
const STATIC_ASSETS = [
    '/index.html',
    '/style.css'
];

async function preCache() {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)
};

self.addEventListener("install",event => {
    console.log("[sw] installed");
    event.waitUntil(preCache())
});

self.addEventListener("activate",event => {
    console.log("[sw] activated");
});

async function fetchAssets(event) {
    try {
        const response = await fetch(event.request)
        return response
    } catch (err) {
        const cache = await caches.open(CACHE_NAME)
        return cache.match(event.request)
    }
};

self.addEventListener("fetch",event => {
    console.log("[sw] fetched");
    event.respondWith(fetchAssets(event))
});