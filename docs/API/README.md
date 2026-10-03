# API Documentation (Tài liệu API)

## Base URL
- Development: `http://localhost:5001/api`

## Authentication
- Header: `Authorization: Bearer <token>`

---

## 1. System Health
### `GET /api/health`
Kiểm tra trạng thái hoạt động của Backend API.
- **Request Headers**: None
- **Response (200 OK)**:
```json
{
  "status": "ok",
  "message": "Badminton Court Booking System API is running",
  "timestamp": "2026-10-03T09:30:00.000Z"
}
```

---

## 2. Dự kiến các endpoints tiếp theo

### Authentication
- `POST /api/auth/register`: Đăng ký tài khoản
- `POST /api/auth/login`: Đăng nhập & lấy token
- `GET /api/auth/me`: Thông tin người dùng hiện tại

### Courts (Sân)
- `GET /api/courts`: Danh sách sân cầu lông
- `GET /api/courts/:id`: Chi tiết sân & bảng giá
- `POST /api/courts`: Thêm sân mới (Admin)
- `PUT /api/courts/:id`: Cập nhật sân (Admin)
- `DELETE /api/courts/:id`: Xóa/vô hiệu hóa sân (Admin)

### Bookings (Đặt sân)
- `GET /api/bookings`: Xem danh sách đặt sân
- `POST /api/bookings`: Tạo yêu cầu đặt sân mới (Customer)
- `POST /api/bookings/:id/cancel`: Hủy đặt sân (Customer/Staff)
- `PUT /api/bookings/:id/checkin`: Check-in khách vào sân (Staff)
