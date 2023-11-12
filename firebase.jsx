import { initializeApp } from "firebase/app";
import { getDoc, setDoc, doc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseApp = initializeApp({
  apiKey: "NEXT_PUBLIC_API_KEY",
  authDomain: "fitterk-23.firebaseapp.com",
  projectId: "fitterk-23",
  storageBucket: "fitterk-23.appspot.com",
  messagingSenderId: "207253210514",
  appId: "1:207253210514:web:c8a4572c5ccf6028992d4b"
});

// Initialize Firebase
export const db = getFirestore();
export const auth = getAuth(firebaseApp);



