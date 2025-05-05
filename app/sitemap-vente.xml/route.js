export async function GET() {
    const baseUrl = 'https://care-prestige.vercel.app';
    const wpApi = `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2`;
  
    const [resVente, resVille, resType] = await Promise.all([
      fetch(`${wpApi}/vente?per_page=100`),
      fetch(`${wpApi}/ville?per_page=100`),
      fetch(`${wpApi}/type_bien?per_page=100`)
    ]);
  
    const ventes = await resVente.json();
    const villes = await resVille.json();
    const types = await resType.json();
  
    const urls = [
      ...ventes.map(item => `
        <url>
          <loc>${baseUrl}/vente/${item.slug}</loc>
          <lastmod>${item.modified}</lastmod>
        </url>
      `),
      ...villes.map(t => `
        <url>
          <loc>${baseUrl}/vente/${t.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `),
      ...types.map(t => `
        <url>
          <loc>${baseUrl}/vente/${t.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `)
    ].join('');
  
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${urls}
       </urlset>`,
      { headers: { 'Content-Type': 'application/xml' } }
    );
  }
  