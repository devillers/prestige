// app/components/ProfilesGrid.jsx  – server component (no "use client")
import Image from 'next/image';
import { resolveProfileThumb } from '../../lib/resolveImage';

export default function ProfilesGrid({ profiles = [] }) {
  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      <h3 className="text-3xl font-thin text-center mb-6">
        Les Visages de Care Concierge <span className="text-[#bd9254]">Luxury</span>
      </h3>

      <p className="font-thin mt-4 text-sm leading-7 text-center mb-12 p-4">
        À l’origine de chaque réservation parfaite…
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {profiles.map(({ id, _embedded, title, meta }) => {
          const media = _embedded?.['wp:featuredmedia']?.[0];
          const thumb = resolveProfileThumb(media);

          const {
            first_name = '',
            last_name = '',
            phone = '',
            language = '',
            description = '',
          } = meta || {};

          return (
            <div
              key={id}
              className="bg-white rounded-3xl shadow w-full max-w-[200px] aspect-[3/4] mx-auto flex flex-col items-center text-center pt-6"
            >
              {thumb && (
                <Image
                  src={thumb}
                  alt={title.rendered}
                  width={96}
                  height={96}
                  sizes="(max-width:768px) 72px, 96px"
                  className="rounded-full mb-3 border-4 border-white shadow-sm"
                  loading="lazy"
                  priority={false}
                />
              )}

              <h2 className="text-md font-semibold leading-tight mb-1 break-words">
                {first_name || title.rendered} {last_name}
              </h2>
              <p className="text-sm font-thin text-gray-600 mb-1">{language}</p>
              <p className="text-sm mb-1 font-thin break-words">
                <a href={`tel:${phone}`} className="hover:text-[#bd9254]">{phone}</a>
              </p>
              {description && (
                <p className="text-sm text-gray-700 px-2">{description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
