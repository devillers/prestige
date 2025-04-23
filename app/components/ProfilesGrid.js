import ProfileCard from "./ProfileCard";

export default function ProfilesGrid({ profiles }) {
  const safeProfiles = Array.isArray(profiles) ? profiles : [];

  return (
    <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 p-4 mx-auto">
      {safeProfiles.map((profile) => {
        const image = profile._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
        const meta = profile.meta || {};
        const {
          first_name = '',
          last_name = '',
          phone = '',
          language = '',
          description = '',
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
  );
}
