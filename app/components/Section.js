// components/Section.js
import React from 'react';

export default function Section({ section, isActive }) {
  return (
    <section
      id={section.id}
      className={`section p-10 transition-transform-opacity duration-500 ease-in-out ${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        transform: isActive ? 'translateX(0)' : 'translateX(100%)',
      }}
    ></section>
  );
}
