import React, { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const menuItems = [
  { title: 'Accueil' },
  {
    title: 'Le Répertoire',
    submenu: [
      { title: 'Combloux - Megeve', items: ['La ferme des Choseaux', 'Le Splendide', 'Le Kramer'] },
      { title: 'Chamonix', items: ['Chalet Sia', 'Chalet Kieppi', 'Chalet des Eaux Rousses', 'Ecrin des Bossons'] },
      { title: 'Saint Nicolas', items: ['La ferme Picherie'] },
      { title: 'Saint Gervais', items: ['Chalet Remy', 'La Ferme de Bionnassay'] },
    ],
  },
  {
    title: 'La Conciergerie',
    submenu: [
      { title: 'ski', items: ['Location de ski à domicile', 'Réservations forfaits', 'Cours particuliers'] },
      { title: 'cuisine', items: ['Traiteurs', 'Chefs à domicile '] },
      { title: 'transferts', items: ['Transferts Aeroports', 'Chauffeurs privés'] },
      { title: 'bien être', items: ['Yoga', 'Qi Gong'] },
      { title: 'autres services', items: [' ménage quotidien', 'Décoration florale'] },
    ],
  },
  {
    title: 'Séminaire'
  },
  {
    title: 'Blog',
    submenu: [
      { title: 'Sortir à megeve', items: ['', '', ''] },
      { title: 'Sortir à chamonix', items: ['7 Jours pour Explorer le Massif du Mont-Blanc', '', '', ''] },
      { title: 'Sortir à Saint Nicolas', items: [''] },
      { title: 'Sortir à Saint Gervais', items: [' 7 Jours d’Aventure dans les Alpes', 'Un Paradis pour les Amateurs de Vélo', ''] },
    ],
  },
  {
    title: 'Contact'
  },
];

export default function MegaMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);
  const menuContainerRef = useRef(null);

  const activeSubmenu = menuItems.find(m => m.title === activeMenu)?.submenu;
  const colCount = activeSubmenu?.length ?? 0;
  const gridCols = colCount > 5 ? 'grid-cols-5' : `grid-cols-${colCount}`;

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
    setHideTimeout(timeout);
  };

  const handleMouseEnter = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
  };

  return (
    <header className="border-b shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/pin.png" alt="Logo" className="h-10 w-auto" />
          <div className="text-xl uppercase">Care Concierge <span className='text-[#bd9254]'>Luxury</span></div>
        </div>
        <div className="hidden md:flex justify-center flex-1">
          <nav className="flex gap-8 items-center">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.title)}
              >
                <button className="text-sm focus:outline-none uppercase leading-4 text-[#293d4c] hover:text-[#bd9254]">{item.title}</button>
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
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={`transition-all duration-500 ease-in-out ${
          activeMenu && activeSubmenu ? 'max-h-[500px] opacity-100 py-6 pointer-events-auto' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        } bg-white shadow-sm overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className={`grid ${gridCols} gap-6`}>
            {activeSubmenu?.map((col, index) => (
              <div key={index}>
                {col.title && <div className="uppercase text-md mb-2 text-[#293d4c] select-none">{col.title}</div>}
                <ul className="space-y-1">
                  {col.items.map((subItem, idx) => (
                    <li key={idx} className="text-[10px] cursor-pointer leading-6">
                      <button className="w-full text-left hover:text-[#bd9254] uppercase">{subItem}</button>
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
                <div className="font-semibold text-md mb-3">{item.title}</div>
                {item.submenu && (
                  <div className="grid grid-cols-2 gap-4 pl-4">
                    {item.submenu.map((col, index) => (
                      <div key={index}>
                        {col.title && <div className="text-sm mb-1 font-semibold uppercase">{col.title}</div>}
                        <ul className="space-y-1">
                          {col.items.map((subItem, idx) => (
                            <li key={idx} className="text-[10px] uppercase hover:text-[#bd9254] cursor-pointer leading-7">
                              <button className="w-full text-left">{subItem}</button>
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
