import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Pricing } from '@/components/marketing/Pricing';
import { FAQ } from '@/components/marketing/FAQ';

export const metadata: Metadata = {
  title: 'Professionelle Mieter-Selbstauskunft in 5 Minuten erstellen',
  description:
    'Erstellen Sie eine rechtlich geprüfte, professionelle Mieter-Selbstauskunft als PDF. Keine Anmeldung, sofort verfügbar, datenschutzkonform. Jetzt für 9€ herunterladen.',
  keywords: [
    'Mieter Selbstauskunft',
    'Selbstauskunft Wohnung',
    'Mieterselbstauskunft PDF',
    'Wohnung Bewerbung',
    'Selbstauskunft Vorlage',
    'Selbstauskunft erstellen',
  ],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
    </>
  );
}
