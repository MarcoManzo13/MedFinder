import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

export default defineNuxtPlugin((nuxtApp) => {
  const db = getDatabase(nuxtApp.$firebaseApp);
  const modelsRef = ref(db, "https://console.firebase.google.com/u/0/project/medfinder-f8ae3/database/medfinder-f8ae3-default-rtdb/data/~2F?hl=es-419");

  return {
    provide: {
      db,
      modelsRef,
    },
  };
});