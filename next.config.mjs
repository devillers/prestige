// next.config.mjs  (ESM format)
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',                       // no trailing colon!
        hostname: 'api.careconciergeluxury.com', // Hostinger WP API
        port: '',                                // optional but explicit
        pathname: '/wp-content/uploads/**',
      },
      // If some images come from the root domain, add a second entry:
      // {
      //   protocol: 'https',
      //   hostname: 'careconciergeluxury.com',
      //   port: '',
      //   pathname: '/wp-content/uploads/**',
      // },
    ],

    // Trim the largest generated variants so 96-px avatars
    // don’t get up-scaled to 4 K.
    deviceSizes: [320, 640, 768, 1024],
  },
};

export default nextConfig;
