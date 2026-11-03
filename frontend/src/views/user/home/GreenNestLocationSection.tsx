import React from 'react';
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
      padding: '2rem 0 2rem 0',
      backgroundColor: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Musical Note Accent in Top Left matching Image 3 */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <svg width="100" height="60" viewBox="0 0 100 60" fill="none" stroke="#64748b" strokeWidth="0.8">
          <path d="M 0 5 C 30 15, 60 5, 90 25" />
          <path d="M 0 12 C 30 22, 60 12, 90 32" />
          <path d="M 0 19 C 30 29, 60 19, 90 39" />
          <text x="15" y="42" fill="#475569" fontSize="20" fontFamily="serif">♭</text>
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 1.15fr) minmax(340px, 1.25fr)',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Script Title + Narrative + Clean Golden Icon List (NO card boxes) */}
          <div>
            {/* Script Heading matching Image 3 */}
            <div
              className="font-script"
              style={{
                fontSize: '2.8rem',
                lineHeight: 1.15,
                color: '#475569',
                marginBottom: '1rem',
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
              marginBottom: '1.25rem'
            }}>
              Tọa lạc tại huyện Bảo Lâm, liền kề Tp Bảo Lộc, tỉnh Lâm Đồng, với độ cao hơn <strong>950m</strong> so với mực nước biển, là nơi được đầu tư đồng bộ về hạ tầng và tiện ích công viên, GreenNest hội tụ tất cả không khí trong lành và lan tỏa nguồn năng lượng xanh dồi dào đến cộng đồng dân cư, mang không gian yên bình tràn ngập tâm trí, tận hưởng thật sâu cảm giác thư giãn, nghỉ dưỡng tuyệt vời.
            </p>

            {/* Paragraph 2 */}
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.75,
              color: '#475569',
              textAlign: 'justify',
              marginBottom: '2rem'
            }}>
              GreenNest được bao quanh bởi nhiều tuyến đường huyết mạch, nối mạch phồn vinh đến các khu vực. Từ Tp Bảo Lộc, chỉ mất khoảng <strong>20 phút</strong> di chuyển đã có thể chạm đến không gian tuyệt hảo của GreenNest.
            </p>

            {/* Clean 2-Column Landmark List - Pure typography with Golden Icons (NO card boxes) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              columnGap: '1.5rem',
              rowGap: '1.15rem'
            }}>
              {/* Column 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
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
                      {/* Golden Circular Icon Accent matching Image 3 */}
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
                        fontSize: '0.925rem',
                        color: '#334155',
                        fontWeight: 500,
                        whiteSpace: 'nowrap'
                      }}>
                        {item.title} - <strong>{item.distance}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
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
                        fontSize: '0.925rem',
                        color: '#334155',
                        fontWeight: 500,
                        whiteSpace: 'nowrap'
                      }}>
                        {item.title} - <strong>{item.distance}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Regional Map on White Background (NO heavy dark box) */}
          <div style={{ position: 'relative' }}>
            <img
              src="/assets/images/home/vi-tri-map.png"
              onError={(e) => {
                e.currentTarget.src = 'https://bds23.mauthemewp.com/wp-content/uploads/2021/06/screenshot_1623728073.png';
              }}
              alt="Bản đồ vị trí kết nối"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
