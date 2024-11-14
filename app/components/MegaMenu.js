// components/MegaMenu.js

'use client';

import React, { useState, useEffect } from 'react';
import menuData from '../../data/menuData.json'; // Import JSON file
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const MegaMenu = ({ onMenuToggle }) => {
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isConciergerieOpen, setIsConciergerieOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateMenuToggle = (isOpen) => {
    if (onMenuToggle) {
      onMenuToggle(isOpen);
    }
  };

  // Toggle functions for each section
  const toggleCollectionMenu = () => {
    const newState = !isCollectionOpen;
    setIsCollectionOpen(newState);
    setIsConciergerieOpen(false);
    setIsBlogOpen(false);
    // Update parent layout based on the new menu state
    updateMenuToggle(
      newState || isConciergerieOpen || isBlogOpen || isMobileMenuOpen
    );
  };

  const toggleConciergerieMenu = () => {
    const newState = !isConciergerieOpen;
    setIsConciergerieOpen(newState);
    setIsCollectionOpen(false);
    setIsBlogOpen(false);
    // Update parent layout based on the new menu state
    updateMenuToggle(
      newState || isCollectionOpen || isBlogOpen || isMobileMenuOpen
    );
  };

  const toggleBlogMenu = () => {
    const newState = !isBlogOpen;
    setIsBlogOpen(newState);
    setIsCollectionOpen(false);
    setIsConciergerieOpen(false);
    // Update parent layout based on the new menu state
    updateMenuToggle(
      newState || isCollectionOpen || isConciergerieOpen || isMobileMenuOpen
    );
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    // Update parent layout for mobile menu toggle
    updateMenuToggle(
      newState || isCollectionOpen || isConciergerieOpen || isBlogOpen
    );
  };

  // Helper function to find menu data for a given title
  const getMenuData = (title) =>
    menuData.find((menuItem) => menuItem.title === title);

  return (
    <div className="w-full mx-auto h-8 relative z-50">
      <div className="fixed w-full  h-20 md:relative z-50">
        <nav className="max-w-[900px] mx-auto relative z-50 bg-white">
          <div className="flex items-center justify-between w-full h-20 px-4 relative z-50">
            <h1 className="text-2xl font-bold tracking-widest">
              <span className="text-[#eec993]">CARE </span>PRESTIGE
            </h1>

            {/* Hamburger Icon (Visible on mobile) */}
            <div className="md:hidden z-50">
              <button
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                className="text-gray-800 focus:outline-none z-50"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={20} />
                ) : (
                  <FaBars size={20} />
                )}
              </button>
            </div>

            {/* Desktop Icons (Hidden on mobile) */}
            <div className="hidden md:flex space-x-4 z-50">
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

          {/* Top-Level Menu (Desktop) */}
          <div className="hidden mx-auto md:flex space-x-8 px-4 h-16 border-b-0 md:border-b-[1px] relative z-50">
            {menuData.map((menuItem, index) => (
              <button
                key={index}
                onClick={() => {
                  if (menuItem.title === 'la collection') {
                    toggleCollectionMenu();
                  } else if (menuItem.title === 'la conciergerie') {
                    toggleConciergerieMenu();
                  } else if (menuItem.title === 'blog') {
                    toggleBlogMenu();
                  } else {
                    // If a menu item doesn't have subItems, close all submenus
                    setIsCollectionOpen(false);
                    setIsConciergerieOpen(false);
                    setIsBlogOpen(false);
                    updateMenuToggle(false);
                  }
                }}
                className="hover:text-gray-500 uppercase text-sm hover:border-b-2 hover:border-[#eec993] transition-all duration-300"
              >
                {menuItem.title}
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden fixed top-20 left-0 w-full bg-white transition-all duration-500 ease-in-out z-40 ${
              isMobileMenuOpen ? 'h-screen' : 'h-0 overflow-hidden'
            }`}
            style={{ paddingTop: isMobileMenuOpen ? '1rem' : 0 }}
          >
            <div className="flex flex-col space-y-2 px-4 py-4  relative z-50">
              {menuData.map((menuItem, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      if (menuItem.subItems) {
                        if (menuItem.title === 'la collection') {
                          toggleCollectionMenu();
                        } else if (menuItem.title === 'la conciergerie') {
                          toggleConciergerieMenu();
                        } else if (menuItem.title === 'blog') {
                          toggleBlogMenu();
                        }
                      } else {
                        // If a menu item doesn't have subItems, close all submenus
                        setIsCollectionOpen(false);
                        setIsConciergerieOpen(false);
                        setIsBlogOpen(false);
                        updateMenuToggle(isMobileMenuOpen);
                      }
                    }}
                    className="hover:text-gray-500 uppercase text-left text-sm"
                  >
                    {menuItem.title}
                  </button>
                  {isMobile &&
                    menuItem.subItems &&
                    ((menuItem.title === 'la collection' && isCollectionOpen) ||
                      (menuItem.title === 'la conciergerie' &&
                        isConciergerieOpen) ||
                      (menuItem.title === 'blog' && isBlogOpen)) && (
                      <div className="w-full py-4 px-4 relative z-50">
                        <div className="flex flex-col flex-wrap justify-around">
                          {menuItem.subItems.map((subCategory, subIndex) => (
                            <ul key={subIndex} className="space-y-2 w-1/2 pb-4">
                              <h3 className="uppercase font-semibold text-[12px]">
                                {subCategory.category}
                              </h3>
                              {subCategory.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-[12px]">
                                  <a
                                    href={item.url}
                                    className="hover:text-gray-500"
                                  >
                                    {item.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Services Dropdown Menu (Desktop Only) */}
        {!isMobile && (
          <div
            className={`bg-white shadow-sm w-full transition-all duration-500 ease-in-out relative z-50 ${
              isCollectionOpen || isConciergerieOpen || isBlogOpen
                ? 'block'
                : 'hidden'
            }`}
          >
            <div className="relative max-w-[900px] mx-auto grid grid-cols-4 gap-4 text-[14px] pb-4">
              {(isCollectionOpen && getMenuData('la collection')?.subItems) ||
              (isConciergerieOpen &&
                getMenuData('la conciergerie')?.subItems) ||
              (isBlogOpen && getMenuData('blog')?.subItems)
                ? getMenuData(
                    isCollectionOpen
                      ? 'la collection'
                      : isConciergerieOpen
                      ? 'la conciergerie'
                      : 'blog'
                  )?.subItems.map((subCategory, subIndex) => (
                    <div key={subIndex} className="p-4 pb-6">
                      <h4 className="uppercase font-semibold text-gray-600 mb-2">
                        {subCategory.category}
                      </h4>
                      <ul className="space-y-3 mt-6">
                        {subCategory.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-[12px]">
                            <a href={item.url} className="hover:text-gray-500">
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
