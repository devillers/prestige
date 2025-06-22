// test-mail.js
// import "dotenv/config";                 // <-- charge automatiquement .env

// import { createTransporter } from "./lib/mailer.js";

// async function run() {
//   const transporter = await createTransporter();
//   const info = await transporter.sendMail({
//     from: `"Test" <${process.env.MAIL_USER}>`,
//     to: process.env.MAIL_USER,
//     subject: "Test Nodemailer OAuth2",
//     text: "Ça fonctionne !",
//   });
//   console.log("Envoyé :", info.messageId);
// }

// run().catch(console.error);


import "dotenv/config";
import { createTransporter } from "./lib/mailer.js"; // ou le chemin correct selon ta structure

async function run() {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: "davidevillers@gmail.com",   // Mets ici une autre adresse pour vérifier la réception
    subject: "Test OAuth2 depuis contact@careconcierge.fr",
    text: "Ceci est un mail de test envoyé via Nodemailer + OAuth2.",
  });
  console.log("Envoyé :", info);
}

run().catch(console.error);
