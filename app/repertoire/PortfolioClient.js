"use client";

import { useEffect, useState } from "react";
import PortfolioCard from "../components/PortfolioCard";
import PopupDescription from "../components/PopupDescription";
import FilterForm from "../components/repertoire-components/FilterForm";

export default function PortfolioClient() {
  const [portfolios, setPortfolios] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
  const [popupSlug, setPopupSlug] = useState(null);
  const [filters, setFilters] = useState({
    locations: [],
    capacity: "",
    priceMax: "",
    features: [],
  });

  useEffect(() => {
    const getPortfolioItems = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/portfolio?_embed`
        );
        if (!res.ok) return;
        const items = await res.json();
        setPortfolios(items);
        const initial = {};
        items.forEach((item) => (initial[item.id] = 0));
        setCurrentImages(initial);
      } catch (error) {
        console.error("Erreur chargement portfolio:", error);
      }
    };
    getPortfolioItems();
  }, []);

  const handleImageNav = (id, len, dir) => {
    setCurrentImages((prev) => ({
      ...prev,
      [id]: dir === "next" ? (prev[id] + 1) % len : (prev[id] - 1 + len) % len,
    }));
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      if (name === "features") {
        const exists = prev.features.includes(value);
        return {
          ...prev,
          features: exists
            ? prev.features.filter((f) => f !== value)
            : [...prev.features, value],
        };
      }
      if (name === "locations") {
        const exists = prev.locations.includes(value);
        return {
          ...prev,
          locations: exists
            ? prev.locations.filter((l) => l !== value)
            : [...prev.locations, value],
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const clearFilters = () => {
    setFilters({ locations: [], capacity: "", priceMax: "", features: [] });
  };

  const uniqueLocations = [
    ...new Set(portfolios.map((p) => p.location).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));
  const uniqueFeatures = [
    ...new Map(
      portfolios.flatMap((p) => p.features || []).map((f) => [f.id, f])
    ).values(),
  ];

  const filteredPortfolios = portfolios.filter((item) => {
    const mLoc =
      filters.locations.length === 0 ||
      filters.locations.includes(item.location);
    const mCap =
      !filters.capacity || Number(item.capacity) >= Number(filters.capacity);
    const mPrice =
      !filters.priceMax || Number(item.price) <= Number(filters.priceMax);
    const mFeat =
      filters.features.length === 0 ||
      (item.features &&
        filters.features.every((fid) =>
          item.features.some((f) => f.id === fid)
        ));
    return mLoc && mCap && mPrice && mFeat;
  });

  return (
    <>
      <section className="relative">
        <div className="relative z-10 p-6 mx-auto flex flex-col justify-center min-h-[640px] bg-[url(/images/repertoire.webp)] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-10 " />
          <h1 className=" uppercase font-bold max-w-[900px] p-6 z-20">
            <span className="md:text-6xl text-6xl text-white/70 ">Séjours</span>
            <br />
            <span className="md:text-8xl text-6xl text-white ">
              haut de gamme
            </span>
            <br />
            <span className="md:text-7xl text-6xl text-white/70 ">
              en haute
            </span>
            <br />
            <span className="md:text-8xl text-6xl text-white "> savoie</span>
            <br />
          </h1>
        </div>
     
      {/* titre */}
      <section className="max-w-5xl mx-auto py-12">
        <ul className="">
          <li>
            <h1 className="text-5xl md:text-6xl uppercase font-thin">
              Le répertoire
            </h1>
          </li>
          <li>
            <h2 className="text-4xl md:text-5xl uppercase font-thin">
              nos logements
            </h2>
          </li>
          <li>
            <h3 className="text-3xl md:text-4xl uppercase font-thin">
              haut de gamme
            </h3>
          </li>
        </ul>
      </section>

      {/* Intro */}
      <section className="text-gray-800 max-w-6xl mx-auto p-4 flex flex-col items-center ">
        <p className="text-center text-black text-md font-thin my-10 leading-8 italic">
          Partez à la découverte de lieux exclusifs, conçus pour accueillir vos
          événements les plus raffinés. Dans un décor alpin hors du commun,
          vivez une expérience sur-mesure, pensée dans les moindres détails.
          Notre équipe se charge de tout, pour que chaque instant soit unique,
          fluide, et inoubliable.
        </p>
      </section>

      {/* filter form */}
      <section className="max-w-5xl mx-auto mb-12 p-6 drop-shadow-xl">
        <FilterForm
          filters={filters}
          onChange={handleFilterChange}
          onClear={clearFilters}
          uniqueLocations={uniqueLocations}
          uniqueFeatures={uniqueFeatures}
          
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto p-12 sm:p-6">
        {/* carroussel */}
        {filteredPortfolios.map((item) => {
          const featured =
            item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const gallery = item.gallery_images || [];
          const allImages = featured
            ? [{ url: featured, alt: "Main" }, ...gallery]
            : gallery;
          const currentIndex = currentImages[item.id] || 0;

          return (
            <PortfolioCard
              key={item.id}
              item={item}
              allImages={allImages}
              currentIndex={currentIndex}
              onPrev={() => handleImageNav(item.id, allImages.length, "prev")}
              onNext={() => handleImageNav(item.id, allImages.length, "next")}
              onVoirPlus={() => setPopupSlug(item.slug)}
            />
          );
        })}
      </section>

      {popupSlug && (
        <PopupDescription slug={popupSlug} onClose={() => setPopupSlug(null)} />
        
      )}
       </section>
    </>
  );
}
