/* =========================================================
   ÚTILHUB V17 — NOVA FLOW
   SERVICE WORKER
   ========================================================= */

const CACHE_NAME = "utilhub-v17-nova-flow-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest"
];

/* =========================================================
   INSTALACIÓN
   ========================================================= */

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.warn("ÚtilHub: algunos archivos no pudieron guardarse:", error);
      })
  );
});

/* =========================================================
   ACTIVACIÓN
   ========================================================= */

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

/* =========================================================
   PETICIONES
   ========================================================= */

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Solo procesamos peticiones GET
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // No interceptar servicios externos:
  // diccionario, conversión de moneda, QR, etc.
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {

            // Guardar solamente respuestas válidas
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === "basic"
            ) {
              const responseClone = networkResponse.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }

            return networkResponse;
          })
          .catch(() => {

            // Si falla una página, intentar cargar index.html
            if (request.mode === "navigate") {
              return caches.match("./index.html");
            }

            return new Response(
              "ÚtilHub V17 está sin conexión.",
              {
                status: 503,
                statusText: "Offline",
                headers: {
                  "Content-Type": "text/plain; charset=utf-8"
                }
              }
            );
          });
      })
  );
});

/* =========================================================
   MENSAJES DESDE LA APP
   ========================================================= */

self.addEventListener("message", (event) => {

  if (!event.data) return;

  // Actualizar inmediatamente
  if (event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  // Limpiar todas las cachés de ÚtilHub
  if (event.data.type === "CLEAR_CACHE") {
    caches.keys()
      .then((names) => {
        return Promise.all(
          names
            .filter((name) => name.startsWith("utilhub-"))
            .map((name) => caches.delete(name))
        );
      });
  }
});

/* =========================================================
   FIN — ÚTILHUB V17
   ========================================================= */
