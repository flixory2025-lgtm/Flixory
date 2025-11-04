"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SeriesSection } from "@/components/series-section"
import { ProfileSection } from "@/components/profile-section"
import { HomePage } from "@/components/home-page"
import { ShortsSection } from "@/components/shorts-section"

export default function MainApp() {
  const [activeTab, setActiveTab] = useState("home")

  const renderActiveSection = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />
      case "series":
        return <SeriesSection />
      case "shorts":
        return <ShortsSection />
      case "profile":
        return <ProfileSection />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {renderActiveSection()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
