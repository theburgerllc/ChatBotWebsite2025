"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Conversation } from "@/components/cvi/conversation";
import { track } from "@/lib/tracking";
import { MessageCircle, X, Loader2 } from "lucide-react";

// Maximum retry attempts and backoff configuration
const MAX_RETRIES = parseInt(process.env.NEXT_PUBLIC_MAX_RETRIES || '3', 10);
const BASE_DELAY_MS = 1000; // Start with 1 second
const MAX_DELAY_MS = 16000; // Cap at 16 seconds

export default function VideoChatWidget() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryTimeoutId, setRetryTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Calculate exponential backoff delay
   * @param attemptNumber - Current retry attempt (0-based)
   * @returns Delay in milliseconds
   */
  const calculateBackoffDelay = useCallback((attemptNumber: number): number => {
    const delay = Math.min(BASE_DELAY_MS * Math.pow(2, attemptNumber), MAX_DELAY_MS);
    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 0.1 * delay;
    return Math.floor(delay + jitter);
  }, []);

  /**
   * Attempt to create a conversation with retry logic
   */
  const attemptCreateConversation = useCallback(async (attempt: number = 0): Promise<void> => {
    try {
      // Cancel any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      
      const res = await fetch("/api/tavus/create-conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vertical: "general" }),
        signal: abortControllerRef.current.signal
      });
      
      if (!res.ok) {
        let errorMessage = "Failed to start video chat";
        let shouldRetry = false;
        
        try {
          const errorData = await res.json();
          
          // Handle specific error types with user-friendly messages
          if (res.status === 429) {
            errorMessage = "Too many requests. Please wait a moment and try again.";
            shouldRetry = true; // Rate limit errors are retryable
          } else if (res.status === 400 && errorData.error?.includes("configuration")) {
            errorMessage = "Video chat is not properly configured. Please contact support.";
            shouldRetry = false; // Configuration errors are not retryable
          } else if (res.status >= 500) {
            errorMessage = "Server error. Please try again later.";
            shouldRetry = true; // Server errors are retryable
          } else if (res.status >= 400 && res.status < 500) {
            errorMessage = errorData.error || "Invalid request. Please try again.";
            shouldRetry = false; // Client errors are generally not retryable
          } else if (errorData.error) {
            errorMessage = errorData.error;
            shouldRetry = true; // Default to retryable for unknown errors
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
          shouldRetry = res.status >= 500; // Only retry server errors
        }
        
        // Retry logic for retryable errors
        if (shouldRetry && attempt < MAX_RETRIES) {
          const delay = calculateBackoffDelay(attempt);
          console.log(`Retrying conversation creation in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`);
          
          const timeoutId = setTimeout(() => {
            setRetryCount(attempt + 1);
            attemptCreateConversation(attempt + 1);
          }, delay);
          
          setRetryTimeoutId(timeoutId);
          return;
        }
        
        // Max retries reached or non-retryable error
        setError(errorMessage);
        setRetryCount(attempt);
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.conversationUrl) {
        setUrl(data.conversationUrl);
        setConversationId(data.conversationId);
        setOpen(true);
        setRetryCount(0); // Reset retry count on success
        setError(null); // Clear any previous errors
        track("Widget_Opened", {
          conversationId: data.conversationId,
          retriesUsed: attempt
        });
      } else {
        throw new Error("Unable to start video chat. Invalid response from server.");
      }
    } catch (error) {
      // Handle network errors and other exceptions
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was aborted');
        return; // Don't treat aborted requests as errors
      }
      
      console.error("Failed to open chat:", error);
      
      let errorMessage = "Failed to open chat";
      let shouldRetry = true;
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "Network error. Please check your connection and try again.";
        shouldRetry = true;
      } else {
        errorMessage = error instanceof Error ? error.message : "Failed to open chat";
        shouldRetry = true; // Default to retryable for unknown errors
      }
      
      // Retry logic for retryable errors
      if (shouldRetry && attempt < MAX_RETRIES) {
        const delay = calculateBackoffDelay(attempt);
        console.log(`Retrying conversation creation in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`);
        
        const timeoutId = setTimeout(() => {
          setRetryCount(attempt + 1);
          attemptCreateConversation(attempt + 1);
        }, delay);
        
        setRetryTimeoutId(timeoutId);
        return;
      }
      
      // Max retries reached
      setError(errorMessage);
      setRetryCount(attempt);
    } finally {
      setLoading(false);
    }
  }, [calculateBackoffDelay]);

  async function openChat() {
    setLoading(true);
    setError(null);
    setRetryCount(0);
    
    // Clear any existing retry timeout
    if (retryTimeoutId) {
      clearTimeout(retryTimeoutId);
      setRetryTimeoutId(null);
    }
    
    await attemptCreateConversation(0);
  }
  
  const closeChat = useCallback(() => {
    setOpen(false);
    
    // Cancel any pending retries
    if (retryTimeoutId) {
      clearTimeout(retryTimeoutId);
      setRetryTimeoutId(null);
    }
    
    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Reset state
    setError(null);
    setRetryCount(0);
    setLoading(false);
    
    track("Widget_Closed", { conversationId });
  }, [conversationId, retryTimeoutId]);
  
  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (retryTimeoutId) {
      clearTimeout(retryTimeoutId);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, [retryTimeoutId]);
  
  // Use effect for cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
  
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
                <><Loader2 className="animate-spin w-3 h-3" /> <span>
                  {retryCount > 0 ? `Retrying... (${retryCount}/${MAX_RETRIES})` : 'Connecting...'}
                </span></>
              ) : (
                <span>
                  Try Again
                  {retryCount > 0 && ` (${retryCount}/${MAX_RETRIES} attempts)`}
                </span>
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
