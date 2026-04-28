import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Komprimierung (Vercel macht das auch via Edge, schadet aber nicht)
  compress: true,

  // Trailing-Slash-Strategie: kein automatischer Slash – sauberere URLs für SEO
  trailingSlash: false,

  // Bild-Optimierung: AVIF/WebP automatisch generieren
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 320, 384],
    minimumCacheTTL: ONE_YEAR,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },

  // Lange Cache-Header für statische Assets
  async headers() {
    return [
      {
        // Alle Bilder/Assets aus public/ → 1 Jahr im CDN cachen
        source: "/:path((?:.*\\.(?:avif|webp|png|jpg|jpeg|gif|svg|ico|woff|woff2|mp4|webm)))",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${ONE_YEAR}, immutable`,
          },
        ],
      },
      {
        // Favicons / Manifest → 1 Tag
        source: "/favicons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${60 * 60 * 24}, must-revalidate`,
          },
        ],
      },
      {
        // Sicherheitsheader für ALLE Routen
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  // Production-Optimierungen
  poweredByHeader: false,

  // Experimentelle Features (Next.js 15+ / 16): kleinere Bundles
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
