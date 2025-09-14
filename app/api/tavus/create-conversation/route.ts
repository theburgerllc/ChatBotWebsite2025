import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/ratelimit";
import { BASE_URL } from "@/lib/utils";
import { track, POSTHOG_EVENTS } from "@/lib/tracking";
import { nanoid } from "nanoid";

/**
 * Create Tavus Conversation API Route
 * 
 * Supports:
 * - Memory stores for persistent context
 * - Document tags for knowledge base integration
 * - Multiple verticals (healthcare, legal, ecommerce, general)
 * - Rate limiting and error handling
 */

// Vertical-specific document tag mappings
const VERTICAL_TAGS: Record<string, string[]> = {
  HEALTHCARE: ['kb-healthcare', 'kb-medical', 'kb-global'],
  LEGAL: ['kb-legal', 'kb-compliance', 'kb-global'],
  ECOMMERCE: ['kb-ecommerce', 'kb-products', 'kb-global'],
  ECOM: ['kb-ecommerce', 'kb-products', 'kb-global'],
  GENERAL: ['kb-global'],
};

export async function POST(req: NextRequest) {
  const requestId = nanoid(10);
  
  try {
    const { 
      vertical = 'general', 
      documentTags = [], 
      memoryKey,
      customTags = [],
      sessionId,
      userId,
      metadata = {}
    } = await req.json();
    
    // Rate limiting with enhanced feedback
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip || "unknown";
    const rateLimitResult = checkRateLimit(ip, true);
    
    if (!rateLimitResult.allowed) {
      track(POSTHOG_EVENTS.CONVERSATION_ERROR, {
        reason: 'rate_limit',
        ip,
        requestId,
        remaining: rateLimitResult.remaining,
        retryAfter: rateLimitResult.retryAfter,
      });
      
      return NextResponse.json(
        { 
          error: "Too many requests. Please wait before trying again.",
          retryAfter: rateLimitResult.retryAfter,
          remaining: rateLimitResult.remaining,
          resetTime: rateLimitResult.resetTime,
          message: `Rate limit exceeded. Try again in ${rateLimitResult.retryAfter} seconds.`
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': Math.floor(rateLimitResult.resetTime / 1000).toString(),
            'Retry-After': rateLimitResult.retryAfter?.toString() || '60'
          }
        }
      );
    }

    // Validate and normalize vertical
    const key = String(vertical).toUpperCase();
    const personaId = process.env[`TAVUS_PERSONA_ID_${key}`];
    const replicaId = process.env[`TAVUS_REPLICA_ID_${key}`];
    
    if (!personaId || !replicaId) {
      console.error(`Missing Tavus config for vertical: ${key}`);
      track(POSTHOG_EVENTS.CONVERSATION_ERROR, {
        reason: 'invalid_vertical',
        vertical: key,
        requestId,
      });
      return NextResponse.json(
        { 
          error: "Invalid vertical configuration",
          supportedVerticals: ['healthcare', 'legal', 'ecommerce', 'general']
        },
        { status: 400 }
      );
    }

    // Build memory stores array
    const memoryStores: string[] = [];
    if (memoryKey) {
      memoryStores.push(memoryKey);
    }
    if (userId) {
      memoryStores.push(`user_${userId}`);
    }
    if (sessionId) {
      memoryStores.push(`session_${sessionId}`);
    }
    
    // Ensure unique memory stores
    const uniqueMemoryStores = [...new Set(memoryStores)];

    // Combine document tags
    const verticalTags = VERTICAL_TAGS[key] || [];
    const allTags = [...new Set([
      ...verticalTags,
      ...documentTags,
      ...customTags
    ])];

    // Build request body - simplified for Tavus API v2
    const body: any = {
      persona_id: personaId,
      replica_id: replicaId,
    };
    
    // Add optional fields that are supported by Tavus API v2
    if (allTags.length > 0) {
      body.document_tags = allTags;
    }
    if (uniqueMemoryStores.length > 0) {
      body.memory_stores = uniqueMemoryStores;
    }

    // Set webhook callback URL for conversation events
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || BASE_URL;
    body.callback_url = `${baseUrl}/api/tavus/webhook/conversation`;

    // Add language if provided (moved to root level)
    if (metadata.language) {
      body.language = metadata.language;
    }

    // Validate API key
    const apiKey = process.env.TAVUS_API_KEY;
    if (!apiKey) {
      console.error('TAVUS_API_KEY not configured');
      return NextResponse.json(
        { error: 'Service not configured' },
        { status: 503 }
      );
    }

    // Make API request to Tavus
    console.log(`Creating conversation for vertical: ${vertical}`, {
      requestId,
      memoryStores: uniqueMemoryStores.length,
      documentTags: allTags.length,
    });

    const res = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "x-api-key": apiKey,
        "x-request-id": requestId, // For tracking in Tavus logs
      },
      body: JSON.stringify(body)
    });
    
    const responseText = await res.text();
    
    if (!res.ok) {
      console.error(`Tavus API error (${res.status}):`, responseText);
      
      // Track error
      track(POSTHOG_EVENTS.CONVERSATION_ERROR, {
        reason: 'tavus_api_error',
        status: res.status,
        vertical,
        requestId,
      });
      
      // Parse error if possible
      let errorMessage = "Failed to create conversation";
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {}
      
      return NextResponse.json(
        { 
          error: errorMessage,
          requestId,
          status: res.status,
        },
        { status: res.status >= 500 ? 502 : res.status }
      );
    }
    
    // Parse successful response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error('Failed to parse Tavus response:', responseText);
      return NextResponse.json(
        { error: 'Invalid response from Tavus' },
        { status: 502 }
      );
    }
    
    // Validate response data
    if (!data.conversation_url || !data.conversation_id) {
      console.error('Invalid Tavus response structure:', data);
      return NextResponse.json(
        { error: 'Invalid response structure from Tavus' },
        { status: 502 }
      );
    }
    
    // Track successful creation
    track(POSTHOG_EVENTS.CONVERSATION_STARTED, {
      conversationId: data.conversation_id,
      vertical,
      requestId,
      hasMemoryStores: uniqueMemoryStores.length > 0,
      hasDocumentTags: allTags.length > 0,
      userId,
      sessionId,
    });
    
    // Return successful response
    return NextResponse.json({
      conversationUrl: data.conversation_url,
      conversationId: data.conversation_id,
      requestId,
      memoryStores: uniqueMemoryStores,
      documentTags: allTags,
    });
    
  } catch (error) {
    console.error("Unexpected error in create-conversation:", error);
    
    // Track unexpected error
    track(POSTHOG_EVENTS.CONVERSATION_ERROR, {
      reason: 'unexpected_error',
      error: error instanceof Error ? error.message : 'Unknown error',
      requestId,
    });
    
    return NextResponse.json(
      { 
        error: "An unexpected error occurred",
        requestId,
      },
      { status: 500 }
    );
  }
}
