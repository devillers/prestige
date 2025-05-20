//app/components/ContactForm.js

"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

// Schéma de validation
const schema = yup.object().shape({
  nom: yup.string().required("Nom obligatoire"),
  prenom: yup.string().required("Prénom obligatoire"),
  email: yup.string().email("Email invalide").required("Email obligatoire"),
  tel: yup.string().required("Téléphone obligatoire"),
  societe: yup.string(),
  message: yup.string().required("Message obligatoire"),
  type: yup.string().required("Veuillez choisir une option"),
  localisation: yup.string().when("type", {
    is: "demande",
    then: (schema) => schema.required("Localisation requise"),
  }),
  surface: yup.string().when("type", {
    is: "demande",
    then: (schema) => schema.required("Surface requise"),
  }),
  chambres: yup.string().when("type", {
    is: "demande",
    then: (schema) => schema.required("Chambres requises"),
  }),
  sallesDeBain: yup.string().when("type", {
    is: "demande",
    then: (schema) => schema.required("Salles de bain requises"),
  }),
});

export default function ContactForm() {
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      societe: "",
      message: "",
      type: "",
      localisation: "",
      surface: "",
      chambres: "",
      sallesDeBain: "",
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    import("smooth-scroll").then((mod) => {
      const Scroll = mod.default || mod;
      const scroll = new Scroll('a[href*="#"]', {
        speed: 300,
        speedAsDuration: true,
        easing: "easeInOutCubic",
        offset: 0,
      });
      return () => scroll.destroy();
    });
  }, []);

  const handleFilesChange = (e) => {
    const filesArray = Array.from(e.target.files).slice(0, 10);
    setFiles(filesArray);
    previewImages.forEach((img) => URL.revokeObjectURL(img.url));
    setPreviewImages(filesArray.map((file) => ({ file, url: URL.createObjectURL(file) })));
  };

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(previewImages[index].url);
    setFiles(files.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    files.forEach((file) => formData.append("photos", file));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Erreur serveur");
      toast.success("Message envoyé avec succès !");
      reset();
      setFiles([]);
      previewImages.forEach((img) => URL.revokeObjectURL(img.url));
      setPreviewImages([]);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'envoi.");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto bg-white mt-12">
        <div className="flex flex-col md:flex-row gap-8 text-[12px]">
          {/* Bloc gauche avec branding et réseaux */}
          <div className="md:w-1/2 flex flex-col">
            <div className="flex justify-center items-center gap-2 text-3xl mb-7">
              <h2 className="font-thin">Care Concierge</h2>
              <span className="text-[#bd9254] font-thin">Luxury</span>
            </div>
            <p className="text-gray-700 leading-6 text-center">
              Vous avez une question, une demande de réservation ou un besoin particulier ?
              Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
            </p>
            <p className="text-gray-700 mt-4 leading-6 text-center">
              Pour une gestion locative ou événement : utilisez notre formulaire et joignez des photos.
            </p>
            <div className="flex gap-4 mt-6 justify-center">
              <a href="tel:+33612345678" className="icon-link">
                <FiPhone size={16} />
              </a>
              <a href="https://www.facebook.com/careconciergechamonix/" target="_blank" rel="noopener noreferrer" className="icon-link ">
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.instagram.com/careconcierge_chamonix/" target="_blank" rel="noopener noreferrer" className="icon-link ">
                <FaInstagram size={16} />
              </a>
              <a href="https://www.linkedin.com/in/careconcierge-properties/" target="_blank" rel="noopener noreferrer" className="icon-link ">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Bloc formulaire */}
          <div className="md:w-1/2 space-y-4">
            <input {...register("nom")} placeholder="Nom" className="input" />
            <p className="error">{errors.nom?.message}</p>

            <input {...register("prenom")} placeholder="Prénom" className="input" />
            <p className="error">{errors.prenom?.message}</p>

            <input {...register("email")} placeholder="Email" className="input" />
            <p className="error">{errors.email?.message}</p>

            <input {...register("tel")} placeholder="Téléphone" className="input" />
            <p className="error">{errors.tel?.message}</p>

            <input {...register("societe")} placeholder="Société" className="input" />

            <div className="space-y-2">
              {["seminaire", "mariage", "demande"].map((type) => (
                <label key={type} className="block">
                  <input type="radio" value={type} {...register("type")} className="mr-2" />
                  {type === "seminaire" && "Séminaire"}
                  {type === "mariage" && "Mariage"}
                  {type === "demande" && "Demande de Gestion Locative"}
                </label>
              ))}
              <p className="error">{errors.type?.message}</p>
            </div>

            <textarea {...register("message")} placeholder="Message" className="input h-32" />
            <p className="error">{errors.message?.message}</p>

            {selectedType === "demande" && (
              <div className="space-y-2 bg-gray-50 p-4 rounded">
                <input {...register("localisation")} placeholder="Localisation" className="input" />
                <p className="error">{errors.localisation?.message}</p>

                <input {...register("surface")} placeholder="Surface (m²)" className="input" />
                <p className="error">{errors.surface?.message}</p>

                <input {...register("chambres")} placeholder="Nombre de chambres" className="input" />
                <p className="error">{errors.chambres?.message}</p>

                <input {...register("sallesDeBain")} placeholder="Nombre de salles de bain" className="input" />
                <p className="error">{errors.sallesDeBain?.message}</p>
              </div>
            )}

           <div>
  <label className="block font-medium mb-1">Photos (max 10)</label>
  
  {/* Bouton custom */}
  <button
    type="button"
    onClick={() => fileInputRef.current.click()}
    className="px-4 py-2 bg-[#bd9254] text-white rounded hover:bg-[#a67c44] transition"
  >
    Sélectionner fichiers
  </button>

  {/* Input caché */}
  <input
    ref={fileInputRef}
    type="file"
    multiple
    accept="image/*"
    onChange={handleFilesChange}
    className="hidden"
  />

  {previewImages.length > 0 && (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {previewImages.map((img, index) => (
        <div key={index} className="relative">
          <img src={img.url} alt={`Preview ${index}`} className="h-20 w-full object-cover rounded border" />
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


              <button type="submit" disabled={isSubmitting} className="btn-submit ">
                {isSubmitting ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          </div>
        </form>

        <style jsx>{`
          .input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .error {
            color: #e53e3e;
            font-size: 0.75rem;
          }
          .icon-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.25rem;
            height: 2.25rem;
            border: 1px solid #bd9254;
            color: #bd9254;
            border-radius: 9999px;
            transition: all 0.2s;
          }
          .btn-submit {
            background: #bd9254;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: background 0.2s;
            corner-radius: 10px
          }
          .btn-submit:hover {
            background: #a67c44;
          }
        `}</style>
    </>
  );
}
