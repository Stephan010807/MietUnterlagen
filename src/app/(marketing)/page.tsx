import type { Metadata } from 'next';
import Link from 'next/link';
import { OFFER, PRICE_LABEL, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kostenlose Mieterselbstauskunft für Ihre Wohnungsbewerbung',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'MietUnterlagen für Ihre Wohnungsbewerbung',
    description: SITE_CONFIG.description,
    images: ['/og-image.jpeg'],
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_CONFIG.name, url: SITE_CONFIG.url,
      }) }} />
      <section className="bg-slate-100">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:py-24">
          <div>
            <h1 className="max-w-2xl break-words text-4xl font-bold tracking-tight sm:text-5xl">Ihre Unterlagen für die nächste Mietbewerbung</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-700">Erstellen Sie Ihre Mieterselbstauskunft kostenlos als PDF. Wenn Sie Ihre Bewerbung gesammelt verschicken möchten, ergänzen Sie ein Anschreiben und eigene PDF-Anlagen.</p>
            <Link href="/formular" className="mt-7 inline-block rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700">Kostenlose Selbstauskunft erstellen</Link>
          </div>
          <div className="self-center rounded-xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Bewerbungsmappe</h2>
            <p className="mt-2 text-3xl font-bold">{PRICE_LABEL} <span className="text-base font-normal">einmalig</span></p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Editierbares Anschreiben und Selbstauskunft</li>
              <li>Eigene PDF-Anlagen in gewählter Reihenfolge</li>
              <li>Kaufcode für Korrekturen und neue Exporte innerhalb von {OFFER.days} Tagen</li>
            </ul>
            <Link href="/formular#mappe" className="mt-4 inline-block font-medium underline">Zur Bewerbungsmappe</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl space-y-5 px-4 py-12" id="checkliste">
        <h2 className="text-2xl font-semibold">Checkliste für Ihre Wohnungsbewerbung</h2>
        <ol className="list-decimal space-y-3 pl-5 text-slate-700">
          <li><strong>Für die Kontaktaufnahme:</strong> Prüfen Sie das Inserat und geben Sie eine erreichbare Kontaktadresse an.</li>
          <li><strong>Für die engere Auswahl:</strong> Ergänzen Sie bei Bedarf Haushaltsgröße, Mitbewerbende und Einzugstermin. Prüfen Sie, welche Angaben für diesen Schritt erforderlich sind.</li>
          <li><strong>Wenn Nachweise erforderlich sind:</strong> Stellen Sie selbst passende PDF-Dateien bereit, etwa einen Einkommens- oder Studiennachweis. Prüfen Sie, welche Details Sie schwärzen können und wem Sie die Dokumente senden.</li>
        </ol>
      </section>
      <section className="mx-auto max-w-5xl space-y-3 px-4 pb-12">
        <h2 className="mb-4 text-2xl font-semibold">Häufige Fragen</h2>
        <details className="rounded-lg border p-4"><summary className="cursor-pointer font-medium">Wo werden meine Daten verarbeitet?</summary><p className="mt-2">Die kostenlose Selbstauskunft und Ihre Anlagen werden im Browser verarbeitet. Für den bezahlten Export werden Ihre Angaben und das Anschreiben zur PDF-Erstellung an MietUnterlagen übertragen. Die Zahlung erfolgt über Stripe.</p></details>
        <details className="rounded-lg border p-4"><summary className="cursor-pointer font-medium">Welche Unterlagen erhalte ich?</summary><p className="mt-2">Die Selbstauskunft enthält Ihre gewählten Angaben. Die Mappe ergänzt Anschreiben und von Ihnen ausgewählte PDFs. Nachweise wie eine Bonitätsauskunft oder Einkommensbelege beschaffen Sie selbst.</p></details>
        <details className="rounded-lg border p-4"><summary className="cursor-pointer font-medium">Wie stelle ich einen Kauf wieder her?</summary><p className="mt-2">Bewahren Sie den Kaufcode privat auf. Damit können Sie innerhalb von {OFFER.days} Tagen Ihre Mappe mit erneut eingegebenen oder lokal gespeicherten Angaben erstellen. Laden Sie eigene Anlagen erneut aus Ihren Dateien.</p></details>
      </section>
    </>
  );
}
