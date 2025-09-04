import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { logEvent } from "@/lib/events";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = contactFormSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Invalid form data",
        issues: validation.error.issues 
      }, { status: 400 });
    }
    
    const { name, email, message, phone } = validation.data;
    
    // Log the contact
    await logEvent("info", "contact_form", { name, email, phone, message });
    
    // Send email notification
    const sgMail = require("@sendgrid/mail");
    const apiKey = process.env.SENDGRID_API_KEY;
    const from = process.env.SENDGRID_FROM_EMAIL;
    const to = process.env.LEADS_NOTIFICATION_EMAIL || from;
    
    if (apiKey && from) {
      sgMail.setApiKey(apiKey);
      
      const emailBody = `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        
        Message:
        ${message}
      `;
      
      await sgMail.send({
        to,
        from,
        subject: `New Contact from ${name}`,
        text: emailBody,
        html: emailBody.replace(/\n/g, "<br>")
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ 
      error: "Failed to process contact form" 
    }, { status: 500 });
  }
}
