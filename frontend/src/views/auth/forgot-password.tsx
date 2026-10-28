import React, { useState } from 'react';
import { navigate } from '../../router/router';
import { requestPasswordReset } from '../../services/api';
import { AuthBanner } from './AuthBanner';
import {
  Building2,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  KeyRound,
  RotateCcw
} from 'lucide-react';

export const ForgotPasswordView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ email của bạn');
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await requestPasswordReset(email.trim());
      if (res.success) {
        setIsSubmitted(true);
        setSuccessMsg(res.message);
      } else {
        setErrorMsg(res.message || 'Không thể tìm thấy tài khoản với email này.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setIsSubmitted(false);
    setSuccessMsg(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#ffffff'
    }}>
      {/* LEFT: Forgot Password Form Container */}
      <div style={{
        flex: '1 1 50%',
        maxWidth: '680px',
        padding: '2.5rem 3.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 auto'
      }}>
        {/* Top Back Link & Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2.5rem'
        }}>
          <button
            type="button"
            onClick={() => navigate('/login')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--green-primary)';
              e.currentTarget.style.transform = 'translateX(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={16} />
            <span>Quay lại Đăng nhập</span>
          </button>

          <div
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer'
            }}
          >
            <Building2 size={24} color="var(--green-primary)" />
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              batdongsan<span style={{ color: 'var(--green-primary)' }}>.vn</span>
            </span>
          </div>
        </div>

        {/* Lock Key Icon Badge */}
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          backgroundColor: 'var(--green-light)',
          border: '1px solid var(--green-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          color: 'var(--green-primary)'
        }}>
          <KeyRound size={26} />
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            letterSpacing: '-0.025em',
            marginBottom: '0.4rem'
          }}>
            Quên mật khẩu?
          </h1>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Đừng lo lắng! Hãy nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi hướng dẫn kèm liên kết an toàn để đặt lại mật khẩu của bạn.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecdd3',
            color: '#b91c1c',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            marginBottom: '1.5rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Card when submitted */}
        {isSubmitted && successMsg ? (
          <div style={{
            backgroundColor: 'var(--green-light)',
            border: '1px solid var(--green-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={24} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                  Đã gửi email khôi phục thành công!
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1rem' }}>
                  {successMsg}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    style={{
                      padding: '0.55rem 1rem',
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      backgroundColor: 'var(--green-primary)',
                      color: '#ffffff',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Về trang Đăng nhập
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    style={{
                      padding: '0.55rem 1rem',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      color: 'var(--text-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <RotateCcw size={14} />
                    <span>Gửi lại</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Form Input */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Địa chỉ Email tài khoản *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                <input
                  type="email"
                  placeholder="nhap.email.cua.ban@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 42px',
                    fontSize: '0.925rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.15s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--green-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                backgroundColor: 'var(--green-primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--green-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--green-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? (
                <span>Đang gửi mã...</span>
              ) : (
                <>
                  <span>Gửi liên kết khôi phục</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Back to Login Link */}
        <div style={{
          textAlign: 'center',
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          marginTop: '2rem'
        }}>
          Nhớ lại mật khẩu?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            style={{
              color: 'var(--green-primary)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>

      {/* RIGHT: Banner Slider */}
      <AuthBanner />
    </div>
  );
};
