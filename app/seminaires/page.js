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
      <section className="">
        <div className="mx-auto justify-center items-center md:items-start flex flex-col h-screen p-6 min-h-screen bg-white bg-[url(/images/montagne.png)] bg-cover bg-center">
          <h1 className="md:ml-[200px] text-4xl font-thin mb-10">
            Notre service événementiel
          </h1>
          <h2 className=" md:ml-[200px] text-center md:text-left text-2xl font-thin mb-20 max-w-3xl">
            Organisons ensemble votre événement hors du commun
          </h2>
          <p className="md:ml-[200px] text-center md:text-left max-w-[700px] font-thin mb-10">
            Imaginez votre prochain événement dans un cadre atypique, agrémenté
            d’expériences extraordinaires. Oubliez les contraintes, notre équipe
            s’occupe de tout et organise pour vous un moment inoubliable
            entièrement sur-mesure.
          </p>
          <a
            href="#contact-form"
            className="md:ml-[200px] bg-[#bd9254] max-w-[200px] text-white px-6 py-2 rounded mt-10"
          >
            contactez nous
          </a>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="max-w-7xl mx-auto text-center mb-12 p-6">
        <h1 className="text-4xl font-thin mb-6 mt-6 p-6 uppercase">
          Votre évenement dans la vallée de Chamonix
        </h1>

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

        <Link href="/repertoire"
           className="inline-block bg-[#bd9254] uppercase text-white px-6 py-2 rounded mt-10">
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
              className="bg-[#bd9254] text-white py-2 px-6 rounded col-span-2"
            >
              Envoyer ma demande
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
