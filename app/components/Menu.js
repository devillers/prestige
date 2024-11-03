import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for open/close menu

const menuItems = ['Home', 'Collection', 'Services', 'Blog', 'Contact'];

const Menu = ({ onSelect, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center  shadow-sm p-10">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-slate-600 mr-auto">
        Care Prestige
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(index)}
              className={`text-lg ${
                activeSection === index ? 'text-teal-400' : 'text-slate-600'
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl text-slate-600  focus:outline-none"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full flex flex-col items-center space-y-4 py-4 md:hidden">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  onSelect(index);
                  setIsOpen(false); // Close the menu on selection
                }}
                className={`text-lg ${
                  activeSection === index ? 'text-teal-400' : 'text-black'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Menu;
