"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PeelCard from "@/components/PeelCard";
import { FEATURES, TESTIMONIALS } from "@/config/features";
import CVIDemo from "@/components/cvi/CVIDemo";
import { FadeIn, SlideIn } from "@/components/motion/reveal";
import { ArrowRight, Users, Clock, DollarSign, Play } from "lucide-react";
import { track } from "@/lib/tracking";

// Live visitor counter component
function LiveVisitorCount() {
  const [count, setCount] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-sm">
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      {count} people exploring AI demos now
    </div>
  );
}

// Animated stats counter
function CountUpNumber({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span>{count}</span>;
}

// Animated stats component
function AnimatedStats() {
  const stats = [
    { label: "Leads Converted", value: 47, suffix: "%" },
    { label: "Hours Saved Weekly", value: 32, suffix: "hrs" },
    { label: "Cost Reduction", value: 68, suffix: "%" }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl font-bold text-primary">
            <CountUpNumber end={stat.value} duration={2} />{stat.suffix}
          </div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <main>
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-black to-neutral-900">
        <div className="container">
          {/* Trust bar */}
          <div className="text-center mb-8">
            <LiveVisitorCount />
          </div>

          {/* Main hero content */}
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Convert <span className="text-primary">47% More Leads</span> in 30 Days
                <br />Without Hiring More Staff
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                Your AI video agent qualifies leads, books appointments, and answers questions 24/7
                while you sleep. No training needed, starts working in 5 minutes.
              </p>

              {/* Dual CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/demos"
                  className="btn btn-primary text-lg px-8 py-4 group"
                  onClick={() => track('Hero_Demo_CTA_Clicked')}
                >
                  See Your Industry Demo
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => {
                    setVideoModalOpen(true);
                    track('Hero_Video_CTA_Clicked');
                  }}
                  className="btn btn-secondary text-lg px-8 py-4 group"
                >
                  <Play className="inline-block mr-2 group-hover:scale-110 transition-transform" size={20} />
                  Watch 2-Min Overview
                </button>
              </div>

              {/* Urgency element */}
              <div className="text-sm text-yellow-400 mb-8">
                ⚡ Limited Time: 50% off setup (expires in 48 hours)
              </div>

              {/* Animated stats */}
              <AnimatedStats />

              {/* Social proof */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Trusted by 500+ businesses</p>
                <div className="flex justify-center items-center gap-8 opacity-50">
                  <div className="text-gray-500 font-semibold">TechFlow Inc.</div>
                  <div className="text-gray-500 font-semibold">Rodriguez Law</div>
                  <div className="text-gray-500 font-semibold">HealthFirst</div>
                  <div className="text-gray-500 font-semibold">DataCore</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-neutral-900 to-black border border-primary/20 rounded-2xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">See AI Chatbots in Action</h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black/60 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
              <p className="text-gray-400">Video demo placeholder - integrate with your video content</p>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="section bg-black/40">
        <div className="container">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose AI Chatbot Solutions?
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <FadeIn key={feature.title} delay={i * 0.1}>
                  <PeelCard 
                    front={feature.title} 
                    peelContent={feature.description}
                    icon={<Icon size={24} />}
                  />
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Experience It Live
              </h2>
              <p className="text-xl text-gray-300">
                Start a conversation with our AI legal intake specialist
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-black/60 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                <CVIDemo vertical="legal" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gradient-to-b from-neutral-900 to-black">
        <div className="container">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Trusted by Leading Teams
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                  <p className="text-gray-300 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary/10 border-y border-primary/20">
        <div className="container text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of businesses using AI chatbot solutions
            </p>
            <Link href="/pricing" className="btn btn-primary text-lg px-8 py-4">
              Get Started Today
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
