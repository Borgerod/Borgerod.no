import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heroui-assets.nyc3.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "c7a433b527dc2ae3c95c08a175c4984f.cdn.bubble.io",
      },
      {
        protocol: "https",
        hostname: "reboot.no",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "mediavest.no",
      },
    ],
  },
};

export default nextConfig;
