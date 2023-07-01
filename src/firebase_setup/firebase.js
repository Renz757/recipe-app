import { getDatabase } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO29N0o1Yw3w0Rv-OUGU7CrXITueTvOZc",
  authDomain: "recipe-app-4d9cf.firebaseapp.com",
  databaseURL: "https://recipe-app-4d9cf-default-rtdb.firebaseio.com",
  projectId: "recipe-app-4d9cf",
  storageBucket: "recipe-app-4d9cf.appspot.com",
  messagingSenderId: "122756964999",
  appId: import.meta.env.VITE_FIREBASE_API_KEY,
  measurementId: "G-KTXVN280J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase();