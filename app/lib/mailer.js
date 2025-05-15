import nodemailer from 'nodemailer';

/**
 * Crée un transporteur Nodemailer en utilisant les variables d'environnement.
 * Exige les variables :
 * - MAIL_HOST
 * - MAIL_PORT
 * - MAIL_USER
 * - MAIL_PASS
 * - MAIL_SECURE (optionnel : true ou false)
 */
export function createTransporter() {
  if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error("🚨 Configuration SMTP incomplète. Vérifiez vos variables d'environnement.");
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 465,
    secure: process.env.MAIL_SECURE === 'false' ? false : true, // par défaut SSL/TLS (port 465)
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}
