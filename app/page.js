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
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/home.webp)] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-1"></div>
          <ul className="mt-6 p-6 z-20 uppercase font-bold max-w-[900px]">
            <li className="md:text-6xl text-6xl text-white/70 py-[2px]">Valorisez</li>
            <li className="md:text-8xl text-6xl text-white py-[2px]">votre bien</li>
            <li className="md:text-7xl text-6xl text-white/70 py-[2px]">avec un</li>
            <li className="md:text-8xl text-6xl text-white py-[2px]">service</li>
            <li className="md:text-6xl text-6xl text-white py-[2px]">d’exception</li>
          </ul>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <ProfilesGrid profiles={profiles} />
        <NewsletterForm />
      </div>
    </>
  );
}
