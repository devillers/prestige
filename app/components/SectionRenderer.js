// components/SectionRenderer.js

import React from 'react';
import Image from 'next/image';
import SectionComponents from './SectionComponents';

const SectionRenderer = ({ section }) => {
  const { component, title, content, image } = section;
  const componentKey = component ? component.toLowerCase() : null;
  const SpecialComponent = componentKey
    ? SectionComponents[componentKey]
    : null;

  return (
    <div>
      {/* Title and Content Section - Full Height */}
      <section className="w-screen h-screen flex items-center justify-center p-10 text-slate-500">
        <div className="text-center">
          <h2 className="text-5xl md:text-8xl font-bold">{title}</h2>
          <p className="text-2xl md:text-4xl mt-4">{content}</p>
        </div>
      </section>

      {/* Special Component or Image Section */}
      {SpecialComponent ? (
        <section className="w-screen h-screen flex items-center justify-center">
          <SpecialComponent />
        </section>
      ) : (
        image && (
          <section className="w-screen h-screen flex items-center justify-center">
            <Image
              src={image}
              alt={`${title} Image`}
              width={600}
              height={400}
              className="object-contain"
            />
          </section>
        )
      )}
    </div>
  );
};

export default SectionRenderer;
