"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

export default function PortfolioClient() {
  const [portfolios, setPortfolios] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
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
        if (!res.ok) {
          console.warn("Réponse API non OK :", res.status);
          return;
        }

        const items = await res.json();

        if (!Array.isArray(items)) {
          console.error("Réponse inattendue pour portfolio :", items);
          return;
        }

        setPortfolios(items);
        const initialIndexes = {};
        items.forEach((item) => {
          initialIndexes[item.id] = 0;
        });
        setCurrentImages(initialIndexes);
      } catch (error) {
        console.error("Erreur lors du chargement des logements:", error);
      }
    };
    getPortfolioItems();
  }, []);

  const safePortfolios = Array.isArray(portfolios) ? portfolios : [];

  const uniqueLocations = [
    ...new Set(safePortfolios.map((p) => p.location).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));

  const uniqueFeatures = [
    ...new Map(
      safePortfolios.flatMap((p) => p.features || []).map((f) => [f.id, f])
    ).values(),
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFeatureToggle = (featureId) => {
    setFilters((prev) => {
      const newFeatures = prev.features.includes(featureId)
        ? prev.features.filter((id) => id !== featureId)
        : [...prev.features, featureId];
      return { ...prev, features: newFeatures };
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLocationToggle = (loc) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(loc)
        ? prev.locations.filter((l) => l !== loc)
        : [...prev.locations, loc],
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setFilters({
      locations: [],
      capacity: "",
      priceMin: "",
      priceMax: "",
      features: [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredPortfolios = safePortfolios.filter((item) => {
    const matchesLocation =
      filters.locations.length === 0 ||
      filters.locations.includes(item.location);
    const matchesCapacity =
      !filters.capacity || Number(item.capacity) >= Number(filters.capacity);
    const matchesPriceMin =
      !filters.priceMin || Number(item.price) >= Number(filters.priceMin);
    const matchesPriceMax =
      !filters.priceMax || Number(item.price) <= Number(filters.priceMax);
    const matchesFeatures =
      filters.features.length === 0 ||
      (item.features &&
        filters.features.every((fid) =>
          item.features.some((f) => f.id === fid)
        ));

    return (
      matchesLocation &&
      matchesCapacity &&
      matchesPriceMin &&
      matchesPriceMax &&
      matchesFeatures
    );
  });

  const handleImageNav = (itemId, imagesLength, direction) => {
    setCurrentImages((prev) => ({
      ...prev,
      [itemId]:
        direction === "next"
          ? (prev[itemId] + 1) % imagesLength
          : (prev[itemId] - 1 + imagesLength) % imagesLength,
    }));
  };

  

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/repertoire.png)] bg-cover bg-center">
          <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
          Séjour  <span className="md:text-9xl text-white">haut de gamme</span> en
            haute savoie
            {/* <span className="md:text-8xl text-white"></span> */}
          </h1>

        
          <div className="absolute inset-0  bg-gradient-to-bl from-transparent to-black/60 z-1"></div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 py-12">
      <ul className="py-4 ">
          <li>
            {" "}
            <h1 className="text-6xl md:text-8xl uppercase font-thin">
              {" "}
              Le répertoire
            </h1>
          </li>
          <li>
            {" "}
            <h2 className=" text-4xl md:text-6xl uppercase font-thin">
              {" "}
              nos logements
            </h2>
          </li>
          <li>
            {" "}
            <h3 className="text-3xl md:text-5xl uppercase  font-thin">
              {" "}
              haut de gamme
            </h3>
          </li>
        </ul>
          <p className="text-center text-black md:text-left text-lg md:text-xl font-thin my-10 z-20 leading-8">
          Partez à la découverte de lieux exclusifs, conçus pour accueillir vos événements les plus raffinés.
          Dans un décor alpin hors du commun, vivez une expérience sur-mesure, pensée dans les moindres détails. Notre équipe se charge de tout , pour que chaque instant soit unique, fluide, et inoubliable.
          </p> 

        {/* Filter Form */}
        <div className="p-4 rounded-lg mb-12 flex flex-wrap gap-4 items-start shadow">
          {/* Localité - Checkbox Group */}
          <div className="w-full">
            <label className="block text-[11px] uppercase mb-5 font-semibold text-[#bd9254]">
              Localités
            </label>
            <div className="flex flex-wrap gap-2">
              {uniqueLocations.map((loc) => (
                <label
                  key={loc}
                  className="text-xs bg-white px-2 py-1 border rounded cursor-pointer flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={filters.locations.includes(loc)}
                    onChange={() => handleLocationToggle(loc)}
                    className="mr-1 accent-[#bd9254] focus:ring-0"
                  />
                  {loc}
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="w-full">
            <label className="block text-[11px] uppercase mb-5 text-[#bd9254] font-semibold">
              Équipements
            </label>
            <div className="flex flex-wrap gap-2">
              {uniqueFeatures.map((feature) => (
                <label
                  key={feature.id}
                  className="text-xs bg-white px-2 py-1 border rounded cursor-pointer flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={filters.features.includes(feature.id)}
                    onChange={() => handleFeatureToggle(feature.id)}
                    className="mr-1 accent-[#bd9254] focus:ring-0"
                  />
                  {feature.name}
                </label>
              ))}
            </div>
          </div>

          {/* Capacity & Price Filter Row */}
          <div className="flex flex-col md:flex-row md:items-end gap-4 w-full">
            <div className="w-full md:w-auto">
              <label className="block text-[11px] uppercase mb-1 text-[#bd9254] font-semibold">
                Capacité min
              </label>
              <input
                type="number"
                name="capacity"
                value={filters.capacity}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded w-full  h-7 border-gray-300 text-xs focus:outline-none focus:ring-0"
              />
            </div>

            <div className="w-full md:w-auto">
              <label className="block text-[11px] uppercase mb-1 text-[#bd9254] font-semibold">
                Prix maximum par nuit
              </label>
              <input
                type="number"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded w-full  h-7 border-gray-300 text-xs focus:outline-none focus:ring-0"
              />
            </div>

            <div className="w-full md:w-auto">
              <label className="block text-[11px] uppercase mb-1 invisible">
                reset
              </label>
              <button
                onClick={clearFilters}
              className="inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Cards */}
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  gap-4">
          {filteredPortfolios.map((item) => {
            const featured =
              item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            const gallery = item.gallery_images || [];
            const allImages = featured
              ? [{ url: featured, alt: "Main" }, ...gallery]
              : gallery;
            const location = item.location || "—";
            const price = item.price || "—";
            const reviews = item.reviews || "";
            const features = item.features || [];

            return (
              <div
                key={item.id}
                className="bg-white  shadow rounded-2xl overflow-hidden border"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="p-4 lg:w-2/3 flex flex-col lg:flex-row gap-2">
                    {allImages.length > 0 && (
                      <div className="lg:w-2/3 min-h-96 relative overflow-hidden rounded-md">
                        <Image
                          src={allImages[currentImages[item.id]]?.url}
                          alt={allImages[currentImages[item.id]]?.alt || ""}
                          layout="fill"
                          className="object-cover transition-all duration-300"
                        />
                        {allImages.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                handleImageNav(
                                  item.id,
                                  allImages.length,
                                  "prev"
                                )
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full p-2"
                            >
                              <FaChevronLeft />
                            </button>
                            <button
                              onClick={() =>
                                handleImageNav(
                                  item.id,
                                  allImages.length,
                                  "next"
                                )
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full p-2"
                            >
                              <FaChevronRight />
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {item.side_images?.length > 0 && (
                      <div className="lg:w-1/3 hidden lg:flex flex-col gap-2">
                        {item.side_images.map((img, idx) => (
                          <div
                            key={img.id}
                            className="relative w-full h-1/2 rounded-md overflow-hidden"
                          >
                            <Image
                              src={img.url}
                              alt={img.alt || `Side Image ${idx + 1}`}
                              layout="fill"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lg:w-1/3 p-4 flex flex-col gap-4">
                    <div>
                      <h2
                        className="text-3xl font-bold uppercase"
                        dangerouslySetInnerHTML={{
                          __html: item.title.rendered,
                        }}
                      />

                      <div className="flex flex-col mt-5 text-gray-600 text-[10px] uppercase">
                        <div className="flex items-center text-sm font-semibold text-gray-500">
                          <FaMapMarkerAlt className="mr-2 text-gray-600" />
                          {location}
                        </div>

                        {item.reference && (
                          <div className="ml-6 mt-4 text-[#bd9254]">
                            Réf. {item.reference}
                          </div>
                        )}

                        {item.favourite_sentence && (
                          <div className="ml-6">{item.favourite_sentence}</div>
                        )}
                      </div>

                      {reviews && (
                        <div className="mt-6 text-yellow-500 flex items-center gap-1 text-sm">
                          {Array.from({ length: 5 }, (_, i) => {
                            const rating = parseFloat(reviews);
                            if (rating >= i + 1) {
                              return <FaStar key={i} />;
                            } else if (rating >= i + 0.5) {
                              return <FaStarHalfAlt key={i} />;
                            } else {
                              return <FaRegStar key={i} />;
                            }
                          })}
                          <span className="ml-2 text-gray-500">
                            ({reviews})
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-4 gap-2 mt-4 text-[10px] uppercase text-gray-700">
                        <div>
                          <strong>sur:</strong> {item.surface} m²
                        </div>
                        <div>
                          <strong>capacité:</strong> {item.capacity}
                        </div>
                        <div>
                          <strong>cham:</strong> {item.bedrooms}
                        </div>
                        <div>
                          <strong>sdb:</strong> {item.bathrooms}
                        </div>
                      </div>

                      {features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {features.map((feature) => (
                            <span
                              key={feature.id}
                              className="mt-2 bg-[#bd9254] text-white text-xs px-3 py-1 rounded-sm"
                            >
                              {feature.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-sm font-bold text-gray-700 mt-4">
                      <div>
                        À partir de :{" "}
                        <span className="ml-1 text-sm uppercase text-gray">
                          {price} € / jour
                        </span>
                      </div>
                      <Link
                        href={`/repertoire/${item.slug}`}
                        className="inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95"
                      >
                        voir description
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* No results message */}
          {filteredPortfolios.length === 0 && (
            <div className="text-center text-gray-500 italic mt-12">
              Aucun résultat ne correspond à vos critères de recherche.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
