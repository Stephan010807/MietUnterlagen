import React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            'mt-1 h-5 w-5 rounded border-2 text-primary-600 transition-base cursor-pointer',
            'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-neutral-300 hover:border-neutral-400',
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <div className="font-medium text-neutral-900 group-hover:text-neutral-700">
                {label}
              </div>
            )}
            {description && (
              <div className="text-sm text-neutral-600 mt-1">{description}</div>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
