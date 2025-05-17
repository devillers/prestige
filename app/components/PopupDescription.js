"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import PhotoGallery from "./repertoire-components/PhotoGallery";
import PropertyDescriptionHeader from "./repertoire-components/PropertyDescriptionHeader";

export default function PopupDescription({ slug, onClose }) {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/portfolio?slug=${slug}&_embed`
        );
        if (!res.ok) return;
        const data = await res.json();
        const prop = data[0];
        if (prop) setProperty(prop);
      } catch (error) {
        console.error("Erreur chargement propriété:", error);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <AnimatePresence>
      {slug && (
        <motion.div
          key="popup"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-xl max-w-4xl w-full h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              <FaTimes />
            </button>

            {property ? (
              <>
                <PropertyDescriptionHeader
                  property={property}
                  booking_url={property.booking_url}
                />
                <section className="max-w-[900px] mx-auto text-slate-600 font-sans">
                  <h1
                    className="text-5xl md:text-7xl font-thin text-center leading-tight"
                    dangerouslySetInnerHTML={{ __html: property.title.rendered }}
                  />
                  <p className="text-gray-600 my-6 text-xl text-center font-thin flex justify-center items-center gap-2">
                    <FaMapMarkerAlt /> {property.location || "Localisation inconnue"}
                  </p>
                  {property.features?.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 px-6 mb-4">
                      {property.features.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-center gap-2 px-4 py-2 bg-[#bd9254] text-white rounded-sm uppercase text-xs"
                        >
                          <FaCheck className="text-white text-sm" />
                          {feature.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    className="text-gray-700 text-[13px] font-thin leading-8 text-justify p-4"
                    dangerouslySetInnerHTML={{ __html: property.content?.rendered }}
                  />
                  {property.gallery_images?.length > 0 && (
                    <section className="mt-8">
                      <PhotoGallery images={property.gallery_images} />
                    </section>
                  )}
                </section>
              </>
            ) : (
              <div className="text-center py-20 text-gray-500 uppercase">
                Chargement de la propriété…
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
