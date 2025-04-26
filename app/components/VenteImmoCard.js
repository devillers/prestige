//app/components/VenteImmoCard.js

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function VenteImmoCard({ item }) {
  if (!item || !item.title) return null

  const {
    _embedded,
    ville,
    surface,
    chambres,
    salles_de_bain,
    surface_terrain,
    prix_vente,
    slug,
    gallery_images = [],
  } = item

  const featuredImage = _embedded?.['wp:featuredmedia']?.[0]?.source_url
  const images = gallery_images.length > 0 ? gallery_images : (featuredImage ? [{ url: featuredImage }] : [])
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % images.length)
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)

  const formatPrix = (value) => {
    return new Intl.NumberFormat('fr-FR').format(value)
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden flex flex-col">
      {images.length > 0 && (
        <div className="relative w-full h-60">
          <Image
            src={images[current].url}
            alt={images[current].alt || 'image'}
            fill
            className="object-cover"
          />
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute h-8 w-8 left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full">‹</button>
              <button onClick={next} className="absolute h-8 w-8 right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full">›</button>
            </>
          )}
        </div>
      )}

      <div className="p-4 flex flex-col ">
        <p className='font-semibold uppercase text-xs leading-6'>Ville : <span className='font-thin'>{ville}</span></p>
        <p className='font-semibold uppercase text-xs leading-6'>Surface : <span className='font-thin'>{surface} m²</span></p>
        <p className='font-semibold uppercase text-xs leading-6'>Chambres : <span className='font-thin'>{chambres}</span></p>
        <p className='font-semibold uppercase text-xs leading-6'>SDB : <span className='font-thin'>{salles_de_bain}</span></p>
        <p className='font-semibold uppercase text-xs leading-6'>Terrain : <span className='font-thin'>{surface_terrain} m²</span></p>
        <p className='font-semibold uppercase text-xs leading-6'>Prix : <span className='font-thin'>{formatPrix(prix_vente)} €</span></p>

        <Link
          href={`/vente/${slug}`}
           className="inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95"
        >
          Voir la description
        </Link>
      </div>
    </div>
  )
}
