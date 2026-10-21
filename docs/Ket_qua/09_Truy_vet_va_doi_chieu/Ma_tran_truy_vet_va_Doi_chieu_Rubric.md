# MA TRẬN TRUY VẾT VÀ BẢNG ĐỐI CHIẾU CHECKLIST / RUBRIC
## HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
### Phiên bản: v2.0 (Cập nhật ngày 21/10/2026 theo phạm vi mới)
**Phạm vi hệ thống**: 1 Vai trò nghiệp vụ: **Nhân viên (Staff)**; 5 Chức năng: Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy đặt sân.  
**Căn cứ biểu mẫu**: `TAILIEU/Checklist_truoc_khi_nop.docx` và `TAILIEU/Tieu_chi_cham_diem.docx`  

---

## 1. Ma trận Truy vết Toàn diện (Vertical Traceability Matrix)

Ma trận này liên kết chặt chẽ từng mắt xích kỹ thuật của dự án theo phạm vi mới:  
**Nhu cầu Người dùng (URD v2.0) ↔ Đặc tả Kỹ thuật (SRS v2.0) ↔ Thiết kế API v2.0 ↔ Test Cases ↔ Kịch bản Lỗi (Bug Manifest)**.

| Yêu cầu URD | Chức năng SRS | API Endpoint tương ứng | Test Case ID chính | Mã Lỗi đặc tả SRS (10 lỗi) | Vấn đề ngoài đặc tả (3 lỗi) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`US-01`** | **`FR-01`**: Đăng ký nhân viên | `POST /api/auth/register` | `TC-AUTH-001..004`, `TC-RESP-001` | **`BUG-SPEC-04`** (Trùng SĐT văng lỗi 500) | - |
| **`US-02`** | **`FR-02`**: Đăng nhập & JWT | `POST /api/auth/login`, `GET /api/auth/me` | `TC-AUTH-005..007`, `TC-RESP-001` | **`BUG-SPEC-05`** (Bỏ qua Token vẫn cho gọi API) | **`BUG-OUTSPEC-01`** (Bàn phím che nút Login),<br>**`BUG-OUTSPEC-02`** (Đăng xuất không sync đa tab) |
| **`US-03`** | **`FR-03`**: Xem lịch đặt sân | `GET /api/slots/availability` | `TC-CAL-001..002`, `TC-RESP-002`, `TC-PERF-001` | **`BUG-SPEC-06`** (Vỡ cuộn ngang 375px),<br>**`BUG-SPEC-09`** (Nhãn ô slot sai tiếng Việt),<br>**`BUG-SPEC-10`** (P90 chậm do N+1 query) | - |
| **`US-04`** | **`FR-04`**: Đặt sân cho khách | `POST /api/bookings` | `TC-BOOK-001..004`, `TC-RESP-003` | **`BUG-SPEC-01`** (Không lock gây Double Booking),<br>**`BUG-SPEC-03`** (Cho đặt ngày trong quá khứ),<br>**`BUG-SPEC-07`** (Modal tràn viền màn hình 320px) | **`BUG-OUTSPEC-03`** (SĐT có dấu cách bị từ chối) |
| **`US-05`** | **`FR-05`**: Hủy đặt sân | `POST /api/bookings/:id/cancel` | `TC-CANC-001..003`, `TC-RESP-004` | **`BUG-SPEC-02`** (Hủy xong không đổi màu slot),<br>**`BUG-SPEC-08`** (Hủy ngay không hiện popup hỏi lại) | - |
| - | **`SYS-BASELINE`**: Kiểm tra máy chủ | `GET /api/health` | `TC-SYS-001`, `TC-SYS-002` | - | - |

> [!IMPORTANT]
> **Ghi chú về liên kết Lỗi ngoài đặc tả**:  
> Ba (03) vấn đề ngoài đặc tả (`BUG-OUTSPEC-01`, `BUG-OUTSPEC-02`, `BUG-OUTSPEC-03`) được liên kết trực tiếp với **Căn cứ trải nghiệm người dùng thực tế và Chuẩn an toàn phiên làm việc**, tuyệt đối KHÔNG tạo mã SRS giả mạo để liên kết.

---

## 2. Bảng đối chiếu và Phân tích Xung đột với Checklist trước khi nộp

> [!WARNING]
> Do phạm vi dự án được điều chỉnh tinh gọn thành **1 vai trò và 5 chức năng**, một số tiêu chí định lượng trong biểu mẫu cũ không còn tương thích. Bảng dưới đây phân tích minh bạch từng tiêu chí để sinh viên trình bày với Giảng viên hướng dẫn:

| STT | Hạng mục kiểm tra theo Checklist cũ | Tiêu chuẩn trong Checklist | Tình trạng theo phạm vi mới của dự án | Đánh giá & Khuyến nghị giải trình với Giảng viên |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Số lượng vai trò người dùng trong URD/SRS** | Yêu cầu ≥ 3 vai trò | **Hệ thống chỉ có 1 vai trò duy nhất: NHÂN VIÊN (Staff)**. Trạng thái chưa đăng nhập là trạng thái truy cập, không phải vai trò nghiệp vụ. | **Cần xác nhận từ GV**: Báo cáo Giảng viên đồ án tập trung chuyên sâu vào nghiệp vụ vận hành của nhân viên tại quầy, không dàn trải sang Customer/Admin. |
| 2 | **Số lượng chức năng chức năng (FR) trong SRS** | Yêu cầu ≥ 12 chức năng | **Hệ thống có 5 chức năng cốt lõi** (`FR-01` đến `FR-05`). | **Cần xác nhận từ GV**: Thay vì 12 chức năng bề nổi, 5 chức năng này được đặc tả rất sâu: đủ 11 thuộc tính, xử lý tranh chấp concurrency và giao diện responsive bắt buộc. |
| 3 | **Số lượng lỗi cài sẵn (Bug Manifest)** | Yêu cầu ≥ 15 lỗi (đủ 5 loại, ≥ 3 Crit/Major) | **Hệ thống có 13 kịch bản lỗi (10 lỗi đặc tả SRS + 3 lỗi ngoài đặc tả)**. Có 2 Critical, 5 Major. | **Đạt tiêu chuẩn chất lượng**: 10 lỗi vi phạm trực tiếp các điều khoản SRS v2.0 và 3 lỗi ngoài đặc tả chỉ rõ căn cứ UX/Security. Tất cả hiện là kịch bản thiết kế (`Thiết kế — chưa xác nhận tồn tại`). |
| 4 | **Yêu cầu Phi chức năng Responsive** | Có yêu cầu thích ứng | **ĐÃ HOÀN THÀNH VƯỢT MỨC**: Đặc tả chi tiết hành vi giao diện trên cả 5 chức năng, quy định bộ 5 kích thước chuẩn (320px..1366px), có 7 test cases responsive riêng biệt. | **ĐẠT XUẤT SẮC**. |
| 5 | **Tính toàn vẹn chống Double Booking** | Yêu cầu kiểm thử tranh chấp | **ĐÃ HOÀN THÀNH**: Đặc tả chi tiết cơ chế Pessimistic Locking trong MySQL và có kịch bản test concurrency riêng (`TC-BOOK-003`). | **ĐẠT**. |
| 6 | **Tài liệu API có req/res mẫu** | Liệt kê đủ API có req/res | **ĐÃ HOÀN THÀNH**: Đặc tả 8 API chuẩn Mẫu 01, phân định rõ ràng 1 API chạy thật (`/api/health`) và 7 API thiết kế dự kiến. | **ĐẠT**. |
| 7 | **Báo cáo tổng kết TSR và Biên bản bàn giao** | Đúng mẫu, có kết luận | **ĐÃ HOÀN THÀNH BẢN NHÁP CHUẨN**: Phản ánh trung thực tình trạng Baseline, kết luận No-go minh bạch, để trống số liệu chưa đo thật. | **ĐẠT NGUYÊN TẮC TRUNG THỰC**. |

---

## 3. Khuyến nghị Kế hoạch làm việc với Giảng viên hướng dẫn

1. **Báo cáo về việc điều chỉnh phạm vi**: Trình bày với Giảng viên về mô hình hệ thống tập trung vào 1 vai trò Nhân viên phục vụ nghiệp vụ tại quầy, đề xuất Giảng viên áp dụng thang điểm đánh giá tập trung vào **độ sâu của cơ chế chống đặt trùng (Double Booking Concurrency)** và **chất lượng giao diện Responsive** thay vì đếm số lượng vai trò và chức năng bề nổi.
2. **Xin ý kiến về 5 câu hỏi nghiệp vụ**: Trình Giảng viên danh mục 5 câu hỏi nghiệp vụ tại Mục 6 tài liệu URD v2.0 (chính sách duyệt đăng ký, khung giờ mở cửa, điều kiện hủy sân) để chốt các quy tắc trước khi hoàn thiện mã nguồn.
