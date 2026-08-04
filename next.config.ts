import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com"
      },
      {
        protocol: "https",
        hostname: "scontent.xx.fbcdn.net"
      },
      {
        protocol: "https",
        hostname: "scontent.fcmb1-2.fna.fbcdn.net"
      }
    ]
  }
};

export default nextConfig;
