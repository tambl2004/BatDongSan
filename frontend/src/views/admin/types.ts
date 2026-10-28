import { Property } from '../../types/property';
import { UserRole } from '../../types/user';

export type AdminTab = 'dashboard' | 'properties' | 'inquiries' | 'users' | 'settings';

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
  siteName: string;
  hotline: string;
  supportEmail: string;
  officeAddress: string;
  autoApprovePost: boolean;
  maxFreePostDays: number;
  featuredPostFeePerDay: number;
  maintenanceMode: boolean;
}
