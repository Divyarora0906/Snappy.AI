import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ correct

const firebaseConfig = {
  apiKey: "AIzaSyCt5zjkaZoZn_F_ipBkiOtrOEXganlwwkg",
  authDomain: "snappy-ai-640d2.firebaseapp.com",
  projectId: "snappy-ai-640d2",
  storageBucket: "snappy-ai-640d2.firebasestorage.app",
  messagingSenderId: "1068228425969",
  appId: "1:1068228425969:web:d57ea3c457f93ff08a9150",
  measurementId: "G-V9X7J91P4G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();