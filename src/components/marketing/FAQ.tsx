'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Welche Angaben sollte ich weitergeben?',
    answer:
      'Welche Angaben erforderlich sind, hängt vom Stand Ihrer Bewerbung ab. Geben Sie sensible Unterlagen nur weiter, wenn dies erforderlich ist und Sie dem Empfänger vertrauen.',
  },
  {
    question: 'Werden meine Daten gespeichert?',
    answer:
      'Ihre Formularangaben werden im Browser dieses Geräts gespeichert, bis Sie sie löschen. Für die Zahlung wird Ihre E-Mail-Adresse an Stripe übermittelt.',
  },
  {
    question: 'Kann ich die Selbstauskunft mehrfach verwenden?',
    answer:
      'Ja, nach dem Kauf können Sie das PDF beliebig oft herunterladen und für mehrere Bewerbungen verwenden. Sie können auch jederzeit eine neue Selbstauskunft mit aktualisierten Daten erstellen.',
  },
  {
    question: 'Was ist, wenn der Vermieter eine andere Vorlage will?',
    answer:
      'Unsere Selbstauskunft ist standardkonform und wird von den meisten Vermietern akzeptiert. Falls ein Vermieter ein spezielles Formular verlangt, können Sie unsere Vorlage als Orientierung nutzen und die Daten übertragen. Die meisten Vermieter schätzen eine professionelle, vollständige Selbstauskunft.',
  },
  {
    question: 'Wie sieht das PDF aus?',
    answer:
      'Das PDF hat ein professionelles, seriöses Layout mit klarer Struktur. Es enthält alle relevanten Informationen übersichtlich dargestellt, eine Unterschriftenzeile und eine Checkliste für empfohlene Anlagen. Sie können das PDF in der Vorschau ansehen, bevor Sie es kaufen.',
  },
  {
    question: 'Welche Zahlungsmethoden werden akzeptiert?',
    answer:
      'Die Zahlung erfolgt über Stripe mit den beim Checkout angezeigten Kartenzahlungsmethoden.',
  },
  {
    question: 'Bekomme ich eine Rechnung?',
    answer:
      'Ob und welche Zahlungsbestätigung Sie erhalten, hängt von der Konfiguration des Zahlungsdienstes ab. Bei Fragen wenden Sie sich an info@mietunterlagen.de.',
  },
  {
    question: 'Was passiert, wenn ich Fehler im PDF entdecke?',
    answer:
      'Sie können jederzeit zum Formular zurückkehren, Ihre Angaben korrigieren und ein neues PDF erstellen. Falls Sie bereits bezahlt haben und einen Fehler bemerken, kontaktieren Sie uns – wir helfen Ihnen gerne weiter.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-neutral-50">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-heading-xl md:text-display-sm font-bold text-neutral-900 mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg text-neutral-600">
            Alles, was Sie über unsere Mieter-Selbstauskunft wissen müssen
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-neutral-200 overflow-hidden transition-all hover:border-primary-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
              >
                <span className="font-semibold text-neutral-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-neutral-500 flex-shrink-0 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>

              <div
                className={cn(
                  'grid transition-all duration-200 ease-in-out',
                  openIndex === index
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
