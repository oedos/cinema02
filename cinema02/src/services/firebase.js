import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
console.log(auth.currentUser);

// Exemplo de função para adicionar um filme
export async function adicionarFilme(dadosFilme) {
  await addDoc(collection(db, "filmes"), dadosFilme);
}

// Exemplo de função para upload de capa
export async function uploadCapa(file) {
  try {
    // Verifica se o arquivo existe
    if (!file) {
      throw new Error("Nenhum arquivo enviado para upload.");
    }
    // Verifica se é imagem
    if (!file.type || !file.type.startsWith("image/")) {
      throw new Error("Arquivo não é uma imagem.");
    }
    const storage = getStorage();
    const storageRef = ref(storage, `capas/${Date.now()}_${file.name}`);
    console.log("Tentando fazer upload:", file, "para", storageRef.fullPath);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url; // Retorna a URL para uso posterior
  } catch (err) {
    // Log detalhado para debug
    console.error("Erro ao fazer upload da capa:", err);
    throw err;
  }
}

// Função para registrar usuário
export async function registrarUsuario(email, senha) {
  return await createUserWithEmailAndPassword(auth, email, senha);
}

// Função para login de usuário
export async function loginUsuario(email, senha) {
  return await signInWithEmailAndPassword(auth, email, senha);
}

// Regras de CORS para o Firebase Storage
// export const corsConfig = [
//   {
//     "origin": ["*"],
//     "method": ["GET", "POST", "PUT", "DELETE"],
//     "maxAgeSeconds": 3600
//   }
// ];