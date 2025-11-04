import { auth, db } from "./firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore"

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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
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

    await setDoc(doc(db, "users", user.uid), userProfile)
    return userProfile
  } catch (error) {
    console.error("[v0] Sign up error:", error)
    throw error
  }
}

// Sign in user
export const signInUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("[v0] Sign in error:", error)
    throw error
  }
}

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", uid)
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
    const docRef = doc(db, "users", uid)
    await setDoc(docRef, updates, { merge: true })
  } catch (error) {
    console.error("[v0] Update user profile error:", error)
    throw error
  }
}

// Get all approved users
export const getApprovedUsers = async (): Promise<UserProfile[]> => {
  try {
    const q = query(collection(db, "users"), where("isActive", "==", true))
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
    await signOut(auth)
  } catch (error) {
    console.error("[v0] Sign out error:", error)
    throw error
  }
}

// Set up auth state listener
export const setupAuthListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}
