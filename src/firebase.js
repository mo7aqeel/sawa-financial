// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgSmFxc3YhpXKQBOSMoK_Loh8vMp2v2BI",
  authDomain: "sawa-financial.firebaseapp.com",
  databaseURL: "https://sawa-financial-default-rtdb.firebaseio.com",
  projectId: "sawa-financial",
  storageBucket: "sawa-financial.appspot.com",
  messagingSenderId: "508106384255",
  appId: "1:508106384255:web:7b998d8de088376772f04a",
  measurementId: "G-ZWV8N6PQCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const myDb = getDatabase(app);
export const auth = getAuth(app);