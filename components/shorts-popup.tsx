"use client"

import { X, Play, Search } from "lucide-react"

interface ShortsPopupProps {
  movieTitle: string
  telegramLink: string
  onClose: () => void
}

export function ShortsPopup({ movieTitle, telegramLink, onClose }: ShortsPopupProps) {
  const handleTelegramWatch = () => {
    window.open(telegramLink, "_blank")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with emoji */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <div className="text-6xl mb-3">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-1">ফুল মুভি দেখুন</h2>
          <p className="text-white/90 text-sm font-medium">{movieTitle}</p>
        </div>

        {/* Message content */}
        <div className="p-6 space-y-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-white/90 text-sm leading-relaxed text-center">
              <span className="inline-block mr-1">✨</span>
              এই মুভি ক্লিপসটি আপনার যদি ভালো লেগে থাকে, ফুল মুভি বা সিরিজটি আপনি এক ক্লিকের মাধ্যমেই দেখতে পারেন।
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2 text-white/80 text-sm">
              <span className="text-lg">📱</span>
              <p className="leading-relaxed">
                টেলিগ্রাম থেকে দেখতে চাইলে <span className="text-blue-400 font-semibold">'Watch on Telegram'</span> এ ক্লিক
                করুন
              </p>
            </div>

            <div className="flex items-start space-x-2 text-white/80 text-sm">
              <span className="text-lg">🔍</span>
              <p className="leading-relaxed">
                সরাসরি এখানে দেখতে চাইলে আমাদের হোম পেজ বা সিরিজ পেজে গিয়ে সার্চ করুন। মুভি বা সিরিজের নাম এখানেই দেওয়া আছে
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleTelegramWatch}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              <span>Watch on Telegram</span>
            </button>

            <button
              onClick={onClose}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              <span>Search on Website</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
