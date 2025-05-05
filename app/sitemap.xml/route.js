export async function GET() {
    const baseUrl = 'https://care-prestige.vercel.app';
  
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap><loc>${baseUrl}/sitemap-static.xml</loc></sitemap>
      <sitemap><loc>${baseUrl}/sitemap-blog.xml</loc></sitemap>
      <sitemap><loc>${baseUrl}/sitemap-vente.xml</loc></sitemap>
      <sitemap><loc>${baseUrl}/sitemap-repertoire.xml</loc></sitemap>
      <sitemap><loc>${baseUrl}/sitemap-seminaires.xml</loc></sitemap>
    </sitemapindex>`;
  
    return new Response(sitemapIndex, {
      headers: { 'Content-Type': 'application/xml' }
    });
  }
  