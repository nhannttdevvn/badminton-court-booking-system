# DANH MỤC TÀI KHOẢN KIỂM THỬ VÀ DỮ LIỆU KHỞI TẠO (TEST ACCOUNTS & SEED DATA)
## DỰ ÁN: HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
### Phiên bản: `v3.0`

Tài liệu này cung cấp đầy đủ thông tin về các tài khoản kiểm thử được chuẩn hóa (Deterministic Test Accounts) và cấu trúc dữ liệu khởi tạo (Seed Data) để phục vụ quá trình kiểm thử phần mềm bằng Manual Test, Postman/Newman, Puppeteer và JMeter.

---

## 1. Danh sách Tài khoản Kiểm thử (Deterministic Test Accounts)

> [!NOTE]
> Tất cả tài khoản dưới đây đều sử dụng thông tin kiểm thử giả định an toàn trong môi trường phát triển/thử nghiệm, tuyệt đối không dùng thông tin cá nhân thật.

| Vai trò (Role) | Họ và tên | Email đăng nhập | Mật khẩu kiểm thử | Mục đích sử dụng kiểm thử |
| :---: | :--- | :--- | :--- | :--- |
| **`ADMIN`** | Chủ Sân Quản Trị | `admin@badminton.vn` | `Admin@123` | - Kiểm thử quyền Quản trị viên.<br>- Gọi API `GET /api/v1/admin/bookings`.<br>- Hủy đơn tại quầy và gọi API Reset dữ liệu kiểm thử. |
| **`CUSTOMER`** | Nguyễn Văn An | `customer1@gmail.com` | `Customer@123` | - Tài khoản khách hàng chính (Khách hàng A).<br>- Dùng thực hiện luồng E2E đặt sân, xem lịch sử và hủy sân.<br>- Kiểm thử tranh chấp Concurrency với Customer 2. |
| **`CUSTOMER`** | Trần Thị Bình | `customer2@gmail.com` | `Customer@123` | - Tài khoản khách hàng phụ (Khách hàng B).<br>- Dùng kiểm thử tranh chấp cùng một slot với Customer 1.<br>- Kiểm thử bảo mật: Customer 2 không thể hủy đơn của Customer 1. |
| **`CUSTOMER`** | Lê Hoàng Cường | `customer3@gmail.com` | `Customer@123` | - Tài khoản khách hàng bổ sung (Khách hàng C).<br>- Dùng kiểm thử phân trang và đa người dùng đồng thời trong JMeter. |

---

## 2. Danh mục 6 Sân Cầu Lông (Seed Courts Data)

| Mã sân (`courtId`) | Tên sân | Loại thảm thi đấu | Đơn giá / giờ | Trạng thái | Ghi chú kiểm thử nghiệp vụ |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **1** | **Sân 1** | Thảm Enlio Tiêu Chuẩn | 120.000 VNĐ | `ACTIVE` | Sân chính phục vụ kịch bản kiểm thử E2E đặt sân (`FLOW-01`). |
| **2** | **Sân 2** | Thảm Enlio Tiêu Chuẩn | 120.000 VNĐ | `ACTIVE` | Sân phục vụ kiểm thử tranh chấp đặt trùng Concurrency (`FLOW-03`). |
| **3** | **Sân 3** | Thảm Yonex Thi Đấu | 150.000 VNĐ | `ACTIVE` | Sân kiểm thử hủy đơn và giải phóng slot (`FLOW-02`). |
| **4** | **Sân 4** | Thảm Yonex Thi Đấu | 150.000 VNĐ | `ACTIVE` | Sân phục vụ kiểm thử tải JMeter với nhiều khung giờ trống. |
| **5** | **Sân 5** | Thảm Alite Phong Trào | 100.000 VNĐ | `ACTIVE` | Sân kiểm thử phân trang và tìm kiếm. |
| **6** | **Sân 6** | Thảm Alite Phong Trào | 100.000 VNĐ | **`INACTIVE`** | **Sân bảo trì**: Dùng kiểm thử quy tắc chặn đặt sân không hoạt động (`COURT_INACTIVE`). |

---

## 3. Dữ liệu Đơn đặt sân mẫu (Seed Bookings Data)

Khi khởi động hoặc gọi API `POST /api/v1/admin/reset-data`, hệ thống tự động khởi tạo các đơn đặt mẫu đại diện cho các trạng thái:

| Mã đơn (`id`) | Mã hiển thị | Sân | Ngày đặt | Khung giờ | Khách đặt | Trạng thái | Mục đích kiểm thử |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **`101`** | `BK-SAMPLE-01` | Sân 1 | Ngày mai | `08:00-09:00` | Customer 1 | `CONFIRMED` | Đơn cách > 24h, kiểm thử hủy hợp lệ (`FLOW-02`). |
| **`102`** | `BK-SAMPLE-02` | Sân 2 | Ngày mai | `18:00-19:00` | Customer 2 | `CONFIRMED` | Đơn của Customer 2, kiểm thử chặn Customer 1 hủy đơn của Customer 2. |
| **`103`** | `BK-SAMPLE-03` | Sân 3 | Ngày hôm nay | Slot sát giờ (< 2h) | Customer 1 | `CONFIRMED` | Kiểm thử quy tắc chặn hủy khi còn dưới 2 giờ (`CANCEL_NOT_ALLOWED`). |
| **`104`** | `BK-SAMPLE-04` | Sân 1 | Hôm qua | `19:00-20:00` | Customer 1 | `CANCELLED` | Kiểm thử hiển thị đơn đã hủy trong lịch sử (`My Bookings`). |

---

## 4. Cách khôi phục dữ liệu kiểm thử (Reset Test Data)

Khi cần đưa toàn bộ dữ liệu kiểm thử về trạng thái chuẩn ban đầu sau khi chạy các bài test tự động:
1. **Qua cURL / Postman**:
   ```bash
   curl -X POST http://localhost:5001/api/v1/admin/reset-data
   ```
2. **Qua giao diện web**:
   Đăng nhập bằng tài khoản Admin (`admin@badminton.vn`), tại thanh điều hướng bấm nút **"🔄 Khôi phục dữ liệu mẫu"**.

