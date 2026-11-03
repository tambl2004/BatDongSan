import React, { useState } from 'react';
import { Sparkles, ZoomIn, X } from 'lucide-react';

export const ProjectGallerySection: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<{ url: string; title: string } | null>(null);

  const galleryItems = [
    {
      title: 'Bến du thuyền & Cảnh quan lung linh về đêm',
      category: 'Cảnh quan sông nước',
      img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Dãy Shophouse thương mại đã hoàn thiện đồng bộ',
      category: 'Đã bàn giao',
      img: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Tuyến đường nội khu khang trang, rợp bóng cây xanh',
      category: 'Hạ tầng nội khu',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Hạ tầng giao thông kết nối Vành đai 3 mở rộng',
      category: 'Tiến độ hạ tầng',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Sảnh đón tiếp cư dân tiêu chuẩn resort 5 sao',
      category: 'Nội thất sảnh đón',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Hồ bơi tràn bờ & Khu công viên thể thao nội khu',
      category: 'Tiện ích vận hành',
      img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Du thuyền tham quan thực tế đón khách trải nghiệm',
      category: 'Trải nghiệm du thuyền',
      img: 'https://dulichduthuyen.com.vn/tour/vnt_upload/news/06_2022/tour-du-thuyen-emperor-cruises-nha-trang-5.jpg?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Khu biệt thự sinh thái biệt lập an ninh 3 lớp',
      category: 'Khu compound',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section style={{
      padding: '2rem 0',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #f1f5f9'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="font-script" style={{
            fontSize: '2rem',
            color: '#c5a880',
            margin: 0,
            lineHeight: 1
          }}>
            Bảo chứng thực tế
          </p>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            color: 'var(--green-primary)',
            letterSpacing: '0.04em',
            marginTop: '0.4rem',
            textTransform: 'uppercase'
          }}>
            HÌNH ẢNH THỰC TẾ DỰ ÁN & TIẾN ĐỘ THI CÔNG
          </h2>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#c5a880' }} />
            <Sparkles size={16} color="#c5a880" />
            <div style={{ width: '48px', height: '1px', backgroundColor: '#c5a880' }} />
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            maxWidth: '860px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Tổng thể dự án là một phức hợp các công trình nhà ở, thương mại dịch vụ và tiện ích đẳng cấp quốc tế. Hàng chục ngàn căn hộ và shophouse thương mại đã được bàn giao cho khách hàng về an cư và kinh doanh sầm uất, khẳng định cam kết tiến độ và chất lượng vượt trội.
          </p>
        </div>

        {/* 8 Images Grid (4 cols x 2 rows matching Sample Image 4) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginTop: '2rem'
        }}>
          {galleryItems.map((item, i) => (
            <div
              key={i}
              onClick={() => setSelectedImg({ url: item.img, title: item.title })}
              style={{
                position: 'relative',
                height: '210px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#0f172a',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 25px -6px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
              />

              {/* Category Pill Tag */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(6px)',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '9999px'
              }}>
                {item.category}
              </div>

              {/* Bottom Caption Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {item.title}
                </span>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <ZoomIn size={12} color="#ffffff" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImg && (
          <div
            onClick={() => setSelectedImg(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '900px',
                width: '100%',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
              }}
            >
              <button
                onClick={() => setSelectedImg(null)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <X size={18} />
              </button>
              <img
                src={selectedImg.url}
                alt={selectedImg.title}
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem 1.5rem', backgroundColor: '#ffffff' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {selectedImg.title}
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
