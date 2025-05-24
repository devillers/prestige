import { getMetadataForPage } from '../../lib/metadata';
import ContactClient from './ContactClient';

export const metadata = getMetadataForPage({
  title: 'Contactez-nous | Care Concierge Luxury',
  description: 'Prenez contact avec Care Concierge pour vos projets de luxe en Haute-Savoie.',
  keywords: ['contact', 'conciergerie', 'chalet', 'prestige', 'haute-savoie'],
});

export default function ContactPage() {
  return <ContactClient  />;
}
