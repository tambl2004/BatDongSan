import React, { useState } from 'react';
import { Hero } from '../../components/Hero';
import { ListingType } from '../../types/property';
import { ProjectDetailModal, ProjectData } from '../../components/modals/ProjectDetailModal';
import { ServiceConsultModal } from '../../components/modals/ServiceConsultModal';
import {
  ShieldCheck,
  Building,
  FileSearch,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Calculator,
  Compass
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
      img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80'
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

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Hero with Video Banner and Fast Search */}
      <Hero onSearch={onSearch} />

      {/* 2. Key Industry Numbers Bar */}
      <section style={{ backgroundColor: '#f8fafc', padding: '1.25rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--green-primary)' }}>15,000+</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Bất động sản đã giao dịch thành công
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--green-primary)' }}>99.8%</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Hồ sơ pháp lý được thẩm định sạch
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--green-primary)' }}>4</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Văn phòng đại diện toàn quốc
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--green-primary)' }}>24/7</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Hỗ trợ xem nhà & công chứng miễn phí
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Real Estate Services - Redesigned to look WOW & Symmetrical */}
      <section style={{ padding: '3rem 0 2.5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--green-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              backgroundColor: 'var(--green-light)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--green-border)'
            }}>
              DỊCH VỤ BẤT ĐỘNG SẢN TOÀN DIỆN
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.6rem', letterSpacing: '-0.02em' }}>
              Giải Pháp Giao Dịch Nhà Đất An Toàn & Chuẩn Xác
            </h2>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0.4rem auto 0 auto', lineHeight: 1.6 }}>
              batdongsan.vn đồng hành cùng quý khách từ khâu kiểm tra quy hoạch, thẩm định giá trị đến hỗ trợ công chứng sang tên và giải ngân ngân hàng.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Service 1: Thẩm Định & Định Giá */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--green-primary)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--green-light)',
                  border: '1px solid var(--green-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--green-primary)'
                }}>
                  <FileSearch size={26} />
                </div>
                <span style={{
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  color: 'var(--green-dark)',
                  backgroundColor: 'var(--green-light)',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  THỜI GIAN: 15 PHÚT
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Thẩm Định & Định Giá Nhà Đất
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Ứng dụng thuật toán AI phân tích dữ liệu biến động giá thị trường 10 năm tại từng tuyến đường, cung cấp chứng thư định giá độc lập trước khi giao dịch.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="var(--green-primary)" />
                  <span>Dữ liệu lịch sử 10 năm tại 63 tỉnh thành</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="var(--green-primary)" />
                  <span>Chứng thư định giá có chữ ký chuyên gia</span>
                </div>
              </div>

              <button
                onClick={() => openServiceConsult('Thẩm Định & Định Giá Nhà Đất')}
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 1rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--green-primary)',
                  border: '1px solid var(--border)'
                }}
              >
                <span>Đăng ký định giá nhà đất</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Service 2: Kiểm Tra Pháp Lý & Quy Hoạch */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7'
                }}>
                  <ShieldCheck size={26} />
                </div>
                <span style={{
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  color: '#0284c7',
                  backgroundColor: '#eff6ff',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  SỞ TN&MT ĐỐI CHIẾU
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Kiểm Tra Pháp Lý & Quy Hoạch
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Tra cứu trực tiếp cơ sở dữ liệu Sở Tài Nguyên & Môi Trường. Kiểm tra ranh giới thửa đất, chỉ giới đường đỏ, quy hoạch 1/500 và nguy cơ tranh chấp thế chấp.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#0284c7" />
                  <span>Kiểm tra chỉ giới đường đỏ & mở đường</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#0284c7" />
                  <span>Xác thực sổ đỏ thật / giả & nợ ngân hàng</span>
                </div>
              </div>

              <button
                onClick={() => openServiceConsult('Kiểm Tra Pháp Lý & Quy Hoạch')}
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 1rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#0284c7',
                  border: '1px solid var(--border)'
                }}
              >
                <span>Kiểm tra quy hoạch thửa đất</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Service 3: Ký Gửi & Môi Giới Độc Quyền */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#d97706';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fde68a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d97706'
                }}>
                  <Building size={26} />
                </div>
                <span style={{
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  color: '#d97706',
                  backgroundColor: '#fef3c7',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  250,000+ NHÀ ĐẦU TƯ
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Ký Gửi & Môi Giới Độc Quyền
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Tiếp cận mạng lưới hơn 250,000+ nhà đầu tư sẵn có. Đội ngũ chuyên viên hỗ trợ quay chụp 4K, flycam thực tế giúp thanh khoản tài sản nhanh chóng trong 30 ngày.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#d97706" />
                  <span>Miễn phí quay video 4K & hình ảnh flycam</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#d97706" />
                  <span>Hỗ trợ đàm phán chốt giao dịch nhanh</span>
                </div>
              </div>

              <button
                onClick={() => openServiceConsult('Ký Gửi & Môi Giới Độc Quyền')}
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 1rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#d97706',
                  border: '1px solid var(--border)'
                }}
              >
                <span>Ký gửi bán / cho thuê</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Service 4: Tư Vấn Gói Vay Mua Nhà Ưu Đãi */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#7c3aed';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: '#f3e8ff',
                  border: '1px solid #ddd6fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7c3aed'
                }}>
                  <Calculator size={26} />
                </div>
                <span style={{
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  color: '#7c3aed',
                  backgroundColor: '#f3e8ff',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  LÃI SUẤT TỪ 6.5%
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Tư Vấn Gói Vay Mua Nhà Ưu Đãi
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Liên kết chặt chẽ cùng Vietcombank, BIDV, Techcombank, VPBank. Hỗ trợ duyệt hồ sơ vay đến 70% giá trị định giá, ân hạn nợ gốc và giải ngân chỉ trong 48 giờ.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#7c3aed" />
                  <span>Hạn mức vay lên đến 70% giá trị BĐS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#7c3aed" />
                  <span>Duyệt hồ sơ nhanh chóng trong 48h</span>
                </div>
              </div>

              <button
                onClick={() => openServiceConsult('Tư Vấn Gói Vay Mua Nhà Ưu Đãi')}
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 1rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#7c3aed',
                  border: '1px solid var(--border)'
                }}
              >
                <span>Tính gói vay phù hợp</span>
                <ArrowRight size={15} />
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
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#0284c7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                backgroundColor: '#e0f2fe',
                padding: '3px 10px',
                borderRadius: 'var(--radius-sm)'
              }}>
                Bản đồ & Hạ tầng trọng điểm
              </span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.4rem' }}>
                Khu Vực Đang & Chuẩn Bị Quy Hoạch
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
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

      {/* 5. Featured Master-Planned Developments (Item 2: Changed to 'Xem chi tiết') */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--green-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backgroundColor: 'var(--green-light)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-sm)'
            }}>
              ĐẠI ĐÔ THỊ TIÊU BIỂU
            </span>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.4rem' }}>
              Dự Án Bất Động Sản Nổi Bật 2026
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Tuyển chọn các dự án được đầu tư bài bản, pháp lý hoàn chỉnh và tiện ích đồng bộ.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredDevelopments.map((dev, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={dev.img}
                    alt={dev.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'var(--green-primary)',
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {dev.type}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    {dev.priceFrom}
                  </div>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--green-primary)', fontWeight: 700, marginBottom: '0.2rem' }}>
                    Chủ đầu tư: {dev.developer}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    {dev.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.825rem', marginBottom: '0.85rem' }}>
                    <MapPin size={14} color="var(--text-muted)" />
                    <span>{dev.location}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1rem'
                  }}>
                    {dev.features.map((f, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          backgroundColor: 'var(--bg-subtle)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)'
                        }}
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action: Explicitly changed from 'Xem giỏ hàng' to 'Xem chi tiết' per user feedback! */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Quy mô: <strong>{dev.scale.split('-')[0]}</strong>
                    </span>
                    <button
                      onClick={() => setSelectedProject(dev)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--green-primary)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--green-light)'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Strategic Regions */}
      <section style={{ padding: '2rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Khám Phá Nhà Đất Theo Khu Vực Trọng Điểm
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Bấm vào từng khu vực để xem ngay quỹ căn hộ, nhà phố và biệt thự đang giao dịch
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {[
              {
                name: 'TP. Hồ Chí Minh',
                desc: 'Thủ Đức, Quận 1, Quận 7, Bình Thạnh',
                count: '3,840+ tin đăng',
                img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
                city: 'Hồ Chí Minh'
              },
              {
                name: 'TP. Hà Nội',
                desc: 'Cầu Giấy, Nam Từ Liêm, Long Biên, Tây Hồ',
                count: '2,920+ tin đăng',
                img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
                city: 'Hà Nội'
              },
              {
                name: 'TP. Đà Nẵng',
                desc: 'Sơn Trà, Ngũ Hành Sơn, Hải Châu, Cẩm Lệ',
                count: '1,450+ tin đăng',
                img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
                city: 'Đà Nẵng'
              },
              {
                name: 'TP. Cần Thơ',
                desc: 'Ninh Kiều, Cái Răng, Bình Thủy',
                count: '820+ tin đăng',
                img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
                city: 'Cần Thơ'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateToListing('sale', item.city)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--green-primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ height: '140px', overflow: 'hidden' }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {item.desc}
                  </div>
                  <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--green-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span>{item.count}</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. About Company */}
      <section style={{ padding: '2.5rem 0 2rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--green-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                backgroundColor: 'var(--green-light)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-sm)'
              }}>
                Về chúng tôi
              </span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.4rem', lineHeight: 1.3 }}>
                batdongsan.vn - Đơn Vị Tiên Phong Chuẩn Hóa Pháp Lý Bất Động Sản
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.75rem' }}>
                Thành lập với sứ mệnh minh bạch hóa thị trường nhà đất tại Việt Nam, batdongsan.vn giải quyết triệt để vấn đề "tin ảo, giá chênh, pháp lý mập mờ" vốn gây nhiều rủi ro cho người mua.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Quy trình thẩm định 5 bước:</strong> 100% tài sản được kiểm tra số đo thực tế, đối chiếu bản gốc sổ hồng tại văn phòng đăng ký đất đai.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Không chênh lệch giá:</strong> Mọi thông tin giá bán đều được chủ sở hữu ký cam kết niêm yết trực tiếp.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Đội ngũ chứng chỉ chuyên môn:</strong> 100% chuyên viên môi giới sở hữu chứng chỉ hành nghề được Bộ Xây Dựng cấp phép.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact & Office Card */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Hợp Tác & Ký Gửi Nhà Đất
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Quý khách đang sở hữu nhà, đất, căn hộ cần bán hoặc cho thuê? Hãy để đội ngũ chuyên viên của chúng tôi hỗ trợ tiếp cận người mua thật nhanh nhất.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => openServiceConsult('Ký Gửi Nhà Đất Bán & Cho Thuê')}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  Gửi yêu cầu ký gửi nhà đất
                </button>
                <a
                  href="tel:19006868"
                  className="btn-secondary"
                  style={{ width: '100%', padding: '0.75rem', justifyContent: 'center' }}
                >
                  Hotline tư vấn: 1900 6868 (Miễn phí)
                </a>
              </div>
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
