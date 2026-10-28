import React, { useState, useMemo } from 'react';
import {
  Eye,
  Plus,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { Property } from '../../../types/property';

interface AdminPropertiesProps {
  properties: Property[];
  searchQuery: string;
  onSelectProperty: (property: Property) => void;
  onOpenCreateModal: () => void;
  onDeleteProperty?: (id: string) => void;
}

export const AdminProperties: React.FC<AdminPropertiesProps> = ({
  properties,
  searchQuery,
  onSelectProperty,
  onOpenCreateModal,
  onDeleteProperty
}) => {
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [listingTypeFilter, setListingTypeFilter] = useState<string>('all');

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
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
  }, [properties, searchQuery, cityFilter, typeFilter, listingTypeFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Filter Bar */}
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
          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
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
            <option value="all">Tất cả khu vực</option>
            <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>

          {/* Property Type Filter */}
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
            <option value="all">Tất cả loại hình</option>
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
            <option value="all">Bán & Cho thuê</option>
            <option value="sale">Nhà đất bán</option>
            <option value="rent">Nhà đất cho thuê</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Tìm thấy <strong>{filteredProperties.length}</strong> / {properties.length} bất động sản
          </span>

          <button
            type="button"
            onClick={onOpenCreateModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--green-primary)',
              color: '#ffffff',
              fontSize: '0.825rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
          >
            <Plus size={15} />
            <span>Thêm tin BĐS</span>
          </button>
        </div>
      </div>

      {/* Main Properties Table */}
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
                <th style={{ padding: '0.85rem 1rem' }}>Hình ảnh</th>
                <th style={{ padding: '0.85rem 1rem' }}>Mã & Tiêu đề BĐS</th>
                <th style={{ padding: '0.85rem 1rem' }}>Địa chỉ & Khu vực</th>
                <th style={{ padding: '0.85rem 1rem' }}>Mức giá</th>
                <th style={{ padding: '0.85rem 1rem' }}>Quy mô</th>
                <th style={{ padding: '0.85rem 1rem' }}>Phân loại</th>
                <th style={{ padding: '0.85rem 1rem' }}>Môi giới</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Không tìm thấy bất động sản nào khớp với điều kiện tìm kiếm.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((p) => (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Thumbnail */}
                    <td style={{ padding: '0.85rem 1rem', width: '75px' }}>
                      <img
                        src={p.images[0]}
                        alt=""
                        style={{
                          width: '60px',
                          height: '46px',
                          borderRadius: '6px',
                          objectFit: 'cover',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </td>

                    {/* Title & Code */}
                    <td style={{ padding: '0.85rem 1rem', maxWidth: '280px' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                        #{p.id}
                      </div>
                      <div
                        onClick={() => onSelectProperty(p)}
                        style={{
                          fontWeight: 700,
                          color: 'var(--text-main)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                      >
                        {p.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                        <CheckCircle size={12} />
                        <span>{p.legalStatus || 'Sổ hồng chính chủ'}</span>
                      </div>
                    </td>

                    {/* Location */}
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)', maxWidth: '200px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.825rem' }}>
                        {p.ward}, {p.district}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {p.city}
                      </div>
                    </td>

                    {/* Price */}
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.95rem' }}>
                        {p.priceFormatted}
                      </div>
                      {p.pricePerM2 && (
                        <div style={{ fontSize: '0.725rem', color: '#64748b' }}>
                          {p.pricePerM2}
                        </div>
                      )}
                    </td>

                    {/* Area & Rooms */}
                    <td style={{ padding: '0.85rem 1rem', color: '#475569', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>
                        {p.area} m²
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {p.bedrooms} PN • {p.bathrooms} WC
                      </div>
                    </td>

                    {/* Listing Type Badge */}
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-pill)',
                          backgroundColor: p.listingType === 'sale' ? '#ecfdf5' : '#eff6ff',
                          color: p.listingType === 'sale' ? '#059669' : '#0284c7',
                          border: p.listingType === 'sale' ? '1px solid #a7f3d0' : '1px solid #bfdbfe'
                        }}
                      >
                        {p.listingType === 'sale' ? 'Nhà đất bán' : 'Cho thuê'}
                      </span>
                    </td>

                    {/* Agent */}
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{p.agent.name}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{p.agent.phone}</div>
                    </td>

                    {/* Action buttons */}
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => onSelectProperty(p)}
                          title="Xem trên sàn"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            backgroundColor: 'var(--bg-subtle)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-main)',
                            fontSize: '0.775rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <Eye size={13} color="var(--green-primary)" />
                          <span>Xem</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Bạn có chắc chắn muốn xóa bất động sản: "${p.title}"?`)) {
                              if (onDeleteProperty) onDeleteProperty(p.id);
                            }
                          }}
                          title="Xóa BĐS"
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecdd3',
                            color: '#b91c1c',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
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
