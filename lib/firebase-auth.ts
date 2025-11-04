let auth: any = null
let db: any = null

// Initialize Firebase modules dynamically
const initializeFirebaseModules = async () => {
  if (!auth) {
    try {
      const firebaseModule = await import("firebase/app")
      const authModule = await import("firebase/auth")
      const firestoreModule = await import("firebase/firestore")

      // Get the Firebase app instance
      const app = firebaseModule.initializeApp({
        apiKey: "AIzaSyAQB61QWus2fMNS5FNU4nLZCKnU5qONBY4",
        authDomain: "flixory-74271.firebaseapp.com",
        databaseURL: "https://flixory-74271-default-rtdb.firebaseio.com",
        projectId: "flixory-74271",
        storageBucket: "flixory-74271.firebasestorage.app",
        messagingSenderId: "292608615173",
        appId: "1:292608615173:web:30a2988703b506e4424d6c",
        measurementId: "G-8ZF9KF2BG3",
      })

      auth = authModule.getAuth(app)
      db = firestoreModule.getFirestore(app)
    } catch (error) {
      console.error("[v0] Firebase initialization error:", error)
    }
  }
  return { auth, db }
}

export interface UserProfile {
  uid: string
  username: string
  email: string
  name: string
  age: string
  profilePic: string
  isActive: boolean
  createdAt: string
  expiresAt?: string
}

// Sign up user
export const signUpUser = async (
  email: string,
  password: string,
  username: string,
  name: string,
): Promise<UserProfile> => {
  try {
    const { auth: authInstance, db: dbInstance } = await initializeFirebaseModules()
    const { createUserWithEmailAndPassword } = await import("firebase/auth")
    const { doc, setDoc } = await import("firebase/firestore")

    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password)
    const user = userCredential.user

    const userProfile: UserProfile = {
      uid: user.uid,
      username,
      email,
      name,
      age: "",
      profilePic: "/user-profile-avatar.png",
      isActive: false, // Admin needs to approve
      createdAt: new Date().toISOString(),
    }

    await setDoc(doc(dbInstance, "users", user.uid), userProfile)
    return userProfile
  } catch (error) {
    console.error("[v0] Sign up error:", error)
    throw error
  }
}

// Sign in user
export const signInUser = async (email: string, password: string) => {
  try {
    const { auth: authInstance } = await initializeFirebaseModules()
    const { signInWithEmailAndPassword } = await import("firebase/auth")

    const userCredential = await signInWithEmailAndPassword(authInstance, email, password)
    return userCredential.user
  } catch (error) {
    console.error("[v0] Sign in error:", error)
    throw error
  }
}

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const { db: dbInstance } = await initializeFirebaseModules()
    const { doc, getDoc } = await import("firebase/firestore")

    const docRef = doc(dbInstance, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("[v0] Get user profile error:", error)
    return null
  }
}

// Update user profile
export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const { db: dbInstance } = await initializeFirebaseModules()
    const { doc, setDoc } = await import("firebase/firestore")

    const docRef = doc(dbInstance, "users", uid)
    await setDoc(docRef, updates, { merge: true })
  } catch (error) {
    console.error("[v0] Update user profile error:", error)
    throw error
  }
}

// Get all approved users
export const getApprovedUsers = async (): Promise<UserProfile[]> => {
  try {
    const { db: dbInstance } = await initializeFirebaseModules()
    const { collection, query, where, getDocs } = await import("firebase/firestore")

    const q = query(collection(dbInstance, "users"), where("isActive", "==", true))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => doc.data() as UserProfile)
  } catch (error) {
    console.error("[v0] Get approved users error:", error)
    return []
  }
}

// Sign out user
export const signOutUser = async (): Promise<void> => {
  try {
    const { auth: authInstance } = await initializeFirebaseModules()
    const { signOut } = await import("firebase/auth")

    await signOut(authInstance)
  } catch (error) {
    console.error("[v0] Sign out error:", error)
    throw error
  }
}

// Set up auth state listener
export const setupAuthListener = (callback: (user: any) => void) => {
  initializeFirebaseModules().then(({ auth: authInstance }) => {
    if (authInstance) {
      import("firebase/auth").then(({ onAuthStateChanged }) => {
        onAuthStateChanged(authInstance, callback)
      })
    }
  })

  return () => {} // Return cleanup function
}
