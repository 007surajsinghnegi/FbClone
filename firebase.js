import firebase from "firebase";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAmwbQSxdutIAqi3vef51tQVfV-XGp7XcE",
    authDomain: "facebookclone-c1be5.firebaseapp.com",
    projectId: "facebookclone-c1be5",
    storageBucket: "facebookclone-c1be5.appspot.com",
    messagingSenderId: "198790793898",
    appId: "1:198790793898:web:875628ba8d3515f3839ed3",
    measurementId: "G-T6TJGL45BX"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export  { db , storage };