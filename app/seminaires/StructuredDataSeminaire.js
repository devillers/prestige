'use client'

import Script from 'next/script'

export default function StructuredDataSeminaire() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Organisation de séminaires haut de gamme à Chamonix",
    "description": "Care Concierge organise des séminaires d’exception dans les Alpes, entre nature, confort et prestations de luxe.",
    "startDate": "2025-07-01T09:00",
    "endDate": "2025-07-05T18:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Chamonix",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chamonix",
        "addressRegion": "Auvergne-Rhône-Alpes",
        "postalCode": "74400",
        "addressCountry": "FR"
      }
    },
    "image": [
      `${process.env.NEXT_PUBLIC_SITE_URL}/images/seminaire.webp`
    ],
    "organizer": {
      "@type": "Organization",
      "name": "Care Concierge",
      "url": process.env.NEXT_PUBLIC_SITE_URL
    },
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/seminaires`,
    "telephone": process.env.NEXT_PUBLIC_SITE_PHONE
  }

  return (
    <Script
      id="structured-data-seminaire"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
