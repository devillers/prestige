'use client';

import { useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Head from 'next/head';
import ContactForm from '../components/ContactForm';

export default function ContactClient() {
  useEffect(() => {
    import('smooth-scroll').then((SmoothScroll) => {
      const scroll = new SmoothScroll.default('a[href*="#"]', {
        speed: 300,
        speedAsDuration: true,
        easing: 'easeInOutCubic',
        offset: 0,
      });
      return () => scroll.destroy();
    });
  }, []);

  return (
    <>
      {/* ✅ SEO local via Schema.org */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Care Concierge",
              url: "https://care-concierge.fr",
              logo: "https://care-concierge.fr/logo.svg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33-6-12-34-56-78",
                contactType: "Customer Service",
                areaServed: "FR",
                availableLanguage: ["French", "English"]
              },
              sameAs: [
                "https://www.instagram.com/careconcierge",
                "https://www.linkedin.com/company/careconcierge"
              ]
            }),
          }}
        />
      </Head>

      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-screen md:min-h-[640px] p-6 bg-white bg-[url(/images/contact.png)] bg-cover bg-center">
          <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
            Votre projet <span className="md:text-9xl text-white">mérite</span>{" "}
            notre attention <br />
            <span className="md:text-7xl text-white">exclusive</span>
          </h1>

          <div className="md:hidden mt-10 mb-4 flex justify-center animate-bounce z-20">
            <a
              href="#contact-form"
              aria-label="Scroll to form"
              className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#bd9254] text-[#bd9254] hover:border-white hover:text-white transition-colors duration-300"
            >
              <FiChevronDown className="text-3xl" />
            </a>
          </div>

          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-1" />
        </div>
      </section>

      <div className="text-gray-800 max-w-6xl mx-auto p-4 scroll-mt-20" id="contact-form">
        <ul className="py-4">
          <li><h1 className="text-5xl md:text-7xl uppercase font-thin">Votre bien mérite</h1></li>
          <li><h2 className="text-4xl md:text-6xl uppercase font-thin">une gestion</h2></li>
          <li><h3 className="text-3xl md:text-5xl uppercase font-thin">d’exception</h3></li>
        </ul>

        <p className="font-thin py-10">
          Chamonix, Megève ou Saint-Gervais, notre équipe vous accompagne dans la gestion de votre propriété ou l’organisation d’événements d’exception. Mariage, séminaire ou conciergerie locative : chaque demande est traitée avec rigueur, discrétion et un sens aigu du détail.
        </p>

        <ContactForm />
      </div>
    </>
  );
}
