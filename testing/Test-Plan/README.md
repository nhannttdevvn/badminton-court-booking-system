# Test Plan (Kế hoạch Kiểm thử)

## 1. Giới thiệu
Tài liệu Kế hoạch Kiểm thử cho dự án Hệ thống đặt sân cầu lông trực tuyến (Badminton Court Booking System).

## 2. Phạm vi kiểm thử (Scope)
- **Kiểm thử chức năng (Functional Testing)**:
  - Xác thực & Phân quyền (Authentication & Authorization)
  - Quản lý thông tin sân (Court Management)
  - Quy trình đặt sân (Booking Workflow)
  - Quy trình hủy đặt sân (Cancellation Workflow)
- **Kiểm thử phi chức năng (Non-Functional Testing)**:
  - Kiểm thử hiệu năng với Apache JMeter
  - Kiểm thử giao diện và E2E với Puppeteer
  - Kiểm thử bảo mật (SQL Injection, Unauthorized Access)

## 3. Môi trường kiểm thử (Test Environment)
- OS: macOS / Linux / Windows
- Node.js runtime: v20+
- Database: MySQL 8.0+
- Browsers: Chrome, Firefox, Safari
