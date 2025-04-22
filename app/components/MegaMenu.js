'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import menuItems from '../data/MenuItems'; // Assuming you have a menuItems.js file with your menu structure


export default function MegaMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuContainerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const activeSubmenu = menuItems.find(m => m.title === activeMenu)?.submenu;
  const colCount = activeSubmenu?.length ?? 0;
  const gridCols = colCount > 5 ? 'grid-cols-5' : `grid-cols-${colCount}`;

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const delayedCloseAndNavigate = (href) => {
    setMenuClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setMenuClosing(false);
      router.push(href);
    }, 800);
  };

  const delayedCloseAndNavigateToSub = (path) => {
    setMenuClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setMenuClosing(false);
      router.push(path);
    }, 800);
  };

  return (
    <header className="border-b shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/pin.png" alt="Logo" className="h-10 w-auto" />
          <div className="md:hidden md:text-md lg:block lg:text-xl uppercase">
            Care Concierge <span className='text-[#bd9254]'>Luxury</span>
          </div>
        </div>

        <div className="hidden md:flex justify-center flex-1">
          <nav className="flex gap-8 items-center">
            {menuItems.map((item, i) => (
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
                  <Link
                    href={item.href}
                    className={`text-[11px] uppercase leading-4 hover:text-[#bd9254] ${pathname === item.href ? 'text-[#bd9254]/80' : 'text-[#293d4c]'}`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                    aria-haspopup="true"
                    aria-expanded={activeMenu === item.title}
                    className="text-[11px] uppercase leading-4 text-[#293d4c] hover:text-[#bd9254]"
                  >
                    {item.title}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* SOUS-MENU GLOBAL */}
      <div
        ref={menuContainerRef}
        onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
        onMouseLeave={() => {
          closeTimeoutRef.current = setTimeout(() => setActiveMenu(null), 500);
        }}
        className={`transition-all duration-500 ease-in-out ${
          activeMenu && activeSubmenu ? 'max-h-[500px] opacity-100 py-6 pointer-events-auto' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        } bg-white shadow-sm overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className={`grid ${gridCols} gap-6 text-[10px] text-[#293d4c]`}>
            {activeSubmenu?.map((col, index) => (
              <div key={index}>
                {col.title && <div className="text-[12px] mb-2 text-[#bd9254] select-none">{col.title}</div>}
                <ul className="space-y-1">
                  {col.items?.filter(Boolean).map((subItem, idx) => (
                    <li key={idx}>
                      <Link
                        href={subItem.href}
                        onClick={() => {
                          clearTimeout(closeTimeoutRef.current);
                          setActiveMenu(null);
                        }}
                        className="block w-full text-[10px] uppercase hover:text-[#bd9254]"
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setMenuClosing(true) || setTimeout(() => { setMobileOpen(false); setMenuClosing(false); }, 800)}
          />
          <div className={`fixed top-0 right-0 w-3/5 h-full bg-white/30 shadow-lg z-50 transform transition-transform duration-800 ${menuClosing ? 'translate-x-full' : 'animate-slide-in'}`}>
            <div className="flex justify-end p-4">
              <button onClick={() => setMenuClosing(true) || setTimeout(() => { setMobileOpen(false); setMenuClosing(false); }, 800)}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-4 px-4 pb-6 animate-fade-in">
              {menuItems.map((item, i) => (
                <div key={i}>
                  {item.href ? (
                    <button
                      onClick={() => delayedCloseAndNavigate(item.href)}
                      className={`font-semibold uppercase text-sm mb-3 cursor-pointer hover:text-[#bd9254] hover:bg-white/80 rounded p-2 text-left w-full ${pathname === item.href ? 'text-[#bd9254]/80 bg-white' : ''}`}
                    >
                      {item.title}
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                      className="font-semibold uppercase text-sm mb-3 cursor-pointer hover:text-[#bd9254] hover:bg-white/80 rounded p-2 text-left w-full"
                    >
                      {item.title}
                    </button>
                  )}
                  {activeMenu === item.title && item.submenu && (
                    <div className="grid grid-cols-2 gap-4 pl-4">
                      {item.submenu.map((col, index) => (
                        <div key={index}>
                          {col.title && <div className="text-sm mb-1 font-thin text-[#bd9254] uppercase">{col.title}</div>}
                          <ul className="space-y-1">
                            {col.items.filter(Boolean).map((subItem, idx) => (
                              <li key={idx}>
                                <button
                                  onClick={() => delayedCloseAndNavigateToSub(subItem.href)}
                                  className="text-[10px] uppercase hover:text-[#bd9254] block leading-7 text-left w-full"
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
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
