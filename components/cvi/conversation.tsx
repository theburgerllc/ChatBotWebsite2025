"use client";
import React, { useState, useCallback } from "react";
import { Maximize, Minimize } from "lucide-react";
import { Conversation as CVIConversation } from "@/app/components/cvi/components/conversation";
import { CVIProvider } from "@/app/components/cvi/components/cvi-provider";

export interface ConversationProps {
  conversationUrl: string;
  onLeave?: () => void;
  showControls?: boolean;
}

export const Conversation: React.FC<ConversationProps> = ({ 
  conversationUrl, 
  onLeave,
  showControls = true
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const handleLeave = useCallback(() => {
    onLeave?.();
  }, [onLeave]);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const container = document.querySelector('[data-conversation-container]') as HTMLElement;
      container?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  return (
    <CVIProvider>
      <div 
        className="relative w-full h-full bg-black rounded-lg overflow-hidden"
        data-conversation-container
      >
        <CVIConversation 
          conversationUrl={conversationUrl}
          onLeave={handleLeave}
        />
        
        {showControls && (
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-black/50 backdrop-blur rounded-lg hover:bg-black/70 transition-colors text-white"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        )}
      </div>
    </CVIProvider>
  );
};
