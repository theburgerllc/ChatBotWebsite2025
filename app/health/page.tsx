// app/health/page.tsx
// Healthcare vertical (hero with 3 CTAs). Copy-only HIPAA note; *no* PHI sent to non-BAA vendors.

import { HeroCTAs } from '@/components/HeroCTAs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Healthcare Assistant - Reduce No-Shows & Improve Patient Care",
  description: "Triage patient inquiries, collect intake information, and schedule appointments 24/7. HIPAA-compliant AI for healthcare practices.",
  keywords: "AI healthcare assistant, patient triage, medical intake, appointment scheduling, HIPAA compliant chatbot"
};

export default function HealthPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            150+ healthcare providers using AI assistants
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Triage Patient Inquiries and
            <span className="text-primary"> Slash No-Shows</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let an AI care concierge answer questions, collect intake, and schedule visits—day or night.
            Improve patient satisfaction while reducing administrative burden on your staff.
          </p>

          <HeroCTAs vertical="health" />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Avg. response &lt; 2 seconds
            </div>
            <div>24/7 availability</div>
            <div>No-show rate reduced by 45%</div>
            <div>HIPAA compliance mode available</div>
          </div>

          {/* HIPAA Notice */}
          <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-200">
              <strong>Privacy Note:</strong> Payment processing is typically HIPAA §1179–exempt when only authorizing,
              processing, clearing, settling, billing, or transferring funds—no PHI is sent to the processor.
              For workflows that handle PHI with a processor, Square offers a BAA.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Intelligent Triage</h3>
            <p className="text-gray-300">
              Screen patient concerns with medical knowledge, directing urgent cases to immediate care
              and routine inquiries to appropriate scheduling.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Streamlined Intake</h3>
            <p className="text-gray-300">
              Collect symptoms, medical history, insurance information, and pre-visit forms
              before patients arrive at your practice.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
            <p className="text-gray-300">
              Reduce no-shows with automated reminders, easy rescheduling, and optimal appointment
              slot recommendations based on patient preferences.
            </p>
          </div>
        </section>

        {/* Healthcare-specific features */}
        <section className="mt-20 bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Built for Healthcare</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">HIPAA Compliance Ready</h4>
                <p className="text-gray-400 text-sm">Enhanced privacy controls and secure data handling for patient information</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">EHR Integration</h4>
                <p className="text-gray-400 text-sm">Seamlessly connect with major electronic health record systems</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Medical Knowledge Base</h4>
                <p className="text-gray-400 text-sm">Trained on medical terminology and common healthcare workflows</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Multilingual Support</h4>
                <p className="text-gray-400 text-sm">Serve diverse patient populations in their preferred language</p>
              </div>
            </div>
          </div>
        </section>

        {/* Self-guided demo anchor for smooth scroll */}
        <section id="self-demo" className="mt-20 bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Experience Healthcare AI</h2>
          <p className="text-gray-300 text-center mb-8">
            Try a common patient flow—symptom checking, insurance verification, and appointment scheduling.
          </p>

          <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-gray-400 mb-4">Patient intake demo loading...</p>
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-4">See how patients interact with your AI assistant</p>
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
          <h3 className="text-2xl font-bold mb-8">Trusted by Healthcare Providers</h3>
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
                "Patients love it. No-show rate cut in half, staff stress way down. Our practice efficiency improved dramatically."
              </p>
              <p className="font-semibold">Dr. Emily Patterson</p>
              <p className="text-sm text-gray-400">HealthFirst Medical Group</p>
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
                "The triage accuracy is impressive. Urgent cases get immediate attention while routine visits are scheduled efficiently."
              </p>
              <p className="font-semibold">Dr. James Liu</p>
              <p className="text-sm text-gray-400">Pacific Family Medicine</p>
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
                "Patient satisfaction scores up 30%. The AI handles intake better than our previous paper-based system."
              </p>
              <p className="font-semibold">Dr. Maria Santos</p>
              <p className="text-sm text-gray-400">Santos Pediatric Care</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}