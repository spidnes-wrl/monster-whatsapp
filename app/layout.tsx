import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Monster — Un assistant WhatsApp personnel',
  description: 'Monster répond à ta place — seulement quand ça compte. Connecte ton numéro WhatsApp et laisse Monster gérer tes questions produits, disponibilités et contact.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-monster-bg text-monster-text font-body">
        {children}
      </body>
    </html>
  );
}
