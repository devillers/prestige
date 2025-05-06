"use client";

import Conciergerie_Module from "../components/Conciergerie_Module";
import StructuredDataConciergerie from './StructuredDataConciergerie';

export default function ConciergerieClient() {
  return (
    <>
     <StructuredDataConciergerie />
       <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/conciergerie.webp)] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/40 z-0" />
          <ul className=" max-w-[660px] z-20 ">
            <li>
              <h1 className="text-5xl md:text-7xl uppercase text-white font-bold ">
                UNE CONCIERGERIE
              </h1>
            </li>
            <li>
              <h2 className="text-6xl md:text-7xl uppercase text-white font-bold ">
                D’EXCEPTION
              </h2>
            </li>
            <li>
              <h2 className="text-6xl md:text-8xl uppercase  text-white/70 font-bold ">
                {" "}
                PENSÉE
              </h2>
            </li>
            <li>
              <h3 className="text-6xl md:text-7xl uppercase text-white/70 font-bold ">
                POUR VOUS
              </h3>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="max-w-6xl mx-auto p-6 mb-12">
          <ul className=" ">
            <li>
              {" "}
              <h1 className="text-5xl md:text-6xl uppercase font-thin">
                {" "}
                Des services sur-mesure
 
              </h1>
            </li>
            <li>
              {" "}
              <h2 className=" text-4xl md:text-5xl uppercase font-thin">
                {" "}
                pour sublimer
              </h2>
            </li>
            <li>
              {" "}
              <h3 className="text-3xl md:text-4xl uppercase  font-thin">
                {" "}
               vos expériences alpines.
              </h3>
            </li>
          </ul>
          <div className="text-gray-800 max-w-6xl mx-auto p-6 flex flex-col items-center">
            <p className="text-center text-black  text-md font-thin my-10 z-20 leading-8 italic">
              Pour répondre aux attentes d’une clientèle exigeante, votre
              conciergerie en Haute-Savoie propose des services
              ultra-personnalisés, adaptés aux atouts exceptionnels de la région.
            </p>
          </div>
        </div>

        <Conciergerie_Module />
      </section>
    </>
  );
}
