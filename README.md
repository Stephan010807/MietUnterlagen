# MietUnterlagen

Kostenlose Mieterselbstauskunft und optionale Bewerbungsmappe mit Anschreiben und eigenen PDF-Anlagen.

## Lokal starten

Node.js 24 verwenden.

    npm ci
    npm run dev
    npm run lint
    npm run typecheck
    npm test
    npm run build

Öffnen Sie http://localhost:3000. Ohne Stripe-Konfiguration funktionieren die kostenlose Selbstauskunft und der Anschreiben-Editor. Die Kauf-API bleibt gesperrt.

## Stripe testen und freigeben

1. **.env.example** nach **.env.local** kopieren. Stripe-Testschlüssel und Signaturgeheimnis eintragen. **CHECKOUT_ORIGIN** muss exakt dem Browser-Origin entsprechen.
2. Im Stripe-Testkonto Kartenzahlung aktivieren. Den lokalen Webhook mit Stripe CLI weiterleiten, das ausgegebene Test-Signaturgeheimnis eintragen und den Entwicklungsserver neu starten.

       stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded,charge.refunded,charge.dispute.created --forward-to localhost:3000/api/webhook

3. Testentwurf speichern, Anschreiben aus Vorlage erzeugen, Checkout vorbereiten und Kaufcode privat kopieren. Ausschließlich mit Stripe-Testkarte zahlen. Nach Rückkehr Kauf prüfen, Datei exportieren, Kaufcode in einem neuen Browserprofil prüfen und Anlagen erneut hinzufügen. Abbruch, Zahlungsfehler, verzögerte Bestätigung, Teil- und Vollerstattung sowie Antwort auf doppelte Webhooks prüfen. Eine Erstattung sperrt weitere Exporte. Bereits heruntergeladene PDFs bleiben beim Käufer.
4. Vor Livebetrieb die Freigabepunkte im Audit abarbeiten. Live erfordert HTTPS, passende Live-Schlüssel und **CHECKOUT_MODE=live**. Neue Käufe brauchen zusätzlich **CHECKOUT_NEW_ORDERS=true**. Vorhandene Kaufcodes aus demselben Stripe-Konto bleiben bei pausiertem Neukauf prüfbar. Bereits ausgestellte Stripe-Checkout-Links bleiben bis zu ihrem Ablauf verwendbar. Zum sofortigen Verkaufsstopp offene Sessions in Stripe beenden.

Preis und Angebotskennung liegen in **src/lib/constants.ts**. Bestehende Stripe-Sessions behalten ihren Betrag. Bei Preisänderungen die alte Angebotskennung samt Betrag für die Restlaufzeit weiter verifizieren und die neue Angebotsversion separat aktivieren.

[Audit und Freigabe](docs/audit/MietUnterlagen_Audit_2026.md) · [Marketing und Modell](docs/audit/Marketing_und_Wirtschaftlichkeit.md)
