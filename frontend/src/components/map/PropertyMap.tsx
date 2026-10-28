import React from 'react';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  address: string;
  coordinates?: { lat: number; lng: number };
  title?: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  address,
  coordinates,
  title
}) => {
  return (
    <div style={{
      width: '100%',
      height: '240px',
      backgroundColor: '#f1f5f9',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
        backgroundSize: '16px 16px',
        opacity: 0.6
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#ffffff',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '90%'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#ecfdf5',
          border: '1px solid #a7f3d0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <MapPin size={20} color="#059669" />
        </div>

        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
            {title || 'Vị trí bất động sản'}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
            {address}
          </div>
          {coordinates && (
            <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600, marginTop: '3px' }}>
              Tọa độ: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
