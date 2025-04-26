// app/vente/VentePageClient.js
"use client";

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
    fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/vente_immo/v1/types`
    )
      .then((res) => res.json())
      .then(setAllTypes);

    fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/vente_immo/v1/villes`
    )
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
      {/* Bannière */}
      <section className="relative">
        <div className="relative z-10 mx-auto flex flex-col justify-center min-h-[640px] p-6 bg-white bg-[url(/images/immo.webp)] bg-cover bg-center">
          <ul className="max-w-[660px] z-20">
            <li>
              <h1 className="text-6xl sm:text-8xl uppercase text-white/70 font-bold">
                Votre bien
              </h1>
            </li>
            <li>
              <h2 className="text-6xl sm:text-7xl uppercase text-white font-bold">
                notre expertise
              </h2>
            </li>
            <li>
              <h3 className="text-6xl sm:text-6xl uppercase text-white/70 font-bold">
                {/* Optionnel */}
              </h3>
            </li>
            <li>
              <h4 className="text-6xl sm:text-7xl uppercase text-white font-bold">
                haut de gamme
              </h4>
            </li>
          </ul>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-1" />
        </div>
      </section>

      {/* Présentation */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-gray-800 max-w-6xl mx-auto">
          <ul>
            <li>
              <h5 className="text-4xl md:text-7xl uppercase font-thin">
                Organisons ensemble
              </h5>
            </li>
            <li>
              <h6 className="text-3xl md:text-6xl uppercase font-thin">
                votre événement
              </h6>
            </li>
            <li>
              <h6 className="text-2xl md:text-5xl uppercase font-thin">
                hors du commun
              </h6>
            </li>
          </ul>
          <div className="max-w-6xl mx-auto p-6 flex flex-col items-center">
            <p className="text-center text-black text-md font-thin my-10 leading-8 italic">
              Imaginez votre prochain événement dans un cadre atypique, agrémenté
              d’expériences extraordinaires. Oubliez les contraintes, notre
              équipe s’occupe de tout et organise pour vous un moment inoubliable
              entièrement sur-mesure.
            </p>
          </div>
        </div>
      </div>

      {/* Filtres et liste */}
      <div className="max-w-6xl mx-auto p-6">
        {/* UI des filtres */}
        <div className="mb-8 p-6 bg-white">
          <div className="flex flex-wrap items-center gap-8">
            {/* Types de bien */}
            <div>
              <p className="text-xs font-semibold text-[#bd9254] uppercase mb-2">
                Type de bien
              </p>
              <div className="flex flex-wrap gap-3">
                {allTypes.map((cat) => {
                  const id = `type-${cat.slug}`;
                  return (
                    <label
                      key={cat.slug}
                      htmlFor={id}
                      className="flex items-center gap-2 border border-gray-300 rounded px-4 py-1 text-[12px] cursor-pointer"
                    >
                      <input
                        id={id}
                        name="categories"
                        type="checkbox"
                        checked={filters.categories.includes(cat.slug)}
                        onChange={() =>
                          toggleFilter("categories", cat.slug)
                        }
                        className="accent-[#bd9254]"
                      />
                      <span>{cat.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Villes */}
            <div>
              <p className="text-xs font-semibold text-[#bd9254] uppercase mb-2">
                Ville
              </p>
              <div className="flex flex-wrap gap-3">
                {allVilles.map((ville) => {
                  const safeVille = ville.replace(/\s+/g, "-").toLowerCase();
                  const id = `ville-${safeVille}`;
                  return (
                    <label
                      key={ville}
                      htmlFor={id}
                      className="flex items-center gap-2 border border-gray-300 rounded px-4 py-1 text-[12px] cursor-pointer"
                    >
                      <input
                        id={id}
                        name="villes"
                        type="checkbox"
                        checked={filters.villes.includes(ville)}
                        onChange={() => toggleFilter("villes", ville)}
                        className="accent-[#bd9254]"
                      />
                      <span>{ville}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Prix maximum */}
            <div>
              <label
                htmlFor="prixMax"
                className="text-xs font-semibold text-[#bd9254] uppercase mb-2 block"
              >
                Prix maximum (€)
              </label>
              <input
                id="prixMax"
                name="prixMax"
                type="number"
                className="border h-7 border-gray-300 text-xs rounded px-3 py-2 w-40"
                value={filters.prixMax}
                onChange={(e) =>
                  setFilters({ ...filters, prixMax: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Grille des biens */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {biens.length > 0 ? (
            biens.map((item) => (
              <VenteImmoCard key={item.id} item={item} />
            ))
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