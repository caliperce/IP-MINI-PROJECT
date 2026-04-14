import { useState, type InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function FormInput({
  label,
  error,
  icon,
  ...props
}: FormInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={props.id}
        className="text-xs uppercase tracking-widest transition-all duration-200"
        style={{
          color: focused ? '#FF8C00' : '#8A7A6A',
          fontWeight: 300,
          letterSpacing: '0.16em',
          textShadow: focused ? '0 0 8px rgba(255,140,0,0.4)' : 'none',
        }}
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200"
            style={{ color: focused ? '#FF5500' : '#3D3530' }}
          >
            {icon}
          </div>
        )}
        <input
          {...props}
          id={props.id}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className="w-full py-4 text-sm transition-all duration-300 outline-none"
          style={{
            paddingLeft: icon ? '3rem' : '1.25rem',
            paddingRight: '1.25rem',
            background: focused ? '#0f0f0f' : '#0a0a0a',
            border: `1px solid ${
              error
                ? 'rgba(204,34,0,0.6)'
                : focused
                ? 'rgba(255,85,0,0.5)'
                : 'rgba(255,85,0,0.1)'
            }`,
            borderRadius: '8px',
            color: '#F5F0E8',
            fontFamily: 'inherit',
            fontWeight: 300,
            fontSize: '0.875rem',
            letterSpacing: '0.02em',
            boxShadow: focused
              ? error
                ? '0 0 16px rgba(204,34,0,0.2)'
                : '0 0 20px rgba(255,85,0,0.15), inset 0 0 20px rgba(255,85,0,0.03)'
              : 'none',
          }}
        />
      </div>
      {error && (
        <p
          className="text-xs"
          style={{ color: '#CC2200', fontWeight: 300, letterSpacing: '0.02em' }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
