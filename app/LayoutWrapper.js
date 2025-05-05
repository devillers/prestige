'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';

export default function LayoutWrapper({ children, hideLayout = false }) {
  const pathname = usePathname();
  const [fadeClass, setFadeClass] = useState('opacity-0 scale-[0.985]');
  const wrapperRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeClass('opacity-100 scale-100'), 50);
    return () => {
      setFadeClass('opacity-0 scale-[0.985]');
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <div ref={wrapperRef} className={`transition-all duration-700 ease-in-out ${fadeClass}`}>
      {!hideLayout && <Header />}

      {/* Inject structured data for SEO */}
      {!hideLayout && <StructuredData />}

      <main>{children}</main>

      {!hideLayout && <Footer />}
    </div>
  );
}
