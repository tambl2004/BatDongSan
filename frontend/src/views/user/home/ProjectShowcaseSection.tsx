import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

interface ProjectShowcaseSectionProps {
  onConsult: (title: string) => void;
}

export const ProjectShowcaseSection: React.FC<ProjectShowcaseSectionProps> = ({ onConsult }) => {
  return (
    <section style={{
      padding: 'clamp(2.5rem, 5vw, 4rem) 0',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #f1f5f9',
      overflow: 'hidden'
    }}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} duration={0.65}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 2.75rem)' }}>
            <p className="font-script" style={{
              fontSize: 'clamp(1.6rem, 5vw, 2rem)',
              color: '#c5a880',
              margin: 0,
              lineHeight: 1.1
            }}>
              Tuyển chọn kiệt tác
            </p>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--green-primary)',
              letterSpacing: '0.04em',
              marginTop: '0.4rem',
              textTransform: 'uppercase'
            }}>
              TỔNG QUAN ĐẠI ĐÔ THỊ VINHOMES GRAND PARK
            </h2>

            {/* Decorative Gold Flourish */}
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
              Đại đô thị đẳng cấp quốc tế tiên phong ứng dụng công nghệ IoT và AI trong quản lý vận hành. Tọa lạc tại cửa ngõ phía Đông TP.HCM, kiến tạo chuẩn mực sống sinh thái, thông minh và trọn vẹn đặc quyền cho cộng đồng cư dân tinh hoa.
            </p>
          </div>
        </ScrollReveal>

        {/* 1. Row of 5 Key Highlights */}
        <ScrollReveal direction="up" distance={20} duration={0.65} delay={0.1}>
          <div className="grid-highlights-5col" style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 900, color: 'var(--green-primary)', lineHeight: 1 }}>
                271 ha
              </div>
              <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>
                Tổng quy mô đại đô thị
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 900, color: 'var(--green-primary)', lineHeight: 1 }}>
                44,000
              </div>
              <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>
                Căn hộ & biệt thự cao cấp
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 900, color: 'var(--green-primary)', lineHeight: 1 }}>
                36 ha
              </div>
              <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>
                Đại công viên ánh sáng biển hồ
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 900, color: 'var(--green-primary)', lineHeight: 1 }}>
                70%
              </div>
              <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>
                Mật độ cây xanh & mặt nước
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 900, color: 'var(--green-primary)', lineHeight: 1 }}>
                2026
              </div>
              <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>
                Bàn giao đồng bộ chuẩn mực
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Specs List & Masterplan Visual */}
        <div className="grid-responsive-2col" style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          {/* Left Column: Detailed Specifications */}
          <ScrollReveal direction="left" distance={28} duration={0.7}>
            <div>
              <h3 style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.4rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ width: '4px', height: '22px', backgroundColor: 'var(--green-primary)', display: 'inline-block' }} />
                <span>Hồ Sơ Quy Hoạch Dự Án</span>
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: 'var(--green-primary)', fontWeight: 800 }}>✦</span>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Tên dự án:</strong> Vinhomes Grand Park (Khu đô thị thông minh kiểu mẫu)
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: 'var(--green-primary)', fontWeight: 800 }}>✦</span>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Vị trí:</strong> Đường Nguyễn Xiển & Phước Thiện, P. Long Thạnh Mỹ, TP. Thủ Đức, TP.HCM
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: 'var(--green-primary)', fontWeight: 800 }}>✦</span>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Chủ đầu tư:</strong> Tập đoàn Vingroup (Phát triển bởi Vinhomes)
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: 'var(--green-primary)', fontWeight: 800 }}>✦</span>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Tổng diện tích:</strong> 271 ha với mặt nước bao quanh
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: 'var(--green-primary)', fontWeight: 800 }}>✦</span>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Quy mô phân khu:</strong> The Rainbow, The Origami, The Beverly, The Manhattan
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: 'var(--green-primary)', fontWeight: 800 }}>✦</span>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Diện tích căn hộ:</strong> 30 m² – 120 m² (Studio, 1PN, 2PN, 3PN, Penthouse)
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: 'var(--green-primary)', fontWeight: 800 }}>✦</span>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Diện tích Shophouse / Biệt thự:</strong> 150 m² – 450 m² mặt tiền đại lộ
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: 'var(--green-primary)', fontWeight: 800 }}>✦</span>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Hình thức sở hữu:</strong> Sổ hồng lâu dài (người Việt Nam), 50 năm (người nước ngoài)
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Masterplan GIF/Image */}
          <ScrollReveal direction="right" distance={28} duration={0.7} delay={0.1}>
            <div style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#0f172a',
              boxShadow: '0 16px 36px -10px rgba(0,0,0,0.12)',
              height: 'clamp(240px, 45vw, 400px)',
              width: '100%'
            }}>
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCXaACB1jhd8ZdndujOG4e7Tb589bLhWiAJJUOD0QTBtyetO5z0MnDE-bQURPWXBWADAMaA8fuO7Xw_BqkwQ0vINIk7ksO-SkkBGHv_z9qystK2dDv1sxrvCz6B1L69dTm9D8aolQbFZcK/s1600/TongThe1-1.gif"
                alt="Phối cảnh tổng thể quy hoạch dự án"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </ScrollReveal>
        </div>

        {/* 3. Lower Section: Video Showcase & Chính Sách Bán Hàng */}
        <div className="grid-responsive-2col">
          {/* Left: YouTube Video Embed */}
          <ScrollReveal direction="left" distance={28} duration={0.7}>
            <div style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px -10px rgba(0,0,0,0.12)',
              backgroundColor: '#000000',
              aspectRatio: '16/9',
              width: '100%'
            }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/0656NhhKxI0"
                title="Video giới thiệu đại đô thị"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
            </div>
          </ScrollReveal>

          {/* Right: Chính Sách Siêu Hấp Dẫn */}
          <ScrollReveal direction="right" distance={28} duration={0.7} delay={0.1}>
            <div style={{ padding: '0.25rem 0' }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--green-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.35rem'
            }}>
              ĐẶC QUYỀN TÀI CHÍNH
            </div>
            <h3 style={{
              fontSize: 'clamp(1.3rem, 4vw, 1.5rem)',
              fontWeight: 900,
              color: 'var(--text-main)',
              letterSpacing: '-0.01em',
              marginBottom: '1rem',
              lineHeight: 1.25
            }}>
              CHÍNH SÁCH BÁN HÀNG SIÊU HẤP DẪN
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: 'var(--text-main)' }}>Chiết khấu ngay 5%</strong> cho khách hàng không dùng gói hỗ trợ ngân hàng.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: 'var(--text-main)' }}>Chiết khấu thêm 2%</strong> cho khách hàng thanh toán sớm 95% hợp đồng.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: 'var(--text-main)' }}>Hỗ trợ vay vốn 70%</strong> giá trị hợp đồng, thời hạn vay lên tới 35 năm.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: 'var(--text-main)' }}>Lãi suất 0% & Ân hạn nợ gốc</strong> trong suốt 24 tháng đầu tiên.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: 'var(--text-main)' }}>Quà tặng đặc biệt:</strong> Cơ hội bốc thăm xe sang Mercedes GLC 250 và 10 xe Vespa cho khách hàng đặt mua đầu tiên!</span>
              </div>
            </div>

            <button
              onClick={() => onConsult('Đăng ký nhận bảng giá & chính sách ưu đãi')}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1.75rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: '9999px',
                boxShadow: '0 8px 20px rgba(5, 150, 105, 0.25)',
                cursor: 'pointer'
              }}
            >
              <span>Nhận bảng giá & chính sách chi tiết</span>
              <ArrowRight size={15} />
            </button>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
