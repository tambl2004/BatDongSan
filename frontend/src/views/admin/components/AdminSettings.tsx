import React, { useState } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [siteName, setSiteName] = useState('batdongsan.vn');
  const [hotline, setHotline] = useState('1900 6868');
  const [adminEmail, setAdminEmail] = useState('admin@gmail.com');
  const [autoApprove, setAutoApprove] = useState(true);
  const [emailNotify, setEmailNotify] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
          <Settings size={20} color="var(--green-primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Cấu hình thông tin hệ thống
          </h3>
        </div>

        {saved && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--green-light)',
            border: '1px solid var(--green-border)',
            color: 'var(--green-dark)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            <CheckCircle size={16} color="var(--green-primary)" />
            <span>Đã lưu các cài đặt cấu hình thành công!</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Tên thương hiệu sàn giao dịch
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Hotline tổng đài tư vấn 24/7
              </label>
              <input
                type="text"
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
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
                Email tiếp nhận hồ sơ liên hệ
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoApprove}
                onChange={(e) => setAutoApprove(e.target.checked)}
                style={{ accentColor: 'var(--green-primary)' }}
              />
              <span>Tự động kích hoạt tin đăng sau khi chuyên viên kiểm tra sổ đỏ</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={emailNotify}
                onChange={(e) => setEmailNotify(e.target.checked)}
                style={{ accentColor: 'var(--green-primary)' }}
              />
              <span>Gửi thông báo tức thì qua email khi có khách hàng đặt lịch hẹn xem BĐS</span>
            </label>
          </div>

          <button
            type="submit"
            style={{
              padding: '9px 18px',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: 'var(--green-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '0.5rem'
            }}
          >
            <Save size={16} />
            <span>Lưu thay đổi cài đặt</span>
          </button>
        </form>
      </div>
    </div>
  );
};
