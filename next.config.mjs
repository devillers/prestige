/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ton API de production
      {
        protocol: 'https',
        hostname: 'api.careprestige.fr',
        pathname: '/wp-content/uploads/**',
      },
      // si tu veux aussi autoriser les images de localhost (en dev)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

export default nextConfig
