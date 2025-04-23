'use client';

import Conciergerie_Module from "../components/Conciergerie_Module";

export default function ConciergerieClient() {
  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto md:justify-center flex flex-col md:min-h-[640px] p-6 bg-white bg-[url(/images/conciergerie.png)] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/40 z-0" />
          <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 uppercase z-20">
            UNE CONCIERGERIE D’EXCEPTION <span className="md:text-9xl text-white">PENSÉE</span>{' '}
            <span className="md:text-7xl text-white">POUR VOUS</span>
          </h1>
        </div>
      </section>

      <Conciergerie_Module />
    </>
  );
}
