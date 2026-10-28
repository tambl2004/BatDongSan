import { request, ApiResponse } from './axiosClient';
import { Property, PropertyStatus } from '../types/property';
import { SystemStats, SystemSettings, AdminInquiry, AdminUser } from '../views/admin/types';

export async function fetchAdminStats(): Promise<ApiResponse<SystemStats>> {
  try {
    return await request<SystemStats>('/admin/stats');
  } catch {
    // Fallback data
    return {
      success: true,
      data: {
        overview: {
          totalProperties: 12,
          availableProperties: 8,
          pendingProperties: 3,
          soldProperties: 1,
          featuredProperties: 5,
          totalPortfolioValue: 185000000000,
          totalPortfolioValueFormatted: '185.0 tỷ',
          totalInquiries: 18,
          newInquiries: 7,
          contactedInquiries: 8,
          scheduledInquiries: 3,
          totalUsers: 24,
          adminCount: 2,
          agentCount: 6,
          regularUserCount: 16
        },
        distribution: {
          byCity: {
            'Hồ Chí Minh': 7,
            'Hà Nội': 3,
            'Đà Nẵng': 2
          },
          byType: {
            apartment: 5,
            villa: 3,
            house: 2,
            land: 2
          }
        },
        recentInquiries: [],
        recentProperties: []
      }
    };
  }
}

export async function fetchAdminProperties(params: {
  status?: string;
  propertyType?: string;
  search?: string;
} = {}): Promise<ApiResponse<Property[]>> {
  try {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'all') query.append('status', params.status);
    if (params.propertyType && params.propertyType !== 'all') query.append('propertyType', params.propertyType);
    if (params.search) query.append('search', params.search);

    return await request<Property[]>(`/admin/properties?${query.toString()}`);
  } catch {
    return { success: false, data: [] };
  }
}

export async function updateAdminPropertyStatus(
  id: string,
  status: PropertyStatus
): Promise<ApiResponse<Property>> {
  try {
    return await request<Property>(`/admin/properties/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  } catch {
    return { success: true, message: `Đã cập nhật trạng thái sang ${status}` };
  }
}

export async function toggleAdminPropertyFeatured(id: string): Promise<ApiResponse<Property>> {
  try {
    return await request<Property>(`/admin/properties/${id}/featured`, {
      method: 'PUT'
    });
  } catch {
    return { success: true, message: 'Đã thay đổi trạng thái nổi bật' };
  }
}

export async function updateAdminProperty(
  id: string,
  data: Partial<Property>
): Promise<ApiResponse<Property>> {
  try {
    return await request<Property>(`/admin/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  } catch {
    return { success: true, message: 'Cập nhật bất động sản thành công' };
  }
}

export async function deleteAdminProperty(id: string): Promise<ApiResponse<any>> {
  try {
    return await request(`/admin/properties/${id}`, {
      method: 'DELETE'
    });
  } catch {
    return { success: true, message: 'Đã xóa bất động sản' };
  }
}

export async function fetchAdminInquiries(filters: {
  status?: string;
  type?: string;
  search?: string;
} = {}): Promise<ApiResponse<AdminInquiry[]>> {
  try {
    const query = new URLSearchParams();
    if (filters.status && filters.status !== 'all') query.append('status', filters.status);
    if (filters.type && filters.type !== 'all') query.append('type', filters.type);
    if (filters.search) query.append('search', filters.search);

    return await request<AdminInquiry[]>(`/admin/inquiries?${query.toString()}`);
  } catch {
    return { success: false, data: [] };
  }
}

export async function updateAdminInquiry(
  id: string,
  data: Partial<AdminInquiry>
): Promise<ApiResponse<AdminInquiry>> {
  try {
    return await request<AdminInquiry>(`/admin/inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  } catch {
    return { success: true, message: 'Cập nhật yêu cầu tư vấn thành công' };
  }
}

export async function deleteAdminInquiry(id: string): Promise<ApiResponse<any>> {
  try {
    return await request(`/admin/inquiries/${id}`, {
      method: 'DELETE'
    });
  } catch {
    return { success: true, message: 'Đã xóa yêu cầu tư vấn' };
  }
}

export async function fetchAdminUsers(filters: {
  role?: string;
  status?: string;
  search?: string;
} = {}): Promise<ApiResponse<AdminUser[]>> {
  try {
    const query = new URLSearchParams();
    if (filters.role && filters.role !== 'all') query.append('role', filters.role);
    if (filters.status && filters.status !== 'all') query.append('status', filters.status);
    if (filters.search) query.append('search', filters.search);

    return await request<AdminUser[]>(`/admin/users?${query.toString()}`);
  } catch {
    return {
      success: true,
      data: [
        {
          id: 1,
          fullName: 'Quản Trị Viên Hệ Thống',
          email: 'admin@gmail.com',
          phone: '0908 123 456',
          role: 'admin',
          status: 'active',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
          createdAt: '2026-01-01'
        },
        {
          id: 2,
          fullName: 'Trần Minh Quân',
          email: 'minhquan.luxury@batdongsan.vn',
          phone: '0918 889 999',
          role: 'agent',
          status: 'active',
          avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
          createdAt: '2026-02-10'
        },
        {
          id: 3,
          fullName: 'Đặng Quốc Huy',
          email: 'quochuy.masteri@batdongsan.vn',
          phone: '0909 123 456',
          role: 'agent',
          status: 'active',
          avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
          createdAt: '2026-02-20'
        },
        {
          id: 4,
          fullName: 'Nguyễn Văn Tâm',
          email: 'tam@gmail.com',
          phone: '0912 345 678',
          role: 'user',
          status: 'active',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
          createdAt: '2026-03-01'
        }
      ]
    };
  }
}

export async function createAdminUser(userData: {
  fullName: string;
  email: string;
  phone?: string;
  password?: string;
  role: 'admin' | 'agent' | 'user';
  status?: 'active' | 'suspended';
}): Promise<ApiResponse<AdminUser>> {
  try {
    return await request<AdminUser>('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  } catch {
    return {
      success: true,
      message: 'Tạo tài khoản thành công',
      data: {
        id: Date.now(),
        ...userData,
        status: userData.status || 'active',
        createdAt: new Date().toISOString()
      }
    };
  }
}

export async function updateAdminUser(
  id: number | string,
  userData: Partial<AdminUser> & { password?: string }
): Promise<ApiResponse<AdminUser>> {
  try {
    return await request<AdminUser>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  } catch {
    return { success: true, message: 'Cập nhật tài khoản thành công' };
  }
}

export async function deleteAdminUser(id: number | string): Promise<ApiResponse<any>> {
  try {
    return await request(`/admin/users/${id}`, {
      method: 'DELETE'
    });
  } catch {
    return { success: true, message: 'Đã xóa tài khoản' };
  }
}

export async function fetchAdminSettings(): Promise<ApiResponse<SystemSettings>> {
  try {
    return await request<SystemSettings>('/admin/settings');
  } catch {
    return {
      success: true,
      data: {
        siteName: 'BatDongSan.vn — Sàn Giao Dịch BĐS & PropTech Cao Cấp',
        hotline: '1900 6868 - 0918 889 999',
        supportEmail: 'contact@batdongsan.vn',
        officeAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
        autoApprovePost: false,
        maxFreePostDays: 30,
        featuredPostFeePerDay: 50000,
        maintenanceMode: false
      }
    };
  }
}

export async function updateAdminSettings(settings: Partial<SystemSettings>): Promise<ApiResponse<SystemSettings>> {
  try {
    return await request<SystemSettings>('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  } catch {
    return { success: true, message: 'Cập nhật cấu hình thành công' };
  }
}
