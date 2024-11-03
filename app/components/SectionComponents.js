// components/SectionComponents.js

import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('./Contact'));
const Services = dynamic(() => import('./Services'));

const SectionComponents = {
  contact: Contact,
  services: Services,
  // Add other components as needed
};

export default SectionComponents;
