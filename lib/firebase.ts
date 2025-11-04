import { initializeApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAQB61QWus2fMNS5FNU4nLZCKnU5qONBY4",
  authDomain: "flixory-74271.firebaseapp.com",
  databaseURL: "https://flixory-74271-default-rtdb.firebaseio.com",
  projectId: "flixory-74271",
  storageBucket: "flixory-74271.firebasestorage.app",
  messagingSenderId: "292608615173",
  appId: "1:292608615173:web:30a2988703b506e4424d6c",
  measurementId: "G-8ZF9KF2BG3",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)

export default app
