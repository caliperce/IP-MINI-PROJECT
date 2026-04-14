import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className="relative w-full py-4 px-6 text-sm uppercase tracking-widest transition-all duration-300 rounded-lg overflow-hidden group"
      style={{
        background: isPrimary
          ? isDisabled
            ? 'rgba(255,85,0,0.3)'
            : 'linear-gradient(135deg, #FF5500 0%, #CC2200 100%)'
          : 'transparent',
        border: isPrimary
          ? 'none'
          : '1px solid rgba(255,85,0,0.35)',
        color: '#F5F0E8',
        fontFamily: 'inherit',
        fontWeight: 300,
        letterSpacing: '0.18em',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        boxShadow: isPrimary && !isDisabled
          ? '0 0 24px rgba(255,85,0,0.4), 0 4px 20px rgba(0,0,0,0.4)'
          : 'none',
        opacity: isDisabled ? 0.6 : 1,
        ...props.style,
      }}
      onMouseEnter={(e) => {
        if (isDisabled) return;
        if (isPrimary) {
          e.currentTarget.style.boxShadow =
            '0 0 40px rgba(255,85,0,0.6), 0 8px 30px rgba(0,0,0,0.5)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        } else {
          e.currentTarget.style.borderColor = 'rgba(255,85,0,0.7)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(255,85,0,0.2)';
          e.currentTarget.style.color = '#FF5500';
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (isDisabled) return;
        if (isPrimary) {
          e.currentTarget.style.boxShadow =
            '0 0 24px rgba(255,85,0,0.4), 0 4px 20px rgba(0,0,0,0.4)';
          e.currentTarget.style.transform = 'translateY(0)';
        } else {
          e.currentTarget.style.borderColor = 'rgba(255,85,0,0.35)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.color = '#F5F0E8';
        }
        props.onMouseLeave?.(e);
      }}
    >
      {/* Shimmer overlay for primary */}
      {isPrimary && !isDisabled && (
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
            transform: 'translateX(-100%)',
          }}
        />
      )}

      <span className="relative flex items-center justify-center gap-3">
        {loading && (
          <span
            className="inline-block w-4 h-4 rounded-full border border-white/30 border-t-white animate-spin"
            style={{ borderTopColor: '#F5F0E8', borderColor: 'rgba(245,240,232,0.3)' }}
          />
        )}
        {children}
      </span>
    </button>
  );
}
