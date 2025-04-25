import ProfileCard from "./ProfileCard";

export default function ProfilesGrid({ profiles }) {
  const safeProfiles = Array.isArray(profiles) ? profiles : [];

  return (
    <div className="text-gray-800 max-w-5xl mx-auto ">
      {/* En-tête affichée une seule fois */}
     <h3 className="text-3xl font-thin">Nos agents</h3>

      <p className="font-thin mt-4 text-sm leading-7 text-center mb-12  ">
        Chamonix, Megève ou Saint-Gervais, notre équipe vous accompagne dans la
        gestion de votre propriété ou l’organisation d’événements d’exception.
        Mariage, séminaire ou conciergerie locative : chaque demande est traitée
        avec rigueur, discrétion et un sens aigu du détail.
      </p>

      {/* Grid des cartes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {safeProfiles.map((profile) => {
          const image = profile._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
          const meta = profile.meta || {};
          const {
            first_name = "",
            last_name = "",
            phone = "",
            language = "",
            description = "",
          } = meta;

          return (
            <ProfileCard
              key={profile.id}
              title={profile.title.rendered}
              image={image}
              first_name={first_name}
              last_name={last_name}
              phone={phone}
              language={language}
              description={description}
            />
          );
        })}
      </div>
    </div>
  );
}
