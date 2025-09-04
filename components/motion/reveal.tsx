"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = ""
}: RevealProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration, delay }} 
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = "",
  direction = "left"
}: RevealProps & { direction?: "left" | "right" | "up" | "down" }) {
  const initialX = direction === "left" ? -50 : direction === "right" ? 50 : 0;
  const initialY = direction === "up" ? 50 : direction === "down" ? -50 : 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: initialX, y: initialY }} 
      whileInView={{ opacity: 1, x: 0, y: 0 }} 
      transition={{ duration, delay }} 
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = ""
}: RevealProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      transition={{ duration, delay }} 
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
