-- =============================================================================
-- BATDONGSAN.VN — MYSQL DATABASE SCHEMA DEFINITION
-- Database: batdongsan
-- Cổng: 3306 | User: root | Pass: root
-- =============================================================================

CREATE DATABASE IF NOT EXISTS batdongsan 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE batdongsan;

-- =============================================================================
-- 1. BẢNG NGƯỜI DÙNG & PHÂN QUYỀN (USERS)
-- Dùng để xác thực đăng nhập, phân quyền quản trị (admin) và đăng tin (user)
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    avatar_url VARCHAR(500) NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
);

-- =============================================================================
-- 2. BẢNG CHUYÊN VIÊN TƯ VẤN / MÔI GIỚI (AGENTS)
-- =============================================================================
CREATE TABLE IF NOT EXISTS agents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    role VARCHAR(100) DEFAULT 'Chuyên gia BĐS Cao Cấp',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =============================================================================
-- 3. BẢNG ĐẠI ĐÔ THỊ & DỰ ÁN TIÊU BIỂU (PROJECTS)
-- =============================================================================
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    developer VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    total_area_ha DECIMAL(10,2),
    price_from VARCHAR(100),
    description TEXT,
    image_url VARCHAR(500),
    amenities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 4. BẢNG TIN ĐĂNG BẤT ĐỘNG SẢN (PROPERTIES)
-- Hỗ trợ liên kết user_id (người đăng tin) và agent_id (chuyên viên phụ trách)
-- =============================================================================
CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(50) PRIMARY KEY,
    user_id BIGINT NULL,
    agent_id BIGINT NULL,
    project_id BIGINT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    price_formatted VARCHAR(100) NOT NULL,
    price_per_m2 VARCHAR(100),
    area DECIMAL(10,2) NOT NULL,
    bedrooms INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    floors INT DEFAULT 1,
    front_width DECIMAL(8,2),
    road_width VARCHAR(100),
    furniture_status VARCHAR(150),
    balcony_direction VARCHAR(50),
    property_type ENUM('apartment', 'house', 'villa', 'land', 'commercial') NOT NULL,
    listing_type ENUM('sale', 'rent') NOT NULL DEFAULT 'sale',
    status ENUM('available', 'sold', 'pending') NOT NULL DEFAULT 'available',
    address VARCHAR(255) NOT NULL,
    ward VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    lat DECIMAL(10,8),
    lng DECIMAL(11,8),
    images JSON NOT NULL,
    features JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    year_built INT,
    direction VARCHAR(50),
    legal_document VARCHAR(150) DEFAULT 'Sổ hồng lâu dài chính chủ',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    INDEX idx_city_district (city, district),
    INDEX idx_price (price),
    INDEX idx_type (property_type, listing_type),
    INDEX idx_user (user_id)
);

-- =============================================================================
-- 5. BẢNG TIỆN ÍCH XUNG QUANH BĐS (NEARBY_AMENITIES)
-- =============================================================================
CREATE TABLE IF NOT EXISTS nearby_amenities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    distance VARCHAR(50) NOT NULL,
    amenity_type ENUM('transport', 'education', 'shopping', 'hospital', 'park') NOT NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- =============================================================================
-- 6. BẢNG KHÁCH HẸN XEM NHÀ & YÊU CẦU TƯ VẤN (INQUIRIES)
-- =============================================================================
CREATE TABLE IF NOT EXISTS inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id VARCHAR(50) NULL,
    property_title VARCHAR(255),
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    message TEXT,
    inquiry_type ENUM('viewing', 'consultation', 'price_offer') DEFAULT 'viewing',
    status ENUM('new', 'contacted', 'scheduled', 'completed', 'cancelled') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL,
    INDEX idx_inquiry_status (status)
);

-- =============================================================================
-- 7. BẢNG BẤT ĐỘNG SẢN ĐÃ LƯU / YÊU THÍCH (FAVORITES)
-- =============================================================================
CREATE TABLE IF NOT EXISTS user_favorites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    property_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_property (user_id, property_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- =============================================================================
-- KHỞI TẠO DỮ LIỆU MẪU (SEED DATA)
-- =============================================================================

-- A. Khởi tạo tài khoản Quản trị viên (Admin) và Người dùng thường (User)
-- Mật khẩu mặc định: 123456
INSERT INTO users (id, full_name, email, password, phone, avatar_url, role, status) VALUES
(1, 'Quản Trị Viên Hệ Thống', 'admin@gmail.com', '123456', '0908 123 456', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80', 'admin', 'active'),
(2, 'Nguyễn Văn Tâm', 'tam@gmail.com', '123456', '0912 345 678', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80', 'user', 'active')
ON DUPLICATE KEY UPDATE 
    password = VALUES(password),
    role = VALUES(role);

-- B. Khởi tạo Chuyên viên tư vấn
INSERT INTO agents (id, user_id, full_name, phone, email, avatar_url, role) VALUES
(1, 1, 'Nguyễn Văn Tuấn', '0908 123 456', 'tuan.nguyen@bds-premium.vn', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80', 'Chuyên gia BĐS Cao Cấp Thủ Đức'),
(2, 1, 'Trần Thị Thu Hà', '0912 345 678', 'ha.tran@bds-luxury.vn', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80', 'Giám đốc Kinh doanh BĐS Triệu Đô Hà Nội'),
(3, 1, 'Lê Hoàng Nam', '0988 765 432', 'nam.le@bds-vietnam.vn', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80', 'Tư vấn Cho thuê BĐS Cao Cấp')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- C. Khởi tạo Bất động sản tiêu biểu
INSERT INTO properties (
    id, user_id, agent_id, title, description, price, price_formatted, price_per_m2, 
    area, bedrooms, bathrooms, floors, front_width, road_width, furniture_status, 
    balcony_direction, property_type, listing_type, status, address, ward, district, city, 
    lat, lng, images, features, is_featured, year_built, direction, legal_document
) VALUES
(
    'bds-001', 1, 1,
    'Căn hộ Penthouse Masteri Thảo Điền view trọn sông Sài Gòn & Landmark 81',
    'Căn hộ Penthouse thông tầng cao cấp bậc nhất tại Masteri Thảo Điền (Tháp T5). Thiết kế phong cách Địa Trung Hải sang trọng với trần cao 6.2m, phòng khách kính tràn panorama 270 độ chiêm ngưỡng trọn vẹn vẻ đẹp sông Sài Gòn và pháo hoa Landmark 81.',
    18500000000.00, '18.5 tỷ', '66.07 triệu/m²',
    280.00, 4, 4, 2, 16.50, 'Xa lộ Hà Nội 12 làn xe + Đường nội khu 16m',
    'Full nội thất cao cấp nhập khẩu Ý (Poliform & Minotti)',
    'Đông Nam ngắm hoàng hôn sông Sài Gòn',
    'apartment', 'sale', 'available',
    '159 Xa lộ Hà Nội, Phường Thảo Điền', 'Thảo Điền', 'Thành phố Thủ Đức', 'Hồ Chí Minh',
    10.80370000, 106.73810000,
    JSON_ARRAY(
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ),
    JSON_ARRAY(
        'Sổ hồng sở hữu lâu dài', 'Hồ bơi Sky Pool riêng', 'Nội thất Poliform nhập khẩu Ý', 
        '2 Suất đậu ô tô định danh', 'Thang máy thẻ từ bảo mật', 'Smarthome Crestron chuẩn Mỹ'
    ),
    TRUE, 2021, 'Đông Nam', 'Sổ hồng lâu dài chính chủ'
),
(
    'bds-002', 1, 2,
    'Biệt thự đơn lập Vinhomes Riverside Hoa Sữa đẳng cấp ven hồ sinh thái',
    'Biệt thự đơn lập kiến trúc tân cổ điển hoàng gia Pháp tại tiểu khu Hoa Sữa - Vinhomes Riverside Long Biên. Vị trí ven sông nhân tạo với mặt nước hồ sinh thái 12.4ha rộng mở sau nhà, cầu tàu cano riêng cập bến.',
    45000000000.00, '45 tỷ', '107.14 triệu/m²',
    420.00, 5, 6, 4, 18.00, 'Đường trục chính nội khu 14m vỉa hè 3.5m',
    'Full nội thất gỗ óc chó Bắc Mỹ & Thiết bị Miele Đức',
    'Nam nhìn trực diện mặt hồ sinh thái',
    'villa', 'sale', 'available',
    'Đường Hoa Sữa, Khu đô thị Vinhomes Riverside', 'Phúc Lợi', 'Quận Long Biên', 'Hà Nội',
    21.04560000, 105.90870000,
    JSON_ARRAY(
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ),
    JSON_ARRAY(
        'Sân vườn ven hồ sinh thái 12.4ha', 'Hầm rượu vang & Rạp phim 4K', 'Garage 3 ô tô trong nhà', 
        'An ninh khép kín 3 lớp 24/7', 'Điều hòa trung tâm Daikin VRV'
    ),
    TRUE, 2022, 'Nam', 'Sổ đỏ chính chủ cất két'
),
(
    'bds-003', 2, 3,
    'Căn hộ 2PN hiện đại Lumiere Riverside An Phú view trọn công viên Metro',
    'Căn hộ tầng cao tháp Tây Lumiere Riverside - kiệt tác xanh giữa lòng Thảo Điền do Masterise Homes phát triển. Thiết kế thông minh tối ưu từng mét vuông ánh sáng tự nhiên, ban công đón gió Đông Nam mát mẻ quanh năm.',
    28000000.00, '28 triệu/tháng', '358.97 nghìn/m²/tháng',
    78.00, 2, 2, 1, NULL, 'Xa lộ Hà Nội 12 làn xe',
    'Full nội thất mới 100% nhập khẩu Tây Ban Nha',
    'Đông Nam view sông & Landmark 81',
    'apartment', 'rent', 'available',
    '259 Xa lộ Hà Nội, Phường An Phú', 'An Phú', 'Thành phố Thủ Đức', 'Hồ Chí Minh',
    10.80150000, 106.74120000,
    JSON_ARRAY(
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ),
    JSON_ARRAY(
        'Full nội thất cao cấp mới 100%', 'Hồ bơi vô cực trên cao & Bể sục jacuzzi', 
        'Khóa cửa thông minh Yale', 'Phòng Gym & Yoga Technogym'
    ),
    TRUE, 2023, 'Đông', 'Hợp đồng dài hạn chính chủ'
)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- D. Khởi tạo Khách hẹn xem nhà & Leads mẫu
INSERT INTO inquiries (id, property_id, property_title, full_name, phone, email, message, inquiry_type, status) VALUES
(1, 'bds-001', 'Căn hộ Penthouse Masteri Thảo Điền view trọn sông Sài Gòn & Landmark 81', 'Trần Minh Đức', '0918 889 999', 'duc.tran@gmail.com', 'Tôi muốn hẹn xem nhà trực tiếp vào cuối tuần này.', 'viewing', 'new'),
(2, 'bds-002', 'Biệt thự đơn lập Vinhomes Riverside Hoa Sữa đẳng cấp ven hồ sinh thái', 'Lê Hoàng Yến', '0903 555 777', 'yen.le@vinmail.com', 'Xin file sổ đỏ scan và bảng tính dòng tiền vay ngân hàng.', 'consultation', 'contacted'),
(3, 'bds-003', 'Căn hộ 2PN hiện đại Lumiere Riverside An Phú view trọn công viên Metro', 'Phạm Văn Hùng', '0982 123 789', 'hung.pham@outlook.com', 'Đàm phán thương lượng thanh toán 1 năm 1 lần để được giá tốt nhất.', 'price_offer', 'new')
ON DUPLICATE KEY UPDATE status = VALUES(status);
