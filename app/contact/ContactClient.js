"use client";

import { useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import Head from "next/head";
import ContactForm from "../components/ContactForm";

export default function ContactClient() {
  useEffect(() => {
    import("smooth-scroll").then((SmoothScroll) => {
      const scroll = new SmoothScroll.default('a[href*="#"]', {
        speed: 300,
        speedAsDuration: true,
        easing: "easeInOutCubic",
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
                availableLanguage: ["French", "English"],
              },
              sameAs: [
                "https://www.instagram.com/careconcierge",
                "https://www.linkedin.com/company/careconcierge",
              ],
            }),
          }}
        />
      </Head>

      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col  min-h-[640px]  bg-white bg-[url(/images/contact.webp)] bg-cover bg-center">
          <ul className=" max-w-[600px] p-6 z-20 ">
            <li>
              <h1 className="text-6xl md:text-8xl uppercase text-white font-bold  ">
                Votre projet
              </h1>
            </li>
            <li>
              <h2 className="text-6xl md:text-6xl uppercase  text-white/70 font-bold ">
                {" "}
                mérite
              </h2>
            </li>
            <li>
              <h3 className="text-6xl md:text-7xl uppercase text-white/70 font-bold ">
                notre attention
              </h3>
            </li>
          </ul>

          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-1" />
        </div>
      </section>

      <div className="text-gray-800 max-w-6xl mx-auto p-6  ">
        <ul className="">
          <li>
            <h1 className="text-4xl md:text-6xl uppercase font-thin">
              Votre bien mérite
            </h1>
          </li>
          <li>
            <h2 className="text-3xl md:text-5xl uppercase font-thin">
              une gestion
            </h2>
          </li>
          <li>
            <h3 className="text-2xl md:text-4xl uppercase font-thin">
              d’exception
            </h3>
          </li>
        </ul>
        <div className="text-gray-800 max-w-6xl mx-auto p-4 flex flex-col items-center"> 
        <p className="text-center text-black  text-md font-thin my-10 z-20 leading-8 italic">
            Chamonix, Megève ou Saint-Gervais, notre équipe vous accompagne dans
            la gestion de votre propriété ou l’organisation d’événements
            d’exception. Mariage, séminaire ou conciergerie locative : chaque
            demande est traitée avec rigueur, discrétion et un sens aigu du
            détail.
          </p>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
