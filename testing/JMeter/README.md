# JMeter Performance Testing (Kiểm thử Hiệu năng & Tải)

## Giới thiệu
Thư mục này dùng để lưu trữ các kịch bản kiểm thử tải (Load Testing & Stress Testing) cho hệ thống đặt sân cầu lông bằng **Apache JMeter**.

## Mục tiêu kiểm thử
- Đo lường thời gian đáp ứng (Response Time) của API `GET /api/health` và các API tra cứu sân.
- Giả lập tải đồng thời từ 100 - 1000 người dùng cùng truy cập và đặt sân tại giờ cao điểm.
- Đánh giá khả năng chịu tải và chống nghẽn / race condition của hệ thống đặt sân.

## Hướng dẫn sử dụng
1. Cài đặt Apache JMeter (hoặc chạy qua brew: `brew install jmeter`).
2. Mở file kịch bản `.jmx` (ví dụ `badminton_court_load_test.jmx`).
3. Cấu hình Thread Group (Number of Threads, Ramp-Up Period, Loop Count).
4. Khởi chạy và xuất kết quả qua View Results Tree / Summary Report.
