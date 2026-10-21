# TÀI LIỆU THIẾT KẾ VÀ ĐẶC TẢ API
## (API Specification Document – Theo Mẫu 01)
# HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN
### Badminton Court Booking System
**Phiên bản**: v1.0  
**Ngày lập**: 21/10/2026  
**Người lập**: Chưa xác định — chưa có nguồn xác nhận (Cần bổ sung Họ tên, MSSV)  
**Căn cứ áp dụng**: Theo chuẩn `TAILIEU/Mau_01_Tai_lieu_API.docx` và chi tiết hóa từ SRS v1.0  
**Trạng thái tài liệu**: **BẢN NHÁP THIẾT KẾ API — ĐÃ TÁCH RIÊNG RẼ ENDPOINT ĐÃ CÓ CODE VÀ ENDPOINT DỰ KIẾN**

---

> [!IMPORTANT]
> **PHÂN ĐỊNH RẠCH RÒI HIỆN TRẠNG MÃ NGUỒN THEO NGUYÊN TẮC KHÔNG BỊA ĐẶT**:
> 1. **Endpoint ĐÃ CÓ MÃ NGUỒN THỰC TẾ VÀ ĐÃ KIỂM CHỨNG**: Duy nhất `GET /api/health` (và route gốc `GET /`) được cài đặt trong `backend/src/server.js` và `backend/src/routes/health.js`, lắng nghe tại cổng 5001.
> 2. **Các Endpoint DỰ KIẾN THEO THIẾT KẾ SRS**: Toàn bộ các API nghiệp vụ (Auth, Court, Booking, Cancel, Checkin, Report) là **THIẾT KẾ MỤC TIÊU DỰ KIẾN, HOÀN TOÀN CHƯA ĐƯỢC TRIỂN KHAI TRONG MÃ NGUỒN BACKEND**. Tester không thể gọi các endpoint này trên mã nguồn hiện tại vì server sẽ trả về lỗi `404 Not Found`.

---

## 1. Thông tin chung

| Mục | Nội dung quy chuẩn | Tình trạng nguồn xác nhận |
| :--- | :--- | :---: |
| **Base URL (Local Dev)** | `http://localhost:5001/api` | **Đã có mã nguồn** (Cổng thực tế trong `server.js`) |
| **Base URL (Staging / Production)**| Chưa xác định — chưa có nguồn xác nhận (Cần URL server khi deploy) | *Chưa xác định* |
| **Định dạng dữ liệu** | `application/json; charset=utf-8` | **Đã có mã nguồn** (`express.json()`) |
| **Cơ chế xác thực (Auth)** | `Bearer Token (JWT)` | *Đề xuất kỹ thuật theo SRS* (Chưa code) |
| **Cách lấy Token** | Gọi `POST /api/auth/login`, trích xuất trường `data.token` | *Theo thiết kế dự kiến* |
| **Thời hạn Token** | 60 phút (3600 giây) | *[Đề xuất kỹ thuật chờ xác nhận]* |
| **Định dạng Ngày Giờ** | `ISO 8601` (`YYYY-MM-DDTHH:mm:ss.sssZ`) hoặc `YYYY-MM-DD` | **Đã có mã nguồn** trong health check |

---

## 2. Mã lỗi chung của hệ thống

| Mã HTTP | Ý nghĩa chuẩn | Mô tả lỗi trong hệ thống | Cấu trúc Body phản hồi mẫu |
| :---: | :--- | :--- | :--- |
| **200** | OK | Thao tác truy vấn hoặc cập nhật thành công | `{"status": "success", "data": { ... }}` |
| **201** | Created | Khởi tạo tài nguyên mới thành công | `{"status": "success", "data": { "id": "...", ... }}` |
| **400** | Bad Request | Dữ liệu đầu vào vi phạm ràng buộc định dạng hoặc nghiệp vụ | `{"error": "ERR_VALIDATION_FAILED", "message": "...", "fields": { ... }}` |
| **401** | Unauthorized | Chưa gửi token, token sai hoặc token đã hết hạn | `{"error": "ERR_UNAUTHORIZED", "message": "Phiên làm việc không hợp lệ hoặc đã hết hạn"}` |
| **403** | Forbidden | Đã đăng nhập nhưng không đủ quyền thực hiện hành động | `{"error": "ERR_FORBIDDEN", "message": "Bạn không có quyền thực hiện thao tác này"}` |
| **404** | Not Found | Không tìm thấy tài nguyên (mã sân, mã đơn đặt) | `{"error": "ERR_NOT_FOUND", "message": "Không tìm thấy dữ liệu yêu cầu"}` |
| **409** | Conflict | Xung đột dữ liệu (slot đã bị người khác giữ chỗ, trùng SĐT) | `{"error": "ERR_SLOT_ALREADY_LOCKED", "message": "Khung giờ vừa chọn đã có người giữ chỗ"}` |
| **500** | Internal Error | Lỗi máy chủ hoặc mất kết nối cơ sở dữ liệu | `{"error": "ERR_INTERNAL_SERVER", "message": "Lỗi máy chủ nội bộ"}` |

---

## 3. Danh sách Endpoint và Hiện trạng triển khai

### 3.1. Nhóm Endpoint ĐÃ CÓ MÃ NGUỒN THỰC TẾ
| STT | Method | Endpoint | Mô tả | Chức năng (FR) | Vai trò | Tình trạng mã nguồn thực tế |
| :---: | :---: | :--- | :--- | :---: | :---: | :---: |
| 1 | `GET` | `/api/health` | Kiểm tra trạng thái hoạt động của Backend API | Hệ thống | Tất cả | **ĐÃ CÓ MÃ NGUỒN & ĐÃ CHẠY TEST (HTTP 200)** |
| 2 | `GET` | `/` | Endpoint trang gốc giới thiệu service | Hệ thống | Tất cả | **ĐÃ CÓ MÃ NGUỒN (`backend/src/server.js`)** |

### 3.2. Nhóm Endpoint DỰ KIẾN THEO THIẾT KẾ SRS (CHƯA TRIỂN KHAI)
| STT | Method | Endpoint | Mô tả nghiệp vụ dự kiến | Chức năng (FR) | Vai trò được phép | Tình trạng mã nguồn thực tế |
| :---: | :---: | :--- | :--- | :---: | :---: | :---: |
| 3 | `POST` | `/api/auth/register` | Đăng ký tài khoản Khách hàng mới | `FR-01` | Khách vãng lai | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 4 | `POST` | `/api/auth/login` | Đăng nhập và lấy JWT token | `FR-02` | Tất cả | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 5 | `GET` | `/api/auth/me` | Lấy thông tin tài khoản hiện tại | `FR-03` | Đã đăng nhập | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 6 | `GET` | `/api/courts` | Lấy danh sách sân cầu lông | `FR-04` | Tất cả | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 7 | `POST` | `/api/courts` | Thêm sân mới (chỉ Admin) | `FR-04` | Chỉ `ADMIN` | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 8 | `PUT` | `/api/courts/:courtId` | Sửa thông tin hoặc chuyển bảo trì sân | `FR-04` | Chỉ `ADMIN` | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 9 | `GET` | `/api/courts/pricing` | Xem bảng giá giờ thường & giờ cao điểm | `FR-05` | Tất cả | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 10 | `PUT` | `/api/courts/pricing` | Cấu hình bảng giá (chỉ Admin) | `FR-05` | Chỉ `ADMIN` | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 11 | `GET` | `/api/slots/availability`| Tra cứu khung giờ trống theo ngày | `FR-06` | Tất cả | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 12 | `POST` | `/api/bookings/hold` | Khóa tạm thời khung giờ (Hold slot 10p) | `FR-07` | Customer, Staff, Admin | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 13 | `POST` | `/api/bookings/confirm` | Xác nhận tạo đơn đặt sân chính thức | `FR-08` | Customer, Staff, Admin | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 14 | `POST` | `/api/bookings/walk-in` | Đặt sân tại quầy cho khách vãng lai | `FR-09` | Staff, Admin | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 15 | `POST` | `/api/bookings/:id/cancel`| Hủy lịch đặt sân tự phục vụ | `FR-10` | Customer, Staff, Admin | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 16 | `PUT` | `/api/bookings/:id/checkin`| Điểm danh khách vào sân | `FR-11` | Staff, Admin | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |
| 17 | `GET` | `/api/reports/revenue` | Báo cáo doanh thu & hiệu suất sân | `FR-12` | Chỉ `ADMIN` | *CHƯA TRIỂN KHAI TRONG MÃ NGUỒN* |

---

## 4. Đặc tả chi tiết từng Endpoint

---

### 4.1. [ĐÃ CÓ MÃ NGUỒN] `GET /api/health` – Kiểm tra trạng thái hệ thống
- **Method & URL**: `GET {{baseUrl}}/health`
- **Mã nguồn thực tế**: `backend/src/routes/health.js`
- **Mô tả**: Kiểm tra dịch vụ Express server đang sống và đo thời gian uptime.
- **Headers**: Không yêu cầu.
- **Request Body**: Không có.
- **Response thực tế đo được (200 OK)**:
```json
{
  "status": "ok",
  "service": "Badminton Court Booking System API",
  "uptime": 4.29,
  "timestamp": "2026-10-03T09:32:16.223Z"
}
```

---

### 4.2. [THEO THIẾT KẾ DỰ KIẾN] `POST /api/auth/login` – Đăng nhập hệ thống
- **Method & URL**: `POST {{baseUrl}}/auth/login`
- **Tình trạng mã nguồn**: *CHƯA TRIỂN KHAI*
- **Mô tả nghiệp vụ**: Xác thực danh tính và trả về JWT token.
- **Request Body dự kiến**:
```json
{
  "loginId": "0912345678",
  "password": "Password@123"
}
```
- **Response thành công dự kiến (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "userId": "USR-1001",
      "fullName": "Nguyễn Văn A",
      "role": "CUSTOMER"
    }
  }
}
```
- **Response lỗi dự kiến**: `401 Unauthorized`: `{"error": "ERR_INVALID_CREDENTIALS", "message": "Thông tin đăng nhập không chính xác"}`.

---

### 4.3. [THEO THIẾT KẾ DỰ KIẾN] `GET /api/slots/availability` – Tra cứu lịch sân trống
- **Method & URL**: `GET {{baseUrl}}/slots/availability?date=2026-10-25`
- **Tình trạng mã nguồn**: *CHƯA TRIỂN KHAI*
- **Query Params**: `date` (YYYY-MM-DD, bắt buộc).
- **Response thành công dự kiến (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "date": "2026-10-25",
    "courts": [
      {
        "courtId": "CRT-01",
        "courtName": "Sân 01 - Tiêu chuẩn",
        "slots": [
          { "slotId": "SLOT-01-08", "time": "08:00 - 09:00", "price": 80000, "status": "AVAILABLE" },
          { "slotId": "SLOT-01-18", "time": "18:00 - 19:00", "price": 140000, "status": "BOOKED" }
        ]
      }
    ]
  }
}
```

---

### 4.4. [THEO THIẾT KẾ DỰ KIẾN] `POST /api/bookings/hold` – Khóa tạm thời khung giờ
- **Method & URL**: `POST {{baseUrl}}/bookings/hold`
- **Tình trạng mã nguồn**: *CHƯA TRIỂN KHAI*
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body dự kiến**:
```json
{
  "courtId": "CRT-01",
  "date": "2026-10-25",
  "slotIds": ["SLOT-01-19"]
}
```
- **Response thành công dự kiến (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "holdToken": "HOLD-7f9a8b1c-20261025-0012",
    "holdUntil": "2026-10-21T09:45:00.000Z",
    "expiresInSeconds": 600
  }
}
```
- **Response lỗi dự kiến (409 Conflict)**: `{"error": "ERR_SLOT_ALREADY_LOCKED", "message": "Khung giờ này vừa có người giữ chỗ"}`.

---

### 4.5. [THEO THIẾT KẾ DỰ KIẾN] `POST /api/bookings/confirm` – Xác nhận tạo đơn đặt sân
- **Method & URL**: `POST {{baseUrl}}/bookings/confirm`
- **Tình trạng mã nguồn**: *CHƯA TRIỂN KHAI*
- **Request Body dự kiến**:
```json
{
  "holdToken": "HOLD-7f9a8b1c-20261025-0012",
  "customerName": "Nguyễn Văn A",
  "customerPhone": "0912345678"
}
```
- **Response thành công dự kiến (201 Created)**:
```json
{
  "status": "success",
  "data": {
    "bookingId": "BK-20261025-0042",
    "courtName": "Sân 01 - Tiêu chuẩn",
    "totalAmount": 140000,
    "status": "CONFIRMED"
  }
}
```

---

### 4.6. [THEO THIẾT KẾ DỰ KIẾN] `POST /api/bookings/:id/cancel` – Hủy lịch đặt sân
- **Method & URL**: `POST {{baseUrl}}/bookings/BK-20261025-0042/cancel`
- **Tình trạng mã nguồn**: *CHƯA TRIỂN KHAI*
- **Response thành công dự kiến (200 OK)**:
```json
{
  "status": "success",
  "message": "Hủy đơn đặt sân thành công. Khung giờ đã được giải phóng",
  "data": {
    "bookingId": "BK-20261025-0042",
    "status": "CANCELLED"
  }
}
```
- **Response lỗi dự kiến (400 Bad Request)**: `{"error": "ERR_CANCEL_TOO_LATE", "message": "Không thể hủy sân trước giờ chơi dưới 24 giờ"}`.

---

## 5. Tài khoản kiểm thử API ĐỀ XUẤT CHO TESTER

> [!NOTE]
> Trong cơ sở dữ liệu hiện tại **CHƯA CÓ BẢNG `users` VÀ CHƯA CÓ TÀI KHOẢN THỰC TẾ**. Bảng dưới đây là **danh sách tài khoản đề xuất kỹ thuật** cần được khởi tạo vào cơ sở dữ liệu (seed data) khi lập trình module Auth:

| Vai trò | Tên đăng nhập / Số điện thoại đề xuất | Mật khẩu đề xuất | Mục đích kiểm thử dự kiến | Tình trạng tài khoản |
| :--- | :--- | :--- | :--- | :---: |
| **Khách hàng 1 (Customer)** | `0912345678` | `Customer@123` | Kiểm thử luồng đặt sân, tra cứu lịch sử, hủy hợp lệ | *[Chờ seed vào DB]* |
| **Khách hàng 2 (Customer)** | `0987654321` | `Customer@123` | Kiểm thử kịch bản tranh chấp slot (Race condition) | *[Chờ seed vào DB]* |
| **Nhân viên (Staff)** | `0901112223` | `Staff@12345` | Kiểm thử chức năng Check-in tại quầy, đặt cho khách vãng lai | *[Chờ seed vào DB]* |
| **Quản trị viên (Admin)** | `0909998887` | `Admin@123456` | Kiểm thử quản lý sân, sửa giá, xem báo cáo | *[Chờ seed vào DB]* |

---

## 6. Hướng dẫn Tester với Postman Collection hiện có
1. Mở phần mềm **Postman**.
2. Nhấn nút **Import**, chọn file [badminton-court-booking.postman_collection.json](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/testing/Postman/badminton-court-booking.postman_collection.json).
3. Biến môi trường `baseUrl` trỏ tới: `http://localhost:5001`.
4. Hiện tại file collection chỉ chứa request `GET {{baseUrl}}/api/health` tương ứng với mã nguồn hiện có. Tester có thể chạy request này để xác nhận backend đang sống với mã HTTP 200 OK.
