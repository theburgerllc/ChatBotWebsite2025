import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/events";

async function sendNotification(subject: string, body: string) {
  const sgMail = require("@sendgrid/mail");
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const to = process.env.SENDGRID_TO_EMAIL; // Fixed: Using SENDGRID_TO_EMAIL to match .env.example
  
  if (!apiKey || !from || !to) {
    console.warn("Email notification skipped: Missing configuration", {
      hasApiKey: !!apiKey,
      hasFrom: !!from,
      hasTo: !!to
    });
    return;
  }
  
  sgMail.setApiKey(apiKey);
  
  try {
    await sgMail.send({
      to,
      from,
      subject,
      text: body,
      html: body.replace(/\n/g, "<br>")
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    
    // Log the event
    await logEvent("webhook", "tavus", payload);
    
    // Send notification for completed conversations
    if (payload?.event_type?.includes("completed")) {
      const details = `
        Conversation ID: ${payload.conversation_id}
        Duration: ${payload.duration_seconds}s
        Timestamp: ${new Date().toISOString()}
      `;
      await sendNotification("AI Video Demo Completed", details);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 400 });
  }
}
