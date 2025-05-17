/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.careconciergeluxury.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
