// layout.js

'use client';

import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (state) => {
    setIsMenuOpen(state);
  };

  return (
    <html lang="en">
      <head>{/* Your head elements */}</head>
      <body className="font-sans">
        <Header onMenuToggle={handleMenuToggle} />

        <main
          className={`px-8 md:px-16 lg:px-32 py-8 transition-[margin-top] duration-500 ease-in-out ${
            isMenuOpen ? 'mt-48' : 'mt-0'
          }`}
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
