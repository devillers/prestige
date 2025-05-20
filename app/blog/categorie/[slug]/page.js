//app/categorie/[slug]/page.js

import { getMetadataForPage } from '../../../../lib/metadata';
import BlogGrid from "../../../components/BlogGrid";
import Breadcrumb from "../../../components/BreadCrumb";
import { notFound } from 'next/navigation';

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
  if (!term) return notFound();

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
        <ul className=" max-w-[700px] z-20 ">
            <li>
              <h1 className="text-6xl md:text-6xl uppercase text-white/70 font-bold  ">
              Le Blog
              </h1>
            </li>
            <li>
              <h2 className="text-6xl md:text-7xl uppercase  text-white font-bold ">
                {" "}
                nos conseils
              </h2>
            </li>
            <li>
              <h3 className="text-6xl md:text-6xl uppercase text-white/70 font-bold ">
              de megève à chamonix
              </h3>
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
