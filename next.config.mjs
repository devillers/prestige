

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8888',
        pathname: '/wordpress/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.careprestige.fr',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
