export async function GET() {
  const baseUrl = process.env.SITE_URL;
  const wpApi = `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2`;
  const headers = { 'Content-Type': 'application/xml; charset=utf-8' };

  try {
    const [resV, resVille, resType] = await Promise.all([
      fetch(`${wpApi}/vente?per_page=100`),
      fetch(`${wpApi}/ville?per_page=100`),
      fetch(`${wpApi}/type_bien?per_page=100`)
    ]);
    const [ventes, villes, types] = await Promise.all([
      resV.ok ? resV.json() : [],
      resVille.ok ? resVille.json() : [],
      resType.ok ? resType.json() : []
    ]);

    const urls = [
      ...ventes.map(item => {
        const lastmod = new Date(item.modified || new Date()).toISOString();
        return `<url><loc>${baseUrl}/vente/${item.slug}</loc><lastmod>${lastmod}</lastmod></url>`;
      }),
      ...villes.map(term => {
        const lastmod = new Date().toISOString();
        return `<url><loc>${baseUrl}/vente/${term.slug}</loc><lastmod>${lastmod}</lastmod></url>`;
      }),
      ...types.map(term => {
        const lastmod = new Date().toISOString();
        return `<url><loc>${baseUrl}/vente/${term.slug}</loc><lastmod>${lastmod}</lastmod></url>`;
      })
    ].join('');

    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
      { headers }
    );
  } catch (err) {
    console.error('❌ sitemap-vente error:', err);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>`,
      { headers }
    );
  }
}
