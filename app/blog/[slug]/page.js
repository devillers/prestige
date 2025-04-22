//app/repertoire/[slug]/page.js

import { notFound } from 'next/navigation';
import Breadcrumb from "../../components/BreadCrumb";

async function getPost(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/blog?slug=${slug}&_embed`,
    { next: { revalidate: 60 } } // optionnel : ISR
  );

  if (!res.ok) return null;

  const posts = await res.json();
  return posts?.[0];
}

export default async function PostPage(props) {
  const { slug } = await Promise.resolve(props.params);

  const post = await getPost(slug);

  if (!post || !post.content?.rendered) return notFound();

  const category = post?.categorie?.[0];
  const imageUrl = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/blog2.png)] bg-cover bg-center">
          <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
            Le Blog <span className="md:text-9xl text-white">nos conseils</span> de megève à chamonix
          </h1>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-1" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Blog", href: "/blog" },
            category ? { label: category.name, href: `/categorie-blog/${category.slug}` } : null,
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
