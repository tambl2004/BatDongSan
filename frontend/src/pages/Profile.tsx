import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Property } from '../types/property';
import { PropertyCard } from '../components/property/PropertyCard';
import { Heart, User, Mail, Shield, Phone, FileText, ArrowLeft } from 'lucide-react';
import { navigate } from '../router/router';

export interface ProfileProps {
  favoriteProperties?: Property[];
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  onSelectProperty?: (property: Property) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  favoriteProperties = [],
  favorites = [],
  onToggleFavorite = () => {},
  onSelectProperty = (prop) => navigate(`/property/${prop.id}`),
}) => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'info'>('favorites');

  return (
    <main className="min-h-[80vh] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-emerald-500/20">
              {user?.fullName?.charAt(0) || <User className="w-10 h-10" />}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                {user?.fullName || (isAuthenticated ? 'Thành viên BĐS' : 'Khách vãng lai')}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {user?.email || 'Chưa đăng nhập'}
                </span>
                {user?.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {user.phone}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Shield className="w-3 h-3" />
                  {user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về trang chủ</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'favorites'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Tin đã lưu ({favoriteProperties.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'info'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Thông tin cá nhân</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'favorites' ? (
          favoriteProperties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center max-w-lg mx-auto">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">Chưa có bất động sản nào được lưu</h3>
              <p className="text-sm text-slate-500 mb-4">
                Nhấn vào biểu tượng trái tim trên bất kỳ tin đăng nào để lưu và theo dõi tại đây.
              </p>
              <button
                onClick={() => navigate('/properties')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition shadow-sm"
              >
                Khám phá nhà đất
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isFavorite={favorites.includes(prop.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProperty={onSelectProperty}
                />
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-xl space-y-4">
            <h3 className="text-base font-bold text-slate-800">Chi tiết tài khoản</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-slate-500">Họ và tên:</div>
              <div className="font-semibold text-slate-800">{user?.fullName || '---'}</div>
              <div className="text-slate-500">Email:</div>
              <div className="font-semibold text-slate-800">{user?.email || '---'}</div>
              <div className="text-slate-500">Số điện thoại:</div>
              <div className="font-semibold text-slate-800">{user?.phone || '---'}</div>
              <div className="text-slate-500">Vai trò:</div>
              <div className="font-semibold text-emerald-700 uppercase">{user?.role || 'User'}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;
