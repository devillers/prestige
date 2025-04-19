import BlogGrid from "../../components/BlogGrid";
import Breadcrumb from "../../components/BreadCrumb";

export default async function CategoryPage(props) {
  const { slug } = await Promise.resolve(props.params);
  const apiBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  // Step 1: Fetch all categories
  const termRes = await fetch(`${apiBase}/wp-json/wp/v2/categorie-blog?per_page=100`);
  const terms = await termRes.json();

  // Step 2: Match the current slug to a category
  const term = terms.find(t => t.slug === slug);
  if (!term) return <p className="p-6 text-red-500">Catégorie introuvable</p>;

  // Step 3: Fetch all blog posts under this category
  const res = await fetch(`${apiBase}/wp-json/wp/v2/blog?categorie-blog=${term.id}&_embed`);
  const posts = await res.json();

  // Step 4: Prepare data for BlogGrid
  const grouped = {
    [term.name]: posts,
  };

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[400px] p-6 bg-white bg-[url(/images/blog2.png)] bg-cover bg-center">
          <h1 className="text-6xl text-white/70 font-bold max-w-4xl leading-tight uppercase z-20">
            Le Blog <span className="md:text-8xl text-white">nos conseils</span> de Megève à Chamonix
          </h1>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-0" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-6">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/blog" },
            { label: term.name },
          ]}
        />
        <h1 className="text-4xl font-bold mb-8 capitalize">{term.name}</h1>
        <BlogGrid groupedPosts={grouped} />
      </div>
    </>
  );
}
