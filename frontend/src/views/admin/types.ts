import { Property } from '../../types/property';
import { UserRole } from '../../types/user';

export type AdminTab = 'dashboard' | 'properties' | 'moderation' | 'blog' | 'inquiries' | 'users' | 'settings';

export type InquiryStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';

export interface AdminInquiry {
  id: string;
  propertyId?: string;
  fullName: string;
  phone: string;
  email?: string;
  propertyTitle: string;
  inquiryType: 'viewing' | 'consultation' | 'price_offer' | 'valuation' | 'loan' | string;
  status: InquiryStatus;
  message?: string;
  notes?: string;
  createdAt: string;
}

export interface AdminUser {
  id: number | string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'inactive';
  createdAt?: string;
}

export interface SystemStats {
  overview: {
    totalProperties: number;
    availableProperties: number;
    pendingProperties: number;
    soldProperties: number;
    featuredProperties: number;
    totalPortfolioValue: number;
    totalPortfolioValueFormatted: string;
    totalInquiries: number;
    newInquiries: number;
    contactedInquiries: number;
    scheduledInquiries: number;
    totalUsers: number;
    adminCount: number;
    agentCount: number;
    regularUserCount: number;
  };
  distribution: {
    byCity: Record<string, number>;
    byType: Record<string, number>;
  };
  recentInquiries: AdminInquiry[];
  recentProperties: Property[];
}

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
