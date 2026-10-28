import React from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  CheckCircle2,
  Phone,
  ArrowRight,
  Eye,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Property } from '../../../types/property';
import { AdminInquiry } from '../types';

interface AdminOverviewProps {
  properties: Property[];
  inquiries: AdminInquiry[];
  onNavigateToTab: (tab: 'properties' | 'inquiries') => void;
  onSelectProperty: (property: Property) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  properties,
  inquiries,
  onNavigateToTab,
  onSelectProperty
}) => {
  const totalPortfolioValue = properties.reduce((acc, p) => acc + p.price, 0);

  const formatPriceBillion = (val: number) => {
    return `${(val / 1000000000).toFixed(1)} tỷ`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
      {/* 4 Clean Minimal KPI Metric Cards (Anti Overflow) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
        gap: '1.25rem',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Metric 1 */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Tổng BĐS niêm yết
            </span>
            <Building2 size={18} color="#059669" />
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {properties.length}
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#64748b', marginLeft: '6px' }}>tài sản</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#059669', marginTop: '0.75rem', fontWeight: 600 }}>
            <ShieldCheck size={14} />
            <span style={{ whiteSpace: 'nowrap' }}>100% hồ sơ pháp lý sạch</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Yêu cầu đặt lịch hẹn
            </span>
            <Users size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {inquiries.length}
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#64748b', marginLeft: '6px' }}>khách hẹn</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#0284c7', marginTop: '0.75rem', fontWeight: 600 }}>
            <Calendar size={14} />
            <span style={{ whiteSpace: 'nowrap' }}>Cập nhật liên tục 24/7</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Tổng giá trị quản lý
            </span>
            <TrendingUp size={18} color="#d97706" />
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {formatPriceBillion(totalPortfolioValue)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#d97706', marginTop: '0.75rem', fontWeight: 600 }}>
            <Sparkles size={14} />
            <span style={{ whiteSpace: 'nowrap' }}>Phân khúc trung & cao cấp</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Trạng thái hệ thống
            </span>
            <CheckCircle2 size={18} color="#059669" />
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#059669', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Ổn định 100%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.75rem', whiteSpace: 'nowrap' }}>
            API Node.js & React Client Live
          </div>
        </div>
      </div>

      {/* 2 Clean Divided Lists (Flat design - Anti Overflow) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: '1.5rem',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Left: Khách Hẹn Mới Nhất (Clean Divider List) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.5rem 1.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          minWidth: 0,
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                Khách hẹn xem & tư vấn mới nhất
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                Hồ sơ yêu cầu liên hệ trực tiếp từ khách hàng
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab('inquiries')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              <span>Xem tất cả</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Flat List (Divided rows, no nested cards) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {inquiries.slice(0, 4).map((inq, idx) => (
              <div
                key={inq.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 0',
                  borderBottom: idx === 3 ? 'none' : '1px solid #f1f5f9',
                  gap: '1rem'
                }}
              >
                {/* Left Info: Name, Status badge & Property */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', whiteSpace: 'nowrap' }}>
                      {inq.fullName}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: inq.status === 'contacted' ? '#ecfdf5' : '#fef3c7',
                      color: inq.status === 'contacted' ? '#047857' : '#b45309',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {inq.status === 'contacted' ? 'Đã liên hệ' : 'Chờ xử lý'}
                    </span>
                  </div>

                  <div style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    marginTop: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {inq.propertyTitle}
                  </div>
                </div>

                {/* Right Info: Direct Phone Link (NO WRAPPING - FIX JUMPING TEXT) */}
                <a
                  href={`tel:${inq.phone}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    color: '#059669',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ecfdf5';
                    e.currentTarget.style.borderColor = '#a7f3d0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <Phone size={13} />
                  <span>{inq.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bất Động Sản Niêm Yết (Clean Flat List) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.5rem 1.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          minWidth: 0,
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                Bất động sản niêm yết
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                Quỹ căn hộ, biệt thự và nhà phố cao cấp
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab('properties')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              <span>Xem tất cả</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Flat List (Divided rows) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {properties.slice(0, 3).map((p, idx) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '1rem 0',
                  borderBottom: idx === 2 ? 'none' : '1px solid #f1f5f9'
                }}
              >
                <img
                  src={p.images[0]}
                  alt=""
                  style={{
                    width: '60px',
                    height: '46px',
                    borderRadius: '6px',
                    objectFit: 'cover',
                    flexShrink: 0,
                    border: '1px solid #f1f5f9'
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    onClick={() => onSelectProperty(p)}
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#059669')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#0f172a')}
                  >
                    {p.title}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', marginTop: '3px', whiteSpace: 'nowrap' }}>
                    <span style={{ fontWeight: 800, color: '#059669' }}>
                      {p.priceFormatted}
                    </span>
                    <span style={{ color: '#cbd5e1' }}>•</span>
                    <span style={{ color: '#64748b' }}>
                      {p.area} m²
                    </span>
                    <span style={{ color: '#cbd5e1' }}>•</span>
                    <span style={{ color: '#64748b' }}>
                      {p.district}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProperty(p)}
                  title="Xem trên sàn"
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#059669';
                    e.currentTarget.style.borderColor = '#a7f3d0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <Eye size={13} />
                  <span>Xem</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
