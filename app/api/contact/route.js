// app/api/contact/route.js

import formidable from 'formidable';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { createTransporter } from '../../../lib/mailer.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const safeField = (field) => {
  if (Array.isArray(field)) return field[0];
  if (typeof field === 'string') return field;
  return '';
};

export async function POST(req) {
  const form = formidable({ multiples: true });
  const stream = Readable.fromWeb(req.body);
  const fakeReq = Object.assign(stream, {
    headers: Object.fromEntries(req.headers),
  });

  return new Promise((resolve) => {
    form.parse(fakeReq, async (err, fields, files) => {
      if (err) {
        console.error('Erreur parsing form :', err);
        return resolve(
          NextResponse.json(
            { message: 'Erreur lors de la lecture du formulaire' },
            { status: 500 }
          )
        );
      }

      // --- Affichage pour debug (optionnel) ---
       console.log('▶️ fields reçus :', fields);

      // --- Sécurisation des champs ---
      const nom = safeField(fields.nom);
      const prenom = safeField(fields.prenom);
      const email = safeField(fields.email);
      const tel = safeField(fields.tel);
      const societe = safeField(fields.societe);
      const message = safeField(fields.message);
      const type = safeField(fields.type);
      const localisation = safeField(fields.localisation);
      const surface = safeField(fields.surface);
      const chambres = safeField(fields.chambres);
      const sallesDeBain = safeField(fields.sallesDeBain);
      const displayMessage = message.replace(/\n/g, '<br/>');

      // --- Construction des pièces jointes ---
      const attachments = [];

      // 1) logo (si présent)
      try {
        const logoPath = path.resolve('./public/logo.png');
        if (fs.existsSync(logoPath)) {
          attachments.push({
            filename: 'logo.png',
            path: logoPath,
            cid: 'logo@careconcierge',
          });
        } else {
          console.warn(`Logo introuvable (${logoPath}), on l'ignore.`);
        }
      } catch (e) {
        console.warn('Erreur lors de la vérification du logo :', e);
      }

      // 2) photos uploadées
      if (files.photos) {
        const fileArray = Array.isArray(files.photos)
          ? files.photos
          : [files.photos];
        fileArray.forEach((file) => {
          try {
            if (fs.existsSync(file.filepath)) {
              attachments.push({
                filename: file.originalFilename,
                content: fs.createReadStream(file.filepath),
              });
            } else {
              console.warn(`Fichier uploadé introuvable : ${file.filepath}`);
            }
          } catch (e) {
            console.warn('Erreur sur pièce jointe :', e);
          }
        });
      }

      // --- Préparation du HTML ---
      const htmlMessage = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouvelle demande de contact</title>
  <style>
    body { margin:0; padding:0; background:#f4f4f4; font-family:Arial,sans-serif }
    .container { width:600px; margin:20px auto; background:#fff; padding:20px; border-radius:8px }
    h1 { font-size:24px; text-align:center; color:#333; margin-bottom:10px }
    h2,h3 { color:#555; margin-top:20px }
    p { line-height:1.5; color:#666 }
    .field-label { font-weight:bold; color:#333 }
    .logo { display:block; margin:0 auto 20px; max-width:150px }
  </style>
</head>
<body>
  <div class="container">
    <img src="cid:logo@careconcierge" alt="Logo Care Concierge" class="logo"/>
    <h1>Nouvelle demande de contact</h1>
    <p><span class="field-label">Nom :</span> ${nom}</p>
    <p><span class="field-label">Prénom :</span> ${prenom}</p>
    <p><span class="field-label">Email :</span> ${email}</p>
    <p><span class="field-label">Téléphone :</span> ${tel}</p>
    <p><span class="field-label">Société :</span> ${societe}</p>
    <p><span class="field-label">Type :</span> ${type}</p>

    ${
      // On teste désormais 'demande' tel qu'envoyé par le front
      type === 'demande'
        ? `
      <h2>Informations sur le bien</h2>
      <p><span class="field-label">Localisation :</span> ${localisation}</p>
      <p><span class="field-label">Surface :</span> ${surface} m²</p>
      <p><span class="field-label">Chambres :</span> ${chambres}</p>
      <p><span class="field-label">Salles de bain :</span> ${sallesDeBain}</p>
      `
        : ''
    }

    <h2>Message :</h2>
    <p>${displayMessage}</p>
  </div>
</body>
</html>
`;

      // --- Envoi du mail ---
      try {
        const transporter = await createTransporter();
        await transporter.sendMail({
          from: `"${prenom} ${nom}" <${process.env.MAIL_USER}>`,
          to: 'contact@careconcierge.fr',
          subject: 'Nouveau message depuis Care Concierge Luxury',
          html: htmlMessage,
          attachments,
        });
        return resolve(
          NextResponse.json(
            { message: 'Message envoyé avec succès' },
            { status: 200 }
          )
        );
      } catch (error) {
        console.error('Erreur d’envoi du mail :', error);
        return resolve(
          NextResponse.json(
            { message: 'Échec de l’envoi du message' },
            { status: 500 }
          )
        );
      }
    });
  });
}
