import React, { useState } from 'react';
import { Search } from 'lucide-react';
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
  const [search, setSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ search, city: '', propertyType: '', listingType: 'sale' });
  };

  const handleQuickSearch = (keyword: string, city: string = '') => {
    setSearch(keyword);
    onSearch({ search: keyword, city, propertyType: '', listingType: 'sale' });
  };

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(90px, 14vh, 130px) 1rem 4rem 1rem',
      background: 'linear-gradient(to bottom, rgba(15, 23, 42, 3%) 0%, rgba(0, 0, 0, 24%) 40%, rgba(15, 23, 42, 0.2) 100%), url("/assets/images/banner_batdongsan.png") center center / cover no-repeat',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '860px' }}>
        {/* Subtle Calligraphy Eyebrow */}
        <p className="font-script" style={{
          fontSize: 'clamp(1.5rem, 5.5vw, 2.4rem)',
          color: '#fcd34d',
          margin: 0,
          lineHeight: 1.15,
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
        }}>
          Khởi nguồn an cư thịnh vượng
        </p>

        {/* Refined Headline */}
        <h1 style={{
          fontSize: 'clamp(1.8rem, 6.5vw, 3rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.01em',
          lineHeight: 1.25,
          marginTop: '0.4rem',
          marginBottom: '1.75rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 4px 24px rgba(0, 0, 0, 0.7)'
        }}>
          Khám Phá Không Gian Sống Thượng Lưu
        </h1>

        {/* Single-Row Minimalist Search Bar (Capsule Glassmorphism) */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            maxWidth: '660px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '5px 6px 5px 16px',
            borderRadius: '9999px',
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.25s ease'
          }}
        >
          <Search size={18} color="var(--green-primary)" style={{ flexShrink: 0, marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Tìm dự án, đường, quận hoặc khu vực..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.9rem',
              color: 'var(--text-main)',
              fontWeight: 500,
              minWidth: 0
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{
              flexShrink: 0,
              padding: '0.65rem 1.35rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              borderRadius: '9999px',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)',
              cursor: 'pointer'
            }}
          >
            Tìm kiếm
          </button>
        </form>

        {/* Quick Search Tag Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          flexWrap: 'wrap',
          marginTop: '1.25rem',
          fontSize: '0.8rem'
        }}>
          <span style={{ color: '#ffffff', fontWeight: 600, marginRight: '2px', textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)' }}>
            Tìm nhanh:
          </span>
          {[
            { label: 'TP. Thủ Đức', city: 'Hồ Chí Minh', query: 'Thủ Đức' },
            { label: 'Hà Nội', city: 'Hà Nội', query: 'Hà Nội' },
            { label: 'Đà Nẵng', city: 'Đà Nẵng', query: 'Đà Nẵng' },
            { label: 'Vinhomes Grand Park', city: '', query: 'Vinhomes' },
            { label: 'Bảo Lộc', city: 'Lâm Đồng', query: 'Bảo Lộc' }
          ].map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickSearch(tag.query, tag.city)}
              style={{
                background: 'rgba(15, 23, 42, 0.45)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                color: '#ffffff',
                padding: '4px 11px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(5, 150, 105, 0.85)';
                e.currentTarget.style.borderColor = 'var(--green-primary)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.45)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
