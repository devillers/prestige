"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";


const PhotoGallery = ({ images = [] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  if (!images.length) return null;

  return (
    <div className="p-4" id="#picture">
      <h3 className="text-2xl uppercase py-2 font-thin">
        Aperçu de la propriété
      </h3>

      {/* Top full image */}
      {images[0] && (
        <div
          className="w-full rounded h-[300px] md:h-[450px] overflow-hidden mb-2 cursor-pointer "
          onClick={() => openModal(0)}
        >
          <img
            src={images[0].url}
            alt={images[0].alt || "Image 1"}
            className="w-full h-full object-cover "
          />
        </div>
      )}

      {/* Grid of next 5 images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.slice(1, 7).map((photo, index) => (
          <div
            key={index + 1}
            className="overflow-hidden rounded cursor-pointer"
            onClick={() => openModal(index + 1)}
          >
            <img
              src={photo.url}
              alt={photo.alt || `Image ${index + 2}`}
              className="w-full h-40 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Voir toutes les photos */}
      {images.length > 6 && (
        <button
          onClick={() => openModal(0)}
                className="inline-flex mt-5 items-center justify-center px-4 h-[30px] font-thin border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95"
        >
          Voir toutes les photos
        </button>
      )}

      {/* Lightbox modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className="
         w-full mx-auto max-h-none outline-none"
        overlayClassName="fixed inset-0 z-50 bg-white overflow-y-auto px-4 py-10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-light mb-8 mt-2">Galerie complète</h2>
          <div className="flex jsustify-between items-center gap-4">
           
            <div className="flex items-center  gap-2 cursor-pointer">
            <IoShareSocialOutline className="text-[20px]" />
            <a className="uppercase text-sm font-thin">partager</a>
            </div>
            <AiOutlineClose
              onClick={closeModal}
              className=" text-[35px] p-2  border-[1px] text-gray-500 z-50 bg-white rounded-full cursor-pointer  shadow"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 auto-rows-[200px] gap-4 max-w-7xl mx-auto">
          {images.map((img, index) => {
            let colSpan = "col-span-2";
            let rowSpan = "row-span-1";
            const mod = index % 6;

            if (mod === 0) {
              colSpan = "col-span-4";
              rowSpan = "row-span-2"; // full-width banner
            } else if (mod === 3) {
              colSpan = "col-span-2";
              rowSpan = "row-span-2"; // tall
            } else if (mod === 4 || mod === 5) {
              colSpan = "col-span-1";
              rowSpan = "row-span-2"; // small fillers
            }

            return (
              <div
                key={index}
                className={`relative ${colSpan} ${rowSpan} overflow-hidden  cursor-pointer`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={img.url}
                  alt={img.alt || `Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default PhotoGallery;
