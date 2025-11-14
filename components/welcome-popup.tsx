'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WelcomePopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl md:text-2xl font-bold text-primary">স্বাগতম</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">FLIXORY PROXY STREAMING PLATFORM</h3>
            <p className="text-foreground leading-relaxed text-sm md:text-base mb-4">
              আপনাকে FLIXORY PROXY STREAMING PLATFORM এ স্বাগতম। এখানে আমাদের মুভি কালেকশন খুবই কম। তাই যদি তুমি কোনো মুভি এখান থেকে দেখতে চাও তুমি আমাদের MoviesVerseBD র মুভি রিকোয়েস্ট গ্রুপে গিয়ে বলবে। তাহলে admin রা অতিদ্রুত সেই মুভিটা এখানে add করে দেবে।
            </p>
          </div>

          {/* Call to Action */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              আপনার চাওয়া মুভি রিকোয়েস্ট করতে নিচের লিঙ্কে যান:
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.facebook.com/groups/733950559669339/?ref=share&mibextid=NSMWBT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Facebook Group
                </Button>
              </a>
              <a
                href="https://t.me/moviesversebdreq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center"
              >
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Telegram
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/50">
          <Button
            onClick={onClose}
            className="w-full"
            variant="default"
          >
            বন্ধ করুন
          </Button>
        </div>
      </div>
    </div>
  )
}
