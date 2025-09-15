import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service - AI Chatbot Solutions",
  description: "Terms of service for AI Chatbot Solutions platform, outlining the rules and regulations for using our AI chatbot services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="text-sm text-gray-400 mb-8">
            Last updated: [Current Date]
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing or using AI Chatbot Solutions ("Service"), you agree to be bound by these
                Terms of Service ("Terms"). If you disagree with any part of these terms, then you may
                not access the Service. These Terms apply to all visitors, users, and others who access
                or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-gray-300 mb-4">
                AI Chatbot Solutions provides artificial intelligence-powered chatbot and conversational
                AI services, including but not limited to:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• AI-powered chat interfaces for websites and applications</li>
                <li>• Video-based AI assistants and virtual representatives</li>
                <li>• Lead qualification and customer support automation</li>
                <li>• Analytics and reporting tools</li>
                <li>• Integration APIs and customization tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>

              <h3 className="text-lg font-semibold mb-3">Account Registration</h3>
              <p className="text-gray-300 mb-4">
                To use certain features of the Service, you must register for an account. You agree to:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Provide accurate, current, and complete information</li>
                <li>• Maintain and update your account information</li>
                <li>• Keep your password secure and confidential</li>
                <li>• Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">Account Eligibility</h3>
              <p className="text-gray-300">
                You must be at least 18 years old and have the legal capacity to enter into contracts
                in your jurisdiction to use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>

              <h3 className="text-lg font-semibold mb-3">Permitted Uses</h3>
              <p className="text-gray-300 mb-4">
                You may use the Service for lawful business purposes in compliance with these Terms
                and applicable laws.
              </p>

              <h3 className="text-lg font-semibold mb-3">Prohibited Uses</h3>
              <p className="text-gray-300 mb-4">You agree not to use the Service to:</p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Violate any applicable laws or regulations</li>
                <li>• Infringe on intellectual property rights</li>
                <li>• Transmit harmful, offensive, or inappropriate content</li>
                <li>• Impersonate others or provide false information</li>
                <li>• Interfere with or disrupt the Service or servers</li>
                <li>• Attempt unauthorized access to our systems</li>
                <li>• Use the Service for spam or unsolicited communications</li>
                <li>• Train competing AI models or reverse engineer our technology</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Subscription and Payment</h2>

              <h3 className="text-lg font-semibold mb-3">Subscription Plans</h3>
              <p className="text-gray-300 mb-4">
                Our Service is offered through various subscription plans with different features
                and usage limits. Current pricing is available on our pricing page.
              </p>

              <h3 className="text-lg font-semibold mb-3">Payment Terms</h3>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Subscriptions are billed in advance on a monthly or annual basis</li>
                <li>• All fees are non-refundable except as required by law</li>
                <li>• Usage overage fees apply as described in your plan</li>
                <li>• We may update prices with 30 days' notice</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">Cancellation</h3>
              <p className="text-gray-300">
                You may cancel your subscription at any time. Cancellation takes effect at the end
                of your current billing period. No refunds will be provided for partial months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data and Privacy</h2>

              <h3 className="text-lg font-semibold mb-3">Your Data</h3>
              <p className="text-gray-300 mb-4">
                You retain ownership of all data you provide to the Service. We process your data
                according to our Privacy Policy and applicable data protection laws.
              </p>

              <h3 className="text-lg font-semibold mb-3">Data Usage Rights</h3>
              <p className="text-gray-300 mb-4">
                You grant us a limited license to use your data solely to provide the Service,
                including processing, analyzing, and improving our AI models in an aggregated
                and anonymized manner.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-200">HIPAA Compliance</h3>
                <p className="text-gray-300">
                  For healthcare customers handling Protected Health Information (PHI), we provide
                  HIPAA-compliant features and can execute Business Associate Agreements (BAAs)
                  upon request. Contact us for healthcare-specific compliance requirements.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>

              <h3 className="text-lg font-semibold mb-3">Our Rights</h3>
              <p className="text-gray-300 mb-4">
                The Service and its original content, features, and functionality are and will remain
                the exclusive property of AI Chatbot Solutions and its licensors. The Service is
                protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-lg font-semibold mb-3">Your Rights</h3>
              <p className="text-gray-300">
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable
                license to access and use the Service for your business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Service Availability</h2>

              <h3 className="text-lg font-semibold mb-3">Uptime Commitment</h3>
              <p className="text-gray-300 mb-4">
                We strive to maintain 99.9% uptime for our Service, excluding scheduled maintenance
                and circumstances beyond our control.
              </p>

              <h3 className="text-lg font-semibold mb-3">Maintenance</h3>
              <p className="text-gray-300">
                We may perform maintenance that temporarily interrupts the Service. We will provide
                advance notice when possible and minimize disruption.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <p className="text-red-200 mb-4">
                  <strong>IMPORTANT LIMITATION:</strong>
                </p>
                <p className="text-gray-300 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, AI CHATBOT SOLUTIONS SHALL NOT BE LIABLE
                  FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY
                  LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
                </p>
                <p className="text-gray-300">
                  OUR TOTAL LIABILITY TO YOU FOR ANY DAMAGES SHALL NOT EXCEED THE AMOUNT YOU PAID
                  TO US IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Disclaimers</h2>
              <p className="text-gray-300 mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.
                WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE</li>
                <li>• NON-INFRINGEMENT AND TITLE</li>
                <li>• ACCURACY, COMPLETENESS, OR RELIABILITY OF CONTENT</li>
                <li>• UNINTERRUPTED OR ERROR-FREE OPERATION</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Indemnification</h2>
              <p className="text-gray-300">
                You agree to indemnify and hold harmless AI Chatbot Solutions and its affiliates,
                officers, agents, and employees from any claim or demand, including reasonable
                attorneys' fees, arising from your use of the Service, violation of these Terms,
                or infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Termination</h2>

              <h3 className="text-lg font-semibold mb-3">Termination by You</h3>
              <p className="text-gray-300 mb-4">
                You may terminate your account at any time by following the cancellation process
                in your account settings or contacting support.
              </p>

              <h3 className="text-lg font-semibold mb-3">Termination by Us</h3>
              <p className="text-gray-300 mb-4">
                We may terminate or suspend your account immediately if you:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Violate these Terms or our policies</li>
                <li>• Fail to pay fees when due</li>
                <li>• Engage in fraudulent or illegal activities</li>
                <li>• Pose a security risk to our Service or other users</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">Effects of Termination</h3>
              <p className="text-gray-300">
                Upon termination, your right to use the Service ceases immediately. We will provide
                a reasonable opportunity to export your data before deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-gray-300">
                These Terms shall be governed by and construed in accordance with the laws of
                [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes
                arising from these Terms or the Service shall be resolved in the courts of
                [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify these Terms at any time. We will provide notice of
                material changes by email or through the Service. Your continued use after changes
                constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <div><strong>Email:</strong> <a href="mailto:legal@aichatbotsolutions.com" className="text-primary hover:underline">legal@aichatbotsolutions.com</a></div>
                  <div><strong>Postal Address:</strong><br />
                    AI Chatbot Solutions<br />
                    Legal Department<br />
                    [Your Business Address]
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}