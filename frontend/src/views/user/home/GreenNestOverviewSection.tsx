import React from 'react';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

export const GreenNestOverviewSection: React.FC = () => {
  return (
    <section style={{
      backgroundColor: '#ffffff',
      position: 'relative',
      padding: 'clamp(2.5rem, 6vw, 4.5rem) 0',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div className="grid-responsive-2col">
          {/* Left Column: Landscape Image with Flowing Musical Stave Lines */}
          <ScrollReveal
            direction="left"
            distance={36}
            duration={0.75}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              margin: '0 auto'
            }}
          >
            {/* Authentic Musical Stave SVG with Notes wrapping around image */}
            <svg
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-15px',
                width: '140px',
                height: '300px',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.8
              }}
              viewBox="0 0 160 340"
              fill="none"
              stroke="#4a5568"
              strokeWidth="0.85"
            >
              {/* 5-line Musical Stave coming from top-left */}
              <path d="M -30 20 L 80 140" />
              <path d="M -30 38 L 80 158" />
              <path d="M -30 56 L 80 176" />
              <path d="M -30 74 L 80 194" />
              <path d="M -30 92 L 80 212" />

              {/* Music Note 1: Eighth Note */}
              <ellipse cx="25" cy="115" rx="5" ry="4" transform="rotate(-25 25 115)" fill="#2d3748" />
              <line x1="29" y1="113" x2="29" y2="82" stroke="#2d3748" strokeWidth="1.2" />
              <path d="M 29 82 Q 38 88, 35 98" stroke="#2d3748" strokeWidth="1.2" fill="none" />
            </svg>

            {/* Bottom Musical Curves and Notes */}
            <svg
              style={{
                position: 'absolute',
                bottom: '-35px',
                left: '-15px',
                width: '200px',
                height: '130px',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.8
              }}
              viewBox="0 0 240 140"
              fill="none"
              stroke="#4a5568"
              strokeWidth="0.85"
            >
              <path d="M 0 140 C 20 80, 50 50, 110 90 S 170 120, 240 100" />
              <path d="M 0 132 C 20 72, 50 42, 110 82 S 170 112, 240 92" />
              <path d="M 0 124 C 20 64, 50 34, 110 74 S 170 104, 240 84" />
              <path d="M 0 116 C 20 56, 50 26, 110 66 S 170 96, 240 76" />
              <path d="M 0 108 C 20 48, 50 18, 110 58 S 170 88, 240 68" />
              <ellipse cx="85" cy="85" rx="5" ry="3.5" transform="rotate(-20 85 85)" fill="#2d3748" />
              <line x1="89" y1="83" x2="89" y2="52" stroke="#2d3748" strokeWidth="1.2" />
              <text x="35" y="125" fill="#2d3748" fontSize="22" fontFamily="serif" fontWeight="bold">♭</text>
            </svg>

            {/* Image Container */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 12px 32px -6px rgba(0, 0, 0, 0.12)'
            }}>
              <img
                src="/assets/images/home/tong-quan.jpg"
                onError={(e) => {
                  e.currentTarget.src = 'https://bds23.mauthemewp.com/wp-content/uploads/2021/06/Tong-quan.jpg';
                }}
                alt="Giới thiệu tổng quan GreenNest"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '440px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </ScrollReveal>

          {/* Right Column: Editorial Typography */}
          <ScrollReveal
            direction="right"
            distance={36}
            duration={0.75}
            delay={0.15}
            style={{ maxWidth: '600px' }}
          >
            {/* Calligraphic Script Subtitle */}
            <div
              className="font-script"
              style={{
                fontSize: 'clamp(1.8rem, 5.5vw, 2.5rem)',
                lineHeight: 1.2,
                color: '#4a5568',
                marginBottom: '0.2rem',
                fontWeight: 600
              }}
            >
              Giới thiệu tổng quan
            </div>

            {/* Green Brand Title */}
            <h2 style={{
              fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#23734b',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-main)'
            }}>
              GREENNEST
            </h2>

            {/* Narrative Paragraph */}
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: '#4a5568',
              textAlign: 'justify',
              margin: 0
            }}>
              Tiếp nối và thừa kế thành công từ các dự án sinh thái tiêu biểu, vẫn giữ nguyên cảm xúc lắng đọng trước sự mộc mạc của thiên nhiên, GreenNest ra đời và một lần nữa khẳng định giá trị thiên nhiên ban tặng cho cuộc sống, không chỉ là nơi ở đơn thuần mà còn là nghệ thuật sống tận hưởng, chạm đến từng giá trị tinh thần, giá trị vật chất bền vững và dài lâu, hứa hẹn là điểm đến lý tưởng cho những ai muốn hưởng thụ bầu không khí trong lành cùng cảnh quan hùng vĩ giữa tiết trời se lạnh.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
