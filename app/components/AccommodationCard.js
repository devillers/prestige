// components/AccommodationCard.js

import React, { useState, useEffect } from 'react';

const AccommodationCard = ({ accommodation }) => {
  const { images, name, description, link } = accommodation;

  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [validImages, setValidImages] = useState([]);

  // Preload images and filter out any that fail to load
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = [];

      for (let src of images) {
        try {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => reject();
          });
          loadedImages.push(src);
        } catch (error) {
          console.error(`Failed to load image: ${src}`);
        }
      }

      if (loadedImages.length === 0) {
        console.warn(`No valid images found for accommodation: ${name}`);
      }

      setValidImages(loadedImages);
    };

    preloadImages();
  }, [images, name]);

  // Handle Next Image with Transition
  const nextImage = () => {
    if (validImages.length <= 1) return; // No need to navigate if only one image
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % validImages.length);
      setIsTransitioning(false);
    }, 500); // Duration should match the CSS transition
  };

  // Handle Previous Image with Transition
  const prevImage = () => {
    if (validImages.length <= 1) return; // No need to navigate if only one image
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(
        (prev) => (prev - 1 + validImages.length) % validImages.length
      );
      setIsTransitioning(false);
    }, 500); // Duration should match the CSS transition
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [validImages.length]);

  // Preload Images for Smoother Transitions
  useEffect(() => {
    validImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [validImages]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Image Slider */}
      <div className="relative">
        {validImages.length > 0 ? (
          <img
            src={validImages[currentImage]}
            alt={`Slide ${currentImage + 1} - ${name}`}
            className={`w-full h-64 object-cover transition-opacity duration-500 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            onError={(e) => {
              console.error(
                `Error loading image: ${validImages[currentImage]}`
              );
              e.target.src = '/images/accommodation/placeholder.jpg'; // Path to a placeholder image
            }}
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span>No images available</span>
          </div>
        )}
        {/* Previous Button */}
        {validImages.length > 1 && (
          <button
            onClick={prevImage}
            aria-label="Previous Image"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-75 hover:opacity-100 transition-opacity"
          >
            ‹
          </button>
        )}
        {/* Next Button */}
        {validImages.length > 1 && (
          <button
            onClick={nextImage}
            aria-label="Next Image"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-75 hover:opacity-100 transition-opacity"
          >
            ›
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-lg text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-[#293b4c] text-white rounded hover:bg-[#bd9254] transition-colors"
        >
          voir
        </a>
      </div>
    </div>
  );
};

export default AccommodationCard;
