// app/repertoire/PortfolioClient.js
"use client";

import { useEffect, useState } from "react";
import PortfolioCard from "../components/repertoire-components/PortfolioCard";
import PopupDescription from "../components/repertoire-components/PopupDescription";
import DrawerFilter from "../components/repertoire-components/DrawerFilter";

export default function PortfolioClient() {
  const [portfolios, setPortfolios] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
  const [popupSlug, setPopupSlug] = useState(null);

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
          // flatten any embedded term arrays
          const allTerms = (item._embedded?.["wp:term"] || []).flat();
          const features =
            allTerms
              .filter((t) => t.taxonomy === "portfolio_feature")
              .map((t) => t.name) || [];
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
      setFeatureOptions(terms.map((t) => t.name));
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
      !filters.capacity ||
      Number(item.capacity) >= Number(filters.capacity);

    const byPrice =
      !filters.priceMax ||
      Number(item.price) <= Number(filters.priceMax);

    const byFeat =
      filters.features.length === 0 ||
      item.features.some((f) => filters.features.includes(f));

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
      [id]:
        dir === "next"
          ? (prev[id] + 1) % len
          : (prev[id] - 1 + len) % len,
    }));
  };

  return (
    <>
      {/* — Hero, Filters button, etc. — */}
      <button onClick={() => setDrawerOpen(true)}>FILTRES</button>

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

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {popupSlug && (
        <PopupDescription slug={popupSlug} onClose={() => setPopupSlug(null)} />
      )}
    </>
  );
}
