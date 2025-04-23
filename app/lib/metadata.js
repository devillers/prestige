export function getDefaultMetadata() {
    return {
      title: 'Care Concierge | Chalets de luxe en Haute-Savoie',
      description: 'Découvrez nos logements d’exception dans les Alpes françaises.',
      openGraph: {
        images: [
          {
            url: 'https://yourdomain.com/images/fallback.jpg',
            width: 1200,
            height: 630,
            alt: 'Chalet de luxe en montagne',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
      },
    };
  }
  
  export function getMetadataForPage({ title, description, keywords = [] }) {
    const base = getDefaultMetadata();
    return {
      ...base,
      title: title || base.title,
      description: description || base.description,
      keywords,
      openGraph: {
        ...base.openGraph,
        title: title || base.openGraph.title,
        description: description || base.openGraph.description,
      },
      twitter: {
        ...base.twitter,
        title: title || base.twitter.title,
        description: description || base.twitter.description,
      },
    };
  }
  