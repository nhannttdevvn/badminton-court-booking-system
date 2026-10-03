# Test Cases (Bộ Kịch bản Kiểm thử)

## Danh sách Test Cases mẫu

| Test Case ID | Module | Mô tả kịch bản | Các bước thực hiện | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-HEALTH-01 | Health API | Kiểm tra API status | Gửi GET tới `/api/health` | Trả về status 200, status "ok" | 200 OK | Passed |
| TC-AUTH-01 | Auth | Đăng ký tài khoản hợp lệ | Nhập tên, email, mật khẩu | Tạo thành công user, trả về token | - | Pending |
| TC-BOOK-01 | Booking | Đặt sân trong slot trống | Chọn sân 1, giờ 18:00 - 19:00 | Tạo booking thành công | - | Pending |
| TC-BOOK-02 | Booking | Đặt trùng slot (Double booking) | 2 user cùng đặt 1 sân cùng giờ | 1 user thành công, 1 báo slot đã được đặt | - | Pending |
| TC-CANCEL-01| Cancel | Hủy lịch trước 24h | User nhấn nút hủy đặt sân | Hủy thành công, slot chuyển về khả dụng | - | Pending |
