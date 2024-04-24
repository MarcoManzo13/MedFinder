import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCOrDVbD9P-du16kFrOrkt6z9RMQrXyQu4",
    authDomain: "medfinder-f8ae3.firebaseapp.com",
    databaseURL: "https://medfinder-f8ae3-default-rtdb.firebaseio.com",
    projectId: "medfinder-f8ae3",
    storageBucket: "medfinder-f8ae3.appspot.com",
    messagingSenderId: "332462642584",
    appId: "1:332462642584:web:2a4a604b528c7330ad87ed"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };