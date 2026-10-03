# SRS - Software Requirements Specification (Đặc tả Yêu cầu Phần mềm)

## 1. Mục tiêu (Objective)
Tài liệu SRS chi tiết hóa các yêu cầu chức năng (Functional Requirements) và phi chức năng (Non-Functional Requirements) cho dự án Badminton Court Booking System.

## 2. Yêu cầu chức năng (Functional Requirements - FR)
- **FR-AUTH**: Đăng ký, đăng nhập, phân quyền JWT (Customer, Staff, Admin).
- **FR-COURT**: CRUD thông tin sân (tên sân, loại sân, tình trạng hoạt động, bảng giá giờ vàng/giờ thường).
- **FR-BOOKING**: 
  - Khách hàng chọn sân, ngày và khung giờ (slots).
  - Khóa slot tạm thời (hold slot) trong quá trình thanh toán.
  - Xác nhận đặt sân thành công và gửi thông báo/email.
- **FR-CANCEL**: Hủy lịch đặt sân trước giờ quy định (ví dụ trước 24h), tự động giải phóng slot sân.
- **FR-STAFF**: Check-in khách vào sân, đặt sân hộ khách tại chỗ.
- **FR-ADMIN**: Quản lý người dùng, quản lý doanh thu, xuất báo cáo.

## 3. Yêu cầu phi chức năng (Non-Functional Requirements - NFR)
- **NFR-PERF**: Thời gian phản hồi API < 500ms đối với các tác vụ tìm kiếm và xem lịch.
- **NFR-CONCURRENCY**: Xử lý đồng thời ngăn chặn hiện tượng double-booking (2 người cùng đặt 1 sân tại cùng thời điểm).
- **NFR-SEC**: Mã hóa mật khẩu với bcrypt, xác thực qua JWT token.
- **NFR-RESPONSIVE**: Giao diện thích ứng tốt trên cả Mobile và Desktop.
