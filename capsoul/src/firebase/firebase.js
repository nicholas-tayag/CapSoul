// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC0KSdKqSLdSFgdMt0-IpRMlp9GDDsOn8",
  authDomain: "capsoul-6e181.firebaseapp.com",
  projectId: "capsoul-6e181",
  storageBucket: "capsoul-6e181.appspot.com",
  messagingSenderId: "136060069387",
  appId: "1:136060069387:web:839673f85e233b2e15c90e",
  measurementId: "G-64QY9N9WE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };