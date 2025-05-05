export async function GET() {
    const baseUrl = process.env.SITE_URL;
    const wpApi = `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2`;
  
    try {
      const res = await fetch(`${wpApi}/portfolio?per_page=100`);
      const items = res.ok ? await res.json() : [];
  
      const urls = Array.isArray(items) ? items.map(item => `
        <url>
          <loc>${baseUrl}/repertoire/${item.slug}</loc>
          <lastmod>${item.modified || new Date().toISOString()}</lastmod>
        </url>
      `).join('') : '';
  
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
         <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
           ${urls}
         </urlset>`,
        { headers: { 'Content-Type': 'application/xml' } }
      );
  
    } catch (error) {
      console.error('Sitemap repertoire error:', error);
      return new Response('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
        headers: { 'Content-Type': 'application/xml' }
      });
    }
  }
  