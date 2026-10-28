import React, { useState, useMemo } from 'react';
import {
  Eye,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  Edit,
  XCircle,
  Building,
  Check
} from 'lucide-react';
import { Property, PropertyStatus } from '../../../types/property';
import { AdminEditModal } from './AdminEditModal';

interface AdminPropertiesProps {
  properties: Property[];
  searchQuery: string;
  onSelectProperty: (property: Property) => void;
  onOpenCreateModal: () => void;
  onDeleteProperty?: (id: string) => void;
  onUpdateProperty?: (updatedProp: Property) => void;
  onUpdateStatus?: (id: string, status: PropertyStatus) => void;
  onToggleFeatured?: (id: string) => void;
}

export const AdminProperties: React.FC<AdminPropertiesProps> = ({
  properties,
  searchQuery,
  onSelectProperty,
  onOpenCreateModal,
  onDeleteProperty,
  onUpdateProperty,
  onUpdateStatus,
  onToggleFeatured
}) => {
  const [statusTab, setStatusTab] = useState<'all' | PropertyStatus>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [listingTypeFilter, setListingTypeFilter] = useState<string>('all');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Status counts for badge tabs
  const counts = useMemo(() => {
    return {
      all: properties.length,
      pending: properties.filter(p => p.status === 'pending').length,
      available: properties.filter(p => p.status === 'available').length,
      sold: properties.filter(p => p.status === 'sold').length,
      rejected: properties.filter(p => p.status === 'rejected').length
    };
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Status tab
      if (statusTab !== 'all' && p.status !== statusTab) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchAddress = p.address.toLowerCase().includes(q);
        const matchId = p.id.toLowerCase().includes(q);
        if (!matchTitle && !matchAddress && !matchId) return false;
      }

      // City filter
      if (cityFilter !== 'all') {
        if (!p.city.toLowerCase().includes(cityFilter.toLowerCase())) return false;
      }

      // Type filter
      if (typeFilter !== 'all') {
        if (p.propertyType !== typeFilter) return false;
      }

      // Listing Type filter (sale / rent)
      if (listingTypeFilter !== 'all') {
        if (p.listingType !== listingTypeFilter) return false;
      }

      return true;
    });
  }, [properties, statusTab, searchQuery, cityFilter, typeFilter, listingTypeFilter]);

  const renderStatusBadge = (status: PropertyStatus) => {
    switch (status) {
      case 'available':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0'
          }}>
            <CheckCircle size={12} color="#059669" />
            <span>Đang mở bán</span>
          </span>
        );
      case 'pending':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor: '#fffbeb',
            color: '#92400e',
            border: '1px solid #fde68a'
          }}>
            <Clock size={12} color="#d97706" />
            <span>Chờ duyệt</span>
          </span>
        );
      case 'sold':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor: '#f1f5f9',
            color: '#334155',
            border: '1px solid #cbd5e1'
          }}>
            <Building size={12} color="#64748b" />
            <span>Đã giao dịch</span>
          </span>
        );
      case 'rejected':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecdd3'
          }}>
            <XCircle size={12} color="#dc2626" />
            <span>Bị từ chối</span>
          </span>
        );
    }
  };

  const statusTabItems = [
    { key: 'all' as const, label: 'Tất cả tin đăng', count: counts.all, color: '#059669' },
    { key: 'pending' as const, label: 'Chờ duyệt', count: counts.pending, color: '#d97706' },
    { key: 'available' as const, label: 'Đang mở bán', count: counts.available, color: '#059669' },
    { key: 'sold' as const, label: 'Đã giao dịch', count: counts.sold, color: '#475569' },
    { key: 'rejected' as const, label: 'Từ chối', count: counts.rejected, color: '#dc2626' }
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

      {/* 2. Secondary Filter & Add Button */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
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
            <option value="all">Khu vực: Tất cả</option>
            <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>

          {/* Property Type Filter */}
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
            <option value="all">Loại hình: Tất cả</option>
            <option value="apartment">Căn hộ chung cư</option>
            <option value="villa">Biệt thự cao cấp</option>
            <option value="house">Nhà phố thương mại</option>
            <option value="land">Đất nền dự án</option>
          </select>

          {/* Listing Type Filter */}
          <select
            value={listingTypeFilter}
            onChange={(e) => setListingTypeFilter(e.target.value)}
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
            <option value="all">Giao dịch: Bán & Cho thuê</option>
            <option value="sale">Nhà đất bán</option>
            <option value="rent">Cho thuê</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
            Hiển thị <strong style={{ color: '#0f172a' }}>{filteredProperties.length}</strong> / {properties.length} BĐS
          </span>
          <button
            type="button"
            onClick={onOpenCreateModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              backgroundColor: '#059669',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)'
            }}
          >
            <Plus size={16} />
            <span>Thêm tin BĐS</span>
          </button>
        </div>
      </div>

      {/* 3. Main Properties Table */}
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
                <th style={{ padding: '12px 14px' }}>Ảnh</th>
                <th style={{ padding: '12px 14px' }}>Mã & Tiêu đề</th>
                <th style={{ padding: '12px 14px' }}>Trạng thái</th>
                <th style={{ padding: '12px 14px' }}>Khu vực</th>
                <th style={{ padding: '12px 14px' }}>Mức giá</th>
                <th style={{ padding: '12px 14px' }}>Quy mô</th>
                <th style={{ padding: '12px 14px' }}>Môi giới</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    Không tìm thấy bất động sản nào khớp với điều kiện lọc.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((p) => (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fafafa'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {/* Thumbnail with VIP badge */}
                    <td style={{ padding: '10px 14px', width: '80px' }}>
                      <div style={{ position: 'relative', width: '64px', height: '48px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <img
                          src={p.images[0]}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {p.featured && (
                          <span
                            title="Tin VIP nổi bật"
                            style={{
                              position: 'absolute',
                              top: '2px',
                              left: '2px',
                              width: '16px',
                              height: '16px',
                              borderRadius: '4px',
                              backgroundColor: '#d97706',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                          >
                            <Sparkles size={10} />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Title & Legal */}
                    <td style={{ padding: '10px 14px', maxWidth: '320px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.725rem', color: '#94a3b8', fontWeight: 700 }}>#{p.id}</span>
                        {p.listingType === 'sale' ? (
                          <span style={{ padding: '1px 6px', borderRadius: '4px', fontSize: '0.675rem', fontWeight: 700, backgroundColor: '#ecfdf5', color: '#065f46' }}>Bán</span>
                        ) : (
                          <span style={{ padding: '1px 6px', borderRadius: '4px', fontSize: '0.675rem', fontWeight: 700, backgroundColor: '#eff6ff', color: '#1e40af' }}>Thuê</span>
                        )}
                      </div>
                      <div
                        onClick={() => onSelectProperty(p)}
                        style={{
                          fontWeight: 700,
                          color: '#0f172a',
                          fontSize: '0.875rem',
                          marginTop: '3px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#059669'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#0f172a'; }}
                      >
                        {p.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.725rem', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                        <Check size={12} />
                        <span>{p.legalStatus || 'Sổ hồng chính chủ'}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      {renderStatusBadge(p.status)}
                    </td>

                    {/* Location */}
                    <td style={{ padding: '10px 14px', color: '#475569' }}>
                      <div style={{ fontWeight: 700, color: '#1e293b' }}>{p.district}</div>
                      <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{p.city}</div>
                    </td>

                    {/* Price */}
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.875rem' }}>{p.priceFormatted}</div>
                      {p.pricePerM2 && (
                        <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{p.pricePerM2}</div>
                      )}
                    </td>

                    {/* Area & Rooms */}
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', color: '#334155' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.area} m²</div>
                      <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{p.bedrooms} PN • {p.bathrooms} WC</div>
                    </td>

                    {/* Agent */}
                    <td style={{ padding: '10px 14px', color: '#475569' }}>
                      <div style={{ fontWeight: 700, color: '#1e293b' }}>{p.agent.name}</div>
                      <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{p.agent.phone}</div>
                    </td>

                    {/* Action buttons */}
                    <td style={{ padding: '10px 14px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {/* 1. Quick Approve / Reject for Pending items */}
                        {p.status === 'pending' && onUpdateStatus && (
                          <>
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(p.id, 'available')}
                              title="Duyệt bài đăng"
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
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(p.id, 'rejected')}
                              title="Từ chối duyệt"
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
                          </>
                        )}

                        {/* 2. Star Feature VIP */}
                        {onToggleFeatured && (
                          <button
                            type="button"
                            onClick={() => onToggleFeatured(p.id)}
                            title={p.featured ? 'Bỏ ghim VIP' : 'Ghim tin VIP nổi bật'}
                            style={{
                              padding: '5px',
                              borderRadius: '6px',
                              border: p.featured ? '1px solid #fde68a' : '1px solid #e2e8f0',
                              backgroundColor: p.featured ? '#fffbeb' : '#ffffff',
                              color: p.featured ? '#d97706' : '#94a3b8',
                              cursor: 'pointer'
                            }}
                          >
                            <Sparkles size={15} />
                          </button>
                        )}

                        {/* 3. Edit */}
                        <button
                          type="button"
                          onClick={() => setEditingProperty(p)}
                          title="Chỉnh sửa thông tin"
                          style={{
                            padding: '5px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            color: '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit size={15} />
                        </button>

                        {/* 4. View Detail on Marketplace */}
                        <button
                          type="button"
                          onClick={() => onSelectProperty(p)}
                          title="Xem trên sàn giao dịch"
                          style={{
                            padding: '5px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            color: '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          <Eye size={15} />
                        </button>

                        {/* 5. Delete */}
                        {onDeleteProperty && (
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Xác nhận xóa vĩnh viễn tin đăng: "${p.title}"?`)) {
                                onDeleteProperty(p.id);
                              }
                            }}
                            title="Xóa tin đăng"
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

      {/* Edit Property Modal */}
      <AdminEditModal
        isOpen={!!editingProperty}
        property={editingProperty}
        onClose={() => setEditingProperty(null)}
        onUpdateProperty={(updated) => {
          if (onUpdateProperty) onUpdateProperty(updated);
          setEditingProperty(null);
        }}
      />
    </div>
  );
};
