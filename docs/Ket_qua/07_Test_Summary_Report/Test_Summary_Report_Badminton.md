# BÁO CÁO TỔNG KẾT KIỂM THỬ (TEST SUMMARY REPORT)
## [HỒ SƠ BÀN GIAO KẾT QUẢ KIỂM THỬ – TUẦN 14]
### HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN (BADMINTON COURT BOOKING SYSTEM)

> [!WARNING]
> **TÌNH TRẠNG TÀI LIỆU: BẢN NHÁP CẤU TRÚC BÁO CÁO — CHƯA CÓ SỐ LIỆU ĐO THỰC THI THỰC TẾ**.  
> Theo nguyên tắc trung thực học thuật của học phần Đánh giá hiệu năng, báo cáo này thiết lập **đầy đủ 100% cấu trúc, bảng đối chiếu NFR hiệu năng và tiêu chí đánh giá** theo Mẫu 05. Các ô số liệu thực thi, biểu đồ đo đạc của JMeter và tỷ lệ lỗi được đánh dấu rõ ràng `[CHỜ KẾT QUẢ THỰC TẾ CỦA TESTER]`. Tuyệt đối không giả mạo số liệu kiểm thử khi chưa chạy thực tế trên sản phẩm hoàn chỉnh của bạn cặp.

---

## 1. Tổng quan đợt kiểm thử

| Mục | Thông tin ghi nhận |
| :--- | :--- |
| **Hệ thống được kiểm thử** | Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System) |
| **Tester thực hiện** | `[Họ tên Tester - MSSV: ...]` |
| **Chủ hệ thống phát triển** | `[Nguyễn Thị Thanh Nhàn - MSSV: ...]` |
| **Link sản phẩm kiểm thử** | `http://localhost:5001` (Backend) / `http://localhost:5173` (Frontend) |
| **Thời gian thực hiện kiểm thử** | Tuần 6 đến Tuần 13 |
| **Căn cứ nghiệm thu** | Kế hoạch kiểm thử (`Test_Plan_Badminton_Booking.md`) và SRS v1.0 |

---

## 2. Độ phủ kiểm thử (Test Coverage)

### 2.1. Bảng theo dõi độ phủ theo chức năng và NFR

| Mã yêu cầu | Tên chức năng / Yêu cầu NFR | Số TC thiết kế | Đã chạy (Executed) | Pass | Fail | Blocked / Pending | Ghi chú kỹ thuật |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| `FR-01` | Đăng ký tài khoản Khách hàng | 10 | 0 | 0 | 0 | 10 | Chờ triển khai module Auth để chạy test |
| `FR-02` | Đăng nhập & Phân quyền JWT | 4 | 0 | 0 | 0 | 4 | Chờ triển khai endpoint `/api/auth/login` |
| `FR-03` | Quản lý hồ sơ & Lịch sử cá nhân | 2 | 0 | 0 | 0 | 2 | Chờ triển khai mã nguồn |
| `FR-04` | Quản lý danh mục sân cầu lông | 4 | 0 | 0 | 0 | 4 | Chờ triển khai API CRUD Court |
| `FR-05` | Cấu hình bảng giá theo khung giờ | 7 | 0 | 0 | 0 | 7 | Chờ triển khai bảng quyết định giá |
| `FR-06` | Tra cứu lịch sân trống (Slots) | 4 | 0 | 0 | 0 | 4 | Chờ triển khai timeline và query slots |
| `FR-07` | Khóa tạm thời slot (Hold 10p) | 4 | 0 | 0 | 0 | 4 | Chờ triển khai Pessimistic Locking MySQL |
| `FR-08` | Đặt sân trực tuyến | 4 | 0 | 0 | 0 | 4 | Chờ triển khai transaction tạo đơn |
| `FR-09` | Đặt sân tại quầy cho khách vãng lai | 1 | 0 | 0 | 0 | 1 | Chờ triển khai giao diện Staff |
| `FR-10` | Hủy đặt sân tự phục vụ trước 24h | 5 | 0 | 0 | 0 | 5 | Chờ triển khai logic kiểm tra thời gian hủy |
| `FR-11` | Tiếp đón & Check-in tại quầy | 3 | 0 | 0 | 0 | 3 | Chờ triển khai chức năng đổi trạng thái checkin |
| `FR-12` | Báo cáo doanh thu & Hiệu suất | 2 | 0 | 0 | 0 | 2 | Chờ triển khai nghiệp vụ thống kê |
| `FLOW-01` | Luồng E2E 1: Tìm sân → Khóa slot → Đặt sân | 3 | 0 | 0 | 0 | 3 | Chờ kịch bản E2E Puppeteer |
| `FLOW-02` | Luồng E2E 2: Hủy đặt sân → Giải phóng slot | 3 | 0 | 0 | 0 | 3 | Chờ kịch bản E2E Puppeteer |
| `FLOW-03` | Luồng E2E 3: Quản lý sân & Áp dụng bảng giá | 3 | 0 | 0 | 0 | 3 | Chờ kịch bản tích hợp Admin |
| `AUTHZ` | Phân quyền truy cập theo vai trò (RBAC) | 5 | 0 | 0 | 0 | 5 | Chờ middleware phân quyền |
| `NFR-01` | Hiệu năng tra cứu (P90 ≤ 1000ms) | 2 | 0 | 0 | 0 | 2 | Chờ chạy kịch bản JMeter tải thường |
| `NFR-02` | Khả năng chịu tải tăng dần (TPS ≥ 40) | 2 | 0 | 0 | 0 | 2 | Chờ chạy kịch bản JMeter Step Load |
| `NFR-03` | Sử dụng tài nguyên phần cứng (CPU/RAM) | 1 | 0 | 0 | 0 | 1 | Chờ đo đạc trong phiên chạy tải |
| `NFR-04` | Tính toàn vẹn chống Double Booking | 1 | 0 | 0 | 0 | 1 | Chờ chạy script Postman Concurrency |
| `NFR-05` | Bảo mật (Bcrypt + Chống Brute-force) | 2 | 0 | 0 | 0 | 2 | Chờ chạy script test bảo mật |
| `NFR-06` | Giao diện thích ứng (Responsive) | 2 | 0 | 0 | 0 | 2 | Chờ chạy Puppeteer chụp ảnh giao diện |
| `NFR-07` | Tính sẵn sàng liên tục (Uptime ≥ 99%) | 1 | 0 | 0 | 0 | 1 | Chờ thống kê chu kỳ Uptime tuần 6-14 |
| `NFR-08` | Khả năng tự phục hồi khi crash | 1 | 0 | 0 | 0 | 1 | Chờ chạy kịch bản giả lập crash |
| **SYS-HEALTH**| **Kiểm tra kết nối Baseline (`GET /api/health`)**| **2** | **2** | **2** | **0** | **0** | **ĐÃ CHẠY THỰC TẾ TRÊN BASELINE: PASS 100%** |
| **SYS-UI** | **Kiểm tra hiển thị Baseline (Trang Home React)** | **2** | **2** | **2** | **0** | **0** | **ĐÃ CHẠY THỰC TẾ TRÊN BASELINE: PASS 100%** |
| **TỔNG CỘNG** | | **80** | **4** | **4** | **0** | **76** | **Tỷ lệ Pass các hạng mục Baseline: 100%** |

---

## 3. Thống kê lỗi phát hiện (Bug Statistics)

### 3.1. Ma trận phân loại lỗi theo 5 loại và 4 mức nghiêm trọng

> [!NOTE]
> Khung bảng dưới đây được thiết lập sẵn. Các số liệu sẽ được tự động trích xuất từ Sheet `Bug_Report` sau khi Tester hoàn thành các phiên thực thi kiểm thử trên sản phẩm của bạn cặp.

| Loại lỗi (5 loại bắt buộc) | Critical | Major | Minor | Trivial | TỔNG CỘNG |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Functional (Chức năng)** | *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ]* |
| **Visual (Giao diện / Hiển thị)** | *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ]* |
| **Content (Nội dung / Chính tả)** | *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ]* |
| **Performance (Hiệu năng / Tải)**| *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ]* |
| **Crash (Sập ứng dụng / Treo trang)**| *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ T13]* | *[Chờ]* |
| **TỔNG SỐ LỖI** | *[Chờ]* | *[Chờ]* | *[Chờ]* | *[Chờ]* | *[Chờ T13]* |

---

## 4. Kiểm thử tự động (Automation Testing)

### 4.1. Kiểm thử API tự động – Postman & Newman
- **File Collection**: `testing/Postman/badminton-court-booking.postman_collection.json`
- **Số lượng request dự kiến**: ≥ 12 requests phủ các chức năng cốt lõi.
- **Dữ liệu kiểm thử âm (Negative Testing)**: Sử dụng file dữ liệu ngoại lệ `testing/Postman/test_data_negative.csv`.
- **Lệnh thực thi tự động qua CLI**:
  ```bash
  newman run testing/Postman/badminton-court-booking.postman_collection.json \
             -e testing/Postman/env_local.json \
             -d testing/Postman/test_data.csv \
             -r cli,htmlextra \
             --reporter-htmlextra-export testing/Postman/newman-report.html
  ```
- **Tình trạng file báo cáo HTML**: `[Chờ xuất file newman-report.html khi chạy bộ collection]`

### 4.2. Kiểm thử Giao diện tự động – Puppeteer
- **Kịch bản Luồng 1 (`FLOW-01`)**: Mở trang chủ → Tra cứu sân ngày mai → Chọn slot 18h-19h → Nhập thông tin khách → Xác nhận đặt → Chụp ảnh màn hình `screenshot_flow01_confirmed.png`.
- **Kịch bản Luồng 2 (`FLOW-02`)**: Đăng nhập → Mở trang Lịch sử đơn đặt → Bấm Hủy đơn trước 24h → Chụp ảnh màn hình thông báo giải phóng slot `screenshot_flow02_cancelled.png`.
- **Tình trạng ảnh chụp**: `[Chờ thực thi script Puppeteer để lưu trữ ảnh vào testing/Puppeteer/screenshots/]`

---

## 5. Kiểm thử hiệu năng (Apache JMeter Performance Testing)

### 5.1. Môi trường đo kiểm
- **Máy chủ kiểm thử (Server under test)**: Node.js v23 / Express. Cấu hình máy chủ theo SRS.
- **Máy tạo tải (Load Generator)**: macOS máy cá nhân của Tester / JMeter 5.6.3 (Non-GUI mode).
- **Khung giờ chạy tải chính thức**: Khung giờ được đăng ký với Giảng viên hướng dẫn môn học.

### 5.2. Kịch bản kiểm thử tải đã thiết kế
1. **Kịch bản Tải thông thường (Normal Load Test)**:
   - Mục tiêu: Đo lường thời gian đáp ứng ở điều kiện vận hành chuẩn.
   - Luồng đo: Gọi API tra cứu lịch sân trống `GET /api/slots/availability?date=...`
   - Số người dùng ảo (Threads): 20 Virtual Users.
   - Thời gian khởi động (Ramp-up): 30 giây.
   - Thời gian duy trì tải: 5 phút (300 giây).
2. **Kịch bản Tăng tải từng bước (Step Load Test)**:
   - Mục tiêu: Tìm điểm bão hòa (Saturation Point) và nút thắt cổ chai của hệ thống.
   - Các bậc tải: 10 user (2 phút) → 20 user (2 phút) → 50 user (2 phút) → 100 user (2 phút).

### 5.3. Bảng đối chiếu kết quả đo với Yêu cầu Hiệu năng trong SRS

| Mã NFR | Ngưỡng cam kết trong SRS | Giá trị thực tế đo được | Kết luận (Đạt / Không đạt) | Phân tích nguyên nhân & Nút thắt |
| :--- | :--- | :---: | :---: | :--- |
| **NFR-01** | Thời gian phản hồi **P90 ≤ 1000 ms**; Tỷ lệ lỗi **< 0.5%** với 20 người dùng đồng thời | *[Chờ chạy JMeter thật]* | *[Chờ]* | *[Chờ phân tích file .jtl]* |
| **NFR-02** | Khả năng chịu tải tăng dần: Throughput **≥ 40 req/s**; **P95 ≤ 2500 ms** | *[Chờ chạy JMeter thật]* | *[Chờ]* | *[Chờ phân tích biểu đồ HTML Dashboard]* |
| **NFR-03** | Mức tiêu thụ tài nguyên máy chủ: CPU trung bình **≤ 75%**; RAM **< 80%** | *[Chờ chạy JMeter thật]* | *[Chờ]* | *[Chờ log theo dõi hệ thống]* |

### 5.4. Nhận xét và Phân tích biểu đồ HTML Dashboard
- *(Mục này sẽ chèn hình ảnh 3 biểu đồ chính trích xuất từ JMeter HTML Dashboard sau khi chạy: Response Times Over Time, Throughput Over Time và Active Threads Over Time).*
- *(Nhận xét về điểm bão hòa, request có độ trễ lớn nhất và đề xuất giải pháp tối ưu hóa cơ sở dữ liệu / cache).*

---

## 6. Rủi ro còn lại và Hạn chế đã biết
1. Hệ thống hiện tại đang ở giai đoạn hoàn thiện khung Baseline và tài liệu thiết kế. Các ca kiểm thử nghiệm thu chuyên sâu cần được thực thi sau khi hoàn thành cài đặt mã nguồn các module nghiệp vụ và cấy lỗi cài sẵn.
2. Việc đo tải cần được thực hiện trên môi trường máy chủ độc lập (không chung tài nguyên với máy chạy JMeter) để phản ánh chính xác nhất năng lực chịu tải của hệ thống.

---

## 7. Kết luận nghiệm thu (Go / No-Go Decision)

- [ ] **GO – ĐỦ ĐIỀU KIỆN NGHIỆM THU ĐỒ ÁN**
- [x] **NO-GO – CHƯA ĐỦ ĐIỀU KIỆN NGHIỆM THU CHÍNH THỨC (ĐANG Ở GIAI ĐOẠN BASELINE)**

**Căn cứ kết luận**:
- Hệ thống đã hoàn thành việc thiết lập khung kiến trúc, API Health Check hoạt động chính xác 100% tại cổng 5001, giao diện React Vite sẵn sàng kết nối.
- Tuy nhiên, các phân hệ nghiệp vụ đặt sân chuyên sâu và bộ 15 lỗi cài sẵn đang trong quá trình lập trình hoàn thiện; do đó chưa đủ điều kiện nghiệm thu kết thúc đợt kiểm thử cuối cùng. Đề nghị tiếp tục triển khai các module code theo đúng đặc tả SRS v1.0.

---

## 8. Khai báo sử dụng công cụ AI (Academic AI Declaration)

| Tên công cụ | Mục đích sử dụng | Phạm vi áp dụng trong tài liệu | Mức độ hỗ trợ |
| :--- | :--- | :--- | :--- |
| **Antigravity AI (Google DeepMind)** | Hỗ trợ cấu trúc tài liệu theo mẫu của trường, định dạng Markdown và sinh sơ đồ Mermaid | Tài liệu Kế hoạch, URD, SRS, Thiết kế Test Plan và Báo cáo tổng kết | Soạn thảo khung sườn và đối chuẩn rubric |

