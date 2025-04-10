export default function PhotoGallery() {
    const items = [
      { color: "bg-gray-300", col: "col-span-1", row: "row-span-1" },
      { color: "bg-gray-400", col: "col-span-1", row: "row-span-1" },
      { color: "bg-gray-500", col: "col-span-2", row: "row-span-2" }, // large right
      { color: "bg-gray-600", col: "col-span-1", row: "row-span-1" },
      { color: "bg-gray-700", col: "col-span-1", row: "row-span-1" },
      { color: "bg-gray-800", col: "col-span-2", row: "row-span-1" },
      { color: "bg-gray-500", col: "col-span-1", row: "row-span-1" },
      { color: "bg-gray-300", col: "col-span-1", row: "row-span-1" },
      { color: "bg-gray-400", col: "col-span-4", row: "row-span-1" },
    ];
  
    return (
      <div className="grid grid-cols-4 auto-rows-[200px] gap-4 p-4 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className={`rounded ${item.color} ${item.col} ${item.row} flex items-center justify-center text-white text-xl font-semibold`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  }
  