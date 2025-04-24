// app/blog/page.js

import { getMetadataForPage } from '../lib/metadata';
import BlogGrid from "../components/BlogGrid";
import Breadcrumb from "../components/BreadCrumb";

export const metadata = getMetadataForPage({
  title: 'Blog Immobilier & Conciergerie | Care Concierge',
  description: 'Conseils et inspirations pour l’immobilier haut de gamme et la conciergerie à Megève, Chamonix et en Haute-Savoie.',
  keywords: ['blog', 'conciergerie', 'immobilier', 'megeve', 'chamonix', 'alpes'],
});

// ✅ Force page to be dynamic (avoid prerender errors during build)
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const apiBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const grouped = {};

  try {
    const categoryRes = await fetch(`${apiBase}/wp-json/wp/v2/categories?per_page=100`);
    const categories = await categoryRes.json();

    await Promise.all(
      categories.map(async (category) => {
        try {
          const postRes = await fetch(
            `${apiBase}/wp-json/wp/v2/posts?categories=${category.id}&per_page=100&_embed`
          );
          if (!postRes.ok) {
            console.warn(`API non disponible pour catégorie ${category.name} (code ${postRes.status})`);
            return;
          }

          const posts = await postRes.json();
          if (Array.isArray(posts) && posts.length > 0) {
            grouped[category.name] = posts;
          }
        } catch (err) {
          console.error(`Erreur API pour catégorie ${category.name}`, err);
        }
      })
    );
  } catch (err) {
    console.error('Erreur globale de chargement des catégories', err);
  }

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col h-screen md:max-h-[640px] overflow-hidden p-6 bg-white bg-[url(/images/blog.webp)] bg-cover bg-center">
          <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
            Le Blog <span className="md:text-9xl text-white">nos conseils</span> de megève à chamonix
          </h1>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-1" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-6">
        <Breadcrumb items={[{ label: "Accueil", href: "/blog" }, { label: "Blog" }]} />
        <BlogGrid groupedPosts={grouped} />
      </div>
    </>
  );
}
