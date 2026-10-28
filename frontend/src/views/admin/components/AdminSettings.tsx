import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle, ShieldAlert } from 'lucide-react';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminApi';
import { SystemSettings } from '../types';
import { notify } from '../../../utils/toast';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'BatDongSan.vn — Sàn Giao Dịch BĐS & PropTech Cao Cấp',
    hotline: '1900 6868 - 0918 889 999',
    supportEmail: 'contact@batdongsan.vn',
    officeAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
    autoApprovePost: false,
    maxFreePostDays: 30,
    featuredPostFeePerDay: 50000,
    maintenanceMode: false
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdminSettings().then(res => {
      if (res.data) setSettings(res.data);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateAdminSettings(settings);
    setLoading(false);
    setSaved(true);
    notify.success('Đã lưu thành công cấu hình hệ thống!');
    setTimeout(() => setSaved(false), 3000);
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#475569',
    marginBottom: '0.4rem'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#0f172a'
  };

  return (
    <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '1.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #f1f5f9',
          marginBottom: '1.25rem'
        }}>
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
            <Settings size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Cấu hình tham số hệ thống
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
              Quản lý thương hiệu, chính sách duyệt tin và định mức chi phí dịch vụ sàn
            </p>
          </div>
        </div>

        {saved && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: '#ecfdf5',
            color: '#047857',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            <CheckCircle size={16} color="#059669" />
            <span>Đã lưu thành công cấu hình hệ thống vào máy chủ!</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.8rem' }}>
          {/* Brand Name */}
          <div>
            <label style={labelStyle}>Tên thương hiệu sàn giao dịch</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
              style={inputStyle}
            />
          </div>

          {/* Hotline & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Hotline tổng đài tư vấn 24/7</label>
              <input
                type="text"
                value={settings.hotline}
                onChange={(e) => setSettings(prev => ({ ...prev, hotline: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email tiếp nhận hồ sơ & hỗ trợ</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Office Address */}
          <div>
            <label style={labelStyle}>Địa chỉ văn phòng trụ sở chính</label>
            <input
              type="text"
              value={settings.officeAddress}
              onChange={(e) => setSettings(prev => ({ ...prev, officeAddress: e.target.value }))}
              style={inputStyle}
            />
          </div>

          {/* Fee & Days */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Thời hạn tin đăng miễn phí (ngày)</label>
              <input
                type="number"
                min="1"
                value={settings.maxFreePostDays}
                onChange={(e) => setSettings(prev => ({ ...prev, maxFreePostDays: parseInt(e.target.value) || 30 }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Phí ghim tin VIP nổi bật (VND / ngày)</label>
              <input
                type="number"
                step="5000"
                value={settings.featuredPostFeePerDay}
                onChange={(e) => setSettings(prev => ({ ...prev, featuredPostFeePerDay: parseInt(e.target.value) || 50000 }))}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Policies Checkboxes */}
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.autoApprovePost}
                onChange={(e) => setSettings(prev => ({ ...prev, autoApprovePost: e.target.checked }))}
                style={{ width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer' }}
              />
              <div>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>Tự động duyệt tin đăng của môi giới uy tín</span>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '2px 0 0 0' }}>
                  Bỏ qua bước thẩm định thủ công đối với các chuyên viên có huy hiệu xác thực.
                </p>
              </div>
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px',
              backgroundColor: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                style={{ width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer' }}
              />
              <div>
                <span style={{ fontWeight: 700, color: '#9f1239', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldAlert size={15} color="#e11d48" />
                  <span>Kích hoạt chế độ bảo trì hệ thống</span>
                </span>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '2px 0 0 0' }}>
                  Tạm thời khóa tính năng đăng tin mới từ phía khách hàng để nâng cấp CSDL.
                </p>
              </div>
            </label>
          </div>

          {/* Save Button */}
          <div style={{ paddingTop: '0.5rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                backgroundColor: '#059669',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: '8px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)'
              }}
            >
              <Save size={16} />
              <span>{loading ? 'Đang lưu...' : 'Lưu cài đặt hệ thống'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
