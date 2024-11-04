'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const menuItems = ['Home', 'About', 'Services', 'Contact'];

const Menu = ({ onSelect = () => {}, activeSection }) => {
  console.log('Received onSelect in Menu:', onSelect);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-50 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Care Prestige</h1>

        {/* Burger Icon (visible only on mobile) */}
        <div
          className="md:hidden text-2xl text-white cursor-pointer z-50"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menu Links */}
        <ul
          ref={menuRef}
          className={`flex flex-col md:flex-row justify-center items-center gap-10 
            fixed md:relative left-0 top-0 w-full md:w-auto h-screen md:h-auto 
            bg-gray-900 md:bg-transparent 
            transition-transform transform duration-300 ease-in-out 
            ${isOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className="group relative">
              <button
                className="block px-4 py-2 text-lg text-white hover:text-teal-400 transition-colors duration-200"
                onClick={() => {
                  setIsOpen(false);
                  onSelect(index); // Trigger the animation to move to the section
                }}
              >
                {item}
                <span className="block h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
