import { useState, useEffect } from "react";

// Nettoyage récursif : transforme { rendered: "" } => ""
function cleanWpData(data) {
  if (Array.isArray(data)) {
    return data.map(cleanWpData);
  } else if (data && typeof data === "object") {
    if ("rendered" in data) {
      return data.rendered;
    } else {
      const cleaned = {};
      for (const key in data) {
        cleaned[key] = cleanWpData(data[key]);
      }
      return cleaned;
    }
  }
  return data;
}

// Hook principal
export function useWpData(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Erreur API ${res.status}`);
        const json = await res.json();
        setData(cleanWpData(json));
      } catch (e) {
        setError(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}
