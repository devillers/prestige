// app/repertoire/PortfolioClient.js
"use client";

import React, { useEffect, useState } from "react";
import PortfolioCard from "../components/repertoire-components/PortfolioCard";
import PopupDescription from "../components/repertoire-components/PopupDescription";
import DrawerFilter from "../components/repertoire-components/DrawerFilter";
import ContactModule from "../components/ContactModule";

export default function PortfolioClient({ initialSlug = null }) {
  const [portfolios, setPortfolios] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
  const [popupSlug, setPopupSlug] = useState(initialSlug);

  // drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);

  // filters state
  const [filters, setFilters] = useState({
    locations: [],
    capacity: "",
    priceMax: "",
    features: [],
  });

  // taxonomy terms for the feature filter
  const [featureOptions, setFeatureOptions] = useState([]);

  // 1) Fetch portfolios + extract features from _embed
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/portfolio?_embed`
        );
        if (!res.ok) return;
        const items = await res.json();

        const withFeatures = items.map((item) => {
          const allTerms = (item._embedded?.["wp:term"] || []).flat();
          const features = allTerms
            .filter((t) => t.taxonomy === "portfolio_feature")
            .map((t) => t.name);
          return { ...item, features };
        });

        setPortfolios(withFeatures);

        // init carousel indexes
        const idx = {};
        withFeatures.forEach(({ id }) => {
          idx[id] = 0;
        });
        setCurrentImages(idx);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  // 2) Fetch the portfolio_feature taxonomy terms
  useEffect(() => {
    async function fetchFeatures() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/portfolio_feature?per_page=100`
      );
      if (!res.ok) return;
      const terms = await res.json();
      const used = terms.filter((t) => t.count > 0);
      setFeatureOptions(used.map((t) => t.name));
    }
    fetchFeatures();
  }, []);

  // 3) Derive location options from portfolios
  const locationOptions = Array.from(
    new Set(portfolios.map((p) => p.location).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  // 4) Apply filters
  const filtered = portfolios.filter((item) => {
    const byLoc =
      filters.locations.length === 0 ||
      filters.locations.includes(item.location);
    const byCap =
      !filters.capacity || Number(item.capacity) >= Number(filters.capacity);
    const byPrice =
      !filters.priceMax || Number(item.price) <= Number(filters.priceMax);
    const byFeat =
      filters.features.length === 0 ||
      filters.features.every((f) => item.features.includes(f));
    return byLoc && byCap && byPrice && byFeat;
  });

  // 5) Handlers for updating filters
  const onLocationsChange = (newArr) =>
    setFilters((prev) => ({ ...prev, locations: newArr }));
  const onFeaturesChange = (newArr) =>
    setFilters((prev) => ({ ...prev, features: newArr }));
  const onCapacityChange = (v) =>
    setFilters((prev) => ({ ...prev, capacity: v }));
  const onPriceMaxChange = (v) =>
    setFilters((prev) => ({ ...prev, priceMax: v }));
  const clearFilters = () =>
    setFilters({ locations: [], capacity: "", priceMax: "", features: [] });

  // 6) Carousel navigation
  const handleImageNav = (id, len, dir) => {
    setCurrentImages((prev) => ({
      ...prev,
      [id]: dir === "next" ? (prev[id] + 1) % len : (prev[id] - 1 + len) % len,
    }));
  };

  // Find the property data for the current popup
  const activeProperty = portfolios.find((p) => p.slug === popupSlug) || {};

  // 7) Share handler
  const handleShare = async () => {
    // ensure no trailing slash
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
    const shareUrl = `${siteUrl}/repertoire?slug=${popupSlug}`;
    const title = activeProperty.title?.rendered || "Découvrir ce chalet";
    const text = `Regardez ce chalet d’exception : ${title}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch (err) {
        if (err.name !== "AbortError") console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Lien copié dans le presse-papiers !");
      } catch {
        alert("Impossible de copier le lien.");
      }
    }
  };

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/immo.webp)] bg-cover bg-center">
          <h1 className=" uppercase font-bold max-w-[900px] p-6 z-20">
            <span className="md:text-6xl text-6xl text-white/70 ">séjours</span>
            <br />
            <span className="md:text-8xl text-6xl text-white ">haut de </span>
            <br />
            <span className="md:text-7xl text-6xl text-white/70 ">gamme</span>
            <br />
            <span className="md:text-8xl text-6xl text-white ">en haute</span>
            <br />
            <span className="md:text-6xl text-6xl text-white ">savoie</span>
          </h1>

          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-10  " />
        </div>
      </section>

      {/* ——— Bouton FILTRES ——— */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-[500px] right-0 z-30 bg-[#bd9254] text-white uppercase text-xs font-semibold px-5 py-2 rounded-tl-full rounded-bl-full drop-shadow-2xl hover:bg-[#a67e3c] transition duration-300 ease-in-out"
      >
        FILTRES
      </button>

      {/* ——— DrawerFilter ——— */}
      <DrawerFilter
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        locationOptions={locationOptions}
        selectedLocations={filters.locations}
        onLocationsChange={onLocationsChange}
        featureOptions={featureOptions}
        selectedFeatures={filters.features}
        onFeaturesChange={onFeaturesChange}
        capacity={filters.capacity}
        onCapacityChange={onCapacityChange}
        priceMax={filters.priceMax}
        onPriceMaxChange={onPriceMaxChange}
        onClear={clearFilters}
      />

      {/* ——— Titres ——— */}
      <section className="max-w-5xl mx-auto py-12">
        <ul>
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

      {/* ——— Grid des Portfolios ——— */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto p-12 mb-10">
        {filtered.map((item) => {
          const featured =
            item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const gallery = item.gallery_images || [];
          const allImages = featured
            ? [{ url: featured, alt: "Main" }, ...gallery]
            : gallery;
          const idx = currentImages[item.id] ?? 0;

          return (
            <PortfolioCard
              key={item.id}
              item={item}
              allImages={allImages}
              currentIndex={idx}
              onPrev={() =>
                handleImageNav(item.id, allImages.length, "prev")
              }
              onNext={() =>
                handleImageNav(item.id, allImages.length, "next")
              }
              onVoirPlus={() => setPopupSlug(item.slug)}
            />
          );
        })}
      </section>

      <ContactModule />

      {/* ——— Popup Description ——— */}
      {popupSlug && (
        <PopupDescription
          slug={popupSlug}
          onClose={() => setPopupSlug(null)}
          onShare={handleShare}
        />
      )}
    </>
  );
}