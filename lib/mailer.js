// lib/mailer.js


// import nodemailer from "nodemailer";
// import { google } from "googleapis";

// const {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_REFRESH_TOKEN,
//   MAIL_USER,               // ex. "contact@careconcierge.fr"
// } = process.env;

// // L’URI de redirection peut rester le Playground si vous l’avez généré via OAuth Playground
// const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

// const oAuth2Client = new google.auth.OAuth2(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   OAUTH_PLAYGROUND
// );
// oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });


// export async function createTransporter() {
//   try {
//     console.log('→ Récupération du token OAuth2 Google...');
//     const { token: accessToken } = await oAuth2Client.getAccessToken();
//     if (!accessToken) throw new Error('No access token obtained from Google OAuth');
//     console.log('✅ Access token reçu.');

//     console.log('→ Création du transporteur Nodemailer...');
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: MAIL_USER,
//         clientId: GOOGLE_CLIENT_ID,
//         clientSecret: GOOGLE_CLIENT_SECRET,
//         refreshToken: GOOGLE_REFRESH_TOKEN,
//         accessToken,
//       },
//     });
//     console.log('✅ Transporteur Nodemailer prêt.');

//     return transporter;
//   } catch (error) {
//     console.error('❌ Erreur OAuth2 ou transport Nodemailer :', error);
//     throw error;
//   }
// }


// export async function createTransporter() {
//   // Récupère un access token valide
//   const { token: accessToken } = await oAuth2Client.getAccessToken();

//   return nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: MAIL_USER,
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       refreshToken: GOOGLE_REFRESH_TOKEN,
//       accessToken,
//     },
//   });
// }

import nodemailer from "nodemailer";
import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  MAIL_USER,
} = process.env;

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export async function createTransporter() {
  try {
    console.log('\n=== [MAILER] Création transporter ===');
    console.log('GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID?.slice(0, 8) + '...');
    console.log('MAIL_USER:', MAIL_USER);

    console.log('→ Récupération du token OAuth2 Google...');
    const { token: accessToken } = await oAuth2Client.getAccessToken();
    if (!accessToken) throw new Error('No access token obtained from Google OAuth');
    console.log('✅ Access token reçu (trunc):', String(accessToken).slice(0, 10) + '...');

    console.log('→ Création du transporteur Nodemailer...');
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MAIL_USER,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    });
    console.log('✅ Transporteur Nodemailer prêt.');
    return transporter;
  } catch (error) {
    console.error('❌ Erreur OAuth2 ou transport Nodemailer :', error);
    throw error;
  }
}
