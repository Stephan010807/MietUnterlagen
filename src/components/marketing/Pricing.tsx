import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { PDF_PRICE } from '@/lib/constants';

const features = [
  'Professionelles PDF-Layout',
  'Rechtlich geprüfte Fragen',
  'Sofortiger Download',
  'Keine Datenspeicherung',
  'Mobil & Desktop optimiert',
  'Anlagen-Checkliste inklusive',
];

export function Pricing() {
  return (
    <section id="preise" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-heading-xl md:text-display-sm font-bold text-neutral-900 mb-4">
            Faire & transparente Preise
          </h2>
          <p className="text-lg text-neutral-600">
            Einmalige Zahlung, kein Abo, keine versteckten Kosten
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-300 rounded-2xl p-8 shadow-soft-xl">
            {/* Price */}
            <div className="text-center mb-8 pb-8 border-b border-primary-200">
              <div className="mb-2">
                <span className="text-5xl font-bold text-primary-900">
                  {formatCurrency(PDF_PRICE / 100)}
                </span>
              </div>
              <p className="text-neutral-600">
                Einmalige Zahlung, unbegrenzt nutzbar
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-secondary-100">
                    <Check className="h-4 w-4 text-secondary-600" />
                  </div>
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/formular">
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-lg"
              >
                Jetzt erstellen
              </Button>
            </Link>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-primary-200 flex items-center justify-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-secondary-600" />
                <span>Sichere Zahlung</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-secondary-600" />
                <span>Sofortiger Zugriff</span>
              </div>
            </div>
          </div>

          {/* Money-back hint */}
          <p className="text-center text-sm text-neutral-500 mt-6">
            Zufriedenheitsgarantie: Bei Problemen mit dem PDF helfen wir Ihnen
            kostenlos weiter.
          </p>
        </div>
      </div>
    </section>
  );
}
