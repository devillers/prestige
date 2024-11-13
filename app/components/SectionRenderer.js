// components/SectionRenderer.js

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SectionComponents from './SectionComponents';

const SectionRenderer = ({ section }) => {
  const { component, title, content, image } = section;
  const componentKey = component ? component.toLowerCase() : null;
  const SpecialComponent = componentKey
    ? SectionComponents[componentKey]
    : null;

  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    console.log(`Rendering section: ${title} with component: ${componentKey}`);
    setFadeClass('fade-out');
    const timeoutId = setTimeout(() => {
      setFadeClass('fade-in');
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [section]);

  return (
    <div key={section.title} className={`transition-container ${fadeClass}`}>
      {/* Title, Content, and Image Section with Background Image */}
      <section className="w-screen flex items-center text-slate-500">
        <div className="flex flex-col mt-[100px] md:flex-row items-center justify-between w-full bg-[url('/images/womanHeader.jpeg')] bg-cover bg-center bg-no-repeat">
          {/* Title and Content */}
          <div className="h-[450px]">
            <h2 className="text-7xl sm:text-5xl md:text-8xl font-bold">
              {title}
            </h2>
            <p className="text-lg sm:text-2xl md:text-4xl mt-4">{content}</p>
          </div>

          {/* Image - Hidden on medium screens */}
          {/* {image && (
            <div className="hidden md:flex flex-1 p-5 md:p-10 items-center justify-center">
              <Image
                src={image}
                alt={`${title} Image`}
                width={600}
                height={400}
                className="object-contain"
              />
            </div>
          )} */}
        </div>
      </section>

      {/* Special Component Section */}
      {SpecialComponent ? (
        <section className="mx-auto  grid-cols-4">
          <SpecialComponent />
        </section>
      ) : (
        <div className="text-red-500"></div>
      )}
    </div>
  );
};

export default SectionRenderer;
