'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import photosData from '../../data/photo.json';

const PhotoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photosData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photosData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleShowAllPhotos = () => {
    setShowAllPhotos(!showAllPhotos);
  };

  return (
    <div className="p-6">
      <h3 className="text-lg uppercase py-4">photo gallery...</h3>

      {/* Custom CSS Grid Layout with Limited to One Row on Mobile */}
      <div
        className={`grid gap-3 ${
          showAllPhotos ? '' : 'max-h-[150px] overflow-hidden'
        } grid-cols-2 sm:grid-cols-6`}
      >
        {photosData.map((photo, index) => (
          <div
            key={photo.id}
            className={`relative overflow-hidden cursor-pointer rounded-sm ${
              index % 6 === 0
                ? 'sm:col-span-2 sm:row-span-1'
                : index % 5 === 0
                ? 'sm:col-span-2 sm:row-span-1'
                : 'col-span-1 row-span-1'
            }`}
            onClick={() => openModal(index)}
          >
            <img
              src={photo.url}
              alt={photo.description}
              className="w-full h-full object-cover"
            />
            {/* Description in the Bottom Left Corner */}
            <div className="hidden absolute bottom-0 left-0 w-auto bg-black bg-opacity-60 rounded rounded-tl-none rounded-br-none  text-white text-[10px] px-2 py-1 sm:flex sm:flex-col">
              <span className="text-sm">{photo.chaletName}</span>
              <span>{photo.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      <button
        onClick={toggleShowAllPhotos}
        className="flex items-center gap-2 px-4 py-2 text-[12px] border-[#eedec6] border text-gray-800 rounded-sm uppercase mt-4 transition duration-300 ease-in-out hover:bg-[#eedec6] hover:text-white"
      >
        {showAllPhotos ? 'Show Less' : 'Show More'}
      </button>

      {/* Lightbox Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="relative w-full max-w-3xl mx-auto outline-none"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          <FaTimes />
        </button>
        <div className="relative flex items-center justify-center">
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
          >
            <FaArrowLeft />
          </button>
          <img
            src={photosData[currentIndex].url}
            alt={photosData[currentIndex].description}
            className="max-h-[80vh] object-contain rounded-md"
          />
          <button
            onClick={goToNext}
            className="absolute right-4 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
          >
            <FaArrowRight />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PhotoGallery;
