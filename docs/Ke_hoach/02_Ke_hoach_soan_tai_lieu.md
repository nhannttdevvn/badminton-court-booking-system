# KẾ HOẠCH CHI TIẾT BIÊN SOẠN BỘ TÀI LIỆU DỰ ÁN
## (PHẠM VI MỚI: 1 VAI TRÒ NHÂN VIÊN – 5 CHỨC NĂNG CỐT LÕI)
### Đề tài: Hệ thống Đặt sân Cầu lông (Badminton Court Booking System)
**Học phần**: Đánh giá hiệu năng hệ thống  
**Ngày cập nhật**: 21/10/2026  
**Quy tắc thực hiện**: Lập kế hoạch phân rã chi tiết thành văn bản trước khi cập nhật các tệp tin trong `docs/Ket_qua/`.

---

## 1. Định nghĩa và Cách hiểu thống nhất về các khái niệm cốt lõi

Nhằm đảm bảo tính chính xác và không gây hiểu nhầm trong quá trình biên soạn và nghiệm thu:

1. **Về vai trò duy nhất (Nhân viên)**:
   - Hệ thống chỉ phục vụ một đối tượng người dùng nghiệp vụ duy nhất là **Nhân viên sân (Staff)**.
   - Trạng thái "Người chưa đăng nhập / Khách vãng lai vào trang web" chỉ là **trạng thái truy cập trước khi xác thực**, tuyệt đối không được coi là một vai trò nghiệp vụ mới.
2. **Về phân loại Lỗi (10 Lỗi đặc tả + 3 Lỗi ngoài đặc tả)**:
   - **"Lỗi đặc tả" (10 lỗi)**: Là lỗi hành vi của hệ thống phần mềm vi phạm trực tiếp một yêu cầu hoặc quy tắc đã được mô tả cụ thể, rõ ràng trong tài liệu SRS. *(Lưu ý: Đây KHÔNG PHẢI là lỗi chính tả hay lỗi trình bày văn bản trong tài liệu SRS)*.
   - **"Lỗi ngoài đặc tả" (3 lỗi)**: Là các vấn đề bất thường hoặc khiếm khuyết quan sát được trong quá trình sử dụng hệ thống (về trải nghiệm người dùng, tính tiện dụng, hành vi biên không mong muốn...) nhưng **chưa có điều khoản yêu cầu tương ứng trong SRS**. Những vấn đề này cần căn cứ vào kỳ vọng trải nghiệm tiêu chuẩn hoặc thỏa thuận bổ sung để kết luận, và được ghi nhận với bản chất là `"Vấn đề cần xác nhận"`, không tự tiện khẳng định là lỗi đã được công nhận hay được cộng điểm.
3. **Về Yêu cầu Responsive**:
   - Là yêu cầu bắt buộc trên toàn bộ 5 chức năng/màn hình: Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy đặt sân (kèm modal xác nhận).
   - Đề xuất bộ 5 kích thước kiểm thử: **320px, 375px, 768px, 1024px, 1366px** (gắn nhãn rõ là bộ kích thước đề xuất chờ xác nhận).

---

## 2. Bảng kế hoạch chi tiết từng đầu việc (Task Breakdown Matrix)

| Mã việc | Tài liệu cần sửa / tạo | Nội dung cần viết / chỉnh sửa | Nguồn căn cứ đầu vào | File đầu ra tương ứng | Tiêu chí hoàn thành theo Rubric | Điểm chưa xác định / Cần xác nhận | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **PLAN-01** | Báo cáo kiểm kê nguồn & hiện trạng | Kiểm kê nguồn theo thứ tự ưu tiên; phân tích tác động loại bỏ Customer/Admin và 7 chức năng cũ; đối chiếu xung đột rubric môn học; lập danh sách câu hỏi nghiệp vụ. | Yêu cầu thay đổi phạm vi 21/10, mã nguồn `server.js`, `db.js`, `App.jsx`, `TAILIEU/`. | [01_Kiem_ke_nguon_va_hien_trang.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ke_hoach/01_Kiem_ke_nguon_va_hien_trang.md) | Phân tích đầy đủ 3 nhóm (loại bỏ, giữ lại, viết lại); chỉ rõ xung đột với tiêu chí cũ. | Không còn hạn chế trong phạm vi kiểm kê. | **HOÀN THÀNH** |
| **PLAN-02** | Kế hoạch chi tiết biên soạn | Lập bảng kế hoạch chi tiết cho từng tài liệu kết quả; định nghĩa rõ cách hiểu 10 lỗi đặc tả + 3 lỗi ngoài đặc tả; quy định responsive. | Quy định biểu mẫu và rubric học phần. | [02_Ke_hoach_soan_tai_lieu.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ke_hoach/02_Ke_hoach_soan_tai_lieu.md) | Đủ các cột: Mã việc, Tài liệu, Nội dung, Nguồn, Đầu ra, Tiêu chí, Điểm chưa xác định, Trạng thái. | Không có. | **HOÀN THÀNH** |
| **PLAN-03** | Bảng theo dõi tiến độ | Thiết lập ma trận theo dõi tiến độ cập nhật thực tế theo tiến trình thực hiện; đánh dấu trạng thái trung thực. | Quy trình thực hiện dự án. | [03_Theo_doi_tien_do.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ke_hoach/03_Theo_doi_tien_do.md) | Cập nhật chính xác trạng thái sau mỗi đầu việc hoàn thành. | Cần cập nhật liên tục. | **HOÀN THÀNH** |
| **DOC-01** | Tài liệu Yêu cầu Người dùng (URD) | Viết lại toàn bộ URD: Bối cảnh & phạm vi mới; 1 vai trò duy nhất (Nhân viên); 5 User Stories (`US-01`..`US-05`); 3 luồng công việc (Xem lịch, Đặt sân, Hủy sân); tiêu chí nghiệm thu kiểm tra được; danh sách câu hỏi nghiệp vụ chưa xác nhận. | Yêu cầu phạm vi mới (21/10), mẫu URD chuẩn. | [URD_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/01_URD/URD_Badminton_Court_Booking.md) | Đủ 1 role, 5 US, 3 flows, tiêu chí nghiệm thu rõ ràng; không còn Customer/Admin; có danh mục câu hỏi tồn đọng. | Cần xác nhận của người dùng về 5 câu hỏi nghiệp vụ. | **ĐANG THỰC HIỆN** |
| **DOC-02** | Đặc tả Yêu cầu Phần mềm (SRS) | Viết lại SRS đặc tả riêng biệt 5 chức năng `FR-01` đến `FR-05` (Mục đích, actor, tiền điều kiện, input/ràng buộc, luồng chính, luồng thay thế/ngoại lệ, output/hậu điều kiện, quyền, nghiệm thu, nguồn & trạng thái, code status). Đặc tả cập nhật lịch tức thời, chống Double Booking. Đặc tả **Responsive bắt buộc** (320, 375, 768, 1024, 1366 px). | URD mới, mẫu SRS chuẩn, kiến trúc Express/MySQL. | [SRS_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/02_SRS/SRS_Badminton_Court_Booking.md) | Đủ 11 thuộc tính bắt buộc cho mỗi FR; cơ chế tranh chấp đặt trùng và responsive được mô tả chi tiết; phân định rõ quy tắc đã xác nhận vs đề xuất chờ duyệt. | Cần người dùng chốt các quy tắc nghiệp vụ đề xuất. | **CHƯA BẮT ĐẦU** |
| **DOC-03** | Tài liệu Thiết kế API | Tinh gọn danh mục API chỉ phục vụ 5 chức năng của Nhân viên (Auth, Slots, Bookings). Phân định rõ ràng: API duy nhất có code chạy thật (`GET /api/health`) và các API thiết kế dự kiến. Request/response/validation chưa triển khai gắn nhãn dự kiến. | `backend/src/server.js`, SRS mới, `Mau_01_Tai_lieu_API.docx`. | [Tai_lieu_API_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/03_API/Tai_lieu_API_Badminton_Booking.md) | Khớp hoàn toàn với SRS mới; không còn các API thừa của Customer/Admin/Payment/Report; phân biệt rõ code thật vs dự kiến. | URL public staging khi deploy. | **CHƯA BẮT ĐẦU** |
| **DOC-04** | Danh mục Lỗi cài sẵn (Bug Manifest Riêng) | Tách thành 2 bảng độc lập: **Bảng 1 (10 lỗi vi phạm đặc tả SRS)** trích dẫn chính xác điều khoản SRS vi phạm; **Bảng 2 (3 lỗi ngoài đặc tả SRS)** giải thích căn cứ kỳ vọng và ghi nhận là "Vấn đề cần xác nhận". Toàn bộ 13 lỗi gắn nhãn `Thiết kế — chưa xác nhận tồn tại`. Lưu riêng bảo mật cho GV. | SRS mới, `Mau_02_Bug_Manifest.xlsx`. | [Bug_Manifest_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/04_Bug_Manifest_Rieng/Bug_Manifest_Badminton_Booking.md) | Đủ 10 lỗi đặc tả + 3 lỗi ngoài đặc tả; đủ 12 cột thông tin theo yêu cầu; không tạo bằng chứng hay ngày tháng giả mạo. | Mã nguồn cấy lỗi thực tế và video bằng chứng khi chạy web thật. | **CHƯA BẮT ĐẦU** |
| **DOC-05** | Bộ Biểu mẫu Kiểm thử (Tester) | Cập nhật 7 sheet theo Mẫu 03: Sheet Review SRS theo phạm vi mới; Sheet TC Chức năng bao phủ 5 chức năng, xác thực, tranh chấp đặt trùng; Sheet TC Phi chức năng bao gồm **Kiểm thử Responsive** (bộ 5 kích thước); Khung Test Log & Bug Report giữ trung thực không fake bug. | SRS mới, `Mau_03_Bo_bieu_mau_Kiem_thu.xlsx`. | [Bo_bieu_mau_Kiem_thu_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/05_Bo_bieu_mau_Kiem_thu/Bo_bieu_mau_Kiem_thu_Badminton.md) | Phủ kín 5 FR, có TC xác thực, đặt trùng và responsive; Test log ghi nhận 2 ca baseline pass, còn lại pending. | Bằng chứng thực thi thật từ Tester trên sản phẩm bạn cặp. | **CHƯA BẮT ĐẦU** |
| **DOC-06** | Kế hoạch Kiểm thử (Test Plan) | Cập nhật phạm vi kiểm thử In-scope (5 chức năng của Nhân viên, xác thực, đặt trùng, responsive) và Out-of-scope (Customer, Admin, thanh toán, doanh thu); quy định rõ 5 loại lỗi và tiêu chí nghiệm thu. | SRS mới, `Mau_04_Test_Plan.docx`. | [Test_Plan_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/06_Test_Plan/Test_Plan_Badminton_Booking.md) | Khớp hoàn toàn với phạm vi 1 role - 5 FR; tiêu chí rõ ràng, không còn nội dung của phạm vi cũ. | Thông tin bạn cặp và lịch chạy test chính thức. | **CHƯA BẮT ĐẦU** |
| **DOC-07** | Báo cáo Tổng kết Kiểm thử (TSR) | Cập nhật bảng độ phủ theo 5 chức năng và NFR mới; giữ nguyên kết luận **No-go (Giai đoạn Baseline)**; các ô đo đạc hiệu năng JMeter và thống kê bug để trống `[Chờ kết quả thực tế của Tester]`. | SRS mới, `Mau_05_Test_Summary_Report.docx`. | [Test_Summary_Report_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/07_Test_Summary_Report/Test_Summary_Report_Badminton.md) | Cấu trúc chuẩn Mẫu 05; minh bạch 100% về việc chưa có số liệu đo tải thực tế; không fake số liệu. | File kết quả `.jtl`, HTML Dashboard của JMeter khi chạy thật. | **CHƯA BẮT ĐẦU** |
| **DOC-08** | Biên bản Bàn giao Số 1 & Số 2 | Cập nhật danh mục bàn giao sản phẩm (Tuần 6) và hồ sơ kiểm thử (Tuần 14) theo phạm vi 1 role - 5 FR; để trống chữ ký và số liệu bug thực tế. | SRS mới, `Mau_06_Bien_ban_ban_giao.docx`. | [Bien_ban_ban_giao_so_1_Tuan_6.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/08_Bien_ban_ban_giao/Bien_ban_ban_giao_so_1_Tuan_6.md), `Bien_ban_ban_giao_so_2_Tuan_14.md` | Đúng chuẩn Mẫu 06; phản ánh đúng tình trạng baseline và phạm vi mới. | Chữ ký xác nhận của hai bên khi bàn giao thực tế. | **CHƯA BẮT ĐẦU** |
| **DOC-09** | Ma trận Truy vết & Đối chiếu Rubric | Cập nhật ma trận truy vết dọc: `URD (5 US) ↔ SRS (5 FR) ↔ API ↔ TC ↔ Bug (10 đặc tả + 3 ngoài đặc tả)`. Cập nhật bảng đối chiếu Checklist và Rubric, phân tích rõ sự khác biệt với rubric cũ để xin ý kiến Giảng viên. | Toàn bộ tài liệu mới, `Checklist_truoc_khi_nop.docx`, `Tieu_chi_cham_diem.docx`. | [Ma_tran_truy_vet_va_Doi_chieu_Rubric.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/09_Truy_vet_va_doi_chieu/Ma_tran_truy_vet_va_Doi_chieu_Rubric.md) | Truy vết thông suốt 100%; chỉ rõ điểm sai khác với tiêu chí cũ và nội dung cần GV phê duyệt. | Phê duyệt chính thức của Giảng viên về tiêu chí đánh giá. | **CHƯA BẮT ĐẦU** |
| **DOC-10** | Tài liệu Tổng hợp Kết quả | Cập nhật [docs/Ket_qua/README.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/README.md) phản ánh đúng tình trạng tài liệu sau khi sửa đổi; hướng dẫn tra cứu hồ sơ. | Toàn bộ kết quả mới. | [README.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/README.md) | Thống kê đầy đủ trạng thái của tất cả tài liệu; cảnh báo rõ ràng về phạm vi mới. | Không có. | **CHƯA BẮT ĐẦU** |

---

## 3. Trình tự thực hiện theo quan hệ phụ thuộc kỹ thuật

Quá trình cập nhật được tiến hành tuần tự theo chuỗi phụ thuộc chặt chẽ:
```
[Kiểm kê & Kế hoạch (docs/Ke_hoach/)]
           ↓
[URD: 1 Role Nhân viên, 5 US, 3 Luồng]
           ↓
[SRS: 5 FR chi tiết, Responsive, Chống Double Booking]
           ↓
[API: Chỉ phục vụ 5 FR, phân định Code thật vs Dự kiến]
           ↓
[Bug Manifest: 10 Lỗi đặc tả + 3 Lỗi ngoài đặc tả]
           ↓
[Thiết kế Kiểm thử: TC Chức năng, Xác thực, Đặt trùng, Responsive]
           ↓
[Test Plan → Test Summary Report → Biên bản bàn giao]
           ↓
[Ma trận Truy vết & Đối chiếu Rubric → Cập nhật README kết quả]
```
