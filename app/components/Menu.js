import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

const menuItems = ['Home', 'Collection', 'Services', 'Blog', 'Contact'];

const Menu = ({ onSelect, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll events to toggle menu visibility
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
      }, 200); // Adjust timeout as needed
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

  // Optional: Close mobile menu on Esc key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between p-5 md:p-10 z-50 backdrop-blur-md bg-white bg-opacity-60 transition-opacity duration-500 ${
        isScrolling ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold text-slate-700">C</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(index)}
              className={`text-lg font-medium transition-colors duration-300 ${
                activeSection === index
                  ? 'text-teal-500 border-b-2 border-teal-500'
                  : 'text-slate-600 hover:text-teal-500'
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

      {/* Mobile Fullscreen Menu with Backdrop and Animation */}
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="menu"
        unmountOnExit
        nodeRef={menuRef}
      >
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex items-center justify-center h-screen"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-90"
            onClick={() => setIsOpen(false)} // Close menu when clicking on backdrop
          ></div>

          {/* Menu Content */}
          <div className="relative flex flex-col items-center justify-center space-y-8 p-8 ">
            <ul className="space-y-8 text-center   ">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      onSelect(index);
                      setIsOpen(false); // Close the menu on selection
                    }}
                    className={`text-4xl font-semibold transition-colors duration-300 ${
                      activeSection === index
                        ? 'text-teal-500'
                        : 'text-slate-700 hover:text-teal-500'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CSSTransition>

      {/* CSS for CSSTransition Animations */}
      <style jsx>{`
        .menu-enter {
          opacity: 0;
        }
        .menu-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .menu-exit {
          opacity: 1;
        }
        .menu-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
    </nav>
  );
};

export default Menu;
