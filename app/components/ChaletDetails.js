// components/ChaletDetails.js

import React from 'react';
import Image from 'next/image';
import { FaSwimmer, FaSpa, FaFilm, FaWifi, FaUsers } from 'react-icons/fa';
import chaletData from '../../data/chaletremy.json'; // Import JSON data

// Icon mapping based on JSON keys
const iconMapping = {
  FaSwimmer: FaSwimmer,
  FaSpa: FaSpa,
  FaFilm: FaFilm,
  FaWifi: FaWifi,
};

const ChaletDetails = () => {
  return (
    <section className="container mx-auto max-w-[800px] shadow-sm p-4 mt-10 md:mt-[200px]">
      <h1 className="text-5xl md:text-6xl font-bold text-[#eec993]">
        {chaletData.title.split(' ')[0]}{' '}
        <span className="text-gray-800">{chaletData.title.split(' ')[1]}</span>
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-8 mt-[100px]">
        <div className="md:w-2/4 mb-8 md:mb-0">
          <Image
            src={chaletData.mainImage}
            alt="Chalet Floor Plan"
            layout="responsive"
            width={500}
            height={300}
            className="w-full"
          />
        </div>
        <div className="md:w-2/4 space-y-4">
          <h2 className="text-4xl font-bold">{chaletData.chaletName}</h2>
          <div className="flex flex-row">
            <p className="text-xl text-gray-700 font-semibold">
              {chaletData.location}
            </p>
            <p className="ml-2 text-gray-600 flex items-center">
              <FaUsers className="text-[#eec993] mr-2" />{' '}
              {chaletData.guestCapacity}
            </p>
          </div>

          <p className="text-gray-700 text-sm">{chaletData.description}</p>
          <div className="flex space-x-4 text-gray-600">
            {chaletData.features.map((feature, index) => {
              const IconComponent = iconMapping[feature.icon];
              return (
                <div key={index} className="flex items-center space-x-1">
                  <IconComponent />
                  <span className="sr-only">{feature.label}</span>{' '}
                  {/* Accessibility */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-8 rounded-sm">
        {chaletData.galleryImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Gallery image ${index + 1}`}
            layout="responsive"
            width={500}
            height={300}
            className="w-full rounded-sm"
          />
        ))}
      </div>
    </section>
  );
};

export default ChaletDetails;
