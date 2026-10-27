import React from 'react';
import { Bed, Bath, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty
}) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = 'var(--border-hover)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
      onClick={() => onSelectProperty(property)}
    >
      {/* Image Thumbnail */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
        <img
          src={property.images[0]}
          alt={property.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          gap: '6px'
        }}>
          <span style={{
            backgroundColor: property.listingType === 'sale' ? 'var(--green-primary)' : '#0284c7',
            color: '#ffffff',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {property.listingType === 'sale' ? 'Đang bán' : 'Cho thuê'}
          </span>
          {property.featured && (
            <span style={{
              backgroundColor: '#f59e0b',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              Nổi bật
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorite ? '#ef4444' : '#64748b',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Heart size={16} fill={isFavorite ? '#ef4444' : 'none'} />
        </button>
      </div>

      {/* Card Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.65rem' }}>
        {/* Price & Location */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: 'var(--green-primary)'
          }}>
            {property.priceFormatted}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <strong>{property.area}</strong> m²
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 700,
          lineHeight: 1.4,
          color: 'var(--text-main)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.8rem'
        }}>
          {property.title}
        </h3>

        {/* Address */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
          <MapPin size={14} color="var(--text-muted)" />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {property.district}, {property.city}
          </span>
        </div>

        {/* Specs: Bed, Bath, Legal */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.65rem 0',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)',
          fontSize: '0.825rem',
          color: 'var(--text-secondary)'
        }}>
          {property.bedrooms > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Bed size={15} color="var(--green-primary)" />
              <span>{property.bedrooms} PN</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Bath size={15} color="var(--green-primary)" />
              <span>{property.bathrooms} WC</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--green-primary)', marginLeft: 'auto' }}>
            <ShieldCheck size={15} />
            <span>{property.legalDocument?.split(' ')[0] || 'Sổ hồng'}</span>
          </div>
        </div>

        {/* Broker Name & Phone */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '0.35rem',
          fontSize: '0.825rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
              {property.agent.name}
            </span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>
            {property.agent.phone}
          </span>
        </div>
      </div>
    </div>
  );
};
