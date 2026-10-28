import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Building2,
  DollarSign,
  Bell,
  ShieldCheck,
  Send,
  QrCode,
  Globe,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  ShieldAlert,
  CreditCard,
  MessageSquare,
  Search,
  Share2
} from 'lucide-react';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminApi';
import { SystemSettings } from '../types';
import { notify } from '../../../utils/toast';

type SettingsTab = 'general' | 'pricing' | 'notifications' | 'seo' | 'moderation';

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const defaultSettings: SystemSettings = {
    // 1. General & Contact
    siteName: 'BatDongSan.vn — Sàn Giao Dịch BĐS & PropTech Cao Cấp',
    slogan: 'Nền tảng giao dịch bất động sản minh bạch, ứng dụng công nghệ số hàng đầu Việt Nam',
    hotline: '1900 6868 - 0918 889 999',
    supportEmail: 'contact@batdongsan.vn',
    officeAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
    workingHours: '08:00 - 18:30 (Thứ 2 - Thứ 7)',
    maintenanceMode: false,
    maintenanceNotice: 'Hệ thống đang tiến hành bảo trì nâng cấp cụm máy chủ. Vui lòng quay lại sau ít phút.',

    // 2. Pricing & Payments
    autoApprovePost: false,
    maxFreePostDays: 30,
    regularPostFeePerDay: 5000,
    vipSilverFeePerDay: 20000,
    vipGoldFeePerDay: 50000,
    vipDiamondFeePerDay: 100000,
    refreshPostFee: 10000,
    bankName: 'Ngân hàng TMCP Ngoại Thương VN (Vietcombank)',
    bankAccount: '1029384756',
    bankAccountName: 'CONG TY CP CONG NGHE BATDONGSAN VN',
    qrTransferSyntax: 'BDS NAP {USER_ID}',
    featuredPostFeePerDay: 50000,

    // 3. Notifications & Telegram
    notifyLeadTelegram: true,
    telegramBotToken: '7123456789:AAHq_sample_token_bds_vn',
    telegramChatId: '-1002345678912',
    notifyLeadEmail: true,
    adminNotificationEmail: 'lead-alert@batdongsan.vn',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'system@batdongsan.vn',

    // 4. SEO & Marketing
    metaTitle: 'BatDongSan.vn | Sàn Giao Dịch Mua Bán Nhà Đất & Cho Thuê BĐS Cao Cấp',
    metaDescription: 'Hệ thống thông tin bất động sản chính chủ toàn quốc. Mua bán căn hộ chung cư, biệt thự, nhà phố, shophouse và cho thuê với pháp lý minh bạch 100%.',
    metaKeywords: 'bat dong san, nha dat, mua ban nha dat, cho thue can ho, biet thu, vinhomes, masteri, phu my hung',
    googleAnalyticsId: 'G-BDS8899PRO',
    facebookPixelId: '982734102938475',
    ogImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    facebookUrl: 'https://facebook.com/batdongsan.vn.official',
    zaloUrl: 'https://zalo.me/0918889999',
    youtubeUrl: 'https://youtube.com/@batdongsan_vn',
    tiktokUrl: 'https://tiktok.com/@batdongsan.vn',

    // 5. Moderation & Anti-Spam
    maxDailyPostsPerUser: 5,
    bannedKeywords: 'lừa đảo, cọc ảo, đa cấp, sex, đâm chém, cờ bạc, giả mạo, chiếm đoạt',
    requirePhoneVerification: true,
    requireKycAgent: false
  };

  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);

  useEffect(() => {
    fetchAdminSettings().then(res => {
      if (res.data) {
        const d = res.data;
        setSettings({
          ...defaultSettings,
          ...d,
          vipGoldFeePerDay: d.vipGoldFeePerDay || d.featuredPostFeePerDay || 50000
        });
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...settings,
      featuredPostFeePerDay: settings.vipGoldFeePerDay
    };
    await updateAdminSettings(payload);
    setLoading(false);
    setSaved(true);
    notify.success('Đã lưu thành công cấu hình hệ thống!');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Khôi phục toàn bộ cấu hình về tham số đề xuất ban đầu?')) {
      setSettings(defaultSettings);
      notify.info('Đã khôi phục cài đặt về giá trị mặc định');
    }
  };

  const handleTestTelegram = () => {
    if (!settings.telegramBotToken || !settings.telegramChatId) {
      notify.warning('Vui lòng nhập Bot Token và Chat ID trước khi gửi tin nhắn thử nghiệm!');
      return;
    }
    notify.success('Đã gửi tin nhắn mẫu tới nhóm Telegram quản trị viên thành công!');
  };

  const tabs = [
    { key: 'general' as const, label: 'Chung & Liên hệ', icon: Building2 },
    { key: 'pricing' as const, label: 'Bảng giá & VietQR', icon: DollarSign },
    { key: 'notifications' as const, label: 'Thông báo & Telegram', icon: Bell },
    { key: 'seo' as const, label: 'SEO & Tiếp thị số', icon: Globe },
    { key: 'moderation' as const, label: 'Kiểm duyệt & Chống Spam', icon: ShieldCheck }
  ];

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
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    transition: 'border-color 0.15s ease'
  };

  const sectionCardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 1. Header Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '1.25rem 1.75rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#ecfdf5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #a7f3d0'
          }}>
            <Settings size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Cấu hình & Cài đặt hệ thống
            </h3>
            <p style={{ fontSize: '0.785rem', color: '#64748b', margin: '2px 0 0 0' }}>
              Trung tâm điều phối tham số sàn giao dịch, bảng giá, nạp tiền VietQR và tự động hóa
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleResetDefaults}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#64748b',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={14} />
            <span>Khôi phục mặc định</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#059669',
              color: '#ffffff',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 4px rgba(5, 150, 105, 0.25)',
              transition: 'all 0.15s ease'
            }}
          >
            <Save size={15} />
            <span>{loading ? 'Đang lưu...' : 'Lưu cài đặt'}</span>
          </button>
        </div>
      </div>

      {/* 2. Horizontal Navigation Tabs */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexWrap: 'wrap',
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: '1 1 auto',
                minWidth: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? '#ecfdf5' : 'transparent',
                color: isActive ? '#065f46' : '#64748b',
                fontWeight: isActive ? 700 : 600,
                fontSize: '0.825rem',
                transition: 'all 0.15s ease',
                outline: 'none'
              }}
            >
              <Icon size={16} color={isActive ? '#059669' : '#94a3b8'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Configuration Content */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* TAB 1: THÔNG TIN CHUNG & LIÊN HỆ */}
        {activeTab === 'general' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.25rem' }}>
            {/* Cột trái: Thông tin thương hiệu */}
            <div style={sectionCardStyle}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={18} color="#059669" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Thông tin sàn & Thương hiệu
                </h4>
              </div>

              <div>
                <label style={labelStyle}>Tên thương hiệu sàn giao dịch</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  style={inputStyle}
                  placeholder="BatDongSan.vn"
                />
              </div>

              <div>
                <label style={labelStyle}>Khẩu hiệu / Slogan thương hiệu</label>
                <input
                  type="text"
                  value={settings.slogan || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, slogan: e.target.value }))}
                  style={inputStyle}
                  placeholder="Nền tảng giao dịch BĐS minh bạch số 1..."
                />
              </div>

              <div>
                <label style={labelStyle}>Địa chỉ văn phòng trụ sở chính</label>
                <input
                  type="text"
                  value={settings.officeAddress}
                  onChange={(e) => setSettings(prev => ({ ...prev, officeAddress: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Khung giờ làm việc tiếp đón</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={settings.workingHours || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, workingHours: e.target.value }))}
                    style={{ ...inputStyle, paddingLeft: '34px' }}
                    placeholder="08:00 - 18:30 (Thứ 2 - Thứ 7)"
                  />
                  <Clock size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            {/* Cột phải: Kênh liên hệ & Chế độ bảo trì */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={sectionCardStyle}>
                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={18} color="#059669" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Kênh tiếp nhận & Hotline
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
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
                    <label style={labelStyle}>Email tiếp nhận hỗ trợ</label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => setSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Maintenance Box */}
              <div style={{
                ...sectionCardStyle,
                backgroundColor: settings.maintenanceMode ? '#fef2f2' : '#ffffff',
                border: `1px solid ${settings.maintenanceMode ? '#fca5a5' : '#e2e8f0'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldAlert size={18} color={settings.maintenanceMode ? '#dc2626' : '#64748b'} />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: settings.maintenanceMode ? '#991b1b' : '#0f172a', margin: 0 }}>
                    Chế độ bảo trì hệ thống (Maintenance Mode)
                  </h4>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                    style={{ width: '18px', height: '18px', accentColor: '#dc2626' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: settings.maintenanceMode ? '#991b1b' : '#334155' }}>
                      Kích hoạt tạm ngừng cổng giao dịch phía người dùng
                    </div>
                    <div style={{ fontSize: '0.725rem', color: '#64748b' }}>
                      Chỉ cho phép quản trị viên truy cập để nâng cấp máy chủ hoặc bảo dưỡng dữ liệu
                    </div>
                  </div>
                </label>

                {settings.maintenanceMode && (
                  <div>
                    <label style={{ ...labelStyle, color: '#991b1b' }}>Thông báo bảo trì hiển thị với khách hàng</label>
                    <textarea
                      rows={2}
                      value={settings.maintenanceNotice || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, maintenanceNotice: e.target.value }))}
                      style={{ ...inputStyle, border: '1px solid #f87171' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BẢNG GIÁ & VIETQR THANH TOÁN */}
        {activeTab === 'pricing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Gói tin đăng */}
            <div style={sectionCardStyle}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Định mức Phí dịch vụ & Phân hạng Gói tin đăng
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
                    Áp dụng cho môi giới và khách hàng khi đăng tin và nâng cấp thứ hạng hiển thị
                  </p>
                </div>
                <CreditCard size={20} color="#059669" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <label style={labelStyle}>Phí tin Thường (VNĐ / ngày)</label>
                  <input
                    type="number"
                    step="1000"
                    value={settings.regularPostFeePerDay || 0}
                    onChange={(e) => setSettings(prev => ({ ...prev, regularPostFeePerDay: parseInt(e.target.value) || 0 }))}
                    style={inputStyle}
                  />
                  <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px', display: 'block' }}>0đ = Miễn phí đăng tin</span>
                </div>

                <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <label style={labelStyle}>Phí VIP Bạc (VNĐ / ngày)</label>
                  <input
                    type="number"
                    step="5000"
                    value={settings.vipSilverFeePerDay || 20000}
                    onChange={(e) => setSettings(prev => ({ ...prev, vipSilverFeePerDay: parseInt(e.target.value) || 20000 }))}
                    style={inputStyle}
                  />
                  <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px', display: 'block' }}>Ưu tiên hiển thị trang danh sách</span>
                </div>

                <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #fde68a', backgroundColor: '#fffbeb' }}>
                  <label style={{ ...labelStyle, color: '#b45309' }}>Phí VIP Vàng (VNĐ / ngày)</label>
                  <input
                    type="number"
                    step="5000"
                    value={settings.vipGoldFeePerDay || 50000}
                    onChange={(e) => setSettings(prev => ({ ...prev, vipGoldFeePerDay: parseInt(e.target.value) || 50000 }))}
                    style={{ ...inputStyle, border: '1px solid #fcd34d' }}
                  />
                  <span style={{ fontSize: '0.7rem', color: '#b45309', marginTop: '4px', display: 'block' }}>Ghim trang chủ & huy hiệu HOT</span>
                </div>

                <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #c7d2fe', backgroundColor: '#eef2ff' }}>
                  <label style={{ ...labelStyle, color: '#4338ca' }}>Phí VIP Kim Cương (VNĐ / ngày)</label>
                  <input
                    type="number"
                    step="10000"
                    value={settings.vipDiamondFeePerDay || 100000}
                    onChange={(e) => setSettings(prev => ({ ...prev, vipDiamondFeePerDay: parseInt(e.target.value) || 100000 }))}
                    style={{ ...inputStyle, border: '1px solid #a5b4fc' }}
                  />
                  <span style={{ fontSize: '0.7rem', color: '#4338ca', marginTop: '4px', display: 'block' }}>Vị trí độc quyền đỉnh bảng</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Phí đẩy tin / làm mới (VNĐ / lượt)</label>
                  <input
                    type="number"
                    step="2000"
                    value={settings.refreshPostFee || 10000}
                    onChange={(e) => setSettings(prev => ({ ...prev, refreshPostFee: parseInt(e.target.value) || 10000 }))}
                    style={inputStyle}
                  />
                </div>

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
              </div>

              <div style={{
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <input
                  type="checkbox"
                  id="autoApprove"
                  checked={settings.autoApprovePost}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoApprovePost: e.target.checked }))}
                  style={{ width: '16px', height: '16px', accentColor: '#059669' }}
                />
                <label htmlFor="autoApprove" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                  Tự động duyệt tin đăng đối với Môi giới đã xác minh huy hiệu uy tín (KYC)
                </label>
              </div>
            </div>

            {/* Tài khoản thụ hưởng VietQR (Chia 2 cột: Cấu hình + Thẻ Preview) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.25rem' }}>
              {/* Cột trái: Form nhập thông tin */}
              <div style={sectionCardStyle}>
                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <QrCode size={18} color="#059669" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Thông số tài khoản VietQR thụ hưởng
                  </h4>
                </div>

                <div>
                  <label style={labelStyle}>Tên ngân hàng thụ hưởng</label>
                  <input
                    type="text"
                    value={settings.bankName}
                    onChange={(e) => setSettings(prev => ({ ...prev, bankName: e.target.value }))}
                    style={inputStyle}
                    placeholder="Vietcombank / Techcombank / MBBank"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Số tài khoản ngân hàng</label>
                  <input
                    type="text"
                    value={settings.bankAccount}
                    onChange={(e) => setSettings(prev => ({ ...prev, bankAccount: e.target.value }))}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Tên chủ tài khoản (In hoa không dấu)</label>
                  <input
                    type="text"
                    value={settings.bankAccountName}
                    onChange={(e) => setSettings(prev => ({ ...prev, bankAccountName: e.target.value }))}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Cú pháp nội dung chuyển khoản tự động</label>
                  <input
                    type="text"
                    value={settings.qrTransferSyntax}
                    onChange={(e) => setSettings(prev => ({ ...prev, qrTransferSyntax: e.target.value }))}
                    style={inputStyle}
                    placeholder="BDS NAP {USER_ID}"
                  />
                  <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '3px', display: 'block' }}>
                    Hệ thống tự động thay `{'{USER_ID}'}` bằng ID thành viên
                  </span>
                </div>
              </div>

              {/* Cột phải: Thẻ ngân hàng ảo xem trước */}
              <div style={{
                ...sectionCardStyle,
                background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 12px rgba(6, 78, 59, 0.25)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <QrCode size={20} color="#a7f3d0" />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.02em' }}>THẺ NẠP TIỀN VIETQR</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>
                    TỰ ĐỘNG KHỚP LỆNH
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem' }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    <QrCode size={78} color="#0f172a" />
                    <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>QUÉT MÃ QR</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '0.725rem', color: '#a7f3d0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {settings.bankName}
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.05em', fontFamily: 'monospace' }}>
                      {settings.bankAccount}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ecfdf5' }}>
                      {settings.bankAccountName}
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: 'auto',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0,0,0,0.25)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#d1fae5' }}>Nội dung chuyển khoản mẫu:</span>
                  <code style={{ color: '#fef08a', fontWeight: 800, fontSize: '0.8rem' }}>
                    {settings.qrTransferSyntax.replace('{USER_ID}', '8899')}
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THÔNG BÁO & BOT TELEGRAM LEAD */}
        {activeTab === 'notifications' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.25rem' }}>
            {/* Cột trái: Cấu hình Telegram & Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={sectionCardStyle}>
                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Send size={18} color="#2563eb" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Telegram Bot Báo Lead Tức thì
                  </h4>
                </div>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={settings.notifyLeadTelegram}
                    onChange={(e) => setSettings(prev => ({ ...prev, notifyLeadTelegram: e.target.checked }))}
                    style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af' }}>
                      Bật thông báo tự động vào nhóm Telegram sale
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                      Nhận thông tin khách hàng ngay khi có yêu cầu tư vấn / hẹn xem nhà
                    </div>
                  </div>
                </label>

                <div>
                  <label style={labelStyle}>Telegram Bot Token</label>
                  <input
                    type="text"
                    value={settings.telegramBotToken || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, telegramBotToken: e.target.value }))}
                    style={inputStyle}
                    placeholder="7123456789:AAHq_sample_token..."
                  />
                </div>

                <div>
                  <label style={labelStyle}>Telegram Group Chat ID</label>
                  <input
                    type="text"
                    value={settings.telegramChatId || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, telegramChatId: e.target.value }))}
                    style={inputStyle}
                    placeholder="-1002345678912"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleTestTelegram}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid #bfdbfe',
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Send size={14} />
                    <span>Gửi tin nhắn mẫu kiểm tra Bot</span>
                  </button>
                </div>
              </div>

              {/* Cấu hình Email SMTP */}
              <div style={sectionCardStyle}>
                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={18} color="#059669" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Cấu hình Thông báo Email & SMTP
                  </h4>
                </div>

                <div>
                  <label style={labelStyle}>Email nhận cảnh báo Admin</label>
                  <input
                    type="email"
                    value={settings.adminNotificationEmail || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, adminNotificationEmail: e.target.value }))}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>SMTP Host</label>
                    <input
                      type="text"
                      value={settings.smtpHost || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                      style={inputStyle}
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>SMTP Port</label>
                    <input
                      type="number"
                      value={settings.smtpPort || 587}
                      onChange={(e) => setSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) || 587 }))}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Live Preview giao diện Telegram */}
            <div style={{
              ...sectionCardStyle,
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: '1px solid #1e293b',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} color="#38bdf8" />
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>MÔ PHỎNG TIN NHẮN TELEGRAM BOT</span>
                </div>
                <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#0284c7', fontWeight: 700 }}>
                  LIVE PREVIEW
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                {/* Message Bubble */}
                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '10px',
                  padding: '14px',
                  border: '1px solid #334155',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.8rem',
                  lineHeight: 1.5
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 800, color: '#38bdf8' }}>🤖 BatDongSan Alert Bot</span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Vừa xong</span>
                  </div>

                  <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.85rem' }}>
                    🚨 [LEAD MỚI] YÊU CẦU HẸN XEM NHÀ THỰC TẾ
                  </div>

                  <div style={{ color: '#cbd5e1' }}>
                    <div>👤 <b>Khách hàng:</b> Nguyễn Hoàng Nam</div>
                    <div>📞 <b>Số điện thoại:</b> 0909 888 777 (Zalo)</div>
                    <div>🏢 <b>BĐS:</b> Penthouse Masteri Thảo Điền (18.5 tỷ)</div>
                    <div>⏰ <b>Lịch hẹn:</b> Thứ Bảy, 09:30 AM</div>
                    <div>📝 <b>Ghi chú:</b> Cần chuyên viên mang theo bản vẽ và sổ hồng bản cứng</div>
                    <div>⚡ <b>Sale phụ trách:</b> Đặng Quốc Huy</div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '0.7rem', fontWeight: 700 }}>
                      📞 Gọi ngay cho khách
                    </span>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', backgroundColor: '#334155', color: '#e2e8f0', fontSize: '0.7rem', fontWeight: 700 }}>
                      Xem chi tiết trên CRM
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.725rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  💡 <b>Lợi ích:</b> Đội ngũ sale nhận thông báo trong 1 giây qua Telegram trên điện thoại, đảm bảo tốc độ gọi lại cho khách hàng dưới 5 phút, tăng tỷ lệ chốt deal lên 40%.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SEO & MẠNG XÃ HỘI */}
        {activeTab === 'seo' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.25rem' }}>
            {/* Cột trái: Cấu hình Thẻ Meta SEO */}
            <div style={sectionCardStyle}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} color="#059669" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Thẻ Meta SEO Tổng quan (Index Google)
                </h4>
              </div>

              <div>
                <label style={labelStyle}>Tiêu đề SEO Trang chủ (Meta Title)</label>
                <input
                  type="text"
                  value={settings.metaTitle}
                  onChange={(e) => setSettings(prev => ({ ...prev, metaTitle: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Mô tả SEO Trang chủ (Meta Description - 150-160 ký tự)</label>
                <textarea
                  rows={3}
                  value={settings.metaDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, metaDescription: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Từ khóa tìm kiếm (Meta Keywords, phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={settings.metaKeywords}
                  onChange={(e) => setSettings(prev => ({ ...prev, metaKeywords: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Link ảnh chia sẻ Mạng xã hội (OG:Image URL)</label>
                <input
                  type="text"
                  value={settings.ogImageUrl || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, ogImageUrl: e.target.value }))}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Cột phải: Mã Analytics & Mạng xã hội */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={sectionCardStyle}>
                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={18} color="#059669" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Mã đo lường & Chuyển đổi số
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Google Analytics ID (GA4)</label>
                    <input
                      type="text"
                      value={settings.googleAnalyticsId || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                      style={inputStyle}
                      placeholder="G-BDS8899PRO"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Facebook Pixel ID</label>
                    <input
                      type="text"
                      value={settings.facebookPixelId || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, facebookPixelId: e.target.value }))}
                      style={inputStyle}
                      placeholder="982734102938475"
                    />
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div style={sectionCardStyle}>
                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Share2 size={18} color="#059669" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Kênh Truyền Thông Mạng Xã Hội Chính Thức
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Fanpage Facebook</label>
                    <input
                      type="text"
                      value={settings.facebookUrl || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, facebookUrl: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Kênh Zalo Official</label>
                    <input
                      type="text"
                      value={settings.zaloUrl || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, zaloUrl: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Kênh YouTube Review Nhà</label>
                    <input
                      type="text"
                      value={settings.youtubeUrl || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Kênh TikTok PropTech</label>
                    <input
                      type="text"
                      value={settings.tiktokUrl || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, tiktokUrl: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: KIỂM DUYỆT & CHỐNG SPAM */}
        {activeTab === 'moderation' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.25rem' }}>
            {/* Cột trái: Hạn mức & Từ cấm */}
            <div style={sectionCardStyle}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#059669" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Hạn mức Tin đăng & Bộ lọc Từ cấm
                </h4>
              </div>

              <div>
                <label style={labelStyle}>Hạn mức đăng tin tối đa mỗi ngày (Tin / Tài khoản Thường)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={settings.maxDailyPostsPerUser || 5}
                  onChange={(e) => setSettings(prev => ({ ...prev, maxDailyPostsPerUser: parseInt(e.target.value) || 5 }))}
                  style={{ ...inputStyle, maxWidth: '240px' }}
                />
                <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '3px', display: 'block' }}>
                  Giúp ngăn chặn việc sử dụng công cụ tự động spam tin hàng loạt làm loãng thị trường
                </span>
              </div>

              <div>
                <label style={labelStyle}>Bộ lọc từ khóa cấm (Blacklist Keywords - phân cách bằng dấu phẩy)</label>
                <textarea
                  rows={4}
                  value={settings.bannedKeywords || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, bannedKeywords: e.target.value }))}
                  style={inputStyle}
                  placeholder="lừa đảo, cọc ảo, đa cấp, sex, đâm chém..."
                />
                <span style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '3px', display: 'block' }}>
                  Tin đăng chứa từ khóa này sẽ tự động bị chặn hoặc bắt buộc chuyển vào danh sách chờ duyệt thủ công.
                </span>
              </div>
            </div>

            {/* Cột phải: Chính sách xác thực KYC */}
            <div style={sectionCardStyle}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#059669" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Chính sách Xác thực Người dùng (KYC)
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={settings.requirePhoneVerification}
                    onChange={(e) => setSettings(prev => ({ ...prev, requirePhoneVerification: e.target.checked }))}
                    style={{ width: '18px', height: '18px', accentColor: '#059669' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                      Bắt buộc xác thực số điện thoại qua OTP trước khi đăng tin
                    </div>
                    <div style={{ fontSize: '0.725rem', color: '#64748b', marginTop: '2px' }}>
                      Đảm bảo 100% người đăng tin là người dùng thật có số điện thoại chính chủ
                    </div>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={settings.requireKycAgent}
                    onChange={(e) => setSettings(prev => ({ ...prev, requireKycAgent: e.target.checked }))}
                    style={{ width: '18px', height: '18px', accentColor: '#059669' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                      Yêu cầu CCCD / Thẻ hành nghề môi giới trước khi cấp huy hiệu Môi giới xác thực
                    </div>
                    <div style={{ fontSize: '0.725rem', color: '#64748b', marginTop: '2px' }}>
                      Nâng cao độ tin cậy và sự an tâm tuyệt đối cho khách hàng khi giao dịch
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Action Button Bar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
            {saved ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700 }}>
                <CheckCircle2 size={16} color="#059669" />
                Đã lưu cấu hình thành công!
              </span>
            ) : (
              <>
                <Sparkles size={16} color="#059669" />
                <span>Mọi thay đổi cấu hình sẽ có hiệu lực ngay lập tức sau khi lưu</span>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#059669',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)',
              transition: 'all 0.15s ease'
            }}
          >
            <Save size={16} />
            <span>{loading ? 'Đang lưu thiết lập...' : 'Lưu toàn bộ cài đặt'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
