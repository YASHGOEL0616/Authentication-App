// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyClF5plt2rYWdGKMeJzzvcNrCkvXKjfBG0",
  authDomain: "authapp-2a0d1.firebaseapp.com",
  databaseURL:
    "https://authapp-2a0d1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "authapp-2a0d1",
  storageBucket: "authapp-2a0d1.appspot.com",
  messagingSenderId: "863046845176",
  appId: "1:863046845176:web:6dfa4171817bcc3daab10d",
  measurementId: "G-MB8LGBLS71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
