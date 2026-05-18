/** @type {import('next').NextConfig} */
const nextConfig = {
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