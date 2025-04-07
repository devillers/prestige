'use client';

import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';

export default function ProfilesGrid() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch('http://localhost:8888/wordpress/wp-json/wp/v2/member_profile?_embed');
        const data = await res.json();
        console.log('Profiles:', data); // ← ADD THIS LINE to debug
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {profiles.map(profile => {
        const image = profile._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
        const meta = profile.meta || {}; // ← FIXED
        const { first_name = '', last_name = '', phone = '', language = '', description = '' } = meta;

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
