"use client";
import { useState, useEffect, useCallback } from "react";
import { Conversation } from "@/components/cvi/conversation";
import { DemoQualifier } from "@/components/DemoQualifier";
import { track } from "@/lib/tracking";
import { Loader2 } from "lucide-react";

interface CVIDemoProps {
  vertical: string;
  context?: string;
  autoStart?: boolean;
  className?: string;
  requireQualification?: boolean;
}

export default function CVIDemo({
  vertical,
  context = "",
  autoStart = false,
  className = "",
  requireQualification = true
}: CVIDemoProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQualifier, setShowQualifier] = useState(requireQualification);
  const [qualified, setQualified] = useState(!requireQualification);
  const [leadData, setLeadData] = useState<any>({});
  
  const start = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/tavus/create-conversation", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          vertical, 
          documentTags: context ? [context] : [] 
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to start conversation");
      }
      
      const data = await res.json();
      
      if (data.conversationUrl) { 
        setUrl(data.conversationUrl); 
        setConversationId(data.conversationId);
        track("CVI_Demo_Started", { 
          vertical, 
          conversationId: data.conversationId,
          context
        }); 
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      track("CVI_Demo_Error", { vertical, error: err });
    } finally { 
      setLoading(false); 
    }
  }, [vertical, context]);
  
  useEffect(() => { 
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);
  
  const handleQualified = (data: any) => {
    setLeadData(data);
    setQualified(true);
    setShowQualifier(false);

    // Auto-start the demo if qualification is complete
    if (autoStart) {
      start();
    }
  };

  const handleComplete = () => {
    track("CVI_Demo_Completed", {
      vertical,
      conversationId,
      leadData
    });
  };

  // Show qualification flow first if required
  if (showQualifier && !qualified) {
    return (
      <div className={`w-full h-full ${className}`}>
        <DemoQualifier
          vertical={vertical}
          onQualified={handleQualified}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-8">
        <p className="text-red-400">{error}</p>
        <button onClick={start} className="btn btn-secondary">
          Try Again
        </button>
      </div>
    );
  }
  
  if (!url) {
    return (
      <div className="flex items-center justify-center p-8">
        <button 
          onClick={start} 
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 inline-block" size={20} />
              Connecting...
            </>
          ) : (
            "Start Video Demo"
          )}
        </button>
      </div>
    );
  }
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Conversation 
        conversationUrl={url} 
        onLeave={handleComplete}
      />
    </div>
  );
}
