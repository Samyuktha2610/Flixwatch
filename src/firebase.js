// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-BX5ufxIjDPNRn2cBS340xKgcA1uYXio",
  authDomain: "flixwatch-2950b.firebaseapp.com",
  projectId: "flixwatch-2950b",
  storageBucket: "flixwatch-2950b.appspot.com",
  messagingSenderId: "972547251844",
  appId: "1:972547251844:web:2646182880208abfbc6cd1",
  measurementId: "G-83HB08EN47"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
export const auth = getAuth(app); // Firebase Auth
export const googleProvider = new GoogleAuthProvider(); // Google OAuth
export const db = getFirestore(app); // Firestore DB
