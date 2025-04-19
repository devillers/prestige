"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ChamonixHomepage() {
  const [properties, setProperties] = useState([]);
  const containerRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(
          "http://localhost:8888/wordpress/wp-json/wp/v2/portfolio?_embed"
        );
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
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/seminaire.png)] bg-cover bg-center">
          <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
            Votre <span className="md:text-9xl text-white">évenement</span> dans la vallée de <span className="md:text-8xl text-white">chamonix</span>
          </h1>

          {/* <h1 className="md:ml-[200px] text-white text-4xl font-thin mb-10 z-20">
            Notre service événementiel
          </h1>
          <h2 className="md:ml-[200px] text-center text-white md:text-left text-2xl font-thin mb-20 max-w-3xl z-20">
            Organisons ensemble votre événement hors du commun
          </h2>
          <p className="md:ml-[200px] text-center text-white md:text-left max-w-[700px] font-thin mb-10 z-20">
            Imaginez votre prochain événement dans un cadre atypique, agrémenté
            d’expériences extraordinaires. Oubliez les contraintes, notre équipe
            s’occupe de tout et organise pour vous un moment inoubliable
            entièrement sur-mesure.
          </p> */}

          {/*          
          <a
            href="#contact-form"
              className="md:ml-[200px] inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95 z-20"
          >
            contactez nous
          </a> */}
          <div className="absolute inset-0  bg-gradient-to-bl from-transparent to-black/60 z-1"></div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="max-w-7xl mx-auto text-center mb-12 p-6">
        <div className="relative z-10 mx-auto justify-center items-center flex flex-col ">
          <h1 className=" text-black text-center text-5xl font-thin mb-10 z-20">
            Notre service événementiel
          </h1>
          <h2 className=" text-center text-black  text-2xl font-thin mb-20 max-w-3xl z-20">
            Organisons ensemble votre événement hors du commun
          </h2>
          <p className=" text-black text-center  max-w-[700px] font-thin mb-10 z-20">
            Imaginez votre prochain événement dans un cadre atypique, agrémenté
            d’expériences extraordinaires. Oubliez les contraintes, notre équipe
            s’occupe de tout et organise pour vous un moment inoubliable
            entièrement sur-mesure.
          </p>

          <a
            href="#contact-form"
            className=" mb-10 inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95 z-20"
          >
            contactez nous
          </a>
        </div>

        <div
          className="relative w-full max-w-[90%] md:max-w-[1000px] mx-auto"
          ref={containerRef}
        >
          {/* Arrows on sides */}
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
                  featuredImage && !featuredImage.includes("rest_forbidden")
                    ? featuredImage
                    : galleryImage || "/placeholder.jpg";

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
            className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 bg-white/70 shadow p-2 rounded-full hover:bg-white "
          >
            <ChevronRight />
          </button>
        </div>

        <h2 className="text-2xl font-thin mb-2 mt-20">
          evenement sur mesure ()
        </h2>

        <Link
          href="/repertoire"
          className="inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95 z-20"

          
        >
          découvrez nos emplacements de luxe
        </Link>
      </section>

      {/* Custom Vacation Form */}
      <section id="contact-form" className="bg-gray-50 p-6 w-full mx-auto">
        <h2 className="text-5xl font-thin text-center mb-5 p-10">
          Organisons votre évenement sur mesure
        </h2>
        <div className="max-w-3xl mx-auto mb-6">
          <p className="font-thin p-10 text-center leading-5">
            Nous sommes là pour vous simplifier la vie. Commencez ici votre
            expérience en partageant avec nous votre projet.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Prénom"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Nom"
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              required
            />
            <input
              type="tel"
              placeholder="Tel"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="entreprise"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="type d'évenement"
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              placeholder="Date de début"
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              placeholder="Date de fin"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Budget"
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Nombre de voyageurs"
              className="border p-2 rounded "
            />
            <label className="flex items-center col-span-2 p-4">
              <input type="checkbox" className="mr-2" />
              <p className="text-[11px] font-thin">
                {" "}
                Je souhaite recevoir occasionnellement des contenus
                personnalisés et je déclare avoir pris connaissance et accepté
                sa Politique de confidentialité.
              </p>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95 z-20 col-span-2"
            >
              Envoyer ma demande
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
