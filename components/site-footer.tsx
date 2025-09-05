import Image from "next/image";
import Link from "next/link";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-white/10 mt-24">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image 
                src="/brand/ai-chatbot-logo.png" 
                alt="AI Chatbot Solutions" 
                width={48} 
                height={48}
                className="rounded-lg"
              />
              <span className="font-bold">AI Chatbot Solutions</span>
            </div>
            <p className="text-sm text-gray-400">
              Conversational AI agents for legal, e-commerce, and healthcare teams.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/demos" className="hover:text-white">Live Demos</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-white">API Reference</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-3">
              Get product updates and industry insights.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:border-primary"
              />
              <button type="submit" className="btn btn-primary w-full text-sm py-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © {currentYear} AI Chatbot Solutions. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a href="mailto:hello@aichatbotsolutions.io" aria-label="Email">
              <Mail size={20} className="text-gray-400 hover:text-white" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <Linkedin size={20} className="text-gray-400 hover:text-white" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <Twitter size={20} className="text-gray-400 hover:text-white" />
            </a>
          </div>
          
          <div className="text-xs text-gray-500">
            Powered by Next.js 15 • React 19 • Tailwind v4
          </div>
        </div>
      </div>
    </footer>
  );
}
