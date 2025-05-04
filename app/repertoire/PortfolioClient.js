"use client";
import { FiChevronUp } from "react-icons/fi";
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
  // Data & filters
  const [portfolios, setPortfolios] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
  const [filters, setFilters] = useState({
    locations: [],
    capacity: "",
    priceMax: "",
    features: [],
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch portfolios once
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
        const initial = {};
        items.forEach((i) => { initial[i.id] = 0 });
        setCurrentImages(initial);
      } catch (e) {
        console.error("Erreur lors du chargement des logements:", e);
      }
    };
    getPortfolioItems();
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Scroll-to-top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sanitized list
  const safePortfolios = Array.isArray(portfolios) ? portfolios : [];

  // Unique filter options
  const uniqueLocations = [
    ...new Set(safePortfolios.map((p) => p.location).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));

  const uniqueFeatures = [
    ...new Map(
      safePortfolios.flatMap((p) => p.features || []).map((f) => [f.id, f])
    ).values(),
  ];

  // Handlers for filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleFeatureToggle = (fid) => {
    setFilters((f) => {
      const has = f.features.includes(fid);
      return {
        ...f,
        features: has
          ? f.features.filter((id) => id !== fid)
          : [...f.features, fid],
      };
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleLocationToggle = (loc) => {
    setFilters((f) => {
      const has = f.locations.includes(loc);
      return {
        ...f,
        locations: has
          ? f.locations.filter((l) => l !== loc)
          : [...f.locations, loc],
      };
    });
  };
  const clearFilters = () => {
    setFilters({ locations: [], capacity: "", priceMax: "", features: [] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Apply filters
  const filteredPortfolios = safePortfolios.filter((item) => {
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

  // Pagination logic
  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const paginatedPortfolios = filteredPortfolios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Image carousel nav
  const handleImageNav = (id, len, dir) => {
    setCurrentImages((prev) => ({
      ...prev,
      [id]:
        dir === "next"
          ? (prev[id] + 1) % len
          : (prev[id] - 1 + len) % len,
    }));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative z-10 p-6 mx-auto flex flex-col justify-center min-h-[640px] bg-[url(/images/repertoire.webp)] bg-cover bg-center">
          <ul className="max-w-[660px] z-20">
            <li>
              <h1 className="text-6xl md:text-8xl uppercase text-white/70 font-bold">
                Séjour
              </h1>
            </li>
            <li>
              <h2 className="text-6xl md:text-7xl uppercase text-white font-bold">
                haut de gamme
              </h2>
            </li>
            <li>
              <h3 className="text-6xl md:text-8xl uppercase text-white/70 font-bold">
                en haute savoie
              </h3>
            </li>
          </ul>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto p-6 mb-12">
        {/* Titles */}
        <ul className="py-4">
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

        {/* Intro */}
        <div className="text-gray-800 max-w-6xl mx-auto px-4 flex flex-col items-center">
          <p className="text-center text-black text-md font-thin my-10 leading-8 italic">
            Partez à la découverte de lieux exclusifs, conçus pour accueillir
            vos événements les plus raffinés. Dans un décor alpin hors du
            commun, vivez une expérience sur-mesure, pensée dans les moindres
            détails. Notre équipe se charge de tout, pour que chaque instant soit
            unique, fluide, et inoubliable.
          </p>
        </div>

        {/* Filter Form */}
        <div className="p-4 rounded-lg mb-12 flex flex-wrap gap-4 items-start shadow">
          {/* Localités */}
          <div className="w-full">
            <label className="block text-[11px] uppercase mb-5 font-semibold text-[#bd9254]">
              Localités
            </label>
            <div className="flex flex-wrap gap-2">
              {uniqueLocations.map((loc) => (
                <label
                  key={loc}
                  className="text-xs bg-white px-2 py-1 border rounded flex items-center cursor-pointer"
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
          {/* Équipements */}
          <div className="w-full">
            <label className="block text-[11px] uppercase mb-5 font-semibold text-[#bd9254]">
              Équipements
            </label>
            <div className="flex flex-wrap gap-2">
              {uniqueFeatures.map((f) => (
                <label
                  key={f.id}
                  className="text-xs bg-white px-2 py-1 border rounded flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.features.includes(f.id)}
                    onChange={() => handleFeatureToggle(f.id)}
                    className="mr-1 accent-[#bd9254] focus:ring-0"
                  />
                  {f.name}
                </label>
              ))}
            </div>
          </div>
          {/* Capacity & Price */}
          <div className="flex flex-col md:flex-row md:items-end gap-4 w-full">
            <div className="w-full md:w-auto">
              <label className="block text-[11px] uppercase mb-1 font-semibold text-[#bd9254]">
                Capacité min
              </label>
              <input
                type="number"
                name="capacity"
                value={filters.capacity}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded w-full h-7 text-xs focus:outline-none focus:ring-0"
              />
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-[11px] uppercase mb-1 font-semibold text-[#bd9254]">
                Prix maximum par nuit
              </label>
              <input
                type="number"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded w-full h-7 text-xs focus:outline-none focus:ring-0"
              />
            </div>
            <div className="w-full md:w-auto">
              <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center px-4 h-[30px] mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Cards */}
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {paginatedPortfolios.map((item) => {
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
                className="bg-white shadow rounded-2xl overflow-hidden border"
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
                                handleImageNav(item.id, allImages.length, "prev")
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full p-2"
                            >
                              <FaChevronLeft />
                            </button>
                            <button
                              onClick={() =>
                                handleImageNav(item.id, allImages.length, "next")
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
                        dangerouslySetInnerHTML={{ __html: item.title.rendered }}
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
                            const r = parseFloat(reviews);
                            if (r >= i + 1) return <FaStar key={i} />;
                            if (r >= i + 0.5) return <FaStarHalfAlt key={i} />;
                            return <FaRegStar key={i} />;
                          })}
                          <span className="ml-2 text-gray-500">({reviews})</span>
                        </div>
                      )}
                      <div className="grid grid-cols-4 gap-2 mt-4 text-[10px] uppercase text-gray-700">
                        <div><strong>surf:</strong> {item.surface} m²</div>
                        <div><strong>capacité:</strong> {item.capacity}</div>
                        <div><strong>chamb:</strong> {item.bedrooms}</div>
                        <div><strong>sdb:</strong> {item.bathrooms}</div>
                      </div>
                      {features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {features.map((f) => (
                            <span
                              key={f.id}
                              className="mt-2 bg-[#bd9254] text-white text-xs px-3 py-1 rounded-sm"
                            >
                              {f.name}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border rounded disabled:opacity-40"
              >
                Précédent
              </button>
              <span className="text-sm">
                Page {currentPage} sur {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border rounded disabled:opacity-40"
              >
                Suivant
              </button>
            </div>
          )}

          {/* No results */}
          {filteredPortfolios.length === 0 && (
            <div className="text-center text-gray-500 italic mt-12">
              Aucun résultat ne correspond à vos critères de recherche.
            </div>
          )}
        </div>

        {/* Scroll-to-top */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Retour en haut"
            className="fixed bottom-6 right-6 z-50 animate-bounce p-3 rounded-full border-white/20 bg-gray-200/90 hover:bg-gray-200/30 hover:border-white/60 border-2 text-[#bd9254] transition duration-300"
          >
            <FiChevronUp className="text-2xl" />
          </button>
        )}
      </div>
    </>
  );
}
