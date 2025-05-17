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
    <div className="p-4 rounded-lg mb-12 flex flex-wrap gap-4 items-start bg-gray-500/60">
      {/* Localités */}
      <div className="w-full">
        <label className="block text-[13px] uppercase mb-5 font-semibold text-white">
          Localités
        </label>
        <div className="flex flex-wrap gap-2">
          {uniqueLocations.map((loc) => (
            <label
              key={loc}
              className="text-[11px] px-2 py-1 uppercase flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.locations.includes(loc)}
                onChange={() => toggleLocation(loc)}
                className="mr-1 accent-[#bd9254] focus:ring-0"
              />
              {loc}
            </label>
          ))}
        </div>
      </div>

      {/* Équipements */}
      <div className="w-full">
        <label className="block text-[13px] uppercase mb-5 font-semibold text-white">
          Équipements
        </label>
        <div className="flex flex-wrap gap-2">
          {uniqueFeatures.map((f) => (
            <label
              key={f.id}
              className="text-[11px] px-2 py-1 uppercase flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.features.includes(f.id)}
                onChange={() => toggleFeature(f.id)}
                className="mr-1 accent-[#bd9254] focus:ring-0"
              />
              {f.name}
            </label>
          ))}
        </div>
      </div>

      {/* Capacity & Price */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 w-full">
        <div className="w-full md:w-auto">
          <label className="block text-[13px] uppercase mb-1 font-semibold text-white">
            Capacité min
          </label>
          <input
            type="number"
            name="capacity"
            value={filters.capacity}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full h-7 text-xs focus:outline-none focus:ring-0"
          />
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-[13px] uppercase mb-1 font-semibold text-white">
            Prix maximum
          </label>
          <input
            type="number"
            name="priceMax"
            value={filters.priceMax}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full h-7 text-xs focus:outline-none focus:ring-0"
          />
        </div>
        <div className="w-full md:w-auto">
          <button
            onClick={onClear}
            className="inline-flex items-center justify-center text-white px-4 h-[30px] mt-4 border border-white text-sm uppercase rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
