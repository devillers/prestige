import formidable from 'formidable';
import { Readable } from 'stream';
import fs from 'fs';
import { createTransporter } from '../../lib/mailer';

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
      if (err) {
        console.error('Erreur parsing form:', err);
        return resolve(new Response(JSON.stringify({ message: 'Erreur parsing form' }), { status: 500 }));
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

      // Gestion pièces jointes
      const uploadedFiles = files.photos;
      let attachments = [];

      if (uploadedFiles) {
        const fileArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
        attachments = fileArray.map((file) => ({
          filename: file.originalFilename,
          content: fs.createReadStream(file.filepath),
        }));
      }

      const transporter = createTransporter();

      // 💡 Template HTML propre
      const htmlMessage = `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom:</strong> ${nom}</p>
        <p><strong>Prénom:</strong> ${prenom}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${tel}</p>
        <p><strong>Société:</strong> ${societe}</p>
        <p><strong>Type:</strong> ${type}</p>
        ${
          type === 'demande'
            ? `
            <h3>Informations sur le bien</h3>
            <p><strong>Localisation:</strong> ${localisation}</p>
            <p><strong>Surface:</strong> ${surface} m²</p>
            <p><strong>Chambres:</strong> ${chambres}</p>
            <p><strong>Salles de bain:</strong> ${sallesDeBain}</p>
          `
            : ''
        }
        <h3>Message:</h3>
        <p>${displayMessage}</p>
      `;

      try {
        await transporter.sendMail({
          from: `"${prenom} ${nom}" <${process.env.MAIL_USER}>`,
          to: 'contact@careconcierge.fr',
          subject: 'Nouveau message depuis le formulaire de contact',
          html: htmlMessage,
          attachments,
        });

        return resolve(new Response(JSON.stringify({ message: 'Message envoyé avec succès' }), { status: 200 }));
      } catch (error) {
        console.error('Erreur d’envoi:', error);
        return resolve(new Response(JSON.stringify({ message: 'Échec de l’envoi du message' }), { status: 500 }));
      }
    });
  });
}
