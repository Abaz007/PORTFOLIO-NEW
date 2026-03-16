import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow next/image to load from Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // Strict mode catches potential React bugs during development
  reactStrictMode: true,
};

export default nextConfig;
