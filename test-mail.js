// test-mail.js
import "dotenv/config";                 // <-- charge automatiquement .env

import { createTransporter } from "./lib/mailer.js";

async function run() {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: `"Test" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    subject: "Test Nodemailer OAuth2",
    text: "Ça fonctionne !",
  });
  console.log("Envoyé :", info.messageId);
}

run().catch(console.error);
