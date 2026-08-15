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

  /* Magatzem genèric, per guardar també documents adjunts */
  async function desarBlob(clau, blob){
    const d = await obrir();
    return new Promise((res,rej)=>{
      const tx = d.transaction(STORE,"readwrite");
      tx.objectStore(STORE).put({blob, u:Date.now()}, clau);
      tx.oncomplete = res; tx.onerror = ()=>rej(tx.error);
    });
  }
  async function llegirBlob(clau){
    const d = await obrir();
    return new Promise(res=>{
      const tx = d.transaction(STORE,"readonly");
      const q = tx.objectStore(STORE).get(clau);
      q.onsuccess = ()=>res(q.result ? q.result.blob : null);
      q.onerror   = ()=>res(null);
    });
  }
  function deBase64Tipus(b64, tipus){
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], {type:tipus||"application/octet-stream"});
  }

  return {desar, llegir, esborrar, claus, comprimir, aBase64, deBase64, MAX_BYTES,
          desarBlob, llegirBlob, deBase64Tipus};
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
    /* Si el servidor no respon, no ens hi quedem penjats: al cap de vuit
       segons passem a treballar amb les dades d'aquest aparell. */
    const rellotge = setTimeout(()=>{
      if(est.estat==="carregant"){
        est.estat="error"; est.missatge="Sense connexió amb el servidor";
        onCanvi(est);
      }
    }, 8000);
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
        clearTimeout(rellotge);
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
      clearTimeout(rellotge);
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
        S.custom       = r.custom       || S.custom;
        S.customIng    = r.customIng    || S.customIng;
        S.editsPlats   = r.editsPlats   || S.editsPlats;
        S.platsAmagats = r.platsAmagats || S.platsAmagats;
        S.editsIng     = r.editsIng     || S.editsIng;
        S.racions      = r.racions      || S.racions;
        /* L'historic datat de racions: sense ell, un dia validat en un
           aparell es valoraria diferent en un altre. */
        S.racionsHist  = r.racionsHist  || S.racionsHist;
        /* La resta de la guia: apats fixos, indicacions i habits. */
        S.apatsFixos       = r.apatsFixos       || S.apatsFixos;
        /* L'historic datat dels apats petits: mateix motiu que el de les
           racions. Sense ell, un esmorzar validat es valoraria diferent
           en un altre aparell. */
        S.apatsFixosHist   = r.apatsFixosHist   || S.apatsFixosHist;
        S.indicacions      = r.indicacions      || S.indicacions;
        S.indicacionsNoves = r.indicacionsNoves || S.indicacionsNoves;
        S.habitsEdit       = r.habitsEdit       || S.habitsEdit;
        S.habitsNous       = r.habitsNous       || S.habitsNous;
        S.canvis       = r.canvis       || S.canvis;
        S.target     = r.target !== undefined ? r.target : S.target;
        S.targetHist = r.targetHist || S.targetHist;
        S.metaRev   = r.rev;
        canviat = true;
      }
      /* Missatges i pesos es fusionen per element, no es reemplacen:
         dues persones poden escriure alhora sense trepitjar-se. */
      if(r.missatges) canviat = fusionarMissatges(r.missatges) || canviat;
      if(r.pesos)     canviat = fusionarPesos(r.pesos) || canviat;
      if(r.diari)     canviat = fusionarDiari(r.diari) || canviat;
      if(r.documents){
        const ids = new Set((S.documents||[]).map(d=>d.id));
        for(const d of r.documents) if(!ids.has(d.id)){ (S.documents=S.documents||[]).push(d); canviat = true; }
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

  /* Unió per identificador. Si el mateix missatge arriba pels dos
     costats, es queden totes les marques de llegit de tots dos. */
  function fusionarMissatges(remots){
    const local = S.missatges || (S.missatges = []);
    const perId = {}; for(const m of local) perId[m.id] = m;
    let canviat = false;
    for(const r of remots){
      const l = perId[r.id];
      if(!l){ local.push(r); canviat = true; continue; }
      const abans = JSON.stringify(l.llegits||{});
      l.llegits = Object.assign({}, r.llegits, l.llegits);
      if(JSON.stringify(l.llegits)!==abans) canviat = true;
    }
    /* els esborrats al servidor desapareixen també aquí */
    const ids = new Set(remots.map(r=>r.id));
    const abansN = local.length;
    S.missatges = local.filter(m => ids.has(m.id) || (Date.now()-new Date(m.quan).getTime()) < 60000);
    if(S.missatges.length!==abansN) canviat = true;
    S.missatges.sort((a,b)=>b.quan.localeCompare(a.quan));
    return canviat;
  }
  function fusionarDiari(remots){
    S.diari = S.diari || {};
    let canviat = false;
    for(const [ds,v] of Object.entries(remots)){
      const l = S.diari[ds];
      if(!l || (v.u||0) > (l.u||0)){ S.diari[ds] = v; canviat = true; }
    }
    return canviat;
  }
  /* Cada pesada porta marca de temps: guanya la més recent */
  function fusionarPesos(remots){
    S.pesos = S.pesos || {};
    let canviat = false;
    for(const [ds, p] of Object.entries(remots)){
      const l = S.pesos[ds];
      if(!l || (p.u||0) > (l.u||0)){ S.pesos[ds] = p; canviat = true; }
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
            editsPlats:S.editsPlats||{}, platsAmagats:S.platsAmagats||[],
            editsIng:S.editsIng||{}, racions:S.racions||{},
            /* Els historics ja venen retallats de core.js, i retallats de
               manera que no perden el passat. Retallar-los una segona
               vegada aqui si que el perdria. */
            racionsHist:S.racionsHist||[],
            apatsFixosHist:S.apatsFixosHist||[],
            apatsFixos:S.apatsFixos||{}, indicacions:S.indicacions||{},
            indicacionsNoves:S.indicacionsNoves||[],
            habitsEdit:S.habitsEdit||{}, habitsNous:S.habitsNous||[],
            canvis:(S.canvis||[]).slice(0,300),
            missatges:(S.missatges||[]).slice(0,300),
            pesos:S.pesos||{}, diari:S.diari||{}, documents:(S.documents||[]).slice(0,200),
            target:S.target||null, targetHist:S.targetHist||[], rev:S.metaRev,
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

  /* Retorna true nomes si el servidor ho ha confirmat. Si no hi ha sessio
     llenca error en lloc de retornar null: qui crida marcava la foto com
     a enviada sense mirar el retorn, i llavors ja no entrava mai a la cua
     de reintents. Val mes petar aqui que no pas perdre-la en silenci. */
  async function pujarFoto(ds, meal, blob){
    if(est.estat!=="connectat") throw new Error("sense connexio");
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

  /* --- documents adjunts als missatges ---
     Un PDF sol passar del megabyte, i un document de la base de dades no
     hi arriba. Per això es parteix en trossos: una fitxa amb les dades i
     tants trossos com calgui, que es tornen a ajuntar en descarregar-lo. */
  const TROS = 600000;                 // caràcters per tros
  const MAX_DOC = 8 * 1024 * 1024;     // 8 MB de fitxer

  async function pujarDocument(file){
    if(est.estat!=="connectat") throw new Error("Cal tenir la sessió iniciada per adjuntar fitxers.");
    if(file.size > MAX_DOC) throw new Error("El fitxer és massa gran (màxim 8 MB).");
    const b64 = await Fotos.aBase64(file);
    const id = "d"+Date.now()+Math.random().toString(36).slice(2,6);
    const trossos = [];
    for(let i=0;i<b64.length;i+=TROS) trossos.push(b64.slice(i,i+TROS));
    for(let i=0;i<trossos.length;i++)
      await dbf.doc("plans/"+PLA_ID+"/documents/"+id+"_c"+i).set({d:trossos[i]});
    const fitxa = {id, nom:file.name, mida:file.size,
                   tipus:file.type||"application/octet-stream",
                   parts:trossos.length, quan:new Date().toISOString(),
                   qui:(est.email||"aquest aparell")};
    await dbf.doc("plans/"+PLA_ID+"/documents/"+id).set(fitxa);
    await Fotos.desarBlob("doc_"+id, file);   // còpia local, per no rebaixar-lo
    return fitxa;
  }
  async function baixarDocument(fitxa){
    const local = await Fotos.llegirBlob("doc_"+fitxa.id);
    if(local) return local;
    if(est.estat!=="connectat") return null;
    try{
      let b64 = "";
      for(let i=0;i<fitxa.parts;i++){
        const d = await dbf.doc("plans/"+PLA_ID+"/documents/"+fitxa.id+"_c"+i).get();
        if(!d.exists) return null;
        b64 += d.data().d;
      }
      const blob = Fotos.deBase64Tipus(b64, fitxa.tipus);
      await Fotos.desarBlob("doc_"+fitxa.id, blob);
      return blob;
    }catch(e){ console.warn("baixarDocument:", e); return null; }
  }
  async function esborrarDocument(fitxa){
    if(est.estat!=="connectat") return;
    try{
      for(let i=0;i<fitxa.parts;i++)
        await dbf.doc("plans/"+PLA_ID+"/documents/"+fitxa.id+"_c"+i).delete();
      await dbf.doc("plans/"+PLA_ID+"/documents/"+fitxa.id).delete();
    }catch(e){ console.warn("esborrarDocument:", e); }
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

  /* Els documents adjunts pesen més que les fotos i fins ara no es
     comptaven enlloc. Van al mateix 1 GB, o sigui que el que importa és
     el total: un compte per separat enganyaria. */
  function espaiDocs(){
    let n = 0, bytes = 0;
    for(const d of (S.documents||[])){ n++; bytes += d.mida || 0; }
    const LIMIT = 1024*1024*1024;
    return {n, bytes, limit:LIMIT, percentatge: bytes/LIMIT*100};
  }
  function espaiTotal(){
    const f = espaiFotos(), d = espaiDocs();
    const bytes = f.bytes + d.bytes, LIMIT = 1024*1024*1024;
    return {fotos:f, docs:d, n:f.n+d.n, bytes, limit:LIMIT,
            percentatge: bytes/LIMIT*100};
  }

  return {est, init, login, logout, push, pushSetmana, pushConfig, marcar,
          pujarFoto, baixarFoto, esborrarFoto, espaiFotos, espaiDocs, espaiTotal, configurat,
          pujarDocument, baixarDocument, esborrarDocument};
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
