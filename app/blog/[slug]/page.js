//app/blog/[slug]/page.js

import { getMetadataForPage } from '../../lib/metadata';
import { notFound } from 'next/navigation';
import Breadcrumb from "../../components/BreadCrumb";

export async function generateMetadata({ params }) {
  const { slug } = await Promise.resolve(params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/blog?slug=${slug}&_embed`
  );
  const posts = await res.json();
  const post = posts[0];

  if (!post) {
    return getMetadataForPage({
      title: 'Article introuvable',
      description: 'Cet article n’existe pas ou a été supprimé.',
    });
  }

  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return getMetadataForPage({
    title: `${post.title.rendered} | Blog Care Concierge`,
    description: post.excerpt?.rendered.replace(/(<([^>]+)>)/gi, '') ?? 'Découvrez nos conseils experts.',
    keywords: [post.title.rendered, 'immobilier', 'conciergerie', 'haute savoie'],
    openGraph: {
      images: image ? [{ url: image }] : [],
    },
  });
}

async function getPost(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/blog?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return null;

  const posts = await res.json();
  return posts?.[0];
}

export default async function PostPage({ params }) {
  const { slug } = await Promise.resolve(params);
  const post = await getPost(slug);

  if (!post || !post.content?.rendered) return notFound();
  const category = post._embedded?.["wp:term"]?.[0]?.[0];
  const imageUrl = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/blog.webp)] bg-cover bg-center">
        <ul className=" max-w-[660px] z-20 ">
            <li>
              <h1 className="text-6xl md:text-8xl uppercase text-white/70 font-bold py-1 ">
              Séjour
              </h1>
            </li>
            <li>
              <h2 className="text-7xl md:text-7xl uppercase  text-white font-bold py-1">
                {" "}
                haut de gamme
              </h2>
            </li>
            <li>
              <h3 className="text-6xl md:text-8xl uppercase text-white/70 font-bold py-1">
              en haute savoie{" "}
              </h3>
            </li>

          </ul>
        <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
            Le Blog <span className="md:text-9xl text-white">nos conseils</span> de megève à chamonix
          </h1>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-1" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/blog" },
            { label: "Blog", href: "/blog" },
            category ? { label: category.name, href: `/blog/categorie/${category.slug}` } : null,
            { label: post.title.rendered },
          ].filter(Boolean)}
        />

        {imageUrl && (
          <div className="mb-6 rounded-xl overflow-hidden">
            <img src={imageUrl} alt={post.title.rendered} className="w-full object-cover" />
          </div>
        )}

        <h1
          className="text-4xl font-bold mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </>
  );
}
