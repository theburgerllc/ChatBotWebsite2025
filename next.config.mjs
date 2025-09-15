/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "img-src 'self' data: https: blob:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://app.posthog.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "connect-src 'self' https://tavusapi.com https://*.daily.co https://api.stripe.com https://www.google-analytics.com https://app.posthog.com https://*.posthog.com wss://*.daily.co",
      "frame-src 'self' https://tavus.daily.co https://*.daily.co https://js.stripe.com",
      "media-src 'self' blob: https://*.daily.co",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests"
    ].join('; ')
  }
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    domains: ["tavus.daily.co", "cdn.tavus.io"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tavus.daily.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tavus.io',
        pathname: '/**',
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      // Add any URL rewrites here if needed
    ];
  },
  async redirects() {
    return [
      // Add redirects here if needed
      {
        source: '/demos/legal',
        destination: '/law',
        permanent: true,
      },
      {
        source: '/demos/healthcare',
        destination: '/health',
        permanent: true,
      },
      {
        source: '/demos/ecommerce',
        destination: '/retail',
        permanent: true,
      },
    ];
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Environment variables validation
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },
};

export default nextConfig;
