export async function GET() {
    const baseUrl = 'https://care-prestige.vercel.app';
  
    const staticPaths = [
      '',
      '/conciergerie',
      '/mentions-legales',
      '/politique-de-confidentialite',
    ];
  
    const urls = staticPaths.map(path => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
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
  