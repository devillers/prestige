import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

const menuItems = ['accueil', 'collection', 'service', 'blog', 'contact'];

const Menu = ({ onSelect, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll events to toggle main menu visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isScrolling]);

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between p-5 md:p-10 z-50 backdrop-blur-md bg-white bg-opacity-10 transition-opacity duration-500 ${
        isScrolling ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo */}
      <h1 className="text-[25px] text-slate-300">--</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(index)}
              className={`text-md font-medium transition-colors duration-300 ${
                activeSection === index
                  ? 'text-[#bd9254] border-b-2 border-[#bd9254]'
                  : 'text-slate-600 hover:text-[#bd9254]'
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
        ref={buttonRef}
        className="md:hidden text-2xl text-slate-700 focus:outline-none relative z-50"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </button>

      {/* Mobile Fullscreen Menu */}
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="mobile-menu"
        unmountOnExit
        nodeRef={menuRef}
      >
        <div
          ref={menuRef}
          className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-40 transition-opacity duration-300 ease-in-out"
        >
          {/* Mobile Menu Logo and Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-5 text-2xl text-white"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          {/* Mobile Menu Items */}
          <ul className="space-y-8 text-center">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    onSelect(index);
                    setIsOpen(false); // Close the menu on selection
                  }}
                  className={`text-2xl font-semibold transition-colors duration-300 ${
                    activeSection === index
                      ? 'text-[#bd9254]'
                      : 'text-white hover:text-[teal-400]'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>

      {/* CSS for CSSTransition Animations */}
      <style jsx>{`
        /* Transition classes for the mobile menu */
        .mobile-menu-enter {
          opacity: 0;
        }
        .mobile-menu-enter-active {
          opacity: 1;
          transition: opacity 300ms ease-in-out;
        }
        .mobile-menu-exit {
          opacity: 1;
        }
        .mobile-menu-exit-active {
          opacity: 0;
          transition: opacity 300ms ease-in-out;
        }
      `}</style>
    </nav>
  );
};

export default Menu;
