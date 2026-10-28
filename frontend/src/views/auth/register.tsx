import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { navigate } from '../../router/router';
import { AuthBanner } from './AuthBanner';
import {
  Building2,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

import { notify } from '../../utils/toast';

interface RegisterViewProps {
  redirectPath?: string;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ redirectPath = '/' }) => {
  const { register, socialLogin } = useAuth();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim()) {
      notify.warning('Vui lòng nhập họ và tên của bạn');
      setErrorMsg('Vui lòng nhập họ và tên của bạn');
      return;
    }

    if (password.length < 6) {
      notify.warning('Mật khẩu phải chứa ít nhất 6 ký tự');
      setErrorMsg('Mật khẩu phải chứa ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      notify.warning('Mật khẩu xác nhận không trùng khớp');
      setErrorMsg('Mật khẩu xác nhận không trùng khớp');
      return;
    }

    if (!agreeTerms) {
      notify.warning('Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật');
      setErrorMsg('Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật');
      return;
    }

    setLoading(true);

    try {
      const res = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        role
      });

      if (res.success) {
        notify.success(res.message || 'Đăng ký tài khoản thành công! Bạn có thể bắt đầu đăng tin ngay.');
        setSuccessMsg(res.message);
        setTimeout(() => {
          navigate(redirectPath || '/');
        }, 800);
      } else {
        notify.error(res.message || 'Đăng ký không thành công');
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      notify.error(err.message || 'Đã có lỗi xảy ra trong quá trình đăng ký');
      setErrorMsg(err.message || 'Đã có lỗi xảy ra trong quá trình đăng ký');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await socialLogin(provider);
      if (res.success) {
        notify.success(res.message || `Đăng nhập qua ${provider} thành công!`);
        setSuccessMsg(res.message);
        setTimeout(() => {
          navigate(redirectPath || '/');
        }, 600);
      } else {
        notify.error(res.message || 'Lỗi đăng nhập mạng xã hội');
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      notify.error(err.message || 'Lỗi đăng nhập mạng xã hội');
      setErrorMsg(err.message || 'Lỗi đăng nhập mạng xã hội');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#ffffff'
    }}>
      {/* LEFT: Register Form Container */}
      <div style={{
        flex: '1 1 50%',
        maxWidth: '680px',
        padding: '2.5rem 3.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 auto',
        overflowY: 'auto'
      }}>
        {/* Top Back Link & Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.75rem'
        }}>
          <button
            type="button"
            onClick={() => navigate('/')}
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
            <span>Về trang chủ</span>
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

        {/* Heading */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            letterSpacing: '-0.025em',
            marginBottom: '0.35rem'
          }}>
            Tạo tài khoản mới
          </h1>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Gia nhập nền tảng giao dịch bất động sản cao cấp, minh bạch hàng đầu Việt Nam.
          </p>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecdd3',
            color: '#b91c1c',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: 'var(--green-light)',
            border: '1px solid var(--green-border)',
            color: 'var(--green-dark)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <CheckCircle2 size={18} color="var(--green-primary)" style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Họ và tên *
            </label>
            <div style={{ position: 'relative' }}>
              <UserIcon size={17} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Ví dụ: Nguyễn Văn Tâm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: '#ffffff',
                  outline: 'none',
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

          {/* Email & Phone in 2 Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Địa chỉ Email *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    fontSize: '0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    outline: 'none',
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

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Số điện thoại liên hệ *
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={17} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="tel"
                  placeholder="0912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    fontSize: '0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    outline: 'none',
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
          </div>

          {/* Password & Confirm Password in 2 Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Mật khẩu *
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tối thiểu 6 ký tự"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 38px 10px 38px',
                    fontSize: '0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    outline: 'none',
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '11px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Xác nhận mật khẩu *
              </label>
              <div style={{ position: 'relative' }}>
                <ShieldCheck size={17} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 38px 10px 38px',
                    fontSize: '0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    outline: 'none',
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
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '11px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Account Role */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Vai trò tài khoản:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label
                onClick={() => setRole('user')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: role === 'user' ? '1.5px solid var(--green-primary)' : '1px solid var(--border)',
                  backgroundColor: role === 'user' ? 'var(--green-light)' : '#ffffff',
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <input
                  type="radio"
                  name="role"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  style={{ accentColor: 'var(--green-primary)' }}
                />
                <span style={{ fontWeight: role === 'user' ? 700 : 500, color: role === 'user' ? 'var(--green-dark)' : 'var(--text-main)' }}>
                  Khách hàng / Môi giới
                </span>
              </label>

              <label
                onClick={() => setRole('admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: role === 'admin' ? '1.5px solid var(--green-primary)' : '1px solid var(--border)',
                  backgroundColor: role === 'admin' ? 'var(--green-light)' : '#ffffff',
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <input
                  type="radio"
                  name="role"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  style={{ accentColor: 'var(--green-primary)' }}
                />
                <span style={{ fontWeight: role === 'admin' ? 700 : 500, color: role === 'admin' ? 'var(--green-dark)' : 'var(--text-main)' }}>
                  Quản trị viên (Admin)
                </span>
              </label>
            </div>
          </div>

          {/* Agree Terms Checkbox */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.825rem', marginTop: '0.2rem' }}>
            <input
              type="checkbox"
              id="agree-terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{ accentColor: 'var(--green-primary)', marginTop: '3px' }}
            />
            <label htmlFor="agree-terms" style={{ color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: 1.45 }}>
              Tôi xác nhận thông tin chính xác và đồng ý với{' '}
              <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Điều khoản dịch vụ</span> &{' '}
              <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Chính sách bảo mật</span> của batdongsan.vn
            </label>
          </div>

          {/* Submit Button */}
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
              marginTop: '0.5rem',
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
              <span>Đang khởi tạo tài khoản...</span>
            ) : (
              <>
                <span>Đăng ký tài khoản ngay</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* SECTION: Đăng ký / Đăng nhập bằng phương thức khác (Nằm dưới nút đăng ký/mật khẩu) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          margin: '1.5rem 0 1.25rem 0'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            hoặc đăng ký bằng phương thức khác
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
        </div>

        {/* Social Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <button
            type="button"
            onClick={() => handleSocialSignIn('google')}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '0.7rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.93 6.72-4.93z"/>
            </svg>
            <span>Đăng ký qua Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn('facebook')}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '0.7rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Đăng ký qua Facebook</span>
          </button>
        </div>

        {/* Switch to Login Link */}
        <div style={{
          textAlign: 'center',
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          paddingTop: '0.5rem'
        }}>
          Bạn đã có tài khoản?{' '}
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

      {/* RIGHT: High-End Aesthetic Banner Slider */}
      <AuthBanner />
    </div>
  );
};
