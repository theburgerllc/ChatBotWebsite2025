"use client";
import React, { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Volume2, VolumeX } from "lucide-react";

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    return () => {
      onLeave?.();
    };
  }, [onLeave]);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      <iframe 
        ref={iframeRef}
        src={conversationUrl} 
        className="w-full h-full" 
        allow="camera; microphone; autoplay; fullscreen"
        title="AI Video Conversation"
      />
      
      {showControls && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-black/50 backdrop-blur rounded-lg hover:bg-black/70 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-black/50 backdrop-blur rounded-lg hover:bg-black/70 transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      )}
    </div>
  );
};
