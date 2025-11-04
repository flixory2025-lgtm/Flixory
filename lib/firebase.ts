let app: any = null
let auth: any = null
let db: any = null
let storage: any = null

try {
  const { initializeApp } = require("firebase/app")
  const { getAuth } = require("firebase/auth")
  const { getFirestore } = require("firebase/firestore")
  const { getStorage } = require("firebase/storage")

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
  app = initializeApp(firebaseConfig)

  // Initialize Firebase services
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
} catch (error) {
  console.log("[v0] Firebase initialization will happen on client-side")
}

export { app, auth, db, storage }
export default app
