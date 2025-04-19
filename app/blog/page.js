'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function BlogList() {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/blog?per_page=100&_embed`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(posts => {
        if (!Array.isArray(posts)) {
          console.error('Unexpected response:', posts)
          setError('Erreur de format des données')
          return
        }

        const grouped = {}
        posts.forEach(post => {
          const category = post?.categorie?.[0]?.name || 'Sans catégorie'
          if (!grouped[category]) grouped[category] = []
          grouped[category].push(post)
        })
        setData(grouped)
      })
      .catch(err => {
        console.error('Erreur lors du chargement des articles:', err)
        setError('Impossible de charger les articles')
      })
  }, [])

  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <>
    <section className="relative">
    <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/blog2.png)] bg-cover bg-center">
      <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
      Le Blog  <span className="md:text-9xl text-white">nos conseils</span> de megeve a chamonix
       
        {/* <span className="md:text-8xl text-white"></span> */}
      </h1>

    
      <div className="absolute inset-0  bg-gradient-to-bl from-transparent to-black/60 z-1"></div>
    </div>
  </section>
    {/* <div className="space-y-12 p-4 max-w-7xl mx-auto">
      {Object.entries(data).map(([category, posts]) => (
        <div key={category} className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map(post => {
              const imageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
              const title = post?.title?.rendered || ''

              return (

                
                <Link key={post.id} href={`/blog/${post.slug}`} target="_blank">
                  <div className="relative group rounded-xl overflow-hidden h-[300px] w-[300px] cursor-pointer">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-50 transition-all" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                      <h3
                        className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-6 drop-shadow-md"
                        dangerouslySetInnerHTML={{ __html: title }}
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
        </div>
      ))}
    </div> */}
    </>
  )
}
