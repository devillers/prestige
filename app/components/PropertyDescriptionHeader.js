// app/components/PropertyDescriptionHeader.js

import React from 'react';

const PropertyDescriptionHeader = () => {
  return (
    <section className=" flex justify-center">
      <div className="relative max-w-auto w-full">
        {/* Navigation */}
     

        {/* Background Image Section */}
        <div
          className="relative h-[600px] bg-cover bg-center "
          style={{
            // backgroundImage: `url('/images/remy/09_Chalet.Remy_Chambre3.jpg ')`,
            backgroundImage: `url('/images/05_Chalet.Bionassay_Salon.jpg')`,
          }}
        >
          <div
            className="absolute inset-0 rounded-sm flex flex-col justify-center items-start px-6"
            style={{
              background:
                'linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))',
              borderRadius: '0.375rem',
            }}
          >
            <div className="text-yellow-400 text-xl flex items-center">
              <span>★ ★ ★ ★ ★</span>
              <span className="ml-4 text-[12px]">5.0</span>
            </div>
            <h1 className="text-white text-7xl font-bold flex flex-col">
              FERME DE  <span>BIONNASSAY</span>
            </h1>
            <p className="text-white text-[12px] py-3">
              Chalet 12-14 PAX - SAUNA - HAMMAM
            </p>
            <p className="text-white text-[10px] opacity-60">REF : CARE527314</p>
            <div
              className="w-full md:w-auto flex flex-wrap gap-4 py-4 relative mt-6 justify-between text-white border-dashed border-t"
              style={{ borderColor: 'rgba(255, 255, 255, 0.35)' }}
            >
              <div className="flex flex-col">
                <p className="text-[12px] uppercase opacity-60">Sleeps</p>
                <div className="flex flex-col mt-3">
                  <p className="text-sm">12-14</p>
                  <p className="text-[10px]">10 Adults</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] uppercase opacity-60">Bedrooms</p>
                <p className="text-sm mt-3">6</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] uppercase opacity-60">Bathrooms</p>
                <p className="text-sm mt-3">6</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] uppercase opacity-60">Area m²</p>
                <p className="text-sm mt-3">240</p>
              </div>
              <div className=" flex-col hidden sm:flex">
                <p className="text-[12px] uppercase opacity-60">Pets</p>
                <p className="text-sm mt-3">No</p>
              </div>
            </div>
          </div>

          {/* Button */}
          <a
            href="#picture"
            className="absolute right-10 bottom-10 border border-yellow-400 uppercase text-white p-2 rounded-md text-[12px] opacity-35 hover:opacity-100 transition duration-300 ease-in-out"
          >
            voir les photos
          </a>
        </div>
      </div>
    </section>
  );
};

export default PropertyDescriptionHeader;
