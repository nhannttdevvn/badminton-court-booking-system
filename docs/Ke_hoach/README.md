# KẾ HOẠCH TỔ CHỨC VÀ BIÊN SOẠN HỒ SƠ TÀI LIỆU
## Đồ án: Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System)
**Học phần**: Đánh giá hiệu năng hệ thống  
**Thư mục lưu trữ kế hoạch**: `docs/Ke_hoach/`

---

## 1. Mục đích và Phạm vi của thư mục `Ke_hoach/`
Thư mục này được thiết lập nhằm tuân thủ nghiêm ngặt **nguyên tắc lập kế hoạch trước khi thực thi**:
1. Toàn bộ quy trình kiểm kê nguồn tài liệu, phân tích hiện trạng mã nguồn, xây dựng kế hoạch phân rã công việc và thiết lập cơ chế giám sát tiến độ phải được văn bản hóa thành các tệp tin trước khi tiến hành soạn thảo nội dung bàn giao tại `docs/Ket_qua/`.
2. Không thực hiện soạn thảo tài liệu khi chưa có kế hoạch và tiêu chí hoàn thành được phê duyệt.
3. Không ghi đè hoặc xóa bỏ các tài liệu hiện có trong thư mục `docs/` của dự án (`docs/URD/`, `docs/SRS/`, `docs/API/`, `docs/Diagrams/`, `docs/Bug-Manifest/`).
4. Giữ nguyên vẹn toàn bộ các biểu mẫu gốc trong thư mục `TAILIEU/` để làm đối chuẩn.

---

## 2. Danh mục tài liệu trong thư mục `Ke_hoach/`
1. [01_Kiem_ke_nguon_va_hien_trang.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ke_hoach/01_Kiem_ke_nguon_va_hien_trang.md): Báo cáo kiểm kê chi tiết toàn bộ các nguồn tài liệu đầu vào, biểu mẫu, hiện trạng mã nguồn, chức năng đã code, chức năng mới mô tả, và danh mục dữ liệu còn thiếu.
2. [02_Ke_hoach_soan_tai_lieu.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ke_hoach/02_Ke_hoach_soan_tai_lieu.md): Bảng kế hoạch chi tiết cho từng tài liệu cần biên soạn, bao gồm mã công việc, mẫu áp dụng, nguồn vào, nội dung, bước thực hiện, phụ thuộc, tiêu chí nghiệm thu và phân loại mức độ hoàn thành.
3. [03_Theo_doi_tien_do.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ke_hoach/03_Theo_doi_tien_do.md): Bảng ghi nhận tiến độ thực tế, cập nhật minh bạch sau mỗi đầu việc hoàn thành, ghi rõ hạn chế và công việc tiếp theo.

---

## 3. Các nguyên tắc bắt buộc khi biên soạn hồ sơ
- **Nguyên tắc không bịa đặt dữ liệu (Anti-Hallucination)**: Tuyệt đối không tạo kết quả kiểm thử giả, không bịa bug report, không tự điền kết quả pass/fail, không giả mạo số liệu kiểm thử JMeter/Newman/Puppeteer khi chưa chạy thực tế trên môi trường kiểm thử được bàn giao.
- **Không nhầm lẫn ví dụ mẫu với dữ liệu thật**: Các dữ liệu mẫu trong file hướng dẫn (ví dụ phòng khách sạn `P101`, hệ thống `SweetShop`, `ShopGiay`, mã `SEED-01`) chỉ có vai trò hướng dẫn cấu trúc, không được dùng làm dữ liệu cho hệ thống Đặt sân cầu lông.
- **Phân biệt rõ trạng thái tài liệu và trạng thái hệ thống**:
  - *"Đã hoàn thành tài liệu URD/SRS"* không đồng nghĩa với *"Hệ thống đã lập trình xong các chức năng đó"*.
  - *"Đã thiết kế xong Test Plan và Test Cases"* không đồng nghĩa với *"Đã thực thi kiểm thử và tìm ra lỗi"*.
- **Quy chuẩn đánh dấu bản nháp**: Mọi tài liệu chưa đủ dữ liệu thực tế bắt buộc phải được gắn tiêu đề cảnh báo: `BẢN NHÁP — CHƯA ĐỦ DỮ LIỆU THỰC TẾ` và liệt kê rõ các mục đang chờ dữ liệu bổ sung.
- **Bảo mật Bug Manifest**: Bug Manifest là tài liệu riêng của chủ hệ thống nộp cho giảng viên, tuyệt đối không gộp chung vào gói bàn giao cho Tester.

