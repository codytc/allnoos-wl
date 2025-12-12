export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

// Deposit amounts available for users to add funds
export const DEPOSIT_PRODUCTS: Product[] = [
  {
    id: "deposit-50",
    name: "$50 Deposit",
    description: "Add $50 to your account balance",
    priceInCents: 5000,
  },
  {
    id: "deposit-100",
    name: "$100 Deposit",
    description: "Add $100 to your account balance",
    priceInCents: 10000,
  },
  {
    id: "deposit-500",
    name: "$500 Deposit",
    description: "Add $500 to your account balance",
    priceInCents: 50000,
  },
  {
    id: "deposit-1000",
    name: "$1,000 Deposit",
    description: "Add $1,000 to your account balance",
    priceInCents: 100000,
  },
  {
    id: "deposit-10000",
    name: "$10,000 Deposit",
    description: "Add $10,000 to your account balance",
    priceInCents: 1000000,
  },
]

// Helper function to get product by amount
export function getDepositProductByAmount(amount: string): Product | undefined {
  const amountNum = Number.parseFloat(amount)
  return DEPOSIT_PRODUCTS.find((p) => p.priceInCents === amountNum * 100)
}

// Helper function to create a custom deposit product
export function createCustomDepositProduct(amount: string): Product {
  const amountNum = Number.parseFloat(amount)
  const priceInCents = Math.round(amountNum * 100)

  return {
    id: `deposit-custom-${priceInCents}`,
    name: `$${amountNum.toFixed(2)} Deposit`,
    description: `Add $${amountNum.toFixed(2)} to your account balance`,
    priceInCents,
  }
}
