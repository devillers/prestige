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
      {/* Title, Content, and Image Section - Horizontal Alignment */}
      <section className="w-screen h-screen flex items-center p-10 text-slate-500">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Title and Content */}
          <div className="flex-1 p-5 md:p-10">
            <h2 className="text-5xl md:text-8xl font-bold">{title}</h2>
            <p className="text-2xl md:text-4xl mt-4">{content}</p>
          </div>
          
          {/* Image */}
          {image && (
            <div className="flex-1 p-5 md:p-10 flex items-center justify-center">
              <Image
                src={image}
                alt={`${title} Image`}
                width={600}
                height={400}
                className="object-contain"
              />
            </div>
          )}
        </div>
      </section>

      {/* Special Component Section */}
      {SpecialComponent && (
        <section className="w-screen h-screen flex items-center justify-center">
          <SpecialComponent />
        </section>
      )}
    </div>
  );
};

export default SectionRenderer;
