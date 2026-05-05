import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { Inter, Urbanist } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
})

export const metadata: Metadata = {
  title: "allnoos - News Stories",
  description: "TikTok-style app for independent journalists to share news stories",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${urbanist.variable} antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <div className="mx-auto max-w-sm min-h-screen bg-background" style={{ position: 'relative' }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
