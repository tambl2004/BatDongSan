import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { navigate } from '../router/router';
import {
  Building2,
  Upload,
  PlusCircle,
  MapPin,
  DollarSign,
  Maximize2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ManagePost: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [listingType, setListingType] = useState<'sale' | 'rent'>('sale');
  const [propertyType, setPropertyType] = useState('apartment');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Hồ Chí Minh');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Yêu cầu đăng nhập</h2>
          <p className="text-sm text-slate-600 mb-6">
            Bạn cần đăng nhập tài khoản để thực hiện đăng tin bất động sản chính chủ.
          </p>
          <button
            onClick={() => navigate('/login?redirect=/dang-tin')}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-md shadow-emerald-600/20"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-[85vh] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Cổng đăng tin chính chủ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Đăng tin Bất Động Sản Mới
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Đăng bởi: <span className="font-semibold text-slate-700">{user?.fullName || 'Chính chủ'}</span> • Tiếp cận hàng triệu khách hàng tiềm năng trên hệ thống BatDongSan.vn
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl border border-emerald-100 p-8 sm:p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Đăng tin thành công!</h2>
            <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm">
              Tin đăng của bạn đã được tiếp nhận và gửi tới ban quản trị để thẩm định pháp lý trước khi hiển thị công khai.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
              >
                Đăng thêm tin khác
              </button>
              <button
                onClick={() => navigate('/properties')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition shadow-sm"
              >
                Xem danh sách tin
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Hình thức & Loại BĐS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hình thức giao dịch</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setListingType('sale')}
                    className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition ${
                      listingType === 'sale'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Bán nhà đất
                  </button>
                  <button
                    type="button"
                    onClick={() => setListingType('rent')}
                    className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition ${
                      listingType === 'rent'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Cho thuê
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Loại hình bất động sản</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                >
                  <option value="apartment">Căn hộ / Chung cư</option>
                  <option value="house">Nhà riêng / Nhà phố</option>
                  <option value="villa">Biệt thự liền kề</option>
                  <option value="land">Đất nền dự án / Thổ cư</option>
                </select>
              </div>
            </div>

            {/* Tiêu đề */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Tiêu đề tin đăng <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="VD: Bán căn hộ 2PN Vinhomes Grand Park view công viên 36ha..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-2.5 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 placeholder-slate-400"
              />
            </div>

            {/* Vị trí */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tỉnh / Thành phố</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                >
                  <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Quận / Huyện</label>
                <input
                  required
                  type="text"
                  placeholder="VD: Quận 1, Quận 7, TP. Thủ Đức"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full py-2.5 px-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Địa chỉ chi tiết</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    required
                    type="text"
                    placeholder="Số nhà, tên đường..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Thông số BĐS: Giá, Diện tích, PN, WC */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mức giá</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    required
                    type="text"
                    placeholder="VD: 3.5 tỷ / 15 triệu"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Diện tích (m²)</label>
                <div className="relative">
                  <Maximize2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    required
                    type="number"
                    placeholder="VD: 85"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Số phòng ngủ</label>
                <input
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full py-2.5 px-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Số phòng tắm</label>
                <input
                  type="number"
                  min="0"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full py-2.5 px-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Mô tả chi tiết */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mô tả chi tiết</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả các tiện ích xung quanh, hướng nhà, tình trạng sổ đỏ, pháp lý..."
                className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 placeholder-slate-400"
              />
            </div>

            {/* Upload ảnh placeholder */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors cursor-pointer bg-slate-50/50">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">Kéo thả ảnh hoặc bấm để chọn ảnh BĐS</p>
              <p className="text-xs text-slate-400 mt-1">Định dạng JPG, PNG, WebP (Tối đa 10 ảnh, mỗi ảnh dưới 5MB)</p>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-emerald-600/20 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Đăng tin ngay</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default ManagePost;
