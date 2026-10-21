# BIÊN BẢN BÀN GIAO SỐ 1
## BÀN GIAO SẢN PHẨM ĐỂ KIỂM THỬ (TUẦN 6)
### Học phần: Đánh giá hiệu năng hệ thống – Đồ án cá nhân
**Phiên bản tài liệu**: v2.0 (Cập nhật ngày 21/10/2026 theo phạm vi mới)  
**Phạm vi hệ thống bàn giao**: 1 Vai trò nghiệp vụ: **Nhân viên (Staff)**; 5 Chức năng: Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy đặt sân.

Hôm nay, ngày 21/10/2026, hai bên dưới đây thống nhất thực hiện bàn giao sản phẩm và hồ sơ kỹ thuật để phục vụ công tác kiểm thử độc lập:

| Đại diện | Họ và tên | Mã số sinh viên (MSSV) | Vai trò trong dự án |
| :--- | :--- | :--- | :--- |
| **BÊN GIAO** | `[Nguyễn Thị Thanh Nhàn]` | `[MSSV: ...]` | **Chủ hệ thống (Developer)** |
| **BÊN NHẬN** | `[Họ tên Tester - Bạn cặp]` | `[MSSV: ...]` | **Người kiểm thử (Tester)** |

**Tên hệ thống bàn giao**: Hệ thống Đặt sân Cầu lông (Badminton Court Booking System)

---

### I. Danh mục hồ sơ và sản phẩm bàn giao

| STT | Hạng mục bàn giao | Phiên bản / Đường dẫn truy cập | Ghi chú chi tiết |
| :---: | :--- | :--- | :--- |
| 1 | **Tài liệu Yêu cầu Người dùng (URD)** | Phiên bản v2.0 / [URD_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/01_URD/URD_Badminton_Court_Booking.md) | 1 vai trò Nhân viên, 5 User Stories, 3 luồng E2E |
| 2 | **Tài liệu Đặc tả Yêu cầu Phần mềm (SRS)** | Phiên bản v2.0 / [SRS_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/02_SRS/SRS_Badminton_Court_Booking.md) | Đặc tả 5 chức năng `FR-01`..`FR-05`, chống Double Booking, Responsive bắt buộc |
| 3 | **Tài liệu Thiết kế API** | Phiên bản v2.0 / [Tai_lieu_API_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/03_API/Tai_lieu_API_Badminton_Booking.md) | Đặc tả 8 endpoint phục vụ 5 chức năng của Nhân viên |
| 4 | **Link truy cập sản phẩm** | - Backend API: `http://localhost:5001/api`<br>- Frontend Web: `http://localhost:5173` | *(Đang chạy môi trường cục bộ; sẽ cập nhật link server public)* |
| 5 | **Tài khoản thử nghiệm** | Theo Mục 5 Tài liệu Thiết kế API: Tài khoản Nhân viên (`0901112223` / `StaffPassword@123`) | Tài khoản phục vụ test đăng nhập và đặt sân |
| 6 | **Dữ liệu mẫu (Seed Data)** | Cụm 4 sân cầu lông (Sân 1..4) và 16 khung giờ tròn từ 06:00 đến 22:00 | Khung giờ chuẩn để test hiển thị lịch |

---

### II. Xác nhận của Bên nhận (Tester)
- [x] **Truy cập được link sản phẩm**: Đã kết nối thành công tới `http://localhost:5001/api/health` (HTTP 200 OK) và mở được giao diện React tại `http://localhost:5173`.
- [x] **Nhận đủ tài liệu ở Mục I**: Đã nhận đủ bộ tài liệu kỹ thuật nền tảng (URD v2.0, SRS v2.0, Tài liệu API v2.0).
- [ ] **Đăng nhập được các vai trò**: Đã tiếp nhận tài khoản mẫu; tính năng đăng nhập đang chờ triển khai backend.

---

### III. Hạn chế đã biết của phiên bản bàn giao (Known Limitations)
*(Theo đúng quy định học phần: Chỉ ghi các chức năng hệ thống chưa hoàn thiện, **TUYỆT ĐỐI KHÔNG GHI CÁC LỖI CÀI SẴN**)*.
1. Hệ thống hiện tại đã hoàn tất tầng Baseline: Express server port 5001, route `/api/health`, kết nối database pool và ứng dụng React port 5173.
2. Năm chức năng nghiệp vụ của Nhân viên (Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy sân) đã hoàn thành thiết kế đặc tả chi tiết trong SRS v2.0; mã nguồn đang tiếp tục được lập trình.
3. Bản bàn giao tuần 6 tập trung vào khung kiến trúc và bộ tài liệu đặc tả chuẩn hóa theo phạm vi mới 1 vai trò - 5 chức năng.

---

### IV. Cam kết của hai bên
1. **Bên giao (Chủ hệ thống)** cam kết duy trì máy chủ hoạt động ổn định liên tục từ tuần 6 đến hết buổi demo tuần 14.
2. **Bên giao** cam kết phản hồi các Bug Report do Bên nhận gửi trong vòng **48 giờ** kể từ thời điểm nhận báo cáo.
3. **Bên giao** cam kết **tuyệt đối không tiết lộ danh sách lỗi cài sẵn (Bug Manifest)** cho Bên nhận dưới mọi hình thức để đảm bảo tính khách quan học thuật.
4. **Bên nhận (Tester)** cam kết thực hiện kiểm thử độc lập, khách quan, trung thực dựa trên tài liệu SRS v2.0.

---

| ĐẠI DIỆN BÊN GIAO | ĐẠI DIỆN BÊN NHẬN |
| :---: | :---: |
| *(Ký và ghi rõ họ tên)* | *(Ký và ghi rõ họ tên)* |
| <br><br><br>**`[Nguyễn Thị Thanh Nhàn]`** | <br><br><br>**`[Họ tên Tester]`** |
