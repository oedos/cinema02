import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Sua configuração do Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAg28Ccc7vj7l06a4PUGDfCo_DvVBfjG-k",
  authDomain: "cineclipse-10c65.firebaseapp.com",
  projectId: "cineclipse-10c65",
  storageBucket: "cineclipse-10c65.appspot.com", // Corrigido: precisa ter 'appspot.com'
  messagingSenderId: "785062891914",
  appId: "1:785062891914:web:2e49f255e726c869553873",
  measurementId: "G-HKYMJ63KRZ"
};

// Inicializa o Firebase App
const app = initializeApp(firebaseConfig);

// Inicializa e exporta o Firestore
export const db = getFirestore(app);

// Inicializa e exporta o Auth
export const auth = getAuth(app);