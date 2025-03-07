// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs, updateDoc, doc,setDoc, onSnapshot, serverTimestamp, addDoc, orderBy, where, query, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLd1d1r2fTAkIrnkxW5CJVOUryHXyb-dM",
  authDomain: "ipo-listing.firebaseapp.com",
  projectId: "ipo-listing",
  storageBucket: "ipo-listing.firebasestorage.app",
  messagingSenderId: "81704622004",
  appId: "1:81704622004:web:26478dff21ae14d71cc4e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, getDoc,getDocs ,updateDoc,doc,setDoc,onSnapshot, serverTimestamp, addDoc, orderBy, where, query};
