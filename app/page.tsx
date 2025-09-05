import Image from "next/image";
import Link from "next/link";
import PeelCard from "@/components/PeelCard";
import { FEATURES, TESTIMONIALS } from "@/config/features";
import CVIDemo from "@/components/cvi/CVIDemo";
import { FadeIn, SlideIn } from "@/components/motion/reveal";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-black to-neutral-900">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Meet Your AI Chatbot Assistant
              </h1>
              <p className="mt-6 text-xl text-gray-300">
                Engage visitors with intelligent AI conversations. 
                Qualify leads, answer questions, and convert more—24/7.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/pricing" className="btn btn-primary text-lg">
                  Start for $12.50/mo
                </Link>
                <Link href="/demos" className="btn btn-secondary text-lg">
                  See Live Demos
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                🔥 Limited offer: 50% off first month on Basic plan
              </p>
            </div>
          </FadeIn>
          <SlideIn direction="right">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl"></div>
              <Image 
                src="/brand/ai-chatbot-logo.png" 
                alt="AI Chatbot Solutions" 
                width={500} 
                height={400} 
                className="relative mx-auto rounded-lg object-contain"
                priority
              />
            </div>
          </SlideIn>
        </div>
      </section>

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
