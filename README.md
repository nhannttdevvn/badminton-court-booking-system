# Badminton Court Booking System
> **Hệ thống đặt sân cầu lông trực tuyến phục vụ kiểm thử phần mềm và đánh giá hiệu năng**  
> Học phần: Đánh giá hiệu năng / Software Testing – Đồ án cá nhân (Semester 7)

---

## 1. Giới thiệu và Mục tiêu dự án

**Badminton Court Booking System** là ứng dụng web được xây dựng nhằm phục vụ đồ án học phần Kiểm thử phần mềm và Đánh giá hiệu năng.

### Mục tiêu cốt lõi:
- **Đặc tả chuẩn mực**: Mọi yêu cầu được hệ thống hóa rõ ràng theo chuẩn `FR/VAL/BUS/DIS/ERR/NFR`, dễ kiểm tra và xác minh.
- **Dễ dàng kiểm thử tự động**:
  - API RESTful chuẩn JSON UTF-8 với mã lỗi ổn định, hỗ trợ kiểm thử tự động bằng **Postman / Newman**.
  - Toàn bộ các thành phần giao diện frontend được gắn thuộc tính `data-testid` cố định, hỗ trợ kiểm thử E2E bằng **Puppeteer**.
  - Các endpoint tải được thiết kế để đo lường hiệu năng bằng **Apache JMeter**.
- **Tính toàn vẹn dữ liệu**: Đảm bảo kiểm soát đặt lịch và dữ liệu thử nghiệm xác định (Deterministic Seed Data).

---

## 2. Phạm vi nghiệp vụ (5 Nhóm chức năng)

Hệ thống tập trung chuyên sâu vào đúng 5 nhóm chức năng nghiệp vụ, không mở rộng sang các phân hệ thương mại ngoài phạm vi:
1. **Đăng ký tài khoản (Register)**.
2. **Đăng nhập hệ thống (Login)**.
3. **Xem sân và lịch sân trống (View Court & Availability)**.
4. **Đặt sân (Booking)**.
5. **Hủy đặt sân (Cancel Booking)**.

---

## 3. Các vai trò người dùng (3 User Roles)

1. **Khách vãng lai (Guest)**:
   - Xem danh sách sân, thông tin chi tiết từng sân.
   - Xem bảng lịch các khung giờ còn trống / đã đặt theo ngày.
   - Đăng ký tài khoản thành viên mới hoặc Đăng nhập.
2. **Khách hàng (Customer)**:
   - Toàn bộ quyền của Guest.
   - Tạo đơn đặt sân cho các khung giờ còn trống trong tương lai.
   - Xem danh sách lịch sử đơn đặt của chính mình (`My Bookings`).
   - Hủy đơn đặt sân của chính mình khi còn ít nhất 2 giờ trước giờ bắt đầu thi đấu.
3. **Chủ hệ thống / Quản trị viên (Admin)**:
   - Xem toàn bộ danh sách đơn đặt sân của tất cả khách hàng trong hệ thống.
   - Hủy đơn đặt sân khi có yêu cầu xử lý trực tiếp tại quầy hoặc sự cố sân bãi.
   - Thực thi API khôi phục dữ liệu kiểm thử về mặc định (`Reset Test Data`).

---

## 4. Kiến trúc công nghệ

```text
badminton-court-performance-evaluation/
├── backend/            # Máy chủ Node.js + Express RESTful API (Port 5001)
├── frontend/           # Ứng dụng Single Page Application React 19 + Vite (Port 5173)
├── docs/               # Toàn bộ hồ sơ tài liệu đặc tả (URD, SRS, API, Test Accounts, Handover)
├── TAILIEU/            # Biểu mẫu học phần của Giảng viên
└── testing/            # Kịch bản kiểm thử (Postman, Puppeteer, JMeter, Smoke test)
```

- **Backend**: Node.js, Express, Bcrypt.js, JSON Web Token (JWT), Local Persistent Data Store (`backend/data/database.json`).
- **Frontend**: React 19, Vite, Vanilla CSS, tích hợp `data-testid` cố định.
- **API Base URL**: `http://localhost:5001/api/v1`
- **Health Check**: `http://localhost:5001/health`

---

## 5. Hướng dẫn cài đặt và Khởi chạy

### 5.1. Yêu cầu môi trường
- Node.js version 18.x hoặc 20.x trở lên.
- Trình quản lý gói `npm`.

### 5.2. Khởi động Backend API
```bash
cd backend
npm install
npm run seed
npm run dev
```
> Máy chủ API sẽ lắng nghe tại: `http://localhost:5001`.  
> Kiểm tra trạng thái máy chủ tại: `http://localhost:5001/health`.

### 5.3. Khởi động Frontend Web
```bash
cd frontend
npm install
npm run dev
```
> Ứng dụng giao diện web sẽ chạy tại: `http://localhost:5173`.

### 5.4. Khôi phục dữ liệu kiểm thử (Reset Data)
```bash
# Cách 1: Gọi qua HTTP API
curl -X POST http://localhost:5001/api/v1/admin/reset-data

# Cách 2: Chạy script từ thư mục backend
cd backend && npm run reset-db
```

---

## 6. Dữ liệu thử nghiệm và Tài khoản mẫu

Hệ thống cung cấp sẵn 4 tài khoản thử nghiệm xác định:
- **Admin**: `admin@badminton.vn` / `Admin@123`
- **Customer 1**: `customer1@gmail.com` / `Customer@123`
- **Customer 2**: `customer2@gmail.com` / `Customer@123`
- **Customer 3**: `customer3@gmail.com` / `Customer@123`

---

## 7. Danh mục Tài liệu Dự án trong thư mục `docs/`

1. [Ma trận ánh xạ Rubric](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/00_REQUIREMENT_MAPPING.md) (`00_REQUIREMENT_MAPPING.md`).
2. [Tài liệu Yêu cầu Người sử dụng (URD)](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/01_URD_BadmintonBooking.docx) (`01_URD_BadmintonBooking.docx` & `.md`).
3. [Đặc tả Yêu cầu Phần mềm (SRS)](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/02_SRS_BadmintonBooking.docx) (`02_SRS_BadmintonBooking.docx` & `.md`).
4. [Tài liệu Đặc tả API](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/03_API_DOCUMENTATION.md) (`03_API_DOCUMENTATION.md`).
5. [Tài khoản thử nghiệm và Dữ liệu mẫu](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/04_TEST_ACCOUNTS.md) (`04_TEST_ACCOUNTS.md`).
6. [Biên bản Bàn giao Hệ thống](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/05_HANDOVER.md) (`05_HANDOVER.md`).
7. [Checklist tự kiểm tra trước khi nộp](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/06_SUBMISSION_CHECKLIST.md) (`06_SUBMISSION_CHECKLIST.md`).
