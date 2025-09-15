"use client";
import { useState, useEffect } from "react";
import { PLANS, ADDONS } from "@/config/pricing";
import { Check, Star, Shield, Users, Zap, Clock } from "lucide-react";
import { track } from "@/lib/tracking";

// Customer count animation
function CustomerCount() {
  const [count, setCount] = useState(487);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return count;
}

// Urgency timer
function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 23, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="w-4 h-4 text-yellow-400" />
      <span className="text-yellow-400">
        Limited offer expires in {timeLeft.hours.toString().padStart(2, '0')}:
        {timeLeft.minutes.toString().padStart(2, '0')}:
        {timeLeft.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

export default function PricingPage() {

  useEffect(() => {
    track('Pricing_Page_Viewed');
  }, []);

  return (
    <main className="section">
      <div className="container">
        {/* Hero section with social proof */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-sm mb-6">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-green-400">Trusted by <CustomerCount />+ businesses</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-300 mb-6">
            Pay for what you use. No hidden fees. Cancel anytime.
          </p>

          {/* Urgency bar */}
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 max-w-md mx-auto mb-8">
            <UrgencyTimer />
            <p className="text-sm text-gray-300 mt-2">
              50% off setup fee - Save $199 on your first month
            </p>
          </div>
        </div>

        {/* Risk reversal guarantee */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="w-8 h-8 text-green-400" />
            <h3 className="text-xl font-bold">30-Day Money-Back Guarantee</h3>
          </div>
          <p className="text-gray-300">
            Try risk-free. If you don't see measurable improvement in lead conversion within 30 days,
            we'll refund every penny. No questions asked.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {PLANS.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-black/50 border rounded-xl p-8 flex flex-col transform hover:scale-105 transition-all duration-300 ${
                plan.popular ? 'border-primary shadow-lg shadow-primary/20 scale-105' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    SAVE 45%
                  </div>
                </>
              )}

              {index === 0 && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                  STARTER
                </div>
              )}

              {index === 2 && (
                <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  ENTERPRISE
                </div>
              )}
              
              <h2 className="text-2xl font-bold">{plan.title}</h2>
              
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.priceMonthly}</span>
                <span className="text-gray-400">/month</span>
              </div>
              
              {plan.firstMonthPrice < plan.priceMonthly && (
                <p className="text-green-400 text-sm mt-2">
                  First month: ${plan.firstMonthPrice}
                </p>
              )}
              
              <div className="mt-6 space-y-4 flex-grow">
                <div className="pb-4 border-b border-white/10">
                  <p className="text-sm text-gray-400">Includes</p>
                  <p className="font-semibold">{plan.minutesIncluded} minutes/mo</p>
                  <p className="text-sm text-gray-400">
                    {plan.concurrency} concurrent session{plan.concurrency > 1 ? 's' : ''}
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <form action="/api/stripe/checkout" method="POST" className="mt-8">
                <input type="hidden" name="plan" value={plan.id} />
                <button
                  type="submit"
                  onClick={() => track('Plan_Selected', { planId: plan.id, planTitle: plan.title })}
                  className={`w-full py-3 rounded-lg font-medium transition group ${
                    plan.popular
                      ? 'bg-primary text-white hover:opacity-90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {plan.popular ? 'Start Free Trial' : 'Get Started'}
                  <Zap className="inline-block ml-2 w-4 h-4 group-hover:animate-pulse" />
                </button>
              </form>

              {plan.popular && (
                <p className="text-center text-sm text-green-400 mt-2">
                  ✓ 14-day free trial included
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Social proof testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/40 border border-white/10 rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">
                "ROI became positive within 2 weeks. Game changer for our legal practice."
              </p>
              <p className="font-semibold">Michael R.</p>
              <p className="text-sm text-gray-400">Rodriguez Law Group</p>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">
                "Conversion rate jumped from 2% to 8%. Best investment we've made."
              </p>
              <p className="font-semibold">Sarah C.</p>
              <p className="text-sm text-gray-400">TechFlow Inc.</p>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">
                "Patients love it. No-show rate cut in half, staff stress way down."
              </p>
              <p className="font-semibold">Dr. Emily P.</p>
              <p className="text-sm text-gray-400">HealthFirst Medical</p>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Flexible Add-ons</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {ADDONS.map((addon, index) => (
              <div
                key={addon.id}
                className={`bg-black/40 border rounded-xl p-6 hover:border-primary/50 transition-colors ${
                  addon.popular ? 'border-primary/30' : 'border-white/10'
                }`}
              >
                {addon.popular && (
                  <div className="text-xs text-primary font-semibold mb-2">MOST POPULAR</div>
                )}
                <h4 className="font-semibold mb-2">{addon.title}</h4>
                <p className="text-primary font-bold mb-2">{addon.price}</p>
                <p className="text-sm text-gray-300">{addon.blurb}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <details className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors">
              <summary className="font-semibold cursor-pointer flex items-center justify-between">
                What happens when I exceed my minutes?
                <span className="text-primary text-lg">+</span>
              </summary>
              <p className="mt-3 text-gray-300">
                Additional minutes are billed at $0.40 per minute, or you can purchase minute packs for better rates.
                Most customers find our included minutes more than sufficient.
              </p>
            </details>
            <details className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors">
              <summary className="font-semibold cursor-pointer flex items-center justify-between">
                Can I change plans anytime?
                <span className="text-primary text-lg">+</span>
              </summary>
              <p className="mt-3 text-gray-300">
                Yes! Upgrade or downgrade at any time. Changes take effect on your next billing cycle.
                No long-term contracts or cancellation fees.
              </p>
            </details>
            <details className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors">
              <summary className="font-semibold cursor-pointer flex items-center justify-between">
                Is there a free trial?
                <span className="text-primary text-lg">+</span>
              </summary>
              <p className="mt-3 text-gray-300">
                Starter and Growth plans include a 14-day free trial. Basic plan offers 50% off the first month.
                All plans come with our 30-day money-back guarantee.
              </p>
            </details>
            <details className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors">
              <summary className="font-semibold cursor-pointer flex items-center justify-between">
                How quickly will I see results?
                <span className="text-primary text-lg">+</span>
              </summary>
              <p className="mt-3 text-gray-300">
                Most customers see increased lead capture within 24 hours. Significant conversion improvements
                typically occur within the first week as the AI learns your business.
              </p>
            </details>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-8">
          <h3 className="text-3xl font-bold mb-4">Ready to 10x Your Lead Conversion?</h3>
          <p className="text-xl text-gray-300 mb-6">
            Join <CustomerCount />+ businesses already using AI to grow faster
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                track('Final_CTA_Demo_Clicked');
                window.location.href = '/demos';
              }}
              className="btn btn-primary text-lg px-8 py-4"
            >
              Try Live Demo First
            </button>
            <button
              onClick={() => {
                track('Final_CTA_Pricing_Clicked');
                document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Choose Your Plan
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
