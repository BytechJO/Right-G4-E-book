const CACHE_NAME = "RightG4Ebook";
const OFFLINE_FALLBACK = "/index.html";

let cancelDownload = false;

// 🔹 INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([OFFLINE_FALLBACK])
    )
  );

  self.skipWaiting();
});

// 🔹 ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// 🔹 FETCH
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // React SPA navigation
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match(OFFLINE_FALLBACK).then((cached) => {
        return cached || fetch(OFFLINE_FALLBACK);
      })
    );
    return;
  }

  // ملفات من نفس الموقع
  if (
    request.method === "GET" &&
    url.origin === self.location.origin
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);

        if (cached) return cached;

        try {
          const response = await fetch(request);

          // لا نخزن partial content
          if (response.status === 200) {
            cache.put(request, response.clone());
          }

          return response;
        } catch (err) {
          return cache.match(request);
        }
      })
    );
  }
});

// 📩 MESSAGE
self.addEventListener("message", async (event) => {

  // ❌ إلغاء التنزيل
  if (event.data?.type === "CANCEL_PRELOAD") {
    cancelDownload = true;
    return;
  }

  // 📥 بدء التنزيل
  if (event.data?.type !== "PRELOAD_ALL") return;

  cancelDownload = false;

  const assets = event.data.assets;

  if (!Array.isArray(assets)) {
    console.error("PRELOAD_ALL assets is not an array:", assets);
    return;
  }

  const cache = await caches.open(CACHE_NAME);

  let loaded = 0;
  const total = assets.length;

  for (const url of assets) {

    // ❌ فحص الإلغاء
    if (cancelDownload) {

      cancelDownload = false;

      // حذف الملفات التي تم تنزيلها
      await caches.delete(CACHE_NAME);

      // إعادة إنشاء الكاش الأساسي
      const freshCache = await caches.open(CACHE_NAME);

      try {
        await freshCache.addAll([OFFLINE_FALLBACK]);
      } catch (e) {
        console.error(e);
      }

      const clients = await self.clients.matchAll();

      clients.forEach((client) => {
        client.postMessage({
          type: "PRELOAD_CANCELLED",
        });
      });

      return;
    }

    try {

      const response = await fetch(url);

      if (response.status === 200) {
        await cache.put(url, response.clone());
      }

      loaded++;

      const clients = await self.clients.matchAll();

      clients.forEach((client) => {
        client.postMessage({
          type: "PRELOAD_PROGRESS",
          loaded,
          total,
        });
      });

    } catch (e) {
      console.error("Failed to cache:", url);
    }
  }

  // ✅ انتهى التنزيل
  const clients = await self.clients.matchAll();

  clients.forEach((client) => {
    client.postMessage({
      type: "PRELOAD_DONE",
    });
  });
});