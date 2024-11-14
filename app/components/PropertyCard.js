// PropertyCard.js

import React from 'react';

function PropertyCard() {
  return (
    <div className="bg-white shadow-lg  overflow-hidden max-w-[800px] mx-auto">
      {/* Image Section */}
      <div className="relative">
        <img
          src="/images/remy/010_Chalet.Remy_Chambre3.jpg"
          alt="Property"
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-4 left-4 shadow-md bg-black text-white text-sm px-3 py-1 rounded-md opacity-75">
          Voir toutes les photos (36)
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">Chalet Rémy</h2>
        <p className="text-gray-500">
          Saint Gervais les Bains, Alpes Françaises, France
        </p>

        {/* Info Section */}
        <div className="flex items-center justify-between mt-4 text-gray-700">
          <span>26 voyageurs</span>
          <span>8 chambres</span>
          <span>7 sdb</span>
          <span>573 m²</span>
        </div>

        {/* Highlights */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Les exclusivités</h3>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gray-200 text-xs font-semibold rounded-full">
              Saint Gervais les Bains
            </span>
            <span className="px-2 py-1 bg-yellow-200 text-xs font-semibold rounded-full">
              Exclusivité
            </span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex stickyitems-center justify-between mt-6 border-t pt-4 text-lg font-semibold">
          <div>
            <p className="text-gray-500 text-sm">
              De 150 000 € à 305 000 € par semaine
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-400 rounded-md text-sm">
              Faire une demande
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm">
              Réserver
            </button>
          </div>
        </div>
      </div>
      {/* second part */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Highlights Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Les incontournables</h3>
            <div className="flex flex-wrap gap-4">
              <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full">
                Collection iconique
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                Exclusivité
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
              <div className="flex items-center space-x-2">
                <span>🏊 Piscine chauffée</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⛷️ Ski-in/ski-out</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🏔️ Vue sur les montagnes, le village</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🛁 Jacuzzi</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🚪 Ascenseur</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💧 Hammam</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔥 Sauna</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🏋️ Salle de sport</span>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 border border-gray-400 rounded-md text-sm">
              Voir tous les équipements (86)
            </button>
          </div>

          {/* Included Services Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Services inclus</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
              <div className="flex items-center space-x-2">
                <span>🧑‍💼 Chalet manager</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>👨‍🍳 Majordome</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🍽️ Préparation du petit-déjeuner</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🍲 Préparation du dîner</span>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 text-green-700">Voir plus</button>
          </div>
        </div>

        {/* Sidebar Booking Section */}
        <div className=" flex flex-col p-4 shadow-sm justify-center bg-gray-50 border rounded-lg space-y-4 text-sm">
          <h2 className="text-xl font-semibold">Chalet Rémy</h2>
          <p className="text-gray-700">A partir 26 000 € par semaine </p>

          {/* Contact Information */}
          <p className="text-sm text-gray-500 mt-4">
            Nous sommes disponibles du lundi au vendredi de 09h00 à 17h00 et le
            samedi de 09h30 à 17h00.
          </p>
          <a href="tel:+33173030202" className="text-green-600 font-semibold">
            +33 1 73 03 02 02
          </a>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
