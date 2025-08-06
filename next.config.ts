import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Wichtig für Docker
  images: {
    unoptimized: true, // Für Production ohne Image Optimization API
  },
};

export default nextConfig;