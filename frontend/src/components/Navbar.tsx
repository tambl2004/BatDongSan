import React, { useState, useRef, useEffect } from 'react';
import { Heart, PhoneCall, LogOut, Shield, PlusCircle, LogIn } from 'lucide-react';
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
  const userMenuRef = useRef<HTMLDivElement>(null);

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
              display: 'block'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Admin Portal Toggle - Only visible to Admin accounts */}
          {isAdmin && onToggleAdminView && (
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
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Chuyển sang giao diện quản trị"
            >
              <Shield size={13} color="var(--green-primary)" />
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

          {/* User Auth Section */}
          {isAuthenticated && user ? (
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  cursor: 'pointer'
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
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {user.fullName.split(' ').slice(-1)[0]}
                  </div>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: user.role === 'admin' ? 'var(--green-primary)' : 'var(--text-muted)'
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

                  {/* Đối với thành viên thường (không phải admin): hiển thị mục Đăng tin trong menu */}
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
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: '#ffffff',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--green-primary)';
                e.currentTarget.style.color = 'var(--green-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-main)';
              }}
            >
              <LogIn size={15} color="var(--green-primary)" />
              <span>Đăng nhập</span>
            </button>
          )}

          {/* Clean Green CTA: Đăng tin */}
          <button
            onClick={handlePostListingClick}
            className="btn-primary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.875rem' }}
          >
            Đăng tin
          </button>
        </div>
      </div>
    </header>
  );
};
