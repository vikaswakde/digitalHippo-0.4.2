/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        hostname: "favourite-pearle-vikasorg-1af1b74b.koyeb.app",
        pathname: "**",
        port: "*",
        protocol: "https",
      },
    ],
  },
};

// export default nextConfig;
module.exports = nextConfig;
