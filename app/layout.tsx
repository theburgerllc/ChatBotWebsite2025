import "@/app/globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import VideoChatWidget from "@/components/VideoChatWidget";

export const metadata: Metadata = {
  title: "AI Chatbot Solutions - Intelligent Conversational AI for Business",
  description: "24/7 AI chatbot solutions for legal intake, e-commerce support, and healthcare triage. Convert more leads with intelligent conversational AI.",
  keywords: "AI chatbot, conversational AI, legal intake, e-commerce chatbot, healthcare AI, chatbot solutions",
  openGraph: {
    title: "AI Chatbot Solutions",
    description: "Convert more leads with 24/7 AI chatbot solutions",
    images: ["/brand/ai-chatbot-logo.png"]
  }
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `
              }}
            />
          </>
        )}
      </head>
      <body>
        <SiteHeader />
        <div className="pt-24 min-h-screen">{children}</div>
        <SiteFooter />
        <VideoChatWidget />
      </body>
    </html>
  );
}
