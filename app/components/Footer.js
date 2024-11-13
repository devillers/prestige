import React from 'react';

const Footer = () => {
  return (
    <footer className=" py-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <h3 className="font-bold">Care Concierge Properties</h3>
          <p className="text-[10px] text-gray-600 mt-2">
            Care Concierge & Properties est une société de gestion immobilière
            et mobilière spécialisée dans la conciergerie.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Pages</h3>
          <ul className="text-[10px] text-gray-600 space-y-2 mt-2">
            <li>Taris</li>
            <li>Réservations Directes</li>
            <li>À propos de nous</li>
            <li>Contact</li>
            <li>La Collection</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Services</h3>
          <ul className="text-[10px] text-gray-600 space-y-2 mt-2">
            <li>Gestion Immobilière</li>
            <li>Conciergerie</li>
            <li>Agence de Location</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Zones que nous desservons</h3>
          <ul className="text-[10px] text-gray-600 space-y-2 mt-2">
            <li>Argentière - 74400</li>
            <li>Chamonix - 74400</li>
            <li>Les Houches - 74310</li>
            <li>Saint Gervais les Bains - 74170</li>
            <li>Megève - 74120</li>
            <li>Sallanches - 74700</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-[10px] mt-8">
        <p>Informations Légales</p>
        <button className="text-gray-600 hover:underline">Français</button>
      </div>
    </footer>
  );
};

export default Footer;
