import React from 'react';
import { CurrentRoute, navigate } from './router';
import { Property, PropertyFilterParams, ListingType } from '../types/property';
import {
  Home,
  Properties,
  PropertyDetail,
  Profile,
  ManagePost,
  Admin,
  Login,
  Register,
  ForgotPassword,
  Blog
} from '../pages';

export interface AppRoutesProps {
  route: CurrentRoute;
  properties: Property[];
  loading: boolean;
  totalCount: number;
  filters: PropertyFilterParams;
  favorites: string[];
  selectedProperty: Property | null;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onChangeFilters: (newFilters: Partial<PropertyFilterParams>) => void;
  onResetFilters: () => void;
  onHeroSearch: (params: {
    search: string;
    city: string;
    propertyType: string;
    listingType: ListingType;
  }) => void;
  onNavigateToListing: (tab: 'sale' | 'rent', city?: string) => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({
  route,
  properties,
  loading,
  totalCount,
  filters,
  favorites,
  selectedProperty,
  onToggleFavorite,
  onSelectProperty,
  onChangeFilters,
  onResetFilters,
  onHeroSearch,
  onNavigateToListing,
}) => {
  // 1. Auth pages (Standalone Layouts)
  if (route.view === 'login') {
    return <Login redirectPath={route.redirect} />;
  }

  if (route.view === 'register') {
    return <Register redirectPath={route.redirect} />;
  }

  if (route.view === 'forgot-password') {
    return <ForgotPassword />;
  }

  // 2. Admin portal (Dedicated Full Screen Layout)
  if (route.view === 'admin') {
    return (
      <Admin
        properties={properties}
        onBackToUserView={() => navigate('/')}
        onSelectProperty={onSelectProperty}
      />
    );
  }

  // 3. User Portal Views
  if (route.view === 'property-detail') {
    const currentProperty =
      properties.find((p) => p.id === route.propertyId) ||
      selectedProperty ||
      properties[0];

    return (
      <PropertyDetail
        property={currentProperty}
        allProperties={properties}
        isFavorite={favorites.includes(route.propertyId || selectedProperty?.id || '')}
        onToggleFavorite={onToggleFavorite}
        onBack={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            navigate('/');
          }
        }}
        onSelectProperty={onSelectProperty}
      />
    );
  }

  if (route.view === 'profile' || route.view === 'favorites') {
    const favoriteList = properties.filter((p) => favorites.includes(p.id));
    return (
      <Profile
        favoriteProperties={favoriteList}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onSelectProperty={onSelectProperty}
      />
    );
  }

  if (route.view === 'manage-post') {
    return <ManagePost />;
  }

  if (route.view === 'blog' || route.view === 'blog-detail') {
    return (
      <Blog
        properties={properties}
        isDetailView={route.view === 'blog-detail'}
        selectedPostId={route.postId}
        onSelectProperty={onSelectProperty}
      />
    );
  }

  if (route.view === 'sale' || route.view === 'rent' || route.view === 'properties') {
    return (
      <Properties
        listingType={route.view === 'rent' ? 'rent' : 'sale'}
        properties={properties}
        loading={loading}
        totalCount={totalCount}
        filters={filters}
        favorites={favorites}
        onChangeFilters={onChangeFilters}
        onResetFilters={onResetFilters}
        onToggleFavorite={onToggleFavorite}
        onSelectProperty={onSelectProperty}
      />
    );
  }

  // Default Home
  return (
    <Home
      onSearch={onHeroSearch}
      onNavigateToListing={onNavigateToListing}
    />
  );
};

export default AppRoutes;
