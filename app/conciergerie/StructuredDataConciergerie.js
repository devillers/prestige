'use client'

import Script from 'next/script'

export default function StructuredDataConciergerie() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Conciergerie de luxe en Haute-Savoie",
    "provider": {
      "@type": "Organization",
      "name": "Care Concierge",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
      "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
      "telephone": process.env.NEXT_PUBLIC_SITE_PHONE,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "33 quai de Warrens",
        "addressLocality": "Sallanches",
        "postalCode": "74700",
        "addressCountry": "FR"
      }
    },
    "areaServed": {
      "@type": "Place",
      "name": "Haute-Savoie"
    },
    "description": "Care Concierge Luxury propose des services de conciergerie sur mesure pour les propriétaires et voyageurs en quête d’excellence dans les Alpes françaises.",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/conciergerie`
  }

  return (
    <Script
      id="structured-data-conciergerie"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
