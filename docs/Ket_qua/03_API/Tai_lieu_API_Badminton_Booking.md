# TÀI LIỆU THIẾT KẾ API (API SPECIFICATION)
## HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
### Phiên bản: v2.0 (Cập nhật ngày 21/10/2026 theo phạm vi mới)
> [!NOTE]
> **LỊCH SỬ THAY ĐỔI PHẠM VI DỰ ÁN**:  
> Phiên bản v2.0 này **thay thế hoàn toàn bản API v1.0 cũ** (vốn có 17 endpoint bao gồm Customer, Admin, Thanh toán, Báo cáo doanh thu).  
> Theo phạm vi mới, tài liệu được tinh gọn tập trung duy nhất vào các API phục vụ tác nghiệp của **Nhân viên (Staff)** gồm 5 chức năng: Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy đặt sân.

> [!WARNING]
> **NGUYÊN TẮC PHÂN ĐỊNH RẠCH RÒI HIỆN TRẠNG MÃ NGUỒN**:
> - **Endpoint duy nhất đã triển khai mã nguồn và kiểm thử hoạt động thực tế**: `GET /api/health` (tại cổng 5001).
> - **Toàn bộ các endpoint nghiệp vụ còn lại**: Đang ở trạng thái **BẢN NHÁP THIẾT KẾ DỰ KIẾN (THEO SRS v2.0)**, chưa có mã nguồn backend thực tế. Mọi cấu trúc Request, Response và Validation đều là thiết kế kỹ thuật phục vụ giai đoạn lập trình tiếp theo, tuyệt đối không được mô tả như đã hoạt động.

---

## 1. Thông tin chung về hệ thống API

* **Địa chỉ máy chủ cục bộ (Local Server URL)**: `http://localhost:5001`
* **Địa chỉ máy chủ triển khai công khai (Staging/Production)**: `[Chưa xác định — Chờ triển khai môi trường máy chủ tuần 6]`
* **Định dạng dữ liệu giao tiếp**: `application/json` (Encoding: `UTF-8`).
* **Cơ chế xác thực (Authentication)**:
  - Sử dụng Token định dạng JSON Web Token (JWT) truyền qua tiêu đề HTTP Request:  
    `Authorization: Bearer <token>`
  - Đối với các endpoint yêu cầu quyền Nhân viên, nếu thiếu Token hoặc Token không hợp lệ/hết hạn, hệ thống trả về mã lỗi HTTP `401 Unauthorized`.

---

## 2. Bảng mã lỗi chuẩn toàn hệ thống (General Error Codes)

| Mã lỗi HTTP | Tên mã lỗi chuẩn (Code) | Ý nghĩa nghiệp vụ |
| :---: | :--- | :--- |
| **`200 OK`** | `SUCCESS` | Yêu cầu thực hiện thành công (xem lịch, hủy sân, lấy thông tin). |
| **`201 Created`** | `CREATED` | Tạo mới tài nguyên thành công (đăng ký nhân viên, tạo đơn đặt sân). |
| **`400 Bad Request`** | `INVALID_INPUT` | Dữ liệu đầu vào sai định dạng, thiếu trường bắt buộc hoặc vi phạm ràng buộc nghiệp vụ. |
| **`401 Unauthorized`** | `UNAUTHORIZED` | Chưa đăng nhập, thiếu Token hoặc Token hết hạn/không hợp lệ. |
| **`404 Not Found`** | `NOT_FOUND` | Không tìm thấy tài nguyên yêu cầu (không tìm thấy sân, không tìm thấy đơn đặt). |
| **`409 Conflict`** | `DOUBLE_BOOKING_CONFLICT` | **Xung đột tranh chấp đặt trùng**: Khung giờ vừa bị người khác đặt thành công trước đó. |
| **`500 Internal Server Error`** | `INTERNAL_ERROR` | Lỗi máy chủ cơ sở dữ liệu hoặc ngoại lệ chưa được xử lý trong mã nguồn. |

---

## 3. Danh mục Endpoint theo phạm vi nghiệp vụ mới

| STT | Phương thức (Method) | Đường dẫn (Endpoint) | Chức năng nghiệp vụ tương ứng | Tình trạng mã nguồn thực tế |
| :---: | :---: | :--- | :--- | :---: |
| **1** | **`GET`** | `/api/health` | Kiểm tra trạng thái hoạt động của Backend & DB Pool | **ĐÃ CÓ MÃ NGUỒN CHẠY THẬT (PORT 5001)** |
| **2** | `POST` | `/api/auth/register` | `FR-01`: Đăng ký tài khoản nhân viên | *Thiết kế dự kiến — Chưa có mã nguồn* |
| **3** | `POST` | `/api/auth/login` | `FR-02`: Đăng nhập hệ thống nhân viên | *Thiết kế dự kiến — Chưa có mã nguồn* |
| **4** | `GET` | `/api/auth/me` | Lấy thông tin phiên làm việc của nhân viên hiện tại | *Thiết kế dự kiến — Chưa có mã nguồn* |
| **5** | `GET` | `/api/slots/availability` | `FR-03`: Xem bảng lịch sân trống theo ngày | *Thiết kế dự kiến — Chưa có mã nguồn* |
| **6** | `POST` | `/api/bookings` | `FR-04`: Đặt sân cho khách (kèm chống Double Booking) | *Thiết kế dự kiến — Chưa có mã nguồn* |
| **7** | `GET` | `/api/bookings/:id` | Xem chi tiết thông tin đơn đặt sân | *Thiết kế dự kiến — Chưa có mã nguồn* |
| **8** | `POST` | `/api/bookings/:id/cancel` | `FR-05`: Hủy đặt sân và giải phóng slot tức thời | *Thiết kế dự kiến — Chưa có mã nguồn* |

---

## 4. Đặc tả chi tiết từng Endpoint

---

### 4.1. `GET /api/health`
* **Mục đích**: Kiểm tra tình trạng sẵn sàng của server backend và kết nối MySQL pool.
* **Quyền truy cập**: Công khai (Không cần Token).
* **Tình trạng mã nguồn**: **ĐÃ TRIỂN KHAI THẬT tại `backend/src/server.js` (Chạy thành công tại cổng 5001)**.
* **Request Header**: Không yêu cầu.
* **Response Thành công (HTTP 200)**:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-10-21T02:40:00.000Z",
    "service": "badminton-court-booking-api"
  }
  ```

---

### 4.2. `POST /api/auth/register`
* **Mục đích**: `FR-01`: Đăng ký tài khoản nhân viên mới.
* **Quyền truy cập**: Công khai.
* **Tình trạng mã nguồn**: *Thiết kế dự kiến — Chưa có mã nguồn*.
* **Request Body mẫu**:
  ```json
  {
    "full_name": "Nguyễn Văn Nhân Viên",
    "phone": "0901112223",
    "password": "StaffPassword@123",
    "confirm_password": "StaffPassword@123"
  }
  ```
* **Ràng buộc kiểm tra (Validation)**:
  - `full_name`: 2-50 ký tự, bắt buộc.
  - `phone`: 10 ký tự số, đúng định dạng di động Việt Nam, duy nhất.
  - `password`: Tối thiểu 6 ký tự.
  - `confirm_password`: Phải trùng khớp với `password`.
* **Response Thành công (HTTP 201 Created)**:
  ```json
  {
    "success": true,
    "message": "Đăng ký tài khoản nhân viên thành công",
    "data": {
      "user_id": 1,
      "full_name": "Nguyễn Văn Nhân Viên",
      "phone": "0901112223",
      "role": "STAFF",
      "created_at": "2026-10-21T08:00:00.000Z"
    }
  }
  ```
* **Response Lỗi (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "code": "PHONE_ALREADY_EXISTS",
    "message": "Số điện thoại này đã được đăng ký tài khoản nhân viên"
  }
  ```

---

### 4.3. `POST /api/auth/login`
* **Mục đích**: `FR-02`: Đăng nhập xác thực nhân viên và cấp Token JWT.
* **Quyền truy cập**: Công khai.
* **Tình trạng mã nguồn**: *Thiết kế dự kiến — Chưa có mã nguồn*.
* **Request Body mẫu**:
  ```json
  {
    "phone": "0901112223",
    "password": "StaffPassword@123"
  }
  ```
* **Response Thành công (HTTP 200 OK)**:
  ```json
  {
    "success": true,
    "message": "Đăng nhập thành công",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "user_id": 1,
        "full_name": "Nguyễn Văn Nhân Viên",
        "phone": "0901112223",
        "role": "STAFF"
      }
    }
  }
  ```
* **Response Lỗi (HTTP 401 Unauthorized)**:
  ```json
  {
    "success": false,
    "code": "INVALID_CREDENTIALS",
    "message": "Số điện thoại hoặc mật khẩu không chính xác"
  }
  ```

---

### 4.4. `GET /api/slots/availability`
* **Mục đích**: `FR-03`: Lấy ma trận tình trạng sân và khung giờ theo ngày được chọn.
* **Quyền truy cập**: Bắt buộc đăng nhập (`Bearer Token`).
* **Tình trạng mã nguồn**: *Thiết kế dự kiến — Chưa có mã nguồn*.
* **Query Parameters**:
  - `date`: Bắt buộc, chuỗi ngày định dạng `YYYY-MM-DD` (Ví dụ: `date=2026-10-22`).
* **Response Thành công (HTTP 200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "date": "2026-10-22",
      "courts": [
        {
          "court_id": 1,
          "court_name": "Sân số 1",
          "slots": [
            {
              "time_slot": "06:00 - 07:00",
              "status": "AVAILABLE",
              "booking_id": null,
              "customer_name": null
            },
            {
              "time_slot": "07:00 - 08:00",
              "status": "BOOKED",
              "booking_id": 101,
              "customer_name": "Trần Thị Khách"
            }
          ]
        }
      ]
    }
  }
  ```

---

### 4.5. `POST /api/bookings`
* **Mục đích**: `FR-04`: Nhân viên tạo đơn đặt sân cho khách (Thực thi Transaction & Khóa chống Double Booking).
* **Quyền truy cập**: Bắt buộc đăng nhập quyền Nhân viên (`Bearer Token`).
* **Tình trạng mã nguồn**: *Thiết kế dự kiến — Chưa có mã nguồn*.
* **Request Body mẫu**:
  ```json
  {
    "court_id": 1,
    "booking_date": "2026-10-22",
    "time_slots": ["06:00 - 07:00"],
    "customer_name": "Lê Văn Khách",
    "customer_phone": "0988776655",
    "note": "Khách đặt 1 tiếng buổi sáng"
  }
  ```
* **Response Thành công (HTTP 201 Created)**:
  ```json
  {
    "success": true,
    "message": "Đặt sân thành công cho khách Lê Văn Khách",
    "data": {
      "booking_id": 102,
      "booking_code": "BK-20261022-0102",
      "court_id": 1,
      "court_name": "Sân số 1",
      "booking_date": "2026-10-22",
      "time_slots": ["06:00 - 07:00"],
      "customer_name": "Lê Văn Khách",
      "customer_phone": "0988776655",
      "status": "CONFIRMED",
      "created_by_staff_id": 1,
      "created_at": "2026-10-21T08:15:00.000Z"
    }
  }
  ```
* **Response Lỗi Xung đột Đặt trùng (HTTP 409 Conflict)**:
  ```json
  {
    "success": false,
    "code": "SLOT_ALREADY_BOOKED",
    "message": "Khung giờ này vừa có người đặt thành công. Vui lòng chọn khung giờ khác!"
  }
  ```

---

### 4.6. `POST /api/bookings/:id/cancel`
* **Mục đích**: `FR-05`: Hủy lượt đặt sân và giải phóng slot ngay lập tức.
* **Quyền truy cập**: Bắt buộc đăng nhập quyền Nhân viên (`Bearer Token`).
* **Tình trạng mã nguồn**: *Thiết kế dự kiến — Chưa có mã nguồn*.
* **URL Parameters**:
  - `id`: Mã số đơn đặt sân (Ví dụ: `/api/bookings/102/cancel`).
* **Request Body mẫu**:
  ```json
  {
    "cancel_reason": "Khách bận việc đột xuất gọi điện báo hủy"
  }
  ```
* **Response Thành công (HTTP 200 OK)**:
  ```json
  {
    "success": true,
    "message": "Đã hủy lượt đặt sân thành công. Khung giờ đã được giải phóng thành slot trống.",
    "data": {
      "booking_id": 102,
      "status": "CANCELLED",
      "cancelled_at": "2026-10-21T08:30:00.000Z",
      "cancelled_by_staff_id": 1
    }
  }
  ```
* **Response Lỗi (HTTP 400 Bad Request - Đã hủy trước đó)**:
  ```json
  {
    "success": false,
    "code": "ALREADY_CANCELLED",
    "message": "Lượt đặt sân này đã được hủy trước đó"
  }
  ```

---

## 5. Dữ liệu thử nghiệm mẫu đề xuất (Proposed Test Seed Data)

*(Gắn nhãn: `[Đề xuất kỹ thuật phục vụ kiểm thử — Chưa phải dữ liệu thực tế]`)*:
* **Tài khoản nhân viên mẫu**:
  - `phone`: `0901112223`
  - `password`: `StaffPassword@123`
* **Danh mục sân mẫu**: Cụm 4 sân (`Sân số 1`, `Sân số 2`, `Sân số 3`, `Sân số 4`).
* **Khung giờ mẫu**: 16 slot tròn giờ từ `06:00 - 07:00` đến `21:00 - 22:00`.
