export type PropertyType = 'apartment' | 'house' | 'villa' | 'land' | 'commercial';

export type ListingType = 'sale' | 'rent';

export type PropertyStatus = 'available' | 'sold' | 'pending';

export interface PropertyAgent {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  role: string;
}

export interface NearbyAmenity {
  name: string;
  distance: string;
  type: 'transport' | 'education' | 'shopping' | 'hospital' | 'park';
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number; // in VND
  priceFormatted: string; // e.g. "18.5 tỷ" or "28 triệu/tháng"
  pricePerM2?: string; // e.g. "66.07 triệu/m²"
  area: number; // in m2
  bedrooms: number;
  bathrooms: number;
  floors?: number;
  frontWidth?: number; // mặt tiền mét
  roadWidth?: string; // e.g. "14m ô tô tránh nhau"
  furnitureStatus?: string; // e.g. "Full nội thất Ý cao cấp"
  balconyDirection?: string; // Hướng ban công
  planningStatus?: string; // Tình trạng quy hoạch
  legalStatus?: string; // Chi tiết pháp lý
  nearbyAmenities?: NearbyAmenity[];
  propertyType: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  address: string;
  ward: string;
  district: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  features: string[];
  agent: PropertyAgent;
  featured: boolean;
  yearBuilt?: number;
  direction?: string; // Đông, Tây, Nam, Bắc, Đông Nam, etc.
  legalDocument?: string; // Sổ hồng, Sổ đỏ, HĐMB
  createdAt: string;
}

export interface PropertyFilterParams {
  city?: string;
  district?: string;
  propertyType?: PropertyType;
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'area_desc';
  page?: number;
  limit?: number;
}
