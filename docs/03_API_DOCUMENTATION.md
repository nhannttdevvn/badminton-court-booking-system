# TÀI LIỆU THIẾT KẾ VÀ ĐẶC TẢ API (API DOCUMENTATION)
## DỰ ÁN: HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
### Phiên bản: `v3.0` | Base URL: `/api/v1`

---

## 1. Thông tin kỹ thuật chung

* **Địa chỉ máy chủ kiểm thử (Local URL)**: `http://localhost:5001`
* **Base URL**: `/api/v1`
* **Định dạng dữ liệu giao tiếp**: `application/json; charset=utf-8`
* **Cơ chế xác thực (Authentication)**:
  - Sử dụng Token định dạng JSON Web Token (JWT) truyền qua HTTP Header:  
    `Authorization: Bearer <token>`
  - Thời hạn hiệu lực của Token: `24 giờ`.
  - Đối với các API yêu cầu quyền đăng nhập (`Customer` hoặc `Admin`), nếu thiếu Token hoặc Token không hợp lệ thì trả về mã lỗi `HTTP 401 Unauthorized` kèm mã lỗi `UNAUTHORIZED`. Nếu người dùng không đủ thẩm quyền thì trả về `HTTP 403 Forbidden` kèm mã lỗi `FORBIDDEN`.
* **Cấu trúc phản hồi lỗi chuẩn (Standard Error Response)**:
```json
{
  "success": false,
  "errorCode": "STRING_ERROR_CODE",
  "message": "Mô tả chi tiết lỗi dành cho người dùng"
}
```

---

## 2. Bảng mã lỗi chung toàn hệ thống (Error Codes)

| Mã lỗi (Error Code) | Mã HTTP | Ý nghĩa nghiệp vụ | Body mẫu |
| :--- | :---: | :--- | :--- |
| **`VALIDATION_ERROR`** | `400` | Dữ liệu đầu vào vi phạm quy tắc định dạng hoặc giá trị biên | `{"success":false,"errorCode":"VALIDATION_ERROR","message":"Họ và tên phải có độ dài từ 2 đến 50 ký tự"}` |
| **`EMAIL_ALREADY_EXISTS`** | `400` | Email đăng ký đã tồn tại trong hệ thống (không phân biệt hoa thường) | `{"success":false,"errorCode":"EMAIL_ALREADY_EXISTS","message":"Email này đã được đăng ký tài khoản thành viên"}` |
| **`AUTH_INVALID_CREDENTIALS`**| `401` | Email hoặc mật khẩu không chính xác | `{"success":false,"errorCode":"AUTH_INVALID_CREDENTIALS","message":"Email hoặc mật khẩu không chính xác"}` |
| **`AUTH_LOCKED`** | `401` | Tài khoản tạm thời bị khóa 5 phút do nhập sai quá 5 lần | `{"success":false,"errorCode":"AUTH_LOCKED","message":"Tài khoản tạm thời bị khóa 5 phút do nhập sai mật khẩu quá 5 lần liên tiếp"}` |
| **`UNAUTHORIZED`** | `401` | Thiếu Bearer Token hoặc Token không hợp lệ/hết hạn | `{"success":false,"errorCode":"UNAUTHORIZED","message":"Vui lòng đăng nhập để tiếp tục"}` |
| **`FORBIDDEN`** | `403` | Người dùng không đủ thẩm quyền truy cập tài nguyên | `{"success":false,"errorCode":"FORBIDDEN","message":"Bạn không có quyền thực hiện thao tác này"}` |
| **`COURT_NOT_FOUND`** | `404` | Mã sân cầu lông không tồn tại | `{"success":false,"errorCode":"COURT_NOT_FOUND","message":"Không tìm thấy thông tin sân cầu lông"}` |
| **`COURT_INACTIVE`** | `400` | Sân thi đấu đang tạm ngừng hoạt động hoặc bảo trì | `{"success":false,"errorCode":"COURT_INACTIVE","message":"Sân này đang tạm ngừng hoạt động để bảo trì. Vui lòng chọn sân khác"}` |
| **`INVALID_BOOKING_TIME`** | `400` | Ngày hoặc khung giờ đặt nằm trong quá khứ | `{"success":false,"errorCode":"INVALID_BOOKING_TIME","message":"Không thể đặt sân cho khung giờ trong quá khứ"}` |
| **`SLOT_NOT_AVAILABLE`** | `409` | **Tranh chấp đặt trùng**: Khung giờ đã hoặc vừa có người đặt thành công | `{"success":false,"errorCode":"SLOT_NOT_AVAILABLE","message":"Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác"}` |
| **`BOOKING_NOT_FOUND`** | `404` | Không tìm thấy mã đơn đặt sân | `{"success":false,"errorCode":"BOOKING_NOT_FOUND","message":"Không tìm thấy đơn đặt sân trên hệ thống"}` |
| **`CANCEL_NOT_ALLOWED`** | `400` | Không đủ điều kiện hủy (thời gian đến giờ chơi < 2h, hoặc đơn đã hủy) | `{"success":false,"errorCode":"CANCEL_NOT_ALLOWED","message":"Không thể hủy sân. Chỉ được hủy trước thời gian bắt đầu ít nhất 2 giờ"}` |
| **`INTERNAL_ERROR`** | `500` | Lỗi máy chủ nội bộ hoặc cơ sở dữ liệu | `{"success":false,"errorCode":"INTERNAL_ERROR","message":"Lỗi hệ thống nội bộ máy chủ"}` |

---

## 3. Bảng tổng hợp danh sách 13 Endpoint của hệ thống

| STT | Method | Endpoint | Mô tả nghiệp vụ | Mã chức năng (SRS) | Vai trò được phép |
| :---: | :---: | :--- | :--- | :---: | :---: |
| **1** | `POST` | `/api/v1/auth/register` | Đăng ký tài khoản khách hàng mới | `FR-REG-01..03` | Guest (Public) |
| **2** | `POST` | `/api/v1/auth/login` | Đăng nhập xác thực nhận JWT Token | `FR-AUTH-01..02` | Guest, Customer, Admin |
| **3** | `GET` | `/api/v1/auth/me` | Lấy thông tin người dùng hiện tại từ Token | `FR-AUTH-03` | Customer, Admin |
| **4** | `GET` | `/api/v1/courts` | Lấy danh sách toàn bộ 6 sân cầu lông | `FR-COURT-01` | Public |
| **5** | `GET` | `/api/v1/courts/{id}` | Xem chi tiết thông tin 1 sân cầu lông | `FR-COURT-02` | Public |
| **6** | `GET` | `/api/v1/courts/{id}/availability` | Tra cứu lịch 16 khung giờ trống/đã đặt theo ngày | `FR-COURT-03..04` | Public |
| **7** | `POST` | `/api/v1/bookings` | Tạo đơn đặt sân cho khung giờ còn trống | `FR-BOOK-01..03` | Customer, Admin |
| **8** | `GET` | `/api/v1/bookings/me` | Xem danh sách lịch sử đặt sân của bản thân | `FR-BOOK-04` | Customer, Admin |
| **9** | `GET` | `/api/v1/bookings/{id}` | Xem chi tiết thông tin 1 đơn đặt sân | `FR-BOOK-04` | Owner Customer, Admin |
| **10** | `PATCH` | `/api/v1/bookings/{id}/cancel` | Khách hàng hủy đơn đặt sân của chính mình (≥ 2h) | `FR-CANCEL-01..03` | Owner Customer, Admin |
| **11** | `GET` | `/api/v1/admin/bookings` | Quản trị viên xem toàn bộ đơn đặt sân hệ thống | `FR-ADMIN-01` | Admin |
| **12** | `PATCH` | `/api/v1/admin/bookings/{id}/cancel`| Quản trị viên hủy điều phối đơn đặt sân tại quầy | `FR-ADMIN-02` | Admin |
| **13** | `POST` | `/api/v1/admin/reset-data` | Khôi phục dữ liệu kiểm thử về trạng thái mặc định | Hỗ trợ kiểm thử | Public / Admin |
| **14** | `GET` | `/health` (hoặc `/api/health`) | Kiểm tra trạng thái sẵn sàng của máy chủ API | `NFR-AVAIL-01` | Public |

---

## 4. Đặc tả chi tiết từng Endpoint

---

### 4.1. `POST /api/v1/auth/register` – Đăng ký tài khoản thành viên
* **Quyền truy cập**: Public (Guest)
* **Headers**: `Content-Type: application/json`
* **Bảng tham số Request Body**:

| Trường | Kiểu | Bắt buộc | Ràng buộc (SRS) | Mô tả |
| :--- | :---: | :---: | :--- | :--- |
| `fullName` | `string` | Có | Độ dài 2 – 50 ký tự sau khi cắt khoảng trắng (`VAL-REG-01`) | Họ và tên đầy đủ của khách hàng |
| `email` | `string` | Có | Format RFC 5322, ≤ 100 ký tự, duy nhất không phân biệt hoa thường (`VAL-REG-02..03`) | Địa chỉ email đăng nhập |
| `password` | `string` | Có | Độ dài 8 – 20 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số (`VAL-REG-04`) | Mật khẩu tài khoản |
| `confirmPassword` | `string` | Có | Trùng khớp 100% với `password` (`VAL-REG-05`) | Xác nhận lại mật khẩu |

* **Request Body mẫu**:
```json
{
  "fullName": "Nguyễn Văn An",
  "email": "newcustomer@gmail.com",
  "password": "Customer@123",
  "confirmPassword": "Customer@123"
}
```
* **Response thành công (`HTTP 201 Created`)**:
```json
{
  "success": true,
  "message": "Đăng ký tài khoản thành viên thành công",
  "data": {
    "userId": 5,
    "fullName": "Nguyễn Văn An",
    "email": "newcustomer@gmail.com",
    "role": "CUSTOMER"
  }
}
```
* **Response lỗi (`HTTP 400 Bad Request`)**:
  - `VALIDATION_ERROR`: Vi phạm độ dài họ tên (1 hoặc 51 ký tự), mật khẩu (7 hoặc 21 ký tự), hoặc xác nhận mật khẩu không khớp.
  - `EMAIL_ALREADY_EXISTS`: Email đã tồn tại trong CSDL.

---

### 4.2. `POST /api/v1/auth/login` – Đăng nhập hệ thống
* **Quyền truy cập**: Public
* **Request Body mẫu**:
```json
{
  "email": "customer1@gmail.com",
  "password": "Customer@123"
}
```
* **Response thành công (`HTTP 200 OK`)**:
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "userId": 2,
    "fullName": "Nguyễn Văn An",
    "email": "customer1@gmail.com",
    "role": "CUSTOMER"
  }
}
```
* **Response lỗi (`HTTP 401 Unauthorized`)**:
  - `AUTH_INVALID_CREDENTIALS`: Email hoặc mật khẩu không chính xác.
  - `AUTH_LOCKED`: Nhập sai liên tiếp 5 lần, tài khoản bị khóa tạm thời 5 phút.

---

### 4.3. `GET /api/v1/auth/me` – Lấy thông tin phiên đăng nhập hiện tại
* **Quyền truy cập**: Customer, Admin (`Authorization: Bearer <token>`)
* **Response thành công (`HTTP 200 OK`)**:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "fullName": "Nguyễn Văn An",
    "email": "customer1@gmail.com",
    "role": "CUSTOMER"
  }
}
```

---

### 4.4. `GET /api/v1/courts` – Lấy danh sách sân cầu lông
* **Quyền truy cập**: Public
* **Response thành công (`HTTP 200 OK`)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sân 1",
      "type": "Thảm Enlio Tiêu Chuẩn",
      "pricePerHour": 120000,
      "status": "ACTIVE",
      "description": "Sân thảm chống trượt chuẩn thi đấu phong trào"
    },
    {
      "id": 6,
      "name": "Sân 6",
      "type": "Thảm Alite Phong Trào",
      "pricePerHour": 100000,
      "status": "INACTIVE",
      "description": "Đang bảo trì hệ thống chiếu sáng"
    }
  ]
}
```

---

### 4.5. `GET /api/v1/courts/{id}` – Xem chi tiết thông tin sân
* **Quyền truy cập**: Public
* **Tham số Path**: `id` (integer, bắt buộc – mã sân từ 1 đến 6)
* **Response thành công (`HTTP 200 OK`)**: Trả về đối tượng sân tương ứng.
* **Response lỗi (`HTTP 404 Not Found`)**: Mã lỗi `COURT_NOT_FOUND` nếu mã sân không tồn tại.

---

### 4.6. `GET /api/v1/courts/{id}/availability` – Tra cứu lịch sân trống theo ngày
* **Quyền truy cập**: Public
* **Tham số Path**: `id` (integer, bắt buộc – mã sân)
* **Tham số Query**: `date` (string, định dạng `YYYY-MM-DD`, mặc định là ngày hiện tại)
* **Response thành công (`HTTP 200 OK`)**:
```json
{
  "success": true,
  "courtId": 1,
  "courtName": "Sân 1",
  "courtStatus": "ACTIVE",
  "pricePerHour": 120000,
  "date": "2026-10-25",
  "slots": [
    {
      "timeSlot": "06:00-07:00",
      "startTime": "06:00",
      "endTime": "07:00",
      "status": "AVAILABLE",
      "bookingId": null,
      "bookingCode": null,
      "customerName": null
    },
    {
      "timeSlot": "08:00-09:00",
      "startTime": "08:00",
      "endTime": "09:00",
      "status": "BOOKED",
      "bookingId": 101,
      "bookingCode": "BK-SAMPLE-01",
      "customerName": "Nguyễn Văn An"
    }
  ]
}
```

---

### 4.7. `POST /api/v1/bookings` – Tạo đơn đặt sân
* **Quyền truy cập**: Customer, Admin (`Authorization: Bearer <token>`)
* **Bảng tham số Request Body**:

| Trường | Kiểu | Bắt buộc | Ràng buộc (SRS) | Mô tả |
| :--- | :---: | :---: | :--- | :--- |
| `courtId` | `number` | Có | Sân phải tồn tại và có `status = ACTIVE` (`FR-BOOK-02`) | Mã định danh sân cầu lông |
| `bookingDate` | `string` | Có | Định dạng `YYYY-MM-DD`, không nằm trong quá khứ (`VAL-BOOK-01`) | Ngày đặt thi đấu |
| `timeSlot` | `string` | Có | Thuộc 1 trong 16 khung giờ cố định `06:00-07:00` .. `21:00-22:00` | Khung giờ thi đấu 60 phút |
| `note` | `string` | Không | Chuỗi văn bản ghi chú tùy chọn | Ghi chú kèm theo đơn đặt |

* **Request Body mẫu**:
```json
{
  "courtId": 1,
  "bookingDate": "2026-10-25",
  "timeSlot": "09:00-10:00",
  "note": "Chuẩn bị sân trước 5 phút"
}
```
* **Response thành công (`HTTP 201 Created`)**:
```json
{
  "success": true,
  "message": "Đặt sân thành công! Mã đơn: BK-20261025-1000",
  "data": {
    "id": 1000,
    "bookingCode": "BK-20261025-1000",
    "courtId": 1,
    "courtName": "Sân 1",
    "userId": 2,
    "customerName": "Nguyễn Văn An",
    "customerEmail": "customer1@gmail.com",
    "bookingDate": "2026-10-25",
    "timeSlot": "09:00-10:00",
    "startTime": "09:00",
    "endTime": "10:00",
    "totalPrice": 120000,
    "note": "Chuẩn bị sân trước 5 phút",
    "status": "CONFIRMED",
    "createdAt": "2026-10-24T14:00:00.000Z"
  }
}
```
* **Response lỗi**:
  - `HTTP 400 COURT_INACTIVE`: Đặt vào Sân 6 đang bảo trì.
  - `HTTP 400 INVALID_BOOKING_TIME`: Đặt ngày/giờ trong quá khứ.
  - `HTTP 409 SLOT_NOT_AVAILABLE`: Khung giờ đã có đơn `CONFIRMED` hoặc bị tranh chấp đồng thời.

---

### 4.8. `GET /api/v1/bookings/me` – Xem lịch sử đặt sân của chính mình
* **Quyền truy cập**: Customer, Admin (`Authorization: Bearer <token>`)
* **Response thành công (`HTTP 200 OK`)**: Danh sách các booking thuộc về `req.user.id` kèm cờ `canCancel`.

---

### 4.9. `GET /api/v1/bookings/{id}` – Xem chi tiết 1 đơn đặt sân
* **Quyền truy cập**: Chủ sở hữu đơn đặt (`Customer`) hoặc `Admin`.
* **Response lỗi**: `HTTP 403 FORBIDDEN` nếu Customer A truy cập đơn đặt của Customer B; `HTTP 404 BOOKING_NOT_FOUND` nếu ID không tồn tại.

---

### 4.10. `PATCH /api/v1/bookings/{id}/cancel` – Hủy đơn đặt sân
* **Quyền truy cập**: Chủ sở hữu đơn đặt (`Customer`) hoặc `Admin` (`Authorization: Bearer <token>`)
* **Request Body mẫu**:
```json
{
  "cancelReason": "Bận việc đột xuất"
}
```
* **Response thành công (`HTTP 200 OK`)**:
```json
{
  "success": true,
  "message": "Đã hủy lượt đặt sân thành công!",
  "data": {
    "id": 101,
    "bookingCode": "BK-SAMPLE-01",
    "status": "CANCELLED",
    "cancelledBy": 2,
    "cancelledAt": "2026-10-24T14:10:00.000Z",
    "cancelReason": "Bận việc đột xuất"
  }
}
```
* **Response lỗi**:
  - `HTTP 403 FORBIDDEN`: Customer cố tình hủy đơn đặt sân của Customer khác (`FR-CANCEL-02`).
  - `HTTP 400 CANCEL_NOT_ALLOWED`: Thời gian đến giờ bắt đầu slot còn dưới 2 giờ (`BUS-CANCEL-01`) hoặc đơn đã ở trạng thái `CANCELLED`.

---

### 4.11. `GET /api/v1/admin/bookings` – Admin xem toàn bộ đơn đặt sân
* **Quyền truy cập**: Chỉ `ADMIN` (`Customer` gọi trả về `HTTP 403 FORBIDDEN`).
* **Response thành công (`HTTP 200 OK`)**: Trả về `count` và mảng `data` chứa toàn bộ booking trên hệ thống.

---

### 4.12. `PATCH /api/v1/admin/bookings/{id}/cancel` – Admin hủy điều phối đơn đặt sân
* **Quyền truy cập**: Chỉ `ADMIN`. Cho phép hủy điều phối bất kỳ đơn đặt sân nào đang `CONFIRMED`.

---

### 4.13. `POST /api/v1/admin/reset-data` – Khôi phục dữ liệu kiểm thử về mặc định
* **Mục đích**: Đưa toàn bộ tài khoản, danh sách 6 sân và các booking mẫu về trạng thái khởi tạo chuẩn ban đầu để phục vụ chạy lại kịch bản kiểm thử tự động (Postman/Newman, Puppeteer, JMeter).

---

### 4.14. `GET /health` – Kiểm tra trạng thái sẵn sàng máy chủ
* **Response thành công (`HTTP 200 OK`)**:
```json
{
  "status": "ok",
  "service": "Badminton Court Booking System API",
  "uptime": 125.4,
  "timestamp": "2026-10-24T14:15:00.000Z"
}
```

---

## 5. Tài khoản dùng để gọi API

| Vai trò | Tên đăng nhập (Email) | Mật khẩu | Ghi chú |
| :---: | :--- | :--- | :--- |
| **`ADMIN`** | `admin@badminton.vn` | `Admin@123` | Toàn quyền quản trị và hủy điều phối |
| **`CUSTOMER`** | `customer1@gmail.com` | `Customer@123` | Khách hàng A (có sẵn booking mẫu 101, 103, 104, 999) |
| **`CUSTOMER`** | `customer2@gmail.com` | `Customer@123` | Khách hàng B (có sẵn booking mẫu 102) |
| **`CUSTOMER`** | `customer3@gmail.com` | `Customer@123` | Khách hàng C (dự phòng kiểm thử tải và khóa tài khoản) |
