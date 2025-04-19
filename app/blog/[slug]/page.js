'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function BlogSingle() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/blog?slug=${slug}&_embed`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(results => {
        const post = results[0]
        if (!post) {
          setPost(undefined) // triggers 404-like state
          return
        }

        setPost(post)

        const catId = post?.categorie?.[0]?.id
        if (catId) {
          fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/blog?blog=${catId}&exclude=${post.id}&_embed`)
            .then(res => res.json())
            .then(setRelated)
        }
      })
      .catch(err => {
        console.error('Erreur lors du chargement de l’article:', err)
        setError('Impossible de charger l’article')
      })
  }, [slug])

  if (error) return <p className="p-4 text-red-500">{error}</p>
  if (post === null) return <p className="p-4 text-gray-500">Chargement…</p>
  if (post === undefined) return <p className="p-4 text-gray-500">Aucun article trouvé.</p>

  const imageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
  const category = post?.categorie?.[0]?.name || ''

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-10 space-y-16">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow rounded-3xl bg-white">
        {/* Text */}
        <div>
          {category && (
            <span className="bg-[#eedec6] text-yellow-900 text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-4 ml-4 mt-4">
              {category}
            </span>
          )}
          <h1
            className="text-4xl font-extrabold mb-6 leading-tight p-4"
            dangerouslySetInnerHTML={{ __html: post?.title?.rendered || '' }}
          />
          <div
            className="text-gray-700 space-y-4 p-4 leading-8"
            dangerouslySetInnerHTML={{ __html: post?.content?.rendered || '' }}
          />
        </div>

        {/* Image */}
        <div className="w-full h-[500px] overflow-hidden rounded-r-3xl">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={post?.title?.rendered || ''}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-md">Dans la même catégorie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(r => {
              const img = r?._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
              return (
                <Link key={r.id} href={`/blog/${r.slug}`} target="_blank">
                  <div className="relative group rounded-xl overflow-hidden h-[200px] w-[200px] cursor-pointer">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-50 transition-all" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                      <h3
                        className="font-semibold text-white text-3xl"
                        dangerouslySetInnerHTML={{ __html: r?.title?.rendered || '' }}
                      />
                      <span className="bg-white text-black px-5 py-2 rounded-full text-lg font-medium hover:bg-gray-100 transition">
                        Voir
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
