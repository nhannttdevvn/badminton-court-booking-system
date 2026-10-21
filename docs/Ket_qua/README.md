# TỔNG HỢP BỘ TÀI LIỆU KẾT QUẢ DỰ ÁN
## ĐỒ ÁN: HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
### Học phần: Đánh giá hiệu năng hệ thống
**Phiên bản bộ tài liệu**: v2.0 (Cập nhật ngày 21/10/2026)  
**Phạm vi hệ thống**: **1 Vai trò nghiệp vụ duy nhất: NHÂN VIÊN (Staff) – 5 Chức năng cốt lõi (`FR-01` đến `FR-05`)**  

---

## 1. Lưu ý cốt lõi về Tính trung thực và Hiện trạng hệ thống

> [!IMPORTANT]
> **PHÂN BIỆT RẠCH RÒI TRẠNG THÁI TÀI LIỆU VÀ MÃ NGUỒN THỰC TẾ**:
> 1. **Về phạm vi**: Hệ thống đã được điều chỉnh tinh gọn chỉ phục vụ **Nhân viên (Staff)** gồm 5 chức năng: Đăng ký nhân viên, Đăng nhập, Xem lịch đặt sân, Đặt sân cho khách (kèm cập nhật lịch tức thời và chống Double Booking), Hủy đặt sân (kèm giải phóng slot tức thời). Toàn bộ các chức năng và vai trò Customer/Admin cũ đã bị loại bỏ.
> 2. **Về mã nguồn**: Hệ thống hiện tại mới hoàn thành **tầng Baseline**: Express backend port 5001 endpoint `GET /api/health` và React frontend port 5173. Các router/controller nghiệp vụ cho 5 chức năng đang ở giai đoạn đặc tả thiết kế, chưa triển khai mã nguồn thực tế.
> 3. **Về lỗi**: Toàn bộ **10 lỗi đặc tả SRS + 3 lỗi ngoài đặc tả** trong [Bug_Manifest_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/04_Bug_Manifest_Rieng/Bug_Manifest_Badminton_Booking.md) là **KỊCH BẢN THIẾT KẾ ĐƯỢC CHUẨN BỊ SẴN** (trạng thái: `Thiết kế — chưa xác nhận tồn tại`), hoàn toàn chưa có lỗi thực tế hay video giả mạo.
> 4. **Về kết quả test**: Chỉ có **2 ca kiểm thử Baseline** được ghi nhận kết quả chạy thực tế (Pass 100%). Toàn bộ 27 ca kiểm thử nghiệp vụ chuyên sâu và các số liệu đo tải của JMeter được đánh dấu trung thực là `[Chờ kết quả thực tế của Tester khi chạy test]`. Kết luận nghiệm thu TSR là **No-go (Giai đoạn Baseline)**.

---

## 2. Bảng tổng hợp trạng thái chi tiết các tài liệu kết quả

| Tài liệu | Đường dẫn tệp tin | Trạng thái tài liệu | Nội dung đã hoàn thành | Nội dung còn thiếu / Cần xác nhận | Nguồn / Căn cứ / Bằng chứng |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **1. Tài liệu Yêu cầu Người dùng (URD)** | [URD_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/01_URD/URD_Badminton_Court_Booking.md) | **HOÀN THÀNH** | Bối cảnh, mục tiêu; 1 vai trò duy nhất (Nhân viên); 5 User Stories (`US-01`..`US-05`); 3 luồng E2E (Xem lịch, Đặt sân, Hủy sân); tiêu chí nghiệm thu kiểm tra được; danh mục 5 câu hỏi nghiệp vụ. | Xác nhận chính thức từ người dùng/chủ sân về 5 câu hỏi nghiệp vụ (duyệt đăng ký, khung giờ, điều kiện hủy). | Yêu cầu thay đổi phạm vi 21/10 |
| **2. Đặc tả Yêu cầu Phần mềm (SRS)** | [SRS_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/02_SRS/SRS_Badminton_Court_Booking.md) | **HOÀN THÀNH** | Đặc tả chi tiết 5 chức năng `FR-01` đến `FR-05` (đủ 11 thuộc tính mỗi chức năng); đặc tả cập nhật lịch tức thời; cơ chế khóa chống Double Booking; **đặc tả yêu cầu Responsive bắt buộc trên 5 kích thước (320px..1366px)**. | Chốt các quy tắc nghiệp vụ đề xuất (thời lượng slot, hạn hủy). Mã nguồn thực tế đang chờ lập trình. | URD v2.0, biểu mẫu SRS chuẩn |
| **3. Tài liệu Thiết kế API** | [Tai_lieu_API_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/03_API/Tai_lieu_API_Badminton_Booking.md) | **BẢN NHÁP THIẾT KẾ ĐẦY ĐỦ** | Thông tin chung, bảng mã lỗi chuẩn; danh mục 8 endpoint phục vụ 5 FR; đặc tả req/res mẫu kèm ràng buộc validation; **phân định rõ 1 API đã có code thật (`GET /api/health`)** và 7 API thiết kế dự kiến. | URL public staging khi deploy; mã nguồn các router/controller nghiệp vụ thực tế. | `TAILIEU/Mau_01_Tai_lieu_API.docx`, mã nguồn `backend/src/server.js` |
| **4. Danh mục Lỗi (Bug Manifest Riêng)** | [Bug_Manifest_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/04_Bug_Manifest_Rieng/Bug_Manifest_Badminton_Booking.md) | **BẢN NHÁP THIẾT KẾ LỖI (LƯU RIÊNG)** | Phân tách 2 bảng rõ rệt: **10 lỗi đặc tả SRS** (trích đúng điều khoản vi phạm) + **3 lỗi ngoài đặc tả** (chỉ rõ căn cứ UX/Security và gắn nhãn "Vấn đề cần xác nhận"). Lưu riêng bảo mật cho Giảng viên. | Mã nguồn cấy lỗi thực tế; video / ảnh chụp minh chứng lỗi khi chạy web thật. | `TAILIEU/Mau_02_Bug_Manifest.xlsx`, SRS v2.0 |
| **5. Bộ Biểu mẫu Kiểm thử (Tester)** | [Bo_bieu_mau_Kiem_thu_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/05_Bo_bieu_mau_Kiem_thu/Bo_bieu_mau_Kiem_thu_Badminton.md) | **HOÀN THÀNH THIẾT KẾ TC (NHÁP LOG & BUG)** | Sheet Thông tin; Sheet Review SRS (5 phát hiện); Sheet TC Chức năng (16 TC chức năng, xác thực, đặt trùng); **Sheet TC Phi chức năng (7 TC Responsive riêng biệt)**; Khung Test Log & Bug Report giữ trung thực không fake bug. | Kết quả thực thi thực tế của Tester bạn cặp trong giai đoạn Tuần 6 – Tuần 13. | `TAILIEU/Mau_03_Bo_bieu_mau_Kiem_thu.xlsx` |
| **6. Kế hoạch Kiểm thử (Test Plan)** | [Test_Plan_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/06_Test_Plan/Test_Plan_Badminton_Booking.md) | **HOÀN THÀNH** | Mục tiêu, phạm vi in/out theo phạm vi 1 role - 5 FR; chiến lược kiểm thử thủ công/concurrency/responsive/tải; phân loại 5 loại lỗi; môi trường, tiêu chí bắt đầu/kết thúc; quản lý rủi ro. | Khung giờ chạy tải chính thức đăng ký với Giảng viên. | `TAILIEU/Mau_04_Test_Plan.docx` |
| **7. Báo cáo Tổng kết Kiểm thử (TSR)** | [Test_Summary_Report_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/07_Test_Summary_Report/Test_Summary_Report_Badminton.md) | **BẢN NHÁP CẤU TRÚC BÁO CÁO** | Bảng độ phủ 29 hạng mục (ghi nhận thực tế 2 ca baseline Pass); khung thống kê lỗi 5 loại; kịch bản đo tải JMeter đối chiếu NFR-02; **kết luận No-go minh bạch cho giai đoạn Baseline**. | File kết quả `.jtl`, HTML Dashboard của JMeter khi chạy thật; số lượng lỗi bắt được trên sản phẩm bạn cặp. | `TAILIEU/Mau_05_Test_Summary_Report.docx` |
| **8. Biên bản Bàn giao Số 1 (Tuần 6)** | [Bien_ban_ban_giao_so_1_Tuan_6.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/08_Bien_ban_ban_giao/Bien_ban_ban_giao_so_1_Tuan_6.md) | **BẢN NHÁP BÀN GIAO SẢN PHẨM** | Danh mục bàn giao URD v2.0, SRS v2.0, API v2.0, link web, tài khoản nhân viên test, dữ liệu mẫu; xác nhận của Tester; ghi rõ hạn chế baseline; cam kết bảo mật Bug Manifest. | Chữ ký xác nhận và thông tin bạn cặp thực tế khi bàn giao tuần 6. | `TAILIEU/Mau_06_Bien_ban_ban_giao.docx` |
| **9. Biên bản Bàn giao Số 2 (Tuần 14)** | [Bien_ban_ban_giao_so_2_Tuan_14.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/08_Bien_ban_ban_giao/Bien_ban_ban_giao_so_2_Tuan_14.md) | **BẢN NHÁP BÀN GIAO KẾT QUẢ** | Danh mục bàn giao hồ sơ kết quả của Tester; bảng tóm tắt kết quả kiểm thử (16 TC chức năng, 7 TC responsive, 100% pass baseline); mục bất đồng ý kiến. | Số liệu tổng kết lỗi cuối cùng và chữ ký hai bên sau buổi bảo vệ demo tuần 14. | `TAILIEU/Mau_06_Bien_ban_ban_giao.docx` |
| **10. Ma trận Truy vết & Đối chiếu Rubric** | [Ma_tran_truy_vet_va_Doi_chieu_Rubric.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/09_Truy_vet_va_doi_chieu/Ma_tran_truy_vet_va_Doi_chieu_Rubric.md) | **HOÀN THÀNH** | Ma trận truy vết dọc 6 mắt xích `URD (5 US) ↔ SRS (5 FR) ↔ API ↔ TC ↔ Bug (10+3)`; bảng đối chiếu và phân tích xung đột với Checklist cũ; khuyến nghị kế hoạch làm việc với Giảng viên. | Phê duyệt chính thức của Giảng viên về việc điều chỉnh tiêu chí chấm điểm theo phạm vi mới. | `Checklist_truoc_khi_nop.docx`, `Tieu_chi_cham_diem.docx` |

---

## 3. Cấu trúc thư mục kết quả trên đĩa

```
docs/Ket_qua/
├── README.md                                                 # File tổng hợp này
├── 01_URD/
│   └── URD_Badminton_Court_Booking.md                        # URD v2.0 (1 Role, 5 US, 3 Flows)
├── 02_SRS/
│   └── SRS_Badminton_Court_Booking.md                        # SRS v2.0 (5 FRs, Concurrency, Responsive)
├── 03_API/
│   └── Tai_lieu_API_Badminton_Booking.md                     # Đặc tả 8 API (Phân định code thật vs dự kiến)
├── 04_Bug_Manifest_Rieng/
│   └── Bug_Manifest_Badminton_Booking.md                     # 10 lỗi đặc tả + 3 lỗi ngoài đặc tả (Lưu riêng bảo mật)
├── 05_Bo_bieu_mau_Kiem_thu/
│   └── Bo_bieu_mau_Kiem_thu_Badminton.md                     # 7 Sheet Mẫu 03 (TC chức năng & 7 TC Responsive)
├── 06_Test_Plan/
│   └── Test_Plan_Badminton_Booking.md                        # Kế hoạch kiểm thử Mẫu 04 (Phạm vi mới)
├── 07_Test_Summary_Report/
│   └── Test_Summary_Report_Badminton.md                      # Báo cáo tổng kết Mẫu 05 (Baseline No-go)
├── 08_Bien_ban_ban_giao/
│   ├── Bien_ban_ban_giao_so_1_Tuan_6.md                      # Bàn giao sản phẩm tuần 6 (Bản nháp)
│   └── Bien_ban_ban_giao_so_2_Tuan_14.md                     # Bàn giao kết quả tuần 14 (Bản nháp)
└── 09_Truy_vet_va_doi_chieu/
    └── Ma_tran_truy_vet_va_Doi_chieu_Rubric.md               # Truy vết dọc & Đối chiếu Rubric môn học
```
