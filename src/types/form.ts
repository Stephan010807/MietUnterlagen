export interface SelbstauskunftData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  currentAddress: {
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
  };
  phone: string;
  email: string;

  // Step 2: Employment
  employmentStatus:
    | 'employed'
    | 'self-employed'
    | 'student'
    | 'unemployed'
    | 'retired';
  employer?: string;
  position?: string;
  employedSince?: string;
  university?: string;
  monthlyNetIncome: string;
  additionalIncome?: string;

  // Step 3: Household
  householdSize: number;
  moveInDate?: string;
  hasPets: boolean;
  petDetails?: string;

  // Step 4: Financial
  hasSchufa: boolean;
  schufaScore?: string;
  hasRentalArrears: boolean;
  rentalArrearsDetails?: string;

  // Step 5: Additional Information
  isSmoker: boolean;
  messageToLandlord?: string;
  previousLandlord?: {
    name: string;
    phone: string;
  };

  // Step 6: Review & Consent
  consentToDataProcessing: boolean;
  confirmedAccuracy: boolean;
}

export type FormStepData = Partial<SelbstauskunftData>;
