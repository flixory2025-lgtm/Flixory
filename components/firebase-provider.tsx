"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface FirebaseContextType {
  user: any | null
  loading: boolean
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
})

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setupListener = async () => {
      try {
        const { setupAuthListener } = await import("@/lib/firebase-auth")
        const unsubscribe = setupAuthListener((firebaseUser) => {
          setUser(firebaseUser)
          setLoading(false)
        })

        return unsubscribe
      } catch (error) {
        console.error("[v0] Firebase provider error:", error)
        setLoading(false)
      }
    }

    setupListener()
  }, [])

  return <FirebaseContext.Provider value={{ user, loading }}>{children}</FirebaseContext.Provider>
}

export function useFirebase() {
  return useContext(FirebaseContext)
}
