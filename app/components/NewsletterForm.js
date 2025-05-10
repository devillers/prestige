"use client";
import React, { useState } from "react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([
    "Points de marché en France",
    "Chalets à vendre",
    "Immeubles à vendre",
    "Appartements à vendre",
    "Nouveaux Biens à louer",
    "Immobilier de luxe",

   
  ]);
  const [selected, setSelected] = useState(new Set(interests));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleInterest = (interest) => {
    const updated = new Set(selected);
    updated.has(interest) ? updated.delete(interest) : updated.add(interest);
    setSelected(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          interests: Array.from(selected),
        }),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      setEmail("");
      setSelected(new Set(interests));
    } catch (err) {
      setError("Erreur lors de l’envoi. Veuillez réessayer.");
    }
  };

  return (
    <div className="bg-gray-50 px-6 py-12 text-center max-w-5xl mx-auto  my-8">
      <h4 className="text-3xl font-thin mb-2">
        S'inscrire à notre newsletter.
      </h4>
      <p className="text-gray-500 font-thin mt-4  ">
        Nos actualités sur{" "}
        l'immobilier et nos
        évènements{" "}
      </p>
      <p className="font-thin text-sm my-6">Vous êtes intéressé(e) par ?</p>

      <form onSubmit={handleSubmit} className="  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
          {interests.map((interest) => (
            <label key={interest} className="flex items-start font-thin text-sm gap-2">
              <input
                type="checkbox"
                checked={selected.has(interest)}
                onChange={() => toggleInterest(interest)}
                className="mt-1 w-4 h-4 accent-[#bd9254]  text-white "
              />
              <span>{interest}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-row items-center justify-center gap-4">
          <input
            type="email"
            required
            placeholder="Votre Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-md w-full sm:w-96 focus:outline-none h-[30px] font-thin"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 h-[30px] font-thin border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95"
          >
            Recevoir
          </button>
        </div>

        {success && (
          <p className="mt-4 text-green-600">Merci pour votre inscription !</p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default NewsletterForm;
