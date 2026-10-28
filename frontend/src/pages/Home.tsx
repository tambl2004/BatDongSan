import React from 'react';
import { HomeView } from '../views/user/HomeView';
import { ListingType } from '../types/property';
import { navigate } from '../router/router';

interface HomeProps {
  onSearch?: (filters: {
    search: string;
    city: string;
    propertyType: string;
    listingType: ListingType;
  }) => void;
  onNavigateToListing?: (tab: 'sale' | 'rent', city?: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  onSearch = (filters) => {
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.city) params.set('city', filters.city);
    if (filters.propertyType && filters.propertyType !== 'all') params.set('type', filters.propertyType);
    if (filters.listingType) params.set('listing', filters.listingType);
    navigate(`/properties?${params.toString()}`);
  },
  onNavigateToListing = (tab, city) => {
    const params = new URLSearchParams();
    if (tab) params.set('listing', tab);
    if (city) params.set('city', city);
    navigate(`/properties?${params.toString()}`);
  },
}) => {
  return <HomeView onSearch={onSearch} onNavigateToListing={onNavigateToListing} />;
};

export default Home;
