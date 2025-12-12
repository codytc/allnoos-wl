"use client"

import { Home, Plus, Bell, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const HeadBodyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {/* Head */}
    <circle cx="12" cy="7" r="4" />
    {/* Body */}
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
  </svg>
)

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", href: "/feed", active: pathname === "/feed" },
    { icon: Search, label: "Discover", href: "/wander", active: pathname === "/wander" },
    { icon: Plus, label: "Create", href: "/create", active: pathname === "/create" },
    { icon: Bell, label: "Notifications", href: "/notifications", active: pathname === "/notifications" },
    { icon: HeadBodyIcon, label: "Profile", href: "/profile", active: pathname.startsWith("/profile") },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center justify-center p-2 space-y-1 rounded-md transition-colors hover:bg-primary/10 ${
            item.active ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <item.icon className="h-6 w-6" />
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  )
}
