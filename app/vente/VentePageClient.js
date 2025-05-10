// app/vente/VentePageClient.js
"use client";

import { useEffect, useState } from "react";
import VenteImmoCard from "../components/VenteImmoCard";
import StructuredDataVente from "./StructuredDataVente";

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
      <StructuredDataVente />
      {/* Bannière */}
      <section className="relative">
        <div className="relative z-10 mx-auto flex flex-col justify-center min-h-[640px] p-6 bg-white bg-[url(/images/immo.webp)] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-10" />
          <h1 className=" uppercase font-bold max-w-[900px] p-6 z-20">
            <span className="md:text-6xl text-6xl text-white/70 ">
              Votre bien
            </span>
            <br />
            <span className="md:text-8xl text-6xl text-white ">
              {" "}
              notre expertise
            </span>
            <br />
            <span className="md:text-7xl text-6xl text-white/70 ">
              {" "}
              haut de
            </span>
            <br />
            <span className="md:text-8xl text-6xl text-white "> gamme</span>
          </h1>
        </div>
      </section>

      {/* Présentation */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-gray-800 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl uppercase font-thin">
            Swixim international
          </h2>

          <h3 className="text-3xl md:text-5xl uppercase font-thin">
            sallanches
          </h3>

          <div className="max-w-6xl mx-auto p-6 flex flex-col items-center">
            <p className="text-center text-black text-md font-thin my-10 leading-8 italic">
              Pour vous accompagner à chaque étape de vos projets immobiliers,
              Swixim International Sallanches met à votre disposition une équipe
              d’experts, chacun spécialiste de son domaine, qui se feront un
              plaisir de vous assister de manière personnalisée.
            </p>
          </div>
        </div>
      </div>

      {/* Filtres et liste */}
      <div className="max-w-6xl mx-auto p-2 ">
        {/* UI des filtres */}
        <div className="mb-8  bg-gray-500/60 p-3 rounded">
          <div className="flex flex-wrap items-baseline gap-8">
            {/* Types de bien */}
            <div>
              <p className="text-xs font-semibold text-white uppercase mb-2">
                Type de bien
              </p>
              <div className="flex flex-col gap-3">
                {allTypes.map((cat) => {
                  const id = `type-${cat.slug}`;
                  return (
                    <label
                      key={cat.slug}
                      htmlFor={id}
                      className="flex uppercase text-[10px] font-light cursor-pointer"
                    >
                      <input
                        id={id}
                        name="categories"
                        type="checkbox"
                        checked={filters.categories.includes(cat.slug)}
                        onChange={() => toggleFilter("categories", cat.slug)}
                        className="accent-[#bd9254]"
                      />
                      <span className="ml-1">{cat.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Villes */}
            <div>
              <p className="text-xs font-semibold text-white uppercase mb-2">
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
                      className="flex uppercase text-[10px] font-light cursor-pointer"
                    >
                      <input
                        id={id}
                        name="villes"
                        type="checkbox"
                        checked={filters.villes.includes(ville)}
                        onChange={() => toggleFilter("villes", ville)}
                        className="accent-[#bd9254] "
                      />
                      <span className="ml-1">{ville}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Prix maximum */}
            <div>
              <label
                htmlFor="prixMax"
                className="text-xs font-semibold text-white uppercase mb-2 block"
              >
                Prix max
              </label>
              <input
                id="prixMax"
                name="prixMax"
                type="number"
                className="border h-7 border-gray-300 text-xs rounded px-3 py-2 w-24 focus:outline-none focus:ring-0"
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
