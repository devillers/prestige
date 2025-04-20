import BlogGrid from "../components/BlogGrid";
import Breadcrumb from "../components/BreadCrumb";

export default async function BlogPage() {
  const apiBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  // ✅ Fetch all taxonomy terms from 'categorie-blog'
// Fetch all categories (terms)
const categoryRes = await fetch(`${apiBase}/wp-json/wp/v2/categorie-blog?per_page=100`);
const categories = await categoryRes.json();

const grouped = {};

// For each category, fetch blog posts
await Promise.all(
  categories.map(async (category) => {
    const postRes = await fetch(
      `${apiBase}/wp-json/wp/v2/blog?categorie-blog=${category.id}&per_page=100&_embed`
    );
    const posts = await postRes.json();

    // ✅ Only add to grouped if there are posts
    if (Array.isArray(posts) && posts.length > 0) {
      grouped[category.name] = posts;
    }
  })
);


  return (
    <>
      <section className="relative">
      <div className="relative z-10 mx-auto justify-center flex flex-col h-screen md:max-h-[640px] overflow-hidden p-6 bg-white bg-[url(/images/blog3.png)] bg-cover bg-center">

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
