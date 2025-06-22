// app/api/contact/route.js
import formidable from "formidable";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { createTransporter } from "../../../lib/mailer.js";

export const runtime = "nodejs";
export const config = { api: { bodyParser: false } };

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
      console.error("💥 [API/CONTACT] ERREUR :", error);
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
    const message = safeField(fields.message)?.replace(/\n/g, "<br/>") || "";

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

    // 4. Générer HTML clean
    const html = `
      <!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>
        body{font-family:sans-serif;background:#f4f4f4;margin:0;padding:20px}
        .container{max-width:600px;background:#fff;padding:20px 32px;border-radius:8px;margin:auto}
        .field{margin:14px 0 6px 0}.label{font-weight:bold;color:#bd9254}
        h1{font-size:1.8rem;margin-bottom:1.5rem;}
        h2{font-size:1.2rem;margin-top:2.2rem;margin-bottom:1rem;color:#222;}
        a{color:#bd9254;text-decoration:none;}
      </style></head><body><div class="container">
        <img src="cid:logo@careconcierge" alt="Logo" style="display:block;margin:0 auto 20px;max-width:450px"/>
        <h1>Nouvelle demande de contact</h1>
        <div class="field"><span class="label">Nom :</span> ${nom || "-"}</div>
        <div class="field"><span class="label">Prénom :</span> ${prenom || "-"}</div>
        <div class="field"><span class="label">Email :</span> <a href="mailto:${email}">${email || "-"}</a></div>
        <div class="field"><span class="label">Téléphone :</span> ${tel || "-"}</div>
        <h2>Message</h2>
        <div class="field" style="margin-top:8px;">${message}</div>
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
