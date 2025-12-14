import { z } from 'zod';

// Step 1: Personal Information
export const step1Schema = z.object({
  firstName: z.string().min(1, 'Vorname ist erforderlich'),
  lastName: z.string().min(1, 'Nachname ist erforderlich'),
  birthDate: z.string().min(1, 'Geburtsdatum ist erforderlich'),
  birthPlace: z.string().min(1, 'Geburtsort ist erforderlich'),
  currentAddress: z.object({
    street: z.string().min(1, 'Straße ist erforderlich'),
    houseNumber: z.string().min(1, 'Hausnummer ist erforderlich'),
    zipCode: z
      .string()
      .min(5, 'PLZ muss 5 Ziffern haben')
      .max(5, 'PLZ muss 5 Ziffern haben')
      .regex(/^\d+$/, 'PLZ darf nur Zahlen enthalten'),
    city: z.string().min(1, 'Stadt ist erforderlich'),
  }),
  phone: z
    .string()
    .min(1, 'Telefonnummer ist erforderlich')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Ungültige Telefonnummer'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
});

// Step 2: Employment
export const step2Schema = z
  .object({
    employmentStatus: z.enum(
      ['employed', 'self-employed', 'student', 'unemployed', 'retired'],
      {
        required_error: 'Beschäftigungsstatus ist erforderlich',
      }
    ),
    employer: z.string().optional(),
    position: z.string().optional(),
    employedSince: z.string().optional(),
    university: z.string().optional(),
    monthlyNetIncome: z.string().min(1, 'Nettoeinkommen ist erforderlich'),
    additionalIncome: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.employmentStatus === 'employed' ||
        data.employmentStatus === 'self-employed') &&
      !data.employer
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Arbeitgeber ist erforderlich',
        path: ['employer'],
      });
    }
    if (data.employmentStatus === 'student' && !data.university) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Universität/Hochschule ist erforderlich',
        path: ['university'],
      });
    }
  });

// Step 3: Household
export const step3Schema = z.object({
  householdSize: z
    .number()
    .min(1, 'Mindestens 1 Person')
    .max(20, 'Maximal 20 Personen'),
  moveInDate: z.string().optional(),
  hasPets: z.boolean(),
  petDetails: z.string().optional(),
});

// Step 4: Financial
export const step4Schema = z
  .object({
    hasSchufa: z.boolean(),
    schufaScore: z.string().optional(),
    hasRentalArrears: z.boolean(),
    rentalArrearsDetails: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasRentalArrears && !data.rentalArrearsDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bitte erläutern Sie die Mietrückstände',
        path: ['rentalArrearsDetails'],
      });
    }
  });

// Step 5: Additional Information
export const step5Schema = z.object({
  isSmoker: z.boolean(),
  messageToLandlord: z.string().max(500, 'Maximal 500 Zeichen').optional(),
  previousLandlord: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
});

// Step 6: Review & Consent
export const step6Schema = z.object({
  consentToDataProcessing: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Sie müssen der Datenverarbeitung zustimmen',
    }),
  confirmedAccuracy: z.boolean().refine((val) => val === true, {
    message: 'Sie müssen bestätigen, dass alle Angaben korrekt sind',
  }),
});

// Complete form schema - merging all schemas
export const completeFormSchema = step1Schema
  .merge(
    z.object({
      employmentStatus: z.enum(
        ['employed', 'self-employed', 'student', 'unemployed', 'retired'],
        {
          required_error: 'Beschäftigungsstatus ist erforderlich',
        }
      ),
      employer: z.string().optional(),
      position: z.string().optional(),
      employedSince: z.string().optional(),
      university: z.string().optional(),
      monthlyNetIncome: z.string().min(1, 'Nettoeinkommen ist erforderlich'),
      additionalIncome: z.string().optional(),
    })
  )
  .merge(step3Schema)
  .merge(
    z.object({
      hasSchufa: z.boolean(),
      schufaScore: z.string().optional(),
      hasRentalArrears: z.boolean(),
      rentalArrearsDetails: z.string().optional(),
    })
  )
  .merge(step5Schema)
  .merge(step6Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;
export type Step6Data = z.infer<typeof step6Schema>;
export type CompleteFormData = z.infer<typeof completeFormSchema>;
