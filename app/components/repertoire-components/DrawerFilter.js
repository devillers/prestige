"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import FilterForm from "./FilterForm";

export default function DrawerFilter({
  isOpen,
  onClose,
  locationOptions,
  selectedLocations,
  onLocationsChange,
  featureOptions,
  selectedFeatures,
  onFeaturesChange,
  capacity,
  onCapacityChange,
  priceMax,
  onPriceMaxChange,
  onClear,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-2/3 sm:w-[300px] bg-white backdrop-blur-lg  z-[10000] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="text-lg uppercase font-light text-[#bd9254] tracking-wide">
                Filtres
              </h2>
              <button onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <FilterForm
                locationOptions={locationOptions}
                selectedLocations={selectedLocations}
                onLocationsChange={onLocationsChange}
                featureOptions={featureOptions}
                selectedFeatures={selectedFeatures}
                onFeaturesChange={onFeaturesChange}
                capacity={capacity}
                onCapacityChange={onCapacityChange}
                priceMax={priceMax}
                onPriceMaxChange={onPriceMaxChange}
                onClear={onClear}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
