import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // allow any path
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // allow any path
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**', // allow any path

      },
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
        pathname: '/**', // allow any path

      }
    ],
  },


};

export default nextConfig;
