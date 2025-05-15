// ✅ CORRECTION : app/page.js (Home)
import ProfilesGrid from "./components/ProfilesGrid";
//import NewsletterForm from "./components/NewsletterForm";
import { getMetadataForPage } from "./lib/metadata";

export const metadata = getMetadataForPage({
  title: "Accueil | Care Concierge",
  description:
    "Des chalets de luxe en Haute-Savoie avec un service d’exception.",
  keywords: ["chalet", "conciergerie", "luxe", "haute savoie"],
});

export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/member_profile?_embed`, {
    next: { revalidate: 60 },
  });
  const profiles = await res.json();

  return (
    <>
      <section className="relative ">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px]  bg-white bg-[url(/images/home.webp)] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-10" />
          <h1 className=" uppercase font-bold max-w-[900px] p-6 z-20">
            <span className="md:text-6xl text-6xl text-white/70 ">
              Valorisez
            </span>
            <br />
            <span className="md:text-8xl text-6xl text-white ">
              {" "}
              votre bien
            </span>
            <br />
            <span className="md:text-7xl text-6xl text-white/70 ">
              {" "}
              avec un
            </span>
            <br />
            <span className="md:text-8xl text-6xl text-white "> service</span>
            <br />
            <span className="md:text-6xl text-6xl text-white ">
              d’exception
            </span>
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto mb-12 p-4">
        <div className="text-gray-800 max-w-7xl  p-6 mx-auto ">
          <h2 className="">
            <span className="text-5xl md:text-6xl uppercase font-thin">Le service qui </span><br />
            <span className="text-4xl md:text-6xl uppercase font-thin"> révèle tout le </span><br />
            <span className="text-4xl md:text-5xl uppercase font-thin"> potentiel de </span><br />
            <span className="text-3xl md:text-4xl uppercase font-thin"> votre bien </span>
          </h2>
          <div className="text-gray-800 max-w-6xl mx-auto flex flex-col items-center">
            <p className=" text-center  text-lg font-thin py-10 italic">
              Notre conciergerie premium orchestre chaque détail : shooting
              photo professionnel, rédaction d’annonces optimisées, gestion
              dynamique des calendriers et des tarifs, accueil personnalisé 7
              j/7, linge hôtelier de qualité, ménage méticuleux, maintenance
              préventive et assistance voyageurs en continu. Vous profitez d’une
              valorisation maximale et d’avis cinq étoiles, tandis que nous
              veillons à la sécurité de votre patrimoine et à la sérénité de
              votre expérience propriétaire.
            </p>

            <div className=" text-center font-thin py-10 bg-gray-500/10  p-6">
              <h3 className="font-extralight text-[18px] mb-2">
                Gestion et entretien sans accroc
              </h3>
              <p className="mb-6 text-[15px] italic">
                Nous prenons en charge chaque détail opérationnel : de la
                gestion des réservations à la maintenance préventive, en passant
                par les inspections régulières et les réparations rapides. Vous
                bénéficiez d’une opération fluide et d’une tranquillité d’esprit
                au quotidien.
              </p>

              <h4 className="font-extralight text-[18px] mb-2">
                Maximisation de votre Potentiel Locatif
              </h4>
             <p className="mb-4 text-[15px] italic">
                Grâce à une tarification dynamique alignée sur les tendances du
                marché, à l’optimisation du calendrier pour réduire les périodes
                d’inoccupation et à un suivi rigoureux des coûts d’exploitation,
                nous vous aidons à obtenir le meilleur retour sur investissement
                possible. Revenus optimisés, rentabilité durable.
              </p>

              <h5 className="font-extralight text-[18px] mb-2">
                Hôtes premium, confiance reconnue
              </h5>
              <p className="mb-4 text-[15px] italic">
                Fort de plus de 2 000 avis positifs sur Booking.com, Airbnb,
                Abritel® HomeAway, Vrbo et Homes & Villas by Marriott
                International, nous vous assurons un service d’excellence,
                plébiscité par les voyageurs du monde entier. Contactez-nous dès
                aujourd’hui pour découvrir comment nous pouvons transformer la
                gestion de votre bien en une véritable réussite financière.
              </p>
            </div>
          </div>
        </div>
        <ProfilesGrid profiles={profiles} />
        {/* <NewsletterForm /> */}
      </div>
    </>
  );
}
