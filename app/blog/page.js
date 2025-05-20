// app/blog/page.js

import { getMetadataForPage } from "../../lib/metadata";
import BlogGrid from "../components/BlogGrid";
import Breadcrumb from "../components/BreadCrumb";

export const metadata = getMetadataForPage({
  title: "Blog Immobilier & Conciergerie | Care Concierge",
  description:
    "Conseils, inspirations et actualités sur la conciergerie haut de gamme et l’immobilier en Haute-Savoie.",
  keywords: ["blog", "immobilier", "conciergerie", "megeve", "chamonix"],
});

export default async function BlogPage() {
  const apiBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  let categories = [];

  // 1) Récupération sécurisée des catégories
  try {
    const categoryRes = await fetch(
      `${apiBase}/wp-json/wp/v2/categorie-blog?per_page=100`,
      { next: { revalidate: 60 } }
    );
    const catData = await categoryRes.json();
    categories = Array.isArray(catData) ? catData : [];
  } catch (err) {
    console.error("Erreur chargement des catégories :", err);
    categories = [];
  }

  // 2) Groupement des articles par catégorie
  const grouped = {};
  await Promise.all(
    categories.map(async (category) => {
      let allPosts = [];
      let page = 1;

      while (true) {
        try {
          const res = await fetch(
            `${apiBase}/wp-json/wp/v2/blog?categorie-blog=${category.id}&per_page=100&page=${page}&_embed`,
            { next: { revalidate: 60 } }
          );
          const data = await res.json();
          const posts = Array.isArray(data) ? data : [];

          if (posts.length === 0) break;
          allPosts.push(...posts);
          page++;
        } catch (err) {
          console.error(
            `Erreur chargement posts pour catégorie ${category.name} (page ${page}) :`,
            err
          );
          break;
        }
      }

      if (allPosts.length) {
        grouped[category.name] = allPosts;
      }
    })
  );

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto flex flex-col  justify-center min-h-[640px] p-6 bg-[url(/images/blog.webp)] bg-cover bg-center">
          <ul className="max-w-[700px] z-20 ">
            <li>
              <h1 className="text-6xl md:text-8xl uppercase text-white/70 font-bold">
                Le Blog
              </h1>
            </li>
            <li>
              <h2 className="text-6xl md:text-7xl uppercase text-white font-bold">
                nos conseils
              </h2>
            </li>
            <li>
              <h3 className="text-6xl md:text-6xl uppercase text-white/70 font-bold">
                de megève à chamonix
              </h3>
            </li>
          </ul>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-10" />
        </div>
      </section>

      <div className="text-gray-800 max-w-6xl mx-auto p-6">
        <ul className="space-y-2  mb-6">
          <li>
            <h5 className="text-4xl md:text-7xl uppercase font-thin">
              Découvrez
            </h5>
          </li>
          <li>
            <h6 className="text-3xl md:text-6xl uppercase font-thin">
              notre blog.
            </h6>
          </li>
          <li>
            <h6 className="text-2xl md:text-4xl uppercase font-thin">
              nos conseils – nos idées de sortie
            </h6>
          </li>
        </ul>

        <p className="text-center p-6 text-black text-md font-thin my-10 leading-8 italic">
          Plongez dans les coulisses d’une conciergerie de luxe en Haute-Savoie.
          Découvrez nos conseils exclusifs et les tendances d’exception qui font
          vibrer l’art de vivre savoyard.
        </p>

        <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Blog" }]} />

        <BlogGrid groupedPosts={grouped} />
      </div>
    </>
  );
}
