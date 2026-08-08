/* =====================================================================
   MENÚ VEGA · CONFIGURACIÓ DE LA SINCRONITZACIÓ
   ---------------------------------------------------------------------
   Dades de connexió del projecte de Firebase "menu-vega".

   Aquests valors NO són secrets: van dins de qualsevol aplicació web i
   Google compta que siguin públics. Qui protegeix les dades són les
   regles de seguretat de Firestore i de Storage, que només deixen entrar
   els comptes registrats a plans/principal/membres.
   ===================================================================== */

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDOapd1TFdPGwNgSslmDUyBIIm9FDWQyG4",
  authDomain:        "menu-vega.firebaseapp.com",
  projectId:         "menu-vega",
  storageBucket:     "menu-vega.firebasestorage.app",
  messagingSenderId: "551327111753",
  appId:             "1:551327111753:web:d98f33e573c1f1e73fbd98"
};

/* Identificador del pla. Si algun dia vols portar més d'una persona,
   fes servir un nom diferent per a cadascuna i duplica els aplicatius. */
const PLA_ID = "principal";
