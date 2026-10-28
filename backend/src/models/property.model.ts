import { Property, PropertyType, ListingType, PropertyStatus } from '../types/property';

export interface PropertySchema extends Property {
  viewCount?: number;
  isVerified?: boolean;
}

export const PropertyModel = {
  tableName: 'properties',
  primaryKey: 'id',
  indexes: ['city', 'district', 'propertyType', 'listingType', 'price', 'area']
};
