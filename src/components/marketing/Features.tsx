import {
  FileCheck,
  Clock,
  Shield,
  FileText,
  Euro,
  Smartphone,
} from 'lucide-react';

const features = [
  {
    icon: FileCheck,
    title: 'Rechtlich geprüfte Fragen',
    description:
      'Alle Fragen entsprechen den gesetzlichen Anforderungen und schützen Ihre Privatsphäre.',
  },
  {
    icon: Clock,
    title: 'In 5 Minuten fertig',
    description:
      'Einfache, geführte Schritte bringen Sie schnell zum professionellen Ergebnis.',
  },
  {
    icon: Shield,
    title: 'Keine Datenspeicherung',
    description:
      'Ihre Daten werden nur für die PDF-Erstellung verwendet und nicht gespeichert.',
  },
  {
    icon: FileText,
    title: 'Professionelles Layout',
    description:
      'Seriöses, übersichtliches Design, das bei Vermietern einen guten Eindruck hinterlässt.',
  },
  {
    icon: Euro,
    title: 'Einmalzahlung, kein Abo',
    description:
      'Transparente Preisgestaltung ohne versteckte Kosten oder wiederkehrende Gebühren.',
  },
  {
    icon: Smartphone,
    title: 'Mobil & Desktop',
    description:
      'Optimiert für alle Geräte – erstellen Sie Ihre Selbstauskunft unterwegs oder zu Hause.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-heading-xl md:text-display-sm font-bold text-neutral-900 mb-4">
            Warum unsere Selbstauskunft?
          </h2>
          <p className="text-lg text-neutral-600">
            Professionell, schnell und sicher – alles, was Sie für eine
            erfolgreiche Wohnungsbewerbung brauchen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-lg border border-neutral-200 hover:border-primary-300 hover:shadow-soft-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-heading-sm font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
