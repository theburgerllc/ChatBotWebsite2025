"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { DailyProvider } from "@daily-co/daily-react";

/**
 * Tavus CVI Provider Configuration
 * This provider wraps the application and provides access to the Tavus CVI UI library
 * with the official Daily.co provider integration
 */

interface CVIConfig {
  apiKey?: string;
  personaId?: string;
  replicaId?: string;
  enableMemories?: boolean;
  enableKnowledgeBase?: boolean;
  defaultLanguage?: string;
}

interface CVIContextValue {
  config: CVIConfig;
  isInitialized: boolean;
}

const CVIContext = createContext<CVIContextValue | undefined>(undefined);

export function useCVI() {
  const context = useContext(CVIContext);
  if (!context) {
    throw new Error("useCVI must be used within a CVIProvider");
  }
  return context;
}

interface CVIProviderProps {
  children: ReactNode;
  config?: CVIConfig;
}

/**
 * CVIProvider Component
 * Provides Tavus CVI configuration to the entire application
 * with Daily.co provider integration for video calling functionality
 * 
 * @param children - React children to wrap
 * @param config - Optional CVI configuration override
 */
export function CVIProvider({ children, config = {} }: CVIProviderProps) {
  // Merge default config with provided config
  const mergedConfig: CVIConfig = {
    apiKey: process.env.NEXT_PUBLIC_TAVUS_API_KEY,
    enableMemories: true,
    enableKnowledgeBase: true,
    defaultLanguage: "en",
    ...config,
  };

  const value: CVIContextValue = {
    config: mergedConfig,
    isInitialized: !!mergedConfig.apiKey,
  };

  return (
    <CVIContext.Provider value={value}>
      <DailyProvider>
        {children}
      </DailyProvider>
    </CVIContext.Provider>
  );
}

/**
 * Higher-order component to inject CVI config as props
 */
export function withCVI<P extends object>(
  Component: React.ComponentType<P & { cvi: CVIContextValue }>
) {
  return function WithCVIComponent(props: P) {
    const cvi = useCVI();
    return <Component {...props} cvi={cvi} />;
  };
}
