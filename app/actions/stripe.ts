"use server"

import { stripe } from "@/lib/stripe"
import { DEPOSIT_PRODUCTS, createCustomDepositProduct } from "@/lib/products"

export async function startDepositCheckoutSession(amount: string) {
  // Try to find a standard product first
  let product = DEPOSIT_PRODUCTS.find((p) => p.priceInCents === Number.parseFloat(amount) * 100)

  // If not found, create a custom deposit product
  if (!product) {
    product = createCustomDepositProduct(amount)
  }

  // Create Checkout Sessions
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      type: "deposit",
      amount: amount,
    },
  })

  return session.client_secret
}

export async function createCheckoutSession(amount: number) {
  try {
    // Try to find a standard product first
    let product = DEPOSIT_PRODUCTS.find((p) => p.priceInCents === amount * 100)

    // If not found, create a custom deposit product
    if (!product) {
      product = createCustomDepositProduct(amount.toString())
    }

    // Create Checkout Sessions
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      redirect_on_completion: "never",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        type: "deposit",
        amount: amount.toString(),
      },
    })

    return {
      clientSecret: session.client_secret || null,
      error: null,
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return {
      clientSecret: null,
      error: error instanceof Error ? error.message : "Failed to create checkout session",
    }
  }
}
