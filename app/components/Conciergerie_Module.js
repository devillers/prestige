//app/components/Conciergerie_Module.js

"use client";

import { useEffect, useState } from "react";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function ServiceSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/conciergerie_service?_embed`
        );
        const data = await res.json();
        console.log("Données CPT reçues :", data);

        const parsed = data.map((item) => ({
          title: item.title.rendered,
          image: item.featured_image_url || "",
          items: item.prestations || [],
        }));

        setServices(parsed);
      } catch (error) {
        console.error("Erreur chargement des services :", error);
      }
    }

    fetchServices();
  }, []);

  return (
    <section className="bg-neutral-50">
      <div className="text-gray-800 max-w-6xl mx-auto p-4">
        {services.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-44 object-cover rounded mb-4 transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500 text-sm">
                    Image non disponible
                  </div>
                )}
                <h2 className="text-xl  font-thin mb-4">
                  {decodeHTML(service.title)}
                </h2>
                <ul className="list-inside font-thin text-[13px] leading-7 text-gray-600">
                  {service.items.map((item, i) => (
                    <li className="ml-3" key={i}>{item} </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
