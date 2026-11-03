import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, Headphones } from 'lucide-react';

interface FooterProps {
  onNavigateToBlog?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToBlog }) => {
  return (
    <footer style={{
      backgroundColor: '#1e293b', // Nền xám than trung tính (Slate-800), không quá tối đen
      color: '#cbd5e1',
      padding: '3rem 0 2rem 0',
      borderTop: '1px solid #334155'
    }}>
      <div className="container">
        {/* Main Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid #334155'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.85rem' }}>
              <img
                src="/assets/images/logo/Logo_GreenNest.png"
                alt="GreenNest"
                style={{
                  height: '42px',
                  maxWidth: '200px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'brightness(0) invert(1)' // Giữ logo trắng trên nền xám
                }}
              />
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8' }}>
              Cổng thông tin và sàn giao dịch bất động sản GreenNest minh bạch hàng đầu Việt Nam. Kết nối trực tiếp giữa người mua và chủ sở hữu.
            </p>
          </div>

          {/* Offices */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 750, color: '#f8fafc', marginBottom: '1rem', letterSpacing: '0.02em' }}>
              Văn phòng đại diện
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#cbd5e1' }}>
                <MapPin size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Hà Nội: Keangnam Landmark 72, Nam Từ Liêm</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#cbd5e1' }}>
                <MapPin size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>TP.HCM: Bitexco Financial Tower, Quận 1</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: '#cbd5e1' }}>
                <MapPin size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Đà Nẵng: 36 Bạch Đằng, Quận Hải Châu</span>
              </li>
            </ul>
          </div>

          {/* Blog & Resources */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 750, color: '#f8fafc', marginBottom: '1rem', letterSpacing: '0.02em' }}>
              Cẩm nang & Blog BĐS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <li>
                <button
                  onClick={onNavigateToBlog}
                  style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'left', transition: 'color 0.15s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#34d399')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  Tin tức & Diễn biến thị trường
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToBlog}
                  style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'left', transition: 'color 0.15s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#34d399')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  Review & Đánh giá dự án
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToBlog}
                  style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'left', transition: 'color 0.15s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#34d399')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  Tư vấn tài chính & Vay mua nhà
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToBlog}
                  style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'left', transition: 'color 0.15s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#34d399')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  Phong thủy & Mẹo thiết kế nhà
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Hotline */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 750, color: '#f8fafc', marginBottom: '1rem', letterSpacing: '0.02em' }}>
              Tổng đài hỗ trợ
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#10b981" />
                <span style={{ fontWeight: 800, color: '#34d399', fontSize: '1.1rem', letterSpacing: '0.02em' }}>1900 6868</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                <Mail size={16} color="#10b981" />
                <span>lienhe@batdongsan.vn</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.775rem', marginTop: '0.2rem' }}>
                Thời gian làm việc: 08:00 - 20:30 (Thứ 2 - Chủ Nhật)
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          paddingTop: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShieldCheck size={18} color="#10b981" />
            <div style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#f8fafc' }}>Pháp lý rõ ràng:</strong> 100% có sổ đỏ/sổ hồng kiểm duyệt
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <CheckCircle2 size={18} color="#10b981" />
            <div style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#f8fafc' }}>Giá bán trực tiếp:</strong> Niêm yết chính chủ, không chênh lệch giá
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Headphones size={18} color="#10b981" />
            <div style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#f8fafc' }}>Hỗ trợ 24/7:</strong> Tư vấn và dẫn xem nhà trực tiếp miễn phí
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
