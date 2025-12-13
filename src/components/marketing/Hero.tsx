import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-700">
            <Check className="h-4 w-4" />
            Keine Anmeldung erforderlich
          </div>

          {/* Headline */}
          <h1 className="text-display-md md:text-display-lg font-bold text-neutral-900 mb-6">
            Professionelle Mieter-Selbstauskunft{' '}
            <span className="text-primary-600">in 5 Minuten</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Erstellen Sie eine rechtlich geprüfte, professionelle Selbstauskunft
            für Ihre Wohnungsbewerbung. Datenschutz-konform, sofort verfügbar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/formular">
              <Button variant="primary" size="lg" className="gap-2 shadow-lg">
                Jetzt erstellen
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#wie-es-funktioniert">
              <Button variant="outline" size="lg">
                Wie es funktioniert
              </Button>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
              <Check className="h-5 w-5 text-secondary-600 flex-shrink-0" />
              <span>Keine Datenspeicherung</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
              <Check className="h-5 w-5 text-secondary-600 flex-shrink-0" />
              <span>Sofort verfügbar</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
              <Check className="h-5 w-5 text-secondary-600 flex-shrink-0" />
              <span>Einmalzahlung, kein Abo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-primary-200 rounded-full opacity-20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200 rounded-full opacity-20 blur-3xl"
        aria-hidden="true"
      />
    </section>
  );
}
