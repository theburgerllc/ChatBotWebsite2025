import Link from "next/link";
import { Briefcase, ShoppingCart, Heart, Users } from "lucide-react";

export default function DemoCenter() {
  const demos = [
    {
      id: "legal",
      title: "Legal Intake Specialist",
      description: "Qualify prospective clients, answer FAQs, and collect case details 24/7.",
      icon: Briefcase,
      href: "/demos/legal",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "ecommerce",
      title: "E-commerce Shopping Assistant",
      description: "Guide customers, answer product questions, and increase conversions.",
      icon: ShoppingCart,
      href: "/demos/ecommerce",
      color: "from-green-500 to-green-600"
    },
    {
      id: "healthcare",
      title: "Healthcare Concierge",
      description: "Triage patient inquiries, collect intake, and schedule appointments.",
      icon: Heart,
      href: "/demos/healthcare",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <main className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive Demo Center
          </h1>
          <p className="text-xl text-gray-300">
            Experience our AI video agents tailored for your industry
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <Link
                key={demo.id}
                href={demo.href}
                className="group relative bg-black/40 border border-white/10 rounded-xl p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`} />
                
                <Icon className="w-12 h-12 text-primary mb-4" />
                
                <h2 className="text-xl font-bold mb-2">{demo.title}</h2>
                <p className="text-gray-300 mb-4">{demo.description}</p>
                
                <span className="inline-flex items-center text-primary group-hover:gap-2 transition-all">
                  Start Demo 
                  <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 rounded-xl p-8">
          <div className="text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Need a Custom Demo?</h2>
            <p className="text-gray-300 mb-6">
              We can create a personalized demo for your specific use case
            </p>
            <a href="/contact" className="btn btn-primary">Request Custom Demo</a>
          </div>
        </div>
      </div>
    </main>
  );
}
