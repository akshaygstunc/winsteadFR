import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  distDir: 'dist',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
