/* =====================================================================
   MENÚ VEGA · CONFIGURACIÓ DE LA SINCRONITZACIÓ
   ---------------------------------------------------------------------
   Mentre aquest fitxer estigui tal com està, els dos aplicatius funcionen
   perfectament però cadascun guarda les dades al seu propi aparell.

   Per connectar l'ordinador i el mòbil, segueix la GUIA-CONFIGURACIO.md
   i substitueix els valors de sota pels del teu projecte de Firebase.
   ===================================================================== */

const FIREBASE_CONFIG = {
  apiKey:            "ENGANXA-AQUI-LA-TEVA-CLAU",
  authDomain:        "el-teu-projecte.firebaseapp.com",
  projectId:         "el-teu-projecte",
  storageBucket:     "el-teu-projecte.appspot.com",
  messagingSenderId: "000000000000",
  appId:             "1:000000000000:web:0000000000000000000000"
};

/* Identificador del pla. Si algun dia vols portar més d'una persona,
   fes servir un nom diferent per a cadascuna i duplica els aplicatius. */
const PLA_ID = "principal";
