import React from 'react';

export default function PolitiqueDeConfidentialite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 font-light">
      <h1 className="text-xl italic mb-8 ">Politique de Confidentialité</h1>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">1. Introduction</h2>
        <p className="text-sm">
          Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos données personnelles lorsque vous naviguez sur notre site.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">2. Responsable du traitement</h2>
        <ul className=" list-inside text-sm">
          <li>Nom : <strong>Care Concierge</strong></li>
          <li>Email : contact@careconcierge.fr</li>
          <li>Adresse : 74300 Les Houches, France</li>
          <li>SIRET : 123 456 789 00012</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">3. Données collectées</h2>
        <p className="text-sm mb-2">Nous pouvons collecter les données suivantes :</p>
        <ul className=" list-inside text-sm">
          <li>Nom, prénom</li>
          <li>Email, téléphone</li>
          <li>Adresse IP</li>
          <li>Données de navigation (via cookies)</li>
          <li>Contenu des formulaires (messages, demandes de réservation, etc.)</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">4. Finalités du traitement</h2>
        <ul className=" list-inside text-sm">
          <li>Répondre aux demandes via formulaire</li>
          <li>Gérer les réservations</li>
          <li>Envoyer des newsletters ou offres si consentement</li>
          <li>Mesurer l’audience du site</li>
          <li>Respecter nos obligations légales</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">5. Base légale</h2>
        <ul className=" list-inside text-sm">
          <li>Consentement explicite</li>
          <li>Exécution d’un contrat</li>
          <li>Intérêt légitime</li>
          <li>Obligation légale</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">6. Durée de conservation</h2>
        <ul className=" list-inside text-sm">
          <li>3 ans pour les prospects</li>
          <li>6 ans pour les données de facturation</li>
          <li>13 mois pour les cookies de mesure d’audience</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">7. Destinataires</h2>
        <p className="text-sm">
          Vos données sont uniquement accessibles par notre équipe interne et nos sous-traitants (hébergeur, emailing, maintenance). Aucune revente de données n’est effectuée.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">8. Vos droits</h2>
        <ul className=" list-inside text-sm">
          <li>Accès, rectification, suppression</li>
          <li>Limitation et opposition au traitement</li>
          <li>Portabilité</li>
          <li>Retrait du consentement à tout moment</li>
        </ul>
        <p className="text-sm mt-2">
          Pour exercer vos droits, contactez-nous à : <strong>contact@careconcierge.fr</strong>
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">9. Cookies</h2>
        <p className="text-sm mb-2">Nous utilisons des cookies pour :</p>
        <ul className=" list-inside text-sm">
          <li>Améliorer le fonctionnement du site</li>
          <li>Mesurer l’audience - Google Analytics</li>
          <li>Faciliter la navigation</li>
        </ul>
      
      </div>

      <div className="mb-6">
        <h2 className="text-lg  mb-2">10. Sécurité</h2>
        <p className="text-sm">
          Toutes les mesures techniques et organisationnelles sont mises en œuvre pour protéger vos données (HTTPS, pare-feu, chiffrement...).
        </p>
      </div>

      <div>
        <h2 className="text-lg  mb-2">11. Modification</h2>
        <p className="text-sm">
          Cette politique est susceptible d’être modifiée. Dernière mise à jour : <br/><strong>22 juin 2025</strong>.
        </p>
      </div>
    </div>
  );
}
