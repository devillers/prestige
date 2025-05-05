export async function GET() {
    const baseUrl = process.env.SITE_URL;
    const wpApi = `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2`;
  
    try {
      const [resVente, resVille, resType] = await Promise.all([
        fetch(`${wpApi}/vente?per_page=100`),
        fetch(`${wpApi}/ville?per_page=100`),
        fetch(`${wpApi}/type_bien?per_page=100`)
      ]);
  
      const [ventes, villes, types] = await Promise.all([
        resVente.ok ? resVente.json() : [],
        resVille.ok ? resVille.json() : [],
        resType.ok ? resType.json() : []
      ]);
  
      const urls = [
        ...(Array.isArray(ventes) ? ventes.map(item => `
          <url>
            <loc>${baseUrl}/vente/${item.slug}</loc>
            <lastmod>${item.modified || new Date().toISOString()}</lastmod>
          </url>
        `) : []),
        ...(Array.isArray(villes) ? villes.map(term => `
          <url>
            <loc>${baseUrl}/vente/${term.slug}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>
        `) : []),
        ...(Array.isArray(types) ? types.map(term => `
          <url>
            <loc>${baseUrl}/vente/${term.slug}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>
        `) : [])
      ].join('');
  
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
         <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
           ${urls}
         </urlset>`,
        { headers: { 'Content-Type': 'application/xml' } }
      );
  
    } catch (error) {
      console.error('Sitemap vente error:', error);
      return new Response('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
        headers: { 'Content-Type': 'application/xml' }
      });
    }
  }
  