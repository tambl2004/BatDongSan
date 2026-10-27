import React from 'react';
import { Property } from '../../types/property';
import { PropertyCard } from '../../components/PropertyCard';
import { Heart, ArrowLeft } from 'lucide-react';

interface FavoritesViewProps {
  favoriteProperties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onBackToHome: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteProperties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onBackToHome
}) => {
  return (
    <main style={{ flex: 1, padding: '1.5rem 0 3rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Header Bar */}
        <div style={{
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Heart size={22} color="#ef4444" fill="#ef4444" />
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Bất Động Sản Đã Lưu ({favoriteProperties.length})
              </h1>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Danh sách các tài sản quý khách đã đánh dấu để so sánh và theo dõi
              </div>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="btn-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={15} />
            <span>Xem thêm nhà đất khác</span>
          </button>
        </div>

        {/* Content */}
        {favoriteProperties.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            maxWidth: '480px',
            margin: '0 auto'
          }}>
            <Heart size={44} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Chưa có bất động sản nào được lưu
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Hãy nhấn vào biểu tượng trái tim trên các thẻ bất động sản để lưu và xem lại tại đây.
            </p>
            <button
              onClick={onBackToHome}
              className="btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}
            >
              Khám phá nhà đất ngay
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.25rem'
          }}>
            {favoriteProperties.map((property) => (
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
