// app/retail/page.tsx
// Retail/e-commerce vertical (hero with 3 CTAs). No Tavus changes.

import { HeroCTAs } from '@/components/HeroCTAs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Sales Associate - Convert More Shoppers 24/7",
  description: "Answer product questions, recommend bundles, and recover carts in real-time. Your AI sales associate that never sleeps.",
  keywords: "AI sales assistant, e-commerce chatbot, product recommendations, cart recovery, retail automation"
};

export default function RetailPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            300+ e-commerce stores using AI sales associates
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Convert More Shoppers with a
            <span className="text-primary"> 24/7 AI Sales Associate</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Answer product questions, recommend bundles, and recover carts in real-time.
            Your AI associate provides personalized shopping experiences that drive sales.
          </p>

          <HeroCTAs vertical="retail" />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Guided product Q&A
            </div>
            <div>Cart recovery prompts</div>
            <div>Seamless handoff to checkout</div>
            <div>Average order value +25%</div>
          </div>

          {/* Shop Pay Integration Note (if configured) */}
          {process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL && (
            <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-green-200">
                <strong>Shop Pay Integration:</strong> Studies show Shop Pay can increase conversion rates by up to 50% vs guest checkout.
                <a
                  href={process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 underline hover:text-white transition"
                >
                  Continue in Shopify →
                </a>
              </p>
            </div>
          )}
        </section>

        {/* Benefits Section */}
        <section className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Smart Product Discovery</h3>
            <p className="text-gray-300">
              Help customers find exactly what they need with intelligent questioning
              and personalized product recommendations based on their preferences.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Instant Support</h3>
            <p className="text-gray-300">
              Answer sizing questions, check inventory, explain features, and provide
              real-time support when customers need it most.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Cart Recovery</h3>
            <p className="text-gray-300">
              Proactively engage customers who abandon carts with personalized offers,
              size alternatives, or helpful product information.
            </p>
          </div>
        </section>

        {/* E-commerce specific features */}
        <section className="mt-20 bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Built for E-commerce</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Product Catalog Integration</h4>
                <p className="text-gray-400 text-sm">Real-time inventory, pricing, and product details from your store</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Personalized Recommendations</h4>
                <p className="text-gray-400 text-sm">AI-powered upsells and cross-sells based on customer behavior</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Order Tracking</h4>
                <p className="text-gray-400 text-sm">Help customers check order status and shipping information</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Promotional Campaigns</h4>
                <p className="text-gray-400 text-sm">Automatically apply discounts and promote current sales</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Return & Exchange Help</h4>
                <p className="text-gray-400 text-sm">Guide customers through return policies and exchange processes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Shopify & WooCommerce</h4>
                <p className="text-gray-400 text-sm">Native integrations with popular e-commerce platforms</p>
              </div>
            </div>
          </div>
        </section>

        {/* Self-guided demo anchor for smooth scroll */}
        <section id="self-demo" className="mt-20 bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Experience Retail AI</h2>
          <p className="text-gray-300 text-center mb-8">
            Explore how the agent handles sizing questions, availability checks, and product recommendations.
          </p>

          <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-gray-400 mb-4">Shopping assistant demo loading...</p>
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-4">See how customers shop with AI assistance</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/pricing"
                className="btn bg-primary text-white hover:bg-primary/80 transition px-6 py-3 rounded-lg"
              >
                See Pricing
              </a>
              <a
                href="/demos"
                className="btn bg-white/10 text-white hover:bg-white/20 transition px-6 py-3 rounded-lg"
              >
                Try Live Demo
              </a>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8">Trusted by E-commerce Leaders</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">
                "Conversion rate jumped from 2% to 8%. The AI handles customer questions better than our human chat agents."
              </p>
              <p className="font-semibold">Sarah Chen</p>
              <p className="text-sm text-gray-400">TechFlow E-commerce</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">
                "Cart abandonment down 40%, average order value up 25%. Best investment we've made for our online store."
              </p>
              <p className="font-semibold">Mike Johnson</p>
              <p className="text-sm text-gray-400">Urban Style Co.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">
                "Customer satisfaction up, support tickets down. The AI knows our products better than most sales staff."
              </p>
              <p className="font-semibold">Lisa Martinez</p>
              <p className="text-sm text-gray-400">Outdoor Gear Plus</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}