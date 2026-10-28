import { useState, useEffect, useCallback } from 'react';
import { Property, PropertyFilterParams } from '../types/property';
import { fetchProperties } from '../services/propertyApi';

export function useProperties(initialFilters: PropertyFilterParams = {}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filters, setFilters] = useState<PropertyFilterParams>(initialFilters);

  const loadProperties = useCallback(async () => {
    setLoading(true);
    const res = await fetchProperties(filters);
    setProperties(res.data);
    setTotalCount(res.total);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  return {
    properties,
    loading,
    totalCount,
    filters,
    setFilters,
    reload: loadProperties
  };
}
