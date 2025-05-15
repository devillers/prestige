export async function GET() {
  const baseUrl = process.env.SITE_URL || "https://careconcierge.fr";
  const wpApi = process.env.WORDPRESS_API_URL || "https://api.careprestige.fr/wp-json/wp/v2";

  try {
    const res = await fetch(`${wpApi}/posts?per_page=100`, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 60 * 60 }, // 1h de cache SEO friendly
    });

    if (!res.ok) throw new Error(`Erreur API: ${res.status} ${res.statusText}`);

    const items = await res.json();

    const urls = Array.isArray(items)
      ? items
          .map(
            (item) => `
      <url>
        <loc>${baseUrl}/blog/${item.slug}</loc>
        <lastmod>${new Date(item.modified_gmt || item.modified).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
          )
          .join("")
      : "";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("❌ Sitemap blog error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><error>Erreur sitemap blog</error>`,
      { status: 500, headers: { "Content-Type": "application/xml" } }
    );
  }
}
