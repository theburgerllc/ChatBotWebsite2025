"use client";
import { useState } from "react";
import { Conversation } from "@/components/cvi/conversation";
import { track } from "@/lib/tracking";
import { MessageCircle, X, Loader2 } from "lucide-react";

export default function VideoChatWidget() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  async function openChat() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tavus/create-conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vertical: "general" })
      });
      
      if (!res.ok) {
        let errorMessage = "Failed to start video chat";
        
        try {
          const errorData = await res.json();
          
          // Handle specific error types with user-friendly messages
          if (res.status === 429) {
            errorMessage = "Too many requests. Please wait a moment and try again.";
          } else if (res.status === 400 && errorData.error?.includes("configuration")) {
            errorMessage = "Video chat is not properly configured. Please contact support.";
          } else if (res.status === 500) {
            errorMessage = "Server error. Please try again later.";
          } else if (errorData.error) {
            // Use the error message from the API if available
            errorMessage = errorData.error;
          }
          
          // Add details if available for debugging (but keep user message simple)
          if (errorData.details && process.env.NODE_ENV === 'development') {
            console.error("API Error Details:", errorData.details);
          }
        } catch (parseError) {
          // If response is not JSON, try to get text
          const textError = await res.text().catch(() => "");
          if (textError) {
            errorMessage = textError;
          }
        }
        
        setError(errorMessage);
        setRetryCount(prev => prev + 1);
        return;
      }

      const data = await res.json();
      if (data.conversationUrl) {
        setUrl(data.conversationUrl);
        setConversationId(data.conversationId);
        setOpen(true);
        setRetryCount(0); // Reset retry count on success
        track("Widget_Opened", {
          conversationId: data.conversationId
        });
      } else {
        setError("Unable to start video chat. Please try again.");
      }
    } catch (error) {
      console.error("Failed to open chat:", error);
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(error instanceof Error ? error.message : "Failed to open chat");
      }
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  }
  
  const closeChat = () => {
    setOpen(false);
    track("Widget_Closed", { conversationId });
  };
  
  return (
    <>
      {!open && (
        <button
          onClick={openChat}
          disabled={loading || !!error}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-primary text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-pulse-glow"
          aria-label="Open video chat"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <MessageCircle size={24} />
          )}
        </button>
      )}

      {error && !open && (
        <div className="fixed bottom-24 right-6 bg-red-500 text-white p-4 rounded-lg shadow-lg space-y-2 max-w-sm">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium">Unable to start video chat</p>
              <p className="text-xs opacity-90 mt-1">{error}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={openChat}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 transition-colors px-3 py-1 rounded text-sm flex items-center space-x-1"
            >
              {loading ? (
                <><Loader2 className="animate-spin w-3 h-3" /> <span>Retrying...</span></>
              ) : (
                <span>Try Again{retryCount > 0 && ` (${retryCount})`}</span>
              )}
            </button>
            <button
              onClick={() => setError(null)}
              className="bg-white/10 hover:bg-white/20 transition-colors px-3 py-1 rounded text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {open && url && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl h-[85vh] bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between z-10">
              <span className="text-white font-medium">AI Video Assistant</span>
              <button 
                onClick={closeChat}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <Conversation conversationUrl={url} />
          </div>
        </div>
      )}
    </>
  );
}
