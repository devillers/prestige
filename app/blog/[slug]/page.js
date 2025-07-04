//app/blog/[slug]/page.js

import { getMetadataForPage } from "../../../lib/metadata";
import { notFound } from "next/navigation";
import Breadcrumb from "../../components/BreadCrumb";
import StructuredDataBlog from "./StructuredDataBlog";

export async function generateMetadata({ params }) {
  const { slug } = await Promise.resolve(params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/blog?slug=${slug}&_embed`
  );
  const posts = await res.json();
  const post = posts[0];

  if (!post) {
    return getMetadataForPage({
      title: "Article introuvable",
      description: "Cet article n’existe pas ou a été supprimé.",
    });
  }

  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return getMetadataForPage({
    title: `${post.title.rendered} | Blog Care Concierge`,
    description:
      post.excerpt?.rendered.replace(/(<([^>]+)>)/gi, "") ??
      "Découvrez nos conseils experts.",
    keywords: [
      post.title.rendered,
      "immobilier",
      "conciergerie",
      "haute savoie",
    ],
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
  const imageUrl =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return (
    <>
      <StructuredDataBlog
        title={post.title.rendered.replace(/(<([^>]+)>)/gi, "")}
        excerpt={post.excerpt?.rendered.replace(/(<([^>]+)>)/gi, "") ?? ""}
        image={imageUrl}
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`}
      />
      <section className="relative">
        <div
          className="relative z-10 mx-auto justify-center flex flex-col min-h-[540px] p-6 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl || "/images/blog.webp"})`,
          }}
        >
          <div className="max-w-[660px] z-20 text-white">
            <h1
              className="text-5xl md:text-7xl uppercase font-bold"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-10" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/blog" },
            { label: "Blog", href: "/blog" },
            category
              ? {
                  label: category.name,
                  href: `/blog/categorie/${category.slug}`,
                }
              : null,
            { label: post.title.rendered },
          ].filter(Boolean)}
        />

        <article
          className="prose max-w-none text-[14px] text-justify"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </>
  );
}
