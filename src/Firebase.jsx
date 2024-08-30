// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfjKPgldnxSKwCO5IAdNwPu1hUERgA1R0",
  authDomain: "blogpost-97c77.firebaseapp.com",
  projectId: "blogpost-97c77",
  storageBucket: "blogpost-97c77.appspot.com",
  messagingSenderId: "846559813014",
  appId: "1:846559813014:web:d3a70a2eac58b1700fd1b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)
// export default app;