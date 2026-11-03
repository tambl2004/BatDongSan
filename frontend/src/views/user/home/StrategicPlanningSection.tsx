import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react';

interface StrategicPlanningSectionProps {
  onConsult: (serviceTitle: string) => void;
}

interface PlanningProject {
  id: string;
  code: string;
  shortName: string;
  title: string;
  location: string;
  scale: string;
  statusBadge: string;
  summary: string;
  img: string;
}

export const StrategicPlanningSection: React.FC<StrategicPlanningSectionProps> = ({ onConsult }) => {
  const projects: PlanningProject[] = [
    {
      id: 'qh-1',
      code: '01',
      shortName: 'TP. Thủ Đức',
      title: 'Khu Đô Thị Sáng Tạo & Công Nghệ Cao TP. Thủ Đức',
      location: 'TP. Thủ Đức, TP. Hồ Chí Minh',
      scale: '21,000 ha',
      statusBadge: 'Đang triển khai hạ tầng',
      summary: 'Tuyến Metro số 1 Bến Thành - Suối Tiên và Vành đai 3 mở ra cực tăng trưởng kinh tế tri thức và công nghệ cao lớn nhất phía Nam.',
      img: 'https://media.vneconomy.vn/images/upload/2023/06/21/quan-2-1.jpg?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'qh-2',
      code: '02',
      shortName: 'Hòa Lạc — Hà Nội',
      title: 'Trục Đô Thị Sinh Thái Hòa Lạc & Đại Lộ Thăng Long',
      location: 'Thạch Thất & Quốc Oai, Hà Nội',
      scale: '17,274 ha',
      statusBadge: 'Quy hoạch điều chỉnh 2026',
      summary: 'Tuyến đường sắt đô thị số 5 kết nối trực tiếp lõi Ba Đình chỉ 25 phút, quy tụ cụm ĐH Quốc gia và trung tâm đổi mới sáng tạo.',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'qh-3',
      code: '03',
      shortName: 'Sân Bay Long Thành',
      title: 'Đại Đô Thị Sân Bay Quốc Tế Long Thành & Vành Đai 4',
      location: 'Long Thành, Tỉnh Đồng Nai',
      scale: '20,000 ha',
      statusBadge: 'Chuẩn bị phân khu',
      summary: 'Cảng hàng không quốc tế công suất 25 triệu khách/năm định hình trung tâm logistics quốc tế và chuỗi đô thị dịch vụ thông minh.',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'qh-4',
      code: '04',
      shortName: 'Sông Cổ Cò — Đà Nẵng',
      title: 'Đô Thị Du Lịch Ven Sông Cổ Cò & Tuyến Cảnh Quan',
      location: 'Ngũ Hành Sơn & Sơn Trà, TP. Đà Nẵng',
      scale: '28 km cảnh quan',
      statusBadge: 'Đã phê duyệt 1/500',
      summary: 'Khơi thông hành lang du lịch đường thủy Đà Nẵng — Hội An cùng chuỗi resort ven sông và quần thể biệt thự sinh thái.',
      img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const total = projects.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Auto-play 3s per slide
  const SLIDE_DURATION = 3000;

  const goTo = useCallback((targetIndex: number) => {
    setCurrentIndex((targetIndex + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const handlePrev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex(c => (c + 1) % total);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  // Touch gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStart(null);
    setIsPaused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      className="strategic-planning-root"
      aria-label="Khu vực quy hoạch trọng điểm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{
        padding: '2rem 0',
        backgroundColor: 'rgb(248, 250, 252)',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9',
        overflow: 'hidden',
        outline: 'none'
      }}
    >
      <div className="container" style={{ position: 'relative' }}>
        {/* Section Header đồng bộ nhận diện thương hiệu GreenNest & Toàn bộ Trang Home */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <p className="font-script" style={{
              fontSize: '2rem',
              color: '#c5a880',
              margin: 0,
              lineHeight: 1.1
            }}>
              Hạ tầng chiến lược
            </p>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              color: 'var(--green-primary)',
              letterSpacing: '0.04em',
              marginTop: '0.25rem',
              textTransform: 'uppercase'
            }}>
              KHU VỰC QUY HOẠCH TRỌNG ĐIỂM
            </h2>
            <p style={{
              fontSize: '0.925rem',
              color: 'var(--text-secondary)',
              marginTop: '0.35rem',
              maxWidth: '680px',
              lineHeight: 1.6
            }}>
              Nắm bắt thông tin quy hoạch hạ tầng giao thông và đô thị mới nhất năm 2026 để đón đầu làn sóng gia tăng giá trị.
            </p>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#64748b',
              fontVariantNumeric: 'tabular-nums'
            }}>
              <strong style={{ color: 'var(--green-primary)', fontSize: '1.25rem' }}>
                {projects[currentIndex].code}
              </strong>
              <span style={{ margin: '0 4px', color: '#cbd5e1' }}>/</span>
              0{total}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Slide trước"
                className="strategic-arrow-btn"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Slide tiếp theo"
                className="strategic-arrow-btn"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* 3-Card Carousel Stage: To hơn, rộng hơn, không gian thoáng đãng */}
        <div
          className="strategic-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project, idx) => {
            let offset = idx - currentIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            let cardStateClass = 'card-hidden';
            if (isCenter) cardStateClass = 'card-center';
            else if (isLeft) cardStateClass = 'card-left';
            else if (isRight) cardStateClass = 'card-right';

            return (
              <div
                key={project.id}
                className={`strategic-card ${cardStateClass}`}
                onClick={() => {
                  if (isLeft) handlePrev();
                  else if (isRight) handleNext();
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${project.title} (${idx + 1} / ${total})`}
                aria-hidden={!isCenter && !isLeft && !isRight}
              >
                {/* Background Image Layer */}
                <div className="card-img-wrapper">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="card-img"
                    loading={idx === 0 || idx === 1 ? 'eager' : 'lazy'}
                  />
                  <div className="card-gradient-overlay" />
                </div>

                {/* Content Overlay */}
                <div className="card-content-overlay">
                  {/* Active Card: Tinh gọn, giảm bớt box rườm rà */}
                  {isCenter && (
                    <>
                      {/* 1 tag duy nhất tinh giản, không đóng khung nhiều box */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                        <span className="clean-scale-tag">
                          {project.scale}
                        </span>
                        <span style={{ color: '#a7f3d0', fontSize: '0.78rem', fontWeight: 600 }}>
                          ● {project.statusBadge}
                        </span>
                      </div>

                      {/* Tiêu đề dự án */}
                      <h3 className="card-title-center">
                        {project.title}
                      </h3>

                      {/* Địa điểm */}
                      <div className="card-location">
                        <MapPin size={15} color="var(--green-border)" />
                        <span>{project.location}</span>
                      </div>

                      {/* 1 câu mô tả ngắn gọn */}
                      <p className="card-summary">
                        {project.summary}
                      </p>

                      {/* Nút CTA đồng bộ chuẩn btn-primary */}
                      <div style={{ marginTop: '0.25rem' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onConsult(`Quy Hoạch Chiến Lược — ${project.shortName}`);
                          }}
                          className="btn-primary"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.7rem 1.6rem',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            borderRadius: 'var(--radius-pill)',
                            cursor: 'pointer'
                          }}
                        >
                          <span>Nhận hồ sơ quy hoạch</span>
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </>
                  )}

                  {/* 2 Card phụ bên cạnh: Tinh giản, chỉ hiển thị tên & quy mô */}
                  {!isCenter && (
                    <div className="side-card-content">
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a7f3d0', letterSpacing: '0.04em' }}>
                        {project.scale}
                      </span>
                      <h4 className="side-card-title">
                        {project.title}
                      </h4>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Pagination Pill Track */}
        <div className="strategic-pagination" role="tablist" aria-label="Danh sách slide">
          {projects.map((proj, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={proj.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Đi tới slide ${idx + 1}: ${proj.shortName}`}
                className={`pagination-track ${isActive ? 'pagination-track-active' : ''}`}
                onClick={() => goTo(idx)}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        /* Nút mũi tên navigation */
        .strategic-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background-color: #ffffff;
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .strategic-arrow-btn:hover {
          border-color: var(--green-primary);
          color: var(--green-primary);
          background-color: var(--green-light);
          transform: translateY(-1px);
        }

        /* 3-Card Carousel Stage: Chiều cao tăng lên 520px (rộng rãi, khoáng đạt) */
        .strategic-stage {
          position: relative;
          width: 100%;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1400px;
          user-select: none;
        }

        /* Thẻ cơ sở */
        .strategic-card {
          position: absolute;
          border-radius: 18px;
          overflow: hidden;
          background-color: #0f172a;
          will-change: transform, opacity, width, height;
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      width 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      height 0.65s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
        }

        /* SLIDE TRUNG TÂM: Mở rộng 68% chiều ngang, cao 510px */
        .card-center {
          width: 68%;
          height: 510px;
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 1;
          z-index: 20;
          cursor: default;
          box-shadow: 0 24px 50px -10px rgba(15, 23, 42, 0.35), 0 10px 20px -5px rgba(5, 150, 105, 0.15);
        }

        /* 2 SLIDE PHỤ BÊN CẠNH: Rộng 26%, cao 410px */
        .card-left {
          width: 26%;
          height: 410px;
          transform: translate3d(-112%, 0, -60px) scale(0.93);
          opacity: 0.85;
          z-index: 10;
          box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.2);
        }

        .card-left:hover {
          opacity: 0.98;
          transform: translate3d(-112%, -3px, -40px) scale(0.95);
        }

        .card-right {
          width: 26%;
          height: 410px;
          transform: translate3d(112%, 0, -60px) scale(0.93);
          opacity: 0.85;
          z-index: 10;
          box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.2);
        }

        .card-right:hover {
          opacity: 0.98;
          transform: translate3d(112%, -3px, -40px) scale(0.95);
        }

        /* Slide ẩn ngoài tầm nhìn */
        .card-hidden {
          width: 20%;
          height: 340px;
          transform: translate3d(0, 0, -120px) scale(0.7);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* Wrapper hình ảnh */
        .card-img-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .strategic-card:hover .card-img {
          transform: scale(1.04);
        }

        /* Gradient chuyển êm, dễ đọc text */
        .card-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 23, 42, 0.95) 0%,
            rgba(15, 23, 42, 0.6) 42%,
            rgba(15, 23, 42, 0.15) 70%,
            transparent 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        /* Container nội dung trên ảnh */
        .card-content-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2.5rem 2.75rem;
          color: #ffffff;
        }

        .card-left .card-content-overlay,
        .card-right .card-content-overlay {
          padding: 1.75rem 1.5rem;
        }

        /* Tag quy mô gọn gàng */
        .clean-scale-tag {
          font-size: 0.76rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Tiêu đề slide chính */
        .card-title-center {
          font-size: 1.85rem;
          font-weight: 850;
          color: #ffffff;
          line-height: 1.25;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.015em;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }

        .card-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          color: #cbd5e1;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .card-summary {
          font-size: 0.925rem;
          color: #f1f5f9;
          line-height: 1.6;
          margin: 0 0 1.25rem 0;
          max-width: 660px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Nội dung thẻ phụ */
        .side-card-content {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .side-card-title {
          font-size: 1.1rem;
          font-weight: 750;
          color: #ffffff;
          line-height: 1.35;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Pagination Dots */
        .strategic-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 2.25rem;
        }

        .pagination-track {
          height: 6px;
          width: 14px;
          border-radius: 9999px;
          border: none;
          background-color: #cbd5e1;
          cursor: pointer;
          padding: 0;
          transition: width 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
                      background-color 0.35s ease;
        }

        .pagination-track-active {
          width: 36px;
          background-color: var(--green-primary);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .strategic-card,
          .card-img,
          .strategic-arrow-btn,
          .pagination-track {
            transition: none !important;
          }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .card-center {
            width: 78%;
            height: 480px;
          }
          .card-left, .card-right {
            width: 24%;
            height: 380px;
          }
          .card-title-center {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 820px) {
          .strategic-stage {
            height: 440px;
          }
          .card-left,
          .card-right {
            display: none !important;
          }
          .card-center {
            width: 100% !important;
            height: 440px !important;
            transform: none !important;
          }
          .card-content-overlay {
            padding: 1.75rem 1.5rem;
          }
          .card-title-center {
            font-size: 1.45rem;
          }
        }
      `}</style>
    </section>
  );
};
