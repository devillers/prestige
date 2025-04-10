"use client";

export default function NotFoundPage() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat text-white text-center"
      style={{ backgroundImage: "url('/paysage.png')" }}
    >
      {/* Sprite sheet animé du marcheur */}
      {/* <div className="absolute bottom-0 left-10 w-[100px] h-[200px] bg-walker animate-walk z-10" /> */}

      {/* Voile sombre pour contraste */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      {/* Contenu 404 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        <h1 className="text-8xl font-thin mb-4">404</h1>
        <p className="text-2xl mb-8 font-thin">
          Vous semblez suivre le mauvais chemin...
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-[#bd9254] text-white rounded-full text-lg hover:shadow-md transition"
        >
          Retour à l'accueil
        </a>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
      //   @keyframes walk {
      //     from {
      //       background-position: 0% bottom;
      //     }
      //     to {
      //       background-position: 100% bottom;
      //     }
      //   }
      //   .animate-walk {
      //     animation: walk 0.8s steps(8) infinite;
      //   }
      //   .bg-walker {
      //     background-image: url('/sprite-walker.png');
      //     background-repeat: no-repeat;
      //     background-size: 800% auto; /* 8 frames horizontales */
      //     background-position: 0% bottom;
      //   }
      // `}</style>
    </div>
  );
}
