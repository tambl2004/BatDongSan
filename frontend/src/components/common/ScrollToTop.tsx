import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    // Check initial scroll position
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Cuộn lên đầu trang"
      title="Cuộn lên đầu trang"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        backgroundColor: isHovered ? '#047857' : 'var(--green-primary, #059669)',
        color: '#ffffff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: isHovered
          ? '0 6px 20px rgba(4, 120, 87, 0.45)'
          : '0 4px 14px rgba(5, 150, 105, 0.35)',
        transform: isVisible
          ? isHovered
            ? 'translateY(-3px) scale(1.05)'
            : 'translateY(0) scale(1)'
          : 'translateY(16px) scale(0.85)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 90
      }}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTop;
