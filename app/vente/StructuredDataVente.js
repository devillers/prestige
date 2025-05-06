'use client'

import Script from 'next/script'

export default function StructuredDataVente() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Swixim International Sallanches",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/vente`,
    "image": `${process.env.NEXT_PUBLIC_SITE_URL}/images/immo.webp`,
    "description": "Agence immobilière Swixim International à Sallanches, spécialisée dans les biens haut de gamme en Haute-Savoie.",
    "telephone": process.env.NEXT_PUBLIC_SITE_PHONE,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "33 quai de Warrens",
      "addressLocality": "Sallanches",
      "postalCode": "74700",
      "addressCountry": "FR"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Haute-Savoie"
    }
  }

  return (
    <Script
      id="structured-data-vente"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
