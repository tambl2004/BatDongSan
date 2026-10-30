import React, { useState } from 'react';
import {
  Search,
  Bell,
  Plus,
  RefreshCw,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { AdminTab } from '../types';

interface AdminHeaderProps {
  activeTab: AdminTab;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCreateModal: () => void;
  onRefreshData?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  searchQuery,
  setSearchQuery,
  onOpenCreateModal,
  onRefreshData,
  isSidebarCollapsed = false,
  onToggleSidebar
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Tổng quan & Báo cáo số liệu';
      case 'properties':
        return 'Quản lý Danh mục Bất động sản';
      case 'moderation':
        return 'Kiểm duyệt Tin đăng & Phản hồi';
      case 'blog':
        return 'Quản lý Tin tức & Pháp luật BĐS';
      case 'inquiries':
        return 'Danh sách Khách hàng hẹn xem & Tư vấn';
      case 'users':
        return 'Quản lý Tài khoản & Môi giới';
      case 'settings':
        return 'Cấu hình & Cài đặt hệ thống';
      default:
        return 'Bảng điều khiển';
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefreshData) onRefreshData();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header
      style={{
        height: '66px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        userSelect: 'none'
      }}
    >
      {/* LEFT: Sidebar Toggle Button + Breadcrumb & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            title={isSidebarCollapsed ? 'Mở rộng menu điều hướng' : 'Thu gọn menu điều hướng'}
            aria-label="Thu phóng menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              color: '#334155',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ecfdf5';
              e.currentTarget.style.borderColor = '#a7f3d0';
              e.currentTarget.style.color = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#334155';
            }}
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          </button>
        )}

        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>
            <span>Hệ thống Quản Trị</span>
            <span>/</span>
            <span style={{ color: '#059669', fontWeight: 700 }}>
              {activeTab.toUpperCase()}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: '2px', whiteSpace: 'nowrap' }}>
            {getBreadcrumbTitle()}
          </h2>
        </div>
      </div>

      {/* RIGHT: Search, Action Buttons & Notifications */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', width: '270px' }}>
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '10px' }} />
          <input
            type="text"
            placeholder="Tìm BĐS, tên khách, số điện thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              outline: 'none',
              transition: 'all 0.15s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={handleRefresh}
          title="Làm mới dữ liệu"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--green-primary)';
            e.currentTarget.style.color = 'var(--green-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <RefreshCw size={15} style={{ transform: isRefreshing ? 'rotate(180deg)' : 'none', transition: 'transform 0.5s ease' }} />
        </button>

        {/* Notification Bell with Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Thông báo"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: showNotifications ? 'var(--bg-subtle)' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.15s ease'
            }}
          >
            <Bell size={16} />
            <span style={{
              position: 'absolute',
              top: '7px',
              right: '7px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              border: '1.5px solid #ffffff'
            }} />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '46px',
                width: '320px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '0.75rem 0',
                zIndex: 100
              }}
            >
              <div style={{ padding: '0 1rem 0.5rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Thông báo hệ thống (3 mới)
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--green-primary)', cursor: 'pointer', fontWeight: 600 }}>
                  Đã đọc tất cả
                </span>
              </div>

              <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--green-light)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-dark)' }}>
                    🔥 Khách hẹn xem Penthouse Masteri
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Trần Minh Đức vừa gửi yêu cầu hẹn xem nhà vào Thứ Bảy.
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    10 phút trước
                  </div>
                </div>

                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    📄 Yêu cầu trích lục sổ scan Riverside
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Khách hàng Lê Hoàng Yến đề nghị gửi hồ sơ pháp lý.
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    1 giờ trước
                  </div>
                </div>

                <div style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    ✅ Đồng bộ cơ sở dữ liệu thành công
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Hệ thống đã sao lưu 15,000+ bản ghi an toàn.
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Hôm qua
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PRIMARY ACTION: Add New Property Button */}
        <button
          type="button"
          onClick={onOpenCreateModal}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.55rem 1.15rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--green-primary)',
            color: '#ffffff',
            fontSize: '0.865rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--green-hover)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--green-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Plus size={16} />
          <span>Thêm BĐS mới</span>
        </button>
      </div>
    </header>
  );
};
