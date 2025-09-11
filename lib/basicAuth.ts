import { NextRequest } from "next/server";

/**
 * Basic authentication helper for webhook admin viewer
 * Uses separate credentials from main admin panel
 */
export function checkWebhookAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  const user = process.env.TAVUS_WEBHOOK_BASIC_USER || "webhook_admin";
  const pass = process.env.TAVUS_WEBHOOK_BASIC_PASS || "changeme";
  
  if (!auth) return false;
  
  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic" || !encoded) return false;
  
  const [username, password] = Buffer.from(encoded, "base64").toString().split(":");
  return username === user && password === pass;
}

/**
 * Create a basic auth challenge response
 */
export function requireWebhookAuth() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Webhook Admin Panel"'
    }
  });
}
