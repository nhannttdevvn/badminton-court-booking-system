# MA TRẬN ÁNH XẠ YÊU CẦU ĐỒ ÁN (REQUIREMENT MAPPING)
## HỌC PHẦN: ĐÁNH GIÁ HIỆU NĂNG / SOFTWARE TESTING
### DỰ ÁN: HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)

Tài liệu này liên kết từng tiêu chí trong Rubric đánh giá học phần với các tài liệu đặc tả và thành phần tương ứng của hệ thống.

---

## 1. Bảng ánh xạ Rubric Phần A – Chủ hệ thống (System Owner)

| Mã tiêu chí | Nội dung tiêu chí Rubric | Yêu cầu đạt mức Tốt (100%) | Thành phần / Artifact trong dự án | Vị trí kiểm tra / File |
| :---: | :--- | :--- | :--- | :--- |
| **A1** | **Tài liệu Yêu cầu Người sử dụng (URD)** | - Bối cảnh, mục tiêu, phạm vi rõ ràng.<br>- Mô tả đủ ≥ 3 vai trò người dùng (`Guest`, `Customer`, `Admin`).<br>- Mô tả ≥ 3 luồng nghiệp vụ mức người dùng (`FLOW-01`, `FLOW-02`, `FLOW-03`).<br>- User story đúng mẫu "Là... tôi muốn... để...", có Priority và Acceptance Criteria. | Tài liệu URD chính thức | - `docs/01_URD_BadmintonBooking.md`<br>- `docs/01_URD_BadmintonBooking.docx` |
| **A2** | **Đặc tả Yêu cầu Phần mềm (SRS)** | - Đạt ≥ 12 FR (Dự án đạt **19 FR**).<br>- ≥ 3 luồng hoàn chỉnh có Main/Alternative/Exception flow.<br>- ≥ 8 NFR, trong đó ≥ 3 NFR hiệu năng (Dự án đạt **10 NFR, 4 NFR hiệu năng**).<br>- Ràng buộc dữ liệu có con số rõ ràng (BVA).<br>- Có Bảng quyết định (Decision Table), Sơ đồ trạng thái (State Diagram), Ma trận phân quyền (Permission Matrix).<br>- RTM truy vết về URD. | Tài liệu SRS chính thức | - `docs/02_SRS_BadmintonBooking.md`<br>- `docs/02_SRS_BadmintonBooking.docx` |
| **A3** | **Tài liệu API & Sản phẩm** | - Liệt kê đầy đủ tất cả API của hệ thống (Base URL `/api/v1`).<br>- Mỗi API có Request/Response mẫu khớp 100% mã nguồn thực tế.<br>- Có danh sách tài khoản thử nghiệm (Test Accounts) và dữ liệu khởi tạo (Seed Data).<br>- Sản phẩm chạy ổn định trên môi trường local/staging. | Tài liệu API & Test Accounts | - `docs/03_API_DOCUMENTATION.md`<br>- `docs/04_TEST_ACCOUNTS.md`<br>- `backend/` & `frontend/` |
| **A4** | **Lỗi cài sẵn & Bug Manifest** | - Đủ ≥ 15 lỗi sản phẩm, phân bổ đủ 5 loại lỗi (Functional, Visual, Content, Performance, Crash).<br>- ≥ 3 lỗi Critical / Major.<br>- Phân biệt rõ nhóm lỗi có đặc tả (`SPECIFIED`) và nhóm lỗi ngoài đặc tả (`NOT_SPECIFIED`).<br>- Lưu trữ riêng bảo mật cho Giảng viên hướng dẫn (không nằm trong bộ tài liệu bàn giao cho Tester). | Danh mục lỗi bí mật (Private Bug Manifest) | Lưu riêng tại thư mục bảo mật của Chủ hệ thống (đã cấu hình `.gitignore`) |

---

## 2. Bảng ánh xạ Hỗ trợ Phần B – Tester (Testability Readiness)

Hệ thống được thiết kế chủ động nhằm đáp ứng đầy đủ các yêu cầu kiểm thử của Tester bạn cặp:

| Mã kiểm thử | Hoạt động của Tester | Điều kiện hệ thống đã chuẩn bị sẵn để Tester thực hiện |
| :---: | :--- | :--- |
| **B1** | **Review SRS & Test Plan** | Tài liệu SRS chuẩn mực, rõ ràng, không mâu thuẫn, có mã hóa chi tiết `FR/VAL/BUS/DIS/ERR/NFR`. Phạm vi 5 nhóm chức năng được định hình rõ. |
| **B2** | **Thiết kế Test Cases (≥ 60 Functional, ≥ 10 Non-Functional)** | Cung cấp đầy đủ các quy tắc biên (BVA) cho Full Name (1, 2, 50, 51), Password (7, 8, 20, 21), Giờ hủy booking (≥ 2h, < 2h), Khóa tài khoản (5 lần sai / 5 phút); Bảng quyết định Đặt sân; Sơ đồ chuyển trạng thái Booking và Availability. |
| **B3** | **Báo cáo lỗi (Bug Report) & Tỉ lệ phát hiện** | Hỗ trợ đầy đủ cả Kiểm thử dựa trên đặc tả (Specification-based Testing) và Kiểm thử khám phá (Exploratory Testing). |
| **B4** | **Kiểm thử tự động (Postman/Newman, Puppeteer)** | - API RESTful chuẩn JSON UTF-8, mã lỗi ổn định.<br>- Frontend có gắn các thuộc tính `data-testid` cố định trên tất cả các input, nút bấm và danh sách. |
| **B5** | **Kiểm thử hiệu năng (JMeter)** | Cung cấp các endpoint chịu tải: `GET /api/v1/courts`, `GET /api/v1/courts/{id}/availability`, `POST /api/v1/bookings` kèm ngưỡng NFR Performance cụ thể (`NFR-PERF-01..04`) để đối chiếu Đạt/Không đạt. |
