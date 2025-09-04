import { PLANS, ADDONS } from "@/config/pricing";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-300">
            Pay for what you use. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-black/50 border rounded-xl p-8 flex flex-col ${
                plan.popular ? 'border-primary shadow-lg shadow-primary/20' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
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
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    plan.popular 
                      ? 'bg-primary text-white hover:opacity-90' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Get Started
                </button>
              </form>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Flexible Add-ons</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {ADDONS.map((addon) => (
              <div 
                key={addon.id} 
                className="bg-black/40 border border-white/10 rounded-xl p-6"
              >
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
            <details className="bg-black/40 border border-white/10 rounded-xl p-6">
              <summary className="font-semibold cursor-pointer">What happens when I exceed my minutes?</summary>
              <p className="mt-3 text-gray-300">
                Additional minutes are billed at $0.40 per minute, or you can purchase minute packs for better rates.
              </p>
            </details>
            <details className="bg-black/40 border border-white/10 rounded-xl p-6">
              <summary className="font-semibold cursor-pointer">Can I change plans anytime?</summary>
              <p className="mt-3 text-gray-300">
                Yes! Upgrade or downgrade at any time. Changes take effect on your next billing cycle.
              </p>
            </details>
            <details className="bg-black/40 border border-white/10 rounded-xl p-6">
              <summary className="font-semibold cursor-pointer">Is there a free trial?</summary>
              <p className="mt-3 text-gray-300">
                We offer a 50% discount on your first month for Basic plan. For enterprise trials, contact our sales team.
              </p>
            </details>
          </div>
        </div>
      </div>
    </main>
  );
}
