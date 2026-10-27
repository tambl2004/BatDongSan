import { Property } from '../types/property';

export const mockProperties: Property[] = [
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
    coordinates: {
      lat: 10.8037,
      lng: 106.7381
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', // Ngoại thất / Toàn cảnh
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', // Phòng khách thông tầng
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', // Bếp & Bàn ăn
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', // Phòng ngủ Master
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', // Phòng tắm Master chuẩn 5 sao
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'  // Ban công / Hồ bơi trên cao
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
    coordinates: {
      lat: 21.0456,
      lng: 105.9087
    },
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', // Biệt thự bên ngoài
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', // Phòng khách thông tầng
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80', // Bếp ăn tân cổ điển
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', // Phòng ngủ hoàng gia
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', // Phòng tắm bồn sục Jacuzzi
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'  // Sân vườn ven hồ
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
    coordinates: {
      lat: 10.8015,
      lng: 106.7412
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', // Phòng khách sáng sủa
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', // Phòng ăn & Bếp đảo
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', // Phòng ngủ Master hiện đại
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=80', // Phòng ngủ nhỏ / Làm việc
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', // Phòng tắm thiết bị Kohler
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'  // Hồ bơi vô cực trên không
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
  },
  {
    id: 'bds-004',
    title: 'Nhà phố thương mại Shophouse mặt tiền 7.5m đường Trần Duy Hưng',
    description: 'Tòa nhà mặt phố kinh doanh đắc địa tọa lạc ngay đoạn đẹp nhất đường Trần Duy Hưng, Cầu Giấy. Kết cấu 6 tầng nổi + 1 tầng hầm để xe, trang bị thang máy kính tải trọng 630kg nhập khẩu Mitsubishi Nhật Bản. Mặt tiền rộng 7.5m cực kỳ lý tưởng làm trụ sở ngân hàng, thẩm mỹ viện quốc tế, showroom công nghệ hoặc phòng khám nha khoa cao cấp. Hiện đang có hợp đồng thuê dài hạn dòng tiền 95 triệu/tháng.',
    price: 38000000000,
    priceFormatted: '38 tỷ',
    pricePerM2: '345.45 triệu/m²',
    area: 110,
    bedrooms: 6,
    bathrooms: 7,
    floors: 7,
    frontWidth: 7.5,
    roadWidth: 'Đường đôi Trần Duy Hưng 40m vỉa hè 6m',
    furnitureStatus: 'Bàn giao hoàn thiện cơ bản, thang máy kính & PCCC tiêu chuẩn',
    balconyDirection: 'Tây Bắc mặt tiền thông thoáng',
    planningStatus: 'Đất ở đô thị ODT lâu dài, chỉ giới đường đỏ ổn định',
    legalStatus: 'Sổ đỏ vuông vắn trước sau như một, sẵn sàng công chứng sang tên',
    propertyType: 'commercial',
    listingType: 'sale',
    status: 'available',
    address: 'Số 88 Trần Duy Hưng, Phường Trung Hòa',
    ward: 'Trung Hòa',
    district: 'Quận Cầu Giấy',
    city: 'Hà Nội',
    coordinates: {
      lat: 21.0094,
      lng: 105.7989
    },
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', // Mặt tiền tòa nhà
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', // Kiến trúc kính hiện đại
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', // Sảnh văn phòng tầng 1
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80', // Không gian làm việc thông sàn
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', // Phòng họp giám đốc
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'  // Khu WC cao cấp từng tầng
    ],
    features: [
      'Mặt tiền 7.5m vỉa hè rộng 6m kinh doanh cực đỉnh',
      'Thang máy kính Mitsubishi tải 630kg êm ái',
      'Hệ thống PCCC tự động đã nghiệm thu',
      'Tầng hầm để được 2 ô tô và 30 xe máy',
      'Dòng tiền khai thác cho thuê 95 triệu/tháng'
    ],
    nearbyAmenities: [
      { name: 'Vincom Center Trần Duy Hưng', distance: '150m', type: 'shopping' },
      { name: 'Khách sạn 5 sao Grand Plaza Hanoi', distance: '200m', type: 'shopping' },
      { name: 'Trường THPT Chuyên Hà Nội - Amsterdam', distance: '600m', type: 'education' },
      { name: 'Bệnh viện Thu Cúc & BV Giao thông Vận tải', distance: '1.5km', type: 'hospital' },
      { name: 'Công viên hồ điều hòa Nhân Chính', distance: '500m', type: 'park' }
    ],
    agent: {
      name: 'Trần Thị Thu Hà',
      phone: '0912 345 678',
      email: 'ha.tran@bds-luxury.vn',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      role: 'Giám đốc Kinh doanh BĐS Hà Nội'
    },
    featured: false,
    yearBuilt: 2020,
    direction: 'Tây Bắc',
    legalDocument: 'Sổ đỏ lâu dài chính chủ',
    createdAt: '2026-03-10T11:00:00Z'
  },
  {
    id: 'bds-005',
    title: 'Biệt thự nghỉ dưỡng biển Sơn Trà Ocean View Đà Nẵng ngắm trọn vịnh biển',
    description: 'Siêu phẩm biệt thự ven biển trên cung đường tỷ đô Hoàng Sa - bán đảo Sơn Trà, TP. Đà Nẵng. Thiết kế mở không gian mở phong cách Santorini nhiệt đới, 100% phòng ngủ và phòng khách đều có tầm nhìn triệu đô ôm trọn vịnh biển Mỹ Khê và lễ hội pháo hoa quốc tế DIFF. Hồ bơi vô cực điện phân muối khoáng trên tầng thượng, khuôn viên sân vườn tiệc nướng BBQ ngoài trời đón gió đại dương quanh năm.',
    price: 26500000000,
    priceFormatted: '26.5 tỷ',
    pricePerM2: '75.71 triệu/m²',
    area: 350,
    bedrooms: 4,
    bathrooms: 5,
    floors: 3,
    frontWidth: 15.0,
    roadWidth: 'Đường biển Hoàng Sa 30m',
    furnitureStatus: 'Full nội thất phong cách Địa Trung Hải nhập khẩu Ý',
    balconyDirection: 'Đông ngắm bình minh trên biển',
    planningStatus: 'Đất ở đô thị ven biển sở hữu lâu dài (hiếm có tại Đà Nẵng)',
    legalStatus: 'Sổ hồng sở hữu lâu dài cá nhân, không dính thế chấp',
    propertyType: 'villa',
    listingType: 'sale',
    status: 'available',
    address: 'Đường Hoàng Sa, Bán đảo Sơn Trà',
    ward: 'Thọ Quang',
    district: 'Quận Sơn Trà',
    city: 'Đà Nẵng',
    coordinates: {
      lat: 16.0987,
      lng: 108.2612
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80', // Biệt thự nhìn từ bên ngoài
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', // Phòng khách view biển
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', // Không gian bếp & quầy bar
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', // Phòng ngủ Master ban công biển
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80', // Bồn tắm ngắm hoàng hôn
      'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=80'  // Hồ bơi vô cực view biển
    ],
    features: [
      'View trực diện 100% biển Mỹ Khê & Bán đảo Sơn Trà',
      'Hồ bơi vô cực khoáng mặn trên cao',
      'Sân vườn BBQ tiệc ngoài trời sức chứa 50 khách',
      'Có đơn vị quản lý vận hành khai thác nghỉ dưỡng 5 sao',
      'Pháp lý đất ở đô thị ven biển sở hữu lâu dài'
    ],
    nearbyAmenities: [
      { name: 'Bãi tắm Mân Thái & Biển Mỹ Khê', distance: '150m', type: 'park' },
      { name: 'Chùa Linh Ứng Bán Đảo Sơn Trà', distance: '2.5km', type: 'park' },
      { name: 'Cầu Rồng & Cầu Sông Hàn', distance: '3.5km', type: 'transport' },
      { name: 'Bệnh viện Đa khoa Sơn Trà', distance: '1.8km', type: 'hospital' },
      { name: 'Sân bay Quốc tế Đà Nẵng', distance: '6.5km', type: 'transport' }
    ],
    agent: {
      name: 'Đặng Quốc Huy',
      phone: '0935 999 888',
      email: 'huy.dang@bds-danang.vn',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên gia BĐS Nghỉ Dưỡng Miền Trung'
    },
    featured: true,
    yearBuilt: 2022,
    direction: 'Đông',
    legalDocument: 'Sổ hồng sở hữu lâu dài',
    createdAt: '2026-03-18T16:00:00Z'
  },
  {
    id: 'bds-006',
    title: 'Lô đất nền thổ cư góc 2 mặt tiền khu đô thị Nam Cần Thơ',
    description: 'Lô góc 2 mặt tiền cực hiếm tại Khu đô thị sinh thái Nam Cần Thơ, đường Võ Nguyên Giáp. Mặt tiền đường nhựa lộ giới 24m và đường nhánh 14m, vỉa hè cây xanh mỗi bên 4m. Vị trí trung tâm kế cận Đại học Tây Đô, Bệnh viện Hoàn Mỹ Cửu Long và cụm hành chính mới. Đất thổ cư 100% ODT, hạ tầng kỹ thuật điện nước đi ngầm toàn bộ, được phép xây dựng tự do đến 5 tầng. Tiềm năng tăng giá vượt trội theo trục cao tốc Cần Thơ - Cà Mau.',
    price: 7200000000,
    priceFormatted: '7.2 tỷ',
    pricePerM2: '40 triệu/m²',
    area: 180,
    bedrooms: 0,
    bathrooms: 0,
    floors: 0,
    frontWidth: 12.0,
    roadWidth: 'Đường lộ giới 24m & Đường nội bộ 14m',
    furnitureStatus: 'Đất nền đã san lấp cao ráo, cọc mốc ranh giới rõ ràng',
    balconyDirection: 'Đông Nam & Đông Bắc',
    planningStatus: 'Đất ở đô thị ODT 100%, quy hoạch xây dựng tự do tối đa 5 tầng',
    legalStatus: 'Sổ hồng riêng từng nền, sang tên công chứng trong 24h',
    propertyType: 'land',
    listingType: 'sale',
    status: 'available',
    address: 'Đường Võ Nguyên Giáp, KĐT Nam Cần Thơ',
    ward: 'Hưng Thạnh',
    district: 'Quận Cái Răng',
    city: 'Cần Thơ',
    coordinates: {
      lat: 10.0152,
      lng: 105.7891
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', // Lô đất nhìn từ flycam
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', // Hạ tầng đường nhựa vỉa hè
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', // Cảnh quan quy hoạch xanh
      'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80', // Tiện ích công viên ven sông kế bên
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', // Hoàng hôn trên sông Cần Thơ
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'  // Toàn cảnh không gian kết nối
    ],
    features: [
      'Lô góc 2 mặt tiền cực đẹp, phong thủy vượng khí',
      'Đất 100% thổ cư ODT lâu dài',
      'Hạ tầng ngầm hóa điện nước, vỉa hè lát đá',
      'Được phép xây dựng tự do lên đến 5 tầng',
      'Thích hợp xây tòa nhà văn phòng, phòng khám hoặc khách sạn'
    ],
    nearbyAmenities: [
      { name: 'Bệnh viện Quốc tế Hoàn Mỹ Cửu Long', distance: '400m', type: 'hospital' },
      { name: 'Đại học Tây Đô & Trường Quốc tế Singapore', distance: '800m', type: 'education' },
      { name: 'Trung tâm hành chính mới Quận Cái Răng', distance: '1.2km', type: 'transport' },
      { name: 'Siêu thị Go! Cần Thơ & Bến xe trung tâm', distance: '1.5km', type: 'shopping' },
      { name: 'Cầu Cần Thơ & Bến Ninh Kiều', distance: '3.5km', type: 'transport' }
    ],
    agent: {
      name: 'Lê Hoàng Nam',
      phone: '0988 765 432',
      email: 'nam.le@bds-vietnam.vn',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      role: 'Tư vấn Đầu tư Đất Nền Miền Tây'
    },
    featured: false,
    direction: 'Đông Nam & Đông Bắc',
    legalDocument: 'Sổ hồng riêng chính chủ',
    createdAt: '2026-03-24T10:00:00Z'
  }
];
