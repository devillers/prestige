// app/repertoire/[slug]/ClientDescription.js

'use client';

import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import PhotoGallery from '../../components/PhotoGallery';
import PropertyDescriptionHeader from '../../components/PropertyDescriptionHeader';

export default function ClientDescription({ slug }) {
  const [property, setProperty] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMoreContent, setHasMoreContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/portfolio?slug=${slug}&_embed`);
        const data = await res.json();
        const prop = data[0];
        if (prop) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(prop.content.rendered, 'text/html');
          const pTags = doc.querySelectorAll('p');
          setHasMoreContent(pTags.length > 1);
          setProperty(prop);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la propriété :', error);
      }
    };

    fetchData();
  }, [slug]);

  const toggleAccordion = () => setIsExpanded(prev => !prev);

  if (!property) {
    return <div className="text-center py-20 text-gray-500">Chargement…</div>;
  }

  const {
    title: { rendered: title },
    location = 'Localisation inconnue',
    content: { rendered: content },
    features: badges = [],
    gallery_images: gallery = [],
  } = property;

  return (
    <>
      <div className="relative">
        <PropertyDescriptionHeader property={property} />
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
          <div className="text-gray-700 text-sm leading-8">
            <div dangerouslySetInnerHTML={{ __html: content.split('</p>')[0] + '</p>' }} />

            {hasMoreContent && (
              <>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-full opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div
                    className="mt-2 text-[13px] font-thin leading-8"
                    dangerouslySetInnerHTML={{
                      __html: content.split('</p>').slice(1).join('</p>'),
                    }}
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
          <section className="mt-8 px-6">
            <PhotoGallery images={gallery} />
          </section>
        )}
      </section>
    </>
  );
}