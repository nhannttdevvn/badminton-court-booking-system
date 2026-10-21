# MA TRẬN TRUY VẾT VÀ BẢNG ĐỐI CHIẾU CHECKLIST / RUBRIC
## HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN
### Badminton Court Booking System
**Ngày lập**: 21/10/2026  
**Căn cứ áp dụng**: `TAILIEU/Checklist_truoc_khi_nop.docx` và `TAILIEU/Tieu_chi_cham_diem.docx`  
**Trạng thái tài liệu**: **HOÀN THÀNH TỪ NGUỒN HIỆN CÓ**

---

## 1. Ma trận Truy vết Toàn diện (Traceability Matrix)

Ma trận này liên kết chặt chẽ mọi mắt xích kỹ thuật của dự án:  
**Nhu cầu Người dùng (URD) ↔ Đặc tả Kỹ thuật (SRS) ↔ Luồng nghiệp vụ ↔ Thiết kế API ↔ Kịch bản Kiểm thử (Test Cases) ↔ Lỗi cài sẵn (Bug Manifest)**.

| Yêu cầu URD | Chức năng SRS | Luồng E2E | API Endpoint tương ứng | Test Case ID chính | Mã Lỗi cài sẵn liên quan (Bug Manifest) |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `US-12` | `FR-01` (Đăng ký tài khoản) | - | `POST /api/auth/register` | `TC-FR01-001` → `TC-FR01-010` | `SEED-11` (Thông báo validation ngôn ngữ) |
| `US-12` | `FR-02` (Đăng nhập & JWT) | - | `POST /api/auth/login` | `TC-FR02-001` → `TC-FR02-004`, `TC-AUTHZ-001..05` | `SEED-05` (Staff gọi được API đổi giá) |
| `US-05` | `FR-03` (Hồ sơ & Lịch sử) | `FLOW-02` | `GET /api/auth/me`, `/my-history` | `TC-FR03-001..002` | `SEED-15` (Crash trắng màn hình lịch sử đơn) |
| `US-09` | `FR-04` (Quản lý sân) | `FLOW-03` | `GET`, `POST`, `PUT /api/courts` | `TC-FR04-001` → `TC-FR04-004` | `SEED-13` (Ảnh sân không nén gây chậm web) |
| `US-10` | `FR-05` (Bảng giá giờ vàng) | `FLOW-03` | `GET`, `PUT /api/courts/pricing` | `TC-FR05-001` → `TC-FR05-007` | `SEED-04` (Sáng Chủ Nhật tính nhầm giá thường) |
| `US-01`, `US-08`| `FR-06` (Lịch sân trống) | `FLOW-01` | `GET /api/slots/availability` | `TC-FR06-001..004`, `TC-NFR01-001` | `SEED-06` (Vỡ giao diện mobile), `SEED-07` (Màu đỏ biến mất), `SEED-12` (Chậm P90 do N+1 query) |
| `US-02` | `FR-07` (Khóa slot 10 phút) | `FLOW-01` | `POST /api/bookings/hold` | `TC-FR07-001..004`, `TC-NFR04-001` | `SEED-02` (Bỏ qua lock gây Double Booking) |
| `US-03` | `FR-08` (Đặt sân trực tuyến)| `FLOW-01` | `POST /api/bookings/confirm` | `TC-FR08-001..004`, `TC-NFR02-001` | `SEED-03` (Đặt 5 slot/ngày), `SEED-08` (Z-index che nút X), `SEED-09` (Hiện tiền $), `SEED-14` (Lỗi null crash server) |
| `US-07` | `FR-09` (Đặt sân tại quầy) | `FLOW-01` | `POST /api/bookings/walk-in` | `TC-FR09-001` | - |
| `US-04` | `FR-10` (Hủy sân tự phục vụ)| `FLOW-02` | `POST /api/bookings/:id/cancel` | `TC-FR10-001..005`, `TC-FLOW02-001..003` | `SEED-01` (Cho phép hủy sát giờ dưới 24h), `SEED-10` (Chính sách sai chính tả) |
| `US-06` | `FR-11` (Check-in quầy) | `FLOW-01` | `PUT /api/bookings/:id/checkin` | `TC-FR11-001..003` | - |
| `US-11` | `FR-12` (Báo cáo doanh thu) | - | `GET /api/reports/revenue` | `TC-FR12-001..002`, `TC-AUTHZ-004` | - |
| - | `SYS-HEALTH` (Baseline API) | - | `GET /api/health` | `TC-NFR01-002`, `TC-NFR07-001`, `TC-NFR08-001` | Đã chạy thực tế: Pass 100% |

---

## 2. Bảng tự đối chiếu Checklist trước khi nộp (Checklist_truoc_khi_nop.docx)

### PHẦN 1 – CHỦ HỆ THỐNG: Hệ thống của mình (Bạn cặp test)

| Tình trạng | Hạng mục kiểm tra | Biểu mẫu áp dụng | Tiêu chuẩn bắt buộc | Kết quả tự đánh giá trong dự án | Vị trí minh chứng / Đường dẫn tài liệu |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **[x] ĐẠT** | URD có đủ vai trò người dùng và user story | Mẫu URD | Đủ ≥ 3 vai trò, có User Stories dạng chuẩn kèm tiêu chí nghiệm thu | **ĐẠT 100%**: Có đủ 3 vai trò (Customer, Staff, Admin), 12 User stories chuẩn kèm bảng mã lỗi. | [URD_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/01_URD/URD_Badminton_Court_Booking.md) |
| **[x] ĐẠT** | SRS có ≥ 3 vai trò, ≥ 12 chức năng, ≥ 3 luồng hoàn chỉnh | Mẫu SRS | ≥ 3 vai trò; ≥ 12 FR; ≥ 3 luồng đầy đủ chính/thay thế/ngoại lệ | **ĐẠT 100%**: 3 vai trò, 12 FR (`FR-01`..`FR-12`), 3 luồng E2E (`FLOW-01..03`) có đầy đủ luồng ngoại lệ. | [SRS_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/02_SRS/SRS_Badminton_Court_Booking.md) |
| **[x] ĐẠT** | SRS có ≥ 8 NFR có số đo, trong đó ≥ 3 NFR về hiệu năng | Mẫu SRS | ≥ 8 NFR có con số định lượng; ≥ 3 NFR hiệu năng đo được | **ĐẠT 100%**: 8 NFR (`NFR-01`..`NFR-08`), trong đó 3 NFR hiệu năng có ngưỡng đo chính xác (P90 ≤ 1s, TPS ≥ 40, CPU ≤ 75%). | `SRS_Badminton_Court_Booking.md` (Mục 5) |
| **[x] ĐẠT** | Tài liệu API liệt kê đầy đủ tất cả API, có req/res mẫu | Mẫu 01 | Liệt kê đầy đủ tất cả API, mỗi API có request và response mẫu | **ĐẠT 100%**: Đặc tả 17 endpoint kèm mã lỗi chuẩn, JSON mẫu và tài khoản thử nghiệm. | [Tai_lieu_API_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/03_API/Tai_lieu_API_Badminton_Booking.md) |
| **[x] ĐẠT** | Link sản phẩm chạy được; có tài khoản và dữ liệu mẫu | Mẫu 06 | Link hoạt động ổn định; có tài khoản và dữ liệu mẫu | **ĐẠT**: Backend port 5001 và Frontend port 5173 chạy thực tế; có sẵn 4 tài khoản và dữ liệu mẫu cụm 6 sân. | [Bien_ban_ban_giao_so_1_Tuan_6.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/08_Bien_ban_ban_giao/Bien_ban_ban_giao_so_1_Tuan_6.md) |
| **[!] CHỜ CẤY CODE**| Đã cài ≥ 15 lỗi, đủ 5 loại, có ≥ 3 lỗi Critical hoặc Major | Mẫu 02 | ≥ 15 lỗi (≥5 Functional, ≥3 Visual, ≥3 Content, ≥2 Performance, ≥2 Crash; ≥3 Crit/Major) | **ĐÃ THIẾT KẾ ĐỦ 15 LỖI (4 Crit/Major)**. Đang ở dạng kịch bản thiết kế, chờ cấy vào mã nguồn khi code các controller. | [Bug_Manifest_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/04_Bug_Manifest_Rieng/Bug_Manifest_Badminton_Booking.md) |
| **[!] CHỜ QUAY VIDEO**| Bug Manifest nộp riêng cho GV, ghi rõ SRS vi phạm & bằng chứng | Mẫu 02 | Nộp riêng cho giảng viên, ghi rõ yêu cầu SRS bị vi phạm và có bằng chứng | **ĐÃ HOÀN THÀNH TÀI LIỆU RIÊNG**. Mỗi lỗi đều trích dẫn chính xác yêu cầu SRS; link video chờ quay khi deploy web. | `Bug_Manifest_Badminton_Booking.md` |

---

### PHẦN 2 – TESTER: Mình test hệ thống của bạn cặp

| Tình trạng | Hạng mục kiểm tra | Biểu mẫu áp dụng | Tiêu chuẩn bắt buộc | Kết quả tự đánh giá trong dự án | Vị trí minh chứng / Đường dẫn tài liệu |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **[x] ĐẠT** | Phiếu review SRS | Mẫu 03 | Tester rà soát các yêu cầu: rõ ràng, kiểm thử được, đầy đủ | **ĐẠT**: Đã thực hiện rà soát 5 điểm mập mờ trong SRS ban đầu và ghi nhận phản hồi của Chủ hệ thống. | Sheet 2 trong [Bo_bieu_mau_Kiem_thu_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/05_Bo_bieu_mau_Kiem_thu/Bo_bieu_mau_Kiem_thu_Badminton.md) |
| **[x] ĐẠT** | Test Plan hoàn chỉnh | Mẫu 04 | Đủ mục tiêu, phạm vi in/out, chiến lược, môi trường, tiêu chí kết thúc | **ĐẠT 100%**: Kế hoạch kiểm thử hoàn chỉnh theo đúng chuẩn Mẫu 04. | [Test_Plan_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/06_Test_Plan/Test_Plan_Badminton_Booking.md) |
| **[x] ĐẠT** | ≥ 60 test case chức năng, phủ hết các chức năng và 3 luồng | Mẫu 03 | ≥ 60 TC chức năng, áp dụng ≥ 4 kỹ thuật thiết kế, phủ hết 3 luồng E2E | **ĐẠT VƯỢT MỨC**: Đã thiết kế **64 test cases chức năng** áp dụng đủ 5 kỹ thuật (EP, BVA, DT, ST, UC). | Sheet 3 trong `Bo_bieu_mau_Kiem_thu_Badminton.md` |
| **[x] ĐẠT** | ≥ 10 test case phi chức năng | Mẫu 03 | ≥ 10 TC phi chức năng, phủ hết các NFR trong SRS | **ĐẠT VƯỢT MỨC**: Đã thiết kế **12 test cases phi chức năng** phủ kín từ NFR-01 đến NFR-08. | Sheet 4 trong `Bo_bieu_mau_Kiem_thu_Badminton.md` |
| **[!] CHỜ THỰC THI**| Test Log đầy đủ các phiên chạy | Mẫu 03 | Ghi nhận nhật ký mỗi phiên thực thi: thời gian, môi trường, số TC | **ĐÃ CÓ KHUNG NHẬT KÝ**. Đã ghi nhận 2 phiên test Baseline; các phiên chạy chuyên sâu chờ nhận bàn giao thực tế. | Sheet 5 trong `Bo_bieu_mau_Kiem_thu_Badminton.md` |
| **[!] CHỜ THỰC THI**| Bug report có bằng chứng, ghi loại lỗi, mở lại được khi demo | Mẫu 03 | Đủ 5 loại lỗi, có bằng chứng, tái hiện được trên sản phẩm thật | **ĐÃ CÓ KHUNG BÁO CÁO LỖI**. Tuyệt đối không bịa đặt bug giả; chờ kết quả bắt lỗi thực tế của Tester. | Sheet 6 trong `Bo_bieu_mau_Kiem_thu_Badminton.md` |
| **[x] ĐÃ CÓ COLLECTION**| Postman/Newman chạy được, có báo cáo | Mẫu 05 | Chạy bằng 1 lệnh CLI, có assertion, data-driven, báo cáo HTML | **ĐÃ CÓ FILE COLLECTION**: Đã có file JSON collection và kịch bản Newman; chờ xuất report HTML khi chạy đợt test. | `testing/Postman/` |
| **[x] ĐÃ CÓ KỊCH BẢN** | Puppeteer chạy được, có ảnh chụp màn hình | Mẫu 05 | Chạy ≥ 2 luồng, có assertion, chụp ảnh màn hình minh chứng | **ĐÃ CÓ THIẾT KẾ KỊCH BẢN**: Thiết kế kịch bản cho `FLOW-01` và `FLOW-02`; chờ chạy lưu ảnh screenshot. | `testing/Puppeteer/` |
| **[x] ĐÃ CÓ KỊCH BẢN** | File JMeter (.jmx), kết quả và HTML Dashboard đối chiếu NFR | Mẫu 05 | 1 kịch bản tải thường + 1 kịch bản tăng tải, đối chiếu NFR hiệu năng | **ĐÃ CÓ THIẾT KẾ KỊCH BẢN TẢI**: Thiết kế 2 kịch bản (20 user và tăng tải 10-50 user), bảng đối chiếu NFR sẵn sàng. | `testing/JMeter/` và `Test_Summary_Report_Badminton.md` |
| **[x] ĐẠT** | Test Summary Report có kết luận đạt hay không đạt | Mẫu 05 | Đầy đủ các mục tổng kết, đối chiếu NFR, có kết luận Go / No-go | **ĐẠT**: Báo cáo tổng kết hoàn chỉnh theo chuẩn Mẫu 05, kết luận No-go minh bạch cho giai đoạn Baseline. | [Test_Summary_Report_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/07_Test_Summary_Report/Test_Summary_Report_Badminton.md) |

---

## 3. Bảng tự chấm điểm theo Rubric môn học (Tieu_chi_cham_diem.docx)

| Tiêu chí | Nội dung tiêu chí | Điểm tối đa | Mức điểm tự đánh giá | Căn cứ chấm theo Rubric |
| :---: | :--- | :---: | :---: | :--- |
| **A1** | **Tài liệu Yêu cầu Người dùng (URD)** | 1.0 | **1.0 / 1.0 (Tốt 100%)** | Bối cảnh, mục tiêu rõ ràng; đủ 3 vai trò; đủ 3 luồng người dùng; 12 User Stories đúng chuẩn có độ ưu tiên và tiêu chí nghiệm thu. |
| **A2** | **Đặc tả Yêu cầu Phần mềm (SRS)** | 1.5 | **1.5 / 1.5 (Tốt 100%)** | Đủ 12 chức năng, 3 luồng hoàn chỉnh có ngoại lệ, 8 NFR có số đo (3 NFR hiệu năng), có bảng quyết định, ma trận phân quyền RBAC và truy vết về URD. |
| **A3** | **Tài liệu API + Sản phẩm Baseline** | 0.5 | **0.5 / 0.5 (Tốt 100%)** | Liệt kê đủ 17 API khớp với SRS, mỗi API có req/res mẫu và ràng buộc dữ liệu; sản phẩm Baseline chạy thực tế tại cổng 5001 và 5173. |
| **A4** | **Lỗi cài sẵn + Bug Manifest** | 1.0 | **0.75 – 1.0 (Đạt / Tốt)** | Đã hoàn thành bảng Bug Manifest riêng với 15 lỗi phủ đủ 5 loại lỗi và có 4 lỗi Critical/Major; cần hoàn tất cấy lỗi vào code và quay video thực tế để đạt trọn vẹn 1.0 điểm. |
| **B1** | **Review SRS + Test Plan** | 0.5 | **0.5 / 0.5 (Tốt 100%)** | Phiếu review SRS chỉ ra đúng 5 vấn đề; Test Plan chuẩn mực theo Mẫu 04 phân định đủ 5 loại lỗi, môi trường, rủi ro và tiêu chí kết thúc. |
| **B2** | **Bộ Test Case chức năng & phi chức năng** | 1.5 | **1.5 / 1.5 (Tốt 100%)** | Đạt **64 TC chức năng** (vượt mức 60), **12 TC phi chức năng** (vượt mức 10), áp dụng **5 kỹ thuật thiết kế** (vượt mức 4 kỹ thuật), phủ hết 12 FR và 3 luồng E2E. |
| **B3** | **Bug Report + Tỷ lệ phát hiện lỗi** | 1.5 | *[Chờ thực thi T6-T14]* | Đã có khung báo cáo lỗi chuẩn; điểm số thực tế sẽ phụ thuộc vào số lỗi Tester tìm được trên hệ thống của bạn cặp khi demo tuần 14. |
| **B4** | **Kiểm thử tự động (Newman & Puppeteer)** | 1.0 | *[Chờ chạy T6-T14]* | Đã sẵn sàng Collection Postman và kịch bản Puppeteer 2 luồng; điểm số phụ thuộc vào file báo cáo HTML và ảnh chụp thực tế khi chạy. |
| **B5** | **Kiểm thử hiệu năng (Apache JMeter)** | 1.5 | *[Chờ chạy T6-T14]* | Đã có kịch bản tải thường và tăng tải, bảng đối chiếu NFR-01, NFR-02, NFR-03; điểm số phụ thuộc vào file kết quả `.jtl` và HTML Dashboard thực tế. |
| **TỔNG**| **HỒ SƠ THIẾT KẾ VÀ TÀI LIỆU NỀN TẢNG** | **10.0** | **HOÀN THÀNH 100% CÁC HẠNG MỤC THIẾT KẾ TÀI LIỆU GIAI ĐOẠN ĐẦU** | Sẵn sàng bước vào giai đoạn lập trình mã nguồn và bàn giao kiểm thử thực tế. |

