// app/repertoire/layout.server.js
export const metadata = {
  title: 'Chalets de luxe | Care Concierge',
  description: 'Découvrez nos logements haut de gamme à louer en Haute-Savoie.',
};

export default function RepertoireLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
