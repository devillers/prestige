// app/components/repertoire-components/PhotoGallery.js
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PhotoGallery = ({ images = [] }) => {
  const [open, setOpen] = useState(false);
  if (!images.length) return null;

  const toggle = () => setOpen((v) => !v);

  // Combien d’images en preview
  const PREVIEW_COUNT = 5;

  return (
    <div className="p-4" id="picture">
      <h3 className="text-2xl uppercase py-2 font-thin">
        Aperçu de la propriété
      </h3>

      {/* PREVIEW : les 5 premières images */}
      {!open && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {images.slice(0, PREVIEW_COUNT).map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded cursor-pointer"
                onClick={toggle}
              >
                <img
                  src={img.url}
                  alt={img.alt || `Image ${idx + 1}`}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-6">
            <button
              onClick={toggle}
              className="text-[#bd9254] font-light text-sm border border-[#bd9254] rounded-full px-4 py-2 hover:bg-[#bd9254] hover:text-white transition"
            >
              Voir toutes les photos
            </button>
          </div>
        </>
      )}

      {/* DRAWER : galerie complète */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white rounded-t-xl shadow-lg"
          >
            <div className="p-4 grid grid-cols-4 auto-rows-[200px] gap-2">
              {images.map((img, idx) => {
                let col = "col-span-2", row = "row-span-1";
                const m = idx % 6;
                if (m === 0) {
                  col = "col-span-4";
                  row = "row-span-2";
                } else if (m === 3) {
                  col = "col-span-2";
                  row = "row-span-2";
                } else if (m === 4 || m === 5) {
                  col = "col-span-1";
                  row = "row-span-2";
                }
                return (
                  <div
                    key={idx}
                    className={`${col} ${row} overflow-hidden rounded cursor-pointer`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || `Image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center p-4 border-t">
              <button
                onClick={toggle}
                className="text-[#bd9254] font-light text-sm border border-[#bd9254] rounded-full px-6 py-2 hover:bg-[#bd9254] hover:text-white transition"
              >
                Fermer la galerie
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
