import { mockProperties } from '../data/mockProperties';
import { Property, PropertyFilterParams } from '../types/property';

export class PropertyService {
  private properties: Property[] = [...mockProperties];

  public getAllProperties(params: PropertyFilterParams) {
    let result = [...this.properties];

    if (params.city) {
      result = result.filter(p => p.city.toLowerCase().includes(params.city!.toLowerCase()));
    }

    if (params.district) {
      result = result.filter(p => p.district.toLowerCase().includes(params.district!.toLowerCase()));
    }

    if (params.propertyType) {
      result = result.filter(p => p.propertyType === params.propertyType);
    }

    if (params.listingType) {
      result = result.filter(p => p.listingType === params.listingType);
    }

    if (params.minPrice !== undefined) {
      result = result.filter(p => p.price >= params.minPrice!);
    }

    if (params.maxPrice !== undefined) {
      result = result.filter(p => p.price <= params.maxPrice!);
    }

    if (params.minArea !== undefined) {
      result = result.filter(p => p.area >= params.minArea!);
    }

    if (params.maxArea !== undefined) {
      result = result.filter(p => p.area <= params.maxArea!);
    }

    if (params.bedrooms !== undefined) {
      result = result.filter(p => p.bedrooms >= params.bedrooms!);
    }

    if (params.search) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (params.sort) {
      switch (params.sort) {
        case 'price_asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'area_desc':
          result.sort((a, b) => b.area - a.area);
          break;
        case 'newest':
        default:
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    const total = result.length;
    const page = params.page ? Number(params.page) : 1;
    const limit = params.limit ? Number(params.limit) : 10;
    const startIndex = (page - 1) * limit;
    const paginated = result.slice(startIndex, startIndex + limit);

    return {
      data: paginated,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  public getPropertyById(id: string): Property | undefined {
    return this.properties.find(p => p.id === id);
  }

  public getFeaturedProperties(limit: number = 4): Property[] {
    return this.properties.filter(p => p.featured).slice(0, limit);
  }

  public getLocations() {
    const locationsMap: Record<string, Set<string>> = {};

    this.properties.forEach(p => {
      if (!locationsMap[p.city]) {
        locationsMap[p.city] = new Set<string>();
      }
      locationsMap[p.city].add(p.district);
    });

    return Object.entries(locationsMap).map(([city, districts]) => ({
      city,
      districts: Array.from(districts)
    }));
  }

  public createProperty(propertyData: Omit<Property, 'id' | 'createdAt'>): Property {
    const newProperty: Property = {
      ...propertyData,
      id: `bds-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    this.properties.unshift(newProperty);
    return newProperty;
  }
}

export const propertyService = new PropertyService();
