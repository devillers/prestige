// ✅ /app/seminaires/page.js
import { getMetadataForPage } from '../../lib/metadata';
import SeminaireClientPage from './SeminairesClient';

export const metadata = getMetadataForPage({
  title: 'Organisation de séminaires de luxe | Care Concierge',
  description:
    'Organisez un événement professionnel unique à Chamonix avec Care Concierge. Lieux d’exception, logistique sur mesure et expériences inoubliables.',
  keywords: ['séminaire', 'chamonix', 'événement', 'luxe', 'team building']
});

export default function Page() {
  return <SeminaireClientPage />;
}
