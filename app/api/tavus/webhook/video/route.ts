import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs"; // ensure Node runtime, not edge

async function writeEvent(line: string) {
  const day = new Date().toISOString().slice(0, 10);
  const dir = join(process.cwd(), "diagnostics", "events");
  await mkdir(dir, { recursive: true });
  await appendFile(join(dir, `${day}.jsonl`), line + "\n", "utf8");
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => ({}));
    
    // Log the raw payload for debugging
    console.log("[Tavus Video Webhook] Received:", JSON.stringify(payload).substring(0, 500));
    
    // Write to JSONL file
    await writeEvent(JSON.stringify({ 
      ts: Date.now(), 
      topic: "video", 
      payload 
    }));
    
    // TODO: Add signature verification when Tavus documents the header format
    // const signature = req.headers.get('x-tavus-signature');
    // if (signature && process.env.TAVUS_WEBHOOK_SECRET) {
    //   // Verify signature here
    // }
    
    // Return 200 immediately to acknowledge receipt
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Tavus video webhook error:", err);
    // Still return 200 to avoid retries, but log the error
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
