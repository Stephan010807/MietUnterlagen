'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  isNextLoading?: boolean;
  nextButtonText?: string;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isNextDisabled = false,
  isNextLoading = false,
  nextButtonText,
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
      <div>
        {!isFirstStep && onPrevious && (
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onPrevious}
            className="gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            Zurück
          </Button>
        )}
      </div>
      <div>
        {onNext && (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onNext}
            disabled={isNextDisabled}
            loading={isNextLoading}
            className="gap-2"
          >
            {nextButtonText || (isLastStep ? 'Weiter zur Vorschau' : 'Weiter')}
            {!isLastStep && <ChevronRight className="h-5 w-5" />}
          </Button>
        )}
      </div>
    </div>
  );
}
