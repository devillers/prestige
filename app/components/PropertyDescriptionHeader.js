//app/components/PropertyDescriptionHeader.js

"use client";

import React from "react";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";
import { PiBathtubFill } from "react-icons/pi";
import { FaRegSquareFull } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";

const PropertyDescriptionHeader = ({ property, booking_url }) => {
  if (!property) return null;

  console.log(
    "Featured image URL:",
    property._embedded?.["wp:featuredmedia"]?.[0]?.source_url
  );

  const { title, reference, surface, capacity, bedrooms, bathrooms, reviews } =
    property;

  const backgroundImage =
    property._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/images/default-bg.webp";

  const rating = parseFloat(reviews) || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const ratingStars = "★".repeat(fullStars) + (hasHalfStar ? "½" : "");
  const guestsText = capacity ? `${capacity} Guests` : "—";
  const capacities = property.capacity;
  const ref = property.reference;

  return (
    <section className="flex justify-center">
      <div className="relative max-w-auto w-full">
        <div
          className="relative h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
          <div className="absolute inset-0 rounded-sm flex flex-col justify-center items-start px-6  bg-gradient-to-bl from-transparent to-black/40 z-1">
            {reviews && (
              <div className="text-yellow-400 text-xl flex items-center">
                <span>{ratingStars}</span>
                <span className="ml-4 text-[12px]">{rating.toFixed(1)}</span>
              </div>
            )}

            <h1 className="text-white text-7xl uppercase font-bold flex flex-col">
              {title?.rendered?.split(" ")[0]}
              <span>{title?.rendered?.split(" ").slice(1).join(" ")}</span>
            </h1>

            <p className="text-white text-[12px] py-3">
              Chalet {property.capacity || "—"} PAX
            </p>

            {reference && (
              <p className="text-white text-[12px] ">REF : {ref}</p>
            )}

            <div
              className="w-full md:w-auto flex flex-wrap gap-4 py-4 relative mt-6 justify-evenly text-white border-dashed border-t"
              style={{ borderColor: "rgba(255, 255, 255, 0.35)" }}
            >
              <div className="flex flex-col">
                <p className="text-[20px] uppercase opacity-90 md:mr-4 ">
                  {" "}
                  <MdOutlineEmojiPeople />
                </p>
                <div className="flex flex-col mt-3">
                  <p className="text-sm">{property.capacity || "—"}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[20px] md:mr-4 uppercase opacity-90">
                  <MdMeetingRoom />
                </p>
                <p className="text-sm mt-3">{bedrooms || "—"}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[20px] md:mr-4  uppercase opacity-90">
                  <PiBathtubFill />
                </p>
                <p className="text-sm mt-3">{bathrooms || "—"}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[20px] md:mr-4  uppercase opacity-90">
                  <FaRegSquareFull />
                </p>
                <p className="text-sm mt-3">
                  {surface || "—"}
                  <span> m2</span>
                </p>
              </div>
              <div className="flex-col hidden sm:flex">
                <p className="text-[20px] md:mr-4  uppercase opacity-80">
                  <MdOutlinePets />
                </p>
                <p className="text-sm mt-3">No</p>
              </div>
            </div>
          </div>

          {/* <a
            href="#picture"
            className="absolute right-10 bottom-10 border border-white hover:border-[#bd9254] uppercase text-white p-2 rounded-full text-[12px] opacity-80 hover:opacity-100 transition duration-300 ease-in-out z-20"
          >
            voir les photos
          </a> */}

          {booking_url && (
            <a
              href={booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-10 bottom-10 items-center justify-center px-5 py-2 bg-gray-900/60 font-thin border border-white text-[12px] uppercase text-white rounded-full transition-all duration-200 hover:bg-[#bd9254]/60 hover:text-white active:scale-95 z-20"
            >
              Réserver cette propriété
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyDescriptionHeader;
