import Image from "next/image";
import { Users, Target, Award } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Users,
      title: "Human-Centered AI",
      description: "We believe AI should enhance human connections, not replace them."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every feature we build is designed to drive measurable business outcomes."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We&apos;re committed to delivering the highest quality AI experiences."
    }
  ];

  return (
    <main className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Image 
              src="/brand/mascot.png" 
              alt="AI Video Agent" 
              width={120} 
              height={120}
              className="mx-auto mb-6 rounded-lg"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About AI Video Agent Solutions
            </h1>
            <p className="text-xl text-gray-300">
              Humanizing AI, one conversation at a time.
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-gray-300">
              We&apos;re on a mission to transform how businesses connect with their customers 
              through conversational video AI. Founded by a team of AI researchers and 
              customer experience experts, we&apos;ve built the most advanced video agent 
              platform in the market.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">Our Story</h2>
            <p className="text-gray-300">
              It started with a simple observation: despite advances in AI, customer 
              interactions were becoming less personal. Chatbots felt robotic. Phone 
              trees were frustrating. We knew there had to be a better way.
            </p>
            <p className="text-gray-300">
              That&apos;s when we created the first AI video agent—combining the efficiency 
              of automation with the warmth of face-to-face conversation. Today, our 
              agents handle millions of conversations across legal, e-commerce, and 
              healthcare industries.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 my-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="text-center">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-300">{value.description}</p>
                  </div>
                );
              })}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">Join Our Journey</h2>
            <p className="text-gray-300">
              We&apos;re just getting started. As AI technology evolves, so do we. 
              Join thousands of businesses already transforming their customer 
              experience with AI video agents.
            </p>

            <div className="flex gap-4 justify-center mt-8">
              <a href="/contact" className="btn btn-primary">Get in Touch</a>
              <a href="/demos" className="btn btn-secondary">See Demos</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
