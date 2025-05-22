// app/context/ProfilesContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProfilesContext = createContext([]);

export function ProfilesProvider({ children }) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function loadProfiles() {
      const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
      try {
        const res = await fetch(
          `${baseUrl}/wp-json/wp/v2/member_profile?_embed`,
          { next: { revalidate: 60 } }
        );
        const data = await res.json();
        console.log("[ProfilesProvider] fetched profiles:", data);
        setProfiles(data || []);
      } catch (err) {
        console.error("[ProfilesProvider] fetch error:", err);
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