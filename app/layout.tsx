import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { Inter } from "next/font/google"
import { Urbanist } from "next/font/google"
import { Abel } from "next/font/google"

// Initialize fonts
const _abel = Abel({ subsets: ["latin"], weight: ["400"], variable: "--v0-font-abel" })
const _v0_fontVariables = `${_abel.variable}`

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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${urbanist.variable} antialiased`}>
      <head>
        <meta name="screen-orientation" content="portrait" />
        <meta name="x5-orientation" content="portrait" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media screen and (orientation: landscape) {
              html {
                transform: rotate(-90deg);
                transform-origin: left top;
                width: 100vh;
                height: 100vw;
                overflow-x: hidden;
                position: absolute;
                top: 100%;
                left: 0;
              }
            }
          `,
          }}
        />
      </head>
      <body className={_v0_fontVariables}>
        <div className="mx-auto max-w-sm min-h-screen bg-background">{children}</div>
      </body>
    </html>
  )
}
