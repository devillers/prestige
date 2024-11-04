//components/AccommodationCard
import React, { useState } from 'react';

const AccommodationCard = ({ accommodation }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => {
      const newIndex = (prev + 1) % accommodation.images.length;
      console.log(`Next image index for ${accommodation.name}:`, newIndex);
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentImage((prev) => {
      const newIndex =
        (prev - 1 + accommodation.images.length) % accommodation.images.length;
      console.log(`Previous image index for ${accommodation.name}:`, newIndex);
      return newIndex;
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Image Slider */}
      <div className="relative">
        <img
          src={accommodation.images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded"
        >
          ›
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {accommodation.name}
        </h2>
        <p className="text-gray-600 mt-2">{accommodation.description}</p>
        <a
          href={accommodation.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default AccommodationCard;
