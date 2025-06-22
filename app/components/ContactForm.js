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
    .positive("Téléphone ne peut pas être négatif")
    .integer("Téléphone doit être un entier")
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
    .positive("Surface ne peut pas être négative")
    .integer("Surface doit être un entier")
    .when("type", {
      is: "demande",
      then: (schema) => schema.required("Surface requise"),
    }),
  chambres: yup
    .number()
    .typeError("Nombre de chambres doit être un nombre")
    .positive("Nombre de chambres ne peut pas être négatif")
    .integer("Nombre de chambres doit être un entier")
    .when("type", {
      is: "demande",
      then: (schema) => schema.required("Chambres requises"),
    }),
  sallesDeBain: yup
    .number()
    .typeError("Nombre de salles de bain doit être un nombre")
    .positive("Nombre de salles de bain ne peut pas être négatif")
    .integer("Nombre de salles de bain doit être un entier")
    .when("type", {
      is: "demande",
      then: (schema) => schema.required("Salles de bain requises"),
    }),
  consentement: yup
    .boolean()
    .oneOf([true], "Vous devez accepter le traitement de vos données (RGPD)"),
});

export default function ContactForm() {
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
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
      consentement: false,
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
    setUploadProgress(0);
    setIsUploading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    files.forEach((file) => formData.append("photos", file));

    try {
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/contact");
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
          }
        };
        xhr.onload = () => {
          setUploadProgress(100);
          setIsUploading(false);
          // Lecture de la réponse (doit être JSON dans ton cas)
          let response = {};
          try {
            response = JSON.parse(xhr.responseText);
          } catch (e) {
            response = { message: xhr.responseText };
          }
          if (xhr.status >= 200 && xhr.status < 300) {
            toast.success(response.message || "Message envoyé avec succès !");
            resolve();
          } else {
            toast.error(response.message || "Erreur serveur");
            reject(new Error(response.message || "Erreur serveur"));
          }
        };
        xhr.onerror = () => {
          setIsUploading(false);
          toast.error("Erreur réseau");
          reject(new Error("Erreur réseau"));
        };
        xhr.send(formData);
      });

      reset();
      setFiles([]);
      previewImages.forEach((img) => URL.revokeObjectURL(img.url));
      setPreviewImages([]);
      if (fileInputRef.current) fileInputRef.current.value = null;
      setTimeout(() => setUploadProgress(0), 700); // barre disparaît après 0.7s
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      console.error("[FRONT] Erreur lors de l’envoi:", error);
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
              <h2 className="text-md font-thin text-[#bd9254]">Layla D'Ham</h2>
              <p className="text-sm font-light text-gray-600">
                Arabe - Français
              </p>
              <p className="text-sm font-light break-words">
                <a href="tel:+33766646731" className="hover:text-[#bd9254]">
                  07 66 64 67 31
                </a>
              </p>
            </div>

            <div className="flex justify-center items-center space-x-4 mx-auto py-1 ">
              <h2 className="text-md font-thin text-[#bd9254]">
                Matthew Flammia
              </h2>
              <p className="text-sm font-light text-gray-600">Anglais</p>
              <p className="text-sm font-light break-words">
                <a href="tel:+33766797364" className="hover:text-[#bd9254]">
                  07 66 79 73 64
                </a>
              </p>
            </div>

            <div className="flex gap-4 mt-6 justify-center">
              <a href="tel:+33612345678" className="icon-link">
                <FiPhone size={16} />
              </a>
              <a
                href="https://www.facebook.com/careconciergechamonix/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link "
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://www.instagram.com/careconcierge_chamonix/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link "
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/careconcierge-properties/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link "
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Bloc formulaire */}
          <div className="md:w-1/2 space-y-4">
            <input
              {...register("nom")}
              placeholder="Nom"
              className="input focus:border-[#bd9254] focus:outline-none focus:ring-0"
            />
            <p className="error">{errors.nom?.message}</p>

            <input
              {...register("prenom")}
              placeholder="Prénom"
              className="input focus:border-[#bd9254] focus:outline-none focus:ring-0"
            />
            <p className="error">{errors.prenom?.message}</p>

            <input
              {...register("email")}
              placeholder="Email"
              className="input focus:border-[#bd9254] focus:outline-none focus:ring-0"
            />
            <p className="error">{errors.email?.message}</p>

            {/* Champ tel en numérique */}
            <input
              {...register("tel", { valueAsNumber: true })}
              placeholder="Téléphone"
              className="input focus:border-[#bd9254] focus:outline-none focus:ring-0"
              type="number"
              inputMode="numeric"
              min={0}
              step={1}
            />
            <p className="error">{errors.tel?.message}</p>

            <input
              {...register("societe")}
              placeholder="Société"
              className="input focus:border-[#bd9254] focus:outline-none focus:ring-0"
            />

            <div className="space-y-2">
              {["seminaire", "mariage", "demande"].map((type) => (
                <label key={type} className="block">
                  <input
                    type="radio"
                    value={type}
                    {...register("type")}
                    className="mr-2 accent-[#bd9254]"
                  />
                  {type === "seminaire" && "Séminaire"}
                  {type === "mariage" && "Mariage"}
                  {type === "demande" && "Demande de Gestion Locative"}
                </label>
              ))}
              <p className="error">{errors.type?.message}</p>
            </div>

            <textarea
              {...register("message")}
              placeholder="Message"
              className="input h-32 input focus:border-[#bd9254] focus:outline-none focus:ring-0"
            />
            <p className="error">{errors.message?.message}</p>

            {selectedType === "demande" && (
              <div className="space-y-2 bg-gray-50 p-4 rounded">
                <input
                  {...register("localisation")}
                  placeholder="Localisation"
                  className="input focus:outline-none focus:ring-2 focus:ring-[#bd9254]"
                />
                <p className="error">{errors.localisation?.message}</p>
                <input
                  {...register("surface", { valueAsNumber: true })}
                  placeholder="Surface (m²)"
                  className="input focus:border-[#bd9254] focus:outline-none focus:ring-0"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                />
                <p className="error">{errors.surface?.message}</p>
                <input
                  {...register("chambres", { valueAsNumber: true })}
                  placeholder="Nombre de chambres"
                  className="input focus:border-[#bd9254] focus:outline-none focus:ring-0"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                />
                <p className="error">{errors.chambres?.message}</p>
                <input
                  {...register("sallesDeBain", { valueAsNumber: true })}
                  placeholder="Nombre de salles de bain"
                  className="input focus:border-[#bd9254] focus:outline-none focus:ring-0"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                />
                <p className="error">{errors.sallesDeBain?.message}</p>
              </div>
            )}

            <div>
              <label className="block font-medium mb-1">Photos (max 10)</label>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-[#bd9254] text-white rounded hover:bg-[#a67c44] transition"
              >
                Sélectionner fichiers
              </button>
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
                      <img
                        src={img.url}
                        alt={`Preview ${index}`}
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

            {/* Progress bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded h-2 my-2">
                <div
                  className="bg-[#bd9254] h-2 rounded"
                  style={{
                    width: `${uploadProgress}%`,
                    transition: "width 0.2s",
                  }}
                />
                <span className="text-xs text-gray-500 block text-right">
                  {uploadProgress}%
                </span>
              </div>
            )}

            {/* Consentement RGPD */}
            <div className="flex items-start my-2">
              <input
                type="checkbox"
                {...register("consentement")}
                id="consentement"
                className="mr-2 accent-[#bd9254]"
              />
              <label htmlFor="consentement" className="text-xs text-gray-600">
                J’accepte que mes données soient utilisées pour être contacté
                dans le cadre de ma demande, conformément à la{" "}
                <a
                  href="/politique-de-confidentialite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#bd9254]"
                >
                  politique de confidentialité
                </a>
                .
              </label>
            </div>
            <p className="error">{errors.consentement?.message}</p>

            <button
              type="submit"
              disabled={isUploading}
              className="btn-submit "
            >
              {isUploading ? "Envoi..." : "Envoyer"}
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
        }
        .btn-submit:hover {
          background: #a67c44;
        }
        .input:focus {
          border-color: #bd9254 !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
}
