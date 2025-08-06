// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // WICHTIG für Docker!
  experimental: {
    outputFileTracingRoot: undefined,
  },
  images: {
    unoptimized: true, // Für Production ohne Image Optimization API
  }
};

export default nextConfig;