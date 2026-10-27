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
  price: number;
  priceFormatted: string;
  pricePerM2?: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floors?: number;
  frontWidth?: number;
  roadWidth?: string;
  furnitureStatus?: string;
  balconyDirection?: string;
  planningStatus?: string;
  legalStatus?: string;
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
  direction?: string;
  legalDocument?: string;
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
