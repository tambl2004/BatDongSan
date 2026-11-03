import React from 'react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { navigate } from '../../../routes/router';

export const HomeNewsSection: React.FC = () => {
  const newsItems = [
    {
      id: 'news-1',
      date: '25',
      month: 'Th10',
      title: 'Cát Tường Phú Hưng kiến tạo không gian sống hiện đại tại Bình Phước',
      excerpt: 'Tích hợp hơn 18 tiện ích cao cấp, khu đô thị quy mô chuẩn mực đón đầu làn sóng đầu tư và quy hoạch hạ tầng giao thông kết nối liên vùng.',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      readTime: '5 phút đọc',
      category: 'Quy hoạch đô thị'
    },
    {
      id: 'news-2',
      date: '28',
      month: 'Th10',
      title: 'Elegant Park Villa tái hiện chất lãng mạn Pháp tại mỗi căn biệt thự',
      excerpt: 'Lấy cảm hứng từ Paris hoa lệ, thiết kế kiến trúc đem đến không gian sống lịch lãm, sang trọng cùng giá trị bảo tồn tài sản truyền đời.',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      readTime: '6 phút đọc',
      category: 'Kiến trúc & Không gian'
    },
    {
      id: 'news-3',
      date: '02',
      month: 'Th11',
      title: 'Lý do căn hộ cao cấp Rivera Park đón nhiều lượt khách đầu năm 2026',
      excerpt: 'Lượng khách hàng quan tâm dự án tăng mạnh nhờ pháp lý chuẩn chỉnh, vị trí đắc địa và không gian sống xanh thanh bình giữa trung tâm thành phố.',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      readTime: '4 phút đọc',
      category: 'Thị trường BĐS'
    }
  ];

  return (
    <section style={{
      padding: '2rem 0',
      backgroundColor: '#f8fafc',
      borderTop: '1px solid #f1f5f9'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="font-script" style={{
            fontSize: '2rem',
            color: '#c5a880',
            margin: 0,
            lineHeight: 1
          }}>
            Góc nhìn chuyên gia
          </p>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            color: 'var(--green-primary)',
            letterSpacing: '0.04em',
            marginTop: '0.4rem',
            textTransform: 'uppercase'
          }}>
            TIN TỨC THỊ TRƯỜNG & SỰ KIỆN NỔI BẬT
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
            Cập nhật những diễn biến mới nhất về quy hoạch hạ tầng, xu hướng định giá bất động sản và các sự kiện mở bán phân khu tiêu biểu trên toàn quốc.
          </p>
        </div>

        {/* 3 News Cards Grid matching Sample Image 5 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {newsItems.map((item) => (
            <article
              key={item.id}
              onClick={() => navigate('/blog')}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(0,0,0,0.12)';
                e.currentTarget.style.borderColor = 'var(--green-primary)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              {/* Image Frame with Date Badge */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.06)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />

                {/* Date Badge Overlay Top-Left (Chuẩn như Ảnh 5) */}
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  backgroundColor: 'var(--green-primary)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.35)',
                  lineHeight: 1.1
                }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900 }}>
                    {item.date}
                  </div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.month}
                  </div>
                </div>

                {/* Category Pill Tag Top-Right */}
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '9999px'
                }}>
                  {item.category}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.775rem', color: '#64748b', marginBottom: '8px' }}>
                  <Clock size={13} />
                  <span>{item.readTime}</span>
                </div>

                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  lineHeight: 1.4,
                  marginBottom: '10px'
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem',
                  flex: 1
                }}>
                  {item.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--green-primary)',
                  marginTop: 'auto'
                }}>
                  <span>Đọc tiếp</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Center Button (Chuẩn như Ảnh 5) */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/blog')}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.9rem 2.25rem',
              fontSize: '0.925rem',
              fontWeight: 800,
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              boxShadow: '0 8px 24px rgba(5, 150, 105, 0.25)',
              cursor: 'pointer'
            }}
          >
            <span>XEM THÊM TIN TỨC</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
