export async function GET() {
  const baseUrl = process.env.SITE_URL;
  const wpApi = `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2`;
  const xmlHeader = { 'Content-Type': 'application/xml; charset=utf-8' };

  try {
    const res = await fetch(`${wpApi}/seminaires?per_page=100`);
    const items = res.ok ? await res.json() : [];

    const urls = Array.isArray(items)
      ? items.map(item => {
          const lastmod = new Date(item.modified_gmt || item.modified || new Date())
            .toISOString(); // inclut le fuseau Z
          return `
            <url>
              <loc>${baseUrl}/seminaires/${item.slug}</loc>
              <lastmod>${lastmod}</lastmod>
            </url>`;
        }).join('')
      : '';

    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${urls}
       </urlset>`,
      { headers: xmlHeader }
    );
  } catch (err) {
    console.error('Sitemap séminaires error:', err);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>`,
      { headers: xmlHeader }
    );
  }
}
