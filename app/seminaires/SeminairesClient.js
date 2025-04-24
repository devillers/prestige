// ✅ /app/seminaires/SeminairesClient.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SeminaireClientPage() {
  const [properties, setProperties] = useState([]);
  const containerRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
        const res = await fetch(`${apiBase}/wp-json/wp/v2/portfolio?_embed`);
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Erreur lors du chargement des propriétés:", error);
      }
    }

    fetchProperties();

    const updateLayout = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newItemsPerView = window.innerWidth < 768 ? 1 : 3;
        setItemsPerView(newItemsPerView);
        setSlideWidth(containerWidth / newItemsPerView);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const maxIndex = Math.max(properties.length - itemsPerView, 0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/seminaire.webp)] bg-cover bg-center">
          <ul className=" max-w-[660px] z-20 ">
            <li>
              <h1 className="text-6xl md:text-8xl uppercase text-white/70 font-bold  ">
                Votre
              </h1>
            </li>
            <li>
              <h2 className="text-6xl md:text-7xl uppercase  text-white font-bold ">
                {" "}
                événement
              </h2>
            </li>
            <li>
              <h3 className="text-6xl md:text-6xl uppercase text-white/70 font-bold ">
                dans la vallée de{" "}
              </h3>
            </li>

            <li>
              <h4 className="text-6xl md:text-8xl uppercase text-white font-bold ">
                chamonix{" "}
              </h4>
            </li>
          </ul>

          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-10  " />
        </div>
      </section>

      {/* Carousel & CTA */}
      <section className="max-w-7xl mx-auto mb-12 p-6">
        <div className="text-gray-800 max-w-6xl mx-auto ">
          <ul className="">
            <li>
              <h5 className="text-4xl md:text-7xl uppercase font-thin">
                Organisons ensemble
              </h5>
            </li>
            <li>
              <h6 className="text-5xl md:text-6xl uppercase font-thin">
                votre événement
              </h6>
            </li>
            <li>
              <h7 className="text-3xl md:text-5xl uppercase font-thin">
                hors du commun
              </h7>
            </li>
          </ul>
          <p className=" text-center md:text-left font-thin py-10">
            Imaginez votre prochain événement dans un cadre atypique, agrémenté
            d’expériences extraordinaires. Oubliez les contraintes, notre équipe
            s’occupe de tout et organise pour vous un moment inoubliable
            entièrement sur-mesure.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto" ref={containerRef}>
          <button
            onClick={handlePrev}
            className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10 bg-white/70 shadow p-2 rounded-full hover:bg-white"
          >
            <ChevronLeft />
          </button>

          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${startIndex * slideWidth}px)`,
                width: `${properties.length * slideWidth}px`,
              }}
            >
              {properties.map((property) => {
                const featuredImage =
                  property._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const galleryImage = property.gallery_images?.[0]?.url;
                const imageUrl =
                  featuredImage || galleryImage || "/placeholder.jpg";

                return (
                  <div
                    key={property.id}
                    style={{ width: `${slideWidth}px` }}
                    className="p-1"
                  >
                    <div className="w-full aspect-[4/5] relative rounded overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={property.title.rendered}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <h3
                      className="text-lg mt-4 text-center font-thin"
                      dangerouslySetInnerHTML={{
                        __html: property.title.rendered,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 bg-white/70 shadow p-2 rounded-full hover:bg-white"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center my-6">
          <Link
            href="/repertoire"
            className="inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95 z-20"
          >
            découvrez nos emplacements de luxe
          </Link>
        </div>
      </section>
    </>
  );
}
