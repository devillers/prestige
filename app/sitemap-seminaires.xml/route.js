export async function GET() {
    const baseUrl = 'https://care-prestige.vercel.app';
    const wpApi = `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2`;
  
    const res = await fetch(`${wpApi}/seminaires?per_page=100`);
    const items = await res.json();
  
    const urls = items.map(item => `
      <url>
        <loc>${baseUrl}/seminaires/${item.slug}</loc>
        <lastmod>${item.modified}</lastmod>
      </url>
    `).join('');
  
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${urls}
       </urlset>`,
      { headers: { 'Content-Type': 'application/xml' } }
    );
  }
  