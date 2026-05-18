/** @type {import('next').NextConfig} */
const nextConfig = {
   typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "winsteadglobal.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;