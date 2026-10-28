import React, { useState, useEffect } from 'react';
import { X, Building2, Check, Sparkles } from 'lucide-react';
import { Property, PropertyType, ListingType, PropertyStatus } from '../../../types/property';

interface AdminEditModalProps {
  isOpen: boolean;
  property: Property | null;
  onClose: () => void;
  onUpdateProperty: (updatedProp: Property) => void;
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({
  isOpen,
  property,
  onClose,
  onUpdateProperty
}) => {
  const [title, setTitle] = useState('');
  const [listingType, setListingType] = useState<ListingType>('sale');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [status, setStatus] = useState<PropertyStatus>('available');
  const [featured, setFeatured] = useState(false);
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [address, setAddress] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [legalStatus, setLegalStatus] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentPhone, setAgentPhone] = useState('');

  useEffect(() => {
    if (property) {
      setTitle(property.title || '');
      setListingType(property.listingType || 'sale');
      setPropertyType(property.propertyType || 'apartment');
      setStatus(property.status || 'available');
      setFeatured(!!property.featured);
      setPrice(property.price ? property.price.toString() : '');
      setArea(property.area ? property.area.toString() : '');
      setBedrooms(property.bedrooms ? property.bedrooms.toString() : '2');
      setBathrooms(property.bathrooms ? property.bathrooms.toString() : '2');
      setAddress(property.address || '');
      setWard(property.ward || '');
      setDistrict(property.district || '');
      setCity(property.city || '');
      setLegalStatus(property.legalStatus || 'Sổ hồng lâu dài chính chủ');
      setAgentName(property.agent?.name || '');
      setAgentPhone(property.agent?.phone || '');
    }
  }, [property]);

  if (!isOpen || !property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price) || 0;
    const numArea = parseFloat(area) || 0;

    let formattedPrice = `${(numPrice / 1000000000).toFixed(1)} tỷ`;
    if (numPrice < 1000000000 && numPrice > 0) {
      formattedPrice = `${(numPrice / 1000000).toFixed(0)} triệu`;
    }

    const updated: Property = {
      ...property,
      title,
      listingType,
      propertyType,
      status,
      featured,
      price: numPrice,
      priceFormatted: formattedPrice,
      pricePerM2: numArea > 0 ? `${((numPrice / numArea) / 1000000).toFixed(1)} tr/m²` : property.pricePerM2,
      area: numArea,
      bedrooms: parseInt(bedrooms) || 2,
      bathrooms: parseInt(bathrooms) || 2,
      address,
      ward,
      district,
      city,
      legalStatus,
      agent: {
        ...property.agent,
        name: agentName,
        phone: agentPhone
      }
    };

    onUpdateProperty(updated);
    onClose();
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#475569',
    marginBottom: '0.35rem'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#0f172a'
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
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Chỉnh sửa thông tin Bất Động Sản
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
                Mã BĐS: #{property.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Tiêu đề */}
          <div>
            <label style={labelStyle}>Tiêu đề bài đăng</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Phân loại & Trạng thái */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Trạng thái duyệt</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                style={inputStyle}
              >
                <option value="available">Đang mở bán / Cho thuê</option>
                <option value="pending">Chờ kiểm duyệt</option>
                <option value="sold">Đã giao dịch thành công</option>
                <option value="rejected">Bị từ chối phê duyệt</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Hình thức</label>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value as ListingType)}
                style={inputStyle}
              >
                <option value="sale">Bán nhà đất</option>
                <option value="rent">Cho thuê</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Loại hình BĐS</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                style={inputStyle}
              >
                <option value="apartment">Căn hộ chung cư</option>
                <option value="villa">Biệt thự cao cấp</option>
                <option value="house">Nhà phố thương mại</option>
                <option value="land">Đất nền dự án</option>
              </select>
            </div>
          </div>

          {/* Toggle Tin nổi bật */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '10px'
          }}>
            <input
              type="checkbox"
              id="edit-featured-toggle"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="edit-featured-toggle" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#92400e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#d97706" />
              <span>Ghim tin nổi bật (VIP Highlight trang chủ & danh mục)</span>
            </label>
          </div>

          {/* Giá và Diện tích */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Mức giá (VND)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Diện tích (m²)</label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Số PN</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Số WC</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Vị trí */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Tỉnh / Thành phố</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Quận / Huyện</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Phường / Xã</label>
              <input
                type="text"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Địa chỉ chi tiết</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Pháp lý & Môi giới phụ trách */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Tình trạng pháp lý</label>
              <input
                type="text"
                value={legalStatus}
                onChange={(e) => setLegalStatus(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Tên Môi giới</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>SĐT Môi giới</label>
              <input
                type="text"
                value={agentPhone}
                onChange={(e) => setAgentPhone(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div style={{
            paddingTop: '1rem',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.75rem'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#059669',
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
              }}
            >
              <Check size={16} />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
