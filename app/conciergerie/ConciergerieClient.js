"use client";

import Conciergerie_Module from "../components/Conciergerie_Module";
import StructuredDataConciergerie from "./StructuredDataConciergerie";

export default function ConciergerieClient() {
  return (
    <>
      <StructuredDataConciergerie />
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/conciergerie.webp)] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/40 z-0" />
          <h1 className=" uppercase font-bold max-w-[900px] p-6 z-20">
            <span className="md:text-6xl text-6xl text-white/70 ">
              une conciergerie
            </span>
            <br />
            <span className="md:text-8xl text-6xl text-white ">
              {" "}
              d'exception
            </span>
            <br />
            <span className="md:text-7xl text-6xl text-white/70 ">
              {" "}
              pensée pour{" "}
            </span>
            <br />
            <span className="md:text-8xl text-6xl text-white ">          vous </span>
            <br />
          </h1>
        </div>
      </section>
      <section>
        <div className="max-w-6xl mx-auto p-6 mb-12">
          <h2 className="">
            <span className="text-5xl md:text-6xl uppercase font-thin">
              des services sur
            </span>
            <br />
            <span className="text-4xl md:text-5xl uppercase font-thin">
              mesure pour sublimer vos
            </span>
            <br />
            <span className="text-4xl md:text-5xl uppercase font-thin">
              experiences aplines et
            </span>
            <br />
            <span className="text-3xl md:text-4xl uppercase font-thin">
              celles de vos locataires
            </span>
          </h2>
          <div className="text-gray-800 max-w-6xl mx-auto p-6 flex flex-col items-center">
            <p className="text-center text-black  text-md font-thin my-10 z-20 leading-8 italic">
              Pour répondre aux attentes d’une clientèle exigeante, votre
              conciergerie en Haute-Savoie propose des services
              ultra-personnalisés, adaptés aux atouts exceptionnels de la
              région.
            </p>
          </div>
        </div>

        <Conciergerie_Module />
      </section>
    </>
  );
}
