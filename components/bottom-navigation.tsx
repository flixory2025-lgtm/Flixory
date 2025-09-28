"use client"
import { Home, Play, CreditCard, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "series", label: "Series", icon: Play },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 z-40">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 p-2 h-auto ${
                isActive ? "text-red-500" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-red-500" : ""}`} />
              <span className={`text-xs ${isActive ? "text-red-500" : ""}`}>{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
