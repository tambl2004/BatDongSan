import React from 'react';
import { ListingView } from '../views/user/ListingView';
import { Property, PropertyFilterParams } from '../types/property';

export interface PropertiesPageProps {
  listingType: 'sale' | 'rent';
  properties: Property[];
  loading: boolean;
  totalCount: number;
  filters: PropertyFilterParams;
  favorites: string[];
  onChangeFilters: (newFilters: Partial<PropertyFilterParams>) => void;
  onResetFilters: () => void;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const Properties: React.FC<PropertiesPageProps> = (props) => {
  return <ListingView {...props} />;
};

export default Properties;
