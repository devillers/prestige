// app/repertoire/not-found.js

export default function NotFound() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-600 p-8 text-center">
        <h1 className="text-6xl font-thin mb-4">404</h1>
        <h2 className="text-2xl font-light mb-2">Logement introuvable</h2>
        <p className="text-sm max-w-md">
          Le logement que vous cherchez n’est pas disponible ou a été supprimé.<br />
          Retournez au{" "}
          <a href="/repertoire" className="text-[#bd9254] underline">
            répertoire
          </a>.
        </p>
      </div>
    );
  }
  