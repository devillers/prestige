/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.careprestige.fr',
        pathname: '/wp-content/uploads/**',
      },
    ],
    domains: ['localhost'], // optional
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
