import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: { default: SITE_CONFIG.name, template: `%s | ${SITE_CONFIG.name}` },
  metadataBase: new URL(SITE_CONFIG.url),
  description: SITE_CONFIG.description,
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: SITE_CONFIG.name,
    images: ['/og-image.jpeg'],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.jpeg'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:p-3">Zum Inhalt springen</a>
        <header className="border-b border-slate-200">
          <nav aria-label="Hauptnavigation" className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
            <Link href="/" className="text-lg font-bold">MietUnterlagen</Link>
            <Link href="/formular" className="font-medium underline underline-offset-4">Bewerbung erstellen</Link>
          </nav>
        </header>
        <main id="inhalt" className="flex-1">{children}</main>
        <footer className="border-t border-slate-200">
          <nav aria-label="Rechtliches" className="mx-auto flex max-w-5xl flex-wrap gap-5 px-4 py-6 text-sm underline">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <a href="mailto:info@mietunterlagen.de">Kontakt</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
