import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { validatePlan } from "@/lib/validation";
import { BASE_URL } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { 
  apiVersion: "2024-06-20"
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const plan = (formData.get("plan")?.toString() || "").toUpperCase();
  
  if (!validatePlan(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let mode: "subscription" | "payment" = "subscription";
  const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];

  // Handle different plans
  if (plan === "STARTER" && process.env.STRIPE_PRICE_STARTER) {
    line_items.push({ 
      price: process.env.STRIPE_PRICE_STARTER, 
      quantity: 1 
    });
    if (process.env.STRIPE_PROMO_STARTER) {
      discounts.push({ promotion_code: process.env.STRIPE_PROMO_STARTER });
    }
  } else if (plan === "GROWTH" && process.env.STRIPE_PRICE_GROWTH) {
    line_items.push({ 
      price: process.env.STRIPE_PRICE_GROWTH, 
      quantity: 1 
    });
    if (process.env.STRIPE_PROMO_GROWTH) {
      discounts.push({ promotion_code: process.env.STRIPE_PROMO_GROWTH });
    }
  } else if (plan === "BASIC") {
    // Create inline price for Basic plan
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { 
          name: "Basic Plan - AI Video Agent",
          description: "25 minutes/month, 1 concurrent session"
        },
        unit_amount: 2500, // $25.00
        recurring: { interval: "month" }
      },
      quantity: 1
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items,
      allow_promotion_codes: true,
      discounts: discounts.length > 0 ? discounts : undefined,
      success_url: `${BASE_URL}/pricing?status=success&plan=${plan}`,
      cancel_url: `${BASE_URL}/pricing?status=cancel`,
      metadata: { plan }
    });

    if (!session.url) {
      throw new Error("No checkout URL generated");
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ 
      error: "Failed to create checkout session" 
    }, { status: 500 });
  }
}
