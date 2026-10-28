import { propertyService } from './property.service';
import { inquiryService } from './inquiry.service';
import { authService } from './auth.service';

export interface SystemSettings {
  // 1. General & Contact
  siteName: string;
  slogan?: string;
  hotline: string;
  supportEmail: string;
  officeAddress: string;
  workingHours?: string;
  maintenanceMode: boolean;
  maintenanceNotice?: string;

  // 2. Pricing & VietQR Payments
  autoApprovePost: boolean;
  maxFreePostDays: number;
  regularPostFeePerDay: number;
  vipSilverFeePerDay: number;
  vipGoldFeePerDay: number;
  vipDiamondFeePerDay: number;
  refreshPostFee: number;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  qrTransferSyntax: string;

  // 3. Notifications & Telegram
  notifyLeadTelegram: boolean;
  telegramBotToken?: string;
  telegramChatId?: string;
  notifyLeadEmail: boolean;
  adminNotificationEmail?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;

  // 4. SEO & Marketing
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  ogImageUrl?: string;
  facebookUrl?: string;
  zaloUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;

  // 5. Moderation & Anti-Spam
  maxDailyPostsPerUser: number;
  bannedKeywords: string;
  requirePhoneVerification: boolean;
  requireKycAgent: boolean;

  // Backwards compatibility
  featuredPostFeePerDay?: number;
}

export class AdminService {
  private settings: SystemSettings = {
    // 1. General
    siteName: 'BatDongSan.vn — Sàn Giao Dịch BĐS & PropTech Cao Cấp',
    slogan: 'Nền tảng giao dịch bất động sản minh bạch, ứng dụng công nghệ số hàng đầu Việt Nam',
    hotline: '1900 6868 - 0918 889 999',
    supportEmail: 'contact@batdongsan.vn',
    officeAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
    workingHours: '08:00 - 18:30 (Thứ 2 - Thứ 7)',
    maintenanceMode: false,
    maintenanceNotice: 'Hệ thống đang tiến hành bảo trì nâng cấp cụm máy chủ nhằm phục vụ quý khách tốt hơn. Vui lòng quay lại sau ít phút.',

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

  public getSystemStats() {
    const properties = propertyService.getAllPropertiesRaw();
    const inquiries = inquiryService.getInquiries();
    const users = authService.getAllUsers();

    // 1. Property Stats
    const totalProperties = properties.length;
    const availableProperties = properties.filter(p => p.status === 'available').length;
    const pendingProperties = properties.filter(p => p.status === 'pending').length;
    const soldProperties = properties.filter(p => p.status === 'sold').length;
    const featuredProperties = properties.filter(p => p.featured).length;

    // Total Portfolio Value (in VND)
    const totalPortfolioValue = properties.reduce((acc, p) => acc + (p.price || 0), 0);

    // Distribution by City
    const cityDistribution: Record<string, number> = {};
    properties.forEach(p => {
      const city = p.city || 'Khác';
      cityDistribution[city] = (cityDistribution[city] || 0) + 1;
    });

    // Distribution by Type
    const typeDistribution: Record<string, number> = {};
    properties.forEach(p => {
      typeDistribution[p.propertyType] = (typeDistribution[p.propertyType] || 0) + 1;
    });

    // 2. Inquiry Stats
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter(i => i.status === 'new').length;
    const contactedInquiries = inquiries.filter(i => i.status === 'contacted').length;
    const scheduledInquiries = inquiries.filter(i => i.status === 'scheduled').length;

    // 3. User Stats
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.role === 'admin').length;
    const agentCount = users.filter(u => u.role === 'agent').length;
    const regularUserCount = users.filter(u => u.role === 'user').length;

    return {
      overview: {
        totalProperties,
        availableProperties,
        pendingProperties,
        soldProperties,
        featuredProperties,
        totalPortfolioValue,
        totalPortfolioValueFormatted: `${(totalPortfolioValue / 1000000000).toFixed(1)} tỷ`,
        totalInquiries,
        newInquiries,
        contactedInquiries,
        scheduledInquiries,
        totalUsers,
        adminCount,
        agentCount,
        regularUserCount
      },
      distribution: {
        byCity: cityDistribution,
        byType: typeDistribution
      },
      recentInquiries: inquiries.slice(0, 5),
      recentProperties: properties.slice(0, 5)
    };
  }

  public getSettings(): SystemSettings {
    return this.settings;
  }

  public updateSettings(newSettings: Partial<SystemSettings>): SystemSettings {
    this.settings = {
      ...this.settings,
      ...newSettings
    };
    return this.settings;
  }
}

export const adminService = new AdminService();
