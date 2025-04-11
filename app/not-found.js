'use client'

import { useEffect } from 'react'
import { useLayout } from './LayoutContext'

export default function NotFound() {
  const { setHideLayout } = useLayout()

  useEffect(() => {
    setHideLayout(true)
    return () => setHideLayout(false)
  }, [setHideLayout])

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat text-white text-center"
      style={{ backgroundImage: "url('/paysage.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-thin mb-4">
          404
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 font-thin">
          Vous semblez suivre le mauvais chemin...
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-[#bd9254] text-white rounded-full text-base sm:text-lg hover:shadow-md transition"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  )
}
