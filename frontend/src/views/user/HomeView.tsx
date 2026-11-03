import React, { useState } from 'react';
import { Hero } from '../../components/Hero';
import { ListingType } from '../../types/property';
import { ProjectDetailModal, ProjectData } from '../../components/modals/ProjectDetailModal';
import { ServiceConsultModal } from '../../components/modals/ServiceConsultModal';
import { GreenNestOverviewSection } from './home/GreenNestOverviewSection';
import { GreenNestLocationSection } from './home/GreenNestLocationSection';
import { GreenNestWhyChooseSection } from './home/GreenNestWhyChooseSection';
import { ProjectShowcaseSection } from './home/ProjectShowcaseSection';
import { ProjectAmenitiesSection } from './home/ProjectAmenitiesSection';
import { ProjectGallerySection } from './home/ProjectGallerySection';
import { HomeNewsSection } from './home/HomeNewsSection';
import { StrategicPlanningSection } from './home/StrategicPlanningSection';
import {
  Building,
  ArrowRight,
  Users,
  Award,
  Clock
} from 'lucide-react';

interface HomeViewProps {
  onSearch: (filters: {
    search: string;
    city: string;
    propertyType: string;
    listingType: ListingType;
  }) => void;
  onNavigateToListing?: (tab: 'sale' | 'rent', city?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSearch }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [consultServiceTitle, setConsultServiceTitle] = useState<string>('');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const openServiceConsult = (title: string) => {
    setConsultServiceTitle(title);
    setIsConsultModalOpen(true);
  };

  const brandPartners = [
    {
      name: 'MB Bank',
      logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/11/mb-bank-logo-inkythuatso-01-10-09-02-50.jpg'
    },
    {
      name: 'BIDV',
      logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/10/logo-bidv-inkythuatso-22-08-48-55.jpg'
    },
    {
      name: 'VPBank',
      logo: 'https://inkythuatso.com/uploads/images/2021/11/vpbank-logo-inkythuatso-01-10-11-16-30.jpg'
    },
    {
      name: 'Vietcombank',
      logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/09/logo-vietcombank-inkythuatso-10-10-45-11.jpg'
    },
    {
      name: 'Techcombank',
      logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/09/logo-techcombank-inkythuatso-10-15-17-50.jpg'
    },
    {
      name: 'ACB',
      logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-acb-inkythuatso-10-10-28-43.jpg'
    },
    {
      name: 'TPBank',
      logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-tpbank-inkythuatso-01-10-15-48-05.jpg'
    },
    {
      name: 'VietinBank',
      logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/09/logo-vietinbank-inkythuatso-co-slogan-10-13-23-49.jpg'
    },
    {
      name: 'Agribank',
      logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-agribank-inkythuatso-3-01-09-15-30-31.jpg'
    },
    {
      name: 'Sacombank',
      logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/09/logo-sacombank-inkythuatso-fn-10-16-42-08.jpg'
    }
  ];



  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Hero with Video Banner and Fast Search */}
      <Hero onSearch={onSearch} />

      {/* 2. Brand Partners Marquee - Continuous Loop (Ảnh mẫu 3) */}
      <section style={{
        padding: '2.5rem 0',
        backgroundColor: '#ffffff',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <p className="font-script" style={{ fontSize: '1.75rem', color: '#c5a880', margin: 0, lineHeight: 1 }}>
            Mạng lưới liên kết
          </p>
          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginTop: '3px'
          }}>
            Đối Tác Phát Triển & Bảo Trợ Tài Chính
          </h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Hợp tác chiến lược cùng các tập đoàn bất động sản hàng đầu và hệ thống ngân hàng uy tín
          </p>
        </div>

        <div className="marquee-container" style={{ padding: '0.85rem 0' }}>
          <div className="marquee-content" style={{ display: 'flex', alignItems: 'center', gap: '3.5rem' }}>
            {[...brandPartners, ...brandPartners].map((partner, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.25rem 0.5rem',
                  opacity: 0.85,
                  transition: 'all 0.25s ease',
                  cursor: 'default',
                  flexShrink: 0
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1.06)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '0.85';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  style={{
                    height: '42px',
                    maxWidth: '140px',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply'
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW SECTION: Giới Thiệu Tổng Quan - GreenNest (Ảnh 2) */}
      <GreenNestOverviewSection />

      {/* 4. NEW SECTION: Vị Trí Vàng (Ảnh 3) */}
      <GreenNestLocationSection />

      {/* 5. NEW SECTION: Lý Do Chọn - GreenNest (Ảnh 4) */}
      <GreenNestWhyChooseSection />

      {/* 3. Comprehensive Real Estate Services - Minimalist Editorial (Không box card, ảnh minh họa thực tế) */}
      <section style={{
        padding: '2rem 0',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f1f5f9'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="font-script" style={{ fontSize: '2rem', color: '#c5a880', margin: 0, lineHeight: 1 }}>
              Đặc quyền dịch vụ
            </p>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              color: 'var(--green-primary)',
              letterSpacing: '0.04em',
              marginTop: '0.35rem',
              textTransform: 'uppercase'
            }}>
              GIẢI PHÁP GIAO DỊCH TOÀN DIỆN
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0.6rem auto 0 auto',
              lineHeight: 1.65
            }}>
              Đồng hành toàn trình từ khảo sát thực địa, thẩm định giá trị đến hỗ trợ thủ tục pháp lý và tài chính trọn gói.
            </p>
          </div>

          {/* 4 Minimalist Service Items with Real Architectural Imagery */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem'
          }}>
            {/* Service 1 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                height: '190px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                backgroundColor: '#f1f5f9'
              }}>
                <img
                  src="https://hqa.com.vn/img_data/images/049154364320-sunvalue-dv-web-03.webp?auto=format&fit=crop&w=700&q=80"
                  alt="Thẩm Định & Định Giá"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Thẩm Định & Định Giá
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                Phân tích dữ liệu biến động giá đa chiều, cung cấp chứng thư định giá độc lập chuẩn xác trước khi giao dịch.
              </p>
              <div>
                <button
                  onClick={() => openServiceConsult('Thẩm Định & Định Giá Nhà Đất')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--green-primary)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <span>Đăng ký thẩm định</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                height: '190px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                backgroundColor: '#f1f5f9'
              }}>
                <img
                  src="https://namlongcorp.com/wp-content/uploads/2026/05/Tien-ich-tai-Elyse-Island-1536x742.jpg?auto=format&fit=crop&w=700&q=80"
                  alt="Tra Cứu Quy Hoạch"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Tra Cứu Quy Hoạch
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                Kiểm tra trực tiếp chỉ giới đường đỏ, quy hoạch phân khu 1/500 và lộ giới mở đường từ cơ sở dữ liệu số hóa.
              </p>
              <div>
                <button
                  onClick={() => openServiceConsult('Kiểm Tra Pháp Lý & Quy Hoạch')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--green-primary)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <span>Tra cứu thửa đất</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                height: '190px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                backgroundColor: '#f1f5f9'
              }}>
                <img
                  src="https://static1.cafeland.vn/cafelandData/upload/tintuc/tuvanhoidap/2018/05/tuan-01/kyguinhadatlagi1-1525360140.jpg?auto=format&fit=crop&w=700&q=80"
                  alt="Ký Gửi & Môi Giới VIP"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Ký Gửi & Môi Giới VIP
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                Kết nối mạng lưới nhà đầu tư chọn lọc. Đội ngũ sản xuất media và flycam 4K chuyên nghiệp giúp thanh khoản nhanh chóng.
              </p>
              <div>
                <button
                  onClick={() => openServiceConsult('Ký Gửi & Môi Giới Độc Quyền')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--green-primary)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <span>Ký gửi bất động sản</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Service 4 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                height: '190px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                backgroundColor: '#f1f5f9'
              }}>
                <img
                  src="https://nqs.1cdn.vn/2026/09/07/21F6_1788798099367_1928510671495330493_6372089274863523088_298097c71217800c939a1d199f970ad5.jpg?auto=format&fit=crop&w=700&q=80"
                  alt="Tư Vấn Gói Vay Ưu Đãi"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Tư Vấn Gói Vay Ưu Đãi
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                Đồng hành cùng ngân hàng đối tác hỗ trợ hạn mức vay tới 70% giá trị định giá, lãi suất ưu đãi và giải ngân thuận tiện.
              </p>
              <div>
                <button
                  onClick={() => openServiceConsult('Tư Vấn Gói Vay Mua Nhà Ưu Đãi')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--green-primary)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <span>Tính gói vay phù hợp</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic Planning Auto-Slide Showcase */}
      <StrategicPlanningSection onConsult={(title) => openServiceConsult(title)} />

      {/* 5. Project Showcase: Overview, Amenities & Real Progress */}
      <ProjectShowcaseSection onConsult={(title) => openServiceConsult(title)} />
      <ProjectAmenitiesSection onConsult={(title) => openServiceConsult(title)} />
      <ProjectGallerySection />



      {/* Tin tức thị trường & Sự kiện nổi bật (Ảnh mẫu 5) */}
      <HomeNewsSection />

      {/* 6.5 Impact Metrics / Real Proof Section - Redesigned Asymmetric 2-Column (Ảnh mẫu 2) */}
      <section style={{
        padding: '4rem 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            {/* Left Column: Heading & Mission Narrative (Ảnh mẫu 2) */}
            <div>
              <p className="font-script" style={{ fontSize: '1.9rem', color: '#c5a880', margin: 0, lineHeight: 1 }}>
                Thành tựu ấn tượng
              </p>
              <h2 style={{
                fontSize: '2.25rem',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.25,
                marginTop: '0.5rem',
                letterSpacing: '-0.02em'
              }}>
                Đồng hành kiến tạo <br />
                <span style={{ color: 'var(--green-primary)' }}>giá trị an cư đích thực</span>
              </h2>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
                lineHeight: 1.7,
                marginTop: '1rem',
                maxWidth: '460px'
              }}>
                Khẳng định vị thế nền tảng giao dịch bất động sản minh bạch hàng đầu Việt Nam thông qua số liệu thực tế, giải pháp pháp lý an tâm và sự tin cậy của hàng chục ngàn khách hàng.
              </p>
            </div>

            {/* Right Column: 2x2 Grid of Metrics with Icons (Ảnh mẫu 2) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2.5rem 2rem'
            }}>
              {/* Stat 1: Giao dịch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Users size={28} color="var(--green-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>
                    15,000+
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>
                    Bất động sản thanh khoản thành công
                  </div>
                </div>
              </div>

              {/* Stat 2: Hài lòng */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Award size={28} color="var(--green-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>
                    99.5%
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>
                    Khách hàng tin tưởng & hài lòng
                  </div>
                </div>
              </div>

              {/* Stat 3: Mạng lưới */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Building size={28} color="var(--green-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>
                    04
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>
                    Văn phòng đại diện toàn quốc
                  </div>
                </div>
              </div>

              {/* Stat 4: Hỗ trợ 24/7 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clock size={28} color="var(--green-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>
                    24/7
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>
                    Hỗ trợ xem nhà & công chứng miễn phí
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GreenNest Partnership & Consignment CTA */}
      <section style={{
        padding: '3.5rem 0 4rem 0',
        backgroundColor: '#f8fafc'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2.5rem',
            paddingBottom: '1rem'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <p className="font-script" style={{ fontSize: '1.9rem', color: '#c5a880', margin: 0, lineHeight: 1 }}>
                Hợp tác cùng GreenNest
              </p>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                marginTop: '0.4rem',
                marginBottom: '0.6rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.25
              }}>
                Bạn Đang Sở Hữu Bất Động Sản Cần Giao Dịch?
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: 0
              }}>
                GreenNest hỗ trợ định giá chuẩn xác, kiểm tra hồ sơ pháp lý và tiếp cận mạng lưới người mua thực tế nhanh chóng, minh bạch và bảo mật.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => openServiceConsult('Ký Gửi Nhà Đất Bán & Cho Thuê')}
                className="btn-primary"
                style={{
                  padding: '0.9rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  boxShadow: '0 8px 20px rgba(5, 150, 105, 0.25)',
                  cursor: 'pointer'
                }}
              >
                Gửi yêu cầu ký gửi ngay
              </button>
              <a
                href="tel:19006868"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.75rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--green-primary)';
                  e.currentTarget.style.color = 'var(--green-primary)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.color = 'var(--text-main)';
                }}
              >
                Hotline: 1900 6868 (Miễn phí)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal: Project Details (Opens when clicking 'Xem chi tiết') */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsult={(projectName) => openServiceConsult(`Tư vấn Dự án ${projectName}`)}
      />

      {/* Modal: Service Consultation */}
      <ServiceConsultModal
        isOpen={isConsultModalOpen}
        serviceTitle={consultServiceTitle}
        onClose={() => setIsConsultModalOpen(false)}
      />
    </div>
  );
};
