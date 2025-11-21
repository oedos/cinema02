// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg28Ccc7vj7l06a4PUGDfCo_DvVBfjG-k",
  authDomain: "cineclipse-10c65.firebaseapp.com",
  projectId: "cineclipse-10c65",
  storageBucket: "cineclipse-10c65.firebasestorage.app",
  messagingSenderId: "785062891914",
  appId: "1:785062891914:web:2e49f255e726c869553873",
  measurementId: "G-HKYMJ63KRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);