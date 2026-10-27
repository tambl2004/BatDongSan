import { Property, PropertyFilterParams } from '../types/property';

const API_BASE = '/api';

export async function fetchProperties(params: PropertyFilterParams = {}): Promise<{ data: Property[]; total: number }> {
  try {
    const query = new URLSearchParams();
    if (params.city) query.append('city', params.city);
    if (params.district) query.append('district', params.district);
    if (params.propertyType) query.append('propertyType', params.propertyType);
    if (params.listingType) query.append('listingType', params.listingType);
    if (params.minPrice) query.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) query.append('maxPrice', params.maxPrice.toString());
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);
    if (params.page) query.append('page', params.page.toString());

    const res = await fetch(`${API_BASE}/properties?${query.toString()}`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return {
      data: json.data || [],
      total: json.meta?.total || 0
    };
  } catch (error) {
    console.warn('Backend API request failed, falling back to local dataset', error);
    return { data: [], total: 0 };
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    const res = await fetch(`${API_BASE}/properties/${id}`);
    if (!res.ok) throw new Error('Property not found');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export async function submitInquiry(data: {
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
  inquiryType: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
    };
  }
}

export async function fetchInquiries(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/inquiries`);
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.warn('Failed to fetch inquiries:', error);
    return [];
  }
}
