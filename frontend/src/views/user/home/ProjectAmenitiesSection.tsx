import React from 'react';
import { Sparkles } from 'lucide-react';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

interface ProjectAmenitiesSectionProps {
  onConsult?: (service: string) => void;
}

export const ProjectAmenitiesSection: React.FC<ProjectAmenitiesSectionProps> = () => {
  const amenitiesCards = [
    {
      title: 'KHU "PHỐ BIỂN" NÁO NHIỆT NGÀY ĐÊM',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      desc: 'Tuyến phố đi bộ mua sắm, cafe lounge và chuỗi nhà hàng ẩm thực đa văn hóa'
    },
    {
      title: 'BÃI BIỂN THIÊN ĐƯỜNG CÁT TRẮNG',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      desc: 'Hồ nước ngọt nhân tạo trải cát trắng tự nhiên đưa không khí biển về giữa lòng đô thị'
    },
    {
      title: 'SÂN GOLF & THỂ THAO ĐẲNG CẤP',
      img: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80',
      desc: 'Tổ hợp sân tập golf tiêu chuẩn quốc tế cùng hơn 15 cụm sân tennis, bóng rổ, cầu lông'
    },
    {
      title: 'BÃI ĐÁP THỦY PHI CƠ TIÊN PHONG',
      img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      desc: 'Điểm chạm phong cách sống thượng lưu với dịch vụ bay ngắm cảnh và trải nghiệm độc bản'
    },
    {
      title: 'RẠP CHIẾU PHIM & GIẢI TRÍ ĐỈNH CAO',
      img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      desc: 'Tổ hợp rạp chiếu phim chuẩn Hollywood, khu vui chơi công nghệ cao cho cả gia đình'
    },
    {
      title: 'BẾN DU THUYỀN THƯỢNG LƯU VEN SÔNG',
      img: 'https://daknong.1cdn.vn/2026/05/14/img_c436aa23.jpg?auto=format&fit=crop&w=800&q=80',
      desc: 'Khu neo đậu du thuyền tư nhân chuẩn 5 sao với nhà hàng ven sông và dịch vụ tiệc riêng biệt'
    }
  ];

  return (
    <section style={{
      padding: 'clamp(2.5rem, 5vw, 4rem) 0',
      backgroundColor: '#f8fafc',
      borderTop: '1px solid #f1f5f9',
      overflow: 'hidden'
    }}>
      <div className="container">
        {/* Header */}
        <ScrollReveal direction="up" distance={24} duration={0.65}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 2.75rem)' }}>
            <p className="font-script" style={{
              fontSize: 'clamp(1.6rem, 5vw, 2rem)',
              color: '#c5a880',
              margin: 0,
              lineHeight: 1.1
            }}>
              Đặc quyền chuẩn resort
            </p>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--green-primary)',
              letterSpacing: '0.04em',
              marginTop: '0.4rem',
              textTransform: 'uppercase'
            }}>
              HỆ THỐNG TIỆN ÍCH ALL-IN-ONE ĐẲNG CẤP
            </h2>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '0.5rem',
              marginBottom: '0.85rem'
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
              Được đầu tư xây dựng đồng bộ nhằm hiện thực hóa ý tưởng khu đô thị nghỉ dưỡng sinh thái chuẩn mực. Bên cạnh hệ thống tiện ích dịch vụ all-in-one hoàn hảo, nội khu dự án sở hữu những đặc quyền giải trí thượng lưu riêng biệt.
            </p>

            {/* Quick Checklist */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '0.65rem 1.5rem',
              maxWidth: '900px',
              margin: '1.75rem auto 0 auto',
              textAlign: 'left',
              fontSize: '0.875rem',
              color: 'var(--text-main)',
              fontWeight: 500
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--green-primary)' }}>✦</span>
                <span>Trung tâm dịch vụ y tế & Bệnh viện Vinmec</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--green-primary)' }}>✦</span>
                <span>Hệ thống trường học các cấp, trường quốc tế</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--green-primary)' }}>✦</span>
                <span>Nhà hàng, Café club, cửa hàng tiện ích 24/7</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--green-primary)' }}>✦</span>
                <span>Sân Golf tiêu chuẩn & cụm thể thao liên hoàn</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--green-primary)' }}>✦</span>
                <span>Bến du thuyền tư nhân, bãi đáp thủy phi cơ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--green-primary)' }}>✦</span>
                <span>Rạp chiếu phim hiện đại, khu vui chơi giải trí</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--green-primary)' }}>✦</span>
                <span>Đại lộ ánh sáng 36ha & bãi biển nhân tạo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--green-primary)' }}>✦</span>
                <span>Hệ thống an ninh thông minh đa tầng 24/7</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 6 Visual Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(1.25rem, 3vw, 2rem)',
          marginTop: '2rem'
        }}>
          {amenitiesCards.map((card, i) => (
            <ScrollReveal
              key={i}
              direction="up"
              distance={24}
              duration={0.6}
              delay={i * 0.08}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(0,0,0,0.12)';
                  e.currentTarget.style.borderColor = 'var(--green-primary)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={card.img}
                    alt={card.title}
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
                </div>
                <div style={{ padding: '1.25rem 1.25rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{
                    fontSize: '0.925rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    letterSpacing: '0.02em',
                    marginBottom: '6px',
                    textTransform: 'uppercase'
                  }}>
                    {card.title}
                  </h4>
                  <p style={{
                    fontSize: '0.825rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.5,
                    flex: 1
                  }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
