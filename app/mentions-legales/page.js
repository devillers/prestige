import React from "react";

export default function MentionsLegales() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-lg font-light mb-8 italic">Mentions Légales</h1>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">1. Éditeur du site</h2>
        <ul className="list-inside text-sm">
          <li>
            Nom de l'entreprise : <strong>Care Concierge</strong>
          </li>
          <li>Statut juridique : SASU</li>
          <li>Adresse : 74170 Saint-Gervais-les-Bains, France</li>
          <li>Email : contact@careconcierge.fr</li>
          <li>Téléphone : +33 6 00 00 00 00</li>
          <li>SIRET : 123 456 789 00012</li>
          <li>Directeur de la publication : M. David Devillers</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">2. Hébergeur</h2>
        <ul className=" list-inside text-sm">
          <li>
            Hébergeur : <strong>Hostinger International Ltd.</strong>
          </li>
          <li>
            Adresse : Lumiel Building, 4ᵉ étage, 61 Lordou Vironos Street, 6023
            Larnaca, Cyprus
          </li>
          <li>
            Email conformité : compliance@hostinger.com / abuse@hostinger.com
          </li>
          <li>
            Site web :{" "}
            <a
              href="https://www.hostinger.fr"
              className="text-blue-600 underline"
            >
              www.hostinger.fr
            </a>
          </li>
        </ul>

        <ul className=" list-inside text-sm mt-2">
          <li>
            Société de déploiement : <strong>Vercel Inc.</strong>
          </li>
          <li>Siège social : San Francisco, CA, USA</li>
          <li>
            Site web :{" "}
            <a
              href="https://www.vercel.com"
              className="text-blue-600 underline"
            >
              www.vercel.com
            </a>
          </li>
        </ul>

        {/* Optionnel si besoin d’une entité européenne */}
        <ul className=" list-inside text-sm mt-2">
          <li>
            Entité Europe : <strong>Vercel UK Ltd.</strong>
          </li>
          <li>
            Adresse UK : 4ᵉ étage, St James House, St James Square, Cheltenham,
            GL50 3PR, England
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">
          3. Propriété intellectuelle
        </h2>
        <p className="text-sm">
          L'ensemble du site, son contenu (textes, images, logo, charte
          graphique, etc.) est la propriété exclusive de Care Concierge, sauf
          mentions contraires, et est protégé par le Code de la propriété
          intellectuelle. Toute reproduction ou représentation sans autorisation
          est interdite.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">4. Données personnelles</h2>
        <p className="text-sm">
          Pour consulter notre politique de confidentialité, veuillez consulter
          la page dédiée :{" "}
          <a
            href="/politique-de-confidentialite"
            className="text-blue-600 underline"
          >
            Politique de confidentialité
          </a>
          .
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">5. Cookies</h2>
        <p className="text-sm">
          Le site utilise des cookies pour améliorer l'expérience utilisateur et
          mesurer l'audience. Un bandeau de consentement est affiché à
          l'ouverture du site.
        </p>
      </div>

      <div>
        <h2 className="text-lg  mb-2">6. Loi applicable</h2>
        <p className="text-sm">
          Le présent site est soumis au droit français. En cas de litige, les
          tribunaux français seront seuls compétents.
        </p>
      </div>
    </div>
  );
}
