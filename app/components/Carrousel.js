
'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % images.length)
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)
 
  return (
    <div className="relative w-full h-full">
      <Image
        src={images[current].url}
        alt={images[current].alt || 'image'}
        fill
        className="object-cover rounded-t-lg"
      />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 h-10 w-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">‹</button>
          <button onClick={next} className="absolute right-4 h-10 w-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">›</button>
        </>
      )}
    </div>
  )
}
