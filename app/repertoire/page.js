import PortfolioClient from './PortfolioClient';

export const metadata = {
  title: 'Le Répertoire | Care Concierge Luxury',
  keywords: [
    'répertoire',
    'conciergerie',
    'chalet',
    'prestige',
    'haute-savoie',
    'location de luxe',
    'événements',
  ],
  openGraph: {
    title: 'Le Répertoire | Care Concierge Luxury',
    description: 'Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/repertoire`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/portfolio.jpg`,
        width: 1200,
        height: 630,
        alt: 'Répertoire de logements haut de gamme en Haute-Savoie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Répertoire | Care Concierge Luxury',
    description: 'Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/portfolio.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Care Concierge Luxury', url: process.env.NEXT_PUBLIC_SITE_URL }],
  publisher: 'Care Concierge Luxury',
  creator: 'Care Concierge Luxury',
  keywords: [
    'répertoire',
    'conciergerie',
    'chalet',
    'prestige',
    'haute-savoie',
    'location de luxe',
    'événements',
  ],
  openGraphType: 'website',
  openGraphLocale: 'fr_FR',
  openGraphSiteName: 'Care Concierge Luxury',
  openGraphUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/repertoire`,
  openGraphImage: `${process.env.NEXT_PUBLIC_SITE_URL}/images/portfolio.jpg`,
  openGraphImageWidth: 1200,
  openGraphImageHeight: 630,
  openGraphImageAlt: 'logements haut de gamme en Haute-Savoie',
  description: 'Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.',
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
