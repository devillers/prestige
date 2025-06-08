// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'api.careconciergeluxury.com',
//         pathname: '/wp-content/uploads/**',
//       },
//     ],
//   },
//   // no more experimental.serverActions
// };

// export default nextConfig;


/**  @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ▶︎ 1  Tell <Image> which external hosts are safe.
    //     The new syntax (array of URL objects) is the long-term-supported form in Next 15+. :contentReference[oaicite:0]{index=0}
    remotePatterns: [
      new URL('https://api.careconciergeluxury.com/wp-content/uploads/**'),

      // ‣ If some pictures come from the root domain, add a second pattern.
      // new URL('https://careconcierluxury.com/wp-content/uploads/**'),
    ],

    // ▶︎ 2  Optional: cap the breakpoints so small profile thumbs
    //     don’t get needlessly upscaled to 2 × retina sizes.
    deviceSizes: [320, 640, 768, 1024],
  },

  // ▶︎ 3  No experimental flags needed any more.
};

export default nextConfig;
