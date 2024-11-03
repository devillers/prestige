// pages/Page.js

'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SectionRenderer from './components/SectionRenderer';

export default function Page() {
  const [activeSection, setActiveSection] = useState(0);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch('/api/sections');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  const handleMenuClick = (index) => {
    setActiveSection(index);
  };

  return (
    <div className="App">
      <Header onSelect={handleMenuClick} activeSection={activeSection} />
      <div className="main-content mt-16 overflow-hidden">
        <div
          className="slider flex transition-transform duration-500"
          style={{
            transform: `translateX(-${activeSection * 100}vw)`,
          }}
        >
          {sections.map((section, index) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
