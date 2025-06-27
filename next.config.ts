import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "127.0.0.1", "images.unsplash.com","eternal-network.s3.amazonaws.com", "pharmacy-assets.s3.amazonaws.com", "health-access-assets.s3.amazonaws.com","example.com"],
  },  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
