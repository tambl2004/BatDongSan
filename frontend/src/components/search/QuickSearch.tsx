import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign } from 'lucide-react';

interface QuickSearchProps {
  onSearch: (filters: {
    searchTerm?: string;
    type?: string;
    priceRange?: string;
  }) => void;
  className?: string;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({ onSearch, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      type,
      priceRange,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-xl border border-slate-100 p-3 md:p-4 grid grid-cols-1 md:grid-cols-4 gap-3 ${className}`}
    >
      <div className="relative flex items-center">
        <MapPin className="w-5 h-5 text-emerald-600 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nhập địa điểm, dự án..."
          className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 placeholder-slate-400"
        />
      </div>

      <div className="relative flex items-center">
        <Building className="w-5 h-5 text-emerald-600 absolute left-3.5 pointer-events-none" />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full pl-11 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 appearance-none cursor-pointer"
        >
          <option value="all">Tất cả loại BĐS</option>
          <option value="house">Nhà phố / Biệt thự</option>
          <option value="apartment">Căn hộ / Chung cư</option>
          <option value="land">Đất nền dự án</option>
          <option value="villa">Biệt thự nghỉ dưỡng</option>
        </select>
      </div>

      <div className="relative flex items-center">
        <DollarSign className="w-5 h-5 text-emerald-600 absolute left-3.5 pointer-events-none" />
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full pl-11 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 appearance-none cursor-pointer"
        >
          <option value="all">Mức giá: Tất cả</option>
          <option value="under2">Dưới 2 tỷ</option>
          <option value="2to5">2 - 5 tỷ</option>
          <option value="5to10">5 - 10 tỷ</option>
          <option value="above10">Trên 10 tỷ</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98]"
      >
        <Search className="w-4 h-4" />
        <span>Tìm kiếm</span>
      </button>
    </form>
  );
};

export default QuickSearch;
