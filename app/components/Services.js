// components/Services.js

import React from 'react';

const Services = () => {
  return (
    <div className="w-full h-full bg-gray-900 text-white flex flex-col items-end justify-center p-10">
      <div className="container max-w-6xl mx-auto flex justify-end">
        <div className="text-right">
          <h1 className="text-4xl font-bold text-slate-600 mb-4">
            Our Services
          </h1>
          <ul className="text-xl space-y-4">
            <li>Luxury Chalet Rentals</li>
            <li>Private Chef and Catering</li>
            <li>Ski Equipment Rentals</li>
            <li>Helicopter Transfers</li>
            <li>Exclusive Event Planning</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
