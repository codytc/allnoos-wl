import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  let event: Stripe.Event

  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }
  } else {
    // Development mode: parse event without verification
    console.warn("[v0] Webhook secret not configured - skipping signature verification (DEVELOPMENT ONLY)")
    try {
      event = JSON.parse(body) as Stripe.Event
    } catch (err) {
      console.error("Failed to parse webhook body:", err)
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session

      // TODO: Update user's balance in your database
      console.log("[v0] Checkout completed:", {
        sessionId: session.id,
        amount: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details?.email,
      })

      // Here you would typically:
      // 1. Find the user by email or customer ID
      // 2. Update their account balance
      // 3. Create a transaction record

      break

    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("[v0] Payment succeeded:", paymentIntent.id)
      break

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.error("[v0] Payment failed:", failedPayment.last_payment_error?.message)
      break

    default:
      console.log(`[v0] Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
