import { NextRequest } from "next/server";

export function checkBasicAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  const user = process.env.BASIC_AUTH_USER || "admin";
  const pass = process.env.BASIC_AUTH_PASS || "changeme";
  
  if (!auth) return false;
  
  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic" || !encoded) return false;
  
  const [username, password] = Buffer.from(encoded, "base64").toString().split(":");
  return username === user && password === pass;
}

export function requireAuth() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Panel"'
    }
  });
}
