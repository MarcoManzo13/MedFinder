// DEJA ESTO AQUÍ, SI LO QUITAS SE ROMPE TODO

import { getDatabase, ref, onValue } from "firebase/database"

export default defineNuxtPlugin((nuxtApp) => {
    const db = getDatabase(nuxtApp.$firebaseApp);
    const ledRef = ref(db, 'led/')
    onValue(ledRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
    
}); 