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
 cigrons:   {n:"Cigrons cuits",          cat:"prot", shop:"Conserves",
             uq:160, ul:"got", ug:"m"},
 llenties:  {n:"Llenties cuites",        cat:"prot", shop:"Conserves",
             uq:160, ul:"got", ug:"m"},
 mongetes:  {n:"Mongetes cuites",        cat:"prot", shop:"Conserves",
             uq:160, ul:"got", ug:"m"},
 edamame:   {n:"Edamame",                cat:"prot", shop:"Congelats"},
 ou:        {n:"Ou",                     cat:"prot", shop:"Refrigerats",
             uq:55, ul:"ou", ug:"m", umides:true},
 iogurt_soja:{n:"Iogurt de soja",        cat:"prot", shop:"Refrigerats",
             uq:120, ul:"iogurt", ug:"m"},
 llet_ame:  {n:"Beguda d'ametlla",       cat:"prot", shop:"Sec", ml:true,
             uq:250, ul:"got", ug:"m"},
/* ---- HIDRATS ---- */
 patata:    {n:"Patata",                 cat:"hc", shop:"Verdura", nota:"pes en cru",
             uq:150, ul:"patata", ug:"f", umides:true},
 moniato:   {n:"Moniato",                cat:"hc", shop:"Verdura", nota:"pes en cru",
             uq:250, ul:"moniato", ug:"m", umides:true},
 quinoa:    {n:"Quinoa",                 cat:"hc", shop:"Sec", nota:"pes en sec",
             uq:20, ul:"cullerada sopera", ulp:"cullerades soperes", ug:"f"},
 arros:     {n:"Arròs",                  cat:"hc", shop:"Sec", nota:"pes en sec",
             uq:20, ul:"cullerada sopera", ulp:"cullerades soperes", ug:"f"},
 pasta:     {n:"Pasta integral",         cat:"hc", shop:"Sec", nota:"pes en sec"},
 pa:        {n:"Pa integral",            cat:"hc", shop:"Fleca",
             uq:30, ul:"llesca", ulp:"llesques", ug:"f"},
 avena:     {n:"Flocs de civada",        cat:"hc", shop:"Sec",
             uq:80, ul:"got", ug:"m"},
 datils:    {n:"Dàtils sense os",        cat:"hc", shop:"Sec",
             uq:10, ul:"dàtil", ug:"m"},
 mel:       {n:"Mel",                    cat:"hc", shop:"Sec",
             uq:15, ul:"cullerada", ug:"f"},
/* ---- VERDURA CRUA ---- */
 tomaquet:  {n:"Tomàquet",               cat:"verd_c", shop:"Verdura",
             uq:120, ul:"tomàquet", ug:"m", umides:true},
 canonges:  {n:"Canonges",               cat:"verd_c", shop:"Verdura",
             uq:40, ul:"grapat", ug:"m"},
 cogombre:  {n:"Cogombre",               cat:"verd_c", shop:"Verdura",
             uq:200, ul:"cogombre", ug:"m", umides:true},
 pastanaga: {n:"Pastanaga",              cat:"verd_c", shop:"Verdura",
             uq:80, ul:"pastanaga", ulp:"pastanagues", ug:"f", umides:true},
/* ---- VERDURA CUINADA ---- */
 carbasso:  {n:"Carbassó",               cat:"verd_k", shop:"Verdura",
             uq:200, ul:"carbassó", ug:"m", umides:true},
 pebrot:    {n:"Pebrot",                 cat:"verd_k", shop:"Verdura",
             uq:150, ul:"pebrot", ug:"m", umides:true},
 broquil:   {n:"Bròquil",                cat:"verd_k", shop:"Verdura",
             uq:50, ul:"floret", ug:"m"},
 alberginia:{n:"Albergínia",             cat:"verd_k", shop:"Verdura",
             uq:250, ul:"albergínia", ulp:"albergínies", ug:"f", umides:true},
 xampinyons:{n:"Xampinyons",             cat:"verd_k", shop:"Verdura",
             uq:20, ul:"xampinyó", ulp:"xampinyons", ug:"m"},
 espinacs:  {n:"Espinacs",               cat:"verd_k", shop:"Verdura",
             uq:40, ul:"grapat", ug:"m"},
 ceba:      {n:"Ceba",                   cat:"verd_k", shop:"Verdura",
             uq:120, ul:"ceba", ulp:"cebes", ug:"f", umides:true},
/* ---- GREIXOS ---- */
 aove:      {n:"Oli d'oliva verge extra",cat:"greix", shop:"Sec", ml:true,
             uq:10, ul:"cullerada", ug:"f"},
 sesam:     {n:"Sèsam triturat",         cat:"greix", shop:"Sec",
             uq:9,  ul:"cullerada", ug:"f"},
 lli:       {n:"Lli triturat",           cat:"greix", shop:"Sec",
             uq:9,  ul:"cullerada", ug:"f"},
 ametlles:  {n:"Ametlles",               cat:"greix", shop:"Sec",
             uq:40, ul:"grapat", ug:"m"},
 cacauets:  {n:"Cacauets",               cat:"greix", shop:"Sec",
             uq:40, ul:"grapat", ug:"m"},
 nous:      {n:"Nous",                   cat:"greix", shop:"Sec",
             uq:30, ul:"grapat", ug:"m"},
 tahini:    {n:"Tahini (crema de sèsam)",cat:"greix", shop:"Sec",
             uq:15, ul:"cullerada", ug:"f"},
 crema_ame: {n:"Crema d'ametlles",       cat:"greix", shop:"Sec",
             uq:25, ul:"cullerada", ug:"f"},
 alvocat:   {n:"Alvocat",                cat:"greix", shop:"Verdura",
             uq:150, ul:"alvocat", ug:"m", umides:true},
/* ---- FRUITA ---- */
 poma:      {n:"Poma",                   cat:"fruita", shop:"Fruita",
             uq:180, ul:"poma", ug:"f", umides:true},
 platan:    {n:"Plàtan",                 cat:"fruita", shop:"Fruita",
             uq:120, ul:"plàtan", ug:"m", umides:true},
 taronja:   {n:"Taronja",                cat:"fruita", shop:"Fruita",
             uq:200, ul:"taronja", ulp:"taronges", ug:"f", umides:true},
 pera:      {n:"Pera",                   cat:"fruita", shop:"Fruita",
             uq:170, ul:"pera", ug:"f", umides:true},
 kiwi:      {n:"Kiwi",                   cat:"fruita", shop:"Fruita",
             uq:90,  ul:"kiwi", ug:"m", umides:true},
 maduixes:  {n:"Maduixes",               cat:"fruita", shop:"Fruita",
             uq:15, ul:"maduixa", ulp:"maduixes", ug:"f"},
 nabius:    {n:"Nabius",                 cat:"fruita", shop:"Fruita",
             uq:50, ul:"grapat", ug:"m"},
 mango:     {n:"Mango",                  cat:"fruita", shop:"Fruita",
             uq:300, ul:"mango", ug:"m", umides:true},
 press:     {n:"Préssec",                cat:"fruita", shop:"Fruita",
             uq:150, ul:"préssec", ug:"m", umides:true},
 llimona:   {n:"Llimona",                cat:"fruita", shop:"Fruita",
             uq:100, ul:"llimona", ulp:"llimones", ug:"f", umides:true},
/* ---- CONDIMENTS ---- */
 all:       {n:"All",                    cat:"cond", shop:"Verdura",
             uq:4, ul:"gra", ulp:"grans", ug:"m"},
 comi:      {n:"Comí mòlt",              cat:"cond", shop:"Espècies",
             uq:2, ul:"culleradeta", ug:"f"},
 pebre_v:   {n:"Pebre vermell dolç",     cat:"cond", shop:"Espècies",
             uq:2, ul:"culleradeta", ug:"f"},
 sal:       {n:"Sal marina",             cat:"cond", shop:"Espècies",
             uq:3, ul:"culleradeta", ug:"f"},
 julivert:  {n:"Julivert",               cat:"cond", shop:"Verdura",
             uq:2, ul:"branqueta", ug:"f"},
 vinagre:   {n:"Vinagre",                cat:"cond", shop:"Sec", ml:true,
             uq:10, ul:"cullerada", ug:"f"},
 cacau:     {n:"Cacau pur en pols",      cat:"cond", shop:"Sec",
             uq:5, ul:"culleradeta", ug:"f"},
 salsa_soja:{n:"Salsa de soja",          cat:"cond", shop:"Sec", ml:true,
             uq:10, ul:"cullerada", ug:"f"},

/* ---- ELABORACIONS ---- */
 hummus:{n:"Hummus casolà", cat:"prot", shop:"Elaboracions",
   uq:30, ul:"cullerada sopera", ulp:"cullerades soperes", ug:"f",
   prep:{cigrons:62.5, tahini:9.4, all:1, llimona:9.4, aove:7, comi:0.3, sal:0.5},
   recepta:"400 g cigrons cuits · 60 g tahini · 2 grans d'all · suc d'1 llimona (60 ml) · 3 cullerades d'AOVE (45 ml) · ½ culleradeta de comí (2 g) · ½ culleradeta de sal (3 g) · 60-80 ml d'aigua freda. Triturar 1-2 minuts fins que quedi cremós. Decorar amb un raig d'oli, pebre vermell i julivert. 5 racions per a 5 dies."},
 boleta:{n:"Boleta energètica", cat:"hc", shop:"Elaboracions",
   uq:45, ul:"boleta", ug:"f",
   prep:{avena:32.3, datils:32.3, llet_ame:17.2, tahini:16.1, cacau:2.2},
   recepta:"150 g de flocs de civada · 150 g de dàtils sense os · 80 ml de beguda d'ametlla · 75 g de tahini · 1½ cullerada de cacau pur. Triturar la civada fina, afegir els dàtils, incorporar la resta i triturar fins a tenir una massa compacta. Formar boletes de 45 g. Surten 12 unitats i es conserven 7 dies a la nevera."},
 gaspatxo:{n:"Gaspatxo", cat:"verd_c", shop:"Elaboracions", ml:true,
   uq:250, ul:"got", ug:"m",
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
/* =====================================================================
   QUINA APLICACIÓ SOM
   ---------------------------------------------------------------------
   mobil.html posa MENU_VEGA_NOMES_GUIA = true abans de carregar això.
   D'aquest senyal en pengen dues coses:

     · sync.js no li baixa res que no sigui la guia i les setmanes;
     · les dades del telèfon van a la seva pròpia clau.

   El motiu de la clau separada: fins ara els tres aplicatius compartien
   "menuvega_v2", i per tant el telèfon es desava a dins el pes, el diari,
   els missatges i els documents encara que no els ensenyés enlloc. "No
   mostrar" no és "no tenir". Amb la clau pròpia, al telèfon no hi ha res
   d'això per trobar.
   --------------------------------------------------------------------- */
const NOMES_GUIA = (typeof window !== "undefined") && !!window.MENU_VEGA_NOMES_GUIA;
const KEY = NOMES_GUIA ? "menuvega_mobil_v1" : "menuvega_v2";

/* El que el mòbil pot tenir. Tota la resta, encara que arribi, no es desa. */
const CAMPS_GUIA = ["weeks","custom","customIng","editsPlats","platsAmagats","editsIng",
  "racions","racionsHist","apatsFixos","apatsFixosHist","indicacions","indicacionsNoves",
  "habitsEdit","habitsNous","metaRev","rev","savedAt"];

/* Passada de neteja: del telèfon en surt tot el que no sigui la guia.
   Es fa servir en carregar i cada vegada que arriben canvis del servidor. */
function nomesGuia(s){
  if(!s) return s;
  for(const k of Object.keys(s)) if(!CAMPS_GUIA.includes(k)) delete s[k];
  /* Els valors nutricionals viuen dins dels aliments personalitzats:
     no n'hi ha prou de mirar les claus de primer nivell. */
  for(const v of Object.values(s.customIng||{})) if(v && v.nutri) delete v.nutri;
  return s;
}

function loadState(){
  let s = null;
  try{ s = JSON.parse(localStorage.getItem(KEY)||"null"); }catch(e){}
  /* Primera obertura del mòbil amb la clau nova: ens enduem el que sigui
     de la guia i les setmanes de la clau vella (les seves adaptacions
     encara no enviades hi poden ser) i tot seguit ESBORREM la clau vella
     del telèfon. És el que treu d'allà el pes, el diari, els missatges i
     els documents que s'hi havien anat desant fins ara. */
  if(!s && NOMES_GUIA){
    try{
      const vell = JSON.parse(localStorage.getItem("menuvega_v2")||"null");
      if(vell){
        s = nomesGuia(vell);
        localStorage.setItem(KEY, JSON.stringify(s));
      }
      localStorage.removeItem("menuvega_v2");
    }catch(e){}
  }
  if(!s) s = {};
  if(NOMES_GUIA) nomesGuia(s);
  s.weeks    = s.weeks    || {};   // {setmana: {data: {meals,postres,habits,validat,fotos}}}
  s.custom   = s.custom   || [];   // plats creats de nou
  s.customIng= s.customIng|| {};   // aliments creats de nou
  s.editsPlats  = s.editsPlats  || {};  // modificacions sobre els plats que porta el programa
  s.platsAmagats= s.platsAmagats|| [];  // plats retirats (no s'esborren, es poden recuperar)
  s.editsIng    = s.editsIng    || {};  // modificacions sobre aliments i receptes de base
  s.racions     = s.racions     || {};  // modificacions sobre les racions (les vigents ara)
  s.racionsHist = s.racionsHist || [];  // històric datat: com quedaven després de cada canvi
  s.apatsFixos  = s.apatsFixos  || {};  // receptes fixes dels àpats petits (Guia)
  s.indicacions = s.indicacions || {};  // canvis sobre les indicacions en text
  s.indicacionsNoves = s.indicacionsNoves || [];
  s.habitsEdit  = s.habitsEdit  || {};  // canvis i retirades d'hàbits
  s.habitsNous  = s.habitsNous  || [];
  /* Si ja hi havia racions canviades abans que existís l'històric, les
     donem per vigents des de sempre. Si no, un dia validat d'abans es
     valoraria amb les de base i canviaria de resultat. */
  if(Object.keys(s.racions).length && !s.racionsHist.length)
    s.racionsHist.push({quan:"1970-01-01T00:00:00.000Z", qui:"(abans del registre)",
                        racions: JSON.parse(JSON.stringify(s.racions))});
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
  /* Al telèfon, l'última reixa abans de deixar res escrit al disc. */
  if(NOMES_GUIA) nomesGuia(S);
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
/* ---------------------------------------------------------------------
   Un dia validat és una FOTOGRAFIA, no una consulta.
   En validar-lo se li desa dins què hi havia exactament: el nom i les
   quantitats de cada àpat. A partir d'aquell moment deixa de dependre
   del catàleg.

   Per què: un dia guarda `dinar:"d_patata_tofu"`, no el contingut. Sense
   la fotografia, editar aquell plat avui reescrivia què va menjar fa
   quatre dies i li podia canviar la valoració. Amb el botó d'actualitzar
   tots els plats de cop, això hauria reescrit l'historial sencer que ha
   de veure la nutricionista.
   --------------------------------------------------------------------- */
function fotografiarDia(day){
  if(!day) return null;
  const apats = {};
  for(const m of MEALS){
    const a = apatDelDiaViu(day, m.id);
    if(a) apats[m.id] = JSON.parse(JSON.stringify(a));
  }
  const postres = {};
  for(const m of ["dinar","sopar"]){
    const p = dishById(day.postres && day.postres[m]);
    if(p) postres[m] = {id:p.id, n:p.n, i:JSON.parse(JSON.stringify(p.i))};
  }
  day.snap = {apats, postres, quan:new Date().toISOString()};
  return day.snap;
}
const teFotografia = day => !!(day && day.validat && day.snap && day.snap.apats);

function apatDelDia(day, mealId){
  if(!day) return null;
  if(teFotografia(day))
    return day.snap.apats[mealId] ? Object.assign({}, day.snap.apats[mealId]) : null;
  return apatDelDiaViu(day, mealId);
}
/* El mateix, però mirant sempre el catàleg d'ara. La fa servir la
   fotografia i la pantalla de reobrir un dia. */
function apatDelDiaViu(day, mealId){
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

/* ---------------------------------------------------------------------
   6bis. UNITATS EQUIVALENTS
   ---------------------------------------------------------------------
   Un pes en grams és una bàscula; una unitat és un plat. "150 g de
   patata" obliga a pesar, "una patata mitjana" es pot servir. Les dues
   coses surten sempre juntes i el pes continua manant: la unitat només
   hi és per fer-lo entenedor, i mai substitueix el gram.

   Cada aliment pot portar:
     uq      quant pesa una unitat
     ul      com se'n diu una  ("patata", "cullerada", "grapat")
     ulp     el plural, quan no s'obté afegint -s o -es ("taronges")
     ug      "m" o "f", per dir "mig got" o "mitja cullerada"
     umides  si admet mida: una patata pot ser petita, mitjana o gran;
             una cullerada o un iogurt, no.

   Tot això s'edita des de la Guia i es desa a S.editsIng, o sigui que
   es sincronitza igual que la resta de criteris. Els valors que porta
   el programa són orientatius: els ha de repassar la nutricionista.

   Quan la quantitat no encaixa amb cap unitat raonable no s'inventa res
   i només surten els grams. Val més no dir res que dir "1,1 patates",
   que és una precisió falsa i convida a pesar-ho tot.
   --------------------------------------------------------------------- */
const MIDES = {
  m: {p:["petit","petits"],  j:["mitjà","mitjans"],  g:["gran","grans"]},
  f: {p:["petita","petites"], j:["mitjana","mitjanes"], g:["gran","grans"]},
};
const genere = x => (x && x.ug==="m") ? "m" : "f";
function nomUnitat(x, n){
  if(n===1) return x.ul;
  return x.ulp || plural(x.ul, n);
}
/* Només la part de la unitat: "1 patata gran", "mitja cullerada"...
   Cadena buida si no hi ha manera honesta de dir-ho. */
function unitatTxt(k, g){
  const x = ing(k);
  if(!x || !x.uq || !x.ul || !(g>0)) return "";
  const n = g / x.uq, gen = genere(x);
  const mig = gen==="m" ? "mig" : "mitja";

  if(x.umides){
    /* Mitja peça es mira abans d'arrodonir: 0,5 arrodoneix a 1 i ens
       menjaríem el cas de "mitja poma", que és dels més freqüents. */
    if(n >= 0.34 && n <= 0.72) return mig + " " + x.ul;
    /* Peces senceres: comptem peces i la mida absorbeix la diferència. */
    const c = Math.round(n);
    if(c < 1) return "";
    const f = n / c;
    if(f < 0.72 || f > 1.45) return "";        // massa lluny: només grams
    const mida = f < 0.9 ? "p" : (f < 1.1 ? "j" : "g");
    return fmtN(c) + " " + nomUnitat(x, c) + " " + MIDES[gen][mida][c===1 ? 0 : 1];
  }

  /* Mesures (cullerada, got, grapat, llesca): mitjos sí, mides no. */
  const r = Math.round(n*2)/2;
  if(r < 0.5 || Math.abs(n-r) >= 0.18) return "";
  if(r === 0.5) return mig + " " + x.ul;
  return fmtN(r) + " " + nomUnitat(x, r);
}
function qtyTxt(k,g){
  const x = ing(k); if(!x) return Math.round(g)+" g";
  const u = x.ml ? "ml" : "g";
  const val = Math.round(g*10)/10;
  const un = unitatTxt(k, g);
  return un ? un+" ("+val+" "+u+")" : val+" "+u;
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
/* Un àpat està complet o no. UN SOL CRITERI per a tothom.
   Als àpats principals delega en faltaApat(), que surt de les racions;
   així el triador de l'ordinador, el proposador i el mòbil diuen sempre
   el mateix, i tot segueix la nutricionista quan canvia una quantitat.
   Abans aquí hi havia grams escrits a mà (55 g d'hidrats, 200 g de
   verdura) que no es movien encara que ella canviés la ració. */
function checkMeal(dishId, mealId, quan){
  const d = dishById(dishId);
  if(!d) return {complet:false, falten:[], buit:true};
  return checkItems(d.i, mealId, quan);
}
function checkItems(items, mealId, quan){
  if(mealId==="dinar" || mealId==="sopar"){
    const r = faltaApat(items, mealId, quan);
    return {complet:r.complet, falten:r.falten.map(x=>x.t), buit:false, detall:r.falten};
  }
  /* Els àpats petits no es mesuren en racions sinó per la recepta fixa
     que dona la nutricionista (el batut, la fruita del berenar...).
     Aquests números encara són aquí i s'han de fer editables amb la
     pestanya Guia: és la segona meitat del punt 7.2. */
  const s = structure(items);
  const f = [];
  const d = {i:items};
  {
    /* Els números surten d'apatsFixos(), o sigui de la Guia. Abans eren
       aquí dins i no hi havia manera de canviar-los.
       Amb el moment: un canvi fet avui no pot canviar la valoració d'un
       esmorzar que ella ja s'ha menjat. */
    const F = apatsFixos(QUAN(quan))[mealId] || {min:{}, cal:{}};
    for(const [k,q] of Object.entries(F.cal||{}))
      if((d.i[k]||0) < q)
        f.push((ing(k)?ing(k).n.toLowerCase():k)+" ("+q+(ing(k)&&ing(k).ml?" ml":" g")+")");
    for(const [cat,q] of Object.entries(F.min||{}))
      if((s.g[cat]||0) < q)
        f.push(cat==="fruita" ? "la fruita"
             : cat==="hc"     ? "el pa o els flocs de civada" : "més "+cat);
    if(F.alguna && Object.keys(F.alguna).length){
      const teCap = Object.entries(F.alguna).some(([k,q]) =>
        (k==="greix" ? (s.g.greix||0) : (d.i[k]||0)) >= q);
      if(!teCap) f.push("les boletes, l'entrepà o el grapat de fruits secs");
    }
    if(mealId==="esmorzar"){
      if(!s.g.prot)         f.push("un aliment amb proteïna");
      if(!s.greixos.length) f.push("un greix saludable");
    }
  }
  return {complet:f.length===0, falten:f, buit:false};
}

/* Dia complet — només estructura */
function dayItems(day){
  const all = {};
  const add = it => { for(const [k,g] of Object.entries(it||{})) all[k]=(all[k]||0)+g; };
  for(const m of MEALS){ const a = apatDelDia(day, m.id); if(a) add(a.i); }
  for(const m of ["dinar","sopar"]){
    const p = teFotografia(day) ? (day.snap.postres||{})[m] : dishById(day.postres[m]);
    if(p) add(p.i);
  }
  return all;
}
function checkDay(day, quan){
  const q = quan!==undefined ? quan : momentDe(day);
  const items = dayItems(day);
  const s = structure(items);
  const f = [];
  const fets = apatsFets(day);
  /* Els àpats fets fora no els podem valorar: si n'hi ha cap, el dia
     no es qualifica ni en positiu ni en negatiu. */
  const nFora = MEALS.filter(m => day.fora && day.fora[m.id]).length;
  /* Una ració de verdura: també surt de les racions, no d'un 100 escrit
     a mà. Si la nutricionista la canvia, això la segueix. */
  const Rd = racions(q);
  const gVerd = (Rd.verd && Rd.verd.aliments && Rd.verd.aliments.tomaquet
                 && Rd.verd.aliments.tomaquet.g) || 100;
  if(fets < 5) f.push("planificar els "+MEALS.length+" àpats");
  if(s.g.verd_c < gVerd || s.g.verd_k < gVerd)
    f.push("verdura crua en un àpat i cuita en un altre");
  if(fruitPieces(items, q) < 3) f.push("arribar a 3 racions de fruita");
  const alt = postresAlternades(day);
  if(!alt.ok) f.push("alternar iogurt i fruita a les postres");
  return {complet: f.length===0 && fets===5 && nFora===0,
          falten:f, fets, nFora, valorable: nFora===0};
}
/* Racions de fruita. Cada fruita té la seva ració (una poma són 180 g i
   un kiwi 90), o sigui que això ha de passar per racionsDe() i no per una
   divisió entre 150 igual per a totes. */
function fruitPieces(items, quan){
  const sense = {};
  for(const [k,v] of Object.entries(items||{})) if(k!=="llimona") sense[k]=v;
  return racionsDe(sense, quan).total.fruita || 0;
}
function postresAlternades(day){
  const snap = teFotografia(day) ? (day.snap.postres||{}) : null;
  const a = snap ? snap.dinar : dishById(day.postres.dinar);
  const b = snap ? snap.sopar : dishById(day.postres.sopar);
  if(!a||!b) return {ok:false, txt:"sense definir"};
  const ia = a.id==="p_iogurt", ib = b.id==="p_iogurt";
  return {ok: ia!==ib, txt:(ia?"iogurt":"fruita")+" / "+(ib?"iogurt":"fruita")};
}

/* ---------------------------------------------------------------------
   8. PROPOSTA AUTOMÀTICA DE SETMANA
   --------------------------------------------------------------------- */

/* Candidats per a un àpat: els plats que l'admeten, i d'aquests els que
   surten equilibrats si n'hi ha cap. Si no n'hi ha cap d'equilibrat val
   més oferir-los tots que no pas quedar-nos sense candidats. */
function platsBons(mid){
  const p = DISHES().filter(d=>d.m.includes(mid));
  const b = p.filter(d=>checkMeal(d.id,mid).complet);
  return b.length ? b : p;
}

function proposarSetmana(mon, opcions){
  const o = opcions||{};
  const desde = o.desde || TODAY;          // no toquem res anterior a aquesta data
  const P = {}; for(const m of MEALS) P[m.id] = platsBons(m.id);
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

/* =====================================================================
   8bis. REPROGRAMACIÓ EN CADENA
   ---------------------------------------------------------------------
   Quan es canvia un àpat principal, els dos següents no han de repetir
   ni la proteïna ni l'hidrat que porta el nou.

   Les regles són les tancades l'11 d'agost i no s'han de reobrir:
     1. només dinar i sopar
     2. proteïna i hidrat, tots dos
     3. dos àpats endavant, creuant els dies
     4. una sola passada: reprogramar no torna a disparar la regla
     5. des del mòbil s'aplica sol; des de l'ordinador només se suggereix
     6. l'avís i el desfer viuen a day.auto
     7. el substitut passa també per ajustarDia()
     8. si no hi ha substitut que compleixi tot, l'àpat es queda com era

   Un àpat fet fora no dispara res: no en sabem les quantitats, i
   apatDelDia() ja el torna amb i:{} i valorable:false.
   --------------------------------------------------------------------- */

const PRINCIPALS = ["dinar","sopar"];

/* A partir de quantes racions considerem que un plat "porta" un aliment.
   És el mateix 0,4 que faltaApat ja fa servir per als greixos: per sota
   d'això és una presència testimonial (mitja patata de guarnició) i
   bloquejar-la ens deixaria sense candidats. */
const LLINDAR_REPETICIO = 0.4;

/* La proteïna i l'hidrat d'un conjunt d'ingredients. Passa per
   racionsDe(), o sigui que funciona igual amb un plat del catàleg que
   amb un àpat que ella hagi muntat element a element. */
function nutrientsClau(items){
  const per = racionsDe(items).perGrup;
  const out = [];
  for(const grup of ["prot","hc"])
    for(const x of (per[grup]||[]))
      if(x.racions >= LLINDAR_REPETICIO) out.push(x.k);
  return out;
}
const nomsAliments = ks =>
  ks.map(k => ing(k) ? ing(k).n.toLowerCase() : k).join(" i ");

/* Els N àpats principals que vénen després d'aquest, saltant de dia. */
function apatsSeguents(ds, mealId, quants){
  const out = [];
  let j = PRINCIPALS.indexOf(mealId);
  if(j < 0) return out;
  let d = parseDay(ds);
  while(out.length < quants){
    j++;
    if(j >= PRINCIPALS.length){ j = 0; d = addDays(d,1); }
    out.push({ds: iso(d), mealId: PRINCIPALS[j]});
  }
  return out;
}

/* Pany de la condició 4: mentre la cadena s'executa, cap escriptura de
   dins no en pot tornar a engegar una altra. */
let enCadena = false;

/* Reprograma (o només calcula, amb aplicar:false) els dos àpats
   següents. Retorna {canvis, dies, aplicat}: 'canvis' porta un element
   per àpat mogut i 'dies' les dates tocades, que és el que necessita qui
   crida per fer un tocarDia() de cadascuna — tocarDia només empeny la
   setmana del dia que rep, i la cadena pot travessar el cap de setmana. */
function reprogramarCadena(ds, mealId, opcions){
  const o = opcions || {};
  const aplicar = o.aplicar !== false;
  const buit = {canvis:[], dies:[], aplicat:false};
  if(!PRINCIPALS.includes(mealId)) return buit;      // condició 1
  if(enCadena) return buit;                          // condició 4

  const origen = apatDelDia(dayData(ds), mealId);
  if(!origen || !origen.valorable) return buit;
  const bloc = new Set(nutrientsClau(origen.i));     // condició 2
  if(!bloc.size) return buit;

  const P = {}; for(const m of MEALS) P[m.id] = platsBons(m.id);
  const quan = new Date().toISOString();
  const canvis = [];
  /* Una sola fotografia per data, feta ABANS de tocar-hi res.
     Abans se'n desava una a cada volta del bucle, i com que dinar i sopar
     del mateix dia poden caure tots dos a la mateixa cadena (passa sempre
     que l'origen és el sopar), la segona ja portava a dins el canvi fet a
     la primera. En restaurar-les en ordre guanyava la segona i el mode
     "només suggerir" deixava el dinar de l'endemà canviat de debò. */
  const originals = new Map();

  enCadena = true;
  try{
    for(const t of apatsSeguents(ds, mealId, 2)){    // condició 3
      /* Les quatre marques del que és intocable. Compte: ajustarDia()
         només mira les dues últimes (i la validació pel seu compte);
         la del dia passat no la mira ningú i l'hem de fer aquí. */
      const dt = parseDay(t.ds);
      if(dt < TODAY) continue;                        // dia passat
      /* Si el dia encara no existeix no hi ha res programat, o sigui que
         no hi ha res a canviar. Val més sortir aquí que no pas cridar
         dayData(), que el crearia buit i l'enviaria al servidor. */
      const setmana = S.weeks[weekKey(dt)];
      if(!setmana || !setmana[t.ds]) continue;
      const day = dayData(t.ds);
      if(esValidat(day)) continue;                    // dia validat
      const bloquejat = mid =>
        !!((day.custom && day.custom[mid]) || (day.fora && day.fora[mid]));
      if(bloquejat(t.mealId)) continue;               // adaptat per ella o fet fora

      const actual = day.meals[t.mealId];
      if(!actual) continue;                           // no hi ha res programat
      const xoca = nutrientsClau((dishById(actual)||{i:{}}).i)
        .filter(k => bloc.has(k));
      if(!xoca.length) continue;                      // no repeteix res

      /* Fotografia del dia sencer: ajustarDia() pot moure també l'altre
         àpat principal, i el desfer ha de poder-ho tornar tot enrere. */
      const abans = Object.assign({}, day.meals);
      if(!originals.has(t.ds)) originals.set(t.ds, Object.assign({}, day.meals));
      const altre = t.mealId==="dinar" ? day.meals.sopar : day.meals.dinar;
      const cand = P[t.mealId].filter(d =>
        d.id !== actual && d.id !== altre &&
        !nutrientsClau(d.i).some(k => bloc.has(k)));
      if(!cand.length) continue;                      // condició 8

      /* Llavor de rotació: el dia de la setmana del dia de destí. Manté
         la varietat sense fer-ho aleatori, que faria impossible provar-ho. */
      const i = (dt.getDay()+6)%7;

      /* Provem els candidats un darrere l'altre, començant pel que toca
         per rotació. Cal provar-los tots abans de rendir-se: ajustarDia()
         no sap res de la cadena i la seva passada 1 pot tornar a posar
         al sopar justament allò que volíem evitar. Que el primer candidat
         no serveixi no vol dir que no n'hi hagi cap: la condició 8 parla
         de quan NO N'HI HA CAP. */
      let servit = false;
      for(let k=0; k<cand.length && !servit; k++){
        day.meals[t.mealId] = cand[(i+k) % cand.length].id;
        ajustarDia(day, i, P, bloquejat);             // condició 7
        const final = dishById(day.meals[t.mealId]);
        if(final && !nutrientsClau(final.i).some(x => bloc.has(x))) servit = true;
        else day.meals = Object.assign({}, abans);    // no ha anat: el següent
      }
      if(!servit) continue;                           // condició 8

      for(const mid of PRINCIPALS){
        if(day.meals[mid] === abans[mid]) continue;
        canvis.push({ds:t.ds, mealId:mid,
                     abans: abans[mid] || null,
                     ara:   day.meals[mid],
                     motiu: mid===t.mealId
                       ? "repetia "+nomsAliments(xoca)
                       : "ajust del dia després del canvi"});
      }
    }
  } finally { enCadena = false; }

  const dies = [...new Set(canvis.map(c=>c.ds))];

  /* Mode suggeriment (ordinador): hem calculat sobre les dades de debò
     perquè ajustarDia() necessita veure el dia sencer, així que ara ho
     tornem tot a deixar exactament com estava. */
  if(!aplicar){
    for(const [ds, meals] of originals) dayData(ds).meals = Object.assign({}, meals);
    return {canvis, dies, aplicat:false};
  }

  /* Condició 6. Viu dins del dia, o sigui que se sincronitza sol.
     Si un àpat ja tenia un canvi automàtic pendent, conservem el 'abans'
     original: desfer ha de tornar al que hi havia abans de tot. */
  for(const c of canvis){
    const day = dayData(c.ds);
    day.auto = day.auto || {};
    if(day.auto[c.mealId]){
      day.auto[c.mealId].motiu = c.motiu;
      day.auto[c.mealId].quan  = quan;
    } else {
      day.auto[c.mealId] = {abans:c.abans, motiu:c.motiu, quan};
    }
  }
  return {canvis, dies, aplicat:true};
}

/* Desfà un canvi automàtic i esborra la marca. */
function desferAuto(ds, mealId){
  const day = dayData(ds);
  /* Un dia validat es congela (decisió 5). L'avís de reprogramacions
     no caduca, i per tant continua ensenyant les d'un dia que després
     s'ha validat; el botó no hi pot fer res. */
  if(esValidat(day)) return false;
  if(!day.auto || !day.auto[mealId]) return false;
  const a = day.auto[mealId];
  if(a.abans) day.meals[mealId] = a.abans;
  else delete day.meals[mealId];
  delete day.auto[mealId];
  if(!Object.keys(day.auto).length) delete day.auto;
  return true;
}
/* Els canvis automàtics pendents d'un dia, per pintar l'avís.
   Llegeix S.weeks directament: és una consulta i no ha de crear el dia
   si no existeix, que és el que faria dayData(). */
function autosPendents(ds){
  const setmana = S.weeks[weekKey(parseDay(ds))];
  const day = setmana && setmana[ds];
  return Object.entries((day && day.auto) || {})
    .map(([mealId,a]) => Object.assign({mealId}, a));
}
/* Tots els pendents d'una setmana, per a l'avís de dalt de tot. */
function autosSetmana(mon){
  const out = [];
  for(let i=0;i<7;i++){
    const ds = iso(addDays(mon,i));
    for(const a of autosPendents(ds)) out.push(Object.assign({ds}, a));
  }
  return out;
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

/* ---------------------------------------------------------------------
   Les racions es poden editar (nutricionista) i el canvi va cap endavant,
   mai enrere. Regla, decidida el 14 d'agost:

     · Un dia VALIDAT es valora sempre amb les racions que hi havia quan
       es va validar. Validar és el moment en què es revisen els àpats, i
       tots els dies s'han de validar, siguin passats o no.
     · Un dia SENSE validar es valora amb les vigents ara.
     · Un canvi fet avui no entra fins demà. Si entrés el mateix dia, un
       dinar que ella ja s'ha menjat i que li deia "Equilibrat" podria
       passar a dir-li que hi faltava alguna cosa, que és exactament la
       valoració retroactiva que evita tot l'aplicatiu.

   Per fer-ho no es desa la taula sencera dins de cada dia: es desa
   l'històric datat dels canvis i es resol per moment.
   --------------------------------------------------------------------- */

/* Desa al registre com queden les racions després d'un canvi. */
const MAX_HIST = 200;

/* Retallar un històric datat sense perdre el passat.
   Abans es llençaven les entrades velles i prou, i llavors un dia validat
   més antic que la primera entrada conservada es tornava a valorar amb
   les racions de base: la seva fotografia deixava de poder-se llegir.
   Ara l'última entrada que sortiria es queda com a primera, marcada, i
   com que cada entrada porta l'estat sencer (no la diferència) qualsevol
   moment posterior es continua reconstruint exacte. */
function retallarHist(h){
  if(!Array.isArray(h) || h.length <= MAX_HIST) return h;
  const arrossegada = Object.assign({}, h[h.length-MAX_HIST], {collapsada:true});
  h.splice(0, h.length-MAX_HIST+1, arrossegada);
  return h;
}

/* Com resoldre quin estat regia en un moment donat. Serveix per a
   qualsevol històric datat: racions, àpats fixos... */
function vigentEn(hist, quan, ara, camp){
  const h = hist || [];
  if(quan===undefined || quan===null || !h.length) return ara || {};
  const t = new Date(quan).getTime();
  if(isNaN(t)) return ara || {};
  let r = null;
  for(const e of h){
    if(new Date(e.quan).getTime() <= t) r = e[camp];
    else break;                      // l'històric va en ordre cronològic
  }
  return r || {};                    // abans del primer canvi: les de base
}

function apuntarRacions(){
  S.racionsHist = S.racionsHist || [];
  S.racionsHist.push({quan:new Date().toISOString(),
                      qui: quiSoc() || "aquest aparell",
                      racions: JSON.parse(JSON.stringify(S.racions||{}))});
  retallarHist(S.racionsHist);
}

/* Quines modificacions regien en un moment donat. */
function racionsVigents(quan){
  return vigentEn(S.racionsHist, quan, S.racions, "racions");
}

/* El mateix per als àpats petits. Sense això, canviar avui la recepta del
   batut canviava la valoració d'un esmorzar de fa mesos: apatsFixos(quan)
   rebia el moment però no el feia servir. */
function apuntarApatsFixos(){
  S.apatsFixosHist = S.apatsFixosHist || [];
  S.apatsFixosHist.push({quan:new Date().toISOString(),
                         qui: quiSoc() || "aquest aparell",
                         apatsFixos: JSON.parse(JSON.stringify(S.apatsFixos||{}))});
  retallarHist(S.apatsFixosHist);
}
function apatsFixosVigents(quan){
  return vigentEn(S.apatsFixosHist, quan, S.apatsFixos, "apatsFixos");
}

/* El moment amb què s'ha de valorar un dia. L'inici d'avui és el que
   deixa fora els canvis fets avui mateix. */
function momentDe(day){
  return (day && day.validat) ? day.validat : TODAY.toISOString();
}
const MOMENT_ARA = () => TODAY.toISOString();
/* Per defecte, tota valoració i tota equivalència es fan amb el moment
   d'ara. racions() sense argument segueix donant les vigents de debò,
   que és el que necessita la pantalla d'edicio. */
const QUAN = q => (q===undefined || q===null) ? MOMENT_ARA() : q;

/* Les racions vigents. Sense argument, les d'ara. */
function racions(quan){
  const r = JSON.parse(JSON.stringify(RACIONS_BASE));
  for(const [grup, canvis] of Object.entries(racionsVigents(quan))){
    if(!r[grup]) r[grup] = {n:grup, perApat:1, aliments:{}};
    if(canvis.perApat!=null) r[grup].perApat = canvis.perApat;
    for(const [k,v] of Object.entries(canvis.aliments||{})){
      /* Retirat: surt del grup, però l'aliment segueix existint. Els plats
         antics que el porten han de poder-ne llegir el nom; el que passa
         és que deixa de comptar com a ració, i per tant el plat deixa de
         complir i el botó d'actualitzar ho reporta. */
      if(v && v.retirat){ delete r[grup].aliments[k]; continue; }
      r[grup].aliments[k] = Object.assign({}, r[grup].aliments[k], v,
        {font: (r[grup].aliments[k] ? "editat" : "afegida")});
    }
  }
  return r;
}

/* =====================================================================
   11ter. LA GUIA DE LA NUTRICIONISTA
   ---------------------------------------------------------------------
   Tot el que decideix ella viu aquí i només es toca des de la pestanya
   Guia. Editar un plat no canvia mai cap d'aquests números.

   Tres coses: les racions (secció 11), les receptes fixes dels àpats
   petits, i els hàbits. Abans les dues últimes eren text i números dins
   del codi, i podien contradir el que feia servir l'aplicatiu.
   --------------------------------------------------------------------- */

/* Els àpats petits no es mesuren en racions sinó per una recepta fixa. */
const APATS_FIXOS_BASE = {
  esmorzar:{n:"Esmorzar", ajuda:"Pa o flocs de civada, proteïna i un greix",
            min:{hc:60}, cal:{}},
  migmati: {n:"Mig matí — batut",
            ajuda:"Base sempre igual; s'hi afegeix fruita i una cullerada de mel",
            min:{fruita:100}, cal:{llet_ame:250, iogurt_soja:120, crema_ame:25, avena:40}},
  berenar: {n:"Berenar", ajuda:"Peça de fruita, i boletes, entrepà o fruits secs",
            min:{fruita:90}, cal:{}, alguna:{boleta:90, greix:30, pa:50}},
};
/* Sense argument, els d'ara (és el que necessita la Guia per editar-los).
   Amb un moment, els que regien llavors. */
function apatsFixos(quan){
  const r = JSON.parse(JSON.stringify(APATS_FIXOS_BASE));
  for(const [apat, c] of Object.entries(apatsFixosVigents(quan))){
    if(!r[apat]) continue;
    for(const camp of ["min","cal","alguna"])
      if(c[camp]) r[apat][camp] = Object.assign({}, r[apat][camp], c[camp]);
    if(c.ajuda!=null) r[apat].ajuda = c.ajuda;
  }
  return r;
}

/* Indicacions en text. Les que porta el programa es poden editar i
   retirar, i se'n poden afegir de noves. */
const INDICACIONS_BASE = [
  {id:"i_postres", t:"Alternar les postres: iogurt al dinar i fruita al sopar, o a l'inrevés."},
  {id:"i_batut",   t:"Deixar el batut preparat la nit anterior."},
  {id:"i_entrepa", t:"Incorporar un entrepà al berenar per assegurar un bon aport d'energia."},
  {id:"i_descans", t:"Descansar entre 30 i 40 minuts després dels àpats principals."},
];
function indicacions(){
  const ed = S.indicacions || {};
  const out = INDICACIONS_BASE
    .map(x => Object.assign({base:true}, x, ed[x.id]))
    .filter(x => !x.retirat);
  for(const x of (S.indicacionsNoves||[])) if(!x.retirat) out.push(Object.assign({base:false}, x));
  return out;
}

/* Hàbits. Es poden canviar, retirar i afegir. Els retirats no s'esborren:
   un dia antic que en va marcar un ha de poder-ne llegir el nom. */
const HABITS_BASE = [
 {id:"batut_nit", n:"Batut preparat la nit anterior"},
 {id:"descans_d", n:"Descans de 30-40 min després del dinar"},
 {id:"descans_s", n:"Descans de 30-40 min després del sopar"},
 {id:"passeig_m", n:"Passeig de 30 min al matí"},
 {id:"passeig_v", n:"Passeig de 30 min al vespre"},
];
function totsElsHabits(){
  const ed = S.habitsEdit || {};
  const out = HABITS_BASE.map(h => Object.assign({base:true}, h, ed[h.id]));
  for(const h of (S.habitsNous||[])) out.push(Object.assign({base:false}, h, ed[h.id]));
  return out;
}
function habits(){ return totsElsHabits().filter(h => !h.retirat); }
/* El nom d'un hàbit, encara que s'hagi retirat. */
const nomHabit = id => (totsElsHabits().find(h=>h.id===id)||{n:id}).n;

/* Grup d'equivalència d'un aliment (verd_c i verd_k compten com "verd") */
function grupRacio(k, quan){
  const R = racions(QUAN(quan));
  for(const [grup, d] of Object.entries(R)) if(d.aliments[k]) return grup;
  return null;
}
/* Grams que fan una ració d'aquest aliment */
function gramsRacio(k, quan){
  const g = grupRacio(k, quan); if(!g) return null;
  return racions(QUAN(quan))[g].aliments[k].g;
}
/* Quantes racions són aquests grams */
function comptaRacions(k, grams, quan){
  const g = gramsRacio(k, quan);
  return g ? grams/g : 0;
}
/* Alternatives per canviar un aliment sense desquadrar l'àpat.
   Retorna [{k, n, grams, text, nota}] amb la quantitat ja calculada. */
function equivalents(k, nRacions, quan){
  const grup = grupRacio(k, quan); if(!grup) return [];
  const n = nRacions || 1;
  return Object.entries(racions(QUAN(quan))[grup].aliments)
    .filter(([alt]) => alt!==k && ing(alt))
    .map(([alt,d]) => {
      const grams = Math.round(d.g*n);
      return {k:alt, n:ing(alt).n, grams, text:qtyTxt(alt, grams), nota:d.nota||""};
    })
    .sort((a,b)=>a.n.localeCompare(b.n));
}
/* Totes les opcions d'un grup, per construir un àpat element a element */
function opcionsGrup(grup, nRacions, quan){
  const R = racions(QUAN(quan))[grup]; if(!R) return [];
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
function racionsDe(items, quan){
  const R = racions(QUAN(quan));
  const total = {}; for(const g of Object.keys(R)) total[g] = 0;
  const perGrup = {};
  for(const [k,q] of Object.entries(items||{})){
    let grup = null;
    for(const [g,d] of Object.entries(R)) if(d.aliments[k]){ grup = g; break; }
    if(!grup || !q) continue;
    const n = q / R[grup].aliments[k].g;
    total[grup] += n;
    (perGrup[grup] = perGrup[grup] || []).push({k, racions:n});
  }
  return {total, perGrup};
}

/* Què li falta a un àpat principal, en racions i redactat en positiu.
   Aquest és **el criteri únic** de si un àpat principal està complet:
   el fan servir el mòbil, la llista de plats, el triador de l'ordinador,
   el proposador i la cadena. Surt sempre de racions(), o sigui que quan
   la nutricionista canvia una quantitat, tot es mou alhora. */
function faltaApat(items, mealId, quan){
  const q = QUAN(quan);
  const R = racions(q), comptat = racionsDe(items, q), r = comptat.total;
  const f = [];
  const arrodoneix = x => Math.round(x*10)/10;
  if(mealId==="dinar" || mealId==="sopar"){
    const calProt = (R.prot&&R.prot.perApat)||1;
    const calHc   = (R.hc&&R.hc.perApat)||1;
    const calVerd = (R.verd&&R.verd.perApat)||2;
    const calGrx  = (R.greix&&R.greix.perApat)||2;
    /* El 0,85 dona un marge del 15% per no cridar l'atenció per una
       diferència de pesatge. Els grams de "verdura fins a X" surten de
       la ració, no d'un 200 escrit a mà. */
    const gVerd = Math.round(calVerd * ((R.verd&&R.verd.aliments&&R.verd.aliments.tomaquet
                    &&R.verd.aliments.tomaquet.g) || 100));
    if(r.prot < calProt*0.85) f.push({grup:"prot", t:"una font de proteïna",
                                      falten:arrodoneix(calProt-r.prot)});
    if(r.hc   < calHc*0.85)   f.push({grup:"hc",   t:"l'aliment dels hidrats",
                                      falten:arrodoneix(calHc-r.hc)});
    if(r.verd < calVerd*0.925) f.push({grup:"verd", t:"verdura fins a "+gVerd+" g",
                                      falten:arrodoneix(calVerd-r.verd)});
    const diferents = new Set((comptat.perGrup.greix||[])
      .filter(x=>x.racions>=0.4).map(x=>x.k));
    if(diferents.size < calGrx) f.push({grup:"greix", t:"un segon greix diferent",
                                        falten:calGrx-diferents.size});
  }
  return {complet:f.length===0, falten:f, racions:r};
}

/* =====================================================================
   11bis. ACTUALITZAR ELS PLATS ALS CRITERIS NOUS
   ---------------------------------------------------------------------
   Quan la nutricionista canvia una ració, els plats del catàleg es queden
   amb les quantitats velles. Això els torna a quadrar: reescala cada grup
   fins a les racions que toquen, sense inventar-se cap aliment nou.

   El que NO fa, a propòsit:
     · no toca els aliments que no són de cap grup (all, sal, espècies)
     · no afegeix un greix que no hi era: si a un plat només n'hi ha un i
       la indicació en demana dos, ho reporta i no s'ho empesca
     · no toca els dies ja validats, que porten la seva fotografia
   Sempre s'ensenya què canviarà abans d'aplicar-ho.
   --------------------------------------------------------------------- */

/* Arrodoniment amable: de 5 en 5 a partir de 50 g, i d'1 en 1 per sota. */
function arrodonirQty(g){
  if(g >= 50) return Math.round(g/5)*5;
  return Math.max(1, Math.round(g));
}

/* Com quedaria aquest plat amb les racions vigents.
   Retorna {i, canvis:[{k, abans, ara}], avisos:[text]} */
function recalcularPlat(dish, mealId, quan){
  const R = racions(QUAN(quan));
  const nous = Object.assign({}, dish.i);
  const avisos = [];
  const perGrup = {};
  for(const [k,g] of Object.entries(dish.i)){
    for(const [grup,d] of Object.entries(R)) if(d.aliments[k]){
      (perGrup[grup] = perGrup[grup] || []).push(k); break;
    }
  }
  /* Només es toca un grup si es queda CURT. Un plat que ja compleix no
     s'ha de retocar per quadrar-lo al decimal: si té 2,1 racions de
     verdura quan en calen 2, això ja està bé i moure-ho només seria
     soroll a la previsió i quantitats rares al plat. Els llindars són
     els mateixos que fa servir faltaApat(). */
  const LLINDAR = {prot:0.85, hc:0.85, verd:0.925};
  for(const grup of ["prot","hc","verd"]){
    const ks = perGrup[grup]; if(!ks || !ks.length) continue;
    const cal = (R[grup] && R[grup].perApat) || 1;
    let ara = 0;
    for(const k of ks) ara += nous[k] / R[grup].aliments[k].g;
    if(!ara) continue;
    if(ara >= cal * LLINDAR[grup]) continue;        // ja compleix: no s'hi toca
    const factor = cal / ara;
    for(const k of ks) nous[k] = arrodonirQty(nous[k] * factor);
  }
  /* Els greixos no es sumen: la indicació demana N de DIFERENTS, cadascun
     amb prou quantitat. Es puja el que es queda curt i prou. */
  const gx = perGrup.greix || [];
  const calGx = (R.greix && R.greix.perApat) || 2;
  for(const k of gx){
    const r = nous[k] / R.greix.aliments[k].g;
    if(r < 0.4) nous[k] = arrodonirQty(R.greix.aliments[k].g * 0.5);
  }
  if(gx.length < calGx && (mealId==="dinar"||mealId==="sopar"))
    avisos.push("només hi ha "+gx.length+" greix"+(gx.length===1?"":"os")+
                " i la indicació en demana "+calGx+": cal afegir-n'hi un a mà");

  const canvis = [];
  for(const [k,g] of Object.entries(nous))
    if(g !== dish.i[k]) canvis.push({k, abans:dish.i[k], ara:g});
  return {i:nous, canvis, avisos};
}

/* Tots els plats que canviarien, sense tocar res. És el que s'ensenya
   abans d'aplicar. */
function previsioActualitzacio(quan){
  const out = [];
  /* També els plats retirats. Estan fora de la tria, però se'ls apliquen
     les mateixes regles: quan es tornin a activar han d'estar al dia i no
     arrossegar quantitats velles. */
  for(const d of totsElsPlats()){
    const mealId = d.m.includes("dinar") ? "dinar"
                 : d.m.includes("sopar") ? "sopar" : null;
    if(!mealId) continue;                    // els àpats petits, a la part b
    const r = recalcularPlat(d, mealId, quan);
    const abans = checkMeal(d.id, mealId, quan).complet;
    if(!r.canvis.length && !r.avisos.length) continue;
    const despres = checkItems(r.i, mealId, quan).complet;
    out.push({id:d.id, n:d.n, mealId, canvis:r.canvis, avisos:r.avisos,
              i:r.i, abans, despres, retirat:!!d.amagat});
  }
  return out;
}

/* Aplica el que s'acaba d'ensenyar. Torna quants plats ha tocat. */
function aplicarActualitzacio(previsio){
  let n = 0;
  for(const p of previsio){
    if(!p.canvis.length) continue;
    const base = dishById(p.id); if(!base) continue;
    S.editsPlats = S.editsPlats || {};
    S.editsPlats[p.id] = Object.assign({}, S.editsPlats[p.id], {i:p.i});
    n++;
  }
  return n;
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
/* =====================================================================
   ESBORRATS AMB LÀPIDA
   ---------------------------------------------------------------------
   Esborrar traient l'element de la llista no funciona quan hi ha més
   d'un aparell. L'altre encara el té, i com que fusionar només afegeix
   el que li falta, el torna a pujar: l'element ressuscita.

   Per això no s'esborra: es marca com a esborrat i la marca es
   sincronitza com qualsevol altra dada. Les pantalles filtren els
   marcats; la fusió, com que compara marques de temps, veu que
   l'esborrat és més nou que la còpia de l'altre aparell i mana.

   La làpida ocupa quatre camps i es queda. És el preu de poder esborrar
   de debò, i és molt més barat que perdre o duplicar dades.
   --------------------------------------------------------------------- */
const esborrat = x => !!(x && x.esborrat);
function lapida(id){
  return {id, esborrat:true, u:Date.now(), qui:quiSoc()||"aquest aparell"};
}

function esborrarMissatge(id){
  const l = S.missatges || (S.missatges = []);
  const i = l.findIndex(m=>m.id===id);
  if(i<0) return;
  l[i] = lapida(id);
}
/* Els que s'han d'ensenyar: tot menys les làpides. */
const missatgesVius = () => (S.missatges||[]).filter(m=>!esborrat(m));
const documentsVius = () => (S.documents||[]).filter(d=>!esborrat(d));
const pesosVius = () => {
  const out = {};
  for(const [ds,p] of Object.entries(S.pesos||{})) if(!esborrat(p)) out[ds] = p;
  return out;
};
const diariViu = () => {
  const out = {};
  for(const [ds,v] of Object.entries(S.diari||{})) if(!esborrat(v)) out[ds] = v;
  return out;
};
/* Marca com a llegits tots els que no ha escrit un mateix. Retorna
   quants n'ha marcat, per saber si cal desar. */
function marcarLlegits(){
  const jo = quiSoc(); if(!jo) return 0;
  let n = 0;
  for(const m of missatgesVius()){
    m.llegits = m.llegits || {};
    if(m.qui!==jo && !m.llegits[jo]){ m.llegits[jo] = new Date().toISOString(); n++; }
  }
  return n;
}
function missatgesSenseLlegir(){
  const jo = quiSoc(); if(!jo) return 0;
  return missatgesVius().filter(m=>m.qui!==jo && !(m.llegits||{})[jo]).length;
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
function treurePes(dataStr){ S.pesos[dataStr] = lapida(dataStr); }

/* Observacions del dia sense pesada. Van a part perquè no tots els dies
   es pesa, i les notes tenen valor per elles mateixes. */
function desarNotaDia(dataStr, text){
  const t = (text||"").trim();
  if(!t) S.diari[dataStr] = lapida(dataStr);
  else S.diari[dataStr] = {text:t, u:Date.now()};
}
function notaDia(dataStr){
  const v = S.diari[dataStr];
  return (v && !esborrat(v) && v.text) || "";
}
/* Totes les entrades del diari, amb el pes del dia si n'hi ha */
function diariComplet(desde, fins){
  const D = diariViu(), P = pesosVius();
  const dies = new Set([...Object.keys(D), ...Object.keys(P)]);
  return [...dies]
    .filter(ds => (!desde || ds>=iso(desde)) && (!fins || ds<=iso(fins)))
    .sort().reverse()
    .map(ds => ({ds, d:parseDay(ds),
                 text:(D[ds]||{}).text || "",
                 pes:(P[ds]||{}).kg || null,
                 hora:(P[ds]||{}).hora || "",
                 notaPes:(P[ds]||{}).nota || ""}))
    /* Un dia on només hi queda una làpida no ha de sortir com a entrada
       buida: per a qui mira, allò està esborrat. */
    .filter(x => x.text || x.pes !== null);
}

/* Sèrie ordenada de pesades dins d'un interval */
function seriePes(desde, fins){
  return Object.entries(pesosVius())
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
/* Escapar per posar text dins d'HTML.
   Hi ha d'entrar l'apòstrof i l'accent obert, encara que semblin
   innocents: mig aplicatiu construeix botons com onclick="f('${esc(x)}')",
   i allà dins un apòstrof no és un caràcter qualsevol, és el final de la
   cadena. Sense això, el botó fix "Casa d'algú" ja no funcionava, i un
   nom de fitxer amb apòstrof podia sortir de l'atribut i convertir-se en
   codi. Aquí hi ha sessió iniciada i dades de salut: no és el lloc per
   anar just. */
const esc = s => String(s==null?"":s).replace(/[&<>"'`]/g,
  c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;",
       "'":"&#39;","`":"&#96;"}[c]));

/* I aquest és per al text que va dins d'una crida dins d'un atribut:
       onclick="posarLloc('${escJs(p)}')"
   Amb esc() sol no n'hi ha prou. El navegador primer descodifica
   l'atribut i després passa el que queda al JavaScript: un &#39; li
   arriba convertit en apòstrof i li tanca la cadena igualment. O sigui
   que primer s'escapa per al JavaScript (barra i cometa) i després per a
   l'HTML. Els salts de línia també hi entren: dins d'una cadena de
   JavaScript, un salt de línia de debò és un error de sintaxi. */
const escJs = s => esc(String(s==null?"":s)
  .replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\r?\n/g,"\\n"));
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

if (typeof module !== "undefined") module.exports = {
  ING, MEALS, DIES, BASE_DISHES, POSTRES, CATS, QTY_REF,
  HABITS_BASE, habits, totsElsHabits, nomHabit,
  APATS_FIXOS_BASE, apatsFixos, INDICACIONS_BASE, indicacions,
  loadState, saveState, nomesGuia, CAMPS_GUIA, KEY,
  lapida, esborrat, missatgesVius, documentsVius, pesosVius, diariViu,
  treurePes, desarNotaDia, notaDia, esborrarMissatge, diariComplet, seriePes,
  allIng, ing, DISHES, dishById, iso, monday, addDays,
  weekKey, dayData, weekData, structure, checkMeal, checkDay, dayItems,
  proposarSetmana, expandir, compraDe, agruparCompra, qtyTxt, shopRound,
  unitatTxt, nomUnitat, MIDES, plural, esc, escJs,
  qtyRef, fruitPieces, postresAlternades, esValidat, TODAY, fmtDay, fmtLong,
  parseDay, apatDelDia, racions, grupRacio, gramsRacio, racionsDe, faltaApat,
  platsBons, ajustarDia, nutrientsClau, apatsSeguents, reprogramarCadena,
  desferAuto, autosPendents, autosSetmana, LLINDAR_REPETICIO,
  RACIONS_BASE, apuntarRacions, racionsVigents, momentDe, MOMENT_ARA,
  apuntarApatsFixos, apatsFixosVigents, retallarHist, MAX_HIST,
  fotografiarDia, teFotografia, apatDelDiaViu, recalcularPlat,
  previsioActualitzacio, aplicarActualitzacio, arrodonirQty,
  checkItems, equivalents, opcionsGrup, comptaRacions, apatsFets,
  SENSACIONS, SUPERVISIO, structure, DISHES, totsElsPlats,
  get S(){ return S; }, set S(v){ S = v; },
};
