import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAQB61QWus2fMNS5FNU4nLZCKnU5qONBY4",
  authDomain: "flixory-74271.firebaseapp.com",
  projectId: "flixory-74271",
  storageBucket: "flixory-74271.firebasestorage.app",
  messagingSenderId: "292608615173",
  appId: "1:292608615173:web:30a2988703b506e4424d6c",
  measurementId: "G-8ZF9KF2BG3",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
