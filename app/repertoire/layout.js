// app/repertoire/layout.js
export const metadata = {
  title: "Le Répertoire | Care Concierge Luxury",
  description:
    "Découvrez nos logements haut de gamme à louer en Haute-Savoie pour vos séjours et événements d’exception.",
};

export default function RepertoireLayout({ children }) {
  return (
    // you can wrap this in your site’s <MainNav> / <Footer> etc.
    <div className="repertoire–container">
      {children}
    </div>
  );
}
