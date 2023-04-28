// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2vEeWfoEikbpcrC8zNeUQePgfqiTWPSQ",
  authDomain: "youai-9e01d.firebaseapp.com",
  projectId: "youai-9e01d",
  storageBucket: "youai-9e01d.appspot.com",
  messagingSenderId: "121319034565",
  appId: "1:121319034565:web:f7ab07622899ab8a5feaac",
  measurementId: "G-M9QF8XH670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);