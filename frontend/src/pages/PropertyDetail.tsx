import React from 'react';
import { PropertyDetailView } from '../views/user/PropertyDetailView';
import { Property } from '../types/property';

export interface PropertyDetailProps {
  property: Property;
  allProperties: Property[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = (props) => {
  return <PropertyDetailView {...props} />;
};

export default PropertyDetail;
