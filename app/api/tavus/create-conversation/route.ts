import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/ratelimit";
import { BASE_URL } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { vertical, documentTags = [], memoryKey } = await req.json();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip || "unknown";
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
  }

  const key = String(vertical || "general").toUpperCase();
  const personaId = process.env[`TAVUS_PERSONA_ID_${key}`];
  const replicaId = process.env[`TAVUS_REPLICA_ID_${key}`];
  
  if (!personaId || !replicaId) {
    console.error(`Missing Tavus config for vertical: ${key}`);
    return NextResponse.json({ 
      error: "Invalid vertical configuration" 
    }, { status: 400 });
  }

  const body: any = {
    persona_id: personaId,
    replica_id: replicaId,
    properties: { 
      language: "multilingual",
      enable_transcription: true
    }
  };
  
  if (documentTags?.length) body.document_tags = documentTags;
  if (memoryKey) body.memory_stores = [memoryKey];
  body.callback_url = `${BASE_URL}/api/tavus/webhook`;

  try {
    const res = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "x-api-key": process.env.TAVUS_API_KEY || "" 
      },
      body: JSON.stringify(body)
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Tavus API error:", errorText);
      return NextResponse.json({ 
        error: "Failed to create conversation",
        details: errorText 
      }, { status: 500 });
    }
    
    const data = await res.json();
    return NextResponse.json({ 
      conversationUrl: data.conversation_url, 
      conversationId: data.conversation_id 
    });
  } catch (error) {
    console.error("Tavus API exception:", error);
    return NextResponse.json({ 
      error: "Internal Server Error" 
    }, { status: 500 });
  }
}
