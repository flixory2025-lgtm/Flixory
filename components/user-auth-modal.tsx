"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Lock, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UserAuthModalProps {
  onAuth: (username: string) => void
  onClose: () => void
}

export function UserAuthModal({ onAuth, onClose }: UserAuthModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate authentication check
    setTimeout(() => {
      const approvedUsers = JSON.parse(localStorage.getItem("flixory_approved_users") || "[]")

      const user = approvedUsers.find((u: any) => u.username.toLowerCase() === username.toLowerCase() && u.isActive)

      if (user) {
        // Create session
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 24) // 24 hour session

        const authData = {
          username: username,
          expiresAt: expiresAt.toISOString(),
          loginTime: new Date().toISOString(),
        }

        localStorage.setItem("flixory_user_auth", JSON.stringify(authData))

        // Update user profile
        const profileData = {
          name: username,
          age: "",
          email: "",
          profilePic: "/user-profile-avatar.png",
        }
        localStorage.setItem("flixory_user_profile", JSON.stringify(profileData))

        onAuth(username)
      } else {
        setError("Username not approved or inactive. Please contact admin.")
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <Card className="bg-card border-border max-w-md w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground">Login Required</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <CardDescription className="text-muted-foreground">Please login to access movies and content</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password (Optional)
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                  placeholder="Enter password (if required)"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading || !username}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">Don't have access? Contact admin for approval.</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
