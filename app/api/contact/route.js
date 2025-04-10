import formidable from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Must be a named export!
export async function POST(req) {
  const form = formidable({ multiples: true });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Erreur parsing form:', err);
        return resolve(
          new Response(JSON.stringify({ message: 'Erreur serveur' }), {
            status: 500,
          })
        );
      }

      const {
        nom,
        prenom,
        societe,
        message,
        type,
        localisation,
        surface,
        chambres,
        sallesDeBain,
      } = fields;

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

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const htmlMessage = `
        <h2>Demande de contact</h2>
        <p><strong>Nom:</strong> ${nom}</p>
        <p><strong>Prénom:</strong> ${prenom}</p>
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
        <p>${message?.replace(/\n/g, '<br/>')}</p>
      `;

      try {
        await transporter.sendMail({
          from: `"${prenom} ${nom}" <${process.env.MAIL_USER}>`,
          to: 'destination@email.com',
          subject: 'Nouveau message depuis le formulaire de contact',
          html: htmlMessage,
          attachments,
        });

        return resolve(
          new Response(JSON.stringify({ message: 'Message envoyé avec succès' }), {
            status: 200,
          })
        );
      } catch (error) {
        console.error('Erreur d’envoi:', error);
        return resolve(
          new Response(JSON.stringify({ message: 'Échec de l’envoi du message' }), {
            status: 500,
          })
        );
      }
    });
  });
}
