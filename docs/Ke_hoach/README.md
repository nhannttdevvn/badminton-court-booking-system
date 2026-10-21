# KẾ HOẠCH TỔ CHỨC VÀ BIÊN SOẠN TÀI LIỆU DỰ ÁN
## HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
### Học phần: Đánh giá hiệu năng hệ thống
**Ngày cập nhật**: 21/10/2026  
**Lịch sử thay đổi**: Cập nhật phạm vi dự án theo yêu cầu mới — **Thu hẹp phạm vi chỉ còn MỘT vai trò nghiệp vụ (NHÂN VIÊN) và NĂM chức năng cốt lõi**. Toàn bộ tài liệu phiên bản cũ (3 vai trò Customer/Staff/Admin, 12 FR) được đánh dấu là tài liệu cũ đã được thay thế.

---

## 1. Mục đích thư mục `docs/Ke_hoach/`

Thư mục này lưu trữ toàn bộ hồ sơ kiểm kê, kế hoạch chi tiết và tiến độ thực thi việc biên soạn tài liệu cho dự án theo đúng quy trình nghiêm ngặt:
> **"Phải viết kế hoạch làm tài liệu trước, lưu thành file rồi mới thực hiện soạn tài liệu theo kế hoạch. Không chỉ nêu kế hoạch trong hội thoại."**

Cấu trúc gồm 4 tệp tin:
- `README.md`: Tài liệu tổng quan quy trình, nguyên tắc trung thực học thuật và lịch sử điều chỉnh phạm vi.
- `01_Kiem_ke_nguon_va_hien_trang.md`: Báo cáo kiểm kê nguồn đầu vào, hiện trạng mã nguồn, phân tích tác động của việc thay đổi phạm vi và các câu hỏi nghiệp vụ cần xác nhận.
- `02_Ke_hoach_soan_tai_lieu.md`: Bảng kế hoạch chi tiết từng đầu việc (Mã, nội dung sửa, căn cứ, đầu ra, tiêu chí, điểm chưa xác định, trạng thái).
- `03_Theo_doi_tien_do.md`: Bảng theo dõi tiến độ cập nhật thực tế theo tiến trình thực hiện.

---

## 2. Phạm vi dự án mới (Cập nhật 21/10/2026)

Hệ thống được xác định lại phạm vi tinh gọn, tập trung duy nhất vào nghiệp vụ vận hành của Nhân viên tại sân cầu lông:

* **Một vai trò nghiệp vụ duy nhất**: **NHÂN VIÊN (Staff)**.
  *(Lưu ý: "Người chưa đăng nhập" chỉ là trạng thái truy cập trước xác thực, không phải là một vai trò nghiệp vụ mới).*
* **Năm (05) chức năng cốt lõi**:
  1. **FR-01: Đăng ký tài khoản nhân viên** (Đặc tả riêng biệt với đăng nhập).
  2. **FR-02: Đăng nhập** (Đặc tả riêng biệt với đăng ký).
  3. **FR-03: Xem lịch đặt sân** (Timeline/Lưới tình trạng sân theo thời gian thực).
  4. **FR-04: Đặt sân** (Tạo đơn đặt sân, cập nhật lịch tức thời, chống tranh chấp đặt trùng).
  5. **FR-05: Hủy đặt sân** (Hủy lượt đặt, giải phóng slot trên lịch tức thời).
* **Phạm vi LOẠI BỎ hoàn toàn**:
  - KHÔNG có vai trò Khách hàng (Customer) hay Quản trị viên (Admin).
  - KHÔNG có phân hệ thanh toán trực tuyến, cổng thanh toán ngân hàng/ví điện tử.
  - KHÔNG có báo cáo doanh thu, thống kê tài chính.
  - KHÔNG có quản trị người dùng phân cấp.
  - KHÔNG có cấu hình bảng giá (giờ thường / giờ vàng).
  - KHÔNG có quy trình Check-in / Check-out tiếp đón.
  - KHÔNG có các chức năng phụ khác ngoài 5 chức năng nêu trên.

---

## 3. Cảnh báo đối chiếu Tiêu chí chấm điểm và Biểu mẫu môn học

> [!WARNING]
> **SỰ KHÁC BIỆT GIỮA PHẠM VI MỚI VÀ TIÊU CHÍ CHẤM ĐIỂM BAN ĐẦU (`TAILIEU/`)**:
> - Các biểu mẫu trong `TAILIEU/` (`Tieu_chi_cham_diem.docx`, `Checklist_truoc_khi_nop.docx`) đặt ra tiêu chuẩn: ≥ 3 vai trò, ≥ 12 chức năng chức năng (FR), ≥ 15 lỗi cài sẵn (đủ 5 loại lỗi).
> - Phạm vi mới được xác định theo yêu cầu của đồ án chỉ có: **1 vai trò và 5 chức năng**.
> - **NGUYÊN TẮC TUÂN THỦ**:
>   1. Không tự ý bịa thêm vai trò Customer hay Admin để "cho đủ 3 vai trò".
>   2. Không tự ý bịa thêm chức năng ngoài phạm vi 5 chức năng đã chốt.
>   3. Ghi rõ sự sai khác này trong tài liệu kiểm kê và ma trận đối chiếu; đánh dấu đây là nội dung **cần xác nhận / xin ý kiến Giảng viên hướng dẫn** về việc điều chỉnh thang điểm/tiêu chí đánh giá cho phù hợp với phạm vi 1 role - 5 FR.
>   4. Tuyệt đối không tuyên bố là hệ thống đã đạt các tiêu chí cũ khi thực tế phạm vi đã thay đổi.

---

## 4. Nguyên tắc trung thực và quy định xử lý thông tin

1. **Phân biệt rạch ròi trạng thái thông tin**:
   - `[Đã xác nhận]`: Yêu cầu được nêu rõ trong đề bài / yêu cầu thay đổi phạm vi.
   - `[Đề xuất kỹ thuật chờ xác nhận]`: Các thông số kỹ thuật (viewport responsive, định dạng mã đơn, format thời gian...) do đội ngũ kỹ thuật đề xuất nhưng chưa được người dùng chốt.
   - `[Chưa xác định — Cần xác nhận từ người dùng / GV]`: Các quy tắc nghiệp vụ còn thiếu (điều kiện đăng ký, quyền hủy, thời lượng slot, dữ liệu bắt buộc khi đặt).
2. **Quy định về Lỗi (10 lỗi đặc tả + 3 lỗi ngoài đặc tả)**:
   - **Lỗi đặc tả**: Lỗi hành vi hệ thống vi phạm trực tiếp một yêu cầu được ghi rõ trong SRS (KHÔNG phải lỗi chính tả/gõ văn bản trong tài liệu).
   - **Lỗi ngoài đặc tả**: Vấn đề quan sát được (về tính tiện dụng, hành vi biên, tính ổn định) nhưng chưa có yêu cầu tương ứng trong SRS; cần căn cứ kỳ vọng ngoài đặc tả để kết luận ("Vấn đề cần xác nhận").
   - **Tất cả hiện ở trạng thái "Thiết kế — chưa xác nhận tồn tại" (0 lỗi có bằng chứng thật)** vì chưa triển khai mã nguồn các chức năng này. Tuyệt đối không bịa kết quả thực tế, video, ảnh chụp giả mạo.
3. **Yêu cầu Responsive là bắt buộc**:
   - Đặc tả chi tiết hành vi giao diện khi thu hẹp/mở rộng màn hình trên cả 5 chức năng.
   - Bộ kích thước viewport đề xuất: 320, 375, 768, 1024, 1366 px (được gắn nhãn đề xuất chờ xác nhận).
   - Thiết kế test cases responsive riêng biệt; ảnh minh chứng chỉ được lấy từ lần chạy thật sau này.
