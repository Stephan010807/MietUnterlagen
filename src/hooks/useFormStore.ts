'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SelbstauskunftData, FormStepData } from '@/types/form';
import { TOTAL_STEPS } from '@/lib/constants';

interface FormState {
  currentStep: number;
  formData: FormStepData;
  completedSteps: number[];
  setFormData: (data: FormStepData) => void;
  updateFormData: (stepData: FormStepData) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  markStepCompleted: (step: number) => void;
  resetForm: () => void;
}

const initialFormData: FormStepData = {
  currentAddress: {
    street: '',
    houseNumber: '',
    zipCode: '',
    city: '',
  },
  householdSize: 1,
  hasPets: false,
  hasSchufa: true,
  hasRentalArrears: false,
  isSmoker: false,
  consentToDataProcessing: false,
  confirmedAccuracy: false,
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: initialFormData,
      completedSteps: [],

      setFormData: (data) => set({ formData: data }),

      updateFormData: (stepData) =>
        set((state) => ({
          formData: { ...state.formData, ...stepData },
        })),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS),
        })),

      previousStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      goToStep: (step) =>
        set(() => ({
          currentStep: Math.min(Math.max(step, 1), TOTAL_STEPS),
        })),

      markStepCompleted: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      resetForm: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
          completedSteps: [],
        }),
    }),
    {
      name: 'mieter-selbstauskunft-form',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
      }),
    }
  )
);
