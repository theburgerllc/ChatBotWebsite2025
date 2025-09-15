"use client";
import { useState } from "react";
import Link from "next/link";
import { track } from "@/lib/tracking";
import { Calculator, Download, TrendingUp, Clock, DollarSign, Users } from "lucide-react";

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState({
    monthlyLeads: 100,
    conversionRate: 5,
    averageDealSize: 1000,
    hoursOnSupport: 40,
    industry: "general"
  });

  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);

  // Calculate ROI projections
  const currentRevenue = (inputs.monthlyLeads * inputs.conversionRate / 100) * inputs.averageDealSize;
  const projectedRevenue = (inputs.monthlyLeads * (inputs.conversionRate * 1.47) / 100) * inputs.averageDealSize; // 47% increase
  const revenueIncrease = projectedRevenue - currentRevenue;
  const hoursSaved = inputs.hoursOnSupport * 0.7; // 70% time savings
  const costSavings = hoursSaved * 25 * 4.33; // $25/hour average, 4.33 weeks/month
  const starterPlanCost = 199; // Based on Starter plan
  const totalBenefit = revenueIncrease + costSavings;
  const netBenefit = totalBenefit - starterPlanCost;
  const totalROI = ((netBenefit) / starterPlanCost) * 100;

  const handleCalculate = () => {
    setShowResults(true);
    track("ROI_Calculated", {
      ...inputs,
      revenueIncrease,
      costSavings,
      totalROI
    });
  };

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();

    track("ROI_Email_Captured", {
      email,
      ...inputs,
      calculatedROI: totalROI
    });

    setEmailCaptured(true);
  };

  const updateInput = (field: string, value: number | string) => {
    setInputs({ ...inputs, [field]: value });
    if (showResults) {
      // Recalculate in real-time
      setTimeout(() => {
        track("ROI_Input_Changed", { field, value });
      }, 100);
    }
  };

  return (
    <main className="section">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <Calculator className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Chatbot ROI Calculator
          </h1>
          <p className="text-xl text-gray-300">
            Calculate your potential return on investment with AI chatbot automation
          </p>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Business Metrics</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Industry
              </label>
              <select
                value={inputs.industry}
                onChange={(e) => updateInput('industry', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
              >
                <option value="general">General Business</option>
                <option value="legal">Legal Services</option>
                <option value="healthcare">Healthcare</option>
                <option value="ecommerce">E-commerce</option>
                <option value="realestate">Real Estate</option>
                <option value="saas">SaaS/Technology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Monthly Website Leads
              </label>
              <input
                type="number"
                min="1"
                value={inputs.monthlyLeads}
                onChange={(e) => updateInput('monthlyLeads', +e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Current Conversion Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={inputs.conversionRate}
                onChange={(e) => updateInput('conversionRate', +e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Average Deal Size ($)
              </label>
              <input
                type="number"
                min="1"
                value={inputs.averageDealSize}
                onChange={(e) => updateInput('averageDealSize', +e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Hours/Week on Customer Support
              </label>
              <input
                type="number"
                min="0"
                value={inputs.hoursOnSupport}
                onChange={(e) => updateInput('hoursOnSupport', +e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {!showResults && (
            <button
              onClick={handleCalculate}
              className="w-full btn btn-primary text-lg py-4"
            >
              <Calculator className="mr-2" size={20} />
              Calculate My ROI
            </button>
          )}
        </div>

        {showResults && (
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Projected Results</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-black/40 rounded-lg p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary">
                  ${revenueIncrease.toLocaleString()}/mo
                </div>
                <div className="text-sm text-gray-400">Additional Revenue</div>
              </div>

              <div className="bg-black/40 rounded-lg p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-400">
                  {totalROI.toFixed(0)}% ROI
                </div>
                <div className="text-sm text-gray-400">Return on Investment</div>
              </div>

              <div className="bg-black/40 rounded-lg p-6 text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-400">
                  {hoursSaved.toFixed(0)} hrs/week
                </div>
                <div className="text-sm text-gray-400">Time Saved</div>
              </div>

              <div className="bg-black/40 rounded-lg p-6 text-center">
                <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-400">
                  ${costSavings.toLocaleString()}/mo
                </div>
                <div className="text-sm text-gray-400">Cost Savings</div>
              </div>
            </div>

            <div className="bg-black/60 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">ROI Breakdown</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Monthly Revenue:</span>
                  <span>${currentRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Projected Monthly Revenue:</span>
                  <span className="text-green-400">${projectedRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Cost Savings:</span>
                  <span className="text-green-400">${costSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Chatbot Cost (Starter):</span>
                  <span className="text-red-400">-${starterPlanCost}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                  <span>Net Monthly Benefit:</span>
                  <span className="text-primary">${netBenefit.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {!emailCaptured ? (
              <form onSubmit={handleEmailCapture} className="bg-black/40 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Get Your Detailed ROI Report</h3>
                <p className="text-gray-300 mb-4">
                  Enter your email to receive a comprehensive PDF report with personalized recommendations.
                </p>
                <div className="flex gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    required
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
                  />
                  <button type="submit" className="btn btn-primary px-6">
                    <Download className="mr-2" size={20} />
                    Get Report
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-green-400 mb-2">Report Sent!</h3>
                <p className="text-gray-300">
                  Check your email for your detailed ROI analysis and implementation guide.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pricing"
                className="flex-1 btn btn-primary text-center"
                onClick={() => track('ROI_To_Pricing_Clicked', { calculatedROI: totalROI })}
              >
                Start Capturing This Value →
              </Link>
              <Link
                href="/demos"
                className="flex-1 btn btn-secondary text-center"
                onClick={() => track('ROI_To_Demo_Clicked', { calculatedROI: totalROI })}
              >
                See Live Demo First
              </Link>
            </div>
          </div>
        )}

        <div className="text-center text-gray-400 text-sm">
          <p>* Projections based on industry averages and customer case studies.</p>
          <p>Actual results may vary depending on implementation and business factors.</p>
        </div>
      </div>
    </main>
  );
}