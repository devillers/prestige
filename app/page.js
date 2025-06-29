// app/page.js

import ProfilesGrid from "./components/ProfilesGrid";
import { getMetadataForPage } from "../lib/metadata";

export const metadata = getMetadataForPage({
  title: "Accueil | Care Concierge Luxury",
  description: "Des chalets de luxe en Haute-Savoie avec un service d’exception.",
  keywords: ["chalet", "conciergerie", "luxe", "haute savoie", "saint gervais les bains", "megeve", "chamonix"],
   openGraph: {
    title: "Care Concierge Luxury",
    description: "Conciergerie Haut de Gamme - Séminaires.",
    url: "https://www.careconciergeluxury.com/",
    siteName: "Care Concierge Luxury",
    images: [{ url: "/images/contact.webp" }],
    locale: "fr_FR",
    type: "website"
  }
});

export default function HomePage() {
  console.log("HomePage rendered on client");
  return (
  
      <>
        <section className="relative">
          <div className="relative z-10 mx-auto flex flex-col justify-center min-h-[640px] bg-white bg-[url(/images/home.webp)] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-10" />
            <h1 className="uppercase font-bold max-w-[900px] p-6 z-20 text-white">
              <span className="md:text-6xl text-6xl text-white/70">Valorisez</span><br/>
              <span className="md:text-8xl text-6xl text-white">votre bien</span><br/>
              <span className="md:text-7xl text-6xl text-white/70">avec un</span><br/>
              <span className="md:text-8xl text-6xl text-white">service</span><br/>
              <span className="md:text-6xl text-6xl text-white">d’exception</span>
            </h1>
          </div>
        </section>

        <div className="max-w-5xl mx-auto mb-12 p-4">
          <div className="text-gray-600 max-w-7xl p-6 mx-auto ">
            <h2 className="font-thin">
              <span className="text-5xl md:text-6xl uppercase ">
                Le service qui{" "}
              </span>
              <br />
              <span className="text-4xl md:text-6xl uppercase ">
                {" "}
                révèle tout le{" "}
              </span>
              <br />
              <span className="text-4xl md:text-5xl uppercase ">
                {" "}
                potentiel de{" "}
              </span>
              <br />
              <span className="text-3xl md:text-4xl uppercase ">
                {" "}
                votre bien{" "}
              </span>
            </h2>
            <div className="text-gray-800 max-w-6xl mx-auto flex flex-col mt-10 ">
              <div className=" max-w-6xl mx-auto p-6 flex flex-col items-center bg-gray-500/10 rounded py-10">
                <p className=" text-[20px] font-light text-center italic mb-10">
                  Offrez à votre bien une gestion locative sur-mesure, pensée
                  pour le haut de gamme. Optimisez la rentabilité et la
                  valorisation de votre propriété sans contraintes. Notre
                  conciergerie vous propose deux solutions de gestion locative
                  haut de gamme adaptées à vos objectifs
                </p>
                <ul className="flex flex-col md:flex-row gap-4 text-center">
                  <li className="flex flex-col items-center ">
                    <h3 className="text-[18px] p-2 font-medium ">
                      Gestion locative classique.
                    </h3>
                    <p className="text-[15px] px-4 font-light italic">
                      Notre service de gestion locative classique vous offre la
                      liberté de louer votre bien en toute sérénité, sans les
                      contraintes du quotidien. Vous restez pleinement
                      propriétaire et percevez directement vos loyers, tandis
                      que nous prenons en charge l’intégralité de la gestion en
                      votre nom. Grâce à notre accompagnement professionnel,
                      transparent et rigoureux, vous sécurisez vos revenus
                      locatifs, valorisez durablement votre patrimoine et vous
                      libérez des tâches administratives, techniques et
                      juridiques.
                    </p>
                  </li>
                  <li className="flex flex-col items-center">
                    <h3 className="text-[18px] p-2 font-medium   ">
                      {" "}
                      Gestion para-hôtelière
                    </h3>
                    <p className="text-[15px] px-4 font-light italic  ">
                      Notre contrat de gestion locative en para-hôtellerie vous
                      offre une solution clé en main pour valoriser votre bien
                      comme un hébergement de prestige. Nous assurons
                      l’exploitation complète du bien en notre nom, incluant les
                      services hôteliers (accueil, ménage, linge,
                      petits-déjeuners), la commercialisation sur les grandes
                      plateformes et la gestion opérationnelle au quotidien. Ce
                      modèle vous permet de bénéficier d’une fiscalité optimisée
                      (régime para-hôtelier), d’une rentabilité renforcée et
                      d’une tranquillité totale, tout en préservant la qualité
                      d’accueil de vos clients.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="text-center max-w-6xl mx-auto py-10 flex flex-col items-center p-6">
                <h2 className="text-[20px] font-medium mb-4">
                  Des services sur-mesure
                </h2>
                <p className=" text-center text-[15px] font-light  italic">
                  Shooting photo professionnel, rédaction d’annonces optimisées,
                  gestion dynamique des calendriers et des tarifs, accueil
                  personnalisé 7 j/7, linge hôtelier de qualité, ménage
                  méticuleux, maintenance préventive et assistance voyageurs en
                  continu.
                </p>
                <p className=" text-center text-[15px]  font-light py-10 italic">
                  Vous profitez d’une valorisation maximale et d’avis cinq
                  étoiles, tandis que nous veillons à la sécurité de votre
                  patrimoine et à la sérénité de votre expérience propriétaire.
                </p>
              </div>
              <div className=" text-center font-light py-10 bg-gray-500/10  rounded p-6">
                <h3 className="font-medium text-[18px] mb-2">
                  Gestion et entretien sans accroc
                </h3>
                <p className="mb-6 text-[15px] italic">
                  Nous prenons en charge chaque détail opérationnel : de la
                  gestion des réservations à la maintenance préventive, en
                  passant par les inspections régulières et les réparations
                  rapides. Vous bénéficiez d’une opération fluide et d’une
                  tranquillité d’esprit au quotidien.
                </p>

                <h4 className="font-medium text-[18px] mb-2">
                  Maximisation de votre Potentiel Locatif
                </h4>
                <p className="mb-4 text-[15px] italic">
                  Grâce à une tarification dynamique alignée sur les tendances
                  du marché, à l’optimisation du calendrier pour réduire les
                  périodes d’inoccupation et à un suivi rigoureux des coûts
                  d’exploitation, nous vous aidons à obtenir le meilleur retour
                  sur investissement possible. Revenus optimisés, rentabilité
                  durable.
                </p>

                <h5 className="font-medium text-[18px] mb-2">
                  Hôtes premium, confiance reconnue
                </h5>
                <p className="mb-4 text-[15px] italic">
                  Fort de plus de 2 000 avis positifs sur Booking.com, Airbnb,
                  Abritel® HomeAway, Vrbo et Homes & Villas by Marriott
                  International, nous vous assurons un service d’excellence,
                  plébiscité par les voyageurs du monde entier. Contactez-nous
                  dès aujourd’hui pour découvrir comment nous pouvons
                  transformer la gestion de votre bien en une véritable réussite
                  financière.
                </p>
              </div>
            </div>
          </div>
            <ProfilesGrid />
         
        </div>
      </>
  
  );
}
