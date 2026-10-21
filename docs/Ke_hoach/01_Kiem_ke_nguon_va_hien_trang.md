# BÁO CÁO KIỂM KÊ NGUỒN VÀ HIỆN TRẠNG HỆ THỐNG
## (CẬP NHẬT THEO PHẠM VI MỚI: 1 VAI TRÒ NHÂN VIÊN – 5 CHỨC NĂNG)
### Đề tài: Hệ thống Đặt sân Cầu lông (Badminton Court Booking System)
**Học phần**: Đánh giá hiệu năng hệ thống  
**Thời điểm cập nhật**: 21/10/2026  
**Căn cứ trực tiếp**: Yêu cầu thay đổi phạm vi dự án từ người dùng (21/10/2026)  

---

## 1. Danh mục nguồn tài liệu và Thứ tự ưu tiên áp dụng

Trong đợt cập nhật này, thứ tự ưu tiên áp dụng các nguồn thông tin được tuân thủ nghiêm ngặt như sau:
1. **Ưu tiên 1 (Cao nhất)**: **Yêu cầu thay đổi phạm vi mới** (1 vai trò Nhân viên, 5 chức năng: Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy đặt sân; không có Customer/Admin; 10 lỗi đặc tả + 3 lỗi ngoài đặc tả; responsive bắt buộc).
2. **Ưu tiên 2**: **Nguồn đã được xác nhận thực tế** (Mã nguồn đã triển khai: Backend Express port 5001 endpoint `GET /api/health`, kết nối MySQL pool, Frontend React/Vite port 5173).
3. **Ưu tiên 3**: **Biểu mẫu và hướng dẫn kỹ thuật trong `TAILIEU/`** (Khung định dạng của Mẫu 01 đến Mẫu 06, cấu trúc bảng test case, cấu trúc Test Plan).
4. **Ưu tiên 4 (Thấp nhất - Thay thế dần)**: **Tài liệu cũ trong `docs/` và `testing/`** (Bản đặc tả 3 vai trò và 12 FR cũ — được đánh dấu là phiên bản cũ bị thay thế, không còn hiệu lực thực hiện).

### Bảng kiểm kê các nguồn tài liệu đã khảo sát:

| Tên tệp tin / Nguồn | Loại nguồn | Vai trò đối với dự án | Đánh giá khả năng áp dụng theo phạm vi mới |
| :--- | :---: | :--- | :--- |
| **Yêu cầu thay đổi phạm vi (Prompt 21/10)** | Yêu cầu chính thức | **Căn cứ pháp lý cao nhất của đợt sửa đổi** | Định nghĩa lại toàn bộ hệ thống: 1 Role (Nhân viên), 5 FR, cấu trúc lỗi 10+3, responsive bắt buộc. |
| `backend/src/server.js`, `db.js` | Mã nguồn thực tế | Bằng chứng thực thi Baseline | Giữ nguyên: Server Express port 5001, route `/api/health`, pool kết nối MySQL `badminton_booking_db`. |
| `frontend/src/App.jsx`, `main.jsx` | Mã nguồn thực tế | Bằng chứng thực thi Baseline | Giữ nguyên khung React + Vite port 5173, sẽ cập nhật giao diện 5 chức năng của Nhân viên. |
| `TAILIEU/Mau_01_Tai_lieu_API.docx` | Biểu mẫu | Mẫu định dạng tài liệu API | Áp dụng cấu trúc bảng, mã lỗi; thu hẹp danh sách endpoint từ 17 xuống các API cho 5 chức năng Nhân viên. |
| `TAILIEU/Mau_02_Bug_Manifest.xlsx` | Biểu mẫu | Mẫu danh mục lỗi cài sẵn | Áp dụng cấu trúc cột; phân định thành 10 lỗi đặc tả + 3 lỗi ngoài đặc tả. Lưu riêng bảo mật cho GV. |
| `TAILIEU/Mau_03_Bo_bieu_mau_Kiem_thu.xlsx` | Biểu mẫu | Mẫu thiết kế kiểm thử | Áp dụng 7 sheet; viết lại toàn bộ test cases cho 5 chức năng, xác thực, đặt trùng và responsive. |
| `TAILIEU/Mau_04_Test_Plan.docx` | Biểu mẫu | Mẫu kế hoạch kiểm thử | Áp dụng cấu trúc 6 mục; cập nhật phạm vi kiểm thử in/out theo phạm vi mới. |
| `TAILIEU/Mau_05_Test_Summary_Report.docx` | Biểu mẫu | Mẫu báo cáo tổng kết | Áp dụng cấu trúc; giữ nguyên trạng thái trung thực: No-go giai đoạn Baseline, chưa có kết quả đo thật. |
| `TAILIEU/Mau_06_Bien_ban_ban_giao.docx` | Biểu mẫu | Mẫu biên bản bàn giao | Áp dụng cấu trúc; cập nhật danh mục bàn giao theo phạm vi 5 chức năng. |
| `TAILIEU/Tieu_chi_cham_diem.docx` & `Checklist_truoc_khi_nop.docx` | Tiêu chí đánh giá | Khung đánh giá của học phần | **Ghi nhận xung đột tiêu chí**: Tiêu chí cũ yêu cầu ≥ 3 vai trò, ≥ 12 FR, ≥ 15 lỗi. Cần ghi chú để xin ý kiến GV. |

---

## 2. Phân tích tác động của việc thay đổi phạm vi

### 2.1. Những nội dung PHẢI LOẠI KHỎI bộ tài liệu hiện hành:
- **Loại bỏ 2 vai trò**: Khách hàng (Customer) và Quản trị viên (Admin). "Người chưa đăng nhập" chỉ là trạng thái truy cập, không phải vai trò nghiệp vụ.
- **Loại bỏ 7 chức năng cũ ngoài phạm vi**:
  - `FR-03 cũ`: Quản lý hồ sơ cá nhân và đổi mật khẩu.
  - `FR-04 cũ`: Quản lý danh mục sân bãi (thêm/sửa sân, bảo trì).
  - `FR-05 cũ`: Cấu hình bảng giá theo khung giờ thường/giờ vàng.
  - `FR-07 cũ`: Khóa tạm thời slot 10 phút (Hold slot).
  - `FR-09 cũ`: Phân biệt đặt tại quầy vs đặt online (nay gộp chung vào chức năng Đặt sân của Nhân viên).
  - `FR-11 cũ`: Check-in / Check-out tiếp đón khách vào sân.
  - `FR-12 cũ`: Báo cáo doanh thu và tỷ lệ lấp đầy sân.
- **Loại bỏ các phân hệ kỹ thuật không thuộc phạm vi**: Thanh toán trực tuyến, cổng thanh toán thẻ/ví điện tử, tính toán doanh thu tài chính.
- **Loại bỏ khẳng định đạt tiêu chí cũ**: Không còn khẳng định đạt tiêu chí "≥ 3 vai trò" hay "≥ 12 chức năng" của rubric học phần.

### 2.2. Những nội dung GIỮ LẠI:
- **Ý niệm cốt lõi**: Hệ thống hỗ trợ đặt sân cầu lông, hiển thị lịch sân trống theo thời gian thực (Timeline), cập nhật lịch tức thời sau khi đặt/hủy.
- **Kiến trúc kỹ thuật Baseline**:
  - Backend: Node.js + Express (cổng 5001), kết nối MySQL connection pool, API kiểm tra sức khỏe `GET /api/health`.
  - Frontend: React + Vite (cổng 5173).
- **Yêu cầu phi chức năng cốt lõi**:
  - Tính toàn vẹn chống Double Booking (xử lý tranh chấp đặt trùng cùng một sân và khung giờ).
  - An toàn xác thực (Mã hóa mật khẩu Bcrypt, cấp Token JWT cho Nhân viên).
  - **Yêu cầu Responsive bắt buộc**: Thích ứng mượt mà trên các kích thước màn hình từ di động đến máy tính để bàn.

### 2.3. Những nội dung CẦN VIẾT LẠI HOÀN TOÀN:
1. **Tài liệu URD (`docs/Ket_qua/01_URD/`)**: Viết lại bối cảnh, 1 vai trò Nhân viên, 5 User Stories (`US-01` đến `US-05`), 3 luồng công việc (Xem lịch, Đặt sân, Hủy sân), tiêu chí nghiệm thu và bảng câu hỏi còn thiếu.
2. **Tài liệu SRS (`docs/Ket_qua/02_SRS/`)**: Viết lại đặc tả 5 chức năng riêng biệt:
   - `FR-01`: Đăng ký tài khoản nhân viên.
   - `FR-02`: Đăng nhập.
   - `FR-03`: Xem lịch đặt sân.
   - `FR-04`: Đặt sân (kèm cơ chế chống tranh chấp đặt trùng và cập nhật lịch).
   - `FR-05`: Hủy đặt sân (kèm giải phóng slot trên lịch tức thời).
   - Đặc tả yêu cầu Responsive bắt buộc trên cả 5 màn hình/chức năng.
3. **Tài liệu Thiết kế API (`docs/Ket_qua/03_API/`)**: Tinh gọn danh mục API chỉ phục vụ 5 chức năng trên; phân biệt rõ endpoint duy nhất đã có code (`GET /api/health`) và các endpoint mới ở dạng thiết kế dự kiến.
4. **Danh mục Lỗi cài sẵn (`docs/Ket_qua/04_Bug_Manifest_Rieng/`)**: Tách biệt thành 2 bảng rõ ràng:
   - **Bảng 1**: 10 kịch bản lỗi vi phạm trực tiếp các yêu cầu đã đặc tả trong SRS mới.
   - **Bảng 2**: 3 kịch bản lỗi ngoài đặc tả (vấn đề quan sát cần xác nhận, giải thích rõ căn cứ kỳ vọng).
   - Ghi rõ 100% là kịch bản thiết kế (`Thiết kế — chưa xác nhận tồn tại`), không có bằng chứng giả.
5. **Bộ biểu mẫu kiểm thử (`docs/Ket_qua/05_Bo_bieu_mau_Kiem_thu/`)**: Thiết kế lại toàn bộ test cases cho 5 chức năng, xác thực, đặt trùng và kiểm thử responsive.
6. **Kế hoạch kiểm thử (`docs/Ket_qua/06_Test_Plan/`)**: Cập nhật phạm vi kiểm thử theo phạm vi mới.
7. **Báo cáo tổng kết & Biên bản bàn giao (`docs/Ket_qua/07_...`, `08_...`)**: Cập nhật phạm vi và giữ nguyên các ô số liệu chờ đo thực tế.
8. **Ma trận truy vết & Đối chiếu Rubric (`docs/Ket_qua/09_...`)**: Cập nhật ma trận truy vết theo `URD (5 US) → SRS (5 FR) → API → TC → Bug (10+3)`; phân tích rõ sự khác biệt với Rubric cũ để trình Giảng viên.

---

## 3. Phân tích xung đột giữa Phạm vi mới và Tiêu chí đánh giá của môn học

| Tiêu chuẩn trong Rubric cũ (`TAILIEU/`) | Yêu cầu phạm vi mới (21/10) | Mức độ xung đột | Hướng xử lý và Khuyến nghị đối với sinh viên |
| :--- | :--- | :---: | :--- |
| **URD/SRS có ≥ 3 vai trò** (Customer, Staff, Admin) | **Chỉ có 1 vai trò duy nhất: NHÂN VIÊN** | **Xung đột lớn** | Không tự ý vẽ thêm vai trò. Ghi rõ trong tài liệu là hệ thống đơn vai trò tập trung vào nhân viên sân; cần xin ý kiến Giảng viên chấp thuận đặc thù đề tài này. |
| **SRS có ≥ 12 chức năng chức năng (FR)** | **Chỉ có 5 chức năng cốt lõi** (`FR-01` đến `FR-05`) | **Xung đột lớn** | Không tự bịa thêm chức năng ngoài phạm vi. Đặc tả thật sâu 5 chức năng này (đủ luồng chính, luồng thay thế, luồng ngoại lệ và responsive). Báo cáo Giảng viên về độ sâu thay vì số lượng bề nổi. |
| **SRS có ≥ 8 NFR có số đo (≥ 3 NFR hiệu năng)** | Tập trung vào Tính toàn vẹn đặt trùng, Bảo mật xác thực và **Responsive** | Phù hợp một phần | Giữ các NFR đo lường được về hiệu năng (P90 phản hồi, tải đồng thời khi đặt sân) và bổ sung NFR chi tiết về Responsive. |
| **Cài đặt ≥ 15 lỗi (đủ 5 loại, ≥ 3 Crit/Major)** | **10 lỗi đặc tả + 3 lỗi ngoài đặc tả = 13 kịch bản lỗi** | Khác biệt về số lượng và phân loại | Phân chia thành đúng 2 nhóm: 10 lỗi vi phạm đặc tả SRS + 3 lỗi ngoài đặc tả. Đánh dấu trạng thái "Thiết kế — chưa xác nhận tồn tại". Trình bày rõ cách hiểu này cho Giảng viên. |

---

## 4. Danh mục câu hỏi nghiệp vụ và Dữ liệu thiếu cần người dùng / GV xác nhận

Toàn bộ các quy tắc nghiệp vụ dưới đây **chưa có văn bản quy định chính thức**, do đó trong tài liệu đặc tả sẽ được đánh dấu rõ ràng là `[Chưa xác định — Cần xác nhận từ người dùng / GV]` hoặc `[Đề xuất kỹ thuật chờ xác nhận]`, tuyệt đối không tự ý quyết định thành yêu cầu bắt buộc:

1. **Quy tắc Đăng ký tài khoản Nhân viên (`FR-01`)**:
   - *Câu hỏi*: Bất kỳ ai vào web cũng có thể tự bấm Đăng ký tài khoản nhân viên hay phải có "Mã kích hoạt nội bộ / Mã mời" do quản lý cấp? Tài khoản tạo xong có được dùng ngay hay phải qua bước phê duyệt?
   - *Đề xuất tạm thời*: Cho phép đăng ký với các trường thông tin cơ bản (Họ tên, SĐT, Mật khẩu), trạng thái kích hoạt ngay để phục vụ kiểm thử, nhưng ghi chú cần xác nhận quy trình phê duyệt thực tế.
2. **Quy định về Khung giờ hoạt động & Thời lượng slot (`FR-03`, `FR-04`)**:
   - *Câu hỏi*: Cụm sân hoạt động từ mấy giờ đến mấy giờ? Thời lượng của 1 lượt đặt là cố định 60 phút theo khung giờ tròn (ví dụ: 08:00 - 09:00) hay cho phép đặt lẻ (30 phút, 90 phút)? Có giới hạn số slot tối đa một nhân viên được đặt trong 1 đơn không?
   - *Đề xuất tạm thời*: Giả định khung giờ mở cửa từ 06:00 đến 22:00, chia thành các block 60 phút cố định; tối đa 4 slot/đơn đặt.
3. **Dữ liệu bắt buộc khi Nhân viên tạo đơn Đặt sân (`FR-04`)**:
   - *Câu hỏi*: Khi nhân viên đặt sân giúp khách tại quầy hoặc qua điện thoại, những trường thông tin nào là bắt buộc? (Ví dụ: Tên khách hàng? Số điện thoại khách? Ghi chú yêu cầu? Hay chỉ cần chọn sân và khung giờ là đặt được?).
   - *Đề xuất tạm thời*: Bắt buộc: Tên khách hàng, Số điện thoại liên hệ, Ngày đặt, Sân và Khung giờ.
4. **Phân quyền và Phạm vi Hủy đặt sân (`FR-05`)**:
   - *Câu hỏi*: Nhân viên có quyền hủy bất kỳ lịch đặt nào trên hệ thống (của khách hoặc do nhân viên khác đặt) hay chỉ được phép hủy các lịch do chính tài khoản nhân viên của mình tạo ra?
   - *Đề xuất tạm thời*: Cho phép nhân viên hủy mọi lịch đặt nếu khách yêu cầu tại quầy, nhưng bắt buộc nhập lý do hủy và hệ thống ghi log ID nhân viên thực hiện hủy.
5. **Thời hạn và Điều kiện Hủy sân (`FR-05`)**:
   - *Câu hỏi*: Việc hủy sân có bị giới hạn thời gian (ví dụ: phải hủy trước giờ chơi ít nhất 2 tiếng, 12 tiếng, 24 tiếng) hay nhân viên được quyền hủy bất kỳ lúc nào (kể cả sát giờ chơi hoặc khi giờ chơi đã bắt đầu)?
   - *Đề xuất tạm thời*: Ghi rõ điều kiện hủy đang là `[Chưa xác định — Cần xác nhận quy chế vận hành sân]`.
