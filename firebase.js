// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUMrzxWjpxHUy_v9pQVdxMutKJ_ijxoDw",
  authDomain: "matching-pets.firebaseapp.com",
  projectId: "matching-pets",
  storageBucket: "matching-pets.appspot.com",
  messagingSenderId: "494797286177",
  appId: "1:494797286177:web:48002c21cdd2b2bf3a2c60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
