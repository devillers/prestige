import ProfileCard from "./ProfileCard";

export default function ProfilesGrid({ profiles }) {
  const safeProfiles = Array.isArray(profiles) ? profiles : [];

  return (
    <div className="text-gray-800 max-w-5xl mx-auto p-6">
      {/* En-tête affichée une seule fois */}
      <h3 className="text-3xl font-thin">
        Les Visages de Care Concierge <span className="text-[#bd9254]">Luxury</span>
      </h3>

      <p className="font-thin mt-4 text-sm leading-7 text-center mb-12 p-4
       ">
        À l’origine de chaque réservation parfaite et de chaque séjour mémorable
        se tiennent nos agents, véritables ambassadeurs de Care Concierge
        Luxury. Polyglottes et experts de leur territoire, ils mobilisent leur
        sens aigu du détail et leur réactivité pour satisfaire la moindre de vos
        exigences : accueil multilingue attentif, recommandations personnalisées
        pour explorer la région et prise en charge méticuleuse de vos demandes
        24 h/24. Chacun personnifie notre quête d’excellence, assurant la
        sécurité et le confort de vos hôtes tout en élevant votre bien au rang
        de référence prestigieuse.
      </p>

      {/* Grid des cartes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {safeProfiles.map((profile) => {
          const image =
            profile._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
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
