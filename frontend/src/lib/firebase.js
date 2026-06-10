import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBf86rqkcglYfci8ft5K3UdI7Ywed1zdaQ",
  authDomain: "ogedu-portal.firebaseapp.com",
  projectId: "ogedu-portal",
  storageBucket: "ogedu-portal.firebasestorage.app",
  messagingSenderId: "1014714267854",
  appId: "1:1014714267854:web:f256b3aecdd7631cedf89f",
  measurementId: "G-5VH59KWG14"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
