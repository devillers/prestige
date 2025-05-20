// app/api/contact/route.js

import formidable from 'formidable';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { createTransporter } from '../../../lib/mailer.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Fonction de sécurisation générique des champs
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
      console.log('▶️ fields reçus :', fields);
      if (err) {
        console.error('Erreur parsing form:', err);
        return resolve(
          new Response(
            JSON.stringify({ message: 'Erreur parsing form' }),
            { status: 500 }
          )
        );
      }

      // Sécurisation des champs
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

      // Nettoyage message
      const displayMessage = message.replace(/\n/g, '<br/>');

      // Gestion pièces jointes photos
      const uploadedFiles = files.photos;
      let attachments = [];

      if (uploadedFiles) {
        const fileArray = Array.isArray(uploadedFiles)
          ? uploadedFiles
          : [uploadedFiles];
        attachments = fileArray.map((file) => ({
          filename: file.originalFilename,
          content: fs.createReadStream(file.filepath),
        }));
      }

      // Logo en CID
      const logoAttachment = {
        filename: 'logo.png',
        path: path.resolve('./public/logo.png'),
        cid: 'logo@careconcierge',
      };
      attachments = [logoAttachment, ...attachments];

      const transporter = await createTransporter();

      // Template HTML avec styles et logo
      const htmlMessage = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouvelle demande de contact</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }
    .container {
      width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
    }
    h1 {
      font-size: 24px;
      text-align: center;
      color: #333333;
      margin-bottom: 10px;
    }
    h2, h3 {
      color: #555555;
      margin-top: 20px;
    }
    p {
      line-height: 1.5;
      color: #666666;
    }
    .field-label {
      font-weight: bold;
      color: #333333;
    }
    .logo {
      display: block;
      margin: 0 auto 20px;
      max-width: 150px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Logo -->
    <img src="cid:logo@careconcierge" alt="Care Concierge Logo" class="logo" />

    <!-- Titre -->
    <h1>Nouvelle demande de contact</h1>

    <!-- Infos contact -->
    <p><span class="field-label">Nom :</span> ${nom}</p>
    <p><span class="field-label">Prénom :</span> ${prenom}</p>
    <p><span class="field-label">Email :</span> ${email}</p>
    <p><span class="field-label">Téléphone :</span> ${tel}</p>
    <p><span class="field-label">Société :</span> ${societe}</p>
    <p><span class="field-label">Type :</span> ${type}</p>

    ${
      type === 'demande de Gestion Locative'
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

      try {
        await transporter.sendMail({
          from: `"${prenom} ${nom}" <${process.env.MAIL_USER}>`,
          to: 'contact@careconcierge.fr',
          subject: 'Nouveau message depuis Care Concierge Luxury',
          html: htmlMessage,
          attachments,
        });

        return resolve(
          new Response(
            JSON.stringify({ message: 'Message envoyé avec succès' }),
            { status: 200 }
          )
        );
      } catch (error) {
        console.error('Erreur d’envoi:', error);
        return resolve(
          new Response(
            JSON.stringify({ message: 'Échec de l’envoi du message' }),
            { status: 500 }
          )
        );
      }
    });
  });
}
