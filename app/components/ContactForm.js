"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

// Liste des indicatifs à proposer
const INDICATIFS = [
  { code: "+33", label: "France (+33)" },
  { code: "+41", label: "Suisse (+41)" },
  { code: "+32", label: "Belgique (+32)" },
  { code: "+49", label: "Allemagne (+49)" },
  // Ajoute ce que tu veux ici
];

// Validation schema
const schema = yup.object().shape({
  nom: yup.string().required("Nom obligatoire"),
  prenom: yup.string().required("Prénom obligatoire"),
  email: yup.string().email("Email invalide").required("Email obligatoire"),
  tel: yup
    .string()
    .required("Téléphone obligatoire")
    .matches(/^[0-9\s]{6,15}$/, "Numéro non valide"),
  message: yup.string().required("Message obligatoire"),
  consentement: yup
    .boolean()
    .oneOf([true], "Vous devez accepter le traitement de vos données (RGPD)"),
});

export default function ContactForm() {
  const [indicatif, setIndicatif] = useState("+33");
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      message: "",
      consentement: false,
    },
  });

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

    // Assemble numéro complet (sans espace, sans 0 devant)
    const cleanTel = `${indicatif}${data.tel
      .replace(/^0+/, "")
      .replace(/\s/g, "")}`;

    const formData = new FormData();
    formData.append("nom", data.nom);
    formData.append("prenom", data.prenom);
    formData.append("email", data.email);
    formData.append("tel", cleanTel);
    formData.append("message", data.message);
    formData.append("consentement", data.consentement);
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
      setTimeout(() => setUploadProgress(0), 700);
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      console.error("[ContactForm] Erreur lors de l’envoi:", error);
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
          {/* Bloc gauche branding */}
          {/* Bloc gauche branding */}
          <div className="md:w-1/2 flex flex-col">
            <div className="flex justify-center items-center gap-2 text-3xl mb-7">
              <h2 className="font-thin">Care Concierge</h2>
              <span className="text-[#bd9254] font-thin">Luxury</span>
            </div>
            <p className="text-gray-700 leading-6 text-center">
              Vous avez un projet de séminaire ou un besoin spécifique ?
              Remplissez notre formulaire ci-dessous et recevez une réponse sous
              24 heures. Pour toute demande de gestion locative, n’hésitez pas à
              joindre quelques photos afin que nous puissions réaliser une étude
              personnalisée.
            </p>
            <p className="text-gray-700 mt-4 leading-6 text-center">
              Envie d’un contact immédiat ? Nos conseillers sont à votre écoute
            </p>
            <div className="flex justify-center items-center space-x-4 mx-auto py-1 mt-6">
              <h2 className="text-md font-light text-[#bd9254]">
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
              <h2 className="text-md font-light text-[#bd9254]">Layla D'Ham</h2>
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
              <h2 className="text-md font-light text-[#bd9254]">
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
                className="icon-link"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://www.instagram.com/careconcierge_chamonix/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/careconcierge-properties/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
          {/* Bloc formulaire */}
          <div className="md:w-1/2 ">
            <input {...register("nom")} placeholder="Nom" className="input" />
            <p className="error">{errors.nom?.message}</p>

            <input
              {...register("prenom")}
              placeholder="Prénom"
              className="input"
            />
            <p className="error">{errors.prenom?.message}</p>

            <input
              {...register("email")}
              placeholder="Email"
              className="input"
            />
            <p className="error">{errors.email?.message}</p>

            {/* Sélecteur indicatif + champ téléphone */}
            <div className="flex gap-3">
              <select
                value={indicatif}
                onChange={(e) => setIndicatif(e.target.value)}
                className="input basis-1/3"
              >
                {INDICATIFS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                {...register("tel")}
                placeholder="Numéro de téléphone"
                className="input flex-1"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={15}
              />
            </div>

            <p className="error">{errors.tel?.message}</p>

            <textarea
              {...register("message")}
              placeholder="Message"
              className="input h-32"
            />
            <p className="error">{errors.message?.message}</p>

            <div>
              <label className="block font-medium mb-1">Photos (max 10)</label>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-[#bd9254] text-white rounded hover:bg-[#a67c44] transition"
              >
                Sélectionner Photos
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
              className="btn-submit mt-4"
            >
              {isUploading ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </div>
      </form>
      <style jsx>{`
        .input {
          width: 100%;
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          transition: border-color 0.2s;
        }

        .input:focus {
          border-color: #bd9254 !important;
          box-shadow: none !important; /* Supprime le halo bleu */
          outline: none !important;
        }
        .error {
          color: #e53e3e;
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
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
