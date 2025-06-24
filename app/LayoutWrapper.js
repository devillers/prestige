'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import StructuredData from './StructuredData';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [fadeClass, setFadeClass] = useState('opacity-0 scale-[0.985]');
  const wrapperRef = useRef(null);

  // 🧠 Routes où on cache le layout complet (header/footer/etc.)
  const hideLayout = ['/login', '/admin', '/not-found'].some((path) =>
    pathname.startsWith(path)
  );

  useEffect(() => {
    setIsMounted(true);
    const timeout = setTimeout(() => setFadeClass('opacity-100 scale-100'), 50);
    return () => {
      setFadeClass('opacity-0 scale-[0.985]');
      clearTimeout(timeout);
    };
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <div
      ref={wrapperRef}
      className={`transition-all duration-700 ease-in-out ${fadeClass}`}
    >
      {!hideLayout && <Header />}
      {!hideLayout && <StructuredData />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}
