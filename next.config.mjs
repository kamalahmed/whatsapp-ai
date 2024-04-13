/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Assuming you are using HTTPS, otherwise adjust or remove this line
        hostname: "first-bandicoot-27.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
