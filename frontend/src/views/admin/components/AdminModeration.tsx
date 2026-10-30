import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Sparkles,
  Flame,
  AlertTriangle,
  Check,
  X,
  Search,
  PauseCircle,
  PlayCircle
} from 'lucide-react';
import { Property } from '../../../types/property';
import { notify } from '../../../utils/toast';

interface AdminModerationProps {
  properties: Property[];
  onUpdateProperty: (updated: Property) => void;
  onSelectProperty?: (property: Property) => void;
  searchQuery?: string;
}

const COMMON_REJECTION_REASONS = [
  'Thiếu hình ảnh giấy chứng nhận quyền sử dụng đất (Sổ hồng / Sổ đỏ)',
  'Hình ảnh bất động sản bị mờ, không thực tế hoặc dính bản quyền từ nguồn khác',
  'Mức giá niêm yết không phản ánh đúng thực tế thị trường',
  'Thông tin địa chỉ hoặc quy hoạch chưa rõ ràng, cần xác thực lại',
  'Số điện thoại người đăng không thể liên lạc để xác minh thông tin',
  'Nội dung tin đăng chứa từ khóa vi phạm tiêu chuẩn cộng đồng hoặc quảng cáo ngoài'
];

export const AdminModeration: React.FC<AdminModerationProps> = ({
  properties,
  onUpdateProperty,
  onSelectProperty,
  searchQuery: globalSearch = ''
}) => {
  const [activeStatusTab, setActiveStatusTab] = useState<'all' | 'pending' | 'available' | 'rejected' | 'hidden'>('pending');
  const [roleFilter, setRoleFilter] = useState<'all' | 'collaborator' | 'client' | 'agent'>('all');
  const [localSearch, setLocalSearch] = useState('');

  // Modals state
  const [previewProperty, setPreviewProperty] = useState<Property | null>(null);
  const [rejectingProperty, setRejectingProperty] = useState<Property | null>(null);
  const [selectedPresetReason, setSelectedPresetReason] = useState<string>(COMMON_REJECTION_REASONS[0]);
  const [customReason, setCustomReason] = useState<string>('');

  // Statistics
  const stats = useMemo(() => {
    return {
      all: properties.length,
      pending: properties.filter(p => p.status === 'pending').length,
      available: properties.filter(p => p.status === 'available' && !p.hidden).length,
      rejected: properties.filter(p => p.status === 'rejected').length,
      hidden: properties.filter(p => p.hidden).length,
      featured: properties.filter(p => p.featured).length,
      newListing: properties.filter(p => p.isNewListing).length
    };
  }, [properties]);

  // Filtered properties
  const filteredList = useMemo(() => {
    const q = (localSearch || globalSearch).toLowerCase().trim();
    return properties.filter(p => {
      // Tab filter
      if (activeStatusTab === 'pending' && p.status !== 'pending') return false;
      if (activeStatusTab === 'available' && (p.status !== 'available' || p.hidden)) return false;
      if (activeStatusTab === 'rejected' && p.status !== 'rejected') return false;
      if (activeStatusTab === 'hidden' && !p.hidden) return false;

      // Role filter
      if (roleFilter !== 'all') {
        const role = p.submittedBy?.role || (p.agent?.role?.toLowerCase().includes('cộng tác') ? 'collaborator' : 'agent');
        if (role !== roleFilter) return false;
      }

      // Search query
      if (q) {
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchId = p.id.toLowerCase().includes(q);
        const matchAddress = p.address.toLowerCase().includes(q);
        const matchAuthor = (p.submittedBy?.name || p.agent?.name || '').toLowerCase().includes(q);
        const matchPhone = (p.submittedBy?.phone || p.agent?.phone || '').includes(q);
        if (!matchTitle && !matchId && !matchAddress && !matchAuthor && !matchPhone) return false;
      }

      return true;
    });
  }, [properties, activeStatusTab, roleFilter, localSearch, globalSearch]);

  // 1. Phê duyệt tin đăng
  const handleApprove = (prop: Property, asNew: boolean = true) => {
    const updated: Property = {
      ...prop,
      status: 'available',
      hidden: false,
      rejectionReason: undefined,
      isNewListing: asNew ? true : prop.isNewListing
    };
    onUpdateProperty(updated);
    notify.success(`Đã phê duyệt tin đăng "${prop.title}" mở bán công khai!`);
    if (previewProperty?.id === prop.id) {
      setPreviewProperty(updated);
    }
  };

  // 2. Mở modal từ chối
  const handleOpenRejectModal = (prop: Property) => {
    setRejectingProperty(prop);
    setSelectedPresetReason(COMMON_REJECTION_REASONS[0]);
    setCustomReason('');
  };

  // 3. Xác nhận từ chối kèm phản hồi
  const handleConfirmReject = () => {
    if (!rejectingProperty) return;
    const finalReason = customReason.trim()
      ? `${selectedPresetReason}. Ghi chú thêm: ${customReason.trim()}`
      : selectedPresetReason;

    const updated: Property = {
      ...rejectingProperty,
      status: 'rejected',
      rejectionReason: finalReason
    };
    onUpdateProperty(updated);
    notify.warning(`Đã từ chối duyệt tin "${rejectingProperty.title}". Phản hồi đã được gửi cho người đăng.`);
    setRejectingProperty(null);
    if (previewProperty?.id === rejectingProperty.id) {
      setPreviewProperty(updated);
    }
  };

  // 4. Gỡ tin / Khôi phục tin
  const handleToggleHide = (prop: Property) => {
    const willBeHidden = !prop.hidden;
    const updated: Property = {
      ...prop,
      hidden: willBeHidden
    };
    onUpdateProperty(updated);
    if (willBeHidden) {
      notify.info(`Đã tạm gỡ tin BĐS "${prop.title}" khỏi sàn giao dịch`);
    } else {
      notify.success(`Đã khôi phục hiển thị tin BĐS "${prop.title}"`);
    }
    if (previewProperty?.id === prop.id) {
      setPreviewProperty(updated);
    }
  };

  // 5. Gắn nhãn "Tin nổi bật (VIP)"
  const handleToggleFeatured = (prop: Property) => {
    const updated: Property = {
      ...prop,
      featured: !prop.featured
    };
    onUpdateProperty(updated);
    if (updated.featured) {
      notify.success(`Đã gắn nhãn "Tin nổi bật (VIP)" cho BĐS #${prop.id}`);
    } else {
      notify.info(`Đã bỏ nhãn "Tin nổi bật" BĐS #${prop.id}`);
    }
    if (previewProperty?.id === prop.id) {
      setPreviewProperty(updated);
    }
  };

  // 6. Gắn nhãn "Tin mới"
  const handleToggleNewListing = (prop: Property) => {
    const updated: Property = {
      ...prop,
      isNewListing: !prop.isNewListing
    };
    onUpdateProperty(updated);
    if (updated.isNewListing) {
      notify.success(`Đã gắn nhãn "Tin mới" cho BĐS #${prop.id}`);
    } else {
      notify.info(`Đã bỏ nhãn "Tin mới" BĐS #${prop.id}`);
    }
    if (previewProperty?.id === prop.id) {
      setPreviewProperty(updated);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 1. Header KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {/* Chờ duyệt */}
        <div
          onClick={() => setActiveStatusTab('pending')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: activeStatusTab === 'pending' ? '2px solid #d97706' : '1px solid #e2e8f0',
            padding: '1.15rem',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Cần duyệt ngay</span>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: stats.pending > 0 ? '#ef4444' : '#cbd5e1',
              boxShadow: stats.pending > 0 ? '0 0 0 3px rgba(239, 68, 68, 0.2)' : 'none'
            }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>
            {stats.pending} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>tin chờ</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 600, marginTop: '4px' }}>
            {stats.pending > 0 ? 'Cần kiểm duyệt và phản hồi sớm' : 'Đã thẩm định hết bài đăng'}
          </div>
        </div>

        {/* Đang mở bán */}
        <div
          onClick={() => setActiveStatusTab('available')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: activeStatusTab === 'available' ? '2px solid #059669' : '1px solid #e2e8f0',
            padding: '1.15rem',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Đã duyệt mở bán</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {stats.available} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>tin</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginTop: '4px' }}>
            Đang hiển thị công khai trên web
          </div>
        </div>

        {/* Bị từ chối */}
        <div
          onClick={() => setActiveStatusTab('rejected')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: activeStatusTab === 'rejected' ? '2px solid #dc2626' : '1px solid #e2e8f0',
            padding: '1.15rem',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Bị từ chối duyệt</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626', marginTop: '4px' }}>
            {stats.rejected} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>tin</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            Đã gửi phản hồi lý do cho người đăng
          </div>
        </div>

        {/* Đã gỡ / Tạm ẩn */}
        <div
          onClick={() => setActiveStatusTab('hidden')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: activeStatusTab === 'hidden' ? '2px solid #475569' : '1px solid #e2e8f0',
            padding: '1.15rem',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Đã gỡ / Tạm ẩn</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#475569', marginTop: '4px' }}>
            {stats.hidden} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>tin</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            Tạm dừng hiển thị trên sàn
          </div>
        </div>
      </div>

      {/* 2. Control & Filter Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        {/* Status Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { key: 'all' as const, label: 'Tất cả tin', count: stats.all },
            { key: 'pending' as const, label: 'Chờ duyệt', count: stats.pending, color: '#d97706' },
            { key: 'available' as const, label: 'Đã duyệt', count: stats.available, color: '#059669' },
            { key: 'rejected' as const, label: 'Bị từ chối', count: stats.rejected, color: '#dc2626' },
            { key: 'hidden' as const, label: 'Đã gỡ', count: stats.hidden, color: '#475569' }
          ].map(tab => {
            const isActive = activeStatusTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveStatusTab(tab.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: isActive ? (tab.color || '#059669') : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                <span style={{
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#e2e8f0',
                  color: isActive ? '#ffffff' : '#334155'
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Search & Role Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Tìm mã BĐS, tiêu đề, SĐT..."
              style={{
                width: '100%',
                padding: '6px 10px 6px 30px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: '#f8fafc',
              color: '#334155',
              outline: 'none'
            }}
          >
            <option value="all">Người đăng: Tất cả</option>
            <option value="collaborator">Cộng tác viên BĐS</option>
            <option value="client">Khách hàng chính chủ</option>
            <option value="agent">Môi giới hệ thống</option>
          </select>
        </div>
      </div>

      {/* 3. Main Moderation Table */}
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
                <th style={{ padding: '12px 14px', width: '80px' }}>Ảnh & Mã</th>
                <th style={{ padding: '12px 14px' }}>Bất động sản & Pháp lý</th>
                <th style={{ padding: '12px 14px', width: '200px' }}>Người đăng bài</th>
                <th style={{ padding: '12px 14px', width: '130px' }}>Mức giá & Quy mô</th>
                <th style={{ padding: '12px 14px', width: '130px' }}>Trạng thái duyệt</th>
                <th style={{ padding: '12px 14px', width: '140px', textAlign: 'center' }}>Nhãn tin</th>
                <th style={{ padding: '12px 14px', width: '160px', textAlign: 'center' }}>Hành động duyệt</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
                    <ShieldCheck size={40} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Không có tin đăng nào trong danh sách này.</div>
                    <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>Tất cả bài đăng trong mục này đã được xử lý xong.</div>
                  </td>
                </tr>
              ) : (
                filteredList.map((p) => {
                  const submitter = p.submittedBy || {
                    name: p.agent?.name || 'Khách hàng',
                    phone: p.agent?.phone || '0900 000 000',
                    email: p.agent?.email,
                    role: (p.agent?.role?.toLowerCase().includes('cộng tác') ? 'collaborator' : 'client') as any,
                    submittedAt: p.createdAt || '2026-10-28'
                  };

                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* Image & ID */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{
                          position: 'relative',
                          width: '68px',
                          height: '50px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          border: '1px solid #e2e8f0'
                        }}>
                          <img
                            src={p.images[0]}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 700, marginTop: '3px' }}>
                          #{p.id}
                        </div>
                      </td>

                      {/* Title & Legal Info */}
                      <td style={{ padding: '10px 14px', maxWidth: '340px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                          <span style={{
                            fontSize: '0.675rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            backgroundColor: p.listingType === 'sale' ? '#ecfdf5' : '#eff6ff',
                            color: p.listingType === 'sale' ? '#065f46' : '#1e40af'
                          }}>
                            {p.listingType === 'sale' ? 'Bán' : 'Cho thuê'}
                          </span>
                          <span style={{ fontSize: '0.725rem', color: '#64748b' }}>
                            {p.district}, {p.city}
                          </span>
                        </div>

                        <div
                          onClick={() => {
                            setPreviewProperty(p);
                            if (onSelectProperty) onSelectProperty(p);
                          }}
                          style={{
                            fontWeight: 700,
                            color: '#0f172a',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            lineHeight: 1.35
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#059669')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#0f172a')}
                        >
                          {p.title}
                        </div>

                        {/* Legal Status */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.725rem', color: '#059669', fontWeight: 600, marginTop: '3px' }}>
                          <Check size={12} />
                          <span>{p.legalStatus || 'Sổ hồng riêng chính chủ'}</span>
                        </div>

                        {/* Rejection Note if Rejected */}
                        {p.status === 'rejected' && p.rejectionReason && (
                          <div style={{
                            marginTop: '6px',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecdd3',
                            fontSize: '0.725rem',
                            color: '#991b1b',
                            lineHeight: 1.4
                          }}>
                            <strong>Lý do từ chối:</strong> {p.rejectionReason}
                          </div>
                        )}
                      </td>

                      {/* Submitter Info */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: '#1e293b' }}>{submitter.name}</strong>
                          <span style={{
                            fontSize: '0.65rem',
                            padding: '1px 6px',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            backgroundColor: submitter.role === 'collaborator' ? '#eff6ff' : '#f1f5f9',
                            color: submitter.role === 'collaborator' ? '#1d4ed8' : '#475569'
                          }}>
                            {submitter.role === 'collaborator' ? 'Cộng tác viên' : 'Khách hàng'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                          📞 {submitter.phone}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
                          Gửi lúc: {submitter.submittedAt}
                        </div>
                      </td>

                      {/* Price & Area */}
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.875rem' }}>{p.priceFormatted}</div>
                        <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{p.area} m² • {p.bedrooms} PN</div>
                      </td>

                      {/* Moderation Status */}
                      <td style={{ padding: '10px 14px' }}>
                        {p.hidden ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            backgroundColor: '#f1f5f9',
                            color: '#475569',
                            border: '1px solid #cbd5e1'
                          }}>
                            <PauseCircle size={12} color="#64748b" />
                            <span>Đã gỡ tin</span>
                          </span>
                        ) : p.status === 'pending' ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            backgroundColor: '#fffbeb',
                            color: '#92400e',
                            border: '1px solid #fde68a'
                          }}>
                            <Clock size={12} color="#d97706" />
                            <span>Chờ duyệt</span>
                          </span>
                        ) : p.status === 'available' ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            backgroundColor: '#ecfdf5',
                            color: '#065f46',
                            border: '1px solid #a7f3d0'
                          }}>
                            <CheckCircle size={12} color="#059669" />
                            <span>Đã duyệt mở bán</span>
                          </span>
                        ) : p.status === 'rejected' ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            backgroundColor: '#fef2f2',
                            color: '#991b1b',
                            border: '1px solid #fecdd3'
                          }}>
                            <XCircle size={12} color="#dc2626" />
                            <span>Từ chối</span>
                          </span>
                        ) : (
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            backgroundColor: '#f1f5f9',
                            color: '#475569'
                          }}>
                            Đã giao dịch
                          </span>
                        )}
                      </td>

                      {/* Badges / Tags (Tin mới & Tin nổi bật) */}
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          {/* Toggle Tin Nổi Bật */}
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(p)}
                            title={p.featured ? 'Bỏ nhãn Tin nổi bật' : 'Gắn nhãn Tin nổi bật (VIP)'}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              padding: '3px 7px',
                              borderRadius: '6px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: p.featured ? '1px solid #fde68a' : '1px solid #e2e8f0',
                              backgroundColor: p.featured ? '#fffbeb' : '#ffffff',
                              color: p.featured ? '#d97706' : '#94a3b8'
                            }}
                          >
                            <Sparkles size={11} />
                            <span>VIP</span>
                          </button>

                          {/* Toggle Tin Mới */}
                          <button
                            type="button"
                            onClick={() => handleToggleNewListing(p)}
                            title={p.isNewListing ? 'Bỏ nhãn Tin mới' : 'Gắn nhãn Tin mới (New/Hot)'}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              padding: '3px 7px',
                              borderRadius: '6px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: p.isNewListing ? '1px solid #fed7aa' : '1px solid #e2e8f0',
                              backgroundColor: p.isNewListing ? '#fff7ed' : '#ffffff',
                              color: p.isNewListing ? '#ea580c' : '#94a3b8'
                            }}
                          >
                            <Flame size={11} />
                            <span>Mới</span>
                          </button>
                        </div>
                      </td>

                      {/* Moderation Actions */}
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          {/* Preview Details */}
                          <button
                            type="button"
                            onClick={() => setPreviewProperty(p)}
                            title="Thẩm định chi tiết tin đăng"
                            style={{
                              padding: '5px',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0',
                              backgroundColor: '#ffffff',
                              color: '#0284c7',
                              cursor: 'pointer'
                            }}
                          >
                            <Eye size={15} />
                          </button>

                          {/* Approve Button */}
                          {p.status !== 'available' && (
                            <button
                              type="button"
                              onClick={() => handleApprove(p, true)}
                              title="Phê duyệt mở bán"
                              style={{
                                padding: '5px',
                                borderRadius: '6px',
                                border: '1px solid #a7f3d0',
                                backgroundColor: '#ecfdf5',
                                color: '#059669',
                                cursor: 'pointer'
                              }}
                            >
                              <CheckCircle size={15} />
                            </button>
                          )}

                          {/* Reject Button with Feedback */}
                          {p.status !== 'rejected' && (
                            <button
                              type="button"
                              onClick={() => handleOpenRejectModal(p)}
                              title="Từ chối duyệt & Gửi phản hồi"
                              style={{
                                padding: '5px',
                                borderRadius: '6px',
                                border: '1px solid #fecdd3',
                                backgroundColor: '#fef2f2',
                                color: '#dc2626',
                                cursor: 'pointer'
                              }}
                            >
                              <XCircle size={15} />
                            </button>
                          )}

                          {/* Hide / Unhide Toggle */}
                          <button
                            type="button"
                            onClick={() => handleToggleHide(p)}
                            title={p.hidden ? 'Khôi phục hiển thị' : 'Gỡ tin tạm thời'}
                            style={{
                              padding: '5px',
                              borderRadius: '6px',
                              border: p.hidden ? '1px solid #059669' : '1px solid #cbd5e1',
                              backgroundColor: p.hidden ? '#ecfdf5' : '#ffffff',
                              color: p.hidden ? '#059669' : '#64748b',
                              cursor: 'pointer'
                            }}
                          >
                            {p.hidden ? <PlayCircle size={15} /> : <PauseCircle size={15} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL: Thẩm định & Xem trước chi tiết tin đăng */}
      {previewProperty && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.25rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '840px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f8fafc'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
                  HỒ SƠ THẨM ĐỊNH BĐS #{previewProperty.id}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                  {previewProperty.title}
                </h3>
              </div>

              <button
                onClick={() => setPreviewProperty(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: '#94a3b8'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Image Gallery */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '8px'
              }}>
                {previewProperty.images.map((img, i) => (
                  <div key={i} style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

              {/* Submitter & Legal Box */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '1rem',
                backgroundColor: '#f8fafc',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', margin: '0 0 6px 0' }}>
                    👤 Thông tin người đăng bài:
                  </h4>
                  <div style={{ fontSize: '0.825rem', color: '#334155', lineHeight: 1.6 }}>
                    <div>Họ và tên: <strong>{previewProperty.submittedBy?.name || previewProperty.agent?.name}</strong></div>
                    <div>Điện thoại: <strong>{previewProperty.submittedBy?.phone || previewProperty.agent?.phone}</strong></div>
                    <div>Email: {previewProperty.submittedBy?.email || previewProperty.agent?.email || 'Chưa cập nhật'}</div>
                    <div>Vai trò: <strong style={{ color: '#059669' }}>{previewProperty.submittedBy?.role === 'collaborator' ? 'Cộng tác viên BĐS' : 'Khách hàng chính chủ'}</strong></div>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', margin: '0 0 6px 0' }}>
                    📜 Pháp lý & Hồ sơ:
                  </h4>
                  <div style={{ fontSize: '0.825rem', color: '#334155', lineHeight: 1.6 }}>
                    <div>Tình trạng: <strong style={{ color: '#059669' }}>{previewProperty.legalStatus || 'Sổ hồng riêng chính chủ'}</strong></div>
                    <div>Quy hoạch: {previewProperty.planningStatus || 'Đất ở đô thị ODT'}</div>
                    <div>Giá đề xuất: <strong style={{ color: '#059669', fontSize: '0.95rem' }}>{previewProperty.priceFormatted}</strong></div>
                    <div>Diện tích: <strong>{previewProperty.area} m²</strong> ({previewProperty.frontWidth ? `Ngang ${previewProperty.frontWidth}m` : ''})</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', margin: '0 0 6px 0' }}>
                  📝 Nội dung mô tả chi tiết:
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, whiteSpace: 'pre-line', margin: 0 }}>
                  {previewProperty.description}
                </p>
              </div>

              {/* Rejection Note if any */}
              {previewProperty.rejectionReason && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecdd3',
                  color: '#991b1b',
                  fontSize: '0.85rem'
                }}>
                  <strong>⚠️ Phản hồi từ chối hiện tại:</strong> {previewProperty.rejectionReason}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f8fafc',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(previewProperty)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: previewProperty.featured ? '1px solid #fde68a' : '1px solid #cbd5e1',
                    backgroundColor: previewProperty.featured ? '#fffbeb' : '#ffffff',
                    color: previewProperty.featured ? '#d97706' : '#475569',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ⭐ {previewProperty.featured ? 'Bỏ VIP' : 'Gắn VIP nổi bật'}
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleNewListing(previewProperty)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: previewProperty.isNewListing ? '1px solid #fed7aa' : '1px solid #cbd5e1',
                    backgroundColor: previewProperty.isNewListing ? '#fff7ed' : '#ffffff',
                    color: previewProperty.isNewListing ? '#ea580c' : '#475569',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🔥 {previewProperty.isNewListing ? 'Bỏ Tin Mới' : 'Gắn Tin Mới'}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleToggleHide(previewProperty)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {previewProperty.hidden ? 'Khôi phục hiển thị' : 'Gỡ tin tạm ẩn'}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenRejectModal(previewProperty)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #fecdd3',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Từ chối duyệt bài
                </button>

                <button
                  type="button"
                  onClick={() => handleApprove(previewProperty)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(5, 150, 105, 0.3)'
                  }}
                >
                  ✓ Phê duyệt mở bán
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: Từ chối duyệt & Gửi phản hồi */}
      {rejectingProperty && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1050,
          padding: '1.25rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            padding: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Từ Chối Duyệt Tin & Phản Hồi
                </h3>
                <p style={{ fontSize: '0.775rem', color: '#64748b', margin: '2px 0 0 0' }}>
                  Tin #{rejectingProperty.id}: {rejectingProperty.title}
                </p>
              </div>
            </div>

            <p style={{ fontSize: '0.825rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.5 }}>
              Vui lòng chọn lý do từ chối để hệ thống gửi thông báo phản hồi cho người đăng (<strong>{rejectingProperty.submittedBy?.name || rejectingProperty.agent?.name}</strong>), giúp họ cập nhật đúng yêu cầu pháp lý.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Chọn lý do phổ biến:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {COMMON_REJECTION_REASONS.map((reason, i) => (
                  <label
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: selectedPresetReason === reason ? '1px solid #dc2626' : '1px solid #e2e8f0',
                      backgroundColor: selectedPresetReason === reason ? '#fef2f2' : '#ffffff',
                      cursor: 'pointer',
                      fontSize: '0.775rem',
                      color: '#1e293b'
                    }}
                  >
                    <input
                      type="radio"
                      name="presetReason"
                      checked={selectedPresetReason === reason}
                      onChange={() => setSelectedPresetReason(reason)}
                      style={{ marginTop: '2px', accentColor: '#dc2626' }}
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Ghi chú hoặc hướng dẫn bổ sung (Tùy chọn):
              </label>
              <textarea
                rows={2}
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="VD: Vui lòng chụp rõ số trang 2 sổ hồng và liên hệ hotline để được hỗ trợ nhanh..."
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setRejectingProperty(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: '0.825rem',
                  cursor: 'pointer'
                }}
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(220, 38, 38, 0.3)'
                }}
              >
                Gửi phản hồi & Từ chối duyệt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModeration;
