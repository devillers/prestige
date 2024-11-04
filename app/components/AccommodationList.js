// components/AccommodationList.js

import React from 'react';
import AccommodationCard from './AccommodationCard';
import accommodations from '../../data/accommodation.json';

const AccommodationList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {accommodations.map((accommodation, index) => (
        <AccommodationCard
          key={accommodation.id || index} // Fallback to index if `id` is not present
          accommodation={accommodation}
        />
      ))}
    </div>
  );
};

export default AccommodationList;
