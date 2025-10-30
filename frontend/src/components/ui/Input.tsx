import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

type InputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseInputProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const baseClasses = 'w-full bg-background-dark border rounded-lg px-4 py-2.5 text-text-dark-heading focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder:text-text-dark-body/50';
    const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-white/10';
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-dark-body mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseClasses} ${errorClasses} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-text-dark-body/70">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', rows = 4, ...props }, ref) => {
    const baseClasses = 'w-full bg-background-dark border rounded-lg px-4 py-2.5 text-text-dark-heading focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder:text-text-dark-body/50 resize-none';
    const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-white/10';
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-dark-body mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`${baseClasses} ${errorClasses} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-text-dark-body/70">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

