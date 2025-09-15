"use client";
import { useState } from "react";
import { track } from "@/lib/tracking";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface DemoQualifierProps {
  vertical: string;
  onQualified: (data: any) => void;
}

export function DemoQualifier({ vertical, onQualified }: DemoQualifierProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const painPoints: Record<string, string[]> = {
    legal: [
      "Missing qualified leads after hours",
      "Paralegals overwhelmed with intake calls",
      "Losing cases to faster-responding firms"
    ],
    healthcare: [
      "High no-show rates for appointments",
      "Staff burnout from repetitive questions",
      "Patients choosing competitors with better availability"
    ],
    ecommerce: [
      "Cart abandonment over 70%",
      "Customer service costs eating profits",
      "Can't compete with Amazon's 24/7 support"
    ],
    general: [
      "Missing leads outside business hours",
      "High customer service costs",
      "Slow response times losing customers"
    ]
  };

  const handlePainPointSelect = (painPoint: string) => {
    const updatedData = { ...data, painPoint };
    setData(updatedData);
    track("Demo_Pain_Point_Selected", { vertical, painPoint });
    setStep(2);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      track("Demo_Qualified", {
        vertical,
        ...data,
        qualificationSource: "demo_page"
      });

      // Simulate API call for lead capture
      await new Promise(resolve => setTimeout(resolve, 500));

      onQualified(data);
    } catch (error) {
      console.error("Error qualifying lead:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  if (step === 1) {
    return (
      <div className="bg-black/60 border border-primary/20 rounded-xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">
            Which challenge costs you the most?
          </h3>
          <p className="text-gray-400">
            Select your biggest pain point to see a personalized demo
          </p>
        </div>

        <div className="space-y-3">
          {painPoints[vertical]?.map((point, i) => (
            <button
              key={i}
              onClick={() => handlePainPointSelect(point)}
              className="w-full text-left p-4 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <span>{point}</span>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onQualified({ painPoint: "Not specified" })}
            className="text-gray-400 hover:text-white text-sm underline"
          >
            Skip and start demo
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="bg-black/60 border border-primary/20 rounded-xl p-8">
        <div className="text-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">
            Perfect! Let's personalize your demo
          </h3>
          <p className="text-gray-400">
            See exactly how {data.companyName || 'your business'} could solve: "{data.painPoint}"
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="Enter your first name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
              onChange={(e) => updateFormData('name', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Work Email *
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
              onChange={(e) => updateFormData('email', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Your company"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
              onChange={(e) => updateFormData('companyName', e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary text-lg py-4 mt-6"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Starting Your Demo...
              </div>
            ) : (
              <>
                Start Personalized Demo
                <ArrowRight className="ml-2" size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setStep(1)}
            disabled={loading}
            className="text-gray-400 hover:text-white text-sm underline"
          >
            ← Change pain point
          </button>
        </div>
      </div>
    );
  }

  return null;
}