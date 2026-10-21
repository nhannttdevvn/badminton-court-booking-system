# BÁO CÁO TỔNG KẾT KIỂM THỬ (TEST SUMMARY REPORT)
## [HỒ SƠ BÀN GIAO KẾT QUẢ KIỂM THỬ – GIAI ĐOẠN BASELINE]
### HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
**Phiên bản**: v2.0 (Cập nhật ngày 21/10/2026 theo phạm vi mới)  
**Phạm vi hệ thống**: 1 Vai trò Nhân viên – 5 Chức năng (`FR-01` đến `FR-05`)  
**Căn cứ biểu mẫu**: `TAILIEU/Mau_05_Test_Summary_Report.docx`  

> [!WARNING]
> **TÌNH TRẠNG BÁO CÁO: BẢN NHÁP CẤU TRÚC ĐỐI CHIẾU – CHƯA CÓ DỮ LIỆU ĐO THỰC TẾ ĐẦY ĐỦ**.  
> Theo nguyên tắc trung thực học thuật, báo cáo này thiết lập **đầy đủ 100% khung sườn, bảng độ phủ kiểm thử và bảng đối chiếu NFR hiệu năng** theo Mẫu 05.  
> Do hệ thống hiện tại mới hoàn thành tầng Baseline (Express server port 5001, route `/api/health` và ứng dụng React port 5173), chỉ có **2 ca kiểm thử Baseline được ghi nhận kết quả thực tế (Pass 100%)**. Toàn bộ 27 ca kiểm thử nghiệp vụ chuyên sâu và các số liệu đo tải của JMeter được đánh dấu rõ ràng `[CHỜ KẾT QUẢ THỰC TẾ CỦA TESTER]`. Tuyệt đối không giả mạo số liệu kiểm thử hay tỷ lệ bug.

---

## 1. Tổng quan đợt kiểm thử

| Mục | Thông tin ghi nhận |
| :--- | :--- |
| **Tên hệ thống kiểm thử** | Hệ thống Đặt sân Cầu lông (Badminton Court Booking System) |
| **Phạm vi hệ thống** | 1 Vai trò nghiệp vụ: **Nhân viên (Staff)**; 5 Chức năng: Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy đặt sân |
| **Chủ hệ thống phát triển** | `[Nguyễn Thị Thanh Nhàn - MSSV: ...]` |
| **Tester thực hiện kiểm thử** | `[Họ tên Tester - Bạn cặp - MSSV: ...]` |
| **Link môi trường kiểm thử** | Backend: `http://localhost:5001` \| Frontend: `http://localhost:5173` |
| **Căn cứ nghiệm thu** | Kế hoạch kiểm thử (`Test_Plan_Badminton_Booking.md` v2.0) và SRS v2.0 |

---

## 2. Bảng theo dõi độ phủ kiểm thử (Test Coverage)

| Mã yêu cầu | Hạng mục kiểm thử | Số TC thiết kế | Đã chạy (Executed) | Pass | Fail | Pending / Chờ code | Ghi chú kỹ thuật |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **SYS-HEALTH**| **Kiểm tra kết nối Backend API (`GET /api/health`)** | **1** | **1** | **1** | **0** | **0** | **ĐÃ CHẠY THỰC TẾ TRÊN BASELINE: PASS 100%** |
| **SYS-UI** | **Kiểm tra khởi động Frontend React (Home Page)** | **1** | **1** | **1** | **0** | **0** | **ĐÃ CHẠY THỰC TẾ TRÊN BASELINE: PASS 100%** |
| `FR-01` | Đăng ký tài khoản nhân viên | 4 | 0 | 0 | 0 | 4 | Chờ triển khai module Auth để chạy test |
| `FR-02` | Đăng nhập hệ thống & Phân quyền JWT | 3 | 0 | 0 | 0 | 3 | Chờ triển khai endpoint `/api/auth/login` |
| `FR-03` | Xem lịch đặt sân (Timeline theo ngày) | 2 | 0 | 0 | 0 | 2 | Chờ triển khai component ma trận lịch |
| `FR-04` | Đặt sân cho khách (kèm cập nhật lịch) | 3 | 0 | 0 | 0 | 3 | Chờ triển khai transaction tạo đơn đặt |
| `FR-04-CONC` | **Kiểm thử tranh chấp đặt trùng (Double Booking)** | 1 | 0 | 0 | 0 | 1 | Chờ kịch bản concurrency test đa luồng |
| `FR-05` | Hủy đặt sân & Giải phóng slot tức thời | 3 | 0 | 0 | 0 | 3 | Chờ triển khai popup và cập nhật trạng thái |
| **RESPONSIVE**| **Kiểm thử Responsive bắt buộc (320px..1366px)** | **7** | 0 | 0 | 0 | **7** | Chờ giao diện hoàn thiện để đo viewport |
| `NFR-02` | Hiệu năng tra cứu lịch (JMeter P90 ≤ 1000ms) | 1 | 0 | 0 | 0 | 1 | Chờ phiên chạy tải JMeter chính thức |
| **TỔNG CỘNG** | | **29** | **2** | **2** | **0** | **27** | **Tỷ lệ Pass các hạng mục Baseline: 100%** |

---

## 3. Thống kê lỗi phát hiện (Bug Statistics)

> [!NOTE]
> Bảng thống kê được thiết lập sẵn khung phân loại 5 nhóm lỗi. Các ô số liệu sẽ được tự động điền vào sau các phiên thực thi kiểm thử chính thức của Tester trên sản phẩm của bạn cặp.

| Loại lỗi (5 loại bắt buộc) | Critical | Major | Minor | Trivial | TỔNG CỘNG |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Functional (Chức năng)** | *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ]* |
| **Visual (Giao diện / Responsive)** | *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ]* |
| **Content (Nội dung / Nhãn)** | *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ]* |
| **Performance (Hiệu năng / Tải)**| *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ]* |
| **Crash (Sập ứng dụng / Treo web)**| *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ đo]* | *[Chờ]* |
| **TỔNG SỐ LỖI THỰC TẾ** | *[Chờ]* | *[Chờ]* | *[Chờ]* | *[Chờ]* | *[Chờ]* |

---

## 4. Kiểm thử hiệu năng (Apache JMeter Performance Testing)

### 4.1. Kịch bản đo tải đã chuẩn bị
* **Kịch bản đo tải thông thường**: 20 Virtual Users đồng thời gọi API xem lịch `GET /api/slots/availability?date=...`, Ramp-up 30s, chạy duy trì trong 5 phút.

### 4.2. Bảng đối chiếu kết quả đo với NFR trong SRS v2.0
| Mã NFR | Chỉ tiêu cam kết trong SRS v2.0 | Giá trị thực tế đo được | Kết luận (Đạt / Không đạt) | Phân tích nguyên nhân & Nút thắt |
| :--- | :--- | :---: | :---: | :--- |
| **`NFR-02`** | Thời gian phản hồi **P90 ≤ 1000 ms**; Tỷ lệ lỗi **< 0.5%** với 20 người dùng đồng thời | *[Chờ chạy JMeter thật]* | *[Chờ]* | *[Chờ xuất file .jtl & HTML Dashboard]* |
| **`NFR-01`** | Tính toàn vẹn: **0% Double Booking** khi chạy tải đồng thời vào cùng 1 slot | *[Chờ chạy test thật]* | *[Chờ]* | *[Chờ kiểm tra database sau phiên chạy]* |

---

## 5. Kết luận nghiệm thu (Go / No-Go Decision)

- [ ] **GO – ĐỦ ĐIỀU KIỆN NGHIỆM THU ĐỒ ÁN**
- [x] **NO-GO – CHƯA ĐỦ ĐIỀU KIỆN NGHIỆM THU CHÍNH THỨC (ĐANG Ở GIAI ĐOẠN BASELINE)**

**Căn cứ kết luận**:
- Hệ thống đã hoàn tất thiết lập khung kiến trúc kỹ thuật Baseline, API Health Check hoạt động chính xác 100% tại cổng 5001, ứng dụng React sẵn sàng kết nối.
- Tuy nhiên, 5 chức năng nghiệp vụ của Nhân viên (`FR-01` đến `FR-05`) và giao diện Responsive đang trong giai đoạn triển khai mã nguồn; do đó chưa đủ điều kiện kết thúc đợt kiểm thử cuối cùng. Đề nghị nhóm phát triển tiếp tục hoàn thiện code theo đúng đặc tả SRS v2.0.
