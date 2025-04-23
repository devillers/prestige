//app/vente/page.js
import { getMetadataForPage } from '../lib/metadata';
import VentePageClient from './VentePageClient';

export const metadata = getMetadataForPage({
  title: 'Biens à vendre | Care Concierge',
  description: 'Trouvez des biens haut de gamme à vendre en Haute-Savoie avec notre réseau d’experts SWIXIM.',
  keywords: ['vente', 'immobilier', 'chalet', 'appartement', 'haute savoie'],
});

export default function VentePage() {
  return <VentePageClient />;
}
