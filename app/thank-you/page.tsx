'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Analytics } from '@/lib/analytics';
import { Check, ArrowRight, Star } from 'lucide-react';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    // Track successful purchase
    Analytics.purchaseServer(0, sessionId || undefined);

    // Optionally fetch session details from your API
    if (sessionId) {
      // You could fetch session details here if needed
      console.log('Checkout session:', sessionId);
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to AI Chatbot Solutions!
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            Thank you for your subscription. Your AI chatbot is being set up and will be ready in minutes.
          </p>

          {/* What happens next */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">What happens next?</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Account Setup</h3>
                <p className="text-gray-400 text-sm">
                  We're setting up your account and provisioning your AI chatbot resources.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Welcome Email</h3>
                <p className="text-gray-400 text-sm">
                  You'll receive login credentials and setup instructions within 5 minutes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Go Live</h3>
                <p className="text-gray-400 text-sm">
                  Configure your chatbot and start converting visitors into customers.
                </p>
              </div>
            </div>
          </div>

          {/* Quick start actions */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Get Started Right Away</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="/demos"
                className="bg-primary hover:bg-primary/80 transition px-6 py-4 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                Explore Demo Examples
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="mailto:support@aichatbotsolutions.com"
                className="bg-white/10 hover:bg-white/20 transition px-6 py-4 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Support information */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3 text-blue-200">Need Help Getting Started?</h3>
            <p className="text-gray-300 mb-4">
              Our team is here to help you succeed. We offer free onboarding sessions to help you
              configure your AI chatbot for maximum conversion.
            </p>
            <a
              href="mailto:onboarding@aichatbotsolutions.com"
              className="text-primary hover:underline font-medium"
            >
              Schedule Your Free Onboarding Session →
            </a>
          </div>

          {/* Social proof */}
          <div className="text-center">
            <p className="text-gray-400 mb-4">Join thousands of businesses already growing with AI</p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-300">4.9/5 from 500+ customers</span>
            </div>
          </div>

          {/* Order details */}
          {sessionId && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold mb-3">Order Details</h3>
              <p className="text-gray-400 text-sm">
                Order ID: {sessionId}
              </p>
              <p className="text-gray-400 text-sm">
                You will receive a receipt via email shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}