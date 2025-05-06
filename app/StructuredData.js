'use client'

import Script from 'next/script'

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Care Concierge Luxury",
    "description": "Conciergerie haut de gamme pour chalets haut de gamme en Haute-Savoie.",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "image": process.env.NEXT_PUBLIC_SITE_IMAGE,
    "telephone": process.env.NEXT_PUBLIC_SITE_PHONE,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "33 quai de warrens",
      "addressLocality": "Sallanches",
      "postalCode": "74700",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.933331,
      "longitude":  6.63333
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }],
    "sameAs": [
      "https://www.instagram.com/careconcierge_chamonix/?next=%2F&hl=en",
      "https://www.facebook.com/careconciergechamonix/",
      "https://www.linkedin.com/in/careconcierge-properties/",

    ]
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
