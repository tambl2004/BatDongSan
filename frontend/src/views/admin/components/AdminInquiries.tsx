import React, { useState, useMemo } from 'react';
import {
  Phone,
  Mail,
  Trash2,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  UserCheck,
  Check
} from 'lucide-react';
import { AdminInquiry, InquiryStatus } from '../types';

interface AdminInquiriesProps {
  inquiries: AdminInquiry[];
  searchQuery: string;
  onUpdateInquiryStatus?: (id: string, status: InquiryStatus, notes?: string) => void;
  onDeleteInquiry?: (id: string) => void;
}

export const AdminInquiries: React.FC<AdminInquiriesProps> = ({
  inquiries,
  searchQuery,
  onUpdateInquiryStatus,
  onDeleteInquiry
}) => {
  const [statusTab, setStatusTab] = useState<'all' | InquiryStatus>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [activeNoteModal, setActiveNoteModal] = useState<AdminInquiry | null>(null);
  const [noteContent, setNoteContent] = useState('');

  const counts = useMemo(() => {
    return {
      all: inquiries.length,
      new: inquiries.filter(i => i.status === 'new').length,
      contacted: inquiries.filter(i => i.status === 'contacted').length,
      scheduled: inquiries.filter(i => i.status === 'scheduled').length,
      completed: inquiries.filter(i => i.status === 'completed').length,
      cancelled: inquiries.filter(i => i.status === 'cancelled').length
    };
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      // Status tab
      if (statusTab !== 'all' && inq.status !== statusTab) return false;

      // Type filter
      if (typeFilter !== 'all' && inq.inquiryType !== typeFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = inq.fullName.toLowerCase().includes(q);
        const matchPhone = inq.phone.includes(q);
        const matchTitle = inq.propertyTitle.toLowerCase().includes(q);
        const matchEmail = inq.email ? inq.email.toLowerCase().includes(q) : false;
        if (!matchName && !matchPhone && !matchTitle && !matchEmail) return false;
      }

      return true;
    });
  }, [inquiries, statusTab, typeFilter, searchQuery]);

  const renderStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'new':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fecdd3'
          }}>
            <Clock size={11} color="#dc2626" />
            <span>Mới tiếp nhận</span>
          </span>
        );
      case 'contacted':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
            border: '1px solid #bfdbfe'
          }}>
            <Phone size={11} color="#2563eb" />
            <span>Đã liên hệ</span>
          </span>
        );
      case 'scheduled':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#fffbeb',
            color: '#b45309',
            border: '1px solid #fde68a'
          }}>
            <Calendar size={11} color="#d97706" />
            <span>Đã chốt lịch hẹn</span>
          </span>
        );
      case 'completed':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#ecfdf5',
            color: '#047857',
            border: '1px solid #a7f3d0'
          }}>
            <CheckCircle2 size={11} color="#059669" />
            <span>Chốt thành công</span>
          </span>
        );
      case 'cancelled':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#f1f5f9',
            color: '#475569',
            border: '1px solid #cbd5e1'
          }}>
            <AlertCircle size={11} color="#64748b" />
            <span>Đã hủy</span>
          </span>
        );
    }
  };

  const renderTypeBadge = (type: string) => {
    switch (type) {
      case 'viewing':
        return <span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' }}>Xem nhà trực tiếp</span>;
      case 'consultation':
        return <span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd' }}>Tư vấn pháp lý</span>;
      case 'price_offer':
        return <span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#faf5ff', color: '#7e22ce', border: '1px solid #e9d5ff' }}>Đàm phán giá</span>;
      case 'loan':
        return <span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#eef2ff', color: '#4338ca', border: '1px solid #c7d2fe' }}>Gói vay ngân hàng</span>;
      default:
        return <span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#f1f5f9', color: '#475569' }}>Yêu cầu chung</span>;
    }
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeNoteModal && onUpdateInquiryStatus) {
      onUpdateInquiryStatus(activeNoteModal.id, activeNoteModal.status, noteContent);
    }
    setActiveNoteModal(null);
  };

  const statusTabItems = [
    { key: 'all' as const, label: 'Tất cả', count: counts.all, color: '#059669' },
    { key: 'new' as const, label: 'Mới tiếp nhận', count: counts.new, color: '#dc2626' },
    { key: 'contacted' as const, label: 'Đã liên hệ', count: counts.contacted, color: '#2563eb' },
    { key: 'scheduled' as const, label: 'Đã chốt lịch', count: counts.scheduled, color: '#d97706' },
    { key: 'completed' as const, label: 'Chốt thành công', count: counts.completed, color: '#059669' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 1. Status Filter Tabs */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexWrap: 'wrap',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        {statusTabItems.map(tab => {
          const isActive = statusTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusTab(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? tab.color : 'transparent',
                color: isActive ? '#ffffff' : '#64748b',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                padding: '1px 7px',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#f1f5f9',
                color: isActive ? '#ffffff' : '#475569'
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Secondary Filter */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '0.85rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: '6px 10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              color: '#334155',
              outline: 'none'
            }}
          >
            <option value="all">Tất cả loại nhu cầu</option>
            <option value="viewing">Hẹn xem nhà trực tiếp</option>
            <option value="consultation">Tư vấn pháp lý & quy hoạch</option>
            <option value="price_offer">Đàm phán giá / Thương lượng</option>
            <option value="loan">Tư vấn vay vốn ngân hàng</option>
          </select>
        </div>

        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
          Tìm thấy <strong style={{ color: '#0f172a' }}>{filteredInquiries.length}</strong> / {inquiries.length} yêu cầu
        </span>
      </div>

      {/* 3. Main Inquiries Table */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                <th style={{ padding: '12px 14px' }}>Khách hàng</th>
                <th style={{ padding: '12px 14px' }}>Bất động sản quan tâm</th>
                <th style={{ padding: '12px 14px' }}>Loại yêu cầu</th>
                <th style={{ padding: '12px 14px' }}>Trạng thái xử lý</th>
                <th style={{ padding: '12px 14px' }}>Lời nhắn / Ghi chú</th>
                <th style={{ padding: '12px 14px' }}>Thời gian</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    Không có yêu cầu tư vấn nào khớp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fafafa'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {/* Customer Info */}
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>{inq.fullName}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <a
                          href={`tel:${inq.phone}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            color: '#065f46',
                            backgroundColor: '#ecfdf5',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            textDecoration: 'none'
                          }}
                        >
                          <Phone size={11} />
                          <span>{inq.phone}</span>
                        </a>
                        {inq.email && (
                          <a
                            href={`mailto:${inq.email}`}
                            title={inq.email}
                            style={{
                              padding: '2px 4px',
                              borderRadius: '4px',
                              color: '#64748b',
                              display: 'inline-flex',
                              alignItems: 'center'
                            }}
                          >
                            <Mail size={13} />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Property Title */}
                    <td style={{ padding: '12px 14px', maxWidth: '300px' }}>
                      <div style={{ fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>
                        {inq.propertyTitle}
                      </div>
                    </td>

                    {/* Inquiry Type */}
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      {renderTypeBadge(inq.inquiryType)}
                    </td>

                    {/* Workflow Status Dropdown */}
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {renderStatusBadge(inq.status)}
                        <select
                          value={inq.status}
                          onChange={(e) => {
                            if (onUpdateInquiryStatus) {
                              onUpdateInquiryStatus(inq.id, e.target.value as InquiryStatus, inq.notes);
                            }
                          }}
                          style={{
                            fontSize: '0.725rem',
                            padding: '3px 6px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            backgroundColor: '#ffffff',
                            color: '#334155',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="new">1. Mới tiếp nhận</option>
                          <option value="contacted">2. Đã gọi tư vấn</option>
                          <option value="scheduled">3. Đã hẹn xem nhà</option>
                          <option value="completed">4. Giao dịch thành công</option>
                          <option value="cancelled">5. Hủy yêu cầu</option>
                        </select>
                      </div>
                    </td>

                    {/* Message & Note */}
                    <td style={{ padding: '12px 14px', maxWidth: '280px' }}>
                      {inq.message && (
                        <p style={{
                          fontSize: '0.75rem',
                          color: '#475569',
                          fontStyle: 'italic',
                          backgroundColor: '#f8fafc',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          margin: 0
                        }}>
                          "{inq.message}"
                        </p>
                      )}
                      {inq.notes ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.725rem', color: '#b45309', fontWeight: 600, marginTop: '4px' }}>
                          <FileText size={12} color="#d97706" />
                          <span>Ghi chú: {inq.notes}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveNoteModal(inq);
                            setNoteContent(inq.notes || '');
                          }}
                          style={{
                            fontSize: '0.7rem',
                            color: '#059669',
                            fontWeight: 700,
                            marginTop: '4px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          + Thêm ghi chú sale
                        </button>
                      )}
                    </td>

                    {/* Date */}
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: '#94a3b8', fontSize: '0.75rem' }}>
                      {new Date(inq.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '12px 14px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveNoteModal(inq);
                            setNoteContent(inq.notes || '');
                          }}
                          title="Ghi chú tư vấn"
                          style={{
                            padding: '5px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            color: '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          <FileText size={15} />
                        </button>

                        {onDeleteInquiry && (
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Xóa yêu cầu tư vấn của khách: "${inq.fullName}"?`)) {
                                onDeleteInquiry(inq.id);
                              }
                            }}
                            title="Xóa yêu cầu"
                            style={{
                              padding: '5px',
                              borderRadius: '6px',
                              border: '1px solid #fecdd3',
                              backgroundColor: '#fef2f2',
                              color: '#dc2626',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note Edit Modal */}
      {activeNoteModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setActiveNoteModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '460px',
              width: '100%',
              overflow: 'hidden',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={20} color="#059669" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Ghi chú tư vấn khách hàng
                </h3>
              </div>
              <button
                onClick={() => setActiveNoteModal(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Khách hàng: <strong style={{ color: '#0f172a' }}>{activeNoteModal.fullName}</strong> ({activeNoteModal.phone})</div>
              <div>BĐS: <span style={{ color: '#0f172a', fontWeight: 600 }}>{activeNoteModal.propertyTitle}</span></div>
            </div>

            <form onSubmit={handleSaveNotes} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Nội dung trao đổi / Lịch hẹn xem nhà:
                </label>
                <textarea
                  rows={4}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="VD: Khách hẹn 15:30 chiều Thứ 7 tại sảnh T5 Masteri Thảo Điền..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8rem',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setActiveNoteModal(null)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '7px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Check size={14} />
                  <span>Lưu ghi chú</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
