// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {getAuth} from "firebase/auth"
import { getFirestore, } from 'firebase/firestore'
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxM0UokC-vaJRMcWIPLLZvKDj8k2f6rAE",
    authDomain: "recipe-app-4aeeb.firebaseapp.com",
    projectId: "recipe-app-4aeeb",
    storageBucket: "recipe-app-4aeeb.appspot.com",
    messagingSenderId: "99149166774",
    appId: import.meta.env.VITE_FIREBASE_API_KEY,
    measurementId: "G-QDXHGKGNV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const imageDB = getStorage(app)
export const db = getFirestore();
export const auth = getAuth(app)
