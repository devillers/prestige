'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PhotoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // In Next.js 15.0.2, we use the body as the application root element
    Modal.setAppElement(document.body);
  }, []);

  const photos = [
    '/images/remy/06_Chalet.Remy_Chambre2.jpg',
    '/images/remy/013_Chalet.Remy_Chambre4.jpg',
  ];

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-40 object-cover cursor-pointer rounded-lg"
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="relative w-full max-w-3xl mx-auto outline-none"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-2"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          <FaTimes />
        </button>
        <div className="flex items-center justify-center">
          <button onClick={goToPrevious} className="text-white text-3xl  ">
            <FaArrowLeft />
          </button>
          <img
            src={photos[currentIndex]}
            alt={`Lightbox Image ${currentIndex + 1}`}
            className="max-h-[80vh] object-contain rounded-lg"
          />
          <button onClick={goToNext} className="text-white text-3xl ">
            <FaArrowRight />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PhotoGallery;
