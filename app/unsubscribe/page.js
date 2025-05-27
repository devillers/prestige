'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [message, setMessage] = useState('Traitement en cours...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setMessage('Lien invalide.');
      setLoading(false);
      return;
    }

    fetch('https://api.careconciergeluxury.com/wp-json/newsletter/v1/unsubscribe-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage('Une erreur est survenue.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <section className="max-w-xl mx-auto text-center mt-20 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-semibold mb-4">Désinscription</h1>
      <p className="text-gray-700">{loading ? '...' : message}</p>
    </section>
  );
}
