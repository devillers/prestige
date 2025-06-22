// app/api/contact/route.js
import formidable from "formidable";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { createTransporter } from "../../../lib/mailer.js";

// Runtime Node.js pour App Router
export const runtime = "nodejs";
export const config = {
  api: { bodyParser: false },
};

const safeField = (field) => {
  if (Array.isArray(field)) return field[0];
  if (typeof field === "string") return field;
  return "";
};

export async function POST(req) {
  try {
    console.log("[API] contact POST reçu à", new Date().toISOString());

    // Convertir ReadableStream Web en flux Node
    const nodeStream = Readable.fromWeb(await req.body);
    nodeStream.headers = Object.fromEntries(req.headers);

    // 1. Parse le formulaire
    let fields, files;
    try {
      ({ fields, files } = await new Promise((resolve, reject) => {
        const form = formidable({
          multiples: true,
          keepExtensions: true,
          maxFileSize: 50 * 1024 * 1024,
          maxTotalFileSize: 200 * 1024 * 1024,
        });
        form.parse(nodeStream, (err, flds, fls) => {
          if (err) return reject(err);
          resolve({ fields: flds, files: fls });
        });
      }));
    } catch (error) {
      console.error("💥 [API/CONTACT] ERREUR :", error); // ← log serveur
      return NextResponse.json(
        { message: "Erreur API contact: " + String(error.message || error) },
        { status: 500 }
      );
    }

    // 2. Sécuriser champs
    const nom = safeField(fields.nom);
    const prenom = safeField(fields.prenom);
    const email = safeField(fields.email);
    const tel = safeField(fields.tel);
    const societe = safeField(fields.societe);
    const message = safeField(fields.message)?.replace(/\n/g, "<br/>") || "";
    const type = safeField(fields.type);
    const localisation = safeField(fields.localisation);
    const surface = safeField(fields.surface);
    const chambres = safeField(fields.chambres);
    const sallesDeBain = safeField(fields.sallesDeBain);

    console.log("[API] Champs récupérés :", { nom, prenom, email, tel, type });

    // 3. Attachments (logo + images)
    const attachments = [];
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: "logo.png",
        path: logoPath,
        cid: "logo@careconcierge",
      });
    }
    if (files?.photos) {
      const uploaded = Array.isArray(files.photos)
        ? files.photos
        : [files.photos];
      for (const file of uploaded) {
        if (fs.existsSync(file.filepath)) {
          attachments.push({
            filename: file.originalFilename,
            content: fs.createReadStream(file.filepath),
          });
        }
      }
    }

    // 4. Générer HTML
    const html = `
      <!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>
        body{font-family:sans-serif;background:#f4f4f4;margin:0;padding:20px}
        .container{max-width:600px;background:#fff;padding:20px;border-radius:8px;margin:auto}
        .field{margin:10px 0}.label{font-weight:bold;color:#555}
      </style></head><body><div class="container">
        <img src="cid:logo@careconcierge" alt="Logo" style="display:block;margin:0 auto 20px;max-width:450px"/>
        <h1>Nouvelle demande de contact</h1>
        ${[
          ["Nom", nom],
          ["Prénom", prenom],
          ["Email", email],
          ["Téléphone", tel],
          ["Société", societe],
          ["Type", type],
        ]
          .map(
            ([label, value]) =>
              `<div class="field"><span class="label">${label} :</span> ${
                value || "—"
              }</div>`
          )
          .join("")}
        ${
          type === "demande"
            ? `<h2>Infos Bien</h2>${[
                ["Localisation", localisation],
                ["Surface", surface && `${surface} m²`],
                ["Chambres", chambres],
                ["Salles de bain", sallesDeBain],
              ]
                .map(
                  ([label, value]) =>
                    `<div class="field"><span class="label">${label} :</span> ${
                      value || "—"
                    }</div>`
                )
                .join("")}`
            : ""
        }
        <h2>Message</h2><p>${message}</p>
      </div></body></html>`;

    // 5. Envoi mail
    const transporter = await createTransporter();
    console.log("[API] Prêt à envoyer le mail via Nodemailer...");
    const info = await transporter.sendMail({
      from: `"${prenom} ${nom}" <${process.env.MAIL_USER}>`,
      to: "contact@careconcierge.fr",
      replyTo: email,
      subject: "Nouveau message depuis Care Concierge Luxury",
      html,
      attachments,
    });
    console.log("[API] Email envoyé !", info);

    // 6. Nettoyage fichiers temporaires
    if (files?.photos) {
      const uploaded = Array.isArray(files.photos)
        ? files.photos
        : [files.photos];
      for (const file of uploaded) fs.unlink(file.filepath, () => {});
    }

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[API] 💥 Erreur route /api/contact :", err);
    return NextResponse.json(
      { message: "Erreur API contact: " + String(err.message || err) },
      { status: 500 }
    );
  }
}
