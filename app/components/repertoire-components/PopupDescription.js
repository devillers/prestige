// app/components/repertoire-components/PopupDescription.js
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaCheck, FaShareAlt } from "react-icons/fa";
import { X } from "lucide-react";

import PhotoGallery from "./PhotoGallery";
import PropertyDescriptionHeader from "./PropertyDescriptionHeader";

export default function PopupDescription({ slug, onClose }) {
  const [property, setProperty] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [truncatedHTML, setTruncatedHTML] = useState("");

  // 1) Chargement des données via l’API WP
  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/portfolio?slug=${slug}&_embed`
        );
        if (!res.ok) return;
        const data = await res.json();
        setProperty(data[0] || null);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [slug]);

  // 2) Préparer l’aperçu à 200 mots
  useEffect(() => {
    if (!property?.content?.rendered) {
      setTruncatedHTML("");
      return;
    }
    const tmp = document.createElement("div");
    tmp.innerHTML = property.content.rendered;
    const text = (tmp.textContent || "").trim();
    const slice = text.split(/\s+/).slice(0, 200).join(" ");
    setTruncatedHTML(slice + (slice.length < text.length ? " …" : ""));
  }, [property]);

  // bascule « Voir plus / Voir moins »
  const toggle = () => setExpanded((v) => !v);

  // 3) Handler pour le partage
  const handleShare = async () => {
    if (!slug) return;

    // on construit le lien en forçant `/repertoire?slug=…`
    const pageUrl = `${window.location.origin}/repertoire?slug=${slug}`;
    const title = property?.title?.rendered || "Découvrir ce chalet";
    const text = `Regardez ce chalet d’exception : ${title}`;

    if (navigator.share) {
      try {
        // on partage titre, texte et URL
        await navigator.share({ title, text, url: pageUrl });
      } catch (err) {
        // on ignore l’annulation par l’utilisateur
        if (err.name !== "AbortError") console.error("Share failed:", err);
      }
    } else {
      // fallback : on copie dans le presse-papier
      try {
        await navigator.clipboard.writeText(pageUrl);
        alert("Lien copié dans le presse-papier !");
      } catch (err) {
        console.error("Clipboard write failed:", err);
        alert("Impossible de copier le lien.");
      }
    }
  };

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
            className="bg-white p-4 rounded-xl max-w-4xl w-full h-[90vh] overflow-y-auto relative no-scrollbar"
          >
            {/* Boutons Fermer & Partager */}
            <div className="absolute top-6 right-6 z-50 flex gap-2">
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-slate-50/20 text-white hover:bg-slate-50/30 hover:text-[#f8d750]"
              >
                <X size={20} />
              </button>
              <button
                onClick={handleShare}
                className="flex items-center h-8 px-3 rounded-full border border-white bg-slate-50/20 text-white hover:bg-slate-50/30 hover:text-[#f8d750]"
              >
                <FaShareAlt className="mr-2" />
                Partager
              </button>
            </div>

            {/* Contenu détaillé */}
            {property ? (
              <>
                <PropertyDescriptionHeader
                  property={property}
                  booking_url={property.booking_url}
                />

                <section className="max-w-[900px] mx-auto text-slate-600 font-sans">
                  <h1
                    className="text-5xl md:text-7xl font-thin text-center leading-tight mt-4"
                    dangerouslySetInnerHTML={{
                      __html: property.title.rendered,
                    }}
                  />

                  <p className="text-gray-600 my-6 text-xl text-center font-thin flex justify-center items-center gap-2">
                    <FaMapMarkerAlt />{" "}
                    {property.location || "Localisation inconnue"}
                  </p>

                  {property.features?.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 px-6 mb-4">
                      {property.features.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center gap-2 px-4 py-2 bg-[#bd9254] text-white rounded-sm uppercase text-xs"
                        >
                          <FaCheck className="text-white text-sm" />
                          {f.name}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Aperçu / Corps du texte */}
                  <motion.div
                    initial={{ height: expanded ? "auto" : 200 }}
                    animate={{ height: expanded ? "auto" : 200 }}
                    transition={{ duration: 0.3 }}
                    className={`mx-auto max-w-none prose p-4 text-gray-600 prose-sm leading-8 prose-p:mb-6 prose-li:mb-2 overflow-hidden wd-3/4 ${
                      expanded ? "" : "line-clamp-[13]"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: expanded
                          ? property.content.rendered
                          : truncatedHTML,
                      }}
                    />
                  </motion.div>

                  <div className="px-3 mt-4">
                    <button
                      onClick={toggle}
                      className="text-[#bd9254] font-light mt-2 text-sm border border-[#bd9254] rounded-full px-4 py-2 hover:bg-[#bd9254] hover:text-white transition"
                    >
                      {expanded ? "Voir moins" : "Voir plus"}
                    </button>
                  </div>

                  {property.gallery_images?.length > 0 && (
                    <section className="mt-8">
                      <PhotoGallery images={property.gallery_images} />
                    </section>
                  )}
                </section>
              </>
            ) : (
              <div className="text-center py-20 text-gray-500 uppercase">
                Chargement…
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
