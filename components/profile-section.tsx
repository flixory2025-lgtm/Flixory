"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Camera, Edit, Save, X, CheckCircle, Phone, Facebook, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UserProfile {
  name: string
  age: string
  email: string
  profilePic: string
}

export function ProfileSection() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "User Name",
    age: "",
    email: "",
    profilePic: "/user-profile-avatar.png",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile)
  const [currentUser, setCurrentUser] = useState<string>("")
  const [approvedUsers, setApprovedUsers] = useState<any[]>([])

  useEffect(() => {
    const savedProfile = localStorage.getItem("flixory_user_profile")
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile)
      setProfile(profileData)
      setTempProfile(profileData)
    }

    const savedAuth = localStorage.getItem("flixory_user_auth")
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      setCurrentUser(authData.username || "")
    }

    const handleUserListUpdate = (event: CustomEvent) => {
      console.log("[v0] User list updated in profile section")
      setApprovedUsers(event.detail.users)
    }

    const savedUsers = JSON.parse(localStorage.getItem("flixory_approved_users") || "[]")
    setApprovedUsers(savedUsers)

    window.addEventListener("userListUpdated", handleUserListUpdate as EventListener)

    return () => {
      window.removeEventListener("userListUpdated", handleUserListUpdate as EventListener)
    }
  }, [])

  const handleEdit = () => {
    setTempProfile(profile)
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfile(tempProfile)
    setIsEditing(false)
    localStorage.setItem("flixory_user_profile", JSON.stringify(tempProfile))

    if (tempProfile.name !== profile.name && tempProfile.name.trim()) {
      const authData = localStorage.getItem("flixory_user_auth")
      if (authData) {
        const auth = JSON.parse(authData)
        auth.username = tempProfile.name.trim()
        localStorage.setItem("flixory_user_auth", JSON.stringify(auth))
        setCurrentUser(tempProfile.name.trim())
      }
    }
  }

  const handleCancel = () => {
    setTempProfile(profile)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setTempProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setTempProfile((prev) => ({
          ...prev,
          profilePic: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Profile</h1>
        {!isEditing ? (
          <Button variant="ghost" size="icon" onClick={handleEdit} className="text-white hover:bg-gray-800">
            <Edit className="w-5 h-5" />
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={handleCancel} className="text-white hover:bg-gray-800">
              <X className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSave} className="text-green-500 hover:bg-gray-800">
              <Save className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        <Card className="bg-gray-900 border-gray-700 max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="relative mx-auto mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 mx-auto">
                <img
                  src={isEditing ? tempProfile.profilePic : profile.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-red-600 rounded-full p-2 cursor-pointer hover:bg-red-700">
                  <Camera className="w-4 h-4 text-white" />
                  <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
                </label>
              )}
            </div>
            <CardTitle className="text-white">{isEditing ? "Edit Profile" : profile.name}</CardTitle>
            <CardDescription className="text-gray-400">Manage your account information</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Name <span className="text-gray-500 text-xs">(Optional)</span>
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={tempProfile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Enter your name (optional)"
                />
              ) : (
                <div className="p-3 bg-gray-800 rounded-md text-gray-300">{profile.name || "Not set"}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-white">
                Age
              </Label>
              {isEditing ? (
                <Input
                  id="age"
                  type="number"
                  value={tempProfile.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Enter your age"
                />
              ) : (
                <div className="p-3 bg-gray-800 rounded-md text-gray-300">{profile.age || "Not set"}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Enter your email"
                />
              ) : (
                <div className="p-3 bg-gray-800 rounded-md text-gray-300">{profile.email || "Not set"}</div>
              )}
            </div>

            {isEditing && (
              <div className="pt-4">
                <Button onClick={handleSave} className="w-full bg-red-600 hover:bg-red-700">
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Profile Options */}
        <div className="mt-6 max-w-md mx-auto space-y-3">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Flixory Proxy Status</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">Fully Working</span>
                </div>
              </div>
              <p className="text-xs text-green-400 mt-2">All systems operational. Enjoy seamless streaming!</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Download Quality</span>
                <span className="text-gray-400 text-sm">HD</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Language</span>
                <span className="text-gray-400 text-sm">Bengali</span>
              </div>
            </CardContent>
          </Card>

          {currentUser && (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Current Session</span>
                  <span className="text-blue-400 text-sm">{currentUser}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Contact Us</CardTitle>
              <CardDescription className="text-gray-400">Get in touch with us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Manager Phone */}
              <a
                href="tel:01945715199"
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Manager</p>
                  <p className="text-gray-400 text-xs">01945715199</p>
                </div>
              </a>

              {/* Facebook Pages */}
              <a
                href="https://www.facebook.com/share/1WnQnBoNYk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Facebook Page 1</p>
                  <p className="text-gray-400 text-xs">Visit our page</p>
                </div>
              </a>

              <a
                href="https://www.facebook.com/share/174JXpBbRv/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Facebook Page 2</p>
                  <p className="text-gray-400 text-xs">Visit our page</p>
                </div>
              </a>

              {/* Facebook Groups */}
              <a
                href="https://www.facebook.com/groups/963258709145001/?ref=share&mibextid=NSMWBT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Private Request Group</p>
                  <p className="text-gray-400 text-xs">Join our private group</p>
                </div>
              </a>

              <a
                href="https://www.facebook.com/groups/733950559669339/?ref=share&mibextid=NSMWBT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Public Request Group</p>
                  <p className="text-gray-400 text-xs">Join our public group</p>
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@mvies.vrse.bd?lang=en-GB&is_from_webapp=1&sender_device=mobile&sender_web_id=7553157383032440328"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-600">
                  <span className="text-white text-lg">🎵</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">TikTok</p>
                  <p className="text-gray-400 text-xs">@mvies.vrse.bd</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/moviesverse.bd?igsh=YzljYTk1ODg3Zg=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Instagram</p>
                  <p className="text-gray-400 text-xs">@moviesverse.bd</p>
                </div>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/addlist/vXPR8-A8Qco1ODM9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Telegram Channels</p>
                  <p className="text-gray-400 text-xs">Join all our channels</p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
