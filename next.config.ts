import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
  },
  transpilePackages: ["mui-tel-input"],
};

export default nextConfig;
