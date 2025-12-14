import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Kontaktdaten des Mieter-Selbstauskunft Generators',
};

export default function ImpressumPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl prose prose-neutral">
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Stephan Brockmeier
          <br />
          Ostendstraße 161
          <br />
          90482 Nürnberg
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: –
          <br />
          E-Mail: info@mietunterlagen.de
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Keine Umsatzsteuer-Identifikationsnummer vorhanden, da Kleinunternehmer
          im Sinne des § 19 UStG.
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Stephan Brockmeier
          <br />
          Ostendstraße 161
          <br />
          90482 Nürnberg
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          .
        </p>
        <p>
          Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf
          diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
          bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder
          nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
          hinweisen.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Mein Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
      </div>
    </div>
  );
}