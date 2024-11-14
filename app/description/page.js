//app/descrition/page
import React from 'react';
import {
  FaMapMarkerAlt,
  FaBicycle,
  FaHome,
  FaMountain,
  FaBath,
  FaLaptop,
  FaChild,
} from 'react-icons/fa';

const page = () => {
  return (
    <section className="max-w-[1000px] mx-auto ">
      <div className="font-sans">
        {/* Header */}
        <div className="">
          <h1 className="text-3xl p-10 font-semibold leading-loose">
            Enjoy the peace and tranquility of the mountains at this superb
            chalet surrounded by nature
          </h1>
          <p className="text-gray-600 my-6 text-[12px] flex justify-center items-center gap-2">
            <FaMapMarkerAlt className="text-gray-600" /> France · Megève /
            Evasion Mont Blanc · Saint-Gervais
          </p>
        </div>

        {/* Badges Section */}
        <div className="flex flex-wrap justify-start gap-3 mt-4 text-[12px] p-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase  ">
            <span className="text-white text-[16px]">
              <FaHome />
            </span>
            Chalet
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase ">
            <span className="text-white text-[16px]">
              <FaMountain />{' '}
            </span>{' '}
            Slopes 7 km, Village 7 km
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase">
            <span className="text-white text-[16px]">
              <FaBath />{' '}
            </span>
            Nordic bath with great views
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase">
            <span className="text-white text-[16px]">
              <FaLaptop />{' '}
            </span>
            Office for remote working
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase">
            <span className="text-white text-[16px]">
              <FaChild />{' '}
            </span>{' '}
            Mezzanine play area
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase">
            <span className="text-white text-[16px]">
              <FaBicycle />{' '}
            </span>{' '}
            Equipped for cyclists
          </div>
        </div>

        {/* Feature Toggle */}
        <div className="flex justify-center mt-4">
          <button className="text-gray-600 font-medium underline">
            View all features +
          </button>
        </div>

        {/* Property Tour Section */}
        <section className="mt-8 p-6">
          <h2 className="text-2xl ">Property tour</h2>
          <div className="mt-4">
            <h3 className="text-lg uppercase">CHALET Rémy...</h3>
            <p className="text-gray-700 mt-2 text-[13px] leading-8">
              Immerse yourself in the mountains at this beautiful chalet in the
              secluded hamlet of Bionnassay. Although you'll be just 8km from
              the ski station of Saint-Gervais with its many shops and
              restaurants, the wonderful views of Mont Vorassay and the Refuge
              du Goûter will make you feel as if you're in the middle of
              nowhere.
            </p>
            <p className="text-gray-700 mt-2 text-[13px] leading-8">
              It's perfect for those seeking a quiet retreat, surrounded by
              nature. The owner has three electric bikes and several pairs of
              snowshoes available for guests to use – great ways to explore in
              summer and winter!
            </p>
            <button className="text-yellow-600 font-medium underline mt-2">
              Read more +
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default page;
