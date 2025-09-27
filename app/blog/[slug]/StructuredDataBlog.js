'use client';

import Script from 'next/script';

/**
 * StructuredDataBlog
 * Ajoutez datePublished, dateModified, author, keywords, articleSection, image (ImageObject), etc.
 *
 * Props minimales recommandées :
 * - title (string)
 * - excerpt (string)
 * - url (string absolue)
 * - image (string absolue OU { url, width, height, alt })
 *
 * Props optionnelles utiles :
 * - authorName (string)
 * - datePublished (string | Date)  // ISO 8601 recommandé
 * - dateModified (string | Date)   // défaut = datePublished
 * - section (string)               // catégorie
 * - keywords (string[] | string)   // tags
 * - locale (string)                // ex: 'fr-FR'
 * - siteName (string)
 * - publisherUrl (string)          // absolue
 * - publisherLogoUrl (string)      // absolue
 * - publisherSameAs (string[])     // réseaux sociaux, etc.
 */
export default function StructuredDataBlog({
  title,
  excerpt,
  image,
  url,
  authorName = 'Care Concierge Editorial',
  datePublished,
  dateModified,
  section,
  keywords = [],
  locale = 'fr-FR',
  siteName = 'Care Concierge',
  publisherUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
  publisherLogoUrl,
  publisherSameAs = []
}) {
  // Helpers
  const toIso = (d) => {
    if (!d) return undefined;
    try {
      return (d instanceof Date ? d : new Date(d)).toISOString();
    } catch {
      return undefined;
    }
  };

  const ensureAbsolute = (maybeUrl) => {
    if (!maybeUrl) return undefined;
    // Si c’est déjà absolu, on garde. Sinon on préfixe avec publisherUrl.
    if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl;
    if (!publisherUrl) return maybeUrl;
    return `${publisherUrl.replace(/\/+$/, '')}/${String(maybeUrl).replace(/^\/+/, '')}`;
  };

  // Normalisation image -> tableau d'ImageObject (recommandé par Google)
  const normalizeImage = (img) => {
    if (!img) return undefined;
    const toObj = (x) => {
      if (typeof x === 'string') {
        return { '@type': 'ImageObject', url: ensureAbsolute(x) };
      }
      // objet { url, width?, height?, alt? }
      return {
        '@type': 'ImageObject',
        url: ensureAbsolute(x.url),
        width: x.width,
        height: x.height,
        caption: x.alt
      };
    };
    if (Array.isArray(img)) return img.map(toObj).filter(Boolean);
    return [toObj(img)];
  };

  const isoPublished = toIso(datePublished);
  const isoModified = toIso(dateModified) || isoPublished;

  const absoluteUrl = ensureAbsolute(url);
  const effectiveLogoUrl =
    ensureAbsolute(
      publisherLogoUrl ||
      `${process.env.NEXT_PUBLIC_SITE_URL || ''}/images/logo.png`
    );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': absoluteUrl ? `${absoluteUrl}#article` : undefined,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': absoluteUrl
    },
    'headline': title,
    'description': excerpt,
    'inLanguage': locale,
    'isAccessibleForFree': true,
    'url': absoluteUrl,
    'image': normalizeImage(image),
    'datePublished': isoPublished,
    'dateModified': isoModified,
    'author': authorName ? { '@type': 'Person', 'name': authorName } : undefined,
    'publisher': {
      '@type': 'Organization',
      'name': siteName,
      'url': publisherUrl,
      'logo': effectiveLogoUrl ? { '@type': 'ImageObject', 'url': effectiveLogoUrl } : undefined,
      'sameAs': Array.isArray(publisherSameAs) ? publisherSameAs : []
    },
    'articleSection': section,
    'keywords': Array.isArray(keywords) ? keywords.join(', ') : keywords
  };

  // Nettoie les clés undefined pour un JSON-LD propre
  const clean = (obj) =>
    Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0))
        .map(([k, v]) => [k, typeof v === 'object' && !Array.isArray(v) ? clean(v) : v])
    );

  const payload = clean(jsonLd);

  return (
    <Script id="structured-data-blog" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(payload)}
    </Script>
  );
}
