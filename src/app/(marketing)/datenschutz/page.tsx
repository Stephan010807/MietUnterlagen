import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutz',
  alternates: { canonical: '/datenschutz' },
};

export default function Datenschutz() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-12">
      <h1 className="text-3xl font-bold">Datenschutz</h1>
      <h2 className="text-xl font-semibold">Verantwortlicher</h2>
      <p>Stephan Brockmeier, Ostendstraße 161, 90482 Nürnberg, <a className="underline" href="mailto:info@mietunterlagen.de">info@mietunterlagen.de</a>.</p>
      <h2 className="text-xl font-semibold">Formular, Anschreiben und Anlagen</h2>
      <p>Ihre Eingaben und die kostenlose PDF-Erstellung bleiben im Browser. Mit Ihrer Auswahl speichert der Browser Formular und Anschreiben auf diesem Gerät. Der vorbereitete Kaufcode wird lokal abgelegt, sofern der Browser dies zulässt. Sie können diese Einträge einschließlich Entwürfen aus der vorherigen Version im Formular löschen. Heruntergeladene Dateien verwalten Sie selbst. Anlagen werden im Browser verarbeitet und bei einem Seitenwechsel aus dem Formular entfernt.</p>
      <h2 className="text-xl font-semibold">Zahlung und Export</h2>
      <p>Stripe verarbeitet die im Checkout eingegebenen Kontakt- und Zahlungsdaten. Die Checkout-Session enthält die Angebotskennung und den Hash Ihres Kaufcode-Geheimnisses. Für die Prüfung des Kaufs fragen wir den zugehörigen Zahlungsstatus bei Stripe ab. Der Kaufcode erlaubt den Export innerhalb von 30 Tagen nach Zahlung. Zahlungsdaten bei Stripe unterliegen dessen Aufbewahrung und den für den Anbieter geltenden Pflichten.</p>
      <p>Wenn Sie den bezahlten Export auslösen und die Übermittlung bestätigen, verarbeitet unser Server Ihre Formularangaben und das Anschreiben für die Dauer der PDF-Erstellung. Die Anwendung speichert diese Inhalte und das erzeugte PDF nicht. Eigene PDF-Anlagen werden auf Ihrem Gerät angefügt.</p>
      <p>Weitere Informationen zur Zahlungsverarbeitung finden Sie in den <a className="underline" href="https://stripe.com/de/privacy">Datenschutzhinweisen von Stripe</a>.</p>
      <h2 className="text-xl font-semibold">Aufruf der Website und Rechte</h2>
      <p>Beim Aufruf fallen technische Verbindungsdaten an, etwa die IP-Adresse. Die Anwendung enthält keine Werbe- oder Analyse-Tags.</p>
      <p>Sie können sich für Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch an die oben genannte Kontaktadresse wenden. Sie können sich außerdem bei einer Datenschutzaufsichtsbehörde beschweren.</p>
    </article>
  );
}
