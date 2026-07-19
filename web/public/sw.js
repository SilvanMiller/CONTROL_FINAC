// Service worker da Caderneta de Gastos.
// Objetivo: tornar o app instalavel e carregar rapido/offline.
// Estrategia: cache-first para arquivos estaticos; network-first para
// navegacoes (cai no cache se estiver offline). Requisicoes de outra
// origem (ex.: Supabase) NAO sao interceptadas.
const CACHE = "caderneta-v1";
const ESSENCIAIS = [
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(ESSENCIAIS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((chaves) =>
        Promise.all(
          chaves.filter((k) => k !== CACHE).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Deixa passar tudo que nao for da mesma origem (ex.: API do Supabase).
  if (url.origin !== self.location.origin) return;

  // Estaticos: cache-first.
  if (
    url.pathname.startsWith("/_next/static") ||
    url.pathname.startsWith("/icons/")
  ) {
    event.respondWith(
      caches.match(request).then(
        (cacheado) =>
          cacheado ||
          fetch(request).then((res) => {
            const copia = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copia));
            return res;
          })
      )
    );
    return;
  }

  // Navegacoes e demais GET: network-first, cai no cache se offline.
  event.respondWith(
    fetch(request)
      .then((res) => {
        const copia = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copia));
        return res;
      })
      .catch(() => caches.match(request))
  );
});
