"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { setupAuthListener } from "@/lib/firebase-auth"

interface FirebaseContextType {
  user: User | null
  loading: boolean
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
})

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = setupAuthListener((firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <FirebaseContext.Provider value={{ user, loading }}>{children}</FirebaseContext.Provider>
}

export function useFirebase() {
  return useContext(FirebaseContext)
}
