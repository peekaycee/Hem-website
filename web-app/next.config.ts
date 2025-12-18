import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Turbopack is now configured directly at the root
  turbopack: {
    // Add Turbopack options here if needed
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "lnqosogvxpjywoqjgdwx.supabase.co",
        hostname: "nznigwttljwqdsbwqigl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
