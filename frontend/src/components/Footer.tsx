import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, Headphones } from 'lucide-react';

interface FooterProps {
  onNavigateToBlog?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToBlog }) => {
  return (
    <footer style={{
      backgroundColor: '#f8fafc',
      color: 'var(--text-secondary)',
      padding: '2.5rem 0 1.5rem 0'
    }}>
      <div className="container">
        {/* Main Links Grid (Placed on top cleanly without divider lines) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          paddingBottom: '1.75rem'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.85rem' }}>
              <img
                src="/assets/images/logo/Logo_GreenNest.png"
                alt="GreenNest"
                style={{
                  height: '40px',
                  maxWidth: '200px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Cổng thông tin và sàn giao dịch bất động sản GreenNest minh bạch hàng đầu Việt Nam. Kết nối trực tiếp giữa người mua và chủ sở hữu.
            </p>
          </div>

          {/* Offices */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
              Văn phòng đại diện
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Hà Nội: Keangnam Landmark 72, Nam Từ Liêm</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>TP.HCM: Bitexco Financial Tower, Quận 1</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Đà Nẵng: 36 Bạch Đằng, Quận Hải Châu</span>
              </li>
            </ul>
          </div>

          {/* Blog & Resources */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
              Cẩm nang & Blog BĐS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li>
                <button
                  onClick={onNavigateToBlog}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'left', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Tin tức & Diễn biến thị trường
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToBlog}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'left', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Review & Đánh giá dự án
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToBlog}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'left', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Tư vấn tài chính & Vay mua nhà
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToBlog}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'left', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Phong thủy & Mẹo thiết kế nhà
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Hotline */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
              Tổng đài hỗ trợ
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="var(--green-primary)" />
                <span style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1rem' }}>1900 6868</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="var(--green-primary)" />
                <span>lienhe@batdongsan.vn</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.775rem' }}>
                Thời gian làm việc: 08:00 - 20:30 (Thứ 2 - Chủ Nhật)
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar (Placed cleanly AT THE BOTTOM without harsh divider lines) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShieldCheck size={18} color="var(--green-primary)" />
            <div style={{ fontSize: '0.825rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Pháp lý rõ ràng:</strong> 100% có sổ đỏ/sổ hồng kiểm duyệt
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <CheckCircle2 size={18} color="var(--green-primary)" />
            <div style={{ fontSize: '0.825rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Giá bán trực tiếp:</strong> Niêm yết chính chủ, không chênh lệch giá
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Headphones size={18} color="var(--green-primary)" />
            <div style={{ fontSize: '0.825rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Hỗ trợ 24/7:</strong> Tư vấn và dẫn xem nhà trực tiếp miễn phí
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
