import React from "react";


const index = () => {
  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] p-6 bg-white bg-[url(/images/seminaire.png)] bg-cover bg-center">
          <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
            Séjour <span className="md:text-9xl text-white">haut de gamme</span>{" "}
            en haute savoie
            {/* <span className="md:text-8xl text-white"></span> */}
          </h1>

          <div className="absolute inset-0  bg-gradient-to-bl from-transparent to-black/60 z-1"></div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-12">
        content
      </div>
    </>
  );
};

export default index;
