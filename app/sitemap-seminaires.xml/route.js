
  
  export async function GET() {
    const baseUrl = 'https://care-prestige.vercel.app';
    const wpApi = `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2`;
  
    try {
      const res = await fetch(`${wpApi}/seminaires?per_page=100`);
      if (!res.ok) throw new Error('Failed to fetch seminaires');
  
      const items = await res.json();
  
      const urls = Array.isArray(items)
        ? items.map(item => `
            <url>
              <loc>${baseUrl}/seminaires/${item.slug}</loc>
              <lastmod>${item.modified || new Date().toISOString()}</lastmod>
            </url>
          `).join('')
        : '';
  
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
      </urlset>`;
  
      return new Response(sitemap, {
        headers: { 'Content-Type': 'application/xml' }
      });
  
    } catch (error) {
      console.error('Sitemap seminaires error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  