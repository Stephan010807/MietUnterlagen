import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung für den Mieter-Selbstauskunft Generator - Informationen zur Verarbeitung Ihrer Daten',
};

export default function DatenschutzPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl prose prose-neutral">
        <h1>Datenschutzerklärung</h1>

        <p className="lead">
          Ihre Privatsphäre ist uns wichtig. Diese Datenschutzerklärung erklärt,
          wie wir mit Ihren personenbezogenen Daten umgehen.
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          [Ihr Name/Firmenname]
          <br />
          [Ihre Adresse]
          <br />
          E-Mail: [Ihre E-Mail]
        </p>

        <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
        <p>
          Beim Erstellen Ihrer Mieter-Selbstauskunft geben Sie verschiedene
          personenbezogene Daten ein, darunter:
        </p>
        <ul>
          <li>Name, Geburtsdatum, Geburtsort</li>
          <li>Aktuelle Adresse</li>
          <li>Kontaktdaten (E-Mail, Telefon)</li>
          <li>Beschäftigungsinformationen</li>
          <li>Einkommensdaten</li>
        </ul>

        <h2>3. Zweck der Datenverarbeitung</h2>
        <p>Ihre Daten werden ausschließlich für folgende Zwecke verwendet:</p>
        <ul>
          <li>Erstellung Ihrer personalisierten Selbstauskunft als PDF</li>
          <li>Abwicklung der Zahlung über Stripe</li>
          <li>Versand der Kaufbestätigung per E-Mail</li>
        </ul>

        <h2>4. Keine Datenspeicherung</h2>
        <p>
          <strong>Wichtig:</strong> Ihre Formulardaten werden{' '}
          <strong>nicht dauerhaft</strong> auf unseren Servern gespeichert. Die
          Daten werden ausschließlich im Browser verarbeitet und nach der
          PDF-Generierung automatisch gelöscht.
        </p>

        <h2>5. Cookies und lokale Speicherung</h2>
        <p>
          Wir verwenden LocalStorage in Ihrem Browser, um Ihre Formularfortschritte
          temporär zu speichern. Dies dient ausschließlich Ihrer Bequemlichkeit,
          damit Sie das Formular nicht bei jedem Besuch neu ausfüllen müssen. Sie
          können diese Daten jederzeit in Ihren Browser-Einstellungen löschen.
        </p>

        <h2>6. Weitergabe von Daten</h2>
        <p>Wir geben Ihre Daten nur in folgenden Fällen weiter:</p>
        <ul>
          <li>
            <strong>Stripe:</strong> Zahlungsinformationen werden an Stripe
            übertragen (siehe Stripe-Datenschutzerklärung)
          </li>
          <li>
            <strong>Rechtliche Verpflichtung:</strong> Wenn gesetzlich
            vorgeschrieben
          </li>
        </ul>

        <h2>7. Ihre Rechte</h2>
        <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
        <ul>
          <li>Recht auf Auskunft</li>
          <li>Recht auf Berichtigung</li>
          <li>Recht auf Löschung</li>
          <li>Recht auf Einschränkung der Verarbeitung</li>
          <li>Recht auf Datenübertragbarkeit</li>
          <li>Widerspruchsrecht</li>
        </ul>

        <h2>8. Kontakt</h2>
        <p>
          Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter:
          <br />
          E-Mail: datenschutz@mieter-selbstauskunft.de
        </p>

        <p className="text-sm text-neutral-600">
          Stand: {new Date().toLocaleDateString('de-DE')}
        </p>
      </div>
    </div>
  );
}
