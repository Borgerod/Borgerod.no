import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "heroui-assets.nyc3.cdn.digitaloceanspaces.com",
      "c7a433b527dc2ae3c95c08a175c4984f.cdn.bubble.io",
      "reboot.no",
      "upload.wikimedia.org",
      "mediavest.no",
    ],
  },
};

export default nextConfig;
