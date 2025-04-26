// ✅ CORRECTION : app/page.js (Home)
import ProfilesGrid from "./components/ProfilesGrid";
import NewsletterForm from "./components/NewsletterForm";
import { getMetadataForPage } from "./lib/metadata";

export const metadata = getMetadataForPage({
  title: "Accueil | Care Concierge",
  description: "Des chalets de luxe en Haute-Savoie avec un service d’exception.",
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
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-1"></div>
          <ul className=" uppercase font-bold max-w-[900px] p-6 z-20">
            <li className="md:text-6xl text-6xl text-white/70 ">Valorisez</li>
            <li className="md:text-8xl text-6xl text-white ">votre bien</li>
            <li className="md:text-7xl text-6xl text-white/70 ">avec un</li>
            <li className="md:text-8xl text-6xl text-white ">service</li>
            <li className="md:text-6xl text-6xl text-white ">d’exception</li>
          </ul>

         
        </div>
      </section>

      <div className="max-w-5xl mx-auto mb-12 p-4">
      <div className="text-gray-800 max-w-6xl  p-6 mx-auto ">
          <ul className="">
            <li>
              <h5 className="text-4xl md:text-6xl uppercase font-thin">
                Organisons ensemble
              </h5>
            </li>
            <li>
              <h6 className="text-4xl md:text-5xl uppercase font-thin">
                votre événement
              </h6>
            </li>
            <li>
              <h6 className="text-3xl md:text-4xl uppercase font-thin">
                hors du commun
              </h6>
            </li>
          </ul>
          <div className="text-gray-800 max-w-6xl mx-auto p-4 flex flex-col items-center"> 
          <p className=" text-center md:text-left text-lg font-thin py-10 italic">
            Imaginez votre prochain événement dans un cadre atypique, agrémenté
            d’expériences extraordinaires. Oubliez les contraintes, notre équipe
            s’occupe de tout et organise pour vous un moment inoubliable
            entièrement sur-mesure.
          </p>
          </div>
        </div>
        <ProfilesGrid profiles={profiles} />
        <NewsletterForm />
      </div>
    </>
  );
}
