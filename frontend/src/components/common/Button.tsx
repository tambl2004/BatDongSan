import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  style,
  disabled,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontWeight: 700,
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap'
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: '0.8rem' },
    md: { padding: '8px 16px', fontSize: '0.875rem' },
    lg: { padding: '11px 22px', fontSize: '0.95rem' }
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: '#059669', color: '#ffffff', border: 'none' },
    secondary: { backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0' },
    outline: { backgroundColor: 'transparent', color: '#059669', border: '1px solid #059669' },
    danger: { backgroundColor: '#dc2626', color: '#ffffff', border: 'none' }
  };

  return (
    <button
      disabled={disabled}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};
