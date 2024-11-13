import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-zinc-950 p-10">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Logo and Description */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h1 className="text-md font-bold mb-2">
            CARE<span className="ml-1 font-normal">CONCIERGE PROPERTIES</span>
          </h1>
          <p className="text-[10px] text-pretty leading-5">
            CARE CONCIERGE & PROPERTIES EST UNE SOCIÉTÉ DE GESTION IMMOBILIÈRE
            ET IMMOBILIÈRE SPÉCIALISÉE DANS LA CONCIERGERIE. NOUS PROPOSONS DES
            SERVICES DE GESTION COURT TERME ET DE GESTION LONG TERME À CHAMONIX,
            LES HOUCHES ET SAINT-GERVAIS-LES-BAINS.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-2xl">
              <i className="fas fa-phone-alt"></i>
            </a>
            <a href="#" className="text-2xl">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" className="text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-2xl">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="#" className="text-2xl">
              <i className="fab fa-google"></i>
            </a>
          </div>
        </div>

        {/* Pages */}
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <h3 className="font-bold mb-4">PAGES</h3>
          <ul className="space-y-2 text-[10px]">
            <li>
              <a href="#">Tarifs</a>
            </li>
            <li>
              <a href="#">Réservations Directes</a>
            </li>
            <li>
              <a href="#">À propos de nous</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">La Collection</a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <h3 className="font-bold mb-4">SERVICES</h3>
          <ul className="space-y-2 text-[10px]">
            <li>Gestion Immobilière</li>
            <li>Courte/Longue Durée</li>
            <li>Agence de Location Immobilière</li>
            <li>Agence de Location de Maison de Vacances</li>
            <li>Évaluer</li>
            <li>Conciergerie</li>
          </ul>
        </div>

        {/* Zones Que Nous Servons */}
        <div className="w-full md:w-1/5">
          <h3 className="font-bold mb-4">ZONES QUE NOUS DESSERVONS</h3>
          <ul className="space-y-2 text-[10px]">
            <li>Argentière - 74400</li>
            <li>Chamonix - 74400</li>
            <li>Les Houches - 74310</li>
            <li>Servoz - 74310</li>
            <li>Saint-Gervais-les-Bains - 74170</li>
            <li>Megève - 74120</li>
            <li>Sallanches - 74170</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto mt-8 flex justify-between text-sm">
        <a href="#" className="font-bold">
          INFORMATIONS LÉGALES
        </a>
        <div>
          <select className="bg-transparent border border-zinc-950 rounded px-2 py-1">
            <option>Français</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
