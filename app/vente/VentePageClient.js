//app/vente/VentePageClient.js

'use client';

import { useEffect, useState } from "react";
import VenteImmoCard from "../components/VenteImmoCard";

export default function VentePageClient() {
  const [biens, setBiens] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    villes: [],
    prixMax: "",
  });
  const [allTypes, setAllTypes] = useState([]);
  const [allVilles, setAllVilles] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/vente_immo/v1/types`)
      .then((res) => res.json())
      .then(setAllTypes);

    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/vente_immo/v1/villes`)
      .then((res) => res.json())
      .then(setAllVilles);
  }, []);

  useEffect(() => {
    fetchBiens();
  }, [filters]);

  const fetchBiens = async () => {
    try {
      const params = new URLSearchParams();
      filters.categories.forEach((c) => params.append("type_bien", c));
      filters.villes.forEach((v) => params.append("ville", v));
      if (filters.prixMax) params.append("prix_max", filters.prixMax);

      const res = await fetch(`/api/vente?${params.toString()}`);
      if (!res.ok) return console.error("Erreur API:", res.statusText);
      const data = await res.json();
      setBiens(data);
    } catch (err) {
      console.error("Erreur client:", err);
    }
  };

  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/immo.webp)] bg-cover bg-center">
          <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
            Votre bien <span className="md:text-9xl text-white">notre expertise</span>
            <span className="md:text-7xl text-white/70"> haut</span>
            <span className="md:text-7xl text-white"> de gamme</span>
          </h1>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-1"></div>
        </div>
      </section>
  
      <p className="font-thin text-lg mb-6 max-w-4xl mx-auto p-6 border-l-[1px] border-l-slate-400 pl-4 mt-6">
        Parce que votre projet immobilier mérite une expertise d’exception...
      </p>
  
      <div className="max-w-6xl mx-auto p-6">
        {/* Filter UI */}
        <div className="mb-8 p-6 bg-white">
          <div className="flex flex-wrap items-center gap-8">
            {/* Types */}
            <div>
              <p className="text-xs font-semibold text-[#bd9254] uppercase mb-2">Type de bien</p>
              <div className="flex flex-wrap gap-3">
                {allTypes.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2 border border-gray-300 rounded px-4 py-1 text-[12px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat.slug)}
                      onChange={() => toggleFilter("categories", cat.slug)}
                      className="accent-[#bd9254]"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
  
            {/* Villes */}
            <div>
              <p className="text-xs font-semibold text-[#bd9254] uppercase mb-2">Ville</p>
              <div className="flex flex-wrap gap-3">
                {allVilles.map((ville) => (
                  <label key={ville} className="flex items-center gap-2 border border-gray-300 rounded px-4 py-1 text-[12px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.villes.includes(ville)}
                      onChange={() => toggleFilter("villes", ville)}
                      className="accent-[#bd9254]"
                    />
                    <span>{ville}</span>
                  </label>
                ))}
              </div>
            </div>
  
            {/* Prix */}
            <div>
              <label className="text-xs font-semibold text-[#bd9254] uppercase mb-2 block">Prix maximum (€)</label>
              <input
                type="number"
                className="border h-7 border-gray-300 text-xs rounded px-3 py-2 w-40"
                value={filters.prixMax}
                onChange={(e) => setFilters({ ...filters, prixMax: e.target.value })}
              />
            </div>
          </div>
        </div>
  
        {/* Grid des biens */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {biens.length > 0 ? (
            biens.map((item) => <VenteImmoCard key={item.id} item={item} />)
          ) : (
            <p className="text-gray-500 italic col-span-full text-center py-8">
              Aucun bien ne correspond aux filtres sélectionnés.
            </p>
          )}
        </div>
      </div>
    </>
  );
  
}
