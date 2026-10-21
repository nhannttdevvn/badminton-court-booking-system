# BỘ BIỂU MẪU KIỂM THỬ (THEO MẪU 03)
## [HỒ SƠ THIẾT KẾ TEST CASE VÀ KHUNG GHI NHẬN KIỂM THỬ]
### HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN (BADMINTON COURT BOOKING SYSTEM)

> [!IMPORTANT]
> **PHÂN BIỆT RẠCH RÒI HAI VAI THEO QUY CHẾ HỌC PHẦN ĐÁNH GIÁ HIỆU NĂNG**:
> - **Học phần quy định**: Mỗi sinh viên có 2 vai: (1) Chủ hệ thống phát triển sản phẩm của mình; (2) Tester kiểm thử độc lập cho hệ thống của bạn cặp.
> - **Bản chất của tài liệu này**: Đây là **BỘ TEST CASE ĐƯỢC THIẾT KẾ THEO ĐẶC TẢ SRS MỤC TIÊU CỦA HỆ THỐNG CẦU LÔNG** để làm căn cứ kiểm thử khi bàn giao cho bạn cặp (Tester).
> - **Tuyệt đối không nhận vơ kết quả**: Chưa có dữ liệu hệ thống của bạn cặp thì **KHÔNG TỰ NHẬN TÀI LIỆU NÀY LÀ KẾT QUẢ ĐÃ KIỂM THỬ HỆ THỐNG CỦA BẠN CẶP**.
> - **Hiện trạng thực thi**: Chỉ duy nhất 2 ca kiểm tra Baseline (`GET /api/health` port 5001 và hiển thị trang Home) là đã được kiểm chứng thực tế trong workspace. Toàn bộ 74 ca kiểm thử nghiệp vụ còn lại đều ở trạng thái **`Chưa chạy thực tế (Pending) do mã nguồn nghiệp vụ chưa triển khai`**. Tuyệt đối không tự ý đánh dấu "Passed" giả mạo.

---

## SHEET 1: THÔNG TIN CHUNG (Thong_tin)

| Trường thông tin trong Mẫu 03 | Giá trị ghi nhận trong đồ án | Ghi chú |
| :--- | :--- | :--- |
| **Tester – Họ và tên** | Chưa xác định — chưa có nguồn xác nhận | Cần bổ sung Họ tên Tester bạn cặp |
| **Tester – MSSV** | Chưa xác định — chưa có nguồn xác nhận | Cần bổ sung MSSV của Tester |
| **Hệ thống được kiểm thử** | Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System) | Khớp `README.md` |
| **Chủ hệ thống – Họ tên, MSSV** | Chưa xác định — chưa có nguồn xác nhận | Cần bổ sung Họ tên, MSSV của Chủ hệ thống |
| **Link sản phẩm** | `http://localhost:5001/api` (Backend) / `http://localhost:5173` (Frontend) | Cổng chạy thực tế trong workspace |
| **Phiên bản SRS dùng làm căn cứ** | SRS phiên bản v1.0 ([SRS_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/02_SRS/SRS_Badminton_Court_Booking.md)) | Bản đặc tả mục tiêu |
| **Thời gian kiểm thử (từ – đến)** | Tuần 6 đến Tuần 13 (Theo phân bổ môn học) | Lịch trình học phần |

---

## SHEET 2: PHIẾU REVIEW SRS (Review_SRS – Tuần 5)

Tester rà soát các yêu cầu trong SRS theo 4 tiêu chí: **Rõ ràng? Kiểm thử được? Đầy đủ? Nhất quán?**

| STT | Vị trí trong SRS (mục / mã yêu cầu) | Nội dung trích dẫn từ SRS ban đầu | Vấn đề phát hiện | Loại vấn đề | Mức độ | Đề xuất sửa | Phản hồi của chủ hệ thống | Lý do / cách đã sửa |
| :---: | :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| 1 | `FR-01` – trường Mật khẩu | *"Mật khẩu tài khoản phải đủ mạnh và an toàn"* | Không có tiêu chí độ dài tối thiểu, tối đa và loại ký tự, không viết được ca test giá trị biên (BVA). | Không kiểm thử được | **Cao** | Ghi rõ: 8–32 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt. | **Chấp nhận** | Đã đưa vào `FR-01` đặc tả định dạng regex cụ thể. |
| 2 | `FR-05` – Cấu hình giá giờ vàng | *"Giá giờ cao điểm áp dụng cho các khung giờ đông khách"* | Không định nghĩa chính xác khung giờ nào là cao điểm, áp dụng ngày thường hay cuối tuần. | Mập mờ, thiếu sót | **Cao** | Xác định khung giờ cụ thể: 17:00 – 22:00 ngày thường và toàn bộ ngày Thứ 7, Chủ Nhật. | **Chấp nhận** | Đã đưa vào Bảng quyết định `SRS 4.1` quy tắc rõ ràng. |
| 3 | `FR-07` – Khóa slot | *"Hệ thống sẽ giữ chỗ slot cho khách trong một khoảng thời gian"* | Không nêu con số thời gian giữ chỗ cụ thể là bao nhiêu phút. | Thiếu dữ liệu | **Trung bình**| Xác định thời gian giữ chỗ cố định (đề xuất 10 phút = 600 giây). | **Chấp nhận** | Đã bổ sung tham số đề xuất 10 phút vào `FR-07`. |
| 4 | `FR-10` – Chính sách hủy sân | *"Khách hàng được quyền hủy sân trước khi trận đấu diễn ra"* | Không quy định thời hạn tối thiểu trước bao lâu thì được hủy. | Thiếu ràng buộc | **Cao** | Đưa ra con số đo lường được: Hủy trước giờ chơi tối thiểu 24 giờ. | **Chấp nhận** | Đã bổ sung ràng buộc thời gian `startTime - cancelTime >= 24h` vào `FR-10`. |
| 5 | `NFR-01` – Hiệu năng tra cứu | *"Hệ thống phải phản hồi nhanh chóng, không giật lag"* | Dùng tính từ cảm tính "nhanh chóng", không thể đo lường và nghiệm thu bằng công cụ JMeter. | Không kiểm thử được | **Cao** | Quy định rõ ngưỡng định lượng: Thời gian phản hồi P90 ≤ 1000ms với 20 người dùng đồng thời. | **Chấp nhận** | Đã chuẩn hóa thành bảng chỉ tiêu đo lường `NFR-01`, `NFR-02`, `NFR-03`. |

---

## SHEET 3: TEST CASE CHỨC NĂNG (TC_Chuc_nang – 64 Test Cases Thiết kế)

> **Quy ước mã**:
> - `TC-FRxx-nnn`: Kiểm thử chức năng đơn lẻ.
> - `TC-FLOWxx-nnn`: Kiểm thử luồng tích hợp End-to-End.
> - `TC-AUTHZ-nnn`: Kiểm thử ma trận phân quyền người dùng.
> **Các kỹ thuật thiết kế áp dụng (5 kỹ thuật)**:
> 1. Phân hoạch tương đương (EP)
> 2. Phân tích giá trị biên (BVA)
> 3. Bảng quyết định (DT)
> 4. Chuyển đổi trạng thái (ST)
> 5. Kịch bản luồng nghiệp vụ Use Case (UC)

| TC ID | Nguồn yêu cầu | Kỹ thuật áp dụng | Tiêu đề kịch bản | Tiền điều kiện | Dữ liệu thử nghiệm (Test Data) | Các bước thực hiện | Kết quả mong đợi theo SRS | Tình trạng thực thi thực tế |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-FR01-001** | `FR-01` | EP (Hợp lệ) | Đăng ký tài khoản thành công với thông tin hợp lệ | Chưa có tài khoản | Name: "Lê Văn A", Phone: "0912999888", Email: "vana@gmail.com", Pass: "Vana@2026!" | 1. Mở form đăng ký<br>2. Nhập thông tin<br>3. Bấm Đăng ký | Tạo tài khoản thành công, trả về HTTP 201 Created | *Chưa chạy (Chờ code Auth)* |
| **TC-FR01-002** | `FR-01` | BVA (Biên dưới) | Đăng ký với mật khẩu đúng 8 ký tự | Chưa có tài khoản | Pass: "Abc@1234" (8 ký tự) | 1. Nhập pass 8 ký tự<br>2. Bấm Đăng ký | Hệ thống chấp nhận mật khẩu, đăng ký thành công | *Chưa chạy (Chờ code Auth)* |
| **TC-FR01-003** | `FR-01` | BVA (Dưới biên) | Đăng ký với mật khẩu 7 ký tự (vi phạm) | Chưa có tài khoản | Pass: "Abc@123" (7 ký tự) | 1. Nhập pass 7 ký tự<br>2. Bấm Đăng ký | Báo lỗi validation: Mật khẩu từ 8-32 ký tự | *Chưa chạy (Chờ code Auth)* |
| **TC-FR01-004** | `FR-01` | BVA (Biên trên) | Đăng ký với mật khẩu đúng 32 ký tự | Chưa có tài khoản | Pass: 32 ký tự hợp lệ | 1. Nhập pass 32 ký tự<br>2. Bấm Đăng ký | Hệ thống chấp nhận mật khẩu, đăng ký thành công | *Chưa chạy (Chờ code Auth)* |
| **TC-FR01-005** | `FR-01` | BVA (Vượt biên) | Đăng ký với mật khẩu 33 ký tự (vi phạm) | Chưa có tài khoản | Pass: 33 ký tự | 1. Nhập pass 33 ký tự<br>2. Bấm Đăng ký | Báo lỗi validation độ dài mật khẩu | *Chưa chạy (Chờ code Auth)* |
| **TC-FR01-006** | `FR-01` | EP (Thiếu ký tự)| Đăng ký với mật khẩu thiếu ký tự đặc biệt | Chưa có tài khoản | Pass: "Password123" | 1. Nhập pass thiếu ký tự đặc biệt<br>2. Bấm Đăng ký | Báo lỗi: Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt | *Chưa chạy (Chờ code Auth)* |
| **TC-FR01-007** | `FR-01` | EP (Trùng lặp) | Đăng ký với số điện thoại đã tồn tại | Đã có user SĐT "0912345678" | Phone: "0912345678" | 1. Nhập phone đã tồn tại<br>2. Bấm Đăng ký | Báo lỗi HTTP 409 Conflict: SĐT đã được sử dụng | *Chưa chạy (Chờ code Auth)* |
| **TC-FR01-008** | `FR-01` | BVA (Độ dài SĐT)| Đăng ký với số điện thoại 9 chữ số (thiếu số) | Chưa có tài khoản | Phone: "091234567" (9 số) | 1. Nhập SĐT 9 số<br>2. Bấm Đăng ký | Báo lỗi: Số điện thoại phải gồm đúng 10 chữ số | *Chưa chạy (Chờ code Auth)* |
| **TC-FR01-009** | `FR-01` | BVA (Độ dài SĐT)| Đăng ký với số điện thoại 11 chữ số (thừa số) | Chưa có tài khoản | Phone: "09123456789" (11 số) | 1. Nhập SĐT 11 số<br>2. Bấm Đăng ký | Báo lỗi: Số điện thoại phải gồm đúng 10 chữ số | *Chưa chạy (Chờ code Auth)* |
| **TC-FR01-010** | `FR-01` | EP (Đầu số sai) | Đăng ký với số điện thoại sai đầu số nhà mạng VN | Chưa có tài khoản | Phone: "0112345678" (đầu 01) | 1. Nhập đầu số 01<br>2. Bấm Đăng ký | Báo lỗi format số điện thoại | *Chưa chạy (Chờ code Auth)* |
| **TC-FR02-001** | `FR-02` | EP (Hợp lệ) | Đăng nhập thành công với tài khoản và mật khẩu đúng | User đã tạo | Login: "0912345678", Pass: "Customer@123" | 1. Nhập thông tin đúng<br>2. Bấm Đăng nhập | Trả về HTTP 200 OK kèm JWT token | *Chưa chạy (Chờ code Auth)* |
| **TC-FR02-002** | `FR-02` | EP (Sai pass) | Đăng nhập thất bại khi nhập sai mật khẩu | User tồn tại | Login: "0912345678", Pass: "SaiPass!" | 1. Nhập sai mật khẩu<br>2. Bấm Đăng nhập | Trả về HTTP 401 Unauthorized | *Chưa chạy (Chờ code Auth)* |
| **TC-FR02-003** | `FR-02` | EP (Không tồn tại)| Đăng nhập với số điện thoại chưa đăng ký | Chưa có tài khoản | Login: "0999999999", Pass: "Pass@123" | 1. Nhập SĐT lạ<br>2. Bấm Đăng nhập | Trả về HTTP 401 Unauthorized | *Chưa chạy (Chờ code Auth)* |
| **TC-FR02-004** | `FR-02` | BVA (Khóa tài khoản)| Khóa tài khoản sau 5 lần nhập sai mật khẩu liên tiếp | Tài khoản hoạt động | Nhập sai pass 5 lần | 1. Nhập sai pass 5 lần liên tiếp | Lần thứ 5 báo tài khoản bị tạm khóa 15 phút, chặn mã 403 | *Chưa chạy (Chờ code Auth)* |
| **TC-FR03-001** | `FR-03` | EP (Hợp lệ) | Xem thông tin hồ sơ cá nhân khi có token hợp lệ | Đã login vai Customer | Token hợp lệ trong Header | 1. Gửi GET /api/auth/me với Bearer token | Trả về 200 OK kèm thông tin user | *Chưa chạy (Chờ code Auth)* |
| **TC-FR03-002** | `FR-03` | EP (Không token)| Xem hồ sơ cá nhân khi không gửi token xác thực | Chưa login | Không có header Authorization | 1. Gửi GET /api/auth/me | Trả về HTTP 401 Unauthorized | *Chưa chạy (Chờ code Auth)* |
| **TC-FR04-001** | `FR-04` | EP (Hợp lệ) | Admin thêm mới sân cầu lông hợp lệ | Đã login Admin | Name: "Sân 07", Type: "VIP", Surface: "Thảm PVC 5mm" | 1. Gửi POST /api/courts với token Admin | HTTP 201 Created, sân mới xuất hiện trên danh mục | *Chưa chạy (Chờ code Court)* |
| **TC-FR04-002** | `FR-04` | EP (Trùng tên) | Admin thêm mới sân có tên đã trùng với sân cũ | Đã có "Sân 01" | Name: "Sân 01" | 1. Nhập tên "Sân 01"<br>2. Bấm tạo mới | Báo lỗi 409 Conflict: Tên sân đã tồn tại | *Chưa chạy (Chờ code Court)* |
| **TC-FR04-003** | `FR-04` | BVA (Độ dài tên) | Thêm sân với tên chỉ có 2 ký tự (dưới biên tối thiểu 3) | Đã login Admin | Name: "S1" (2 ký tự) | 1. Nhập tên 2 ký tự<br>2. Gửi request | Báo lỗi validation: Tên sân từ 3 đến 30 ký tự | *Chưa chạy (Chờ code Court)* |
| **TC-FR04-004** | `FR-04` | ST (Đổi trạng thái)| Chuyển trạng thái sân sang bảo trì (Maintenance) | Sân Active, chưa có đơn | Sân CRT-01, Status: "MAINTENANCE" | 1. Admin bấm chuyển bảo trì | Sân đổi sang bảo trì, toàn bộ slot tương lai bị khóa | *Chưa chạy (Chờ code Court)* |
| **TC-FR05-001** | `FR-05` | DT (Quy tắc 1) | Tính giá giờ thường ngày trong tuần (T2 - T6, 08h-09h) | Bảng giá: Thường 80k, Vàng 140k | Thứ 4, Giờ: 08:00 - 09:00 | 1. Tra cứu slot sáng Thứ 4 | Đơn giá hiển thị đúng giá giờ thường: 80.000 VNĐ | *Chưa chạy (Chờ code Pricing)*|
| **TC-FR05-002** | `FR-05` | DT (Quy tắc 2) | Tính giá giờ vàng ngày trong tuần (T2 - T6, 18h-19h) | Bảng giá: Thường 80k, Vàng 140k | Thứ 4, Giờ: 18:00 - 19:00 | 1. Tra cứu slot tối Thứ 4 | Đơn giá hiển thị đúng giá giờ cao điểm: 140.000 VNĐ | *Chưa chạy (Chờ code Pricing)*|
| **TC-FR05-003** | `FR-05` | DT (Quy tắc 3) | Tính giá buổi sáng ngày cuối tuần (Thứ 7, 08h-09h) | Bảng giá: Thường 80k, Vàng 140k | Thứ 7, Giờ: 08:00 - 09:00 | 1. Tra cứu slot sáng Thứ 7 | Hiển thị đơn giá giờ cao điểm: 140.000 VNĐ (theo SRS 4.1) | *Chưa chạy (Chờ code Pricing)*|
| **TC-FR05-004** | `FR-05` | DT (Quy tắc 4) | Tính giá buổi tối ngày cuối tuần (Chủ Nhật, 19h-20h) | Bảng giá: Thường 80k, Vàng 140k | Chủ Nhật, Giờ: 19:00 - 20:00 | 1. Tra cứu slot tối Chủ Nhật | Hiển thị đơn giá giờ cao điểm: 140.000 VNĐ | *Chưa chạy (Chờ code Pricing)*|
| **TC-FR05-005** | `FR-05` | BVA (Biên dưới giá)| Admin cấu hình giá giờ thường = 50.000 VNĐ | Đã login Admin | regularPrice: 50000, peakPrice: 100000 | 1. Nhập giá 50.000<br>2. Lưu cấu hình | Cập nhật thành công | *Chưa chạy (Chờ code Pricing)*|
| **TC-FR05-006** | `FR-05` | BVA (Dưới biên giá)| Admin cấu hình giá giờ thường = 49.000 VNĐ | Đã login Admin | regularPrice: 49000 | 1. Nhập giá 49.000<br>2. Lưu cấu hình | Báo lỗi validation: Giá giờ thường từ 50k-150k | *Chưa chạy (Chờ code Pricing)*|
| **TC-FR05-007** | `FR-05` | EP (Logic sai) | Admin cấu hình giá giờ vàng nhỏ hơn giá giờ thường | Đã login Admin | regularPrice: 120000, peakPrice: 100000 | 1. Nhập vàng < thường<br>2. Bấm lưu | Báo lỗi: Giá giờ cao điểm phải lớn hơn giá thường | *Chưa chạy (Chờ code Pricing)*|
| **TC-FR06-001** | `FR-06` | BVA (Ngày hiện tại)| Tra cứu lịch sân trống cho ngày hôm nay | Hệ thống hoạt động | date = currentDate | 1. Chọn ngày hôm nay<br>2. Xem bảng lịch | Hiển thị danh sách slot của các sân trong ngày | *Chưa chạy (Chờ code Slots)* |
| **TC-FR06-002** | `FR-06` | BVA (Biên trên) | Tra cứu lịch sân trống cho ngày thứ 14 tới | Hệ thống hoạt động | date = currentDate + 14 ngày | 1. Chọn ngày thứ 14<br>2. Xem bảng lịch | Hiển thị bảng lịch sân trống bình thường | *Chưa chạy (Chờ code Slots)* |
| **TC-FR06-003** | `FR-06` | BVA (Vượt ngày) | Tra cứu lịch sân trống cho ngày thứ 15 tới | Hệ thống hoạt động | date = currentDate + 15 ngày | 1. Chọn ngày thứ 15<br>2. Bấm xem | Báo lỗi: Chỉ cho phép đặt trước tối đa 14 ngày | *Chưa chạy (Chờ code Slots)* |
| **TC-FR06-004** | `FR-06` | EP (Ngày quá khứ)| Tra cứu lịch sân trống cho ngày hôm qua | Hệ thống hoạt động | date = currentDate - 1 ngày | 1. Chọn ngày hôm qua<br>2. Gửi request | Báo lỗi: Ngày tra cứu không được ở trong quá khứ | *Chưa chạy (Chờ code Slots)* |
| **TC-FR07-001** | `FR-07` | ST (Khóa slot) | Khóa tạm thời 1 slot trống thành công | Slot đang Available | slotId = "SLOT-01-18", courtId = "CRT-01" | 1. Bấm chọn slot<br>2. Gửi POST /api/bookings/hold | Slot chuyển sang status HOLDING, cấp holdToken | *Chưa chạy (Chờ code Hold)* |
| **TC-FR07-002** | `FR-07` | EP (Slot đã khóa)| Khóa slot khi slot đang bị người khác giữ chỗ | Slot đang HOLDING | slotId đang Holding bởi User A | 1. User B bấm chọn slot đó | Báo lỗi HTTP 409 Conflict: Slot vừa có người giữ chỗ | *Chưa chạy (Chờ code Hold)* |
| **TC-FR07-003** | `FR-07` | EP (Slot đã đặt) | Khóa slot khi slot đã có người đặt thành công | Slot đang BOOKED | slotId đã BOOKED | 1. Bấm chọn slot đã đặt | Báo lỗi HTTP 409 Conflict, không cho click | *Chưa chạy (Chờ code Hold)* |
| **TC-FR07-004** | `FR-07` | ST (Hết hạn giữ)| Tự động giải phóng slot khi hết thời gian giữ chỗ | Đang giữ chỗ lúc T | Sau 10 phút không bấm đặt | 1. Giữ slot<br>2. Chờ hết giờ<br>3. Kiểm tra lại slot | Slot tự động quay về trạng thái AVAILABLE | *Chưa chạy (Chờ code Hold)* |
| **TC-FR08-001** | `FR-08` | BVA (Biên 1 slot) | Đặt sân thành công với số lượng đúng 1 slot | Đang giữ 1 slot hợp lệ | slotIds: 1 slot | 1. Nhập thông tin KH<br>2. Bấm "Xác nhận đặt" | Tạo đơn BK thành công, trạng thái CONFIRMED | *Chưa chạy (Chờ code Booking)*|
| **TC-FR08-002** | `FR-08` | BVA (Biên 4 slot) | Đặt sân thành công với số lượng đúng 4 slot | Đang giữ 4 slot liên tiếp | slotIds: 4 slots | 1. Nhập thông tin KH<br>2. Bấm "Xác nhận đặt" | Tạo đơn thành công với tổng tiền 4 slot | *Chưa chạy (Chờ code Booking)*|
| **TC-FR08-003** | `FR-08` | BVA (Vượt 4 slot) | Đặt sân thất bại khi cố gắng đặt 5 slot trong ngày | Giữ 5 slot | slotIds: 5 slots | 1. Gửi request đặt 5 slots | Báo lỗi validation 400: Không đặt quá 4 slot/ngày | *Chưa chạy (Chờ code Booking)*|
| **TC-FR08-004** | `FR-08` | EP (Hết hạn hold) | Xác nhận đặt sân khi holdToken đã hết hạn | Đã quá 10 phút | holdToken hết hạn | 1. Bấm xác nhận sau khi hết hạn | Báo lỗi 400: Phiên giữ chỗ đã hết hạn | *Chưa chạy (Chờ code Booking)*|
| **TC-FR09-001** | `FR-09` | EP (Hợp lệ) | Staff đặt sân tại quầy cho khách vãng lai thành công | Login tài khoản Staff | Slot trống trong ngày | 1. Staff chọn slot<br>2. Nhập tên/SĐT<br>3. Tạo đơn | Tạo đơn thành công với nguồn "WALK_IN" | *Chưa chạy (Chờ code Booking)*|
| **TC-FR10-001** | `FR-10` | BVA (Biên đúng 24h)| Hủy đặt sân thành công khi thời gian còn đúng 24h00m | Đơn CONFIRMED, cách 24h | Đơn bắt đầu sau đúng 24h | 1. Bấm Hủy đơn<br>2. Xác nhận lý do | Hủy thành công, đơn chuyển CANCELLED, giải phóng slot | *Chưa chạy (Chờ code Cancel)* |
| **TC-FR10-002** | `FR-10` | BVA (Hơn 24h) | Hủy đặt sân thành công khi thời gian còn 48 giờ (> 24h)| Đơn CONFIRMED, cách 48h | Đơn ngày kia | 1. Bấm Hủy đơn<br>2. Xác nhận | Hủy thành công, slot chuyển về Available | *Chưa chạy (Chờ code Cancel)* |
| **TC-FR10-003** | `FR-10` | BVA (Dưới 24h) | Từ chối hủy sân khi thời gian bắt đầu chỉ còn 23h59m | Đơn CONFIRMED, cách 23h59 | Bắt đầu sau 23h59m | 1. Bấm Hủy đơn | Báo lỗi 400: Không thể hủy sân trước giờ chơi dưới 24h | *Chưa chạy (Chờ code Cancel)* |
| **TC-FR10-004** | `FR-10` | BVA (Sát giờ) | Từ chối hủy sân khi thời gian bắt đầu chỉ còn 2 giờ | Đơn CONFIRMED | Bắt đầu sau 2 tiếng | 1. Bấm Hủy đơn | Báo lỗi chặn hủy theo chính sách | *Chưa chạy (Chờ code Cancel)* |
| **TC-FR10-005** | `FR-10` | ST (Hủy 2 lần) | Từ chối hủy đơn đặt sân đã ở trạng thái CANCELLED | Đơn đã CANCELLED | Gửi lại request hủy lần 2 | 1. Gửi lại POST /cancel | Báo lỗi 409 Conflict: Đơn đã hủy trước đó | *Chưa chạy (Chờ code Cancel)* |
| **TC-FR11-001** | `FR-11` | EP (Hợp lệ) | Staff check-in thành công cho khách đến sân đúng giờ | Đơn CONFIRMED | Mã đơn hợp lệ | 1. Staff tìm mã đơn<br>2. Bấm "Check-in" | Đơn chuyển sang CHECKED_IN | *Chưa chạy (Chờ code Checkin)*|
| **TC-FR11-002** | `FR-11` | EP (Mã sai) | Staff check-in thất bại khi nhập sai mã đặt sân | Đang ở màn hình quầy | Mã: "BK-99999999-9999" | 1. Nhập mã không tồn tại<br>2. Tìm kiếm | Báo lỗi: Không tìm thấy đơn đặt sân | *Chưa chạy (Chờ code Checkin)*|
| **TC-FR11-003** | `FR-11` | ST (Checkin 2 lần)| Staff bấm check-in trên đơn đã được CHECKED_IN | Đơn đã CHECKED_IN | Bấm checkin lần nữa | 1. Thao tác checkin lần 2 | Báo lỗi: Khách đã check-in trước đó | *Chưa chạy (Chờ code Checkin)*|
| **TC-FR12-001** | `FR-12` | EP (Hợp lệ) | Admin xem báo cáo doanh thu theo khoảng ngày hợp lệ | Login tài khoản Admin | from = "2026-10-01", to = "2026-10-31" | 1. Admin mở trang Thống kê<br>2. Chọn ngày | Hiển thị tổng doanh thu, tỷ lệ lấp đầy sân (%) | *Chưa chạy (Chờ code Report)* |
| **TC-FR12-002** | `FR-12` | EP (Loại đơn hủy)| Đơn bị hủy (CANCELLED) không được cộng vào doanh thu | Có đơn CONFIRMED và CANCELLED | Dữ liệu thực tế | 1. Xem tổng doanh thu | Tổng doanh thu loại trừ các đơn đã hủy | *Chưa chạy (Chờ code Report)* |
| **TC-FLOW01-001**| `FLOW-01` | UC (Happy path) | Luồng E2E 1: Tìm sân → Khóa slot → Đặt sân thành công | Khách hàng mới | Sân 1, slot ngày mai | 1. Tra cứu lịch<br>2. Chọn slot<br>3. Xác nhận | Chu trình đặt sân hoàn tất, slot chuyển Booked | *Chưa chạy (Chờ code FLOW-01)*|
| **TC-FLOW01-002**| `FLOW-01` | UC (Race cond.) | Luồng E2E 1: Hai khách hàng cùng tranh chấp 1 slot duy nhất | 2 user A và B | Cùng 1 slot Sân 2 | 1. A và B cùng bấm đặt cùng lúc | 1 user thành công, 1 user nhận thông báo slot đã được đặt | *Chưa chạy (Chờ code FLOW-01)*|
| **TC-FLOW01-003**| `FLOW-01` | UC (Timeout) | Luồng E2E 1: Khách giữ slot nhưng bỏ dở không hoàn tất | Khách chọn slot | Slot bất kỳ | 1. Giữ slot<br>2. Chờ hết thời gian<br>3. Xem lại | Slot tự động nhả lại trạng thái Available | *Chưa chạy (Chờ code FLOW-01)*|
| **TC-FLOW02-001**| `FLOW-02` | UC (Happy path) | Luồng E2E 2: Khách hủy sân trước 48h → Slot tự giải phóng | Đơn CONFIRMED trước 48h | Đơn hợp lệ | 1. Bấm Hủy đơn<br>2. Kiểm tra bảng lịch | Đơn thành CANCELLED, slot đổi sang màu xanh Available | *Chưa chạy (Chờ code FLOW-02)*|
| **TC-FLOW02-002**| `FLOW-02` | UC (Đặt lại slot) | Luồng E2E 2: Khách B đặt ngay slot vừa được khách A hủy | Khách A vừa hủy thành công | Slot vừa giải phóng | 1. A hủy đơn<br>2. B vào đặt đúng slot đó | Khách B đặt thành công bình thường | *Chưa chạy (Chờ code FLOW-02)*|
| **TC-FLOW02-003**| `FLOW-02` | UC (Hủy sát giờ) | Luồng E2E 2: Khách cố gắng hủy đơn khi còn 5 tiếng | Đơn sát giờ | Đơn chiều nay | 1. Bấm Hủy đơn | Bị chặn theo chính sách, slot không bị giải phóng | *Chưa chạy (Chờ code FLOW-02)*|
| **TC-FLOW03-001**| `FLOW-03` | UC (Happy path) | Luồng E2E 3: Admin thêm Sân mới → Khách thấy và đặt được ngay | Admin đăng nhập | Sân mới | 1. Admin tạo sân<br>2. Khách mở tra cứu | Sân mới xuất hiện trên timeline, đặt được bình thường | *Chưa chạy (Chờ code FLOW-03)*|
| **TC-FLOW03-002**| `FLOW-03` | UC (Bảo trì sân)| Luồng E2E 3: Admin bảo trì Sân → Khóa toàn bộ slot | Sân đang trống | Chuyển sang MAINTENANCE | 1. Admin đổi sang bảo trì<br>2. Khách tra cứu | Toàn bộ slot sân đó bị khóa, không click được | *Chưa chạy (Chờ code FLOW-03)*|
| **TC-FLOW03-003**| `FLOW-03` | UC (Đổi giá) | Luồng E2E 3: Admin đổi giá → Đơn mới tính theo giá mới | Admin đổi giá | Đổi giá giờ vàng | 1. Admin sửa giá<br>2. Khách đặt slot tối | Hóa đơn hiển thị đúng đơn giá mới | *Chưa chạy (Chờ code FLOW-03)*|
| **TC-AUTHZ-001** | Phân quyền | RBAC | Khách vãng lai cố tình gọi API tạo sân mới | Chưa đăng nhập | POST /api/courts | 1. Gửi request tạo sân không token | Bị chặn với mã HTTP 401 Unauthorized | *Chưa chạy (Chờ code Auth)* |
| **TC-AUTHZ-002** | Phân quyền | RBAC | Tài khoản Customer cố tình gọi API tạo sân mới | Login vai Customer | Token Customer | 1. Gửi POST /api/courts với token Customer | Bị chặn với mã HTTP 403 Forbidden | *Chưa chạy (Chờ code Auth)* |
| **TC-AUTHZ-003** | Phân quyền | RBAC | Tài khoản Staff cố tình gọi API đổi bảng giá sân | Login vai Staff | Token Staff | 1. Gửi PUT /api/courts/pricing với token Staff | Bị chặn với mã HTTP 403 Forbidden | *Chưa chạy (Chờ code Auth)* |
| **TC-AUTHZ-004** | Phân quyền | RBAC | Tài khoản Staff cố tình gọi API xem báo cáo doanh thu | Login vai Staff | Token Staff | 1. Gửi GET /api/reports/revenue | Bị chặn với mã HTTP 403 Forbidden | *Chưa chạy (Chờ code Auth)* |
| **TC-AUTHZ-005** | Phân quyền | RBAC | Tài khoản Admin thực hiện check-in và đổi giá thành công | Login vai Admin | Token Admin | 1. Admin gọi checkin<br>2. Admin gọi đổi giá | Cả 2 thao tác đều trả về 200 OK thành công | *Chưa chạy (Chờ code Auth)* |

*(Tổng cộng: 64 test cases chức năng được thiết kế theo chuẩn SRS v1.0, đáp ứng yêu cầu tối thiểu ≥ 60 TC của Rubric B2).*

---

## SHEET 4: TEST CASE PHI CHỨC NĂNG (TC_Phi_chuc_nang – 12 Test Cases Thiết kế)

| TC ID | Nguồn yêu cầu | Phân nhóm | Tiêu đề kịch bản | Công cụ dự kiến | Điều kiện đo dự kiến | Các bước thực hiện | Ngưỡng chỉ tiêu cần đạt (SRS) | Tình trạng thực thi thực tế |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-NFR01-001** | `NFR-01` | Hiệu năng | Đo thời gian phản hồi của API tra cứu lịch sân trống ở tải thường | Apache JMeter | 20 virtual user, ramp-up 30s, chạy 5 phút | 1. Chạy plan.jmx<br>2. Đọc P90 và Error % | P90 ≤ 1000 ms; Lỗi < 0.5% | *Chờ chạy JMeter thật* |
| **TC-NFR01-002** | `NFR-01` | Hiệu năng | Đo thời gian phản hồi của API Health Check (`GET /api/health`) | Apache JMeter / Curl | 50 thread đồng thời | 1. Gửi request tới /api/health | P90 ≤ 200 ms; Lỗi 0% | *Chờ chạy JMeter thật* |
| **TC-NFR02-001** | `NFR-02` | Hiệu năng | Kiểm tra khả năng chịu tải tăng dần (Step Load) của API Đặt sân | Apache JMeter | Bậc: 10 → 20 → 50 thread | 1. Tăng tải theo bậc<br>2. Đo Throughput và P95 | Throughput ≥ 40 req/s; P95 ≤ 2500 ms | *Chờ chạy JMeter thật* |
| **TC-NFR02-002** | `NFR-02` | Hiệu năng | Xác định điểm bão hòa (Saturation Point) của server Backend | JMeter Stress Test | Tăng tải đột biến lên 200 user | 1. Tăng tải đột biến<br>2. Quan sát Throughput | Xác định rõ điểm bão hòa | *Chờ chạy JMeter thật* |
| **TC-NFR03-001** | `NFR-03` | Tài nguyên | Đo mức tiêu thụ CPU và RAM của Node.js khi chịu tải đỉnh | Htop / PM2 Monit | 50 thread trong 10 phút | 1. Giám sát CPU/RAM khi chạy tải | CPU ≤ 75%; RAM < 80% | *Chờ đo đạc thực tế* |
| **TC-NFR04-001** | `NFR-04` | Toàn vẹn | Kiểm thử chống trùng lịch (Double Booking) với 10 request đồng thời | Postman Runner | 10 request gửi tới 1 slot cùng lúc | 1. Gửi đồng thời 10 request | Đúng 1 req 200, 9 req 409 | *Chờ chạy test thật* |
| **TC-NFR05-001** | `NFR-05` | Bảo mật | Kiểm tra tự động khóa tài khoản khi tấn công dò mật khẩu | Postman script | Gửi 6 request sai pass liên tiếp | 1. Gửi 6 req sai pass liên tiếp | Lần 6 bị chặn với mã 403 | *Chờ chạy test thật* |
| **TC-NFR05-002** | `NFR-05` | Bảo mật | Kiểm tra mã hóa mật khẩu trong cơ sở dữ liệu MySQL | MySQL CLI | Truy vấn bảng users | 1. Query cột password trong DB | Lưu dạng chuỗi băm bcrypt ($2b$10$...) | *Chờ chạy test thật* |
| **TC-NFR06-001** | `NFR-06` | Tương thích | Kiểm thử hiển thị Responsive trên di động (375×812 px) | Puppeteer | Giả lập iPhone 13 (375×812) | 1. Chạy script Puppeteer chụp ảnh | Không tràn viền ngang, cuộn mượt | *Chờ chạy Puppeteer* |
| **TC-NFR06-002** | `NFR-06` | Tương thích | Kiểm thử độ tương thích trình duyệt chéo (Chrome, Firefox, Safari) | Đa trình duyệt | 3 trình duyệt phổ biến | 1. Thao tác trên 3 trình duyệt | Giao diện và nút bấm đồng nhất | *Chờ chạy test thật* |
| **TC-NFR07-001** | `NFR-07` | Sẵn sàng | Đo tính sẵn sàng liên tục của dịch vụ (Uptime) | Cron health check | Ping `/api/health` mỗi 60s | 1. Thống kê tỷ lệ Uptime | Uptime ≥ 99.0% | *Chờ thống kê tuần 6-14* |
| **TC-NFR08-001** | `NFR-08` | Phục hồi | Đo thời gian tự phục hồi của Backend khi bị crash đột ngột | Bash kill -9 | Giả lập kill tiến trình Node | 1. Kill tiến trình<br>2. Đo thời gian hồi phục | Thời gian hồi phục ≤ 5 giây | *Chờ chạy test thật* |

*(Tổng cộng: 12 test cases phi chức năng được thiết kế, đáp ứng yêu cầu tối thiểu ≥ 10 TC của Rubric B2).*

---

## SHEET 5: NHẬT KÝ THỰC THI KIỂM THỬ (Test_Log)

> [!NOTE]
> Bảng dưới đây ghi nhận **TRUNG THỰC VÀ CHỈ GHI NHẬN CÁC PHIÊN ĐÃ CHẠY THỰC TẾ TRONG WORKSPACE**. Các phiên kiểm thử nghiệm thu chuyên sâu đối với hệ thống của bạn cặp sẽ được Tester điền sau khi nhận bàn giao ở tuần 6.

| STT | Ngày thực hiện | Khung giờ | Môi trường kiểm thử | Trình duyệt / Công cụ | Phạm vi test case đã chạy | Số TC chạy | Số TC Pass | Số TC Fail | Ghi chú & Sự cố môi trường phát hiện |
| :---: | :---: | :---: | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| 1 | 03/10/2026 | 16:32 | `http://localhost:5001` (Backend) | Curl CLI | `TC-NFR01-002` (Health check API) | 1 | 1 | 0 | Chạy kiểm tra lệnh `curl http://localhost:5001/api/health` trả về HTTP 200 OK. |
| 2 | 03/10/2026 | 16:32 | `http://localhost:5173` (Frontend) | Curl CLI / Vite | Kiểm tra trang Home React | 1 | 1 | 0 | Chạy kiểm tra lệnh `curl http://localhost:5173` trả về HTTP 200 OK, HTML chứa tiêu đề đúng. |
| 3 | *Chưa thực hiện* | *Chưa có* | *Chưa có link bàn giao từ bạn cặp* | *Chưa có* | Toàn bộ 74 TC nghiệp vụ còn lại | 0 | 0 | 0 | Chưa nhận bàn giao hệ thống từ bạn cặp; chưa thực hiện kiểm thử. |

---

## SHEET 6: DANH SÁCH BÁO CÁO LỖI (Bug_Report)

> [!NOTE]
> **TÌNH TRẠNG HIỆN TẠI**: Hiện tại Tester **CHƯA NHẬN BÀN GIAO SẢN PHẨM TỪ BẠN CẶP VÀ CHƯA CHẠY KIỂM THỬ THỰC TẾ**. Theo nguyên tắc không bịa đặt, bảng dưới đây là **KHUNG MẪU BÁO CÁO CHUẨN BỊ SẴN SÀNG**, không điền bug giả mạo.

| Bug ID | Tiêu đề lỗi (Summary) | Phân loại lỗi (5 loại) | Mức nghiêm trọng (Severity) | Mức ưu tiên (Priority) | Chức năng / NFR vi phạm | Test Case phát hiện | URL / Màn hình phát hiện | Các bước tái hiện | Kết quả thực tế | Kết quả mong đợi | Bằng chứng (Link ảnh / video) | Trạng thái phản hồi |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| *Chưa có* | *Chưa có bug thực tế nào được ghi nhận do chưa thực hiện kiểm thử trên hệ thống bạn cặp.* | - | - | - | - | - | - | - | - | - | - | - |

---

## SHEET 7: TỔNG HỢP SỐ LIỆU TỰ ĐỘNG (Tong_hop)

### 1. Kiểm tra số lượng thiết kế tối thiểu (Đối chiếu Rubric B2)
| Hạng mục kiểm tra | Số lượng đã thiết kế | Yêu cầu tối thiểu theo Rubric | Trạng thái đối chuẩn |
| :--- | :---: | :---: | :---: |
| **Test case chức năng** | **64** | **≥ 60** | **ĐẠT (Vượt 4 TC)** |
| **Test case phi chức năng** | **12** | **≥ 10** | **ĐẠT (Vượt 2 TC)** |
| **Test case luồng E2E (`FLOW-01..03`)**| **9** | **≥ 9** | **ĐẠT (3 luồng × 3 case)** |
| **Số kỹ thuật thiết kế đã áp dụng** | **5** (EP, BVA, Decision Table, State Transition, Use Case) | **≥ 4 kỹ thuật** | **ĐẠT (5/4 kỹ thuật)** |

### 2. Tóm tắt kết quả thực thi thực tế hiện tại
- **Tổng số Test Case đã thiết kế**: **76** (64 chức năng + 12 phi chức năng).
- **Số Test Case đã chạy thực tế trên Baseline**: **2** (Health check API và Trang Home React).
- **Số Test Case chưa chạy thực tế (Pending)**: **74** (Toàn bộ các ca kiểm thử nghiệp vụ do chưa triển khai code).
- **Tỷ lệ Pass trên các ca đã chạy thực tế**: **100%** (2/2 ca Baseline).
