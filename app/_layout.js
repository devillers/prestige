// app/layout.js
'use client';
import React from 'react';
import Head from 'next/head'; // For setting meta tags
import './globals.css'; // Global CSS
import Header from './components/Header'; // Header component
import Footer from './components/Footer'; // Footer component

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>Care Prestige</title>
        <meta name="description" content="conciergerie de prestige " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <body className="bg-gray-[#f5f0ee] text-gray-800 font-sans">
        <Header />

        <main className="">{children}</main>

        <Footer />
      </body>
    </html>
  );
};

export default Layout;
