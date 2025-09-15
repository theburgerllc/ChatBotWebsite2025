import "@/app/globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import VideoChatWidget from "@/components/VideoChatWidget";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://chat-bot-website2025-l65r.vercel.app'),
  title: "AI Chatbot Solutions - Convert 47% More Leads in 30 Days",
  description: "24/7 AI video agents that qualify leads, book appointments, and answer questions while you sleep. No training needed, starts working in 5 minutes.",
  keywords: "AI chatbot, conversational AI, lead conversion, video agents, legal intake, e-commerce chatbot, healthcare AI, chatbot solutions, ROI calculator",
  openGraph: {
    title: "AI Chatbot Solutions - Convert 47% More Leads",
    description: "Your AI video agent qualifies leads, books appointments, and answers questions 24/7 while you sleep.",
    images: ["/brand/ai-chatbot-logo.png"],
    siteName: "AI Chatbot Solutions",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot Solutions - Convert 47% More Leads",
    description: "Your AI video agent qualifies leads, books appointments, and answers questions 24/7 while you sleep.",
    images: ["/brand/ai-chatbot-logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <ExitIntentPopup />
      </body>
    </html>
  );
}
