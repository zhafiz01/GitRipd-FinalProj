import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

/*if (import.meta.env.MODE === "development") {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
}*/