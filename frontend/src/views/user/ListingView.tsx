import React from 'react';
import { Property, PropertyFilterParams } from '../../types/property';
import { FilterBar } from '../../components/FilterBar';
import { PropertyCard } from '../../components/PropertyCard';
import { SearchX, Building2 } from 'lucide-react';

interface ListingViewProps {
  listingType: 'sale' | 'rent';
  properties: Property[];
  loading: boolean;
  totalCount: number;
  filters: PropertyFilterParams;
  favorites: string[];
  onChangeFilters: (newFilters: Partial<PropertyFilterParams>) => void;
  onResetFilters: () => void;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const ListingView: React.FC<ListingViewProps> = ({
  listingType,
  properties,
  loading,
  totalCount,
  filters,
  favorites,
  onChangeFilters,
  onResetFilters,
  onToggleFavorite,
  onSelectProperty
}) => {
  return (
    <main style={{ flex: 1, padding: '1.5rem 0 3rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Title Header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
            <Building2 size={18} color="var(--green-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-primary)', textTransform: 'uppercase' }}>
              {listingType === 'sale' ? 'DANH MỤC MUA BÁN CHÍNH CHỦ' : 'DANH MỤC CHO THUÊ DÀI HẠN'}
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {listingType === 'sale' ? 'Nhà Đất Bán Toàn Quốc' : 'Nhà Đất Cho Thuê Toàn Quốc'}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Danh sách bất động sản đã được chuyên viên batdongsan.vn kiểm duyệt pháp lý và thẩm định quy hoạch
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          total={totalCount}
          filters={filters}
          onChangeFilters={onChangeFilters}
          onReset={onResetFilters}
        />

        {/* Properties Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <p style={{ fontWeight: 600 }}>Đang tải danh sách bất động sản...</p>
          </div>
        ) : properties.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3.5rem 1.5rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            maxWidth: '520px',
            margin: '0 auto'
          }}>
            <SearchX size={44} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Không tìm thấy bất động sản phù hợp
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Vui lòng thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.
            </p>
            <button
              onClick={onResetFilters}
              className="btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}
            >
              Xem toàn bộ danh mục
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.25rem'
          }}>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
