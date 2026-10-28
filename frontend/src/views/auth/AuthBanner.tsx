import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface SlideData {
  id: number;
  image: string;
  tag: string;
  title: string;
  description: string;
  quote: string;
  author: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    tag: 'Kiến Trúc Đương Đại',
    title: 'Kiến Tạo Chuẩn Mực Sống Thượng Lưu & An Cư Trọn Vẹn',
    description: 'Tiếp cận hơn 15,000+ bất động sản cao cấp, kết nối trực tiếp chủ nhà và nhận thẩm định quy hoạch pháp lý chính xác 100%.',
    quote: 'Nhờ batdongsan.vn, gia đình tôi đã tìm được căn Penthouse Thảo Điền ưng ý chỉ sau 2 tuần. Thủ tục sang tên sổ hồng nhanh chóng, minh bạch ngoài mong đợi!',
    author: 'Anh Hoàng Minh — Cư dân Penthouse Thảo Điền'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    tag: 'Pháp Lý Độc Quyền',
    title: 'Giao Dịch An Toàn Tuyệt Đối Với 100% BĐS Thẩm Định Thực Địa',
    description: 'Mọi thông tin quy hoạch, lộ giới và trích lục địa chính được chuyên viên luật kiểm tra độc lập trước khi niêm yết lên hệ thống.',
    quote: 'Tôi đã giao dịch thành công căn biệt thự đơn lập Riverside qua sàn. Dịch vụ hỗ trợ công chứng tận nơi cực kỳ chuyên nghiệp và chu đáo.',
    author: 'Chị Mai Lan — Doanh nhân & Nhà đầu tư'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    tag: 'Sky Villa & Penthouse',
    title: 'Đặc Quyền Tiếp Cận Bộ Sưu Tập Bất Động Sản Triệu Đô',
    description: 'Phân tích thanh khoản chuyên sâu và tư vấn danh mục đầu tư sinh lời bền vững dành riêng cho giới thượng lưu và nhà phát triển dự án.',
    quote: 'Hệ sinh thái thông tin bất động sản trực quan, hình ảnh sắc nét và thông số chi tiết giúp tôi ra quyết định đầu tư nhanh chóng và chuẩn xác.',
    author: 'Anh Quốc Bảo — Chủ tịch tập đoàn đầu tư'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    tag: 'Mạng Lưới Chuyên Gia',
    title: 'Đồng Hành Cùng Chuyên Gia Tư Vấn BĐS Hàng Đầu',
    description: 'Đội ngũ chuyên viên am hiểu từng tuyến đường, hỗ trợ thủ tục công chứng, sang tên sổ hồng và giải ngân ngân hàng nhanh gọn 24/7.',
    quote: 'Sự minh bạch về giá cả và kết nối trực tiếp chủ nhà là điều làm tôi ấn tượng nhất tại batdongsan.vn. Trải nghiệm dịch vụ chuẩn 5 sao!',
    author: 'Bác sĩ Thanh Hải — Khách hàng sở hữu villa nghỉ dưỡng'
  }
];

export const AuthBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused) return;

    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        flex: '1 1 50%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem 3.5rem',
        color: '#ffffff',
        overflow: 'hidden',
        minHeight: '100%',
        backgroundColor: '#0b132b'
      }}
    >
      {/* Background Images with smooth fade transition & subtle zoom */}
      {SLIDES.map((s, index) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentSlide ? 1 : 0,
            transform: index === currentSlide ? 'scale(1)' : 'scale(1.06)',
            transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 6s cubic-bezier(0.25, 1, 0.5, 1)',
            zIndex: 1
          }}
        />
      ))}

      {/* NATURAL DARK GRADIENT OVERLAY (NO GREEN TINT) - Keeps original true colors & crisp architecture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.5) 45%, rgba(0, 0, 0, 0.15) 75%, rgba(0, 0, 0, 0.35) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* TOP HEADER: Brand trust badge & Slide controls */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '7px 16px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
          }}
        >
          <ShieldCheck size={16} color="#34d399" />
          <span>Hệ thống giao dịch chính chủ số 1 Việt Nam</span>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateX(2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* CENTER & BOTTOM CONTENT */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '540px', marginTop: 'auto', paddingTop: '3rem' }}>
        {/* Slide Category Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#34d399',
          fontSize: '0.8rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '0.75rem'
        }}>
          <Award size={14} />
          <span>{slide.tag}</span>
        </div>

        {/* Slide Title */}
        <h2
          key={slide.title}
          style={{
            fontSize: '2.35rem',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.025em',
            marginBottom: '1rem',
            color: '#ffffff',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
            animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {slide.title}
        </h2>

        {/* Slide Description */}
        <p
          key={slide.description}
          style={{
            fontSize: '0.98rem',
            lineHeight: 1.65,
            color: '#e2e8f0',
            marginBottom: '1.75rem',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
            animation: 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {slide.description}
        </p>

        {/* Testimonial Glass Card */}
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', gap: '3px', color: '#facc15', marginBottom: '0.5rem' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="#facc15" color="#facc15" />
            ))}
          </div>
          <p style={{
            fontSize: '0.9rem',
            fontStyle: 'italic',
            color: '#f8fafc',
            lineHeight: 1.55,
            marginBottom: '0.65rem'
          }}>
            "{slide.quote}"
          </p>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6ee7b7' }}>
            {slide.author}
          </div>
        </div>

        {/* Slide Progress / Indicators (Pills) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.75rem' }}>
          {SLIDES.map((_, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  height: '6px',
                  width: isActive ? '32px' : '10px',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? '0 0 10px rgba(255, 255, 255, 0.6)' : 'none'
                }}
              />
            );
          })}
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '1.5rem'
          }}
        >
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              99.8%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 500, marginTop: '2px' }}>
              Hồ sơ pháp lý sạch
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              15,000+
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 500, marginTop: '2px' }}>
              Giao dịch thành công
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              24/7
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 500, marginTop: '2px' }}>
              Chuyên viên hỗ trợ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
