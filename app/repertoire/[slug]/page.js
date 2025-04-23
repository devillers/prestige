// app/repertoire/[slug]/page.js

import { getMetadataForPage } from '../../lib/metadata';
import { notFound } from 'next/navigation';
import ClientDescription from './ClientDescription';

export async function generateMetadata({ params }) {
  const { slug } = await Promise.resolve(params);
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/portfolio?slug=${slug}&_embed`);
  const data = await res.json();
  const chalet = data[0];

  if (!chalet) {
    return getMetadataForPage({
      title: 'Logement introuvable',
      description: 'Ce logement n’est pas disponible ou a été supprimé.',
    });
  }

  const title = chalet.title?.rendered;
  const location = chalet.location || 'Haute-Savoie';
  const excerpt = chalet.excerpt?.rendered?.replace(/<[^>]+>/g, '') ?? '';

  return getMetadataForPage({
    title: `${title} | Chalet à ${location} | Care Concierge`,
    description: excerpt || `Découvrez le chalet ${title}, situé à ${location}.`,
    keywords: [title, location, 'chalet de luxe'],
  });
}

export default async function DescriptionPage({ params }) {
  const { slug } = await Promise.resolve(params);
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/portfolio?slug=${slug}&_embed`);
  const data = await res.json();
  const chalet = data[0];

  if (!chalet) notFound();

  return <ClientDescription slug={slug} />;
}
