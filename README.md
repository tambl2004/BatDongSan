# BATDONGSAN.VN — NỀN TẢNG CÔNG NGHỆ BẤT ĐỘNG SẢN & PROPTECH TOÀN DIỆN

> **Hệ sinh thái giao dịch nhà đất minh bạch, tra cứu quy hoạch đô thị và kết nối đầu tư bất động sản số hóa.**  
> Dự án được phát triển theo tiêu chuẩn Fullstack TypeScript hiện đại, giao diện **Modern Editorial PropTech** (tối ưu hiệu năng, không lạm dụng template, trau chuốt UX) và kiến trúc Backend phân tầng vững chắc, sẵn sàng container hóa với Docker.

---

## 1. GIỚI THIỆU TỔNG QUAN (PROJECT OVERVIEW)

**Batdongsan.vn** là nền tảng PropTech cung cấp giải pháp toàn trình cho cả 3 nhóm đối tượng: **Khách hàng tìm kiếm & đầu tư**, **Chuyên viên tư vấn / Môi giới**, và **Đội ngũ Quản trị viên (Admin)**.

### 🌟 Các Phân Hệ & Tính Năng Trọng Tâm

#### 1.1. Cổng Khách Hàng (User Facing Portal)
* **Trang chủ & Dự án chiến lược (Showcase):**
  - Trưng bày các đại đô thị và khu căn hộ tiêu biểu (tiêu biểu như Green Nest, Vinhomes, Masterise,...).
  - Tra cứu 4 vùng trọng điểm quy hoạch hạ tầng (Bình Chánh, Cần Giờ, Hòa Lạc, Long Biên).
  - Phân tích chuỗi giá trị và tầm nhìn quy hoạch đô thị dài hạn.
* **Bộ lọc & Tìm kiếm BĐS chuyên sâu:**
  - Lọc theo loại hình (Căn hộ, Nhà phố, Biệt thự, Đất nền, BĐS thương mại), hình thức (Bán / Cho thuê).
  - Lọc đa chiều: Vị trí (Tỉnh/Thành, Quận/Huyện), khoảng giá, diện tích, số phòng ngủ, hướng nhà và tình trạng pháp lý.
  - Tìm kiếm nhanh bằng từ khóa kết hợp kỹ thuật Debounce tối ưu hiệu năng.
* **Trang Chi Tiết BĐS Cao Cấp (Property Detail):**
  - Thư viện ảnh **Luxury Bento Gallery 5 khung hình** tích hợp Lightbox xem ảnh toàn màn hình.
  - **Interactive Mortgage Calculator:** Bảng tính lãi suất và kế hoạch trả nợ vay ngân hàng theo thời gian thực (tùy chỉnh tỷ lệ vay, thời hạn, lãi suất).
  - Tiện ích bán kính lân cận 1km - 3km (trường học, metro, bệnh viện, TTTM).
  - Form đặt lịch xem nhà và gửi yêu cầu tư vấn trực tiếp đến chuyên viên quản lý tài sản.
* **Tin tức & Cẩm nang thị trường:** Chuyên mục Blog tin tức, nhận định chính sách, phân tích pháp lý và xu hướng đầu tư.
* **Danh sách yêu thích (Wishlist):** Lưu trữ tài sản quan tâm vào bộ nhớ cá nhân hóa để so sánh nhanh.

#### 1.2. Xác Thực & Người Dùng (Auth & User Management)
* Đăng ký tài khoản, Đăng nhập bảo mật qua mã hóa mật khẩu và cơ chế JWT (JSON Web Token).
* Quên mật khẩu, cập nhật hồ sơ cá nhân, phân quyền tài khoản (**Customer / Agent / Admin**).

#### 1.3. Cổng Quản Trị Hệ Thống (Admin Dashboard)
* **Dashboard Tổng quan:** Theo dõi trực quan các chỉ số KPI: Tổng số tài sản niêm yết, tổng khách hàng tiềm năng (Leads), giá trị giao dịch ước tính.
* **Quản lý Bất động sản:** Tạo mới, chỉnh sửa thông tin, cập nhật tình trạng duyệt bài (Available / Sold / Pending).
* **Quản lý Yêu cầu tư vấn (Leads Tracker):** Theo dõi danh sách khách hẹn xem nhà, xử lý trạng thái liên hệ (New / Contacted / Scheduled / Completed).
* **Quản trị người dùng & Phân quyền:** Quản lý danh sách thành viên và vai trò truy cập hệ thống.
* **Quản lý Bài viết & Tin tức:** Thêm mới và biên tập tin thị trường BĐS.

---

## 2. KIẾN TRÚC & CÔNG NGHỆ (TECH STACK)

### 2.1. Frontend
* **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
* **Iconography:** [Lucide React](https://lucide.dev/) (Bộ icon mảnh, chuẩn đồ họa kiến trúc & bản đồ)
* **Thông báo & Tương tác:** `react-toastify`
* **Styling:** Vanilla CSS Architecture (Design Tokens độc lập, không phụ thuộc CSS framework nặng nề, tốc độ render cực nhanh và không xung đột styles)
* **API Communication:** Fetch API Client tích hợp Vite Proxy định tuyến chuẩn `/api`

### 2.2. Backend
* **Runtime & Framework:** [Node.js](https://nodejs.org/) (v18+) + [Express.js](https://expressjs.com/) (RESTful API)
* **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/) (Strict typing, tsx cho dev hot-reload, tsc biên dịch production)
* **Cơ sở dữ liệu:** **MySQL 8.0+** (kết nối qua `mysql2/promise` connection pool tối ưu)
* **Bảo mật & Tiện ích:**
  - Xác thực người dùng qua JWT.
  - Phân tầng xử lý: Route ➔ Controller ➔ Service ➔ Repository / Database.
  - Global Error Handling & Async Wrapper (`catchAsync`, `AppError`).
  - CORS cấu hình động: Thoáng ở chế độ Development và kiểm soát nghiêm ngặt theo `CLIENT_URL` ở Production.
  - Cơ chế Healthcheck `/api/health` giám sát ping thực tế đến cơ sở dữ liệu MySQL (phục vụ giám sát Docker/K8s).

---

## 3. CẤU TRÚC THƯ MỤC DỰ ÁN (PROJECT STRUCTURE)

```
batdongsan/
├── README.md                      # Tài liệu dự án & hướng dẫn cài đặt chi tiết
├── DESIGN_SYSTEM.md               # Quy chuẩn giao diện (Màu sắc, Typography, Spacing, Tokens)
│
├── frontend/                      # Ứng dụng Giao diện Client & Admin (React + Vite)
│   ├── public/                    # Tài nguyên tĩnh công khai
│   ├── src/
│   │   ├── components/            # Các UI Components tái sử dụng
│   │   │   ├── common/            # Button, Input, Badge, ScrollToTop
│   │   │   ├── layout/            # Navbar, Header, Footer
│   │   │   ├── property/          # PropertyCard, PropertyGrid, PropertySlider
│   │   │   ├── search/            # QuickSearch, FilterBar, Hero
│   │   │   ├── modals/            # Modal chi tiết dự án, Modal đặt hẹn
│   │   │   └── map/               # Component hiển thị bản đồ tiện ích
│   │   ├── context/               # AuthContext lưu trữ trạng thái đăng nhập
│   │   ├── pages/ & views/        # Các trang màn hình chính:
│   │   │   ├── user/              # Giao diện khách hàng (Home, Listing, Detail, Blog, Favorites)
│   │   │   ├── admin/             # Giao diện quản trị (Dashboard, Properties, Leads, Users)
│   │   │   └── auth/              # Đăng nhập, Đăng ký, Quên mật khẩu
│   │   ├── services/              # API Client kết nối Backend (propertyApi, authApi, inquiryApi, adminApi)
│   │   ├── types/                 # Kiểu dữ liệu TypeScript (Property, Inquiry, User, Blog)
│   │   ├── utils/                 # Hàm tiện ích (format tiền tệ VNĐ, ngày tháng, validate)
│   │   ├── App.tsx                # Quản lý Routing và View State
│   │   ├── index.css              # CSS Design Tokens & Base styles
│   │   └── main.tsx               # Điểm khởi chạy React
│   ├── vite.config.ts             # Cấu hình Vite & Proxy chuyển tiếp `/api` về cổng 5001
│   ├── package.json
│   └── tsconfig.json
│
└── backend/                       # Máy chủ RESTful API (Node.js + Express + TypeScript)
    ├── src/
    │   ├── config/                # Cấu hình hệ thống
    │   │   ├── environment.ts     # Quản lý biến môi trường an toàn (kiểm tra JWT_SECRET)
    │   │   └── db.ts              # Quản lý MySQL Connection Pool & kiểm tra kết nối
    │   ├── controllers/           # Tầng tiếp nhận request & trả về response HTTP
    │   ├── middlewares/           # Middleware xác thực (auth), bắt lỗi (error), upload
    │   ├── models/                # Schema & Định nghĩa thực thể dữ liệu
    │   ├── routes/                # Định tuyến API (/properties, /inquiries, /auth, /users, /admin)
    │   ├── services/              # Tầng nghiệp vụ xử lý logic chính
    │   ├── types/                 # TypeScript Types & Declaration
    │   ├── utils/                 # AppError, catchAsync
    │   ├── app.ts                 # Khởi tạo Express, cấu hình CORS, Body Parser
    │   └── server.ts              # Khởi động server (cố định PORT 5001 sẵn sàng cho Docker)
    ├── package.json
    └── tsconfig.json
```


## 4. HƯỚNG DẪN CÀI ĐẶT & KHỞI CHẠY (LOCAL DEVELOPMENT)

### 4.1. Yêu Cầu Môi Trường
* **Node.js**: Phiên bản `18.x` hoặc `20.x+`
* **MySQL Server**: Phiên bản `8.0+` (chạy qua XAMPP, MySQL Installer, hoặc Docker)
* **npm**: Phiên bản `9.x+` (hoặc `pnpm` / `yarn`)

---

### 4.2. Cấu Hình Backend

1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```

2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```

3. Tạo và kiểm tra file `.env` tại `backend/.env`:
   ```env
   # Cổng mạng của máy chủ Backend
   PORT=5001
   NODE_ENV=development

   # Cấu hình kết nối MySQL
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=batdongsan

   # Khóa bí mật JWT dùng để ký và xác thực token
   JWT_SECRET=bds_secret_key_super_secure_2026_batdongsan_vn
   JWT_EXPIRES_IN=7d

   # Cấu hình CORS (URL ứng dụng Frontend)
   CLIENT_URL=http://localhost:5173
   ```

4. Khởi chạy máy chủ Backend ở chế độ phát triển:
   ```bash
   npm run dev
   ```
   > 🚀 Máy chủ API sẽ chạy tại: **`http://localhost:5001`**  
   > 🩺 Kiểm tra tình trạng kết nối: **`http://localhost:5001/api/health`**

---

### 4.3. Cấu Hình Frontend

1. Mở một cửa sổ Terminal mới và di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```

2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```

3. Khởi chạy máy chủ phát triển Vite:
   ```bash
   npm run dev
   ```
   > 🌐 Truy cập giao diện ứng dụng tại: **`http://localhost:5173`**  
   > *(Vite đã được cấu hình Proxy tự động chuyển các request `/api` sang `http://localhost:5001`)*

---

## 5. HƯỚNG DẪN TRIỂN KHAI VỚI DOCKER (DOCKER DEPLOYMENT)

Dự án đã được cấu hình tương thích 100% với môi trường container hóa:
1. **Cố định PORT 5001:** Tránh lỗi tự động nhảy port gây lệch cổng publish của container.
2. **Healthcheck chuẩn 503:** Endpoint `/api/health` trả về mã lỗi và dừng server nếu không kết nối được Database.
3. **CORS & JWT an toàn:** Tự động bắt buộc cấu hình `JWT_SECRET` và giới hạn `CLIENT_URL` khi `NODE_ENV=production`.

### 5.1. File `docker-compose.yml` gợi ý cho toàn bộ hệ thống:

```yaml
version: '3.8'

services:
  # 1. Cơ sở dữ liệu MySQL
  mysql:
    image: mysql:8.0
    container_name: batdongsan-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: secure_root_password
      MYSQL_DATABASE: batdongsan
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - bds-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  # 2. Dịch vụ Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: batdongsan-backend
    restart: always
    environment:
      NODE_ENV: production
      PORT: 5001
      DB_HOST: mysql
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: secure_root_password
      DB_NAME: batdongsan
      JWT_SECRET: your_very_strong_random_jwt_secret_key_here
      CLIENT_URL: http://localhost:5173
    ports:
      - "5001:5001"
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - bds-network

  # 3. Giao diện Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: batdongsan-frontend
    restart: always
    ports:
      - "5173:80"
    depends_on:
      - backend
    networks:
      - bds-network

volumes:
  mysql_data:

networks:
  bds-network:
    driver: bridge
```

### 5.2. Lệnh Khởi Chạy Container:
```bash
# Build và chạy ngầm toàn bộ dịch vụ
docker compose up -d --build

# Kiểm tra log của backend
docker compose logs -f backend

# Tắt hệ thống
docker compose down
```

---

## 6. DANH SÁCH API ENDPOINTS CHÍNH (API SPECIFICATION)

| Nhóm | Phương thức | Endpoint | Mô tả |
| :--- | :--- | :--- | :--- |
| **System** | `GET` | `/api/health` | Kiểm tra trạng thái máy chủ & kết nối MySQL |
| **System** | `GET` | `/api/locations` | Danh sách tỉnh/thành phố và quận/huyện hỗ trợ |
| **Bất động sản** | `GET` | `/api/properties` | Lấy danh sách BĐS kèm bộ lọc đa chiều & phân trang |
| | `GET` | `/api/properties/featured`| Danh sách tài sản nổi bật trưng bày ở trang chủ |
| | `GET` | `/api/properties/:id` | Xem chi tiết thông số, tiện ích & ảnh của một BĐS |
| | `POST` | `/api/properties` | Tạo bài đăng BĐS mới (Yêu cầu quyền Môi giới/Admin) |
| | `PUT` | `/api/properties/:id` | Cập nhật thông tin bài đăng |
| | `DELETE` | `/api/properties/:id` | Xóa bài đăng BĐS |
| **Tư vấn & Hẹn** | `POST` | `/api/inquiries` | Gửi yêu cầu đặt lịch hẹn xem nhà hoặc tư vấn tài chính |
| | `GET` | `/api/inquiries` | Lấy danh sách khách hẹn tư vấn (Dành cho Quản trị) |
| **Xác thực** | `POST` | `/api/auth/register` | Đăng ký tài khoản mới |
| | `POST` | `/api/auth/login` | Đăng nhập hệ thống & cấp JWT Token |
| | `GET` | `/api/auth/me` | Lấy thông tin tài khoản hiện tại |
| **Quản trị (Admin)**| `GET` | `/api/admin/overview` | Thống kê số liệu báo cáo, tổng tài sản, leads |
| | `GET` | `/api/admin/users` | Quản lý danh sách thành viên |

---