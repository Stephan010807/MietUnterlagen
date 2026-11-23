# Vermarktung und Wirtschaftlichkeit

## Markt und Positionierung

- ImmoScout24 und Immowelt veröffentlichen kostenlose Selbstauskunft-Vorlagen. ImmoScout24 bietet auch ein Mappenmuster an. Gegen diese Angebote ist ein einzelnes Selbstauskunft-PDF für 9 € schwer zu differenzieren. [ImmoScout24 Selbstauskunft](https://www.immobilienscout24.de/wissen/vermieten/mieter-selbstauskunft.html) · [Immowelt](https://www.immowelt.de/ratgeber/mieten/mieterselbstauskunft) · [Mappenmuster](https://www.immobilienscout24.de/wissen/mieten/vorlage-bewerbermappe.html)
- ImmoScout24 bündelt die Bewerbermappe in Suchen+ mit Portalvorteilen. Im am 23. November 2026 abgerufenen Warenkorb standen Einstiegspreise ab 12,99 €, 17,99 € und 34,99 € pro Monat. Angebote und Laufzeiten können variieren. Diese Preise sagen wenig über Zahlungsbereitschaft für einen einzelnen PDF-Export aus. [Leistungsübersicht](https://www.immobilienscout24.de/suchende/suchenplus-mitgliedschaft-mieten.html) · [Warenkorb](https://www.immobilienscout24.de/warenkorb/mieterplus)
- Kostenlose Textgeneratoren können ein Anschreiben umformulieren. Der zu testende Mehrwert liegt im Arbeitsablauf, beim geordneten Einbetten eigener PDFs und bei späteren Korrekturen mit Kaufcode. Kostenlose PDF-Programme bieten ebenfalls Zusammenfügen an. Zahlungsbereitschaft für die Kombination ist offen.

## Szenarien

Modell mit **node docs/audit/unit-economics.mjs** ausführen. Alle Conversion-, Klickpreis-, Erstattungs-, Streitfall- und Betriebskostenwerte sind Annahmen. Es lagen keine Geschäftsdaten vor. Die 0-%-Variante dient der Sensitivität. Die steuerliche Behandlung muss der Betreiber klären. Die Modellgebühr von 1,5 % plus 0,25 € für EWR-Standardkarten sowie 20 € je eingegangener Zahlungsanfechtung orientiert sich an Stripe. Kartentypen, Zusatzleistungen und der individuelle Vertrag können abweichen. [Stripe-Preise Deutschland](https://stripe.com/de/pricing)

Umsatzsteuer mindert den Nettoumsatz. Vollerstattungen und verlorene Streitfälle mindern den behaltenen Umsatz. Die Modellrechnung behält die ursprüngliche Kartengebühr auf jeder Zahlung bei. Variable Kosten enthalten einen pauschalen Ansatz für Infrastruktur und Support. KI-Kosten sind 0 €. Fixkosten wie Entwicklung und Steuern auf den Unternehmensgewinn fehlen. CAC ist Klickpreis geteilt durch die Quote bezahlter Bestellungen je Klick. ROAS nutzt den behaltenen Bruttoumsatz. Ads-ROI ist der Deckungsbeitrag abzüglich Werbekosten geteilt durch den Werbeeinsatz. Der Break-even-Klickpreis ist der Deckungsbeitrag vor Ads mal Conversion-Rate. Die Break-even-Conversion-Rate ist Klickpreis geteilt durch den Deckungsbeitrag vor Ads.

| Szenario | Annahmen CPC / Kaufquote | DB vor Ads | CAC | ROAS | Ads-ROI | Break-even-CPC / Kaufquote |
| --- | --- | --- | --- | --- | --- | --- |
| Vorsichtig | 0,80 € / 1 % | 6,04 € | 80,00 € | 0,10 | −92,4 % | 0,060 € / 13,24 % |
| Mittel | 0,45 € / 3 % | 6,60 € | 15,00 € | 0,58 | −56,0 % | 0,198 € / 6,82 % |
| Optimistisch | 0,30 € / 6,5 % | 8,27 € | 4,62 € | 1,91 | 79,2 % | 0,538 € / 3,63 % |

## Kontrollierter Ads-Test nach Freigabe

| Suchabsicht | Startbegriffe als Exact/Phrase | Anzeige und Zielseite |
| --- | --- | --- |
| Mappe erstellen | „bewerbungsmappe wohnung erstellen“, „mietbewerbung pdf“, „wohnungsbewerbung unterlagen pdf“ | „Bewerbungsmappe für Ihre Wohnung“ / „Anschreiben und eigene PDFs in einer Datei. 9 € einmalig.“ Ziel /formular#mappe oder passende Startseiten-Variante. |
| Selbstauskunft | „mieterselbstauskunft kostenlos pdf“, „mieterselbstauskunft erstellen“ | „Mieterselbstauskunft kostenlos“ / „PDF ausfüllen und direkt herunterladen.“ Ziel /formular. Erst separat testen, wenn die Hauptgruppe Ergebnisse liefert. |
| Anschreiben | „anschreiben wohnungsbewerbung vorlage“ | Zuerst organisch. Vorlage bearbeiten und bei Bedarf gemeinsam mit Anlagen exportieren. |

Ausschlüsse anhand echter Suchanfragen prüfen, etwa „Job“, „Stellenbewerbung“, „Vermieter auswählen“, „SCHUFA kaufen“, „Bonitätscheck“, „Mietvertrag“ und in der Mappengruppe ggf. „kostenlos“.

### Messung

| Ereignis | Definition |
| --- | --- |
| landing_view | Einstieg auf einer Kampagnenzielseite |
| form_start | Erste Interaktion mit dem Formular. Nur das Ereignis erfassen |
| free_export | Kostenlose PDF-Datei erfolgreich erstellt |
| checkout_start | Stripe-Session erzeugt |
| purchase_verified | Eindeutige bezahlte Stripe-Session für das versionierte Angebot. Abgleich mit Erstattungen und Streitfällen |
| packet_export | Bezahltes PDF inklusive gewählter Anlagen erstellt. Mehrfache Exporte zählen nicht als Käufe |

Aktuell sind keine Client- oder Ads-Events aktiv. Stripe-Berichte erlauben einen aggregierten Abgleich von bezahlten Sessions, Erstattungen und Streitfällen. Eine Danke-Seite, Webhook-Zustellungen und Exportzähler eignen sich nicht als Kaufzähler. Für spätere Attribution eindeutig auf Session oder PaymentIntent deduplizieren und die Angebotsversion prüfen. Die Kampagnenzuordnung braucht ein rechtlich geprüftes Einwilligungs- und Löschkonzept. Keine Bewerbungsdaten, Anlagen, Freitexte, E-Mails oder Kaufcodes an Werbeplattformen übermitteln.

### Budget und Entscheidungsregeln

Szenario nach Freigabe: maximal 90 € über 14 Tage in der Gruppe „Mappe erstellen“, mit Tageslimit und zunächst ca. 0,15 € Ziel-CPC. Der mittlere Deckungsbeitrag von rund 6,60 € ergibt bei 3 % Conversion rund 0,20 € Break-even-CPC. Bei zu wenig Reichweite zuerst Suchbegriffe und Angebot prüfen.

- Bei 50 Klicks Suchanfragen und Checkout-Fehler auswerten. Bei überwiegend unpassenden Suchanfragen pausieren.
- Bei 100 Klicks und null verifizierten Käufen pausieren. Bei 45 € Ausgaben und einem beobachteten CAC oberhalb des Deckungsbeitrags ebenfalls pausieren und Ursache prüfen.
- Budget erst erhöhen, wenn ausreichend viele Käufe vorliegen und CAC einschließlich Unsicherheit und Erstattungen unter dem Deckungsbeitrag liegt. Kleine Stichproben liefern erste Diagnosewerte. Es wurde keine Kampagne gestartet.
