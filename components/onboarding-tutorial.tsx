"use client"

import { useState, useEffect } from "react"
import { X, ArrowDown, ArrowRight, ArrowUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TutorialStep {
  id: string
  title: string
  description: string
  targetElement: string
  position: "top" | "bottom" | "left" | "right"
  action?: string
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "স্বাগতম FLIXORY তে!",
    description: "চলুন আপনাকে এই অ্যাপের সব ফিচার দেখিয়ে দেই। শুরু করতে 'পরবর্তী' বাটনে ক্লিক করুন।",
    targetElement: "",
    position: "bottom",
  },
  {
    id: "home",
    title: "হোম সেকশন",
    description: "এখানে আপনি সব নতুন এবং জনপ্রিয় মুভি দেখতে পাবেন। যেকোনো মুভিতে ক্লিক করে বিস্তারিত দেখুন।",
    targetElement: "home-tab",
    position: "top",
  },
  {
    id: "series",
    title: "সিরিজ সেকশন",
    description: "এখানে ক্লিক করে আপনি সব ওয়েব সিরিজ এবং টিভি শো দেখতে পারবেন।",
    targetElement: "series-tab",
    position: "top",
  },
  {
    id: "shorts",
    title: "শর্টস সেকশন",
    description: "এখানে ক্লিক করে ছোট ভিডিও ক্লিপ এবং শর্টস দেখুন। এখন এখানে ক্লিক করুন!",
    targetElement: "shorts-tab",
    position: "top",
    action: "click-shorts",
  },
  {
    id: "shorts-video",
    title: "ভিডিও দেখুন",
    description: "যেকোনো ভিডিওতে ক্লিক করে দেখা শুরু করুন। চলুন একটা ভিডিওতে ক্লিক করি!",
    targetElement: "shorts-content",
    position: "bottom",
    action: "wait-for-video-click",
  },
  {
    id: "scroll",
    title: "স্ক্রল করুন",
    description: "উপরে-নিচে স্ক্রল করে আরও কন্টেন্ট দেখুন। চেষ্টা করে দেখুন!",
    targetElement: "",
    position: "bottom",
    action: "wait-for-scroll",
  },
  {
    id: "profile",
    title: "প্রোফাইল সেকশন",
    description: "এখানে আপনার প্রোফাইল সেটিংস এবং যোগাযোগের তথ্য পাবেন।",
    targetElement: "profile-tab",
    position: "top",
  },
  {
    id: "complete",
    title: "সম্পন্ন!",
    description: "অভিনন্দন! আপনি এখন FLIXORY ব্যবহার করতে প্রস্তুত। উপভোগ করুন!",
    targetElement: "",
    position: "bottom",
  },
]

interface OnboardingTutorialProps {
  onComplete: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

export function OnboardingTutorial({ onComplete, activeTab, onTabChange }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [arrowPosition, setArrowPosition] = useState<"top" | "bottom" | "left" | "right">("bottom")
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasClickedVideo, setHasClickedVideo] = useState(false)

  const step = tutorialSteps[currentStep]

  useEffect(() => {
    // Mark tutorial as shown
    localStorage.setItem("flixory_tutorial_shown", "true")

    // Listen for scroll events
    const handleScroll = () => {
      if (step.action === "wait-for-scroll" && !hasScrolled) {
        setHasScrolled(true)
        setTimeout(() => {
          handleNext()
        }, 500)
      }
    }

    // Listen for video clicks
    const handleVideoClick = () => {
      if (step.action === "wait-for-video-click" && !hasClickedVideo) {
        setHasClickedVideo(true)
        setTimeout(() => {
          handleNext()
        }, 500)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("shorts-video-clicked", handleVideoClick)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("shorts-video-clicked", handleVideoClick)
    }
  }, [step, hasScrolled, hasClickedVideo])

  useEffect(() => {
    if (step.targetElement) {
      const element = document.querySelector(`[data-tutorial="${step.targetElement}"]`)
      if (element) {
        const rect = element.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        let top = 0
        let left = 0

        switch (step.position) {
          case "top":
            top = rect.top + scrollTop - 120
            left = rect.left + rect.width / 2
            setArrowPosition("bottom")
            break
          case "bottom":
            top = rect.bottom + scrollTop + 20
            left = rect.left + rect.width / 2
            setArrowPosition("top")
            break
          case "left":
            top = rect.top + scrollTop + rect.height / 2
            left = rect.left - 320
            setArrowPosition("right")
            break
          case "right":
            top = rect.top + scrollTop + rect.height / 2
            left = rect.right + 20
            setArrowPosition("left")
            break
        }

        setPosition({ top, left })

        // Highlight the element
        element.classList.add("tutorial-highlight")
        return () => {
          element.classList.remove("tutorial-highlight")
        }
      }
    } else {
      // Center the tooltip
      setPosition({
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2,
      })
      setArrowPosition("bottom")
    }
  }, [step, currentStep])

  useEffect(() => {
    // Handle automatic actions
    if (step.action === "click-shorts") {
      // Wait a bit before auto-clicking
      const timer = setTimeout(() => {
        onTabChange("shorts")
        setTimeout(() => {
          handleNext()
        }, 1000)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [step])

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setHasScrolled(false)
      setHasClickedVideo(false)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const getArrowIcon = () => {
    switch (arrowPosition) {
      case "top":
        return <ArrowUp className="w-6 h-6 text-primary animate-bounce" />
      case "bottom":
        return <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
      case "left":
        return <ArrowRight className="w-6 h-6 text-primary animate-bounce rotate-180" />
      case "right":
        return <ArrowRight className="w-6 h-6 text-primary animate-bounce" />
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" onClick={handleSkip} />

      {/* Tutorial Tooltip */}
      <div
        className="fixed z-[101] transform -translate-x-1/2"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        {/* Arrow */}
        <div
          className={`absolute ${
            arrowPosition === "top"
              ? "-top-8 left-1/2 -translate-x-1/2"
              : arrowPosition === "bottom"
                ? "-bottom-8 left-1/2 -translate-x-1/2"
                : arrowPosition === "left"
                  ? "left-0 top-1/2 -translate-y-1/2 -translate-x-8"
                  : "right-0 top-1/2 -translate-y-1/2 translate-x-8"
          }`}
        >
          {getArrowIcon()}
        </div>

        {/* Tooltip Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-primary rounded-xl p-6 max-w-sm shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {currentStep + 1}
              </div>
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
            </div>
            <button onClick={handleSkip} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">{step.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-primary" : index < currentStep ? "bg-green-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={handleSkip} className="text-gray-400">
                এড়িয়ে যান
              </Button>
              {step.action !== "wait-for-scroll" && step.action !== "wait-for-video-click" && (
                <Button size="sm" onClick={handleNext} className="bg-primary hover:bg-primary/90">
                  {currentStep === tutorialSteps.length - 1 ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      শেষ করুন
                    </>
                  ) : (
                    "পরবর্তী"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .tutorial-highlight {
          position: relative;
          z-index: 99;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          animation: pulse-highlight 2s infinite;
        }

        @keyframes pulse-highlight {
          0%,
          100% {
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.3), 0 0 30px rgba(239, 68, 68, 0.5);
          }
        }
      `}</style>
    </>
  )
}
