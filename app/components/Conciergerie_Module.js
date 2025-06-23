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

          // Récupération de l'image
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

          // Récupération des catégories
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
                `relative bg-white rounded-md shadow-xl p-6 sm:p-8 flex flex-col-reverse md:flex-row items-center justify-center md:items-center md:gap-8` +
                (idx % 2 !== 0 ? " md:flex-row-reverse" : "")
              }
            >
              {/* Image */}
              <div className="w-full md:w-1/3 flex justify-center ">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={decodeHTML(service.title)}
                    className=" hidden md:block w-48 h-48  object-cover rounded-full items-center max-w-md"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 max-w-md">
                    Pas d’image
                  </div>
                )}
              </div>

              {/* Texte */}
              <div className="w-full md:w-2/3 space-y-4  md:text-left md:max-w-xl">
                <div className="flex items-center xjustify-start mb-4">
                  <div className="text-gray-700 text-3xl sm:text-4xl italic font-bold ">
                    {idx + 1}
                  </div>
                  <h2 className="text-gray-700 text-xl font-thin sm:text-2xl italic ml-3">
                    {decodeHTML(service.title)}
                  </h2>
                </div>

                {service.categories.length > 0 && (
                  <p className="text-sm italic text-gray-500">
                    Catégories : {service.categories.join(", ")}
                  </p>
                )}
                <div
                  className="text-gray-700 italic text-[12px] leading-5 text-justify "
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
