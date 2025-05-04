import React from 'react';

export default function HauteSavoieConciergerie() {
  const services = [
    {
      title: 'Sports & Activités de plein air',
      image: '/images/home.webp',
      items: [
        'Forfaits ski prioritaires & cours privés',
        'Location de matériel livré au chalet',
        'Guides de haute montagne & via ferrata'
      ]
    },
    {
      title: 'Hébergement & Gestion immobilière',
      image: '/images/contact.webp',
      items: [
        'Sélection de chalets & résidences de prestige',
        'Service clé en main : check-in, ménage, linge',
        'Chalet Managers et Gouvernantes'
      ]
    },
    {
      title: 'Loisirs & Bien-être',
      image: '/images/home.webp',
      items: [
        'Balades privées sur le lac d’Annecy',
        'Spa d’altitude & cures thermales VIP',
        'Coaching yoga & méditation en plein air'
      ]
    },
    {
      title: 'Gastronomie & Art de vivre',
      image: '/images/contact.webp',
      items: [
        'Dîners gastronomiques avec chefs confirmés',
        'Masterclass œnologique sur vins savoyards'
      ]
    },
    {
      title: 'Transports & Logistique',
      image: '/images/home.webp',
      items: [
        'Transferts VIP VTC, hélicoptère',
        'Navettes pistes & aéroports Genève/Lyon',
        'Chauffeurs privés'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 ">
    

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
                      <h1 className="text-5xl md:text-6xl uppercase font-thin">
                        {" "}
                        Des services sur-mesure
                      </h1>
                    </li>
                    <li>
                      {" "}
                      <h2 className=" text-4xl md:text-5xl uppercase font-thin">
                        {" "}
                         pour sublimer
                      </h2>
                    </li>
                    <li>
                      {" "}
                      <h3 className="text-3xl md:text-4xl uppercase  font-thin">
                        {" "}
                         vos expériences alpines
                      </h3>
                    </li>
                  </ul>
                  <div className="text-gray-800 max-w-6xl mx-auto p-6 flex flex-col items-center">
                    <p className="text-center text-black  text-md font-thin my-10 z-20 leading-8 italic">
                      Pour répondre aux attentes d’une clientèle exigeante, votre
                      conciergerie en Haute-Savoie propose des services
                      ultra-personnalisés, adaptés aux atouts exceptionnels de la région.
                    </p>
                  </div>
                </div>
        
               
              </section>

      <section className="max-w-6xl p-2 mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3">
    
        {services.map((service) => (
          <div key={service.title} className="bg-white p-4 rounded shadow">
            <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded mb-4" />
            
            <h2 className="text-xl text-center font-thin mb-4">{service.title}</h2>
            <ul className=" list-inside font-thin text-sm leading-7 text-gray-600">
              {service.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="py-16 text-center font-thin italic text-gray-500">
        <p className='p-4'>Contactez-nous pour un programme personnalisé et discret.</p>
      </div>
    </main>
  );
}
