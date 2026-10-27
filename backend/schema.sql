-- =============================================================================
-- BATDONGSAN.VN — MYSQL DATABASE SCHEMA DEFINITION
-- =============================================================================

CREATE DATABASE IF NOT EXISTS batdongsan_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE batdongsan_db;

-- 1. Bảng Chuyên viên tư vấn / Môi giới
CREATE TABLE IF NOT EXISTS agents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    role VARCHAR(100) DEFAULT 'Chuyên viên tư vấn cấp cao',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Đại đô thị & Dự án tiêu biểu
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

-- 3. Bảng Tin đăng Bất động sản
CREATE TABLE IF NOT EXISTS properties (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
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
    agent_id BIGINT,
    project_id BIGINT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    year_built INT,
    direction VARCHAR(50),
    legal_document VARCHAR(150) DEFAULT 'Sổ hồng lâu dài',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    INDEX idx_city_district (city, district),
    INDEX idx_price (price),
    INDEX idx_type (property_type, listing_type)
);

-- 4. Bảng Tiện ích xung quanh BĐS (Bán kính 1-3km)
CREATE TABLE IF NOT EXISTS nearby_amenities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    distance VARCHAR(50) NOT NULL,
    amenity_type ENUM('transport', 'education', 'shopping', 'hospital', 'park') NOT NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- 5. Bảng Khách hẹn xem nhà & Yêu cầu tư vấn (Leads)
CREATE TABLE IF NOT EXISTS inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT NULL,
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
