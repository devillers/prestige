// app/repertoire/page.js
import PortfolioClient from "./PortfolioClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://careconciergeluxury.com";

export const metadata = {
  title: "Le Répertoire | Care Concierge Luxury",
  description:
    "Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.",
  keywords: [
    "répertoire",
    "conciergerie",
    "chalet",
    "prestige",
    "haute-savoie",
    "location de luxe",
    "événements",
  ],
  openGraph: {
    url: "/repertoire",
    type: "website",
    title: "Le Répertoire | Care Concierge Luxury",
    description:
      "Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.",
    siteName: "Care Concierge Luxury",
    locale: "fr_FR",
    images: [
      {
        url: "/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Répertoire de logements haut de gamme en Haute-Savoie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Répertoire | Care Concierge Luxury",
    description:
      "Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.",
    images: ["/images/opengraph.png"],
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Care Concierge Luxury", url: siteUrl }],
  publisher: "Care Concierge Luxury",
  creator: "Care Concierge Luxury",
};



export default function PortfolioPage({ searchParams }) {
  // grab the `slug` query param (will be undefined if none)
  const { slug: initialSlug } = searchParams;

  return <PortfolioClient initialSlug={initialSlug || null} />;
}