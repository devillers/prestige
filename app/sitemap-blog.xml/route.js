export async function GET() {
  const baseUrl = process.env.SITE_URL || "https://careconciergeluxury.com";
  const wpApi =
    process.env.WORDPRESS_API_URL ||
    "https://api.careconciergeluxury/wp-json/wp/v2";

  try {
    const res = await fetch(`${wpApi}/posts?per_page=100`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // ISR: 1 hour
    });
    if (!res.ok) throw new Error(`API ${res.status} ${res.statusText}`);

    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>`,
        { headers: { "Content-Type": "application/xml; charset=utf-8" } }
      );
    }

    const urls = items
      .map((item) => {
        const slug = item.slug || "";
        const lastmod = item.modified_gmt
          ? new Date(item.modified_gmt).toISOString()
          : new Date(item.modified || Date.now()).toISOString();
        return `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(sitemap, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  } catch (error) {
    console.error("❌ Sitemap blog error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>`,
      { headers: { "Content-Type": "application/xml; charset=utf-8" } }
    );
  }
}
