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
  
  async function openChat() {
    setLoading(true);
    try {
      const res = await fetch("/api/tavus/create-conversation", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ vertical: "general" }) 
      });
      
      const data = await res.json();
      if (data.conversationUrl) { 
        setUrl(data.conversationUrl); 
        setConversationId(data.conversationId); 
        setOpen(true); 
        track("Widget_Opened", { 
          conversationId: data.conversationId 
        }); 
      }
    } catch (error) {
      console.error("Failed to open chat:", error);
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
          disabled={loading}
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
