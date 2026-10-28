import { Property, PropertyFilterParams } from '../types/property';
import { request } from './axiosClient';

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

    const json = await request<{ data: Property[]; meta?: { total: number } }>(`/properties?${query.toString()}`);
    return {
      data: (json.data as any) || [],
      total: json.meta?.total || (json.data as any)?.length || 0
    };
  } catch (error) {
    return { data: [], total: 0 };
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    const json = await request<Property>(`/properties/${id}`);
    return json.data || null;
  } catch (error) {
    return null;
  }
}
