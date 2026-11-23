import type { Metadata } from 'next';
import Script from 'next/script';
import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Pricing } from '@/components/marketing/Pricing';
import { FAQ } from '@/components/marketing/FAQ';
import { faqSchema, productSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Professionelle Mieter-Selbstauskunft in 5 Minuten erstellen',
  description:
    'Erstellen Sie eine professionelle Mieter-Selbstauskunft als PDF. Keine Anmeldung, sofort verfügbar, ohne Anmeldung. Jetzt für 9€ herunterladen.',
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
      {/* FAQ & Product Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
    </>
  );
}
