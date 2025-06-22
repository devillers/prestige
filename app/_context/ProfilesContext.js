// app/context/ProfilesContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProfilesContext = createContext([]);

export function ProfilesProvider({ children }) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function loadProfiles() {
      // si NEXT_PUBLIC_WORDPRESS_API_URL n'est pas défini, on utilise /wordpress/... en relatif
      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
        ? `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/member_profile?_embed`
        : `/wordpress/wp-json/wp/v2/member_profile?_embed`;

      console.log("[ProfilesProvider] fetching from:", apiUrl);
      try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log("[ProfilesProvider] fetched profiles:", data);
        setProfiles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("[ProfilesProvider] fetch error:", err);
        setProfiles([]);
      }
    }
    loadProfiles();
  }, []);

  return (
    <ProfilesContext.Provider value={profiles}>
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  return useContext(ProfilesContext);
}
