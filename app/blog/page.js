import { getMetadataForPage } from "../lib/metadata";
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

  // Fetch all categories
  const categoryRes = await fetch(
    `${apiBase}/wp-json/wp/v2/categorie-blog?per_page=100`
  );
  const categories = await categoryRes.json();

  const grouped = {};

  // Paginated fetch for each category WITH _embed to get featured images
  await Promise.all(
    categories.map(async (category) => {
      let allPosts = [];
      let page = 1;
      let morePosts = true;

      while (morePosts) {
        const res = await fetch(
          `${apiBase}/wp-json/wp/v2/blog?categorie-blog=${category.id}&per_page=100&page=${page}&_embed`
        );
        const posts = await res.json();

        if (!Array.isArray(posts) || posts.length === 0) {
          morePosts = false;
        } else {
          allPosts.push(...posts);
          page++;
        }
      }

      if (allPosts.length > 0) {
        grouped[category.name] = allPosts;
      }
    })
  );

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/blog.webp)] bg-cover bg-center">
          <ul className="max-w-[700px] z-20">
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
        <ul>
          <li>
            <h5 className="text-4xl md:text-7xl uppercase font-thin">
              Découvrez
            </h5>
          </li>
          <li>
            <h6 className="text-3xl md:text-6xl uppercase font-thin">
              notre blog.{" "}
            </h6>
          </li>
          <li>
            <h6 className="text-2xl md:text-4xl uppercase font-thin">
              nos conseils - nos idées de sortie
            </h6>
          </li>
        </ul>
        <div className="text-gray-800 max-w-6xl mx-auto p-6 flex flex-col items-center">
          <p className="text-center p-6 text-black text-md font-thin my-10 z-20 leading-8 italic">
            Plongez dans les coulisses d’une conciergerie de luxe en
            Haute-Savoie. Découvrez nos conseils exclusifs et les tendances
            d’exception qui font vibrer l’art de vivre savoyard.
          </p>
        </div>

        <Breadcrumb
          items={[{ label: "Accueil", href: "/blog" }, { label: "Blog" }]}
        />
        <BlogGrid groupedPosts={grouped} />
      </div>
    </>
  );
}
