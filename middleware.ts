import { NextRequest, NextResponse } from "next/server";
import { checkBasicAuth } from "@/lib/auth";

export function middleware(req: NextRequest) {
  // Admin panel authentication
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!checkBasicAuth(req)) {
      return new NextResponse("Authentication required", { 
        status: 401, 
        headers: { 
          "WWW-Authenticate": 'Basic realm="Admin Panel"' 
        } 
      });
    }
  }
  
  // Security headers for all requests
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = { 
  matcher: [
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
