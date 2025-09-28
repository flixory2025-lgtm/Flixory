"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Edit, Save, X } from "lucide-react"
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

  const handleEdit = () => {
    setTempProfile(profile)
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfile(tempProfile)
    setIsEditing(false)
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
                Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={tempProfile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Enter your name"
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
                <span className="text-white">Subscription Status</span>
                <span className="text-green-500 text-sm">Active</span>
              </div>
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
        </div>
      </div>
    </div>
  )
}
