import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBf86rqkcglYfci8ft5K3UdI7Ywed1zdaQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ogedu-portal.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ogedu-portal",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ogedu-portal.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1014714267854",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1014714267854:web:f256b3aecdd7631cedf89f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5VH59KWG14"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
