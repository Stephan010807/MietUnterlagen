import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileEdit, Eye, Download } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: FileEdit,
    title: 'Formular ausfüllen',
    description:
      'Beantworten Sie in 6 einfachen Schritten alle relevanten Fragen. Unser System führt Sie durch den Prozess.',
    time: '~5 Minuten',
  },
  {
    number: '2',
    icon: Eye,
    title: 'Vorschau prüfen',
    description:
      'Sehen Sie sich Ihre fertige Selbstauskunft als PDF an und stellen Sie sicher, dass alles korrekt ist.',
    time: '~1 Minute',
  },
  {
    number: '3',
    icon: Download,
    title: 'PDF herunterladen',
    description:
      'Nach der Zahlung (9,00 €) laden Sie Ihr professionelles PDF herunter und bewerben sich auf Ihre Traumwohnung.',
    time: 'Sofort',
  },
];

export function HowItWorks() {
  return (
    <section
      id="wie-es-funktioniert"
      className="py-20 md:py-28 bg-neutral-50"
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-heading-xl md:text-display-sm font-bold text-neutral-900 mb-4">
            So einfach geht's
          </h2>
          <p className="text-lg text-neutral-600">
            In nur drei Schritten zu Ihrer professionellen Mieter-Selbstauskunft
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector line (hidden on mobile) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-primary-200" />
                  )}

                  <div className="relative bg-white rounded-lg p-8 shadow-soft-md text-center">
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-xl shadow-soft-md">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mt-6 mb-6 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-heading-sm font-semibold text-neutral-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 text-xs font-medium text-secondary-700">
                      {step.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link href="/formular">
              <Button variant="primary" size="lg" className="shadow-lg">
                Jetzt loslegen
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
