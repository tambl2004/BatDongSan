import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { submitInquiry } from '../../services/api';

interface ServiceConsultModalProps {
  isOpen: boolean;
  serviceTitle: string;
  onClose: () => void;
}

export const ServiceConsultModal: React.FC<ServiceConsultModalProps> = ({
  isOpen,
  serviceTitle,
  onClose
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ');
      return;
    }

    setSubmitting(true);
    const res = await submitInquiry({
      propertyId: 'service-request',
      propertyTitle: serviceTitle || 'Tư vấn Dịch vụ BĐS Toàn Diện',
      fullName,
      phone,
      email,
      message: `Đăng ký dịch vụ: ${serviceTitle}. Ghi chú: ${notes || 'Cần hỗ trợ tư vấn trực tiếp.'}`,
      inquiryType: 'service'
    });
    setSubmitting(false);

    if (res.success) {
      setSuccess(true);
    } else {
      alert(res.message);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '520px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-primary)', textTransform: 'uppercase' }}>
              ĐĂNG KÝ DỊCH VỤ CHUYÊN GIA
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
              {serviceTitle || 'Tư vấn Dịch vụ Bất động sản'}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              color: 'var(--text-secondary)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <CheckCircle2 size={48} color="var(--green-primary)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Đăng ký dịch vụ thành công!
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto 1.25rem auto' }}>
                Chuyên viên pháp lý & tài chính của batdongsan.vn sẽ liên hệ trực tiếp qua số điện thoại <strong>{phone}</strong> trong vòng 15 phút.
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
                style={{ padding: '0.55rem 1.5rem', fontSize: '0.875rem' }}
              >
                Đóng thông báo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Họ và tên của quý khách *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    fontSize: '0.875rem',
                    backgroundColor: '#ffffff'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Số điện thoại / Zalo nhận kết quả *
                </label>
                <input
                  type="tel"
                  placeholder="Ví dụ: 0908 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    fontSize: '0.875rem',
                    backgroundColor: '#ffffff'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Email nhận văn bản / chứng thư (tùy chọn)
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    fontSize: '0.875rem',
                    backgroundColor: '#ffffff'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Địa chỉ bất động sản hoặc nội dung yêu cầu cụ thể
                </label>
                <textarea
                  rows={2}
                  placeholder="Nhập địa chỉ nhà đất, số tờ/số thửa hoặc câu hỏi cụ thể..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    fontSize: '0.875rem',
                    resize: 'none',
                    backgroundColor: '#ffffff'
                  }}
                />
              </div>

              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                backgroundColor: 'var(--bg-subtle)',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)'
              }}>
                🔒 Thông tin của quý khách được bảo mật tuyệt đối theo tiêu chuẩn chứng nhận bảo mật SSL/TLS.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem' }}
              >
                {submitting ? 'Đang gửi yêu cầu...' : 'Xác nhận gửi thông tin'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
