//app/conciergerie/[id]/page.js

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ConciergerieSingle() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (!id) return

    fetch(`http://localhost:8888/wordpress/wp-json/wp/v2/conciergerie/${id}?_embed`)
      .then(res => res.json())
      .then(post => {
        setPost(post)

        const catId = post?.categorie?.[0]?.id
        if (catId) {
          fetch(`http://localhost:8888/wordpress/wp-json/wp/v2/conciergerie?conciergerie_category=${catId}&exclude=${id}&_embed`)
            .then(res => res.json())
            .then(setRelated)
        }
      })
  }, [id])

  if (!post) return <p>Chargement...</p>

  const imageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
  const category = post?.categorie?.[0]?.name || ''

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-10 space-y-16">
      {/* Hero Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow rounded-3xl  bg-white">
        {/* Left: Text */}
        <div className=''>
          {category && (
            <span className="bg-[#eedec6] text-yellow-900 text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-4  ml-4 mt-4 ">
              {category}
            </span>
          )}
          <h1
            className="text-4xl font-extrabold mb-6 leading-tight  p-4 "
            dangerouslySetInnerHTML={{ __html: post?.title?.rendered || '' }}
          />
          <div
            className="text-gray-700  space-y-4 p-4 leading-8"
            dangerouslySetInnerHTML={{ __html: post?.content?.rendered || '' }}
          />
        </div>

        {/* Right: Image */}
        <div className="w-full h-[500px] overflow-hidden rounded-r-3xl ">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={post?.title?.rendered || ''}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Related Suggestions */}
      {related.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-md ">Dans la même catégorie </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(r => {
              const img = r?._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
              return (
                <Link key={r.id} href={`/conciergerie/${r.id}`} target="_blank">
                <div className="relative group rounded-xl overflow-hidden h-[200px] w-[200px] cursor-pointer">
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-50 transition-all" />

                    {/* Text content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                    <h3
                        className="text-base font-semibold text-white text-3xl"
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
