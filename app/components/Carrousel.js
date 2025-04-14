// 'use client';

// import { useEffect, useRef, useState } from "react";

// const images = [
//   { id: 1, src: "/images/remy/pic1.jpg", alt: "Image 1" },
//   { id: 2, src: "/images/remy/pic2.jpg", alt: "Image 2" },
//   { id: 3, src: "/images/remy/pic3.jpg", alt: "Image 3" },
//   { id: 4, src: "/images/remy/pic4.jpg", alt: "Image 4" },
//   { id: 5, src: "/images/remy/pic5.jpg", alt: "Image 5" },
// ];

// export default function Carousel() {
//   const containerRef = useRef(null);
//   const [itemsPerView, setItemsPerView] = useState(1);
//   const [slideWidth, setSlideWidth] = useState(0);
//   const [startIndex, setStartIndex] = useState(0);

//   useEffect(() => {
//     const updateLayout = () => {
//       if (containerRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         const newItemsPerView = window.innerWidth < 768 ? 1 : 3;
//         setItemsPerView(newItemsPerView);
//         setSlideWidth(containerWidth / newItemsPerView);
//       }
//     };

//     updateLayout();
//     window.addEventListener("resize", updateLayout);
//     return () => window.removeEventListener("resize", updateLayout);
//   }, []);

//   const maxIndex = images.length - itemsPerView;

//   const handlePrev = () => {
//     setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//   };

//   const handleNext = () => {
//     setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//   };

//   return (
//     <div className="w-full max-w-[90%] md:max-w-[800px] mx-auto" ref={containerRef}>
//       <div className="flex justify-between items-center mb-2">
//         <button onClick={handlePrev} className="text-2xl px-2">{"<"}</button>
//         <button onClick={handleNext} className="text-2xl px-2">{">"}</button>
//       </div>

//       <div className="relative overflow-hidden w-full">
//         <div
//           className="flex transition-transform duration-300"
//           style={{
//             transform: `translateX(-${startIndex * slideWidth}px)`,
//             width: `${images.length * slideWidth}px`,
//           }}
//         >
//           {images.map((img) => (
//             <div
//               key={img.id}
//               style={{ width: `${slideWidth}px` }}
//               className="p-1"
//             >
//               <div className="w-full aspect-[4/5] relative rounded overflow-hidden">
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % images.length)
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)
 
  return (
    <div className="relative w-full h-full">
      <Image
        src={images[current].url}
        alt={images[current].alt || 'image'}
        fill
        className="object-cover rounded-t-lg"
      />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 h-10 w-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">‹</button>
          <button onClick={next} className="absolute right-4 h-10 w-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">›</button>
        </>
      )}
    </div>
  )
}
