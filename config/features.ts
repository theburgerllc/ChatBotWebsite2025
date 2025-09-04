import { Shield, Zap, Globe, Users, Clock, Brain, type LucideIcon } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FEATURES: Feature[] = [
  { 
    title: "24/7 Availability", 
    description: "AI video agents that never sleep—capture and qualify every lead, any time.",
    icon: Clock
  },
  { 
    title: "Industry Personas", 
    description: "Pre-trained for legal intake, e-commerce support, and healthcare triage.",
    icon: Users
  },
  { 
    title: "Seamless Integration", 
    description: "Drop-in widget and API with minutes-based pricing. Deploy in minutes.",
    icon: Zap
  },
  {
    title: "Multi-language Support",
    description: "Converse naturally in 30+ languages with real-time translation.",
    icon: Globe
  },
  {
    title: "Knowledge Base",
    description: "Connect your docs, FAQs, and product catalogs for accurate responses.",
    icon: Brain
  },
  {
    title: "Enterprise Security",
    description: "HIPAA-ready mode, end-to-end encryption, and compliance controls.",
    icon: Shield
  }
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Our conversion rate jumped 40% after adding the AI video agent to our site.",
    author: "Sarah Chen",
    role: "VP Marketing",
    company: "TechFlow Inc."
  },
  {
    quote: "It handles 80% of our intake calls, freeing our paralegals for complex cases.",
    author: "Michael Rodriguez",
    role: "Managing Partner",
    company: "Rodriguez Law Group"
  },
  {
    quote: "Patients love the instant, friendly help. Our no-show rate dropped by half.",
    author: "Dr. Emily Park",
    role: "Clinic Director",
    company: "HealthFirst Medical"
  }
];
