'use client';

import React, { useState, useEffect } from 'react';
import { FiPhone } from 'react-icons/fi';

export default function FloatingContact() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      // cache le bouton dès qu'on scroll
      setVisible(false);

      // réaffiche 300ms après la fin du scroll
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setVisible(true), 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <a
      href="tel:+33686020184"
      className={`
        fixed top-[100px] text-sm animate-bounce
        bg-[#bd9254] hover:bg-[#c29e68]
        text-whited font-light uppercase text-white
        px-4 py-2 rounded-r-full
        flex items-center gap-2
        shadow-lg z-50 no-print
        transition-opacity duration-500  /* <-- animation */
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <FiPhone size={18} />
      Contactez-nous
    </a>
  );
}
