//app/conciergerie/page.js

'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ConciergerieList() {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch(`http://localhost:8888/wordpress/wp-json/wp/v2/conciergerie?per_page=100&_embed`)
      .then(res => res.json())
      .then(posts => {
        const grouped = {}
        posts.forEach(post => {
          const category = post?.categorie?.[0]?.name || 'Sans catégorie'
          if (!grouped[category]) grouped[category] = []
          grouped[category].push(post)
        })
        setData(grouped)
      })
  }, [])

  return (
    <div className="space-y-12 p-4 max-w-7xl mx-auto">
      {Object.entries(data).map(([category, posts]) => (
        <div key={category} className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map(post => {
              const imageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
              const title = post?.title?.rendered || ''
              // const excerpt = post?.excerpt?.rendered || ''

              return (
                <Link key={post.id} href={`/conciergerie/${post.id}`} target="_blank">
                  <div className="relative group rounded-xl overflow-hidden h-[300px] w-[300px] cursor-pointer">
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
                        className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-6 drop-shadow-md"
                        dangerouslySetInnerHTML={{ __html: title }}
                      />
                      {/* <div
                        className="hidden md:block text-white text-sm leading-relaxed mb-6 max-w-md drop-shadow-md"
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                      /> */}
                      <span className="bg-white text-black px-5 py-2 rounded-full text-lg font-medium hover:bg-gray-100 transition">
                        Voir
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
