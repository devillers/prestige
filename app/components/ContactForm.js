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
  tel: yup
    .number()
    .typeError("Téléphone doit être un nombre")
    .required("Téléphone obligatoire"),
  societe: yup.string(),
  message: yup.string().required("Message obligatoire"),
  type: yup.string().required("Veuillez choisir une option"),
  localisation: yup.string().when("type", {
    is: "demande",
    then: (schema) => schema.required("Localisation requise"),
  }),
  surface: yup
    .number()
    .typeError("Surface doit être un nombre")
    .when("type", {
      is: "demande",
      then: (schema) => schema.required("Surface requise"),
    }),
  chambres: yup
    .number()
    .typeError("Nombre de chambres doit être un nombre")
    .when("type", {
      is: "demande",
      then: (schema) => schema.required("Chambres requises"),
    }),
  sallesDeBain: yup
    .number()
    .typeError("Nombre de salles de bain doit être un nombre")
    .when("type", {
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
    setPreviewImages(
      filesArray.map((file) => ({ file, url: URL.createObjectURL(file) }))
    );
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto bg-white mt-12"
      >
        <div className="flex flex-col md:flex-row gap-8 text-sm">
          {/* Bloc gauche avec branding et réseaux */}
          <div className="md:w-1/2 flex flex-col">
            <div className="flex justify-center items-center gap-2 text-3xl mb-7">
              <h2 className="font-thin">Care Concierge</h2>
              <span className="text-[#bd9254] font-thin">Luxury</span>
            </div>
            <p className="text-gray-700 leading-6 text-center">
              Vous avez un projet, une réservation ou un besoin sur-mesure ?
              Remplissez notre formulaire express ci-dessous et bénéficiez d’une
              réponse sous 24 h. Pour la gestion locative, utilisez notre
              formulaire dédié et joignez vos photos pour une étude
              personnalisée.
            </p>
            <p className="text-gray-700 mt-4 leading-6 text-center">
              Envie d’un contact immédiat ? Nos conseillers sont à votre écoute
            </p>

            <div className="flex justify-center items-center space-x-4 mx-auto py-1 mt-6">
              <h2 className="text-md font-thin text-[#bd9254]">
                David Devillers
              </h2>

              <p className="text-sm font-light text-gray-600">Français</p>

              <p className="text-sm font-light break-words">
                <a href="tel:+33686020184" className="hover:text-[#bd9254]">
                  06 86 02 01 84
                </a>
              </p>
            </div>

            <div className="flex justify-center items-center space-x-4 mx-auto py-1 ">
              <h2 className="text-md font-thin text-[#bd9254]">Layla D'Ham
