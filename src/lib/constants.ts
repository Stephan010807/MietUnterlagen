export const SITE_CONFIG = {
  name: 'MietUnterlagen',
  description: 'Kostenlose Mieterselbstauskunft erstellen und bei Bedarf eine Wohnungsbewerbung mit Anschreiben und eigenen PDF-Anlagen zusammenstellen.',
  url: 'https://www.mietunterlagen.de',
};

export const OFFER = {
  id: 'bewerbungsmappe-v1',
  amount: 900,
  currency: 'eur',
  name: 'Digitale Bewerbungsmappe',
  days: 30,
} as const;

export const PRICE_LABEL = new Intl.NumberFormat('de-DE', {
  style: 'currency', currency: OFFER.currency,
}).format(OFFER.amount / 100);
