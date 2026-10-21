# TỔNG HỢP HỒ SƠ KẾT QUẢ TÀI LIỆU DỰ ÁN
## ĐỒ ÁN: HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN (BADMINTON COURT BOOKING SYSTEM)
**Học phần**: Đánh giá hiệu năng hệ thống  
**Thư mục lưu trữ**: `docs/Ket_qua/`  
**Ngày cập nhật**: 21/10/2026  

---

## 1. Lưu ý quan trọng về tính trung thực và phân định trạng thái

> [!IMPORTANT]
> **PHÂN BIỆT RẠCH RÒI GIỮA TRẠNG THÁI TÀI LIỆU VÀ TRẠNG THÁI MÃ NGUỒN HỆ THỐNG**:
> - *"Đã hoàn thành tài liệu URD / SRS / Thiết kế API"* **KHÔNG CÓ NGHĨA LÀ** *"Hệ thống đã lập trình xong toàn bộ các chức năng đó"*. Thực tế hệ thống hiện tại mới hoàn thành tầng Baseline (Express server port 5001, route `/api/health`, kết nối database pool và trang Home React).
> - *"Đã thiết kế xong Test Plan và 76 Test Cases"* **KHÔNG CÓ NGHĨA LÀ** *"Đã thực thi kiểm thử và tìm ra lỗi"*. Các ca kiểm thử nghiệp vụ chuyên sâu đang ở trạng thái Pending chờ nhận bàn giao sản phẩm hoàn thiện của bạn cặp.
> - *"Đã thiết kế 15 lỗi trong Bug Manifest"* **KHÔNG CÓ NGHĨA LÀ** *"Đã cấy lỗi vào code và có video bằng chứng"*. 15 lỗi cài sẵn hiện là kịch bản thiết kế chuẩn xác, chờ lập trình viên cấy vào các controller và quay video thực tế khi deploy.

---

## 2. Bảng tổng hợp trạng thái chi tiết các tài liệu kết quả

| Tài liệu | Đường dẫn tệp tin | Trạng thái tài liệu | Nội dung đã hoàn thành | Nội dung còn thiếu / Cần bổ sung | Nguồn / Căn cứ / Bằng chứng |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **1. Tài liệu Yêu cầu Người dùng (URD)** | [URD_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/01_URD/URD_Badminton_Court_Booking.md) | **HOÀN THÀNH** | Bối cảnh, mục tiêu, phạm vi; đủ 3 vai trò (Customer, Staff, Admin); 3 luồng người dùng (Đặt sân, Hủy sân, Quản lý sân); 12 User Stories chuẩn kèm tiêu chí nghiệm thu và mã lỗi. | Thông tin định danh chính thức của sinh viên (Họ tên, MSSV). | `Pattern/Buoi3/01_URD_MAU_ShopGiay`, `Checklist_truoc_khi_nop.docx` (Mục A1) |
| **2. Đặc tả Yêu cầu Phần mềm (SRS)** | [SRS_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/02_SRS/SRS_Badminton_Court_Booking.md) | **HOÀN THÀNH** | Đặc tả 12 chức năng (`FR-01`..`FR-12`); 3 luồng E2E có luồng ngoại lệ; 8 NFR đo được (3 NFR hiệu năng); bảng quyết định giá; ma trận phân quyền RBAC; ma trận truy vết URD. | Cập nhật các phản hồi phát sinh sau đợt review chính thức của Tester (v1.1). | `Pattern/Buoi3/02_SRS_MAU_ShopGiay`, `Tieu_chi_cham_diem.docx` (Mục A2) |
| **3. Tài liệu Thiết kế API** | [Tai_lieu_API_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/03_API/Tai_lieu_API_Badminton_Booking.md) | **BẢN NHÁP THIẾT KẾ ĐẦY ĐỦ** | Thông tin chung, mã lỗi chuẩn, danh sách 17 endpoint; đặc tả chi tiết req/res mẫu kèm ràng buộc dữ liệu; tài khoản test mẫu; phân định rõ endpoint đã có code (`/api/health`). | URL server staging chính thức khi deploy (hiện đang dùng `http://localhost:5001`). | `TAILIEU/Mau_01_Tai_lieu_API.docx`, mã nguồn `backend/` |
| **4. Danh mục Lỗi Cài sẵn (Bug Manifest Riêng)** | [Bug_Manifest_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/04_Bug_Manifest_Rieng/Bug_Manifest_Badminton_Booking.md) | **BẢN NHÁP THIẾT KẾ LỖI (LƯU RIÊNG)** | Bảng tự kiểm tra số lượng; thiết kế đủ 15 lỗi cài sẵn theo 5 loại (5 Func, 3 Vis, 3 Cont, 2 Perf, 2 Crash; 4 Crit/Major); mỗi lỗi trích đúng yêu cầu SRS bị vi phạm và các bước tái hiện. | Chưa cấy vào mã nguồn thực tế; link video/ảnh chụp minh chứng lỗi thật trên web. | `TAILIEU/Mau_02_Bug_Manifest.xlsx`, `Tieu_chi_cham_diem.docx` (Mục A4) |
| **5. Bộ Biểu mẫu Kiểm thử (Tester)** | [Bo_bieu_mau_Kiem_thu_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/05_Bo_bieu_mau_Kiem_thu/Bo_bieu_mau_Kiem_thu_Badminton.md) | **HOÀN THÀNH THIẾT KẾ TC (NHÁP LOG & BUG)** | Sheet Thông tin; Sheet Review SRS (5 phát hiện); Sheet TC Chức năng (**64 TC**, áp dụng 5 kỹ thuật); Sheet TC Phi chức năng (**12 TC**); Khung Test Log & Bug Report chuẩn. | Kết quả thực thi thực tế trên sản phẩm của bạn cặp (Test log, danh sách bug bắt được). | `TAILIEU/Mau_03_Bo_bieu_mau_Kiem_thu.xlsx`, `Tieu_chi_cham_diem.docx` (B2) |
| **6. Kế hoạch Kiểm thử (Test Plan)** | [Test_Plan_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/06_Test_Plan/Test_Plan_Badminton_Booking.md) | **HOÀN THÀNH** | Mục tiêu, tài liệu tham chiếu; phạm vi in/out phủ 12 FR và 8 NFR; chiến lược kiểm thử thủ công/tự động/tải; phân loại 5 loại lỗi; môi trường, tiêu chí bắt đầu/kết thúc; quản lý rủi ro. | Khung giờ chạy tải chính thức đăng ký với giảng viên. | `TAILIEU/Mau_04_Test_Plan.docx`, `Tieu_chi_cham_diem.docx` (B1) |
| **7. Báo cáo Tổng kết Kiểm thử (TSR)** | [Test_Summary_Report_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/07_Test_Summary_Report/Test_Summary_Report_Badminton.md) | **BẢN NHÁP CẤU TRÚC BÁO CÁO** | Bảng độ phủ 80 hạng mục; khung thống kê lỗi 5 loại; kế hoạch chạy tự động Newman và Puppeteer; kịch bản đo JMeter; bảng đối chiếu NFR hiệu năng; kết luận No-go trung thực. | File kết quả `.jtl`, HTML Dashboard của JMeter, file HTML report của Newman từ đợt chạy thật. | `TAILIEU/Mau_05_Test_Summary_Report.docx`, `Tieu_chi_cham_diem.docx` (B4, B5) |
| **8. Biên bản Bàn giao Số 1 (Tuần 6)** | [Bien_ban_ban_giao_so_1_Tuan_6.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/08_Bien_ban_ban_giao/Bien_ban_ban_giao_so_1_Tuan_6.md) | **BẢN NHÁP BÀN GIAO SẢN PHẨM** | Danh mục bàn giao URD, SRS, API, link web, tài khoản test, dữ liệu mẫu; xác nhận 3 ô của Tester; ghi rõ các hạn chế đã biết của bản baseline; cam kết bảo mật Bug Manifest. | Chữ ký xác nhận và thông tin bạn cặp thực tế. | `TAILIEU/Mau_06_Bien_ban_ban_giao.docx` (Biên bản 1) |
| **9. Biên bản Bàn giao Số 2 (Tuần 14)** | [Bien_ban_ban_giao_so_2_Tuan_14.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/08_Bien_ban_ban_giao/Bien_ban_ban_giao_so_2_Tuan_14.md) | **BẢN NHÁP BÀN GIAO KẾT QUẢ** | Danh mục bàn giao 7 sản phẩm của Tester; bảng tóm tắt kết quả kiểm thử (64 TC chức năng, 12 TC NFR, tỷ lệ pass baseline 100%); mục ghi nhận lỗi bất đồng ý kiến. | Số liệu tổng kết lỗi cuối cùng và chữ ký hai bên sau buổi bảo vệ demo tuần 14. | `TAILIEU/Mau_06_Bien_ban_ban_giao.docx` (Biên bản 2) |
| **10. Ma trận Truy vết & Đối chiếu Rubric** | [Ma_tran_truy_vet_va_Doi_chieu_Rubric.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/09_Truy_vet_va_doi_chieu/Ma_tran_truy_vet_va_Doi_chieu_Rubric.md) | **HOÀN THÀNH** | Ma trận truy vết dọc URD ↔ SRS ↔ API ↔ TC ↔ Bug; bảng tự kiểm tra 100% mục trong Checklist trước khi nộp (Phần 1 & Phần 2); bảng tự đánh giá chi tiết theo Rubric môn học. | Không có (tổng hợp trực tiếp từ hồ sơ tài liệu). | `Checklist_truoc_khi_nop.docx`, `Tieu_chi_cham_diem.docx` |

---

## 3. Cấu trúc thư mục kết quả đã lưu trữ

```
docs/Ket_qua/
├── README.md                                                 # File tổng hợp này
├── 01_URD/
│   └── URD_Badminton_Court_Booking.md                        # URD v1.0 (Hoàn thành)
├── 02_SRS/
│   └── SRS_Badminton_Court_Booking.md                        # SRS v1.0 (Hoàn thành)
├── 03_API/
│   └── Tai_lieu_API_Badminton_Booking.md                     # Đặc tả 17 API (Bản nháp thiết kế đầy đủ)
├── 04_Bug_Manifest_Rieng/
│   └── Bug_Manifest_Badminton_Booking.md                     # 15 lỗi cài sẵn bí mật (Bản nháp thiết kế)
├── 05_Bo_bieu_mau_Kiem_thu/
│   └── Bo_bieu_mau_Kiem_thu_Badminton.md                     # 64 TC chức năng + 12 TC NFR (Hoàn thành)
├── 06_Test_Plan/
│   └── Test_Plan_Badminton_Booking.md                        # Kế hoạch kiểm thử Mẫu 04 (Hoàn thành)
├── 07_Test_Summary_Report/
│   └── Test_Summary_Report_Badminton.md                      # Báo cáo tổng kết Mẫu 05 (Bản nháp cấu trúc)
├── 08_Bien_ban_ban_giao/
│   ├── Bien_ban_ban_giao_so_1_Tuan_6.md                      # Bàn giao sản phẩm tuần 6 (Bản nháp)
│   └── Bien_ban_ban_giao_so_2_Tuan_14.md                     # Bàn giao kết quả tuần 14 (Bản nháp)
└── 09_Truy_vet_va_doi_chieu/
    └── Ma_tran_truy_vet_va_Doi_chieu_Rubric.md               # Truy vết & Đối chiếu Rubric (Hoàn thành)
```

