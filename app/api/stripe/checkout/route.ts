import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20"
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lineItems, clientRef, email } = body;

    // Validate required fields
    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: "Invalid line items" }, { status: 400 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      allow_promotion_codes: true,
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL}/pricing?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL}/pricing?status=cancel`,
      client_reference_id: clientRef || 'web',
      metadata: {
        source: clientRef || 'pricing_page',
        timestamp: new Date().toISOString()
      }
    });

    if (!session.url) {
      throw new Error("No checkout URL generated");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({
      error: "Failed to create checkout session"
    }, { status: 500 });
  }
}
