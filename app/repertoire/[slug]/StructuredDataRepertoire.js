'use client'

import Script from 'next/script'

export default function StructuredDataRepertoire({ title, location, description, image, slug, prix }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "image": image,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/repertoire/${slug}`,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
     "price": prix ?? "Sur demande",
    },
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "Localisation",
      "value": location
    }
  }

  return (
    <Script
      id="structured-data-repertoire"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
