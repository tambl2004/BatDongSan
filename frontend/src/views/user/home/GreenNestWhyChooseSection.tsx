import React from 'react';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

export const GreenNestWhyChooseSection: React.FC = () => {
  const reasons = [
    {
      num: '01',
      title: 'CHỦ ĐẦU TƯ UY TÍN',
      desc: 'Với sự thành công vang dội với hàng loạt dự án sinh thái tiêu biểu, GreenNest luôn là đơn vị tiên phong mang đến những giá trị đích thực và bền vững cho khách hàng.'
    },
    {
      num: '02',
      title: 'DÂN CƯ, TIỆN ÍCH HIỆN HỮU',
      desc: 'GreenNest nằm trong khu dân cư hiện hữu với đầy đủ các tiện ích sẵn có như UBND, nhà văn hóa, trường học, chợ, bách hóa xanh... giúp gia tăng giá trị bền vững.'
    },
    {
      num: '03',
      title: 'GIÁ BÁN VÀ CHƯƠNG TRÌNH ƯU ĐÃI',
      desc: 'Khách hàng mua giá F0 trực tiếp từ chủ đầu tư GreenNest không qua bất kỳ sàn giao dịch nào khác nên giá luôn tốt hơn thị trường từ 10-20%, kèm nhiều chính sách ưu đãi.'
    },
    {
      num: '04',
      title: 'THIẾT KẾ, THI CÔNG VÀ VẬN HÀNH HOME STAY',
      desc: 'GreenNest Living hỗ trợ khách hàng xây dựng và vận hành khai thác cho thuê du lịch sinh thái, tạo ra giá trị gia tăng ổn định và dòng tiền thụ động.'
    },
    {
      num: '05',
      title: 'DỊCH VỤ HẬU MÃI',
      desc: 'Dịch vụ quản lý và chăm sóc trông coi đất. Hỗ trợ trồng rau, cây ăn trái và các loại hoa màu theo nhu cầu khách. Khách hàng an tâm sở hữu ngôi nhà thứ 2 trọn vẹn.'
    },
    {
      num: '06',
      title: 'PHÁP LÝ RÕ RÀNG',
      desc: 'Như cam kết với các khách hàng khi mua sản phẩm, toàn bộ các sản phẩm của GreenNest đều có pháp lý minh bạch, sổ đỏ/sổ hồng riêng biệt, công chứng sang tên ngay.'
    }
  ];

  return (
    <section style={{
      position: 'relative',
      padding: 'clamp(3.5rem, 7vw, 6.5rem) 0',
      minHeight: '650px',
      overflow: 'hidden',
      color: '#ffffff'
    }}>
      {/* Background Image: misty mountain pine forest */}
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
        {/* Subtle atmospheric tint */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(13, 76, 59, 0.45) 40%, rgba(8, 47, 36, 0.75) 100%)'
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <ScrollReveal direction="up" duration={0.65} style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <div
            className="font-script"
            style={{
              fontSize: 'clamp(2rem, 6vw, 2.8rem)',
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: '0.25rem',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
              fontWeight: 600
            }}
          >
            Lý do chọn
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 6vw, 2.3rem)',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
            margin: 0
          }}>
            GREENNEST
          </h2>
        </ScrollReveal>

        {/* DESKTOP VIEW: Continuous Sinuous Wave Line Layout */}
        <ScrollReveal direction="up" duration={0.75} delay={0.15} className="why-choose-desktop" style={{ position: 'relative', maxWidth: '1160px', margin: '0 auto' }}>
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
            <path
              d="M 0 40 C 90 5, 180 75, 275 40 S 460 5, 550 40 S 730 75, 825 40 S 1010 5, 1100 40"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Top Row: 3 Reasons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: '2.5rem',
            marginBottom: '4.5rem',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Item 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>
              <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
                {reasons[0].title}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.92)', margin: '0 0 1rem 0' }}>
                {reasons[0].desc}
              </p>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #ffffff', backgroundColor: 'transparent', boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }} />
            </div>

            {/* Item 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>
              <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
                {reasons[2].title}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.92)', margin: '0 0 1rem 0' }}>
                {reasons[2].desc}
              </p>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #ffffff', backgroundColor: 'transparent', boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }} />
            </div>

            {/* Item 5 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>
              <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
                {reasons[4].title}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.92)', margin: '0 0 1rem 0' }}>
                {reasons[4].desc}
              </p>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #ffffff', backgroundColor: 'transparent', boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }} />
            </div>
          </div>

          {/* Bottom Row: 3 Reasons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: '2.5rem',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Item 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #ffffff', backgroundColor: 'transparent', boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }} />
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0.85rem 0 0.65rem 0' }}>
                {reasons[1].title}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.92)', margin: 0 }}>
                {reasons[1].desc}
              </p>
            </div>

            {/* Item 4 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #ffffff', backgroundColor: 'transparent', boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }} />
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0.85rem 0 0.65rem 0' }}>
                {reasons[3].title}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.92)', margin: 0 }}>
                {reasons[3].desc}
              </p>
            </div>

            {/* Item 6 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #ffffff', backgroundColor: 'transparent', boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }} />
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
              <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0.85rem 0 0.65rem 0' }}>
                {reasons[5].title}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.92)', margin: 0 }}>
                {reasons[5].desc}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* MOBILE VIEW: Elegant Responsive Timeline/Card Flow */}
        <ScrollReveal direction="up" duration={0.75} delay={0.15} className="why-choose-mobile" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {reasons.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  backgroundColor: 'rgba(15, 23, 42, 0.35)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '1.15rem 1.25rem'
                }}
              >
                {/* Glowing Node Number */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1.5px solid rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  flexShrink: 0,
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.25)'
                }}>
                  {item.num}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '0.925rem',
                    fontWeight: 750,
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    marginBottom: '0.35rem',
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.9)',
                    margin: 0
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
