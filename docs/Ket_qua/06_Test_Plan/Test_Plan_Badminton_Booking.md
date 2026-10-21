# KẾ HOẠCH KIỂM THỬ (TEST PLAN)
## HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
### Phiên bản: v2.0 (Cập nhật ngày 21/10/2026 theo phạm vi mới)
**Căn cứ biểu mẫu**: `TAILIEU/Mau_04_Test_Plan.docx`  
**Chủ hệ thống phát triển**: `[Nguyễn Thị Thanh Nhàn - MSSV: ...]`  
**Người lập kế hoạch (Tester)**: `[Họ tên Tester - Bạn cặp - MSSV: ...]`  
**Trạng thái tài liệu**: **KẾ HOẠCH KIỂM THỬ ĐÃ THỐNG NHẤT THEO SRS v2.0**  

> [!NOTE]
> **LỊCH SỬ THAY ĐỔI PHẠM VI**:  
> Kế hoạch kiểm thử v2.0 này cập nhật toàn diện theo phạm vi hệ thống mới (1 Vai trò nghiệp vụ: Nhân viên; 5 Chức năng: Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy đặt sân). Mọi nội dung kiểm thử về Customer, Admin, Thanh toán, Doanh thu và Check-in của phiên bản cũ đã được đưa ra ngoài phạm vi kiểm thử (Out-of-Scope).

---

## 1. Giới thiệu

### 1.1. Mục đích
Tài liệu Kế hoạch kiểm thử (Test Plan) này xác định mục tiêu, phạm vi kiểm thử, chiến lược kiểm thử, môi trường, tiêu chí nghiệm thu và quản lý rủi ro cho đợt đánh giá chất lượng phần mềm **Hệ thống Đặt sân Cầu lông (Badminton Court Booking System)**.  
Kế hoạch nhằm đảm bảo:
- 100% các chức năng của Nhân viên (`FR-01` đến `FR-05`) hoạt động chính xác theo đặc tả SRS v2.0.
- Kiểm tra toàn diện tính toàn vẹn dữ liệu: **0% xảy ra đặt trùng lịch (Double Booking)** khi có nhiều nhân viên thao tác đồng thời.
- Đo lường và xác nhận **Tính thích ứng giao diện (Responsive)** trên toàn bộ 5 kích thước màn hình quy định (320px, 375px, 768px, 1024px, 1366px).
- Đo lường hiệu năng của API tra cứu lịch sân bằng Apache JMeter so với ngưỡng cam kết `P90 ≤ 1000ms`.

### 1.2. Tài liệu tham chiếu
- Tài liệu Yêu cầu Người dùng ([URD_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/01_URD/URD_Badminton_Court_Booking.md) v2.0).
- Đặc tả Yêu cầu Phần mềm ([SRS_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/02_SRS/SRS_Badminton_Court_Booking.md) v2.0).
- Tài liệu Thiết kế API ([Tai_lieu_API_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/03_API/Tai_lieu_API_Badminton_Booking.md) v2.0).
- Bộ Biểu mẫu Kiểm thử ([Bo_bieu_mau_Kiem_thu_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/05_Bo_bieu_mau_Kiem_thu/Bo_bieu_mau_Kiem_thu_Badminton.md) v2.0).

---

## 2. Phạm vi kiểm thử (Test Scope)

### 2.1. Trong phạm vi (In-Scope)
Toàn bộ các phân hệ và yêu cầu được quy định trong tài liệu SRS v2.0:

| Mã yêu cầu | Hạng mục kiểm thử | Mức ưu tiên | Phương pháp & Công cụ kiểm thử |
| :--- | :--- | :---: | :--- |
| **`FR-01`** | Đăng ký tài khoản nhân viên | **Cao (P1)** | Kiểm thử chức năng thủ công (EP, BVA), kiểm tra ràng buộc duy nhất SĐT. |
| **`FR-02`** | Đăng nhập hệ thống & Token JWT | **Cao (P1)** | Kiểm thử xác thực, kiểm thử bảo mật phân quyền API (thiếu Token). |
| **`FR-03`** | Xem lịch đặt sân (Timeline theo ngày) | **Cao (P1)** | Kiểm thử giao diện hiển thị ma trận sân/giờ, kiểm thử chuyển ngày qua Date Picker. |
| **`FR-04`** | Đặt sân cho khách (kèm cập nhật lịch) | **Cao (P1)** | Kiểm thử tạo đơn, kiểm tra cập nhật màu ô slot sang Đỏ tức thời; **Kiểm thử tranh chấp đặt trùng (Double Booking Concurrency)**. |
| **`FR-05`** | Hủy đặt sân (kèm giải phóng slot) | **Cao (P1)** | Kiểm thử popup xác nhận hủy, kiểm tra slot chuyển sang Xanh tức thời, kiểm thử đặt lại vào slot vừa hủy. |
| **`SRS Mục 4`**| **Kiểm thử Responsive bắt buộc** | **Cao (P1)** | Kiểm thử thích ứng giao diện trên 5 kích thước: **320px, 375px, 768px, 1024px, 1366px**; kiểm tra chống cuộn ngang toàn trang và hộp thoại vừa vặn màn hình. |
| **`NFR-01`** | Tính toàn vẹn chống Double Booking | **Cao (P1)** | Kịch bản Postman Runner / JMeter gửi 2 request đặt đồng thời cùng 1 slot. |
| **`NFR-02`** | Hiệu năng tra cứu lịch (P90 ≤ 1000ms)| Trung bình (P2) | Apache JMeter kịch bản 20 virtual users tải thông thường. |

### 2.2. Ngoài phạm vi (Out-of-Scope)
- **Vai trò Khách hàng (Customer)** và **Quản trị viên (Admin)**: Không tồn tại trong hệ thống.
- **Thanh toán trực tuyến & Cổng thanh toán**: Không kiểm thử.
- **Báo cáo doanh thu tài chính & Tỷ lệ lấp đầy**: Không thuộc phạm vi.
- **Cấu hình bảng giá giờ thường / giờ cao điểm**: Không thuộc phạm vi.
- **Quy trình Check-in / Check-out tiếp đón**: Không thuộc phạm vi.

---

## 3. Chiến lược kiểm thử (Testing Strategy)

### 3.1. Các loại kiểm thử áp dụng
1. **Kiểm thử chức năng thủ công (Manual Functional Testing)**:
   - Phủ toàn bộ các test cases chức năng (`TC-AUTH`, `TC-CAL`, `TC-BOOK`, `TC-CANC`).
   - Áp dụng các kỹ thuật: Phân tích giá trị biên (độ dài mật khẩu), Phân hoạch tương đương (SĐT hợp lệ/sai định dạng), Bảng quyết định và Chuyển đổi trạng thái slot (Trống ↔ Đã đặt).
2. **Kiểm thử tranh chấp đồng thời (Concurrency / Race Condition Testing)**:
   - Mô phỏng 2 nhân viên cùng thao tác đặt 1 slot trong cùng 1 giây để kiểm chứng tính năng khóa hàng (Pessimistic Locking) trong MySQL. Kết quả bắt buộc: 1 thành công (201) và 1 bị chặn (409 Conflict).
3. **Kiểm thử Giao diện Thích ứng (Responsive Testing)**:
   - Sử dụng Chrome DevTools Emulation và kiểm tra thực tế trên 5 độ phân giải:
     + **320px**: Kiểm tra form đăng nhập và modal đặt sân không bị tràn mép màn hình.
     + **375px**: Kiểm tra bảng lịch cuộn ngang nội bộ, trang web không bị cuộn ngang.
     + **768px & 1024px**: Kiểm tra bố cục máy tính bảng.
     + **1366px**: Kiểm tra hiển thị toàn diện trên màn hình máy tính bàn.
   - Thử nghiệm xoay màn hình (Portrait ↔ Landscape) đảm bảo không mất dữ liệu form đang nhập dở.
4. **Kiểm thử Hiệu năng & Tải (Performance Testing)**:
   - Sử dụng **Apache JMeter (Non-GUI mode)**: Kịch bản 20 người dùng ảo gọi API `GET /api/slots/availability`, duy trì trong 5 phút. Xuất file kết quả `.jtl` và sinh HTML Dashboard để đo P90.

### 3.2. Quy chuẩn 5 loại lỗi và Mức độ nghiêm trọng
Mọi khiếm khuyết phát hiện phải được phân loại theo đúng 5 nhóm:
- **Functional**: Nghiệp vụ sai logic (cho phép trùng lịch, không giải phóng slot sau khi hủy).
- **Visual**: Vỡ bố cục, chữ bị đè, nút bị che khuất, vi phạm responsive.
- **Content**: Lỗi nhãn trạng thái, sai chính tả, hiển thị sai format ngày tháng.
- **Performance**: Phản hồi chậm chạp (P90 > 1000ms), nghẽn cổ chai CPU.
- **Crash**: Server Backend thoát tiến trình (500 Unhandled Error), màn hình trắng React.

---

## 4. Môi trường và Tiêu chí kiểm thử

### 4.1. Môi trường kiểm thử
- **Máy chủ Backend**: `http://localhost:5001` (Node.js/Express).
- **Ứng dụng Web Frontend**: `http://localhost:5173` (React/Vite).
- **Cơ sở dữ liệu**: MySQL 8.x (`badminton_booking_db`).

### 4.2. Tiêu chí bắt đầu (Entry Criteria)
- SRS v2.0 và Tài liệu API v2.0 đã được chốt phạm vi 1 role - 5 FR.
- Máy chủ backend và ứng dụng frontend khởi chạy thành công tại môi trường thử nghiệm.
- Bộ 29 Test Cases đã được thiết kế sẵn sàng.

### 4.3. Tiêu chí kết thúc (Exit Criteria)
- 100% test case chức năng và responsive được thực thi và ghi nhận vào Test Log.
- Không còn lỗi mức độ **Critical** tồn đọng (đặc biệt là lỗi trùng lịch Double Booking).
- Có đầy đủ báo cáo kiểm thử hiệu năng JMeter đối chiếu với NFR-02.
- Báo cáo tổng kết kiểm thử (Test Summary Report) được hoàn tất với kết luận minh bạch.

---

## 5. Quản lý rủi ro (Risk Management)

| Rủi ro tiềm ẩn | Khả năng | Mức độ | Biện pháp giảm thiểu |
| :--- | :---: | :---: | :--- |
| **Xung đột tranh chấp đặt trùng khó tái hiện bằng tay** | Cao | **Nghiêm trọng** | Viết script Postman Runner đa luồng hoặc kịch bản JMeter gửi 2 request song song trong cùng mili-giây để kiểm thử tự động. |
| **Giao diện bảng lịch bị vỡ trên màn hình di động nhỏ 320px** | Trung bình | Trung bình | Áp dụng CSS `overflow-x: auto` cục bộ cho vùng chứa bảng lịch ngay từ khâu phát triển frontend. |
| **Tiêu chí môn học cũ yêu cầu 3 vai trò khác biệt với phạm vi mới** | Cao | **Nghiêm trọng** | Ghi rõ sự sai khác này trong hồ sơ bàn giao và ma trận đối chiếu; sinh viên báo cáo trực tiếp với Giảng viên để xin phê duyệt điều chỉnh tiêu chí. |
