"use client";

import Conciergerie_Module from "../components/Conciergerie_Module";

export default function ConciergerieClient() {
  return (
    <>
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
            <h1 className="text-6xl md:text-8xl uppercase font-thin">
              {" "}
              nos services{" "}
            </h1>
          </li>
          <li>
            {" "}
            <h2 className=" text-4xl md:text-6xl uppercase font-thin">
              {" "}
              de conciergerie
            </h2>
          </li>
          <li>
            {" "}
            <h3 className="text-4xl md:text-6xl uppercase  font-thin">
              {" "}
              exclusifs
            </h3>
          </li>
        </ul>
        <p className="font-thin mt-10 text-sm leading-7 text-center md:text-left">
          Chamonix, Megève ou Saint-Gervais, notre équipe vous accompagne dans la gestion de votre propriété ou l’organisation d’événements d’exception. Mariage, séminaire ou conciergerie locative : chaque demande est traitée avec rigueur, discrétion et un sens aigu du détail.
        </p>
      </div>
      
        <Conciergerie_Module />
      </section>
    </>
  );
}
