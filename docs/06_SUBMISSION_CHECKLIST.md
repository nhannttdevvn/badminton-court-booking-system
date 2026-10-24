# BẢNG ĐỐI CHIẾU CHECKLIST TRƯỚC KHI NỘP ĐỒ ÁN (SUBMISSION CHECKLIST)
## HỌC PHẦN: ĐÁNH GIÁ HIỆU NĂNG / SOFTWARE TESTING
### DỰ ÁN: HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)

Tài liệu này đối chiếu từng mục theo đúng mẫu `TAILIEU/Checklist_truoc_khi_nop.docx` và tiêu chí chấm điểm của Giảng viên.

---

## PHẦN 1 – CHỦ HỆ THỐNG (SYSTEM OWNER)

### 1. Tài liệu Yêu cầu Người sử dụng (URD) – Điểm tối đa: 1,0 đ
- [x] **Bối cảnh, mục tiêu, phạm vi rõ ràng**: Đã trình bày đầy đủ tại Mục 1 & 2 file `docs/01_URD_BadmintonBooking.md` và `.docx`.
- [x] **Mô tả đủ ≥ 3 vai trò người dùng**: Hệ thống có đúng 3 vai trò (`Guest`, `Customer`, `Admin`) tại Mục 3.
- [x] **Mô tả ≥ 3 luồng nghiệp vụ ở mức người dùng**: Đã mô tả 3 luồng E2E hoàn chỉnh (`FLOW-01`: Đăng ký/Đăng nhập/Đặt sân, `FLOW-02`: Hủy sân hợp lệ, `FLOW-03`: Xử lý tranh chấp slot đồng thời) tại Mục 5.
- [x] **User Stories đúng chuẩn**: Có 8 User Stories (`US-01` đến `US-08`) dạng "Là... tôi muốn... để...", có Priority và Acceptance Criteria chi tiết tại Mục 4.
- [x] **File Word URD**: Đã xuất file chuẩn `docs/01_URD_BadmintonBooking.docx` theo khung biểu mẫu của học phần.

### 2. Đặc tả Yêu cầu Phần mềm (SRS) – Điểm tối đa: 1,5 đ
- [x] **Số lượng chức năng (FR)**: Đạt **19 FR** (vượt mức tối thiểu ≥ 12 FR) tại Mục 5 file `docs/02_SRS_BadmintonBooking.md` và `.docx`.
- [x] **Số lượng luồng hoàn chỉnh**: Đủ các luồng cốt lõi có Main Flow, Alternative Flow, Exception Flow, Preconditions, Postconditions.
- [x] **Yêu cầu phi chức năng (NFR)**: Đạt **10 NFR** (vượt mức ≥ 8 NFR), trong đó có **4 NFR Hiệu năng** (`NFR-PERF-01..04`) có con số đo đạc cụ thể (P90 ≤ 1000ms, P90 ≤ 2000ms, Error rate < 1%).
- [x] **Ràng buộc dữ liệu có con số cụ thể, test được**: BVA Full Name (1, 2, 50, 51), Password (7, 8, 20, 21), Mốc hủy sân (2 giờ), Khóa 5 phút khi đăng nhập sai 5 lần liên tiếp.
- [x] **Có Bảng quyết định (Decision Table)**: Đã lập bảng quyết định 5 quy tắc cho chức năng Đặt sân tại Mục 6.1.
- [x] **Có Sơ đồ trạng thái (State Diagram)**: Đã lập sơ đồ và bảng chuyển trạng thái Booking (`CONFIRMED` -> `CANCELLED`, không cho phép chuyển ngược) và Availability (`AVAILABLE` <-> `BOOKED`) tại Mục 6.2.
- [x] **Có Ma trận phân quyền (Permission Matrix)**: Đã lập ma trận phân quyền 3 vai trò tại Mục 2.2.
- [x] **Ma trận truy vết (RTM)**: Đã liên kết URD ↔ SRS ↔ API ↔ Test Points tại Mục 8.
- [x] **File Word SRS**: Đã xuất file chuẩn `docs/02_SRS_BadmintonBooking.docx` theo khung biểu mẫu của học phần.

### 3. Tài liệu API & Sản phẩm thực tế – Điểm tối đa: 0,5 đ
- [x] **Tài liệu API đầy đủ**: Liệt kê đầy đủ các endpoint chuẩn RESTful tại `docs/03_API_DOCUMENTATION.md`, mỗi API có Request/Response JSON mẫu và bảng mã lỗi chi tiết.
- [x] **Khớp với thực tế**: Mã nguồn Express tại `backend/src/` khớp với tài liệu đặc tả.
- [x] **Tài khoản và dữ liệu mẫu**: Có danh sách 4 tài khoản thử nghiệm xác định và 6 sân tại `docs/04_TEST_ACCOUNTS.md`.
- [x] **Sản phẩm chạy ổn định**: Backend và Frontend build thành công, có endpoint `/health` và tiện ích reset dữ liệu (`POST /api/v1/admin/reset-data` & `npm run reset-db`).

### 4. Lỗi cài sẵn & Bug Manifest – Điểm tối đa: 1,0 đ
- [x] **Đủ số lượng và phân loại theo yêu cầu học phần**: Đủ ≥ 15 lỗi thuộc 5 nhóm (Functional, Visual, Content, Performance, Crash), có ≥ 3 lỗi Critical/Major, phân biệt rõ lỗi có đặc tả (`SPECIFIED`) và lỗi ngoài đặc tả (`NOT_SPECIFIED`).
- [x] **Bảo mật Bug Manifest**: Lưu riêng trong thư mục bảo mật của Chủ hệ thống (đã loại trừ trong `.gitignore`), không đưa vào thư mục `docs/` bàn giao cho Tester.
- [x] **Tất cả lỗi đều tái hiện ổn định (Deterministic)**: Đã kiểm chứng tự động giữa phiên bản `baseline-correct` và `planted-bugs`.
