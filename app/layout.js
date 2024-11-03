// app/layout.js
import './globals.css';

import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-slate-50">
        {/* Header is included in Page component, so we can omit it here */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
