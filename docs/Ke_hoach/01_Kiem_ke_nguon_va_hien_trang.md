# BÁO CÁO KIỂM KÊ NGUỒN VÀ HIỆN TRẠNG DỰ ÁN
## Đề tài: Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System)
**Học phần**: Đánh giá hiệu năng hệ thống  
**Mã tài liệu**: `docs/Ke_hoach/01_Kiem_ke_nguon_va_hien_trang.md`  
**Ngày kiểm kê**: 21/10/2026  
**Người kiểm kê**: Antigravity Assistant (Kiểm kê trực tiếp trên Workspace hiện tại)

---

## 1. Danh mục các nguồn tài liệu đã đọc đầy đủ

Chúng tôi đã thực hiện đọc chi tiết (toàn bộ nội dung văn bản, bảng biểu, XML và sheet Excel) của tất cả các tệp tin trong workspace:

| STT | Tên nguồn / Đường dẫn tệp tin | Định dạng | Mục đích của nguồn | Phạm vi đã đọc chi tiết |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `TAILIEU/Mau_01_Tai_lieu_API.docx` | DOCX | Biểu mẫu chuẩn | Đọc toàn bộ 5 mục: Thông tin chung, Mã lỗi chung, Danh sách endpoint, Đặc tả chi tiết từng endpoint, Tài khoản gọi API. |
| 2 | `TAILIEU/Mau_02_Bug_Manifest.xlsx` | XLSX | Biểu mẫu chuẩn | Đọc toàn bộ sheet `Bug_Manifest`: Header bảng tự kiểm tra (hàng 4-11), 13 cột đặc tả lỗi (hàng 15: Mã lỗi, Loại lỗi, Mức nghiêm trọng, Chức năng/Luồng, Vị trí, Yêu cầu SRS vi phạm, Mô tả, Bước tái hiện, Kết quả mong đợi, Kết quả thực tế, Bằng chứng, File chứa lỗi, Ghi chú). |
| 3 | `TAILIEU/Mau_03_Bo_bieu_mau_Kiem_thu.xlsx` | XLSX | Biểu mẫu chuẩn | Đọc toàn bộ 7 sheets: `Thong_tin`, `Review_SRS` (7 cột), `TC_Chuc_nang` (8 cột), `TC_Phi_chuc_nang` (8 cột), `Test_Log` (8 cột), `Bug_Report` (8 cột), `Tong_hop` (các công thức đếm tự động). |
| 4 | `TAILIEU/Mau_04_Test_Plan.docx` | DOCX | Biểu mẫu chuẩn | Đọc toàn bộ 6 mục: Giới thiệu (Mục đích, Tài liệu tham chiếu), Phạm vi (Trong/Ngoài), Chiến lược (Các loại kiểm thử, Phân loại lỗi 5 loại, Mức nghiêm trọng 4 mức), Môi trường kiểm thử, Tiêu chí (Bắt đầu, Kết thúc, Tạm dừng, Tiếp tục), Rủi ro và biện pháp. |
| 5 | `TAILIEU/Mau_05_Test_Summary_Report.docx` | DOCX | Biểu mẫu chuẩn | Đọc toàn bộ 8 mục: Tổng quan, Độ phủ kiểm thử, Thống kê lỗi (ma trận 5 loại x 4 mức), Kiểm thử tự động (Newman, Puppeteer), Kiểm thử hiệu năng (JMeter, bảng đối chiếu NFR), Rủi ro còn lại, Kết luận (Go/No-go), Khai báo AI. |
| 6 | `TAILIEU/Mau_06_Bien_ban_ban_giao.docx` | DOCX | Biểu mẫu chuẩn | Đọc toàn bộ Biên bản số 1 (Bàn giao sản phẩm để test - Tuần 6) và Biên bản số 2 (Bàn giao kết quả test - Tuần 14). |
| 7 | `TAILIEU/Checklist_truoc_khi_nop.docx` | DOCX | Tiêu chí & Điều kiện | Đọc toàn bộ danh mục kiểm tra điều kiện nộp bài: Phần 1 (Chủ hệ thống) và Phần 2 (Tester), các mốc số lượng tối thiểu. |
| 8 | `TAILIEU/Tieu_chi_cham_diem.docx` | DOCX | Tiêu chí & Rubric | Đọc thang điểm 10 (Chủ hệ thống 4.0đ gồm A1-A4; Tester 6.0đ gồm B1-B5), rubric chi tiết 3 mức Tốt/Đạt/Chưa đạt, quy đổi tỷ lệ bắt bug và quy chế xử phạt gian lận. |
| 9 | `TAILIEU/Phieu_cham_diem.docx` | DOCX | Biểu mẫu đánh giá | Đọc cấu trúc phiếu chấm điểm chính thức của giảng viên. |
| 10 | `README.md` (Gốc dự án) | Markdown | Yêu cầu nghiệp vụ | Đọc 7 mục: Mục tiêu hệ thống, 3 nhóm người dùng (Customer, Staff, Admin), các chức năng chính, 3 luồng chính (Đặt sân, Hủy sân, Quản lý sân), Tech stack (React, Node Express, MySQL), Cấu trúc thư mục, Hướng dẫn chạy. |
| 11 | `docs/URD/README.md`, `docs/SRS/README.md`, `docs/API/README.md`, `docs/Diagrams/README.md`, `docs/Bug-Manifest/README.md` | Markdown | Yêu cầu sơ khởi | Đọc toàn bộ các file tóm tắt sơ khởi được tạo khi khởi tạo repository. |
| 12 | `testing/Postman/badminton-court-booking.postman_collection.json` & `README.md` | JSON, MD | Bằng chứng kiểm thử API | Đọc file collection JSON: hiện chỉ có 1 request duy nhất `GET {{baseUrl}}/api/health`. |
| 13 | `testing/Test-Cases/README.md`, `testing/Test-Plan/README.md`, `testing/Bug-Reports/README.md`, `testing/Puppeteer/README.md`, `testing/JMeter/README.md` | Markdown | Kế hoạch kiểm thử sơ khởi | Đọc toàn bộ dàn ý và hướng dẫn cài đặt kiểm thử tự động / hiệu năng. |
| 14 | `backend/src/server.js`, `backend/src/routes/health.js`, `backend/src/config/db.js`, `backend/package.json`, `backend/.env.example` | JS, JSON | Mã nguồn Backend | Đọc toàn bộ logic Express server, cổng 5001, cấu hình pool MySQL `mysql2/promise`, route health check trả về JSON `{status: "ok"}`. |
| 15 | `frontend/src/App.jsx`, `frontend/src/App.css`, `frontend/src/main.jsx`, `frontend/index.html`, `frontend/package.json`, `frontend/.env.example` | JSX, CSS, HTML, JSON | Mã nguồn Frontend | Đọc toàn bộ component React: tiêu đề "Badminton Court Booking System", nút kiểm tra Backend Health Status gọi `GET /api/health`, 3 card vai trò, 3 card luồng nghiệp vụ. |

---

## 2. Nguồn không đọc được và giới hạn

1. **Các file tạm khóa của Microsoft Office**:
   - `../Test_document/Pattern/~$oi04_Lab1_URD_SweetShop.docx`
   - `../Test_document/Pattern/~$oi04_Lab1_SRS_SweetShop.docx`
   - `../Test_document/Pattern/~$oi04_Huong_dan_thao_tac_va_goi_y_test_case.docx`
   - *Giới hạn*: Đây là các tệp tạm (temporary lock file) do ứng dụng Word tạo ra khi chỉnh sửa, kích thước nhỏ và không chứa nội dung độc lập.
2. **Quy định bảo mật biến môi trường (.env)**:
   - Các file `backend/.env` và `frontend/.env` được bỏ qua hoàn toàn, không đưa các tham số cấu hình nhạy cảm vào tài liệu. Chỉ căn cứ vào `.env.example` công khai.

---

## 3. Phân định chức năng hệ thống: Đã có mã nguồn vs. Mới được mô tả

Căn cứ trực tiếp vào mã nguồn thực tế tại thư mục `backend/` và `frontend/`:

### 3.1. Chức năng ĐÃ CÓ MÃ NGUỒN và ĐÃ KIỂM CHỨNG THỰC THI
1. **Kiểm tra trạng thái hệ thống (Health Check)**:
   - *Mã nguồn Backend*: `backend/src/routes/health.js` (Route `GET /api/health`), `backend/src/server.js` (lắng nghe cổng 5001).
   - *Hành vi thực tế*: Trả về HTTP 200 OK với body JSON:
     ```json
     {
       "status": "ok",
       "service": "Badminton Court Booking System API",
       "uptime": 4.29,
       "timestamp": "2026-10-03T09:32:16.223Z"
     }
     ```
   - *Bằng chứng kiểm chứng*: Lệnh `curl -v http://localhost:5001/api/health` đã được chạy thực tế trong phiên làm việc trước và ghi nhận mã thoát 0.
2. **Trang chủ và Hiển thị trạng thái kết nối API (Frontend Homepage)**:
   - *Mã nguồn Frontend*: `frontend/src/App.jsx`, `frontend/src/App.css`, `frontend/index.html`.
   - *Hành vi thực tế*: Hiển thị tiêu đề "Badminton Court Booking System", nút bấm "Kiểm tra kết nối" tự động fetch tới `http://localhost:5001/api/health`, đổi trạng thái sang "API Online" (màu xanh). Hiển thị danh sách 3 vai trò và 3 luồng chính.
   - *Bằng chứng kiểm chứng*: Lệnh `npm run build` chạy thành công (Vite v8.3.2 built in 491ms); `curl http://localhost:5173` trả về HTTP 200 OK với tiêu đề khớp.
3. **Khởi tạo Pool kết nối Cơ sở dữ liệu MySQL**:
   - *Mã nguồn*: `backend/src/config/db.js` khởi tạo connection pool `mysql2/promise` và hàm `testConnection()`.
   - *Lưu ý thực tế*: Mã nguồn có hàm kết nối, nhưng **CHƯA CÓ BẢNG CƠ SỞ DỮ LIỆU NÀO ĐƯỢC TẠO** trong MySQL (chưa có file schema `.sql` hay migration).

### 3.2. Chức năng MỚI ĐƯỢC MÔ TẢ (CHƯA TRIỂN KHAI TRONG MÃ NGUỒN)
Toàn bộ các nghiệp vụ dưới đây mới chỉ được mô tả bằng lời trong `README.md` và `docs/SRS/README.md`, **hoàn toàn chưa có controller, router hay model nào trong backend/frontend**:
1. **Xác thực và Phân quyền**: Đăng ký, Đăng nhập, cấp phát JWT, middleware kiểm tra quyền `CUSTOMER`, `STAFF`, `ADMIN` (Chưa có mã nguồn).
2. **Quản lý sân cầu lông**: Thêm mới sân, sửa tên sân, đổi loại thảm, chuyển trạng thái bảo trì (Chưa có mã nguồn).
3. **Cấu hình bảng giá**: Thiết lập giá giờ thường và giá giờ cao điểm (Chưa có mã nguồn).
4. **Tra cứu lịch sân trống (Availability Timeline)**: Hiển thị bảng ma trận slot theo ngày (Chưa có mã nguồn).
5. **Khóa tạm thời khung giờ (Hold Slot)**: Khóa giữ chỗ slot để chống double-booking (Chưa có mã nguồn).
6. **Đặt sân trực tuyến**: Tạo đơn đặt sân, lưu thông tin khách hàng, tính tổng tiền (Chưa có mã nguồn).
7. **Đặt sân tại quầy**: Chức năng dành riêng cho nhân viên đặt cho khách vãng lai (Chưa có mã nguồn).
8. **Hủy đặt sân tự phục vụ**: Kiểm tra điều kiện thời gian hủy và tự động giải phóng slot (Chưa có mã nguồn).
9. **Tiếp đón & Check-in**: Nhân viên quầy tra cứu mã đơn và đổi trạng thái vào sân (Chưa có mã nguồn).
10. **Báo cáo thống kê**: Doanh thu, số lượt đặt, tỷ lệ lấp đầy sân (Chưa có mã nguồn).

---

## 4. Mâu thuẫn giữa tài liệu và mã nguồn thực tế

1. **Mâu thuẫn về trạng thái hoàn thiện**:
   - `README.md` (Mục 3 và Mục 4) trình bày các luồng nghiệp vụ Đặt sân, Hủy sân và Quản lý sân như một hệ thống hoàn chỉnh.
   - Tuy nhiên, mã nguồn thực tế trong `backend/src/server.js` chỉ có duy nhất 1 route `/api/health`.
   - **Xử lý**: Trong các tài liệu kết quả, bắt buộc phải phân định rõ ràng giữa "Hành vi thực tế đã có trong mã nguồn" và "Đặc tả yêu cầu chức năng mục tiêu theo thiết kế".
2. **Mâu thuẫn về Cổng kết nối (Port)**:
   - Các file tài liệu ban đầu ghi `http://localhost:5000`.
   - Mã nguồn thực tế `backend/src/server.js` và `frontend/src/App.jsx` chạy tại cổng `http://localhost:5001` (để tránh xung đột với tiến trình ControlCenter/AirPlay của macOS).
   - **Xử lý**: Chuẩn hóa toàn bộ tài liệu theo cổng thực tế `http://localhost:5001`.
3. **Mâu thuẫn về Cơ sở dữ liệu**:
   - `README.md` ghi Database là MySQL.
   - Thực tế trong workspace chỉ có file kết nối `backend/src/config/db.js`, chưa có file định nghĩa cấu trúc bảng (DDL schema), chưa có dữ liệu bảng sân hay bảng đặt chỗ nào.
   - **Xử lý**: Không khẳng định cơ sở dữ liệu đã có bảng hoạt động; ghi rõ cấu trúc bảng đang ở mức thiết kế đề xuất.

---

## 5. Thông tin còn thiếu và Cần xác nhận từ người dùng

Theo đúng **Nguyên tắc không bịa đặt** của đề bài, các thông tin sau đây hiện chưa có nguồn xác nhận trong workspace:

| Thông tin còn thiếu | Nguồn hiện tại trong workspace | Tình trạng | Yêu cầu cần người dùng / bài toán bổ sung |
| :--- | :--- | :---: | :--- |
| **Họ và tên, MSSV của Sinh viên (Chủ hệ thống)** | Không có file nào lưu | **CHƯA XÁC ĐỊNH** | Cần người dùng cung cấp Họ tên và MSSV chính thức để điền vào trang bìa và biên bản. |
| **Họ và tên, MSSV của Bạn cặp (Tester)** | Không có | **CHƯA XÁC ĐỊNH** | Cần người dùng cung cấp thông tin sinh viên bạn cặp đổi vai. |
| **Link triển khai công khai (Public Hosting URL)** | Chỉ có `localhost:5001` và `localhost:5173` | **CHƯA XÁC ĐỊNH** | Cần URL triển khai thực tế trên server/cloud từ tuần 6 đến tuần 14 theo yêu cầu học phần. |
| **Tài khoản và mật khẩu thử nghiệm thực tế** | Chưa có bảng `users` trong database | **CHƯA XÁC ĐỊNH** | Cần tài khoản thực tế sau khi module đăng nhập được lập trình. |
| **Giá thuê sân cụ thể** | `README.md` chỉ ghi chung chung "bảng giá theo khung giờ (giờ thường / giờ vàng / cuối tuần)" | **CHƯA XÁC ĐỊNH** | Chưa có quyết định giá chính thức (ví dụ: bao nhiêu nghìn đồng/giờ). Các con số xuất hiện trong bản nháp trước chỉ là đề xuất minh họa, cần xác nhận. |
| **Thời lượng slot và thời gian giữ chỗ tạm thời (Hold time)** | `README.md` chỉ ghi "khung giờ", "giữ chỗ tạm thời" | **CHƯA XÁC ĐỊNH** | Chưa xác nhận slot là 60 phút hay 30 phút; thời gian giữ chỗ là 5 phút, 10 phút hay 15 phút. |
| **Chính sách hủy sân cụ thể, phí phạt, hoàn cọc** | `README.md` ghi "ví dụ trước 12h hoặc 24h", "tỷ lệ cọc/hoàn tiền" | **CHƯA XÁC ĐỊNH** | Chưa có quy định chính thức: hủy trước bao nhiêu giờ, có mất cọc không, hoàn tiền qua kênh nào. |
| **Bộ 15 lỗi cài sẵn trong mã nguồn** | Mã nguồn hiện tại là baseline sạch, chưa cấy lỗi | **CHƯA XÁC ĐỊNH** | Chưa cấy lỗi vào code, chưa có bằng chứng video/ảnh chụp lỗi thật trên web. Kịch bản lỗi mới ở mức ý tưởng thiết kế. |
| **Dữ liệu thực thi kiểm thử của Tester** | Chưa nhận bàn giao hệ thống bạn cặp | **CHƯA XÁC ĐỊNH** | Chưa có file log Newman thật, chưa có ảnh Puppeteer thật, chưa có file `.jtl` JMeter thật. |

---

## 6. Kết luận kiểm kê
- Đã đọc và nắm vững 100% các biểu mẫu và tiêu chí học phần trong `TAILIEU/`.
- Phân định rạch ròi: Mã nguồn hiện tại mới có tầng Baseline (`GET /api/health` port 5001 và trang Home React).
- Mọi nội dung chi tiết về giá, thời gian, quy tắc hủy và tài khoản thử nghiệm chưa có trong mã nguồn sẽ được gắn nhãn minh bạch là **[Đề xuất chờ xác nhận]** hoặc **[Chưa xác định — chưa có nguồn xác nhận]**, tuyệt đối không tự bịa đặt là dữ liệu đã chốt.
- Sẵn sàng chuyển sang cập nhật Kế hoạch chi tiết tại [02_Ke_hoach_soan_tai_lieu.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ke_hoach/02_Ke_hoach_soan_tai_lieu.md).
