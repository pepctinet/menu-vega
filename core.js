/* =====================================================================
   MENÚ VEGA · NUCLI COMÚ
   ---------------------------------------------------------------------
   Aquest fitxer el carreguen els DOS aplicatius (ordinador i mòbil).
   NO conté cap valor calòric ni cap macronutrient: només noms d'aliments,
   quantitats, famílies nutricionals i receptes.
   Les calories i els macros viuen a "nutri.js", que només carrega
   l'aplicatiu d'ordinador i només es fa servir amb la sessió desbloquejada.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. ALIMENTS
      cat  : família nutricional — prot | hc | verd_c | verd_k | greix |
             fruita | cond
      shop : secció de la llista de la compra
      uq/ul: quantitat i nom d'una unitat casolana (1 cullerada = 10 g…)
      ml   : es mesura en mil·lilitres
      prep : elaboració — recepta per cada 100 g de producte final
   --------------------------------------------------------------------- */
const ING = {
/* ---- PROTEÏNES ---- */
 tofu:      {n:"Tofu ferm",              cat:"prot", shop:"Refrigerats"},
 soja_tex:  {n:"Soja texturitzada",      cat:"prot", shop:"Sec", nota:"pes en sec"},
 seitan:    {n:"Seitan",                 cat:"prot", shop:"Refrigerats"},
 tempeh:    {n:"Tempeh",                 cat:"prot", shop:"Refrigerats"},
 cigrons:   {n:"Cigrons cuits",          cat:"prot", shop:"Conserves"},
 llenties:  {n:"Llenties cuites",        cat:"prot", shop:"Conserves"},
 mongetes:  {n:"Mongetes cuites",        cat:"prot", shop:"Conserves"},
 edamame:   {n:"Edamame",                cat:"prot", shop:"Congelats"},
 ou:        {n:"Ou",                     cat:"prot", shop:"Refrigerats", uq:55, ul:"ou"},
 iogurt_soja:{n:"Iogurt de soja",        cat:"prot", shop:"Refrigerats", uq:120, ul:"iogurt"},
 llet_ame:  {n:"Beguda d'ametlla",       cat:"prot", shop:"Sec", ml:true},
/* ---- HIDRATS ---- */
 patata:    {n:"Patata",                 cat:"hc", shop:"Verdura", uq:150, ul:"patata mitjana", nota:"pes en cru"},
 moniato:   {n:"Moniato",                cat:"hc", shop:"Verdura", uq:250, ul:"moniato", nota:"pes en cru"},
 quinoa:    {n:"Quinoa",                 cat:"hc", shop:"Sec", nota:"pes en sec"},
 arros:     {n:"Arròs",                  cat:"hc", shop:"Sec", nota:"pes en sec"},
 pasta:     {n:"Pasta integral",         cat:"hc", shop:"Sec", nota:"pes en sec"},
 pa:        {n:"Pa integral",            cat:"hc", shop:"Fleca"},
 avena:     {n:"Flocs de civada",        cat:"hc", shop:"Sec"},
 datils:    {n:"Dàtils sense os",        cat:"hc", shop:"Sec"},
 mel:       {n:"Mel",                    cat:"hc", shop:"Sec", uq:15, ul:"cullerada"},
/* ---- VERDURA CRUA ---- */
 tomaquet:  {n:"Tomàquet",               cat:"verd_c", shop:"Verdura"},
 canonges:  {n:"Canonges",               cat:"verd_c", shop:"Verdura"},
 cogombre:  {n:"Cogombre",               cat:"verd_c", shop:"Verdura"},
 pastanaga: {n:"Pastanaga",              cat:"verd_c", shop:"Verdura"},
/* ---- VERDURA CUINADA ---- */
 carbasso:  {n:"Carbassó",               cat:"verd_k", shop:"Verdura"},
 pebrot:    {n:"Pebrot",                 cat:"verd_k", shop:"Verdura"},
 broquil:   {n:"Bròquil",                cat:"verd_k", shop:"Verdura"},
 alberginia:{n:"Albergínia",             cat:"verd_k", shop:"Verdura"},
 xampinyons:{n:"Xampinyons",             cat:"verd_k", shop:"Verdura"},
 espinacs:  {n:"Espinacs",               cat:"verd_k", shop:"Verdura"},
 ceba:      {n:"Ceba",                   cat:"verd_k", shop:"Verdura"},
/* ---- GREIXOS ---- */
 aove:      {n:"Oli d'oliva verge extra",cat:"greix", shop:"Sec", uq:10, ul:"cullerada", ml:true},
 sesam:     {n:"Sèsam triturat",         cat:"greix", shop:"Sec", uq:9,  ul:"cullerada"},
 lli:       {n:"Lli triturat",           cat:"greix", shop:"Sec", uq:9,  ul:"cullerada"},
 ametlles:  {n:"Ametlles",               cat:"greix", shop:"Sec", uq:40, ul:"grapat"},
 cacauets:  {n:"Cacauets",               cat:"greix", shop:"Sec", uq:40, ul:"grapat"},
 nous:      {n:"Nous",                   cat:"greix", shop:"Sec", uq:30, ul:"grapat"},
 tahini:    {n:"Tahini (crema de sèsam)",cat:"greix", shop:"Sec", uq:15, ul:"cullerada"},
 crema_ame: {n:"Crema d'ametlles",       cat:"greix", shop:"Sec", uq:25, ul:"cullerada"},
 alvocat:   {n:"Alvocat",                cat:"greix", shop:"Verdura", uq:150, ul:"alvocat"},
/* ---- FRUITA ---- */
 poma:      {n:"Poma",                   cat:"fruita", shop:"Fruita", uq:180, ul:"poma"},
 platan:    {n:"Plàtan",                 cat:"fruita", shop:"Fruita", uq:120, ul:"plàtan"},
 taronja:   {n:"Taronja",                cat:"fruita", shop:"Fruita", uq:200, ul:"taronja"},
 pera:      {n:"Pera",                   cat:"fruita", shop:"Fruita", uq:170, ul:"pera"},
 kiwi:      {n:"Kiwi",                   cat:"fruita", shop:"Fruita", uq:90,  ul:"kiwi"},
 maduixes:  {n:"Maduixes",               cat:"fruita", shop:"Fruita"},
 nabius:    {n:"Nabius",                 cat:"fruita", shop:"Fruita"},
 mango:     {n:"Mango",                  cat:"fruita", shop:"Fruita"},
 press:     {n:"Préssec",                cat:"fruita", shop:"Fruita", uq:150, ul:"préssec"},
 llimona:   {n:"Llimona",                cat:"fruita", shop:"Fruita", uq:100, ul:"llimona"},
/* ---- CONDIMENTS ---- */
 all:       {n:"All",                    cat:"cond", shop:"Verdura", uq:4, ul:"gra"},
 comi:      {n:"Comí mòlt",              cat:"cond", shop:"Espècies", uq:2, ul:"culleradeta"},
 pebre_v:   {n:"Pebre vermell dolç",     cat:"cond", shop:"Espècies", uq:2, ul:"culleradeta"},
 sal:       {n:"Sal marina",             cat:"cond", shop:"Espècies", uq:3, ul:"culleradeta"},
 julivert:  {n:"Julivert",               cat:"cond", shop:"Verdura"},
 vinagre:   {n:"Vinagre",                cat:"cond", shop:"Sec", ml:true},
 cacau:     {n:"Cacau pur en pols",      cat:"cond", shop:"Sec", uq:5, ul:"culleradeta"},
 salsa_soja:{n:"Salsa de soja",          cat:"cond", shop:"Sec", uq:10, ul:"cullerada", ml:true},

/* ---- ELABORACIONS ---- */
 hummus:{n:"Hummus casolà", cat:"prot", shop:"Elaboracions", uq:30, ul:"cullerada sopera",
   prep:{cigrons:62.5, tahini:9.4, all:1, llimona:9.4, aove:7, comi:0.3, sal:0.5},
   recepta:"400 g cigrons cuits · 60 g tahini · 2 grans d'all · suc d'1 llimona (60 ml) · 3 cullerades d'AOVE (45 ml) · ½ culleradeta de comí (2 g) · ½ culleradeta de sal (3 g) · 60-80 ml d'aigua freda. Triturar 1-2 minuts fins que quedi cremós. Decorar amb un raig d'oli, pebre vermell i julivert. 5 racions per a 5 dies."},
 boleta:{n:"Boleta energètica", cat:"hc", shop:"Elaboracions", uq:45, ul:"boleta",
   prep:{avena:32.3, datils:32.3, llet_ame:17.2, tahini:16.1, cacau:2.2},
   recepta:"150 g de flocs de civada · 150 g de dàtils sense os · 80 ml de beguda d'ametlla · 75 g de tahini · 1½ cullerada de cacau pur. Triturar la civada fina, afegir els dàtils, incorporar la resta i triturar fins a tenir una massa compacta. Formar boletes de 45 g. Surten 12 unitats i es conserven 7 dies a la nevera."},
 gaspatxo:{n:"Gaspatxo", cat:"verd_c", shop:"Elaboracions", ml:true, uq:250, ul:"got",
   prep:{tomaquet:70, cogombre:10, pebrot:8, ceba:3, aove:4, all:0.5, vinagre:1.5, sal:0.3},
   recepta:"Per 1 litre: 700 g de tomàquet · 100 g de cogombre · 80 g de pebrot · 30 g de ceba · 40 ml d'AOVE · 1 gra d'all · 15 ml de vinagre · sal. Triturar i colar."},
};

/* ---------------------------------------------------------------------
   2. ESTRUCTURA DEL DIA
   --------------------------------------------------------------------- */
const MEALS = [
 {id:"esmorzar", n:"Esmorzar", h:"7.30h"},
 {id:"migmati",  n:"Mig matí", h:"11h"},
 {id:"dinar",    n:"Dinar",    h:"13.30h"},
 {id:"berenar",  n:"Berenar",  h:"17h"},
 {id:"sopar",    n:"Sopar",    h:"21h"},
];
const DIES  = ["Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte","Diumenge"];
const DIES3 = ["dl","dt","dc","dj","dv","ds","dg"];
const MESOS = ["gener","febrer","març","abril","maig","juny","juliol","agost",
               "setembre","octubre","novembre","desembre"];
const MESOS3= ["gen","feb","mar","abr","mai","jun","jul","ago","set","oct","nov","des"];

/* ---------------------------------------------------------------------
   3. CATÀLEG DE PLATS
   --------------------------------------------------------------------- */
const BASE_DISHES = [
/* --- esmorzar: família pa --- */
 {id:"e_pa_tomaquet", n:"Torrades amb tomàquet i alvocat", m:["esmorzar"], src:"guia 2",
  i:{pa:95, tomaquet:100, alvocat:50, aove:10, sesam:9}},
 {id:"e_pa_hummus", n:"Torrades amb hummus i canonges", m:["esmorzar"], src:"guia 2",
  i:{pa:95, hummus:60, canonges:40, tomaquet:60, aove:10}},
 {id:"e_pa_crema", n:"Torrades amb crema d'ametlles i plàtan", m:["esmorzar"], src:"guia 2",
  i:{pa:95, crema_ame:25, platan:120, lli:9}},
 {id:"e_entrepa_tofu", n:"Entrepà de tofu a la planxa i tomàquet", m:["esmorzar"], src:"guia 2",
  i:{pa:95, tofu:100, tomaquet:80, aove:10, sesam:9}},
/* --- esmorzar: família civada --- */
 {id:"e_porridge", n:"Porridge de civada amb fruita i llavors", m:["esmorzar"], src:"guia 2",
  i:{avena:80, llet_ame:250, poma:180, lli:9, ametlles:20, mel:15}},
 {id:"e_bol_iogurt", n:"Bol de iogurt de soja, civada i nabius", m:["esmorzar"], src:"guia 2",
  i:{iogurt_soja:240, avena:80, nabius:100, crema_ame:25, sesam:9}},
 {id:"e_civada_cacau", n:"Civada amb cacau, plàtan i cacauets", m:["esmorzar"], src:"guia 2",
  i:{avena:80, llet_ame:250, cacau:5, platan:120, cacauets:25}},
/* --- mig matí: batut, base fixa de la guia 3 --- */
 {id:"b_platan_maduixa", n:"Batut de plàtan i maduixes", m:["migmati"], src:"guia 3",
  i:{llet_ame:250, iogurt_soja:120, crema_ame:25, avena:40, platan:120, maduixes:100, mel:15}},
 {id:"b_mango", n:"Batut de mango", m:["migmati"], src:"guia 3",
  i:{llet_ame:250, iogurt_soja:120, crema_ame:25, avena:40, mango:200, mel:15}},
 {id:"b_poma_canyella", n:"Batut de poma i canyella", m:["migmati"], src:"guia 3",
  i:{llet_ame:250, iogurt_soja:120, crema_ame:25, avena:40, poma:180, mel:15}},
 {id:"b_nabius_platan", n:"Batut de nabius i plàtan", m:["migmati"], src:"guia 3",
  i:{llet_ame:250, iogurt_soja:120, crema_ame:25, avena:40, nabius:100, platan:120, mel:15}},
 {id:"b_press_kiwi", n:"Batut de préssec i kiwi", m:["migmati"], src:"guia 3",
  i:{llet_ame:250, iogurt_soja:120, crema_ame:25, avena:40, press:150, kiwi:90, mel:15}},
/* --- berenar --- */
 {id:"r_fruita_boletes", n:"Poma + 2 boletes energètiques", m:["berenar"], src:"guia 3",
  i:{poma:180, boleta:90}},
 {id:"r_fruita_boletes_p", n:"Plàtan + 2 boletes energètiques", m:["berenar"], src:"guia 3",
  i:{platan:120, boleta:90}},
 {id:"r_entrepa_hummus", n:"Entrepà d'hummus i pastanaga + fruita", m:["berenar"], src:"noves indicacions",
  i:{pa:70, hummus:60, pastanaga:60, taronja:200}},
 {id:"r_entrepa_boletes", n:"Entrepà petit + 2 boletes + fruita", m:["berenar"], src:"noves indicacions",
  i:{pa:60, tomaquet:50, aove:10, boleta:90, poma:180}},
 {id:"r_fruits_secs", n:"Grapat d'ametlles + fruita", m:["berenar"], src:"guia 1",
  i:{ametlles:40, pera:170}},
/* --- habituals de casa --- */
 {id:"d_patata_tofu", n:"Patata amb verdura i tofu remenat", m:["dinar","sopar"], src:"habitual de casa",
  i:{patata:200, carbasso:110, pebrot:100, tofu:150, aove:20, sesam:9, all:8}},
 {id:"d_quinoa_seitan", n:"Quinoa amb verdures i seitan", m:["dinar","sopar"], src:"habitual de casa",
  i:{quinoa:60, broquil:110, pastanaga:100, seitan:130, aove:20, lli:9, salsa_soja:10}},
 {id:"d_gaspatxo_pa", n:"Gaspatxo amb 100 g de pa", m:["dinar","sopar"], src:"habitual de casa",
  i:{gaspatxo:500, pa:100, aove:10, ametlles:30}},
 {id:"d_gaspatxo_hummus", n:"Gaspatxo amb pa i hummus", m:["dinar","sopar"], src:"habitual de casa · reforçat",
  i:{gaspatxo:500, pa:100, hummus:90, ametlles:30, aove:10}},
 {id:"d_hummus_truita", n:"Hummus i truita de dos ous", m:["dinar","sopar"], src:"habitual de casa",
  i:{hummus:90, ou:110, pa:90, tomaquet:110, cogombre:90, aove:20, sesam:9}},
/* --- idees de sopar de la guia 1 --- */
 {id:"s_arros_tofu", n:"Arròs saltat amb tofu i verdures", m:["dinar","sopar"], src:"guia 1",
  i:{arros:80, tofu:150, carbasso:110, pebrot:100, aove:20, sesam:9}},
 {id:"s_patata_cigrons", n:"Patata al forn amb cigrons especiats", m:["dinar","sopar"], src:"guia 1",
  i:{patata:200, cigrons:210, tomaquet:110, canonges:90, aove:25, pebre_v:2, comi:2}},
 {id:"s_quinoa_soja", n:"Quinoa amb soja texturitzada saltada", m:["dinar","sopar"], src:"guia 1",
  i:{quinoa:70, soja_tex:50, broquil:110, pastanaga:100, aove:20, lli:9}},
 {id:"s_arros_edamame", n:"Arròs amb edamame i verdures saltades", m:["dinar","sopar"], src:"guia 1",
  i:{arros:80, edamame:130, carbasso:110, xampinyons:100, aove:20, sesam:9}},
 {id:"s_pasta_tofu", n:"Pasta cremosa amb tofu i verdures", m:["dinar","sopar"], src:"guia 1",
  i:{pasta:85, tofu:150, espinacs:110, xampinyons:100, aove:20, tahini:15}},
/* --- combinats segons la guia 2 --- */
 {id:"d_llenties", n:"Llenties amb verdures i amanida", m:["dinar","sopar"], src:"guia 2",
  i:{llenties:200, pastanaga:100, ceba:60, patata:150, tomaquet:110, aove:20, lli:9}},
 {id:"d_moniato_tempeh", n:"Moniato al forn amb tempeh i amanida", m:["dinar","sopar"], src:"guia 2",
  i:{moniato:250, tempeh:130, canonges:100, tomaquet:110, aove:20, sesam:9}},
 {id:"d_mongetes", n:"Mongetes amb espinacs i pa", m:["dinar","sopar"], src:"guia 2",
  i:{mongetes:200, espinacs:140, ceba:60, tomaquet:80, pa:60, aove:20, all:8, lli:9}},
 {id:"d_bol_quinoa_hummus", n:"Bol de quinoa, verdures crues i hummus", m:["dinar","sopar"], src:"guia 2",
  i:{quinoa:60, hummus:90, edamame:60, tomaquet:110, cogombre:90, pastanaga:60, aove:15, sesam:9}},
 {id:"d_pasta_bolonyesa", n:"Pasta amb bolonyesa de soja texturitzada", m:["dinar","sopar"], src:"guia 1",
  i:{pasta:85, soja_tex:50, tomaquet:150, ceba:60, pebrot:80, aove:20, lli:9}},
 {id:"d_curry_cigrons", n:"Curri de cigrons amb arròs", m:["dinar","sopar"], src:"guia 2",
  i:{arros:60, cigrons:200, espinacs:110, pebrot:100, aove:20, sesam:9}},
 {id:"d_amanida_completa", n:"Amanida completa de llenties i alvocat", m:["dinar","sopar"], src:"guia 2",
  i:{llenties:200, canonges:80, tomaquet:110, cogombre:80, pa:60, alvocat:60, aove:15, lli:9}},
 {id:"d_seitan_patata", n:"Seitan a la planxa amb patata i bròquil", m:["dinar","sopar"], src:"guia 2",
  i:{seitan:130, patata:200, broquil:120, tomaquet:100, aove:20, sesam:9}},
];

const POSTRES = [
 {id:"p_iogurt",        n:"Iogurt de soja", i:{iogurt_soja:120}},
 {id:"p_fruita_poma",   n:"Poma",           i:{poma:180}},
 {id:"p_fruita_platan", n:"Plàtan",         i:{platan:120}},
 {id:"p_fruita_taronja",n:"Taronja",        i:{taronja:200}},
 {id:"p_fruita_pera",   n:"Pera",           i:{pera:170}},
 {id:"p_fruita_kiwi",   n:"Kiwi",           i:{kiwi:90}},
];

const HABITS = [
 {id:"batut_nit", n:"Batut preparat la nit anterior"},
 {id:"descans_d", n:"Descans de 30-40 min després del dinar"},
 {id:"descans_s", n:"Descans de 30-40 min després del sopar"},
 {id:"passeig_m", n:"Passeig de 30 min al matí"},
 {id:"passeig_v", n:"Passeig de 30 min al vespre"},
];

/* Grups del configurador — l'ordre és el dels punts de la guia */
const CATS = [
 {k:"prot",   t:"1 · Proteïna",
  ajuda:"Tria'n una per àpat. Tofu 150 g · soja texturitzada 50 g en sec · llegums 160 g cuits · edamame 90 g · hummus 3 cullerades"},
 {k:"hc",     t:"2 · Hidrats de carboni",
  ajuda:"Patata 200 g en cru · moniato 350 g en cru · quinoa o arròs 60 g en sec · pa 90-100 g · flocs de civada 80 g"},
 {k:"verd_c", t:"3a · Verdura crua",
  ajuda:"200 g per plat. En un àpat crua i a l'altre cuita, o a l'inrevés"},
 {k:"verd_k", t:"3b · Verdura cuinada",
  ajuda:"200 g per plat, combinant colors"},
 {k:"greix",  t:"4 · Greixos saludables",
  ajuda:"Dos de DIFERENTS a cada àpat. Oli 2 cullerades · llavors 2 cullerades · fruits secs 1 grapat (40 g)"},
 {k:"fruita", t:"5 · Fruita",
  ajuda:"Una peça al berenar i com a postres"},
 {k:"cond",   t:"6 · Condiments i altres", ajuda:""},
];

/* ---------------------------------------------------------------------
   4. ESTAT I PERSISTÈNCIA LOCAL
   --------------------------------------------------------------------- */
const KEY = "menuvega_v2";

function loadState(){
  let s = null;
  try{ s = JSON.parse(localStorage.getItem(KEY)||"null"); }catch(e){}
  if(!s) s = {};
  s.weeks    = s.weeks    || {};   // {setmana: {data: {meals,postres,habits,validat,fotos}}}
  s.custom   = s.custom   || [];   // plats creats per l'usuari
  s.customIng= s.customIng|| {};   // aliments creats per l'usuari
  s.target   = s.target   || null; // objectius numèrics (només ordinador)
  s.pantry   = s.pantry   || {};
  s.rev      = s.rev      || 0;    // revisió, per a la sincronització
  return s;
}
let S = (typeof localStorage!=="undefined") ? loadState() : {weeks:{},custom:[],customIng:{},pantry:{},rev:0};

function saveState(silent){
  S.rev = (S.rev||0) + 1;
  S.savedAt = new Date().toISOString();
  try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){
    console.warn("No s'ha pogut desar en local:", e);
  }
  if(!silent && typeof Sync!=="undefined" && Sync.push) Sync.push();
}

/* aliments = base + els que hagi creat l'usuari */
function allIng(){ return Object.assign({}, ING, S.customIng); }
function ing(k){ return allIng()[k]; }
function DISHES(){ return BASE_DISHES.concat(S.custom||[]); }
function dishById(id){
  if(!id) return null;
  return DISHES().find(d=>d.id===id) || POSTRES.find(d=>d.id===id) || null;
}

/* ---------------------------------------------------------------------
   5. DATES
   --------------------------------------------------------------------- */
const pad = n => String(n).padStart(2,"0");
const iso = d => d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
function monday(d){ const x=new Date(d); x.setHours(0,0,0,0);
  x.setDate(x.getDate()-((x.getDay()+6)%7)); return x; }
function addDays(d,n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function weekKey(d){
  const x=new Date(d); x.setHours(0,0,0,0);
  x.setDate(x.getDate()+3-((x.getDay()+6)%7));
  const y=x.getFullYear();
  const n=1+Math.round(((x-new Date(y,0,4))/86400000-3+((new Date(y,0,4).getDay()+6)%7))/7);
  return y+"-W"+pad(n);
}
const fmtDay  = d => d.getDate()+" "+MESOS3[d.getMonth()];
const fmtLong = d => DIES[(d.getDay()+6)%7]+", "+d.getDate()+" de "+MESOS[d.getMonth()];
const parseDay = ds => new Date(ds+"T00:00:00");
const TODAY = (()=>{ const d=new Date(); d.setHours(0,0,0,0); return d; })();

function weekData(mon){
  const k = weekKey(mon);
  if(!S.weeks[k]) S.weeks[k] = {};
  return S.weeks[k];
}
function dayData(dateStr){
  const w = weekData(parseDay(dateStr));
  if(!w[dateStr]) w[dateStr] = {meals:{}, postres:{}, habits:[], validat:null, fotos:{}};
  const d = w[dateStr];
  d.meals=d.meals||{}; d.postres=d.postres||{}; d.habits=d.habits||[]; d.fotos=d.fotos||{};
  return d;
}
const esValidat = day => !!(day && day.validat);

/* ---------------------------------------------------------------------
   6. QUANTITATS LLEGIBLES
   --------------------------------------------------------------------- */
const fmtN = n => (Math.round(n*10)/10).toString().replace(".",",");
function plural(s,n){
  if(n===1) return s;
  return s.split(" ").map(w=> w.endsWith("a") ? w.slice(0,-1)+"es"
                            : w.endsWith("s") ? w : w+"s").join(" ");
}
function qtyTxt(k,g){
  const x = ing(k); if(!x) return Math.round(g)+" g";
  const u = x.ml ? "ml" : "g";
  const val = Math.round(g*10)/10;
  if(x.uq && x.ul){
    const n = g/x.uq, r = Math.round(n*2)/2;
    if(r>=1 && Math.abs(n-r)<0.26) return fmtN(r)+" "+plural(x.ul,r)+" ("+val+" "+u+")";
  }
  return val+" "+u;
}
function shopRound(g){
  if(g>=200) return Math.ceil(g/25)*25;
  if(g>=50)  return Math.ceil(g/10)*10;
  if(g>=10)  return Math.ceil(g/5)*5;
  return Math.ceil(g);
}
function ingList(items){
  return Object.entries(items).map(([k,g])=>(ing(k)?ing(k).n:k)+" "+qtyTxt(k,g)).join(" · ");
}
function ingListShort(items,max){
  const p = Object.entries(items).map(([k,g])=>(ing(k)?ing(k).n:k));
  return max&&p.length>max ? p.slice(0,max).join(" · ")+" · +"+(p.length-max) : p.join(" · ");
}

/* ---------------------------------------------------------------------
   7. CRITERIS ESTRUCTURALS  — SENSE CAP CALORIA
      Aquests són els únics criteris que fa servir l'aplicatiu del mòbil.
      Miren si el plat té els elements que demana la guia, no quant pesa
      en energia.
   --------------------------------------------------------------------- */
function structure(items){
  const g = {prot:0, hc:0, verd_c:0, verd_k:0, greix:0, fruita:0, cond:0};
  const greixos = new Set(), prots = new Set();
  for(const [k,q] of Object.entries(items||{})){
    const x = ing(k); if(!x||!q) continue;
    g[x.cat] = (g[x.cat]||0) + q;
    if(x.cat==="greix" && q>=5) greixos.add(k);
    if(x.cat==="prot"  && q>=40) prots.add(k);
  }
  g.verd = g.verd_c + g.verd_k;
  return {g, greixos:[...greixos], prots:[...prots]};
}

/* Retorna {complet:bool, falten:[textos]} per a un àpat.
   "falten" es redacta sempre en positiu, com a suggeriment. */
function checkMeal(dishId, mealId){
  const d = dishById(dishId);
  if(!d) return {complet:false, falten:[], buit:true};
  const s = structure(d.i);
  const f = [];
  if(mealId==="dinar"||mealId==="sopar"){
    if(!s.prots.length)        f.push("una font de proteïna");
    if(s.g.verd < 200)         f.push("arribar als 200 g de verdura");
    if(s.g.hc < 55)            f.push("l'aliment del grup dels hidrats");
    if(s.greixos.length < 2)   f.push("un segon greix saludable");
  } else if(mealId==="migmati"){
    if((d.i.llet_ame||0)   < 250) f.push("els 250 ml de beguda d'ametlla");
    if((d.i.iogurt_soja||0)< 120) f.push("el iogurt de soja");
    if((d.i.crema_ame||0)  < 25)  f.push("els 25 g de crema d'ametlles");
    if((d.i.avena||0)      < 40)  f.push("els 40 g de flocs de civada");
    if(s.g.fruita < 100)          f.push("la fruita");
  } else if(mealId==="berenar"){
    if(s.g.fruita < 90) f.push("la peça de fruita");
    if((d.i.boleta||0) < 90 && s.g.greix < 30 && (d.i.pa||0) < 50)
      f.push("les boletes, l'entrepà o el grapat de fruits secs");
  } else { /* esmorzar */
    if(s.g.hc < 60)          f.push("el pa o els flocs de civada");
    if(!s.g.prot)            f.push("un aliment amb proteïna");
    if(!s.greixos.length)    f.push("un greix saludable");
  }
  return {complet:f.length===0, falten:f, buit:false};
}

/* Dia complet — només estructura */
function dayItems(day){
  const all = {};
  const add = it => { for(const [k,g] of Object.entries(it||{})) all[k]=(all[k]||0)+g; };
  for(const m of MEALS){ const d=dishById(day.meals[m.id]); if(d) add(d.i); }
  for(const m of ["dinar","sopar"]){ const p=dishById(day.postres[m]); if(p) add(p.i); }
  return all;
}
function checkDay(day){
  const items = dayItems(day);
  const s = structure(items);
  const f = [];
  const fets = MEALS.filter(m=>day.meals[m.id]).length;
  if(fets < 5) f.push("planificar els "+MEALS.length+" àpats");
  if(s.g.verd_c < 100 || s.g.verd_k < 100) f.push("verdura crua en un àpat i cuita en un altre");
  if(fruitPieces(items) < 3) f.push("arribar a 3 racions de fruita");
  const alt = postresAlternades(day);
  if(!alt.ok) f.push("alternar iogurt i fruita a les postres");
  return {complet:f.length===0 && fets===5, falten:f, fets};
}
function fruitPieces(items){
  let g=0;
  for(const [k,v] of Object.entries(items)){
    const x = ing(k);
    if(x && x.cat==="fruita" && k!=="llimona") g += v;
  }
  return g/150;
}
function postresAlternades(day){
  const a = dishById(day.postres.dinar), b = dishById(day.postres.sopar);
  if(!a||!b) return {ok:false, txt:"sense definir"};
  const ia = a.id==="p_iogurt", ib = b.id==="p_iogurt";
  return {ok: ia!==ib, txt:(ia?"iogurt":"fruita")+" / "+(ib?"iogurt":"fruita")};
}

/* ---------------------------------------------------------------------
   8. PROPOSTA AUTOMÀTICA DE SETMANA
   --------------------------------------------------------------------- */
function proposarSetmana(mon, opcions){
  const o = opcions||{};
  const desde = o.desde || TODAY;          // no toquem res anterior a aquesta data
  const bons = mid => {
    const p = DISHES().filter(d=>d.m.includes(mid));
    const b = p.filter(d=>checkMeal(d.id,mid).complet);
    return b.length ? b : p;
  };
  const P = {}; for(const m of MEALS) P[m.id] = bons(m.id);
  const teCrua = d => structure(d.i).g.verd_c >= 100;
  const fruites = ["p_fruita_poma","p_fruita_taronja","p_fruita_pera",
                   "p_fruita_kiwi","p_fruita_platan"];
  let canvis = 0;

  for(let i=0;i<7;i++){
    const dt = addDays(mon,i);
    if(dt < desde) continue;
    const day = dayData(iso(dt));
    if(esValidat(day)) continue;           // els dies validats no es toquen mai
    const usats = new Set(Object.values(day.meals));

    for(const mid of ["esmorzar","migmati","berenar"]){
      if(day.meals[mid]) continue;
      const p = P[mid]; if(p.length){ day.meals[mid] = p[i % p.length].id; canvis++; }
    }
    if(!day.meals.dinar){
      const p = P.dinar.filter(d=>!usats.has(d.id));
      if(p.length){ const d=p[(i*3)%p.length]; day.meals.dinar=d.id; usats.add(d.id); canvis++; }
    }
    if(!day.meals.sopar){
      const dDinar = dishById(day.meals.dinar);
      const volCrua = dDinar ? !teCrua(dDinar) : true;
      let p = P.sopar.filter(d=>!usats.has(d.id));
      const pref = p.filter(d=>teCrua(d)===volCrua);
      if(pref.length) p = pref;
      if(p.length){ day.meals.sopar = p[(i*5+2)%p.length].id; canvis++; }
    }
    if(!day.postres.dinar) day.postres.dinar = i%2===0 ? "p_iogurt" : fruites[i%fruites.length];
    if(!day.postres.sopar) day.postres.sopar = i%2===0 ? fruites[i%fruites.length] : "p_iogurt";
  }
  return canvis;
}

/* ---------------------------------------------------------------------
   9. LLISTA DE LA COMPRA
   --------------------------------------------------------------------- */
function expandir(items, out){
  out = out || {};
  for(const [k,g] of Object.entries(items||{})){
    const x = ing(k); if(!x) continue;
    if(x.prep){
      const sub = {};
      for(const [sk,per100] of Object.entries(x.prep)) sub[sk] = per100*g/100;
      expandir(sub, out);
    } else out[k] = (out[k]||0) + g;
  }
  return out;
}
function compraDe(mon, desDavui){
  const out = {}, preps = new Set();
  for(let i=0;i<7;i++){
    const dt = addDays(mon,i);
    if(desDavui && dt < TODAY) continue;
    const day = dayData(iso(dt));
    for(const m of MEALS){
      const d = dishById(day.meals[m.id]); if(!d) continue;
      expandir(d.i, out);
      for(const k of Object.keys(d.i)) if(ing(k) && ing(k).prep) preps.add(k);
    }
    for(const m of ["dinar","sopar"]){
      const p = dishById(day.postres[m]); if(p) expandir(p.i, out);
    }
  }
  return {out, preps:[...preps]};
}
const ORDRE_SECCIONS = ["Verdura","Fruita","Refrigerats","Congelats","Conserves",
                        "Sec","Fleca","Espècies","Elaboracions"];
function agruparCompra(out){
  const sec = {};
  for(const [k,g] of Object.entries(out)){
    const x = ing(k); if(!x) continue;
    (sec[x.shop||"Altres"] = sec[x.shop||"Altres"]||[]).push([k,g]);
  }
  for(const a of Object.values(sec)) a.sort((p,q)=>ing(p[0]).n.localeCompare(ing(q[0]).n));
  const claus = Object.keys(sec).sort((a,b)=>{
    const ia=ORDRE_SECCIONS.indexOf(a), ib=ORDRE_SECCIONS.indexOf(b);
    return (ia<0?99:ia)-(ib<0?99:ib);
  });
  return {sec, claus};
}

/* ---------------------------------------------------------------------
   10. QUANTITATS DE REFERÈNCIA per al configurador
   --------------------------------------------------------------------- */
const QTY_REF = {
 tofu:150, soja_tex:50, cigrons:160, llenties:160, mongetes:160, edamame:90,
 seitan:130, tempeh:130, hummus:90, ou:110, iogurt_soja:120, llet_ame:250,
 patata:200, moniato:350, quinoa:60, arros:60, pasta:80, pa:95, avena:80,
 datils:30, mel:15, aove:20, sesam:9, lli:9, ametlles:40, cacauets:40, nous:30,
 tahini:15, crema_ame:25, alvocat:60, boleta:90, gaspatxo:400,
 all:8, comi:2, pebre_v:2, sal:3, julivert:5, vinagre:10, cacau:5, salsa_soja:10,
};
function qtyRef(k){
  if(QTY_REF[k]!==undefined) return QTY_REF[k];
  const x = ing(k); if(!x) return 100;
  if(x.qtyRef) return x.qtyRef;
  if(x.cat==="verd_c"||x.cat==="verd_k") return 100;
  if(x.cat==="fruita") return x.uq||150;
  return 100;
}

/* ---------------------------------------------------------------------
   11. UTILITATS COMUNES
   --------------------------------------------------------------------- */
const esc = s => String(s==null?"":s).replace(/[&<>"]/g,
  c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

if (typeof module !== "undefined") module.exports = {
  ING, MEALS, DIES, BASE_DISHES, POSTRES, HABITS, CATS, QTY_REF,
  loadState, saveState, allIng, ing, DISHES, dishById, iso, monday, addDays,
  weekKey, dayData, weekData, structure, checkMeal, checkDay, dayItems,
  proposarSetmana, expandir, compraDe, agruparCompra, qtyTxt, shopRound,
  qtyRef, fruitPieces, postresAlternades, esValidat, TODAY, fmtDay, fmtLong,
  parseDay, get S(){ return S; }, set S(v){ S = v; },
};
