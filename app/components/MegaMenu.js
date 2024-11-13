// components/MegaMenu.js

'use client';

import React, { useState } from 'react';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';

const MegaMenu = ({ onMenuToggle }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleServicesMenu = () => {
    const newState = !isServicesOpen;
    setIsServicesOpen(newState);
    onMenuToggle(newState); // Pass the state up to the parent
  };

  return (
    <div className="w-full mx-auto h-8">
      <div className="w-full bg-gray-50 h-20">
        <nav className="max-w-[900px] mx-auto relative">
          <div className="flex items-center justify-between w-full bg-slate-50 h-20">
            {/* Logo */}
            <h1 className="text-2xl font-bold">CARE PRESTIGE</h1>

            {/* Icons */}
            <div className="hidden md:flex space-x-4">
              <a href="#" className="hover:text-gray-500">
                <FaSearch size={15} />
              </a>
              <a href="#" className="hover:text-gray-500">
                <FaUser size={15} />
              </a>
              <a href="#" className="hover:text-gray-500">
                <FaShoppingCart size={15} />
              </a>
            </div>
          </div>

          {/* Top-Level Menu */}
          <div className="hidden mx-auto md:flex space-x-8 h-16 border-b-[1px]">
            <button className="hover:text-gray-500 uppercase">accueil</button>
            <button
              onClick={toggleServicesMenu}
              className="hover:text-gray-500 uppercase"
            >
              la collection
            </button>
            <button className="hover:text-gray-500 uppercase">
              la conciergerie
            </button>
            <button className="hover:text-gray-500 uppercase">blog</button>
            <button className="hover:text-gray-500 uppercase">contact</button>
          </div>
        </nav>

        {/* Services Dropdown Menu */}
        <div
          className={`bg-white shadow-sm w-full overflow-hidden ${
            isServicesOpen ? 'animate-slideDown' : 'animate-slideUp'
          }`}
        >
          <div className="relative max-w-[900px] mx-auto grid grid-cols-6 gap-4 py-6">
            {/* SAINT NICOLAS */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase">
                Saint Nicolas
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-500 text-[12px]">
                    Picherie
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-500 text-[12px]">
                    L'anier
                  </a>
                </li>
              </ul>
            </div>

            {/* SAINT GERVAIS */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase">
                Saint Gervais
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-500 text-[12px]">
                    Chalet Remy
                  </a>
                </li>
              </ul>
            </div>

            {/* CHAMONIX */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase">Chamonix</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-500 text-[12px]">
                    cham 1
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-500 text-[12px]">
                    cham 2
                  </a>
                </li>
              </ul>
            </div>

            {/* LES HOUCHES */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase">
                Les Houches
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-500 text-[12px]">
                    houches 1
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-500 text-[12px]">
                    houches 2
                  </a>
                </li>
              </ul>
            </div>

            {/* MEGEVE */}
            <div>
              <h3 className="text-sm font-semibold uppercase mb-3">Megève</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-500 text-[12px]">
                    megeve 1
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-500 text-[12px]">
                    megeve 2
                  </a>
                </li>
              </ul>
            </div>

            {/* Image Section */}
            <div className="flex flex-col items-start">
              <img
                src="/images/remy/010_Chalet.Remy_Chambre3.jpg"
                alt="On the weekend"
                className="rounded-sm mb-2"
              />
              {/* <p className="text-center font-semibold">On the weekend</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
