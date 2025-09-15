import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy - AI Chatbot Solutions",
  description: "Privacy policy for AI Chatbot Solutions platform, detailing how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="text-sm text-gray-400 mb-8">
            Last updated: [Current Date]
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-300">
                AI Chatbot Solutions ("we," "our," or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you use our AI chatbot platform and related services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>

              <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Contact information (name, email address, phone number)</li>
                <li>• Account credentials and authentication data</li>
                <li>• Payment and billing information</li>
                <li>• Business information (company name, industry, size)</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">Usage Information</h3>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Chatbot interaction data and conversation logs</li>
                <li>• Platform usage statistics and analytics</li>
                <li>• Device information and browser details</li>
                <li>• IP addresses and location data</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">Technical Information</h3>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Cookies and similar tracking technologies</li>
                <li>• Log files and error reports</li>
                <li>• Performance metrics and system diagnostics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Provide and maintain our AI chatbot services</li>
                <li>• Process payments and manage your account</li>
                <li>• Improve our platform and develop new features</li>
                <li>• Send service updates and marketing communications</li>
                <li>• Provide customer support and technical assistance</li>
                <li>• Comply with legal obligations and protect our rights</li>
                <li>• Analyze usage patterns and optimize performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>

              <p className="text-gray-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties
                except in the following circumstances:
              </p>

              <h3 className="text-lg font-semibold mb-3">Service Providers</h3>
              <p className="text-gray-300 mb-4">
                We may share information with trusted third-party service providers who assist us in
                operating our platform, including:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Cloud hosting and infrastructure providers</li>
                <li>• Payment processing services</li>
                <li>• Analytics and monitoring tools</li>
                <li>• Customer support platforms</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">Legal Requirements</h3>
              <p className="text-gray-300">
                We may disclose your information if required by law, court order, or government request,
                or to protect our rights, property, or safety.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to protect your information:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Encryption in transit and at rest</li>
                <li>• Access controls and authentication requirements</li>
                <li>• Regular security audits and assessments</li>
                <li>• Employee training on data protection</li>
                <li>• Incident response procedures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">HIPAA Compliance</h2>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <p className="text-blue-200 mb-4">
                  <strong>Healthcare Data Protection:</strong>
                </p>
                <p className="text-gray-300 mb-4">
                  For healthcare customers, we provide HIPAA-compliant features and can enter into
                  Business Associate Agreements (BAAs) when handling Protected Health Information (PHI).
                </p>
                <p className="text-gray-300">
                  Payment processing is typically HIPAA §1179–exempt when only authorizing, processing,
                  clearing, settling, billing, or transferring funds—no PHI is sent to the processor.
                  For workflows that handle PHI with a processor, Square offers a BAA option.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
              <p className="text-gray-300 mb-4">
                We retain your information for as long as necessary to provide our services and comply
                with legal obligations:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Account information: Duration of account plus 3 years</li>
                <li>• Conversation data: Configurable retention periods (default 2 years)</li>
                <li>• Payment records: 7 years for tax and accounting purposes</li>
                <li>• Analytics data: Aggregated and anonymized permanently</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-gray-300 mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Access and review your personal data</li>
                <li>• Correct inaccurate or incomplete information</li>
                <li>• Delete your personal information</li>
                <li>• Object to or restrict processing</li>
                <li>• Data portability</li>
                <li>• Withdraw consent</li>
              </ul>

              <p className="text-gray-300 mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@aichatbotsolutions.com" className="text-primary hover:underline">
                  privacy@aichatbotsolutions.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-gray-300 mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Essential Cookies</h3>
                  <p className="text-gray-300 text-sm">
                    Required for basic platform functionality, authentication, and security.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Analytics Cookies</h3>
                  <p className="text-gray-300 text-sm">
                    Help us understand usage patterns and improve our services.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Marketing Cookies</h3>
                  <p className="text-gray-300 text-sm">
                    Used to deliver relevant advertisements and measure campaign effectiveness.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Preference Cookies</h3>
                  <p className="text-gray-300 text-sm">
                    Remember your settings and preferences for a better experience.
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mt-4">
                You can manage cookie preferences through your browser settings or our cookie consent banner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
              <p className="text-gray-300">
                Your information may be transferred to and processed in countries other than your own.
                We ensure appropriate safeguards are in place, including Standard Contractual Clauses
                and adequacy decisions, to protect your information during international transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-gray-300">
                Our services are not intended for children under 13 years of age. We do not knowingly
                collect personal information from children under 13. If you believe we have collected
                information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any material
                changes by posting the new policy on this page and updating the "Last updated" date.
                Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <div><strong>Email:</strong> <a href="mailto:privacy@aichatbotsolutions.com" className="text-primary hover:underline">privacy@aichatbotsolutions.com</a></div>
                  <div><strong>Postal Address:</strong><br />
                    AI Chatbot Solutions<br />
                    Privacy Officer<br />
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