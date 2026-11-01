import React, { useState } from 'react';
import { Hero } from '../../components/Hero';
import { ListingType } from '../../types/property';
import { ProjectDetailModal, ProjectData } from '../../components/modals/ProjectDetailModal';
import { ServiceConsultModal } from '../../components/modals/ServiceConsultModal';
import { GreenNestOverviewSection } from './home/GreenNestOverviewSection';
import { GreenNestLocationSection } from './home/GreenNestLocationSection';
import { GreenNestWhyChooseSection } from './home/GreenNestWhyChooseSection';
import {
  ShieldCheck,
  Building,
  MapPin,
  ArrowRight,
  Calculator,
  Compass,
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
  onNavigateToListing: (tab: 'sale' | 'rent', city?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSearch, onNavigateToListing }) => {
  const [selectedPlanningCity, setSelectedPlanningCity] = useState<'all' | 'hcm' | 'hn' | 'dn' | 'other'>('all');
  const [activeDevIndex, setActiveDevIndex] = useState<number>(0);
  const [activeMarketIndex, setActiveMarketIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [consultServiceTitle, setConsultServiceTitle] = useState<string>('');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const openServiceConsult = (title: string) => {
    setConsultServiceTitle(title);
    setIsConsultModalOpen(true);
  };

  const planningProjects = [
    {
      id: 'qh-1',
      cityCode: 'hcm',
      title: 'Khu Đô Thị Sáng Tạo & Công Nghệ Cao TP. Thủ Đức',
      location: 'TP. Thủ Đức, TP. Hồ Chí Minh',
      scale: '21,000 ha',
      statusBadge: 'Đang triển khai hạ tầng',
      statusColor: '#059669',
      highlight: 'Hưởng lợi trực tiếp từ Tuyến Metro số 1 Bến Thành - Suối Tiên và Vành đai 3 TP.HCM chuẩn bị thông xe.',
      target: 'Quy hoạch thành trung tâm tài chính, giáo dục và công nghệ cao lớn nhất miền Nam.',
      img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 'qh-2',
      cityCode: 'hn',
      title: 'Trục Đô Thị Sinh Thái Hòa Lạc & Đại Lộ Thăng Long',
      location: 'Huyện Thạch Thất & Quốc Oai, Hà Nội',
      scale: '17,274 ha',
      statusBadge: 'Quy hoạch điều chỉnh 2026',
      statusColor: '#0284c7',
      highlight: 'Tập trung các tập đoàn công nghệ Viettel, FPT, Đại học Quốc gia Hà Nội với hàng trăm nghìn sinh viên và chuyên gia.',
      target: 'Đô thị vệ tinh kiểu mẫu kết nối trung tâm Ba Đình chỉ 25 phút qua Đại lộ Thăng Long.',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'qh-3',
      cityCode: 'other',
      title: 'Đại Đô Thị Sân Bay Quốc Tế Long Thành & Vành Đai 4',
      location: 'Huyện Long Thành, Tỉnh Đồng Nai',
      scale: '5,000 ha sân bay + 15,000 ha vùng phụ cận',
      statusBadge: 'Chuẩn bị quy hoạch phân khu',
      statusColor: '#d97706',
      highlight: 'Sân bay Quốc tế Long Thành giai đoạn 1 vận hành công suất 25 triệu khách/năm, kết nối cao tốc TP.HCM - Long Thành.',
      target: 'Hình thành trung tâm logistics hàng không quốc tế và chuỗi đô thị nghỉ dưỡng cao cấp.',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 'qh-4',
      cityCode: 'dn',
      title: 'Quy Hoạch Đô Thị Du Lịch Ven Sông Cổ Cò & Sơn Trà',
      location: 'Quận Ngũ Hành Sơn & Sơn Trà, TP. Đà Nẵng',
      scale: '28 km tuyến cảnh quan sông',
      statusBadge: 'Đã phê duyệt 1/500',
      statusColor: '#7c3aed',
      highlight: 'Nạo vét thông luồng toàn tuyến sông Cổ Cò kết nối liên hoàn tuyến du lịch đường thủy Đà Nẵng - Hội An.',
      target: 'Phát triển dải đô thị biệt thự ven sông và sân golf tiêu chuẩn quốc tế.',
      img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=700&q=80'
    }
  ];

  const filteredPlanning = selectedPlanningCity === 'all'
    ? planningProjects
    : planningProjects.filter(p => p.cityCode === selectedPlanningCity);

  const featuredDevelopments: ProjectData[] = [
    {
      name: 'Vinhomes Grand Park',
      developer: 'Vingroup',
      location: 'Nguyễn Xiển, Phường Long Thạnh Mỹ, TP. Thủ Đức',
      scale: '271 ha - 44,000 căn hộ & biệt thự',
      priceFrom: 'Từ 2.2 tỷ/căn',
      type: 'Đại đô thị thông minh',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      features: ['Công viên ánh sáng 36ha', 'Vincom Mega Mall', 'Bệnh viện Vinmec', 'Trường Vinschool'],
      status: 'Đang bàn giao & mở bán phân khu mới',
      description: 'Đại đô thị đẳng cấp quốc tế Vinhomes Grand Park tiên phong ứng dụng công nghệ IoT và AI trong quản lý vận hành. Tọa lạc tại cửa ngõ phía Đông TP.HCM, kết nối thuận tiện qua Vành đai 3 và tuyến Metro số 1.'
    },
    {
      name: 'The Global City',
      developer: 'Masterise Homes',
      location: 'Đỗ Xuân Hợp, Phường An Phú, Quận 2, TP. Thủ Đức',
      scale: '117.4 ha - Chuẩn thiết kế Foster + Partners',
      priceFrom: 'Từ 38 tỷ/shophouse',
      type: 'Khu đô thị phức hợp quốc tế',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      features: ['Kênh đào nhạc nước lớn nhất ĐNA', 'TTTM 125,000m²', 'Sân Golf 18 lỗ'],
      status: 'Sắp bàn giao phân khu thấp tầng',
      description: 'Khu đô thị phức hợp mang tính biểu tượng được thiết kế bởi Foster + Partners (Anh Quốc). Nơi hội tụ các phân khu nhà phố thương mại SOHO sôi động và biệt thự ven kênh đào đẳng cấp quốc tế.'
    },
    {
      name: 'Vinhomes Riverside',
      developer: 'Vingroup',
      location: 'Phường Việt Hưng & Phúc Lợi, Quận Long Biên, Hà Nội',
      scale: '183.5 ha - Quần thể biệt thự sinh thái cao cấp',
      priceFrom: 'Từ 30 tỷ/biệt thự',
      type: 'Biệt thự sinh thái ven sông',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      features: ['12.4ha hồ điều hòa', '18.6km kênh đào', 'TT ẩm thực Almaz', 'Sân tập golf'],
      status: 'Đã hoàn thiện đồng bộ - Đẳng cấp bậc nhất',
      description: 'Thành phố Venice thu nhỏ giữa lòng Hà Nội với không gian xanh ngút ngàn và mặt nước thanh bình. Khu compound khép kín với an ninh bảo vệ tuần tra 3 lớp, cộng đồng cư dân tinh hoa bậc nhất Thủ đô.'
    }
  ];

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

  const strategicMarkets = [
    {
      id: 'hcm',
      name: 'TP. Hồ Chí Minh',
      city: 'Hồ Chí Minh',
      tag: 'Tâm điểm sôi động',
      desc: 'Thủ phủ kinh tế với nguồn cung căn hộ cao cấp, shophouse và nhà phố đa dạng',
      count: '3,840+ tin đăng',
      priceAvg: '45 - 120 tr/m²',
      growth: '+12.5% năm 2026',
      hotDistricts: [
        { name: 'TP. Thủ Đức', count: '1,420 tin' },
        { name: 'Quận 1', count: '540 tin' },
        { name: 'Quận 7', count: '760 tin' },
        { name: 'Bình Thạnh', count: '610 tin' }
      ],
      img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'hn',
      name: 'TP. Hà Nội',
      city: 'Hà Nội',
      tag: 'Văn hóa & Đô thị vệ tinh',
      desc: 'Thủ đô ngàn năm văn hiến với sự bứt phá của chuỗi đô thị phía Tây và phía Đông',
      count: '2,920+ tin đăng',
      priceAvg: '40 - 110 tr/m²',
      growth: '+10.8% năm 2026',
      hotDistricts: [
        { name: 'Cầu Giấy', count: '890 tin' },
        { name: 'Nam Từ Liêm', count: '750 tin' },
        { name: 'Long Biên', count: '680 tin' },
        { name: 'Tây Hồ', count: '420 tin' }
      ],
      img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'dn',
      name: 'TP. Đà Nẵng',
      city: 'Đà Nẵng',
      tag: 'Đô thị đáng sống',
      desc: 'Thiên đường du lịch biển miền Trung với tiềm năng khai thác nghỉ dưỡng vượt trội',
      count: '1,450+ tin đăng',
      priceAvg: '30 - 85 tr/m²',
      growth: '+14.2% năm 2026',
      hotDistricts: [
        { name: 'Sơn Trà', count: '510 tin' },
        { name: 'Ngũ Hành Sơn', count: '440 tin' },
        { name: 'Hải Châu', count: '320 tin' },
        { name: 'Cẩm Lệ', count: '180 tin' }
      ],
      img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ct',
      name: 'TP. Cần Thơ',
      city: 'Cần Thơ',
      tag: 'Cửa ngõ miền Tây',
      desc: 'Đầu tàu kinh tế Đồng bằng Sông Cửu Long với quỹ đất thổ cư tiềm năng lớn',
      count: '820+ tin đăng',
      priceAvg: '20 - 55 tr/m²',
      growth: '+9.4% năm 2026',
      hotDistricts: [
        { name: 'Ninh Kiều', count: '380 tin' },
        { name: 'Cái Răng', count: '240 tin' },
        { name: 'Bình Thủy', count: '200 tin' }
      ],
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
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
        borderBottom: '1px solid #f1f5f9',
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

      {/* 3. Comprehensive Real Estate Services - Architectural Suite */}
      <section style={{
        padding: '5rem 0 4.5rem 0',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="font-script" style={{ fontSize: '2.2rem', color: '#c5a880', margin: 0, lineHeight: 1.1 }}>
              Đặc quyền dịch vụ
            </p>
            <h2 style={{
              fontSize: '2.3rem',
              fontWeight: 900,
              color: 'var(--green-primary)',
              letterSpacing: '0.06em',
              marginTop: '0.25rem'
            }}>
              GIẢI PHÁP GIAO DỊCH TOÀN DIỆN
            </h2>
            <p style={{
              fontSize: '0.925rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: '0.6rem auto 0 auto',
              lineHeight: 1.6
            }}>
              Đồng hành toàn trình từ khảo sát thực địa, giải pháp tài chính đến hỗ trợ thủ tục sang tên và bàn giao nhà trọn gói.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Service 1: Thẩm Định */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--green-primary)';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(5, 150, 105, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#ecfdf5',
                  color: 'var(--green-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Calculator size={22} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 300, color: '#cbd5e1' }}>
                  01
                </span>
              </div>

              <div style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--green-primary)',
                backgroundColor: '#ecfdf5',
                padding: '3px 10px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                marginBottom: '0.75rem'
              }}>
                15 PHÚT • AI ĐỊNH GIÁ
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                Thẩm Định & Định Giá
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Thuật toán phân tích dữ liệu biến động giá 10 năm tại từng tuyến đường, cung cấp báo cáo định giá độc lập trước khi giao dịch.
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.8rem', color: '#64748b' }}>
                <div>— Lịch sử dữ liệu 10 năm tại 63 tỉnh</div>
                <div>— Chứng thư định giá chuẩn mực</div>
              </div>

              <button
                onClick={() => openServiceConsult('Thẩm Định & Định Giá Nhà Đất')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--green-primary)',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #dcfce7',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--green-primary)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0fdf4';
                  e.currentTarget.style.color = 'var(--green-primary)';
                }}
              >
                <span>Đăng ký định giá</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Service 2: Quy Hoạch */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(2, 132, 199, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Compass size={22} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 300, color: '#cbd5e1' }}>
                  02
                </span>
              </div>

              <div style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#0284c7',
                backgroundColor: '#e0f2fe',
                padding: '3px 10px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                marginBottom: '0.75rem'
              }}>
                ĐỐI CHIẾU SỞ TN&MT
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                Tra Cứu Quy Hoạch
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Tra cứu trực tiếp cơ sở dữ liệu quy hoạch đô thị. Kiểm tra ranh giới thửa đất, chỉ giới đường đỏ, quy hoạch 1/500 và lộ giới mở đường.
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.8rem', color: '#64748b' }}>
                <div>— Kiểm tra chỉ giới đường đỏ & lộ giới</div>
                <div>— Bản đồ phân khu số hóa mới nhất</div>
              </div>

              <button
                onClick={() => openServiceConsult('Kiểm Tra Pháp Lý & Quy Hoạch')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#0284c7',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0284c7';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f9ff';
                  e.currentTarget.style.color = '#0284c7';
                }}
              >
                <span>Kiểm tra thửa đất</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Service 3: Ký Gửi */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#d97706';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(217, 119, 6, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Building size={22} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 300, color: '#cbd5e1' }}>
                  03
                </span>
              </div>

              <div style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#d97706',
                backgroundColor: '#fef3c7',
                padding: '3px 10px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                marginBottom: '0.75rem'
              }}>
                250,000+ NHÀ ĐẦU TƯ
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                Ký Gửi & Môi Giới VIP
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Tiếp cận mạng lưới hơn 250,000+ nhà đầu tư sẵn có. Đội ngũ quay chụp 4K, flycam thực tế giúp thanh khoản tài sản nhanh chóng trong 30 ngày.
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.8rem', color: '#64748b' }}>
                <div>— Miễn phí sản xuất media & video 4K</div>
                <div>— Hỗ trợ đàm phán chốt giao dịch nhanh</div>
              </div>

              <button
                onClick={() => openServiceConsult('Ký Gửi & Môi Giới Độc Quyền')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#d97706',
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#d97706';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#fffbeb';
                  e.currentTarget.style.color = '#d97706';
                }}
              >
                <span>Ký gửi bán / cho thuê</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Service 4: Gói Vay */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#7c3aed';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(124, 58, 237, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#f3e8ff',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldCheck size={22} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 300, color: '#cbd5e1' }}>
                  04
                </span>
              </div>

              <div style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#7c3aed',
                backgroundColor: '#f3e8ff',
                padding: '3px 10px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                marginBottom: '0.75rem'
              }}>
                LÃI SUẤT TỪ 6.5%
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                Tư Vấn Gói Vay Ưu Đãi
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Liên kết chặt chẽ cùng Vietcombank, BIDV, Techcombank, VPBank. Duyệt hồ sơ vay đến 70% giá trị định giá, ân hạn nợ gốc và giải ngân trong 48h.
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.8rem', color: '#64748b' }}>
                <div>— Hạn mức vay lên đến 70% giá trị BĐS</div>
                <div>— Duyệt hồ sơ nhanh chóng trong 48 giờ</div>
              </div>

              <button
                onClick={() => openServiceConsult('Tư Vấn Gói Vay Mua Nhà Ưu Đãi')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#7c3aed',
                  backgroundColor: '#faf5ff',
                  border: '1px solid #e9d5ff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#7c3aed';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#faf5ff';
                  e.currentTarget.style.color = '#7c3aed';
                }}
              >
                <span>Tính gói vay phù hợp</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Urban Planning Intelligence */}
      <section style={{ padding: '2.5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <p className="font-script" style={{ fontSize: '2rem', color: '#c5a880', margin: 0, lineHeight: 1.1 }}>
                Hạ tầng chiến lược
              </p>
              <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--green-primary)', letterSpacing: '0.06em', marginTop: '0.2rem' }}>
                KHU VỰC QUY HOẠCH TRỌNG ĐIỂM
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Nắm bắt thông tin quy hoạch hạ tầng giao thông và đô thị mới nhất năm 2026 để đón đầu làn sóng tăng giá.
              </p>
            </div>

            {/* City Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'Tất cả khu vực' },
                { id: 'hcm', label: 'TP. Hồ Chí Minh' },
                { id: 'hn', label: 'TP. Hà Nội' },
                { id: 'dn', label: 'TP. Đà Nẵng' },
                { id: 'other', label: 'Đồng Nai & Miền Tây' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPlanningCity(tab.id as any)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    border: selectedPlanningCity === tab.id ? '1px solid var(--green-primary)' : '1px solid var(--border)',
                    backgroundColor: selectedPlanningCity === tab.id ? 'var(--green-primary)' : '#ffffff',
                    color: selectedPlanningCity === tab.id ? '#ffffff' : 'var(--text-main)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Planning Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {filteredPlanning.map(item => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {item.scale}
                  </div>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    color: item.statusColor,
                    backgroundColor: `${item.statusColor}15`,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    marginBottom: '0.5rem'
                  }}>
                    {item.statusBadge}
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                    {item.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    <MapPin size={14} color="var(--green-primary)" />
                    <span>{item.location}</span>
                  </div>

                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                    {item.highlight}
                  </p>

                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-light)',
                    fontSize: '0.775rem',
                    color: 'var(--text-muted)'
                  }}>
                    <strong>Định hướng:</strong> {item.target}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Consultation Callout */}
          <div style={{
            marginTop: '1.75rem',
            padding: '1.25rem 1.5rem',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--green-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--green-primary)'
              }}>
                <Compass size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  Cần tra cứu quy hoạch chi tiết từng thửa đất cụ thể?
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Gửi số tờ, số thửa hoặc tọa độ GPS để chuyên viên pháp lý của batdongsan.vn kiểm tra miễn phí trong 15 phút.
                </div>
              </div>
            </div>

            <button
              onClick={() => openServiceConsult('Tra Cứu Quy Hoạch Thửa Đất')}
              className="btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              Tra cứu quy hoạch ngay
            </button>
          </div>
        </div>
      </section>

      {/* 5. Featured Master-Planned Developments - Interactive Cinematic Showcase (NO 3-box layout) */}
      <section style={{ padding: '5rem 0 4.5rem 0', backgroundColor: '#fdfbf7' }}>
        <div className="container">
          {/* Synchronized Calligraphy Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="font-script" style={{ fontSize: '2.2rem', color: '#c5a880', margin: 0, lineHeight: 1.1 }}>
              Tuyển chọn kiệt tác
            </p>
            <h2 style={{
              fontSize: '2.3rem',
              fontWeight: 900,
              color: 'var(--green-primary)',
              letterSpacing: '0.06em',
              marginTop: '0.25rem'
            }}>
              DỰ ÁN ĐẠI ĐÔ THỊ TIÊU BIỂU
            </h2>
            <p style={{
              fontSize: '0.925rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: '0.6rem auto 0 auto',
              lineHeight: 1.6
            }}>
              Những quần thể đại đô thị sinh thái kiểu mẫu với quy hoạch đồng bộ, chuẩn mực sống thượng lưu và pháp lý hoàn chỉnh.
            </p>

            {/* Interactive Project Switcher Navigation */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              padding: '6px',
              borderRadius: '9999px',
              border: '1px solid #e2e8f0',
              marginTop: '1.75rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              flexWrap: 'wrap',
              gap: '4px'
            }}>
              {featuredDevelopments.map((dev, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDevIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: 'none',
                    backgroundColor: activeDevIndex === idx ? 'var(--green-primary)' : 'transparent',
                    color: activeDevIndex === idx ? '#ffffff' : 'var(--text-main)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)'
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    opacity: activeDevIndex === idx ? 0.9 : 0.5
                  }}>
                    0{idx + 1}
                  </span>
                  <span>{dev.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Development Cinematic Stage - Unboxed Airy Layout */}
          {(() => {
            const activeDev = featuredDevelopments[activeDevIndex] || featuredDevelopments[0];
            return (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '3rem',
                alignItems: 'center',
                marginTop: '2.5rem'
              }}>
                {/* Left: Pure Architectural Imagery (No Rounded Corners, No Obstructing Overlay) */}
                <div style={{
                  position: 'relative',
                  height: '460px',
                  overflow: 'hidden',
                  borderRadius: 0,
                  backgroundColor: '#0f172a',
                  boxShadow: '0 12px 35px -10px rgba(0, 0, 0, 0.12)'
                }}>
                  <img
                    key={activeDev.name}
                    src={activeDev.img}
                    alt={activeDev.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Right: Architectural Dossier (Zero Nested Boxes) */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        color: 'var(--green-primary)',
                        letterSpacing: '0.08em'
                      }}>
                        KIỆT TÁC 0{activeDevIndex + 1} / 03
                      </span>
                      <span style={{ color: '#cbd5e1' }}>•</span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        CHỦ ĐẦU TƯ: {activeDev.developer}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--green-primary)',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: 'rgba(5, 150, 105, 0.08)',
                      padding: '3px 10px',
                      borderRadius: 0
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--green-primary)' }} />
                      <span>{activeDev.status}</span>
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '2.3rem',
                    fontWeight: 900,
                    color: 'var(--text-main)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: '0.5rem'
                  }}>
                    {activeDev.name}
                  </h3>

                  {/* Clean Location & Property Type Metadata */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--text-main)' }}>
                      <MapPin size={15} color="var(--green-primary)" />
                      <span>{activeDev.location}</span>
                    </div>
                    <span style={{ color: '#cbd5e1' }}>|</span>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 700 }}>
                      {activeDev.type}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem'
                  }}>
                    {activeDev.description}
                  </p>

                  {/* Clean Inline Specs Row (NO Grey Box, NO Nested Border) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    padding: '1.25rem 0',
                    borderTop: '1px solid #f1f5f9',
                    borderBottom: '1px solid #f1f5f9',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                        Quy mô tổng thể
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                        {activeDev.scale.split('-')[0].trim()}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                        Cơ cấu sản phẩm
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                        {activeDev.scale.split('-')[1]?.trim() || 'Căn hộ & Biệt thự'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                        Phân khúc giá
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--green-primary)', marginTop: '4px' }}>
                        {activeDev.priceFrom}
                      </div>
                    </div>
                  </div>

                  {/* Clean Amenities Checklist (NO Pill Boxes) */}
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                      Đặc quyền tiện ích tiêu biểu
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.65rem 1.5rem'
                    }}>
                      {activeDev.features.map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 500 }}>
                          <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(5, 150, 105, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--green-primary)',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            flexShrink: 0
                          }}>
                            ✓
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div>
                    <button
                      onClick={() => setSelectedProject(activeDev)}
                      className="btn-primary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.85rem 1.85rem',
                        fontSize: '0.925rem',
                        fontWeight: 700,
                        borderRadius: '9999px',
                        boxShadow: '0 8px 20px rgba(5, 150, 105, 0.25)',
                        cursor: 'pointer'
                      }}
                    >
                      <span>Khám phá hồ sơ dự án</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 6. Strategic Regions - Interactive Selectable Cards & Drawer (Ảnh mẫu 5) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <p className="font-script" style={{ fontSize: '1.9rem', color: '#c5a880', margin: 0, lineHeight: 1.1 }}>
              Thị trường sôi động
            </p>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--green-primary)', letterSpacing: '0.04em', marginTop: '0.2rem' }}>
              KHÁM PHÁ NHÀ ĐẤT TRỌNG ĐIỂM
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Chọn từng thành phố trọng điểm để khám phá biến động giá, phân tích nguồn cung và danh sách quận sôi động nhất
            </p>
          </div>

          {/* 4 Selectable City Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            {strategicMarkets.map((market, idx) => {
              const isSelected = activeMarketIndex === idx;
              return (
                <div
                  key={market.id}
                  onClick={() => setActiveMarketIndex(idx)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: isSelected ? '2px solid var(--green-primary)' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
                    transform: isSelected ? 'translateY(-4px)' : 'none',
                    boxShadow: isSelected
                      ? '0 16px 32px -8px rgba(5, 150, 105, 0.22)'
                      : '0 2px 8px rgba(0,0,0,0.04)',
                    position: 'relative'
                  }}
                >
                  <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                    <img
                      src={market.img}
                      alt={market.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        transform: isSelected ? 'scale(1.05)' : 'none'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      backdropFilter: 'blur(6px)',
                      color: '#ffffff',
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '9999px'
                    }}>
                      {market.count}
                    </div>
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: 'var(--green-primary)',
                        color: '#ffffff',
                        fontSize: '0.725rem',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}>
                        Đang chọn
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '1rem 1.15rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                        {market.name}
                      </h4>
                      {isSelected && (
                        <span style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--green-primary)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 800
                        }}>
                          ✓
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', margin: '4px 0 8px 0', lineHeight: 1.4 }}>
                      {market.tag}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '8px',
                      marginTop: '4px'
                    }}>
                      <span style={{ fontSize: '0.725rem', color: '#64748b' }}>Giá trung bình:</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--green-primary)' }}>
                        {market.priceAvg}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Market Insight Drawer for the Active City */}
          {(() => {
            const currentMarket = strategicMarkets[activeMarketIndex] || strategicMarkets[0];
            return (
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                padding: '1.75rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span style={{
                      backgroundColor: 'rgba(5, 150, 105, 0.1)',
                      color: 'var(--green-primary)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '6px'
                    }}>
                      {currentMarket.growth}
                    </span>
                    <span style={{ fontSize: '0.825rem', color: '#64748b' }}>
                      Định giá tham chiếu: <strong style={{ color: 'var(--text-main)' }}>{currentMarket.priceAvg}</strong>
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    {currentMarket.name} — {currentMarket.tag}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {currentMarket.desc}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '0.775rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
                    Khu vực giao dịch nhiều nhất (Bấm để xem tin):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {currentMarket.hotDistricts.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => onNavigateToListing('sale', currentMarket.city)}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: 'var(--text-main)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.15s ease'
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
                        <span>{d.name}</span>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>
                          ({d.count})
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigateToListing('sale', currentMarket.city)}
                    className="btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 1.25rem',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      borderRadius: '8px'
                    }}
                  >
                    <span>Xem tất cả {currentMarket.count} tại {currentMarket.name}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 6.5 Impact Metrics / Real Proof Section - Redesigned Asymmetric 2-Column (Ảnh mẫu 2) */}
      <section style={{
        padding: '4rem 0',
        backgroundColor: '#f8fafc',
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
        backgroundColor: '#ffffff'
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
