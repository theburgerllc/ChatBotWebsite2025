"use client";
import { useState, useEffect } from "react";
import { track } from "@/lib/tracking";
import { X, Star, Download } from "lucide-react";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    if (localStorage.getItem("exitPopupShown")) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the screen
      if (e.clientY <= 0 && e.relatedTarget === null) {
        setShow(true);
        localStorage.setItem("exitPopupShown", "true");
        track("Exit_Intent_Shown");
      }
    };

    // Add mouse leave detection
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Track conversion
      track("Exit_Intent_Converted", { email });

      // Simulate API call for lead capture
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting exit intent form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    track("Exit_Intent_Dismissed");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-neutral-900 to-black border border-primary/20 rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-3">
                Wait! Get Your Free AI Readiness Score
              </h2>
              <p className="text-gray-300">
                See exactly how AI agents could impact your business with our
                2-minute assessment (normally $500)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary text-lg py-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  <>
                    Get Free Assessment →
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                Personalized recommendations
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                ROI projections for your industry
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                Implementation roadmap
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6 text-center">
              No spam. Unsubscribe anytime. Your email is safe with us.
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Check Your Email!
            </h2>
            <p className="text-gray-300 mb-6">
              Your AI Readiness Assessment is on its way. Check your inbox in the next few minutes.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleClose}
                className="w-full btn btn-primary"
              >
                Continue Browsing
              </button>
              <button
                onClick={() => window.open("/demos", "_blank")}
                className="w-full btn btn-secondary"
              >
                Explore Live Demos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}