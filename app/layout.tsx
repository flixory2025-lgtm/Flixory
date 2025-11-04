import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { FirebaseProvider } from "@/components/firebase-provider"

const _geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FLIXORY",
  description: "a streaming movie platform",
  generator: "v0 Dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`font-sans antialiased`}>
        <FirebaseProvider>{children}</FirebaseProvider>
        <Analytics />
      </body>
    </html>
  )
}
