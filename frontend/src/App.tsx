import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Views - Separated into user, admin and auth
import { HomeView } from './views/user/HomeView';
import { ListingView } from './views/user/ListingView';
import { PropertyDetailView } from './views/user/PropertyDetailView';
import { FavoritesView } from './views/user/FavoritesView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { BlogView } from './views/user/blog/BlogView';
import { LoginView } from './views/auth/login';
import { RegisterView } from './views/auth/register';
import { ForgotPasswordView } from './views/auth/forgot-password';

import { Property, PropertyFilterParams, ListingType } from './types/property';
import { fetchProperties } from './services/api';
import { parseCurrentRoute, navigate, CurrentRoute } from './router/router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
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
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
      // Fallback local dataset matching backend
      const fallbackList: Property[] = [
        {
          id: 'bds-001',
          title: 'Căn hộ Penthouse Masteri Thảo Điền view trọn sông Sài Gòn & Landmark 81',
          description: 'Căn hộ Penthouse thông tầng cao cấp bậc nhất tại Masteri Thảo Điền (Tháp T5). Thiết kế phong cách Địa Trung Hải sang trọng với trần cao 6.2m, phòng khách kính tràn panorama 270 độ chiêm ngưỡng trọn vẹn vẻ đẹp sông Sài Gòn và pháo hoa Landmark 81. Bàn giao đầy đủ nội thất nhập khẩu thương hiệu Poliform & B&B Italia, hệ thống bếp đảo đá Marble tự nhiên, rạp chiếu phim mini gia đình, hồ bơi riêng sky pool trên sân thượng và thang máy bảo mật thẻ từ riêng lên thẳng căn hộ.',
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
          legalStatus: 'Sổ hồng lâu dài chính chủ, sẵn sàng công chứng sang tên ngay trong ngày',
          propertyType: 'apartment',
          listingType: 'sale',
          status: 'available',
          address: '159 Xa lộ Hà Nội, Phường Thảo Điền',
          ward: 'Thảo Điền',
          district: 'Thành phố Thủ Đức',
          city: 'Hồ Chí Minh',
          coordinates: { lat: 10.8037, lng: 106.7381 },
          images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
          ],
          features: [
            'Sổ hồng sở hữu lâu dài',
            'Hồ bơi Sky Pool riêng',
            'Nội thất Poliform nhập khẩu Ý',
            '2 Suất đậu ô tô định danh tầng hầm',
            'Thang máy thẻ từ bảo mật lên tận cửa',
            'Hệ thống Smarthome Crestron chuẩn Mỹ',
            'Phòng xông hơi đá muối Himalaya'
          ],
          nearbyAmenities: [
            { name: 'Ga Metro số 1 Bến Thành - Suối Tiên (Ga An Phú)', distance: '300m', type: 'transport' },
            { name: 'Trường Quốc tế Anh BIS & Trường Quốc tế Mỹ TAS', distance: '500m', type: 'education' },
            { name: 'Trung tâm thương mại Vincom Mega Mall Thảo Điền', distance: '350m', type: 'shopping' },
            { name: 'Bệnh viện Quốc tế Thảo Điền & Family Medical Practice', distance: '800m', type: 'hospital' },
            { name: 'Công viên bờ sông Thảo Điền & Bến du thuyền', distance: '600m', type: 'park' }
          ],
          agent: {
            name: 'Nguyễn Văn Tuấn',
            phone: '0908 123 456',
            email: 'tuan.nguyen@bds-premium.vn',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
            role: 'Chuyên gia BĐS Cao Cấp Thủ Đức'
          },
          featured: true,
          yearBuilt: 2021,
          direction: 'Đông Nam',
          legalDocument: 'Sổ hồng lâu dài chính chủ',
          createdAt: '2026-03-15T09:00:00Z'
        },
        {
          id: 'bds-002',
          title: 'Biệt thự đơn lập Vinhomes Riverside Hoa Sữa đẳng cấp ven hồ sinh thái',
          description: 'Biệt thự đơn lập kiến trúc tân cổ điển hoàng gia Pháp tại tiểu khu Hoa Sữa - Vinhomes Riverside Long Biên. Vị trí ven sông nhân tạo với mặt nước hồ sinh thái 12.4ha rộng mở sau nhà, cầu tàu cano riêng cập bến. Kết cấu 3.5 tầng có hầm rượu vang và garage 3 ô tô, nội thất gỗ óc chó tự nhiên nhập khẩu Bắc Mỹ, trần nhà dát vàng lá 18K tinh xảo. Khu compound khép kín với an ninh bảo vệ tuần tra 3 lớp 24/7.',
          price: 45000000000,
          priceFormatted: '45 tỷ',
          pricePerM2: '107.14 triệu/m²',
          area: 420,
          bedrooms: 5,
          bathrooms: 6,
          floors: 4,
          frontWidth: 18.0,
          roadWidth: 'Đường trục chính nội khu 14m vỉa hè 3.5m',
          furnitureStatus: 'Full nội thất gỗ óc chó Bắc Mỹ & Thiết bị Miele Đức',
          balconyDirection: 'Nam nhìn trực diện mặt hồ sinh thái',
          planningStatus: 'Đất ở sinh thái lâu dài thuộc quy hoạch đại đô thị Vinhomes Riverside',
          legalStatus: 'Sổ đỏ chính chủ, đất vuông vắn không lỗi phong thủy',
          propertyType: 'villa',
          listingType: 'sale',
          status: 'available',
          address: 'Đường Hoa Sữa, Khu đô thị Vinhomes Riverside',
          ward: 'Phúc Lợi',
          district: 'Quận Long Biên',
          city: 'Hà Nội',
          coordinates: { lat: 21.0456, lng: 105.9087 },
          images: [
            'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
          ],
          features: [
            'Sân vườn ven hồ sinh thái 12.4ha',
            'Hầm rượu vang & Rạp chiếu phim gia đình 4K',
            'Garage đỗ 3 ô tô trong nhà',
            'An ninh khép kín 3 lớp 24/7',
            'Hệ thống điều hòa trung tâm Daikin VRV',
            'Bến cano cập mạn sân sau'
          ],
          nearbyAmenities: [
            { name: 'Trung tâm ẩm thực & Hội nghị quốc tế Almaz', distance: '400m', type: 'shopping' },
            { name: 'Trường Liên cấp Quốc tế Vinschool & BIS Hà Nội', distance: '600m', type: 'education' },
            { name: 'Bệnh viện Đa khoa Quốc tế Vinmec Times City', distance: '4km', type: 'hospital' },
            { name: 'Sân Golf Long Biên 27 lỗ chuẩn PGA', distance: '1.8km', type: 'park' },
            { name: 'Cầu Vĩnh Tuy 2 & Nút giao Cổ Linh', distance: '1.5km', type: 'transport' }
          ],
          agent: {
            name: 'Trần Thị Thu Hà',
            phone: '0912 345 678',
            email: 'ha.tran@bds-luxury.vn',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
            role: 'Giám đốc Kinh doanh BĐS Triệu Đô Hà Nội'
          },
          featured: true,
          yearBuilt: 2022,
          direction: 'Nam',
          legalDocument: 'Sổ đỏ chính chủ cất két',
          createdAt: '2026-03-20T14:30:00Z'
        },
        {
          id: 'bds-003',
          title: 'Căn hộ 2PN hiện đại Lumiere Riverside An Phú view trọn công viên Metro',
          description: 'Căn hộ tầng cao tháp Tây Lumiere Riverside - kiệt tác xanh giữa lòng Thảo Điền do Masterise Homes phát triển. Thiết kế thông minh tối ưu từng mét vuông ánh sáng tự nhiên, ban công đón gió Đông Nam mát mẻ quanh năm. Bàn giao đầy đủ nội thất cao cấp thương hiệu Kohler, Bosch, sàn gỗ tự nhiên và kính hộp cách âm 3 lớp Low-E chạm sàn. Vị trí vàng nằm ngay mặt tiền Xa lộ Hà Nội, kết nối trực tiếp nhà ga số 7 của tuyến Metro Bến Thành - Suối Tiên.',
          price: 28000000,
          priceFormatted: '28 triệu/tháng',
          pricePerM2: '358.97 nghìn/m²/tháng',
          area: 78,
          bedrooms: 2,
          bathrooms: 2,
          floors: 1,
          roadWidth: 'Xa lộ Hà Nội 12 làn xe',
          furnitureStatus: 'Full nội thất mới 100% nhập khẩu Tây Ban Nha',
          balconyDirection: 'Đông Nam view sông & Landmark 81',
          planningStatus: 'Đất ở đô thị quy hoạch ổn định hoàn chỉnh',
          legalStatus: 'Hợp đồng cho thuê công chứng dài hạn (1 - 3 năm)',
          propertyType: 'apartment',
          listingType: 'rent',
          status: 'available',
          address: '259 Xa lộ Hà Nội, Phường An Phú',
          ward: 'An Phú',
          district: 'Thành phố Thủ Đức',
          city: 'Hồ Chí Minh',
          coordinates: { lat: 10.8015, lng: 106.7412 },
          images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
          ],
          features: [
            'Full nội thất cao cấp mới 100% chưa qua sử dụng',
            'Hồ bơi vô cực trên cao & Bể sục thủy lực',
            'Hành lang có điều hòa & Cửa khóa thông minh Yale',
            'Sát vách trạm Metro số 1 Bến Thành - Suối Tiên',
            'Phòng Gym & Yoga trang bị Technogym'
          ],
          nearbyAmenities: [
            { name: 'Ga Metro An Phú (Tuyến số 1)', distance: '100m', type: 'transport' },
            { name: 'Estella Place & Vincom Mega Mall', distance: '400m', type: 'shopping' },
            { name: 'Bệnh viện Quốc tế Mỹ AIH', distance: '1.2km', type: 'hospital' },
            { name: 'Trường Quốc tế Úc AIS An Phú', distance: '800m', type: 'education' },
            { name: 'Công viên trung tâm Thảo Điền', distance: '500m', type: 'park' }
          ],
          agent: {
            name: 'Lê Hoàng Nam',
            phone: '0988 765 432',
            email: 'nam.le@bds-vietnam.vn',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
            role: 'Tư vấn Cho thuê BĐS Cao Cấp'
          },
          featured: true,
          yearBuilt: 2023,
          direction: 'Đông',
          legalDocument: 'Hợp đồng dài hạn chính chủ',
          createdAt: '2026-03-22T08:15:00Z'
        }
      ];

      let filtered = [...fallbackList];
      if (activeListingType) {
        filtered = filtered.filter(p => p.listingType === activeListingType);
      }
      if (filters.city) {
        filtered = filtered.filter(p => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
      }
      if (filters.propertyType) {
        filtered = filtered.filter(p => p.propertyType === filters.propertyType);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.address.toLowerCase().includes(q));
      }
      setProperties(filtered);
      setTotalCount(filtered.length);
    }
    setLoading(false);
  }, [filters, activeListingType]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // Dynamic title based on route
  useEffect(() => {
    if (route.view === 'login') {
      document.title = 'Đăng Nhập Tài Khoản | batdongsan.vn';
    } else if (route.view === 'register') {
      document.title = 'Đăng Ký Tài Khoản Mới | batdongsan.vn';
    } else if (route.view === 'forgot-password') {
      document.title = 'Khôi Phục Mật Khẩu | batdongsan.vn';
    } else if (route.view === 'blog') {
      document.title = 'Blog & Cẩm Nang Bất Động Sản | batdongsan.vn';
    } else if (route.view === 'blog-detail') {
      document.title = 'Chi Tiết Bài Viết | Blog batdongsan.vn';
    } else if (route.view === 'sale') {
      document.title = 'Nhà Đất Bán Chính Chủ | batdongsan.vn';
    } else if (route.view === 'rent') {
      document.title = 'Nhà Đất Cho Thuê | batdongsan.vn';
    } else if (route.view === 'admin') {
      document.title = 'Cổng Quản Trị Hệ Thống | batdongsan.vn';
    } else if (route.view === 'favorites') {
      document.title = 'Bất Động Sản Đã Lưu | batdongsan.vn';
    } else {
      document.title = 'batdongsan.vn | Sàn Giao Dịch Bất Động Sản Cao Cấp';
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

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  // Determine active tab for navbar highlighting
  const activeNavbarTab: 'home' | 'sale' | 'rent' | 'blog' =
    route.view === 'blog' || route.view === 'blog-detail' ? 'blog' :
    route.view === 'sale' ? 'sale' :
    route.view === 'rent' ? 'rent' : 'home';

  const isAdminView = route.view === 'admin';

  // Dedicated Auth Views (/login, /register, /forgot-password)
  if (route.view === 'login') {
    return <LoginView redirectPath={route.redirect} />;
  }

  if (route.view === 'register') {
    return <RegisterView redirectPath={route.redirect} />;
  }

  if (route.view === 'forgot-password') {
    return <ForgotPasswordView />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
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
        isAdminView={isAdminView}
        onToggleAdminView={() => {
          if (isAdminView) navigate('/');
          else navigate('/admin');
        }}
        onOpenCreateListing={() => {
          if (!isAuthenticated) {
            navigate('/login?redirect=/dang-tin');
          } else {
            alert(`Cổng đăng tin chính chủ đã mở sẵn cho tài khoản: ${user?.fullName}`);
          }
        }}
      />

      {/* Main View Switcher driven by Router URL */}
      {route.view === 'admin' ? (
        /* ADMIN PORTAL: Admin Dashboard View (/admin) - Role Protected */
        isAdmin ? (
          <AdminDashboardView
            properties={properties}
            onBackToUserView={() => navigate('/')}
            onSelectProperty={handleSelectProperty}
          />
        ) : (
          <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              maxWidth: '520px',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <ShieldAlert size={48} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Yêu Cầu Quyền Quản Trị Viên
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Khu vực quản trị chỉ dành riêng cho tài khoản Quản trị viên hệ thống (<strong>admin@gmail.com</strong>). Bạn cần đăng nhập bằng tài khoản Admin để truy cập.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => navigate('/login?redirect=/admin')}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <LogIn size={16} />
                  <span>Đăng nhập tài khoản Admin</span>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <ArrowLeft size={16} />
                  <span>Quay về trang chủ</span>
                </button>
              </div>
            </div>
          </div>
        )
      ) : route.view === 'property-detail' ? (
        /* USER PORTAL: Dedicated Property Detail View (/chi-tiet-bds?id=...) */
        <PropertyDetailView
          property={
            properties.find(p => p.id === route.propertyId) ||
            selectedProperty ||
            properties[0]
          }
          allProperties={properties}
          isFavorite={favorites.includes(route.propertyId || selectedProperty?.id || '')}
          onToggleFavorite={toggleFavorite}
          onBack={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              navigate('/');
            }
          }}
          onSelectProperty={handleSelectProperty}
        />
      ) : route.view === 'favorites' ? (
        /* USER PORTAL: Favorites View (/yeu-thich) */
        <FavoritesView
          favoriteProperties={favoriteProperties}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectProperty={handleSelectProperty}
          onBackToHome={() => navigate('/')}
        />
      ) : route.view === 'blog-detail' ? (
        /* USER PORTAL: Blog Detail View (/blog-detail) */
        <BlogView
          properties={properties}
          isDetailView={true}
          selectedPostId={route.postId}
          onSelectProperty={handleSelectProperty}
        />
      ) : route.view === 'blog' ? (
        /* USER PORTAL: Blog List View (/blog) */
        <BlogView
          properties={properties}
          isDetailView={false}
          onSelectProperty={handleSelectProperty}
        />
      ) : route.view === 'sale' || route.view === 'rent' ? (
        /* USER PORTAL: Listing View (/nha-dat-ban, /nha-dat-cho-thue) */
        <ListingView
          listingType={route.view}
          properties={properties}
          loading={loading}
          totalCount={totalCount}
          filters={filters}
          favorites={favorites}
          onChangeFilters={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
          onResetFilters={() => setFilters({ sort: 'newest' })}
          onToggleFavorite={toggleFavorite}
          onSelectProperty={handleSelectProperty}
        />
      ) : (
        /* USER PORTAL: Home Portal View (/) */
        <HomeView
          onSearch={handleHeroSearch}
          onNavigateToListing={handleNavigateToListing}
        />
      )}

      {/* Reorganized Clean Footer */}
      <Footer onNavigateToBlog={() => navigate('/blog')} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
