'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [contentTypes, setContentTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetch('http://localhost:8888/wordpress/wp-json/wp/v2/content_type')
      .then(res => res.json())
      .then(data => setContentTypes(data));
  }, []);

  useEffect(() => {
    const url = selectedType
      ? `http://localhost:8888/wordpress/wp-json/wp/v2/blog_article?content_type=${selectedType}&_embed`
      : `http://localhost:8888/wordpress/wp-json/wp/v2/blog_article?_embed`;

    fetch(url)
      .then(res => res.json())
      .then(data => setArticles(data));
  }, [selectedType]);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Nos Articles</h1>
        <p className="text-lg text-gray-600">
          Découvrez nos contenus autour du bien-être, de la randonnée, et plus encore.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les types</option>
          {contentTypes.map((type) => (
            <option key={type.id} value={type.slug}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const featuredImage =
            article._embedded?.['wp:featuredmedia']?.[0]?.source_url;
          const contentTypes =
            article._embedded?.['wp:term']?.[0] || [];

          return (
            <div key={article.id} className="rounded-2xl overflow-hidden shadow-md bg-white">
              <div className="relative h-64">
                {featuredImage && (
                  <img
                    src={featuredImage}
                    alt={article.title.rendered}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h2 className="absolute bottom-4 left-4 text-white text-4xl font-bold z-10">
                  {article.title.rendered}
                </h2>
              </div>

              <div className="p-6">
                {contentTypes.length > 0 && (
                  <div className="mb-3">
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
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
                />

<Link
  href={`/article/${article.slug}`}
  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
>
  Lire l’article
</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
