import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBLTAvvIxQNF5cir7_g-_Tf3tsfdzSRg0A",
  authDomain: "na-zmrzku-web.firebaseapp.com",
  projectId: "na-zmrzku-web",
  storageBucket: "na-zmrzku-web.firebasestorage.app",
  messagingSenderId: "693651939405",
  appId: "1:693651939405:web:36760f8a4209688d127c04"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, getDoc, setDoc }
