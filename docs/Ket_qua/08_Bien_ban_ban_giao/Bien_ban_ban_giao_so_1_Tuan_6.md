# BIÊN BẢN BÀN GIAO SỐ 1
## BÀN GIAO SẢN PHẨM ĐỂ KIỂM THỬ (TUẦN 6)
### Học phần: Đánh giá hiệu năng hệ thống – Đồ án cá nhân

Hôm nay, ngày 21/10/2026, hai bên dưới đây thống nhất thực hiện bàn giao sản phẩm và hồ sơ kỹ thuật để phục vụ công tác kiểm thử độc lập:

| Đại diện | Họ và tên | Mã số sinh viên (MSSV) | Vai trò trong dự án |
| :--- | :--- | :--- | :--- |
| **BÊN GIAO** | `[Nguyễn Thị Thanh Nhàn]` | `[MSSV: ...]` | **Chủ hệ thống (Developer)** |
| **BÊN NHẬN** | `[Họ tên Tester - Bạn cặp]` | `[MSSV: ...]` | **Người kiểm thử (Tester)** |

**Tên hệ thống bàn giao**: Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System)

---

### I. Danh mục bàn giao

| STT | Hạng mục bàn giao | Phiên bản / Đường dẫn truy cập | Ghi chú chi tiết |
| :---: | :--- | :--- | :--- |
| 1 | **Tài liệu Yêu cầu Người dùng (URD)** | Phiên bản v1.0 / [URD_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/01_URD/URD_Badminton_Court_Booking.md) | Đủ 3 vai trò, 3 luồng người dùng, 12 User Stories |
| 2 | **Tài liệu Đặc tả Yêu cầu Phần mềm (SRS)** | Phiên bản v1.0 / [SRS_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/02_SRS/SRS_Badminton_Court_Booking.md) | Bản đặc tả chi tiết 12 FR, 3 luồng E2E, 8 NFR đo được |
| 3 | **Tài liệu Thiết kế API** | Phiên bản v1.0 / [Tai_lieu_API_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/03_API/Tai_lieu_API_Badminton_Booking.md) | Đặc tả 17 endpoint kèm mã lỗi và JSON req/res mẫu |
| 4 | **Link truy cập sản phẩm** | - Backend API: `http://localhost:5001/api`<br>- Frontend Web: `http://localhost:5173` | *(Đang chạy môi trường cục bộ; sẽ cập nhật link server public)* |
| 5 | **Tài khoản thử nghiệm** | Theo Mục 5 Tài liệu Thiết kế API: Khách hàng, Nhân viên, Quản trị viên | Đầy đủ 3 vai trò kèm mật khẩu test |
| 6 | **Dữ liệu mẫu (Seed Data)** | Dữ liệu cụm 6 sân cầu lông (4 sân Tiêu chuẩn, 2 sân VIP) và bảng giá | Cấu hình giá giờ thường 80k, giờ vàng 140k |

---

### II. Xác nhận của Bên nhận (Tester)
- [x] **Truy cập được link sản phẩm**: Đã kết nối thành công tới `http://localhost:5001/api/health` và mở được giao diện React tại `http://localhost:5173`.
- [x] **Đăng nhập được các vai trò**: Đã tiếp nhận danh sách tài khoản thử nghiệm của 3 vai trò.
- [x] **Nhận đủ tài liệu ở Mục I**: Đã nhận đủ bộ 3 tài liệu kỹ thuật nền tảng (URD, SRS, Tài liệu API).

---

### III. Hạn chế đã biết của phiên bản bàn giao (Known Limitations)
*(Theo đúng quy định học phần: Chỉ ghi các chức năng hệ thống chưa hoàn thiện, **TUYỆT ĐỐI KHÔNG GHI CÁC LỖI CÀI SẴN**)*.
1. Hệ thống hiện tại đã hoàn tất tầng Baseline: Express server port 5001, route `/api/health`, kết nối database pool và trang Home React hiển thị thông tin.
2. Các chức năng nghiệp vụ chuyên sâu (đặt sân, khóa slot tạm thời, hủy sân và quản lý giá) đã hoàn thành thiết kế đặc tả chi tiết trong SRS và API; mã nguồn đang tiếp tục được hoàn thiện các controller và router tương ứng.
3. Cơ chế thanh toán hiện tại là giả lập ghi nhận trạng thái thanh toán, chưa tích hợp cổng thanh toán trực tiếp ngân hàng thực tế.

---

### IV. Cam kết của hai bên
1. **Bên giao (Chủ hệ thống)** cam kết giữ nguyên sản phẩm (không tự ý vá lỗi đã cài đặt sẵn) và duy trì link hoạt động ổn định liên tục từ tuần 6 đến hết buổi demo tuần 14.
2. **Bên giao** cam kết phản hồi các Bug Report do Bên nhận gửi trong vòng **48 giờ** kể từ thời điểm nhận báo cáo.
3. **Bên giao** cam kết **tuyệt đối không tiết lộ danh sách lỗi cài sẵn (Bug Manifest)** cho Bên nhận dưới mọi hình thức để đảm bảo tính khách quan học thuật.
4. **Bên nhận (Tester)** cam kết thực hiện kiểm thử độc lập, khách quan, trung thực dựa trên tài liệu SRS và không thông đồng gian lận.

---

| ĐẠI DIỆN BÊN GIAO | ĐẠI DIỆN BÊN NHẬN |
| :---: | :---: |
| *(Ký và ghi rõ họ tên)* | *(Ký và ghi rõ họ tên)* |
| <br><br><br>**`[Nguyễn Thị Thanh Nhàn]`** | <br><br><br>**`[Họ tên Tester]`** |

