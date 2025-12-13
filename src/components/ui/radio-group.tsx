import React from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, options, value, onChange, error, disabled }, ref) => {
    return (
      <div ref={ref} className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg border-2 transition-base cursor-pointer',
              value === option.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 hover:border-neutral-300 bg-white',
              error && 'border-red-500',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={disabled}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            />
            <div className="flex-1">
              <div className="font-medium text-neutral-900">{option.label}</div>
              {option.description && (
                <div className="text-sm text-neutral-600 mt-1">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
