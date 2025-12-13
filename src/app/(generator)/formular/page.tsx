'use client';

import { useRouter } from 'next/navigation';
import { useFormStore } from '@/hooks/useFormStore';
import { StepIndicator } from '@/components/form/StepIndicator';
import { FormStep } from '@/components/form/FormStep';
import { FormNavigation } from '@/components/form/FormNavigation';
import { Step1PersonalInfo } from '@/components/form/steps/Step1PersonalInfo';
import { Step2Employment } from '@/components/form/steps/Step2Employment';
import { Step3Household } from '@/components/form/steps/Step3Household';
import { Step4Financial } from '@/components/form/steps/Step4Financial';
import { Step5Additional } from '@/components/form/steps/Step5Additional';
import { Step6Review } from '@/components/form/steps/Step6Review';
import { TOTAL_STEPS } from '@/lib/constants';
import type {
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from '@/lib/validators/form-schema';

export default function FormularPage() {
  const router = useRouter();
  const {
    currentStep,
    formData,
    completedSteps,
    updateFormData,
    nextStep,
    previousStep,
    markStepCompleted,
  } = useFormStore();

  const handleStep1Submit = (data: Step1Data) => {
    updateFormData(data);
    markStepCompleted(1);
    nextStep();
  };

  const handleStep2Submit = (data: Step2Data) => {
    updateFormData(data);
    markStepCompleted(2);
    nextStep();
  };

  const handleStep3Submit = (data: Step3Data) => {
    updateFormData(data);
    markStepCompleted(3);
    nextStep();
  };

  const handleStep4Submit = (data: Step4Data) => {
    updateFormData(data);
    markStepCompleted(4);
    nextStep();
  };

  const handleStep5Submit = (data: Step5Data) => {
    updateFormData(data);
    markStepCompleted(5);
    nextStep();
  };

  const handleStep6Submit = (data: Step6Data) => {
    updateFormData(data);
    markStepCompleted(6);
    // Navigate to preview page
    router.push('/vorschau');
  };

  const triggerFormSubmit = () => {
    const form = document.querySelector('form');
    if (form) {
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.click();
      }
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-heading-lg text-neutral-900 mb-3">
            Mieter-Selbstauskunft erstellen
          </h1>
          <p className="text-base text-neutral-600">
            Füllen Sie das Formular Schritt für Schritt aus. Alle Angaben werden
            nur für Ihre PDF-Erstellung verwendet und nicht gespeichert.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            completedSteps={completedSteps}
          />
        </div>

        {/* Form Steps */}
        <div className="mb-6">
          <FormStep
            title="Persönliche Angaben"
            description="Ihre grundlegenden Kontaktdaten"
            isActive={currentStep === 1}
          >
            <Step1PersonalInfo
              defaultValues={formData}
              onSubmit={handleStep1Submit}
            />
          </FormStep>

          <FormStep
            title="Beschäftigung & Einkommen"
            description="Angaben zu Ihrer beruflichen Situation"
            isActive={currentStep === 2}
          >
            <Step2Employment
              defaultValues={formData}
              onSubmit={handleStep2Submit}
            />
          </FormStep>

          <FormStep
            title="Haushalt"
            description="Informationen zum zukünftigen Haushalt"
            isActive={currentStep === 3}
          >
            <Step3Household
              defaultValues={formData}
              onSubmit={handleStep3Submit}
            />
          </FormStep>

          <FormStep
            title="Finanzielle Situation"
            description="SCHUFA und Bonität"
            isActive={currentStep === 4}
          >
            <Step4Financial
              defaultValues={formData}
              onSubmit={handleStep4Submit}
            />
          </FormStep>

          <FormStep
            title="Zusätzliche Informationen"
            description="Optionale Angaben, die Ihre Bewerbung stärken"
            isActive={currentStep === 5}
          >
            <Step5Additional
              defaultValues={formData}
              onSubmit={handleStep5Submit}
            />
          </FormStep>

          <FormStep
            title="Überprüfung & Bestätigung"
            description="Überprüfen Sie Ihre Angaben"
            isActive={currentStep === 6}
          >
            <Step6Review
              defaultValues={formData}
              formData={formData}
              onSubmit={handleStep6Submit}
            />
          </FormStep>
        </div>

        {/* Navigation */}
        <FormNavigation
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onPrevious={previousStep}
          onNext={triggerFormSubmit}
        />
      </div>
    </div>
  );
}
