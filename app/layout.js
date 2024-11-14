// app/layout.js

'use client';
import './globals.css';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import MegaMenu from './components/MegaMenu';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path
  const [isAnyMenuOpen, setIsAnyMenuOpen] = useState(false);

  const handleMenuToggle = (isOpen) => {
    setIsAnyMenuOpen(isOpen);
  };

  return (
    <html lang="en">
      <body className="relative">
        {/* Only show MegaMenu if the path is not /description */}
        {pathname !== '/description' && (
          <header>
            <MegaMenu onMenuToggle={handleMenuToggle} />
          </header>
        )}

        <main
          className={`transition-all duration-500 ease-in-out ${
            isAnyMenuOpen ? 'md:mt-[300px]' : 'mt-0'
          } relative z-0`}
        >
          {children}
        </main>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
