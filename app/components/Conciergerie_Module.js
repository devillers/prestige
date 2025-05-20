// app/components/ConciergerieServicesSection.js

"use client";

import { useEffect, useState } from "react";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function ConciergerieServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/conciergerie_service?_embed`
        );
        const data = await res.json();

        const parsed = data.map((item) => {
          const title = item.title.rendered;
          const content = item.content.rendered;

          // récupération de l'image
          let image = item.featured_image_url || "";
          if (!image) {
            const fm = item._embedded?.["wp:featuredmedia"];
            if (fm?.length) {
              const media = fm[0];
              image =
                media.media_details?.sizes?.medium?.source_url ||
                media.source_url ||
                "";
            }
          }

          // récupération des catégories
          let categories = [];
          const terms = item._embedded?.["wp:term"];
          if (terms?.length) {
            categories = terms[0].map((cat) => cat.name);
          }

          return { title, content, image, categories };
        });

        setServices(parsed);
      } catch (error) {
        console.error("Erreur chargement des services :", error);
      }
    }

    fetchServices();
  }, []);

  return (
    <section className="bg-neutral-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {services.map((service, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <article
              key={idx}
              className={
                `bg-white rounded-lg shadow p-6 flex items-center ` +
                (isEven
                  ? "flex-row space-x-6"
                  : "flex-row-reverse space-x-6 space-x-reverse")
              }
            >
              {/* Image */}
              <div className="flex-shrink-0">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={decodeHTML(service.title)}
                    className="w-48 h-48 object-cover rounded-full transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    Pas d’image
                  </div>
                )}
              </div>

              {/* Texte */}
              <div className="flex-1">
                <h2 className="text-2xl font-light uppercase mb-2">
                  {decodeHTML(service.title)}
                </h2>

                {service.categories.length > 0 && (
                  <p className="text-sm italic text-gray-600 mb-4">
                    Catégories : {service.categories.join(", ")}
                  </p>
                )}

                <div
                  className="prose prose-sm max-w-none mx-0 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
