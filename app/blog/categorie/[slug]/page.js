// app/categorie/[slug]/page.js
import { getMetadataForPage } from '../../../../lib/metadata';
import BlogGrid from "../../../components/BlogGrid";
import Breadcrumb from "../../../components/BreadCrumb";
import { notFound } from 'next/navigation';
import Script from 'next/script'; // ⬅ ajoute ceci

export async function generateMetadata({ params }) {
  const { slug } = await Promise.resolve(params);
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/categorie-blog?per_page=100`);
  const categories = await res.json();
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return getMetadataForPage({
      title: 'Catégorie introuvable',
      description: 'Cette catégorie d’articles n’existe pas.',
    });
  }

  return getMetadataForPage({
    title: `${category.name} | Blog Care Concierge`,
    description: `Explorez les articles de la catégorie "${category.name}" sur le blog Care Concierge.`,
    keywords: [category.name, 'immobilier', 'conciergerie', 'blog'],
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await Promise.resolve(params);
  const apiBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  // 1. Fetch categories
  const termRes = await fetch(`${apiBase}/wp-json/wp/v2/categorie-blog?per_page=100`);
  const terms = await termRes.json();

  // 2. Find the category
  const term = terms.find(t => t.slug === slug);
  if (!term) return notFound();

  // 3. Fetch posts for this category
  const res = await fetch(`${apiBase}/wp-json/wp/v2/blog?categorie-blog=${term.id}&_embed`);
  const posts = await res.json();

  // 4. Group for BlogGrid
  const grouped = { [term.name]: posts };

  // --- JSON-LD pour page catégorie ---
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://www.careconciergeluxury.com';
  const categoryUrl = `${site}/categorie/${slug}`;
  const stripHtml = (s = '') => s.replace(/<[^>]*>/g, '').trim();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Blog", "item": `${site}/blog` },
      { "@type": "ListItem", "position": 2, "name": term.name, "item": categoryUrl }
    ]
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${categoryUrl}#collection`,
    "name": `${term.name} | Blog Care Concierge`,
    "isPartOf": { "@type": "Blog", "name": "Blog Care Concierge", "url": `${site}/blog` },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "BlogPosting",
          "@id": `${site}/blog/${p.slug}#article`,
          "url": `${site}/blog/${p.slug}`,
          "headline": stripHtml(p?.title?.rendered || p?.title || p?.slug)
        }
      }))
    }
  };
  // --- fin JSON-LD ---

  return (
    <>
      {/* JSON-LD (catégorie) */}
      <Script id="ld-category" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([breadcrumbLd, collectionLd])}
      </Script>

      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/blog.webp)] bg-cover bg-center">
          <ul className=" max-w-[700px] z-20 ">
            <li>
              <h1 className="text-6xl md:text-6xl uppercase text-white/70 font-bold">Le Blog</h1>
            </li>
            <li>
              <h2 className="text-6xl md:text-7xl uppercase text-white font-bold"> nos conseils</h2>
            </li>
            <li>
              <h3 className="text-6xl md:text-6xl uppercase text-white/70 font-bold">de megève à chamonix</h3>
            </li>
          </ul>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-0" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-6">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/blog" },
            { label: "Blog", href: "/blog" },
            { label: term.name },
          ]}
        />
        <BlogGrid groupedPosts={grouped} />
      </div>
    </>
  );
}
