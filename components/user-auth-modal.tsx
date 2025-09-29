"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Lock, AlertCircle, Smartphone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UserAuthModalProps {
  onAuth: (username: string) => void
  onClose: () => void
}

export function UserAuthModal({ onAuth, onClose }: UserAuthModalProps) {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<string>("")
  const [approvedUsers, setApprovedUsers] = useState<any[]>([])

  useEffect(() => {
    const generateDeviceFingerprint = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      ctx?.fillText("Device fingerprint", 2, 2)
      const canvasFingerprint = canvas.toDataURL()

      const deviceData = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screen: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        canvas: canvasFingerprint.slice(-50),
        timestamp: Date.now(),
      }

      return btoa(JSON.stringify(deviceData)).slice(0, 32)
    }

    setDeviceInfo(generateDeviceFingerprint())
  }, [])

  useEffect(() => {
    const handleUserListUpdate = (event: CustomEvent) => {
      console.log("[v0] User list updated, refreshing approved users")
      setApprovedUsers(event.detail.users)
    }

    const savedUsers = JSON.parse(localStorage.getItem("flixory_approved_users") || "[]")
    setApprovedUsers(savedUsers)

    window.addEventListener("userListUpdated", handleUserListUpdate as EventListener)

    return () => {
      window.removeEventListener("userListUpdated", handleUserListUpdate as EventListener)
    }
  }, [])

  useEffect(() => {
    const savedAuth = localStorage.getItem("flixory_user_auth")
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      if (authData.username && authData.deviceId) {
        if (authData.deviceFingerprint === deviceInfo) {
          onAuth(authData.username)
        } else {
          localStorage.removeItem("flixory_user_auth")
        }
      }
    }
  }, [onAuth, deviceInfo])

  const handleAuth = () => {
    if (!username.trim()) {
      setError("Please enter your username")
      return
    }

    setIsLoading(true)
    setError("")

    const user = approvedUsers.find((u: any) => u.username.toLowerCase() === username.toLowerCase() && u.isActive)

    if (!user) {
      setError("Username not approved or inactive. Please contact admin.")
      setIsLoading(false)
      return
    }

    const currentDeviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    if (user.deviceId && user.deviceFingerprint && user.deviceFingerprint !== deviceInfo) {
      const lastLogin = user.lastLoginTime ? new Date(user.lastLoginTime) : new Date(0)
      const now = new Date()
      const hoursSinceLogin = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60)

      if (hoursSinceLogin < 24) {
        setError("This account is already active on another device. Please wait 24 hours or contact admin.")
        setIsLoading(false)
        return
      }
    }

    const updatedUsers = approvedUsers.map((u: any) =>
      u.username.toLowerCase() === username.toLowerCase()
        ? {
            ...u,
            deviceId: currentDeviceId,
            deviceFingerprint: deviceInfo,
            lastLoginTime: new Date().toISOString(),
            deviceInfo: {
              userAgent: navigator.userAgent,
              platform: navigator.platform,
              language: navigator.language,
            },
          }
        : u,
    )
    localStorage.setItem("flixory_approved_users", JSON.stringify(updatedUsers))

    const authData = {
      username: username.trim(),
      deviceId: currentDeviceId,
      deviceFingerprint: deviceInfo,
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }
    localStorage.setItem("flixory_user_auth", JSON.stringify(authData))

    setIsLoading(false)
    onAuth(username.trim())
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAuth()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-700 max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-white text-xl">Access Required</CardTitle>
          <CardDescription className="text-gray-400">Enter your approved username to watch movies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 bg-gray-800 border-gray-600 text-white"
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleAuth}
              disabled={!username.trim() || isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Verifying..." : "Access Movies"}
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full text-gray-400 hover:text-white"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg space-y-2">
            <div className="flex items-center space-x-2 text-yellow-400 text-sm">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Device Restriction Active</span>
            </div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Only 1 device allowed per account</li>
              <li>• Sessions expire after 24 hours</li>
              <li>• Device switching requires admin approval</li>
            </ul>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
              <Smartphone className="w-3 h-3" />
              <span>Device ID: {deviceInfo.slice(0, 8)}...</span>
            </div>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              Only approved users can access movies. Contact admin if you need access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
