"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SeriesSection } from "@/components/series-section"
import { ProfileSection } from "@/components/profile-section"
import { HomePage } from "@/components/home-page"
import { ShortsSection } from "@/components/shorts-section"
import { FirebaseUserAuthModal } from "@/components/firebase-user-auth-modal"
import { useFirebase } from "@/components/firebase-provider"

export default function MainApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  const { user, loading } = useFirebase()

  // Show auth modal if user is not authenticated and not loading
  const shouldShowAuth = !loading && !user && !isAuthenticated

  const handleAuth = (username: string) => {
    setCurrentUser(username)
    setIsAuthenticated(true)
    setShowAuthModal(false)
  }

  const renderActiveSection = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />
      case "series":
        return <SeriesSection />
      case "shorts":
        return <ShortsSection />
      case "profile":
        return <ProfileSection currentUser={currentUser} />
      default:
        return <HomePage />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {renderActiveSection()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {shouldShowAuth && (
        <FirebaseUserAuthModal
          onAuth={handleAuth}
          onClose={() => {
            // Optional: handle close without auth
          }}
        />
      )}
    </div>
  )
}
