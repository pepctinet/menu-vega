/* Capa fora de línia. Només conserva fitxers estàtics del mateix origen:
   les dades personals continuen a localStorage/IndexedDB i a Firebase. */
const NOM_CACHE = "menu-vega-estatics-2026-08-18a";
const PREFIX_CACHE = "menu-vega-estatics-";
/* NOMES el que necessita CADA aparell per arrencar sense connexio, i
   res mes. Aqui hi havia index.html, pes.html i nutri.js: com que els
   tres aplicatius comparteixen aquest fitxer, el telefon d'ella se'ls
   descarregava tots tres. Les instruccions del projecte diuen que les
   calories no estan amagades sino que NO HI SON, i amb nutri.js dins
   d'aquesta llista deixava de ser cert: no el podia ensenyar, pero el
   tenia al disc.

   Els fitxers que no son aqui es desen igualment quan l'aparell els
   demana de debo (mira desarResposta), o sigui que l'ordinador continua
   arrencant sense connexio a partir de la segona visita. La diferencia
   es que ara cada aparell nomes es queda el que fa servir. */
const ESTATICS = [
  "./mobil.html",
  "./offline.html",
  "./core.js?v=2026-08-18a",
  "./sync.js?v=2026-08-18a",
  "./firebase-config.js?v=2026-08-18a",
  "./registre-sw.js?v=2026-08-18a",
  "./manifest.json",
  "./icona.svg",
  "./icona-180.png",
  "./icona-192.png",
  "./icona-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(NOM_CACHE)
      .then(cache => cache.addAll(ESTATICS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms
        .filter(nom => nom.startsWith(PREFIX_CACHE) && nom !== NOM_CACHE)
        .map(nom => caches.delete(nom))))
      .then(() => self.clients.claim())
  );
});

function desarResposta(request, resposta){
  if(!resposta || !resposta.ok || resposta.type !== "basic") return resposta;
  const copia = resposta.clone();
  caches.open(NOM_CACHE).then(cache => cache.put(request, copia));
  return resposta;
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if(request.method !== "GET") return;

  const url = new URL(request.url);
  if(url.origin !== self.location.origin) return;

  if(request.mode === "navigate"){
    event.respondWith(
      fetch(request)
        .then(resposta => desarResposta(request, resposta))
        .catch(() => caches.match(request, {ignoreSearch:true})
          .then(resposta => resposta || caches.match("./offline.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(resposta => resposta || fetch(request)
        .then(respostaXarxa => desarResposta(request, respostaXarxa)))
  );
});
