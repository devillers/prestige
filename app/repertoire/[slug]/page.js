//app/repertoire/[slug]/page.js

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import PhotoGallery from '../../components/PhotoGallery';
import PropertyDescriptionHeader from '../../components/PropertyDescriptionHeader';

export default function DescriptionPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMoreContent, setHasMoreContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8888/wordpress/wp-json/wp/v2/portfolio?slug=${slug}&_embed`);
      const data = await res.json();
      const prop = data[0];

      // Count <p> tags using DOMParser
      const parser = new DOMParser();
      const doc = parser.parseFromString(prop.content.rendered, 'text/html');
      const pTags = doc.querySelectorAll('p');

      setHasMoreContent(pTags.length > 1);
      setProperty(prop);
    };
    fetchData();
  }, [slug]);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  if (!property) return <div className="text-center py-20 text-gray-500">Chargement…</div>;

  const title = property.title.rendered;
  const location = property.location || 'Localisation inconnue';
  const content = property.content.rendered;
  const badges = property.features || [];
  const gallery = property.gallery_images || [];

  return (
    <>
      <div className="relative">
        <PropertyDescriptionHeader property={property} />
      </div>

      <section className="max-w-[900px] mx-auto text-slate-600">
        <div className="font-sans">
          {/* HEADER */}
          <div className="flex flex-col">
            <div className="mt-4 md:w-1/1 p-6">
              <h1
                className="text-7xl font-thin leading-14 text-center"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p className="text-gray-600 my-6 text-xl flex justify-center font-thin items-center gap-2">
                <FaMapMarkerAlt className="text-gray-600" /> {location}
              </p>
            </div>

            {/* BADGES */}
            {badges.length > 0 && (
              <div className="flex flex-wrap justify-start gap-3 p-6 md:w-1/2">
                {badges.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-2 px-4 py-2 bg-[#bd9254] text-white rounded-sm uppercase text-[12px]"
                  >
                    <span className="text-white text-[14px]">
                      <FaCheck />
                    </span>
                    {feature.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PROPERTY DESCRIPTION */}
          <section className="mt-8 p-6">
            <div className="mt-4">
              <h3 className="text-3xl uppercase py-4 font-thin">{title}</h3>

              {/* First paragraph */}
              <div
                className="text-gray-700 mt-2 text-[13px] leading-8"
                dangerouslySetInnerHTML={{
                  __html: content.split('</p>')[0] + '</p>',
                }}
              />

              {/* Hidden content */}
              {hasMoreContent && (
                <>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'h-auto opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div
                      className="text-gray-700 mt-2 text-[13px] font-thin leading-8"
                      dangerouslySetInnerHTML={{
                        __html: content
                          .split('</p>')
                          .slice(1)
                          .join('</p>'),
                      }}
                    />
                  </div>

                  {/* Toggle button */}
                  <button
                    onClick={toggleAccordion}
                    className="text-yellow-600 font-thin mt-2 text-[12px]"
                  >
                    {isExpanded ? 'fermer' : 'voir +'}
                  </button>
                </>
              )}
            </div>
          </section>

          {/* GALLERY */}
          <section className="md:mt-8">
            <PhotoGallery images={gallery} />
          </section>
        </div>
      </section>
    </>
  );
}
