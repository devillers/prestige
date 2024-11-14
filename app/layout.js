// RootLayout.js

'use client';
import './globals.css';
import React, { useState } from 'react';
import MegaMenu from './components/MegaMenu';
import Footer from './components/Footer'; // Import the Footer component

export default function RootLayout({ children }) {
  const [isAnyMenuOpen, setIsAnyMenuOpen] = useState(false);

  const handleMenuToggle = (isOpen) => {
    setIsAnyMenuOpen(isOpen);
  };

  return (
    <html lang="en">
      <body className="relative">
        <header>
          <MegaMenu onMenuToggle={handleMenuToggle} />
        </header>
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
