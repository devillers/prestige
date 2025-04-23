//app/layout.js

'use client'

import './globals.css'
import React from 'react'
import Script from 'next/script'
import CookieConsent from 'react-cookie-consent'
import Head from 'next/head'

import Header from './components/Header'
import Footer from './components/Footer'

import { LayoutProvider, useLayout } from './LayoutContext'

function LayoutWrapper({ children }) {
  const { hideLayout } = useLayout()

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
      </Head>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FER4ECWWK3"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'denied'
          });
          gtag('config', 'G-FER4ECWWK3', {
            anonymize_ip: true,
            page_path: window.location.pathname
          });
        `}
      </Script>

      {!hideLayout && <Header />}

      <main>{children}</main>

      {!hideLayout && <Footer />}

      {/* Cookie Consent */}
      <CookieConsent
        location="bottom"
        enableDeclineButton
        buttonText="J'accepte"
        declineButtonText="Je refuse"
        disableStyles={true}
        containerClasses="fixed bottom-0 left-50 right-50 flex justify-center items-center h-20 bg-white shadow z-50 border border-gray-300 rounded-lg p-4"
        contentClasses="w-full max-w-md text-center"
        buttonWrapperClasses="flex flex-col sm:flex-row gap-2 sm:justify-end mt-4"
        buttonClasses="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition font-light text-[12px]"
        declineButtonClasses="bg-white border border-gray-400 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition font-light text-[12px]"
        onAccept={() => {
          window.gtag &&
            window.gtag("consent", "update", {
              analytics_storage: "granted",
            });
        }}
        onDecline={() => {
          window.gtag &&
            window.gtag("consent", "update", {
              analytics_storage: "denied",
            });
        }}
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <img
            src="/cookie.png"
            alt="Cookie"
            className="w-16 h-16 object-contain flex-shrink-0"
          />
          <div>
            <p className="text-[12px]">
              Ce site utilise des cookies pour améliorer votre expérience.
              Vous pouvez accepter ou refuser leur utilisation.
            </p>
          </div>
        </div>
      </CookieConsent>
    </>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="relative">
        <LayoutProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LayoutProvider>
      </body>
    </html>
  )
}
