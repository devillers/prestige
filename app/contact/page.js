"use client";

import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";


export default function ContactForm() {
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

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    societe: "",
    message: "",
    type: "",
    localisation: "",
    surface: "",
    chambres: "",
    sallesDeBain: "",
    photos: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "radio") {
      setFormData({ ...formData, type: value });
    } else if (type === "file") {
      const filesArray = Array.from(files).slice(0, 10);
      setFormData({ ...formData, photos: filesArray });

      const previewUrls = filesArray.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setPreviewImages(previewUrls);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveImage = (index) => {
    const newPreviews = [...previewImages];
    const newFiles = [...formData.photos];

    URL.revokeObjectURL(newPreviews[index].url);
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);

    setPreviewImages(newPreviews);
    setFormData({ ...formData, photos: newFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      if (key === "photos") {
        formData.photos.forEach((file) => data.append("photos", file));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Erreur lors de l'envoi du message.");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      previewImages.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [previewImages]);

  if (submitted) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold mb-4">Merci !</h2>
        <p className="text-gray-600">Votre message a été envoyé avec succès.</p>
      </div>
    );
  }

  return (
    <>
      <section className="relative">
        <div className="relative z-10 mx-auto justify-center flex flex-col min-h-screen md:min-h-[640px] p-6 bg-white bg-[url(/images/contact.png)] bg-cover bg-center">
          <h1 className="text-7xl text-white/70 max-w-[600px] font-bold leading-[70px] mb-6 mt-6 p-6 uppercase z-20">
            Votre projet <span className="md:text-9xl text-white">mérite</span>{" "}
            notre attention <br />
            <span className="md:text-7xl text-white">exclusive</span>
          </h1>

          {/* 🔽 Arrow - Mobile Only */}
          <div className="md:hidden mt-10 mb-4 flex justify-center animate-bounce z-20">
            <a
              href="#contact-form"
              aria-label="Scroll to form"
              className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#bd9254] text-[#bd9254] hover:border-white hover:text-white transition-colors duration-300"
            >
              <FiChevronDown className="text-3xl" />
            </a>
          </div>

          <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/60 z-1"></div>
        </div>
      </section>

      <form
        id="contact-form"
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto p-4 bg-white shadow rounded-lg"
      >
        <div className="flex flex-col md:flex-row gap-8 text-[12px]">
          <div className="md:w-1/2 flex flex-col px-4 py-8 mb-4 ">
            <div className="flex text-3xl">
              <h2 className="mb-2">Care Concierge</h2>
              <span className="ml-2 text-[#bd9254] text-3xl font-thin">
                Luxury
              </span>
            </div>
            <h3 className="text-xl font-thin mb-4">Contactez-nous</h3>
            <p className="text-gray-700 max-w-md leading-6">
              Vous avez une question, une demande de réservation ou un besoin
              particulier ? Nous sommes là pour vous aider. Remplissez le
              formulaire ci-dessous et nous vous répondrons dans les plus brefs
              délais.
            </p>
            <p className="text-gray-700 max-w-md mt-4 leading-6">
              Vous souhaitez louer l’un de nos biens pour un séminaire, un
              mariage, ou bien nous confier votre propre bien en gestion
              locative ? Utilisez notre formulaire de prise de contact.
              N’hésitez pas à joindre des photos si votre demande concerne la
              mise en gestion de votre bien.
            </p>
          </div>

          <div className="md:w-1/2 space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                className="w-1/2 p-2 border rounded"
                value={formData.nom}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                className="w-1/2 p-2 border rounded"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="societe"
              placeholder="Société"
              className="w-full p-2 border rounded"
              value={formData.societe}
              onChange={handleChange}
            />

            <div className="space-y-2">
              {["seminaire", "mariage", "demande"].map((type) => (
                <label key={type} className="block">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={formData.type === type}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {type === "seminaire" && "Séminaire"}
                  {type === "mariage" && "Mariage"}
                  {type === "demande" && "Demande de Gestion Locative"}
                </label>
              ))}
            </div>

            <textarea
              name="message"
              placeholder="message"
              rows={4}
              className="w-full p-2 border rounded"
              value={formData.message}
              onChange={handleChange}
              required
            />

            {/* Smooth transition gestion locative panel */}
            <div
              className={`transition-all duration-1000 overflow-hidden ${
                formData.type === "demande"
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4 border p-4 rounded bg-gray-50 space-y-4">
                <h4 className="font-semibold text-lg">
                  Informations sur le bien
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="localisation"
                    placeholder="Localisation"
                    className="p-2 border rounded"
                    value={formData.localisation}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="surface"
                    placeholder="Surface (m²)"
                    className="p-2 border rounded"
                    value={formData.surface}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="chambres"
                    placeholder="Nombre de chambres"
                    className="p-2 border rounded"
                    value={formData.chambres}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="sallesDeBain"
                    placeholder="Nombre de salles de bain"
                    className="p-2 border rounded"
                    value={formData.sallesDeBain}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Photos (max 10)
                  </label>
                  <input
                    type="file"
                    name="photos"
                    multiple
                    accept="image/*"
                    className="block"
                    onChange={handleChange}
                  />
                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {previewImages.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img.url}
                            alt={`preview-${index}`}
                            className="h-20 w-full object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 bg-white text-black text-xs px-1 rounded-bl"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-4 h-[30px] font-thin mt-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-[#bd9254] hover:text-white active:scale-95"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Envoi...
                </>
              ) : (
                "Envoyer"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
