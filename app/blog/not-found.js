//APP/BLOG/not-found.js

export default function NotFound() {
   
  
   
    
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat text-white text-center"
      style={{ backgroundImage: "url('/images/maison.webp')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-thin mb-4">
          404
        </h1>
        <p className="text-md sm:text-xl md:text-2xl mb-8 font-thin">
          Vous semblez suivre le mauvais chemin...
        </p>
        <div className="absolute inset-0 bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% z-20"  />
        <a
          href="/blog"
           className="inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-white text-sm uppercase text-white rounded-full transition-all duration-200 hover:bg-gray-900/60 hover:text-white active:scale-95 z-30"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  )
}
