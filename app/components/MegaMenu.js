'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { title: 'Accueil', href: '/' },
  {
    title: 'Le Répertoire',
    href: '/repertoire',
    submenu: [
      { title: 'Combloux - Megeve', items: ['La ferme des Choseaux', 'Le Splendide', 'Le Kramer'] },
      { title: 'Chamonix', items: ['Chalet Sia', 'Chalet Kieppi', 'Chalet des Eaux Rousses', 'Ecrin des Bossons'] },
      { title: 'Saint Nicolas', items: ['La ferme Picherie'] },
      { title: 'Saint Gervais', items: ['Chalet Remy', 'La Ferme de Bionnassay'] },
    ],
  },
  {
    title: 'La Conciergerie',
    href: '/conciergerie'
  },
  {
    title: 'Séminaire',
    href: '/seminaires'
  },
  {
    title: 'Blog',
    href: '/blog',
    submenu: [
      { title: 'Sortir à megeve', items: ['7 Jours pour Explorer le Massif du Mont-Blanc'] },
      { title: 'Sortir à chamonix', items: ['7 Jours pour Explorer le Massif du Mont-Blanc'] },
      { title: 'Sortir à Saint Nicolas', items: [''] },
      { title: 'Sortir à Saint Gervais', items: ['7 Jours d’Aventure dans les Alpes', 'Un Paradis pour les Amateurs de Vélo'] },
    ],
  },
  { title: 'Vente', href: '/vente' },
  {
    title: 'Contact',
    href: '/contact'
  },
];

export default function MegaMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuContainerRef = useRef(null);

  const activeSubmenu = menuItems.find(m => m.title === activeMenu)?.submenu;
  const colCount = activeSubmenu?.length ?? 0;
  const gridCols = colCount > 5 ? 'grid-cols-5' : `grid-cols-${colCount}`;

  const handleClickOutside = (event) => {
    if (menuContainerRef.current && !menuContainerRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    if (activeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu]);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="border-b shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/pin.png" alt="Logo" className="h-10 w-auto" />
          <div className="md:hidden md:text-md lg:block lg:text-xl uppercase">Care Concierge <span className='text-[#bd9254]'>Luxury</span></div>
        </div>
        <div className="hidden md:flex justify-center flex-1">
          <nav className="flex gap-8 items-center">
            {menuItems.map((item, i) => (
              <div key={i} className="relative group">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-[11px] focus:outline-none uppercase leading-4 text-[#293d4c] hover:text-[#bd9254]"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                    className="text-[11px] focus:outline-none uppercase leading-4 text-[#293d4c] hover:text-[#bd9254]"
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

      <div
        ref={menuContainerRef}
        className={`transition-all duration-500 ease-in-out ${
          activeMenu && activeSubmenu ? 'max-h-[500px] uppercase opacity-100 py-6 pointer-events-auto' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        } bg-white shadow-sm overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className={`grid ${gridCols} gap-6 text-[10px] text-[#293d4c]`}>
            {activeSubmenu?.map((col, index) => (
              <div key={index}>
                {col.title && <div className="text-[12px] mb-2 text-[#bd9254] select-none">{col.title}</div>}
                <ul className="space-y-1">
                  {col.items.filter(Boolean).map((subItem, idx) => (
                    <li key={idx} className="text-[10px] cursor-pointer leading-6">
                      <Link href={`/${activeMenu?.toLowerCase().replace(/\s+/g, '-')}/${subItem?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                        <span className="w-full text-[10px] text-left hover:text-[#bd9254] uppercase block">{subItem}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white shadow-sm fixed top-0 left-0 w-full h-full overflow-y-auto z-50">
          <div className="flex justify-end p-4">
            <button onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 px-4 pb-6">
            {menuItems.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                  className="font-semibold uppercase text-sm mb-3 cursor-pointer hover:text-[#bd9254] text-left w-full"
                >
                  {item.title}
                </button>
                {activeMenu === item.title && item.submenu && (
                  <div className="grid grid-cols-2 gap-4 pl-4">
                    {item.submenu.map((col, index) => (
                      <div key={index}>
                        {col.title && <div className="text-sm mb-1 font-thin text-[#bd9254] uppercase">{col.title}</div>}
                        <ul className="space-y-1">
                          {col.items.filter(Boolean).map((subItem, idx) => (
                            <li key={idx} className="text-[10px] uppercase hover:text-[#bd9254] cursor-pointer leading-7">
                              <Link href={`/${item.href?.replace(/^\//, '') || item.title.toLowerCase().replace(/\s+/g, '-')}/${subItem?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                                <span className="w-full text-left block">{subItem}</span>
                              </Link>
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
      )}
    </header>
  );
}