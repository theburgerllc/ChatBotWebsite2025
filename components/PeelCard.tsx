"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PeelCardProps {
  front: string;
  peelContent: string;
  icon?: React.ReactNode;
}

export default function PeelCard({ front, peelContent, icon }: PeelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-neutral-900 rounded-xl p-6 overflow-hidden cursor-pointer border border-white/10 hover:border-primary/50 transition-all duration-300 group"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Front Content */}
      <div className={cn(
        "transition-all duration-500",
        isHovered ? "opacity-0 transform rotate-y-180" : "opacity-100"
      )}>
        <div className="flex items-start gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="text-xl font-semibold">{front}</h3>
        </div>
      </div>
      
      {/* Back Content (Peel) */}
      <div className={cn(
        "absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/20 to-primary/10 text-white p-6 rounded-xl transition-all duration-500",
        "backface-hidden",
        isHovered ? "opacity-100 rotate-y-0" : "opacity-0 rotate-y-180"
      )}>
        <p className="text-center">{peelContent}</p>
      </div>
      
      {/* Peel Effect Corner */}
      <div className={cn(
        "absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-primary to-primary/50 transition-all duration-300",
        isHovered ? "translate-x-0 translate-y-0" : "translate-x-6 -translate-y-6"
      )} 
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%)"
      }}/>
    </div>
  );
}
