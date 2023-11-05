import { initializeApp } from "firebase/app";
import { getDoc, setDoc, doc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAfyAcETRnHPEcNphdghBpuQzyNEyz6WQ8",
  authDomain: "fitterk-23.firebaseapp.com",
  projectId: "fitterk-23",
  storageBucket: "fitterk-23.appspot.com",
  messagingSenderId: "207253210514",
  appId: "1:207253210514:web:c8a4572c5ccf6028992d4b"
});

// Initialize Firebase
export const db = getFirestore();
export const auth = getAuth(firebaseApp);


// Detect Auth State
onAuthStateChanged(auth, user => {
  if(user !== null) {
    console.log(`UserName: ${user.displayName}`)
  }else {
    console.log("No User")
  }
})
