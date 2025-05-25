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
  // no more experimental.serverActions
};

export default nextConfig;
