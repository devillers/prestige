//app/vente/page.js

"use client";
import { useEffect, useState } from "react";
import VenteImmoCard from "../components/VenteImmoCard";

export default function VentePage() {
  const [biens, setBiens] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    villes: [],
    prixMax: "",
  });
  const [allTypes, setAllTypes] = useState([]);
  const [allVilles, setAllVilles] = useState([]);

  // 🔄 Récupération des types et villes depuis WordPress
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/vente_immo/v1/types`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("types reçus:", data);
        setAllTypes(data);
      });

    fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/vente_immo/v1/villes`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("villes reçues:", data);
        setAllVilles(data);
      });
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
    <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/seminaire.png)] bg-cover bg-center">
      <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
      Séjour  <span className="md:text-9xl text-white">haut de gamme</span> en
        haute savoie
        {/* <span className="md:text-8xl text-white"></span> */}
      </h1>

    
      <div className="absolute inset-0  bg-gradient-to-bl from-transparent to-black/60 z-1"></div>
    </div>
  </section>
    <div className="max-w-7xl mx-auto p-6 ">
      {/* FORMULAIRE DE FILTRES */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
  <h2 className="text-xl font-bold text-gray-800 mb-6">Filtres</h2>
  <div className="flex flex-wrap items-center gap-8">

    {/* TYPE DE BIEN */}
    <div>
      <p className="text-xs font-semibold text-[#bd9254] uppercase mb-2">Type de bien</p>
      <div className="flex flex-wrap gap-3">
        {allTypes.map(cat => (
          <label
            key={cat.slug}
            className="flex items-center gap-2 border border-gray-300 rounded px-4 py-1 text-[12px] cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters.categories.includes(cat.slug)}
              onChange={() => toggleFilter('categories', cat.slug)}
              className="accent-[#bd9254]"
            />
            <span className="">{cat.name}</span>
          </label>
        ))}
      </div>
    </div>

    {/* VILLE */}
    <div>
      <p className="text-xs font-semibold text-[#bd9254] uppercase mb-2">Ville</p>
      <div className="flex flex-wrap gap-3">
        {allVilles.map(ville => (
          <label
            key={ville}
            className="flex items-center gap-2 border border-gray-300 rounded px-4 py-1 text-[12px] cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters.villes.includes(ville)}
              onChange={() => toggleFilter('villes', ville)}
              className="accent-[#bd9254]"
            />
            <span className="">{ville}</span>
          </label>
        ))}
      </div>
    </div>

    {/* PRIX MAX */}
    <div>
      <label className="text-xs font-semibold text-[#bd9254] uppercase mb-2 block">
        Prix maximum (€)
      </label>
      <input
        type="number"
        className="border h-7 border-gray-300 text-xs rounded px-3 py-2 w-40"
        value={filters.prixMax}
        onChange={(e) => setFilters({ ...filters, prixMax: e.target.value })}
      />
    </div>
  </div>
</div>


      {/* LISTING DES BIENS */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {biens.map((item) => (
          <VenteImmoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
    </>
  );
}
