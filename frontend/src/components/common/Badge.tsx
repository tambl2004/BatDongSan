import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'info' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md'
}) => {
  const styles: Record<string, { bg: string; color: string; border: string }> = {
    success: { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
    info: { bg: '#eff6ff', color: '#0284c7', border: '#bfdbfe' },
    warning: { bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
    danger: { bg: '#fef2f2', color: '#dc2626', border: '#fecdd3' },
    neutral: { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' }
  };

  const current = styles[variant] || styles.neutral;
  const padding = size === 'sm' ? '2px 6px' : '3px 9px';
  const fontSize = size === 'sm' ? '0.7rem' : '0.75rem';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: current.bg,
      color: current.color,
      border: `1px solid ${current.border}`,
      padding,
      fontSize,
      fontWeight: 700,
      borderRadius: '9999px',
      whiteSpace: 'nowrap'
    }}>
      {children}
    </span>
  );
};
