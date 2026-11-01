import React from 'react';

export const GreenNestWhyChooseSection: React.FC = () => {
  return (
    <section style={{
      position: 'relative',
      padding: '6.5rem 0 6.5rem 0',
      minHeight: '750px',
      overflow: 'hidden',
      color: '#ffffff'
    }}>
      {/* Background Image: misty mountain pine forest from user link */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0
      }}>
        <img
          src="/assets/images/home/bg-section-why.jpg"
          onError={(e) => {
            e.currentTarget.src = 'https://bds23.mauthemewp.com/wp-content/themes/thetropicanagarden/img/bg-section-why.jpg';
          }}
          alt="Lý do chọn GreenNest Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        {/* Subtle atmospheric tint matching Image 4 (NO aggressive black box overlay) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(13, 76, 59, 0.35) 40%, rgba(8, 47, 36, 0.65) 100%)'
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header matching Image 4 */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          {/* Script Subtitle */}
          <div
            className="font-script"
            style={{
              fontSize: '2.8rem',
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: '0.25rem',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
              fontWeight: 600
            }}
          >
            Lý do chọn
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: '2.3rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
            margin: 0
          }}>
            GREENNEST
          </h2>
        </div>

        {/* 6 Reasons Undulating Flow Layout (NO card boxes, NO borders, NO rounded corners) */}
        <div style={{ position: 'relative', maxWidth: '1160px', margin: '0 auto' }}>
          {/* Sinuous White Wave Line across the section */}
          <svg
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              height: '80px',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
            viewBox="0 0 1100 80"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* The continuous white sine curve */}
            <path
              d="M 0 40 C 90 5, 180 75, 275 40 S 460 5, 550 40 S 730 75, 825 40 S 1010 5, 1100 40"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Top Row: 3 Reasons (Items 1, 3, 5) positioned above the wave line */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: '2.5rem',
            marginBottom: '4.5rem',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Item 1: CHỦ ĐẦU TƯ UY TÍN */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
            }}>
              <h3 style={{
                fontSize: '0.975rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.65rem'
              }}>
                CHỦ ĐẦU TƯ UY TÍN
              </h3>
              <p style={{
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.92)',
                margin: '0 0 1rem 0'
              }}>
                Với sự thành công vang dội với hàng loạt dự án sinh thái tiêu biểu, GreenNest luôn là đơn vị tiên phong mang đến những giá trị đích thực và bền vững cho khách hàng.
              </p>
              {/* Vertical connector stem to wave circle node */}
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid #ffffff',
                backgroundColor: 'transparent',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
              }} />
            </div>

            {/* Item 2: GIÁ BÁN VÀ CHƯƠNG TRÌNH ƯU ĐÃI */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
            }}>
              <h3 style={{
                fontSize: '0.975rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.65rem'
              }}>
                GIÁ BÁN VÀ CHƯƠNG TRÌNH ƯU ĐÃI
              </h3>
              <p style={{
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.92)',
                margin: '0 0 1rem 0'
              }}>
                Khách hàng mua giá F0 trực tiếp từ chủ đầu tư GreenNest không qua bất kỳ sàn giao dịch nào khác nên giá luôn tốt hơn thị trường từ 10-20%, kèm nhiều chính sách ưu đãi.
              </p>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid #ffffff',
                backgroundColor: 'transparent',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
              }} />
            </div>

            {/* Item 3: DỊCH VỤ HẬU MÃI */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
            }}>
              <h3 style={{
                fontSize: '0.975rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.65rem'
              }}>
                DỊCH VỤ HẬU MÃI
              </h3>
              <p style={{
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.92)',
                margin: '0 0 1rem 0'
              }}>
                Dịch vụ quản lý và chăm sóc trông coi đất. Hỗ trợ trồng rau, cây ăn trái và các loại hoa màu theo nhu cầu khách. Khách hàng an tâm sở hữu ngôi nhà thứ 2 trọn vẹn.
              </p>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid #ffffff',
                backgroundColor: 'transparent',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
              }} />
            </div>
          </div>

          {/* Bottom Row: 3 Reasons (Items 2, 4, 6) positioned below the wave line */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: '2.5rem',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Item 4: DÂN CƯ, TIỆN ÍCH HIỆN HỮU */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid #ffffff',
                backgroundColor: 'transparent',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
              }} />
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <h3 style={{
                fontSize: '0.975rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: '0.85rem 0 0.65rem 0'
              }}>
                DÂN CƯ, TIỆN ÍCH HIỆN HỮU
              </h3>
              <p style={{
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.92)',
                margin: 0
              }}>
                GreenNest nằm trong khu dân cư hiện hữu với đầy đủ các tiện ích sẵn có như UBND, nhà văn hóa, trường học, chợ, bách hóa xanh... giúp giá tăng giá trị bền vững.
              </p>
            </div>

            {/* Item 5: THIẾT KẾ, THI CÔNG VÀ VẬN HÀNH HOME STAY */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid #ffffff',
                backgroundColor: 'transparent',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
              }} />
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <h3 style={{
                fontSize: '0.975rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: '0.85rem 0 0.65rem 0'
              }}>
                THIẾT KẾ, THI CÔNG VÀ VẬN HÀNH HOME STAY
              </h3>
              <p style={{
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.92)',
                margin: 0
              }}>
                GreenNest Living hỗ trợ khách hàng xây dựng và vận hành khai thác cho thuê du lịch sinh thái, tạo ra giá trị gia tăng ổn định và dòng tiền thụ động.
              </p>
            </div>

            {/* Item 6: PHÁP LÝ RÕ RÀNG */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid #ffffff',
                backgroundColor: 'transparent',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
              }} />
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <h3 style={{
                fontSize: '0.975rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: '0.85rem 0 0.65rem 0'
              }}>
                PHÁP LÝ RÕ RÀNG
              </h3>
              <p style={{
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.92)',
                margin: 0
              }}>
                Như cam kết với các khách hàng khi mua sản phẩm, toàn bộ các sản phẩm của GreenNest đều có pháp lý minh bạch, sổ đỏ/sổ hồng riêng biệt, công chứng sang tên ngay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
