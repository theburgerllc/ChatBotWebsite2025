// app/api/webhooks/stripe/route.ts
// Verifies Stripe webhook signature and emits analytics-friendly purchase event.

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!endpointSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
    return new NextResponse('Webhook secret not configured', { status: 500 });
  }

  const buf = Buffer.from(await req.arrayBuffer());
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  if (!sig) {
    return new NextResponse('Missing signature', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(updatedSubscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(failedInvoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`Webhook handler error for ${event.type}:`, err);
    return new NextResponse(`Handler Error: ${err.message}`, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id);

  // Track conversion event for analytics
  if (session.amount_total && session.currency) {
    const value = session.amount_total / 100; // Convert cents to dollars

    // You can implement server-side analytics tracking here
    // For example, using Google Analytics Measurement Protocol
    await trackPurchaseEvent({
      transactionId: session.id,
      value: value,
      currency: session.currency.toUpperCase(),
      items: [], // You would populate this from line items if needed
      clientReferenceId: session.client_reference_id
    });
  }

  // Here you would typically:
  // 1. Update your database with the successful purchase
  // 2. Send confirmation emails
  // 3. Provision access to your service
  // 4. Update user account status
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id);

  // Mark subscription as active in your database
  // Grant access to the service
  // Send welcome email
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id);

  // Update subscription details in your database
  // Handle plan changes, quantity updates, etc.
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id);

  // Revoke access to the service
  // Send cancellation confirmation
  // Archive user data as appropriate
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded:', invoice.id);

  // Track recurring payment
  // Send receipt email
  // Update payment history
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed:', invoice.id);

  // Send payment failure notification
  // Implement dunning management
  // Track failed payment metrics
}

async function trackPurchaseEvent(data: {
  transactionId: string;
  value: number;
  currency: string;
  items: any[];
  clientReferenceId?: string | null;
}) {
  // Server-side analytics tracking
  // You can implement Google Analytics Measurement Protocol here
  // or send to your preferred analytics service

  console.log('Purchase event tracked:', {
    transactionId: data.transactionId,
    value: data.value,
    currency: data.currency,
    source: data.clientReferenceId
  });

  // Example: Send to analytics service
  try {
    // await analyticsService.track('purchase', data);
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
}