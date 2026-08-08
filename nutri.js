/* =====================================================================
   MENÚ VEGA · DADES NUTRICIONALS
   ---------------------------------------------------------------------
   ATENCIÓ: aquest fitxer NOMÉS el carrega l'aplicatiu d'ordinador
   (index.html) i les seves dades només es mostren amb la sessió
   desbloquejada amb contrasenya.

   L'aplicatiu del mòbil (mobil.html) NO carrega aquest fitxer. Per això
   al mòbil no hi ha cap caloria ni cap macronutrient: no és que estiguin
   amagats per pantalla, és que no formen part de l'aplicatiu.

   Valors per cada 100 g de producte (o 100 ml en els líquids).
   Font: taules de composició d'aliments d'ús general (BEDCA / USDA).
   Són valors orientatius de referència, no una anàlisi de laboratori.
   ===================================================================== */

const NUTRI = {
/* proteïnes */
 tofu:       {kcal:144, p:15.5, c:2.8, f:8.7},
 soja_tex:   {kcal:340, p:50,   c:30,  f:1.5},
 seitan:     {kcal:145, p:25,   c:8,   f:1.9},
 tempeh:     {kcal:192, p:20,   c:8,   f:11},
 cigrons:    {kcal:164, p:8.9,  c:27,  f:2.6},
 llenties:   {kcal:116, p:9,    c:20,  f:0.4},
 mongetes:   {kcal:127, p:8.7,  c:23,  f:0.5},
 edamame:    {kcal:121, p:12,   c:9,   f:5},
 ou:         {kcal:143, p:12.6, c:0.7, f:9.5},
 iogurt_soja:{kcal:55,  p:4,    c:3.5, f:2.5},
 llet_ame:   {kcal:15,  p:0.5,  c:0.6, f:1.2},
/* hidrats */
 patata:     {kcal:77,  p:2,    c:17,  f:0.1},
 moniato:    {kcal:86,  p:1.6,  c:20,  f:0.1},
 quinoa:     {kcal:368, p:14,   c:64,  f:6},
 arros:      {kcal:360, p:7,    c:79,  f:0.9},
 pasta:      {kcal:371, p:13,   c:75,  f:1.5},
 pa:         {kcal:247, p:9,    c:41,  f:3.4},
 avena:      {kcal:389, p:13,   c:66,  f:7},
 datils:     {kcal:282, p:2.5,  c:75,  f:0.4},
 mel:        {kcal:304, p:0.3,  c:82,  f:0},
/* verdura crua */
 tomaquet:   {kcal:18,  p:0.9,  c:3.9, f:0.2},
 canonges:   {kcal:21,  p:2,    c:3.6, f:0.4},
 cogombre:   {kcal:15,  p:0.7,  c:3.6, f:0.1},
 pastanaga:  {kcal:41,  p:0.9,  c:10,  f:0.2},
/* verdura cuinada */
 carbasso:   {kcal:17,  p:1.2,  c:3.1, f:0.3},
 pebrot:     {kcal:31,  p:1,    c:6,   f:0.3},
 broquil:    {kcal:34,  p:2.8,  c:7,   f:0.4},
 alberginia: {kcal:25,  p:1,    c:6,   f:0.2},
 xampinyons: {kcal:22,  p:3.1,  c:3.3, f:0.3},
 espinacs:   {kcal:23,  p:2.9,  c:3.6, f:0.4},
 ceba:       {kcal:40,  p:1.1,  c:9,   f:0.1},
/* greixos */
 aove:       {kcal:884, p:0,    c:0,   f:100},
 sesam:      {kcal:573, p:17,   c:23,  f:50},
 lli:        {kcal:534, p:18,   c:29,  f:42},
 ametlles:   {kcal:579, p:21,   c:22,  f:50},
 cacauets:   {kcal:567, p:26,   c:16,  f:49},
 nous:       {kcal:654, p:15,   c:14,  f:65},
 tahini:     {kcal:595, p:17,   c:10,  f:54},
 crema_ame:  {kcal:614, p:21,   c:7,   f:56},
 alvocat:    {kcal:160, p:2,    c:9,   f:15},
/* fruita */
 poma:       {kcal:52,  p:0.3,  c:14,  f:0.2},
 platan:     {kcal:89,  p:1.1,  c:23,  f:0.3},
 taronja:    {kcal:47,  p:0.9,  c:12,  f:0.1},
 pera:       {kcal:57,  p:0.4,  c:15,  f:0.1},
 kiwi:       {kcal:61,  p:1.1,  c:15,  f:0.5},
 maduixes:   {kcal:32,  p:0.7,  c:7.7, f:0.3},
 nabius:     {kcal:57,  p:0.7,  c:14,  f:0.3},
 mango:      {kcal:60,  p:0.8,  c:15,  f:0.4},
 press:      {kcal:39,  p:0.9,  c:10,  f:0.3},
 llimona:    {kcal:29,  p:1.1,  c:9,   f:0.3},
/* condiments */
 all:        {kcal:149, p:6.4,  c:33,  f:0.5},
 comi:       {kcal:375, p:18,   c:44,  f:22},
 pebre_v:    {kcal:282, p:14,   c:54,  f:13},
 sal:        {kcal:0,   p:0,    c:0,   f:0},
 julivert:   {kcal:36,  p:3,    c:6,   f:0.8},
 vinagre:    {kcal:19,  p:0,    c:0.9, f:0},
 cacau:      {kcal:228, p:20,   c:58,  f:14},
 salsa_soja: {kcal:53,  p:8,    c:5,   f:0.1},
/* elaboracions */
 hummus:     {kcal:214, p:8.1,  c:19.5,f:11.6},
 boleta:     {kcal:352, p:9.4,  c:47,  f:14.4},
 gaspatxo:   {kcal:52,  p:0.9,  c:4.2, f:3.6},
};

/* Objectius diaris.
   Calculats sumant les quantitats de referència de les guies 1-3 per a un
   dia complet. NO són una xifra prescrita per la nutricionista: es poden
   canviar des de l'aplicatiu. */
const DEF_TARGET = {kcal:2900, prot:105, verd:400, fruita:3};
const KCAL_BAND  = 0.20;

/* Suma nutricional d'un conjunt d'ingredients */
function nutriSum(items){
  const t = {kcal:0, p:0, c:0, f:0};
  let desconeguts = 0;
  for(const [k,g] of Object.entries(items||{})){
    const n = NUTRI[k] || (S.customIng[k] && S.customIng[k].nutri);
    if(!n){ if(g) desconeguts++; continue; }
    t.kcal += n.kcal*g/100; t.p += n.p*g/100; t.c += n.c*g/100; t.f += n.f*g/100;
  }
  t.desconeguts = desconeguts;
  return t;
}
function targetActual(){ return Object.assign({}, DEF_TARGET, S.target||{}); }

/* Valoració numèrica completa d'un dia — només amb sessió desbloquejada */
function scoreDayFull(day){
  const items = dayItems(day);
  const t = nutriSum(items);
  const s = structure(items);
  const T = targetActual();
  const fets = MEALS.filter(m=>day.meals[m.id]).length;
  const C = [];
  C.push({ok:fets===5, t:"5 àpats planificats", v:fets+"/5"});
  C.push({ok:Math.abs(t.kcal-T.kcal)<=T.kcal*KCAL_BAND,
          t:"Energia ≈ "+T.kcal+" kcal", v:Math.round(t.kcal)+" kcal"});
  C.push({ok:t.p>=T.prot, t:"Proteïna ≥ "+T.prot+" g", v:Math.round(t.p)+" g"});
  C.push({ok:s.g.verd>=T.verd, t:"Verdura ≥ "+T.verd+" g", v:Math.round(s.g.verd)+" g"});
  C.push({ok:s.g.verd_c>=100 && s.g.verd_k>=100, t:"Verdura crua i cuita el mateix dia",
          v:Math.round(s.g.verd_c)+" g crua / "+Math.round(s.g.verd_k)+" g cuita"});
  C.push({ok:fruitPieces(items)>=T.fruita, t:T.fruita+" racions de fruita",
          v:fruitPieces(items).toFixed(1)});
  const alt = postresAlternades(day);
  C.push({ok:alt.ok, t:"Postres alternades (iogurt / fruita)", v:alt.txt});
  const ok = C.filter(x=>x.ok).length;
  return {lvl: ok>=C.length ? "v" : (ok>=C.length-2 ? "g" : "r"),
          checks:C, t, s, fets, kcal:t.kcal, prot:t.p};
}

/* Valoració numèrica d'un àpat */
function scoreMealFull(dishId, mealId){
  const d = dishById(dishId);
  if(!d) return null;
  const t = nutriSum(d.i), s = structure(d.i);
  const C = [];
  if(mealId==="dinar"||mealId==="sopar"){
    C.push({ok:t.p>=20, t:"Proteïna ≥ 20 g", v:Math.round(t.p)+" g"});
    C.push({ok:s.g.verd>=200, t:"Verdura ≥ 200 g", v:Math.round(s.g.verd)+" g"});
    C.push({ok:s.g.hc>=55, t:"Hidrats de carboni presents", v:Math.round(s.g.hc)+" g"});
    C.push({ok:s.greixos.length>=2, t:"2 greixos saludables diferents", v:s.greixos.length});
  } else {
    const r = checkMeal(dishId, mealId);
    r.falten.forEach(x=>C.push({ok:false, t:"Hi falta "+x, v:""}));
    if(r.complet) C.push({ok:true, t:"Compleix l'estructura de la guia", v:""});
    C.push({ok:true, t:"Energia de l'àpat", v:Math.round(t.kcal)+" kcal"});
  }
  const rell = C.filter(x=>x.t!=="Energia de l'àpat");
  const ok = rell.filter(x=>x.ok).length;
  return {lvl: ok===rell.length ? "v" : (ok>=rell.length-1 ? "g" : "r"), checks:C, t, s};
}

if (typeof module !== "undefined") module.exports = {
  NUTRI, DEF_TARGET, KCAL_BAND, nutriSum, targetActual, scoreDayFull, scoreMealFull
};
