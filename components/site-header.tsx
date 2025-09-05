"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

function Promo() {
  return (
    <div className="banner">
      🔥 Limited Time: 50% off Basic ($12.50/mo) • Starter $174 (save $25) • Growth $549 (save $50)
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/demos", label: "Demos" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];
  
  const isActive = (href: string) => pathname.startsWith(href);
  
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <Promo />
      <div className="bg-black/60 backdrop-blur border-b border-white/10">
        <div className="container flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/brand/ai-chatbot-logo.png" 
              alt="AI Chatbot Solutions" 
              width={48} 
              height={48}
              className="rounded-lg"
            />
            <span className="font-bold tracking-tight text-lg">
              AI <span className="text-primary">Chatbot</span> Solutions
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "hover:text-white transition-colors",
                  isActive(link.href) ? "text-white" : "text-gray-300"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/pricing" className="btn btn-primary text-xs py-2 px-4">
              Get Started
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur">
            <div className="container py-4 space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block py-2 hover:text-white transition-colors",
                    isActive(link.href) ? "text-white" : "text-gray-300"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/pricing" 
                className="btn btn-primary w-full text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
