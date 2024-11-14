// app/components/PropertyDescriptionHeader.js

import React from 'react';

const PropertyDescriptionHeader = () => {
  return (
    <section className="p-2 flex justify-center">
      <div className="relative max-w-[1000px] w-full">
        {/* Navigation */}
        <nav className="absolute w-full flex justify-end items-center p-4 text-white z-10">
          <div className="text-md font-bold absolute top-0 left-0 p-2">
            Logo
          </div>
          <ul className="flex gap-6 pr-4">
            <li>
              <a
                href="#home"
                className="hover:text-yellow-400 text-[11px] uppercase tracking-widest"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="hover:text-yellow-400 text-[11px] uppercase tracking-widest"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-yellow-400 text-[11px] uppercase tracking-widest"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-yellow-400 text-[11px] uppercase tracking-widest"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Background Image Section */}
        <div
          className="relative h-[600px] bg-cover bg-center rounded-md"
          style={{
            backgroundImage: `url('/images/remy/09_Chalet.Remy_Chambre3.jpg ')`,
          }}
        >
          <div
            className="absolute inset-0 rounded-sm flex flex-col justify-center items-start px-6"
            style={{
              background:
                'linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))',
              borderRadius: '0.375rem',
            }}
          >
            <div className="text-yellow-400 text-xl flex items-center">
              <span>★ ★ ★ ★ ★</span>
              <span className="ml-4 text-[12px]">5.0 / 9 reviews</span>
            </div>
            <h1 className="text-white text-7xl font-bold flex flex-col">
              CHALET <span>REMY</span>
            </h1>
            <p className="text-white text-[12px] py-3">
              Chalet for 26 - cinéma - sauna - jacuzzi
            </p>
            <p className="text-white text-[10px] opacity-50">REF : CARE2589</p>
            <div className="w-full md:w-auto flex flex-wrap gap-4 py-4 relative mt-6 text-white border-dashed border-t">
              <div className="flex flex-col">
                <p className="text-[12px] uppercase opacity-50">Sleeps</p>
                <div className="flex flex-col mt-3">
                  <p className="text-sm">12</p>
                  <p className="text-[10px]">10 Adults</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] uppercase opacity-50">Bedrooms</p>
                <p className="text-sm mt-3">5</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] uppercase opacity-50">Bathrooms</p>
                <p className="text-sm mt-3">4</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] uppercase opacity-50">Area m²</p>
                <p className="text-sm mt-3">160</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] uppercase opacity-50">Pets</p>
                <p className="text-sm mt-3">No</p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="absolute right-10 bottom-10 border border-yellow-400 uppercase text-white p-2 rounded-md text-sm">
            voir les photos
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyDescriptionHeader;
