import Image from "next/image";
import Logo from "/public/pin2.png"; // asset in public root

export default function ContactModule() {
  return (
    <section className="text-gray-800 max-w-5xl mx-auto bg-gray-500/10 rounded-3xl py-10 flex flex-col items-center">
      <div className="flex-col mb-6 space-x-4">
        <div className="flex items-center justify-center mb-6 space-x-4">
          <Image
            src={Logo}
            alt="Care Concierge Luxury Logo"
            width={60}
            height={60}
          />
          <h2 className="text-3xl md:text-3xl uppercase font-thin">
            Care Concierge <span className="text-[#bd9254]">Luxury</span>
          </h2>
        </div>

        <p className="text-center justify-center max-w-xl text-black text-sm font-light leading-8 italic">
          Vous avez des questions sur nos services ?{' '}
          <span className="font-bold">
            Vous souhaitez organiser un séminaire ou planifier vos prochaines vacances ?{' '}
          </span>
          Nous sommes là pour vous aider à tout organiser. Contactez-nous par
          mail ou appelez-nous directement par téléphone.
        </p>
      </div>
      <div className="flex justify-around mb-6 mx-auto">
        <a
          href="/contact"
          className="border border-[#bd9254] text-[#bd9254] px-4 py-2 rounded-full text-sm uppercase hover:bg-[#bd9254] hover:text-white transition"
        >
          contactez-nous
        </a>

       
      </div>
    </section>
  );
}
