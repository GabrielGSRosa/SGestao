// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6ztnpyooo6OhNBEq6axBKqWNdwdkcggE",
  authDomain: "curso-f8b79.firebaseapp.com",
  projectId: "curso-f8b79",
  storageBucket: "curso-f8b79.firebasestorage.app",
  messagingSenderId: "879537226517",
  appId: "1:879537226517:web:ef8c17cee81f136f4d5f1c",
  measurementId: "G-0HDZ9525ZB"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)