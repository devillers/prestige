// app/components/repertoire-components/PhotoGallery.js
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Nouveau pattern cyclique pour plus d’homogénéité
const LAYOUT_PATTERN = [
  { col: "col-span-2", row: "row-span-1" },
  { col: "col-span-2", row: "row-span-1" },
  { col: "col-span-4", row: "row-span-2" },
  { col: "col-span-2", row: "row-span-1" },
  { col: "col-span-2", row: "row-span-1" },
  { col: "col-span-4", row: "row-span-1" },
];

const PhotoGallery = ({ images = [] }) => {
  const [open, setOpen] = useState(false);
  if (!images.length) return null;

  const toggle = () => setOpen((v) => !v);
  const PREVIEW_COUNT = 2;

  return (
    <div className="p-2" id="picture">
      <h3 className="text-2xl uppercase py-2 font-thin">
        Aperçu de la propriété
      </h3>

      {/* Preview : les 2 premières images avec coins arrondis uniquement à l’extérieur */}
      {!open && (
        <>
          <div className="grid grid-cols-2 gap-1 mb-6">
            {images.slice(0, PREVIEW_COUNT).map((img, idx) => (
              <div
                key={idx}
                className={`overflow-hidden cursor-pointer ${
                  idx === 0
                    ? "rounded-tl-2xl"  // coin top-left de la 1ʳᵉ image
                    : "rounded-tr-2xl"  // coin top-right de la 2ᵉ image
                }`}
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

      {/* Drawer animé : galerie complète */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white rounded-t-xl"
          >
            <div className="grid grid-cols-4 grid-flow-row-dense auto-rows-[200px] gap-1 ">
              {images.map((img, idx) => {
                const { col, row } = LAYOUT_PATTERN[idx % LAYOUT_PATTERN.length];
                return (
                  <div
                    key={idx}
                    className={`${col} ${row} overflow-hidden`}
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
