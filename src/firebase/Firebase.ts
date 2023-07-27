import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDm_z2rB9bHRVlnbAPWWct-HSBfwGCFX0w",
    authDomain: "uploadimage-287c2.firebaseapp.com",
    projectId: "uploadimage-287c2",
    storageBucket: "uploadimage-287c2.appspot.com",
    messagingSenderId: "994943659490",
    appId: "1:994943659490:web:060c03201418027aa65dbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)