import React from 'react';
import { PropertyDetailPage } from '../../components/PropertyDetailPage';
import { Property } from '../../types/property';

interface PropertyDetailViewProps {
  property: Property;
  allProperties: Property[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = (props) => {
  return <PropertyDetailPage {...props} />;
};
