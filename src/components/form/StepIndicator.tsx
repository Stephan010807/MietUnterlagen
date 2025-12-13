'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps?: number[];
}

export function StepIndicator({
  currentStep,
  totalSteps,
  completedSteps = [],
}: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-600">
            Schritt {currentStep} von {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary-600">
            {Math.round((currentStep / totalSteps) * 100)}% abgeschlossen
          </span>
        </div>
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = completedSteps.includes(step);
          const isCurrent = step === currentStep;
          const isPast = step < currentStep;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                    isCurrent &&
                      'border-primary-600 bg-primary-600 text-white scale-110 shadow-soft-md',
                    isPast &&
                      'border-secondary-600 bg-secondary-600 text-white',
                    !isCurrent &&
                      !isPast &&
                      'border-neutral-300 bg-white text-neutral-400'
                  )}
                >
                  {isCompleted || isPast ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isCurrent && 'text-primary-700',
                    isPast && 'text-secondary-700',
                    !isCurrent && !isPast && 'text-neutral-400'
                  )}
                >
                  Schritt {step}
                </span>
              </div>
              {step < totalSteps && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-2 transition-all duration-300',
                    step < currentStep ? 'bg-secondary-600' : 'bg-neutral-300'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
