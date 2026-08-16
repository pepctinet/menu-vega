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
        /* Tot el que s'hagi acumulat sense sessio surt ara. Abans no
           s'agendava res en connectar-se: els canvis fets sense connexio
           s'hi quedaven fins que en feies un de nou. */
        intentsFallits = 0;
        if(pendents.size) programar();
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

  /* --- separacio guia / seguiment ---
     A "config/general" nomes hi ha d'haver la guia: els plats, els
     aliments, les racions, els criteris, les indicacions i els habits.
     Es el que el mobil necessita per dir-li que li toca menjar ara.
     El seguiment -pes, diari, missatges, documents i objectius- viu a
     "privat/seguiment", on el mobil no mira mai. */
  const CAMPS_SEGUIMENT = ["pesos","diari","missatges","documents","canvis","target","targetHist"];
  const teSeguiment = r => CAMPS_SEGUIMENT.some(k => r[k] !== undefined);

  /* Ho passem d'un document a l'altre i ho esborrem del vell. Es fa amb
     el que el client ja te fusionat, o sigui despres de llegir-ho, i
     nomes des d'un aparell d'adult. Si es corre dues vegades no passa
     res: la segona ja no hi troba res a moure. */
  let migrant = false;
  async function migrarSeguiment(){
    if(migrant || NOMES_GUIA || est.estat!=="connectat") return;
    migrant = true;
    try{
      await enviarPrivat();
      const treure = {};
      for(const k of CAMPS_SEGUIMENT) treure[k] = firebase.firestore.FieldValue.delete();
      await dbf.doc("plans/"+PLA_ID+"/config/general").update(treure);
      console.info("Seguiment separat de la guia.");
    }catch(e){ console.warn("migrarSeguiment:", e); }
    finally{ migrant = false; }
  }

  function fusionarDocuments(remots){
    const local = S.documents || (S.documents = []);
    const perId = {}; for(const d of local) perId[d.id] = d;
    let canviat = false;
    for(const r of remots){
      const l = perId[r.id];
      if(!l){ local.push(r); canviat = true; continue; }
      if(r.esborrat && !l.esborrat && (r.u||0) >= (l.u||0)){
        local[local.indexOf(l)] = r; canviat = true;
      }
    }
    return canviat;
  }

  /* Escoltem la configuració general i les setmanes des de 8 setmanes
     enrere: no cal descarregar tot l'històric a cada obertura. */
  function escoltar(){
    const desde = weekKey(addDays(avui(),-56));
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
        S.metaRev   = r.rev;
        canviat = true;
      }
      /* --- restes d'abans de la separacio ---
         Fins ara el seguiment viatjava dins d'aquest mateix document.
         Els adults se l'enduen cap al document privat i despres el treuen
         d'aqui; el mobil no en fa res, i com que ja no ho desa, al telefon
         hi deixa de ser encara que el document vell encara ho porti. */
      if(!NOMES_GUIA && teSeguiment(r)){
        if(r.missatges) canviat = fusionarMissatges(r.missatges) || canviat;
        if(r.pesos)     canviat = fusionarPesos(r.pesos) || canviat;
        if(r.diari)     canviat = fusionarDiari(r.diari) || canviat;
        if(r.documents) canviat = fusionarDocuments(r.documents) || canviat;
        if(r.canvis && !(S.canvis||[]).length){ S.canvis = r.canvis; canviat = true; }
        if(r.target !== undefined && S.target == null){ S.target = r.target; canviat = true; }
        if(r.targetHist && !(S.targetHist||[]).length){ S.targetHist = r.targetHist; canviat = true; }
        migrarSeguiment();
      }
      if(canviat){ desarLocal(); onCanvi(est, true); }
    }, e=>console.warn("config:",e)));

    /* El seguiment va en un document a part, i el mobil no s'hi
       subscriu. Pes, diari, missatges, documents i objectius no li han
       d'arribar mai: no n'hi ha prou de no ensenyar-los-hi. */
    if(!NOMES_GUIA)
      unsub.push(dbf.doc("plans/"+PLA_ID+"/privat/seguiment").onSnapshot(d=>{
        if(!d.exists) return;
        const r = d.data();
        let canviat = false;
        if(r.rev!=null && r.rev > (S.privatRev||0)){
          S.canvis     = r.canvis     || S.canvis;
          S.target     = r.target !== undefined ? r.target : S.target;
          S.targetHist = r.targetHist || S.targetHist;
          S.privatRev  = r.rev;
          canviat = true;
        }
        if(r.missatges) canviat = fusionarMissatges(r.missatges) || canviat;
        if(r.pesos)     canviat = fusionarPesos(r.pesos) || canviat;
        if(r.diari)     canviat = fusionarDiari(r.diari) || canviat;
        if(r.documents) canviat = fusionarDocuments(r.documents) || canviat;
        if(canviat){ desarLocal(); onCanvi(est, true); }
      }, e=>console.warn("privat:",e)));

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
  /* Fusio per identificador amb lapides.
     Abans hi havia una regla que deia: si un missatge local no arriba del
     servidor i te mes de 60 segons, esborra'l. Servia per propagar els
     esborrats, pero castigava l'innocent: un missatge escrit sense
     connexio, o que encara no havia pujat, desapareixia tot sol al cap
     d'un minut. Ara els esborrats viatgen com a lapides i l'abcencia no
     vol dir res. */
  function fusionarMissatges(remots){
    const local = S.missatges || (S.missatges = []);
    const perId = {}; for(const m of local) perId[m.id] = m;
    let canviat = false;
    for(const r of remots){
      const l = perId[r.id];
      if(!l){ local.push(r); canviat = true; continue; }
      /* Una lapida mana sobre el contingut, vingui d'on vingui: guanya
         la marca de temps mes recent. */
      if(r.esborrat && !l.esborrat && (r.u||0) >= (l.u||0)){
        local[local.indexOf(l)] = r; canviat = true; continue;
      }
      if(l.esborrat) continue;
      const abans = JSON.stringify(l.llegits||{});
      l.llegits = Object.assign({}, r.llegits, l.llegits);
      if(JSON.stringify(l.llegits)!==abans) canviat = true;
    }
    S.missatges.sort((a,b)=>String(b.quan||"").localeCompare(String(a.quan||"")));
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
    /* Al telefon, res que no sigui la guia no arriba al disc. Aquesta
       passada va abans d'escriure, no despres: la copia local es feia
       ABANS d'avisar l'aplicatiu, i per aixo fins ara hi quedava tot. */
    if(NOMES_GUIA) nomesGuia(S);
    try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){}
  }

  /* --- enviar canvis ---
     La cua va per DIA, no per setmana. Enviant la setmana sencera,
     aquest aparell hi tornava a posar la seva copia de tots els dies que
     coneixia, inclosos els que no havia tocat. Si mentrestant l'altre
     aparell n'havia canviat un, l'ultim que enviava el tornava enrere:
     dades perdudes sense cap avis i sense cap conflicte visible.
     Enviant nomes {dies: {<data>: ...}} amb merge, Firestore fusiona
     aquella clau i deixa les germanes com estaven. */
  function marcar(k){ pendents.add(k); programar(); }
  function push(){
    for(const setmana of Object.values(S.weeks||{}))
      for(const ds of Object.keys(setmana)) pendents.add("dia:"+ds);
    pendents.add("__config__");
    programar();
  }
  function pushDia(ds){ pendents.add("dia:"+ds); programar(); }
  /* Es conserva pel codi antic que encara crida amb la clau de setmana */
  function pushSetmana(k){
    const setmana = S.weeks[k];
    if(setmana) for(const ds of Object.keys(setmana)) pendents.add("dia:"+ds);
    programar();
  }
  function pushConfig(){ pendents.add("__config__"); programar(); }

  /* Quina revisio toca escriure. Es llegeix la que hi ha al servidor i
     es puja una per sobre de la mes alta de les dues. Si no es pot
     llegir (sense connexio, o el document encara no existeix) es tira
     endavant amb la local, que es el que es feia sempre. */
  async function seguentRevisio(ruta, local){
    try{
      const d = await dbf.doc("plans/"+PLA_ID+"/"+ruta).get();
      const remota = (d.exists && d.data().rev) || 0;
      return Math.max(remota, local||0) + 1;
    }catch(e){ return (local||0) + 1; }
  }

  async function enviarPrivat(){
    if(NOMES_GUIA) return;
    S.privatRev = await seguentRevisio("privat/seguiment", S.privatRev);
    await dbf.doc("plans/"+PLA_ID+"/privat/seguiment").set({
      canvis:(S.canvis||[]).slice(0,300),
      missatges:(S.missatges||[]).slice(0,300),
      pesos:S.pesos||{}, diari:S.diari||{},
      documents:(S.documents||[]).slice(0,200),
      target:S.target||null, targetHist:S.targetHist||[],
      rev:S.privatRev,
      actualitzat: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
  }

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
          /* La revisio es demana al servidor, no es calcula aqui.
             Calculant-la en local, dos aparells que editessin alhora
             escrivien la mateixa revisio: l'ultim guanyava i l'altre
             ignorava els seus canvis, perque nomes accepta revisions
             estrictament superiors. Ara sempre queda per sobre del que
             hi ha de debò. */
          S.metaRev = await seguentRevisio("config/general", S.metaRev);
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
            rev:S.metaRev,
            actualitzat: firebase.firestore.FieldValue.serverTimestamp()
          }, {merge:true});
          /* El seguiment va al seu document, i nomes des d'un aparell
             d'adult. El mobil no arriba mai aqui: no crida pushConfig. */
          if(!NOMES_GUIA) await enviarPrivat();
        } else if(k.startsWith("dia:")){
          const ds = k.slice(4);
          const setmana = S.weeks[weekKey(parseDay(ds))];
          const day = setmana && setmana[ds];
          if(!day) continue;
          await dbf.doc("plans/"+PLA_ID+"/setmanes/"+weekKey(parseDay(ds))).set({
            dies: {[ds]: day},
            actualitzat: firebase.firestore.FieldValue.serverTimestamp()
          }, {merge:true});
        }
      }
      intentsFallits = 0;
      est.ultimaSync = new Date(); est.missatge="Sincronitzat"; onCanvi(est);
    }catch(e){
      console.warn("enviar:", e);
      llista.forEach(k=>pendents.add(k));
      est.missatge="Canvis pendents d'enviar"; onCanvi(est);
      /* Abans es tornava a posar a la cua i s'acabava aqui: no hi havia
         cap nou temporitzador, o sigui que els canvis s'hi quedaven fins
         que passava alguna altra cosa. Ara es torna a provar tot sol,
         esperant cada vegada una mica mes. */
      reintentar();
    }
  }

  /* Reintent amb espera creixent: 2, 4, 8... fins a un minut. */
  let intentsFallits = 0;
  function reintentar(){
    intentsFallits++;
    const espera = Math.min(60000, 2000 * Math.pow(2, intentsFallits-1));
    clearTimeout(temporitzador);
    temporitzador = setTimeout(enviar, espera);
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

  return {est, init, login, logout, push, pushDia, pushSetmana, pushConfig, marcar,
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
  /* Nomes aquest dia, no la setmana sencera: si no, aquest aparell
     tornava a enviar la seva copia de tots els altres dies. */
  if(typeof Sync!=="undefined") Sync.pushDia(ds);
}
function tocarConfig(){
  saveState(true);
  if(typeof Sync!=="undefined") Sync.pushConfig();
}
