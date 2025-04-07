export default function PlantCard() {
    return (
      <div className="bg-orange-500 rounded-xl shadow p-6 w-80 h-80 text-white relative overflow-hidden">
        {/* Placeholder text instead of plant image */}
        <div className=" text-[900px] font-semibold mt-6 mb-4">
          reservation cours de ski
        </div>
  
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-90">
          <div className="w-full h-full bg-pink-500 rotate-45 scale-150"></div>
        </div>
  
        {/* Foreground content */}
        <div className="relative z-10 mt-16">
          <div className="text-lg">Indoor</div>
          <div className="text-2xl font-bold mb-4">Peace Lily</div>
          <div className="bg-white text-orange-500 rounded-full px-4 py-2 font-semibold inline-block">
            $36.00
          </div>
        </div>
      </div>
    );
  }
  