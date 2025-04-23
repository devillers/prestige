//app/components/Conciergerie_Module.js

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ServiceSection() {
  const [images, setImages] = useState([]);
  const [paragraphs, setParagraphs] = useState({ para_1: "", para_2: "" });

  useEffect(() => {
    async function fetchConciergerie() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/conciergerie?per_page=1`
        );
        const data = await res.json();
        if (data.length > 0) {
          const post = data[0];
          setImages(post.images || []);
          setParagraphs(post.paragraphes || {});
        }
      } catch (error) {
        console.error("Erreur chargement conciergerie:", error);
      }
    }
    fetchConciergerie();
  }, []);

  return (
    <section className="bg-neutral-50">
      <div className=" text-gray-800 max-w-6xl mx-auto p-4">
        <ul className="py-4 ">
          <li>   <h1 className="text-6xl md:text-8xl uppercase font-thin"> nos services  </h1></li>
          <li>   <h2 className=" text-4xl md:text-6xl uppercase font-thin">  de conciergerie</h2></li>
          <li>   <h3 className="text-4xl md:text-6xl uppercase  font-thin">  exclusifs</h3></li>
        </ul>
     
        <div className=" mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-12">
          <div className="col-span-1 md:col-start-1 md:col-span-2 flex items-center justify-center p-2 text-center font-thin text-sm md:text-base">
            <p>{paragraphs.para_1}</p>
          </div>

          {/* Galerie d'images avec texte dynamique */}
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[1/1] w-full overflow-hidden group"
            >
              <Image
                src={img.url}
                alt={img.alt || `Image ${i + 1}`}
                fill
                priority={i === 0} // 👈 priorité sur la 1re image
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gray-900/80 select-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center px-2 ">
                <span className="text-white uppercase text-xl font-bold tracking-wide left-0 pl-4 break-normal">
                  {img.text}
                </span>
              </div>
            </div>
          ))}

          {/* Paragraphe 2 */}
          <div className="col-span-1 md:col-start-3 md:col-span-3 flex items-center justify-center p-2 text-center font-thin text-sm md:text-base">
            <p>{paragraphs.para_2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
