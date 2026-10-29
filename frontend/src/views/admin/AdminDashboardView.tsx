import React, { useState, useEffect } from 'react';
import { Property, PropertyStatus } from '../../types/property';
import { useAuth } from '../../context/AuthContext';
import { navigate } from '../../router/router';
import { AdminTab, AdminInquiry, InquiryStatus } from './types';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { AdminOverview } from './components/AdminOverview';
import { AdminProperties } from './components/AdminProperties';
import { AdminInquiries } from './components/AdminInquiries';
import { AdminUsers } from './components/AdminUsers';
import { AdminSettings } from './components/AdminSettings';
import { AdminCreateModal } from './components/AdminCreateModal';
import {
  fetchAdminInquiries,
  updateAdminInquiry,
  deleteAdminInquiry,
  updateAdminPropertyStatus,
  toggleAdminPropertyFeatured,
  updateAdminProperty,
  deleteAdminProperty
} from '../../services/adminApi';
import { ShieldAlert, LogIn, ArrowLeft } from 'lucide-react';
import { notify } from '../../utils/toast';

interface AdminDashboardViewProps {
  currentTab?: AdminTab;
  properties: Property[];
  onBackToUserView: () => void;
  onSelectProperty: (property: Property) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentTab,
  properties: initialProperties,
  onBackToUserView,
  onSelectProperty
}) => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>(currentTab || 'dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [propertiesList, setPropertiesList] = useState<Property[]>(initialProperties);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Sync route param with activeTab
  useEffect(() => {
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [currentTab]);

  // Handle Tab Change with explicit route navigation
  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    const targetUrl = tab === 'dashboard' ? '/admin' : `/admin/${tab}`;
    navigate(targetUrl);
  };

  // Sync initial properties if updated
  useEffect(() => {
    if (initialProperties && initialProperties.length > 0) {
      setPropertiesList(initialProperties);
    }
  }, [initialProperties]);

  // Load inquiries
  const loadInquiriesData = async () => {
    const res = await fetchAdminInquiries();
    if (res.data && res.data.length > 0) {
      setInquiries(res.data);
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
          status: 'new',
          message: 'Tôi muốn hẹn xem nhà trực tiếp vào chiều Thứ Bảy tuần này.',
          notes: 'Đã phân công môi giới Huy dẫn xem nhà lúc 15h.',
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
          notes: 'Đã gửi file PDF sổ qua Zalo.',
          createdAt: '2026-10-26T14:15:00Z'
        },
        {
          id: 'inq-003',
          fullName: 'Phạm Văn Hùng',
          phone: '0982 123 789',
          email: 'hung.pham@vietcapital.com',
          propertyTitle: 'Căn hộ 2PN hiện đại Lumiere Riverside An Phú view trọn công viên Metro',
          inquiryType: 'price_offer',
          status: 'scheduled',
          message: 'Đàm phán thương lượng thanh toán nhanh trong 10 ngày.',
          notes: 'Chờ chủ nhà phản hồi mức giảm giá 200tr.',
          createdAt: '2026-10-25T11:00:00Z'
        }
      ]);
    }
  };

  useEffect(() => {
    loadInquiriesData();
  }, []);

  // Handlers for Properties
  const handleAddProperty = (newProp: Property) => {
    setPropertiesList(prev => [newProp, ...prev]);
    notify.success(`Đã thêm mới tin BĐS: "${newProp.title}"`);
  };

  const handleUpdateProperty = async (updated: Property) => {
    setPropertiesList(prev => prev.map(p => p.id === updated.id ? updated : p));
    await updateAdminProperty(updated.id, updated);
    notify.success(`Đã cập nhật BĐS: "${updated.title}"`);
  };

  const handleDeleteProperty = async (id: string) => {
    setPropertiesList(prev => prev.filter(p => p.id !== id));
    await deleteAdminProperty(id);
    notify.success('Đã xóa bất động sản khỏi hệ thống');
  };

  const handleUpdateStatus = async (id: string, status: PropertyStatus) => {
    setPropertiesList(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    await updateAdminPropertyStatus(id, status);
    if (status === 'available') {
      notify.success('Đã phê duyệt tin đăng mở bán thành công!');
    } else if (status === 'rejected') {
      notify.warning('Đã từ chối phê duyệt tin đăng!');
    } else if (status === 'sold') {
      notify.info('Đã đánh dấu bất động sản đã giao dịch');
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const prop = propertiesList.find(p => p.id === id);
    const willBeFeatured = !prop?.featured;
    setPropertiesList(prev => prev.map(p => p.id === id ? { ...p, featured: willBeFeatured } : p));
    await toggleAdminPropertyFeatured(id);
    if (willBeFeatured) {
      notify.success('Đã ghim tin VIP nổi bật lên đầu trang chủ!');
    } else {
      notify.info('Đã bỏ ghim tin VIP nổi bật');
    }
  };

  // Handlers for Inquiries
  const handleUpdateInquiryStatus = async (id: string, status: InquiryStatus, notes?: string) => {
    setInquiries(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status, notes: notes !== undefined ? notes : item.notes }
          : item
      )
    );
    await updateAdminInquiry(id, { status, notes });
    notify.success('Đã cập nhật trạng thái xử lý yêu cầu tư vấn & khách hẹn');
  };

  const handleDeleteInquiry = async (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    await deleteAdminInquiry(id);
    notify.success('Đã xóa yêu cầu tư vấn khỏi hệ thống');
  };

  // ROLE CHECK: If not Admin, show clean security prompt
  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        padding: '1.5rem',
        color: '#ffffff',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '420px',
          width: '100%',
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: '#f43f5e'
          }}>
            <ShieldAlert size={32} />
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
            Khu Vực Quản Trị Hệ Thống
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Khu vực này yêu cầu tài khoản có đặc quyền Quản trị viên (<strong>admin@gmail.com</strong>).
            Vui lòng đăng nhập để tiếp tục quản lý hệ thống.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => navigate('/login?redirect=/admin')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                backgroundColor: '#059669',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
              }}
            >
              <LogIn size={16} />
              <span>Đăng nhập tài khoản Quản trị viên</span>
            </button>

            <button
              onClick={onBackToUserView}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(51, 65, 85, 0.5)',
                color: '#cbd5e1',
                fontWeight: 600,
                fontSize: '0.8rem',
                border: '1px solid #475569',
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

  // DEDICATED ADMIN PORTAL LAYOUT (Pure Inline Styles - Anti Overflow)
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      overflowX: 'hidden',
      display: 'flex',
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      boxSizing: 'border-box'
    }}>
      {/* 1. LEFT: Dedicated Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        propertyCount={propertiesList.length}
        inquiryCount={inquiries.length}
        onBackToUserView={onBackToUserView}
        isCollapsed={isSidebarCollapsed}
      />

      {/* 2. RIGHT: Admin Header & Dynamic Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        maxWidth: isSidebarCollapsed ? 'calc(100vw - 76px)' : 'calc(100vw - 270px)',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: '#f8fafc',
        boxSizing: 'border-box',
        transition: 'max-width 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {/* Admin Header */}
        <AdminHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onRefreshData={loadInquiriesData}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        />

        {/* Admin Main Body */}
        <main style={{
          flex: 1,
          padding: '1.5rem 2rem',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          overflowX: 'hidden'
        }}>
          {activeTab === 'dashboard' && (
            <AdminOverview
              properties={propertiesList}
              inquiries={inquiries}
              onNavigateToTab={(tab) => handleTabChange(tab)}
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
              onUpdateProperty={handleUpdateProperty}
              onUpdateStatus={handleUpdateStatus}
              onToggleFeatured={handleToggleFeatured}
            />
          )}

          {activeTab === 'inquiries' && (
            <AdminInquiries
              inquiries={inquiries}
              searchQuery={searchQuery}
              onUpdateInquiryStatus={handleUpdateInquiryStatus}
              onDeleteInquiry={handleDeleteInquiry}
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

export default AdminDashboardView;
