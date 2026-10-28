import React, { useState } from 'react';
import { X, Building2, Check } from 'lucide-react';
import { Property, PropertyType, ListingType } from '../../../types/property';

interface AdminCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (newProp: Property) => void;
}

export const AdminCreateModal: React.FC<AdminCreateModalProps> = ({
  isOpen,
  onClose,
  onAddProperty
}) => {
  const [title, setTitle] = useState('');
  const [listingType, setListingType] = useState<ListingType>('sale');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [price, setPrice] = useState('12500000000');
  const [area, setArea] = useState('140');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('2');
  const [address, setAddress] = useState('Số 88 Đường Nguyễn Hữu Cảnh');
  const [ward, setWard] = useState('Phường 22');
  const [district, setDistrict] = useState('Quận Bình Thạnh');
  const [city, setCity] = useState('Hồ Chí Minh');
  const [legalStatus, setLegalStatus] = useState('Sổ hồng lâu dài chính chủ');
  const [agentName, setAgentName] = useState('Nguyễn Văn Tuấn');
  const [agentPhone, setAgentPhone] = useState('0908 123 456');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price) || 0;
    const numArea = parseFloat(area) || 0;

    const formattedPrice = listingType === 'rent'
      ? `${(numPrice / 1000000).toFixed(0)} triệu/tháng`
      : numPrice >= 1000000000
      ? `${(numPrice / 1000000000).toFixed(1)} tỷ`
      : `${(numPrice / 1000000).toFixed(0)} triệu`;

    const newProperty: Property = {
      id: `bds-${Date.now().toString().slice(-4)}`,
      title: title.trim() || 'Căn hộ cao cấp phong cách Hiện đại',
      description: 'Bất động sản cao cấp vị trí đắc địa, giao thông kết nối hoàn hảo, pháp lý minh bạch công chứng ngay trong ngày.',
      price: numPrice,
      priceFormatted: formattedPrice,
      pricePerM2: numArea > 0 ? `${((numPrice / numArea) / 1000000).toFixed(1)} tr/m²` : undefined,
      area: numArea,
      bedrooms: parseInt(bedrooms) || 2,
      bathrooms: parseInt(bathrooms) || 2,
      propertyType,
      listingType,
      status: 'available',
      address,
      ward,
      district,
      city,
      coordinates: { lat: 10.792, lng: 106.718 },
      images: [
        imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      features: ['Sổ hồng chính chủ', 'Ban công thoáng mát', 'An ninh 24/7', 'Gần trường học & Metro'],
      agent: {
        name: agentName,
        phone: agentPhone,
        email: 'chuyengia@bds.vn',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
        role: 'Chuyên viên tư vấn cao cấp'
      },
      featured: true,
      legalStatus,
      createdAt: new Date().toISOString()
    };

    onAddProperty(newProperty);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: 'var(--green-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 size={18} color="var(--green-primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Thêm Tin Đăng Bất Động Sản Mới
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Niêm yết tài sản trực tiếp lên hệ thống quản trị batdongsan.vn
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Tiêu đề bài đăng BĐS *
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Căn hộ cao cấp 3PN Masteri Thảo Điền view trọn sông Sài Gòn"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '9px 12px',
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                outline: 'none'
              }}
            />
          </div>

          {/* Type & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Phân loại giao dịch *
              </label>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value as ListingType)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              >
                <option value="sale">Nhà đất bán</option>
                <option value="rent">Nhà đất cho thuê</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Loại hình bất động sản *
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              >
                <option value="apartment">Căn hộ chung cư</option>
                <option value="villa">Biệt thự cao cấp</option>
                <option value="house">Nhà phố thương mại</option>
                <option value="land">Đất nền dự án</option>
              </select>
            </div>
          </div>

          {/* Price & Area */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Mức giá (VNĐ) *
              </label>
              <input
                type="number"
                placeholder="12500000000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Diện tích sử dụng (m²) *
              </label>
              <input
                type="number"
                placeholder="140"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Số phòng ngủ
              </label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Số phòng tắm (WC)
              </label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Location Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Địa chỉ chi tiết
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Phường / Xã
              </label>
              <input
                type="text"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Quận / Huyện
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Tỉnh / Thành phố
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              >
                <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
              </select>
            </div>
          </div>

          {/* Agent info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Chuyên viên môi giới phụ trách
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Số điện thoại liên hệ
              </label>
              <input
                type="tel"
                value={agentPhone}
                onChange={(e) => setAgentPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Legal status & Image */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Tình trạng pháp lý
            </label>
            <input
              type="text"
              value={legalStatus}
              onChange={(e) => setLegalStatus(e.target.value)}
              placeholder="Sổ hồng lâu dài chính chủ, sang tên ngay"
              style={{
                width: '100%',
                padding: '9px 12px',
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              URL Hình ảnh đại diện
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                outline: 'none'
              }}
            />
          </div>

          {/* Buttons Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border)'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                backgroundColor: 'transparent',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              style={{
                padding: '8px 20px',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: 'var(--green-primary)',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Check size={16} />
              <span>Lưu & Niêm yết ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
