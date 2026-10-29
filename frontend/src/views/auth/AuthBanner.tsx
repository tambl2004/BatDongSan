import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { navigate } from '../../router/router';

interface AuthBannerProps {
  image?: string;
  showBackHome?: boolean;
}

export const AuthBanner: React.FC<AuthBannerProps> = ({
  image = '/assets/images/login.png',
  showBackHome = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        flex: '1 1 50%',
        position: 'relative',
        minHeight: '100%',
        overflow: 'hidden',
        backgroundColor: '#0b132b'
      }}
    >
      {/* Nút về trang chủ ở phía trên cùng bên trái của Banner */}
      {showBackHome && (
        <button
          type="button"
          onClick={() => navigate('/')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            top: '1.75rem',
            left: '1.75rem',
            zIndex: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.55rem 1rem',
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: isHovered ? 'var(--green-primary)' : 'var(--text-main)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: isHovered ? 'translateX(-2px)' : 'none'
          }}
        >
          <ArrowLeft size={16} />
          <span>Về trang chủ</span>
        </button>
      )}

      <img
        src={image}
        alt="Real Estate Banner"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </div>
  );
};
