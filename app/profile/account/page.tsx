"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlusIcon, MinusIcon, PiggyBankIcon, Eye, EyeOff, Send } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AllnoosLogo from "@/components/allnoos-logo"

// Mock bank data
const mockPinBidComments = [
  {
    id: 1,
    storyTitle: "Climate Summit Reaches Historic Agreement",
    follower: {
      name: "Sarah Chen",
      avatar: "/female-journalist.png",
    },
    comment:
      "This is groundbreaking news! The implications for global climate policy are enormous. Finally seeing real commitment from world leaders.",
    bidAmount: 12.5,
    timestamp: "2h ago",
  },
  {
    id: 2,
    storyTitle: "Tech Giants Face New Regulations",
    follower: {
      name: "Marcus Johnson",
      avatar: "/male-journalist.png",
    },
    comment:
      "About time! These regulations are long overdue. The tech industry needs more accountability and transparency in their operations.",
    bidAmount: 8.75,
    timestamp: "4h ago",
  },
  {
    id: 3,
    storyTitle: "Breakthrough in Renewable Energy Storage",
    follower: {
      name: "Dr. Emily Rodriguez",
      avatar: "/professional-woman-headshot.png",
    },
    comment:
      "As a researcher in this field, I can confirm this is a major advancement. The efficiency gains are remarkable and could revolutionize the industry.",
    bidAmount: 15.0,
    timestamp: "6h ago",
  },
  {
    id: 4,
    storyTitle: "Global Markets React to Economic Policy",
    follower: {
      name: "Alex Rivera",
      avatar: "/male-journalist.png",
    },
    comment:
      "Fascinating analysis of the market dynamics. The ripple effects across different sectors are worth watching closely in the coming weeks.",
    bidAmount: 10.25,
    timestamp: "8h ago",
  },
]

const mockTransactions = [
  {
    id: 1,
    date: "2025-01-15",
    type: "deposit",
    description: "Bank Deposit",
    amount: 50.0,
    year: "2025",
    category: "bank",
  },
  {
    id: 2,
    date: "2025-01-14",
    type: "deposit",
    description: "Weekly Change",
    amount: 125.5,
    year: "2025",
    category: "bank",
  },
  {
    id: 3,
    date: "2025-01-10",
    type: "withdrawal",
    description: "Bank Withdrawal",
    amount: 100.0,
    year: "2025",
    category: "bank",
  },
  {
    id: 4,
    date: "2025-01-07",
    type: "deposit",
    description: "Weekly Change",
    amount: 87.25,
    year: "2025",
    category: "bank",
  },
  {
    id: 5,
    date: "2025-01-03",
    type: "deposit",
    description: "Bank Deposit",
    amount: 200.0,
    year: "2025",
    category: "bank",
  },
  {
    id: 6,
    date: "2024-12-31",
    type: "deposit",
    description: "Weekly Change",
    amount: 156.75,
    year: "2024",
    category: "bank",
  },
  {
    id: 7,
    date: "2024-12-28",
    type: "withdrawal",
    description: "Bank Withdrawal",
    amount: 150.0,
    year: "2024",
    category: "bank",
  },
  {
    id: 8,
    date: "2024-12-24",
    type: "deposit",
    description: "Weekly Change",
    amount: 92.5,
    year: "2024",
    category: "bank",
  },
  {
    id: 9,
    date: "2024-12-20",
    type: "deposit",
    description: "Bank Deposit",
    amount: 75.0,
    year: "2024",
    category: "bank",
  },
  {
    id: 10,
    date: "2024-12-17",
    type: "deposit",
    description: "Weekly Change",
    amount: 143.25,
    year: "2024",
    category: "bank",
  },
  {
    id: 11,
    date: "2024-12-10",
    type: "withdrawal",
    description: "Bank Withdrawal",
    amount: 200.0,
    year: "2024",
    category: "bank",
  },
  {
    id: 12,
    date: "2024-12-03",
    type: "deposit",
    description: "Weekly Change",
    amount: 118.0,
    year: "2024",
    category: "bank",
  },
]

// Mock transactions with income/expense types for period calculations
const transactions = [
  {
    id: 1,
    date: new Date().toISOString().split("T")[0],
    type: "income",
    description: "Pins Earned Today",
    amount: 25.5,
    category: "pins",
  },
  {
    id: 2,
    date: new Date().toISOString().split("T")[0],
    type: "income",
    description: "Recommendation Revenue",
    amount: 45.0,
    category: "recommendations",
  },
  {
    id: 3,
    date: new Date().toISOString().split("T")[0],
    type: "expense",
    description: "Featured Story",
    amount: 15.0,
    category: "featured",
  },
  {
    id: 4,
    date: new Date().toISOString().split("T")[0],
    type: "income",
    description: "Story Credits",
    amount: 60.0,
    category: "credits",
  },

  {
    id: 5,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Pins Earned",
    amount: 30.75,
    category: "pins",
  },
  {
    id: 6,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Commercial Revenue",
    amount: 150.0,
    category: "commercials",
  },
  {
    id: 7,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Pin Comment Bid",
    amount: 12.5,
    category: "pins",
  },
  {
    id: 8,
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Recommendations",
    amount: 55.25,
    category: "recommendations",
  },
  {
    id: 9,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Platform Rewards",
    amount: 40.0,
    category: "rewards",
  },
  {
    id: 10,
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Story Promotion",
    amount: 20.0,
    category: "recommendations",
  },

  {
    id: 11,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Pins Revenue",
    amount: 48.5,
    category: "pins",
  },
  {
    id: 12,
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Story Credits",
    amount: 95.0,
    category: "credits",
  },
  {
    id: 13,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Commercial Partnership",
    amount: 200.0,
    category: "commercials",
  },
  {
    id: 14,
    date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Featured Placement",
    amount: 35.0,
    category: "featured",
  },
  {
    id: 15,
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Recommendation Earnings",
    amount: 72.8,
    category: "recommendations",
  },
  {
    id: 16,
    date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Pin Bid",
    amount: 18.25,
    category: "pins",
  },
  {
    id: 17,
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Achievement Reward",
    amount: 50.0,
    category: "rewards",
  },
  {
    id: 18,
    date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Story Credits Bonus",
    amount: 110.0,
    category: "credits",
  },

  {
    id: 19,
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Pins Revenue",
    amount: 65.0,
    category: "pins",
  },
  {
    id: 20,
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Commercial Deal",
    amount: 300.0,
    category: "commercials",
  },
  {
    id: 21,
    date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Recommendations",
    amount: 88.5,
    category: "recommendations",
  },
  {
    id: 22,
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Featured Story Boost",
    amount: 45.0,
    category: "featured",
  },
  {
    id: 23,
    date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Story Credits",
    amount: 125.0,
    category: "credits",
  },
  {
    id: 24,
    date: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Platform Rewards",
    amount: 75.0,
    category: "rewards",
  },
  {
    id: 25,
    date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Promoted Content",
    amount: 28.0,
    category: "recommendations",
  },
  {
    id: 26,
    date: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Pins Earnings",
    amount: 52.75,
    category: "pins",
  },
  {
    id: 27,
    date: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Commercial Revenue",
    amount: 180.0,
    category: "commercials",
  },
  {
    id: 28,
    date: new Date(Date.now() - 270 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Story Credits",
    amount: 98.0,
    category: "credits",
  },
  {
    id: 29,
    date: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Featured Placement",
    amount: 32.5,
    category: "featured",
  },
  {
    id: 30,
    date: new Date(Date.now() - 330 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Recommendations",
    amount: 67.25,
    category: "recommendations",
  },

  {
    id: 31,
    date: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Pins Revenue",
    amount: 85.0,
    category: "pins",
  },
  {
    id: 32,
    date: new Date(Date.now() - 450 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Commercial Partnership",
    amount: 250.0,
    category: "commercials",
  },
  {
    id: 33,
    date: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Story Credits",
    amount: 140.0,
    category: "credits",
  },
  {
    id: 34,
    date: new Date(Date.now() - 550 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Recommendations",
    amount: 95.5,
    category: "recommendations",
  },
  {
    id: 35,
    date: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Platform Rewards",
    amount: 100.0,
    category: "rewards",
  },
  {
    id: 36,
    date: new Date(Date.now() - 650 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Featured Story",
    amount: 40.0,
    category: "featured",
  },
  {
    id: 37,
    date: new Date(Date.now() - 700 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Pins Earnings",
    amount: 72.5,
    category: "pins",
  },
  {
    id: 38,
    date: new Date(Date.now() - 750 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Pin Bid",
    amount: 22.0,
    category: "pins",
  },

  {
    id: 39,
    date: new Date().toISOString().split("T")[0],
    type: "income",
    description: "Bank Deposit",
    amount: 100.0,
    category: "bank",
  },
  {
    id: 40,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
    description: "Weekly Change",
    amount: 125.5,
    category: "bank",
  },
  {
    id: 41,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
    description: "Bank Withdrawal",
    amount: 75.0,
    category: "bank",
  },
]

export default function BankPage() {
  const router = useRouter()

  const [addMoneyAmount, setAddMoneyAmount] = useState("")
  const [withdrawMoneyAmount, setWithdrawMoneyAmount] = useState("")
  const [showWithdrawMoneyModal, setShowWithdrawMoneyModal] = useState(false)
  const [commentPinBid, setCommentPinBid] = useState("")
  const [recommendationBid, setRecommendationBid] = useState("")
  const [storyBidCredits, setStoryBidCredits] = useState("")
  const [similarStoriesBid, setSimilarStoriesBid] = useState("")
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)

  const [showBankInfoPanel, setShowBankInfoPanel] = useState(false)
  const [editingBankName, setEditingBankName] = useState(false)
  const [editingAccountNumber, setEditingAccountNumber] = useState(false)
  const [editingRoutingNumber, setEditingRoutingNumber] = useState(false)
  const [editingAccountHolderName, setEditingAccountHolderName] = useState(false)

  const [showFullAccountNumber, setShowFullAccountNumber] = useState(false)
  const [showFullRoutingNumber, setShowFullRoutingNumber] = useState(false)

  // Bank information (encrypted/masked by default)
  const [bankName, setBankName] = useState("Chase Bank")
  const [accountNumber, setAccountNumber] = useState("123456789012")
  const [routingNumber, setRoutingNumber] = useState("021000021")
  const [accountHolderName, setAccountHolderName] = useState("John Doe")

  // Temporary editing values
  const [tempBankName, setTempBankName] = useState("")
  const [tempAccountNumber, setTempAccountNumber] = useState("")
  const [tempRoutingNumber, setTempRoutingNumber] = useState("")
  const [tempAccountHolderName, setTempAccountHolderName] = useState("")

  const [bankNameError, setBankNameError] = useState("")
  const [accountNumberError, setAccountNumberError] = useState("")
  const [routingNumberError, setRoutingNumberError] = useState("")
  const [accountHolderNameError, setAccountHolderNameError] = useState("")

  const [editingCommentPin, setEditingCommentPin] = useState(false)
  const [editingRecommendation, setEditingRecommendation] = useState(false)
  const [editingStoryCredits, setEditingStoryCredits] = useState(false)
  const [editingSimilarStories, setEditingSimilarStories] = useState(false)

  const [showPinBidsInfo, setShowPinBidsInfo] = useState(false)
  const [showRecommendationInfo, setShowRecommendationInfo] = useState(false)
  const [showStoryCreditsInfo, setShowStoryCreditsInfo] = useState(false)
  const [showSimilarStoriesInfo, setShowSimilarStoriesInfo] = useState(false)
  const [showSummaryInfo, setShowSummaryInfo] = useState<string | null>(null)

  const [tempCommentPinBalance, setTempCommentPinBalance] = useState("")
  const [tempRecommendationBalance, setTempRecommendationBalance] = useState("")
  const [tempStoryCreditsBalance, setTempStoryCreditsBalance] = useState("")
  const [tempSimilarStoriesBalance, setTempSimilarStoriesBalance] = useState("")

  const [accountBalance, setAccountBalance] = useState(1234.56)
  const [pendingAmount, setPendingAmount] = useState(0)
  const [commentPinBalance, setCommentPinBalance] = useState(50.0)
  const [recommendationBalance, setRecommendationBalance] = useState(75.0)
  const [storyCreditsBalance, setStoryCreditsBalance] = useState(100.0)
  const [similarStoriesBalance, setSimilarStoriesBalance] = useState(25.0)

  const [touchedPinBid, setTouchedPinBid] = useState<number | null>(null)

  const [dateRange, setDateRange] = useState("7days")
  const [summaryTimeframe, setSummaryTimeframe] = useState("MONTH")

  const [showTransactionHistory, setShowTransactionHistory] = useState(false)
  const [transactionYear, setTransactionYear] = useState("2025")

  const filteredTransactions = mockTransactions.filter((t) => t.year === transactionYear)

  const availableYears = Array.from(new Set(mockTransactions.map((t) => t.year)))
    .sort()
    .reverse()

  const totalDeposits = filteredTransactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0)

  const totalWithdrawals = filteredTransactions
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0)

  const getMondayOfWeek = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    return new Date(date.getFullYear(), date.getMonth(), diff)
  }

  const getDateRange = (startDate: Date, endDate: Date) => {
    const format = (date: Date) => {
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const year = String(date.getFullYear()).slice(-2)
      return `${month}/${day}/${year}`
    }
    return `${format(startDate)} - ${format(endDate)}`
  }

  const calculatePeriodTotals = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Daily Total (today)
    const dailyTotal = transactions
      .filter((t) => {
        const tDate = new Date(t.date)
        return tDate.toDateString() === today.toDateString()
      })
      .reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0)

    // Weekly Total (Monday to today)
    const weekStart = getMondayOfWeek(today)
    const weeklyTotal = transactions
      .filter((t) => {
        const tDate = new Date(t.date)
        return tDate >= weekStart && tDate <= today
      })
      .reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0)

    // Monthly Total (first of month to today)
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    const monthlyTotal = transactions
      .filter((t) => {
        const tDate = new Date(t.date)
        return tDate >= monthStart && tDate <= today
      })
      .reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0)

    // Yearly Total (first of year to today)
    const yearStart = new Date(today.getFullYear(), 0, 1)
    const yearlyTotal = transactions
      .filter((t) => {
        const tDate = new Date(t.date)
        return tDate >= yearStart && tDate <= today
      })
      .reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0)

    // Career Total (all time)
    const careerTotal = transactions.reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0)

    const oldestTransaction =
      transactions.length > 0 ? new Date(Math.min(...transactions.map((t) => new Date(t.date).getTime()))) : today

    return {
      daily: { total: dailyTotal },
      weekly: { total: weeklyTotal, range: getDateRange(weekStart, today) },
      monthly: { total: monthlyTotal, range: getDateRange(monthStart, today) },
      yearly: { total: yearlyTotal, range: getDateRange(yearStart, today) },
      career: { total: careerTotal, range: getDateRange(oldestTransaction, today) },
    }
  }

  const getSummaryAmounts = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    let startDate: Date

    switch (summaryTimeframe) {
      case "DAY":
        startDate = today
        break
      case "WEEK":
        startDate = getMondayOfWeek(today)
        break
      case "MONTH":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        break
      case "YEAR":
        startDate = new Date(today.getFullYear(), 0, 1)
        break
      case "ALLNOOS":
        startDate = new Date(0) // Beginning of time
        break
      default:
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
    }

    // Filter transactions for the selected timeframe
    const filteredTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date)
      return tDate >= startDate && tDate <= today
    })

    // Calculate gains by category
    const gains = {
      pins: filteredTransactions
        .filter((t) => t.type === "income" && t.category === "pins")
        .reduce((sum, t) => sum + t.amount, 0),
      recommendations: filteredTransactions
        .filter((t) => t.type === "income" && t.category === "recommendations")
        .reduce((sum, t) => sum + t.amount, 0),
      storyCredits: filteredTransactions
        .filter((t) => t.type === "income" && t.category === "credits")
        .reduce((sum, t) => sum + t.amount, 0),
      beyondMentions: filteredTransactions
        .filter((t) => t.type === "income" && t.category === "beyond")
        .reduce((sum, t) => sum + t.amount, 0),
      commercials: filteredTransactions
        .filter((t) => t.type === "income" && t.category === "commercials")
        .reduce((sum, t) => sum + t.amount, 0),
      awards: filteredTransactions
        .filter((t) => t.type === "income" && t.category === "rewards")
        .reduce((sum, t) => sum + t.amount, 0),
    }

    // Calculate losses by category
    const losses = {
      pins: filteredTransactions
        .filter((t) => t.type === "expense" && t.category === "pins")
        .reduce((sum, t) => sum + t.amount, 0),
      recommendations: filteredTransactions
        .filter((t) => t.type === "expense" && t.category === "recommendations")
        .reduce((sum, t) => sum + t.amount, 0),
      featured: filteredTransactions
        .filter((t) => t.type === "expense" && t.category === "featured")
        .reduce((sum, t) => sum + t.amount, 0),
    }

    const totalGains = Object.values(gains).reduce((sum, val) => sum + val, 0)
    const totalLosses = Object.values(losses).reduce((sum, val) => sum + val, 0)
    const netTotal = totalGains - totalLosses

    return { gains, losses, totalGains, totalLosses, netTotal }
  }

  const getFilteredTransactions = () => {
    const transactions: Array<{
      id: number
      date: string
      type: "deposit" | "withdrawal"
      description: string
      amount: number
      category: string
    }> = []

    let transactionId = 1
    const now = new Date()

    // Determine date range based on timeframe
    const getDaysBack = () => {
      switch (summaryTimeframe) {
        case "DAY":
          return 1
        case "WEEK":
          return 7
        case "MONTH":
          return 30
        case "YEAR":
          return 365
        case "ALLNOOS":
          return 500
        default:
          return 30
      }
    }

    const daysBack = getDaysBack()

    // Add bank transactions (deposits and withdrawals)
    const bankTransactionCount = Math.min(Math.ceil(daysBack / 10), 5)
    for (let i = 0; i < bankTransactionCount; i++) {
      const daysAgo = Math.floor((daysBack / bankTransactionCount) * i)
      const transactionDate = new Date(now)
      transactionDate.setDate(transactionDate.getDate() - daysAgo)

      // Add deposit
      transactions.push({
        id: transactionId++,
        date: transactionDate.toISOString().split("T")[0],
        type: "deposit",
        description: "Bank Deposit",
        amount: Math.random() * 100 + 50,
        category: "bank",
      })

      // Occasionally add withdrawal
      if (Math.random() > 0.6) {
        const withdrawalDate = new Date(transactionDate)
        withdrawalDate.setDate(withdrawalDate.getDate() - 2)
        transactions.push({
          id: transactionId++,
          date: withdrawalDate.toISOString().split("T")[0],
          type: "withdrawal",
          description: "Bank Withdrawal",
          amount: Math.random() * 80 + 20,
          category: "bank",
        })
      }
    }

    // Add gain transactions matching summary categories
    const gainCategories = [
      { name: "Pins", amount: summaryAmounts.gains.pins, description: "Earned from Pins" },
      {
        name: "Recommendations",
        amount: summaryAmounts.gains.recommendations,
        description: "Earned from Recommendations",
      },
      { name: "Credits", amount: summaryAmounts.gains.storyCredits, description: "Earned from Story Credits" },
      { name: "Commercials", amount: summaryAmounts.gains.commercials, description: "Earned from Commercials" },
      { name: "Rewards", amount: summaryAmounts.gains.awards, description: "Platform Rewards" },
    ]

    gainCategories.forEach((category, index) => {
      if (category.amount > 0) {
        const daysAgo = Math.floor((daysBack / gainCategories.length) * index) + 1
        const transactionDate = new Date(now)
        transactionDate.setDate(transactionDate.getDate() - daysAgo)

        transactions.push({
          id: transactionId++,
          date: transactionDate.toISOString().split("T")[0],
          type: "deposit",
          description: category.description,
          amount: category.amount,
          category: category.name.toLowerCase(),
        })
      }
    })

    // Add spend transactions matching summary categories
    const spendCategories = [
      { name: "Pins", amount: summaryAmounts.losses.pins, description: "Spent on Pins" },
      {
        name: "Recommendations",
        amount: summaryAmounts.losses.recommendations,
        description: "Spent on Recommendations",
      },
      { name: "Featured", amount: summaryAmounts.losses.featured, description: "Spent on Featured Stories" },
    ]

    spendCategories.forEach((category, index) => {
      if (category.amount > 0) {
        const daysAgo = Math.floor((daysBack / spendCategories.length) * index) + 2
        const transactionDate = new Date(now)
        transactionDate.setDate(transactionDate.getDate() - daysAgo)

        transactions.push({
          id: transactionId++,
          date: transactionDate.toISOString().split("T")[0],
          type: "withdrawal",
          description: category.description,
          amount: category.amount,
          category: category.name.toLowerCase(),
        })
      }
    })

    // Sort by date (most recent first)
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const summaryAmounts = getSummaryAmounts()
  const dynamicTransactions = getFilteredTransactions()

  const validateBankName = (value: string): string => {
    if (!value || value.trim().length < 2) {
      return "Bank name must be at least 2 characters"
    }
    return ""
  }

  const validateAccountNumber = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, "")
    if (digitsOnly.length < 8 || digitsOnly.length > 17) {
      return "Account number must be 8-17 digits"
    }
    if (!/^\d+$/.test(digitsOnly)) {
      return "Account number must contain only digits"
    }
    return ""
  }

  const validateRoutingNumber = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, "")
    if (digitsOnly.length !== 9) {
      return "Routing number must be exactly 9 digits"
    }
    if (!/^\d+$/.test(digitsOnly)) {
      return "Routing number must contain only digits"
    }
    return ""
  }

  const validateAccountHolderName = (value: string): string => {
    if (!value || value.trim().length < 2) {
      return "Account holder name must be at least 2 characters"
    }
    return ""
  }

  useEffect(() => {
    if (!showBankInfoPanel) {
      // Save any pending changes when panel closes
      if (editingBankName && tempBankName) {
        const error = validateBankName(tempBankName)
        if (!error) {
          setBankName(tempBankName)
        }
        setEditingBankName(false)
        setBankNameError("")
      }
      if (editingAccountNumber && tempAccountNumber) {
        const error = validateAccountNumber(tempAccountNumber)
        if (!error) {
          setAccountNumber(tempAccountNumber)
        }
        setEditingAccountNumber(false)
        setAccountNumberError("")
      }
      if (editingRoutingNumber && tempRoutingNumber) {
        const error = validateRoutingNumber(tempRoutingNumber)
        if (!error) {
          setRoutingNumber(tempRoutingNumber)
        }
        setEditingRoutingNumber(false)
        setRoutingNumberError("")
      }
      if (editingAccountHolderName && tempAccountHolderName) {
        const error = validateAccountHolderName(tempAccountHolderName)
        if (!error) {
          setAccountHolderName(tempAccountHolderName)
        }
        setEditingAccountHolderName(false)
        setAccountHolderNameError("")
      }
      // Reset visibility toggles
      setShowFullAccountNumber(false)
      setShowFullRoutingNumber(false)
    }
  }, [showBankInfoPanel])

  const handleClickBankName = () => {
    setTempBankName(bankName)
    setEditingBankName(true)
    setBankNameError("")
  }

  const handleClickAccountNumber = () => {
    setTempAccountNumber(accountNumber)
    setEditingAccountNumber(true)
    setAccountNumberError("")
  }

  const handleClickRoutingNumber = () => {
    setTempRoutingNumber(routingNumber)
    setEditingRoutingNumber(true)
    setRoutingNumberError("")
  }

  const handleClickAccountHolderName = () => {
    setTempAccountHolderName(accountHolderName)
    setEditingAccountHolderName(true)
    setAccountHolderNameError("")
  }

  const handleSaveBankName = () => {
    const error = validateBankName(tempBankName)
    if (error) {
      setBankNameError(error)
      return
    }
    setBankName(tempBankName)
    setEditingBankName(false)
    setBankNameError("")
  }

  const handleSaveAccountNumber = () => {
    const error = validateAccountNumber(tempAccountNumber)
    if (error) {
      setAccountNumberError(error)
      return
    }
    setAccountNumber(tempAccountNumber)
    setEditingAccountNumber(false)
    setAccountNumberError("")
    setShowFullAccountNumber(false)
  }

  const handleSaveRoutingNumber = () => {
    const error = validateRoutingNumber(tempRoutingNumber)
    if (error) {
      setRoutingNumberError(error)
      return
    }
    setRoutingNumber(tempRoutingNumber)
    setEditingRoutingNumber(false)
    setRoutingNumberError("")
    setShowFullRoutingNumber(false)
  }

  const handleSaveAccountHolderName = () => {
    const error = validateAccountHolderName(tempAccountHolderName)
    if (error) {
      setAccountHolderNameError(error)
      return
    }
    setAccountHolderName(tempAccountHolderName)
    setEditingAccountHolderName(false)
    setAccountHolderNameError("")
  }

  const maskAccountNumber = (number: string) => {
    if (number.length <= 4) return number
    return "****" + number.slice(-4)
  }

  const maskRoutingNumber = (number: string) => {
    if (number.length <= 4) return number
    return "****" + number.slice(-4)
  }

  const handleAddMoney = () => {
    if (addMoneyAmount && Number.parseFloat(addMoneyAmount) > 0) {
      const amount = Number.parseFloat(addMoneyAmount)
      setPendingAmount((prev) => prev + amount)
      setAddMoneyAmount("")
      setShowAddMoneyModal(false)
    }
  }

  const handleWithdrawMoney = () => {
    if (withdrawMoneyAmount && Number.parseFloat(withdrawMoneyAmount) > 0) {
      const withdrawAmount = Number.parseFloat(withdrawMoneyAmount)
      if (withdrawAmount <= accountBalance) {
        setAccountBalance((prevBalance) => prevBalance - withdrawAmount)
        setPendingAmount((prev) => prev - withdrawAmount)
        setWithdrawMoneyAmount("")
        setShowWithdrawMoneyModal(false)
      } else {
        alert("Insufficient funds")
      }
    }
  }

  const handleCommentPinBid = () => {
    if (commentPinBid && Number.parseFloat(commentPinBid) > 0) {
      setCommentPinBid("")
    }
  }

  const handleRecommendationBid = () => {
    if (recommendationBid && Number.parseFloat(recommendationBid) > 0) {
      setRecommendationBid("")
    }
  }

  const handleStoryBidCredits = () => {
    if (storyBidCredits && Number.parseFloat(storyBidCredits) > 0) {
      setStoryBidCredits("")
    }
  }

  const handleSimilarStoriesBid = () => {
    if (similarStoriesBid && Number.parseFloat(similarStoriesBid) > 0) {
      setSimilarStoriesBid("")
    }
  }

  const handleEditCommentPin = () => {
    setTempCommentPinBalance(commentPinBalance.toString())
    setEditingCommentPin(true)
  }

  const handleSaveCommentPin = () => {
    if (tempCommentPinBalance && Number.parseFloat(tempCommentPinBalance) >= 0) {
      setCommentPinBalance(Number.parseFloat(tempCommentPinBalance))
    }
    setEditingCommentPin(false)
  }

  const handleCancelCommentPin = () => {
    setEditingCommentPin(false)
    setTempCommentPinBalance("")
  }

  const handleEditRecommendation = () => {
    setTempRecommendationBalance(recommendationBalance.toString())
    setEditingRecommendation(true)
  }

  const handleSaveRecommendation = () => {
    if (tempRecommendationBalance && Number.parseFloat(tempRecommendationBalance) >= 0) {
      setRecommendationBalance(Number.parseFloat(tempRecommendationBalance))
    }
    setEditingRecommendation(false)
  }

  const handleCancelRecommendation = () => {
    setEditingRecommendation(false)
    setTempRecommendationBalance("")
  }

  const handleEditStoryCredits = () => {
    setTempStoryCreditsBalance(storyCreditsBalance.toString())
    setEditingStoryCredits(true)
  }

  const handleSaveStoryCredits = () => {
    if (tempStoryCreditsBalance && Number.parseFloat(tempStoryCreditsBalance) >= 0) {
      setStoryCreditsBalance(Number.parseFloat(tempStoryCreditsBalance))
    }
    setEditingStoryCredits(false)
  }

  const handleCancelStoryCredits = () => {
    setEditingStoryCredits(false)
    setTempStoryCreditsBalance("")
  }

  const handleEditSimilarStories = () => {
    setTempSimilarStoriesBalance(similarStoriesBalance.toString())
    setEditingSimilarStories(true)
  }

  const handleSaveSimilarStories = () => {
    if (tempSimilarStoriesBalance && Number.parseFloat(tempSimilarStoriesBalance) >= 0) {
      setSimilarStoriesBalance(Number.parseFloat(tempSimilarStoriesBalance))
    }
    setEditingSimilarStories(false)
  }

  const handleCancelSimilarStories = () => {
    setEditingSimilarStories(false)
    setTempSimilarStoriesBalance("")
  }

  const handlePinBidTouchStart = (id: number) => {
    setTouchedPinBid(id)
  }

  const handlePinBidTouchEnd = () => {
    setTouchedPinBid(null)
  }

  const handlePinBidTouchCancel = () => {
    setTouchedPinBid(null)
  }

  const periodTotals = calculatePeriodTotals()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <button
                onClick={() => router.back()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                <ArrowLeft className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
              </button>
            </div>
            <div className="flex justify-center">
              <Link href="/feed">
                <div className="relative flex items-center justify-center h-12 px-8">
                  {/* CHANGE: Updated mt-0 to mt-[22px] to match wander page positioning */}
                  <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                    <span className="text-stone-600 ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs uppercase">
                      Bank
                    </span>
                  </div>
                  <div style={{ minWidth: "120px", minHeight: "32px" }}>
                    <AllnoosLogo variant="default" size="md" onClick={() => {}} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setShowBankInfoPanel(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                <PiggyBankIcon className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center bg-gray-100 rounded-full p-1">
                {["DAY", "WEEK", "MONTH", "YEAR", "ALLNOOS"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSummaryTimeframe(filter)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                      summaryTimeframe === filter
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        {/* Bank Balance Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg pb-2.5 pt-3.5">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setShowTransactionHistory(true)}
              className="text-foreground text-2xl font-semibold hover:text-foreground/70 transition-colors"
            >
              Balance
            </button>
            <div className="flex-1 text-center text-green-600 text-2xl font-semibold">${accountBalance.toFixed(2)}</div>
            <div className="flex flex-col gap-1 bg-white/60 backdrop-blur-sm border border-border/50 shadow-sm p-0 rounded-xl">
              <button
                onClick={() => setShowAddMoneyModal(true)}
                className="text-green-600 hover:text-green-700 p-1.5 rounded-lg hover:bg-green-100 transition-colors"
                title="Add Funds"
              >
                <PlusIcon className="size-5 text-muted-foreground" />
              </button>
              <div className="h-px w-5 bg-border/50 mx-auto" />
              <button
                onClick={() => setShowWithdrawMoneyModal(true)}
                className="text-destructive hover:text-destructive/80 p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
                title="Withdraw Funds"
              >
                <MinusIcon className="size-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          {pendingAmount !== 0 && (
            <div className="text-xs text-muted-foreground mb-2">
              Pending:{" "}
              <span className={pendingAmount > 0 ? "text-green-600" : "text-destructive"}>
                {pendingAmount > 0 ? "+" : ""}${pendingAmount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div>
          <div className="relative bg-card/95 backdrop-blur-md rounded-2xl p-6 border border-border shadow-lg">
            <h2 className="text-foreground font-semibold mb-4 text-xl">Summary</h2>

            {/* Gains Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-border">
                <h3 className="text-foreground text-base font-medium">Gain</h3>
                <span className="text-base font-bold text-green-600">${summaryAmounts.totalGains.toFixed(2)}</span>
              </div>
              <div className="space-y-2 pl-4">
                <div className="relative">
                  <button
                    onClick={() => setShowSummaryInfo("pins")}
                    className="flex items-center justify-between py-2 w-full hover:bg-muted rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <span className="text-muted-foreground text-sm font-medium">Pins</span>
                    <span className="text-foreground font-medium text-sm">${summaryAmounts.gains.pins.toFixed(2)}</span>
                  </button>
                  {showSummaryInfo === "pins" && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowSummaryInfo(null)} />
                      <div className="absolute top-full left-0 right-0 mt-2 z-[70] bg-card rounded-2xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200 pt-3.5 pb-2.5">
                        <p className="text-sm text-muted-foreground mb-0">
                          Earn when others pin comments to your stories.
                        </p>
                        <Button
                          onClick={() => setShowSummaryInfo(null)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
                        >
                          Got it
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSummaryInfo("recommendations")}
                    className="flex items-center justify-between py-2 w-full hover:bg-muted rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <span className="text-muted-foreground text-sm font-medium">Recommendations</span>
                    <span className="text-foreground font-medium text-sm">
                      ${summaryAmounts.gains.recommendations.toFixed(2)}
                    </span>
                  </button>
                  {showSummaryInfo === "recommendations" && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowSummaryInfo(null)} />
                      <div className="absolute top-full left-0 right-0 mt-2 z-[70] bg-card rounded-2xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200 pt-3.5 pb-2.5">
                        <p className="text-sm text-muted-foreground mb-0">
                          Earn when others promote within your content.
                        </p>
                        <Button
                          onClick={() => setShowSummaryInfo(null)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
                        >
                          Got it
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSummaryInfo("storyCredits")}
                    className="flex items-center justify-between py-2 w-full hover:bg-muted rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <span className="text-muted-foreground text-sm font-medium">Credits</span>
                    <span className="text-foreground font-medium text-sm">
                      ${summaryAmounts.gains.storyCredits.toFixed(2)}
                    </span>
                  </button>
                  {showSummaryInfo === "storyCredits" && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowSummaryInfo(null)} />
                      <div className="absolute top-full left-0 right-0 mt-2 z-[70] bg-card rounded-2xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200 pt-3.5 pb-2.5">
                        <p className="text-sm text-muted-foreground mb-0">
                          Earn when your stories are credited within other content.
                        </p>
                        <Button
                          onClick={() => setShowSummaryInfo(null)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
                        >
                          Got it
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  {showSummaryInfo === "beyondMentions" && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowSummaryInfo(null)} />
                      <div className="absolute top-full left-0 right-0 mt-2 z-[70] bg-card rounded-2xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200 pt-3.5 pb-2.5">
                        <p className="text-sm text-muted-foreground mb-0">
                          Earn when others promote within your content.
                        </p>
                        <Button
                          onClick={() => setShowSummaryInfo(null)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
                        >
                          Got it
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSummaryInfo("commercials")}
                    className="flex items-center justify-between py-2 w-full hover:bg-muted rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <span className="text-muted-foreground text-sm font-medium">Commercials</span>
                    <span className="text-foreground font-medium text-sm">
                      ${summaryAmounts.gains.commercials.toFixed(2)}
                    </span>
                  </button>
                  {showSummaryInfo === "commercials" && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowSummaryInfo(null)} />
                      <div className="absolute top-full left-0 right-0 mt-2 z-[70] bg-card rounded-2xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200 pt-3.5 pb-2.5">
                        <p className="text-sm text-muted-foreground mb-0">
                          Earn revenue from commercial partnerships on live channels. *station accounts only
                        </p>
                        <Button
                          onClick={() => setShowSummaryInfo(null)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
                        >
                          Got it
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSummaryInfo("awards")}
                    className="flex items-center justify-between py-2 w-full hover:bg-muted rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <span className="text-muted-foreground text-sm font-medium">Rewards</span>
                    <span className="text-foreground font-medium text-sm">
                      ${summaryAmounts.gains.awards.toFixed(2)}
                    </span>
                  </button>
                  {showSummaryInfo === "awards" && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowSummaryInfo(null)} />
                      <div className="absolute top-full left-0 right-0 mt-2 z-[70] bg-card rounded-2xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200 pt-3.5 pb-2.5">
                        <p className="text-sm text-muted-foreground mb-0">Earn platform rewards for rankings.</p>
                        <Button
                          onClick={() => setShowSummaryInfo(null)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
                        >
                          Got it
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Losses Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-border">
                <h3 className="text-foreground text-base font-medium">Spend</h3>
                <span className="text-foreground text-base font-bold">${summaryAmounts.totalLosses.toFixed(2)}</span>
              </div>
              <div className="space-y-2 pl-4">
                <div className="relative">
                  <button
                    onClick={() => setShowSummaryInfo("spendPins")}
                    className="flex items-center justify-between py-2 w-full hover:bg-muted rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <span className="text-muted-foreground text-sm font-medium">Pins</span>
                    <span className="text-foreground font-medium text-sm">
                      ${summaryAmounts.losses.pins.toFixed(2)}
                    </span>
                  </button>
                  {showSummaryInfo === "spendPins" && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowSummaryInfo(null)} />
                      <div className="absolute top-full left-0 right-0 mt-2 z-[70] bg-card rounded-2xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200 pt-3.5 pb-2.5">
                        <p className="text-sm text-muted-foreground mb-0">
                          Pin your comments to the top of other journalists' stories, increasing visibility and
                          engagement for your insights.
                        </p>
                        <Button
                          onClick={() => setShowSummaryInfo(null)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
                        >
                          Got it
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSummaryInfo("spendRecommendations")}
                    className="flex items-center justify-between py-2 w-full hover:bg-muted rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <span className="text-muted-foreground text-sm font-medium">Recommendations</span>
                    <span className="text-foreground font-medium text-sm">
                      ${summaryAmounts.losses.recommendations.toFixed(2)}
                    </span>
                  </button>
                  {showSummaryInfo === "spendRecommendations" && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowSummaryInfo(null)} />
                      <div className="absolute top-full left-0 right-0 mt-2 z-[70] bg-card rounded-2xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200 pt-3.5 pb-2.5">
                        <p className="text-sm text-muted-foreground mb-0">
                          Promote your content within other stories, reaching a broader audience and increasing story
                          visibility across the platform.
                        </p>
                        <Button
                          onClick={() => setShowSummaryInfo(null)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
                        >
                          Got it
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSummaryInfo("spendFeatured")}
                    className="flex items-center justify-between py-2 w-full hover:bg-muted rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <span className="text-muted-foreground text-sm font-medium">Featured</span>
                    <span className="text-foreground font-medium text-sm">
                      ${summaryAmounts.losses.featured.toFixed(2)}
                    </span>
                  </button>
                  {showSummaryInfo === "spendFeatured" && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowSummaryInfo(null)} />
                      <div className="absolute top-full left-0 right-0 mt-2 z-[70] bg-card rounded-2xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200 pt-3.5 pb-2.5">
                        <p className="text-sm text-muted-foreground mb-0">
                          Feature your stories prominently on the wander page, maximizing visibility and reader
                          engagement.
                        </p>
                        <Button
                          onClick={() => setShowSummaryInfo(null)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
                        >
                          Got it
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-border space-y-4">
              {/* CHANGE: Use summaryAmounts.netTotal for all period displays to ensure math adds up */}
              {summaryTimeframe === "DAY" && (
                <div className="flex items-center justify-between">
                  <h3 className="text-foreground font-bold text-base">Daily Total</h3>
                  <span className="text-foreground font-bold text-lg">${summaryAmounts.netTotal.toFixed(2)}</span>
                </div>
              )}

              {summaryTimeframe === "WEEK" && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground font-bold text-base">Weekly Total</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{periodTotals.weekly.range}</p>
                  </div>
                  <span className="text-foreground font-bold text-lg">${summaryAmounts.netTotal.toFixed(2)}</span>
                </div>
              )}

              {summaryTimeframe === "MONTH" && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground font-bold text-base">Monthly Total</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{periodTotals.monthly.range}</p>
                  </div>
                  <span className="text-foreground font-bold text-lg">${summaryAmounts.netTotal.toFixed(2)}</span>
                </div>
              )}

              {summaryTimeframe === "YEAR" && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground font-bold text-base">Yearly Total</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{periodTotals.yearly.range}</p>
                  </div>
                  <span className="text-foreground font-bold text-lg">${summaryAmounts.netTotal.toFixed(2)}</span>
                </div>
              )}

              {summaryTimeframe === "ALLNOOS" && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground font-bold text-base">Career Total</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{periodTotals.career.range}</p>
                  </div>
                  <span className="text-foreground font-bold text-lg">${summaryAmounts.netTotal.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comment Pin Bids Section */}

        {/* Recommendation Bids Section */}

        {/* Story Bids Credits Section */}

        {/* Similar Stories Bids Section */}

        {/* Transaction History Section */}
        <div className="relative bg-card/95 backdrop-blur-md rounded-2xl p-6 border border-border shadow-lg">
          <h2 className="text-foreground font-semibold mb-4 text-xl">Transactions</h2>
          <div className="space-y-3">
            {dynamicTransactions.length > 0 ? (
              dynamicTransactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${transaction.type === "deposit" ? "text-green-600" : "text-foreground"}`}
                  >
                    {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-Up Panel for Adding Money */}
      {showAddMoneyModal && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setShowAddMoneyModal(false)} />

          {/* Slide-Up Panel */}
          <div
            className="fixed bottom-0 left-0 right-0 z-[70] bg-background/95 backdrop-blur-sm rounded-t-3xl shadow-2xl border-t border-border animate-in slide-in-from-bottom duration-300 max-w-2xl mx-auto"
            style={{ maxHeight: "80vh" }}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-foreground text-xl font-bold">Add Funds</h3>
                <p className="text-xs text-muted-foreground mt-0.5">from account {maskAccountNumber(accountNumber)}</p>
              </div>
              <button
                onClick={handleAddMoney}
                disabled={!addMoneyAmount || Number.parseFloat(addMoneyAmount) <= 0}
                className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(80vh - 120px)" }}>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Amount (USD)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="10"
                    className="flex-1 p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-card text-foreground"
                  />
                  <Button
                    onClick={handleAddMoney}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                    disabled={!addMoneyAmount || Number.parseFloat(addMoneyAmount) <= 0}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Quick Add</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setAddMoneyAmount("10")}
                    className="py-3 px-4 rounded-lg border-2 border-border hover:border-green-600 hover:bg-green-100 transition-all text-sm font-medium text-foreground"
                  >
                    $10
                  </button>
                  <button
                    onClick={() => setAddMoneyAmount("25")}
                    className="py-3 px-4 rounded-lg border-2 border-border hover:border-green-600 hover:bg-green-100 transition-all text-sm font-medium text-foreground"
                  >
                    $25
                  </button>
                  <button
                    onClick={() => setAddMoneyAmount("50")}
                    className="py-3 px-4 rounded-lg border-2 border-border hover:border-green-600 hover:bg-green-100 transition-all text-sm font-medium text-foreground"
                  >
                    $50
                  </button>
                  <button
                    onClick={() => setAddMoneyAmount("100")}
                    className="py-3 px-4 rounded-lg border-2 border-border hover:border-green-600 hover:bg-green-100 transition-all text-sm font-medium text-foreground"
                  >
                    $100
                  </button>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                <p className="text-sm text-secondary-foreground">
                  <strong>Note:</strong> Funds will be added to your account balance and can be used for comment pins,
                  recommendations, and story promotions.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Slide-Up Panel for Withdrawing Money */}
      {showWithdrawMoneyModal && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setShowWithdrawMoneyModal(false)} />

          {/* Slide-Up Panel */}
          <div
            className="fixed bottom-0 left-0 right-0 z-[70] bg-background/95 backdrop-blur-sm rounded-t-3xl shadow-2xl border-t border-border animate-in slide-in-from-bottom duration-300 max-w-2xl mx-auto"
            style={{ maxHeight: "80vh" }}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-foreground text-xl font-bold">Withdraw Funds</h3>
                <p className="text-xs text-muted-foreground mt-0.5">to account {maskAccountNumber(accountNumber)}</p>
              </div>
              <button
                onClick={handleWithdrawMoney}
                disabled={
                  !withdrawMoneyAmount ||
                  Number.parseFloat(withdrawMoneyAmount) <= 0 ||
                  Number.parseFloat(withdrawMoneyAmount) > accountBalance
                }
                className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(80vh - 120px)" }}>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Amount (USD)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={withdrawMoneyAmount}
                    onChange={(e) => setWithdrawMoneyAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="10"
                    max={accountBalance}
                    className="flex-1 p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive focus:border-destructive bg-card text-foreground"
                  />
                  <Button
                    onClick={handleWithdrawMoney}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6"
                    disabled={
                      !withdrawMoneyAmount ||
                      Number.parseFloat(withdrawMoneyAmount) <= 0 ||
                      Number.parseFloat(withdrawMoneyAmount) > accountBalance
                    }
                  >
                    Withdraw
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Available balance: ${accountBalance.toFixed(2)}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Quick Withdraw</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setWithdrawMoneyAmount("10")}
                    className="py-3 px-4 rounded-lg border-2 border-border hover:border-destructive hover:bg-destructive/10 transition-all text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={accountBalance < 10}
                  >
                    $10
                  </button>
                  <button
                    onClick={() => setWithdrawMoneyAmount("25")}
                    className="py-3 px-4 rounded-lg border-2 border-border hover:border-destructive hover:bg-destructive/10 transition-all text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={accountBalance < 25}
                  >
                    $25
                  </button>
                  <button
                    onClick={() => setWithdrawMoneyAmount("50")}
                    className="py-3 px-4 rounded-lg border-2 border-border hover:border-destructive hover:bg-destructive/10 transition-all text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={accountBalance < 50}
                  >
                    $50
                  </button>
                  <button
                    onClick={() => setWithdrawMoneyAmount("100")}
                    className="py-3 px-4 rounded-lg border-2 border-border hover:border-destructive hover:bg-destructive/10 transition-all text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={accountBalance < 100}
                  >
                    $100
                  </button>
                </div>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                <p className="text-sm text-destructive-foreground">
                  <strong>Note:</strong> Withdrawn funds will be transferred to your linked bank account within 3-5
                  business days.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {showBankInfoPanel && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-[60]"
            onClick={() =>
              !editingBankName &&
              !editingAccountNumber &&
              !editingRoutingNumber &&
              !editingAccountHolderName &&
              setShowBankInfoPanel(false)
            }
          />

          {/* Slide-Up Panel */}
          <div
            className="fixed bottom-0 left-0 right-0 z-[70] bg-card rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-w-2xl mx-auto"
            style={{ maxHeight: "80vh" }}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-foreground text-xl font-bold flex items-center gap-2">
                <PiggyBankIcon className="w-6 h-6 text-primary" />
                Bank Information
              </h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(80vh - 120px)" }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Account Holder Name</label>
                  {!editingAccountHolderName ? (
                    <button
                      onClick={handleClickAccountHolderName}
                      className="w-full bg-muted rounded-lg p-4 border border-border hover:border-primary hover:bg-muted/80 transition-all text-left"
                    >
                      <p className="text-foreground font-semibold text-lg">{accountHolderName}</p>
                    </button>
                  ) : (
                    <div>
                      <input
                        type="text"
                        value={tempAccountHolderName}
                        onChange={(e) => {
                          setTempAccountHolderName(e.target.value)
                          setAccountHolderNameError("")
                        }}
                        onBlur={handleSaveAccountHolderName}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveAccountHolderName()
                          if (e.key === "Escape") {
                            setEditingAccountHolderName(false)
                            setAccountHolderNameError("")
                          }
                        }}
                        placeholder="John Doe"
                        className={`w-full p-3 border ${accountHolderNameError ? "border-destructive" : "border-input"} rounded-lg focus:outline-none focus:ring-2 ${accountHolderNameError ? "focus:ring-destructive" : "focus:ring-ring"} bg-card text-foreground`}
                        autoFocus
                      />
                      {accountHolderNameError && (
                        <p className="text-destructive text-xs mt-1">{accountHolderNameError}</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Bank Name</label>
                  {!editingBankName ? (
                    <button
                      onClick={handleClickBankName}
                      className="w-full bg-muted rounded-lg p-4 border border-border hover:border-primary hover:bg-muted/80 transition-all text-left"
                    >
                      <p className="text-foreground font-semibold text-lg">{bankName}</p>
                    </button>
                  ) : (
                    <div>
                      <input
                        type="text"
                        value={tempBankName}
                        onChange={(e) => {
                          setTempBankName(e.target.value)
                          setBankNameError("")
                        }}
                        onBlur={handleSaveBankName}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveBankName()
                          if (e.key === "Escape") {
                            setEditingBankName(false)
                            setBankNameError("")
                          }
                        }}
                        placeholder="Chase Bank"
                        className={`w-full p-3 border ${bankNameError ? "border-destructive" : "border-input"} rounded-lg focus:outline-none focus:ring-2 ${bankNameError ? "focus:ring-destructive" : "focus:ring-ring"} bg-card text-foreground`}
                        autoFocus
                      />
                      {bankNameError && <p className="text-destructive text-xs mt-1">{bankNameError}</p>}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-muted-foreground">Account Number</label>
                    {!editingAccountNumber && (
                      <button
                        onClick={() => setShowFullAccountNumber(!showFullAccountNumber)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showFullAccountNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                  {!editingAccountNumber ? (
                    <button
                      onClick={handleClickAccountNumber}
                      className="w-full bg-muted rounded-lg p-4 border border-border hover:border-primary hover:bg-muted/80 transition-all text-left"
                    >
                      <p className="text-foreground font-mono font-semibold text-lg tracking-wider">
                        {showFullAccountNumber ? accountNumber : maskAccountNumber(accountNumber)}
                      </p>
                    </button>
                  ) : (
                    <div>
                      <input
                        type="text"
                        value={tempAccountNumber}
                        onChange={(e) => {
                          setTempAccountNumber(e.target.value)
                          setAccountNumberError("")
                        }}
                        onBlur={handleSaveAccountNumber}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveAccountNumber()
                          if (e.key === "Escape") {
                            setEditingAccountNumber(false)
                            setAccountNumberError("")
                          }
                        }}
                        placeholder="123456789012"
                        className={`w-full p-3 border ${accountNumberError ? "border-destructive" : "border-input"} rounded-lg focus:outline-none focus:ring-2 ${accountNumberError ? "focus:ring-destructive" : "focus:ring-ring"} bg-card text-foreground font-mono`}
                        autoFocus
                      />
                      {accountNumberError && <p className="text-destructive text-xs mt-1">{accountNumberError}</p>}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-muted-foreground">Routing Number</label>
                    {!editingRoutingNumber && (
                      <button
                        onClick={() => setShowFullRoutingNumber(!showFullRoutingNumber)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showFullRoutingNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                  {!editingRoutingNumber ? (
                    <button
                      onClick={handleClickRoutingNumber}
                      className="w-full bg-muted rounded-lg p-4 border border-border hover:border-primary hover:bg-muted/80 transition-all text-left"
                    >
                      <p className="text-foreground font-mono font-semibold text-lg tracking-wider">
                        {showFullRoutingNumber ? routingNumber : maskRoutingNumber(routingNumber)}
                      </p>
                    </button>
                  ) : (
                    <div>
                      <input
                        type="text"
                        value={tempRoutingNumber}
                        onChange={(e) => {
                          setTempRoutingNumber(e.target.value)
                          setRoutingNumberError("")
                        }}
                        onBlur={handleSaveRoutingNumber}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveRoutingNumber()
                          if (e.key === "Escape") {
                            setEditingRoutingNumber(false)
                            setRoutingNumberError("")
                          }
                        }}
                        placeholder="021000021"
                        className={`w-full p-3 border ${routingNumberError ? "border-destructive" : "border-input"} rounded-lg focus:outline-none focus:ring-2 ${routingNumberError ? "focus:ring-destructive" : "focus:ring-ring"} bg-card text-foreground font-mono`}
                        autoFocus
                      />
                      {routingNumberError && <p className="text-destructive text-xs mt-1">{routingNumberError}</p>}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 mt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Authorization:</strong> As a condition of using the allnoos application, you hereby authorize
                  allnoos and its payment partners to initiate electronic debit entries (EFT/ACH) from the external bank
                  account you link to your allnoos profile for the purpose of funding your in-app account wallet. You
                  represent that you are the lawful owner of the external account and that all transaction requests are
                  fully authorized by you; this authorization remains in effect until you revoke it in a manner that
                  provides allnoos and its partners a reasonable opportunity to act. You acknowledge that all deposits
                  are subject to fraud review and clearing periods before the funds are made fully available for use
                  within allnoos, and that you must promptly report any unauthorized or erroneous transactions.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {showTransactionHistory && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 z-[60]" onClick={() => setShowTransactionHistory(false)} />

          {/* Slide-Up Panel */}
          <div
            className="fixed bottom-0 left-0 right-0 z-[70] bg-card rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-w-2xl mx-auto"
            style={{ maxHeight: "80vh" }}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-foreground text-xl font-bold mb-3">Transaction History</h3>

              {/* Year Filter */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setTransactionYear(year)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                      transactionYear === year
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(80vh - 180px)" }}>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-xs font-medium text-green-700 mb-1">Total Deposits</p>
                  <p className="text-2xl font-bold text-green-600">${totalDeposits.toFixed(2)}</p>
                </div>
                <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
                  <p className="text-xs font-medium text-destructive mb-1">Total Withdrawals</p>
                  <p className="text-2xl font-bold text-destructive">${totalWithdrawals.toFixed(2)}</p>
                </div>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-4 px-4 bg-muted rounded-xl border border-border hover:border-border transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            transaction.type === "deposit" ? "text-green-600" : "text-destructive"
                          }`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">{transaction.type}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-sm">No transactions found for {transactionYear}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
