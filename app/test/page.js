export default function BlogHero() {
  return (
    <section className="relative min-h-screen flex  justify-center bg-gray-50 overflow-hidden">
      {/* Background Blog text */}
      <h1 className="absolute text-[35vw] md:text-[25vw] top-[12%] font-extrabold text-indigo-100 z-0 select-none">
        Blog
      </h1>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="relative text-7xl font-bold text-gray-900/50 mb-4 top-[30%] md:top-[48%] font-semibold ">Our blog</h2>
        <p className="relative text-lg text-gray-700 font-thin top-[28%] md:top-[48%]">
          Read our latest articles and posts on branding, design, technology,<br />
          marketing and loads more.
        </p>
      </div>

      {/* Scroll Arrow */}
      <div className="absolute bottom-[35%] md:bottom-[30%] left-1/2 transform -translate-x-1/2">
        <div className="w-10 h-10 border-2 border-red-400 rounded-md flex items-center justify-center mx-auto">
          <span className="text-red-400 text-3xl">&#8595;</span>
        </div>
      </div>
    </section>
  );
}
