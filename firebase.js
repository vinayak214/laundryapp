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
  apiKey: "AIzaSyBujCxGVyuRaE6O96JCJy1tAK3NYTExXGQ",
  authDomain: "laundry-app-e812e.firebaseapp.com",
  projectId: "laundry-app-e812e",
  storageBucket: "laundry-app-e812e.appspot.com",
  messagingSenderId: "539192491669",
  appId: "1:539192491669:web:e936abea1721c39fefe59c",
  measurementId: "G-944VENZV9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};