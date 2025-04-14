import { useEffect, useState } from 'react';

export default function ParallaxHero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image moves slower for parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bckgd.png')",
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
      />

      {/* Overlay content stays fixed */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
        <div>
          <h1 className="text-5xl font-bold">Welcome to the Mountains</h1>
          <p className="mt-4 text-xl">Experience the parallax scroll</p>
        </div>
      </div>

      {/* Optional: dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />
    </div>
  );
}
