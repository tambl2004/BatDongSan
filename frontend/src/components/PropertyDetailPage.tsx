import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Compass,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Bed,
  Bath,
  Maximize2,
  Share2,
  Heart,
  Calculator,
  Layers,
  Sparkles,
  Car,
  X,
  Building,
  Info
} from 'lucide-react';
import { Property } from '../types/property';
import { submitInquiry } from '../services/api';
import { PropertyCard } from './PropertyCard';

interface PropertyDetailPageProps {
  property: Property;
  allProperties: Property[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  allProperties,
  isFavorite,
  onToggleFavorite,
  onBack,
  onSelectProperty
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Tôi muốn hẹn lịch xem trực tiếp bất động sản này và kiểm tra quy hoạch.');
  const [inquiryType, setInquiryType] = useState('viewing');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Mortgage Calculator states
  const [loanRatio, setLoanRatio] = useState<number>(70); // 70%
  const [loanYears, setLoanYears] = useState<number>(20); // 20 years
  const [interestRate, setInterestRate] = useState<number>(7.5); // 7.5% per year

  // Calculate Mortgage
  const totalPrice = property.price;
  const loanAmount = (totalPrice * loanRatio) / 100;
  const downPayment = totalPrice - loanAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanYears * 12;
  const monthlyPrincipal = totalMonths > 0 ? loanAmount / totalMonths : 0;
  const firstMonthInterest = loanAmount * monthlyRate;
  const estimatedMonthlyPayment = monthlyPrincipal + firstMonthInterest;

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) {
      return `${(val / 1000000000).toFixed(2)} tỷ`;
    }
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(0)} triệu`;
    }
    return `${val.toLocaleString('vi-VN')} đ`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Vui lòng nhập họ tên và số điện thoại');
      return;
    }

    setSubmitting(true);
    const res = await submitInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      fullName,
      phone,
      email,
      message,
      inquiryType
    });
    setSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
    } else {
      alert(res.message);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} - ${property.priceFormatted}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép liên kết bất động sản vào bộ nhớ tạm!');
    }
  };

  // Related properties (same city or propertyType, exclude current)
  const relatedProperties = allProperties
    .filter(p => p.id !== property.id && (p.city === property.city || p.propertyType === property.propertyType))
    .slice(0, 3);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '1.25rem 0 2.5rem 0' }}>
      <div className="container">
        {/* Navigation Breadcrumb Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--green-primary)',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={16} />
              <span>Quay lại danh sách</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>{property.city}</span>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{property.district}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleShare}
              className="btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
              title="Chia sẻ tin"
            >
              <Share2 size={15} />
              <span>Chia sẻ</span>
            </button>

            <button
              onClick={() => onToggleFavorite(property.id)}
              className="btn-secondary"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.825rem',
                color: isFavorite ? '#ef4444' : 'inherit'
              }}
            >
              <Heart size={15} fill={isFavorite ? '#ef4444' : 'none'} />
              <span>{isFavorite ? 'Đã lưu' : 'Lưu tin'}</span>
            </button>
          </div>
        </div>

        {/* Title & Location Header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
            <span style={{
              backgroundColor: property.listingType === 'sale' ? 'var(--green-light)' : '#e0f2fe',
              color: property.listingType === 'sale' ? 'var(--green-primary)' : '#0284c7',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              {property.listingType === 'sale' ? 'Nhà đất bán' : 'Nhà đất cho thuê'}
            </span>
            {property.featured && (
              <span style={{
                backgroundColor: '#fef3c7',
                color: '#d97706',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                Tin nổi bật
              </span>
            )}
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Mã tin: <strong>{property.id}</strong>
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>•</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Cập nhật: Hôm nay
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: 1.25,
            marginBottom: '0.4rem'
          }}>
            {property.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <MapPin size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />
            <span>{property.address}, {property.ward ? `${property.ward}, ` : ''}{property.district}, {property.city}</span>
          </div>
        </div>

        {/* 3.1. Luxury Bento Photo Gallery (5 Unique Angles) */}
        <div style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: property.images.length > 1 ? '1.5fr 1fr' : '1fr',
          gap: '0.65rem',
          height: '450px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '1rem',
          backgroundColor: '#0f172a'
        }}>
          {/* Main Large Image (Left) */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            style={{
              height: '100%',
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
          >
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <Sparkles size={13} color="#10b981" />
              <span>Ảnh thực tế 100%</span>
            </div>
          </div>

          {/* 4 Supporting Angle Images (Right 2x2 Grid) */}
          {property.images.length > 1 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '0.65rem',
              height: '100%'
            }}>
              {property.images.slice(1, 5).map((img, idx) => {
                const actualIndex = idx + 1;
                const isLast = idx === 3;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(actualIndex)}
                    style={{
                      position: 'relative',
                      height: '100%',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: activeImageIndex === actualIndex ? '2px solid var(--green-primary)' : 'none'
                    }}
                  >
                    <img
                      src={img}
                      alt={`Góc chụp ${actualIndex + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />

                    {/* Button on the 4th thumbnail to view all */}
                    {isLast && property.images.length >= 5 && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(15, 23, 42, 0.65)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          cursor: 'pointer',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        <Layers size={22} style={{ marginBottom: '4px' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                          Xem tất cả {property.images.length} ảnh
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Thumbnail Selector Bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.75rem'
        }}>
          {property.images.map((img, idx) => {
            const labels = ['Toàn cảnh', 'Phòng khách', 'Bếp ăn', 'Phòng ngủ', 'Phòng tắm', 'Tiện ích / View'];
            return (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: activeImageIndex === idx ? '1px solid var(--green-primary)' : '1px solid var(--border)',
                  backgroundColor: activeImageIndex === idx ? 'var(--green-light)' : '#ffffff',
                  color: activeImageIndex === idx ? 'var(--green-dark)' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap'
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{ width: '22px', height: '22px', borderRadius: '3px', objectFit: 'cover' }}
                />
                <span>{labels[idx] || `Ảnh ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Main Layout: Comprehensive Specs (Left) & Sticky Contact / Booking (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* LEFT COLUMN: Exhaustive Real Estate Details */}
          <div>
            {/* Price, Unit Price & Primary Stats Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  MỨC GIÁ CHÍNH CHỦ NIÊM YẾT
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--green-primary)' }}>
                    {property.priceFormatted}
                  </span>
                  {property.pricePerM2 && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      (~{property.pricePerM2})
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2rem', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Diện tích</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{property.area} m²</div>
                </div>
                {property.bedrooms > 0 && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Phòng ngủ</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{property.bedrooms}</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Phòng tắm</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{property.bathrooms}</div>
                  </div>
                )}
                {property.floors !== undefined && property.floors > 0 && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Số tầng</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{property.floors}</div>
                  </div>
                )}
              </div>
            </div>

            {/* 3.2. Detailed Property Specifications Grid */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                Đặc Điểm & Thông Số Kỹ Thuật Chi Tiết
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                  <Maximize2 size={16} color="var(--green-primary)" />
                  <span>Diện tích sử dụng: <strong>{property.area} m²</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                  <ShieldCheck size={16} color="var(--green-primary)" />
                  <span>Tình trạng pháp lý: <strong>{property.legalDocument || 'Sổ hồng lâu dài'}</strong></span>
                </div>

                {property.frontWidth && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                    <Building size={16} color="var(--green-primary)" />
                    <span>Chiều rộng mặt tiền: <strong>{property.frontWidth} mét</strong></span>
                  </div>
                )}

                {property.roadWidth && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                    <Car size={16} color="var(--green-primary)" />
                    <span>Đường trước nhà: <strong>{property.roadWidth}</strong></span>
                  </div>
                )}

                {property.bedrooms > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                    <Bed size={16} color="var(--green-primary)" />
                    <span>Số phòng ngủ: <strong>{property.bedrooms} phòng</strong></span>
                  </div>
                )}

                {property.bathrooms > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                    <Bath size={16} color="var(--green-primary)" />
                    <span>Số phòng vệ sinh: <strong>{property.bathrooms} phòng</strong></span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                  <Compass size={16} color="var(--green-primary)" />
                  <span>Hướng cửa chính: <strong>{property.direction || 'Đông Nam'}</strong></span>
                </div>

                {property.balconyDirection && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                    <Compass size={16} color="var(--green-primary)" />
                    <span>Hướng ban công: <strong>{property.balconyDirection}</strong></span>
                  </div>
                )}

                {property.furnitureStatus && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', gridColumn: 'span 2' }}>
                    <Sparkles size={16} color="var(--green-primary)" />
                    <span>Nội thất bàn giao: <strong>{property.furnitureStatus}</strong></span>
                  </div>
                )}

                {property.yearBuilt && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                    <Calendar size={16} color="var(--green-primary)" />
                    <span>Năm hoàn thành: <strong>{property.yearBuilt}</strong></span>
                  </div>
                )}

                {property.planningStatus && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', gridColumn: 'span 2' }}>
                    <Info size={16} color="var(--green-primary)" />
                    <span>Quy hoạch sử dụng đất: <strong>{property.planningStatus}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Mortgage Loan Calculator */}
            {property.listingType === 'sale' && (
              <div style={{
                marginBottom: '2rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                backgroundColor: '#ffffff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Calculator size={20} color="var(--green-primary)" />
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                    Dự Toán Gói Vay Mua Nhà Ngân Hàng
                  </h2>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Ước tính số tiền thanh toán hàng tháng với gói lãi suất ưu đãi liên kết cùng Vietcombank & Techcombank.
                </p>

                {/* Calculator Inputs */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  {/* Loan Ratio */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Tỷ lệ vay: {loanRatio}% ({formatCurrency(loanAmount)})
                    </label>
                    <input
                      type="range"
                      min={30}
                      max={80}
                      step={5}
                      value={loanRatio}
                      onChange={(e) => setLoanRatio(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--green-primary)' }}
                    />
                  </div>

                  {/* Loan Years */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Thời hạn vay: {loanYears} năm ({loanYears * 12} tháng)
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={1}
                      value={loanYears}
                      onChange={(e) => setLoanYears(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--green-primary)' }}
                    />
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Lãi suất ưu đãi: {interestRate}% / năm
                    </label>
                    <input
                      type="range"
                      min={6.0}
                      max={12.0}
                      step={0.5}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--green-primary)' }}
                    />
                  </div>
                </div>

                {/* Results Card */}
                <div style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  border: '1px solid var(--border)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Vốn tự có cần chuẩn bị</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {formatCurrency(downPayment)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Số tiền cần vay</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {formatCurrency(loanAmount)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Trả tháng đầu (Gốc + Lãi)</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--green-primary)' }}>
                      ~{formatCurrency(estimatedMonthlyPayment)}/tháng
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Nearby Radius Amenities */}
            {property.nearbyAmenities && property.nearbyAmenities.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                  Vị Trí & Tiện Ích Ngoại Khu Trong Bán Kính 1 - 3 km
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.65rem'
                }}>
                  {property.nearbyAmenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.75rem 1rem',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{amenity.name}</span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--green-primary)',
                        backgroundColor: 'var(--green-light)',
                        padding: '2px 6px',
                        borderRadius: '3px'
                      }}>
                        {amenity.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features & Highlights */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Tiện Ích & Điểm Nổi Bật
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {property.features.map((feat, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: 'var(--green-light)',
                      color: 'var(--green-dark)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: '1px solid var(--green-border)'
                    }}
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Comprehensive Detailed Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Thông Tin Mô Tả Chi Tiết Từ Chuyên Gia
              </h2>
              <p style={{
                fontSize: '0.925rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                whiteSpace: 'pre-line'
              }}>
                {property.description}
              </p>
            </div>

            {/* 4-Step Safe Transaction Flow */}
            <div style={{
              padding: '1.25rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#f8fafc',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.85rem', color: 'var(--text-main)' }}>
                Quy Trình Giao Dịch Nhà Đất An Toàn Tại batdongsan.vn
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                fontSize: '0.825rem'
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--green-primary)', marginBottom: '2px' }}>
                    1. Khảo sát thực tế
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    Chuyên viên dẫn xem nhà trực tiếp và đối chiếu hiện trạng công trình.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--green-primary)', marginBottom: '2px' }}>
                    2. Kiểm tra quy hoạch
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    Tra cứu tọa độ, chỉ giới đường đỏ và tình trạng thế chấp ngân hàng.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--green-primary)', marginBottom: '2px' }}>
                    3. Đặt cọc công chứng
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    Lập văn bản đặt cọc có người làm chứng và ràng buộc pháp lý chặt chẽ.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--green-primary)', marginBottom: '2px' }}>
                    4. Sang tên nhận sổ
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    Ký hợp đồng mua bán tại phòng công chứng và nộp hồ sơ nhận sổ hồng.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Broker Card & Appointment Form */}
          <div style={{ position: 'sticky', top: '85px' }}>
            {/* Broker Info Card */}
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              backgroundColor: '#ffffff',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                    {property.agent.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {property.agent.role}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <CheckCircle2 size={12} />
                    <span>Môi giới đã xác thực danh tính</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a
                  href={`tel:${property.agent.phone}`}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <Phone size={18} />
                  <span>Gọi ngay: {property.agent.phone}</span>
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.85rem' }}
                >
                  <Mail size={16} />
                  <span>Gửi thư: {property.agent.email}</span>
                </a>
              </div>
            </div>

            {/* Appointment Booking Form */}
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              backgroundColor: 'var(--bg-subtle)'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                Hẹn Lịch Xem Nhà Thực Tế
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Chuyên viên phụ trách sẽ liên hệ hỗ trợ xem trực tiếp miễn phí.
              </p>

              {submitSuccess ? (
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--green-light)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--green-border)',
                  textAlign: 'center',
                  color: 'var(--green-dark)'
                }}>
                  <CheckCircle2 size={32} color="var(--green-primary)" style={{ margin: '0 auto 0.5rem auto' }} />
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Đã gửi yêu cầu thành công!</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    Chuyên viên {property.agent.name} sẽ liên hệ lại với quý khách trong vòng 15 phút.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      fontSize: '0.85rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="viewing">Hẹn xem nhà trực tiếp</option>
                    <option value="consultation">Nhận file sổ hồng scan PDF</option>
                    <option value="price_offer">Thương lượng đàm phán giá</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Họ và tên của bạn *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      fontSize: '0.85rem',
                      backgroundColor: '#ffffff'
                    }}
                  />

                  <input
                    type="tel"
                    placeholder="Số điện thoại / Zalo *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      fontSize: '0.85rem',
                      backgroundColor: '#ffffff'
                    }}
                  />

                  <input
                    type="email"
                    placeholder="Email nhận hồ sơ (tùy chọn)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      fontSize: '0.85rem',
                      backgroundColor: '#ffffff'
                    }}
                  />

                  <textarea
                    rows={2}
                    placeholder="Thời gian hẹn hoặc câu hỏi cụ thể..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      fontSize: '0.85rem',
                      resize: 'none',
                      backgroundColor: '#ffffff'
                    }}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.75rem' }}
                  >
                    {submitting ? 'Đang gửi...' : 'Xác nhận đặt lịch xem'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {relatedProperties.length > 0 && (
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Bất Động Sản Tương Tự Trong Khu Vực
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}>
              {relatedProperties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  isFavorite={false}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProperty={(selected) => {
                    onSelectProperty(selected);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for All Photos */}
      {isLightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem'
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ffffff'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>
              {property.title} ({activeImageIndex + 1}/{property.images.length})
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              style={{
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Current Lightbox Main Photo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '75vh'
          }} onClick={(e) => e.stopPropagation()}>
            <img
              src={property.images[activeImageIndex]}
              alt=""
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: 'var(--radius-sm)'
              }}
            />
          </div>

          {/* Bottom Thumbnails */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            overflowX: 'auto',
            padding: '0.5rem 0'
          }} onClick={(e) => e.stopPropagation()}>
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: '60px',
                  height: '45px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: activeImageIndex === idx ? '2px solid var(--green-primary)' : '2px solid transparent',
                  opacity: activeImageIndex === idx ? 1 : 0.6
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
