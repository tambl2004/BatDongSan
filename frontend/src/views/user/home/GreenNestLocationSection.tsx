import React from 'react';
import { ScrollReveal } from '../../../components/common/ScrollReveal';
import {
  Castle,
  TreePine,
  Plane,
  Sparkles,
  Church,
  Compass,
  Footprints
} from 'lucide-react';

export const GreenNestLocationSection: React.FC = () => {
  const col1 = [
    { title: 'Lâu Đài Trắng', distance: '9Km', icon: Castle },
    { title: 'Khu Giải Trí, TDTT', distance: '15Km', icon: Footprints },
    { title: 'Sân bay Liên Khương', distance: '100Km', icon: Plane },
    { title: 'Đồi Chè Tâm Châu', distance: '13Km', icon: TreePine },
  ];

  const col2 = [
    { title: 'Tu Viện Bát Nhã', distance: '8Km', icon: Sparkles },
    { title: 'Thác Dambri', distance: '10Km', icon: Compass },
    { title: 'Nhà Thờ Thánh Mẫu', distance: '20Km', icon: Church },
  ];

  return (
    <section style={{
      padding: 'clamp(2.5rem, 6vw, 4rem) 0',
      backgroundColor: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Musical Note Accent in Top Left */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6
      }}>
        <svg width="80" height="50" viewBox="0 0 100 60" fill="none" stroke="#64748b" strokeWidth="0.8">
          <path d="M 0 5 C 30 15, 60 5, 90 25" />
          <path d="M 0 12 C 30 22, 60 12, 90 32" />
          <path d="M 0 19 C 30 29, 60 19, 90 39" />
          <text x="15" y="42" fill="#475569" fontSize="20" fontFamily="serif">♭</text>
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid-responsive-2col">
          {/* Left Column: Script Title + Narrative + Clean Golden Icon List */}
          <ScrollReveal direction="left" distance={36} duration={0.75}>
            {/* Script Heading */}
            <div
              className="font-script"
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.8rem)',
                lineHeight: 1.15,
                color: '#475569',
                marginBottom: '0.85rem',
                fontWeight: 600
              }}
            >
              Vị trí vàng
            </div>

            {/* Paragraph 1 */}
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.75,
              color: '#475569',
              textAlign: 'justify',
              marginBottom: '1rem'
            }}>
              Tọa lạc tại huyện Bảo Lâm, liền kề Tp Bảo Lộc, tỉnh Lâm Đồng, với độ cao hơn <strong>950m</strong> so với mực nước biển, là nơi được đầu tư đồng bộ về hạ tầng và tiện ích công viên, GreenNest hội tụ tất cả không khí trong lành và lan tỏa nguồn năng lượng xanh dồi dào đến cộng đồng dân cư, mang không gian yên bình tràn ngập tâm trí, tận hưởng thật sâu cảm giác thư giãn, nghỉ dưỡng tuyệt vời.
            </p>

            {/* Paragraph 2 */}
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.75,
              color: '#475569',
              textAlign: 'justify',
              marginBottom: '1.75rem'
            }}>
              GreenNest được bao quanh bởi nhiều tuyến đường huyết mạch, nối mạch phồn vinh đến các khu vực. Từ Tp Bảo Lộc, chỉ mất khoảng <strong>20 phút</strong> di chuyển đã có thể chạm đến không gian tuyệt hảo của GreenNest.
            </p>

            {/* Responsive 2-Column Landmark List */}
            <div className="grid-landmarks-2col">
              {/* Column 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {col1.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem'
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#c49a45',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        flexShrink: 0
                      }}>
                        <IconComp size={14} />
                      </div>

                      <div style={{
                        fontSize: '0.9rem',
                        color: '#334155',
                        fontWeight: 500,
                        lineHeight: 1.3
                      }}>
                        {item.title} - <strong>{item.distance}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {col2.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem'
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#c49a45',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        flexShrink: 0
                      }}>
                        <IconComp size={14} />
                      </div>

                      <div style={{
                        fontSize: '0.9rem',
                        color: '#334155',
                        fontWeight: 500,
                        lineHeight: 1.3
                      }}>
                        {item.title} - <strong>{item.distance}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Clean Regional Map */}
          <ScrollReveal
            direction="right"
            distance={36}
            duration={0.75}
            delay={0.15}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <img
              src="/assets/images/home/vi-tri-map.png"
              onError={(e) => {
                e.currentTarget.src = 'https://bds23.mauthemewp.com/wp-content/uploads/2021/06/screenshot_1623728073.png';
              }}
              alt="Bản đồ vị trí kết nối"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '8px'
              }}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
