import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Sua configuração do Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAg28Ccc7vj7l06a4PUGDfCo_DvVBfjG-k",
  authDomain: "cineclipse-10c65.firebaseapp.com",
  projectId: "cineclipse-10c65",
  storageBucket: "cineclipse-10c65.appspot.com", // <-- CORRETO!
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
console.log(auth.currentUser);

// Exemplo de função para adicionar um filme
export async function adicionarFilme(dadosFilme) {
  await addDoc(collection(db, "filmes"), dadosFilme);
}

// Função para registrar usuário
export async function registrarUsuario(email, senha) {
  return await createUserWithEmailAndPassword(auth, email, senha);
}

// Função para login de usuário
export async function loginUsuario(email, senha) {
  return await signInWithEmailAndPassword(auth, email, senha);
}

