export async function GET() {
  const baseUrl = process.env.SITE_URL;
  const now = new Date().toISOString();

  const staticPaths = [
    "/",
    "/conciergerie",
    "/blog",
    "/repertoire",
    "/seminaires",
  ];

  const urls = staticPaths
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${now}</lastmod>
    </url>
  `
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${urls}
     </urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
