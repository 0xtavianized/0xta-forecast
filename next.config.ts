import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: new URL("https://data.bmkg.go.id").hostname,
      },
    ],
  },
};

export default nextConfig;
