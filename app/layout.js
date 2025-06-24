'use client';

import './globals.css';
import React, { useEffect } from 'react';
import Script from 'next/script';
import CookieConsent from 'react-cookie-consent';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}${pathname}`;

  // Détection des pages sans layout
  const hideLayout = ['/admin', '/login', '/not-found'].some((path) =>
    pathname.startsWith(path)
  );

  const hideFloatingContact = [
    '/contact',
    '/mentions-legales',
    '/politique-de-confidentialite',
  ].includes(pathname);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.gtag = window.gtag || function () {
        (window.dataLayer = window.dataLayer || []).push(arguments);
      };
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            page_path: window.location.pathname
          });
        `}
      </Script>

      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
      {!hideLayout && !hideFloatingContact && <FloatingContact />}

      <CookieConsent
        disableStyles
        location="none"
        style={{
          position: 'fixed',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '400px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #ddd',
          borderRadius: '0.5rem',
          padding: '1rem',
          zIndex: 1000,
        }}
        buttonStyle={{
          background: '#000',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: 300,
          marginLeft: '1rem',
          marginRight: '3rem',
          marginTop: '1rem',
        }}
        declineButtonStyle={{
          background: '#fff',
          color: '#333',
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: 300,
        }}
        enableDeclineButton
        buttonText="J'accepte"
        declineButtonText="Je refuse"
        onAccept={() =>
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted',
          })
        }
        onDecline={() =>
          window.gtag('consent', 'update', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
          })
        }
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src="/cookie.png"
            alt="Cookie"
            className="w-24 h-24 object-contain flex-shrink-0"
          />
          <p className="text-[12px] text-center sm:text-left">
            Ce site utilise des cookies pour améliorer votre expérience. Vous
            pouvez accepter ou refuser leur utilisation.
          </p>
        </div>
      </CookieConsent>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="relative">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
