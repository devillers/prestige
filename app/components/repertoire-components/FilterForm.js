"use client";
import React from "react";

export default function FilterForm({
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
  onSubmit,           // ← nouvelle prop
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit();   // ferme le drawer au "Enter"
      }}
    >
      {/* Localisation */}
      <div className="mb-4">
        <h4 className="text-lg font-light text-[#bd9254] mb-2 uppercase">Localisation</h4>
        {locationOptions.map((loc) => (
          <div key={loc} className="flex items-center mb-1">
            <input
              id={`loc-${loc}`}
              type="checkbox"
              value={loc}
              onChange={(e) => {
                const newArr = e.target.checked
                  ? [...selectedLocations, loc]
                  : selectedLocations.filter((l) => l !== loc);
                onLocationsChange(newArr);
              }}
              checked={selectedLocations.includes(loc)}
              className="mr-2 accent-[#bd9254]  focus:outline-none focus:ring-0"
            />
            <label htmlFor={`loc-${loc}`} className="text-[12px] text-gray-700 uppercase leading-6">
              {loc}
            </label>
          </div>
        ))}
      </div>

      {/* Amenities */}
      <div className="mb-4">
        <h4 className="text-lg font-light text-[#bd9254] mb-2 uppercase">Amenities</h4>
        {featureOptions.map((feat) => (
          <div key={feat} className="flex items-center mb-1">
            <input
              id={`feat-${feat}`}
              type="checkbox"
              value={feat}
              onChange={(e) => {
                const newArr = e.target.checked
                  ? [...selectedFeatures, feat]
                  : selectedFeatures.filter((f) => f !== feat);
                onFeaturesChange(newArr);
              }}
              checked={selectedFeatures.includes(feat)}
              className="mr-2 accent-[#bd9254] focus:outline-none focus:ring-0"
            />
            <label htmlFor={`feat-${feat}`} className="text-[12px] text-gray-700 uppercase leading-6">
              {feat}
            </label>
          </div>
        ))}
      </div>

      {/* Price & Capacity */}
      <div className="mb-4 flex flex-col">
         <h4 className="text-lg font-light text-[#bd9254] mb-2 uppercase">Prix maximum</h4>
        <input
          type="number"
          min="0"
          placeholder="prix max"
          value={priceMax}
          onChange={(e) => onPriceMaxChange(e.target.value)}
          className="w-1/2 mb-2 p-2 border rounded focus:outline-none focus:ring-0 text-[12px]"
        />
         <h4 className="text-lg font-light text-[#bd9254] mb-2 uppercase">Capacité</h4>
        <input
          type="number"
          min="0"
          placeholder="capacite"
          value={capacity}
          onChange={(e) => onCapacityChange(e.target.value)}
          className="w-1/2 p-2 border rounded focus:outline-none focus:ring-0 text-[12px]"
        />
      </div>

      {/* Clear */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={onClear}
          className="text-sm rounded bg-[#bd9254] text-white px-4 py-2 hover:bg-[#a67e3c] transition focus:outline-none focus:ring-0"
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}
