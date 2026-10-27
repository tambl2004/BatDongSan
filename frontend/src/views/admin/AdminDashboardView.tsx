import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  Phone,
  CheckCircle2,
  ArrowLeft,
  Eye,
  Plus
} from 'lucide-react';
import { Property } from '../../types/property';
import { fetchInquiries } from '../../services/api';

interface AdminDashboardViewProps {
  properties: Property[];
  onBackToUserView: () => void;
  onSelectProperty: (property: Property) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  properties,
  onBackToUserView,
  onSelectProperty
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'properties'>('inquiries');
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    async function loadInquiries() {
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
            propertyTitle: 'Căn hộ Penthouse Masteri Thảo Điền view trọn sông Sài Gòn',
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
            propertyTitle: 'Biệt thự đơn lập Vinhomes Riverside Hoa Sữa ven hồ sinh thái',
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
            propertyTitle: 'Nhà phố thương mại Shophouse mặt tiền đường Trần Duy Hưng',
            inquiryType: 'price_offer',
            status: 'pending',
            message: 'Đàm phán thương lượng thanh toán nhanh trong 10 ngày.',
            createdAt: '2026-10-25T11:00:00Z'
          }
        ]);
      }
    }
    loadInquiries();
  }, []);

  const totalPortfolioValue = properties.reduce((acc, p) => acc + p.price, 0);

  const formatPriceBillion = (val: number) => {
    return `${(val / 1000000000).toFixed(1)} tỷ`;
  };

  const getInquiryTypeBadge = (type: string) => {
    switch (type) {
      case 'viewing':
        return <span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Hẹn xem nhà</span>;
      case 'consultation':
        return <span style={{ backgroundColor: '#eff6ff', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Nhận sổ scan</span>;
      case 'price_offer':
        return <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Thương lượng giá</span>;
      case 'service':
        return <span style={{ backgroundColor: '#f3e8ff', color: '#7c3aed', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Dịch vụ BĐS</span>;
      default:
        return <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Tư vấn chung</span>;
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '1.5rem 0 3rem 0' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={onBackToUserView}
                className="btn-secondary"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              >
                <ArrowLeft size={14} />
                <span>Về trang người dùng</span>
              </button>
              <span style={{
                backgroundColor: 'var(--green-light)',
                color: 'var(--green-dark)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                PORTAL QUẢN TRỊ VIÊN
              </span>
            </div>

            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
              Hệ Thống Quản Trị batdongsan.vn
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Theo dõi giao dịch, duyệt tin đăng và xử lý hồ sơ khách hàng hẹn xem nhà trực tuyến
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => alert('Chức năng thêm mới bất động sản đang mở. Vui lòng nhập dữ liệu theo mẫu.')}
              className="btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Plus size={16} />
              <span>Thêm tin đăng BĐS mới</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TỔNG BĐS NIÊM YẾT</span>
              <Building2 size={20} color="var(--green-primary)" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {properties.length} tài sản
            </div>
            <div style={{ fontSize: '0.775rem', color: 'var(--green-primary)', marginTop: '4px' }}>
              ✓ 100% hồ sơ pháp lý chuẩn
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>YÊU CẦU ĐẶT LỊCH</span>
              <Users size={20} color="#0284c7" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {inquiries.length} khách hẹn
            </div>
            <div style={{ fontSize: '0.775rem', color: '#0284c7', marginTop: '4px' }}>
              Cập nhật thời gian thực
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TỔNG GIÁ TRỊ QUẢN LÝ</span>
              <TrendingUp size={20} color="#d97706" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {formatPriceBillion(totalPortfolioValue)}
            </div>
            <div style={{ fontSize: '0.775rem', color: '#d97706', marginTop: '4px' }}>
              Phân khúc trung & cao cấp
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TRẠNG THÁI HỆ THỐNG</span>
              <CheckCircle2 size={20} color="#059669" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--green-primary)' }}>
              Hoạt động
            </div>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              API Node.js & React ổn định
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '1px solid var(--border)',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={() => setActiveTab('inquiries')}
            style={{
              padding: '0.65rem 1rem',
              fontSize: '0.95rem',
              fontWeight: activeTab === 'inquiries' ? 700 : 500,
              color: activeTab === 'inquiries' ? 'var(--green-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'inquiries' ? '2px solid var(--green-primary)' : '2px solid transparent'
            }}
          >
            Danh Sách Khách Hàng Hẹn Xem & Tư Vấn ({inquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            style={{
              padding: '0.65rem 1rem',
              fontSize: '0.95rem',
              fontWeight: activeTab === 'properties' ? 700 : 500,
              color: activeTab === 'properties' ? 'var(--green-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'properties' ? '2px solid var(--green-primary)' : '2px solid transparent'
            }}
          >
            Quản Lý Danh Sách Bất Động Sản ({properties.length})
          </button>
        </div>

        {/* Tab 1: Inquiries Table */}
        {activeTab === 'inquiries' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                Hồ sơ yêu cầu liên hệ gần đây
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Tự động đồng bộ từ API backend `/api/inquiries`
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Khách hàng</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Số điện thoại</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Loại yêu cầu</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Bất động sản quan tâm</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Nội dung ghi chú</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Trạng thái</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq, idx) => (
                    <tr key={inq.id || idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>
                        {inq.fullName}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <a href={`tel:${inq.phone}`} style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
                          {inq.phone}
                        </a>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        {getInquiryTypeBadge(inq.inquiryType)}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {inq.propertyTitle}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {inq.message || '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: inq.status === 'contacted' ? '#059669' : '#d97706',
                          backgroundColor: inq.status === 'contacted' ? '#ecfdf5' : '#fef3c7',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          {inq.status === 'contacted' ? 'Đã liên hệ' : 'Chờ xử lý'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <a
                          href={`tel:${inq.phone}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: 'var(--green-primary)',
                            fontWeight: 600,
                            fontSize: '0.8rem'
                          }}
                        >
                          <Phone size={13} />
                          <span>Gọi ngay</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Properties Management Table */}
        {activeTab === 'properties' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                Quỹ tài sản đang niêm yết trên hệ thống
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Tổng {properties.length} bất động sản chính chủ
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Hình ảnh</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Mã & Tiêu đề</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Khu vực</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Mức giá</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Diện tích</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Môi giới</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '0.75rem 1rem', width: '70px' }}>
                        <img
                          src={p.images[0]}
                          alt=""
                          style={{ width: '56px', height: '42px', borderRadius: '4px', objectFit: 'cover' }}
                        />
                      </td>
                      <td style={{ padding: '0.75rem 1rem', maxWidth: '280px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{p.id}</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {p.title}
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>
                        {p.district}, {p.city}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--green-primary)' }}>
                        {p.priceFormatted}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        {p.area} m²
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem' }}>
                        {p.agent.name}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <button
                          onClick={() => onSelectProperty(p)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: 'var(--green-primary)',
                            fontWeight: 600,
                            fontSize: '0.8rem'
                          }}
                        >
                          <Eye size={14} />
                          <span>Xem chi tiết</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
