/**
 * Service Worker for Live Char Guide
 * Provides offline support and cache management
 * Uses hash-based cache invalidation for reliable updates
 * 
 * BUG-007 FIX: Removed live-char-guide-zero-install.html from STATIC_ASSETS
 * (zero-install is standalone and shouldn't be served via SW)
 */

// Cache name includes version for automatic invalidation on deploy
const CACHE_VERSION = 'live-char-v5.5.3';
const CACHE_NAME = CACHE_VERSION;
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/main.js',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets for', CACHE_NAME);
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network (stale-while-revalidate)
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          // Fetch update in background (stale-while-revalidate)
          fetch(event.request)
            .then((response) => {
              if (response.ok) {
                caches.open(CACHE_NAME)
                  .then((cache) => cache.put(event.request, response));
              }
            })
            .catch(() => {/* Ignore network errors */});
          
          return cachedResponse;
        }
        
        // Fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response.ok) return response;
            
            // Clone and cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
            
            return response;
          })
          .catch(() => {
            // Return offline fallback for HTML pages
            if (event.request.headers.get('Accept')?.includes('text/html')) {
              return caches.match('/index.html');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});
