// app/layout.js

'use client';
import './globals.css';
import React, { useState } from 'react';

import MegaMenu from './components/MegaMenu';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
 

  return (
    <html lang="fr">
      <body className="relative">
      
          <header>
            <MegaMenu />
          </header>
        

        <main
      
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
