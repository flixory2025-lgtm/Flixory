"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { AuthModal } from "@/components/auth-modal"
import { AdminPanel } from "@/components/admin-panel"

export default function Home() {
  const { user, loading, isAdmin } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isAdminLogin, setIsAdminLogin] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Flixory</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAdmin && user) {
    return <AdminPanel />
  }

  if (user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Render your main app here - import from read-only files */}
        <MainApp />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Flixory</h1>
        <p className="text-muted-foreground mb-8">Your favorite movie streaming platform</p>

        <div className="space-y-3">
          <button
            onClick={() => {
              setIsAdminLogin(false)
              setShowAuthModal(true)
            }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition"
          >
            Sign In
          </button>

          <button
            onClick={() => {
              setIsAdminLogin(true)
              setShowAuthModal(true)
            }}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 rounded-lg font-semibold transition"
          >
            Admin Login
          </button>
        </div>
      </div>

      {showAuthModal && <AuthModal isAdmin={isAdminLogin} onAuth={() => {}} onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}

function MainApp() {
  // This will render your main Flixory app
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">Welcome to Flixory!</h1>
      <p className="text-muted-foreground">Your movie collection is loading...</p>
    </div>
  )
}
