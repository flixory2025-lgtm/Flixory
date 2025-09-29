"use client"

import { useState } from "react"
import { Check, Smartphone, Shield, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminApproval } from "@/components/admin-approval"

interface SubscriptionPlan {
  id: string
  name: string
  duration: string
  price: number
  features: string[]
  popular?: boolean
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    duration: "1 Month",
    price: 20,
    features: [
      "Watch all movies and series",
      "HD quality streaming",
      "1 device at a time",
      "Mobile and tablet support",
    ],
  },
  {
    id: "standard",
    name: "Standard Plan",
    duration: "3 Months",
    price: 50,
    popular: true,
    features: [
      "Watch all movies and series",
      "Full HD quality streaming",
      "2 devices at a time",
      "Mobile, tablet and TV support",
      "Download for offline viewing",
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    duration: "1 Year",
    price: 100,
    features: [
      "Watch all movies and series",
      "4K Ultra HD quality",
      "4 devices at a time",
      "All device support",
      "Download for offline viewing",
      "Early access to new releases",
    ],
  },
]

export function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setShowPayment(true)
  }

  const handleConfirmPayment = () => {
    setShowPayment(false)
    setShowConfirmation(true)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setSelectedPlan(null)
  }

  const handleAdminAccess = () => {
    if (adminPassword === "flixory2025") {
      setShowAdmin(true)
      setShowAdminLogin(false)
      setAdminPassword("")
    } else {
      alert("Incorrect password")
    }
  }

  const selectedPlanData = subscriptionPlans.find((plan) => plan.id === selectedPlan)

  if (showAdmin) {
    return <AdminApproval />
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-center flex-1">Subscription Plans</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAdminLogin(true)}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-white text-center flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Admin Access</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
                onKeyPress={(e) => e.key === "Enter" && handleAdminAccess()}
              />
              <div className="flex space-x-2">
                <Button onClick={handleAdminAccess} className="flex-1 bg-primary">
                  Access
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowAdminLogin(false)
                    setAdminPassword("")
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!showPayment && !showConfirmation && (
        <div className="p-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
            <p className="text-gray-400">Unlimited access to all movies and series</p>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`bg-gray-900 border-gray-700 cursor-pointer transition-all hover:bg-gray-800 ${
                  plan.popular ? "ring-2 ring-red-500" : ""
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{plan.name}</CardTitle>
                      <CardDescription className="text-gray-400">{plan.duration}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-500">৳{plan.price}</div>
                      {plan.popular && (
                        <div className="text-xs bg-red-500 text-white px-2 py-1 rounded-full mt-1">Most Popular</div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Select Plan</Button>
                </CardContent>
              </Card>
            ))}

            <div className="mt-8 pt-6 border-t border-gray-800">
              <Button
                onClick={() => setShowAdminLogin(true)}
                variant="outline"
                className="w-full bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Access
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">For administrators only</p>
            </div>
          </div>
        </div>
      )}

      {showPayment && selectedPlanData && (
        <div className="p-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Payment Details</h2>
              <p className="text-gray-400">
                {selectedPlanData.name} - ৳{selectedPlanData.price}
              </p>
            </div>

            <div className="space-y-4">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center space-x-2">
                    <Smartphone className="w-5 h-5" />
                    <span>Mobile Payment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-pink-900/20 border border-pink-500 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">bK</span>
                      </div>
                      <span className="font-medium">bKash</span>
                    </div>
                    <p className="text-sm text-gray-300">Number: 01865522275</p>
                  </div>

                  <div className="p-4 bg-orange-900/20 border border-orange-500 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">N</span>
                      </div>
                      <span className="font-medium">Nagad</span>
                    </div>
                    <p className="text-sm text-gray-300">Number: 01610916777</p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Payment Instructions:</h4>
                    <ol className="text-sm text-gray-300 space-y-1">
                      <li>1. Send ৳{selectedPlanData.price} to any of the above numbers</li>
                      <li>2. Take a screenshot of the payment confirmation</li>
                      <li>3. Click "Confirmed" button below</li>
                      <li>4. Send the screenshot to WhatsApp for activation</li>
                    </ol>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleConfirmPayment}>
                    Confirmed Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-white text-center">পেমেন্ট নিশ্চিতকরণ</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <p className="text-gray-300">
                আপনি যদি পেমেন্ট সম্পন্ন করে থাকেন, তাহলে পেমেন্টের স্ক্রিনশট নিচের WhatsApp নম্বরে পাঠান।
              </p>
              <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                <p className="text-green-400 font-medium">WhatsApp: +880 1610916777</p>
              </div>
              <p className="text-sm text-gray-400">
                স্ক্রিনশট পাঠানোর পর আপনার প্ল্যান {selectedPlanData?.duration} এর জন্য সক্রিয় হবে।
              </p>
              <Button className="w-full bg-gray-700 hover:bg-gray-600" onClick={handleCloseConfirmation}>
                বুঝেছি
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
