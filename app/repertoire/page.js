import PortfolioClient from './PortfolioClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

export const metadataBase = new URL(siteUrl);

export const metadata = {
  title: 'Le Répertoire | Care Concierge Luxury',
  description:
    'Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.',
  keywords: [
    'répertoire',
    'conciergerie',
    'chalet',
    'prestige',
    'haute-savoie',
    'location de luxe',
    'événements',
  ],
  authors: [{ name: 'Care Concierge Luxury', url: siteUrl }],
  publisher: 'Care Concierge Luxury',
  creator: 'Care Concierge Luxury',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Le Répertoire | Care Concierge Luxury',
    description:
      'Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.',
    url: `${siteUrl}/repertoire`,
    siteName: 'Care Concierge Luxury',
    locale: 'fr_FR',
    images: [
      {
        url: `${siteUrl}/images/portfolio.jpg`,
        width: 1200,
        height: 630,
        alt: 'Répertoire de logements haut de gamme en Haute-Savoie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Répertoire | Care Concierge Luxury',
    description:
      'Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.',
    images: [`${siteUrl}/images/portfolio.jpg`],
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
