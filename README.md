# Badminton Court Booking System
> **Hệ thống đặt sân cầu lông trực tuyến**

---

## 1. Giới thiệu & Mục tiêu hệ thống

**Badminton Court Booking System** là hệ thống quản lý và đặt sân cầu lông trực tuyến, được thiết kế nhằm giải quyết bài toán đặt lịch, quản lý tình trạng sân trống theo thời gian thực, loại bỏ tình trạng trùng lịch (double booking) và tối ưu hóa doanh thu cho các chủ sân cầu lông.

### Mục tiêu chính:
- **Tự động hóa quy trình đặt sân**: Người chơi dễ dàng tra cứu lịch trống, đặt lịch mọi lúc mọi nơi.
- **Minh bạch hóa quản lý**: Giúp chủ sân và nhân viên theo dõi trạng thái sân, doanh thu và lịch đặt theo thời gian thực.
- **Trải nghiệm người dùng mượt mà**: Giao diện trực quan, tốc độ xử lý nhanh chóng, thông báo rõ ràng.

---

## 2. Các nhóm người dùng (3 Roles)

Hệ thống phân quyền chi tiết cho 3 đối tượng người dùng chính:

1. **Khách hàng (Customer)**:
   - Đăng ký, đăng nhập tài khoản.
   - Tìm kiếm sân theo ngày, khung giờ, chi nhánh và loại sân (sân thảm tiêu chuẩn, sân VIP).
   - Đặt sân trực tuyến, thanh toán hoặc giữ chỗ tạm thời.
   - Xem lịch sử đặt sân, nhận thông báo xác nhận và thực hiện hủy lịch đặt sân khi có nhu cầu.

2. **Nhân viên (Staff)**:
   - Xem lịch đặt sân tổng quan trong ngày/tuần theo dạng Timeline.
   - Check-in, check-out cho khách khi đến sân.
   - Tiếp nhận và tạo lịch đặt sân trực tiếp tại quầy cho khách vãng lai.
   - Hỗ trợ đổi giờ hoặc hủy lịch đặt theo yêu cầu của khách tại sân.

3. **Quản trị viên (Admin)**:
   - Quản trị toàn bộ hệ thống: danh mục sân, số lượng sân, bảng giá theo khung giờ (giờ thường / giờ vàng / cuối tuần).
   - Quản lý tài khoản người dùng và phân quyền nhân viên.
   - Báo cáo thống kê doanh thu, tỷ lệ lấp đầy sân và xu hướng giờ chơi.
   - Cấu hình các chính sách hệ thống (thời gian hủy sân tối thiểu, tỷ lệ cọc/hoàn tiền).

---

## 3. Các chức năng chính của hệ thống

| Phân hệ | Chức năng | Mô tả |
| :--- | :--- | :--- |
| **Xác thực (Auth)** | Đăng ký / Đăng nhập / Phân quyền | Quản lý phiên làm việc bảo mật với JWT |
| **Quản lý sân (Court)** | Xem danh sách & Chi tiết sân | Hiển thị loại sân, hình ảnh, tiện ích, bảng giá |
| **Lịch sân (Schedule)** | Tra cứu slot trống | Hiển thị trực quan các khung giờ khả dụng theo thời gian thực |
| **Đặt sân (Booking)** | Tạo & Quản lý đơn đặt | Chọn slot, tính tổng tiền, tạo đơn và xác nhận đơn |
| **Hủy sân (Cancellation)** | Hủy đặt sân & Hoàn cọc | Kiểm tra điều kiện thời gian hủy và tự động giải phóng slot |
| **Check-in (Check-in)** | Điểm danh vào sân | Xác thực mã đặt sân và đổi trạng thái sử dụng sân |
| **Báo cáo (Dashboard)** | Thống kê doanh thu | Biểu đồ doanh thu theo ngày/tháng và tần suất đặt sân |

---

## 4. Ba luồng nghiệp vụ chính (Core Flows)

### 4.1. Luồng đặt sân (Booking Flow)
1. **Khách hàng** truy cập hệ thống, chọn ngày và xem danh sách các sân cùng các khung giờ trống (slots).
2. **Khách hàng** chọn sân và một hoặc nhiều khung giờ mong muốn.
3. Hệ thống kiểm tra tính khả dụng của slot và khóa tạm thời (hold slot) trong quá trình xác nhận.
4. **Khách hàng** xác nhận thông tin đặt sân (và phương thức thanh toán/cọc).
5. Hệ thống lưu thông tin đặt sân vào cơ sở dữ liệu với trạng thái `CONFIRMED`, gửi xác nhận thành công cho khách hàng và cập nhật slot sang trạng thái đã đặt.

### 4.2. Luồng hủy đặt sân (Cancel Booking Flow)
1. **Khách hàng** vào mục "Lịch sử đặt sân" và chọn đơn đặt sân muốn hủy.
2. Hệ thống kiểm tra chính sách hủy (ví dụ: yêu cầu hủy trước giờ chơi ít nhất 12h hoặc 24h).
3. Nếu hợp lệ, hệ thống cập nhật trạng thái đơn thành `CANCELLED`.
4. Hệ thống giải phóng slot đã đặt để sân trở lại trạng thái khả dụng cho khách hàng khác tiếp tục đặt.
5. Gửi thông báo xác nhận hủy sân thành công tới khách hàng.

### 4.3. Luồng quản lý sân (Court Management Flow)
1. **Admin/Staff** đăng nhập vào trang quản trị và truy cập mục "Quản lý sân".
2. **Admin** có thể thêm mới sân, chỉnh sửa tên sân, loại thảm, trạng thái hoạt động (bảo trì/hoạt động).
3. **Admin** cấu hình bảng giá động theo các khung giờ (ví dụ: sáng 80.000đ/h, tối giờ vàng 150.000đ/h).
4. Hệ thống áp dụng ngay bảng giá và cấu hình mới vào bảng tra cứu và tính tiền đặt sân cho toàn hệ thống.

---

## 5. Công nghệ sử dụng (Tech Stack)

- **Frontend**:
  - React 18
  - Vite (Build Tool & Dev Server siêu tốc)
  - CSS3 hiện đại, Responsive UI
- **Backend**:
  - Node.js (Runtime)
  - Express.js (RESTful API Framework)
  - `cors`, `dotenv`
- **Database**:
  - MySQL 8.x
  - Driver `mysql2` hỗ trợ Promise/Connection Pooling
- **Testing & QA**:
  - Postman (API Testing)
  - Puppeteer (E2E & UI Automation)
  - Apache JMeter (Load & Stress Performance Testing)

---

## 6. Cấu trúc thư mục dự án (Project Structure)

```
badminton-court-booking-system/
├── backend/                  # Mã nguồn Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/           # Cấu hình kết nối MySQL pool
│   │   │   └── db.js
│   │   ├── routes/           # Định tuyến API
│   │   │   └── health.js     # Health check route
│   │   └── server.js         # Entrypoint khởi chạy server Express
│   ├── .env.example          # Biến môi trường mẫu Backend
│   └── package.json          # Dependencies & scripts Backend
├── frontend/                 # Mã nguồn Frontend (React + Vite)
│   ├── public/               # Tài nguyên tĩnh
│   ├── src/
│   │   ├── assets/           # Hình ảnh, biểu tượng
│   │   ├── App.jsx           # Trang chủ Badminton Court Booking System
│   │   ├── App.css           # Giao diện trang chủ
│   │   └── main.jsx          # Entrypoint React
│   ├── .env.example          # Biến môi trường mẫu Frontend
│   ├── index.html            # File HTML chính
│   ├── package.json          # Dependencies & scripts Frontend
│   └── vite.config.js        # Cấu hình Vite
├── docs/                     # Tài liệu thiết kế & phân tích hệ thống
│   ├── URD/                  # User Requirements Document
│   ├── SRS/                  # Software Requirements Specification
│   ├── API/                  # Tài liệu đặc tả API
│   ├── Diagrams/             # Sơ đồ kiến trúc, tuần tự (Mermaid)
│   └── Bug-Manifest/         # Bảng theo dõi và quản lý lỗi
├── testing/                  # Tài liệu và kịch bản kiểm thử
│   ├── Test-Plan/            # Kế hoạch kiểm thử tổng thể
│   ├── Test-Cases/           # Bộ test cases chi tiết
│   ├── Bug-Reports/          # Mẫu báo cáo lỗi cho QA
│   ├── Postman/              # Postman Collections test API
│   ├── Puppeteer/            # Kịch bản kiểm thử E2E tự động
│   └── JMeter/               # Kịch bản kiểm thử tải & hiệu năng
├── .env.example              # Biến môi trường mẫu toàn dự án
├── .gitignore                # Cấu hình bỏ qua file trong Git
├── LICENSE                   # Giấy phép MIT
└── README.md                 # Tài liệu giới thiệu dự án
```

---

## 7. Hướng dẫn cài đặt & Khởi chạy dự án

### Yêu cầu tiên quyết
- Node.js >= 18.x
- npm >= 9.x
- MySQL Server (tùy chọn để kết nối DB)

### 1. Khởi chạy Backend API
```bash
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Cài đặt thư viện
npm install

# 3. Tạo file cấu hình môi trường
cp .env.example .env

# 4. Khởi chạy server
npm run dev
# Server sẽ lắng nghe tại: http://localhost:5001
# Kiểm tra API: http://localhost:5001/api/health
```

### 2. Khởi chạy Frontend
```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt thư viện
npm install

# 3. Tạo file cấu hình môi trường
cp .env.example .env

# 4. Khởi chạy giao diện
npm run dev
# Mở trình duyệt tại: http://localhost:5173
```
