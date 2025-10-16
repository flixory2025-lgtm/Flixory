"use client"

import { Home, Play, Film, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "series", label: "Series", icon: Play },
    { id: "shorts", label: "Shorts", icon: Film },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              data-tutorial={`${tab.id}-tab`}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 py-2 px-4 ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
