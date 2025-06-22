// test-mail.js

import "dotenv/config";
import { createTransporter } from "./lib/mailer.js"; // ou le chemin correct selon ta structure

async function run() {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: "contact@careconcierge.fr",   // Mets ici une autre adresse pour vérifier la réception
    subject: "Test OAuth2 depuis contact@careconcierge.fr",
    text: "Ceci est un mail de test envoyé via Nodemailer + OAuth2.",
  });
  console.log("Envoyé :", info);
}

run().catch(console.error);
