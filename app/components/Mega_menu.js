'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FiPhone } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import menuItems from '../data/menuItems';

export default function MegaMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);
  const menuContainerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const activeSubmenu = menuItems.find(m => m.title === activeMenu)?.submenu;
  const colCount = activeSubmenu?.length ?? 0;
  const gridCols = colCount > 5 ? 'grid-cols-5' : `grid-cols-${colCount}`;

  const startProgress = () => {
    clearInterval(progressInterval.current);
    setProgress(0);
    progressInterval.current = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 10;
        return next < 90 ? next : 90;
      });
    }, 200);
  };

  const completeProgress = () => {
    clearInterval(progressInterval.current);
    setProgress(100);
    setTimeout(() => setProgress(0), 300);
  };

  const navigate = (href, delay = 0) => {
    startProgress();
    setActiveMenu(null);
    setMobileOpen(false);
    setTimeout(() => router.push(href), delay);
  };

  useEffect(() => {
    completeProgress();
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="border-b shadow-sm relative z-50">
      {/* loader */}
      <AnimatePresence>
        {progress > 0 && (
          <motion.div
            key="progress"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            exit={{ width: 0 }}
            transition={{ ease: 'linear', duration: 0.2 }}
            className="fixed top-0 left-0 h-1 bg-[#bd9254] z-[100]"
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/pin.png" alt="Logo" className="h-10 w-auto" />
          <div className="md:hidden md:text-md lg:block lg:text-xl uppercase">
            Care Concierge <span className="text-[#bd9254]">Luxury</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex justify-center flex-1">
          <nav className="flex gap-8 items-center">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="relative group"
                  onMouseEnter={() => {
                    if (window.innerWidth > 768 && item.submenu) {
                      clearTimeout(closeTimeoutRef.current);
                      setActiveMenu(item.title);
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth > 768 && item.submenu) {
                      closeTimeoutRef.current = setTimeout(() => setActiveMenu(null), 500);
                    }
                  }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={e => {
                        e.preventDefault();
                        navigate(item.href);
                      }}
                      className={`
                        flex items-center text-[11px] uppercase leading-4 hover:text-[#bd9254]
                        ${pathname === item.href ? 'text-[#bd9254]/80' : 'text-[#293d4c]'}
                      `}
                    >
                      {Icon && <Icon className="inline-block mr-1" size={14} />}
                      {item.title}
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === item.title ? null : item.title)
                      }
                      aria-haspopup="true"
                      aria-expanded={activeMenu === item.title}
                      className="text-[11px] uppercase leading-4 text-[#293d4c] hover:text-[#bd9254]"
                    >
                      {item.title}
                    </button>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Téléphone desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+33686020184"
            className="flex items-center bg-[#bd9254] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow hover:bg-[#a67e3c] transition"
          >
            <FiPhone className="w-4 h-4 mr-2" />
            06 86 02 01 84
          </a>
        </div>

        {/* Mobile menu button */}
        {!mobileOpen && (
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Desktop Submenu */}
      <AnimatePresence>
        {activeMenu && activeSubmenu && (
          <motion.div
            ref={menuContainerRef}
            onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
            onMouseLeave={() =>
              (closeTimeoutRef.current = setTimeout(() => setActiveMenu(null), 500))
            }
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="bg-white shadow-sm overflow-hidden py-6"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className={`grid ${gridCols} gap-6 text-[10px] text-[#293d4c]`}>
                {activeSubmenu.map((col, idx) => (
                  <div key={idx}>
                    {col.title && (
                      <div className="text-[12px] mb-2 text-[#bd9254] select-none">
                        {col.title}
                      </div>
                    )}
                    <ul className="space-y-1">
                      {col.items?.filter(Boolean).map((subItem, j) => (
                        <li key={j}>
                          <a
                            href={subItem.href}
                            onClick={e => {
                              e.preventDefault();
                              navigate(subItem.href);
                            }}
                            className="block w-full text-[10px] uppercase hover:text-[#bd9254]"
                          >
                            {subItem.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.5 }}
              className="fixed top-0 right-0 w-3/5 h-full bg-white/30 shadow-lg z-50 flex flex-col"
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setMobileOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-4 px-4 pb-6">
                {menuItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i}>
                      <button
                        onClick={() =>
                          item.href
                            ? navigate(item.href, 500)
                            : setActiveMenu(activeMenu === item.title ? null : item.title)
                        }
                        className="font-semibold uppercase text-sm mb-3 cursor-pointer text-white hover:text-black hover:bg-white/80 rounded p-2 text-left w-full"
                      >
                        {Icon && <Icon className="inline-block mr-1" size={16} />}
                        {item.title}
                      </button>
                      {activeMenu === item.title && item.submenu && (
                        <div className="grid grid-cols-2 gap-4 pl-4">
                          {item.submenu.map((col, idx) => (
                            <div key={idx}>
                              {col.title && (
                                <div className="text-sm mb-1 font-thin text-[#bd9254] uppercase">
                                  {col.title}
                                </div>
                              )}
                              <ul className="space-y-1">
                                {col.items
                                  .filter(Boolean)
                                  .map((subItem, j) => (
                                    <li key={j}>
                                      <button
                                        onClick={() => navigate(subItem.href, 500)}
                                        className="text-[10px] uppercase text-white hover:text-black hover:bg-white/80 block leading-7 text-left w-full"
                                      >
                                        {subItem.title}
                                      </button>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Mobile phone call button */}
              <div className="mt-8 px-4">
                <a
                  href="tel:+33686020184"
                  className="flex items-center justify-center bg-[#bd9254] text-white text-sm font-bold px-4 py-3 rounded-full shadow hover:bg-[#a67e3c] transition w-full"
                >
                  <FiPhone className="w-5 h-5 mr-2" />
                  06 86 02 01 84
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
