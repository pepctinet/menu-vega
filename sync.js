/* =====================================================================
   MENÚ VEGA · SINCRONITZACIÓ I FOTOGRAFIES
   ---------------------------------------------------------------------
   Els dos aplicatius comparteixen aquest fitxer.

   · Sense configuració de Firebase, tot funciona igual però només en
     aquest aparell. No es perd res.
   · Amb Firebase configurat (fitxer firebase-config.js), les setmanes i
     les fotos es comparteixen entre l'ordinador, el mòbil i, si vols,
     la nutricionista.

   Com es resolen els conflictes: cada dia porta una marca de temps.
   Quan arriba una versió del servidor, es queda la més recent de cada
   dia per separat. Així el mòbil pot canviar el sopar d'avui mentre
   l'ordinador programa divendres sense que cap dels dos es perdi.
   ===================================================================== */

/* ---------------------------------------------------------------------
   FOTOGRAFIES — magatzem local (IndexedDB)
   Les fotos no caben a l'emmagatzematge normal del navegador, per això
   fem servir IndexedDB, que admet centenars de megabytes.
   --------------------------------------------------------------------- */
const Fotos = (() => {
  let db = null;
  const DB = "menuvega_fotos", STORE = "fotos";

  function obrir(){
    if(db) return Promise.resolve(db);
    return new Promise((res,rej)=>{
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => {
        if(!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE);
      };
      r.onsuccess = () => { db = r.result; res(db); };
      r.onerror   = () => rej(r.error);
    });
  }
  const clau = (ds,meal) => ds+"_"+meal;

  async function desar(ds, meal, blob){
    const d = await obrir();
    return new Promise((res,rej)=>{
      const tx = d.transaction(STORE,"readwrite");
      tx.objectStore(STORE).put({blob, u:Date.now()}, clau(ds,meal));
      tx.oncomplete = res; tx.onerror = ()=>rej(tx.error);
    });
  }
  async function llegir(ds, meal){
    const d = await obrir();
    return new Promise((res)=>{
      const tx = d.transaction(STORE,"readonly");
      const q = tx.objectStore(STORE).get(clau(ds,meal));
      q.onsuccess = () => res(q.result ? q.result.blob : null);
      q.onerror   = () => res(null);
    });
  }
  async function esborrar(ds, meal){
    const d = await obrir();
    return new Promise((res)=>{
      const tx = d.transaction(STORE,"readwrite");
      tx.objectStore(STORE).delete(clau(ds,meal));
      tx.oncomplete = res; tx.onerror = res;
    });
  }
  async function claus(){
    const d = await obrir();
    return new Promise((res)=>{
      const tx = d.transaction(STORE,"readonly");
      const q = tx.objectStore(STORE).getAllKeys();
      q.onsuccess = ()=>res(q.result||[]); q.onerror = ()=>res([]);
    });
  }

  /* Redueix la foto abans de guardar-la: 1200 px de costat màxim i JPEG
     de qualitat 0,72. Una foto de plat queda en 100-200 kB en comptes
     dels 3-5 MB que fa la càmera.

     Com que les fotos viatgen dins d'un document de la base de dades, que
     té un límit d'1 MB, si la primera passada surt massa gran es torna a
     comprimir amb menys qualitat fins que hi càpiga de sobres. */
  const MAX_BYTES = 680 * 1024;   // marge sobre el límit real un cop codificada

  function redimensionar(file, maxCostat, q){
    return new Promise((res,rej)=>{
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let {width:w, height:h} = img;
        const f = Math.min(1, maxCostat/Math.max(w,h));
        w = Math.round(w*f); h = Math.round(h*f);
        const c = document.createElement("canvas");
        c.width=w; c.height=h;
        c.getContext("2d").drawImage(img,0,0,w,h);
        c.toBlob(b => b?res(b):rej(new Error("No s'ha pogut processar la imatge")),
                 "image/jpeg", q);
      };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("Imatge no vàlida")); };
      img.src = url;
    });
  }
  async function comprimir(file){
    const passades = [[1200,0.72],[1100,0.62],[900,0.55],[750,0.5]];
    let blob = null;
    for(const [costat,q] of passades){
      blob = await redimensionar(file, costat, q);
      if(blob.size <= MAX_BYTES) return blob;
    }
    return blob;   // l'última, encara que sigui grandeta
  }

  /* Conversió entre fitxer binari i text, per poder desar la foto
     dins d'un document de la base de dades. */
  function aBase64(blob){
    return new Promise((res,rej)=>{
      const r = new FileReader();
      r.onload  = () => res(String(r.result).split(",")[1]);
      r.onerror = () => rej(new Error("No s'ha pogut llegir la imatge"));
      r.readAsDataURL(blob);
    });
  }
  function deBase64(b64){
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], {type:"image/jpeg"});
  }

  return {desar, llegir, esborrar, claus, comprimir, aBase64, deBase64, MAX_BYTES};
})();


/* ---------------------------------------------------------------------
   SINCRONITZACIÓ
   --------------------------------------------------------------------- */
const Sync = (() => {
  let app=null, auth=null, dbf=null;
  let unsub = [];
  let onCanvi = () => {};
  let pendents = new Set();
  let temporitzador = null;

  const est = {
    estat: "off",          // off | carregant | sense-sessio | connectat | error
    missatge: "Només en aquest aparell",
    email: null,
    rol: null,             // admin | usuari | pro
    ultimaSync: null,
  };

  const configurat = () =>
    typeof FIREBASE_CONFIG !== "undefined" &&
    FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey &&
    !String(FIREBASE_CONFIG.apiKey).includes("ENGANXA");

  function carregarScript(src){
    return new Promise((res,rej)=>{
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = ()=>rej(new Error("No s'ha pogut carregar "+src));
      document.head.appendChild(s);
    });
  }

  async function init(cb){
    onCanvi = cb || onCanvi;
    if(!configurat()){
      est.estat="off";
      est.missatge="Només en aquest aparell";
      onCanvi(est); return;
    }
    est.estat="carregant"; est.missatge="Connectant…"; onCanvi(est);
    try{
      const V = "10.12.2";
      const base = "https://www.gstatic.com/firebasejs/"+V+"/";
      if(typeof firebase==="undefined"){
        await carregarScript(base+"firebase-app-compat.js");
        await carregarScript(base+"firebase-auth-compat.js");
        await carregarScript(base+"firebase-firestore-compat.js");
      }
      app = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE_CONFIG);
      auth = firebase.auth(); dbf = firebase.firestore();
      try{ await dbf.enablePersistence({synchronizeTabs:true}); }catch(e){}
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      auth.onAuthStateChanged(async u => {
        aturarEscolta();
        if(!u){
          est.estat="sense-sessio"; est.email=null; est.rol=null;
          est.missatge="Cal iniciar la sessió"; onCanvi(est); return;
        }
        est.email = u.email;
        est.rol = await llegirRol(u.uid);
        est.estat="connectat"; est.missatge="Sincronitzat"; onCanvi(est);
        escoltar();
      });
    }catch(e){
      est.estat="error"; est.missatge="Sense connexió amb el servidor";
      console.warn(e); onCanvi(est);
    }
  }

  async function llegirRol(uid){
    try{
      const d = await dbf.doc("plans/"+PLA_ID+"/membres/"+uid).get();
      return d.exists ? (d.data().rol||"usuari") : "usuari";
    }catch(e){ return "usuari"; }
  }

  function aturarEscolta(){ unsub.forEach(f=>{try{f()}catch(e){}}); unsub=[]; }

  /* Escoltem la configuració general i les setmanes des de 8 setmanes
     enrere: no cal descarregar tot l'històric a cada obertura. */
  function escoltar(){
    const desde = weekKey(addDays(TODAY,-56));
    unsub.push(dbf.doc("plans/"+PLA_ID+"/config/general").onSnapshot(d=>{
      if(!d.exists) return;
      const r = d.data();
      let canviat = false;
      if(r.rev!=null && r.rev > (S.metaRev||0)){
        S.custom    = r.custom    || S.custom;
        S.customIng = r.customIng || S.customIng;
        S.target    = r.target    !== undefined ? r.target : S.target;
        S.metaRev   = r.rev;
        canviat = true;
      }
      if(canviat){ desarLocal(); onCanvi(est, true); }
    }, e=>console.warn("config:",e)));

    unsub.push(dbf.collection("plans/"+PLA_ID+"/setmanes")
      .where(firebase.firestore.FieldPath.documentId(), ">=", desde)
      .onSnapshot(snap=>{
        let canviat = false;
        snap.forEach(doc=>{ if(fusionarSetmana(doc.id, doc.data().dies||{})) canviat = true; });
        est.ultimaSync = new Date();
        if(canviat){ desarLocal(); }
        onCanvi(est, canviat);
      }, e=>{ console.warn("setmanes:",e);
              est.estat="error"; est.missatge="Error de sincronització"; onCanvi(est); }));
  }

  /* Fusió dia a dia: guanya sempre la versió amb la marca de temps més
     recent. Mai no s'esborra un dia que existeix només en local. */
  function fusionarSetmana(k, remots){
    const local = S.weeks[k] || (S.weeks[k]={});
    let canviat = false;
    for(const [ds, dr] of Object.entries(remots)){
      const dl = local[ds];
      if(!dl || (dr.u||0) > (dl.u||0)){ local[ds] = dr; canviat = true; }
    }
    return canviat;
  }

  function desarLocal(){
    try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){}
  }

  /* --- enviar canvis --- */
  function marcar(k){ pendents.add(k); programar(); }
  function push(){
    Object.keys(S.weeks).forEach(k=>pendents.add(k));
    pendents.add("__config__");
    programar();
  }
  function pushSetmana(k){ pendents.add(k); programar(); }
  function pushConfig(){ pendents.add("__config__"); programar(); }

  function programar(){
    if(est.estat!=="connectat") return;
    clearTimeout(temporitzador);
    temporitzador = setTimeout(enviar, 900);
  }
  async function enviar(){
    if(est.estat!=="connectat" || !pendents.size) return;
    const llista = [...pendents]; pendents.clear();
    try{
      for(const k of llista){
        if(k==="__config__"){
          S.metaRev = (S.metaRev||0)+1;
          await dbf.doc("plans/"+PLA_ID+"/config/general").set({
            custom:S.custom||[], customIng:S.customIng||{},
            target:S.target||null, rev:S.metaRev,
            actualitzat: firebase.firestore.FieldValue.serverTimestamp()
          }, {merge:true});
        } else {
          const dies = S.weeks[k]; if(!dies) continue;
          await dbf.doc("plans/"+PLA_ID+"/setmanes/"+k).set({
            dies, actualitzat: firebase.firestore.FieldValue.serverTimestamp()
          }, {merge:true});
        }
      }
      est.ultimaSync = new Date(); est.missatge="Sincronitzat"; onCanvi(est);
    }catch(e){
      console.warn("enviar:", e);
      llista.forEach(k=>pendents.add(k));
      est.missatge="Canvis pendents d'enviar"; onCanvi(est);
    }
  }

  /* --- sessió --- */
  async function login(email, contrasenya){
    if(!auth) throw new Error("La sincronització no està configurada");
    await auth.signInWithEmailAndPassword(email, contrasenya);
  }
  async function logout(){ if(auth) await auth.signOut(); }

  /* --- fotografies ---
     Es guarden com a text dins d'un document de la base de dades, un per
     foto, a plans/{PLA_ID}/fotos/{data}_{apat}. Firebase només ofereix el
     seu magatzem d'arxius als plans de pagament, i així ens quedem dins
     del gratuït. Cada document té un límit d'1 MB, que la compressió
     respecta de sobres. */
  const refFoto = (ds, meal) => dbf.doc("plans/"+PLA_ID+"/fotos/"+ds+"_"+meal);

  async function pujarFoto(ds, meal, blob){
    if(est.estat!=="connectat") return null;
    const b64 = await Fotos.aBase64(blob);
    await refFoto(ds, meal).set({
      imatge: b64, dia: ds, apat: meal, mida: blob.size,
      actualitzat: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  }
  async function baixarFoto(ds, meal){
    const local = await Fotos.llegir(ds, meal);
    if(local) return local;                 // ja la tenim en aquest aparell
    if(est.estat!=="connectat") return null;
    try{
      const d = await refFoto(ds, meal).get();
      if(!d.exists || !d.data().imatge) return null;
      const blob = Fotos.deBase64(d.data().imatge);
      await Fotos.desar(ds, meal, blob);    // en guardem còpia local
      return blob;
    }catch(e){ console.warn("baixarFoto:", e); return null; }
  }
  async function esborrarFoto(ds, meal){
    await Fotos.esborrar(ds, meal);
    if(est.estat==="connectat"){
      try{ await refFoto(ds, meal).delete(); }catch(e){ console.warn("esborrarFoto:", e); }
    }
  }

  /* Espai ocupat. Es calcula amb les mides que cada dia ja porta desades,
     sense haver de descarregar cap foto. */
  function espaiFotos(){
    let n = 0, bytes = 0;
    for(const setmana of Object.values(S.weeks||{}))
      for(const dia of Object.values(setmana))
        for(const f of Object.values(dia.fotos||{})){
          n++; bytes += (f && f.mida) ? f.mida : 180*1024;   // estimació si no consta
        }
    const LIMIT = 1024*1024*1024;            // 1 GB del pla gratuït
    return {n, bytes, limit:LIMIT, percentatge: bytes/LIMIT*100};
  }

  return {est, init, login, logout, push, pushSetmana, pushConfig, marcar,
          pujarFoto, baixarFoto, esborrarFoto, espaiFotos, configurat};
})();


/* ---------------------------------------------------------------------
   Marca un dia com a modificat i el posa a la cua de sincronització.
   Cal cridar-la sempre que es canvia alguna cosa d'un dia.
   --------------------------------------------------------------------- */
function tocarDia(ds){
  const day = dayData(ds);
  day.u = Date.now();
  saveState(true);
  if(typeof Sync!=="undefined") Sync.pushSetmana(weekKey(parseDay(ds)));
}
function tocarConfig(){
  saveState(true);
  if(typeof Sync!=="undefined") Sync.pushConfig();
}
