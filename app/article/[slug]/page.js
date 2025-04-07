//APP/ARTICLES/[slug]/page.js

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Card from '../../components/Card';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`http://localhost:8888/wordpress/wp-json/wp/v2/blog_article?slug=${slug}&_embed`)
    .then(res => res.json())
      .then(data => {
        if (data.length > 0) setArticle(data[0]);
      });
  }, [slug]);
  console.log('Slug from URL:', slug);

  if (!article) return <p className="p-6">Chargement...</p>;

  const featuredImage =
    article._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const contentTypes =
    article._embedded?.['wp:term']?.[0] || [];

  return (
    <div className="bg-gray-100 min-h-screen">
      {featuredImage && (
        <div className="relative h-[60vh] w-full">
          <img
            src={featuredImage}
            alt={article.title.rendered}
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <h1 className="absolute bottom-10 left-6 text-white text-5xl font-bold z-10 drop-shadow-xl">
            {article.title.rendered}
          </h1>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-[-4rem] relative z-10">
        {contentTypes.length > 0 && (
          <div className="mb-4">
            {contentTypes.map((type) => (
              <span
                key={type.id}
                className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mr-2"
              >
                {type.name}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose max-w-none prose-img:rounded-xl prose-h2:mt-6"
          dangerouslySetInnerHTML={{ __html: article.content.rendered }}
        />
      </div>

      <Card />

      <div className="text-center mt-10 mb-10">
      <Link
  href="/article"
  className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition"
>
  ← Retour aux articles
</Link>

      </div>
    </div>
  );
}
