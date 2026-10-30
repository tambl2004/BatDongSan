import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { navigate } from '../router/router';
import {
  Building2,
  Upload,
  PlusCircle,
  MapPin,
  DollarSign,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  Home
} from 'lucide-react';
import { notify } from '../utils/toast';

export const ManagePost: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [listingType, setListingType] = useState<'sale' | 'rent'>('sale');
  const [propertyType, setPropertyType] = useState('apartment');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Hồ Chí Minh');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#334155',
    marginBottom: '0.4rem'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    transition: 'border-color 0.15s ease'
  };

  if (!isAuthenticated) {
    return (
      <main style={{ minHeight: '75vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{
          maxWidth: '460px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#fef3c7',
            color: '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <AlertCircle size={30} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Yêu cầu đăng nhập tài khoản
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            Bạn cần đăng nhập tài khoản để thực hiện đăng tin bất động sản chính chủ và quản lý tin đăng trên sàn.
          </p>
          <button
            onClick={() => navigate('/login?redirect=/dang-tin')}
            style={{
              width: '100%',
              padding: '11px',
              backgroundColor: '#059669',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)'
            }}
          >
            Đăng nhập ngay
          </button>
        </div>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numPrice = Number(price) || 0;
    const formattedPrice = listingType === 'sale'
      ? (numPrice >= 1000000000 ? `${(numPrice / 1000000000).toFixed(1)} tỷ` : `${(numPrice / 1000000).toFixed(0)} triệu`)
      : `${(numPrice / 1000000).toFixed(0)} triệu/tháng`;

    const newSubmission = {
      id: `bds-post-${Date.now().toString().slice(-4)}`,
      title: title || 'Bất động sản chính chủ mới đăng',
      description: description || 'Thông tin chi tiết đang được chủ nhà cập nhật bổ sung.',
      price: numPrice,
      priceFormatted: formattedPrice,
      area: Number(area) || 60,
      bedrooms: Number(bedrooms) || 2,
      bathrooms: Number(bathrooms) || 2,
      propertyType,
      listingType,
      status: 'pending',
      isNewListing: true,
      address: address || `${district}, ${city}`,
      ward: district || 'Phường Bến Nghé',
      district: district || 'Quận 1',
      city: city || 'Hồ Chí Minh',
      coordinates: { lat: 10.7769, lng: 106.7009 },
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['Sổ hồng chính chủ', 'Vị trí giao thông thuận tiện'],
      legalStatus: 'Sổ hồng riêng chính chủ, công chứng ngay',
      agent: {
        name: user?.fullName || 'Khách hàng',
        phone: user?.phone || '0900 123 456',
        email: user?.email || '',
        avatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        role: 'Khách hàng chính chủ'
      },
      submittedBy: {
        name: user?.fullName || 'Khách hàng chính chủ',
        phone: user?.phone || '0900 123 456',
        email: user?.email,
        role: 'client' as const,
        submittedAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      },
      featured: false,
      createdAt: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem('bds_user_submissions');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newSubmission);
      localStorage.setItem('bds_user_submissions', JSON.stringify(list));
    } catch (e) {
      console.warn('Lỗi lưu submission:', e);
    }

    setSubmitted(true);
    notify.success('Đăng tin bất động sản thành công! Tin đang chờ ban quản trị phê duyệt.');
  };

  return (
    <main style={{ minHeight: '85vh', backgroundColor: '#f8fafc', padding: '2.5rem 0 4rem 0' }}>
      <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#059669',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.35rem'
          }}>
            <Building2 size={16} />
            <span>CỔNG ĐĂNG TIN CHÍNH CHỦ</span>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem 0' }}>
            Đăng tin Bất Động Sản Mới
          </h1>

          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
            Người đăng: <strong style={{ color: '#0f172a' }}>{user?.fullName || 'Chính chủ'}</strong> • Tiếp cận hàng triệu khách hàng tiềm năng toàn quốc trên hệ thống BatDongSan.vn
          </p>
        </div>

        {submitted ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #a7f3d0',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Đăng tin thành công!
            </h2>

            <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '480px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
              Tin đăng của bạn đã được chuyển tới bộ phận kiểm duyệt để thẩm định thông tin pháp lý. Tin sẽ được hiển thị công khai ngay sau khi được phê duyệt.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Đăng thêm tin khác
              </button>

              <button
                onClick={() => navigate('/nha-dat-ban')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)'
                }}
              >
                <Home size={15} />
                <span>Xem danh sách tin</span>
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            {/* Hình thức & Loại BĐS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Hình thức giao dịch</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setListingType('sale')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: listingType === 'sale' ? '2px solid #059669' : '1px solid #cbd5e1',
                      backgroundColor: listingType === 'sale' ? '#ecfdf5' : '#ffffff',
                      color: listingType === 'sale' ? '#065f46' : '#475569',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Bán nhà đất
                  </button>

                  <button
                    type="button"
                    onClick={() => setListingType('rent')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: listingType === 'rent' ? '2px solid #059669' : '1px solid #cbd5e1',
                      backgroundColor: listingType === 'rent' ? '#ecfdf5' : '#ffffff',
                      color: listingType === 'rent' ? '#065f46' : '#475569',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Cho thuê
                  </button>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Loại hình bất động sản</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  style={inputStyle}
                >
                  <option value="apartment">Căn hộ / Chung cư</option>
                  <option value="house">Nhà riêng / Nhà phố</option>
                  <option value="villa">Biệt thự liền kề</option>
                  <option value="land">Đất nền dự án / Thổ cư</option>
                </select>
              </div>
            </div>

            {/* Tiêu đề tin đăng */}
            <div>
              <label style={labelStyle}>
                Tiêu đề tin đăng <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                required
                type="text"
                placeholder="VD: Bán căn hộ 2PN Masteri Thảo Điền view trọn sông Sài Gòn..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Địa chỉ & Vị trí */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Tỉnh / Thành phố</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={inputStyle}
                >
                  <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Quận / Huyện</label>
                <input
                  required
                  type="text"
                  placeholder="VD: Quận 1, Quận 7, TP. Thủ Đức"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Địa chỉ chi tiết</label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    type="text"
                    placeholder="Số nhà, tên đường..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: '34px' }}
                  />
                  <MapPin size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            {/* Giá, Diện tích, Phòng ngủ, Phòng tắm */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Mức giá (VNĐ)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    type="text"
                    placeholder="VD: 3.5 tỷ / 15 triệu"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: '34px' }}
                  />
                  <DollarSign size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Diện tích (m²)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    type="number"
                    placeholder="VD: 85"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: '34px' }}
                  />
                  <Maximize2 size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Số phòng ngủ</label>
                <input
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Số phòng tắm / WC</label>
                <input
                  type="number"
                  min="0"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Mô tả chi tiết */}
            <div>
              <label style={labelStyle}>Mô tả chi tiết bất động sản</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả thông tin chi tiết: tiện ích nội khu, hướng ban công, tình trạng bàn giao nội thất, pháp lý sổ đỏ/sổ hồng công chứng ngay..."
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {/* Upload ảnh placeholder */}
            <div>
              <label style={labelStyle}>Hình ảnh thực tế bất động sản</label>
              <div style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '10px',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                backgroundColor: '#f8fafc',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}>
                <Upload size={32} color="#94a3b8" style={{ margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                  Kéo thả hình ảnh hoặc bấm để chọn tệp từ thiết bị
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                  Hỗ trợ định dạng JPG, PNG, WebP (Tối đa 10 ảnh, mỗi ảnh dung lượng dưới 5MB)
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #f1f5f9'
            }}>
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 24px',
                  borderRadius: '8px',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)',
                  transition: 'all 0.15s ease'
                }}
              >
                <PlusCircle size={16} />
                <span>Đăng tin ngay</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </main>
  );
};

export default ManagePost;
