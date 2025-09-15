/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // We're using this because types are already checked in CI/CD
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
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
      ]
    }
  ],
  poweredByHeader: false,
  compress: true,
  generateEtags: true
};

export default nextConfig;
