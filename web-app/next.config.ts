import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Turbopack is now configured directly at the root
  turbopack: {
    // Add Turbopack options here if needed
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
