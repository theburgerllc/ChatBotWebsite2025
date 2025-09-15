// app/law/page.tsx
// Law vertical landing (hero with 3 CTAs). Does not change Tavus code.

import { HeroCTAs } from '@/components/HeroCTAs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Legal Intake Specialist - Convert More Cases 24/7",
  description: "Qualify prospects, capture case details, and book consults automatically. Your AI legal intake specialist works while you sleep.",
  keywords: "AI legal intake, law firm automation, case qualification, legal chatbot, attorney consultation booking"
};

export default function LawPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            42+ law firms using AI intake specialists
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Win More Cases with an
            <span className="text-primary"> AI Legal Intake Specialist</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Qualify prospects, capture case details, and book consults 24/7—without adding headcount.
            Your AI specialist handles initial screening while you focus on winning cases.
          </p>

          <HeroCTAs vertical="law" />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Avg. response &lt; 2 seconds
            </div>
            <div>24/7 availability</div>
            <div>HIPAA-ready mode available</div>
            <div>No-show rate reduced by 60%</div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Qualify Cases 24/7</h3>
            <p className="text-gray-300">
              Screen potential clients instantly with intelligent questions that determine case viability
              before they reach your desk.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Capture Detailed Intake</h3>
            <p className="text-gray-300">
              Collect comprehensive case information, contact details, and supporting documents
              automatically while prospects are engaged.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Book Consultations</h3>
            <p className="text-gray-300">
              Schedule appointments directly into your calendar with qualified prospects,
              reducing administrative overhead by 70%.
            </p>
          </div>
        </section>

        {/* Self-guided demo anchor for smooth scroll */}
        <section id="self-demo" className="mt-20 bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Experience Legal AI in Action</h2>
          <p className="text-gray-300 text-center mb-8">
            Walk through a typical personal injury intake and see how appointments get booked automatically.
          </p>

          <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-gray-400 mb-4">Interactive demo loading...</p>
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-4">See it in action with a real case scenario</p>
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
          <h3 className="text-2xl font-bold mb-8">Trusted by Leading Law Firms</h3>
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
                "ROI became positive within 2 weeks. Our intake process is now seamless and we're capturing 40% more qualified leads."
              </p>
              <p className="font-semibold">Michael Rodriguez</p>
              <p className="text-sm text-gray-400">Rodriguez Law Group</p>
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
                "Game changer for our personal injury practice. The AI handles complex case screening better than our junior associates."
              </p>
              <p className="font-semibold">Sarah Chen</p>
              <p className="text-sm text-gray-400">Chen & Associates</p>
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
                "No-show rate cut in half, qualified leads up 65%. Best investment we've made for our practice growth."
              </p>
              <p className="font-semibold">David Park</p>
              <p className="text-sm text-gray-400">Park Legal Services</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}