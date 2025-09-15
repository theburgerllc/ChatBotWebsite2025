import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "HIPAA Business Associate Agreement - AI Chatbot Solutions",
  description: "Information about HIPAA compliance and Business Associate Agreements for healthcare customers using AI Chatbot Solutions.",
};

export default function BAAPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">HIPAA Business Associate Agreement</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Healthcare Data Protection</h2>
              <p className="text-gray-300 mb-6">
                AI Chatbot Solutions is committed to supporting healthcare organizations in maintaining
                HIPAA compliance while leveraging the power of AI-driven patient engagement and support.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-200">
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Key Information
                  </span>
                </h3>
                <p className="text-gray-300 mb-4">
                  <strong>Payment Processing Exemption:</strong> Payment processing is typically HIPAA §1179–exempt
                  when only authorizing, processing, clearing, settling, billing, or transferring funds—no
                  Protected Health Information (PHI) is sent to the payment processor.
                </p>
                <p className="text-gray-300">
                  <strong>Square BAA Available:</strong> For workflows that handle PHI with a payment processor,
                  Square offers a Business Associate Agreement option to ensure compliance.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our HIPAA Compliance Features</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Technical Safeguards</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• End-to-end encryption for all data transmission</li>
                    <li>• Encrypted data storage at rest</li>
                    <li>• Access controls and user authentication</li>
                    <li>• Audit logs and monitoring systems</li>
                    <li>• Automatic session timeouts</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Administrative Safeguards</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• HIPAA compliance training for all staff</li>
                    <li>• Designated privacy and security officers</li>
                    <li>• Incident response procedures</li>
                    <li>• Regular risk assessments</li>
                    <li>• Workforce background checks</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Physical Safeguards</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Secure data centers with 24/7 monitoring</li>
                    <li>• Biometric access controls</li>
                    <li>• Environmental controls and redundancy</li>
                    <li>• Secure media disposal procedures</li>
                    <li>• Workstation use restrictions</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Data Management</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Configurable data retention policies</li>
                    <li>• Secure data deletion capabilities</li>
                    <li>• Data minimization practices</li>
                    <li>• Regular security audits</li>
                    <li>• Breach notification procedures</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Business Associate Agreement (BAA)</h2>

              <p className="text-gray-300 mb-6">
                For healthcare organizations that are HIPAA covered entities, we provide comprehensive
                Business Associate Agreements that outline our responsibilities for protecting PHI.
              </p>

              <h3 className="text-lg font-semibold mb-3">What Our BAA Covers</h3>
              <ul className="space-y-2 text-gray-300 ml-6 mb-6">
                <li>• Definition of permitted uses and disclosures of PHI</li>
                <li>• Safeguards to protect PHI from unauthorized use or disclosure</li>
                <li>• Procedures for reporting security incidents and breaches</li>
                <li>• Requirements for subcontractor agreements</li>
                <li>• Data return or destruction upon contract termination</li>
                <li>• Audit rights and compliance monitoring</li>
              </ul>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3 text-green-200">Ready to Execute</h3>
                <p className="text-gray-300">
                  Our standard BAA template is pre-approved by healthcare compliance experts and ready
                  for execution. We can typically have a signed BAA in place within 1-2 business days
                  of your request.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Healthcare Use Cases</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Patient Intake</h3>
                  <p className="text-gray-300 text-sm">
                    Collect patient information, insurance details, and initial symptoms
                    while maintaining HIPAA compliance.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Appointment Scheduling</h3>
                  <p className="text-gray-300 text-sm">
                    Enable patients to book, reschedule, and cancel appointments
                    through secure AI interactions.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Symptom Triage</h3>
                  <p className="text-gray-300 text-sm">
                    Guide patients through symptom assessment and direct them
                    to appropriate care levels.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Prescription Refills</h3>
                  <p className="text-gray-300 text-sm">
                    Automate prescription refill requests while ensuring
                    proper authorization and documentation.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Insurance Verification</h3>
                  <p className="text-gray-300 text-sm">
                    Verify insurance coverage and benefits before
                    appointments to reduce administrative burden.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Post-Care Follow-up</h3>
                  <p className="text-gray-300 text-sm">
                    Conduct secure follow-up communications and
                    satisfaction surveys with patients.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Compliance Certifications</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">SOC 2 Type II</h3>
                  <p className="text-gray-300 text-sm">
                    Independently audited for security, availability, processing integrity,
                    confidentiality, and privacy controls.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">HITRUST CSF</h3>
                  <p className="text-gray-300 text-sm">
                    Certified against the HITRUST Common Security Framework for
                    healthcare information protection.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Requesting a BAA</h2>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">How to Get Started</h3>
                <ol className="space-y-3 text-gray-300">
                  <li>1. <strong>Contact our compliance team</strong> at <a href="mailto:compliance@aichatbotsolutions.com" className="text-primary hover:underline">compliance@aichatbotsolutions.com</a></li>
                  <li>2. <strong>Provide your organization details</strong> and specific use case requirements</li>
                  <li>3. <strong>Review our standard BAA template</strong> or submit your organization's preferred template</li>
                  <li>4. <strong>Complete the signature process</strong> through our secure document platform</li>
                  <li>5. <strong>Enable HIPAA compliance mode</strong> in your AI Chatbot Solutions account</li>
                </ol>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-yellow-200">Important Note</h3>
                <p className="text-gray-300">
                  HIPAA compliance features are available as an add-on to our standard plans.
                  Please contact us for pricing and implementation details specific to your
                  healthcare organization's needs.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Support and Resources</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Dedicated HIPAA Support</h4>
                    <p className="text-gray-400 text-sm">Our compliance team provides ongoing support for HIPAA-related questions and requirements.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Implementation Guidance</h4>
                    <p className="text-gray-400 text-sm">Step-by-step guidance for configuring HIPAA-compliant workflows and data handling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Regular Compliance Updates</h4>
                    <p className="text-gray-400 text-sm">Stay informed about HIPAA regulation changes and how they affect your AI chatbot implementation.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Our Compliance Team</h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  For questions about HIPAA compliance, BAA execution, or healthcare-specific features:
                </p>
                <div className="space-y-2">
                  <div><strong>Email:</strong> <a href="mailto:compliance@aichatbotsolutions.com" className="text-primary hover:underline">compliance@aichatbotsolutions.com</a></div>
                  <div><strong>Phone:</strong> <a href="tel:+1-800-HIPAA-AI" className="text-primary hover:underline">1-800-HIPAA-AI</a></div>
                  <div><strong>Response Time:</strong> Within 4 hours for compliance-related inquiries</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}