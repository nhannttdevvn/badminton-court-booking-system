# KẾ HOẠCH CHI TIẾT BIÊN SOẠN HỒ SƠ TÀI LIỆU
## Đề tài: Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System)
**Học phần**: Đánh giá hiệu năng hệ thống  
**Mã tài liệu**: `docs/Ke_hoach/02_Ke_hoach_soan_tai_lieu.md`  
**Ngày cập nhật kế hoạch**: 21/10/2026  

---

## 1. Trình tự thực hiện và Luồng phụ thuộc kỹ thuật

Kế hoạch tuân thủ nghiêm ngặt nguyên tắc: **Phải có căn cứ từ tài liệu trước mới được biên soạn tài liệu tiếp theo**, bảo đảm không có mắt xích nào bịa đặt hay mất gốc truy vết:

```
[TASK-PLAN-01: Kiểm kê nguồn & Hiện trạng] (Đã hoàn thành)
       │
       ▼
[TASK-DOC-01: Tài liệu Yêu cầu Người dùng - URD]
(Nguồn: README.md, nhu cầu 3 vai trò, 3 luồng nghiệp vụ)
       │
       ▼
[TASK-DOC-02: Đặc tả Yêu cầu Phần mềm - SRS]
(Chi tiết hóa URD: 12 FR, 3 luồng E2E có ngoại lệ, 8 NFR đo được)
       │
       ▼
[TASK-DOC-03: Tài liệu Thiết kế API - Mẫu 01]
(Phân định rõ 1 API đã có code thực tế vs. các API theo thiết kế SRS)
       │
       ├─────────────────────────────────┬─────────────────────────────────┐
       ▼                                 ▼                                 ▼
[TASK-DOC-04: Bug Manifest]   [TASK-DOC-06: Test Plan]   [TASK-DOC-05: Bộ biểu mẫu TC]
(Bản nháp 15 lỗi thiết kế,    (Mẫu 04: Mục tiêu, phạm vi,  (Mẫu 03: Review SRS, TC chức năng,
 lưu riêng cho Giảng viên)      chiến lược, tiêu chí)       TC phi chức năng, khung log/bug)
       │                                 │                                 │
       │                                 ├─────────────────────────────────┘
       ▼                                 ▼
[TASK-DOC-08A: Biên bản 1]    [TASK-DOC-08B: Biên bản 2]
(Mẫu 06: Bàn giao Tuần 6)     (Mẫu 06: Bàn giao Tuần 14)
       │                                 │
       ▼                                 ▼
[TASK-DOC-07: Test Summary Report - Mẫu 05]
(Báo cáo tổng kết: ghi nhận thực tế Baseline, phần còn lại là khung chờ đo)
       │
       ▼
[TASK-DOC-09: Ma trận Truy vết & Bảng Đối chiếu Checklist / Rubric]
(Kiểm tra tính nhất quán dọc: URD ↔ SRS ↔ API ↔ TC ↔ Bug và rà soát điều kiện nộp bài)
```

---

## 2. Bảng phân rã kế hoạch từng đầu việc tài liệu

> **Nguyên tắc phân loại khả thi bắt buộc**:
> 1. *Có thể hoàn thành từ nguồn hiện có*: Tài liệu có đủ căn cứ từ `README.md` và mã nguồn hiện tại.
> 2. *Chỉ có thể viết bản nháp*: Tài liệu thiết kế hoặc báo cáo mà hệ thống chưa code xong hoặc chưa chạy thực tế.
> 3. *Cần thông tin người dùng*: Cần người dùng xác nhận tham số nghiệp vụ (giá, giờ, thời gian giữ chỗ, hạn hủy, thông tin sinh viên).
> 4. *Cần bằng chứng chạy hệ thống hoặc kiểm thử*: Cần file log, screenshot, dashboard thật từ môi trường kiểm thử.

| Mã công việc | Tài liệu cần làm | Mẫu áp dụng | Nguồn đầu vào | Nội dung cần viết | Các bước thực hiện | Phụ thuộc | File đầu ra | Tiêu chí hoàn thành theo Rubric | Thông tin còn thiếu | Phân loại khả thi |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TASK-DOC-01** | Tài liệu Yêu cầu Người dùng (URD) | `TAILIEU/Checklist_truoc_khi_nop.docx` (mục A1), mẫu URD chuẩn | `README.md` (mục 1, 2, 4), `docs/URD/README.md` | - Bối cảnh, mục tiêu, phạm vi.<br>- Mô tả đủ 3 vai trò: Customer, Staff, Admin.<br>- Mô tả 3 luồng nghiệp vụ người dùng: Đặt sân, Hủy sân, Quản lý sân.<br>- Bảng User Stories dạng "Là... tôi muốn... để..." có độ ưu tiên.<br>- Tiêu chí nghiệm thu mức người dùng.<br>- Bảng mã lỗi nghiệp vụ. | 1. Trích xuất nghiệp vụ từ README.<br>2. Phân tích 3 vai trò người dùng.<br>3. Mô tả 3 luồng công việc.<br>4. Lập bảng User Stories.<br>5. Đưa ra các tham số đề xuất kèm nhãn [Đề xuất chờ xác nhận]. | TASK-PLAN-01 (Kiểm kê nguồn) | `docs/Ket_qua/01_URD/URD_Badminton_Court_Booking.md` | - Đạt mức Tốt Rubric A1 (1.0đ).<br>- Đủ ≥ 3 vai trò, ≥ 3 luồng người dùng.<br>- User stories đúng dạng, có tiêu chí nghiệm thu.<br>- Phân biệt rõ dữ liệu đã xác nhận và đề xuất. | - Thông tin sinh viên (Họ tên, MSSV).<br>- Xác nhận chính thức về quy định cọc và thời hạn hủy. | **Có thể hoàn thành từ nguồn hiện có** (kèm nhãn đề xuất) |
| **TASK-DOC-02** | Đặc tả Yêu cầu Phần mềm (SRS) | `TAILIEU/Checklist_truoc_khi_nop.docx` (mục A2), `Tieu_chi_cham_diem.docx` (A2) | `docs/Ket_qua/01_URD/`, `README.md`, `docs/SRS/README.md` | - Quy ước mã yêu cầu.<br>- Chi tiết hóa 12 chức năng (`FR-01` → `FR-12`).<br>- 3 luồng hoàn chỉnh có luồng chính, luồng thay thế và luồng ngoại lệ.<br>- Bảng quyết định tính giá/hủy sân, ma trận phân quyền RBAC.<br>- 8 yêu cầu phi chức năng có số đo (trong đó 3 NFR hiệu năng).<br>- Bảng mã lỗi hệ thống.<br>- Ma trận truy vết về URD. | 1. Chuẩn hóa mã FR và NFR.<br>2. Đặc tả chi tiết 12 FR và ràng buộc kiểm thử được.<br>3. Xây dựng 3 luồng E2E có ngoại lệ.<br>4. Lập bảng quyết định và ma trận RBAC.<br>5. Cụ thể hóa 8 NFR đo lường được.<br>6. Lập bảng truy vết về URD. | TASK-DOC-01 (URD) | `docs/Ket_qua/02_SRS/SRS_Badminton_Court_Booking.md` | - Đạt mức Tốt Rubric A2 (1.5đ).<br>- Đủ ≥ 12 FR, ≥ 3 luồng có ngoại lệ, ≥ 8 NFR (≥ 3 NFR hiệu năng).<br>- Ràng buộc dữ liệu có con số rõ ràng.<br>- Truy vết được về URD.<br>- Các số đo giả định phải gắn nhãn [Đề xuất chờ xác nhận]. | - Xác nhận con số chính thức về giá sân, thời gian hold slot, thời hạn hủy.<br>- Kết quả review từ Tester (để lên bản v1.1). | **Có thể hoàn thành từ nguồn hiện có** (kèm nhãn đề xuất) |
| **TASK-DOC-03** | Tài liệu Thiết kế API | `TAILIEU/Mau_01_Tai_lieu_API.docx` | `docs/Ket_qua/02_SRS/`, mã nguồn `backend/src/server.js`, `routes/health.js` | - Thông tin chung: Base URL, JWT auth, ISO 8601, mã lỗi chuẩn.<br>- Danh mục endpoint tương ứng các FR.<br>- Đặc tả chi tiết từng endpoint: Method, URL, Headers, Body, Req/Res mẫu 200/201/400/401/403/404/409/500.<br>- Tài khoản kiểm thử.<br>- **BẮT BUỘC TÁCH RIÊNG**: Endpoint đã có trong code (`GET /api/health`) và Endpoint dự kiến theo thiết kế SRS. | 1. Ghi nhận chính xác endpoint `/api/health` đang chạy tại port 5001.<br>2. Thiết kế chi tiết các endpoint dự kiến theo SRS.<br>3. Viết req/res JSON mẫu.<br>4. Gắn nhãn phân định rõ ràng giữa code thật và thiết kế. | TASK-DOC-02 (SRS) | `docs/Ket_qua/03_API/Tai_lieu_API_Badminton_Booking.md` | - Bám sát cấu trúc 5 mục của Mẫu 01.<br>- Khớp hoàn toàn với endpoint thật trong code.<br>- Endpoint dự kiến được phân định minh bạch. | - URL public server khi deploy.<br>- Mã nguồn các router/controller nghiệp vụ thực tế (chưa code). | **Chỉ có thể viết bản nháp** (phân định code thật vs. thiết kế) |
| **TASK-DOC-04** | Danh mục Lỗi Cài sẵn (Bug Manifest Riêng) | `TAILIEU/Mau_02_Bug_Manifest.xlsx` | `docs/Ket_qua/02_SRS/`, logic mã nguồn dự kiến | - Bảng tự kiểm tra số lượng theo 5 loại lỗi và mức nghiêm trọng.<br>- Kịch bản thiết kế 15 lỗi cài sẵn dự kiến (≥ 5 Functional, ≥ 3 Visual, ≥ 3 Content, ≥ 2 Performance, ≥ 2 Crash; ≥ 3 Critical/Major).<br>- Mỗi lỗi ghi: Mã SEED, Loại, Mức, FR/FLOW, Vị trí, Yêu cầu SRS vi phạm, Mô tả, Bước tái hiện, Kết quả mong đợi vs thực tế, File chứa lỗi dự kiến.<br>- Lưu tại thư mục riêng bí mật, không gửi Tester. | 1. Rà soát SRS để xác định các điểm dễ cấy lỗi nghiệp vụ.<br>2. Thiết kế 15 kịch bản lỗi phủ đủ 5 loại.<br>3. Lập bảng cấu trúc chuẩn Mẫu 02.<br>4. Ghi rõ tình trạng: Kịch bản thiết kế đề xuất cấy lỗi, chưa có lỗi trong code, chưa có video thực tế. | TASK-DOC-02 (SRS), TASK-DOC-03 (API) | `docs/Ket_qua/04_Bug_Manifest_Rieng/Bug_Manifest_Badminton_Booking.md` | - Đạt cơ cấu số lượng Mẫu 02 (15 lỗi, 5 loại, 4 Crit/Major).<br>- Trích dẫn chính xác yêu cầu SRS bị vi phạm.<br>- Ghi rõ trạng thái chưa cấy vào code, không tạo link video giả. | - Mã nguồn cấy lỗi thực tế (chưa cấy).<br>- Video / ảnh chụp minh chứng lỗi chạy trên web thật (chưa ghi hình). | **Chỉ có thể viết bản nháp** (Cần cấy code & quay video) |
| **TASK-DOC-05** | Bộ Biểu mẫu Kiểm thử (Tester) | `TAILIEU/Mau_03_Bo_bieu_mau_Kiem_thu.xlsx` | `docs/Ket_qua/02_SRS/`, `03_API/` | - Sheet `Thong_tin`: Metadata đợt kiểm thử.<br>- Sheet `Review_SRS`: 5 phát hiện về tính mập mờ.<br>- Sheet `TC_Chuc_nang`: Thiết kế ≥ 60 TC (áp dụng EP, BVA, Decision Table, State Transition, Use Case).<br>- Sheet `TC_Phi_chuc_nang`: Thiết kế ≥ 10 TC NFR (JMeter, bảo mật, tương thích).<br>- Sheet `Test_Log`: Mẫu nhật ký (ghi trung thực hiện chỉ có test baseline).<br>- Sheet `Bug_Report`: Mẫu danh sách lỗi (chờ thực thi trên hệ thống bạn cặp).<br>- Sheet `Tong_hop`: Bảng tổng hợp số liệu. | 1. Lập phiếu Review SRS.<br>2. Thiết kế chi tiết các TC chức năng và phi chức năng.<br>3. Thiết lập khung Test Log và Bug Report.<br>4. Ghi rõ: Không tự nhận đây là kết quả đã kiểm thử hệ thống bạn cặp. | TASK-DOC-02 (SRS), TASK-DOC-03 (API) | `docs/Ket_qua/05_Bo_bieu_mau_Kiem_thu/Bo_bieu_mau_Kiem_thu_Badminton.md` | - Đủ 7 sheets chuẩn Mẫu 03.<br>- Thiết kế ≥ 60 TC chức năng, ≥ 10 TC NFR, áp dụng ≥ 4 kỹ thuật.<br>- Không bịa đặt kết quả test Pass/Fail khi chưa chạy. | - Hệ thống bàn giao từ bạn cặp.<br>- Kết quả thực thi thực tế (log, bug thật). | **Hoàn thành thiết kế TC; Nháp khung Log & Bug** |
| **TASK-DOC-06** | Kế hoạch Kiểm thử (Test Plan) | `TAILIEU/Mau_04_Test_Plan.docx` | `docs/Ket_qua/02_SRS/`, `03_API/`, `05_Bo_bieu_mau/` | - Giới thiệu: Mục đích, tài liệu tham chiếu.<br>- Phạm vi: In-scope (12 FR, 8 NFR), Out-of-scope.<br>- Chiến lược: Phân loại 5 loại lỗi, 4 mức nghiêm trọng, các công cụ (Postman, Puppeteer, JMeter).<br>- Môi trường kiểm thử: Trình duyệt, công cụ, cấu hình.<br>- Tiêu chí: Bắt đầu, Kết thúc, Tạm dừng, Tiếp tục.<br>- Rủi ro & giải pháp giảm thiểu.<br>- **LƯU Ý**: Đây là KẾ HOẠCH, không phải bằng chứng đã kiểm thử. | 1. Xác định phạm vi kiểm thử từ SRS.<br>2. Lựa chọn chiến lược và công cụ kiểm thử phù hợp.<br>3. Quy định tiêu chí nghiệm thu và quy trình phối hợp. | TASK-DOC-02 (SRS), TASK-DOC-03 (API) | `docs/Ket_qua/06_Test_Plan/Test_Plan_Badminton_Booking.md` | - Đúng cấu trúc 6 mục chuẩn Mẫu 04.<br>- Phủ toàn bộ 12 FR và 8 NFR.<br>- Định nghĩa rõ 5 loại lỗi và tiêu chí kết thúc. | - Khung giờ chạy tải chính thức đăng ký với giảng viên.<br>- URL server staging khi deploy. | **Có thể hoàn thành từ nguồn hiện có** (Kế hoạch dự kiến) |
| **TASK-DOC-07** | Báo cáo Tổng kết Kiểm thử (Test Summary Report) | `TAILIEU/Mau_05_Test_Summary_Report.docx` | `docs/Ket_qua/05_Bo_bieu_mau/`, `06_Test_Plan/`, bằng chứng thực tế | - Tổng quan đợt test.<br>- Độ phủ kiểm thử: Bảng độ phủ 80 hạng mục (ghi rõ 4 ca baseline đã pass, 76 ca đang pending).<br>- Khung ma trận thống kê 5 loại lỗi.<br>- Kế hoạch kiểm thử tự động Newman/Puppeteer.<br>- Kế hoạch đo tải JMeter kèm bảng đối chiếu NFR-01, 02, 03.<br>- Rủi ro còn lại & Kết luận: **NO-GO (Chưa đủ điều kiện nghiệm thu do đang ở mức baseline)**.<br>- Khai báo sử dụng AI. | 1. Lập khung báo cáo chuẩn Mẫu 05.<br>2. Ghi nhận trung thực 4 ca test baseline đã chạy.<br>3. Thiết lập bảng đối chiếu NFR hiệu năng.<br>4. Đưa ra kết luận No-go trung thực. | TASK-DOC-05 (Biểu mẫu), TASK-DOC-06 (Test Plan) | `docs/Ket_qua/07_Test_Summary_Report/Test_Summary_Report_Badminton.md` | - Đúng cấu trúc 8 mục chuẩn Mẫu 05.<br>- Chỉ ghi nhận kết quả thực thi khi có bằng chứng thật.<br>- Kết luận No-go trung thực, không bịa số liệu JMeter/Newman. | - File kết quả `.jtl`, HTML Dashboard của JMeter khi chạy thật.<br>- Báo cáo HTML Newman và ảnh chụp Puppeteer thật. | **Chỉ có thể viết bản nháp** (Cần bằng chứng chạy thật) |
| **TASK-DOC-08A**| Biên bản Bàn giao Số 1 (Bàn giao sản phẩm - Tuần 6) | `TAILIEU/Mau_06_Bien_ban_ban_giao.docx` | `docs/Ket_qua/01_URD/`, `02_SRS/`, `03_API/`, mã nguồn | - Thông tin Bên giao (Chủ hệ thống) và Bên nhận (Tester).<br>- Danh mục bàn giao: URD v1.0, SRS v1.0, Tài liệu API, link sản phẩm, tài khoản, dữ liệu.<br>- Xác nhận 3 ô của Tester.<br>- **Hạn chế đã biết**: Ghi rõ hiện trạng mới hoàn thành baseline, nghiệp vụ đang code tiếp; KHÔNG ghi lỗi cài sẵn.<br>- Cam kết bảo mật Bug Manifest. | 1. Thiết lập biểu mẫu biên bản số 1.<br>2. Ghi nhận trung thực các hạn chế hiện tại.<br>3. Để trống chữ ký và đánh dấu [BẢN NHÁP CHỜ BÀN GIAO]. | TASK-DOC-01, TASK-DOC-02, TASK-DOC-03 | `docs/Ket_qua/08_Bien_ban_ban_giao/Bien_ban_ban_giao_so_1_Tuan_6.md` | - Đúng cấu trúc Mẫu 06 Biên bản 1.<br>- Không tự tích xác nhận hoặc ký thay.<br>- Ghi rõ hạn chế đã biết của phiên bản bàn giao. | - Thông tin sinh viên và bạn cặp chính thức.<br>- Chữ ký hai bên khi bàn giao thực tế tại tuần 6. | **Chỉ có thể viết bản nháp** (Cần thông tin người dùng) |
| **TASK-DOC-08B**| Biên bản Bàn giao Số 2 (Bàn giao kết quả - Tuần 14) | `TAILIEU/Mau_06_Bien_ban_ban_giao.docx` | `docs/Ket_qua/05_Bo_bieu_mau/`, `07_Test_Summary/` | - Thông tin Bên giao (Tester) và Bên nhận (Chủ hệ thống).<br>- Danh mục bàn giao 7 sản phẩm kiểm thử.<br>- Tóm tắt kết quả kiểm thử.<br>- Mục ghi nhận các lỗi bất đồng ý kiến (Disputed bugs). | 1. Thiết lập biểu mẫu biên bản số 2.<br>2. Điền số lượng test case đã thiết kế.<br>3. Để trống số lượng bug thật và kết luận cuối cùng; đánh dấu [BẢN NHÁP CHỜ NGHIỆM THU TUẦN 14]. | TASK-DOC-05, TASK-DOC-07 | `docs/Ket_qua/08_Bien_ban_ban_giao/Bien_ban_ban_giao_so_2_Tuan_14.md` | - Đúng cấu trúc Mẫu 06 Biên bản 2.<br>- Không tự điền số liệu bug giả hay ký thay. | - Kết quả kiểm thử thực tế trên hệ thống bạn cặp.<br>- Chữ ký hai bên sau buổi demo tuần 14. | **Chỉ có thể viết bản nháp** (Cần bằng chứng kiểm thử) |
| **TASK-DOC-09** | Ma trận Truy vết & Bảng Đối chiếu Checklist / Rubric | `TAILIEU/Checklist_truoc_khi_nop.docx`, `TAILIEU/Tieu_chi_cham_diem.docx` | Toàn bộ tài liệu từ TASK-DOC-01 đến 08, mã nguồn | - Ma trận truy vết dọc: URD → FR/NFR → Luồng E2E → API Endpoint → Test Case ID → Bug ID.<br>- Bảng tự đối chiếu từng hạng mục trong Checklist trước khi nộp (Phần 1 & Phần 2), ghi rõ cái gì ĐẠT, cái gì CHỜ CẤY CODE/CHỜ THỰC THI.<br>- Bảng tự đánh giá theo Rubric điểm 10 (A1-A4, B1-B5). | 1. Xây dựng ma trận liên kết giữa các tầng tài liệu.<br>2. Rà soát từng ô trong Checklist trước khi nộp.<br>3. Đối chiếu rubric và tổng kết điểm đạt được hiện tại. | Toàn bộ TASK-DOC-01 đến 08 | `docs/Ket_qua/09_Truy_vet_va_doi_chieu/Ma_tran_truy_vet_va_Doi_chieu_Rubric.md` | - Ma trận truy vết không có liên kết giả.<br>- Bảng đối chiếu checklist phản ánh trung thực trạng thái thực tế.<br>- Không tuyên bố hoàn thành toàn bộ khi còn thiếu dữ liệu. | Không có (tổng hợp trực tiếp từ hồ sơ tài liệu). | **Có thể hoàn thành từ nguồn hiện có** |

---

## 3. Quy chuẩn định dạng xuất tài liệu và Giới hạn công cụ

- **Tình trạng môi trường**: Môi trường hiện tại là macOS với Python 3.14 (Homebrew externally managed PEP 668), không có thư viện `python-docx` và `openpyxl`.
- **Giải pháp xuất định dạng**: Toàn bộ hồ sơ tài liệu được xuất dưới dạng **Markdown chuẩn (`.md`)** với cấu trúc bảng biểu, heading, checklist, code block và Mermaid diagram hoàn chỉnh, tương thích 100% với hiển thị trên GitHub và các trình xem tài liệu kỹ thuật.
- **Cam kết trung thực**: Không tự ý đổi đuôi `.md` thành `.docx` hay `.xlsx` để giả tạo định dạng. Các file mẫu gốc trong `TAILIEU/` được giữ nguyên vẹn 100%.
