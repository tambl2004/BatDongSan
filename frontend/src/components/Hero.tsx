import React, { useState } from 'react';
import { Search, MapPin, Home, CheckCircle2 } from 'lucide-react';
import { ListingType } from '../types/property';

interface HeroProps {
  onSearch: (filters: {
    search: string;
    city: string;
    propertyType: string;
    listingType: ListingType;
  }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [listingType, setListingType] = useState<ListingType>('sale');
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ search, city, propertyType, listingType });
  };

  return (
    <section style={{
      backgroundColor: '#ffffff',
      padding: '1.75rem 0 1.25rem 0',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Left-aligned Typography & Clean Search (Inspired by Photo 1) */}
          <div>
            {/* Simple Tab Switcher */}
            <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1rem' }}>
              <button
                type="button"
                onClick={() => setListingType('sale')}
                style={{
                  fontSize: '0.925rem',
                  fontWeight: listingType === 'sale' ? 700 : 500,
                  color: listingType === 'sale' ? 'var(--green-primary)' : 'var(--text-muted)',
                  borderBottom: listingType === 'sale' ? '2px solid var(--green-primary)' : '2px solid transparent',
                  paddingBottom: '4px'
                }}
              >
                Nhà Đất Bán
              </button>
              <button
                type="button"
                onClick={() => setListingType('rent')}
                style={{
                  fontSize: '0.925rem',
                  fontWeight: listingType === 'rent' ? 700 : 500,
                  color: listingType === 'rent' ? 'var(--green-primary)' : 'var(--text-muted)',
                  borderBottom: listingType === 'rent' ? '2px solid var(--green-primary)' : '2px solid transparent',
                  paddingBottom: '4px'
                }}
              >
                Nhà Đất Cho Thuê
              </button>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 3.6vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--text-main)',
              marginBottom: '0.75rem'
            }}>
              Nền Tảng Giao Dịch Nhà Đất Thông Minh
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              maxWidth: '520px',
              marginBottom: '1.25rem'
            }}>
              Tìm kiếm căn hộ, biệt thự và nhà phố chính chủ với hình ảnh thực tế, thông tin quy hoạch rõ ràng và pháp lý minh bạch.
            </p>

            {/* Clean Single-Layer Search Bar (No nested boxes) */}
            <form onSubmit={handleSearchSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxWidth: '560px',
              backgroundColor: '#ffffff',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Row 1: Keyword Input */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)'
              }}>
                <Search size={18} color="var(--green-primary)" />
                <input
                  type="text"
                  placeholder="Nhập tên dự án, đường hoặc khu vực..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    width: '100%',
                    fontSize: '0.925rem',
                    color: 'var(--text-main)'
                  }}
                />
              </div>

              {/* Row 2: Location + Type + Button */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr auto',
                gap: '0.75rem'
              }}>
                {/* Location Select */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)'
                }}>
                  <MapPin size={16} color="var(--text-muted)" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      width: '100%',
                      fontSize: '0.875rem',
                      color: city ? 'var(--text-main)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Tất cả địa điểm</option>
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">TP. Hà Nội</option>
                    <option value="Đà Nẵng">TP. Đà Nẵng</option>
                    <option value="Cần Thơ">TP. Cần Thơ</option>
                  </select>
                </div>

                {/* Property Type Select */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)'
                }}>
                  <Home size={16} color="var(--text-muted)" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      width: '100%',
                      fontSize: '0.875rem',
                      color: propertyType ? 'var(--text-main)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Tất cả loại hình</option>
                    <option value="apartment">Căn hộ / Chung cư</option>
                    <option value="villa">Biệt thự</option>
                    <option value="commercial">Nhà phố thương mại</option>
                    <option value="land">Đất nền thổ cư</option>
                  </select>
                </div>

                {/* Primary Button */}
                <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
                  Tìm kiếm
                </button>
              </div>
            </form>

            {/* Clean Trust Indicators */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginTop: '1.15rem',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={15} color="var(--green-primary)" />
                <span>100% Sổ đỏ, Sổ hồng chính chủ</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={15} color="var(--green-primary)" />
                <span>Thẩm định quy hoạch 2026</span>
              </span>
            </div>
          </div>

          {/* Right Column: Visual Video Banner (Clean Frame) */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '390px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            backgroundColor: '#0f172a'
          }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              src="/assets/video/banner_city.mp4"
            />
            {/* Subtle Gradient Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem',
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%)',
              color: '#ffffff'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                TP. Hồ Chí Minh & Hà Nội
              </div>
              <div style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>
                Hơn 6,500+ bất động sản đang mở bán & cho thuê
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
