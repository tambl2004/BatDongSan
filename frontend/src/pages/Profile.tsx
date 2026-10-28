import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Property } from '../types/property';
import { PropertyCard } from '../components/PropertyCard';
import { Heart, User, Mail, Shield, Phone, FileText, ArrowLeft, Home } from 'lucide-react';
import { navigate } from '../router/router';

export interface ProfileProps {
  favoriteProperties?: Property[];
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  onSelectProperty?: (property: Property) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  favoriteProperties = [],
  favorites = [],
  onToggleFavorite = () => {},
  onSelectProperty = (prop) => navigate(`/chi-tiet-bds?id=${prop.id}`),
}) => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'info'>('favorites');

  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#f8fafc', padding: '2rem 0 4rem 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Profile Card Header */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '1.75rem',
              fontWeight: 800,
              boxShadow: '0 4px 10px rgba(5, 150, 105, 0.25)'
            }}>
              {user?.fullName?.charAt(0).toUpperCase() || <User size={30} />}
            </div>

            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {user?.fullName || (isAuthenticated ? 'Thành viên BatDongSan.vn' : 'Khách vãng lai')}
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '0.4rem',
                fontSize: '0.825rem',
                color: '#64748b'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Mail size={15} color="#94a3b8" />
                  {user?.email || 'Chưa đăng nhập'}
                </span>

                {user?.phone && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <Phone size={15} color="#94a3b8" />
                    {user.phone}
                  </span>
                )}

                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  border: '1px solid #a7f3d0'
                }}>
                  <Shield size={12} />
                  <span>{user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#475569',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={16} />
            <span>Về trang chủ</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '2px'
        }}>
          <button
            onClick={() => setActiveTab('favorites')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              fontSize: '0.9rem',
              fontWeight: activeTab === 'favorites' ? 800 : 600,
              color: activeTab === 'favorites' ? '#059669' : '#64748b',
              borderBottom: activeTab === 'favorites' ? '3px solid #059669' : '3px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Heart size={16} fill={activeTab === 'favorites' ? '#059669' : 'none'} />
            <span>Tin đã lưu ({favoriteProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              fontSize: '0.9rem',
              fontWeight: activeTab === 'info' ? 800 : 600,
              color: activeTab === 'info' ? '#059669' : '#64748b',
              borderBottom: activeTab === 'info' ? '3px solid #059669' : '3px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <FileText size={16} />
            <span>Thông tin cá nhân</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'favorites' ? (
          favoriteProperties.length === 0 ? (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '2px dashed #cbd5e1',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.85rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.5rem'
              }}>
                <Heart size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Chưa có bất động sản nào được lưu
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '420px', margin: 0 }}>
                Nhấn vào biểu tượng trái tim trên bất kỳ tin đăng nhà đất nào để lưu lại danh sách so sánh và theo dõi biến động giá.
              </p>
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
                  marginTop: '0.75rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)'
                }}
              >
                <Home size={15} />
                <span>Khám phá nhà đất ngay</span>
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {favoriteProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isFavorite={favorites.includes(prop.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProperty={onSelectProperty}
                />
              ))}
            </div>
          )
        ) : (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '1.75rem',
            maxWidth: '640px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
              Chi tiết tài khoản thành viên
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: '1rem', columnGap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ color: '#64748b', fontWeight: 600 }}>Họ và tên:</div>
              <div style={{ color: '#0f172a', fontWeight: 700 }}>{user?.fullName || '---'}</div>

              <div style={{ color: '#64748b', fontWeight: 600 }}>Email đăng nhập:</div>
              <div style={{ color: '#0f172a', fontWeight: 700 }}>{user?.email || '---'}</div>

              <div style={{ color: '#64748b', fontWeight: 600 }}>Số điện thoại:</div>
              <div style={{ color: '#0f172a', fontWeight: 700 }}>{user?.phone || 'Chưa cập nhật'}</div>

              <div style={{ color: '#64748b', fontWeight: 600 }}>Phân quyền:</div>
              <div>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  textTransform: 'uppercase'
                }}>
                  {user?.role || 'Khách hàng'}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default Profile;
