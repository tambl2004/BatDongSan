import React, { useState, useEffect } from 'react';
import { Property } from '../../types/property';
import { fetchInquiries } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { navigate } from '../../router/router';
import { AdminTab, AdminInquiry } from './types';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { AdminOverview } from './components/AdminOverview';
import { AdminProperties } from './components/AdminProperties';
import { AdminInquiries } from './components/AdminInquiries';
import { AdminUsers } from './components/AdminUsers';
import { AdminSettings } from './components/AdminSettings';
import { AdminCreateModal } from './components/AdminCreateModal';
import { ShieldAlert, LogIn, ArrowLeft } from 'lucide-react';

interface AdminDashboardViewProps {
  properties: Property[];
  onBackToUserView: () => void;
  onSelectProperty: (property: Property) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  properties: initialProperties,
  onBackToUserView,
  onSelectProperty
}) => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [propertiesList, setPropertiesList] = useState<Property[]>(initialProperties);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sync initial properties if updated
  useEffect(() => {
    if (initialProperties && initialProperties.length > 0) {
      setPropertiesList(initialProperties);
    }
  }, [initialProperties]);

  // Load inquiries
  const loadInquiriesData = async () => {
    const data = await fetchInquiries();
    if (data && data.length > 0) {
      setInquiries(data);
    } else {
      // Fallback realistic demo inquiries
      setInquiries([
        {
          id: 'inq-001',
          fullName: 'Trần Minh Đức',
          phone: '0918 889 999',
          email: 'duc.tran@investor.vn',
          propertyTitle: 'Căn hộ Penthouse Masteri Thảo Điền view trọn sông Sài Gòn & Landmark 81',
          inquiryType: 'viewing',
          status: 'pending',
          message: 'Tôi muốn hẹn xem nhà trực tiếp vào chiều Thứ Bảy tuần này.',
          createdAt: '2026-10-27T08:30:00Z'
        },
        {
          id: 'inq-002',
          fullName: 'Lê Hoàng Yến',
          phone: '0903 555 777',
          email: 'yen.le@gmail.com',
          propertyTitle: 'Biệt thự đơn lập Vinhomes Riverside Hoa Sữa đẳng cấp ven hồ sinh thái',
          inquiryType: 'consultation',
          status: 'contacted',
          message: 'Xin file sổ đỏ scan và bảng tính dự toán thuế sang tên.',
          createdAt: '2026-10-26T14:15:00Z'
        },
        {
          id: 'inq-003',
          fullName: 'Phạm Văn Hùng',
          phone: '0982 123 789',
          email: 'hung.pham@vietcapital.com',
          propertyTitle: 'Căn hộ 2PN hiện đại Lumiere Riverside An Phú view trọn công viên Metro',
          inquiryType: 'price_offer',
          status: 'pending',
          message: 'Đàm phán thương lượng thanh toán nhanh trong 10 ngày.',
          createdAt: '2026-10-25T11:00:00Z'
        }
      ]);
    }
  };

  useEffect(() => {
    loadInquiriesData();
  }, []);

  const handleToggleInquiryStatus = (id: string) => {
    setInquiries(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'contacted' ? 'pending' : 'contacted' }
          : item
      )
    );
  };

  const handleAddProperty = (newProp: Property) => {
    setPropertiesList(prev => [newProp, ...prev]);
  };

  const handleDeleteProperty = (id: string) => {
    setPropertiesList(prev => prev.filter(p => p.id !== id));
  };

  // ROLE CHECK: If not Admin, show clean security prompt
  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#090d16',
        padding: '1.5rem',
        color: '#ffffff'
      }}>
        <div style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#111827',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <ShieldAlert size={32} color="#ef4444" />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.6rem', color: '#ffffff' }}>
            Khu Vực Quản Trị Hệ Thống
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            Khu vực này yêu cầu tài khoản có đặc quyền Quản trị viên (<strong>admin@gmail.com</strong>).
            Vui lòng đăng nhập để tiếp tục quản lý hệ thống.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => navigate('/login?redirect=/admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.85rem',
                borderRadius: '8px',
                backgroundColor: '#10b981',
                color: '#ffffff',
                fontSize: '0.925rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
              }}
            >
              <LogIn size={16} />
              <span>Đăng nhập tài khoản Quản trị viên</span>
            </button>

            <button
              onClick={onBackToUserView}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#cbd5e1',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              <span>Quay về trang sàn giao dịch</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DEDICATED ADMIN PORTAL LAYOUT
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#f8fafc',
      color: 'var(--text-main)'
    }}>
      {/* 1. LEFT: Dedicated Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        propertyCount={propertiesList.length}
        inquiryCount={inquiries.length}
        onBackToUserView={onBackToUserView}
      />

      {/* 2. RIGHT: Admin Header & Dynamic Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100vh',
        overflowY: 'auto'
      }}>
        {/* Admin Header */}
        <AdminHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onRefreshData={loadInquiriesData}
        />

        {/* Admin Main Body */}
        <main style={{ flex: 1, padding: '2rem' }}>
          {activeTab === 'dashboard' && (
            <AdminOverview
              properties={propertiesList}
              inquiries={inquiries}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onSelectProperty={onSelectProperty}
            />
          )}

          {activeTab === 'properties' && (
            <AdminProperties
              properties={propertiesList}
              searchQuery={searchQuery}
              onSelectProperty={onSelectProperty}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
              onDeleteProperty={handleDeleteProperty}
            />
          )}

          {activeTab === 'inquiries' && (
            <AdminInquiries
              inquiries={inquiries}
              searchQuery={searchQuery}
              onToggleStatus={handleToggleInquiryStatus}
            />
          )}

          {activeTab === 'users' && <AdminUsers />}

          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>

      {/* Modal create property */}
      <AdminCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddProperty={handleAddProperty}
      />
    </div>
  );
};
