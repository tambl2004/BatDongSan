import React, { useState, useRef, useEffect } from 'react';
import { Heart, LogOut, Shield, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { navigate } from '../router/router';
import { notify } from '../utils/toast';

interface NavbarProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  activeTab: 'home' | 'sale' | 'rent' | 'blog';
  setActiveTab: (tab: 'home' | 'sale' | 'rent' | 'blog') => void;
  isAdminView?: boolean;
  onToggleAdminView?: () => void;
  onOpenCreateListing?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoriteCount,
  onOpenFavorites,
  activeTab,
  setActiveTab,
  isAdminView,
  onToggleAdminView,
  onOpenCreateListing
}) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection to switch from transparent to white background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePostListingClick = () => {
    if (!isAuthenticated) {
      notify.warning('Bạn cần đăng nhập tài khoản để thực hiện đăng tin bất động sản.');
      navigate('/login?redirect=/dang-tin');
      return;
    }

    if (onOpenCreateListing) {
      onOpenCreateListing();
    } else {
      notify.info(`Xin chào ${user?.fullName}, cổng đăng tin chính chủ đã mở sẵn cho tài khoản của bạn.`);
    }
  };

  const isTransparent = activeTab === 'home' && !isAdminView && !isScrolled;

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: isTransparent ? 'transparent' : 'rgba(255, 255, 255, 0.96)',
      backdropFilter: isTransparent ? 'none' : 'blur(12px)',
      boxShadow: isTransparent ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand */}
        <div
          onClick={() => {
            setActiveTab('home');
            navigate('/');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <img
            src="/assets/images/logo/Logo_GreenNest.png"
            alt="GreenNest"
            style={{
              height: '42px',
              maxWidth: '220px',
              objectFit: 'contain',
              display: 'block',
              transition: 'filter 0.3s ease'
            }}
          />
        </div>

        {/* Minimal Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {[
            { id: 'home', label: 'Trang chủ' },
            { id: 'sale', label: 'Nhà đất bán' },
            { id: 'rent', label: 'Nhà đất cho thuê' },
            { id: 'blog', label: 'Tin tức' }
          ].map((item) => {
            const isActive = activeTab === item.id && !isAdminView;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                style={{
                  fontSize: '1rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive
                    ? (isTransparent ? '#ffffff' : 'var(--green-primary)')
                    : (isTransparent ? 'rgba(255, 255, 255, 0.9)' : 'var(--text-secondary)'),
                  borderBottom: isActive
                    ? (isTransparent ? '2px solid #ffffff' : '2px solid var(--green-primary)')
                    : '2px solid transparent',
                  padding: '6px 0',
                  transition: 'color 0.15s ease',
                  textShadow: isTransparent ? '0 1px 4px rgba(0, 0, 0, 0.5)' : 'none'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Admin Portal Toggle - Only visible to Admin accounts */}
          {isAdmin && onToggleAdminView && (
            <button
              onClick={onToggleAdminView}
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                border: isAdminView ? '1px solid var(--green-primary)' : '1px solid rgba(255,255,255,0.3)',
                backgroundColor: isAdminView
                  ? 'var(--green-light)'
                  : (isTransparent ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-subtle)'),
                color: isAdminView
                  ? 'var(--green-dark)'
                  : (isTransparent ? '#ffffff' : 'var(--text-secondary)'),
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Chuyển sang giao diện quản trị"
            >
              <Shield size={13} color={isTransparent ? '#ffffff' : 'var(--green-primary)'} />
              <span>{isAdminView ? 'Quản trị viên ✓' : 'Quản trị'}</span>
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
              color: favoriteCount > 0
                ? '#ef4444'
                : (isTransparent ? '#ffffff' : 'var(--text-secondary)'),
              filter: isTransparent && favoriteCount === 0 ? 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' : 'none',
              transition: 'color 0.2s ease',
              cursor: 'pointer'
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

          {/* User Auth Section (Only displays avatar if logged in, separate login button removed) */}
          {isAuthenticated && user && (
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-pill)',
                  border: isTransparent ? '1px solid rgba(255,255,255,0.4)' : '1px solid var(--border)',
                  backgroundColor: isTransparent ? 'rgba(255,255,255,0.2)' : 'var(--bg-subtle)',
                  cursor: 'pointer',
                  backdropFilter: isTransparent ? 'blur(8px)' : 'none'
                }}
              >
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                  alt={user.fullName}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: isTransparent ? '#ffffff' : 'var(--text-main)',
                    textShadow: isTransparent ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'
                  }}>
                    {user.fullName.split(' ').slice(-1)[0]}
                  </div>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: user.role === 'admin'
                      ? (isTransparent ? '#86efac' : 'var(--green-primary)')
                      : (isTransparent ? '#e2e8f0' : 'var(--text-muted)')
                  }}>
                    {user.role === 'admin' ? 'Admin' : 'Thành viên'}
                  </div>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '40px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  width: '220px',
                  zIndex: 200,
                  padding: '0.5rem 0'
                }}>
                  <div style={{ padding: '0.65rem 1rem', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {user.fullName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.email}
                    </div>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: user.role === 'admin' ? 'var(--green-light)' : 'var(--bg-subtle)',
                      color: user.role === 'admin' ? 'var(--green-dark)' : 'var(--text-secondary)'
                    }}>
                      {user.role === 'admin' ? 'Quản Trị Viên' : 'Khách Hàng / Môi Giới'}
                    </span>
                  </div>

                  {user.role !== 'admin' && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handlePostListingClick();
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.6rem 1rem',
                        fontSize: '0.825rem',
                        color: 'var(--text-main)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <PlusCircle size={14} color="var(--green-primary)" />
                      <span>Đăng tin BĐS mới</span>
                    </button>
                  )}

                  <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '4px 0' }} />

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                      notify.info('Đã đăng xuất tài khoản an toàn');
                      navigate('/');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.6rem 1rem',
                      fontSize: '0.825rem',
                      color: '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <LogOut size={14} />
                    <span>Đăng xuất tài khoản</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Clean Green CTA: Đăng tin */}
          <button
            onClick={handlePostListingClick}
            className="btn-primary"
            style={{
              padding: '0.6rem 1.35rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              borderRadius: '9999px',
              boxShadow: isTransparent ? '0 4px 16px rgba(5, 150, 105, 0.45)' : 'none',
              cursor: 'pointer'
            }}
          >
            Đăng tin
          </button>
        </div>
      </div>
    </header>
  );
};
