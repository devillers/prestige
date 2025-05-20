//app/conciergierie/page.js


import { getMetadataForPage } from "../../lib/metadata";
import ConciergerieClient from "./ConciergerieClient";

export const metadata = getMetadataForPage({
  title: "Conciergerie de Luxe | Care Concierge",
  description:
    "Découvrez nos services de conciergerie haut de gamme pour vos séjours ou événements d’exception en Haute-Savoie.",
  keywords: [
    "conciergerie",
    "services haut de gamme",
    "chalet",
    "haute savoie",
  ],
});

export default function ConciergeriePage() {
  return <ConciergerieClient />;
}
