"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash2, Users, Shield, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ApprovedUser {
  id: string
  username: string
  deviceId?: string
  approvedAt: string
  isActive: boolean
}

export function AdminApproval() {
  const [approvedUsers, setApprovedUsers] = useState<ApprovedUser[]>([
    {
      id: "default-1",
      username: "abdul mazid",
      approvedAt: new Date().toISOString(),
      isActive: true,
    },
  ])
  const [newUsername, setNewUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Load approved users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem("flixory_approved_users")
    if (savedUsers) {
      const parsed = JSON.parse(savedUsers)
      const hasAbdulMazid = parsed.some((user: ApprovedUser) => user.username === "abdul mazid")
      if (!hasAbdulMazid) {
        parsed.unshift({
          id: "default-1",
          username: "abdul mazid",
          approvedAt: new Date().toISOString(),
          isActive: true,
        })
      }
      setApprovedUsers(parsed)
    }
  }, [])

  // Save approved users to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("flixory_approved_users", JSON.stringify(approvedUsers))
  }, [approvedUsers])

  const addUser = () => {
    if (!newUsername.trim()) return

    setIsLoading(true)

    const newUser: ApprovedUser = {
      id: Date.now().toString(),
      username: newUsername.trim(),
      approvedAt: new Date().toISOString(),
      isActive: true,
    }

    // Update state and localStorage immediately
    const updatedUsers = [...approvedUsers, newUser]
    setApprovedUsers(updatedUsers)

    // Force immediate localStorage save
    localStorage.setItem("flixory_approved_users", JSON.stringify(updatedUsers))

    // Trigger a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("userListUpdated", {
        detail: { users: updatedUsers },
      }),
    )

    setNewUsername("")
    setIsLoading(false)

    // Show success feedback
    console.log("[v0] User added successfully:", newUser.username)
  }

  const removeUser = (userId: string) => {
    if (userId === "default-1") {
      alert("Cannot remove default test user 'abdul mazid'")
      return
    }

    const updatedUsers = approvedUsers.filter((user) => user.id !== userId)
    setApprovedUsers(updatedUsers)

    // Force immediate localStorage save
    localStorage.setItem("flixory_approved_users", JSON.stringify(updatedUsers))

    // Trigger update event
    window.dispatchEvent(
      new CustomEvent("userListUpdated", {
        detail: { users: updatedUsers },
      }),
    )
  }

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = approvedUsers.map((user) =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user,
    )
    setApprovedUsers(updatedUsers)

    // Force immediate localStorage save
    localStorage.setItem("flixory_approved_users", JSON.stringify(updatedUsers))

    // Trigger update event
    window.dispatchEvent(
      new CustomEvent("userListUpdated", {
        detail: { users: updatedUsers },
      }),
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addUser()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold">Admin Approval System</h1>
        </div>
        <p className="text-sm text-gray-400 mt-1">Manage approved users for movie access</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Add New User */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add New User</span>
            </CardTitle>
            <CardDescription className="text-gray-400">Add username to approve for movie access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Button
                onClick={addUser}
                disabled={!newUsername.trim() || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-xl font-bold text-white">{approvedUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-xl font-bold text-white">{approvedUsers.filter((user) => user.isActive).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Approved Users List */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Approved Users</CardTitle>
            <CardDescription className="text-gray-400">Users who can access movies</CardDescription>
          </CardHeader>
          <CardContent>
            {approvedUsers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No approved users yet</p>
                <p className="text-sm text-gray-500">Add users above to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {approvedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{user.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.username}</p>
                        <p className="text-xs text-gray-400">Added: {new Date(user.approvedAt).toLocaleDateString()}</p>
                        {user.deviceId && (
                          <p className="text-xs text-gray-500">Device: {user.deviceId.slice(0, 8)}...</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={user.isActive ? "default" : "secondary"}
                        className={user.isActive ? "bg-green-600" : "bg-gray-600"}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleUserStatus(user.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        {user.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeUser(user.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Only approved users can play movies</li>
              <li>• Each user is limited to 1 device at a time</li>
              <li>• Users must enter their username to access content</li>
              <li>• Inactive users cannot play movies</li>
              <li>• Device binding prevents sharing accounts</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
