"use client";

export default function FilterForm({ filters, onChange, onClear, uniqueLocations = [], uniqueFeatures = [] }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const toggleLocation = (loc) => {
    onChange("locations", loc);
  };

  const toggleFeature = (fid) => {
    onChange("features", fid);
  };

  return (
    <div className="p-6 rounded mb-12 flex flex-col gap-6 bg-gray-50 text-gray-600">
      {/* Localités */}
      <div>
        <label className="block text-sm uppercase font-thin mb-2 text-gray-900 tracking-wide">
          Localités
        </label>
        <div className="flex flex-wrap gap-3">
          {uniqueLocations.map((loc) => (
            <label
              key={loc}
              className="flex items-center gap-2 text-xs uppercase cursor-pointer bg-gray-300/80 px-3 py-1.5 rounded-full hover:bg-[#bd9254]/20 transition"
            >
              <input
                type="checkbox"
                checked={filters.locations.includes(loc)}
                onChange={() => toggleLocation(loc)}
                className="accent-[#bd9254] focus:ring-0"
              />
              {loc}
            </label>
          ))}
        </div>
      </div>

      {/* Équipements */}
      <div>
        <label className="block text-sm uppercase font-semibold mb-2 tracking-wide">
          Équipements
        </label>
        <div className="flex flex-wrap gap-3">
          {uniqueFeatures.map((f) => (
            <label
              key={f.id}
              className="flex items-center gap-2 text-xs uppercase cursor-pointer bg-gray-300/80 px-3 py-1.5 rounded-full hover:bg-[#bd9254]/20 transition"
            >
              <input
                type="checkbox"
                checked={filters.features.includes(f.id)}
                onChange={() => toggleFeature(f.id)}
                className="accent-[#bd9254] focus:ring-0"
              />
              {f.name}
            </label>
          ))}
        </div>
      </div>

      {/* Capacity & Price */}
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm uppercase font-thin mb-2 text-gray-900 ">
            Capacité min
          </label>
          <input
            type="number"
            name="capacity"
            value={filters.capacity}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg text-sm text-gray-700 focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm uppercase font-thin mb-2 text-gray-900">
            Prix maximum
          </label>
          <input
            type="number"
            name="priceMax"
            value={filters.priceMax}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg text-sm text-gray-700 focus:outline-none"
          />
        </div>
        <div className="md:w-auto">
          <button
            onClick={onClear}
            className="mt-6 md:mt-0 px-6 py-2 rounded-full border border-[#bd9254] text-sm uppercase hover:bg-[#71542c] hover:text-white transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
