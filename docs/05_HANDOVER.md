# BIÊN BẢN BÀN GIAO HỆ THỐNG VÀ HỒ SƠ KIỂM THỬ (HANDOVER DOCUMENT)
## HỌC PHẦN: ĐÁNH GIÁ HIỆU NĂNG / SOFTWARE TESTING
### HỆ THỐNG: ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
**Mã tài liệu**: `HANDOVER-BADMINTON-2026` | **Phiên bản**: `v3.0`  
**Bên giao (Chủ hệ thống)**: System Owner  
**Bên nhận (Kiểm thử viên)**: Tester (Bạn cặp độc lập)  

---

## I. Thông tin Triển khai và Đường dẫn Truy cập

* **Địa chỉ giao diện Web (Frontend URL)**: `http://localhost:5173`
* **Địa chỉ máy chủ API (Backend URL)**: `http://localhost:5001`
* **API Base URL**: `http://localhost:5001/api/v1`
* **API Health Check**: `http://localhost:5001/health`
* **Trình duyệt hỗ trợ chính thức**: Google Chrome (2 phiên bản mới nhất), Microsoft Edge (2 phiên bản mới nhất), Mozilla Firefox (2 phiên bản mới nhất).

---

## II. Danh mục Hồ sơ Tài liệu Bàn giao

| STT | Hạng mục bàn giao | Phiên bản / Đường dẫn file | Ghi chú |
| :---: | :--- | :--- | :--- |
| **1** | **Tài liệu Yêu cầu Người sử dụng (URD)** | `docs/01_URD_BadmintonBooking.docx` (`.md`) | Phiên bản v3.0 (3 vai trò, 8 US, 3 luồng E2E) |
| **2** | **Đặc tả Yêu cầu Phần mềm (SRS)** | `docs/02_SRS_BadmintonBooking.docx` (`.md`) | Phiên bản v3.0 (19 FR, 10 NFR, BVA, Decision Table, State, RTM) |
| **3** | **Tài liệu Thiết kế và Đặc tả API** | `docs/03_API_DOCUMENTATION.md` | Đặc tả chi tiết 14 endpoint chuẩn RESTful JSON UTF-8 |
| **4** | **Danh sách Tài khoản & Dữ liệu mẫu** | `docs/04_TEST_ACCOUNTS.md` | 4 tài khoản xác định, 6 sân, các đơn đặt mẫu |
| **5** | **Sản phẩm Web & Backend API** | `frontend/` & `backend/` | Hoạt động ổn định kèm tiện ích `npm run reset-db` |

---

## III. Danh sách Tài khoản Kiểm thử Xác định sẵn (Deterministic Test Accounts)

| Vai trò (Role) | Email đăng nhập | Mật khẩu kiểm thử | Ghi chú tác nghiệp |
| :---: | :--- | :--- | :--- |
| **`CUSTOMER`** | `customer1@gmail.com` | `Customer@123` | Khách hàng chính (Khách A). Có sẵn đơn đặt mẫu để kiểm thử hủy hợp lệ và hủy sát giờ. |
| **`CUSTOMER`** | `customer2@gmail.com` | `Customer@123` | Khách hàng phụ (Khách B). Có sẵn đơn đặt mẫu để kiểm thử phân quyền. |
| **`CUSTOMER`** | `customer3@gmail.com` | `Customer@123` | Khách hàng dự phòng phục vụ kiểm thử tải đa luồng và khóa đăng nhập. |
| **`ADMIN`** | `admin@badminton.vn` | `Admin@123` | Quản trị viên cơ sở sân, có quyền xem tất cả booking và hủy điều phối tại quầy. |

---

## IV. Hướng dẫn Khởi chạy Môi trường Kiểm thử Cục bộ

### 4.1. Khởi động Backend API
```bash
cd backend
npm install
npm run dev
# Máy chủ backend sẽ lắng nghe tại http://localhost:5001
```

### 4.2. Khởi động Frontend Web
```bash
cd frontend
npm install
npm run dev
# Ứng dụng web sẽ chạy tại địa chỉ http://localhost:5173
```

### 4.3. Khôi phục Dữ liệu Kiểm thử về Trạng thái Ban đầu (Reset Test Data)
Khi cần làm sạch dữ liệu về trạng thái khởi tạo chuẩn ban đầu sau các đợt chạy test tự động:
```bash
# Cách 1: Gọi qua API
curl -X POST http://localhost:5001/api/v1/admin/reset-data

# Cách 2: Chạy script từ thư mục backend
cd backend && npm run reset-db
```

---

## V. Bộ chọn Cố định phục vụ Kiểm thử Tự động (E2E Test Automation)

Frontend đã được gắn đầy đủ các thuộc tính `data-testid` cố định trên mọi phần tử tương tác để hỗ trợ viết script Puppeteer:
- **Đăng ký**: `register-name`, `register-email`, `register-password`, `register-confirm-password`, `register-submit`
- **Đăng nhập**: `login-email`, `login-password`, `login-submit`
- **Danh sách sân**: `court-list`, `court-card-{id}`, `court-detail-{id}`
- **Lịch sân & Đặt chỗ**: `booking-date`, `slot-{time}`, `booking-note`, `booking-submit`
- **Lịch sử đặt sân & Hủy sân**: `my-bookings`, `booking-{id}`, `booking-row-{id}`, `cancel-booking-{id}`, `confirm-cancel-btn`

---

## VI. Hạn chế đã biết (Known Scope Limitations)

Hệ thống được xây dựng đúng phạm vi 5 chức năng cốt lõi (Đăng ký, Đăng nhập, Xem sân & lịch sân, Đặt sân, Hủy đặt sân). Các chức năng ngoài phạm vi không triển khai gồm: thanh toán trực tuyến, mã khuyến mãi/voucher, tích điểm, chat, đánh giá sân, quản lý giải đấu, thuê phụ kiện, đặt đồ ăn.

---

## VII. Xác nhận và Cam kết Bàn giao

- [x] Truy cập được link sản phẩm (`http://localhost:5173` và `http://localhost:5001/health`).
- [x] Đăng nhập được mọi vai trò (`Customer`, `Admin`).
- [x] Nhận đủ toàn bộ tài liệu ở Mục II.
- **Cam kết của Bên giao**: Giữ nguyên hiện trạng sản phẩm, duy trì hoạt động ổn định trong suốt thời gian kiểm thử, phản hồi Bug Report trong vòng 48 giờ và tuân thủ bảo mật danh mục lỗi cài sẵn theo quy định học phần.
