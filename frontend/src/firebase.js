// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBtryf7RAxYMLLnLjnURW-Pu5R83SY0Uk",
  authDomain: "womenempower-49f9a.firebaseapp.com",
  projectId: "womenempower-49f9a",
  storageBucket: "womenempower-49f9a.appspot.com",
  messagingSenderId: "764313753781",
  appId: "1:764313753781:web:46e2b2c413606e5d98c6fc",
  measurementId: "G-29WRSN3HSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const provider = new GoogleAuthProvider()

export {auth, provider}
