import React from 'react';

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', ...props }, ref) => (
    <select
      ref={ref}
      className={`w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors ${className}`}
      {...props}
    />
  )
);

Select.displayName = 'Select';
