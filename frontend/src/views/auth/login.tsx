import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { navigate } from '../../router/router';
import { AuthBanner } from './AuthBanner';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';

import { notify } from '../../utils/toast';

interface LoginViewProps {
  redirectPath?: string;
}

export const LoginView: React.FC<LoginViewProps> = ({ redirectPath = '/' }) => {
  const { login, socialLogin } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status states
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(email.trim(), password);
      if (res.success && res.user) {
        notify.success(res.message || 'Đăng nhập thành công!');
        setTimeout(() => {
          if (res.user?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate(redirectPath || '/');
          }
        }, 500);
      } else {
        notify.error(res.message || 'Email hoặc mật khẩu không chính xác');
      }
    } catch (err: any) {
      notify.error(err.message || 'Lỗi đăng nhập. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    try {
      const res = await socialLogin(provider);
      if (res.success) {
        notify.success(res.message || `Đăng nhập qua ${provider} thành công!`);
        setTimeout(() => {
          navigate(redirectPath || '/');
        }, 500);
      } else {
        notify.error(res.message || 'Lỗi đăng nhập mạng xã hội');
      }
    } catch (err: any) {
      notify.error(err.message || 'Lỗi đăng nhập mạng xã hội');
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
      {/* LEFT: Banner */}
      <AuthBanner />

      {/* RIGHT: Auth Form Container */}
      <div style={{
        flex: '1 1 50%',
        maxWidth: '590px',
        padding: '2.5rem 3.5rem',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        overflowY: 'auto'
      }}>
        {/* Logo centered & enlarged */}
        <div
          onClick={() => navigate('/')}
          title="Về trang chủ GreenNest"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2.75rem',
            cursor: 'pointer'
          }}
        >
          <img
            src="/assets/images/logo/Logo_GreenNest.png"
            alt="GreenNest"
            style={{
              height: '90px',
              maxWidth: '280px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '0.45rem',
            background: 'linear-gradient(135deg, #064e3b 0%, #059669 55%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Chào mừng bạn trở lại
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: '#64748b',
            fontWeight: 500
          }}>
            Đăng nhập để tiếp tục khám phá không gian sống lý tưởng
          </p>
        </div>


        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Địa chỉ Email *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '13px' }} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 40px',
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

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                Mật khẩu *
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                style={{
                  fontSize: '0.825rem',
                  color: 'var(--green-primary)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                Quên mật khẩu?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '13px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 42px 11px 40px',
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: 'var(--green-primary)', width: '16px', height: '16px' }}
            />
            <label htmlFor="remember" style={{ color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}>
              Ghi nhớ đăng nhập trên thiết bị này
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
              marginTop: '0.35rem',
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
              <span>Đang xác thực...</span>
            ) : (
              <>
                <span>Đăng nhập ngay</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* SECTION: Đăng nhập bằng phương thức khác (Nằm dưới mật khẩu và nút đăng nhập) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          margin: '1.75rem 0 1.25rem 0'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            hoặc đăng nhập bằng phương thức khác
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
        </div>

        {/* Social Login Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {/* Google Button */}
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
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.93 6.72-4.93z" />
            </svg>
            <span>Google</span>
          </button>

          {/* Facebook Button */}
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
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        {/* Switch to Register Link */}
        <div style={{
          textAlign: 'center',
          fontSize: '0.88rem',
          color: 'var(--text-secondary)'
        }}>
          Chưa có tài khoản?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            style={{
              color: 'var(--green-primary)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Đăng ký tài khoản mới
          </button>
        </div>


      </div>
    </div>
  );
};
