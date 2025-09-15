import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Accessibility Statement - AI Chatbot Solutions",
  description: "Our commitment to web accessibility and WCAG 2.2 AA compliance for AI Chatbot Solutions platform.",
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Accessibility Statement</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">
              AI Chatbot Solutions is committed to ensuring digital accessibility for people with disabilities.
              We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
              <p className="text-gray-300 mb-4">
                We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
                These guidelines explain how to make web content more accessible for people with disabilities,
                and user-friendly for everyone.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Keyboard Navigation</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Full keyboard navigation support</li>
                    <li>• Visible focus indicators</li>
                    <li>• Logical tab order</li>
                    <li>• Skip navigation links</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Visual Design</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• High contrast color schemes</li>
                    <li>• Scalable text up to 200%</li>
                    <li>• Touch targets minimum 44px</li>
                    <li>• Clear visual hierarchy</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Screen Reader Support</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Semantic HTML structure</li>
                    <li>• Alt text for images</li>
                    <li>• ARIA labels and descriptions</li>
                    <li>• Proper heading hierarchy</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Interactive Elements</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Form labels and instructions</li>
                    <li>• Error identification and suggestions</li>
                    <li>• Timeout warnings and extensions</li>
                    <li>• Clear link purposes</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Conformance Status</h2>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <p className="text-blue-200">
                  <strong>WCAG 2.2 Level AA</strong> - We aim to conform to WCAG 2.2 Level AA.
                  This conformance status has been determined through self-evaluation and ongoing testing
                  with accessibility tools and real users.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Known Issues</h2>
              <p className="text-gray-300 mb-4">
                We are actively working to address the following known accessibility issues:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Some third-party video embedding may not fully support all screen readers</li>
                <li>• Interactive demo elements are being enhanced for better keyboard navigation</li>
                <li>• PDF documents are being converted to accessible formats</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Feedback and Contact</h2>
              <p className="text-gray-300 mb-4">
                We welcome your feedback on the accessibility of AI Chatbot Solutions.
                Please let us know if you encounter accessibility barriers:
              </p>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <strong>Email:</strong> <a href="mailto:accessibility@aichatbotsolutions.com" className="text-primary hover:underline">accessibility@aichatbotsolutions.com</a>
                  </div>
                  <div>
                    <strong>Response Time:</strong> We aim to respond to accessibility feedback within 2 business days.
                  </div>
                  <div>
                    <strong>Postal Address:</strong><br />
                    AI Chatbot Solutions<br />
                    Accessibility Team<br />
                    [Your Business Address]
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Accessibility Testing</h2>
              <p className="text-gray-300 mb-4">
                We regularly test our website using various methods and tools:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Automated testing with axe-core and Lighthouse</li>
                <li>• Manual testing with keyboard navigation</li>
                <li>• Screen reader testing (NVDA, JAWS, VoiceOver)</li>
                <li>• User testing with people with disabilities</li>
                <li>• Regular accessibility audits by third-party experts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Browser and Assistive Technology Support</h2>
              <p className="text-gray-300 mb-4">
                AI Chatbot Solutions is designed to be compatible with the following assistive technologies:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Screen Readers</h3>
                  <ul className="space-y-1 text-gray-300">
                    <li>• NVDA (Windows)</li>
                    <li>• JAWS (Windows)</li>
                    <li>• VoiceOver (macOS, iOS)</li>
                    <li>• TalkBack (Android)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Browsers</h3>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Chrome (latest)</li>
                    <li>• Firefox (latest)</li>
                    <li>• Safari (latest)</li>
                    <li>• Edge (latest)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Continuous Improvement</h2>
              <p className="text-gray-300 mb-4">
                Accessibility is an ongoing effort. We continuously work to improve the accessibility
                of our website and services. Our development team receives regular accessibility training,
                and we incorporate accessibility considerations into our design and development processes
                from the beginning of each project.
              </p>

              <p className="text-gray-300">
                This accessibility statement was last updated on <strong>[Current Date]</strong> and
                applies to the AI Chatbot Solutions website and related services.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}