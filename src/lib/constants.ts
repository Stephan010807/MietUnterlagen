export const SITE_CONFIG = {
  name: 'Mieter-Selbstauskunft Generator',
  description:
    'Professionelle Mieter-Selbstauskunft in 5 Minuten erstellen. Rechtlich geprüft, datenschutzkonform und sofort verfügbar.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://mietunterlagen.de',
  keywords: [
    'Mieter Selbstauskunft',
    'Selbstauskunft Wohnung',
    'Mieterselbstauskunft PDF',
    'Wohnung Bewerbung',
    'Selbstauskunft Vorlage',
  ],
};

export const PDF_PRICE = 900; // in cents (9.00 EUR)

export const EMPLOYMENT_STATUS = {
  EMPLOYED: 'employed',
  SELF_EMPLOYED: 'self-employed',
  STUDENT: 'student',
  UNEMPLOYED: 'unemployed',
  RETIRED: 'retired',
} as const;

export const FORM_STEPS = {
  PERSONAL_INFO: 1,
  EMPLOYMENT: 2,
  HOUSEHOLD: 3,
  FINANCIAL: 4,
  ADDITIONAL: 5,
  REVIEW: 6,
} as const;

export const TOTAL_STEPS = 6;
