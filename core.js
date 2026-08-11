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
  i:{llenties:200, pastanaga:100, ceba:60, patata:200, tomaquet:110, aove:20, lli:9}},
 {id:"d_moniato_tempeh", n:"Moniato al forn amb tempeh i amanida", m:["dinar","sopar"], src:"guia 2",
  i:{moniato:350, tempeh:130, canonges:100, tomaquet:110, aove:20, sesam:9}},
 {id:"d_mongetes", n:"Mongetes amb espinacs i pa", m:["dinar","sopar"], src:"guia 2",
  i:{mongetes:200, espinacs:140, ceba:60, tomaquet:80, pa:95, aove:20, all:8, lli:9}},
 {id:"d_bol_quinoa_hummus", n:"Bol de quinoa, verdures crues i hummus", m:["dinar","sopar"], src:"guia 2",
  i:{quinoa:60, hummus:90, edamame:60, tomaquet:110, cogombre:90, pastanaga:60, aove:15, sesam:9}},
 {id:"d_pasta_bolonyesa", n:"Pasta amb bolonyesa de soja texturitzada", m:["dinar","sopar"], src:"guia 1",
  i:{pasta:85, soja_tex:50, tomaquet:150, ceba:60, pebrot:80, aove:20, lli:9}},
 {id:"d_curry_cigrons", n:"Curri de cigrons amb arròs", m:["dinar","sopar"], src:"guia 2",
  i:{arros:60, cigrons:200, espinacs:110, pebrot:100, aove:20, sesam:9}},
 {id:"d_amanida_completa", n:"Amanida completa de llenties i alvocat", m:["dinar","sopar"], src:"guia 2",
  i:{llenties:200, canonges:80, tomaquet:110, cogombre:80, pa:95, alvocat:75, aove:20, lli:9}},
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
  s.custom   = s.custom   || [];   // plats creats de nou
  s.customIng= s.customIng|| {};   // aliments creats de nou
  s.editsPlats  = s.editsPlats  || {};  // modificacions sobre els plats que porta el programa
  s.platsAmagats= s.platsAmagats|| [];  // plats retirats (no s'esborren, es poden recuperar)
  s.editsIng    = s.editsIng    || {};  // modificacions sobre aliments i receptes de base
  s.racions     = s.racions     || {};  // modificacions sobre les racions
  s.canvis      = s.canvis      || [];  // qui ha canviat què i quan
  s.missatges   = s.missatges   || [];  // taulell de missatges entre adults
  s.pesos       = s.pesos       || {};  // {data: {kg, hora, nota, u}}
  s.diari       = s.diari       || {};  // {data: {text, u}} observacions sense pesada
  s.documents   = s.documents   || [];  // fitxers adjunts als missatges
  s.target   = s.target   || null; // objectius numèrics (només ordinador)
  s.pantry   = s.pantry   || {};
  s.rev      = s.rev      || 0;    // revisió, per a la sincronització
  return s;
}

/* Registre de canvis: qui toca les racions, els plats o les receptes.
   Es guarden els 300 últims, prou per a qualsevol revisió. */
function apuntarCanvi(que){
  const qui = (typeof Sync!=="undefined" && Sync.est && Sync.est.email) ? Sync.est.email : "aquest aparell";
  S.canvis = S.canvis || [];
  S.canvis.unshift({quan:new Date().toISOString(), qui, que});
  if(S.canvis.length > 300) S.canvis.length = 300;
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

/* Aliments = els del programa (amb les modificacions que s'hi hagin fet)
   més els que s'hagin creat de nou. */
function allIng(){
  const base = {};
  for(const [k,v] of Object.entries(ING))
    base[k] = (S.editsIng && S.editsIng[k]) ? Object.assign({}, v, S.editsIng[k], {editat:true}) : v;
  return Object.assign(base, S.customIng||{});
}
function ing(k){ return allIng()[k]; }

/* Plats = els del programa (amb modificacions, sense els retirats) més els nous */
function DISHES(){
  const edits = S.editsPlats||{}, fora = new Set(S.platsAmagats||[]);
  const base = BASE_DISHES
    .filter(d => !fora.has(d.id))
    .map(d => edits[d.id] ? Object.assign({}, d, edits[d.id], {editat:true}) : d);
  return base.concat((S.custom||[]).filter(d => !fora.has(d.id)));
}
/* Tots, inclosos els retirats: per a la pantalla d'edició i per poder
   llegir el nom d'un plat antic que s'hagi retirat després. */
function totsElsPlats(){
  const edits = S.editsPlats||{}, fora = new Set(S.platsAmagats||[]);
  const base = BASE_DISHES.map(d =>
    Object.assign({}, d, edits[d.id]||{}, {editat:!!edits[d.id], base:true, amagat:fora.has(d.id)}));
  const meus = (S.custom||[]).map(d => Object.assign({}, d, {base:false, amagat:fora.has(d.id)}));
  return base.concat(meus);
}
function dishById(id){
  if(!id) return null;
  return DISHES().find(d=>d.id===id)
      || totsElsPlats().find(d=>d.id===id)      // encara que s'hagi retirat
      || POSTRES.find(d=>d.id===id) || null;
}
const esPlatBase = id => BASE_DISHES.some(d=>d.id===id);

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
  if(!w[dateStr]) w[dateStr] = {};
  const d = w[dateStr];
  d.meals    = d.meals    || {};   // plat programat des de l'ordinador
  d.custom   = d.custom   || {};   // àpat que ella ha construït element a element
  d.fora     = d.fora     || {};   // àpat fet fora de casa, en text
  d.sensacio = d.sensacio || {};   // v | t | r  (mai se li mostra l'històric)
  d.supervisio = d.supervisio || {}; // sup | prep | sola (el marca el pare)
  d.postres  = d.postres  || {};
  d.habits   = d.habits   || [];
  d.fotos    = d.fotos    || {};
  if(d.validat===undefined) d.validat = null;
  return d;
}
const esValidat = day => !!(day && day.validat);

/* Les tres sensacions. Sense etiquetes de valor: només color i una
   paraula neutra. No se'n mostra mai l'històric a l'aplicatiu d'ella. */
const SENSACIONS = [
  {id:"v", n:"Bé",       color:"#57a247"},
  {id:"t", n:"Regular",  color:"#d9a219"},
  {id:"r", n:"Malament", color:"#c0392b"},
];

/* Nivell d'acompanyament de cada àpat. El marca el pare des del seu
   aplicatiu i el veuen ell, la nutricionista i la psicòloga; mai ella.

   L'escala és deliberadament NEUTRA: el mateix color amb tres
   ompliments, no un semàfor. Menjar sense supervisió no és el cas
   pitjor — en recuperació sol ser justament el progrés que es busca—,
   i un vermell hi posaria una lectura que no toca. */
const SUPERVISIO = [
  {id:"sup",  n:"Vaig supervisar l'àpat",              curt:"supervisat", omplert:"ple"},
  {id:"prep", n:"Hi vaig ser a la preparació",         curt:"preparació", omplert:"mig"},
  {id:"sola", n:"Va menjar sola",                      curt:"sola",       omplert:"buit"},
];
const COLOR_SUP = "#5b6b7a";      // gris blavós, sense càrrega de valor

function marcarSupervisio(dataStr, mealId, val){
  const day = dayData(dataStr);
  if(!val || day.supervisio[mealId] === val) delete day.supervisio[mealId];
  else day.supervisio[mealId] = val;
}
const supervisioDe = (day, mealId) => (day && day.supervisio) ? day.supervisio[mealId] : null;

/* ---------------------------------------------------------------------
   Què hi ha en un àpat d'un dia. Té tres orígens possibles i aquesta
   funció els unifica perquè la resta del codi no s'hi hagi de barallar:
     · "plat"   — el que s'ha programat des de l'ordinador
     · "lliure" — el que ella ha construït element a element
     · "fora"   — un àpat fet fora de casa, anotat en text
   L'àpat fet fora no es valora: no en sabem les quantitats i no té cap
   sentit dir-li que li falta res d'un plat que ja s'ha menjat.
   --------------------------------------------------------------------- */
function apatDelDia(day, mealId){
  if(!day) return null;
  if(day.fora && day.fora[mealId]){
    const f = day.fora[mealId];
    return {tipus:"fora", n:f.text || "Àpat fora de casa", lloc:f.lloc||"", i:{}, valorable:false};
  }
  if(day.custom && day.custom[mealId]){
    const c = day.custom[mealId];
    return {tipus:"lliure", n:c.n || "Àpat adaptat", i:c.i || {}, valorable:true};
  }
  const d = dishById(day.meals[mealId]);
  return d ? {tipus:"plat", id:d.id, n:d.n, i:d.i, valorable:true} : null;
}
const apatsFets = day => MEALS.filter(m => !!apatDelDia(day, m.id)).length;

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
  for(const m of MEALS){ const a = apatDelDia(day, m.id); if(a) add(a.i); }
  for(const m of ["dinar","sopar"]){ const p=dishById(day.postres[m]); if(p) add(p.i); }
  return all;
}
function checkDay(day){
  const items = dayItems(day);
  const s = structure(items);
  const f = [];
  const fets = apatsFets(day);
  /* Els àpats fets fora no els podem valorar: si n'hi ha cap, el dia
     no es qualifica ni en positiu ni en negatiu. */
  const nFora = MEALS.filter(m => day.fora && day.fora[m.id]).length;
  if(fets < 5) f.push("planificar els "+MEALS.length+" àpats");
  if(s.g.verd_c < 100 || s.g.verd_k < 100) f.push("verdura crua en un àpat i cuita en un altre");
  if(fruitPieces(items) < 3) f.push("arribar a 3 racions de fruita");
  const alt = postresAlternades(day);
  if(!alt.ok) f.push("alternar iogurt i fruita a les postres");
  return {complet: f.length===0 && fets===5 && nFora===0,
          falten:f, fets, nFora, valorable: nFora===0};
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
    /* tampoc toquem un àpat que ella ja hagi adaptat o fet fora */
    const bloquejat = mid => (day.custom && day.custom[mid]) || (day.fora && day.fora[mid]);

    for(const mid of ["esmorzar","migmati","berenar"]){
      if(day.meals[mid] || bloquejat(mid)) continue;
      const p = P[mid]; if(p.length){ day.meals[mid] = p[i % p.length].id; canvis++; }
    }
    if(!day.meals.dinar && !bloquejat("dinar")){
      const p = P.dinar.filter(d=>!usats.has(d.id));
      if(p.length){ const d=p[(i*3)%p.length]; day.meals.dinar=d.id; usats.add(d.id); canvis++; }
    }
    if(!day.meals.sopar && !bloquejat("sopar")){
      const dDinar = dishById(day.meals.dinar);
      const volCrua = dDinar ? !teCrua(dDinar) : true;
      let p = P.sopar.filter(d=>!usats.has(d.id));
      const pref = p.filter(d=>teCrua(d)===volCrua);
      if(pref.length) p = pref;
      if(p.length){ day.meals.sopar = p[(i*5+2)%p.length].id; canvis++; }
    }
    /* Fins aquí hem triat àpats bons per separat. Ara comprovem el dia
       sencer: pot passar que dinar i sopar siguin tots dos de verdura
       cuita i el dia es quedi sense verdura crua, i llavors surt en
       taronja tot i tenir els cinc àpats en verd. */
    ajustarDia(day, i, P, bloquejat);
    if(!day.postres.dinar) day.postres.dinar = i%2===0 ? "p_iogurt" : fruites[i%fruites.length];
    if(!day.postres.sopar) day.postres.sopar = i%2===0 ? fruites[i%fruites.length] : "p_iogurt";
  }
  return canvis;
}

/* Repassa un dia ja assignat i el corregeix si no acaba de quadrar.
   Dues coses: que hi hagi verdura crua i cuita, i que el dinar i el
   sopar no siguin mai el mateix plat. */
function ajustarDia(day, i, P, bloquejat){
  const lliure = mid => !bloquejat(mid) && !esValidat(day);

  /* 1. dinar i sopar mai el mateix */
  if(day.meals.dinar && day.meals.dinar === day.meals.sopar && lliure("sopar")){
    const alt = P.sopar.filter(d => d.id !== day.meals.dinar);
    if(alt.length) day.meals.sopar = alt[i % alt.length].id;
  }

  /* 2. verdura crua: en calen 100 g comptant el dia sencer */
  const cruaDelDia = () => structure(dayItems(day)).g.verd_c;
  if(cruaDelDia() >= 100) return;

  for(const mid of ["sopar","dinar"]){
    if(!lliure(mid)) continue;
    const altre = mid === "sopar" ? day.meals.dinar : day.meals.sopar;
    const abans = day.meals[mid];
    const cand = P[mid].filter(d =>
      d.id !== abans && d.id !== altre && structure(d.i).g.verd_c >= 100);
    if(!cand.length) continue;
    day.meals[mid] = cand[i % cand.length].id;
    if(cruaDelDia() >= 100) return;
    day.meals[mid] = abans;          // no ha servit: ho deixem com estava
  }
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

/* =====================================================================
   11. SISTEMA D'EQUIVALÈNCIES (RACIONS)
   ---------------------------------------------------------------------
   La idea: cada grup té una "ració", i dins d'un grup tots els aliments
   són intercanviables. Una ració de proteïna són 150 g de tofu, o 160 g
   de llegums cuits, o 50 g de soja texturitzada en sec... Canviar d'un
   a l'altre no altera el que menja, només l'aliment.

   Això permet dues coses:
   · que pugui adaptar un plat amb el que li vingui de gust i l'aplicatiu
     li digui sol la quantitat correcta, sense haver de pensar-hi;
   · que la nutricionista canviï una sola xifra i tots els plats i tots
     els suggeriments quedin actualitzats alhora.

   font: "guia" quan la quantitat surt literalment de les guies 1-3;
         "equivalent" quan l'he deduïda per equivalència amb les que hi
         consten. Les marcades com a equivalents són les primeres que
         hauria de revisar la nutricionista.
   --------------------------------------------------------------------- */
const RACIONS_BASE = {
  prot: {
    n:"Proteïna", perApat:1,
    ajuda:"Una ració a cada àpat principal",
    aliments:{
      tofu:      {g:150, font:"guia"},
      soja_tex:  {g:50,  font:"guia", nota:"pes en sec"},
      cigrons:   {g:160, font:"guia", nota:"pes cuit"},
      llenties:  {g:160, font:"guia", nota:"pes cuit"},
      mongetes:  {g:160, font:"guia", nota:"pes cuit"},
      edamame:   {g:90,  font:"guia"},
      hummus:    {g:90,  font:"guia", nota:"3 cullerades soperes"},
      seitan:    {g:130, font:"equivalent"},
      tempeh:    {g:130, font:"equivalent"},
      ou:        {g:110, font:"equivalent", nota:"2 ous"},
    }
  },
  hc: {
    n:"Hidrats de carboni", perApat:1,
    ajuda:"Una ració a cada àpat principal",
    aliments:{
      patata:    {g:200, font:"guia", nota:"pes en cru"},
      moniato:   {g:350, font:"guia", nota:"pes en cru"},
      quinoa:    {g:60,  font:"guia", nota:"pes en sec"},
      arros:     {g:60,  font:"guia", nota:"pes en sec"},
      pa:        {g:95,  font:"guia"},
      avena:     {g:80,  font:"guia"},
      pasta:     {g:60,  font:"equivalent", nota:"pes en sec"},
    }
  },
  verd: {
    n:"Verdura", perApat:2,
    ajuda:"200 g per plat: dues racions, combinant colors",
    aliments:{
      tomaquet:{g:100, font:"guia", cru:true},
      canonges:{g:100, font:"guia", cru:true},
      cogombre:{g:100, font:"guia", cru:true},
      pastanaga:{g:100, font:"guia", cru:true},
      carbasso:{g:100, font:"guia"},
      pebrot:  {g:100, font:"guia"},
      broquil: {g:100, font:"guia"},
      alberginia:{g:100, font:"guia"},
      xampinyons:{g:100, font:"guia"},
      espinacs:{g:100, font:"guia"},
      ceba:    {g:100, font:"equivalent"},
      gaspatxo:{g:250, font:"equivalent", cru:true, nota:"un got"},
    }
  },
  greix: {
    n:"Greixos saludables", perApat:2,
    ajuda:"Dues racions DIFERENTS a cada àpat",
    aliments:{
      aove:     {g:20, font:"guia", nota:"2 cullerades"},
      sesam:    {g:18, font:"guia", nota:"2 cullerades"},
      lli:      {g:18, font:"guia", nota:"2 cullerades"},
      ametlles: {g:40, font:"guia", nota:"un grapat"},
      cacauets: {g:40, font:"guia", nota:"un grapat"},
      nous:     {g:30, font:"equivalent", nota:"un grapat"},
      tahini:   {g:15, font:"equivalent", nota:"1 cullerada"},
      crema_ame:{g:25, font:"equivalent", nota:"1 cullerada"},
      alvocat:  {g:75, font:"equivalent", nota:"mig alvocat"},
    }
  },
  fruita: {
    n:"Fruita", perApat:0,
    ajuda:"Tres racions al dia: berenar i postres",
    aliments:{
      poma:{g:180, font:"guia"}, platan:{g:120, font:"guia"},
      taronja:{g:200, font:"guia"}, pera:{g:170, font:"guia"},
      kiwi:{g:90, font:"guia"}, press:{g:150, font:"guia"},
      maduixes:{g:150, font:"guia"}, nabius:{g:150, font:"guia"},
      mango:{g:150, font:"guia"},
    }
  },
};

/* Les racions es poden editar (nutricionista). Les modificacions viuen a
   S.racions i es fusionen sobre les de base. */
function racions(){
  const r = JSON.parse(JSON.stringify(RACIONS_BASE));
  for(const [grup, canvis] of Object.entries(S.racions||{})){
    if(!r[grup]) r[grup] = {n:grup, perApat:1, aliments:{}};
    if(canvis.perApat!=null) r[grup].perApat = canvis.perApat;
    for(const [k,v] of Object.entries(canvis.aliments||{}))
      r[grup].aliments[k] = Object.assign({}, r[grup].aliments[k], v, {font:"editat"});
  }
  return r;
}

/* Grup d'equivalència d'un aliment (verd_c i verd_k compten com "verd") */
function grupRacio(k){
  const R = racions();
  for(const [grup, d] of Object.entries(R)) if(d.aliments[k]) return grup;
  return null;
}
/* Grams que fan una ració d'aquest aliment */
function gramsRacio(k){
  const g = grupRacio(k); if(!g) return null;
  return racions()[g].aliments[k].g;
}
/* Quantes racions són aquests grams */
function comptaRacions(k, grams){
  const g = gramsRacio(k);
  return g ? grams/g : 0;
}
/* Alternatives per canviar un aliment sense desquadrar l'àpat.
   Retorna [{k, n, grams, text, nota}] amb la quantitat ja calculada. */
function equivalents(k, nRacions){
  const grup = grupRacio(k); if(!grup) return [];
  const n = nRacions || 1;
  return Object.entries(racions()[grup].aliments)
    .filter(([alt]) => alt!==k && ing(alt))
    .map(([alt,d]) => {
      const grams = Math.round(d.g*n);
      return {k:alt, n:ing(alt).n, grams, text:qtyTxt(alt, grams), nota:d.nota||""};
    })
    .sort((a,b)=>a.n.localeCompare(b.n));
}
/* Totes les opcions d'un grup, per construir un àpat element a element */
function opcionsGrup(grup, nRacions){
  const R = racions()[grup]; if(!R) return [];
  const n = nRacions || 1;
  return Object.entries(R.aliments)
    .filter(([k]) => ing(k))
    .map(([k,d]) => {
      const grams = Math.round(d.g*n);
      return {k, n:ing(k).n, grams, text:qtyTxt(k, grams), nota:d.nota||"", cru:!!d.cru};
    })
    .sort((a,b)=>a.n.localeCompare(b.n));
}

/* Recompte de racions d'un conjunt d'ingredients */
function racionsDe(items){
  const R = racions();
  const total = {}; for(const g of Object.keys(R)) total[g] = 0;
  const perGrup = {};
  for(const [k,q] of Object.entries(items||{})){
    const grup = grupRacio(k); if(!grup || !q) continue;
    const n = q / R[grup].aliments[k].g;
    total[grup] += n;
    (perGrup[grup] = perGrup[grup] || []).push({k, racions:n});
  }
  return {total, perGrup};
}

/* Què li falta a un àpat principal, en racions i redactat en positiu.
   És el que fa servir el mòbil per dir "equilibrat" o "hi falta ...". */
function faltaApat(items, mealId){
  const R = racions(), r = racionsDe(items).total;
  const f = [];
  const arrodoneix = x => Math.round(x*10)/10;
  if(mealId==="dinar" || mealId==="sopar"){
    if(r.prot  < 0.85) f.push({grup:"prot",  t:"una font de proteïna",       falten:arrodoneix(1-r.prot)});
    if(r.hc    < 0.85) f.push({grup:"hc",    t:"l'aliment dels hidrats",     falten:arrodoneix(1-r.hc)});
    if(r.verd  < 1.85) f.push({grup:"verd",  t:"verdura fins a 200 g",       falten:arrodoneix(2-r.verd)});
    const diferents = new Set((racionsDe(items).perGrup.greix||[])
      .filter(x=>x.racions>=0.4).map(x=>x.k));
    if(diferents.size < 2) f.push({grup:"greix", t:"un segon greix diferent", falten:1});
  }
  return {complet:f.length===0, falten:f, racions:r};
}

/* =====================================================================
   12. TAULELL DE MISSATGES
   ---------------------------------------------------------------------
   Entre els adults que fan el seguiment: tu, la nutricionista i la
   psicòloga. Viu només a l'aplicatiu d'ordinador. Tothom veu tots els
   missatges; només consta qui l'escriu i qui l'ha llegit.
   --------------------------------------------------------------------- */
function quiSoc(){
  return (typeof Sync!=="undefined" && Sync.est && Sync.est.email) ? Sync.est.email : null;
}
function escriureMissatge(text){
  const t = (text||"").trim(); if(!t) return null;
  const m = {id:"m"+Date.now()+Math.random().toString(36).slice(2,6),
             quan:new Date().toISOString(), qui:quiSoc()||"aquest aparell",
             text:t, llegits:{}};
  S.missatges = S.missatges || [];
  S.missatges.unshift(m);
  if(S.missatges.length > 300) S.missatges.length = 300;
  return m;
}
function esborrarMissatge(id){
  S.missatges = (S.missatges||[]).filter(m=>m.id!==id);
}
/* Marca com a llegits tots els que no ha escrit un mateix. Retorna
   quants n'ha marcat, per saber si cal desar. */
function marcarLlegits(){
  const jo = quiSoc(); if(!jo) return 0;
  let n = 0;
  for(const m of S.missatges||[]){
    m.llegits = m.llegits || {};
    if(m.qui!==jo && !m.llegits[jo]){ m.llegits[jo] = new Date().toISOString(); n++; }
  }
  return n;
}
function missatgesSenseLlegir(){
  const jo = quiSoc(); if(!jo) return 0;
  return (S.missatges||[]).filter(m=>m.qui!==jo && !(m.llegits||{})[jo]).length;
}

/* =====================================================================
   13. PES
   ---------------------------------------------------------------------
   No apareix mai a l'aplicatiu d'ella. Es registra des de l'aplicatiu
   del pare i es pot corregir des de l'ordinador.
   Deliberadament no es calcula ni IMC ni cap objectiu: això és de
   l'equip clínic, no d'una eina domèstica.
   --------------------------------------------------------------------- */
function desarPes(dataStr, kg, extra){
  const v = parseFloat(String(kg).replace(",","."));
  if(!(v>0) || v>400) return false;
  S.pesos[dataStr] = Object.assign({}, S.pesos[dataStr], {
    kg: Math.round(v*10)/10,
    hora: (extra&&extra.hora) || "",
    nota: (extra&&extra.nota) || "",
    qui:  quiSoc() || (S.pesos[dataStr]&&S.pesos[dataStr].qui) || "aquest aparell",
    u: Date.now()
  });
  return true;
}
function treurePes(dataStr){ delete S.pesos[dataStr]; }

/* Observacions del dia sense pesada. Van a part perquè no tots els dies
   es pesa, i les notes tenen valor per elles mateixes. */
function desarNotaDia(dataStr, text){
  const t = (text||"").trim();
  if(!t) delete S.diari[dataStr];
  else S.diari[dataStr] = {text:t, u:Date.now()};
}
function notaDia(dataStr){
  return (S.diari[dataStr] && S.diari[dataStr].text) || "";
}
/* Totes les entrades del diari, amb el pes del dia si n'hi ha */
function diariComplet(desde, fins){
  const dies = new Set([...Object.keys(S.diari||{}), ...Object.keys(S.pesos||{})]);
  return [...dies]
    .filter(ds => (!desde || ds>=iso(desde)) && (!fins || ds<=iso(fins)))
    .sort().reverse()
    .map(ds => ({ds, d:parseDay(ds),
                 text:(S.diari[ds]||{}).text || "",
                 pes:(S.pesos[ds]||{}).kg || null,
                 hora:(S.pesos[ds]||{}).hora || "",
                 notaPes:(S.pesos[ds]||{}).nota || ""}));
}

/* Sèrie ordenada de pesades dins d'un interval */
function seriePes(desde, fins){
  return Object.entries(S.pesos||{})
    .filter(([ds]) => (!desde || ds>=iso(desde)) && (!fins || ds<=iso(fins)))
    .map(([ds,p]) => ({ds, d:parseDay(ds), kg:p.kg, hora:p.hora, nota:p.nota, qui:p.qui}))
    .sort((a,b)=>a.ds.localeCompare(b.ds));
}
/* Mitjana mòbil. Mirar punts diaris fa veure patrons que no hi són:
   el pes oscil·la més d'un quilo per líquids, digestió o cicle. */
function tendenciaPes(serie, finestra){
  const w = finestra || 7;
  return serie.map((p,i) => {
    const desde = p.d.getTime() - (w-1)*86400000;
    const grup = serie.filter(x => x.d.getTime()>=desde && x.d.getTime()<=p.d.getTime());
    const mitjana = grup.reduce((a,x)=>a+x.kg,0)/grup.length;
    return {ds:p.ds, d:p.d, kg:p.kg, mitjana:Math.round(mitjana*100)/100, n:grup.length};
  });
}

/* ---------------------------------------------------------------------
   14. UTILITATS COMUNES
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
