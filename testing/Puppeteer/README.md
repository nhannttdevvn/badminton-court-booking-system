# Puppeteer E2E Testing (Kiểm thử Tự động Giao diện)

## Giới thiệu
Thư mục này dùng để chứa các kịch bản kiểm thử End-to-End (E2E) tự động bằng **Puppeteer**.

## Các kịch bản dự kiến
1. **test-homepage.js**: Mở trang chủ, kiểm tra tiêu đề `Badminton Court Booking System` và trạng thái backend health check.
2. **test-booking-flow.js**: Giả lập người dùng tìm sân, chọn giờ, điền thông tin và xác nhận đặt sân.
3. **test-cancel-flow.js**: Giả lập người dùng đăng nhập và bấm hủy sân.

## Hướng dẫn cài đặt & chạy thử
```bash
cd testing/Puppeteer
npm init -y
npm install puppeteer
node test-homepage.js
```
