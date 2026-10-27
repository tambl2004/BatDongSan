import React from 'react';
import { Heart, PhoneCall, Building2 } from 'lucide-react';

interface NavbarProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  activeTab: 'home' | 'sale' | 'rent' | 'blog';
  setActiveTab: (tab: 'home' | 'sale' | 'rent' | 'blog') => void;
  isAdminView?: boolean;
  onToggleAdminView?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoriteCount,
  onOpenFavorites,
  activeTab,
  setActiveTab,
  isAdminView,
  onToggleAdminView
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand */}
        <div
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            color: 'var(--green-primary)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Building2 size={24} strokeWidth={2.2} />
          </div>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-main)'
          }}>
            batdongsan<span style={{ color: 'var(--green-primary)' }}>.vn</span>
          </span>
        </div>

        {/* Minimal Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {[
            { id: 'home', label: 'Trang chủ' },
            { id: 'sale', label: 'Nhà đất bán' },
            { id: 'rent', label: 'Nhà đất cho thuê' },
            { id: 'blog', label: 'Blog' }
          ].map((item) => {
            const isActive = activeTab === item.id && !isAdminView;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                style={{
                  fontSize: '0.925rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--green-primary)' : 'var(--text-secondary)',
                  borderBottom: isActive ? '2px solid var(--green-primary)' : '2px solid transparent',
                  padding: '6px 0',
                  transition: 'color 0.15s ease'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Admin Portal Toggle */}
          {onToggleAdminView && (
            <button
              onClick={onToggleAdminView}
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                border: isAdminView ? '1px solid var(--green-primary)' : '1px solid var(--border)',
                backgroundColor: isAdminView ? 'var(--green-light)' : 'var(--bg-subtle)',
                color: isAdminView ? 'var(--green-dark)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
              title="Chuyển sang giao diện quản trị"
            >
              {isAdminView ? 'Quản trị viên ✓' : 'Quản trị'}
            </button>
          )}

          {/* Favorite button */}
          <button
            onClick={onOpenFavorites}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              color: favoriteCount > 0 ? '#ef4444' : 'var(--text-secondary)'
            }}
            title="Bất động sản đã lưu"
          >
            <Heart size={20} fill={favoriteCount > 0 ? '#ef4444' : 'none'} />
            {favoriteCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-4px',
                background: '#ef4444',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Hotline */}
          <a
            href="tel:19006868"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-secondary)'
            }}
          >
            <PhoneCall size={16} color="var(--green-primary)" />
            <span>1900 6868</span>
          </a>

          {/* Clean Green CTA */}
          <button
            onClick={() => alert('Chức năng đăng tin chính chủ đã sẵn sàng.')}
            className="btn-primary"
          >
            Đăng tin
          </button>
        </div>
      </div>
    </header>
  );
};
