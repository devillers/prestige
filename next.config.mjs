// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      // Prod API - Hostinger (HTTPS)
      {
        protocol: 'https',
        hostname: 'api.careconciergeluxury.com',
        port: '', // optionnel
        pathname: '/wp-content/uploads/**',
      },
      // Dev Localhost (HTTP)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8888', // ton port local WordPress
        pathname: '/wordpress/wp-content/uploads/**', // adapte si besoin
      },
    ],
    deviceSizes: [320, 640, 768, 1024],
  },
};

export default nextConfig;
