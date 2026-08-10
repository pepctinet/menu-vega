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

/* Identificador del pla dins de la base de dades.

   ARA MATEIX: "proves". Tot el que registris aquests dies va a un
   calaix separat i no embruta res.

   EL DIA QUE HO POSEU OPERATIU cal canviar dues coses i tot arrenca
   de zero a tots els aparells alhora, sense esborrar res a mà:
     1. aquí:      PLA_ID  = "principal"
     2. a core.js: const KEY = "menuvega_v3"   (ara és v2)
   La primera buida el servidor; la segona, els aparells. */
const PLA_ID = "proves";
