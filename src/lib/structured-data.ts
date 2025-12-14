import { SITE_CONFIG, PDF_PRICE } from './constants';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mietunterlagen.de',
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@mietunterlagen.de',
    contactType: 'Customer Support',
    availableLanguage: ['German'],
  },
};

export const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mieter-Selbstauskunft Generator',
  url: SITE_CONFIG.url,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: (PDF_PRICE / 100).toFixed(2),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
  description: SITE_CONFIG.description,
  featureList: [
    'Rechtlich geprüfte Fragen',
    'Professionelles PDF-Layout',
    'Sofortiger Download',
    'Keine Datenspeicherung',
    'DSGVO-konform',
  ],
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ist die Selbstauskunft rechtlich sicher?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, alle Fragen in unserer Selbstauskunft entsprechen den gesetzlichen Anforderungen und dem Datenschutz. Wir fragen nur das, was Vermieter laut Gesetz fragen dürfen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Werden meine Daten gespeichert?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein, Ihre Daten werden ausschließlich zur Erstellung des PDFs verwendet und nicht auf unseren Servern gespeichert. Nach der PDF-Generierung werden alle Daten automatisch gelöscht.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ich die Selbstauskunft mehrfach verwenden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, nach dem Kauf können Sie das PDF beliebig oft herunterladen und für mehrere Bewerbungen verwenden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie viel kostet das PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das PDF kostet einmalig 9,00 EUR. Es gibt keine versteckten Kosten oder Abonnements.',
      },
    },
  ],
};

export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Mieter-Selbstauskunft PDF',
  description: 'Professionelle, rechtlich geprüfte Mieter-Selbstauskunft als PDF zum Download',
  brand: {
    '@type': 'Brand',
    name: 'Mietunterlagen.de',
  },
  offers: {
    '@type': 'Offer',
    price: (PDF_PRICE / 100).toFixed(2),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: `${SITE_CONFIG.url}/formular`,
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
  },
};
