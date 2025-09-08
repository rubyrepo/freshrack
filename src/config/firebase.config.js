import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzU_RuTpDRS6D1A4IJ7PTdYZq6OO5ZJVY",
  authDomain: "freshrack-7dda3.firebaseapp.com",
  projectId: "freshrack-7dda3",
  storageBucket: "freshrack-7dda3.firebasestorage.app",
  messagingSenderId: "148156476207",
  appId: "1:148156476207:web:43b0263f0fc47767ee4fda"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);