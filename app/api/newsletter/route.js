import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email, interests } = await req.json();

  if (!email || !Array.isArray(interests)) {
    return new Response(JSON.stringify({ message: 'Email et intérêts requis' }), {
      status: 400,
    });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // ex: smtp.gmail.com
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Newsletter" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: 'Nouvelle inscription à la newsletter',
    text: `Nouvelle inscription : ${email}\n\nIntérêts :\n${interests.join('\n')}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Inscription réussie' }), { status: 200 });
  } catch (error) {
    console.error('Erreur Nodemailer:', error);
    return new Response(JSON.stringify({ message: 'Erreur serveur' }), { status: 500 });
  }
}
