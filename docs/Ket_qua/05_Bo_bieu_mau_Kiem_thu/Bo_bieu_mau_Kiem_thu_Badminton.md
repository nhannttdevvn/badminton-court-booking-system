# BỘ BIỂU MẪU KIỂM THỬ (TEST SUITE & TEST CASES)
## HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
### Phiên bản: v2.0 (Cập nhật ngày 21/10/2026 theo phạm vi mới)
**Căn cứ biểu mẫu**: `TAILIEU/Mau_03_Bo_bieu_mau_Kiem_thu.xlsx`  
**Phạm vi hệ thống**: 1 Vai trò Nhân viên – 5 Chức năng (`FR-01` đến `FR-05`)  

---

## SHEET 1: THONG_TIN (THÔNG TIN CHUNG VỀ DỰ ÁN)

| Thông tin | Giá trị ghi nhận |
| :--- | :--- |
| **Tên dự án** | Hệ thống Đặt sân Cầu lông (Badminton Court Booking System) |
| **Phạm vi kiểm thử** | 1 Vai trò nghiệp vụ: **Nhân viên (Staff)**; 5 Chức năng: Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy đặt sân |
| **Chủ hệ thống (Developer)** | `[Nguyễn Thị Thanh Nhàn - MSSV: ...]` |
| **Người thực hiện kiểm thử (Tester)** | `[Họ tên Tester - Bạn cặp - MSSV: ...]` |
| **Tài liệu căn cứ** | SRS v2.0, URD v2.0, Tài liệu thiết kế API v2.0 |
| **Môi trường thử nghiệm** | Backend: `http://localhost:5001` (Node.js/Express) \| Frontend: `http://localhost:5173` (React/Vite) |

---

## SHEET 2: REVIEW_SRS (PHIẾU RÀ SOÁT TÍNH KIỂM THỬ ĐƯỢC CỦA SRS)

| STT | Mã yêu cầu trong SRS | Nội dung chưa rõ ràng / Thiếu sót ban đầu | Mức độ rủi ro | Đề xuất chỉnh sửa của Tester | Kết quả phản hồi của Chủ hệ thống |
| :---: | :---: | :--- | :---: | :--- | :--- |
| 1 | `FR-01` | Chưa nêu rõ quy định ai được đăng ký tài khoản nhân viên (có cần duyệt không). | Trung bình | Bổ sung quy định rõ ràng trong SRS v2.0; tạm thời cho phép kích hoạt ngay để test. | **Đã cập nhật**: Ghi rõ là đề xuất kích hoạt ngay chờ xác nhận quy chế từ quản lý. |
| 2 | `FR-03` | Chưa quy định khung giờ hoạt động mở cửa và thời lượng của 1 slot. | Cao | Cần chuẩn hóa khung giờ mở cửa cụ thể (VD: 06:00 đến 22:00) và block thời gian 60 phút. | **Đã cập nhật**: Đã đưa vào SRS v2.0 khung giờ từ 06:00 đến 22:00, chia 16 slot tròn giờ. |
| 3 | `FR-04` | Chưa đặc tả cơ chế xử lý khi 2 nhân viên cùng đặt 1 slot trong cùng 1 giây. | **Nghiêm trọng** | Cần quy định rõ cơ chế Database Transaction và trả về mã lỗi HTTP 409 Conflict. | **Đã cập nhật**: Đã bổ sung chi tiết cơ chế Pessimistic Locking và mã lỗi 409 trong SRS v2.0. |
| 4 | `FR-05` | Chưa có quy định bắt buộc về hộp thoại xác nhận trước khi hủy đơn. | Trung bình | Phải có popup cảnh báo để tránh bấm nhầm gây mất dữ liệu của khách. | **Đã cập nhật**: Bổ sung bước 4 (hiển thị modal xác nhận hủy) trong SRS v2.0. |
| 5 | `SRS Mục 4` | Yêu cầu Responsive ban đầu còn chung chung, chưa có bộ kích cỡ cụ thể. | Cao | Cần liệt kê cụ thể các độ phân giải màn hình kiểm thử từ 320px đến 1366px. | **Đã cập nhật**: Đã bổ sung bộ 5 kích thước chuẩn (320, 375, 768, 1024, 1366 px). |

---

## SHEET 3: TC_CHUC_NANG (BỘ TEST CASES CHỨC NĂNG, XÁC THỰC VÀ TRANH CHẤP)

> **Tổng số test cases chức năng thiết kế**: **35 Test Cases**  
> **Các kỹ thuật áp dụng**: Phân hoạch tương đương (EP), Phân tích giá trị biên (BVA), Bảng quyết định (Decision Table), Chuyển đổi trạng thái (State Transition), Ca sử dụng (Use Case Testing).

| Test Case ID | Chức năng (FR) | Kỹ thuật thiết kế | Mục tiêu / Tình huống kiểm thử | Tiền điều kiện | Dữ liệu đầu vào | Các bước thực hiện | Kết quả mong đợi (SRS) | Trạng thái thực thi |
| :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| `TC-AUTH-001` | `FR-01` | EP | Đăng ký nhân viên thành công với thông tin hợp lệ | Chưa đăng nhập | Tên: "Nguyễn Văn A", SĐT: `0901112223`, Pass: `Staff@123` | 1. Mở form Đăng ký.<br>2. Nhập thông tin hợp lệ.<br>3. Bấm "Đăng ký". | Thông báo thành công; chuyển hướng sang trang Đăng nhập. | Pending (Chờ code) |
| `TC-AUTH-002` | `FR-01` | BVA | Đăng ký với mật khẩu ngắn dưới 6 ký tự | Chưa đăng nhập | Pass: `12345` (5 ký tự) | 1. Nhập form với mật khẩu 5 ký tự.<br>2. Bấm "Đăng ký". | Chặn gửi form; báo lỗi mật khẩu tối thiểu 6 ký tự. | Pending (Chờ code) |
| `TC-AUTH-003` | `FR-01` | EP | Đăng ký với số điện thoại đã tồn tại | SĐT `0901112223` đã có trong DB | SĐT: `0901112223` | 1. Nhập SĐT đã tồn tại.<br>2. Bấm "Đăng ký". | Báo lỗi 400: SĐT này đã được đăng ký tài khoản. | Pending (Chờ code) |
| `TC-AUTH-004` | `FR-01` | EP | Đăng ký khi mật khẩu xác nhận không khớp | Chưa đăng nhập | Pass: `Staff@123`, Confirm: `Staff@999` | 1. Nhập 2 mật khẩu khác nhau.<br>2. Bấm "Đăng ký". | Báo lỗi: Mật khẩu xác nhận không trùng khớp. | Pending (Chờ code) |
| `TC-AUTH-005` | `FR-02` | EP | Đăng nhập thành công với tài khoản nhân viên hợp lệ | Đã đăng ký tài khoản | SĐT: `0901112223`, Pass: `Staff@123` | 1. Nhập SĐT và Pass đúng.<br>2. Bấm "Đăng nhập". | Đăng nhập thành công, lưu Token, chuyển vào màn hình Lịch đặt sân. | Pending (Chờ code) |
| `TC-AUTH-006` | `FR-02` | EP | Đăng nhập thất bại khi sai mật khẩu | Đã có tài khoản | SĐT: `0901112223`, Pass: `SaiPass123` | 1. Nhập sai Pass.<br>2. Bấm "Đăng nhập". | Báo lỗi 401: SĐT hoặc mật khẩu không chính xác. | Pending (Chờ code) |
| `TC-AUTH-007` | `FR-02` | Security | Truy cập trang Lịch khi chưa đăng nhập (Chặn quyền) | Chưa đăng nhập | Không có Token | 1. Gõ trực tiếp URL `/calendar` trên trình duyệt. | Bị chặn; tự động chuyển hướng về trang Login. | Pending (Chờ code) |
| `TC-CAL-001` | `FR-03` | EP | Xem bảng lịch ngày hiện tại | Đã đăng nhập | Ngày hiện tại | 1. Mở màn hình Lịch đặt sân. | Hiển thị đủ các sân và khung giờ; các ô hiển thị đúng màu Xanh (Trống) / Đỏ (Đã đặt). | Pending (Chờ code) |
| `TC-CAL-002` | `FR-03` | State | Chuyển đổi ngày xem lịch qua Date Picker | Đang ở trang Lịch | Chọn ngày: `2026-10-25` | 1. Chọn ngày khác trên Date Picker. | Hệ thống gửi request tải lại dữ liệu lịch của ngày 2026-10-25. | Pending (Chờ code) |
| `TC-BOOK-001`| `FR-04` | Use Case | Đặt sân thành công 1 slot trống cho khách | Đã đăng nhập, slot 08:00 Sân 1 đang trống | Tên: "Trần Khách", SĐT: `0988776655` | 1. Chọn ô slot 08:00 Sân 1.<br>2. Bấm "Đặt sân".<br>3. Nhập thông tin khách.<br>4. Bấm "Xác nhận đặt". | Báo đặt thành công; ô slot trên bảng lịch chuyển ngay sang Màu đỏ tức thời. | Pending (Chờ code) |
| `TC-BOOK-002`| `FR-04` | BVA | Đặt sân cho khung giờ trong quá khứ | Đã đăng nhập | Ngày: `2026-10-15` | 1. Chọn ngày quá khứ.<br>2. Bấm chọn slot và xác nhận. | Báo lỗi: Không thể đặt sân cho khung giờ trong quá khứ. | Pending (Chờ code) |
| `TC-BOOK-003`| `FR-04` | Concurrency | **Kiểm thử tranh chấp đặt trùng lịch (Double Booking)** | 2 phiên NV đăng nhập cùng lúc, 1 slot trống | Sân 1, slot 19:00. NV1 đặt khách A, NV2 đặt khách B | 1. Cả 2 NV cùng mở form đặt slot 19:00.<br>2. Cùng bấm "Xác nhận" đồng thời. | Đúng 1 đơn thành công (201); đơn còn lại bị từ chối với mã 409 Conflict. 0% trùng lịch. | Pending (Chờ code) |
| `TC-BOOK-004`| `FR-04` | EP | Đặt sân khi để trống trường Số điện thoại khách | Đang mở modal đặt sân | Tên: "Lê Khách", SĐT: rỗng `""` | 1. Bỏ trống SĐT khách.<br>2. Bấm "Xác nhận đặt". | Form hiển thị cảnh báo đỏ, không cho gửi request. | Pending (Chờ code) |
| `TC-CANC-001`| `FR-05` | Use Case | Hủy đặt sân thành công và giải phóng slot | Có sẵn 1 đơn đặt hiệu lực (ô màu đỏ) | Booking ID: 101 | 1. Bấm vào ô đỏ.<br>2. Bấm "Hủy đặt sân".<br>3. Bấm xác nhận "Đồng ý" trên modal. | Báo hủy thành công; ô slot trên lịch đổi ngay sang Màu xanh (Trống). | Pending (Chờ code) |
| `TC-CANC-002`| `FR-05` | State | Đổi ý không hủy khi popup xác nhận hiển thị | Đang mở popup xác nhận hủy | - | 1. Tại popup xác nhận, bấm "Đóng" hoặc nút "Hủy bỏ". | Popup đóng lại; đơn đặt và ô slot màu đỏ được giữ nguyên vẹn. | Pending (Chờ code) |
| `TC-CANC-003`| `FR-05` | State | Đặt lại ngay vào slot vừa được hủy giải phóng | Slot vừa được hủy từ `TC-CANC-001` | Khách mới: "Nguyễn Mới", SĐT: `0933221100` | 1. Bấm vào ô slot vừa chuyển xanh.<br>2. Nhập khách mới và bấm Đặt. | Đặt thành công cho khách mới; slot chuyển lại màu đỏ bình thường. | Pending (Chờ code) |
| `TC-SYS-001` | Baseline | Health | Kiểm tra kết nối Backend API | Máy chủ chạy port 5001 | Endpoint `GET /api/health` | Gửi HTTP GET tới `/api/health`. | Trả về HTTP 200 `{"status": "ok"}`. | **PASS (Đã chạy thật)** |
| `TC-SYS-002` | Baseline | UI | Kiểm tra khởi động Frontend React | Web chạy port 5173 | Mở trình duyệt `http://localhost:5173` | Tải trang chủ. | Giao diện React hiển thị tiêu đề và kết nối được server. | **PASS (Đã chạy thật)** |

---

## SHEET 4: TC_PHI_CHUC_NANG (KIỂM THỬ RESPONSIVE & HIỆU NĂNG)

> **Yêu cầu Responsive là bắt buộc trên toàn bộ 5 chức năng**.  
> Bộ kích thước kiểm thử đề xuất: `320px`, `375px`, `768px`, `1024px`, `1366px`.

| Test Case ID | Loại kiểm thử | Kích thước Viewport | Màn hình / Chức năng | Các bước kiểm tra | Kết quả mong đợi (Tiêu chí Responsive SRS) | Trạng thái thực thi |
| :---: | :--- | :---: | :--- | :--- | :--- | :---: |
| **`TC-RESP-001`** | **Responsive** | **320 × 568 px** (Mobile nhỏ) | `FR-01`: Đăng ký & `FR-02`: Đăng nhập | 1. Đặt kích thước 320px.<br>2. Mở form Đăng nhập và Đăng ký. | Form căn giữa 100% chiều rộng, nhãn và input không bị tràn ra ngoài cạnh phải, nút bấm to rõ dễ bấm bằng ngón tay, không cuộn ngang toàn trang. | Pending (Chờ code) |
| **`TC-RESP-002`** | **Responsive** | **375 × 812 px** (Mobile chuẩn) | `FR-03`: Xem lịch đặt sân | 1. Đặt kích thước 375px.<br>2. Mở màn hình Lịch đặt sân.<br>3. Thao tác vuốt cuộn bảng lịch. | **Không phát sinh cuộn ngang toàn trang**; bảng lịch có thanh cuộn ngang riêng biệt bên trong vùng chứa bảng; cột Tên sân được cố định hoặc nhìn rõ khi cuộn; ô slot hiển thị rõ màu sắc. | Pending (Chờ code) |
| **`TC-RESP-003`** | **Responsive** | **320 × 568 px** (Mobile nhỏ) | `FR-04`: Modal Đặt sân | 1. Đặt kích thước 320px.<br>2. Bấm đặt sân để mở modal. | Hộp thoại modal hiển thị vừa vặn trong vùng nhìn (`max-width: 90vw`); các trường Tên khách, SĐT và nút "Xác nhận đặt" nhìn thấy trọn vẹn, không bị che khuất. | Pending (Chờ code) |
| **`TC-RESP-004`** | **Responsive** | **375 × 812 px** (Mobile chuẩn) | `FR-05`: Modal Hủy đặt sân | 1. Đặt kích thước 375px.<br>2. Bấm hủy để mở popup xác nhận. | Popup cảnh báo nằm gọn giữa màn hình; 2 nút "Xác nhận hủy" và "Đóng" có khoảng cách hợp lý, không bị dính sát nhau gây bấm nhầm. | Pending (Chờ code) |
| **`TC-RESP-005`** | **Responsive** | **768 × 1024 px** (Tablet dọc) | Toàn bộ ứng dụng | 1. Đặt kích thước 768px.<br>2. Kiểm tra thanh điều hướng và bảng lịch. | Giao diện tự động co giãn thoáng đãng; lưới lịch hiển thị đồng thời 4-5 khung giờ; các modal hiển thị dạng popup chuẩn. | Pending (Chờ code) |
| **`TC-RESP-006`** | **Responsive** | **1366 × 768 px** (Desktop quầy) | `FR-03`: Xem lịch đặt sân | 1. Đặt kích thước 1366px trên màn hình máy tính quầy lễ tân. | Bảng lịch hiển thị trọn vẹn tất cả các sân và toàn bộ các khung giờ trong ngày từ 06:00 đến 22:00 trên một màn hình mà không cần cuộn ngang. | Pending (Chờ code) |
| **`TC-RESP-007`** | **Responsive** | **Xoay màn hình** (Portrait ↔ Landscape) | Form đang nhập dữ liệu | 1. Đang nhập dở Tên khách hàng trong modal đặt sân.<br>2. Xoay ngang màn hình (hoặc thay đổi kích thước cửa sổ). | Dữ liệu đang nhập trong form được bảo toàn nguyên vẹn, không bị reset form hoặc mất dữ liệu. | Pending (Chờ code) |
| `TC-PERF-001` | Hiệu năng tải | Không phụ thuộc | `FR-03`: API Lịch sân | Chạy JMeter với 20 người dùng đồng thời gọi API tải lịch. | Thời gian đáp ứng phân vị 90% (P90) ≤ 1000ms; tỷ lệ lỗi < 0.5%. | Pending (Chờ đo thật) |

---

## SHEET 5: TEST_LOG (NHẬT KÝ THỰC THI KIỂM THỬ)

> **Nguyên tắc trung thực**: Chỉ ghi nhận các lần chạy thực tế có bằng chứng. Tuyệt đối không tạo log giả.

| Lần chạy | Ngày thực hiện | Môi trường thử nghiệm | Hạng mục kiểm thử | Số TC chạy | Pass | Fail | Người thực thi | Ghi chú bằng chứng thực tế |
| :---: | :---: | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Run-01** | 21/10/2026 | Node.js Backend (Port 5001) | `TC-SYS-001`: Health Check API | 1 | 1 | 0 | Nhóm phát triển | curl `http://localhost:5001/api/health` trả về HTTP 200 OK. |
| **Run-02** | 21/10/2026 | React Vite (Port 5173) | `TC-SYS-002`: Home Page React | 1 | 1 | 0 | Nhóm phát triển | Khởi chạy Vite server, mở web hiển thị thành công tiêu đề và kết nối backend. |
| **Run-Chuyên sâu** | *Chờ T6-T13* | Local / Staging Server | Toàn bộ 40 TC nghiệp vụ và Responsive | 0 | 0 | 0 | *Chờ Tester bạn cặp* | *Chờ hoàn tất triển khai mã nguồn để Tester thực thi.* |

---

## SHEET 6: BUG_REPORT (BÁO CÁO LỖI PHÁT HIỆN THỰC TẾ CỦA TESTER)

> [!NOTE]
> Bảng này dành cho Tester độc lập ghi nhận các lỗi thực tế bắt được khi kiểm thử sản phẩm của bạn cặp trong giai đoạn Tuần 6 đến Tuần 13. Hiện tại hệ thống đang ở giai đoạn Baseline, chưa có phiên test chính thức nên **chưa có lỗi thực tế nào được ghi nhận** (Tránh làm giả dữ liệu bug).

| Bug ID | Tiêu đề lỗi | Loại lỗi (5 loại) | Mức nghiêm trọng | Bước tái hiện lỗi | Kết quả thực tế quan sát được | Kết quả mong đợi | Ảnh / Video minh chứng | Trạng thái xử lý |
| :---: | :--- | :---: | :---: | :--- | :--- | :--- | :---: | :---: |
| *(Trống)* | *Chưa phát sinh lỗi thực tế (Đang ở giai đoạn thiết kế test cases và kiểm thử baseline)* | - | - | - | - | - | - | - |

---

## SHEET 7: TONG_HOP (BẢNG TỔNG HỢP TIẾN ĐỘ THIẾT KẾ & THỰC THI)

| Phân loại kiểm thử | Số TC thiết kế | Đã thực thi thực tế | Số ca Pass | Số ca Fail | Số ca Pending / Chờ code |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Kiểm thử Baseline hệ thống** | 2 | 2 | 2 | 0 | 0 |
| **Kiểm thử Chức năng (`FR-01` đến `FR-05`)** | 16 | 0 | 0 | 0 | 16 |
| **Kiểm thử Bảo mật / Phân quyền** | 2 | 0 | 0 | 0 | 2 |
| **Kiểm thử Tranh chấp (Double Booking)** | 1 | 0 | 0 | 0 | 1 |
| **Kiểm thử Responsive (Bộ 5 kích thước)** | 7 | 0 | 0 | 0 | 7 |
| **Kiểm thử Hiệu năng (JMeter)** | 1 | 0 | 0 | 0 | 1 |
| **TỔNG CỘNG** | **29** | **2** | **2** | **0** | **27** |
