

// app/api/contact/route.js
import formidable from 'formidable';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { createTransporter } from '../../../lib/mailer.js';

export const runtime = 'node';           // ← impératif pour fs & formidable
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
  // 1) on convertit la ReadableStream Web en flux Node
  const nodeStream = Readable.fromWeb(await req.body);
  nodeStream.headers = Object.fromEntries(req.headers);

  // 2) on parse en promisifiant formidable
  const { fields, files } = await new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, keepExtensions: true });
    form.parse(nodeStream, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  }).catch((err) => {
    console.error('Erreur parsing formidable :', err);
    throw new Error('Échec parsing formulaire');
  });

  // 3) sécurisation des champs
  const nom          = safeField(fields.nom);
  const prenom       = safeField(fields.prenom);
  const email        = safeField(fields.email);
  const tel          = safeField(fields.tel);
  const societe      = safeField(fields.societe);
  const message      = safeField(fields.message).replace(/\n/g, '<br/>');
  const type         = safeField(fields.type);
  const localisation = safeField(fields.localisation);
  const surface      = safeField(fields.surface);
  const chambres     = safeField(fields.chambres);
  const sallesDeBain = safeField(fields.sallesDeBain);

  // 4) constitution des attachments
  const attachments = [];

  // 4.a) logo
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    attachments.push({
      filename: 'logo.png',
      path: logoPath,
      cid: 'logo@careconcierge',
    });
  }

  // 4.b) photos uploadées
  if (files.photos) {
    const uploaded = Array.isArray(files.photos) ? files.photos : [files.photos];
    for (const file of uploaded) {
      if (fs.existsSync(file.filepath)) {
        attachments.push({
          filename: file.originalFilename,
          content: fs.createReadStream(file.filepath),
        });
      }
    }
  }

  // 5) construction du HTML
  const html = `
    <!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">
    <style>
      body{font-family:sans-serif;background:#f4f4f4;margin:0;padding:20px}
      .container{max-width:600px;background:#fff;padding:20px;border-radius:8px;margin:auto}
      h1{color:#333;text-align:center}
      .field{margin:10px 0}
      .label{font-weight:bold;color:#555}
    </style>
    </head><body><div class="container">
      <img src="cid:logo@careconcierge" alt="Logo" style="display:block;margin:0 auto 20px;max-width:150px"/>
      <h1>Nouvelle demande de contact</h1>
      ${[
        ['Nom', nom],
        ['Prénom', prenom],
        ['Email', email],
        ['Téléphone', tel],
        ['Société', societe],
        ['Type', type],
      ].map(([label, value]) => `
        <div class="field">
          <span class="label">${label} :</span> ${value || '—'}
        </div>
      `).join('')}

      ${type === 'demande' ? `
        <h2>Infos Bien</h2>
        ${[
          ['Localisation', localisation],
          ['Surface', surface && `${surface} m²`],
          ['Chambres', chambres],
          ['Salles de bain', sallesDeBain],
        ].map(([label, value]) => `
          <div class="field">
            <span class="label">${label} :</span> ${value || '—'}
          </div>
        `).join('')}
      ` : ''}

      <h2>Message</h2>
      <p>${message}</p>
    </div></body></html>
  `;

  // 6) envoi du mail
  try {
    const transporter = await createTransporter();
    await transporter.sendMail({
      from: `"${prenom} ${nom}" <${process.env.MAIL_USER}>`,
      to: 'contact@careconcierge.fr',
      subject: 'Nouveau message depuis Care Concierge Luxury',
      html,
      attachments,
    });

    // 7) suppression des fichiers temporaires
    if (files.photos) {
      const uploaded = Array.isArray(files.photos) ? files.photos : [files.photos];
      for (const file of uploaded) {
        fs.unlink(file.filepath, () => {});
      }
    }

    return NextResponse.json({ message: 'Message envoyé avec succès' }, { status: 200 });
  } catch (err) {
    console.error('Erreur d’envoi du mail :', err);
    return NextResponse.json({ message: 'Échec de l’envoi' }, { status: 500 });
  }
}
