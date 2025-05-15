import { createTransporter } from '../../lib/mailer';

export async function GET() {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return new Response(JSON.stringify({ message: "✅ SMTP valide et authentifié." }), { status: 200 });
  } catch (error) {
    console.error("Erreur SMTP :", error);
    return new Response(JSON.stringify({ message: "❌ Erreur SMTP", error: error.message }), { status: 500 });
  }
}
