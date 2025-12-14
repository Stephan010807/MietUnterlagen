import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mieter-Selbstauskunft erstellen',
  description:
    'Erstellen Sie Ihre professionelle Mieter-Selbstauskunft in 6 einfachen Schritten. Rechtlich geprüft, datenschutzkonform und sofort als PDF verfügbar.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function FormularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}