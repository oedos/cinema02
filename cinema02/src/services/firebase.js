// Exporta o Firestore para usar no resto do app
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ0UFz-PUQiKifHz8FUevwU1xVxZ9gBHA",
  authDomain: "stagpoint-b4b0b-d9654.firebaseapp.com",
  databaseURL: "https://stagpoint-b4b0b-d9654-default-rtdb.firebaseio.com",
  projectId: "stagpoint-b4b0b-d9654",
  storageBucket: "stagpoint-b4b0b-d9654.firebasestorage.app",
  messagingSenderId: "1071076897999",
  appId: "1:1071076897999:web:553f8ba917b296657eb3ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);