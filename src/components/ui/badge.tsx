import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-100 text-neutral-700 border-neutral-200',
      success: 'bg-secondary-100 text-secondary-700 border-secondary-200',
      warning: 'bg-accent-100 text-accent-700 border-accent-200',
      error: 'bg-red-100 text-red-700 border-red-200',
      info: 'bg-primary-100 text-primary-700 border-primary-200',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
