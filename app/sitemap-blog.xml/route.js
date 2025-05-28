export async function GET() {
  const baseUrl = process.env.SITE_URL ?? 'https://careconciergeluxury.com';
  const wpApi =
    process.env.WORDPRESS_API_URL ??
    'https://api.careconciergeluxury.com/wp-json/wp/v2';

  try {
    // ✅ correct WP endpoint
    const endpoint = `${wpApi}/posts?per_page=100&_fields=slug,modified,modified_gmt`;
    const res = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      next:    { revalidate: 3600 },
    });

    const isJson = res.headers.get('content-type')?.includes('application/json');
    if (!res.ok || !isJson) {
      throw new Error(
        `WP returned ${res.status} (${res.statusText}) or non-JSON data`,
      );
    }

    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(emptyXml, xmlHeaders);
    }

    const urls = items
      .map(({ slug = '', modified, modified_gmt }) => {
        const lastmod = new Date(modified_gmt ?? modified).toISOString();
        return `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join('');

    return new Response(wrapXml(urls), xmlHeaders);
  } catch (err) {
    console.error('❌ sitemap-blog:', err);
    return new Response(emptyXml, xmlHeaders); // still 200, empty sitemap
  }
}

const xmlHeaders = { 'Content-Type': 'application/xml; charset=utf-8' };
const emptyXml   = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>`;
const wrapXml    = (body) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
