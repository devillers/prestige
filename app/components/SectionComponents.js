// components/SectionComponents.js

import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('./Contact'));
const Services = dynamic(() => import('./Services'));
const AccommodationList = dynamic(() => import('./AccommodationList'));

const SectionComponents = {
  contact: Contact,
  services: Services,
  accommodationlist: AccommodationList, // Changed from 'accommodationList'
};

export default SectionComponents;
