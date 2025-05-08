/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "github.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/the-sankari/all_stars_helsinki/main/**",
      },
    ],
  },
};

module.exports = nextConfig;
