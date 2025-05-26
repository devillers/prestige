//app/componemts/repertoire-components/PortfolioCard.js

"use client";

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineEmojiPeople, MdMeetingRoom } from "react-icons/md";
import { PiBathtubFill } from "react-icons/pi";
import { FaRegSquareFull } from "react-icons/fa6";

export default function PortfolioCard({
  item,
  allImages,
  currentIndex,
  onPrev,
  onNext,
  onVoirPlus,
}) {
  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden min-h-[350px] group">
      {/* Image + Carousel */}
      <div className="w-full h-[300px] relative overflow-hidden">
        <img
          src={allImages[currentIndex].url}
          alt={allImages[currentIndex].alt}
          className="object-cover w-full h-full transition-all duration-300"
        />
        {allImages.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full p-2"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full p-2"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Infos principales */}
      <div className="p-3 flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-2 text-[12px] font-light uppercase text-gray-500 text-center">
          <div className="flex flex-col items-center gap-1">
            <FaRegSquareFull className="text-lg" />
            {item.surface} m²
          </div>
          <div className="flex flex-col items-center gap-1">
            <MdOutlineEmojiPeople className="text-lg" />
            {item.capacity}
          </div>
          <div className="flex flex-col items-center gap-1">
            <MdMeetingRoom className="text-lg" />
            {item.bedrooms}
          </div>
          <div className="flex flex-col items-center gap-1">
            <PiBathtubFill className="text-lg" />
            {item.bathrooms}
          </div>
        </div>
      </div>

      {/* Drawer hover */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-4 py-6 transition-all duration-500 ease-in-out translate-y-[95%] group-hover:translate-y-0 z-20">
        <div className="text-sm text-gray-800 font-light">
          <h3
            className="text-base font-semibold mb-2"
            dangerouslySetInnerHTML={{
              __html: item.title?.rendered || item.title,
            }}
          />

          {/* Nouvelle rangée : location à gauche, bouton à droite */}
          <div className="flex justify-between items-center mb-1">
            {item.location && <p>{item.location}</p>}

            <button
              onClick={() => onVoirPlus(item.slug)}
              className="border border-[#bd9254] text-[#bd9254] px-2 py-1 rounded-full text-[10px] uppercase hover:bg-[#bd9254] hover:text-white transition"
            >
              voir +
            </button>
          </div>

          {item.reference && (
            <p className="text-[#bd9254] text-[10px] uppercase">
              {item.reference}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
