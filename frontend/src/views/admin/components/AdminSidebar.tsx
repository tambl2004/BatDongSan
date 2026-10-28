import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  MessageSquare,
  Settings,
  ArrowLeft,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { AdminTab } from '../types';
import { useAuth } from '../../../context/AuthContext';
import { navigate } from '../../../router/router';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  propertyCount: number;
  inquiryCount: number;
  onBackToUserView: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  propertyCount,
  inquiryCount,
  onBackToUserView
}) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      id: 'dashboard' as AdminTab,
      label: 'Tổng quan hệ thống',
      icon: LayoutDashboard,
      badge: undefined
    },
    {
      id: 'properties' as AdminTab,
      label: 'Quản lý Bất động sản',
      icon: Building2,
      badge: propertyCount > 0 ? `${propertyCount}` : undefined
    },
    {
      id: 'inquiries' as AdminTab,
      label: 'Khách hẹn & Tư vấn',
      icon: MessageSquare,
      badge: inquiryCount > 0 ? `${inquiryCount}` : undefined,
      badgeColor: '#059669'
    },
    {
      id: 'users' as AdminTab,
      label: 'Người dùng & Môi giới',
      icon: Users,
      badge: '4'
    },
    {
      id: 'settings' as AdminTab,
      label: 'Cài đặt hệ thống',
      icon: Settings,
      badge: undefined
    }
  ];

  return (
    <aside
      style={{
        width: '270px',
        minWidth: '270px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        userSelect: 'none'
      }}
    >
      {/* TOP: Brand & Logo */}
      <div>
        {/* Brand Header */}
        <div
          onClick={onBackToUserView}
          style={{
            padding: '1.25rem 1.4rem',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '9px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Building2 size={20} color="#059669" />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              batdongsan<span style={{ color: '#059669' }}>.vn</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ecfdf5',
                padding: '1px 6px',
                borderRadius: '4px',
                letterSpacing: '0.04em'
              }}>
                ADMIN PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* Main Nav Items */}
        <div style={{ padding: '1rem 0.85rem' }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0.25rem 0.65rem 0.5rem 0.65rem'
          }}>
            Phân hệ Quản trị
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#065f46' : '#475569',
                    backgroundColor: isActive ? '#ecfdf5' : 'transparent',
                    border: isActive ? '1px solid #a7f3d0' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.color = '#0f172a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', whiteSpace: 'nowrap' }}>
                    <Icon size={17} color={isActive ? '#059669' : '#64748b'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? '#059669' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#64748b',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Links Section */}
        <div style={{ padding: '0 0.85rem' }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0.5rem 0.65rem 0.35rem 0.65rem'
          }}>
            Liên kết sàn khách hàng
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <button
              type="button"
              onClick={() => navigate('/nha-dat-ban')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '7px 12px',
                borderRadius: '6px',
                fontSize: '0.825rem',
                color: '#64748b',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.color = '#0f172a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>Xem Nhà đất bán</span>
              <ExternalLink size={13} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/nha-dat-cho-thue')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '7px 12px',
                borderRadius: '6px',
                fontSize: '0.825rem',
                color: '#64748b',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.color = '#0f172a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>Xem Nhà đất cho thuê</span>
              <ExternalLink size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM: Current Admin Profile & Actions */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid #f1f5f9',
        backgroundColor: '#fafbfc'
      }}>
        {/* Admin User Info Card (Clean, No Slop) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '6px 8px',
          marginBottom: '0.75rem'
        }}>
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
            alt="Admin"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #a7f3d0',
              flexShrink: 0
            }}
          />
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#0f172a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {user?.fullName || 'Quản Trị Viên'}
            </div>
            <div style={{ fontSize: '0.725rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
              <ShieldCheck size={13} />
              <span>Super Admin</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Về sàn & Đăng xuất */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <button
            type="button"
            onClick={onBackToUserView}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '7px 8px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: '#ffffff',
              color: '#475569',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#475569';
            }}
          >
            <ArrowLeft size={13} />
            <span>Về sàn</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '7px 8px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              border: '1px solid #fecdd3',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fee2e2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2';
            }}
          >
            <LogOut size={13} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
