//app/categorie/[slug]/page.js

import { getMetadataForPage } from '../../../lib/metadata';
import BlogGrid from "../../../components/BlogGrid";
import Breadcrumb from "../../../components/BreadCrumb";

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

  // 1. Fetch all categories
  const termRes = await fetch(`${apiBase}/wp-json/wp/v2/categorie-blog?per_page=100`);
  const terms = await termRes.json();

  // 2. Find the category by slug
  const term = terms.find(t => t.slug === slug);
  if (!term) {
    return (
      <div className="text-center p-20">
        <h1 className="text-4xl font-bold text-[#bd9254] mb-4">Catégorie introuvable</h1>
        <p className="text-gray-600">
          Cette catégorie n'existe pas ou a été supprimée.
        </p>
      </div>
    );
  }

  // 3. Fetch all posts for this category
  const res = await fetch(`${apiBase}/wp-json/wp/v2/blog?categorie-blog=${term.id}&_embed`);
  const posts = await res.json();

  // 4. Prepare group for BlogGrid
  const grouped = {
    [term.name]: posts,
  };

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/blog.webp)] bg-cover bg-center">
        <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
            Le Blog <span className="md:text-9xl text-white">nos conseils</span> de megève à chamonix
          </h1>
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
