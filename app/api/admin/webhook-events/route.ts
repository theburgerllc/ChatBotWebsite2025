import { NextRequest, NextResponse } from "next/server";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { checkWebhookAuth, requireWebhookAuth } from "@/lib/basicAuth";

export const runtime = "nodejs";

interface EventRecord {
  ts: number;
  topic: string;
  payload: any;
}

export async function GET(req: NextRequest) {
  // Check authentication
  if (!checkWebhookAuth(req)) {
    return requireWebhookAuth();
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "100");
    const topic = searchParams.get("topic"); // filter by topic (conversation or video)
    const date = searchParams.get("date"); // specific date YYYY-MM-DD
    
    const eventsDir = join(process.cwd(), "diagnostics", "events");
    const events: EventRecord[] = [];
    
    try {
      // Get list of JSONL files
      const files = await readdir(eventsDir);
      const jsonlFiles = files
        .filter(f => f.endsWith(".jsonl"))
        .sort()
        .reverse(); // Most recent first
      
      // If specific date requested, filter files
      const filesToRead = date 
        ? jsonlFiles.filter(f => f.startsWith(date))
        : jsonlFiles.slice(0, 7); // Last 7 days max
      
      // Read and parse events
      for (const file of filesToRead) {
        const content = await readFile(join(eventsDir, file), "utf8");
        const lines = content.trim().split("\n").filter(Boolean);
        
        for (const line of lines) {
          try {
            const event = JSON.parse(line) as EventRecord;
            
            // Filter by topic if specified
            if (!topic || event.topic === topic) {
              events.push(event);
            }
            
            // Stop if we have enough events
            if (events.length >= limit) break;
          } catch (err) {
            console.error(`Failed to parse event line: ${line}`, err);
          }
        }
        
        if (events.length >= limit) break;
      }
    } catch (err) {
      // Directory might not exist yet
      console.log("No events directory found yet");
    }
    
    // Sort by timestamp, most recent first
    events.sort((a, b) => b.ts - a.ts);
    
    return NextResponse.json({
      events: events.slice(0, limit),
      total: events.length,
      limit
    });
  } catch (error) {
    console.error("Failed to read webhook events:", error);
    return NextResponse.json(
      { error: "Failed to read events" },
      { status: 500 }
    );
  }
}
