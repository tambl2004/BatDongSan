import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../../types/property';
import { PropertyCard } from './PropertyCard';

interface PropertySliderProps {
  title?: string;
  subtitle?: string;
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertySlider: React.FC<PropertySliderProps> = ({
  title,
  subtitle,
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!properties || properties.length === 0) return null;

  return (
    <div className="w-full my-8">
      {(title || subtitle) && (
        <div className="flex items-end justify-between mb-5">
          <div>
            {title && <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>}
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"
              aria-label="Cuộn sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"
              aria-label="Cuộn sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {properties.map((property) => (
          <div
            key={property.id}
            className="w-[280px] sm:w-[320px] flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <PropertyCard
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProperty={onSelectProperty}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySlider;
