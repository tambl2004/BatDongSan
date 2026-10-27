import React from 'react';
import { ArrowUpDown, RotateCcw } from 'lucide-react';
import { PropertyFilterParams } from '../types/property';

interface FilterBarProps {
  total: number;
  filters: PropertyFilterParams;
  onChangeFilters: (newFilters: Partial<PropertyFilterParams>) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  total,
  filters,
  onChangeFilters,
  onReset
}) => {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: 'var(--radius-md)',
      padding: '0.65rem 1rem',
      border: '1px solid var(--border)',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.75rem'
    }}>
      {/* Result Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Hiện có <span style={{ color: 'var(--green-primary)' }}>{total}</span> bất động sản
        </div>

        {(filters.city || filters.propertyType || filters.search || filters.bedrooms) && (
          <button
            onClick={onReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.8rem',
              color: '#ef4444',
              fontWeight: 600
            }}
          >
            <RotateCcw size={12} />
            <span>Xóa lọc</span>
          </button>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        {/* Bedroom Quick Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Phòng ngủ:</span>
          {[1, 2, 3, 4].map((num) => {
            const isSelected = filters.bedrooms === num;
            return (
              <button
                key={num}
                onClick={() => onChangeFilters({ bedrooms: isSelected ? undefined : num })}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '1px solid var(--green-primary)' : '1px solid var(--border)',
                  backgroundColor: isSelected ? 'var(--green-primary)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {num}+
              </button>
            );
          })}
        </div>

        {/* Sort Select */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '4px 10px',
          backgroundColor: '#ffffff'
        }}>
          <ArrowUpDown size={14} color="var(--text-muted)" />
          <select
            value={filters.sort || 'newest'}
            onChange={(e) => onChangeFilters({ sort: e.target.value as any })}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="price_desc">Giá giảm dần</option>
            <option value="area_desc">Diện tích lớn nhất</option>
          </select>
        </div>
      </div>
    </div>
  );
};
