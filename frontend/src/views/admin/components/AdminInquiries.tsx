import React, { useState, useMemo } from 'react';
import {
  Phone,
  Check,
  Clock
} from 'lucide-react';
import { AdminInquiry } from '../types';

interface AdminInquiriesProps {
  inquiries: AdminInquiry[];
  searchQuery: string;
  onToggleStatus: (id: string) => void;
}

export const AdminInquiries: React.FC<AdminInquiriesProps> = ({
  inquiries,
  searchQuery,
  onToggleStatus
}) => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = inq.fullName.toLowerCase().includes(q);
        const matchPhone = inq.phone.includes(q);
        const matchTitle = inq.propertyTitle.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchTitle) return false;
      }

      // Type filter
      if (typeFilter !== 'all') {
        if (inq.inquiryType !== typeFilter) return false;
      }

      // Status filter
      if (statusFilter !== 'all') {
        if (inq.status !== statusFilter) return false;
      }

      return true;
    });
  }, [inquiries, searchQuery, typeFilter, statusFilter]);

  const pendingCount = inquiries.filter(i => i.status === 'pending').length;
  const contactedCount = inquiries.filter(i => i.status === 'contacted').length;

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'viewing':
        return (
          <span style={{ backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
            Hẹn xem nhà
          </span>
        );
      case 'consultation':
        return (
          <span style={{ backgroundColor: '#eff6ff', color: '#0284c7', border: '1px solid #bfdbfe', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
            Nhận sổ scan
          </span>
        );
      case 'price_offer':
        return (
          <span style={{ backgroundColor: '#fef3c7', color: '#d97706', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
            Thương lượng giá
          </span>
        );
      default:
        return (
          <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
            Tư vấn chung
          </span>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Filter & Summary Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Inquiry Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-main)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">Tất cả loại yêu cầu</option>
            <option value="viewing">Hẹn xem nhà trực tiếp</option>
            <option value="consultation">Xin file sổ đỏ scan</option>
            <option value="price_offer">Thương lượng thanh toán</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-main)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý ({pendingCount})</option>
            <option value="contacted">Đã liên hệ ({contactedCount})</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.825rem' }}>
          <span style={{
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#fef3c7',
            color: '#b45309',
            fontWeight: 700
          }}>
            {pendingCount} chờ xử lý
          </span>
          <span style={{
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#ecfdf5',
            color: '#047857',
            fontWeight: 700
          }}>
            {contactedCount} đã liên hệ
          </span>
        </div>
      </div>

      {/* Inquiries Table */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Khách hàng</th>
                <th style={{ padding: '0.85rem 1rem' }}>Số điện thoại & Email</th>
                <th style={{ padding: '0.85rem 1rem' }}>Nhu cầu</th>
                <th style={{ padding: '0.85rem 1rem' }}>Bất động sản quan tâm</th>
                <th style={{ padding: '0.85rem 1rem' }}>Ghi chú từ khách</th>
                <th style={{ padding: '0.85rem 1rem' }}>Trạng thái xử lý</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Không tìm thấy yêu cầu tư vấn nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq, idx) => (
                  <tr
                    key={inq.id || idx}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Customer Name */}
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      <div>{inq.fullName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>
                        ID: {inq.id}
                      </div>
                    </td>

                    {/* Phone & Email */}
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <a
                        href={`tel:${inq.phone}`}
                        style={{
                          fontWeight: 700,
                          color: '#059669',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Phone size={13} />
                        <span>{inq.phone}</span>
                      </a>
                      {inq.email && (
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px', whiteSpace: 'nowrap' }}>
                          {inq.email}
                        </div>
                      )}
                    </td>

                    {/* Inquiry Type */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {getTypeBadge(inq.inquiryType)}
                    </td>

                    {/* Property */}
                    <td style={{ padding: '0.85rem 1rem', maxWidth: '250px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {inq.propertyTitle}
                      </div>
                    </td>

                    {/* Message */}
                    <td style={{ padding: '0.85rem 1rem', maxWidth: '240px', color: 'var(--text-secondary)' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.825rem' }}>
                        {inq.message || '— Không có ghi chú thêm —'}
                      </div>
                    </td>

                    {/* Status Pill Toggle */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <button
                        type="button"
                        onClick={() => onToggleStatus(inq.id)}
                        title="Bấm để đổi trạng thái"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: inq.status === 'contacted' ? '#047857' : '#b45309',
                          backgroundColor: inq.status === 'contacted' ? '#ecfdf5' : '#fef3c7',
                          border: inq.status === 'contacted' ? '1px solid #a7f3d0' : '1px solid #fde68a',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-pill)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {inq.status === 'contacted' ? (
                          <>
                            <Check size={12} />
                            <span>Đã liên hệ</span>
                          </>
                        ) : (
                          <>
                            <Clock size={12} />
                            <span>Chờ xử lý</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Call CTA */}
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                      <a
                        href={`tel:${inq.phone}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--green-light)',
                          color: 'var(--green-primary)',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          border: '1px solid var(--green-border)',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--green-primary)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--green-light)';
                          e.currentTarget.style.color = 'var(--green-primary)';
                        }}
                      >
                        <Phone size={13} />
                        <span>Gọi điện</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
