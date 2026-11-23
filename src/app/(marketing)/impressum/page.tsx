import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  alternates: { canonical: '/impressum' },
};

export default function Impressum() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-12">
      <h1 className="text-3xl font-bold">Impressum</h1>
      <h2 className="text-xl font-semibold">Anbieter nach § 5 DDG</h2>
      <p>Stephan Brockmeier<br />Ostendstraße 161<br />90482 Nürnberg</p>
      <h2 className="text-xl font-semibold">Kontakt</h2>
      <p><a className="underline" href="mailto:info@mietunterlagen.de">info@mietunterlagen.de</a></p>
    </article>
  );
}
