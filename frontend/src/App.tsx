import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, Footer } from './components/layout';
import { AppRoutes } from './routes/AppRoutes';
import { Property, PropertyFilterParams, ListingType } from './types/property';
import { fetchProperties } from './services/api';
import { parseCurrentRoute, navigate, CurrentRoute } from './routes/router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './utils/toast';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Router state
  const [route, setRoute] = useState<CurrentRoute>(() => parseCurrentRoute());

  // Listen to browser navigation and router events
  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(parseCurrentRoute());
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('app-route-change', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('app-route-change', handleRouteChange);
    };
  }, []);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bds_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filters, setFilters] = useState<PropertyFilterParams>({
    sort: 'newest'
  });

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('bds_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      if (isFav) {
        notify.info('Đã xóa khỏi danh sách yêu thích');
        return prev.filter(item => item !== id);
      } else {
        notify.success('Đã lưu bất động sản vào danh sách yêu thích!');
        return [...prev, id];
      }
    });
  };

  const activeListingType = route.view === 'sale' ? 'sale' : route.view === 'rent' ? 'rent' : undefined;

  const loadProperties = useCallback(async () => {
    setLoading(true);
    const queryParams: PropertyFilterParams = { ...filters };
    if (activeListingType) {
      queryParams.listingType = activeListingType;
    }

    const res = await fetchProperties(queryParams);
    if (res.data && res.data.length > 0) {
      setProperties(res.data);
      setTotalCount(res.total);
    } else {
      // Fallback local dataset
      const fallbackList: Property[] = [
        {
          id: 'bds-001',
          title: 'Căn hộ Penthouse Masteri Thảo Điền view trọn sông Sài Gòn & Landmark 81',
          description: 'Căn hộ Penthouse thông tầng cao cấp bậc nhất tại Masteri Thảo Điền (Tháp T5). Thiết kế phong cách Địa Trung Hải sang trọng với trần cao 6.2m, phòng khách kính tràn panorama 270 độ chiêm ngưỡng trọn vẹn vẻ đẹp sông Sài Gòn và pháo hoa Landmark 81.',
          price: 18500000000,
          priceFormatted: '18.5 tỷ',
          pricePerM2: '66.07 triệu/m²',
          area: 280,
          bedrooms: 4,
          bathrooms: 4,
          floors: 2,
          frontWidth: 16.5,
          roadWidth: 'Xa lộ Hà Nội 12 làn xe + Đường nội khu 16m',
          furnitureStatus: 'Full nội thất cao cấp nhập khẩu Ý (Poliform & Minotti)',
          balconyDirection: 'Đông Nam ngắm hoàng hôn sông Sài Gòn',
          planningStatus: 'Đất ở đô thị (ODT) quy hoạch ổn định lâu dài, không dính quy hoạch lộ giới',
          legalStatus: 'Sổ hồng riêng chính chủ, sẵn sàng công chứng ngay',
          direction: 'Đông Nam',
          city: 'Hồ Chí Minh',
          district: 'TP. Thủ Đức (Quận 2 cũ)',
          ward: 'Phường Thảo Điền',
          address: '159 Xa lộ Hà Nội, Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh',
          coordinates: { lat: 10.8016, lng: 106.7383 },
          propertyType: 'apartment',
          listingType: 'sale',
          status: 'available',
          featured: true,
          createdAt: '2026-03-24',
          images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
          ],
          features: [
            'Hồ bơi riêng Sky Pool',
            'Sân vườn riêng Panorama 360 độ',
            'Thang máy thẻ từ bảo mật tận cửa',
            'Chỗ đậu xe ô tô định danh hầm B1'
          ],
          agent: {
            name: 'Đặng Quốc Huy (Chuyên Viên BĐS Masteri)',
            phone: '0909 123 456',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
            email: 'quochuy.masteri@batdongsan.vn',
            role: 'Chuyên viên cao cấp'
          }
        },
        {
          id: 'bds-002',
          title: 'Biệt thự đơn lập Chateau Phú Mỹ Hưng kiến trúc Tân Cổ Điển ven sông cảnh quan',
          description: 'Tuyệt phẩm biệt thự đơn lập Chateau - lâu đài tráng lệ ven sông tại Phú Mỹ Hưng, Quận 7. Diện tích khuôn viên 510m², sân vườn rộng lớn bao quanh ôm trọn khúc sông cảnh quan tĩnh lặng.',
          price: 92000000000,
          priceFormatted: '92 tỷ',
          pricePerM2: '180.39 triệu/m²',
          area: 510,
          bedrooms: 5,
          bathrooms: 6,
          floors: 3,
          frontWidth: 20,
          roadWidth: 'Trục đường nội khu Chateau 18m có vỉa hè cây xanh bóng mát',
          furnitureStatus: 'Nội thất gỗ óc chó Bắc Mỹ nguyên khối kết hợp đá cẩm thạch Ý',
          balconyDirection: 'Nam nhìn thẳng ra bến du thuyền và công viên ven sông',
          planningStatus: 'Đất biệt thự sinh thái biệt lập Phú Mỹ Hưng, an ninh 24/7 tuyệt đối',
          legalStatus: 'Sổ hồng lâu dài đứng tên cá nhân, hoàn công đầy đủ 100%',
          direction: 'Nam',
          city: 'Hồ Chí Minh',
          district: 'Quận 7',
          ward: 'Phường Tân Phú',
          address: 'Khu biệt thự lâu đài Chateau, Đường 19, Phú Mỹ Hưng, Quận 7, TP. Hồ Chí Minh',
          coordinates: { lat: 10.7225, lng: 106.7192 },
          propertyType: 'villa',
          listingType: 'sale',
          status: 'available',
          featured: true,
          createdAt: '2026-03-22',
          images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
          ],
          features: [
            'Bến du thuyền tư nhân liền kề',
            'Hầm rượu vang nhiệt độ chuẩn châu Âu',
            'Hệ thống an ninh 4 lớp thẻ từ chuyên biệt'
          ],
          agent: {
            name: 'Trần Minh Quân (Giám Đốc BĐS Cao Cấp Nam Sài Gòn)',
            phone: '0918 889 999',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
            email: 'minhquan.luxury@batdongsan.vn',
            role: 'Giám đốc chi nhánh'
          }
        }
      ];
      setProperties(fallbackList);
      setTotalCount(fallbackList.length);
    }
    setLoading(false);
  }, [filters, activeListingType]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // Update Page Title based on Route
  useEffect(() => {
    if (route.view === 'login') {
      document.title = 'Đăng Nhập Tài Khoản | GreenNest';
    } else if (route.view === 'register') {
      document.title = 'Đăng Ký Tài Khoản Mới | GreenNest';
    } else if (route.view === 'forgot-password') {
      document.title = 'Khôi Phục Mật Khẩu | GreenNest';
    } else if (route.view === 'blog') {
      document.title = 'Blog & Cẩm Nang Bất Động Sản | GreenNest';
    } else if (route.view === 'blog-detail') {
      document.title = 'Chi Tiết Bài Viết | Blog GreenNest';
    } else if (route.view === 'sale') {
      document.title = 'Nhà Đất Bán Chính Chủ | GreenNest';
    } else if (route.view === 'rent') {
      document.title = 'Nhà Đất Cho Thuê | GreenNest';
    } else if (route.view === 'admin') {
      document.title = 'Cổng Quản Trị Hệ Thống | GreenNest';
    } else if (route.view === 'favorites' || route.view === 'profile') {
      document.title = 'Trang Cá Nhân & Bất Động Sản Đã Lưu | GreenNest';
    } else if (route.view === 'manage-post') {
      document.title = 'Cổng Đăng Tin BĐS Chính Chủ | GreenNest';
    } else {
      document.title = 'GreenNest — Sàn Giao Dịch Bất Động Sản Cao Cấp';
    }
  }, [route.view]);

  const handleHeroSearch = (searchFilters: {
    search: string;
    city: string;
    propertyType: string;
    listingType: ListingType;
  }) => {
    setFilters(prev => ({
      ...prev,
      search: searchFilters.search || undefined,
      city: searchFilters.city || undefined,
      propertyType: (searchFilters.propertyType as any) || undefined
    }));
    navigate(searchFilters.listingType === 'rent' ? '/nha-dat-cho-thue' : '/nha-dat-ban');
  };

  const handleNavigateToListing = (tab: 'sale' | 'rent', city?: string) => {
    if (city) {
      setFilters(prev => ({ ...prev, city }));
    }
    navigate(tab === 'rent' ? '/nha-dat-cho-thue' : '/nha-dat-ban');
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    navigate('/chi-tiet-bds?id=' + property.id);
  };

  // Determine active tab for navbar highlighting
  const activeNavbarTab: 'home' | 'sale' | 'rent' | 'blog' =
    route.view === 'blog' || route.view === 'blog-detail' ? 'blog' :
    route.view === 'sale' ? 'sale' :
    route.view === 'rent' ? 'rent' : 'home';

  const isStandaloneLayout =
    route.view === 'login' ||
    route.view === 'register' ||
    route.view === 'forgot-password' ||
    route.view === 'admin';

  if (isStandaloneLayout) {
    return (
      <AppRoutes
        route={route}
        properties={properties}
        loading={loading}
        totalCount={totalCount}
        filters={filters}
        favorites={favorites}
        selectedProperty={selectedProperty}
        onToggleFavorite={toggleFavorite}
        onSelectProperty={handleSelectProperty}
        onChangeFilters={(newFilters) => {
          setFilters(prev => ({ ...prev, ...newFilters }));
          notify.info('Đã cập nhật tiêu chí lọc BĐS');
        }}
        onResetFilters={() => {
          setFilters({ sort: 'newest' });
          notify.info('Đã đặt lại toàn bộ bộ lọc tìm kiếm');
        }}
        onHeroSearch={handleHeroSearch}
        onNavigateToListing={handleNavigateToListing}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <Navbar
        favoriteCount={favorites.length}
        onOpenFavorites={() => navigate('/yeu-thich')}
        activeTab={activeNavbarTab}
        setActiveTab={(tab) => {
          if (tab === 'home') navigate('/');
          else if (tab === 'sale') navigate('/nha-dat-ban');
          else if (tab === 'rent') navigate('/nha-dat-cho-thue');
          else if (tab === 'blog') navigate('/blog');
        }}
        isAdminView={false}
        onToggleAdminView={() => navigate('/admin')}
        onOpenCreateListing={() => {
          if (!isAuthenticated) {
            navigate('/login?redirect=/dang-tin');
          } else {
            navigate('/dang-tin');
          }
        }}
      />

      {/* Main Dynamic View via Centralized AppRoutes */}
      <div className="flex-1">
        <AppRoutes
          route={route}
          properties={properties}
          loading={loading}
          totalCount={totalCount}
          filters={filters}
          favorites={favorites}
          selectedProperty={selectedProperty}
          onToggleFavorite={toggleFavorite}
          onSelectProperty={handleSelectProperty}
          onChangeFilters={(newFilters) => {
            setFilters(prev => ({ ...prev, ...newFilters }));
            notify.info('Đã cập nhật tiêu chí lọc BĐS');
          }}
          onResetFilters={() => {
            setFilters({ sort: 'newest' });
            notify.info('Đã đặt lại toàn bộ bộ lọc tìm kiếm');
          }}
          onHeroSearch={handleHeroSearch}
          onNavigateToListing={handleNavigateToListing}
        />
      </div>

      {/* Footer */}
      <Footer onNavigateToBlog={() => navigate('/blog')} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  );
};

export default App;
