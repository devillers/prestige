//app/conciergerie/ConciergrieClient.js

"use client";

import ServiceSection from "../components/Conciergerie_Module";

export default function ConciergerieClient() {
  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto flex flex-col items-center justify-center min-h-[640px] p-6 bg-white bg-[url(/images/conciergerie.webp)] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/40 z-0" />
          <ul className="z-10 space-y-2 text-center">
            <li>
              <h1 className="text-5xl md:text-7xl uppercase text-white font-bold">
                UNE CONCIERGERIE
              </h1>
            </li>
            <li>
              <h2 className="text-6xl md:text-7xl uppercase text-white font-bold">
                D’EXCEPTION
              </h2>
            </li>
            <li>
              <h2 className="text-6xl md:text-8xl uppercase text-white/70 font-bold">
                PENSÉE
              </h2>
            </li>
            <li>
              <h3 className="text-6xl md:text-7xl uppercase text-white/70 font-bold">
                POUR VOUS
              </h3>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto p-6 mb-12">
          <ul className="space-y-2 text-center">
            <li>
              <h1 className="text-5xl md:text-6xl uppercase font-thin">
                Conciergerie de Luxe
              </h1>
            </li>
            <li>
              <h2 className="text-4xl md:text-5xl uppercase font-thin">
                Des services sur-mesure
              </h2>
            </li>
            <li>
              <h3 className="text-3xl md:text-4xl uppercase font-thin">
                pour sublimer vos expériences alpines
              </h3>
            </li>
          </ul>
          <p className="mt-10 text-center text-black text-md font-thin leading-8 italic">
            Pour répondre aux attentes d’une clientèle exigeante, votre
            conciergerie en Haute-Savoie propose des services
            ultra-personnalisés, adaptés aux atouts exceptionnels de la région.
          </p>
        </div>

        <ServiceSection />
      </section>
    </>
  );
}
