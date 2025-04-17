import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "fitness-app-1b996",
  storageBucket: "fitness-app-1b996.firebasestorage.app",
  messagingSenderId: "541104998129",
  appId: "1:541104998129:web:267d3b2a41b00efdcc4b50",
  measurementId: "G-KFF4Q4ZGNK"
};

// Initialize Firebase
export const auth = initializeApp(firebaseConfig);
//export const auth = getAuth(app)