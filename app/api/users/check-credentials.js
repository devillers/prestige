// app/api/users/check-credentials/route.js
import { connectDb } from '@/lib/db.mjs';
import User from '@/models/User.mjs';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Champs manquants' }), { status: 400 });
    }

    await connectDb();
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return new Response(JSON.stringify({ message: 'Identifiants invalides' }), { status: 401 });
    }

    return new Response(JSON.stringify({ id: user._id, email: user.email, role: user.role || 'user' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Erreur login:', err);
    return new Response(JSON.stringify({ message: 'Erreur serveur', error: err.message }), { status: 500 });
  }
}
