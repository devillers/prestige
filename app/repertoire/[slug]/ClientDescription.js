'use client';

import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import PhotoGallery from '../../components/PhotoGallery';
import PropertyDescriptionHeader from '../../components/PropertyDescriptionHeader';

export default function ClientDescription({ slug }) {
  const [property, setProperty] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const previewCount = 2;

  const toggleAccordion = () => setIsExpanded(prev => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/portfolio?slug=${slug}&_embed`
        );

        if (!res.ok) {
          console.warn(`Erreur API : ${res.status}`);
          return;
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error('Données inattendues pour "portfolio"', data);
          return;
        }

        const prop = data[0];
        if (prop) setProperty(prop);
      } catch (error) {
        console.error('Erreur lors du chargement de la propriété :', error);
      }
    };

    fetchData();
  }, [slug]);

  if (!property) {
    return (
      <div className="text-center py-20 text-gray-500 uppercase">
        Propriété introuvable ou en cours de chargement…
      </div>
    );
  }

  const {
    title: { rendered: title },
    location = 'Localisation inconnue',
    content: { rendered: content },
    features: badges = [],
    gallery_images: gallery = [],
    booking_url = null, // ✅ Ajout ici
  } = property;

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const paragraphs = Array.from(doc.querySelectorAll('p'));
  const previewHTML = paragraphs
    .slice(0, previewCount)
    .map(p => p.outerHTML)
    .join('');
  const hiddenHTML = paragraphs
    .slice(previewCount)
    .map(p => p.outerHTML)
    .join('');
  const hasMoreParagraphs = paragraphs.length > previewCount;

  return (
    <>
      <div className="relative">
      <PropertyDescriptionHeader property={property} booking_url={booking_url} />
      </div>

      <section className="max-w-[900px] mx-auto text-slate-600 font-sans">
        <div className="flex flex-col items-center">
          <div className="mt-4 w-full px-6">
            <h1
              className="text-5xl md:text-7xl font-thin text-center leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p className="text-gray-600 my-6 text-xl text-center font-thin flex justify-center items-center gap-2">
              <FaMapMarkerAlt className="text-gray-600" /> {location}
            </p>
          </div>

          {badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 px-6 mb-4">
              {badges.map(feature => (
                <div
                  key={feature.id}
                  className="flex items-center gap-2 px-4 py-2 bg-[#bd9254] text-white rounded-sm uppercase text-xs"
                >
                  <FaCheck className="text-white text-sm" />
                  {feature.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <section className="px-6 mt-6">
          <div className="text-gray-700 text-[13px] font-thin leading-8 text-justify">
            <div dangerouslySetInnerHTML={{ __html: previewHTML }} />

            {hasMoreParagraphs && (
              <>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-full opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div
                    className="mt-2 text-[13px] font-thin leading-8"
                    dangerouslySetInnerHTML={{ __html: hiddenHTML }}
                  />
                </div>
                <button
                  onClick={toggleAccordion}
                  className="text-yellow-600 font-thin mt-2 text-sm"
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? 'fermer' : 'voir +'}
                </button>
              </>
            )}
          </div>


       
        </section>

        {gallery.length > 0 && (
          <section className="mt-8">
            <PhotoGallery images={gallery} />
          </section>
        )}

{booking_url && (
  <p  className="inline-flex mt-5 items-center justify-center px-4 h-[30px] font-thin border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95" >
    <a href={booking_url} target="_blank" rel="noopener noreferrer">
      Réserver cette propriété
    </a>
  </p>
)}


       
      </section>
    </>
  );
}
