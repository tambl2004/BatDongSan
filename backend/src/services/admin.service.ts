import { propertyService } from './property.service';
import { inquiryService } from './inquiry.service';
import { authService } from './auth.service';

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

export class AdminService {
  private settings: SystemSettings = {
    siteName: 'BatDongSan.vn — Sàn Giao Dịch BĐS & PropTech Cao Cấp',
    hotline: '1900 6868 - 0918 889 999',
    supportEmail: 'contact@batdongsan.vn',
    officeAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
    autoApprovePost: false,
    maxFreePostDays: 30,
    featuredPostFeePerDay: 50000,
    maintenanceMode: false
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
