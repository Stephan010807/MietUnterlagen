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
    'Strukturierte Angaben',
    'Professionelles PDF-Layout',
    'Sofortiger Download',
    'Lokale Speicherung im Browser',
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
        text: 'Welche Angaben erforderlich sind, hängt vom Stand Ihrer Bewerbung ab.',
      },
    },
    {
      '@type': 'Question',
      name: 'Werden meine Daten gespeichert?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Formularangaben werden lokal im Browser gespeichert, bis Sie sie löschen. Für den Checkout wird Ihre E-Mail-Adresse übermittelt.',
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
  description: 'Professionelle Mieter-Selbstauskunft als PDF zum Download',
  image: `${SITE_CONFIG.url}/og-image.jpg`,
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
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'DE',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 0,
          maxValue: 0,
          unitCode: 'DAY',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 0,
          maxValue: 0,
          unitCode: 'DAY',
        },
      },
    },
  },
};