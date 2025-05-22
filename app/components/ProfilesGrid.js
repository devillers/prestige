// app/components/ProfilesGrid.jsx
"use client";
import { useProfiles } from "../context/ProfilesContext";
import ProfileCard from "./ProfileCard";
import { useEffect } from "react";

export default function ProfilesGrid() {
  const profiles = useProfiles();

  useEffect(() => {
    console.log("[ProfilesGrid] profiles updated:", profiles);
  }, [profiles]);

  const safeProfiles = Array.isArray(profiles) ? profiles : [];

  return (
    <div className="text-gray-800 max-w-5xl mx-auto p-6">
      <h3 className="text-3xl font-thin text-center mb-6">
        Les Visages de Care Concierge <span className="text-[#bd9254]">Luxury</span>
      </h3>

      <p className="font-thin mt-4 text-sm leading-7 text-center mb-12 p-4">
        À l’origine de chaque réservation parfaite et de chaque séjour mémorable se tiennent nos agents...  
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {safeProfiles.map((profile) => {
          const image = profile._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
          const meta = profile.meta || {};
          const { first_name = "", last_name = "", phone = "", language = "", description = "" } = meta;
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